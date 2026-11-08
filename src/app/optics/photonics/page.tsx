import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, InlineMath, Prerequisites, Takeaways, LearningGoals
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

      <Prerequisites items={['Electromagnetic wave propagation (Ch. W)', 'Wave optics (Ch. 20)', 'Lasers (Ch. LZ)', 'Solid-state physics (Ch. SS)']} />

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
        Total internal reflection for rays beyond the critical angle <InlineMath latex="\theta_c = \arcsin(n_2/n_1)" />.
        Numerical aperture: NA = √(n₁² − n₂²) — the acceptance cone half-angle.
      </p>

      <p>
        Wave optics: guided modes are solutions to the wave equation satisfying boundary conditions.
        For a planar slab waveguide (width d), the transcendental equation:
        κd = mπ + 2arctan(γ/κ), where κ² = n₁²k₀² − β² and γ² = β² − n₂²k₀².
        Single-mode condition: V = k₀d√(n₁² − n₂²) &lt; π (V-number &lt; 2.405 for cylindrical fiber).
      </p>

      <Definition number="PH.1" title="Group Velocity Dispersion">
        The propagation constant β(ω) has a Taylor expansion around ω₀:
        β = β₀ + β₁(ω−ω₀) + β₂(ω−ω₀)²/2 + β₃(ω−ω₀)³/6 + ...
        <InlineMath latex="\beta_1 = 1/v_g" /> (group velocity). β₂ = d²β/dω² (GVD, ps²/km) — causes pulse broadening.
        β₂ &gt; 0: normal dispersion (red faster); β₂ &lt; 0: anomalous (blue faster, solitons possible).
        Silica fiber: zero-dispersion wavelength <InlineMath latex="\lambda_{\text{ZD}} \approx 1.3\,\mu\mathrm{m}" />; standard telecom at 1.55 μm has β₂ ≈ −20 ps²/km.
        Dispersion-shifted fiber: ZD at 1.55 μm for coherent communications.
      </Definition>

      <h2>PH.2 Photonic Crystals</h2>

      <p>
        A photonic crystal is a periodic dielectric structure with period a ~ λ/2.
        By analogy with electron Bloch states in a crystal potential, photons in a periodic
        ε(r) form photonic bands. A <strong>photonic bandgap</strong> (PBG) is a range of
        frequencies for which no propagating modes exist.
      </p>

      <EqNumbered number="PH.1" latex="\nabla \times \left(\frac{1}{\varepsilon(\mathbf{r})}\nabla \times \mathbf{H}\right) = \left(\frac{\omega}{c}\right)^2 \mathbf{H} \qquad \text{(photonic master equation — Hermitian eigenvalue problem)}" />

      <p>
        The band structure <InlineMath latex="\omega_n(\mathbf{k})" /> follows from this equation. Bandgap: between two bands,
        analogous to semiconductor bandgap. For a 1D Bragg stack (alternating n₁, n₂ layers
        of thickness d₁, d₂): maximum gap at λ = 2(n₁d₁ + n₂d₂) (quarter-wave condition).
        Gap width: Δω/ω₀ ≈ (4/π)|n₁−n₂|/(n₁+n₂).
      </p>

      <p>
        <strong>Defect modes</strong>: a point defect in a 2D/3D photonic crystal creates
        localized resonant modes inside the bandgap — a photonic atom.
        A line defect creates a waveguide that routes light around sharp bends without loss.
        Applications: photonic crystal fibers (PCF), high-Q cavities (Q ~ 10⁶) for single-photon
        emitters, slow-light waveguides (<InlineMath latex="v_g \approx c/300" />).
      </p>

      <WorkedExample number="PH.1" title="Bragg Reflector and VCSEL Design">
        <p>
          Design a GaAs/AlAs distributed Bragg reflector (DBR) for 850 nm emission.
          <InlineMath latex="n_{\text{GaAs}} = 3.6,\ n_{\text{AlAs}} = 3.0" />. Compute the quarter-wave thickness, reflectivity,
          and the number of pairs for R &gt; 99%.
        </p>
        <Step label="Quarter-wave condition:"><InlineMath latex="d_{\text{GaAs}} = \lambda/(4n_{\text{GaAs}}) = 850\,\mathrm{nm}/(4\times3.6) = 59.0\,\mathrm{nm}" />. <InlineMath latex="d_{\text{AlAs}} = \lambda/(4n_{\text{AlAs}}) = 850\,\mathrm{nm}/(4\times3.0) = 70.8\,\mathrm{nm}" />. Total period: <InlineMath latex="\Lambda = d_{\text{GaAs}} + d_{\text{AlAs}} = 129.8\,\mathrm{nm}" />.</Step>
        <Step label="Reflectivity of N pairs (n₁/n₂ = AlAs/GaAs):">For N pairs with <InlineMath latex="n_s" /> = GaAs substrate: <InlineMath latex="R_N = \left[\dfrac{1 - (n_1/n_2)^{2N}(n_s/n_0)}{1 + (n_1/n_2)^{2N}(n_s/n_0)}\right]^2" />. Stop-band center: high reflectivity region. <InlineMath latex="(n_1/n_2)^{2N} = (3.0/3.6)^{2N} = 0.833^{2N}" />.</Step>
        <Step label="Number of pairs for R = 99%:">R &gt; 0.99 requires <InlineMath latex="(n_1/n_2)^{2N} \times (n_s/n_0) \ll 1" />. For <InlineMath latex="n_s = 3.6,\ n_0 = 1" /> (air): <InlineMath latex="(3.0/3.6)^{2N} \times 3.6" /> must be small. Try N = 20: <InlineMath latex="(0.833)^{40} \times 3.6 = 6.8\times10^{-4} \times 3.6 \approx 2.4\times10^{-3}" />. <InlineMath latex="R \approx 1 - 4\times2.4\times10^{-3} \approx 99.0\%" />. N = 15 gives ~94%; N = 25 gives ~99.8%. A VCSEL (vertical-cavity surface-emitting laser) uses two 20-pair DBRs with a half-wavelength GaAs active cavity — threshold current ~1 mA, used in fiber optic transceivers and LiDAR (iPhone).</Step>
        <Step label="Stopband width:"><InlineMath latex="\Delta\lambda/\lambda = \frac{4}{\pi}\arcsin\frac{|n_1-n_2|}{n_1+n_2} \approx \frac{4}{\pi}\,\frac{|n_1-n_2|}{n_1+n_2} = \frac{4}{\pi}\,\frac{0.6}{6.6} \approx 0.115" />. Δλ ≈ 98 nm — very wide stopband useful for broadband reflectors.</Step>
      </WorkedExample>

      <h2>PH.3 Plasmonics</h2>

      <p>
        Surface plasmon polaritons (SPPs): coupled oscillations of free electrons and EM field
        at a metal-dielectric interface. Dispersion relation:
      </p>

      <EqNumbered number="PH.2" latex="k_{\text{SPP}} = \frac{\omega}{c}\sqrt{\frac{\varepsilon_m\varepsilon_d}{\varepsilon_m + \varepsilon_d}} \qquad \text{(SPP dispersion, } \varepsilon_m = \text{metal permittivity)}" />

      <p>
        For a Drude metal: <InlineMath latex="\varepsilon_m(\omega) = 1 - \omega_p^2/\omega^2" />. The SPP wavevector <InlineMath latex="k_{\text{SPP}}" /> lies outside
        the light cone — SPPs are non-radiative (surface bound) until excited by evanescent
        coupling (prism coupling, grating coupler, or near-field tip).
      </p>

      <p>
        <strong>Localized surface plasmons</strong> (LSP): collective electron oscillation in
        metallic nanoparticles. Mie theory resonance for a sphere of radius a ≪ λ:
        polarizability <InlineMath latex="\alpha = 4\pi a^3\,\dfrac{\varepsilon_m - \varepsilon_d}{\varepsilon_m + 2\varepsilon_d}" /> diverges at resonance <InlineMath latex="\varepsilon_m = -2\varepsilon_d" />.
        For Au in water: resonance at λ ≈ 520 nm (gold is red/purple at nanoscale).
        Applications: SERS (surface-enhanced Raman, 10¹⁰× enhancement in nanogap),
        plasmonic sensors (binding shifts resonance), photothermal therapy.
      </p>

      <h2>PH.4 Metamaterials</h2>

      <p>
        Engineered structures with effective <InlineMath latex="\varepsilon_{\text{eff}}" /> and <InlineMath latex="\mu_{\text{eff}}" /> not found in natural materials.
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
          solution={<>Numerical aperture and acceptance angle: <InlineMath latex="\mathrm{NA} = n_0\sin\theta_{\text{acc}} = \sqrt{n_1^2 - n_2^2}" />. For n₀=1 (air), <InlineMath latex="\theta_{\text{acc}} = \arcsin(\mathrm{NA})" />. Standard single-mode fiber: n₁=1.4677, n₂=1.4624. <InlineMath latex="\mathrm{NA} = \sqrt{1.4677^2 - 1.4624^2} = \sqrt{0.0155} = 0.124" />. <InlineMath latex="\theta_{\text{acc}} = \arcsin(0.124) = 7.1^\circ" />. V-number at λ=1.55μm, core diameter d=9μm: V = πd×NA/λ = π×9×0.124/1.55 = 2.26. Single-mode condition V&lt;2.405: satisfied. For multimode fiber (d=50μm, NA=0.2): V = π×50×0.2/1.55 = 20.3. Number of modes ~ V²/2 ~ 206. Group delay between modes: <InlineMath latex="\Delta\tau = (n_1 - n_2)L/c" /> (modal dispersion). For 1 km: <InlineMath latex="\Delta\tau = (1.4677 - 1.4624) \times 10^3/(3\times10^8) = 5.3/(3\times10^8)\ \mathrm{s} = 17.7\ \mathrm{ns}" />, i.e. 17.7 ns/km. Limits bandwidth to ~ 28 MHz·km for multimode — why SM fiber is used for &gt;1 Gb/s transmission.</>}>
          Calculate the numerical aperture and V-number for a standard single-mode fiber (n₁ = 1.4677, n₂ = 1.4624, core diameter = 9 μm) at λ = 1.55 μm. Is it single-mode?
        </InteractiveProblem>

        <Problem n={2} difficulty="medium"
          solution={<>Photonic crystal bandgap: 1D Bragg stack alternating n₁, n₂. Transfer matrix method for one period: <InlineMath latex="T = \begin{pmatrix}\cos\delta_1 & \sin\delta_1/n_1\\ -n_1\sin\delta_1 & \cos\delta_1\end{pmatrix}\begin{pmatrix}\cos\delta_2 & \sin\delta_2/n_2\\ -n_2\sin\delta_2 & \cos\delta_2\end{pmatrix}" /> with <InlineMath latex="\delta_i = n_i k_0 d_i" />. Bloch condition: <InlineMath latex="T\begin{pmatrix}E\\H\end{pmatrix} = e^{iK\Lambda}\begin{pmatrix}E\\H\end{pmatrix}" /> where K is the Bloch wavevector. Dispersion: <InlineMath latex="\cos(K\Lambda) = \tfrac{1}{2}\operatorname{Tr}T = \cos\delta_1\cos\delta_2 - \tfrac{1}{2}\left(\frac{n_1}{n_2}+\frac{n_2}{n_1}\right)\sin\delta_1\sin\delta_2" />. Bandgap when <InlineMath latex="|\tfrac{1}{2}\operatorname{Tr}T| > 1" />: no real K. At quarter-wave resonance (δ₁=δ₂=π/2): <InlineMath latex="\cos(K\Lambda) = -\tfrac{1}{2}\left(\frac{n_1}{n_2}+\frac{n_2}{n_1}\right) = -\frac{n_1^2+n_2^2}{2n_1n_2}" />. This is always &gt;1 in magnitude → guaranteed bandgap for all n₁≠n₂. Gap size: <InlineMath latex="\Delta\omega/\omega_0 = \frac{4}{\pi}\arcsin\frac{|n_1-n_2|}{n_1+n_2}" />. For n₁=3.5, n₂=1.5: Tr/2 = -(12.25+2.25)/10.5 = -1.38. Large gap. Photonic bandgap is topological (related to Zak phase) — each band below/above gap carries a Zak phase of 0 or π.</>}>
          Use the transfer matrix method to find the photonic bandgap condition for a 1D Bragg stack. Show the gap is largest at the quarter-wave condition.
        </Problem>

        <Problem n={3} difficulty="medium"
          solution={<>SPP dispersion and propagation length: <InlineMath latex="k_{\text{SPP}} = \frac{\omega}{c}\sqrt{\frac{\varepsilon_m\varepsilon_d}{\varepsilon_m+\varepsilon_d}}" />. For Ag at λ=633nm: <InlineMath latex="\varepsilon_m = -16 + 0.6i" /> (Drude). <InlineMath latex="\varepsilon_d = 1" /> (air). <InlineMath latex="k_{\text{SPP}} = \frac{\omega}{c}\sqrt{\frac{-16+0.6i}{-15+0.6i}}" />. <InlineMath latex="\mathrm{Re}(k_{\text{SPP}}) \approx \frac{\omega}{c}\sqrt{16/15} = 1.033\,k_0" />. <InlineMath latex="\mathrm{Im}(k_{\text{SPP}})" /> determines propagation length: <InlineMath latex="L_{\text{SPP}} = 1/(2\,\mathrm{Im}\,k_{\text{SPP}})" />. Expanding to first order in <InlineMath latex="\varepsilon_m'' = \mathrm{Im}(\varepsilon_m)" />: <InlineMath latex="L_{\text{SPP}} \approx \frac{\lambda}{2\pi}\,\frac{(\varepsilon_m')^2}{\varepsilon_m''}\left(\frac{\varepsilon_m'+\varepsilon_d}{\varepsilon_m'\varepsilon_d}\right)^{3/2}" /> where <InlineMath latex="\varepsilon_m' = \mathrm{Re}(\varepsilon_m)" />. For Ag: <InlineMath latex="L \approx \frac{633\times10^{-9}}{2\pi} \times \frac{256}{0.6} \times \left(\frac{15}{16}\right)^{3/2} \approx 1.01\times10^{-7} \times 427 \times 0.91 \approx 39\,\mu\mathrm{m}" />. With measured Ag data at 633nm: L_SPP of a few tens of μm. At 1550nm: L_SPP ~ 1 mm (less Ohmic loss). Application: plasmonic waveguide chips for nanoscale light routing (subwavelength confinement, but limited propagation distance — tradeoff between confinement and loss).</>}>
          Derive the SPP propagation length from the imaginary part of k_SPP for silver at λ = 633 nm (ε_Ag = −16 + 0.6i). Compare to the free-space wavelength.
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Transformation optics cloak: Pendry's recipe. Map physical space (r,θ,z) to cloaking region: <InlineMath latex="r' = R_1 + r\,(R_2-R_1)/R_2" /> (squeeze r=0 to R₂ region into annulus R₁&lt;r&apos;&lt;R₂). The Jacobian tensor <InlineMath latex="J_{ij} = \partial x'_i/\partial x_j" /> gives the required material parameters: <InlineMath latex="\varepsilon_{ij} = \mu_{ij} = \frac{J J^{T}}{\det J}" />. For cylindrical cloak: <InlineMath latex="\varepsilon_r = \mu_r = \frac{r'-R_1}{r'}" />, <InlineMath latex="\varepsilon_\theta = \mu_\theta = \frac{r'}{r'-R_1}" />, <InlineMath latex="\varepsilon_z = \mu_z = \left(\frac{R_2}{R_2-R_1}\right)^2 \frac{r'-R_1}{r'}" />. At inner radius r&apos;=R₁: <InlineMath latex="\varepsilon_r = \mu_r \to 0" />, <InlineMath latex="\varepsilon_\theta = \mu_\theta \to \infty" />. This extreme anisotropy requires metamaterials. At outer radius r&apos;=R₂: <InlineMath latex="\varepsilon_r = \mu_r = (R_2-R_1)/R_2" /> — not 1, but the cloak is still impedance-matched to free space, so it is reflectionless. Phase velocity for waves circling the core: index <InlineMath latex="\sqrt{\varepsilon_z\mu_r} = \frac{R_2}{R_2-R_1}\,\frac{r'-R_1}{r'} \to 0" /> at the inner radius, so <InlineMath latex="v_{\text{phase}} = c/\sqrt{\varepsilon_z\mu_r} > c" /> there (superluminal phase, but group velocity &lt; c). No energy, information, or causality violation. In practice: bandwidth-limited (dispersive metamaterial), lossy (Ohmic), and expensive to fabricate in 3D. Current state: microwave demonstrations work well; optical cloaks limited to tiny objects (few μm). Alternative: carpet cloak (2D, hides surface bump) demonstrated at near-IR.</>}>
          Describe the transformation optics approach to a cylindrical invisibility cloak. What are the required material parameters at r = R₁? Why is it challenging to realize at optical frequencies?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Waveguide modes: single-mode for V < 2.405. GVD β₂ causes pulse broadening; anomalous (β₂<0) allows solitons.',
        'Photonic crystal: periodic ε(r) → photonic bands. Bandgap at quarter-wave condition. Defect modes: optical cavities.',
        'Bragg reflector: R > 99% with ~20 pairs. Used in VCSELs, telecom filters, laser mirrors.',
        'SPP: k_SPP outside light cone; excited by prism/grating coupling. LSP resonance in nanoparticles: SERS 10¹⁰×.',
        'Mie theory: plasmonic resonance at ε_m = −2ε_d. Gold NP: 520 nm. Used in biosensors, photothermal therapy.',
        'Transformation optics: engineer ε(r), μ(r) to bend light along desired paths. Cloak requires extreme anisotropy.',
      ]} />
    </div>
  );
}
