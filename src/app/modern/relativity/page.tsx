import SpacetimeDiagramClient from '@/components/sims/SpacetimeDiagramClient';
import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function RelativityPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Chapter 19</div>
      <h1>Special Relativity</h1>
      <p className="subtitle">
        In 1905, Einstein showed that the constancy of the speed of light — confirmed by every
        experiment — forces a complete revision of our concepts of space and time.
      </p>

      <Prerequisites items={['Classical mechanics (Ch. 1–7)', 'Electromagnetism (Ch. 13–16) motivates why c must be constant']} />

      <LearningGoals items={[
        'State Einstein\'s two postulates and explain why the second one forces a revision of space and time.',
        'Calculate the Lorentz factor γ and use it to compute time dilation and length contraction.',
        'Solve problems involving relativistic energy, rest-mass energy, and kinetic energy.',
        'Apply the relativistic velocity addition formula and verify that light speed is frame-independent.',
        'Resolve the twin paradox by identifying the non-inertial frame that breaks the symmetry.',
      ]} />

      <h2>19.1 The Two Postulates</h2>

      <p>
        Special relativity rests on two postulates, both of which are confirmed to extraordinary
        precision by experiment:
      </p>

      <Definition number="19.1" title="Einstein's Two Postulates (1905)">
        <span style={{ display: 'block', marginBottom: '0.5rem' }}>
          <strong>I. Principle of Relativity:</strong> The laws of physics are identical in all
          inertial reference frames. No experiment performed entirely within a closed system can
          detect uniform motion.
        </span>
        <span style={{ display: 'block' }}>
          <strong>II. Constancy of Light Speed:</strong> The speed of light in vacuum is c = 2.998×10⁸ m/s
          in all inertial frames, regardless of the motion of the source or observer.
        </span>
      </Definition>

      <p>
        The second postulate is the radical one. In Newtonian mechanics, velocities add: a ball
        thrown forward at 20 m/s from a train moving at 30 m/s moves at 50 m/s relative to the
        ground. But if a flashlight on the train emits light, Postulate II requires the light to
        travel at c relative to both the train and the ground — simultaneously. This is impossible
        in Newtonian mechanics, and it forces the revision of space and time.
      </p>

      <h2>19.2 Time Dilation</h2>

      <p>
        Consider a &quot;light clock&quot;: a photon bouncing between two mirrors separated by
        distance d. In its rest frame, one tick takes Δt₀ = 2d/c. Now observe the same clock
        from a frame where it moves sideways at speed v. The photon must travel a longer diagonal
        path. By Postulate II, it still travels at c, so the tick takes longer.
      </p>

      <EqNumbered number="19.1">Δt = γ Δt₀ &nbsp;&nbsp;&nbsp; where &nbsp;&nbsp; γ = 1/√(1 − v²/c²)</EqNumbered>

      <p>
        The factor γ ≥ 1 is the <strong>Lorentz factor</strong>. Time dilation: a moving clock
        runs slow relative to a stationary observer. The &quot;proper time&quot; Δt₀ is the time measured
        in the clock&apos;s own rest frame. This is not an illusion or a measuring error — it is a
        real physical effect. Muons produced in the upper atmosphere at 0.998c live long enough to
        reach the ground only because of time dilation.
      </p>

      <Figure number="19.1" caption="Minkowski spacetime diagram. The gray axes are the rest frame S; the blue line is the ct'-axis (worldline of the moving frame's origin); the red line is the x'-axis (the moving frame's simultaneity plane). As β → 1 both axes scissor toward the 45° light cone. The proper-time ticks on the blue worldline are spaced farther apart in coordinate time — time dilation made visible.">
        <SpacetimeDiagramClient />
      </Figure>

      <h2>19.3 Length Contraction</h2>

      <p>
        The same geometry that dilates time also contracts length. An object of proper length L₀
        (measured in its rest frame) appears contracted along the direction of motion when observed
        from a frame where it moves at speed v:
      </p>

      <EqNumbered number="19.2">L = L₀/γ = L₀ √(1 − v²/c²)</EqNumbered>

      <p>
        Lengths perpendicular to the motion are unchanged. Length contraction and time dilation
        are two sides of the same coin — both follow from the Lorentz transformation, and both
        are required for the speed of light to be the same in all frames.
      </p>

      <WorkedExample number="19.1" title="Muon Survival">
        <p>
          Muons are produced at h = 10 km altitude moving at v = 0.998c. Their mean lifetime
          at rest is τ₀ = 2.2 μs. How many mean lifetimes does it take them to reach the ground
          in the lab frame? In the muon&apos;s frame?
        </p>
        <Step label="γ:">γ = 1/√(1 − 0.998²) = 1/√(1 − 0.996) = 1/√0.004 = 1/0.0632 ≈ 15.8</Step>
        <Step label="Lab frame travel time:">Δt = h/v = 10000/(0.998 × 3×10⁸) = 3.34×10⁻⁵ s = 33.4 μs</Step>
        <Step label="Number of lifetimes (lab):">33.4 μs / 2.2 μs ≈ 15.2 — classically, almost none would survive</Step>
        <Step label="Muon frame:">Δt₀ = Δt/γ = 33.4/15.8 = 2.11 μs — less than one lifetime. Most survive. ✓</Step>
        <Step label="Equivalently:">In muon frame, the atmosphere is length-contracted: L = 10000/15.8 = 633 m. Short trip.</Step>
      </WorkedExample>

      <h2>19.4 Relativistic Energy and Momentum</h2>

      <p>
        The Lorentz transformation forces revisions to momentum and energy. The relativistic
        momentum is p = γmv, and the total relativistic energy is:
      </p>

      <EqNumbered number="19.3">E = γmc²</EqNumbered>

      <p>
        At rest (v = 0, γ = 1), this gives Einstein&apos;s most famous result: E₀ = mc². Mass is a
        form of energy. The kinetic energy is K = (γ−1)mc². The fundamental
        energy-momentum relation holds in all frames:
      </p>

      <EqNumbered number="19.4">E² = (pc)² + (mc²)²</EqNumbered>

      <p>
        For a photon (m = 0): E = pc, so E = hf = hc/λ. For a particle at rest: E = mc².
        These are special cases of the same equation.
      </p>

      <WorkedExample number="19.2" title="Kinetic Energy at High Speed">
        <p>
          An electron (m = 9.11×10⁻³¹ kg) is accelerated to v = 0.99c. Find its
          kinetic energy in MeV. (1 MeV = 1.602×10⁻¹³ J, mc² = 0.511 MeV)
        </p>
        <Step label="γ:">γ = 1/√(1 − 0.99²) = 1/√(0.0199) = 1/0.141 = 7.09</Step>
        <Step label="K:">K = (γ−1)mc² = (7.09 − 1) × 0.511 MeV = 6.09 × 0.511 = <strong>3.11 MeV</strong></Step>
        <Step label="Compare Newtonian:">K_classical = ½mv² = ½(0.511)(0.99)² = 0.250 MeV — a factor of 12 too small!</Step>
      </WorkedExample>

      <h2>19.5 Relativistic Velocity Addition</h2>

      <p>
        If frame S moves at v relative to the lab, and an object moves at u in frame S
        (along the same direction), its velocity in the lab is:
      </p>

      <EqNumbered number="19.5">u_lab = (u + v) / (1 + uv/c²)</EqNumbered>

      <p>
        For u, v ≪ c, the denominator ≈ 1 and we recover the Galilean result. But if u = c:
        u_lab = (c + v)/(1 + v/c) = c(1+v/c)/(1+v/c) = c. Light always travels at c, regardless
        of the source&apos;s motion — Postulate II is built into the algebra.
      </p>

      <Definition number="19.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Time dilation is symmetric between inertial observers:</strong> the asymmetry in twin-style problems comes from changing frames.</li>
          <li><strong>Length contraction is along motion only:</strong> transverse dimensions are unchanged.</li>
          <li><strong>Velocity addition is not Galilean:</strong> no massive object can be boosted past c.</li>
          <li><strong>Rest energy is real energy:</strong> E = mc² is part of the total relativistic energy budget.</li>
        </ul>
      </Definition>

      <PracticeProblems section="19.1–19.5 Special Relativity">
        <InteractiveProblem n={1} difficulty="easy"
          answer={7.09} unit="" tolerance={0.02}
          hints={['γ = 1/√(1−v²/c²). Compute 1 − (0.99)².']}
          problemText="Find γ for v = 0.99c."
          solution={<>γ = 1/√(1−0.9801) = 1/√0.0199 = <strong>7.09</strong></>}>
          Calculate the Lorentz factor γ for a particle moving at v = 0.99c.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={0.5} unit="μs" tolerance={0.02}
          hints={['Δt₀ = Δt/γ. Proper time is shorter (moving clock runs slow).']}
          problemText="A clock moves at 0.866c (γ=2). Lab measures Δt=1 μs. Find proper time Δt₀ (μs)."
          solution={<>Δt₀ = Δt/γ = 1/2 = <strong>0.5 μs</strong></>}>
          A clock moves at 0.866c (γ = 2). The lab measures a time interval of 1 μs. What does the moving clock read?
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={3.11} unit="MeV" tolerance={0.03}
          hints={['K = (γ−1)mc². mc² for electron = 0.511 MeV.']}
          problemText="Electron at v=0.99c (γ=7.09). Find kinetic energy in MeV."
          solution={<>K = (7.09−1)×0.511 = 6.09×0.511 = <strong>3.11 MeV</strong></>}>
          An electron is accelerated to 0.99c (γ = 7.09). Find its relativistic kinetic energy in MeV.
        </InteractiveProblem>

        <Problem n={4} difficulty="medium"
          solution={<>A proton beam moving at 0.9c fires a proton forward at 0.9c in its own frame. Lab velocity: u = (0.9c + 0.9c)/(1 + 0.9×0.9) = 1.8c/1.81 = 0.9945c. Not 1.8c — the relativistic denominator prevents exceeding c. As u and v both → c, u_lab → c but never reaches it. This is the algebraic manifestation of Postulate II.</>}>
          A rocket moves at 0.9c relative to Earth and fires a missile forward at 0.9c relative to the rocket. What is the missile&apos;s speed relative to Earth? Why doesn&apos;t simple addition give 1.8c?
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>The twin paradox: twin A travels at 0.8c to a star 4 ly away (γ = 5/3). Round trip in lab: 10 years. A&apos;s proper time: 10/γ = 6 years. The &quot;paradox&quot; seems to be that from A&apos;s frame, B moved — so B should be younger. But A&apos;s frame is NOT inertial throughout — A must turn around, introducing an asymmetry. The acceleration at turnaround is the key that breaks the symmetry. A returns younger by 4 years. This has been confirmed by atomic clocks on aircraft (Hafele-Keating, 1971).</>}>
          Twin A travels at 0.8c to a star 4 light-years away and returns. Twin B stays on Earth. Who is younger when they reunite, and by how much? Explain why this is not a paradox.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Two postulates: physics is the same in all inertial frames; c is constant in all frames.',
        'Time dilation: Δt = γΔt₀ — a moving clock runs slow by factor γ = 1/√(1−v²/c²).',
        'Length contraction: L = L₀/γ — moving objects are shortened along their motion.',
        'Relativistic energy: E = γmc², so E₀ = mc² at rest — mass and energy are equivalent.',
        'Energy-momentum: E² = (pc)² + (mc²)² — for photons (m=0): E = pc.',
        'Relativistic velocity addition prevents anything from exceeding c: u = (u\'+v)/(1+u\'v/c²).',
      ]} />
    </div>
  );
}
