import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function CalculusPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#06b6d4' }}>Mathematics for Physics · Chapter 22</div>
      <h1>Calculus Essentials</h1>
      <p className="subtitle">
        Calculus is the mathematics of change and accumulation. Every equation of motion,
        every field law, every thermodynamic relation in this curriculum is written in the language of calculus.
      </p>

      <Prerequisites items={['Algebraic manipulation', 'Functions and graphs', 'Basic trigonometry']} />

      <LearningGoals items={[
        'Interpret derivatives as instantaneous rates of change and connect position, velocity, and acceleration.',
        'Apply standard derivative rules including the product rule and chain rule.',
        'Interpret definite integrals as accumulated quantities and use the Fundamental Theorem of Calculus.',
        'Choose substitution or integration by parts for common physics integrals.',
        'Read partial derivative notation and explain what variables are held fixed.',
      ]} />

      <h2>22.1 The Derivative</h2>

      <p>
        The <strong>derivative</strong> of a function f(x) at a point x measures the instantaneous
        rate of change — the slope of the tangent line. It is defined as the limit of the
        difference quotient:
      </p>

      <EqNumbered number="22.1">f&apos;(x) = df/dx = lim_(h→0) [f(x+h) − f(x)] / h</EqNumbered>

      <p>
        In physics, the most common derivative is with respect to time. If x(t) is position,
        then ẋ = dx/dt is velocity, and ẍ = d²x/dt² is acceleration. Newton&apos;s second law
        F = ma is F = m d²x/dt² — a differential equation.
      </p>

      <Theorem number="22.1" title="Standard Derivatives">
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.9rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem 2rem', marginTop: '0.4rem' }}>
          {[
            ['d/dx [xⁿ]', 'nxⁿ⁻¹'],
            ['d/dx [eˣ]', 'eˣ'],
            ['d/dx [ln x]', '1/x'],
            ['d/dx [sin x]', 'cos x'],
            ['d/dx [cos x]', '−sin x'],
            ['d/dx [cf(x)]', 'c f\'(x)'],
            ['d/dx [f·g]', 'f\'g + fg\'  (product rule)'],
            ['d/dx [f(g(x))]', 'f\'(g)·g\'  (chain rule)'],
          ].map(([lhs, rhs]) => (
            <>
              <span key={lhs} style={{ color: 'var(--text)', fontStyle: 'italic' }}>{lhs} =</span>
              <span key={rhs} style={{ color: 'var(--text-strong)', fontStyle: 'italic' }}>{rhs}</span>
            </>
          ))}
        </div>
      </Theorem>

      <WorkedExample number="22.1" title="Velocity and Acceleration from Position">
        <p>
          A particle&apos;s position is x(t) = 3t³ − 12t² + 9t + 2. Find its velocity and acceleration,
          and determine when it is momentarily at rest.
        </p>
        <Step label="Velocity:">v(t) = dx/dt = 9t² − 24t + 9</Step>
        <Step label="Acceleration:">a(t) = dv/dt = 18t − 24</Step>
        <Step label="At rest (v=0):">9t² − 24t + 9 = 0 → t² − (8/3)t + 1 = 0 → t = [8/3 ± √(64/9 − 4)]/2</Step>
        <Step label="Solve:">t = [8/3 ± √(28/9)]/2 = (8 ± √28)/(6) → t ≈ 0.45 s and t ≈ 2.22 s</Step>
      </WorkedExample>

      <h2>22.2 The Integral</h2>

      <p>
        The <strong>integral</strong> is the inverse of the derivative and measures accumulation.
        The definite integral ∫_a^b f(x) dx gives the area under f(x) from a to b, and by the
        <strong>Fundamental Theorem of Calculus</strong>:
      </p>

      <EqNumbered number="22.2">∫_a^b f(x) dx = F(b) − F(a) &nbsp;&nbsp;&nbsp; where F&apos;(x) = f(x)</EqNumbered>

      <p>
        F is the <strong>antiderivative</strong>. The indefinite integral ∫f(x)dx = F(x) + C
        finds the family of antiderivatives. In physics, integrating velocity gives displacement:
        x = ∫v dt; integrating force gives work: W = ∫F·dx; integrating power gives energy.
      </p>

      <Theorem number="22.2" title="Standard Antiderivatives">
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.9rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem 2rem', marginTop: '0.4rem' }}>
          {[
            ['∫ xⁿ dx (n≠−1)', 'xⁿ⁺¹/(n+1) + C'],
            ['∫ eˣ dx', 'eˣ + C'],
            ['∫ 1/x dx', 'ln|x| + C'],
            ['∫ sin x dx', '−cos x + C'],
            ['∫ cos x dx', 'sin x + C'],
            ['∫ eᵃˣ dx', 'eᵃˣ/a + C'],
            ['∫ 1/√(1−x²) dx', 'arcsin x + C'],
            ['∫ 1/(1+x²) dx', 'arctan x + C'],
          ].map(([lhs, rhs]) => (
            <>
              <span key={lhs} style={{ color: 'var(--text)', fontStyle: 'italic' }}>{lhs} =</span>
              <span key={rhs} style={{ color: 'var(--text-strong)', fontStyle: 'italic' }}>{rhs}</span>
            </>
          ))}
        </div>
      </Theorem>

      <WorkedExample number="22.2" title="Work Done by a Variable Force">
        <p>
          A spring exerts force F(x) = −kx (Hooke&apos;s law). Find the work done compressing it
          from x = 0 to x = A (amplitude).
        </p>
        <Step label="Work integral:">W = ∫₀^A F dx = ∫₀^A kx dx &nbsp; (we push with +kx against the spring)</Step>
        <Step label="Integrate:">W = k [x²/2]₀^A = kA²/2</Step>
        <Step label="Result:">W = ½kA² — this is exactly the elastic potential energy stored in the spring. ✓</Step>
      </WorkedExample>

      <h2>22.3 Techniques of Integration</h2>

      <p>
        Three techniques cover most physics integrals:
      </p>

      <Definition number="22.1" title="Substitution (u-substitution)">
        If the integrand contains f(g(x))·g&apos;(x), let u = g(x), du = g&apos;(x)dx:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.4rem', fontStyle: 'italic' }}>
          ∫ f(g(x)) g&apos;(x) dx = ∫ f(u) du
        </span>
        Example: ∫ 2x·sin(x²) dx → let u = x², du = 2x dx → ∫ sin u du = −cos(x²) + C
      </Definition>

      <Definition number="22.2" title="Integration by Parts">
        Derived from the product rule: d(uv) = u dv + v du → ∫u dv = uv − ∫v du.
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.4rem', fontStyle: 'italic' }}>
          ∫ u dv = uv − ∫ v du
        </span>
        Choose u to be the factor that simplifies when differentiated; dv = the remainder.
        Example: ∫ t·eᵃᵗ dt — let u = t, dv = eᵃᵗ dt → te^(at)/a − ∫ eᵃᵗ/a dt = (t/a − 1/a²)eᵃᵗ + C
      </Definition>

      <WorkedExample number="22.3" title="Moment of Inertia by Integration">
        <p>
          Find the moment of inertia of a uniform thin rod of mass M and length L about its center.
        </p>
        <Step label="Setup:">I = ∫ r² dm. Linear mass density: λ = M/L, so dm = λ dx = (M/L) dx</Step>
        <Step label="Limits:">Rod extends from x = −L/2 to x = +L/2</Step>
        <Step label="Integrate:">I = ∫ from −L/2 to L/2 of x²(M/L) dx = (M/L) [x³/3] evaluated from −L/2 to L/2</Step>
        <Step label="Evaluate:">I = (M/L) × (1/3)[(L/2)³ − (−L/2)³] = (M/L)(1/3)(L³/4) = <strong>ML²/12</strong></Step>
      </WorkedExample>

      <h2>22.4 Partial Derivatives and Gradients</h2>

      <p>
        When a function depends on multiple variables, the <strong>partial derivative</strong>
        ∂f/∂x treats all other variables as constants. The <strong>gradient</strong> vector
        collects all partial derivatives and points in the direction of steepest increase:
      </p>

      <EqNumbered number="22.3">∇f = (∂f/∂x) î + (∂f/∂y) ĵ + (∂f/∂z) k̂</EqNumbered>

      <p>
        In physics: electric field <strong>E</strong> = −∇V (gradient of potential); force from
        potential energy <strong>F</strong> = −∇U. The divergence ∇·<strong>E</strong> and curl
        ∇×<strong>B</strong> appear in Maxwell&apos;s equations, connecting all of electromagnetism.
      </p>

      <Definition number="22.3" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>A derivative is local rate of change:</strong> it is not always a constant slope.</li>
          <li><strong>Definite integrals accumulate signed area:</strong> negative regions subtract.</li>
          <li><strong>Use the chain rule with nested functions:</strong> missing inner derivatives is a common source of errors.</li>
          <li><strong>Partial derivatives hold other variables fixed:</strong> the constraint matters in physics formulas.</li>
        </ul>
      </Definition>

      <PracticeProblems section="22.1–22.4 Calculus">
        <InteractiveProblem n={1} difficulty="easy"
          answer={9} unit="" tolerance={0.01}
          hints={['Power rule: d/dx[xⁿ] = nxⁿ⁻¹. Evaluate at x=1.']}
          problemText="Find f'(1) where f(x) = 3x³ − 12x² + 9x + 2."
          solution={<>f&apos;(x) = 9x²−24x+9. f&apos;(1) = 9(1)²−24(1)+9 = <strong>−6</strong>.</>}>
          Find the derivative of f(x) = 3x³ − 12x² + 9x + 2 and evaluate it at x = 1.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={0.5} unit="kA²" tolerance={0.01}
          hints={['W = ∫₀^A kx dx = k[x²/2]₀^A']}
          problemText="Spring F=kx compressed to x=A. Find work in units of kA²."
          solution={<>W = k·A²/2 = <strong>0.5 kA²</strong></>}>
          Find the work done compressing a spring (F = kx) from x = 0 to x = A. Express as a multiple of kA².
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={0.0833} unit="ML²" tolerance={0.02}
          hints={['I = (M/L)∫x²dx from −L/2 to L/2. Result is ML²/12.']}
          problemText="Moment of inertia of thin rod about center. Find I in units of ML²."
          solution={<>I = ML²/12 ≈ <strong>0.0833 ML²</strong></>}>
          A uniform rod (mass M, length L) rotates about its center. Find its moment of inertia I.
        </InteractiveProblem>

        <Problem n={4} difficulty="medium"
          solution={<>∫₀^π x sin x dx. Integration by parts: u = x, dv = sin x dx → du = dx, v = −cos x. = [−x cos x]₀^π + ∫₀^π cos x dx = (−π cos π + 0) + [sin x]₀^π = −π(−1) + (0−0) = π.</>}>
          Evaluate ∫₀^π x sin x dx using integration by parts.
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>The gravitational field of a uniform sphere of mass M at exterior point r {'>'} R: by the shell theorem (proved by Newton, derivable by Gauss&apos;s law analogue), all shells contribute as if their mass is at the center: g = −GM/r² r̂. For r {'<'} R (interior): only the mass enclosed M_enc = M(r/R)³ contributes → g = −GMr/R³ r̂ (linear in r — like a harmonic oscillator!). At the center: g = 0 by symmetry. Proof uses ∫₀^R 4πr²ρ dr = M for uniform density ρ = 3M/(4πR³).</>}>
          Derive the gravitational field g(r) both inside and outside a uniform solid sphere of mass M and radius R. At what radius is g maximum?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Derivative f\'(x) = lim[f(x+h)−f(x)]/h — instantaneous rate of change; slope of tangent.',
        'Fundamental theorem: ∫_a^b f dx = F(b) − F(a), linking differentiation and integration.',
        'Power rule, chain rule, product rule — these three handle 90% of physics derivatives.',
        'Standard techniques: u-substitution reverses chain rule; integration by parts reverses product rule.',
        'Partial derivatives treat other variables as constants; the gradient ∇f points toward steepest increase.',
        'E = −∇V and F = −∇U connect field equations to potential — calculus is the bridge.',
      ]} />
    </div>
  );
}
