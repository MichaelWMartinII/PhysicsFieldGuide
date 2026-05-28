import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Takeaways, LearningGoals
} from '@/components/textbook';

export default function VectorsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#06b6d4' }}>Mathematics for Physics · Chapter 20</div>
      <h1>Vectors and Scalars</h1>
      <p className="subtitle">
        Physics quantities fall into two categories: scalars, which are fully described by a
        single number with units, and vectors, which require both magnitude and direction.
        Every force, velocity, and field in this curriculum is a vector.
      </p>

      <LearningGoals items={[
        'Distinguish scalars from vectors and represent vectors in component form using unit vectors.',
        'Add and subtract vectors algebraically by combining corresponding components.',
        'Compute the dot product and use it to find the angle between two vectors or the work done by a force.',
        'Compute the cross product using the determinant formula and apply the right-hand rule for direction.',
        'Recognize vector fields and compute the gradient of a scalar field.',
      ]} />

      <h2>20.1 Scalars and Vectors</h2>

      <p>
        A <strong>scalar</strong> is a quantity with magnitude but no direction: mass, temperature,
        time, speed, energy. You can add and multiply scalars with ordinary arithmetic.
      </p>

      <p>
        A <strong>vector</strong> is a quantity with both magnitude and direction: displacement,
        velocity, acceleration, force, momentum, electric field. We write vectors in bold (
        <strong>v</strong>) or with an arrow (v⃗). The magnitude of <strong>v</strong> is |v| or v.
      </p>

      <Definition number="20.1" title="Vector Components">
        In 3D Cartesian coordinates, a vector <strong>A</strong> is written in terms of unit
        vectors î, ĵ, k̂ along the x, y, z axes:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          A = A_x î + A_y ĵ + A_z k̂
        </span>
        The magnitude is |A| = √(A_x² + A_y² + A_z²). In 2D from angle θ above x-axis:
        A_x = |A| cos θ, A_y = |A| sin θ.
      </Definition>

      <p>
        Vector addition follows the <strong>parallelogram rule</strong> (graphically) or
        component-wise (algebraically): if <strong>C</strong> = <strong>A</strong> + <strong>B</strong>,
        then C_x = A_x + B_x, C_y = A_y + B_y, C_z = A_z + B_z. Subtraction reverses the direction
        of the second vector before adding.
      </p>

      <WorkedExample number="20.1" title="Resultant Force from Two Applied Forces">
        <p>
          Force <strong>F₁</strong> = 30 N at 40° above the +x axis. Force <strong>F₂</strong> = 50 N
          at 120° above the +x axis. Find the resultant.
        </p>
        <Step label="Components of F₁:">F₁ₓ = 30 cos 40° = 22.98 N &nbsp; F₁ᵧ = 30 sin 40° = 19.28 N</Step>
        <Step label="Components of F₂:">F₂ₓ = 50 cos 120° = −25.00 N &nbsp; F₂ᵧ = 50 sin 120° = 43.30 N</Step>
        <Step label="Resultant:">Fₓ = 22.98 − 25.00 = −2.02 N &nbsp; Fᵧ = 19.28 + 43.30 = 62.58 N</Step>
        <Step label="Magnitude:">|F| = √(2.02² + 62.58²) = √3907.3 = 62.5 N</Step>
        <Step label="Direction:">θ = arctan(62.58/−2.02) = 180° − 88.1° = 91.8° above +x axis</Step>
      </WorkedExample>

      <h2>20.2 The Dot Product</h2>

      <p>
        The <strong>dot product</strong> (scalar product) of two vectors gives a scalar measuring
        how much one vector projects onto another:
      </p>

      <EqNumbered number="20.1">A · B = |A||B| cos θ = A_x B_x + A_y B_y + A_z B_z</EqNumbered>

      <p>
        Key properties: the dot product is zero when the vectors are perpendicular (cos 90° = 0),
        maximum when parallel, and negative when the angle exceeds 90°. It is commutative (A·B = B·A)
        and distributive.
      </p>

      <p>
        Physical uses of the dot product: work W = <strong>F</strong>·Δ<strong>r</strong> = FΔr cos θ
        (only the force component along displacement does work); electric flux Φ = <strong>E</strong>·<strong>A</strong>;
        magnetic flux Φ_B = <strong>B</strong>·<strong>A</strong>.
      </p>

      <Definition number="20.2" title="Finding the Angle Between Vectors">
        From the dot product formula, the angle θ between two vectors:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          cos θ = (A · B) / (|A| |B|)
        </span>
        If the dot product is positive: θ {'<'} 90°. Zero: perpendicular. Negative: θ {'>'} 90°.
      </Definition>

      <WorkedExample number="20.2" title="Work Done by a Force">
        <p>
          A force <strong>F</strong> = (3î + 4ĵ) N acts on an object displaced by
          Δ<strong>r</strong> = (5î − 2ĵ) m. Find the work done.
        </p>
        <Step label="Dot product:">W = F · Δr = (3)(5) + (4)(−2) = 15 − 8 = 7 J</Step>
        <Step label="Alternatively:">|F| = 5 N, |Δr| = √29 m. cos θ = 7/(5√29) → θ = 74.9°. W = FΔr cos θ = 5√29 × 7/(5√29) = 7 J ✓</Step>
      </WorkedExample>

      <h2>20.3 The Cross Product</h2>

      <p>
        The <strong>cross product</strong> (vector product) produces a vector perpendicular to both
        input vectors, with magnitude equal to the area of the parallelogram they span:
      </p>

      <EqNumbered number="20.2">|A × B| = |A||B| sin θ</EqNumbered>

      <p>
        Direction: right-hand rule — curl the fingers from <strong>A</strong> toward <strong>B</strong>,
        and the thumb points in the direction of <strong>A</strong> × <strong>B</strong>.
        Important: the cross product is <em>anti-commutative</em>: B × A = −(A × B).
      </p>

      <Theorem number="20.1" title="Cross Product in Component Form">
        <span style={{ display: 'block', fontStyle: 'italic', textAlign: 'center', marginTop: '0.3rem', marginBottom: '0.3rem' }}>
          A × B = (A_y B_z − A_z B_y)î − (A_x B_z − A_z B_x)ĵ + (A_x B_y − A_y B_x)k̂
        </span>
        The unit vector relations: î × ĵ = k̂, &nbsp; ĵ × k̂ = î, &nbsp; k̂ × î = ĵ (cyclic),
        and î × î = 0 (any vector crossed with itself is zero).
      </Theorem>

      <p>
        Physical uses of the cross product: torque <strong>τ</strong> = <strong>r</strong> × <strong>F</strong>;
        angular momentum <strong>L</strong> = <strong>r</strong> × <strong>p</strong>;
        magnetic force <strong>F</strong> = q<strong>v</strong> × <strong>B</strong>;
        magnetic field from a current element d<strong>B</strong> = (μ₀I/4π)(d<strong>l</strong> × r̂/r²).
      </p>

      <WorkedExample number="20.3" title="Torque as a Cross Product">
        <p>
          A force <strong>F</strong> = (2î + 3ĵ − k̂) N is applied at position
          <strong>r</strong> = (î − 2ĵ + 3k̂) m from the pivot. Find the torque.
        </p>
        <Step label="Cross product:">τ = r × F</Step>
        <Step label="τ_x:">= r_y F_z − r_z F_y = (−2)(−1) − (3)(3) = 2 − 9 = −7 N·m</Step>
        <Step label="τ_y:">= r_z F_x − r_x F_z = (3)(2) − (1)(−1) = 6 + 1 = 7 N·m</Step>
        <Step label="τ_z:">= r_x F_y − r_y F_x = (1)(3) − (−2)(2) = 3 + 4 = 7 N·m</Step>
        <Step label="Result:"><strong>τ</strong> = (−7î + 7ĵ + 7k̂) N·m &nbsp; |τ| = 7√3 ≈ 12.1 N·m</Step>
      </WorkedExample>

      <h2>20.4 Fields as Vector Functions</h2>

      <p>
        In physics, a <strong>vector field</strong> assigns a vector to every point in space.
        The electric field <strong>E</strong>(<strong>r</strong>) and magnetic field
        <strong>B</strong>(<strong>r</strong>) are vector fields — at every point in space they
        have a direction and magnitude. Visualizing vector fields is the key to understanding
        Maxwell&apos;s equations and fluid mechanics.
      </p>

      <p>
        The <strong>gradient</strong> of a scalar field φ is a vector field pointing in the
        direction of steepest increase: ∇φ = (∂φ/∂x)î + (∂φ/∂y)ĵ + (∂φ/∂z)k̂.
        The electric field is the negative gradient of the potential: <strong>E</strong> = −∇V.
      </p>

      <Definition number="20.3" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Vectors are not just magnitudes:</strong> direction and components matter.</li>
          <li><strong>Dot products produce scalars:</strong> cross products produce vectors perpendicular to both inputs.</li>
          <li><strong>Components depend on basis:</strong> the geometric vector does not.</li>
          <li><strong>Unit vectors carry direction only:</strong> they should have magnitude 1.</li>
        </ul>
      </Definition>

      <PracticeProblems section="20.1–20.4 Vectors">
        <InteractiveProblem n={1} difficulty="easy"
          answer={62.5} unit="N" tolerance={0.02}
          hints={['Break into components, add components, find magnitude.']}
          problemText="F₁=30N at 40°, F₂=50N at 120°. Find resultant magnitude (N)."
          solution={<>Fₓ=−2.02N, Fᵧ=62.58N. |F|=√(4.08+3916.3)≈<strong>62.5 N</strong></>}>
          F₁ = 30 N at 40° and F₂ = 50 N at 120° (both above +x axis). Find the magnitude of the resultant.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={7} unit="J" tolerance={0.01}
          hints={['W = F·Δr = Fₓ Δx + Fᵧ Δy']}
          problemText="F=(3î+4ĵ)N, displacement=(5î−2ĵ)m. Find work W (J)."
          solution={<>W = 3×5 + 4×(−2) = 15 − 8 = <strong>7 J</strong></>}>
          Force <strong>F</strong> = (3î + 4ĵ) N acts over displacement (5î − 2ĵ) m. Find the work done.
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={12.12} unit="N·m" tolerance={0.02}
          hints={['τ = r × F. Calculate each component separately.']}
          problemText="r=(î−2ĵ+3k̂)m, F=(2î+3ĵ−k̂)N. Find |τ| (N·m)."
          solution={<>τ=(−7î+7ĵ+7k̂). |τ|=7√3=<strong>12.12 N·m</strong></>}>
          Find the magnitude of torque when <strong>r</strong> = (î−2ĵ+3k̂) m and <strong>F</strong> = (2î+3ĵ−k̂) N.
        </InteractiveProblem>

        <Problem n={4} difficulty="medium"
          solution={<>A·B = (2)(1)+(−3)(4)+(1)(−2) = 2−12−2 = −12. |A| = √(4+9+1) = √14. |B| = √(1+16+4) = √21. cos θ = −12/(√14 × √21) = −12/√294 = −12/17.15 = −0.700. θ = arccos(−0.700) = 134.4°.</>}>
          Find the angle between <strong>A</strong> = (2î − 3ĵ + k̂) and <strong>B</strong> = (î + 4ĵ − 2k̂).
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>The triple scalar product A·(B×C) gives the volume of the parallelepiped formed by the three vectors. It equals the determinant of the 3×3 matrix with A, B, C as rows. If A·(B×C) = 0, the three vectors are coplanar (lie in the same plane). Applications: if E·(r×dl) = 0 for all infinitesimal paths, the field is conservative; the volume element in cylindrical coordinates r dr dθ dz comes from the Jacobian, which is the triple product of the partial derivative vectors.</>}>
          Define the triple scalar product A·(B×C) and prove it equals the volume of the parallelepiped spanned by A, B, C. What does it mean if this product is zero?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Scalars have magnitude only; vectors have magnitude and direction — add component-wise.',
        'Dot product A·B = |A||B|cosθ = ΣAᵢBᵢ — scalar; measures projection; zero for perpendicular vectors.',
        'Cross product A×B has magnitude |A||B|sinθ, direction given by right-hand rule — vector; zero for parallel vectors.',
        'Cross product is anti-commutative: B×A = −A×B. Unlike the dot product, order matters.',
        'Work = F·Δr (dot product), torque = r×F (cross product), magnetic force F = qv×B (cross product).',
        'Vector fields assign a vector to every point in space; the electric field E = −∇V is the negative gradient of potential.',
      ]} />
    </div>
  );
}
