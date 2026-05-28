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

function trimMathCandidate(value: string) {
  return value
    .replace(/^[\s([{]+/, '')
    .replace(/[\s.,;:!?)\]}]+$/, '');
}

function isMathCandidate(value: string) {
  const text = trimMathCandidate(value);
  if (text.length < 2) return false;
  if (!/[=≤≥≈≡∝→_]/u.test(text) && !new RegExp(`[${mathChars}]`, 'u').test(text)) return false;
  if (/^[A-Za-z]+$/u.test(text)) return false;
  return relationPattern.test(text) || tokenPattern.test(text);
}

function findNextMath(text: string) {
  for (let start = 0; start < text.length; start += 1) {
    if (!/[A-Za-z0-9_α-ωΑ-Ωℏ∂∇∫∮ΣΠ√∞≤≥≈≡∝→±×·−∆ΔΦΨΩ₀-₉⁰-⁹]/u.test(text[start])) continue;

    for (let end = Math.min(text.length, start + 90); end > start + 1; end -= 1) {
      const candidate = trimMathCandidate(text.slice(start, end));
      if (isMathCandidate(candidate)) {
        const leadingWhitespace = text.slice(start, end).search(/\S/u);
        return {
          start: start + Math.max(leadingWhitespace, 0),
          end: start + end - text.slice(start, end).match(/[\s.,;:!?]*$/u)![0].length,
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
