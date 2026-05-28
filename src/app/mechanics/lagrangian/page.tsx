import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function LagrangianPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#3b82f6' }}>Classical Mechanics · Upper Division</div>
      <h1>Lagrangian Mechanics</h1>
      <p className="subtitle">
        Instead of forces, Lagrangian mechanics asks: what path minimizes the action?
        This single variational principle contains all of classical mechanics — and
        generalizes naturally to quantum fields and general relativity.
      </p>

      <Prerequisites items={['Newton\'s laws (Ch. 3)', 'Energy (Ch. 4)', 'Calculus (Ch. 22)', 'Differential equations (Ch. 23)']} />

      <LearningGoals items={[
        'Choose generalized coordinates appropriate to a constrained system and count the degrees of freedom.',
        'Construct the Lagrangian L = T − V and derive the equations of motion using the Euler-Lagrange equation.',
        'Identify cyclic coordinates and read off the corresponding conserved momenta directly.',
        'State Noether\'s theorem and connect each continuous symmetry to its conserved quantity.',
        'Apply the Lagrangian method to multi-body systems such as the Atwood machine and double pendulum.',
      ]} />

      <h2>L.1 Generalized Coordinates</h2>

      <p>
        The power of Lagrangian mechanics lies in the freedom to choose any coordinates that
        describe the system&apos;s configuration — not just Cartesian x, y, z. These are
        <strong>generalized coordinates</strong> qᵢ: angles, arc lengths, normal mode amplitudes,
        whatever parametrizes the space of possible configurations.
      </p>

      <p>
        A system with N particles in 3D has 3N degrees of freedom. Constraints (a bead on a wire,
        a pendulum on a rod) reduce this number. The number of independent generalized coordinates
        equals the number of degrees of freedom after constraints are imposed.
      </p>

      <Definition number="L.1" title="The Lagrangian">
        The Lagrangian L of a mechanical system is the difference between kinetic energy T
        and potential energy V:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          L(q, q̇, t) = T − V
        </span>
        where q = (q₁, q₂, …) are the generalized coordinates and q̇ = dq/dt their time derivatives.
      </Definition>

      <h2>L.2 The Euler-Lagrange Equation</h2>

      <p>
        The <strong>principle of stationary action</strong> (Hamilton&apos;s principle) states that the
        actual path taken by a system between two configurations is the one for which the action
        S = ∫L dt is stationary (first variation vanishes). Applying variational calculus yields:
      </p>

      <EqNumbered number="L.1" latex="\frac{d}{dt}\left(\frac{\partial L}{\partial \dot q_i}\right) - \frac{\partial L}{\partial q_i} = 0 \qquad \text{(Euler-Lagrange equation, for each }i\text{)}" />

      <p>
        This is one equation per degree of freedom. Remarkably, it automatically handles
        constraints — there is no need to compute constraint forces. The equation is also
        <strong>covariant</strong>: it takes the same form in any coordinate system.
      </p>

      <WorkedExample number="L.1" title="Simple Pendulum">
        <p>
          Derive the equation of motion for a pendulum (mass m, length l) using the Lagrangian.
          Use the angle θ as the generalized coordinate.
        </p>
        <Step label="Kinetic energy:">T = ½m(lθ̇)² = ½ml²θ̇²</Step>
        <Step label="Potential energy:">V = −mgl cos θ (taking pivot as origin, downward positive)</Step>
        <Step label="Lagrangian:">L = T − V = ½ml²θ̇² + mgl cos θ</Step>
        <Step label="∂L/∂θ̇:">= ml²θ̇ &nbsp;&nbsp; → d/dt(ml²θ̇) = ml²θ̈</Step>
        <Step label="∂L/∂θ:">= −mgl sin θ</Step>
        <Step label="E-L equation:">ml²θ̈ + mgl sin θ = 0 &nbsp;&nbsp;→&nbsp;&nbsp; θ̈ = −(g/l) sin θ ✓</Step>
      </WorkedExample>

      <WorkedExample number="L.2" title="Atwood Machine">
        <p>
          Two masses m₁ and m₂ hang over a frictionless pulley. Find the acceleration using one
          generalized coordinate x (extension of m₁ below its initial position).
        </p>
        <Step label="Constraint:">When m₁ descends by x, m₂ rises by x. Both speeds = |ẋ|.</Step>
        <Step label="T:">T = ½(m₁+m₂)ẋ²</Step>
        <Step label="V:">V = −m₁gx + m₂gx = (m₂−m₁)gx &nbsp; (taking initial position as reference)</Step>
        <Step label="L:">L = ½(m₁+m₂)ẋ² − (m₂−m₁)gx</Step>
        <Step label="E-L:">d/dt[(m₁+m₂)ẋ] − [−(m₂−m₁)g] = 0 &nbsp;&nbsp;→&nbsp;&nbsp; ẍ = (m₁−m₂)g/(m₁+m₂) ✓</Step>
      </WorkedExample>

      <h2>L.3 Conserved Quantities and Noether's Theorem</h2>

      <p>
        If the Lagrangian does not depend explicitly on a coordinate qᵢ (a <strong>cyclic coordinate</strong>),
        then the Euler-Lagrange equation gives d/dt(∂L/∂q̇ᵢ) = 0 — the conjugate momentum
        pᵢ = ∂L/∂q̇ᵢ is conserved.
      </p>

      <Theorem number="L.1" title="Noether's Theorem (1915)">
        For every continuous symmetry of the action, there is a corresponding conserved quantity:
        <span style={{ display: 'block', marginTop: '0.5rem' }}>
          Time translation symmetry &nbsp;→&nbsp; conservation of energy (Hamiltonian H)
        </span>
        <span style={{ display: 'block' }}>
          Spatial translation symmetry &nbsp;→&nbsp; conservation of linear momentum
        </span>
        <span style={{ display: 'block' }}>
          Rotational symmetry &nbsp;→&nbsp; conservation of angular momentum
        </span>
        This is the deepest explanation of conservation laws in physics — they are not axioms
        but consequences of the symmetry structure of nature.
      </Theorem>

      <p>
        The Hamiltonian H = Σ(pᵢq̇ᵢ) − L equals the total energy for natural systems (no
        explicit time dependence, no velocity-dependent potentials). The Hamiltonian formulation
        replaces 2nd-order ODEs in q with 1st-order Hamilton&apos;s equations in phase space (q,p):
        q̇ = ∂H/∂p, ṗ = −∂H/∂q.
      </p>

      <WorkedExample number="L.3" title="Central Force — Angular Momentum Conservation">
        <p>
          A particle moves under a central force V(r) only. Use polar coordinates (r, φ).
          Show that angular momentum is conserved.
        </p>
        <Step label="T in polar:">T = ½m(ṙ² + r²φ̇²)</Step>
        <Step label="L:">L = ½m(ṙ² + r²φ̇²) − V(r)</Step>
        <Step label="φ is cyclic:">∂L/∂φ = 0 → d/dt(∂L/∂φ̇) = 0 → d/dt(mr²φ̇) = 0</Step>
        <Step label="Conserved:">ℓ = mr²φ̇ = const — this is the angular momentum! No force calculation needed.</Step>
      </WorkedExample>

      <Definition number="L.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Generalized coordinates are not necessarily distances:</strong> angles, mode amplitudes, and constraints can all serve as coordinates.</li>
          <li><strong>The Lagrangian is not usually energy:</strong> L = T − V, while total mechanical energy is T + V for natural systems.</li>
          <li><strong>Constraints reduce degrees of freedom:</strong> count coordinates after applying constraints, not before.</li>
          <li><strong>Cyclic means absent from L:</strong> if q does not appear, its conjugate momentum is conserved.</li>
          <li><strong>Stationary action is broader than minimum action:</strong> the physical path makes the first variation vanish; it need not be a true minimum.</li>
        </ul>
      </Definition>

      <PracticeProblems section="L.1–L.3 Lagrangian Mechanics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={4.91} unit="m/s²" tolerance={0.02}
          hints={['Lagrange gives ẍ = −g sin α. There is no normal force in the equation — it drops out.']}
          problemText="A bead slides frictionlessly on a wire inclined at α = 30°. The Euler-Lagrange equation gives ẍ = −g sin α. Find the magnitude of acceleration (m/s²)."
          solution={<>|ẍ| = g sin 30° = 9.81 × 0.5 = <strong>4.91 m/s²</strong>. The normal force never appears — a key advantage of the Lagrangian method.</>}>
          A bead slides without friction on a straight wire inclined at angle α. Find the equation of motion using x (distance along wire) as the generalized coordinate.
        </InteractiveProblem>

        <Problem n={2} difficulty="medium"
          solution={<>Double pendulum: q₁ = θ₁, q₂ = θ₂. Position of m₁: (l₁ sin θ₁, −l₁ cos θ₁). Position of m₂: (l₁ sin θ₁ + l₂ sin θ₂, −l₁ cos θ₁ − l₂ cos θ₂). T₁ = ½m₁l₁²θ̇₁². T₂ = ½m₂[(l₁θ̇₁ cos θ₁ + l₂θ̇₂ cos θ₂)² + (l₁θ̇₁ sin θ₁ + l₂θ̇₂ sin θ₂)²]. For small angles, this linearizes to coupled oscillator. The full equations are nonlinear and exhibit chaos for large angles.</>}>
          Write the Lagrangian for a double pendulum (m₁,l₁) and (m₂,l₂). What makes this system chaotic at large amplitudes?
        </Problem>

        <Problem n={3} difficulty="medium"
          solution={<>Spherical pendulum: generalized coords (θ, φ). T = ½ml²(θ̇² + sin²θ φ̇²). V = −mgl cos θ. L = ½ml²(θ̇² + sin²θ φ̇²) + mgl cos θ. φ is cyclic: pφ = ml² sin²θ φ̇ = const (angular momentum about vertical axis). θ equation: ml²θ̈ = ml² sin θ cos θ φ̇² − mgl sin θ. Setting θ = const (θ̇=θ̈=0) gives conical pendulum condition: cos θ = g/(l φ̇²).</>}>
          Find the Lagrangian for a spherical pendulum. Identify the cyclic coordinate and its conserved quantity. What condition gives uniform circular motion (conical pendulum)?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Noether: for each infinitesimal symmetry transformation qᵢ → qᵢ + ε fᵢ(q,t) that leaves S stationary, the Noether charge Q = Σ(∂L/∂q̇ᵢ)fᵢ − H(∂t/∂ε) is conserved. For spatial translation (x → x+ε): f = 1, Q = ∂L/∂ẋ = mẋ = p (momentum). For rotation about z by dφ: f_x = −y, f_y = x, Q = m(xẏ−yẋ) = Lz (angular momentum). For time translation (t→t+ε in action): Q = −H = −E — energy conservation. This proves conservation laws follow from symmetry structure, not from any additional postulate.</>}>
          Explicitly derive the conserved quantity associated with rotational symmetry around the z-axis using Noether&apos;s theorem. Show that it equals the z-component of angular momentum.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Generalized coordinates q describe configuration in any convenient parameterization.',
        'Lagrangian L = T − V; stationary action → Euler-Lagrange equations d/dt(∂L/∂q̇) = ∂L/∂q.',
        'Cyclic coordinate (∂L/∂q = 0) → conjugate momentum p = ∂L/∂q̇ is conserved.',
        'Noether\'s theorem: every continuous symmetry corresponds to a conserved quantity.',
        'Time symmetry → energy; space translation → momentum; rotation → angular momentum.',
        'Constraints are handled automatically — no need to compute constraint forces.',
      ]} />
    </div>
  );
}
