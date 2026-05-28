import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function SolidStatePage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Upper Division</div>
      <h1>Solid-State Physics</h1>
      <p className="subtitle">
        Solids are quantum many-body systems where the Pauli exclusion principle, periodic
        symmetry, and collective behavior produce emergent phenomena — metals, insulators,
        semiconductors, and superconductors — unreachable in any single-particle picture.
      </p>

      <Prerequisites items={['Quantum mechanics (Ch. 20)', 'Statistical mechanics (Ch. S)', 'Fourier analysis (Ch. F)']} />

      <LearningGoals items={[
        'Apply Bloch\'s theorem to describe electron states in a periodic potential using crystal momentum and band index.',
        'Explain how a periodic potential opens band gaps at Brillouin zone boundaries.',
        'Distinguish metals, semiconductors, and insulators by the position of the Fermi level relative to band gaps.',
        'Use the Shockley equation and law of mass action to analyze p-n junction devices.',
        'Describe the BCS theory of superconductivity, Cooper pairs, and the Meissner effect.',
      ]} />

      <h2>SS.1 Crystal Structure and Reciprocal Lattice</h2>

      <p>
        A crystal is a periodic arrangement of atoms. The <strong>Bravais lattice</strong> is
        the set of all translation vectors R = n₁a₁ + n₂a₂ + n₃a₃ (integers nᵢ, primitive
        vectors aᵢ). The <strong>reciprocal lattice</strong> is defined by vectors G satisfying
        e^(iG·R) = 1 for all lattice vectors R:
      </p>

      <EqNumbered number="SS.1">G = m₁ b₁ + m₂ b₂ + m₃ b₃ &nbsp;&nbsp;&nbsp; where &nbsp; bᵢ · aⱼ = 2π δᵢⱼ</EqNumbered>

      <p>
        X-ray diffraction from a crystal: constructive interference when the scattering vector
        Δk = G (a reciprocal lattice vector) — this is the <strong>von Laue condition</strong>,
        equivalent to Bragg&apos;s law: 2d sin θ = nλ.
      </p>

      <h2>SS.2 Bloch&apos;s Theorem and Band Structure</h2>

      <Theorem number="SS.1" title="Bloch's Theorem">
        For an electron in a periodic potential V(r) = V(r+R), the eigenstates have the form:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          ψ_nk(r) = e^(ik·r) u_nk(r) &nbsp;&nbsp;&nbsp;&nbsp; (Bloch wavefunction)
        </span>
        where u_nk has the periodicity of the lattice: u_nk(r+R) = u_nk(r). The quantum number
        k (crystal momentum) lives in the first Brillouin zone; n is the band index.
        The energy spectrum E_n(k) is periodic in k-space with the reciprocal lattice.
      </Theorem>

      <p>
        The band structure E_n(k) determines all electronic properties. Near the zone boundary
        k = π/a, plane waves |k⟩ and |k−G⟩ become degenerate and hybridize — this opens a
        <strong> band gap</strong>. Materials are classified by their band structure:
      </p>

      <p>
        <strong>Metal:</strong> Fermi level cuts through a band. Many states available for
        conduction at any temperature.
      </p>
      <p>
        <strong>Insulator/Semiconductor:</strong> Fermi level in a gap. Gap &gt; 4 eV: insulator
        (SiO₂: 9 eV). Gap 0.1–4 eV: semiconductor (Si: 1.1 eV, GaAs: 1.4 eV).
      </p>
      <p>
        <strong>Semimetal:</strong> valence and conduction bands overlap slightly, but density
        of states at Fermi level is small (graphene, bismuth).
      </p>

      <WorkedExample number="SS.1" title="Nearly Free Electron Model — Band Gap">
        <p>
          For a 1D crystal (lattice constant a), treat the periodic potential as a small
          perturbation V(x) = 2V₁ cos(2πx/a). Find the band gap at k = π/a.
        </p>
        <Step label="Degenerate states:">At k = π/a, the states e^(iπx/a) and e^(−iπx/a) are degenerate (energy ℏ²(π/a)²/2m).</Step>
        <Step label="Matrix element:">V₁₂ = ⟨k|V|k−G⟩ = V₁ (first Fourier component of potential).</Step>
        <Step label="Diagonalize:">H = [[E₀, V₁],[V₁, E₀]]. Eigenvalues: E₀ ± |V₁|.</Step>
        <Step label="Band gap:">E_gap = 2|V₁|. The gap equals twice the first Fourier component of the periodic potential. Larger potential → wider gap.</Step>
        <Step label="Bonding/antibonding:">Lower state: ψ = cos(πx/a) (peaks at ion cores → lower energy). Upper: sin(πx/a) (peaks between ions → higher energy).</Step>
      </WorkedExample>

      <h2>SS.3 Semiconductors and the p-n Junction</h2>

      <p>
        Semiconductors can be doped to create carriers. <strong>n-type</strong> doping adds
        donor impurities (extra electrons); <strong>p-type</strong> adds acceptors (holes).
        The carrier densities satisfy the law of mass action:
      </p>

      <EqNumbered number="SS.2">np = nᵢ² &nbsp;&nbsp;&nbsp;&nbsp; nᵢ² = 4(k_BT)³(m_e m_h)^(3/2)/(2πℏ²)³ × e^(−Eg/k_BT)</EqNumbered>

      <p>
        A <strong>p-n junction</strong> forms when p and n regions contact. Electrons diffuse
        from n to p, holes from p to n, creating a depletion region with a built-in electric
        field that opposes further diffusion. At equilibrium, the Fermi level is flat across
        the junction. Under forward bias: reduces the barrier → exponential current increase
        (Shockley diode equation):
      </p>

      <EqNumbered number="SS.3">I = I₀ (e^(eV/k_BT) − 1) &nbsp;&nbsp;&nbsp; (Shockley equation)</EqNumbered>

      <p>
        This exponential behavior is the basis of diodes, transistors (BJT, MOSFET),
        solar cells, and LEDs. A solar cell is a reverse-biased p-n junction illuminated with
        photons — the photocurrent drives the junction into forward bias.
      </p>

      <h2>SS.4 Superconductivity</h2>

      <p>
        Below a critical temperature T_c, some metals lose all electrical resistance
        (superconductivity, discovered by Kamerlingh Onnes, 1911) and expel magnetic fields
        (<strong>Meissner effect</strong>). The BCS theory (Bardeen, Cooper, Schrieffer, 1957)
        explains this via <strong>Cooper pairs</strong>: electrons near the Fermi surface pair
        through phonon-mediated attraction despite Coulomb repulsion, forming a macroscopic
        quantum state described by a single wavefunction:
      </p>

      <EqNumbered number="SS.4">|BCS⟩ = Π_k (uₖ + vₖ c†_(k↑) c†_(−k↓)) |0⟩ &nbsp;&nbsp;&nbsp; (BCS ground state)</EqNumbered>

      <p>
        Key signatures: energy gap Δ(T) at the Fermi surface (2Δ ≈ 3.52 k_BT_c), quantized
        magnetic flux Φ = n × Φ₀ (Φ₀ = h/2e = 2.07×10⁻¹⁵ Wb), and the Josephson effect
        (supercurrent across a tunneling barrier). High-T_c superconductors (cuprates,
        T_c up to 135 K; hydrogen sulfide under pressure: 203 K) are not fully explained by BCS.
      </p>

      <Definition number="SS.1" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Band gaps are collective crystal effects:</strong> they are not atomic energy levels copied unchanged.</li>
          <li><strong>Holes behave as quasiparticles:</strong> they represent missing electrons in nearly full bands.</li>
          <li><strong>Effective mass can differ from electron mass:</strong> band curvature controls carrier dynamics.</li>
          <li><strong>Conductivity depends on carriers and scattering:</strong> high carrier density alone is not enough.</li>
        </ul>
      </Definition>

      <PracticeProblems section="SS.1–SS.4 Solid-State Physics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={1.1} unit="eV" tolerance={0.05}
          hints={['Silicon band gap is a standard material property: E_g = 1.1 eV at room temperature.']}
          problemText="What is the band gap of silicon (eV) at room temperature?"
          solution={<>Silicon: E_g = <strong>1.1 eV</strong>. GaAs: 1.4 eV. Ge: 0.67 eV. SiO₂: 9 eV (insulator).</>}>
          State the band gap of silicon at room temperature and classify it as a metal, semiconductor, or insulator.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={2} unit="eV" tolerance={0.05}
          hints={['Band gap at zone boundary = 2|V₁|, where V₁ is the first Fourier component of the periodic potential.']}
          problemText="For a 1D crystal with V₁ = 1 eV (first Fourier component). Find the band gap (eV)."
          solution={<>E_gap = 2|V₁| = 2 × 1 eV = <strong>2 eV</strong></>}>
          In the nearly free electron model, the first Fourier component of the periodic potential is V₁ = 1 eV. Find the band gap.
        </InteractiveProblem>

        <Problem n={3} difficulty="easy"
          solution={<>FCC lattice primitive vectors: a₁ = a/2(0,1,1), a₂ = a/2(1,0,1), a₃ = a/2(1,1,0). Reciprocal lattice: b₁ = 2π/a(−1,1,1), b₂ = 2π/a(1,−1,1), b₃ = 2π/a(1,1,−1) — this is the BCC lattice with lattice constant 4π/a. BCC primitive vectors give reciprocal FCC. FCC real space ↔ BCC reciprocal lattice. Brillouin zone of FCC: truncated octahedron. High-symmetry points: Γ(0,0,0), X(2π/a,0,0), L(π/a,π/a,π/a), K(3π/2a,3π/2a,0). Bragg planes at zone boundaries: d_{111} = a/√3 (for FCC, forbidden unless h+k+l all odd → Bragg condition 2×(a/√3)sinθ = λ).</>}>
          For an FCC crystal (lattice constant a), find the reciprocal lattice vectors and identify the first Brillouin zone shape. Which high-symmetry points are conventionally labeled?
        </Problem>

        <Problem n={4} difficulty="medium"
          solution={<>Drude model: electrons treated as classical gas. τ = mean free time between collisions. σ = ne²τ/m (conductivity). ρ = m/(ne²τ). For copper: n = 8.49×10²⁸m⁻³, ρ = 1.7×10⁻⁸ Ω·m. τ = m/(ne²ρ) = 9.11×10⁻³¹/(8.49×10²⁸×(1.6×10⁻¹⁹)²×1.7×10⁻⁸) = 2.5×10⁻¹⁴s. Mean free path l = v_F τ where v_F = ℏ(3π²n)^(1/3)/m = 1.57×10⁶m/s. l = 1.57×10⁶×2.5×10⁻¹⁴ = 39 nm. 150× the inter-atomic spacing! This is impossible classically — quantum mechanics (Bloch waves coherent over many unit cells) is required. Hall effect: transverse voltage V_H = IB/(nqd) → Hall coefficient R_H = 1/ne (sign gives carrier type). R_H is positive for holes (p-type), negative for electrons (n-type).</>}>
          Apply the Drude model to copper: find τ and the mean free path. Why does this mean free path require a quantum mechanical explanation?
        </Problem>

        <Problem n={5} difficulty="medium"
          solution={<>Phonon dispersion for monatomic chain: mass m, spring constant K, lattice constant a. Equation of motion: m ü_n = K(u_(n+1) − 2u_n + u_(n-1)). Ansatz: u_n = u₀ e^(i(kna−ωt)). Dispersion: ω(k) = 2√(K/m)|sin(ka/2)|. Properties: (1) linear at small k: ω = k×a√(K/m) — sound waves. (2) Maximum at k=π/a: ω_max = 2√(K/m) — zone boundary, standing wave. (3) Periodicity: ω(k+2π/a) = ω(k) — only first BZ matters. Group velocity v_g = dω/dk = a√(K/m)cos(ka/2) → 0 at zone boundary (standing wave). For diatomic chain with masses M,m: optical and acoustic branches. Gap at zone boundary: ω² = 2K/m and 2K/M → gap = 2K√(1/m − 1/M)/... related to mass difference. Optical mode: masses oscillate against each other (infrared active). Acoustic mode: masses move together (Raman and infrared selection rules differ).</>}>
          Derive the phonon dispersion relation for a monatomic linear chain. What happens at the zone boundary? How does a diatomic chain differ?
        </Problem>

        <Problem n={6} difficulty="hard"
          solution={<>Quantum Hall effect (integer): 2DEG in magnetic field B at low T. Landau levels: E_n = ℏω_c(n+1/2), ω_c = eB/m. Degeneracy per level: N_Φ = eBA/(2πℏ) = BA/Φ₀ (flux quanta per unit area). Filling factor ν = N_e/N_Φ = nh/(eB). When ν = integer, Fermi level in gap between Landau levels. All states in filled level: σ_xy = νe²/h (EXACTLY). Localized states in gap don't contribute to transport but pin E_F → plateau as B varies. Fractional QHE: at ν = 1/3, 2/5, ... → Laughlin states — electron correlations form composite fermions. σ_xy = e²/(3h) etc. Topological origin: σ_xy = (e²/h) × (Chern number) — explains quantization to 1 part in 10⁸ without any impurity averaging. Used as the primary resistance standard: 1 Klitzing = h/e² = 25,812.807... Ω.</>}>
          Explain the integer quantum Hall effect. Why is σ_xy = νe²/h quantized exactly? How does the fractional QHE differ?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Bloch theorem: ψ_nk = e^(ik·r) u_nk. Crystal momentum k in Brillouin zone; bands E_n(k).',
        'Band gap at zone boundary: 2|V_G| (Fourier component of potential). Metal vs. insulator vs. semiconductor.',
        'Law of mass action: np = nᵢ². Shockley diode: I = I₀(e^(eV/kT) − 1).',
        'BCS: Cooper pairs (phonon-mediated). Energy gap 2Δ ≈ 3.52 k_BT_c. Meissner effect; flux quantization.',
        'Phonon dispersion: ω = 2√(K/m)|sin(ka/2)|. Sound at small k; flat at zone boundary.',
        'QHE: σ_xy = νe²/h exactly (Chern number). Resistance standard. Fractional QHE: composite fermions.',
      ]} />
    </div>
  );
}
