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

export function plainTextToLatex(value: string) {
  let latex = value.trim();
  for (const [pattern, replacement] of replacements) {
    latex = latex.replace(pattern, replacement);
  }
  latex = collapseScriptRuns(latex, superscripts, '^');
  latex = collapseScriptRuns(latex, subscripts, '_');
  latex = latex
    .replace(/\^\(([^()]+)\)/g, '^{$1}')
    .replace(/_\(([^()]+)\)/g, '_{$1}')
    .replace(/\b([A-Za-z])_([A-Za-z0-9]+)\b/g, '$1_{$2}')
    .replace(/\s{3,}/g, ' \\qquad ')
    .replace(/\s{2}/g, ' \\quad ');
  return latex;
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
