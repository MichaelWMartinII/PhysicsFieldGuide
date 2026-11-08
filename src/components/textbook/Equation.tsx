import katex from 'katex';

const superscripts: Record<string, string> = {
  '⁰': '0',
  '¹': '1',
  '²': '2',
  '³': '3',
  '⁴': '4',
  '⁵': '5',
  '⁶': '6',
  '⁷': '7',
  '⁸': '8',
  '⁹': '9',
  '⁺': '+',
  '⁻': '-',
  '⁽': '(',
  '⁾': ')',
  'ⁿ': 'n',
  '\uE000': '.', // a decimal point between superscript digits (M³·⁵), see below
};

const subscripts: Record<string, string> = {
  '₀': '0',
  '₁': '1',
  '₂': '2',
  '₃': '3',
  '₄': '4',
  '₅': '5',
  '₆': '6',
  '₇': '7',
  '₈': '8',
  '₉': '9',
  '₊': '+',
  '₋': '-',
  '₍': '(',
  '₎': ')',
  'ₐ': 'a',
  'ₑ': 'e',
  'ᵢ': 'i',
  'ⱼ': 'j',
  'ₖ': 'k',
  'ₗ': 'l',
  'ₘ': 'm',
  'ₙ': 'n',
  'ₚ': 'p',
  'ᵣ': 'r',
  'ₛ': 's',
  'ₜ': 't',
  'ᵤ': 'u',
  'ᵥ': 'v',
  'ₓ': 'x',
};

const replacements: Array<[RegExp, string]> = [
  [/\u00a0+/g, ' '],
  [/&nbsp;/g, ' '],
  [/&gt;/g, '>'],
  [/&lt;/g, '<'],
  [/&apos;/g, "'"],
  [/&amp;/g, '&'],
  [/&/g, '\\&'],
  [/···|…|\.\.\./g, '\\cdots'],
  [/½/g, '\\frac{1}{2}'],
  [/¼/g, '\\frac{1}{4}'],
  [/⁄/g, '/'],
  [/∎/g, '\\blacksquare'],
  [/−/g, '-'],
  [/×/g, '\\times'],
  [/·/g, '\\cdot'],
  [/±/g, '\\pm'],
  [/≤/g, '\\le'],
  [/≥/g, '\\ge'],
  [/≈/g, '\\approx'],
  [/≡/g, '\\equiv'],
  [/∝/g, '\\propto'],
  [/→/g, '\\to'],
  [/∞/g, '\\infty'],
  [/∂/g, '\\partial'],
  [/∇/g, '\\nabla'],
  [/∫/g, '\\int'],
  [/∮/g, '\\oint'],
  [/□/g, '\\Box'],
  [/″/g, "''"],
  [/‖/g, '\\|'],
  [/∥/g, '\\parallel'],
  [/Σ/g, '\\sum'],
  [/Π/g, '\\prod'],
  [/√/g, '\\sqrt'],
  [/ℏ/g, '\\hbar'],
  [/π/g, '\\pi'],
  [/Ω/g, '\\Omega'],
  [/ω/g, '\\omega'],
  [/ε/g, '\\varepsilon'],
  [/μ/g, '\\mu'],
  [/ρ/g, '\\rho'],
  [/σ/g, '\\sigma'],
  [/τ/g, '\\tau'],
  [/η/g, '\\eta'],
  [/κ/g, '\\kappa'],
  [/λ/g, '\\lambda'],
  [/Λ/g, '\\Lambda'],
  [/Γ/g, '\\Gamma'],
  [/Θ/g, '\\Theta'],
  [/Ξ/g, '\\Xi'],
  [/Υ/g, '\\Upsilon'],
  [/γ/g, '\\gamma'],
  [/β/g, '\\beta'],
  [/α/g, '\\alpha'],
  [/θ/g, '\\theta'],
  [/φ/g, '\\phi'],
  [/χ/g, '\\chi'],
  [/ψ/g, '\\psi'],
  [/Ψ/g, '\\Psi'],
  [/δ/g, '\\delta'],
  [/Δ/g, '\\Delta'],
  [/Φ/g, '\\Phi'],
  [/ν/g, '\\nu'],
  [/ζ/g, '\\zeta'],
  [/ξ/g, '\\xi'],
  [/ᵀ/g, '^T'],
  [/†/g, '^\\dagger'],
  [/☉/g, '\\odot'],
];

function collapseScriptRuns(value: string, table: Record<string, string>, marker: '^' | '_') {
  const chars = Object.keys(table).join('');
  return value.replace(new RegExp(`[${chars}]+`, 'g'), (match) => {
    const body = [...match].map((char) => table[char] ?? char).join('');
    return `${marker}{${body}}`;
  });
}

// Combining marks written after a letter (r̂, x̄, ẋ, A⃗) become accents on it.
const combiningAccents: Array<[string, string]> = [
  ['\u0302', 'hat'],
  ['\u0303', 'tilde'],
  ['\u0304', 'bar'],
  ['\u0305', 'bar'],
  ['\u0307', 'dot'],
  ['\u0308', 'ddot'],
  ['\u20d7', 'vec'],
];

