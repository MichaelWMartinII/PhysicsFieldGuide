import PendulumClient from '@/components/sims/PendulumClient';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function OscillationsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: 'var(--ex-accent)' }}>Waves &amp; Oscillations · Chapter 9</div>
      <h1>Simple Harmonic Motion</h1>
      <p className="subtitle">Any system near a stable equilibrium oscillates the same way — from atomic vibrations to suspension bridges.</p>

      <Prerequisites items={['Newton\'s Laws', 'Energy & Work', 'Basic calculus (derivatives)']} />

      <LearningGoals items={[
        'Recognize simple harmonic motion from a restoring force or equation of motion.',
        'Derive the mass-spring frequency and period from Newton\'s second law.',
        'Explain why a pendulum is only approximately SHM, and identify when the approximation fails.',
        'Use energy conservation to connect amplitude, speed, and total oscillator energy.',
        'Interpret damping, resonance, and phase-space plots qualitatively.',
      ]} />

      <h2>9.1 What is Simple Harmonic Motion?</h2>

      <p>
        A system undergoes <strong>simple harmonic motion</strong> (SHM) when the restoring force is proportional
        to — and directed opposite to — the displacement from equilibrium. This is <em>Hooke&apos;s Law</em> in its
        most general form, and it applies to an enormous range of physical systems.
      </p>

      <Definition number="9.1" title="Condition for SHM">
        A system undergoes SHM whenever its equation of motion has the form:
        <span style={{ display: 'block', margin: '0.6rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          d²x/dt² = −ω²x
        </span>
        The general solution is x(t) = A cos(ωt + φ), where A is amplitude, ω is angular frequency,
        and φ is the initial phase. The period T = 2π/ω depends only on the system — not on A.
      </Definition>

      <p>
        This last point — <em>isochronism</em> — is profound. A pendulum swinging in a large arc takes the same
        time as one swinging in a small arc (for small angles). Galileo allegedly discovered this by timing
        swinging lamps in Pisa Cathedral with his pulse.
      </p>

      <p>
        The practical test is simple: if the force points back toward equilibrium and grows linearly with
        displacement, the motion is sinusoidal. If the restoring force is only approximately linear, the
        system behaves like SHM only near equilibrium.
      </p>

      <h2>9.2 The Mass-Spring System</h2>

      <p>
        A mass m on a spring of stiffness k is the canonical SHM system. The restoring force is F = −kx
        (Hooke&apos;s Law), giving Newton&apos;s second law:
      </p>

      <EqNumbered number="9.1">m d²x/dt² = −kx &nbsp;&nbsp;&nbsp; → &nbsp;&nbsp;&nbsp; d²x/dt² = −(k/m)x</EqNumbered>

      <p>
        Comparing with Definition 9.1, we see ω² = k/m, so:
      </p>

      <EqNumbered number="9.2">ω = √(k/m) &nbsp;&nbsp;&nbsp; T = 2π√(m/k) &nbsp;&nbsp;&nbsp; f = (1/2π)√(k/m)</EqNumbered>

      <p>
        A stiffer spring (larger k) oscillates faster; a heavier mass oscillates slower. The amplitude has
        no effect on the period.
      </p>

      <Theorem number="9.1" title="Energy in SHM">
        The total mechanical energy of a mass-spring system is constant:
        <span style={{ display: 'block', margin: '0.6rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          E = ½mv² + ½kx² = ½kA² = constant
        </span>
        At the equilibrium position (x = 0), all energy is kinetic: v_max = A√(k/m) = Aω.
        At maximum displacement (x = ±A), all energy is potential, and v = 0. Energy sloshes back and forth
        between KE and PE at twice the oscillation frequency.
      </Theorem>

      <WorkedExample number="9.1" title="Spring-Mass Period">
        <p>A 0.5 kg mass hangs on a spring. When pulled 8 cm and released, it oscillates with period 1.2 s. Find the spring constant k.</p>
        <Step label="Use T = 2π√(m/k):">T² = 4π²m/k → k = 4π²m/T² = 4π²(0.5)/(1.2)² = <strong>13.7 N/m</strong></Step>
        <Step label="Max speed:">v_max = Aω = A(2π/T) = (0.08)(2π/1.2) = <strong>0.419 m/s</strong></Step>
      </WorkedExample>

      <h2>9.3 The Simple Pendulum</h2>

      <p>
        A pendulum of length L, displaced by a small angle θ₀, experiences a restoring torque
        τ = −mgL sin θ ≈ −mgLθ for small θ. This gives SHM with:
      </p>

      <EqNumbered number="9.3">ω = √(g/L) &nbsp;&nbsp;&nbsp; T = 2π√(L/g)</EqNumbered>

      <p>
        Note that T is independent of both mass and amplitude (for small angles). A pendulum of length
        L = 1 m on Earth has T ≈ 2.006 s — this is the basis of the seconds pendulum used in early clocks.
        The approximation breaks down above about 15°; at 90° the true period is about 18% longer.
      </p>

      <Figure number="9.1" caption="Pendulum simulation with phase-space portrait. Try a small angle first: the phase plot is nearly an ellipse and the period follows T = 2π√(L/g). Increase the initial angle to see nonlinear distortion, increase damping to watch the orbit spiral inward, and change length to verify the √L period scaling.">
        <PendulumClient />
      </Figure>

      <Theorem number="9.2" title="Small-Angle Approximation">
        The pendulum equation is exactly θ¨ = −(g/L) sin θ. It becomes SHM only after the
        approximation sin θ ≈ θ:
        <span style={{ display: 'block', margin: '0.6rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          θ¨ = −(g/L)θ &nbsp;&nbsp;&nbsp; only when |θ| is small
        </span>
        Mass cancels from the torque equation, so the period does not depend on bob mass.
        Amplitude cancels only in the small-angle limit; large-amplitude pendulums run slow.
      </Theorem>

      <WorkedExample number="9.2" title="Pendulum on the Moon">
        <p>A pendulum has period T = 2.0 s on Earth. What is its period on the Moon (g_Moon = 1.62 m/s²)?</p>
        <Step label="Find length:">T_E = 2π√(L/g_E) → L = g_E(T_E/2π)² = 9.81(2/2π)² = <strong>0.994 m</strong></Step>
        <Step label="Moon period:">T_M = 2π√(L/g_M) = 2π√(0.994/1.62) = 2π × 0.783 = <strong>4.92 s</strong></Step>
        <Step label="Ratio:">T_M/T_E = √(g_E/g_M) = √(9.81/1.62) = 2.46 — the pendulum runs 2.46× slower.</Step>
      </WorkedExample>

      <h2>9.4 Damped and Driven Oscillations</h2>

      <p>
        Real oscillators lose energy to friction and air resistance. The equation of motion with a damping
        force −bẋ (proportional to velocity) is:
      </p>

      <EqNumbered number="9.4">m ẍ + b ẋ + kx = 0 &nbsp;&nbsp;&nbsp; → &nbsp;&nbsp;&nbsp; x(t) = Ae^(−γt) cos(ω′t + φ)</EqNumbered>

      <p>
        where γ = b/2m is the damping coefficient and ω′ = √(ω₀² − γ²) is the damped frequency.
        When a periodic driving force F₀ cos(ωt) is added, the system reaches a steady state with amplitude:
      </p>

      <EqNumbered number="9.5">A(ω) = F₀/m / √((ω₀² − ω²)² + (bω/m)²)</EqNumbered>

      <p>
        The amplitude peaks near ω = ω₀ — this is <strong>resonance</strong>. At resonance, even a small driving
        force can build up a very large amplitude if damping is small. This destroyed the Tacoma Narrows
        Bridge in 1940 and must be engineered around in every building, bridge, and engine.
      </p>

      <Definition number="9.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Amplitude independence is not universal:</strong> it is exact for ideal springs, approximate for pendulums.</li>
          <li><strong>Mass does not affect a simple pendulum&apos;s period:</strong> heavier bobs have larger weight and larger inertia in the same proportion.</li>
          <li><strong>Damping removes energy:</strong> the phase-space orbit spirals inward instead of closing on itself.</li>
          <li><strong>Resonance is not always exactly at ω₀:</strong> damping shifts the maximum response slightly lower.</li>
        </ul>
      </Definition>

      <PracticeProblems section="9.1–9.4 Simple Harmonic Motion">
        <InteractiveProblem n={1} difficulty="easy"
          answer={1.4} unit="s" tolerance={0.02}
          hints={['T = 2π√(m/k). Compute √(m/k) first.', '√(0.5/10) = √0.05 ≈ 0.2236. Multiply by 2π.']}
          problemText="A 0.5 kg block on a spring (k = 10 N/m) oscillates. Find the period T."
          solution={<>T = 2π√(m/k) = 2π√(0.5/10) = 2π × 0.2236 = <strong>1.40 s</strong></>}>
          A 0.5 kg block is attached to a spring with k = 10 N/m. What is the period of oscillation?
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={0.994} unit="m" tolerance={0.02}
          hints={['T = 2π√(L/g) → L = g(T/2π)²', 'T = 2 s, g = 9.81 m/s². Compute (T/2π)² = (2/6.283)² = 0.1013. Then L = 9.81 × 0.1013.']}
          problemText="Find the length of a pendulum that has period T = 2.0 s on Earth. (g = 9.81 m/s²)"
          solution={<>L = g(T/2π)² = 9.81 × (2/2π)² = 9.81 × 0.1013 = <strong>0.994 m</strong></>}>
          What length pendulum has a period of exactly 2.0 s on Earth? (g = 9.81 m/s²)
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={0.6} unit="m/s" tolerance={0.02}
          hints={[
            'At maximum displacement, all energy is potential: E = ½kA².',
            'At equilibrium, all energy is kinetic: E = ½mv²_max. Set equal and solve.',
          ]}
          problemText="A 0.5 kg block on a spring (k = 18 N/m) is displaced 0.1 m from equilibrium. Find the maximum speed."
          solution={<>½kA² = ½mv²_max → v_max = A√(k/m) = 0.1√(18/0.5) = 0.1√36 = <strong>0.60 m/s</strong>.</>}>
          A 0.5 kg block on a spring (k = 18 N/m) is displaced 10 cm from equilibrium and released from rest. What is the maximum speed it reaches?
        </InteractiveProblem>

        <Problem n={4} difficulty="medium"
          solution={<>Period T = 2π√(L/g) — independent of mass and amplitude (for small angles). So all three pendulums have the same period. This is isochronism — the defining property of SHM. (For the 30° case, the small-angle approximation gives T ≈ 2.07 s whereas the exact value is ≈ 2.11 s — about 2% longer.)</>}>
          Three pendulums all have length L = 1 m: (a) mass 100 g, amplitude 5°; (b) mass 500 g, amplitude 5°; (c) mass 100 g, amplitude 30°. Which has the longest period, and why?
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>The driving frequency ω must equal ω₀ = √(k/m). The amplitude equation A(ω) = (F₀/m)/√((ω₀²−ω²)²+(bω/m)²). At ω=ω₀ this simplifies to A = F₀/(bω₀) = F₀m/(bm√(k/m)) = F₀/(b√(km)). To halve the resonance amplitude: halve F₀, double b, or — noting A ∝ 1/b — increase damping by factor 2. Note: the resonance peak shifts to slightly below ω₀ for damped systems.</>}>
          A driven oscillator has resonance amplitude 5 cm with damping coefficient b = 0.2 N·s/m. How would you reduce the resonance amplitude to 2.5 cm? Give two independent methods.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'SHM occurs whenever restoring force ∝ −displacement: d²x/dt² = −ω²x.',
        'Mass-spring: ω = √(k/m) · period T = 2π√(m/k) — independent of amplitude.',
        'Simple pendulum: T = 2π√(L/g) — independent of mass and amplitude (small angles).',
        'Energy alternates between KE and PE; total E = ½kA² = constant.',
        'Resonance: driven at ω₀, amplitude grows dramatically — limited only by damping.',
      ]} />
    </div>
  );
}
