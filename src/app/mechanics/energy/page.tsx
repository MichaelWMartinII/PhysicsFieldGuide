import Pendulum from '@/components/sims/Pendulum';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function EnergyPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: 'var(--def-accent)' }}>Classical Mechanics · Chapter 4</div>
      <h1>Energy &amp; Work</h1>
      <p className="subtitle">Energy is neither created nor destroyed — it only changes form. This conservation law is one of the most powerful tools in physics.</p>

      <Prerequisites items={["Newton's laws", 'Calculus (derivatives, integrals)', 'Vectors']} />

      <LearningGoals items={[
        'Compute work using the dot product and interpret positive, negative, and zero work.',
        'Use the work-energy theorem to relate net work to changes in kinetic energy.',
        'Identify conservative forces and write the corresponding potential energy functions.',
        'Apply mechanical energy conservation when nonconservative work is absent or accounted for.',
        'Explain pendulum motion as an exchange between kinetic and gravitational potential energy.',
      ]} />

      <h2>4.1 Work and the Work-Energy Theorem</h2>

      <p>
        Work is done on an object when a force acts through a displacement. The formal definition uses
        the dot product, because only the component of force <em>parallel</em> to displacement does work:
      </p>

      <EqNumbered number="4.1" latex="W = \mathbf{F}\cdot\mathbf{d} = Fd\cos\theta" />

      <p>
        For a variable force, work is the integral of force over displacement. This leads directly to
        one of the most important results in mechanics:
      </p>

      <Theorem number="4.1" title="Work-Energy Theorem">
        The net work done by all forces acting on an object equals the change in its kinetic energy:
        <span style={{ display: 'block', margin: '0.75rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          W_net = ΔKE = ½mv_f² − ½mv_i²
        </span>
        This is derived directly from Newton&apos;s second law by integrating F = ma with respect to displacement.
        It holds regardless of the path taken.
      </Theorem>

      <h2>4.2 Potential Energy and Conservation</h2>

      <p>
        Some forces — called <strong>conservative forces</strong> — have the property that the work they
        do is path-independent and can be stored as potential energy. Gravity and the spring force are
        conservative. Friction is not.
      </p>

      <Definition number="4.1" title="Conservative Force and Potential Energy">
        A force F is conservative if the work it does around any closed path is zero. For such forces,
        we define potential energy U such that:
        <span style={{ display: 'block', margin: '0.5rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          W_conservative = −ΔU &nbsp;&nbsp;&nbsp; or equivalently &nbsp;&nbsp;&nbsp; F = −dU/dx
        </span>
        Gravitational PE near Earth&apos;s surface: U_g = mgh. Spring PE: U_s = ½kx².
      </Definition>

      <p>
        When only conservative forces act, the total mechanical energy is constant:
      </p>

      <EqNumbered number="4.2" latex="E_\mathrm{total} = K + U = \frac{1}{2}mv^2 + mgh = \mathrm{constant}" />

      <h2>4.3 The Pendulum — Energy in Oscillatory Motion</h2>

      <p>
        The simple pendulum beautifully illustrates energy conservation. As it swings, kinetic and potential
        energy constantly exchange. At the lowest point, all energy is kinetic; at the turning points,
        all energy is potential.
      </p>

      <p>
        The equation of motion follows from Newton&apos;s second law in the tangential direction.
        The restoring force is F = −mg sin(θ), so:
      </p>

      <EqNumbered number="4.3" latex="\theta'' = -\frac{g}{L}\sin\theta" />

      <p>
        For small angles (θ &lt; ~15°), sin(θ) ≈ θ and we get simple harmonic motion with exact period:
      </p>

      <EqNumbered number="4.4" latex="T = 2\pi\sqrt{\frac{L}{g}} \qquad \text{(small-angle approximation)}" />

      <p>
        For large angles, equation (4.3) must be solved numerically. The simulation below uses
        fourth-order Runge-Kutta (RK4) integration, which is accurate to order Δt⁴. With damping b
        representing air resistance, the full equation is:
      </p>

      <EqNumbered number="4.5" latex="\theta'' = -\frac{g}{L}\sin\theta - b\theta'" />

      <Figure number="4.1" caption="Pendulum simulation with RK4 integration. The phase space plot (θ vs θ̇) in the upper right traces the energy state — undamped motion is a closed ellipse; damping spirals inward.">
        <Pendulum />
      </Figure>

      <WorkedExample number="4.1" title="Pendulum Period on Mars">
        <p>A pendulum clock keeps perfect time on Earth (g = 9.81 m/s², L = 0.993 m → T = 2.00 s). What is its period on Mars (g = 3.72 m/s²)?</p>
        <Step label="Period formula:">T = 2π √(L/g)</Step>
        <Step label="On Earth:">T_E = 2π √(0.993/9.81) = 2.00 s ✓</Step>
        <Step label="On Mars:">T_M = 2π √(0.993/3.72) = 2π × 0.516 = <strong style={{color:'var(--thm-accent)'}}>3.25 s</strong></Step>
        <Step label="Ratio:">T_M/T_E = √(9.81/3.72) = 1.62 — the clock runs slow by factor 1.62 on Mars.</Step>
      </WorkedExample>

      <WorkedExample number="4.2" title="Energy Conservation — Maximum Speed">
        <p>A 0.5 kg pendulum bob is released from rest at 60° from vertical. String length L = 1.2 m. What is its maximum speed?</p>
        <Step label="Height gained:">h = L(1 − cos 60°) = 1.2 × 0.5 = 0.6 m</Step>
        <Step label="Energy conservation:">mgh = ½mv_max² → v_max = √(2gh) = √(2 × 9.81 × 0.6) = <strong style={{color:'var(--thm-accent)'}}>3.43 m/s</strong></Step>
        <Step label="Note:">Mass cancelled — the max speed is independent of mass, just like the period.</Step>
      </WorkedExample>

      <Definition number="4.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Work is not force:</strong> work requires displacement and only the parallel force component contributes.</li>
          <li><strong>Energy conservation needs a boundary:</strong> decide which objects belong to the system.</li>
          <li><strong>Friction does negative work:</strong> mechanical energy is transformed into thermal energy.</li>
          <li><strong>Potential energy zero is arbitrary:</strong> only changes in potential energy affect motion.</li>
          <li><strong>The pendulum period formula is approximate:</strong> large amplitudes have longer periods than 2π√(L/g).</li>
        </ul>
      </Definition>

      <PracticeProblems section="4.1–4.3 Energy">
        <InteractiveProblem n={1} difficulty="easy"
          answer={225} unit="J" tolerance={0.02}
          hints={['KE = ½mv². Plug in m = 2 kg and v = 15 m/s.']}
          problemText="A 2 kg object accelerates from rest to 15 m/s. How much kinetic energy does it gain (in J)?"
          solution={<>KE = ½mv² = ½(2)(15²) = <strong>225 J</strong>. This is equal to the work done by the net force during acceleration.</>}>
          A 2 kg object accelerates from rest to 15 m/s. How much kinetic energy does it gain?
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={9.9} unit="m/s" tolerance={0.02}
          hints={['All PE converts to KE: ½mv² = mgh → v = √(2gh).']}
          problemText="A 300 g ball is dropped from 5 m height. Find its speed just before impact (m/s)."
          solution={<>At top: all PE = mgh = 0.3 × 9.81 × 5 = 14.7 J. At bottom: all KE → v = √(2gh) = √(2 × 9.81 × 5) = <strong>9.9 m/s</strong>.</>}>
          A 300 g ball is dropped from 5 m height. Using energy conservation, find its speed just before impact.
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>T = 2π√(L/g). We want T doubled: 2T₀ = 2π√(L_new/g) → 2(2π√(L₀/g)) → L_new = 4L₀. Length must be <strong>quadrupled</strong>.</>}>
          By what factor must you change a pendulum&apos;s length to double its period?
        </Problem>

        <Problem n={4} difficulty="medium"
          solution={<>Work-Energy: W_net = ΔKE = 0 − ½(1500)(20²) = −300,000 J = −300 kJ. Friction force f = W/d = 300,000/80 = <strong>3,750 N</strong>. (Negative work means friction opposes motion.)</>}>
          A 1500 kg car brakes from 20 m/s to rest over 80 m. Find the friction force using the work-energy theorem.
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>Phase space (θ, θ̇) for undamped pendulum: energy E = ½L²θ̇² + gL(1−cos θ) = const. This is the equation of a closed curve. At bottom: θ = 0, θ̇ = ω_max. At turning points: θ = ±θ₀, θ̇ = 0. For small angles the ellipse is truly elliptical; for large angles it distorts (period increases). With damping E decreases each cycle → spiral inward.</>}>
          Describe qualitatively what the phase space plot (θ vs θ̇) looks like for (a) undamped small oscillations, (b) undamped large oscillations, and (c) damped oscillations. Explain each shape physically.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'W_net = ΔKE connects force (Newton) to energy — both describe the same physics.',
        'Conservative forces permit potential energy; total mechanical energy is conserved when only conservative forces act.',
        'Pendulum period T = 2π√(L/g) depends only on length and gravity, not mass or amplitude (small-angle approx).',
        'For large-angle pendulums, the period is longer than the formula predicts — the motion is nonlinear.',
        'The phase space portrait captures the entire energy state: ellipse = undamped, inward spiral = damped.',
      ]} />
    </div>
  );
}
