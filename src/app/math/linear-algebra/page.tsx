import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function LinearAlgebraPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#06b6d4' }}>Mathematics · Upper Division</div>
      <h1>Linear Algebra for Physics</h1>
      <p className="subtitle">
        Matrices, eigenvalues, and inner product spaces are the language of quantum mechanics,
        classical mechanics (normal modes), and every numerical simulation. This chapter
        develops the tools physicists use most.
      </p>

      <Prerequisites items={['Vectors (Ch. V)', 'Calculus (Ch. 22)', 'Basic matrix multiplication']} />

      <LearningGoals items={[
        'Identify vector spaces and inner product spaces, and apply the Cauchy-Schwarz inequality.',
        'Find eigenvalues and eigenvectors of a matrix by solving the characteristic equation.',
        'State the spectral theorem for Hermitian operators and explain its role in quantum mechanics.',
        'Compute the singular value decomposition and use it for low-rank approximation and least-squares fitting.',
        'Determine whether two Hermitian operators share an eigenbasis by checking if they commute.',
      ]} />

      <h2>LA.1 Vector Spaces and Inner Products</h2>

      <Definition number="LA.1" title="Vector Space">
        A <strong>vector space</strong> V over a field F (usually ℝ or ℂ) is a set with addition
        and scalar multiplication satisfying 8 axioms (commutativity, associativity, distributivity,
        identity, inverses). Key examples in physics:
        <span style={{ display: 'block', marginTop: '0.5rem' }}>
          <strong>ℝⁿ:</strong> column vectors, forces, positions. &nbsp;
          <strong>ℂⁿ:</strong> quantum states (spinors, finite-dimensional Hilbert spaces).
        </span>
        <span style={{ display: 'block' }}>
          <strong>L²(a,b):</strong> square-integrable functions — the Hilbert space of quantum wavefunctions.
        </span>
        <span style={{ display: 'block' }}>
          <strong>Polynomials, matrices, operators</strong> — all are vector spaces under appropriate operations.
        </span>
      </Definition>

      <p>
        An <strong>inner product</strong> ⟨u, v⟩ on a complex vector space satisfies:
        linearity in v, conjugate-linearity in u, ⟨v,v⟩ ≥ 0 with equality iff v = 0.
        For ℂⁿ: ⟨u, v⟩ = u†v = Σᵢ uᵢ* vᵢ. For L²: ⟨f, g⟩ = ∫ f*(x) g(x) dx.
      </p>

      <EqNumbered number="LA.1">⟨u, v⟩ ≤ ‖u‖ ‖v‖ &nbsp;&nbsp;&nbsp; (Cauchy-Schwarz inequality)</EqNumbered>

      <h2>LA.2 Eigenvalues and Eigenvectors</h2>

      <p>
        For a linear operator A: V → V, a nonzero vector v with Av = λv is an
        <strong> eigenvector</strong> with <strong>eigenvalue</strong> λ. Eigenvalues satisfy:
      </p>

      <EqNumbered number="LA.2">det(A − λI) = 0 &nbsp;&nbsp;&nbsp; (characteristic equation)</EqNumbered>

      <p>
        For an n×n matrix, this is an nth-degree polynomial — giving n eigenvalues (counting
        multiplicity). The eigenvalues determine: stability of linear systems (Re(λ) &lt; 0 →
        stable), principal stresses in mechanics, normal mode frequencies, and the spectrum of
        quantum observables.
      </p>

      <WorkedExample number="LA.1" title="Normal Modes of Two Coupled Oscillators">
        <p>
          Two masses m connected by springs (k to walls, κ between them). Find normal frequencies.
        </p>
        <Step label="Equations of motion:">mẍ₁ = −kx₁ − κ(x₁−x₂) &nbsp;&nbsp; mẍ₂ = −kx₂ − κ(x₂−x₁)</Step>
        <Step label="Matrix form:">ẍ = −(1/m)Kx &nbsp;&nbsp; K = [[k+κ, −κ],[−κ, k+κ]]</Step>
        <Step label="Eigenvalues of K:">det(K − μI) = 0 → (k+κ−μ)² − κ² = 0 → μ = k or k+2κ</Step>
        <Step label="Normal frequencies:">ω₁ = √(k/m) (in-phase mode), ω₂ = √((k+2κ)/m) (out-of-phase mode)</Step>
        <Step label="Eigenvectors:">v₁ = (1,1)/√2 (both masses move together), v₂ = (1,−1)/√2 (masses move oppositely)</Step>
      </WorkedExample>

      <h2>LA.3 Hermitian Operators and Spectral Theorem</h2>

      <Definition number="LA.2" title="Hermitian (Self-Adjoint) Operators">
        An operator A is <strong>Hermitian</strong> (self-adjoint) if A = A† (A equals its
        conjugate transpose). Key properties:
        <span style={{ display: 'block', marginTop: '0.5rem' }}>
          1. All eigenvalues are real (proved by ⟨v|A|v⟩ = ⟨Av|v⟩ → λ = λ*)
        </span>
        <span style={{ display: 'block' }}>
          2. Eigenvectors for different eigenvalues are orthogonal
        </span>
        <span style={{ display: 'block' }}>
          3. (Spectral theorem) A has a complete orthonormal eigenbasis: A = Σᵢ λᵢ |vᵢ⟩⟨vᵢ|
        </span>
        In quantum mechanics, observables are Hermitian operators — this guarantees real measured values and allows complete state expansion in the eigenstate basis.
      </Definition>

      <p>
        Analogously, <strong>unitary</strong> operators U satisfy U†U = I (preserve inner products).
        All eigenvalues lie on the unit circle (|λ| = 1). Time evolution e^(−iHt/ℏ) is unitary
        when H is Hermitian — unitarity is quantum mechanical probability conservation.
      </p>

      <h2>LA.4 Singular Value Decomposition</h2>

      <p>
        Every m×n matrix A can be written as:
      </p>

      <EqNumbered number="LA.3">A = UΣV† &nbsp;&nbsp;&nbsp; (SVD)</EqNumbered>

      <p>
        where U (m×m) and V (n×n) are unitary and Σ is diagonal with non-negative real entries
        σ₁ ≥ σ₂ ≥ ... ≥ 0 (singular values). The number of nonzero σᵢ is the rank of A.
        SVD is the foundation of:
      </p>

      <p>
        <strong>Principal Component Analysis (PCA):</strong> the columns of V are principal axes
        — directions of maximum variance in data.
      </p>

      <p>
        <strong>Low-rank approximation:</strong> A ≈ U_kΣ_kV_k† (keep only k largest singular
        values) — used in image compression, recommendation systems, quantum state compression.
      </p>

      <p>
        <strong>Least squares:</strong> the pseudoinverse A⁺ = VΣ⁺U† solves the least-squares
        problem min‖Ax − b‖ when A is non-square.
      </p>

      <Theorem number="LA.1" title="Spectral Theorem for Commuting Observables">
        Two Hermitian operators A and B can be simultaneously diagonalized (share a complete
        orthonormal eigenbasis) if and only if they commute: [A, B] = AB − BA = 0.

        Physical consequence: two quantum observables can be simultaneously measured (sharp values)
        only if they commute. Position and momentum don&apos;t commute ([x̂, p̂] = iℏ) — they cannot
        both be sharp. L² and Lz commute — both can be simultaneously specified.
      </Theorem>

      <WorkedExample number="LA.2" title="Diagonalizing the Inertia Tensor">
        <p>
          A rigid body has inertia tensor I (symmetric 3×3 matrix). Find the principal axes.
        </p>
        <Step label="Problem:">In an arbitrary frame, the inertia tensor I has off-diagonal elements (products of inertia). L = Iω has L not parallel to ω in general.</Step>
        <Step label="Spectral theorem:">Since I is symmetric (real Hermitian), it has 3 real eigenvalues I₁, I₂, I₃ (principal moments) and orthogonal eigenvectors (principal axes).</Step>
        <Step label="In principal frame:">I = diag(I₁, I₂, I₃). Euler&apos;s equations simplify: I₁ω̇₁ = (I₂−I₃)ω₂ω₃, etc.</Step>
        <Step label="Symmetry:">A body with 3-fold or higher symmetry axis has two equal principal moments → axisymmetric top. Spherical symmetry → I₁ = I₂ = I₃ → no precession.</Step>
      </WorkedExample>

      <Definition number="LA.3" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Basis vectors are choices:</strong> physical vectors and states are independent of representation.</li>
          <li><strong>Eigenvectors can be degenerate:</strong> a degenerate eigenspace needs a basis choice.</li>
          <li><strong>Hermitian operators have real eigenvalues:</strong> this is why they represent observables in quantum mechanics.</li>
          <li><strong>Matrix multiplication is not commutative:</strong> operator order can change the result.</li>
        </ul>
      </Definition>

      <PracticeProblems section="LA.1–LA.4 Linear Algebra for Physics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={3} unit="" tolerance={0.01}
          hints={['det(A−λI) = 0. For 2×2: λ² − Tr(A)λ + det(A) = 0.']}
          problemText="Matrix A = [[4,1],[2,3]]. Find the larger eigenvalue."
          solution={<>Tr=7, det=10. λ²−7λ+10=0 → λ=(7±3)/2 → λ=5 or 2. Larger = <strong>5</strong></>}>
          Find the larger eigenvalue of the matrix A = [[4,1],[2,3]].
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={1} unit="" tolerance={0.01}
          hints={['The rank equals the number of linearly independent rows (or columns).']}
          problemText="Matrix A = [[1,2,3],[2,4,6]]. What is the rank of A?"
          solution={<>Row 2 = 2 × Row 1 → rows are linearly dependent. Rank = <strong>1</strong></>}>
          Find the rank of the matrix A = [[1,2,3],[2,4,6]].
        </InteractiveProblem>

        <Problem n={3} difficulty="easy"
          solution={<>Orthonormal basis {'{'}e₁, e₂, e₃{'}'} for ℝ³: eᵢ·eⱼ = δᵢⱼ. Gram-Schmidt from {'{'}v₁=(1,1,0), v₂=(1,0,1), v₃=(0,1,1){'}'}. e₁ = v₁/‖v₁‖ = (1,1,0)/√2. u₂ = v₂ − (v₂·e₁)e₁ = (1,0,1) − (1/√2)(1/√2)(1,1,0) = (1,0,1)−(1/2,1/2,0) = (1/2,−1/2,1). e₂ = u₂/‖u₂‖ = (1/2,−1/2,1)/√(3/2) = (1,−1,2)/√6. u₃ = v₃ − (v₃·e₁)e₁ − (v₃·e₂)e₂ = (0,1,1) − (1/2)(1,1,0)/1 − (1/6)(1,−1,2)/1 ... = (−1/3,1/3,2/3)/‖‖. e₃ = (−1,1,2)/√6 ... orthonormal after calculation. This is Gram-Schmidt orthogonalization, the constructive proof that any basis can be orthonormalized.</>}>
          Apply Gram-Schmidt orthogonalization to the vectors v₁=(1,1,0), v₂=(1,0,1), v₃=(0,1,1) to produce an orthonormal basis.
        </Problem>

        <Problem n={4} difficulty="medium"
          solution={<>Quantum harmonic oscillator: H = ℏω(a†a + 1/2). Ladder operators: a|n⟩ = √n|n−1⟩, a†|n⟩ = √(n+1)|n+1⟩. Matrix of H in basis {'{'}|0⟩, |1⟩, |2⟩, |3⟩{'}'}: H = ℏω × diag(1/2, 3/2, 5/2, 7/2). Already diagonal! Eigenvalues Eₙ = ℏω(n+1/2). Matrix of x = √(ℏ/2mω)(a+a†): x₀₁ = x₁₀ = √(ℏ/2mω) × √1. x₁₂ = x₂₁ = √(ℏ/2mω) × √2. Off-diagonal Hermitian matrix. Selection rule: ⟨m|x|n⟩ ≠ 0 only if m=n±1 — explains why electric dipole transitions only change n by ±1.</>}>
          Write the matrix representations of the harmonic oscillator Hamiltonian H and position operator x in the energy eigenstate basis {'{'}|0⟩, |1⟩, |2⟩, |3⟩{'}'}. What selection rule does this imply?
        </Problem>

        <Problem n={5} difficulty="medium"
          solution={<>Cayley-Hamilton: every matrix satisfies its own characteristic polynomial. For 2×2 A with char poly p(λ) = λ² − (tr A)λ + det A: p(A) = A² − (tr A)A + (det A)I = 0. So A² = (tr A)A − (det A)I. This lets us compute Aⁿ for any n by repeatedly reducing powers. For A = [[1,1],[1,0]] (Fibonacci matrix): tr=1, det=−1. A² = A + I. A³ = A²+A = 2A+I. Aⁿ encodes Fibonacci numbers: [[F(n+1), Fₙ],[Fₙ, F(n-1)]]. Eigenvalues of A: λ = (1±√5)/2 (golden ratio φ and 1−φ). Fibonacci number: Fₙ = (φⁿ − (1−φ)ⁿ)/√5 (Binet&apos;s formula — from diagonalizing A).</>}>
          Use the Cayley-Hamilton theorem to find a recursion for Aⁿ where A = [[1,1],[1,0]]. How does this relate to Fibonacci numbers?
        </Problem>

        <Problem n={6} difficulty="hard"
          solution={<>Functional analysis: operators on infinite-dimensional Hilbert space H = L²(−∞,∞). Position operator x̂: (x̂ψ)(x) = xψ(x). Momentum operator p̂ = −iℏ d/dx. Hermitian: ⟨ψ|x̂|φ⟩ = ∫ψ*(x) xφ(x)dx = ⟨x̂ψ|φ⟩ ✓. Spectrum: x̂ has continuous spectrum (all real numbers) — not L² eigenstates but Dirac delta distributions δ(x−x₀). Commutator [x̂,p̂]ψ = x(−iℏψ&apos;)−(−iℏ)(xψ)&apos; = −iℏxψ&apos; + iℏψ + iℏxψ&apos; = iℏψ. So [x̂,p̂] = iℏ (not zero). Uncertainty: ΔxΔp ≥ ℏ/2 from Cauchy-Schwarz applied to [x̂,p̂] = iℏ (Robertson uncertainty relation). Contrast to finite dimensions: infinite-dimensional operators can have continuous spectra, unbounded operators, domains of definition issues — functional analysis is needed for rigor.</>}>
          Discuss the position and momentum operators as operators on L²(ℝ). Why do they not have normalizable eigenstates? How does the continuous spectrum relate to the uncertainty principle?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Inner product ⟨u,v⟩: Cauchy-Schwarz gives ‖u‖‖v‖ ≥ |⟨u,v⟩|.',
        'Eigenvalues from det(A−λI)=0; eigenvectors span the eigenspace.',
        'Hermitian: A=A†. Eigenvalues real, eigenvectors orthogonal, spectral theorem holds.',
        'Unitary: U†U=I. Eigenvalues on unit circle. Time evolution is unitary (probability conserved).',
        'SVD: A = UΣV†. Foundation of PCA, low-rank approximation, and least squares.',
        'Commuting Hermitian operators share eigenbases — simultaneously measurable observables.',
      ]} />
    </div>
  );
}
