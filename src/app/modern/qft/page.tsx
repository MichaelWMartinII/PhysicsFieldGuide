import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals, InlineMath
} from '@/components/textbook';

export default function QFTPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Advanced Topics</div>
      <h1>Introduction to Quantum Field Theory</h1>
      <p className="subtitle">
        Quantum field theory (QFT) unifies quantum mechanics with special relativity. Fields
        replace particles as the fundamental objects; particles are quanta of the field.
        QFT underlies the Standard Model and is the most precisely tested theory in physics.
      </p>

      <Prerequisites items={['Quantum mechanics (Ch. 22)', 'Special relativity (Ch. 21)', 'Lagrangian mechanics (Ch. L)', 'Complex analysis (Ch. CA)']} />

      <LearningGoals items={[
        'Quantize the real scalar field using canonical commutation relations and interpret particle states as field quanta.',
        'Derive the Dirac equation from the requirement of a first-order relativistic wave equation and identify its predictions.',
        'Write the QED Lagrangian, derive the Feynman rules, and compute the tree-level e⁻μ⁻ scattering amplitude.',
        'Explain dimensional regularization and the renormalization procedure for absorbing UV divergences in QED.',
        'Interpret the beta function and describe asymptotic freedom in QCD versus the Landau pole in QED.',
      ]} />

      <h2>QF.1 From Particles to Fields</h2>

      <p>
        In non-relativistic quantum mechanics, a single particle is described by a wavefunction
        ψ(x,t). But in relativistic theory, particle number is not conserved — a high-energy
        collision can create particle-antiparticle pairs. We need a formalism that allows
        for variable particle number.
      </p>

      <p>
        The solution: <strong>quantize the field itself</strong>. Just as the harmonic oscillator
        is quantized by replacing x and p with operators satisfying [x̂, p̂] = iℏ, we quantize
        the field φ(x,t) by imposing canonical commutation relations:
      </p>

      <EqNumbered number="QF.1" latex="[\hat\phi(\mathbf{x},t), \hat\pi(\mathbf{y},t)] = i\hbar\, \delta^3(\mathbf{x} - \mathbf{y}) \qquad \text{(canonical commutation relations for fields)}" />

      <p>
        where <InlineMath latex="\pi(x,t) = \partial\mathcal{L}/\partial(\partial\phi/\partial t)" /> is the conjugate momentum density. This promotes the
        classical field to an operator-valued distribution.
      </p>

      <h2>QF.2 The Klein-Gordon Field</h2>

      <p>
        The simplest relativistic field: a real scalar field φ(x,t) with Lagrangian density:
      </p>

      <EqNumbered number="QF.2" latex="\mathcal{L} = \tfrac{1}{2}(\partial_\mu \phi)(\partial^\mu \phi) - \tfrac{1}{2}m^2\phi^2 \qquad \text{(Klein-Gordon Lagrangian density)}" />

      <p>
        The Euler-Lagrange equations give the <strong>Klein-Gordon equation</strong>:
      </p>

      <EqNumbered number="QF.3" latex="(\Box + m^2)\phi = 0 \qquad \text{where } \Box = \partial^2/\partial t^2 - \nabla^2 \ \text{(d'Alembertian)}" />

      <p>
        This is the relativistic wave equation for a spin-0 particle of mass m (in natural units
        ℏ = c = 1). The dispersion relation: E² = p² + m², i.e., E = √(p² + m²).
      </p>

      <p>
        Expanding in Fourier modes — each mode is a harmonic oscillator:
      </p>

      <EqNumbered number="QF.4" latex="\hat\phi(x) = \int \frac{d^3p}{(2\pi)^3} \frac{1}{\sqrt{2E_p}} \left[\hat a_p\, e^{ip\cdot x} + \hat a^\dagger_p\, e^{-ip\cdot x}\right]" />

      <p>
        where <InlineMath latex="\hat a_p" /> and <InlineMath latex="\hat a^\dagger_p" /> are annihilation and creation operators satisfying
        <InlineMath latex="[\hat a_p, \hat a^\dagger_q] = (2\pi)^3 \delta^3(\mathbf{p} - \mathbf{q})" />. The vacuum |0⟩ is the state with <InlineMath latex="\hat a_p|0\rangle = 0" /> for all p.
        A single particle of momentum p is: <InlineMath latex="|p\rangle = \sqrt{2E_p}\, \hat a^\dagger_p |0\rangle" />.
      </p>

      <Definition number="QF.1" title="Normal Ordering and Vacuum Energy">
        The Hamiltonian contains a sum over zero-point energies: H = ∫ d³p/(2π)³ × E_p ×
        (â†_p â_p + ½). The ½ per mode gives a formally infinite vacuum energy — the
        first encounter with the ultraviolet divergences of QFT.
        <span style={{ display: 'block', marginTop: '0.5rem' }}>
          <strong>Normal ordering</strong> :O: places all creation operators left of annihilation
          operators, dropping the zero-point energy: :H: = ∫ d³p/(2π)³ × E_p × â†_p â_p.
          Physical observables are measured relative to the vacuum, so this subtraction is
          physically motivated (though the cosmological constant problem shows it's subtle).
        </span>
      </Definition>

      <h2>QF.3 The Dirac Field</h2>

      <p>
        Spin-½ particles require the <strong>Dirac equation</strong>. Dirac sought a
        first-order (in time) relativistic wave equation:
      </p>

      <EqNumbered number="QF.5" latex="(i\gamma^\mu \partial_\mu - m)\psi = 0 \qquad \text{(Dirac equation)}" />

      <p>
        where <InlineMath latex="\gamma^\mu" /> are 4×4 gamma matrices satisfying the Clifford algebra
        <InlineMath latex="\{\gamma^\mu, \gamma^\nu\} = 2g^{\mu\nu} I" />. The Dirac spinor ψ has 4 components —
        two spin states each for particle and antiparticle.
      </p>

      <p>
        The Dirac equation automatically predicts:
      </p>

      <p>
        1. <strong>Spin-½</strong>: the spinor structure gives s = ½ with g-factor g = 2
        (QED corrects this to g = 2.00231930436..., the most precise prediction in physics).
      </p>

      <p>
        2. <strong>Antiparticles</strong>: the negative-energy solutions, reinterpreted via
        Dirac sea or QFT, give the positron (Anderson, 1932 — first antiparticle detected).
      </p>

      <p>
        3. <strong>Spin-statistics theorem</strong>: Dirac fields must be quantized with
        anticommutators <InlineMath latex="\{\psi, \psi^\dagger\} = \delta^3(\mathbf{x} - \mathbf{y})" />, giving the Pauli exclusion principle.
        Scalar fields use commutators (Bose-Einstein statistics).
      </p>

      <h2>QF.4 Interaction and Feynman Diagrams</h2>

      <p>
        Interacting field theories add terms to the Lagrangian. For QED (quantum electrodynamics):
      </p>

      <EqNumbered number="QF.6" latex="\mathcal{L}_{\text{QED}} = \bar\psi(i\gamma^\mu D_\mu - m)\psi - \tfrac{1}{4}F_{\mu\nu} F^{\mu\nu} \qquad \text{where } D_\mu = \partial_\mu + ieA_\mu" />

      <p>
        The covariant derivative <InlineMath latex="D_\mu" /> introduces the interaction: the electron (ψ) couples
        to the photon field (<InlineMath latex="A_\mu" />) with coupling constant e. This is the minimal coupling
        principle — replacing <InlineMath latex="\partial_\mu" /> with <InlineMath latex="D_\mu" /> is gauge invariance in action.
      </p>

      <p>
        Perturbation theory in powers of the fine structure constant α = e²/(4π) ≈ 1/137
        generates <strong>Feynman diagrams</strong>. Each diagram is a term in the perturbation
        series for the scattering amplitude M:
      </p>

      <p>
        — Electron propagator: <InlineMath latex="iS_F(p) = \dfrac{i(\not{p} + m)}{p^2 - m^2 + i\varepsilon}" /> (Feynman propagator)
      </p>
      <p>
        — Photon propagator: <InlineMath latex="iD_F^{\mu\nu} = \dfrac{-ig^{\mu\nu}}{k^2 + i\varepsilon}" /> (in Feynman gauge)
      </p>
      <p>
        — Vertex: <InlineMath latex="-ie\gamma^\mu" /> (from <InlineMath latex="\mathcal{L}_{\text{int}} = -e\bar\psi\gamma^\mu \psi A_\mu" />)
      </p>

      <WorkedExample number="QF.1" title="Electron-Muon Scattering (Tree Level)">
        <p>
          Compute the leading-order amplitude for e⁻μ⁻ → e⁻μ⁻ scattering via photon exchange.
        </p>
        <Step label="Diagram:">One photon exchanged (t-channel): one vertex on electron line, one on muon line, connected by photon propagator. This is O(α) — one power of the coupling e² = 4πα.</Step>
        <Step label="Amplitude:"><InlineMath latex="\mathcal{M} = \left(\bar u(p_3)(-ie\gamma^\mu) u(p_1)\right) \frac{-ig_{\mu\nu}}{q^2} \left(\bar u(p_4)(-ie\gamma^\nu) u(p_2)\right)" /> where q = p₁ - p₃ is the momentum transfer.</Step>
        <Step label="Simplify:"><InlineMath latex="\mathcal{M} = ie^2\, \frac{(\bar u(p_3)\gamma^\mu u(p_1))(\bar u(p_4)\gamma_\mu u(p_2))}{q^2}" /></Step>
        <Step label="Cross section:">|M|² averaged/summed over spins using trace techniques: <InlineMath latex="\operatorname{Tr}[(\not{p}_1 + m)\gamma^\mu(\not{p}_3 + m)\gamma^\nu] \times \cdots" /> The result gives the Mott scattering cross section, reducing to Rutherford at low energy.</Step>
        <Step label="QED precision:">Higher-order corrections (loops) give α/π ≈ 0.23% corrections. QED predictions tested to 10 significant figures — no other theory matches this precision.</Step>
      </WorkedExample>

      <h2>QF.5 Renormalization</h2>

      <p>
        Loop diagrams in QFT contain integrals over all momenta that diverge in the ultraviolet
        (high k → ∞). This is not a disaster — it means the theory requires a <strong>cutoff</strong>
        Λ (the scale where new physics enters), and physical quantities must be expressed in
        terms of measured (renormalized) parameters, not bare (divergent) ones.
      </p>

      <p>
        <strong>Renormalization procedure:</strong>
        (1) Regularize: dim-reg replaces <InlineMath latex="d^4k" /> with <InlineMath latex="d^{4-\varepsilon}k" />, turning ∞ into 1/ε poles.
        (2) Absorb divergences into counterterms: δm, δZ, δe.
        (3) Fix counterterms by renormalization conditions (measured mass, charge at some scale μ).
        (4) Predict everything else — finite, unambiguous.
      </p>

      <p>
        A theory is <strong>renormalizable</strong> if only finitely many counterterms are needed.
        QED, QCD, and the electroweak theory are all renormalizable (proved by 't Hooft, 1971 —
        Nobel Prize 1999). Gravity is non-renormalizable — this is why quantum gravity is hard.
      </p>

      <Theorem number="QF.1" title="Running Coupling Constants">
        Renormalization introduces a scale μ; physical predictions must be μ-independent. This
        gives the <strong>renormalization group equation</strong>:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          <InlineMath latex="\mu \frac{d\alpha}{d\mu} = \beta(\alpha) \qquad \text{(beta function)}" />
        </span>
        <span style={{ display: 'block', marginTop: '0.5rem' }}>
          In QED: β(α) = +2α²/(3π) + ... &gt; 0 — coupling grows at high energy (Landau pole at
          unreachably high scale). In QCD: β(g) = −(11−2n_f/3)g³/(16π²) &lt; 0 for n_f ≤ 16 —
          coupling shrinks at high energy (<strong>asymptotic freedom</strong>, Nobel 2004).
          Unification: α₁, α₂, α₃ all meet at ~10¹⁶ GeV in supersymmetric extensions — hint
          of grand unification.
        </span>
      </Theorem>

      <h2>QF.6 Path Integrals</h2>

      <p>
        Feynman&apos;s path integral formulation provides an elegant route to QFT. The vacuum-to-vacuum
        amplitude (generating functional):
      </p>

      <EqNumbered number="QF.7" latex="Z[J] = \int \mathcal{D}\phi\, \exp\!\left(i \int d^4x\, (\mathcal{L} + J\phi)\right) \qquad \text{(path integral / generating functional)}" />

      <p>
        All correlation functions follow by functional differentiation: <InlineMath latex="\langle\phi(x_1)\cdots\phi(x_n)\rangle = (-i)^n \left.\dfrac{\delta^n Z}{\delta J(x_1)\cdots\delta J(x_n)}\right|_{J=0}" />. For a free field, Z is a Gaussian integral —
        exactly computable. Interactions are treated perturbatively by expanding <InlineMath latex="e^{i\int \mathcal{L}_{\text{int}}}" />
        and applying Wick&apos;s theorem to evaluate the Gaussian integrals — reproducing Feynman diagrams.
      </p>

      <p>
        In Euclidean space (t → −iτ), the path integral <InlineMath latex="Z = \int \mathcal{D}\phi\, e^{-S_E}" /> resembles a
        partition function in statistical mechanics with <InlineMath latex="S_E" /> playing the role of βH.
        This <strong>QFT ↔ stat mech correspondence</strong> is deep: phase transitions
        and critical phenomena are described by the same renormalization group as QFT.
      </p>

      <Definition number="QF.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Fields are primary in QFT:</strong> particles are excitations of fields.</li>
          <li><strong>Gauge choice is not physics:</strong> observables must be gauge invariant.</li>
          <li><strong>Renormalization tracks scale dependence:</strong> infinities are handled by measured parameters and running couplings.</li>
          <li><strong>Vacuum is not empty:</strong> it is the lowest-energy field state with fluctuations.</li>
        </ul>
      </Definition>

      <PracticeProblems section="QF.1–QF.6 Quantum Field Theory">
        <Problem n={1} difficulty="easy"
          solution={<>Klein-Gordon equation (□ + m²)φ = 0. Plane wave: φ = e^(−ip·x) where p·x = p^μ x_μ = Et − p·x. □φ = (∂²/∂t² − ∇²)φ = (−E² + |p|²)φ = −(E² − |p|²)φ. Equation: (−E² + |p|² + m²)φ = 0 → E² = |p|² + m². This is the relativistic energy-momentum relation in natural units c=1. For m=0: E = |p| (massless, photon-like). For p=0: E = m (rest mass energy). Non-relativistic limit (|p| ≪ m): E = m√(1+|p|²/m²) ≈ m + |p|²/(2m) = mc² + p²/(2m) (rest energy + kinetic energy). The KG equation has two solutions: positive energy e^(−iEt) and negative energy e^(+iEt) — in QFT, the negative energy solutions become antiparticles.</>}>
          Show that the plane wave φ = e^(−ip·x) satisfies the Klein-Gordon equation if and only if E² = |p|² + m². What is the non-relativistic limit?
        </Problem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={1.3e-3} unit="Pa" tolerance={0.10}
          hints={[
            'The Casimir energy per unit area is ΔE/A = −ℏcπ²/(720a³). The force per unit area is F/A = −d(ΔE/A)/da = −ℏcπ²/(240a⁴).',
            'For a = 1 μm = 10⁻⁶ m: F/A = (1.055×10⁻³⁴ × 3×10⁸ × π²) / (240 × (10⁻⁶)⁴). Compute numerator and denominator.',
          ]}
          problemText="Derive the Casimir force between two parallel conducting plates separated by a = 1 μm. Calculate the force per unit area in Pa. How does this follow from zero-point energy of the electromagnetic field?"
          solution={<>Casimir effect: two parallel conducting plates separated by distance a. Boundary conditions quantize the allowed modes between the plates: k_n = nπ/a (n=1,2,3,...). Energy per unit area: E/A = (ℏc/2)Σ_n √(k_n² + k_⊥²). Regulated sum (subtract free-space zero-point energy): ΔE/A = −ℏcπ²/(720a³). Force per unit area: F/A = −dE/(Ada) = −ℏcπ²/(240a⁴). For a = 1 μm: F/A = (1.055×10⁻³⁴)(3×10⁸)π²/(240(10⁻⁶)⁴) = 1.3×10⁻³ Pa ≈ 1.3 mPa. First measured 1958 (Sparnaay); precisely confirmed 1997 (Lamoreaux) to ~5% accuracy. Physical interpretation: fewer field modes between the plates than outside → the zero-point fluctuations of the EM field outside push the plates together. This is a real, measurable consequence of vacuum energy.</>}>
          Derive the Casimir force between two parallel plates separated by distance a = 1 μm. What is the force per unit area? How is this related to zero-point energy?
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Spontaneous symmetry breaking: consider L = ½(∂_μ φ)² − V(φ), V = −μ²φ²/2 + λφ⁴/4 (Mexican hat for complex φ). Minimum at φ² = μ²/λ ≡ v². Classical vacuum: φ = v (choose real). Expand: φ = v + η (η = fluctuation). V(v+η) = −μ²(v+η)²/2 + λ(v+η)⁴/4. Expand: mass term for η: m_η² = d²V/dφ²|_(v) = −μ² + 3λv² = −μ² + 3μ² = 2μ² &gt; 0. The field η is massive. For complex φ = (φ₁ + iφ₂)/√2: breaking U(1) symmetry gives one massive mode (radial, mass √2 μ) and one massless Goldstone boson (angular, φ₂). Goldstone theorem: spontaneous breaking of a continuous symmetry → massless scalar for each broken generator. In the Standard Model, W and Z get mass by eating the Goldstone bosons (Higgs mechanism); the remaining Higgs boson h is the massive radial mode.</>}>
          Analyze the spontaneous symmetry breaking for V(φ) = −μ²φ²/2 + λφ⁴/4. Find the vacuum expectation value, the mass of the Higgs-like mode, and identify the Goldstone boson.
        </Problem>

        <InteractiveProblem n={4} difficulty="hard"
          answer={1.16e-3} unit="" tolerance={0.05}
          hints={[
            'The one-loop Schwinger correction to (g-2)/2 is Δ(g/2) = α/(2π). Evaluate this using α ≈ 1/137.',
            'α/(2π) = (1/137)/(2π) = 1/(137 × 6.283) ≈ 1.16×10⁻³.',
          ]}
          problemText="Explain why the electron g-factor differs from 2 in QED and identify the one-loop diagram. Calculate the Schwinger correction Δ(g/2) = α/(2π) numerically using α = 1/137.036."
          solution={<>Anomalous magnetic moment: g-factor of the electron. Tree-level (Dirac): g = 2. First loop correction (one-loop QED): Δ(g/2) = α/(2π) (Schwinger, 1948). This is the most famous result in QFT — computed from the one-loop vertex correction diagram. Numerically: Δg/2 = α/(2π) ≈ 1.16×10⁻³. Full QED series through 5 loops: g/2 = 1 + α/(2π) − 0.328α²/π² + 1.181α³/π³ − ... = 1.001159652181643(764) (theoretical). Experimental: g/2 = 1.00115965218059(13) (Harvard 2023). Agreement to 10 significant figures — the most precise test of any physical theory. The key diagram: fermion emits a virtual photon, propagates, reabsorbs. The photon loop gives log divergence regulated by dim-reg, with the finite part yielding α/2π after renormalization. Higher-order terms involve hundreds of Feynman diagrams (5-loop: 12,672 diagrams computed numerically).</>}>
          Explain why the electron&apos;s g-factor differs from 2 in QED. What diagram contributes at lowest order? Why is the result g/2 = 1 + α/(2π) + ... considered the greatest triumph of theoretical physics?
        </InteractiveProblem>
      </PracticeProblems>

      <Takeaways items={[
        'QFT quantizes fields, not particles. Particles are quanta of field modes. Variable particle number arises naturally.',
        'Klein-Gordon: (□+m²)φ = 0 for spin-0. Dirac: (iγ^μ∂_μ−m)ψ = 0 for spin-½. Both follow from relativistic Lagrangians.',
        'Spin-statistics theorem: integer spin → bosons (commutators), half-integer → fermions (anticommutators).',
        'Feynman rules: propagators, vertices, and loop integrals from the Lagrangian. Tree level = classical limit.',
        'Renormalization: absorb UV divergences into measured parameters. QED, QCD, electroweak all renormalizable.',
        'Running couplings: QED α grows (Landau pole); QCD α_s shrinks (asymptotic freedom). β function governs the flow.',
        'Path integrals: Z[J] = ∫Dφ e^(iS+iJφ). QFT ↔ stat mech: Euclidean path integral = partition function.',
      ]} />
    </div>
  );
}
