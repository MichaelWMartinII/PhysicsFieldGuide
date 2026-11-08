import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals, InlineMath
} from '@/components/textbook';

export default function PerturbationPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Upper Division</div>
      <h1>Perturbation Theory</h1>
      <p className="subtitle">
        Most quantum systems cannot be solved exactly. Perturbation theory gives corrections
        to known solutions when the Hamiltonian is close to a solvable one — and time-dependent
        perturbation theory gives transition rates for interactions with radiation.
      </p>

      <Prerequisites items={['Quantum mechanics (Ch. 22)', 'Spin & angular momentum (Ch. SP)', 'Linear algebra']} />

      <LearningGoals items={[
        'Compute first- and second-order energy corrections using time-independent perturbation theory.',
        'Diagonalize the perturbation within a degenerate subspace to find the "good" zero-order states.',
        'Analyze the linear Stark effect in hydrogen n=2 using degenerate perturbation theory.',
        'Apply Fermi\'s Golden Rule to calculate transition rates from an initial state to a continuum.',
        'Estimate the helium ground-state energy using the variational method with a trial wavefunction.',
      ]} />

      <h2>PT.1 Time-Independent Perturbation Theory</h2>

      <p>
        Split the Hamiltonian H = H₀ + λH&apos;, where H₀ is solvable (eigenstates |n⟩, energies
        Eₙ⁰) and λH&apos; is a small perturbation. Expand energies and states in powers of λ:
      </p>

      <EqNumbered number="PT.1" latex="E_n = E_n^{(0)} + \lambda E_n^{(1)} + \lambda^2 E_n^{(2)} + \cdots \qquad |n\rangle = |n^{(0)}\rangle + \lambda |n^{(1)}\rangle + \cdots" />

      <p>
        Substituting into H|n⟩ = Eₙ|n⟩ and collecting powers of λ:
      </p>

      <EqNumbered number="PT.2" latex="E_n^{(1)} = \langle n^{(0)}|H'|n^{(0)}\rangle \qquad \text{(first-order energy correction)}" />

      <EqNumbered number="PT.3" latex="E_n^{(2)} = \sum_{m \ne n} \frac{|\langle m^{(0)}|H'|n^{(0)}\rangle|^2}{E_n^{(0)} - E_m^{(0)}} \qquad \text{(second-order)}" />

      <p>
        The second-order energy correction is always negative for the ground state (E₀² &lt; 0),
        since the ground state energy Eₙ⁰ is the lowest and all denominator terms are negative.
        This means perturbations always lower the ground state energy (or leave it unchanged).
      </p>

      <WorkedExample number="PT.1" title="Anharmonic Oscillator">
        <p>
          H = p²/2m + ½mω²x² + λx⁴ (harmonic oscillator with quartic perturbation). Find the
          first-order energy correction for the nth level.
        </p>
        <Step label="Matrix element:">Eₙ¹ = λ⟨n|x⁴|n⟩. Express x = (ℏ/2mω)^(1/2)(a + a†).</Step>
        <Step label="x⁴:">x⁴ = (ℏ/2mω)² (a+a†)⁴. Expand and keep normal-ordered terms.</Step>
        <Step label="⟨n|x⁴|n⟩:">Only terms with equal numbers of a and a† contribute: ⟨n|x⁴|n⟩ = (ℏ/2mω)²(6n²+6n+3).</Step>
        <Step label="Energy:">Eₙ = ℏω(n+½) + λ(ℏ/2mω)²(6n²+6n+3)</Step>
        <Step label="Physical content:">The anharmonic correction grows as n² — higher levels are shifted more. This explains why real molecular vibrations (Morse potential) have levels that get closer together at high n.</Step>
      </WorkedExample>

      <h2>PT.2 Degenerate Perturbation Theory</h2>

      <p>
        When multiple states share the same unperturbed energy Eₙ⁰, the first-order formula
        breaks down (zero denominators). Instead, diagonalize H&apos; within the degenerate subspace:
      </p>

      <EqNumbered number="PT.4" latex="\det\left(H'_{\alpha\beta} - E^{(1)}\delta_{\alpha\beta}\right) = 0 \qquad \text{where} \quad H'_{\alpha\beta} = \langle \alpha^{(0)}|H'|\beta^{(0)}\rangle" />

      <p>
        The eigenvalues E¹ are the first-order energy corrections; the eigenvectors are the
        "good" zero-order states (the correct linear combinations within the degenerate subspace).
        This procedure is essential for understanding the Stark effect (hydrogen in electric
        field), the Zeeman effect (in magnetic field), and crystal field splitting.
      </p>

      <WorkedExample number="PT.2" title="Linear Stark Effect in Hydrogen n=2">
        <p>
          Hydrogen atom in electric field E = Eẑ. Perturbation H&apos; = eEz = eEr cos θ.
          Find the first-order energy splitting of the n=2 level.
        </p>
        <Step label="n=2 states:">|200⟩, |210⟩, |211⟩, |21−1⟩ — four degenerate states (4-fold degeneracy).</Step>
        <Step label="Selection rules:">H&apos; is odd under parity (z → −z), so ⟨nlm|z|nlm⟩ = 0. Off-diagonal: ⟨200|z|210⟩ ≠ 0 by parity (different l).</Step>
        <Step label="Only nonzero matrix element:">⟨200|eEz|210⟩ = eE ⟨200|r cos θ|210⟩ = −3eEa₀.</Step>
        <Step label="Diagonalize 4×4:">The |211⟩ and |21−1⟩ states decouple (z doesn&apos;t change m). The |200⟩, |210⟩ block has matrix <InlineMath latex="\begin{pmatrix} 0 & -3e\mathcal{E}a_0 \\ -3e\mathcal{E}a_0 & 0 \end{pmatrix}" />.</Step>
        <Step label="Eigenvalues:">E¹ = ±3eEa₀ → levels split into (at least) three: E₀±3eEa₀ and two degenerate middle levels.</Step>
        <Step label="Contrast to ground state:">n=1 has no linear Stark effect (no mixing partner with opposite parity and same energy). It shows only a quadratic Stark effect (E² correction).</Step>
      </WorkedExample>

      <h2>PT.3 Time-Dependent Perturbation Theory</h2>

      <p>
        For a time-varying perturbation H&apos;(t) turned on at t=0, the probability amplitude
        for a transition from |i⟩ to |f⟩ is (to first order):
      </p>

      <EqNumbered number="PT.5" latex="c_f(t) = \frac{1}{i\hbar} \int_0^t \langle f|H'(t')|i\rangle\, e^{i\omega_{fi} t'}\, dt' \qquad \left(\omega_{fi} = (E_f - E_i)/\hbar\right)" />

      <p>
        For a sinusoidal perturbation <InlineMath latex="H' = V e^{-i\omega t}" /> (e.g., a photon field):
      </p>

      <EqNumbered number="PT.6" latex="|c_f(t)|^2 \approx \frac{2\pi}{\hbar^2}\, |\langle f|V|i\rangle|^2\, t\, \delta(\omega_{fi} - \omega)" />

      <p>
        For a continuum of final states with density <InlineMath latex="\rho(E_f)" />, the transition rate (Fermi&apos;s
        Golden Rule) is:
      </p>

      <Theorem number="PT.1" title="Fermi's Golden Rule">
        The transition rate from initial state |i⟩ to a continuum of final states is:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          <InlineMath latex="\Gamma_{i\to f} = \frac{2\pi}{\hbar}\, |\langle f|H'|i\rangle|^2\, \rho(E_f)" />
        </span>
        This is one of the most used formulas in all of physics — it governs radioactive decay,
        photoionization, neutron scattering, nuclear reactions, and laser physics.
        The δ-function in energy (energy conservation) and the density of states determine
        which transitions are fast and which are slow.
      </Theorem>

      <Definition number="PT.1" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Perturbation theory needs a small parameter:</strong> large corrections signal breakdown.</li>
          <li><strong>Degeneracy must be handled first:</strong> diagonalize the perturbation inside the degenerate subspace.</li>
          <li><strong>Energy denominators matter:</strong> nearly degenerate states can dominate corrections.</li>
          <li><strong>Series may be asymptotic:</strong> more terms do not always mean a better answer.</li>
        </ul>
      </Definition>

      <PracticeProblems section="PT.1–PT.3 Perturbation Theory">
        <InteractiveProblem n={1} difficulty="easy"
          answer={3} unit="eV" tolerance={0.02}
          hints={['E₁ = ⟨n⁰|H\'|n⁰⟩. For a uniform bump V₀ over the whole box: E₁¹ = V₀.']}
          problemText="Ground state of particle in box. Uniform perturbation H' = V₀ = 3 eV added everywhere. First-order correction E₁¹ (eV)?"
          solution={<>E₁¹ = ⟨ψ₁|V₀|ψ₁⟩ = V₀ ∫₀ᴸ |ψ₁|² dx = V₀ = <strong>3 eV</strong> (normalized wavefunction, uniform potential)</>}>
          A uniform perturbation H' = V₀ = 3 eV is added to the entire box. Find the first-order energy correction to the ground state.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={3} unit="eEa₀" tolerance={0.02}
          hints={['Stark splitting of n=2: eigenvalues E¹ = ±3eEa₀. Splitting = 6eEa₀ total, each level shifts by ±3eEa₀.']}
          problemText="Linear Stark effect for H n=2: matrix element ⟨200|eEz|210⟩ = −3eEa₀. Largest energy shift (in units of eEa₀)?"
          solution={<>Eigenvalues of the 2×2 block: E¹ = ±3eEa₀. Largest shift = <strong>3eEa₀</strong> (in magnitude)</>}>
          For the linear Stark effect in hydrogen n=2, the key matrix element is −3eEa₀. What is the magnitude of the largest first-order energy shift?
        </InteractiveProblem>

        <Problem n={3} difficulty="easy"
          solution={<>Ground state of infinite square well with bump: H₀ = −ℏ²/(2m) d²/dx² in [0,L]. Eigenstates: ψₙ = √(2/L) sin(nπx/L), Eₙ = n²π²ℏ²/(2mL²). Perturbation H&apos; = V₀ for L/4 &lt; x &lt; 3L/4, else 0. First-order correction: E₁¹ = ⟨1|H&apos;|1⟩ = V₀(2/L)∫_(L/4)^(3L/4) sin²(πx/L) dx = V₀(2/L)(L/4 + L/(2π)) = <strong>V₀(1/2 + 1/π)</strong>. For a narrow bump of width δ at center x=L/2: E₁¹ ≈ (2/L)V₀δ sin²(π/2) = 2V₀δ/L. The ground state is shifted up — the bump adds energy proportional to |ψ₁(x_bump)|², highest at center and zero at the walls.</>}>
          Compute the first-order energy correction to the ground state of a particle in a box when a small potential bump V₀ is added in the middle half (L/4 &lt; x &lt; 3L/4).
        </Problem>

        <Problem n={4} difficulty="medium"
          solution={<>Quadratic Stark effect for hydrogen ground state: H&apos; = eEz. E₁¹ = ⟨100|eEz|100⟩ = 0 (parity). E₁² = Σ(nlm≠100) |⟨nlm|eEz|100⟩|²/(E₁−Eₙ). Only l=1 terms contribute (selection rule Δl=±1). Exact sum: E₁² = −(9/4)(4πε₀)a₀³E². Writing E₁² = −½αE² gives the polarizability α = 4πε₀ × (9/2)a₀³. The polarizability of hydrogen is α = 4πε₀ × (9/2)a₀³, a polarizability volume of 4.5a₀³ ≈ 0.667 Å³. This quadratic dependence E ∝ E² gives the Stark splitting for the n=1 level.</>}>
          Find the quadratic Stark effect (second-order energy correction) for the hydrogen ground state in a uniform electric field. What is the polarizability?
        </Problem>

        <Problem n={5} difficulty="medium"
          solution={<>Fermi&apos;s Golden Rule for photoelectric effect: electron in hydrogen |nlm⟩ + photon → free electron |k⟩. H&apos; = (e/m)A·p where A is vector potential (proportional to E). Dipole approximation: H&apos; ≈ eE·r. Matrix element: M = ⟨k|eE·r|1s⟩ = eE · ∫ψ_k*(r) r ψ_1s(r) d³r. Cross section σ ∝ |M|² ρ(E_f). For ψ_k = plane wave e^(ik·r)/√V: |M|² peaks when k is along E (polarization dependence). Total σ ∝ ω^(−7/2) for ω well above threshold — the fast decrease with photon energy (more energetic photons less likely absorbed). Angle distribution: dσ/dΩ ∝ cos²θ (between k and E) — photoelectrons preferentially emitted along the field.</>}>
          Apply Fermi&apos;s Golden Rule to the photoelectric effect: absorption of a photon by a hydrogen atom in the ground state. What is the angular distribution of photoelectrons?
        </Problem>

        <Problem n={6} difficulty="hard"
          solution={<>Variational principle: for any trial state |Ψ(α)⟩, ⟨H⟩ ≥ E_ground. Helium: H = −ℏ²/(2m)(∇₁²+∇₂²) − 2e²/(4πε₀r₁) − 2e²/(4πε₀r₂) + e²/(4πε₀r₁₂). Trial: ψ = Z_eff³/(πa₀³) exp(−Z_eff(r₁+r₂)/a₀) — hydrogenic with Z_eff as variational parameter. ⟨H⟩ = [Z_eff² − 2Z·Z_eff + (5/8)Z_eff] × (e²/4πε₀a₀) where Z=2. Minimize: d⟨H⟩/dZ_eff = 0 → Z_eff = Z − 5/16 = 2 − 5/16 = 27/16 = 1.6875. E_min = −(27/16)² × E_H/2 × 2 = −77.5 eV. Compared to measured −79.0 eV — 2% error, much better than perturbation theory (−74.8 eV). Z_eff &lt; Z because one electron partially screens the nucleus from the other.</>}>
          Use the variational method with hydrogenic trial wavefunctions to estimate the ground-state energy of helium. Why is Z_eff &lt; 2?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'First-order energy correction: Eₙ¹ = ⟨n⁰|H\'|n⁰⟩ — just the expectation value of the perturbation.',
        'Second-order correction: Eₙ² = Σ_{m≠n} |⟨m|H\'|n⟩|²/(Eₙ−Eₘ). Always lowers ground state energy.',
        'Degenerate case: diagonalize H\' within the degenerate subspace first.',
        'Fermi\'s Golden Rule: Γ = (2π/ℏ)|⟨f|H\'|i⟩|²ρ(E_f) — governs all decay and absorption rates.',
        'Selection rules come from matrix element ⟨f|H\'|i⟩ vanishing by symmetry (parity, angular momentum).',
        'Variational principle: ⟨ψ|H|ψ⟩ ≥ E_ground — minimize over trial states for upper bound.',
      ]} />
    </div>
  );
}