// "^(…)", "_(…)" and "√(…)" written in plain text become ^{…}, _{…} and
// \sqrt{…}, matching parentheses properly so nested groups like
// e^(−1/(N(0)V)) and √(m/(μ₀n_s e²)) keep their whole argument.
function braceParenGroups(value: string) {
  const openers = /(\^|_|\\sqrt ?)\(/g;
  let out = '';
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = openers.exec(value))) {
    let depth = 1;
    let i = match.index + match[0].length;
    for (; i < value.length && depth > 0; i += 1) {
      if (value[i] === '(') depth += 1;
      else if (value[i] === ')') depth -= 1;
    }
    if (depth !== 0) continue; // unbalanced: leave it alone
    const inner = value.slice(match.index + match[0].length, i - 1);
    const op = match[1].startsWith('\\') ? '\\sqrt' : match[1];
    out += value.slice(last, match.index) + `${op}{${braceParenGroups(inner)}}`;
    last = i;
    openers.lastIndex = i;
  }
  return out + value.slice(last);
}

export function plainTextToLatex(value: string) {
  // NFD splits precomposed letters (ŷ, ẋ) into base + combining mark so the
  // accent pass below sees them; it leaves ordinary symbols alone.
  let latex = value.trim().normalize('NFD');
  latex = latex.replace(/([⁰¹²³⁴⁵⁶⁷⁸⁹])·(?=[⁰¹²³⁴⁵⁶⁷⁸⁹])/gu, '$1\uE000');
  for (const [pattern, replacement] of replacements) {
    // A control word like \cdot swallows the letter after it (\cdotr is an
    // unknown command), so commands that end in a letter get a trailing space.
    // Only add it where a letter or digit actually follows, so the author's own
    // spacing isn't doubled into a \quad by the spacing rules below.
    latex = /\\[A-Za-z]+$/.test(replacement)
      ? latex.replace(pattern, (match, ...rest) => {
          const offset = rest[rest.length - 2] as number;
          const next = latex[offset + match.length] ?? '';
          return /[A-Za-z0-9]/.test(next) ? `${replacement} ` : replacement;
        })
      : latex.replace(pattern, replacement);
  }
  for (const [mark, accent] of combiningAccents) {
    latex = latex.replace(
      new RegExp(`(\\\\[A-Za-z]+ ?|[A-Za-z0-9])${mark}`, 'g'),
      (_, base: string) => `\\${accent}{${base.trim()}}`,
    );
  }
  latex = braceParenGroups(latex);
  latex = latex
    .replace(/(^|[^\\A-Za-z])(sin|cos|tan|sinh|cosh|tanh|exp|ln|log|det)(?![A-Za-z])/g, '$1\\$2');
  // Brace a written subscript first, keeping any Unicode subscripts inside it,
  // so m_O₂ becomes m_{O_{2}} rather than the invalid double subscript m_O_{2}.
  // The base can be a letter, digit, command (\tau_KH) or closing bracket (|_rad).
  latex = latex.replace(/(\\[A-Za-z]+|[A-Za-z0-9|)\]}])_([A-Za-z0-9₀₁₂₃₄₅₆₇₈₉ₐₑᵢⱼₖₗₘₙₚᵣₛₜᵤᵥₓ]+)/gu, '$1_{$2}');
  latex = collapseScriptRuns(latex, superscripts, '^');
  latex = collapseScriptRuns(latex, subscripts, '_');
  latex = latex
    // Word subscripts (W_net, E_kin) are labels, set upright rather than as a product of variables.
    .replace(/_\{([a-z]{3,})\}/g, '_{\\text{$1}}')
    .replace(/\s{3,}/g, ' \\qquad ')
    .replace(/\s{2}/g, ' \\quad ');
  // Recompose anything the accent pass didn't handle (≠, Å) back into the
  // single characters KaTeX understands.
  return latex.normalize('NFC');
}

function renderLatex(value: string, displayMode = false) {
  return katex.renderToString(value, {
    displayMode,
    throwOnError: false,
    strict: false,
  });
}

function MathMarkup({ latex, displayMode = false }: { latex: string; displayMode?: boolean }) {
  return (
    <span dangerouslySetInnerHTML={{ __html: renderLatex(latex, displayMode) }} />
  );
}

function textFromChildren(children: React.ReactNode) {
  if (typeof children === 'string' || typeof children === 'number') return String(children);
  if (Array.isArray(children) && children.every((child) => typeof child === 'string' || typeof child === 'number')) {
    return children.join('');
  }
  return null;
}

function equationContent(children: React.ReactNode, latex?: string) {
  if (latex) return <MathMarkup latex={latex} displayMode />;
  const text = textFromChildren(children);
  if (text) return <MathMarkup latex={plainTextToLatex(text)} displayMode />;
  return children;
}

export function InlineMath({ latex }: { latex: string }) {
  return (
    <span
      className="inline-math"
      dangerouslySetInnerHTML={{ __html: renderLatex(latex) }}
    />
  );
}

export function Eq({ children, latex }: { children?: React.ReactNode; latex?: string }) {
  return (
    <div className="eq">
      {equationContent(children, latex)}
    </div>
  );
}

export function EqNumbered({ number, children, latex }: { number: string; children?: React.ReactNode; latex?: string }) {
  return (
    <div className="eq eq-numbered">
      <span className="eq-content">
        {equationContent(children, latex)}
      </span>
      <span className="eq-number">({number})</span>
    </div>
  );
}
