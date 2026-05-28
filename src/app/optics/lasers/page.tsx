import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function LasersPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#eab308' }}>Optics · Upper Division</div>
      <h1>Lasers and Coherent Light</h1>
      <p className="subtitle">
        The laser — Light Amplification by Stimulated Emission of Radiation — is the quintessential
        device where quantum mechanics, thermodynamics, and wave optics converge. Understanding lasers
        requires population inversions, optical cavities, and coherence theory.
      </p>

      <Prerequisites items={['Atomic structure (Ch. 21)', 'Wave optics (Ch. W)', 'Statistical mechanics (Ch. S)', 'Quantum mechanics (Ch. 20)']} />

      <LearningGoals items={[
        'Explain spontaneous emission, stimulated emission, and absorption using the Einstein A and B coefficients.',
        'Describe why population inversion is required for laser gain and why it cannot occur in a two-level system.',
        'Calculate the threshold gain coefficient from cavity mirror reflectivities.',
        'Characterize a Gaussian beam using its waist radius, Rayleigh range, and divergence angle.',
        'Distinguish temporal and spatial coherence and explain why laser light excels at both.',
      ]} />

      <h2>LZ.1 Einstein Coefficients and Stimulated Emission</h2>

      <p>
        Einstein (1917) analyzed the interaction of atoms with radiation by introducing three
        processes: absorption, spontaneous emission, and stimulated emission.
      </p>

      <Definition number="LZ.1" title="Einstein A and B Coefficients">
        For a two-level atom (ground |1⟩, excited |2⟩, energy gap ℏω):
        <span style={{ display: 'block', marginTop: '0.5rem' }}>
          <strong>Absorption:</strong> rate = B₁₂ ρ(ω) N₁ &nbsp;&nbsp; (ρ = radiation energy density)
        </span>
        <span style={{ display: 'block' }}>
          <strong>Spontaneous emission:</strong> rate = A₂₁ N₂
        </span>
        <span style={{ display: 'block' }}>
          <strong>Stimulated emission:</strong> rate = B₂₁ ρ(ω) N₂
        </span>
        In thermal equilibrium, detailed balance + Planck distribution require:
        A₂₁/B₂₁ = ℏω³/(π²c³) and B₁₂ = B₂₁ (for non-degenerate levels).
        The stimulated emission rate equals the absorption rate when the populations are equal —
        this is the key to laser amplification.
      </Definition>

      <p>
        <strong>Stimulated emission</strong> produces a photon identical to the stimulating one
        in frequency, phase, direction, and polarization. This coherence is the source of laser
        beam quality. Spontaneous emission is noise; stimulated emission is signal.
      </p>

      <h2>LZ.2 Population Inversion and Gain</h2>

      <p>
        In thermal equilibrium (Boltzmann): N₂/N₁ = e^(−ℏω/k_BT) &lt; 1. More atoms are always
        in the ground state. For net stimulated emission (gain), we need <strong>population
        inversion</strong>: N₂ &gt; N₁. This is impossible in a two-level system at equilibrium
        (saturation makes N₁ = N₂ at most). Real lasers use three- or four-level schemes:
      </p>

      <p>
        <strong>Three-level laser (e.g., ruby):</strong> Pump ground → excited band → metastable
        level (fast decay). Inversion between metastable and ground state. Must invert &gt;50% of
        atoms — threshold is high.
      </p>

      <p>
        <strong>Four-level laser (e.g., Nd:YAG, He-Ne):</strong> Lower laser level is rapidly
        depopulated (fast decay to ground). Inversion maintained at any pump level — much lower
        threshold. Most practical lasers are four-level.
      </p>

      <EqNumbered number="LZ.1">G(ν) = σ(ν)(N₂ − N₁) &nbsp;&nbsp;&nbsp; (gain per unit length)</EqNumbered>

      <p>
        Here σ(ν) is the stimulated emission cross section. Laser oscillation begins when gain
        equals loss: G × L = 1 (round-trip condition in the cavity).
      </p>

      <WorkedExample number="LZ.1" title="Threshold Population Inversion">
        <p>
          A He-Ne laser at 632.8 nm: cavity length L = 30 cm, mirror reflectivities R₁ = 1.0,
          R₂ = 0.99. Gain medium fills the cavity. Find the threshold gain coefficient.
        </p>
        <Step label="Round-trip condition:">R₁ R₂ e^(2gL) = 1 (gain must overcome mirror losses)</Step>
        <Step label="Solve for g:">e^(2gL) = 1/(R₁R₂) = 1/0.99</Step>
        <Step label="g:">2gL = ln(1/0.99) = 0.01005 → g = 0.01005/(2×0.30) = 0.0167 m⁻¹ = 1.67 ×10⁻² m⁻¹</Step>
        <Step label="Inversion:">ΔN = N₂ − N₁ = g/σ. For He-Ne at 633 nm: σ ≈ 3×10⁻¹⁷ m². ΔN = 0.0167/3×10⁻¹⁷ ≈ 5.6×10¹⁴ m⁻³ — extremely small compared to gas density ~10²³ m⁻³!</Step>
      </WorkedExample>

      <h2>LZ.3 Optical Resonators and Modes</h2>

      <p>
        The laser cavity (Fabry-Pérot resonator) selects discrete <strong>longitudinal modes</strong>
        — frequencies where the cavity forms standing waves:
      </p>

      <EqNumbered number="LZ.2">νₙ = nc/(2L) &nbsp;&nbsp;&nbsp; (mode spacing: Δν = c/2L)</EqNumbered>

      <p>
        For L = 30 cm: Δν = 500 MHz. The gain bandwidth of the medium (Doppler-broadened
        ~1.5 GHz for He-Ne) may support 3 longitudinal modes. Single-mode operation
        requires short cavities or intra-cavity etalons.
      </p>

      <p>
        <strong>Transverse modes (TEM_mn):</strong> characterized by their intensity pattern
        in the plane perpendicular to the beam. TEM₀₀ (Gaussian beam) is the fundamental mode
        — smallest divergence, best focusability. Higher modes have larger diameter and spread faster.
      </p>

      <h2>LZ.4 Gaussian Beams</h2>

      <p>
        The TEM₀₀ mode is a <strong>Gaussian beam</strong>. Its intensity profile at position z:
      </p>

      <EqNumbered number="LZ.3">I(r, z) = I₀ (w₀/w(z))² exp(−2r²/w(z)²)</EqNumbered>

      <EqNumbered number="LZ.4">w(z) = w₀ √(1 + (z/z_R)²) &nbsp;&nbsp;&nbsp; z_R = πw₀²/λ &nbsp;&nbsp; (Rayleigh range)</EqNumbered>

      <p>
        Here w₀ is the beam waist radius and z_R is the Rayleigh range — the distance over which
        the beam area doubles. The divergence half-angle for large z: θ ≈ λ/(πw₀) — a smaller
        waist means faster divergence (diffraction limit). The beam parameter product
        w₀ × θ = λ/π is invariant and equals ℏ/2 of the uncertainty principle (position ×
        momentum for a photon).
      </p>

      <Theorem number="LZ.1" title="Coherence">
        <span style={{ display: 'block', marginBottom: '0.4rem' }}>
          <strong>Temporal coherence:</strong> correlation between the field at one point at
          different times. Coherence length L_c = c/Δν — the path length difference over which
          interference fringes are visible. Single-mode laser: L_c can be kilometers.
        </span>
        <span style={{ display: 'block' }}>
          <strong>Spatial coherence:</strong> correlation between field at two points at the
          same time. A laser mode has high spatial coherence across the beam.
          Young&apos;s double slit with a laser: perfect fringes. With a thermal source: fringes only
          within the coherence area (related to source angular size by van Cittert-Zernike theorem).
        </span>
      </Theorem>

      <Definition number="LZ.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Population inversion is required for gain:</strong> thermal equilibrium gives more atoms in the lower level.</li>
          <li><strong>Two-level lasers do not sustain inversion:</strong> pumping and stimulated emission compete on the same transition.</li>
          <li><strong>Cavity modes are frequency-selective:</strong> only resonant longitudinal modes survive repeated round trips.</li>
          <li><strong>Coherence is not the same as brightness:</strong> lasers are useful because phase relationships are controlled.</li>
        </ul>
      </Definition>

      <PracticeProblems section="LZ.1–LZ.4 Lasers and Coherent Light">
        <InteractiveProblem n={1} difficulty="easy"
          answer={500} unit="MHz" tolerance={0.02}
          hints={['Mode spacing Δν = c/(2L). c = 3×10⁸ m/s, L = 0.30 m.']}
          problemText="He-Ne laser cavity length L = 0.30 m. Find the longitudinal mode spacing Δν (MHz)."
          solution={<>Δν = c/(2L) = 3×10⁸/(2×0.30) = <strong>500 MHz</strong></>}>
          A He-Ne laser has cavity length L = 0.30 m. What is the spacing between adjacent longitudinal modes?
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={0.0167} unit="m⁻¹" tolerance={0.05}
          hints={['Threshold: R₁R₂ e^(2gL) = 1. g = ln(1/R₁R₂)/(2L). R₁=1, R₂=0.99.']}
          problemText="Cavity L=0.30 m, R₁=1.0, R₂=0.99. Find threshold gain g (m⁻¹)."
          solution={<>g = ln(1/0.99)/(2×0.30) = 0.01005/0.60 = <strong>0.0167 m⁻¹</strong></>}>
          A He-Ne laser (L = 0.30 m, R₁ = 1.0, R₂ = 0.99) reaches threshold. Find the minimum gain coefficient g (m⁻¹).
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Fabry-Pérot etalon: two mirrors with reflectivity R, spacing d. Transmitted intensity: T = (1−R)² / [(1−R)² + 4R sin²(δ/2)], where δ = 4πnd cos θ/λ. At resonance (δ = 2πm): T_max = 1 for a lossless symmetric etalon. Finesse F = π√R/(1−R) — number of modes resolvable. For R=0.99: F = π×0.995/0.01 ≈ 312. Free spectral range: FSR = c/2nd. Spectral resolution: Δν_min = FSR/F = c/(2ndF). For d=1cm, n=1, F=312: Δν_min = 3×10⁸/(2×0.01×312) = 48 MHz. This can resolve fine structure of atomic lines. Used in laser stabilization, optical spectrum analyzers, and multi-wavelength filters.</>}>
          Derive the transmission function of a Fabry-Pérot etalon. Define the finesse F and free spectral range. What limits the spectral resolution?
        </Problem>

        <Problem n={4} difficulty="medium"
          solution={<>Gaussian beam focusing: beam waist w₀, wavelength λ. Rayleigh range z_R = πw₀²/λ. After thin lens (focal length f) at beam waist: new waist w₀&apos; = λf/(πw₀). New Rayleigh range z_R&apos; = πw₀&apos;²/λ = λf²/(πw₀²). Depth of focus: 2z_R&apos; = 2λf²/(πw₀²). For f=100mm, w₀=5mm, λ=633nm: w₀&apos; = 633×10⁻⁹×0.1/(π×0.005) = 4.03 μm. z_R&apos; = π(4.03μm)²/633nm = 80.8 μm. This 4μm spot with 80μm depth of focus is used in optical disk writing (CD/DVD/Blu-ray). Blu-ray: λ=405nm → smaller spot → higher density. Numerical aperture NA = w₀/f = sin θ; w₀&apos; = λ/(πNA).</>}>
          A Gaussian beam with waist w₀ = 5 mm is focused by a lens of focal length f = 100 mm at λ = 633 nm. Find the focused spot size and depth of focus. Relate to optical storage technology.
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>Rate equations for 4-level laser: dN₂/dt = R_p N₁ − A₂₁N₂ − B₂₁ρN₂ + B₁₂ρN₁. dρ/dt = (c/L_eff)(B₂₁(N₂−N₁)ρ − (1/τ_c)ρ) where τ_c = cavity photon lifetime. Below threshold: ρ≈0, steady state N₂ = R_p τ_sp where τ_sp = 1/A₂₁. At threshold: B₂₁ΔN_th = 1/τ_c. Above threshold: N₂ clamped at N_th (gain clamping). ρ_ss = (τ_c τ_sp / (ℏω V)) (P_pump − P_threshold). Output power ∝ (pump − threshold) — linear L-I curve. Slope efficiency: dP_out/dP_pump = η_q × η_output × η_pump × ... product of quantum, output coupling, pump efficiencies. Threshold increases with: scattering losses, mirror loss, gain bandwidth, temperature (due to line broadening).</>}>
          Write rate equations for a 4-level laser. Solve for photon density above threshold. What determines the threshold and slope efficiency?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Einstein coefficients: B₁₂=B₂₁ (absorption = stimulated emission cross-section). A₂₁ = ℏω³B/(π²c³).',
        'Population inversion N₂ &gt; N₁ required for gain. Impossible in 2-level equilibrium — need 3 or 4 levels.',
        'Threshold: gain per round trip equals losses: R₁R₂ e^(2gL) = 1.',
        'Cavity modes: ν_n = nc/2L, spacing c/2L. TEM₀₀ (Gaussian) is the fundamental transverse mode.',
        'Gaussian beam: waist w₀, Rayleigh range z_R = πw₀²/λ, divergence θ ≈ λ/πw₀.',
        'Coherence: temporal (L_c = c/Δν), spatial (Young\'s fringes). Laser → very high coherence.',
      ]} />
    </div>
  );
}
