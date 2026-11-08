import React from 'react';
import { InlineMath, plainTextToLatex } from './Equation';

const greek = 'αβγδεζηθικλμνξπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΠΡΣΤΥΦΧΨΩ';
const subSup = '₀₁₂₃₄₅₆₇₈₉₊₋₍₎ₐₑᵢⱼₖₗₘₙₚᵣₛₜᵤᵥₓ⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁽⁾ⁿ';
const mathChars = `${greek}${subSup}ℏ∂∇∫∮ΣΠ√∞≤≥≈≡∝→±×·−∆ΔΦΨΩ`;

const relationPattern = new RegExp(
  String.raw`(?:[A-Za-z${greek}ℏ∂∇ΣΠΦΔ][A-Za-z0-9${greek}${subSup}_^{}()|/\\.,+\-−×·\s]*\s*(?:=|≤|≥|≈|≡|∝|→)\s*[A-Za-z0-9${greek}${subSup}_^{}()|/\\.,+\-−×·\s]+)`,
  'u',
);

const tokenPattern = new RegExp(
  String.raw`(?:[A-Za-z${greek}][A-Za-z0-9${subSup}_^{}]*|[${greek}][A-Za-z0-9${subSup}_^{}]*)(?:\s*[+\-−/×·]\s*(?:[A-Za-z${greek}][A-Za-z0-9${subSup}_^{}]*|\d+(?:\.\d+)?))*`,
  'u',
);

// A bare power with no relation around it: T^(3/2), e^(+iEt), 2^n.
const powerPattern = /^[A-Za-z0-9]+\^(?:\([^()]+\)|\{[^}]+\}|[-−+]?[A-Za-z0-9]+)$/u;

function trimMathCandidate(value: string) {
  let text = value.replace(/^[\s([{]+/, '').replace(/[\s.,;:!?]+$/, '');
  // Drop a closing bracket only when it has no partner inside the formula, so
  // (4πcGM/κ) keeps its parenthesis but the ")" closing a sentence aside goes.
  const count = (c: string) => text.split(c).length - 1;
  while (/[)\]}]$/u.test(text)) {
    const close = text.at(-1)!;
    const open = close === ')' ? '(' : close === ']' ? '[' : '{';
    if (count(open) >= count(close)) break;
    text = text.slice(0, -1).replace(/[\s.,;:!?]+$/, '');
  }
  return text;
}

// Words that can sit inside a formula; any other run of two lowercase words
// means the match has swallowed a sentence.
const mathWords = new Set(['sin', 'cos', 'tan', 'sinh', 'cosh', 'tanh', 'exp', 'log', 'det', 'max', 'min']);

const stopWords = new Set(['is', 'of', 'in', 'to', 'at', 'as', 'by', 'on', 'or', 'an', 'be', 'if', 'so', 'we', 'it', 'and', 'the', 'for', 'are', 'its', 'but', 'not']);

function swallowsProse(raw: string) {
  // Word subscripts (m_stop, t_merger, M_{chirp}) are labels, not prose.
  const text = raw.replace(/_(\{[^}]*\}|\([^)]*\)|[A-Za-z0-9]+)/gu, '_x');
  // A sentence break inside the window means it spans two sentences.
  if (/[.!?]\s+[A-Z]/u.test(text)) return true;
  const words = (text.match(/[A-Za-z]+/gu) ?? []).filter((w) => !mathWords.has(w));
  // Any ordinary word of four or more letters (lowercase or Capitalised) is
  // prose, not a symbol; so is a small function word anywhere in the window.
  if (words.some((w) => /^[A-Za-z][a-z]{3,}$/u.test(w) || stopWords.has(w))) return true;
  // A formula neither starts nor ends on a three-letter word ("the", "and").
  const first = text.match(/^[A-Za-z]+/u)?.[0] ?? '';
  const last = text.match(/[A-Za-z]+$/u)?.[0] ?? '';
  return [first, last].some((w) => (/^[a-z]{3,}$/u.test(w) && !mathWords.has(w)) || stopWords.has(w));
}

function isMathCandidate(value: string) {
  const text = trimMathCandidate(value);
  if (text.length < 2) return false;
  // A window cut off mid-expression ("… M_", "… 3.52 k_B T ^") is not a formula.
  if (/[_^\\(\[{=+\-−×·/≈≤≥≡∝→∼]$/u.test(text)) return false;
  if (swallowsProse(text)) return false;
  if (!/[=≤≥≈≡∝→_^]/u.test(text) && !new RegExp(`[${mathChars}]`, 'u').test(text)) return false;
  if (/^[A-Za-z]+$/u.test(text)) return false;
  return relationPattern.test(text) || tokenPattern.test(text) || powerPattern.test(text);
}

function findNextMath(text: string) {
  for (let start = 0; start < text.length; start += 1) {
    if (!/[A-Za-z0-9_α-ωΑ-Ωℏ∂∇∫∮ΣΠ√∞≤≥≈≡∝→±×·−∆ΔΦΨΩ₀-₉⁰-⁹]/u.test(text[start])) continue;
    // Never start or end inside a word: "...ity relation L ∝ M" must not
    // italicise the tail of "luminosity".
    if (start > 0 && /[A-Za-z0-9]/u.test(text[start - 1])) continue;

    for (let end = Math.min(text.length, start + 90); end > start + 1; end -= 1) {
      if (end < text.length && /[A-Za-z]/u.test(text[end]) && /[A-Za-z]/u.test(text[end - 1])) continue;
      // …nor inside a number (483,597.9 must not become 483,59 + 7.9).
      if (end < text.length && /[0-9]/u.test(text[end]) && /[0-9,.]/u.test(text[end - 1])) continue;
      const candidate = trimMathCandidate(text.slice(start, end));
      if (isMathCandidate(candidate)) {
        // The candidate is the raw window minus brackets/punctuation trimmed from
        // its ends, so locate it exactly: anything trimmed stays as plain text
        // instead of vanishing.
        const raw = text.slice(start, end);
        const offset = raw.indexOf(candidate);
        return {
          start: start + offset,
          end: start + offset + candidate.length,
          value: candidate,
        };
      }
    }
  }
  return null;
}

function renderText(text: string) {
  const parts: React.ReactNode[] = [];
  let rest = text;
  let key = 0;

  while (rest.length > 0) {
    const match = findNextMath(rest);
    if (!match) {
      parts.push(rest);
      break;
    }

    if (match.start > 0) parts.push(rest.slice(0, match.start));
    parts.push(<InlineMath key={`m-${key}`} latex={plainTextToLatex(match.value)} />);
    key += 1;
    rest = rest.slice(match.end);
  }

  return parts.length === 1 ? parts[0] : parts;
}

export function AutoMath({ children }: { children: React.ReactNode }) {
  return <>{autoMath(children)}</>;
}

export function autoMath(node: React.ReactNode): React.ReactNode {
  if (typeof node === 'string') return renderText(node);
  if (typeof node === 'number') return node;
  if (Array.isArray(node)) return node.map((child, i) => <React.Fragment key={i}>{autoMath(child)}</React.Fragment>);
  if (!React.isValidElement(node)) return node;

  const type = node.type;
  if (typeof type === 'string' && ['code', 'pre', 'kbd', 'script', 'style'].includes(type)) {
    return node;
  }

  const props = node.props as { children?: React.ReactNode };
  if (!props.children) return node;
  return React.cloneElement(node, undefined, autoMath(props.children));
}
