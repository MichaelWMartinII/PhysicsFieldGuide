import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function VariationalPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#06b6d4' }}>Mathematics · Advanced Topics</div>
      <h1>Variational Methods</h1>
      <p className="subtitle">
        Variational principles — minimizing or extremizing functionals — underlie nearly all
        of physics. Hamilton&apos;s principle (classical mechanics), Fermat&apos;s principle (optics),
        the variational principle in quantum mechanics, and the Einstein-Hilbert action all
        express physics as the search for an extremal path.
      </p>

      <Prerequisites items={['Lagrangian mechanics (Ch. LA-Mech)', 'Differential equations (Ch. DE)', 'Calculus (Ch. 22)', 'Linear algebra (Ch. LA)']} />

      <LearningGoals items={[
        'Derive the Euler-Lagrange equation from the stationary-action condition δJ = 0 and apply it to standard physical functionals.',
        'Use the Beltrami identity to reduce problems with no explicit x-dependence, and apply it to the brachistochrone and catenary.',
        'Compute a functional derivative δF/δρ and state the Hohenberg-Kohn theorem underlying density functional theory.',
        'Apply the Rayleigh-Ritz method to bound the ground-state energy of the hydrogen atom using a Gaussian trial wavefunction.',
        'Interpret Feynman\'s path integral as a sum over all paths weighted by e^(iS/ℏ) and relate the classical limit ℏ→0 to the stationary-phase approximation.',
      ]} />

      <h2>VM.1 The Euler-Lagrange Equation</h2>

      <p>
        A <strong>functional</strong> maps functions to numbers: J[y] = ∫(a to b) F(x, y, y&apos;) dx.
        The <strong>calculus of variations</strong> finds functions y(x) that make J stationary.
      </p>

      <Theorem number="VM.1" title="Euler-Lagrange Equation">
        A necessary condition for y(x) to extremize J[y] = ∫(a to b) F(x, y, y&apos;) dx
        (with y fixed at endpoints) is:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          ∂F/∂y − d/dx (∂F/∂y&apos;) = 0
        </span>
        Derivation: let y → y + εη where η(a) = η(b) = 0. Then δJ = ε ∫[∂F/∂y η + ∂F/∂y&apos; η&apos;] dx
        = ε ∫[∂F/∂y − d/dx(∂F/∂y&apos;)] η dx = 0 for all η → E-L equation.
        Extensions: multiple functions y_i(x) → one E-L equation per y_i.
        Higher derivatives F(y, y&apos;, y&apos;&apos;, ...) → Ostrogradsky equation.
      </Theorem>

      <p>
        <strong>First integrals</strong>: if F has no explicit x-dependence:
        H = y&apos; ∂F/∂y&apos; − F = const (Beltrami identity — Hamiltonian!).
        If F has no explicit y-dependence: ∂F/∂y&apos; = const (conserved momentum).
      </p>

      <WorkedExample number="VM.1" title="Brachistochrone Problem">
        <p>
          Find the curve of fastest descent between two points A = (0,0) and B = (x₁, y₁)
          under gravity (the brachistochrone).
        </p>
        <Step label="Time functional:">dt = ds/v where v = √(2gy) (energy conservation from rest). ds = √(1+y&apos;²) dx. T = ∫(0 to x₁) √((1+y&apos;²)/(2gy)) dx. Minimize T.</Step>
        <Step label="F has no x:">Use Beltrami: F − y&apos; ∂F/∂y&apos; = const. F = √((1+y&apos;²)/(2gy)). ∂F/∂y&apos; = y&apos;/√(2gy(1+y&apos;²)). Beltrami: 1/√(2gy(1+y&apos;²)) = 1/√(2g c²) (constant).</Step>
        <Step label="Simplify:">y(1+y&apos;²) = c² = const. Parametric solution: x = c²(θ − sinθ)/2, y = c²(1 − cosθ)/2. This is a cycloid — traced by a point on the rim of a rolling circle of radius R = c²/2.</Step>
        <Step label="Result:">The fastest path is NOT the straight line, NOT the circular arc, but the cycloid. Johann Bernoulli (1696) — first solved by Newton, Leibniz, l'Hôpital, and Bernoulli using different methods. The brachistochrone is also the tautochrone (period independent of starting point).</Step>
      </WorkedExample>

      <h2>VM.2 Functional Derivatives</h2>

      <p>
        For a functional F[ρ] = ∫ f(r, ρ(r), ∇ρ(r)) d³r, the functional derivative is:
      </p>

      <EqNumbered number="VM.1">δF/δρ(r) = ∂f/∂ρ − ∇·(∂f/∂(∇ρ)) &nbsp;&nbsp;&nbsp; (functional derivative)</EqNumbered>

      <p>
        This is the continuum analog of a partial derivative. The condition δF/δρ = 0 gives
        the Euler-Lagrange equation for field theories.
      </p>

      <p>
        <strong>Density functional theory (DFT)</strong>: Hohenberg-Kohn theorem (1964) states
        that the ground-state energy of an N-electron system is a functional E[ρ] of the
        electron density ρ(r) alone. The Kohn-Sham equations minimize E[ρ] variationally —
        replacing the interacting problem with an effective non-interacting problem.
        DFT is the workhorse of computational quantum chemistry (Nobel 1998 to Kohn).
      </p>

      <h2>VM.3 Rayleigh-Ritz Method</h2>

      <p>
        Approximate the solution by a finite-dimensional trial function:
        y(x) ≈ Σᵢ cᵢ φᵢ(x). The functional becomes a function of the cᵢ.
        Minimize: ∂J/∂cᵢ = 0 → linear system for the coefficients.
      </p>

      <p>
        For the variational principle in quantum mechanics — approximate ψ by trial function
        ψ_trial(α₁, α₂, ...):
      </p>

      <EqNumbered number="VM.2">E_trial = ⟨ψ_trial|H|ψ_trial⟩/⟨ψ_trial|ψ_trial⟩ ≥ E_0 &nbsp;&nbsp;&nbsp; (variational bound)</EqNumbered>

      <p>
        E_trial is always an upper bound on the ground state energy. The best trial function
        minimizes E_trial. Gaussian basis sets in quantum chemistry (Pople 6-31G* etc.) use
        the Rayleigh-Ritz method to compute electronic structure. The finite element method (FEM)
        for PDEs is another application: divide space into elements, minimize energy.
      </p>

      <h2>VM.4 Isoperimetric Problems and Constraints</h2>

      <p>
        Constrained optimization with a functional constraint G[y] = const uses a
        <strong>Lagrange multiplier</strong>: extremize J[y] − λ G[y].
        The E-L equation becomes:
        ∂(F − λG)/∂y − d/dx ∂(F − λG)/∂y&apos; = 0.
      </p>

      <p>
        <strong>Isoperimetric problem</strong>: maximize the enclosed area for a fixed perimeter
        → solution is a circle (proven by Euler). Equivalent: for a soap bubble, surface tension
        minimizes area for fixed volume → spherical shape.
      </p>

      <p>
        <strong>Plateau&apos;s problem</strong>: find the minimal surface with a given boundary.
        E-L equation: H = 0 (mean curvature = 0). Solutions: catenoid (rotation of a catenary),
        helicoid (helix surface), Schwarz surfaces (triply periodic). Soap films realize these
        automatically.
      </p>

      <h2>VM.5 Path Integrals as Functional Integrals</h2>

      <p>
        Feynman&apos;s path integral quantizes a system by summing over all paths:
      </p>

      <EqNumbered number="VM.3">K(x_f, t_f; x_i, t_i) = ∫ Dx(t) e^(iS[x]/(ℏ)) &nbsp;&nbsp;&nbsp; (Feynman path integral)</EqNumbered>

      <p>
        where S[x] = ∫(t_i to t_f) L(x, ẋ) dt is the action. The classical path (δS = 0 →
        E-L equations) dominates in the limit ℏ → 0 (stationary phase). Quantum fluctuations
        around the classical path give O(ℏ) corrections — the WKB approximation, loop expansion
        in QFT.
      </p>

      <p>
        The <strong>stationary phase approximation</strong>:
        ∫ e^(iS[x]/ℏ) Dx ≈ e^(iS_cl/ℏ) × (det(−δ²S/δx²))^(−1/2) — functional determinant.
        This connects semiclassical mechanics (WKB) to one-loop quantum corrections.
      </p>

      <Definition number="VM.1" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Stationary does not always mean minimum:</strong> actions can be saddle points.</li>
          <li><strong>Boundary conditions are part of the variation:</strong> fixed endpoints change which terms vanish.</li>
          <li><strong>Generalized coordinates need not be Cartesian:</strong> choose coordinates that match constraints.</li>
          <li><strong>Constraints introduce multipliers or reduced coordinates:</strong> ignoring them gives unphysical variations.</li>
        </ul>
      </Definition>

      <PracticeProblems section="VM.1–VM.5 Variational Methods">
        <Problem n={1} difficulty="easy"
          solution={<>Catenary: minimize potential energy of a rope of length L with endpoints fixed. Let y(x) = height. Length constraint: ∫√(1+y&apos;²) dx = L. Potential energy: U = ∫ ρgy√(1+y&apos;²) dx. Lagrange: minimize ∫(ρgy − λ)√(1+y&apos;²) dx. F = (ρgy − λ)√(1+y&apos;²). No explicit x → Beltrami: F − y&apos;∂F/∂y&apos; = const. (ρgy−λ)/√(1+y&apos;²) = C₁. Let λ = ρg c (constant with units of length). Then: (y−c)/√(1+y&apos;²) = const. Substitute: y = c cosh((x−x₀)/c) + C₂. Setting C₂=0, x₀=0: y = c cosh(x/c). The catenary. This is why power lines and suspension bridge cables take this shape (in the absence of load). If load is uniform in x (bridge), the shape is a parabola instead.</>}>
          Find the shape of a hanging chain (catenary) by minimizing the potential energy subject to the constraint of fixed length. Derive the result y = c cosh(x/c).
        </Problem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={-13.6} unit="eV" tolerance={0.02}
          hints={['For ψ = e^(−αr), compute ⟨T⟩ = ℏ²α²/(2m) and ⟨V⟩ = −e²α/(4πε₀).', 'Minimise E(α) = ⟨T⟩ + ⟨V⟩ by setting dE/dα = 0, giving α = 1/a₀. Substitute back.']}
          problemText="Apply the variational principle to hydrogen using trial function ψ = e^(−αr). Minimise ⟨H⟩ over α to find the ground state energy in eV."
          solution={<>Variational principle for the hydrogen atom: trial function ψ = Ne^(−αr). Normalization gives N = (α³/π)^(1/2). For this normalized exponential, ⟨T⟩ = ℏ²α²/(2m) and ⟨1/r⟩ = α, so ⟨V⟩ = −e²α/(4πε₀). Thus E(α) = ℏ²α²/(2m) − e²α/(4πε₀). Minimize: dE/dα = ℏ²α/m − e²/(4πε₀) = 0 → α = me²/(4πε₀ℏ²) = 1/a₀. Then E_min = ℏ²/(2ma₀²) − e²/(4πε₀a₀) = <strong>−13.6 eV</strong>. The trial function e^(−r/a₀) is the exact ground state, so the variational method gives the exact energy.</>}>
          Apply the variational principle to the hydrogen atom using trial function ψ = e^(−αr). Show that minimizing ⟨H⟩ over α gives the exact ground state energy (eV).
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Minimal surface (catenoid): surface of revolution z(r) minimizing area ∫2πr√(1+z&apos;²)dr. E-L equation: d/dr(rz&apos;/√(1+z&apos;²)) = 0 → rz&apos;/√(1+z&apos;²) = c (constant). Solve: z&apos; = c/√(r²−c²). z = c arccosh(r/c) + c₀. Or r = c cosh((z−z₀)/c) — catenoid. Two boundary rings at r=R, z=±d. Stability: for d/R below a critical ratio, catenoid minimizes area. Above critical ratio (d/R &gt; 0.6627...): Goldschmidt discontinuity — the minimal surface is two flat disks z=0 (disconnected). Physically: a soap film between two rings snaps to two flat disks if rings are too far apart. Mean curvature H=0 for the catenoid: one principal curvature is +1/c at z=0 (azimuthal), the other is −1/c (axial) → H = 0 ✓. This is a saddle surface — anti-clastic (the two principal curvatures have opposite sign).</>}>
          Find the minimal surface of revolution (catenoid) as a solution to the Euler-Lagrange equation. What is the Goldschmidt discontinuity?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>One-loop path integral for SHO: Z = ∫Dx e^(-S_E[x]/ℏ) (Euclidean). Classical action: S_E_cl = ½mω² ∫x_cl²dτ (classical trajectory from x_i to x_f). Fluctuations: x = x_cl + y, y(0) = y(β)= 0. S_E[x] = S_E_cl + ½∫y(−m∂²/∂τ² + mω²)y dτ + (cubic...). Quadratic fluctuation: det(−∂²_τ + ω²). Eigenvalues of −∂²/∂τ on [0,β]: λ_n = (2πn/β)² + ω² for n=0,±1,±2,... Functional determinant: det(−∂²+ω²) = Π_n (ω_n² + ω²) where ω_n = 2πn/β. Regulated ratio: det/det_free = sinh(ωβ/2)/(ωβ/2). Partition function: Z = (2 sinh(ωβ/2))^(-1) = e^(-ωβ/2) × 1/(1-e^(-ωβ)) = Σ_n e^(-β ω(n+1/2)) ✓. This reproduces the exact result E_n = ω(n+1/2) (ℏ=1). The functional determinant method computes quantum corrections exactly for quadratic actions.</>}>
          Compute the one-loop path integral for the harmonic oscillator in Euclidean time to find the partition function Z = Tr e^(-βH). Show the functional determinant gives the correct energy levels.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Euler-Lagrange: ∂F/∂y − d/dx(∂F/∂y\') = 0. Derived from δJ = 0 for all variations.',
        'Beltrami identity: if F has no x, then F − y\'∂F/∂y\' = const (energy conservation analog).',
        'Rayleigh-Ritz: approximate by trial functions → upper bound on ground state energy.',
        'Functional derivative: δF/δρ = ∂f/∂ρ − ∇·(∂f/∂∇ρ). DFT minimizes E[ρ] over density.',
        'Brachistochrone → cycloid. Catenary → cosh. Minimal surface → catenoid. All from E-L.',
        'Path integral: K = ∫Dx e^(iS/ℏ). Classical path dominates (ℏ→0). Quantum corrections from fluctuations.',
      ]} />
    </div>
  );
}
