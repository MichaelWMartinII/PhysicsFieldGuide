import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function TensorCalculusPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#06b6d4' }}>Mathematics · Advanced Topics</div>
      <h1>Tensor Calculus &amp; Differential Geometry</h1>
      <p className="subtitle">
        Tensors generalize vectors and matrices to arbitrary rank and coordinate system.
        Differential geometry is their natural home — curved spaces, covariant derivatives,
        and the Riemann curvature tensor are the mathematical language of general relativity
        and gauge theories.
      </p>

      <Prerequisites items={['Linear algebra (Ch. LA)', 'Vectors & calculus (Ch. 21-22)', 'General relativity (Ch. GR)', 'Group theory (Ch. GT)']} />

      <LearningGoals items={[
        'Define a tensor of type (p, q) by its transformation law and explain why tensor equations are valid in all coordinate systems.',
        'Compute Christoffel symbols from the metric and use them to write the covariant derivative and the geodesic equation.',
        'Calculate the Riemann tensor from Christoffel symbols, and obtain the Ricci tensor, Ricci scalar, and Einstein tensor by contraction.',
        'State Stokes\' theorem in differential-form language and show how it unifies the fundamental theorem of calculus, Green\'s theorem, and the divergence theorem.',
        'Write Maxwell\'s equations as F = dA, dF = 0, d(*F) = *J and identify gauge invariance as A → A + dλ.',
      ]} />

      <h2>TC.1 Tensors</h2>

      <Definition number="TC.1" title="Tensor">
        A <strong>tensor</strong> of type (p, q) is a multilinear map from p copies of a
        dual space V* and q copies of a vector space V to the reals. In component form, a
        (1,1) tensor T transforms as:
        <span style={{ display: 'block', marginTop: '0.5rem', textAlign: 'center', fontStyle: 'italic' }}>
          T&apos;^μ_ν = (∂x&apos;^μ/∂x^α)(∂x^β/∂x&apos;^ν) T^α_β
        </span>
        A tensor equation valid in one coordinate system is valid in all — this is the
        power of tensor notation for expressing physical laws (general covariance).
      </Definition>

      <p>
        <strong>Contraction</strong>: sum over a repeated upper and lower index. Contracts
        a (p,q) tensor to (p−1, q−1). The trace: T = T^μ_μ is a scalar.
      </p>

      <p>
        <strong>Raising and lowering indices</strong>: with the metric g_μν:
        T_μ = g_μν T^ν. In flat Minkowski space: g_μν = diag(−1, +1, +1, +1).
      </p>

      <p>
        The <strong>Levi-Civita tensor</strong> ε^μνρσ (totally antisymmetric, ε^0123 = 1/√(−g))
        is used to construct dual tensors and volume forms.
      </p>

      <h2>TC.2 Covariant Derivative and Christoffel Symbols</h2>

      <p>
        On a curved manifold, ordinary partial derivatives do not transform as tensors.
        The <strong>covariant derivative</strong> corrects for the change of basis:
      </p>

      <EqNumbered number="TC.1">∇_μ V^ν = ∂_μ V^ν + Γ^ν_μλ V^λ &nbsp;&nbsp;&nbsp; (covariant derivative of a vector)</EqNumbered>

      <EqNumbered number="TC.2">Γ^λ_μν = ½ g^λσ (∂_μ g_νσ + ∂_ν g_μσ − ∂_σ g_μν) &nbsp;&nbsp;&nbsp; (Christoffel symbols)</EqNumbered>

      <p>
        The Christoffel symbols are NOT tensors (they vanish in local inertial frames).
        Key properties: Γ^λ_μν = Γ^λ_νμ (symmetric in lower indices), metric compatibility
        ∇_λ g_μν = 0 (parallel transport preserves lengths).
      </p>

      <p>
        <strong>Geodesic equation</strong>: the straightest path on a curved manifold
        (generalizes straight lines). Free-falling particles follow geodesics:
      </p>

      <EqNumbered number="TC.3">d²x^μ/dτ² + Γ^μ_νρ (dx^ν/dτ)(dx^ρ/dτ) = 0 &nbsp;&nbsp;&nbsp; (geodesic equation)</EqNumbered>

      <h2>TC.3 Curvature</h2>

      <p>
        The <strong>Riemann curvature tensor</strong> measures the failure of parallel transport
        around a loop. The commutator of covariant derivatives:
      </p>

      <EqNumbered number="TC.4">[∇_μ, ∇_ν] V^ρ = R^ρ_σμν V^σ &nbsp;&nbsp;&nbsp; (defines the Riemann tensor)</EqNumbered>

      <EqNumbered number="TC.5">R^ρ_σμν = ∂_μ Γ^ρ_νσ − ∂_ν Γ^ρ_μσ + Γ^ρ_μλ Γ^λ_νσ − Γ^ρ_νλ Γ^λ_μσ</EqNumbered>

      <p>
        Contractions give lower-rank tensors:
        <strong>Ricci tensor</strong>: R_μν = R^λ_μλν (trace of Riemann).
        <strong>Ricci scalar</strong>: R = g^μν R_μν (full trace).
        <strong>Einstein tensor</strong>: G_μν = R_μν − ½ g_μν R (divergence-free: ∇^μ G_μν = 0).
      </p>

      <p>
        Symmetries of Riemann: R_μνρσ = −R_νμρσ, R_μνρσ = −R_μνσρ, R_μνρσ = R_ρσμν,
        R_μ[νρσ] = 0 (first Bianchi). Number of independent components: n²(n²−1)/12
        (= 20 in 4D spacetime).
      </p>

      <WorkedExample number="TC.1" title="Christoffel Symbols for the 2-Sphere">
        <p>
          Calculate the Christoffel symbols for the 2-sphere ds² = R²(dθ² + sin²θ dφ²).
        </p>
        <Step label="Metric:">g_θθ = R², g_φφ = R² sin²θ, g_θφ = 0. Inverse: g^θθ = 1/R², g^φφ = 1/(R²sin²θ).</Step>
        <Step label="Non-zero symbols:">Γ^θ_φφ = −½ g^θθ ∂_θ g_φφ = −½(1/R²) × 2R² sinθ cosθ = −sinθ cosθ.</Step>
        <Step label="More symbols:">Γ^φ_θφ = Γ^φ_φθ = ½ g^φφ ∂_θ g_φφ = ½(1/R²sin²θ) × 2R² sinθ cosθ = cosθ/sinθ = cot θ.</Step>
        <Step label="Geodesics:">Great circles! The geodesic equation gives d²θ/ds² − sinθ cosθ (dφ/ds)² = 0. For equatorial orbit θ=π/2: dΓ = const (great circle). Deviation from great circle: parallel transport of a vector around the equator rotates it by 2π steradians solid angle = 2π (1-cosθ) for a loop at colatitude θ. This geometric phase is holonomy — related to Berry phase.</Step>
      </WorkedExample>

      <h2>TC.4 Differential Forms</h2>

      <p>
        A <strong>p-form</strong> is a totally antisymmetric (0,p) tensor. They integrate
        naturally over p-dimensional surfaces:
      </p>

      <EqNumbered number="TC.6">ω = ω_(μ₁...μₚ) dx^μ₁ ∧ ... ∧ dx^μₚ &nbsp;&nbsp;&nbsp; (p-form)</EqNumbered>

      <p>
        The <strong>exterior derivative</strong> d maps p-forms to (p+1)-forms: d² = 0 (nilpotent).
        The <strong>Hodge star</strong> * maps p-forms to (n−p)-forms (n = dimension).
      </p>

      <Theorem number="TC.1" title="Stokes' Theorem (General)">
        For any (n−1)-form ω on an n-manifold M with boundary ∂M:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          ∫_M dω = ∫_(∂M) ω
        </span>
        This unifies: the fundamental theorem of calculus (n=1), Green&apos;s theorem (n=2),
        Stokes&apos; theorem (n=3), and the divergence theorem (n=3). Maxwell&apos;s equations in
        form language: dF = 0 (Bianchi), d(*F) = *J (equation of motion) — elegant and
        coordinate-free.
      </Theorem>

      <p>
        <strong>Gauge theory in form language:</strong> the electromagnetic potential is a 1-form
        A = A_μ dx^μ. Field strength: F = dA = (∂_μ A_ν − ∂_ν A_μ) dx^μ ∧ dx^ν.
        Gauge transformation: A → A + dλ (for scalar λ). F is gauge-invariant: d(dλ) = 0.
        Non-Abelian gauge fields (Yang-Mills): F = dA + A ∧ A — the A∧A term encodes
        self-interaction (gluons interact with gluons).
      </p>

      <h2>TC.5 Fiber Bundles and Topology</h2>

      <p>
        A <strong>fiber bundle</strong> is a manifold E (total space) that locally looks like
        a product B × F (base × fiber) but may be twisted globally. Physical examples:
      </p>

      <p>
        <strong>Tangent bundle TM:</strong> at each point of spacetime, attach the tangent
        space. Tensors are sections of tensor products of TM and T*M.
      </p>

      <p>
        <strong>Principal bundle:</strong> a Lie group G acts on the fiber. Gauge fields are
        connections on principal bundles. Curvature of the connection = field strength F.
        The <strong>Chern-Weil homomorphism</strong> maps topological invariants
        (Chern classes) to integrals of F ∧ F — this is the mathematical basis of the TKNN
        formula in topological insulators.
      </p>

      <p>
        <strong>Characteristic classes:</strong> Chern class c₁(E) = [F/(2π)] ∈ H²(M, ℤ) — the
        integral of F/(2π) over a closed surface is an integer (first Chern number). This
        is the mathematical origin of quantization in physics: charge quantization, magnetic
        monopole charge, quantum Hall conductance.
      </p>

      <Definition number="TC.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Indices are bookkeeping, not decoration:</strong> upper and lower positions encode transformation behavior.</li>
          <li><strong>Repeated indices imply summation:</strong> free indices must match on both sides of an equation.</li>
          <li><strong>Partial derivatives are not tensorial in curved coordinates:</strong> covariant derivatives correct for connection terms.</li>
          <li><strong>The metric raises and lowers indices:</strong> it also defines lengths, angles, and contractions.</li>
        </ul>
      </Definition>

      <PracticeProblems section="TC.1–TC.5 Tensor Calculus">
        <InteractiveProblem n={1} difficulty="easy"
          answer={2} unit="R⁻²" tolerance={0.02}
          hints={['In 2D, the only independent component is R_(θφθφ) = R² sin²θ.', 'Ricci scalar: R_scalar = g^(θθ) g^(φφ) R_(θφθφ) × 2 / det(g) — simplify to 2/R².']}
          problemText="Calculate the Ricci scalar R for a unit 2-sphere (R = 1 m). Enter the numerical prefactor in the result R = ?/R²."
          solution={<>Riemann tensor for a 2-sphere of radius R. In 2D, the Riemann tensor has only one independent component: R_(θφθφ). Compute from Christoffel symbols: R^θ_φθφ = ∂_θ Γ^θ_φφ − ∂_φ Γ^θ_θφ + Γ^θ_θλ Γ^λ_φφ − Γ^θ_φλ Γ^λ_θφ. Γ^θ_φφ = −sinθ cosθ, all others: Γ^θ_θφ = 0. R^θ_φθφ = ∂_θ(−sinθ cosθ) − 0 + 0 − Γ^θ_φφ Γ^φ_θφ. = −(cos²θ − sin²θ) + sinθ cosθ × cotθ = −cos²θ + sin²θ + cos²θ = sin²θ. Riemann tensor: R_(θφθφ) = g_(θθ) R^θ_φθφ = R² sin²θ. Ricci scalar: R = 2R_(θφθφ)/g = 2R²sin²θ/(R²×R²sin²θ) = 2/R². Constant curvature R = 2/R² as expected for a sphere. Gaussian curvature K = 1/R² (sectional curvature). This is why on a sphere of radius R, the excess angle in a triangle is A/(R²) where A is area.</>}>
          Calculate the Riemann tensor and Ricci scalar for a 2-sphere of radius R. Verify that R = 2/R².
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={90} unit="degrees" tolerance={0.02}
          hints={['The holonomy equals the solid angle Ω subtended by the spherical triangle.', 'This right-angled triangle (vertices at N pole, equator φ=0, equator φ=π/2) encloses Ω = π/2 steradians → rotation angle π/2 rad = 90°.']}
          problemText="Parallel transport a vector around a spherical triangle (North Pole, equator φ=0, equator φ=π/2). By what angle (in degrees) does the vector rotate after the loop?"
          solution={<>Parallel transport on a sphere: take a vector V tangent to the sphere at the North Pole (θ=0), pointing in the φ=0 direction (East). Transport along: (1) the 0° meridian to the equator (θ=π/2). (2) Along the equator from φ=0 to φ=π/2. (3) Back up the 90° meridian to the North Pole. Path 1 (meridian): ∇_θ V = 0 along θ. V_θ remains 0, V_φ changes: dV_φ/dθ + Γ^φ_θφ V_φ = dV_φ/dθ + cotθ V_φ = 0 → V_φ ∝ sinθ. Path 2 (equator, θ=π/2): ∇_φ V = 0. V_θ changes: dV_θ/dφ + Γ^θ_φφ V_φ = dV_θ/dφ − sinθ cosθ V_φ = dV_θ/dφ at θ=π/2 (cosπ/2=0). So V_θ = const, V_φ = const. Path 3 (back up meridian): reversed process. Net result: V rotates by the solid angle Ω subtended by the triangle = π/2 (for this triangle). This is holonomy. The phase rotation = Ω/2 for spin-½ (Berry phase). For a full loop on the sphere: holonomy = solid angle of enclosed region.</>}>
          Parallel transport a vector around a spherical triangle with vertices at the North Pole, (θ=π/2, φ=0), and (θ=π/2, φ=π/2). By what angle (degrees) is the vector rotated?
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Maxwell's equations in form language. 4D spacetime, F = dA. Component: F_μν = ∂_μ A_ν − ∂_ν A_μ. F_01 = E_x, F_12 = B_z, etc. (with c=1). Bianchi identity: dF = 0 → ∂_λ F_μν + ∂_μ F_νλ + ∂_ν F_λμ = 0 (cyclic). In 3+1: these give ∇·B = 0 and ∇×E + ∂B/∂t = 0 (source-free Maxwell equations). d(*F) = *J. Explicitly: ∂_μ F^μν = J^ν → ∇·E = ρ/ε₀ and ∇×B − ∂E/∂t = μ₀J. So: dF = 0 gives two source-free equations; d*F = *J gives two equations with sources. Conservation: d(*J) = d(d*F) = 0 → ∂_μ J^μ = 0 (charge conservation). Gauge invariance: A → A + dλ, F → F + d(dλ) = F (F is gauge invariant). In non-Abelian (Yang-Mills): F = dA + [A, A] (Lie bracket). d_A F = 0 (covariant Bianchi). d_A *F = *J (equation of motion).</>}>
          Write Maxwell's equations in differential form language: F = dA, dF = 0, d(*F) = *J. Show how these reduce to the standard vector equations.
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Chern-Simons theory in 2+1D: L = k/(4π) Tr(A∧dA + (2/3)A∧A∧A). This is a topological field theory — no metric appears. Equations of motion: F = dA + A∧A = 0 (flat connection). Gauge invariance: under A → g^(-1)Ag + g^(-1)dg, L changes by a boundary term + topological winding number term (k must be integer for gauge invariance of e^(iS)). The coupling k is the level. Hilbert space: topological states = representation of mapping class group of the spatial surface. For k=1 on a torus: dim H = 1 (Abelian, U(1)). Anyon statistics: loop around Wilson line gives phase e^(2πi/k) → anyons with statistics θ = π/k. Quantum Hall: k = ν^(-1) for filling fraction ν. Laughlin state ν=1/3: k=3, anyon charge e/3, phase θ = π/3. Topological quantum computation: braiding non-Abelian anyons (k≥2 non-Abelian) implements unitary gates. Jones polynomial of knots = Chern-Simons partition function on 3-sphere (Witten 1989, Fields Medal).</>}>
          Describe Chern-Simons theory and its role in the fractional quantum Hall effect. What is the connection between the Chern-Simons level k, anyon statistics, and the filling fraction?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Tensors transform as products of Jacobians. Tensor equations are coordinate-independent.',
        'Covariant derivative: ∇_μ V^ν = ∂_μ V^ν + Γ^ν_μλ V^λ. Metric compatible: ∇g = 0.',
        'Riemann tensor R^ρ_σμν: measures curvature via [∇_μ, ∇_ν] V^ρ. Ricci scalar R = g^μν R_μν.',
        'Differential forms: d² = 0. Stokes: ∫_M dω = ∫_(∂M) ω — unifies all integration theorems.',
        'Maxwell in forms: F = dA, dF = 0, d*F = *J. Gauge: A → A + dλ leaves F invariant.',
        'Fiber bundles: connections = gauge fields, curvature = field strength. Chern numbers are topological integers.',
      ]} />
    </div>
  );
}
