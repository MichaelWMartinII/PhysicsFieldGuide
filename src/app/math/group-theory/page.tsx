import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function GroupTheoryPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#06b6d4' }}>Mathematics · Upper Division</div>
      <h1>Group Theory for Physics</h1>
      <p className="subtitle">
        Symmetry is the deepest principle in physics. Group theory is the mathematics of
        symmetry — it determines selection rules in spectroscopy, classifies elementary
        particles, and underlies the gauge theories of all fundamental forces.
      </p>

      <Prerequisites items={['Linear algebra (Ch. LA)', 'Quantum mechanics (Ch. 20)', 'Basic matrix multiplication']} />

      <LearningGoals items={[
        'Verify that a set with a binary operation satisfies the four group axioms.',
        'Construct the character table of a finite group and use it to decompose representations into irreps.',
        'Apply Schur\'s lemma to relate symmetry to degeneracy in quantum systems.',
        'Identify the Lie algebras su(2) and su(3) and connect their generators to physical observables.',
        'Use selection rules derived from representation theory to determine which matrix elements vanish.',
      ]} />

      <h2>GT.1 Groups and Their Properties</h2>

      <Definition number="GT.1" title="Group">
        A <strong>group</strong> G is a set with a binary operation · satisfying:
        <span style={{ display: 'block', marginTop: '0.5rem' }}>
          1. <strong>Closure:</strong> a, b ∈ G → a·b ∈ G
        </span>
        <span style={{ display: 'block' }}>
          2. <strong>Associativity:</strong> (a·b)·c = a·(b·c)
        </span>
        <span style={{ display: 'block' }}>
          3. <strong>Identity:</strong> ∃e: e·a = a·e = a for all a
        </span>
        <span style={{ display: 'block' }}>
          4. <strong>Inverses:</strong> ∀a ∃a⁻¹: a·a⁻¹ = e
        </span>
        Key examples: (ℝ, +), (GL(n,ℂ), ×), permutations Sₙ, rotation group SO(3), Lorentz group, SU(N) gauge groups of the Standard Model.
      </Definition>

      <p>
        A group is <strong>Abelian</strong> if a·b = b·a for all elements. SO(3) is non-Abelian
        (rotations don&apos;t commute). The <strong>order</strong> of a finite group is its number of elements.
      </p>

      <h2>GT.2 Representations</h2>

      <p>
        A <strong>representation</strong> of a group G is a homomorphism D: G → GL(V) — a map
        from group elements to invertible linear operators on a vector space V, preserving the
        group structure: D(g₁g₂) = D(g₁)D(g₂).
      </p>

      <p>
        <strong>Irreducible representations (irreps)</strong> are representations with no
        invariant subspace. The dimension of an irrep equals the multiplicity of its character.
      </p>

      <Theorem number="GT.1" title="Schur's Lemma">
        If D₁ and D₂ are irreducible representations of G and M is an operator satisfying
        MD₁(g) = D₂(g)M for all g ∈ G, then either M = 0 or M is an isomorphism (and D₁ ≅ D₂).

        Corollary: for an irrep D and any operator commuting with all D(g): M = λI.
        Physical application: if [H, D(g)] = 0 for all symmetry transformations g, then
        energy eigenstates within an irrep are degenerate.
      </Theorem>

      <p>
        The <strong>character</strong> of a representation is χ(g) = Tr D(g) — invariant
        under basis change and conjugation. The great orthogonality theorem:
      </p>

      <EqNumbered number="GT.1">Σ_g D^α_(mn)(g)* D^β_(m&apos;n&apos;)(g) = (|G|/d_α) δ_αβ δ_mm&apos; δ_nn&apos;</EqNumbered>

      <p>
        where d_α is the dimension of irrep α. Characters satisfy:
      </p>

      <EqNumbered number="GT.2">Σ_g χ^α(g)* χ^β(g) = |G| δ_αβ &nbsp;&nbsp;&nbsp; (orthogonality of characters)</EqNumbered>

      <WorkedExample number="GT.1" title="Representations of C₃ᵥ (Ammonia)">
        <p>
          The symmetry group of NH₃ is C₃ᵥ = {'{'}E, C₃, C₃², σ_v, σ_v&apos;, σ_v&apos;&apos;{'}'} (order 6).
          Find all irreducible representations.
        </p>
        <Step label="Classes:">3 conjugacy classes: E (1), 2C₃ (2), 3σ_v (3). Number of irreps = number of classes = 3.</Step>
        <Step label="Dimension constraint:">d₁² + d₂² + d₃² = |G| = 6 → only solution: 1,1,2.</Step>
        <Step label="Character table:">
          C₃ᵥ: A₁ (1,1,1): E=1, 2C₃=1, 3σ_v=1 (totally symmetric, z).
          A₂ (1,1,−1): z-rotation, antisymmetric under σ_v.
          E (2,−1,0): degenerate pair (x,y), (Rx,Ry).
        </Step>
        <Step label="Physical content:">The vibrational modes of NH₃ transform as: 2A₁ (symmetric stretch and umbrella) + 2E (degenerate stretch and bend). Only A₁ and E modes are IR active (they transform like x,y,z). Both A₁ and E are Raman active. This predicts the observed spectrum.</Step>
      </WorkedExample>

      <h2>GT.3 Lie Groups and Lie Algebras</h2>

      <p>
        A <strong>Lie group</strong> is a continuous group that is also a smooth manifold —
        elements are labeled by continuous parameters. The key examples in physics:
      </p>

      <p>
        <strong>SO(3)</strong> = rotations in 3D (3 parameters: Euler angles). Doubly covered
        by SU(2) — spinors transform under SU(2), vectors under SO(3). This explains spin-½.
      </p>

      <p>
        <strong>SU(2)</strong>: 2×2 unitary matrices with det=1. Generators are Pauli matrices σᵢ/2.
        Algebra: [Jᵢ, Jⱼ] = iεᵢⱼₖ Jₖ — same as angular momentum!
      </p>

      <p>
        <strong>SU(3)</strong>: 3×3 unitary, det=1. 8 generators (Gell-Mann matrices).
        Used to classify hadrons (flavor SU(3)) and for QCD color (gauge SU(3)).
      </p>

      <p>
        The <strong>Lie algebra</strong> g is the tangent space at the identity of the Lie group G,
        with the commutator as multiplication. For a compact Lie group, the irreps are labeled
        by the highest weight vector — the quantum numbers that maximize all commuting generators.
      </p>

      <EqNumbered number="GT.3">[Jᵢ, Jⱼ] = iεᵢⱼₖ Jₖ &nbsp;&nbsp;&nbsp; (su(2) algebra → all angular momentum physics)</EqNumbered>

      <h2>GT.4 Applications: Selection Rules and Degeneracy</h2>

      <p>
        <strong>Selection rules:</strong> A matrix element ⟨ψ_f | O | ψ_i⟩ is zero unless the
        direct product of representations of ψ_f, O, and ψ_i contains the trivial (totally
        symmetric) representation. For electric dipole transitions (O transforms as vector):
        Δl = ±1, Δm = 0, ±1 — directly from the group theory of SO(3) irreps.
      </p>

      <p>
        <strong>Degeneracy from symmetry:</strong> Energy levels transform as irreps of the
        Hamiltonian&apos;s symmetry group. The degeneracy of a level equals the dimension of its
        irrep. Accidental degeneracy (higher than expected) signals a hidden symmetry — the
        SO(4) symmetry of hydrogen gives the n² degeneracy.
      </p>

      <Definition number="GT.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>A group is defined by operations:</strong> the same set can form different groups under different operations.</li>
          <li><strong>Representations are matrices for abstract symmetries:</strong> the group itself is not the matrix choice.</li>
          <li><strong>Abelian and non-Abelian behavior differs:</strong> order matters in rotations and gauge groups.</li>
          <li><strong>Irreducible representations organize states:</strong> they explain degeneracy patterns and selection rules.</li>
        </ul>
      </Definition>

      <PracticeProblems section="GT.1–GT.4 Group Theory">
        <InteractiveProblem n={1} difficulty="easy"
          answer={6} unit="" tolerance={0.01}
          hints={['Order of C₃ᵥ = number of elements: E, C₃, C₃², σ_v, σ_v\', σ_v\'\'.']}
          problemText="What is the order (number of elements) of the group C₃ᵥ (ammonia symmetry group)?"
          solution={<>C₃ᵥ = {'{'}E, C₃, C₃², σ_v, σ_v&apos;, σ_v&apos;&apos;{'}'} → order = <strong>6</strong></>}>
          State the order of the group C₃ᵥ and list its elements.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={3} unit="" tolerance={0.01}
          hints={['Number of irreps = number of conjugacy classes. C₃ᵥ has 3 classes: E, 2C₃, 3σ_v.']}
          problemText="How many irreducible representations does C₃ᵥ have?"
          solution={<>3 conjugacy classes → <strong>3</strong> irreducible representations (A₁, A₂, E)</>}>
          How many irreducible representations does C₃ᵥ have, and what are their names?
        </InteractiveProblem>

        <Problem n={3} difficulty="easy"
          solution={<>The dihedral group D₃ ≅ C₃ᵥ has 6 elements: {'{'}e, r, r², s, sr, sr²{'}'} where r = rotation by 120°, s = reflection. Multiplication table: r³=e, s²=e, srs=r⁻¹. Non-Abelian (sr ≠ rs). Subgroups: {'{'}e{'}'}, {'{'}e,r,r²{'}'} (cyclic C₃), {'{'}e,s{'}'}, {'{'}e,sr{'}'}, {'{'}e,sr²{'}'} (three C₂). Normal subgroups: {'{'}e{'}'}, {'{'}e,r,r²{'}'} (C₃ is normal since index 2), D₃. Factor group D₃/C₃ ≅ C₂. Lagrange theorem: |H| divides |G|. Subgroup C₃ has order 3, which divides 6 ✓. Subgroups {'{'}e,s{'}'} have order 2 divides 6 ✓. Physical: D₃ is the symmetry of an equilateral triangle (molecule BF₃, graphene unit cell).</>}>
          Write the multiplication table for D₃ (symmetry of equilateral triangle). Find all subgroups. Which are normal? What is the factor group D₃/C₃?
        </Problem>

        <Problem n={4} difficulty="medium"
          solution={<>SU(2) irreps labeled by j = 0, 1/2, 1, 3/2, .... Dimension 2j+1. j=0: trivial (singlet). j=1/2: spinor (doublet = spin-1/2). j=1: vector (triplet). Tensor product rule: j₁ ⊗ j₂ = |j₁−j₂| ⊕ ... ⊕ (j₁+j₂). For two spin-1/2: 1/2 ⊗ 1/2 = 0 ⊕ 1 (singlet + triplet). For spin-1/2 ⊗ spin-1: 1/2 ⊗ 1 = 1/2 ⊕ 3/2. Character: χ^j(θ) = sin((2j+1)θ/2)/sin(θ/2) for rotation by θ. Orthogonality: ∫χ^j(θ) χ^j&apos;(θ) (1−cosθ)/π dθ = δ_jj&apos;. The Clebsch-Gordan coefficients are just the change-of-basis matrices between product basis and coupled basis — the same coefficients appearing in angular momentum addition (Ch. SP).</>}>
          Find all irreps of SU(2). What is the tensor product 1/2 ⊗ 1? How do Clebsch-Gordan coefficients arise from the representation theory?
        </Problem>

        <Problem n={5} difficulty="medium"
          solution={<>Eightfold Way: hadrons classified by SU(3) flavor (u,d,s quarks). The 3 quarks transform as 3 (fundamental); antiquarks as 3̄. Mesons: 3 ⊗ 3̄ = 1 ⊕ 8 (octet + singlet). The η₁ is the SU(3) singlet; π⁰, π±, K⁰, K̄⁰, K±, η₈ form the octet (JP=0⁻ pseudoscalar meson octet). Baryons: 3 ⊗ 3 ⊗ 3 = 1 ⊕ 8 ⊕ 8 ⊕ 10. The decuplet contains 10 states — the Ω⁻ (sss) was predicted by this and discovered in 1964. SU(3) flavor is approximate (m_s ≠ m_u,m_d) — broken by strange quark mass difference ~150 MeV. The symmetry breaking lifts degeneracy within multiplets (mass formulas: Gell-Mann-Okubo). QCD color SU(3) is exact (confinement enforces colorless hadrons).</>}>
          Explain how SU(3) flavor symmetry classifies the meson and baryon multiplets (the Eightfold Way). What is the significance of the Ω⁻ baryon?
        </Problem>

        <Problem n={6} difficulty="hard"
          solution={<>SO(4) symmetry of hydrogen: H = p²/2m − e²/r. In addition to L (angular momentum, SO(3)), the Laplace-Runge-Lenz vector A = p×L/m − e²r̂ is conserved: dA/dt = 0. Together L and A form 6 conserved quantities — generators of SO(4). Algebra: [L_i, L_j] = iεᵢⱼₖ L_k, [L_i, A_j] = iεᵢⱼₖ A_k, [A_i, A_j] = −iℏ(2H/m)εᵢⱼₖ L_k. For bound states (H→negative): define K = A/√(−2mH). Then L and K satisfy two commuting SU(2) algebras: M = (L+K)/2, N = (L−K)/2. [M_i,M_j]=iεᵢⱼₖ M_k, [N_i,N_j]=iεᵢⱼₖ N_k, [M,N]=0. Irreps: m=n=j → E_n = −me⁴/(2ℏ²n²), n=2j+1=1,2,3... and l=0,1,...,n−1. The SO(4) symmetry explains why all levels with same n are degenerate (4-fold higher than SO(3) would predict).</>}>
          Show that hydrogen has a hidden SO(4) symmetry by constructing the Laplace-Runge-Lenz vector. How does this explain the n² degeneracy?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Group: closed, associative, has identity and inverses. Non-Abelian when order matters.',
        'Representation D(g): group → matrices, preserving structure. Irreps are the building blocks.',
        'Schur\'s lemma: operators commuting with all irrep matrices are proportional to identity.',
        'Character χ(g) = Tr D(g): class function, orthogonal for different irreps. Determines spectrum.',
        'Lie algebras [Jᵢ,Jⱼ] = iεᵢⱼₖ Jₖ: su(2) ↔ all angular momentum. Exponential gives Lie group.',
        'Selection rules: ⟨f|O|i⟩ ≠ 0 only if trivial irrep appears in D_f ⊗ D_O ⊗ D_i.',
      ]} />
    </div>
  );
}
