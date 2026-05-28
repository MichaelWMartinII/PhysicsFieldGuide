import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function PhotonicsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#eab308' }}>Optics · Advanced Topics</div>
      <h1>Photonics & Nanophotonics</h1>
      <p className="subtitle">
        Photonic crystals, waveguides, plasmons, and metamaterials allow unprecedented
        control over light at the wavelength scale and below.
        From optical fiber communications to single-photon emitters to cloaking devices,
        photonics bridges classical electrodynamics and quantum optics.
      </p>

      <Prerequisites items={['EM wave propagation (Ch. EM-waves)', 'Wave optics (Ch. WO)', 'Lasers (Ch. Las)', 'Solid-state physics (Ch. SS)']} />

      <LearningGoals items={[
        'Calculate the numerical aperture, V-number, and single-mode condition for a step-index optical fibre, and relate GVD β₂ to pulse broadening.',
        'Derive the photonic bandgap condition for a 1D Bragg stack using the transfer matrix method and identify the quarter-wave resonance.',
        'Design a GaAs/AlAs distributed Bragg reflector for a target wavelength and estimate the number of pairs needed for R > 99%.',
        'Write the SPP dispersion relation and compute the propagation length from Im(k_SPP) for a given metal at optical frequencies.',
        'Explain transformation optics and state the material parameters required at the inner boundary of a cylindrical invisibility cloak.',
      ]} />

      <h2>PH.1 Optical Waveguides and Fiber Optics</h2>

      <p>
        A step-index optical fiber: core (index n₁) surrounded by cladding (n₂ &lt; n₁).
        Total internal reflection for rays beyond the critical angle θ_c = arcsin(n₂/n₁).
        Numerical aperture: NA = √(n₁² − n₂²) — the acceptance cone half-angle.
      </p>

      <p>
        Wave optics: guided modes are solutions to the wave equation satisfying boundary conditions.
        For a planar slab waveguide (width d), the transcendental equation:
        κd = mπ + 2arctan(γ/κ), where κ² = n₁²k₀² − β² and γ² = β² − n₂²k₀².
        Single-mode condition: V = k₀d√(n₁² − n₂²) &lt; π/2 (V-number &lt; 2.405 for cylindrical fiber).
      </p>

      <Definition number="PH.1" title="Group Velocity Dispersion">
        The propagation constant β(ω) has a Taylor expansion around ω₀:
        β = β₀ + β₁(ω−ω₀) + β₂(ω−ω₀)²/2 + β₃(ω−ω₀)³/6 + ...
        β₁ = 1/v_g (group velocity). β₂ = d²β/dω² (GVD, ps²/km) — causes pulse broadening.
        β₂ &gt; 0: normal dispersion (red faster); β₂ &lt; 0: anomalous (blue faster, solitons possible).
        Silica fiber: zero-dispersion wavelength λ_ZD ≈ 1.3 μm; standard telecom at 1.55 μm has β₂ ≈ −20 ps²/km.
        Dispersion-shifted fiber: ZD at 1.55 μm for coherent communications.
      </Definition>

      <h2>PH.2 Photonic Crystals</h2>

      <p>
        A photonic crystal is a periodic dielectric structure with period a ~ λ/2.
        By analogy with electron Bloch states in a crystal potential, photons in a periodic
        ε(r) form photonic bands. A <strong>photonic bandgap</strong> (PBG) is a range of
        frequencies for which no propagating modes exist.
      </p>

      <EqNumbered number="PH.1">∇ × (1/ε(r)) ∇ × H = (ω/c)² H &nbsp;&nbsp;&nbsp; (photonic master equation — Hermitian eigenvalue problem)</EqNumbered>

      <p>
        The band structure ω_n(k) follows from this equation. Bandgap: between two bands,
        analogous to semiconductor bandgap. For a 1D Bragg stack (alternating n₁, n₂ layers
        of thickness d₁, d₂): maximum gap at λ = 2(n₁d₁ + n₂d₂) (quarter-wave condition).
        Gap width: Δω/ω₀ ≈ (4/π)|n₁−n₂|/(n₁+n₂).
      </p>

      <p>
        <strong>Defect modes</strong>: a point defect in a 2D/3D photonic crystal creates
        localized resonant modes inside the bandgap — a photonic atom.
        A line defect creates a waveguide that routes light around sharp bends without loss.
        Applications: photonic crystal fibers (PCF), high-Q cavities (Q ~ 10⁶) for single-photon
        emitters, slow-light waveguides (v_g ≈ c/300).
      </p>

      <WorkedExample number="PH.1" title="Bragg Reflector and VCSEL Design">
        <p>
          Design a GaAs/AlAs distributed Bragg reflector (DBR) for 850 nm emission.
          n_GaAs = 3.6, n_AlAs = 3.0. Compute the quarter-wave thickness, reflectivity,
          and the number of pairs for R &gt; 99%.
        </p>
        <Step label="Quarter-wave condition:">d_GaAs = λ/(4n_GaAs) = 850nm/(4×3.6) = 59.0 nm. d_AlAs = λ/(4n_AlAs) = 850nm/(4×3.0) = 70.8 nm. Total period: Λ = d_GaAs + d_AlAs = 129.8 nm.</Step>
        <Step label="Reflectivity of N pairs (n₁/n₂ = AlAs/GaAs):">For N pairs with n_s = GaAs substrate: R_N = [(1 − (n₁/n₂)^(2N)(n_s/n_0)) / (1 + (n₁/n₂)^(2N)(n_s/n_0))]². Stop-band center: high reflectivity region. (n₁/n₂)^(2N) = (3.0/3.6)^(2N) = 0.833^(2N).</Step>
        <Step label="Number of pairs for R = 99%:">R &gt; 0.99 requires (n₁/n₂)^(2N) × (n_s/n_0) ≫ 1. For n_s = 3.6, n_0 = 1 (air): (3.0/3.6)^(2N) × 3.6 &gt; threshold. Try N = 20: (0.833)^40 × 3.6 = 2.8×10⁻⁴ × 3.6 ≈ 10⁻³. R = (1−10⁻³)²/(1+10⁻³)² ≈ 99.6%. N = 15 gives ~98%; N = 20 gives ~99.6%. A VCSEL (vertical-cavity surface-emitting laser) uses two 20-pair DBRs with a half-wavelength GaAs active cavity — threshold current ~1 mA, used in fiber optic transceivers and LiDAR (iPhone).</Step>
        <Step label="Stopband width:">Δλ/λ = (4/π)arcsin((n₁−n₂)/(n₁+n₂)) ≈ (4/π)(n₁−n₂)/(n₁+n₂) = (4/π)(0.6/6.6) ≈ 0.115. Δλ ≈ 98 nm — very wide stopband useful for broadband reflectors.</Step>
      </WorkedExample>

      <h2>PH.3 Plasmonics</h2>

      <p>
        Surface plasmon polaritons (SPPs): coupled oscillations of free electrons and EM field
        at a metal-dielectric interface. Dispersion relation:
      </p>

      <EqNumbered number="PH.2">k_SPP = (ω/c) √(ε_m ε_d/(ε_m + ε_d)) &nbsp;&nbsp;&nbsp; (SPP dispersion, ε_m = metal permittivity)</EqNumbered>

      <p>
        For a Drude metal: ε_m(ω) = 1 − ω_p²/ω². The SPP wavevector k_SPP lies outside
        the light cone — SPPs are non-radiative (surface bound) until excited by evanescent
        coupling (prism coupling, grating coupler, or near-field tip).
      </p>

      <p>
        <strong>Localized surface plasmons</strong> (LSP): collective electron oscillation in
        metallic nanoparticles. Mie theory resonance for a sphere of radius a ≪ λ:
        polarizability α = 4πa³(ε_m − ε_d)/(ε_m + 2ε_d) diverges at resonance ε_m = −2ε_d.
        For Au in water: resonance at λ ≈ 520 nm (gold is red/purple at nanoscale).
        Applications: SERS (surface-enhanced Raman, 10¹⁰× enhancement in nanogap),
        plasmonic sensors (binding shifts resonance), photothermal therapy.
      </p>

      <h2>PH.4 Metamaterials</h2>

      <p>
        Engineered structures with effective ε_eff and μ_eff not found in natural materials.
        <strong>Negative index material</strong> (NIM): ε &lt; 0 and μ &lt; 0 simultaneously →
        n = −√(εμ) &lt; 0. Snell&apos;s law: n₁ sinθ₁ = n₂ sinθ₂ still holds but refraction
        is on the <em>same</em> side of the normal (negative refraction).
      </p>

      <p>
        <strong>Perfect lens</strong> (Veselago-Pendry, 2000): a slab of n = −1 material
        focuses both propagating and evanescent waves — potentially diffraction-unlimited
        imaging (superlens). Experimental demonstrations at microwave, infrared.
      </p>

      <p>
        <strong>Transformation optics</strong>: map desired light trajectories to a required
        ε(r) and μ(r). Pendry (2006) showed a cloak can guide light around an object:
        ε and μ must vary as functions of position (anisotropic, inhomogeneous).
        First microwave cloak demonstrated (Schurig et al. 2006, Science).
        At optical frequencies: material loss is a fundamental limitation.
      </p>

      <Definition number="PH.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Single-mode depends on V-number:</strong> core size, wavelength, and numerical aperture all matter.</li>
          <li><strong>Group velocity is pulse velocity:</strong> phase velocity alone does not determine information transport.</li>
          <li><strong>Band gaps require periodicity on wavelength scale:</strong> ordinary index contrast is not enough.</li>
          <li><strong>Metamaterial losses are real constraints:</strong> negative index behavior can be overwhelmed by absorption.</li>
        </ul>
      </Definition>

      <PracticeProblems section="PH.1–PH.4 Photonics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={2.26} unit="" tolerance={0.05}
          hints={['NA = √(n₁² − n₂²) = √(1.4677² − 1.4624²).', 'V = π d NA / λ with d = 9×10⁻⁶ m and λ = 1.55×10⁻⁶ m.']}
          problemText="A single-mode fiber has n₁ = 1.4677, n₂ = 1.4624, core diameter d = 9 μm. What is the V-number at λ = 1.55 μm?"
          solution={<>Numerical aperture and acceptance angle: NA = n₀ sin(θ_acceptance) = √(n₁²-n₂²). For n₀=1 (air), θ_acc = arcsin(NA). Standard single-mode fiber: n₁=1.4677, n₂=1.4624. NA = √(1.4677²-1.4624²) = √(2.154-2.139) = √(0.0154) = 0.124. θ_acc = arcsin(0.124) = 7.1°. V-number at λ=1.55μm, core diameter d=9μm: V = πd×NA/λ = π×9×0.124/1.55 = 2.26. Single-mode condition V&lt;2.405: satisfied. For multimode fiber (d=50μm, NA=0.2): V = π×50×0.2/1.55 = 20.3. Number of modes ~ V²/2 ~ 206. Group delay between modes: Δτ = (n₁-n₂)/c × L per unit length (modal dispersion). For 1 km: Δτ = (1.4677-1.4624)/(3×10⁸) × 10³ = 0.053/3×10⁵ s/km = 17.7 ns/km. Limits bandwidth to ~ 28 MHz·km for multimode — why SM fiber is used for &gt;1 Gb/s transmission.</>}>
          Calculate the numerical aperture and V-number for a standard single-mode fiber (n₁ = 1.4677, n₂ = 1.4624, core diameter = 9 μm) at λ = 1.55 μm. Is it single-mode?
        </InteractiveProblem>

        <Problem n={2} difficulty="medium"
          solution={<>Photonic crystal bandgap: 1D Bragg stack alternating n₁, n₂. Transfer matrix method for one period: T = [[cos(n₁k₀d₁), sin(n₁k₀d₁)/n₁],[-n₁ sin(n₁k₀d₁), cos(n₁k₀d₁)]] × [[cos(n₂k₀d₂), sin(n₂k₀d₂)/n₂],[-n₂ sin(n₂k₀d₂), cos(n₂k₀d₂)]]. Bloch condition: T·[E,H]^T = e^(iKΛ)[E,H]^T where K is the Bloch wavevector. Dispersion: cos(KΛ) = ½Tr(T) = cos(δ₁)cos(δ₂) - ½(n₁/n₂+n₂/n₁)sin(δ₁)sin(δ₂) where δᵢ = nᵢk₀dᵢ. Bandgap when |½Tr(T)|&gt;1: no real K. At quarter-wave resonance (δ₁=δ₂=π/2): cos(KΛ) = -½(n₁/n₂+n₂/n₁) = -(n₁²+n₂²)/(2n₁n₂). This is always &gt;1 in magnitude → guaranteed bandgap for all n₁≠n₂. Gap size: 2arccos(-(n₁²+n₂²)/(2n₁n₂))/π × (c/Λ). For n₁=3.5, n₂=1.5: Tr/2 = -(12.25+2.25)/10.5 = -1.38. Large gap. Photonic bandgap is topological (related to Zak phase) — each band below/above gap carries a Zak phase of 0 or π.</>}>
          Use the transfer matrix method to find the photonic bandgap condition for a 1D Bragg stack. Show the gap is largest at the quarter-wave condition.
        </Problem>

        <Problem n={3} difficulty="medium"
          solution={<>SPP dispersion and propagation length: k_SPP = (ω/c)√(ε_m ε_d/(ε_m+ε_d)). For Ag at λ=633nm: ε_m = -16 + 0.6i (Drude). ε_d = 1 (air). k_SPP = (ω/c)√((-16+0.6i)×1/(-16+0.6i+1)) = (ω/c)√((-16+0.6i)/(-15+0.6i)). Re(k_SPP) ≈ (ω/c)√(16/15) = k₀×1.033. Im(k_SPP) determines propagation length: L_SPP = 1/(2 Im(k_SPP)). Im: from Re(k²)Im(k²) derivative: L_SPP ≈ (λ/(4π)) × |ε_m'|^(3/2)/(ε_d × Im(ε_m)) × (ε_m'+ε_d)/ε_m' where ε_m' = Re(ε_m). For Ag: L ≈ (633×10⁻⁹/(4π)) × 16^(3/2)/(1×0.6) × (−15)/(−16) ≈ 50×10⁻⁹ × 64/0.6 × 0.94 ≈ 5 μm. More accurate Ag at 633nm: L_SPP ~ 10 μm. At 1550nm: L_SPP ~ 1 mm (less Ohmic loss). Application: plasmonic waveguide chips for nanoscale light routing (subwavelength confinement, but limited propagation distance — tradeoff between confinement and loss).</>}>
          Derive the SPP propagation length from the imaginary part of k_SPP for silver at λ = 633 nm (ε_Ag = −16 + 0.6i). Compare to the free-space wavelength.
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Transformation optics cloak: Pendry's recipe. Map physical space (r,θ,z) to cloaking region: r' = R₁ + r(R₂-R₁)/R₂ (squeeze r=0 to R₂ region into annulus R₁&lt;r'&lt;R₂). The Jacobian tensor J_ij = ∂x'_i/∂x_j gives the required material parameters: ε_ij = μ_ij = det(J)⁻¹ J·J^T. For cylindrical cloak: ε_r = μ_r = (r'-R₁)/r', ε_θ = μ_θ = r'/(r'-R₁), ε_z = μ_z = ((R₂/(R₂-R₁))² × r'/(r'-R₁). At inner radius r'=R₁: ε_r = μ_r → 0, ε_θ = μ_θ → ∞. This extreme anisotropy requires metamaterials. At outer radius r'=R₂: ε_r=μ_r=1, matches free space. Phase velocity: v_phase = c/√(ε_θ ε_z) = c×(R₂/(R₂-R₁)) &gt; c near inner radius (superluminal phase, but group velocity &lt; c). No energy, information, or causality violation. In practice: bandwidth-limited (dispersive metamaterial), lossy (Ohmic), and expensive to fabricate in 3D. Current state: microwave demonstrations work well; optical cloaks limited to tiny objects (few μm). Alternative: carpet cloak (2D, hides surface bump) demonstrated at near-IR.</>}>
          Describe the transformation optics approach to a cylindrical invisibility cloak. What are the required material parameters at r = R₁? Why is it challenging to realize at optical frequencies?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Waveguide modes: single-mode for V &lt; 2.405. GVD β₂ causes pulse broadening; anomalous (β₂&lt;0) allows solitons.',
        'Photonic crystal: periodic ε(r) → photonic bands. Bandgap at quarter-wave condition. Defect modes: optical cavities.',
        'Bragg reflector: R &gt; 99% with ~20 pairs. Used in VCSELs, telecom filters, laser mirrors.',
        'SPP: k_SPP outside light cone; excited by prism/grating coupling. LSP resonance in nanoparticles: SERS 10¹⁰×.',
        'Mie theory: plasmonic resonance at ε_m = −2ε_d. Gold NP: 520 nm. Used in biosensors, photothermal therapy.',
        'Transformation optics: engineer ε(r), μ(r) to bend light along desired paths. Cloak requires extreme anisotropy.',
      ]} />
    </div>
  );
}
