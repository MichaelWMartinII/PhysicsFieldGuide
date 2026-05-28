import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function DifferentialEquationsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#06b6d4' }}>Mathematics for Physics · Chapter 23</div>
      <h1>Differential Equations</h1>
      <p className="subtitle">
        Physics equations are almost always differential equations — relations between a function
        and its derivatives. Knowing how to solve them is knowing how to solve physics.
      </p>

      <Prerequisites items={['Calculus essentials (Ch. 22)', 'Vectors (Ch. 21)', 'Simple harmonic motion (Ch. 9) provides physical motivation']} />

      <LearningGoals items={[
        'Solve first-order linear ODEs using the integrating factor method.',
        'Solve second-order ODEs with constant coefficients by finding roots of the characteristic equation.',
        'Classify damped oscillators as underdamped, overdamped, or critically damped from their parameters.',
        'Find the steady-state amplitude of a driven oscillator and identify the resonance condition.',
        'Use separation of variables to solve first-order separable ODEs and apply initial conditions.',
      ]} />

      <h2>23.1 What Is a Differential Equation?</h2>

      <p>
        A <strong>differential equation</strong> (DE) is an equation involving an unknown function
        and one or more of its derivatives. The <strong>order</strong> is the highest derivative
        that appears. An <strong>ordinary</strong> DE (ODE) has one independent variable; a
        <strong>partial</strong> DE (PDE) has multiple.
      </p>

      <p>
        Every fundamental law of physics is a differential equation. Newton&apos;s second law:
        m d²x/dt² = F(x,t). Faraday&apos;s law: ∂B/∂t = −∇×E. Schrödinger&apos;s equation:
        iℏ ∂ψ/∂t = Ĥψ. Solving these equations — finding the function x(t) or ψ(x,t)
        consistent with initial conditions — is the central technical task of theoretical physics.
      </p>

      <h2>23.2 First-Order Linear ODEs</h2>

      <Definition number="23.1" title="First-Order Linear ODE">
        Standard form: dy/dx + P(x)y = Q(x).
        The general solution uses an <strong>integrating factor</strong> μ(x) = exp(∫P dx):
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          d/dx[μ(x) y] = μ(x) Q(x) &nbsp;&nbsp;→&nbsp;&nbsp; y = (1/μ) ∫ μQ dx + C/μ
        </span>
      </Definition>

      <p>
        The most important first-order ODE in physics is exponential growth/decay:
        dy/dt = ky. Its solution is y = y₀ eᵏᵗ. For k {'<'} 0 (decay):
        radioactive decay (N = N₀ e^(−t/τ)), capacitor discharge (q = q₀ e^(−t/RC)),
        Newton&apos;s law of cooling (ΔT = ΔT₀ e^(−kt)).
      </p>

      <WorkedExample number="23.1" title="RC Circuit — Capacitor Charging">
        <p>
          A capacitor (capacitance C) charges through a resistor R from a battery of EMF ε.
          The loop equation gives ε = IR + q/C, with I = dq/dt. Solve for q(t).
        </p>
        <Step label="Rewrite:">dq/dt + q/(RC) = ε/R &nbsp; (first-order linear ODE)</Step>
        <Step label="Integrating factor:">μ = e^(t/RC)</Step>
        <Step label="Multiply through:">d/dt[q e^(t/RC)] = (ε/R) e^(t/RC)</Step>
        <Step label="Integrate:">q e^(t/RC) = Cε e^(t/RC) + A → q(t) = Cε + A e^(−t/RC)</Step>
        <Step label="Initial condition:">q(0) = 0 → A = −Cε → q(t) = Cε(1 − e^(−t/RC))</Step>
        <Step label="Result:">q(t) = Cε(1 − e^(−t/τ)) where τ = RC is the time constant. ✓</Step>
      </WorkedExample>

      <h2>23.3 Second-Order Linear ODEs with Constant Coefficients</h2>

      <p>
        The equation m ẍ + b ẋ + kx = F(t) governs every oscillating system in physics:
        springs, LC circuits, pendulums, sound resonators. The general approach:
        try the ansatz x = e^(rt), substitute, and solve the <strong>characteristic equation</strong>.
      </p>

      <Definition number="23.2" title="Characteristic Equation">
        For ay'' + by' + cy = 0, substitute y = e^(rt):
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.4rem', fontStyle: 'italic' }}>
          ar² + br + c = 0 &nbsp;&nbsp;&nbsp; (characteristic equation)
        </span>
        <span style={{ display: 'block', marginTop: '0.5rem' }}>
          Roots r₁, r₂ determine the solution type:
        </span>
        <span style={{ display: 'block', marginTop: '0.3rem' }}>
          Real distinct (b² {'>'} 4ac): y = C₁ e^(r₁t) + C₂ e^(r₂t) &nbsp;(overdamped)
        </span>
        <span style={{ display: 'block' }}>
          Complex (b² {'<'} 4ac): r = α ± iω → y = e^(αt)(C₁ cos ωt + C₂ sin ωt) &nbsp;(underdamped)
        </span>
        <span style={{ display: 'block' }}>
          Repeated (b² = 4ac): y = (C₁ + C₂t) e^(rt) &nbsp;(critically damped)
        </span>
      </Definition>

      <WorkedExample number="23.2" title="Simple Harmonic Oscillator">
        <p>
          Solve m ẍ + kx = 0 with initial conditions x(0) = A, ẋ(0) = 0.
        </p>
        <Step label="Characteristic equation:">mr² + k = 0 → r² = −k/m → r = ±i√(k/m) = ±iω₀</Step>
        <Step label="General solution:">x(t) = C₁ cos(ω₀t) + C₂ sin(ω₀t), &nbsp; ω₀ = √(k/m)</Step>
        <Step label="Apply x(0) = A:">C₁ = A</Step>
        <Step label="Apply ẋ(0) = 0:">ẋ = −Aω₀ sin(ω₀t) + C₂ω₀ cos(ω₀t). At t=0: C₂ω₀ = 0 → C₂ = 0</Step>
        <Step label="Result:">x(t) = A cos(ω₀t) — pure cosine, as expected for release from rest. ✓</Step>
      </WorkedExample>

      <WorkedExample number="23.3" title="Damped Oscillator">
        <p>
          Solve mẍ + bẋ + kx = 0 for the underdamped case (b² {'<'} 4mk).
        </p>
        <Step label="Characteristic equation:">mr² + br + k = 0 → r = [−b ± √(b²−4mk)] / 2m</Step>
        <Step label="Underdamped:">b² {'<'} 4mk → √(b²−4mk) is imaginary → r = −γ ± iω_d</Step>
        <Step label="Define:">γ = b/(2m) (decay rate), &nbsp; ω_d = √(k/m − γ²) = √(ω₀² − γ²) (damped frequency)</Step>
        <Step label="Solution:">x(t) = e^(−γt) (C₁ cos ω_d t + C₂ sin ω_d t) = A e^(−γt) cos(ω_d t + φ)</Step>
        <Step label="Physics:">An exponentially decaying envelope × oscillation. Amplitude halves every t₁/₂ = ln2/γ.</Step>
      </WorkedExample>

      <h2>23.4 Particular Solutions and Resonance</h2>

      <p>
        For a driven oscillator mẍ + bẋ + kx = F₀ cos(ωt), the <strong>particular solution</strong>
        (steady-state response) has the form x_p = X cos(ωt − δ), where the amplitude is:
      </p>

      <EqNumbered number="23.1">X = F₀ / √[(k−mω²)² + (bω)²]</EqNumbered>

      <p>
        This is maximum when the driving frequency ω equals the natural frequency ω₀ = √(k/m)
        — this is <strong>resonance</strong>. At resonance (weak damping), the amplitude grows
        enormously: X_res = F₀/(bω₀). The quality factor Q = mω₀/b measures the sharpness
        of resonance — high Q means narrow, tall peak; low Q means broad, flat response.
      </p>

      <p>
        Resonance is why bridges can be destroyed by rhythmic marching (Angers Bridge, 1850),
        why wine glasses shatter at their resonant frequency, and why MRI machines work
        (nuclear magnetic resonance). The mathematics is identical in all cases.
      </p>

      <h2>23.5 Separation of Variables</h2>

      <p>
        Many first-order ODEs can be solved by separating the variables:
      </p>

      <Definition number="23.3" title="Separation of Variables">
        If dy/dx = f(x)g(y), rewrite as dy/g(y) = f(x)dx, then integrate both sides:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.4rem', fontStyle: 'italic' }}>
          ∫ dy/g(y) = ∫ f(x) dx + C
        </span>
        This directly yields y as a function of x (or implicitly). Works whenever the equation
        is separable — the right-hand side factors into a function of x times a function of y.
      </Definition>

      <WorkedExample number="23.4" title="Radioactive Decay">
        <p>
          Carbon-14 decays with half-life t₁/₂ = 5730 years. A bone sample contains 30% of
          the original C-14. Find its age.
        </p>
        <Step label="ODE:">dN/dt = −λN, where λ = ln2/t₁/₂ = ln2/5730 yr⁻¹</Step>
        <Step label="Separate:">dN/N = −λ dt → ∫dN/N = −λ∫dt → ln N = −λt + const</Step>
        <Step label="Solution:">N(t) = N₀ e^(−λt)</Step>
        <Step label="Apply N/N₀ = 0.30:">0.30 = e^(−λt) → −λt = ln(0.30) = −1.204</Step>
        <Step label="Age:">t = 1.204/λ = 1.204 × 5730/ln2 = 1.204 × 8267 = <strong>9,950 years</strong></Step>
      </WorkedExample>

      <Definition number="23.4" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>General solutions need constants:</strong> initial or boundary conditions choose the physical solution.</li>
          <li><strong>Homogeneous and particular parts both matter:</strong> driven systems need the forced response.</li>
          <li><strong>Stability comes from eigenvalues:</strong> signs and real parts determine growth or decay.</li>
          <li><strong>Separation is not always valid:</strong> only separable equations allow variables to be split cleanly.</li>
        </ul>
      </Definition>

      <PracticeProblems section="23.1–23.5 Differential Equations">
        <InteractiveProblem n={1} difficulty="easy"
          answer={9950} unit="years" tolerance={0.02}
          hints={['N = N₀ e^(−λt). λ = ln2/t₁/₂. Solve for t when N/N₀ = 0.30.']}
          problemText="C-14 half-life 5730 yr. Sample has 30% remaining. Find age (years)."
          solution={<>t = ln(0.30)/[−ln2/5730] = 1.204×8267 = <strong>9950 yr</strong></>}>
          A sample retains 30% of its original C-14 (half-life 5730 years). Find its age.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={6.32} unit="rad/s" tolerance={0.02}
          hints={['ω₀ = √(k/m). Plug in k = 400 N/m, m = 10 kg.']}
          problemText="Spring k=400 N/m, mass m=10 kg. Find ω₀ (rad/s)."
          solution={<>ω₀ = √(400/10) = √40 = <strong>6.32 rad/s</strong></>}>
          A mass–spring system has k = 400 N/m and m = 10 kg. Find the angular frequency ω₀.
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={0.632} unit="" tolerance={0.01}
          hints={['q(t) = Cε(1−e^(−t/RC)). At t=RC: q/Cε = 1−e^(−1).']}
          problemText="RC circuit: at t=RC (one time constant), find q/Cε (fraction of max charge)."
          solution={<>q/(Cε) = 1−e^(−1) = 1−0.368 = <strong>0.632</strong></>}>
          At t = RC (one time constant), what fraction of the maximum charge has a capacitor accumulated?
        </InteractiveProblem>

        <Problem n={4} difficulty="medium"
          solution={<>mẍ + bẋ + kx = 0. b² vs 4mk: (a) b=0.5, 4mk=4×1×4=16 → b²=0.25 {'<'} 16 → underdamped. γ=b/2m=0.25, ω_d=√(4−0.0625)=√3.9375=1.984 rad/s. x(t)=Ae^(−0.25t)cos(1.984t+φ). (b) b=4, b²=16=4mk → critically damped. x(t)=(C₁+C₂t)e^(−2t). (c) b=10, b²=100 {'>'} 16 → overdamped. r=[−10±√(100−16)]/2=[−10±9.17]/2 → r₁=−0.42, r₂=−9.58. x=C₁e^(−0.42t)+C₂e^(−9.58t).</>}>
          A spring-mass system has m=1 kg, k=4 N/m. Classify and solve for x(t) for: (a) b=0.5, (b) b=4, (c) b=10 N·s/m.
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>Resonance in a driven oscillator: X(ω) = F₀/√[(k−mω²)²+(bω)²]. Maximum when d(denom²)/dω = 0: derivative gives ω_res = √(k/m − b²/2m²) = √(ω₀² − 2γ²). For small damping (γ ≪ ω₀): ω_res ≈ ω₀ = √(k/m). At resonance: X_res = F₀/(bω₀). Quality factor Q = mω₀/b = ω₀/(2γ) = peak frequency / bandwidth. High Q: sharp resonance (musical instruments, lasers, atomic transitions). Low Q: broad response (shock absorbers, mechanical filters). Half-power bandwidth: Δω = ω₀/Q.</>}>
          Derive the steady-state amplitude X(ω) for a driven oscillator mẍ+bẋ+kx = F₀cos(ωt). At what frequency is X maximum? Define the quality factor Q and explain its physical meaning.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'A differential equation relates a function to its derivatives; every physics law is a DE.',
        'Exponential growth/decay (dy/dt = ky → y = y₀eᵏᵗ) governs radioactive decay, RC circuits, cooling.',
        'Characteristic equation (ar²+br+c=0) classifies oscillators: underdamped (complex roots), overdamped (real distinct), critical (repeated).',
        'Simple harmonic oscillator: x(t) = A cos(ω₀t+φ), ω₀ = √(k/m).',
        'Damped oscillator: x(t) = Ae^(−γt)cos(ω_d t+φ) — exponentially decaying amplitude.',
        'Resonance at ω ≈ ω₀: amplitude diverges as damping → 0. Quality factor Q = ω₀/Δω.',
      ]} />
    </div>
  );
}
