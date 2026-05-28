import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function ChaosPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#3b82f6' }}>Classical Mechanics · Upper Division</div>
      <h1>Nonlinear Dynamics &amp; Chaos</h1>
      <p className="subtitle">
        Deterministic chaos — sensitivity to initial conditions in nonlinear systems — overturned
        classical determinism. A driven pendulum and three coupled ODEs can produce behavior
        as complex as any random process.
      </p>

      <Prerequisites items={['Differential equations (Ch. 23)', 'Lagrangian mechanics (Ch. L)', 'Phase space concept']} />

      <LearningGoals items={[
        'Classify fixed points of a 2D dynamical system using the eigenvalues of the Jacobian matrix.',
        'Explain limit cycles and apply the Van der Pol oscillator as a model of self-sustained oscillation.',
        'Identify saddle-node, Hopf, and period-doubling bifurcations from a bifurcation diagram.',
        'Compute the Lyapunov exponent and use it to diagnose chaotic behavior.',
        'Apply the Poincaré-Bendixson theorem to rule out chaos in 2D autonomous systems.',
      ]} />

      <h2>C.1 Flows and Fixed Points</h2>

      <p>
        A dynamical system dx/dt = f(x) defines a <strong>flow</strong> on phase space. The
        simplest behavior occurs at <strong>fixed points</strong> where f(x*) = 0.
        Linearizing near a fixed point x* with x = x* + ξ:
      </p>

      <EqNumbered number="C.1" latex="\frac{d\boldsymbol{\xi}}{dt}=J\boldsymbol{\xi} \qquad J_{ij}=\frac{\partial f_i}{\partial x_j} \qquad \text{(Jacobian matrix)}" />

      <p>
        The eigenvalues λ of J classify the fixed point:
      </p>

      <p>
        <strong>Stable node:</strong> Re(λ₁,₂) &lt; 0 — trajectories spiral or flow in.
        <br />
        <strong>Unstable node:</strong> Re(λ₁,₂) &gt; 0 — trajectories spiral or flow out.
        <br />
        <strong>Saddle:</strong> λ₁ &lt; 0 &lt; λ₂ — stable in one direction, unstable in another.
        <br />
        <strong>Center:</strong> Re(λ) = 0, Im(λ) ≠ 0 — closed orbits (Hamiltonian systems).
        <br />
        <strong>Spiral (focus):</strong> complex λ — spiraling in (stable) or out (unstable).
      </p>

      <h2>C.2 Limit Cycles and the Van der Pol Oscillator</h2>

      <p>
        A <strong>limit cycle</strong> is an isolated closed orbit — unlike the center
        (infinitely many nested closed orbits), a stable limit cycle attracts nearby
        trajectories. The <strong>Van der Pol oscillator</strong> is the canonical example:
      </p>

      <EqNumbered number="C.2" latex="\ddot{x}-\mu(1-x^2)\dot{x}+x=0 \qquad \text{(Van der Pol equation)}" />

      <p>
        For μ &gt; 0: the damping term −μ(1−x²)ẋ is <em>negative</em> (energy input) for |x| &lt; 1
        and positive (energy dissipation) for |x| &gt; 1. This self-regulating mechanism drives
        the system toward a stable limit cycle regardless of initial conditions. The Van der Pol
        oscillator models vacuum tubes, cardiac pacemaker cells, and chemical oscillators.
      </p>

      <h2>C.3 Bifurcations</h2>

      <Definition number="C.1" title="Bifurcation">
        A <strong>bifurcation</strong> is a qualitative change in the topology of the phase portrait
        as a parameter is varied. The most important types:
        <span style={{ display: 'block', marginTop: '0.5rem' }}>
          <strong>Saddle-node:</strong> Two fixed points collide and annihilate. ẋ = r + x² — at r=0, two fixed points (±√|r|) merge; for r&gt;0, none exist.
        </span>
        <span style={{ display: 'block' }}>
          <strong>Hopf bifurcation:</strong> A stable fixed point becomes unstable and spawns a limit cycle. The system begins to oscillate as a parameter crosses a threshold.
        </span>
        <span style={{ display: 'block' }}>
          <strong>Period-doubling:</strong> A periodic orbit becomes a 2T orbit, then 4T, 8T... cascading to chaos at a finite parameter value.
        </span>
      </Definition>

      <h2>C.4 Sensitive Dependence and the Lorenz System</h2>

      <p>
        <strong>Chaos</strong> is characterized by <em>sensitive dependence on initial
        conditions</em>: nearby trajectories diverge exponentially. The rate of divergence
        is quantified by the <strong>Lyapunov exponent</strong>:
      </p>

      <EqNumbered number="C.3" latex="|\delta x(t)| \approx |\delta x(0)|e^{\lambda t} \qquad \lambda>0 \Rightarrow \text{chaos}" />

      <p>
        The <strong>Lorenz system</strong> (1963) — a truncated model of Rayleigh-Bénard
        convection — was the first discovered chaotic attractor:
      </p>

      <EqNumbered number="C.4" latex="\dot{x}=\sigma(y-x) \qquad \dot{y}=x(\rho-z)-y \qquad \dot{z}=xy-\beta z" />

      <p>
        For (σ, ρ, β) = (10, 28, 8/3), the system exhibits the famous Lorenz butterfly —
        trajectories wander erratically between two lobes of a <strong>strange attractor</strong>,
        a fractal object with Hausdorff dimension ≈ 2.06. Despite being deterministic, the
        system is unpredictable on time scales longer than a few Lyapunov times (≈ 1/λ ≈ 1.1 s
        in Lorenz units). This is the mathematical reason for the practical limit of weather
        prediction (~10 days).
      </p>

      <Theorem number="C.1" title="Poincaré–Bendixson Theorem">
        In a 2D continuous dynamical system, any bounded trajectory that does not approach
        a fixed point must approach either a limit cycle or a graphic (a union of fixed points
        and heteroclinic orbits). Corollary: <em>chaos cannot occur in autonomous 2D systems</em>.
        Chaos requires at least 3 dimensions (or a 2D non-autonomous system = 3D with time).
      </Theorem>

      <WorkedExample number="C.1" title="Period Doubling in the Logistic Map">
        <p>
          The logistic map xₙ₊₁ = rxₙ(1 − xₙ) is the discrete analogue of a bifurcating
          differential equation. Trace the onset of chaos.
        </p>
        <Step label="r = 1 to 3:">Single stable fixed point x* = (r−1)/r. All initial conditions → x*.</Step>
        <Step label="r = 3:">Hopf-like bifurcation: fixed point becomes unstable. Period-2 cycle emerges.</Step>
        <Step label="r ≈ 3.449:">Period-2 → Period-4. Period-doubling cascade begins.</Step>
        <Step label="r_∞ ≈ 3.5699:">Period-doubling accumulation point. Beyond this: chaos.</Step>
        <Step label="Feigenbaum constant:">Ratio of successive bifurcation intervals → δ = 4.669... (Feigenbaum constant). Universal for all period-doubling routes to chaos.</Step>
        <Step label="Chaos but structure:">Within chaos, windows of periodicity exist (e.g., period-3 at r≈3.83). Period-3 implies chaos by Li-Yorke (1975).</Step>
      </WorkedExample>

      <WorkedExample number="C.2" title="Lyapunov Exponent of the Logistic Map">
        <p>
          Compute the Lyapunov exponent λ for the logistic map at r = 4 (fully chaotic).
        </p>
        <Step label="Definition:">λ = lim(N→∞) (1/N) Σ ln|f&apos;(xₙ)| &nbsp;&nbsp; where f&apos;(x) = r(1−2x)</Step>
        <Step label="At r=4:">f&apos;(x) = 4(1−2x). The invariant measure for r=4 is ρ(x) = 1/(π√(x(1−x))).</Step>
        <Step label="Integral:">λ = ∫₀¹ ln|4(1−2x)| · ρ(x) dx = ln 2 ≈ 0.693 &gt; 0 ✓</Step>
        <Step label="Meaning:">Adjacent trajectories separate by factor e^(0.693) ≈ 2 per iteration. After n steps, errors amplify by 2ⁿ. For 1% error in initial condition, precision is lost after n ≈ 7/log₁₀(2) ≈ 23 steps.</Step>
      </WorkedExample>

      <Definition number="C.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Chaotic does not mean random:</strong> the equations are deterministic, but prediction becomes exponentially sensitive.</li>
          <li><strong>Nonlinear does not guarantee chaos:</strong> many nonlinear systems settle to fixed points or limit cycles.</li>
          <li><strong>Positive Lyapunov exponent is local-rate information:</strong> bounded attractors also require folding or recurrence.</li>
          <li><strong>Discrete maps can be chaotic in one dimension:</strong> the Poincaré-Bendixson restriction applies to continuous autonomous flows.</li>
          <li><strong>Bifurcation diagrams are asymptotic:</strong> discard transients before plotting long-term behavior.</li>
        </ul>
      </Definition>

      <PracticeProblems section="C.1–C.4 Nonlinear Dynamics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={3.5699} unit="" tolerance={0.001}
          hints={['The period-doubling accumulation point for the logistic map is r_∞ ≈ 3.5699.']}
          problemText="At what parameter value r_∞ does the logistic map first become chaotic (period-doubling accumulation point)?"
          solution={<>r_∞ ≈ <strong>3.5699</strong> (Feigenbaum point)</>}>
          State the parameter value at which the logistic map transitions to chaos via the period-doubling route.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={4.669} unit="" tolerance={0.01}
          hints={['The Feigenbaum constant δ ≈ 4.669 is the universal ratio of successive bifurcation intervals.']}
          problemText="What is the Feigenbaum constant δ for the period-doubling route to chaos?"
          solution={<>δ = <strong>4.669...</strong> — universal for all period-doubling routes to chaos</>}>
          State the Feigenbaum constant and explain its universality.
        </InteractiveProblem>

        <Problem n={3} difficulty="easy"
          solution={<>ẋ = r − x² (saddle-node): Fixed points: x* = ±√r for r&gt;0; none for r&lt;0; one at x*=0 for r=0. Stability: f&apos;(x) = −2x. At x* = √r: f&apos; = −2√r &lt; 0 → stable. At x* = −√r: f&apos; = 2√r &gt; 0 → unstable. Bifurcation diagram: for r&gt;0, two branches (±√r); they merge at (r=0, x=0) and disappear for r&lt;0. This is the canonical saddle-node (or fold) bifurcation. Physical example: snap-through of an elastic arch — sudden jump between stable states as load increases past the bifurcation point.</>}>
          Find and classify the fixed points of ẋ = r − x² as a function of parameter r. Sketch the bifurcation diagram.
        </Problem>

        <Problem n={4} difficulty="medium"
          solution={<>Pendulum ẍ = −sin θ. Fixed points: θ̈=θ̇=0 → sin θ* = 0 → θ* = nπ. Jacobian near θ*=0: J = [[0,1],[-cos θ*,0]] = [[0,1],[-1,0]]. Eigenvalues: λ² = −1 → λ = ±i. Center — stable orbits (small oscillations). Near θ*=π: J = [[0,1],[1,0]]. Eigenvalues: λ = ±1. Saddle — unstable. The separatrix is the orbit with energy equal to the top (H=1): p² = 2(1+cos θ), a homoclinic orbit (starts and ends at (π,0) in infinite time). Inside: libration (oscillations). Outside: rotation (full revolutions). The separatrix energy is E=2 (potential energy of upright pendulum with length l=g=1).</>}>
          Find the fixed points of the nonlinear pendulum ẍ = −sin θ and classify them. Describe the separatrix geometrically.
        </Problem>

        <Problem n={5} difficulty="medium"
          solution={<>Lorenz system fixed points: ẋ=ẏ=ż=0. From ẋ: y=x. From ż: xy=βz → z=x²/β. From ẏ: x(ρ−z)−x=0 → x(ρ−1−z)=0. Either x=0 (origin) or z=ρ−1 → x²/β=ρ−1 → x=±√(β(ρ−1)). For ρ=28: x=±√(8/3×27) = ±√72 = ±6√2 ≈ ±8.485. The two non-trivial fixed points are C± = (±8.485, ±8.485, 27). Stability requires Jacobian analysis: for ρ&gt;ρ_H ≈ 24.74, C± become unstable (subcritical Hopf). The system then wanders on the strange attractor, visiting neighborhoods of both C+ and C− erratically.</>}>
          Find all fixed points of the Lorenz system for ρ=28, σ=10, β=8/3. Which are stable?
        </Problem>

        <Problem n={6} difficulty="hard"
          solution={<>Hénon map: xₙ₊₁ = 1 − axₙ² + yₙ, yₙ₊₁ = bxₙ (a=1.4, b=0.3). Jacobian J = [[-2axₙ, 1],[b, 0]], det J = −b = −0.3. |det J| = 0.3 &lt; 1 → area-contracting (dissipative). The attractor has Hausdorff dimension ≈ 1.26 (fractal). Fixed points: x*(1+2ax*) = 1+b x* → 2ax*² + (1−b)x* − 1 = 0. x* = [−(1−b) ± √((1−b)² + 8a)]/(4a). For a=1.4, b=0.3: x* ≈ 0.631 or −1.131. The stable fixed point (0.631) loses stability at a critical a value via period-doubling. The Lyapunov exponents sum to ln|det J| = ln 0.3 ≈ −1.20 (one positive, one negative — strange attractor).</>}>
          For the Hénon map (a=1.4, b=0.3): find fixed points, compute the Jacobian determinant, and explain why the map produces a fractal attractor.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Fixed points classified by Jacobian eigenvalues: node, spiral, saddle, center.',
        'Limit cycles are isolated periodic orbits; stable ones attract neighboring trajectories.',
        'Bifurcations: saddle-node (fixed points created/destroyed), Hopf (limit cycle born), period-doubling (cascade to chaos).',
        'Chaos requires λ &gt; 0 (positive Lyapunov exponent) — exponential error growth.',
        'Lorenz attractor: strange (fractal), bounded but not periodic — sensitivity to IC prevents long-term prediction.',
        'Poincaré-Bendixson: chaos impossible in 2D autonomous systems — need ≥ 3 dimensions.',
      ]} />
    </div>
  );
}
