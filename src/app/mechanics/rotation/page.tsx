import RotatingBodyClient from '@/components/sims/RotatingBodyClient';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function RotationPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: 'var(--def-accent)' }}>Classical Mechanics · Chapter 7</div>
      <h1>Rotational Motion</h1>
      <p className="subtitle">Every rotational quantity has a linear analogue — once you see the correspondence, rotating systems become as natural as sliding ones.</p>

      <Prerequisites items={['Newton\'s Laws', 'Energy & Work', 'Vectors and cross products']} />

      <LearningGoals items={[
        'Translate between linear and angular kinematic quantities.',
        'Compute moment of inertia and explain why mass distribution matters.',
        'Use torque as a vector product and apply τ_net = Iα.',
        'Apply angular momentum conservation when external torque is negligible.',
        'Analyze rolling motion by combining translational and rotational kinetic energy.',
      ]} />

      <h2>7.1 Angular Kinematics</h2>

      <p>
        When a rigid body rotates, every point traces a circular arc. Rather than tracking individual points, we
        describe the entire body with three scalar quantities: <strong>angular position</strong> θ (radians),
        <strong> angular velocity</strong> ω = dθ/dt (rad/s), and <strong>angular acceleration</strong> α = dω/dt (rad/s²).
      </p>

      <Definition number="7.1" title="Angular Kinematic Equations">
        For constant angular acceleration α, the rotational equations mirror the linear ones exactly:
        <span style={{ display: 'block', margin: '0.6rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          ω = ω₀ + αt &nbsp;&nbsp;&nbsp; θ = θ₀ + ω₀t + ½αt² &nbsp;&nbsp;&nbsp; ω² = ω₀² + 2α(θ − θ₀)
        </span>
        The correspondence: θ ↔ x, ω ↔ v, α ↔ a. Every linear kinematic result has a direct rotational translation.
      </Definition>

      <p>
        A point at radius r from the rotation axis has linear speed v = rω, tangential acceleration aₜ = rα,
        and centripetal acceleration aᶜ = rω² directed toward the axis. The two accelerations are perpendicular.
      </p>

      <h2>7.2 Moment of Inertia</h2>

      <p>
        In linear motion, mass resists changes in velocity (F = ma). In rotation, <strong>moment of inertia</strong> I
        resists changes in angular velocity (τ = Iα). But unlike mass, I depends on how mass is
        distributed relative to the rotation axis — not just how much there is.
      </p>

      <EqNumbered number="7.1" latex="I = \sum_i m_ir_i^2 = \int r^2\,dm" />

      <p>
        This integral gives different results for different shapes. A ring concentrates all mass at radius R,
        giving I = MR². A solid disk distributes mass inward, so I = ½MR² — it&apos;s easier to spin.
        This is why figure skaters pull their arms in to spin faster: they reduce I, and angular
        momentum L = Iω is conserved.
      </p>

      <Definition number="7.2" title="Common Moments of Inertia">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Solid disk or cylinder</strong>: I = ½MR²</li>
          <li><strong>Ring or thin hoop</strong>: I = MR²</li>
          <li><strong>Solid sphere</strong>: I = ²⁄₅MR²</li>
          <li><strong>Rod about center</strong>: I = ¹⁄₁₂ML²</li>
          <li><strong>Rod about end</strong>: I = ¹⁄₃ML²</li>
        </ul>
        <span style={{ display: 'block', marginTop: '0.5rem' }}>
          The <strong>parallel axis theorem</strong> shifts any axis: I = I<sub>cm</sub> + Md²,
          where d is the distance from the center of mass to the new axis.
        </span>
      </Definition>

      <Figure number="7.1" caption="Rotating body simulation. Switch between disk, ring, rod, and sphere to compare how shape affects spin. Apply torque to see angular acceleration. The gold arrow shows the direction of ω.">
        <RotatingBodyClient />
      </Figure>

      <h2>7.3 Torque and Newton's Second Law for Rotation</h2>

      <p>
        <strong>Torque</strong> τ is the rotational analogue of force — it is the tendency of a force to cause
        angular acceleration. Torque depends not just on the magnitude of the force but on where and in what
        direction it is applied:
      </p>

      <EqNumbered number="7.2" latex="\boldsymbol{\tau} = \mathbf{r}\times\mathbf{F} \qquad |\boldsymbol{\tau}| = rF\sin\phi" />

      <p>
        where r is the position vector from the axis to the point of application and φ is the angle between
        r and F. The maximum torque occurs when F is perpendicular to r (φ = 90°). Newton&apos;s second law
        for rotation is then:
      </p>

      <EqNumbered number="7.3" latex="\tau_\mathrm{net} = I\alpha" />

      <WorkedExample number="7.1" title="Spinning Down a Flywheel">
        <p>A flywheel (solid disk, M = 20 kg, R = 0.5 m) spins at 120 rpm. A brake applies 15 N·m of torque. How long until it stops?</p>
        <Step label="Moment of inertia:">I = ½MR² = ½(20)(0.5)² = <strong>2.5 kg·m²</strong></Step>
        <Step label="Angular deceleration:">α = −τ/I = −15/2.5 = <strong>−6 rad/s²</strong></Step>
        <Step label="Initial ω:">ω₀ = 120 rpm × 2π/60 = <strong>12.57 rad/s</strong></Step>
        <Step label="Time to stop:">t = −ω₀/α = 12.57/6 = <strong>2.09 s</strong></Step>
      </WorkedExample>

      <h2>7.4 Angular Momentum and Conservation</h2>

      <p>
        Just as linear momentum p = mv is conserved when no external force acts, <strong>angular momentum</strong>
        L = Iω is conserved when no external torque acts. This is one of the most powerful conservation laws
        in physics — it governs everything from spinning tops to collapsing stars.
      </p>

      <Theorem number="7.1" title="Conservation of Angular Momentum">
        If the net external torque on a system is zero, angular momentum is constant:
        <span style={{ display: 'block', margin: '0.6rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          L = Iω = constant &nbsp;&nbsp;&nbsp; → &nbsp;&nbsp;&nbsp; I₁ω₁ = I₂ω₂
        </span>
        When a figure skater pulls their arms in, I decreases, so ω increases — the spin speeds up.
        When a gas cloud collapses into a star, the same principle causes rapid rotation.
      </Theorem>

      <h2>7.5 Rotational Kinetic Energy and Rolling</h2>

      <EqNumbered number="7.4" latex="K_\mathrm{rot} = \frac{1}{2}I\omega^2" />

      <p>
        For a rolling body (no slipping), the total kinetic energy combines translational and rotational:
      </p>

      <EqNumbered number="7.5" latex="K_\mathrm{total} = \frac{1}{2}mv^2 + \frac{1}{2}I\omega^2 = \frac{1}{2}mv^2\left(1 + \frac{I}{mR^2}\right)" />

      <p>
        A solid disk (I = ½mR²) rolls slower down a ramp than a sliding block because some energy goes into
        rotation. A hollow ring (I = mR²) rolls even slower. The shape of the object determines its
        rolling speed — not its mass.
      </p>

      <WorkedExample number="7.2" title="Rolling Down a Ramp">
        <p>A solid sphere (I = ²⁄₅mR²) rolls from rest down a ramp of height h = 2 m. Find the speed at the bottom.</p>
        <Step label="Energy conservation:">mgh = ½mv² + ½Iω² = ½mv² + ½(²⁄₅mR²)(v/R)² = ½mv²(1 + 2/5) = ⁷⁄₁₀mv²</Step>
        <Step label="Solve for v:">v = √(10gh/7) = √(10 × 9.81 × 2/7) = <strong>5.29 m/s</strong></Step>
        <Step label="Compare:">A sliding block (no rotation): v = √(2gh) = 6.26 m/s — 18% faster.</Step>
      </WorkedExample>

      <Definition number="7.3" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Radians are dimensionless but essential:</strong> angular equations assume angles are in radians.</li>
          <li><strong>Moment of inertia is axis-dependent:</strong> changing the rotation axis changes I.</li>
          <li><strong>Torque depends on lever arm:</strong> only the perpendicular component produces rotation.</li>
          <li><strong>Angular momentum conservation needs zero external torque:</strong> internal rearrangement can change I and ω, not L.</li>
          <li><strong>Rolling without slipping adds a constraint:</strong> use v = Rω only when there is no slip.</li>
        </ul>
      </Definition>

      <PracticeProblems section="7.1–7.5 Rotational Motion">
        <InteractiveProblem n={1} difficulty="easy"
          answer={2.5} unit="kg·m²" tolerance={0.02}
          hints={['For a solid disk, I = ½MR². Plug in M = 5 kg, R = 1 m.']}
          problemText="Calculate the moment of inertia of a solid disk with M = 5 kg and R = 1 m."
          solution={<>I = ½MR² = ½ × 5 × 1² = <strong>2.5 kg·m²</strong></>}>
          A solid disk has mass M = 5 kg and radius R = 1 m. Find its moment of inertia about the central axis.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={3.14} unit="rad/s" tolerance={0.03}
          hints={['Convert rpm to rad/s: ω = rpm × 2π / 60', '30 rpm × 2π / 60 = ?']}
          problemText="A wheel spins at 30 rpm. Convert to rad/s."
          solution={<>ω = 30 × 2π/60 = 30 × 0.1047 = <strong>3.14 rad/s</strong></>}>
          A wheel spins at 30 rpm. What is its angular velocity in rad/s?
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={5.0} unit="rad/s" tolerance={0.03}
          hints={[
            'Angular momentum is conserved: I₁ω₁ = I₂ω₂.',
            'I changes when arms are pulled in. If arms-out I = 4 kg·m², arms-in I = 2 kg·m², what is ω₂?',
          ]}
          problemText="A skater spins at 2.5 rad/s with arms out (I = 2.0 kg·m²). She pulls her arms in, reducing I to 1.0 kg·m². Find the new angular velocity."
          solution={<>I₁ω₁ = I₂ω₂ → ω₂ = I₁ω₁/I₂ = (2.0)(2.5)/(1.0) = <strong>5.0 rad/s</strong></>}>
          A skater spins at 2.5 rad/s with I = 2.0 kg·m². She pulls her arms in, reducing I to 1.0 kg·m². Find the new angular velocity.
        </InteractiveProblem>

        <InteractiveProblem n={4} difficulty="medium"
          answer={5.42} unit="m/s" tolerance={0.02}
          hints={[
            'For a rolling hoop (I = mR²): KE = ½mv² + ½(mR²)(v/R)² = mv²',
            'Energy conservation: mgh = mv² → v = √(gh)',
          ]}
          problemText="A thin ring (I = mR²) rolls from rest down a ramp of height h = 3 m. Find the speed at the bottom. (g = 9.81 m/s²)"
          solution={<>mgh = ½mv² + ½(mR²)(v/R)² = mv² → v = √(gh) = √(9.81×3) = <strong>5.42 m/s</strong></>}>
          A thin ring (hoop) rolls without slipping from rest down a ramp of height 3 m. Find the speed at the bottom.
        </InteractiveProblem>

        <Problem n={5} difficulty="hard"
          solution={<>The angular impulse-momentum theorem: τ·Δt = ΔL = I·Δω. The torque slows it from ω₀ = 2π(3)/1 = 6π rad/s to 0: Δω = −6π rad/s. Torque needed: τ = IΔω/Δt = (0.25 kg·m²)(6π)/3 s = 1.57 N·m. But we need the tangential force at the rim: F = τ/R = 1.57/0.15 = 10.5 N.</>}>
          A grinding wheel (solid disk, I = 0.25 kg·m², R = 15 cm) spins at 3 rev/s. A brake pad is pressed against the rim and brings it to rest in 3 seconds. Find the braking force applied at the rim.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Angular kinematics mirrors linear: θ↔x, ω↔v, α↔a — all four kinematic equations apply directly.',
        'Moment of inertia I = ∫r²dm depends on mass distribution, not just total mass.',
        'Newton\'s second law for rotation: τ_net = Iα — torque causes angular acceleration.',
        'Angular momentum L = Iω is conserved when external torque is zero (figure skater, collapsing star).',
        'Rolling objects split KE between translational and rotational — shape determines rolling speed.',
      ]} />
    </div>
  );
}
