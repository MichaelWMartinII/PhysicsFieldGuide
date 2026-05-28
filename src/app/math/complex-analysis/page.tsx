import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function ComplexAnalysisPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#06b6d4' }}>Mathematics · Upper Division</div>
      <h1>Complex Analysis</h1>
      <p className="subtitle">
        Complex analysis is the most powerful tool in a physicist&apos;s mathematical arsenal.
        Contour integration evaluates impossible-looking real integrals; conformal maps solve
        2D electrostatics; analytic continuation ties together special functions.
      </p>

      <Prerequisites items={['Calculus (Ch. 22)', 'Differential equations (Ch. 23)', 'Basic complex numbers']} />

      <LearningGoals items={[
        'Verify analyticity using the Cauchy-Riemann equations and identify poles, branch cuts, and essential singularities.',
        'Apply the residue theorem to evaluate real integrals by closing a contour in the complex plane.',
        'Compute residues at simple and higher-order poles using the limit formula.',
        'Derive the Kramers-Kronig relations from causality and explain why they connect absorption to dispersion.',
        'Use Laurent series to classify singularities and extract the residue from the coefficient of (z−z₀)⁻¹.',
      ]} />

      <h2>CA.1 Analytic Functions and the Cauchy-Riemann Equations</h2>

      <p>
        A function f(z) = u(x,y) + iv(x,y) is <strong>analytic</strong> (holomorphic) at a
        point if it is complex-differentiable in a neighborhood. The necessary and sufficient
        condition is the <strong>Cauchy-Riemann equations</strong>:
      </p>

      <EqNumbered number="CA.1">∂u/∂x = ∂v/∂y &nbsp;&nbsp;&nbsp;&nbsp; ∂u/∂y = −∂v/∂x &nbsp;&nbsp;&nbsp; (Cauchy-Riemann)</EqNumbered>

      <p>
        Analytic functions are remarkable: they are infinitely differentiable, their real and
        imaginary parts are both harmonic (∇²u = ∇²v = 0), and they define
        <strong> conformal maps</strong> — angle-preserving transformations. Conformal maps
        reduce Laplace&apos;s equation in complicated domains to simple ones.
      </p>

      <p>
        Key analytic functions and their singularities:
        e^z (entire), sin z (entire), 1/z (simple pole at z=0), ln z (branch cut),
        z^(1/2) (branch point), 1/(z²+1) (poles at ±i).
      </p>

      <h2>CA.2 The Residue Theorem</h2>

      <Theorem number="CA.1" title="Cauchy's Residue Theorem">
        For a function f(z) analytic inside and on a closed contour C except at isolated
        singularities z₁, z₂, ..., zₙ:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          ∮_C f(z) dz = 2πi Σₖ Res(f, zₖ)
        </span>
        where the residue at a simple pole z₀ is Res(f, z₀) = lim(z→z₀) (z−z₀)f(z).
        For a pole of order n: Res(f, z₀) = (1/(n−1)!) lim(z→z₀) d^(n−1)/dz^(n−1) [(z−z₀)ⁿf(z)].
      </Theorem>

      <p>
        The residue theorem converts contour integrals (around closed paths in ℂ) into
        a sum of local quantities (residues) — a spectacular global-from-local result.
      </p>

      <WorkedExample number="CA.1" title="Evaluating a Real Integral by Contour Integration">
        <p>
          Evaluate I = ∫(−∞ to ∞) dx/(1+x⁴).
        </p>
        <Step label="Poles of 1/(1+z⁴):">z⁴ = −1 = e^(iπ) → z = e^(iπ/4), e^(i3π/4), e^(i5π/4), e^(i7π/4). Upper half-plane poles: z₁ = e^(iπ/4) = (1+i)/√2, z₂ = e^(i3π/4) = (−1+i)/√2.</Step>
        <Step label="Close contour:">Take semicircle in upper half-plane. As R→∞, the arc contribution → 0 (Jordan&apos;s lemma: |z⁻⁴| → 0 fast enough).</Step>
        <Step label="Residue at z₁:">Res(z₁) = 1/(4z₁³) = z₁/(4z₁⁴) = z₁/(4×(−1)) = −z₁/4 = −(1+i)/(4√2).</Step>
        <Step label="Residue at z₂:">Res(z₂) = −z₂/4 = (1−i)/(4√2).</Step>
        <Step label="Sum of residues:">Σ Res = [−(1+i) + (1−i)]/(4√2) = −2i/(4√2) = −i/(2√2).</Step>
        <Step label="Result:">I = 2πi × (−i/(2√2)) = π/√2. ✓ (Verify: ∫ dx/(1+x⁴) = π/(2sin(π/4)) × 1/2 = π/√2)</Step>
      </WorkedExample>

      <h2>CA.3 Dispersion Relations and Kramers-Kronig</h2>

      <p>
        In physics, causality forces the real and imaginary parts of a response function
        χ(ω) (susceptibility, refractive index, dielectric function) to be related by
        the <strong>Kramers-Kronig relations</strong>:
      </p>

      <EqNumbered number="CA.2">χ&apos;(ω) = (1/π) P ∫(−∞ to ∞) χ&apos;&apos;(ω&apos;)/(ω&apos;−ω) dω&apos; &nbsp;&nbsp;&nbsp;&nbsp; χ&apos;&apos;(ω) = −(1/π) P ∫ χ&apos;(ω&apos;)/(ω&apos;−ω) dω&apos;</EqNumbered>

      <p>
        Here P denotes the Cauchy principal value, and χ = χ&apos; + iχ&apos;&apos;. These follow from
        analyticity of χ(ω) in the upper half-plane (causality) and Jordan&apos;s lemma via the
        residue theorem. The relations connect absorption (Im part, χ&apos;&apos;) to dispersion (Re
        part, χ&apos;) — you can measure one and compute the other.
      </p>

      <h2>CA.4 Laurent Series and Asymptotic Expansions</h2>

      <p>
        In an annular region around an isolated singularity z₀, any analytic function has a
        <strong>Laurent series</strong>:
      </p>

      <EqNumbered number="CA.3">f(z) = Σ(n=−∞ to ∞) aₙ (z−z₀)ⁿ &nbsp;&nbsp;&nbsp;&nbsp; a₋₁ = Res(f, z₀)</EqNumbered>

      <p>
        The residue is the coefficient of (z−z₀)^(−1). The <strong>principal part</strong>
        (negative powers) classifies singularities: finite number of negative powers → pole;
        infinitely many → essential singularity (e.g., e^(1/z) at z=0).
      </p>

      <p>
        For large |z|, functions often have useful asymptotic expansions (not necessarily
        convergent, but useful term-by-term). Example: the Gamma function satisfies
        <strong>Stirling&apos;s approximation</strong>:
      </p>

      <EqNumbered number="CA.4">ln Γ(z) ≈ (z − ½) ln z − z + ½ ln(2π) + 1/(12z) − ... &nbsp;&nbsp;&nbsp; (Stirling)</EqNumbered>

      <WorkedExample number="CA.2" title="Green's Function via Contour Integration">
        <p>
          Find the retarded Green&apos;s function for the harmonic oscillator: (d²/dt² + ω₀²)G(t) = δ(t).
        </p>
        <Step label="Fourier transform:">G̃(ω) = −1/(ω² − ω₀²). Poles at ω = ±ω₀.</Step>
        <Step label="Retarded condition:">Shift poles below real axis: ω → ω ± iε. G_ret(ω) = −1/((ω+iε)²−ω₀²).</Step>
        <Step label="Inverse transform:">G(t) = (1/2π) ∫ G̃(ω) e^(−iωt) dω.</Step>
        <Step label="For t &gt; 0:">Close in lower half-plane. Both poles now inside. Sum residues: G(t) = (1/ω₀) sin(ω₀t) for t &gt; 0.</Step>
        <Step label="For t &lt; 0:">Close in upper half-plane. No poles inside. G(t) = 0 for t &lt; 0 (causality).</Step>
        <Step label="Result:">G_ret(t) = θ(t) sin(ω₀t)/ω₀. The driven oscillator response — zero before the impulse, oscillates after.</Step>
      </WorkedExample>

      <Definition number="CA.1" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Analytic is stronger than differentiable on a line:</strong> complex differentiability constrains all directions.</li>
          <li><strong>Poles and branch points differ:</strong> only isolated poles have ordinary residues.</li>
          <li><strong>Contour orientation matters:</strong> reversing direction changes the sign of the integral.</li>
          <li><strong>Branch cuts are choices:</strong> physical results must be consistent across the chosen branch.</li>
        </ul>
      </Definition>

      <PracticeProblems section="CA.1–CA.4 Complex Analysis">
        <InteractiveProblem n={1} difficulty="easy"
          answer={2.221} unit="" tolerance={0.02}
          hints={['∫₋∞^∞ dx/(1+x⁴) = π/√2. Compute π/√2.']}
          problemText="Evaluate ∫₋∞^∞ dx/(1+x⁴) using residues. Give the numerical value."
          solution={<>π/√2 = π/1.4142 = <strong>2.221</strong></>}>
          Using the residue theorem, evaluate the integral ∫₋∞^∞ dx/(1+x⁴).
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={1.5708} unit="" tolerance={0.02}
          hints={['∫₀^∞ sin(x)/x dx = π/2. Compute π/2 numerically.']}
          problemText="∫₀^∞ sin(x)/x dx equals π/2. Give the numerical value."
          solution={<>π/2 = <strong>1.5708</strong></>}>
          State the value of the Dirichlet integral ∫₀^∞ sin(x)/x dx and give its numerical value.
        </InteractiveProblem>

        <Problem n={3} difficulty="easy"
          solution={<>∫₀^∞ sin(x)/x dx = π/2. Method: consider f(z) = e^(iz)/z, integrate over semicircle with small indentation at z=0. ∮f dz = 0 (no poles enclosed). Break into: integral along real axis + small semicircle (−iπ Res at 0 = −iπ×1 = −iπ) + large arc (→0 by Jordan). So ∫₋∞^∞ e^(ix)/x dx = iπ (principal value). Taking imaginary part: 2∫₀^∞ sin(x)/x dx = π → result = π/2. This integral appears in signal processing (sinc function), Fourier analysis (Dirichlet kernel), and quantum scattering (Born approximation).</>}>
          Evaluate ∫₀^∞ sin(x)/x dx = π/2 using contour integration. Which contour do you use and why?
        </Problem>

        <Problem n={4} difficulty="medium"
          solution={<>Inverse Laplace transform: f(t) = L^{'-1'}{'{'}F(s){'}'} = (1/2πi)∫(c−i∞ to c+i∞) F(s)e^(st) ds (Bromwich integral). For F(s) = 1/(s²+ω²): poles at s = ±iω. For t&gt;0: close in left half-plane, both poles inside. Res at s=iω: e^(iωt)/(2iω). Res at s=−iω: e^(−iωt)/(−2iω). Sum: (e^(iωt)−e^(−iωt))/(2iω) = sin(ωt)/ω. For t&lt;0: close right, no poles, f=0. f(t) = θ(t)sin(ωt)/ω — same as Green&apos;s function result. The Bromwich integral is causally correct (c &gt; max Re(poles) keeps all poles to the left of integration line).</>}>
          Use the Bromwich contour (inverse Laplace transform) to find f(t) = L^(-1){'{'}1/(s²+ω²){'}'}. Compare to the Green&apos;s function result.
        </Problem>

        <Problem n={5} difficulty="medium"
          solution={<>Use the conformal map w = e^(πz/L), which maps the strip 0 &lt; Im z &lt; L to the upper half-plane. For electrostatics, solve ∇²φ=0 in the strip with φ=0 on Im z=0 and φ=V on Im z=L. In the w-plane, φ = V arg(w)/π. Mapping back gives arg(w) = Im(πz/L) = πy/L, so φ = Vy/L. Equipotentials are lines y=const; field lines are vertical x=const. For irregular geometries, Schwarz-Christoffel maps convert polygonal boundaries to simpler domains; fields concentrate near sharp corners, which explains lightning-rod behavior and the need for smooth high-voltage conductors.</>}>
          Use a conformal map to solve the electrostatic potential between two parallel conducting plates at φ=0 and φ=V. How does this generalize to irregular geometries?
        </Problem>

        <Problem n={6} difficulty="hard"
          solution={<>Gamma function: Γ(z) = ∫₀^∞ t^(z−1)e^(−t)dt (Re z &gt; 0). Analytic continuation: integrate by parts gives Γ(z+1)=zΓ(z). This extends to all z except z = 0,−1,−2,... (simple poles). Stirling from saddle point: Γ(n+1) = n! = ∫₀^∞ e^(n ln t − t) dt. Saddle at t*=n: expand ln(t) ≈ ln(n) + (t−n)/n − (t−n)²/(2n²). n! ≈ ∫₋∞^∞ e^(n ln n − n) e^(−(t−n)²/(2n)) dt = (n/e)^n √(2πn) — Stirling! Error in ln n!: exact − Stirling ≈ 1/(12n). Reflection formula: Γ(z)Γ(1−z) = π/sin(πz) — from residue computation. Gamma connects combinatorics (factorials), statistics (chi-squared distribution ∝ Γ(n/2)), and special functions (Bessel functions via Γ in their series).</>}>
          Derive Stirling&apos;s approximation for n! using the saddle-point method on the Gamma function integral. What is the reflection formula?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Cauchy-Riemann: ∂u/∂x = ∂v/∂y, ∂u/∂y = −∂v/∂x — analytic ↔ real/imaginary parts harmonic.',
        'Residue theorem: ∮f dz = 2πi Σ Res — converts integrals to sums of local residues.',
        'Real integrals via contour: close in upper or lower half-plane; Jordan&apos;s lemma kills the arc.',
        'Kramers-Kronig: causality forces Re(χ) and Im(χ) to be Hilbert transform pairs.',
        'Laurent series: a₋₁ = residue. Pole order from principal part; essential singularity has ∞ terms.',
        'Conformal maps preserve angles, reduce Laplace to simpler domains — key tool in 2D electrostatics.',
      ]} />
    </div>
  );
}
