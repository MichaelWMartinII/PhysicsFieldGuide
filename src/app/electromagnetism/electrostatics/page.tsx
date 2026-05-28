import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function ElectrostaticsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#a855f7' }}>Electromagnetism · Upper Division</div>
      <h1>Electrostatics: Boundary Problems</h1>
      <p className="subtitle">
        Laplace&apos;s and Poisson&apos;s equations govern the electric potential. Their solutions
        via separation of variables and the method of images are the central technical tools
        of classical electrostatics.
      </p>

      <Prerequisites items={['Electric fields (Ch. 13)', 'Maxwell\'s equations (Ch. M)', 'Partial differential equations', 'Fourier series']} />

      <LearningGoals items={[
        'Derive Poisson\'s and Laplace\'s equations from Gauss\'s law and E = −∇V.',
        'Apply separation of variables in Cartesian coordinates to solve Laplace\'s equation with given boundary conditions.',
        'Expand the solution in spherical coordinates using Legendre polynomials and match boundary conditions.',
        'Use the method of images to find the potential and surface charge for a charge above a grounded conductor.',
        'Construct the multipole expansion and identify the leading term for a neutral charge distribution.',
      ]} />

      <h2>ES.1 Poisson&apos;s and Laplace&apos;s Equations</h2>

      <p>
        From Gauss&apos;s law (∇·E = ρ/ε₀) and E = −∇V, the electric potential V satisfies
        <strong> Poisson&apos;s equation</strong>:
      </p>

      <EqNumbered number="ES.1">∇²V = −ρ/ε₀ &nbsp;&nbsp;&nbsp; (Poisson)</EqNumbered>

      <p>
        In charge-free regions (ρ = 0), this reduces to <strong>Laplace&apos;s equation</strong>:
      </p>

      <EqNumbered number="ES.2">∇²V = 0 &nbsp;&nbsp;&nbsp; (Laplace)</EqNumbered>

      <p>
        Solutions to Laplace&apos;s equation are called <strong>harmonic functions</strong>. They
        satisfy the <strong>mean value theorem</strong>: the value at any point equals the average
        over any sphere centered there. Consequence: harmonic functions have no local maxima or
        minima in a charge-free region — the potential maximum is always on the boundary.
      </p>

      <Theorem number="ES.1" title="Uniqueness Theorem">
        A solution to Laplace&apos;s equation with specified boundary conditions is unique.
        Specifically: if two solutions V₁ and V₂ both satisfy ∇²V = 0 in a region and agree
        on all boundaries, then V₁ = V₂ everywhere inside.

        Proof: let U = V₁ − V₂, which satisfies ∇²U = 0 and U = 0 on boundaries. By the mean
        value theorem, U has no interior extremum → U = 0 everywhere. ∎

        This theorem justifies the method of images: if you find any solution satisfying both
        Laplace&apos;s equation and the boundary conditions — by any method, however clever — it
        must be the correct solution.
      </Theorem>

      <h2>ES.2 Separation of Variables</h2>

      <p>
        In Cartesian coordinates, try V(x,y,z) = X(x)Y(y)Z(z). Laplace&apos;s equation becomes:
      </p>

      <EqNumbered number="ES.3">X&apos;&apos;/X + Y&apos;&apos;/Y + Z&apos;&apos;/Z = 0</EqNumbered>

      <p>
        Each term must be a constant (separation constants). For boundary conditions that demand
        oscillatory behavior in x and y but exponential in z, choose: X&apos;&apos; = −k²X,
        Y&apos;&apos; = −l²Y, Z&apos;&apos; = (k²+l²)Z. The general solution is built from products
        of sines/cosines and exponentials. Boundary conditions then fix the allowed k, l and the
        coefficients (via Fourier series on the boundary).
      </p>

      <WorkedExample number="ES.1" title="Infinite Rectangular Pipe">
        <p>
          A rectangular pipe (0 ≤ x ≤ a, 0 ≤ y ≤ b) extends in z. Three walls are grounded
          (V=0); the top wall (y=b) is held at V₀(x). Find V(x,y).
        </p>
        <Step label="Separated solutions:">V(x,y) = X(x)Y(y). Boundary conditions: V=0 at x=0,a → X = sin(nπx/a). V=0 at y=0 → Y(0)=0 → Y = sinh(nπy/a).</Step>
        <Step label="General solution:">V(x,y) = Σ(n) Cₙ sin(nπx/a) sinh(nπy/a)</Step>
        <Step label="Top boundary:">At y=b: V₀(x) = Σ Cₙ sin(nπx/a) sinh(nπb/a). This is a Fourier sine series.</Step>
        <Step label="Coefficients:">Cₙ = [2/(a sinh(nπb/a))] ∫(0 to a) V₀(x) sin(nπx/a) dx</Step>
        <Step label="Special case:">For V₀(x) = V₀ (constant): Cₙ = 4V₀/(nπ sinh(nπb/a)) for odd n, 0 for even n.</Step>
      </WorkedExample>

      <h2>ES.3 Separation in Spherical Coordinates</h2>

      <p>
        In spherical coordinates, Laplace&apos;s equation becomes:
      </p>

      <EqNumbered number="ES.4">(1/r²) d/dr(r² dV/dr) + (1/r² sin θ) ∂/∂θ(sin θ ∂V/∂θ) + ... = 0</EqNumbered>

      <p>
        For azimuthal symmetry (V independent of φ), the separated solutions are:
      </p>

      <EqNumbered number="ES.5">V(r,θ) = Σ(l=0 to ∞) (Aₗ rˡ + Bₗ r^(−l−1)) Pₗ(cos θ)</EqNumbered>

      <p>
        where Pₗ(cos θ) are <strong>Legendre polynomials</strong>:
        P₀ = 1, P₁ = cos θ, P₂ = ½(3cos²θ−1), P₃ = ½(5cos³θ−3cosθ), ...
        The rˡ term is regular at the origin; r^(−l−1) is regular at infinity (multipole fields).
        A pure r^(−l−1) term with Pₗ is called a 2ˡ-pole: l=0 monopole, l=1 dipole, l=2 quadrupole.
      </p>

      <WorkedExample number="ES.2" title="Conducting Sphere in a Uniform Field">
        <p>
          A grounded conducting sphere of radius R is placed in a uniform external field E₀ẑ.
          Find the potential outside.
        </p>
        <Step label="Far-field:">V → −E₀r cos θ = −E₀r P₁(cos θ) as r → ∞</Step>
        <Step label="General l=1 solution:">V = (Ar + B/r²) cos θ. Far field: A = −E₀.</Step>
        <Step label="Boundary condition:">V(R, θ) = 0 → (−E₀R + B/R²) cos θ = 0 → B = E₀R³.</Step>
        <Step label="Result:">V(r,θ) = −E₀r cos θ + E₀R³ cos θ / r² = −E₀(r − R³/r²) cos θ</Step>
        <Step label="Interpretation:">The r term is the applied field; the R³/r² term is an induced dipole with moment p = 4πε₀E₀R³. Near the sphere (at r=R): E_r = −∂V/∂r = 3E₀ cos θ — the field is three times the applied value at the poles.</Step>
      </WorkedExample>

      <h2>ES.4 The Method of Images</h2>

      <p>
        The <strong>method of images</strong> uses the uniqueness theorem to find potentials near
        conductors: replace the conductor with fictitious image charges placed so that the
        boundary condition (V = 0 on conductor surface) is satisfied.
      </p>

      <WorkedExample number="ES.3" title="Point Charge Above a Grounded Plane">
        <p>
          Charge +q at height d above an infinite grounded conducting plane (z = 0). Find V and the
          surface charge density.
        </p>
        <Step label="Image charge:">Place −q at position z = −d (mirror image below the plane).</Step>
        <Step label="Verify BC:">On the plane (z=0), the potential from +q and −q cancels by symmetry: V=0 ✓</Step>
        <Step label="Potential (z &gt; 0):">V = q/(4πε₀) [1/r₊ − 1/r₋], where r± = √(x²+y²+(z∓d)²)</Step>
        <Step label="Surface charge:">σ = −ε₀ ∂V/∂z|_(z=0) = −qd/(2π(x²+y²+d²)^(3/2))</Step>
        <Step label="Total charge:">∫σ dA = −q (the plane carries total charge −q, as required by Gauss&apos;s law).</Step>
        <Step label="Force:">F = q × (field from −q) = −q²/(16πε₀d²) ẑ — attractive, as expected.</Step>
      </WorkedExample>

      <Definition number="ES.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Uniqueness depends on boundary conditions:</strong> satisfying the PDE alone is not enough.</li>
          <li><strong>Image charges are mathematical devices:</strong> they replace conductors only in the allowed physical region.</li>
          <li><strong>Regularity chooses radial terms:</strong> discard terms that diverge at the origin or infinity when the physical region requires it.</li>
          <li><strong>Surface charge comes from the normal field:</strong> use the conductor boundary field, not the full image-space fiction.</li>
        </ul>
      </Definition>

      <PracticeProblems section="ES.1–ES.4 Electrostatics Boundary Problems">
        <InteractiveProblem n={0} difficulty="easy"
          answer={0.1} unit="N" tolerance={0.03}
          hints={['Method of images: the image charge is −q at distance d below the plane. Force = kq²/(2d)² = kq²/(4d²).']}
          problemText="A point charge q = 2 μC is held at distance d = 0.3 m above a grounded conducting plane. Using the method of images, find the attractive force on the charge (N)."
          solution={<>Image charge −q at distance d below the plane. Distance between charges = 2d. F = kq²/(2d)² = (9×10⁹)(2×10⁻⁶)²/(4×0.09) = 36×10⁻³/0.36 = <strong>0.1 N</strong> (attractive).</>}>
          A point charge q = 2 μC is held at d = 0.3 m above a grounded conducting plane. Using the method of images, find the attractive force on the charge.
        </InteractiveProblem>

        <Problem n={1} difficulty="easy"
          solution={<>Green&apos;s reciprocity theorem: for two charge distributions ρ₁ and ρ₂ with potentials V₁ and V₂: ∫ρ₁V₂ dV = ∫ρ₂V₁ dV. Proof: ∫ρ₁V₂ = −ε₀∫(∇²V₁)V₂ = ε₀∫∇V₁·∇V₂ (IBP) = −ε₀∫(∇²V₂)V₁ = ∫ρ₂V₁. Application to image problem: charge q at position r₁ above grounded plane. V₁ = potential of actual configuration. Take ρ₂ = uniform charge σ on plane → V₂ = const on plane, V₂ = 0 for z&gt;0 (grounded). Reciprocity gives the charge distribution without computing it directly.</>}>
          State Green&apos;s reciprocity theorem for electrostatics and prove it using integration by parts on Poisson&apos;s equation.
        </Problem>

        <Problem n={2} difficulty="medium"
          solution={<>Dielectric sphere in uniform field: V_in = −E₀(3εᵣ/(εᵣ+2))r cos θ (uniform field inside). V_out = −E₀r cos θ + E₀(εᵣ−1)/(εᵣ+2) R³/r² cos θ. Apply BC at r=R: V continuous and εᵣ(∂V_in/∂r) = ∂V_out/∂r (D_n continuous). E_in = 3E₀/(εᵣ+2) (reduced from E₀). P = ε₀(εᵣ−1)E_in = 3ε₀(εᵣ−1)/(εᵣ+2) E₀. For εᵣ→∞ (conductor): E_in → 0, P → bound surface charge σ_b = P·n̂.</>}>
          Solve for the potential of a dielectric sphere (relative permittivity εᵣ) in a uniform applied field E₀. Find the field inside and the polarization.
        </Problem>

        <Problem n={3} difficulty="medium"
          solution={<>Point charge q between two grounded planes at z=0 and z=d, charge at z=a. Needs infinite series of images to satisfy both BCs simultaneously. Image in z=0: −q at z=−a. Image in z=d: −q at z=2d−a. But these need further images to cancel each other: +q at z=2d+a, +q at z=−2d+a, −q at z=−2d−a, etc. Total image series: alternating signs at positions ±2nd ± a. Force on q is F = q Σ(images) / (4πε₀ × distance²). Converges conditionally — this is the same sum as appears in the energy of an ionic crystal. The Green&apos;s function for the strip is G(r,r&apos;) = Σ (1/|r−rₙ&apos;| − 1/|r−rₙ&apos;&apos;|)/(4πε₀).</>}>
          A charge q is placed between two parallel grounded conducting planes separated by distance d. Set up the method of images (infinite series). How does this connect to electrostatic energy in ionic crystals?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Multipole expansion: V(r) = (1/4πε₀) Σ (1/r^(l+1)) ∫ r&apos;ˡ Pₗ(cos θ&apos;) ρ(r&apos;) dV&apos;. l=0: Q/(4πε₀r) (total charge Q = ∫ρdV). l=1: p·r̂/(4πε₀r²) where p = ∫r&apos;ρdV&apos; (dipole moment). l=2: quadrupole. A neutral system (Q=0) falls off as 1/r² minimum (unless p=0 too). Two charges +q,−q separated by d: Q=0, p=qd. V ≈ p·r̂/(4πε₀r²). E_r = p cos θ/(2πε₀r³), E_θ = p sin θ/(4πε₀r³). Force between two dipoles p₁, p₂: F ∝ 1/r⁴ (falls faster than Coulomb). Relevance: van der Waals forces between neutral atoms arise from induced dipole–dipole interactions.</>}>
          Derive the multipole expansion for the potential of a localized charge distribution. Find the leading terms for a neutral system and an electric dipole. What is the practical importance for intermolecular forces?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Poisson: ∇²V = −ρ/ε₀. Laplace: ∇²V = 0 in charge-free regions.',
        'Uniqueness: BCs uniquely determine the solution — justifies any method that satisfies both PDE and BCs.',
        'Separation of variables: Cartesian → sines/exponentials; spherical → rˡ and Pₗ(cos θ).',
        'Legendre polynomials Pₗ(cos θ): monopole (l=0), dipole (l=1), quadrupole (l=2)...',
        'Method of images: replace conductors with image charges; uniqueness guarantees correctness.',
        'Multipole expansion: V = Q/r + p·r̂/r² + ... Neutral systems → dipole falls as 1/r².',
      ]} />
    </div>
  );
}
