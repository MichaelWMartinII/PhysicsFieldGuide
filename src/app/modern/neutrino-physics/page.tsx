import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals, InlineMath
} from '@/components/textbook';

export default function NeutrinoPhysicsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Advanced Topics</div>
      <h1>Neutrino Physics & Flavor Oscillations</h1>
      <p className="subtitle">
        Neutrinos are the most abundant matter particles in the universe yet barely interact.
        The discovery that they oscillate between flavors — and hence have mass —
        is the first confirmed physics beyond the Standard Model.
        Neutrino physics touches on nuclear reactions, cosmology, CP violation, and Majorana fermions.
      </p>

      <Prerequisites items={['Particle physics (Ch. PP)', 'Quantum mechanics (Ch. 22)', 'Nuclear physics (Ch. N)', 'Special relativity (Ch. 21)']} />

      <LearningGoals items={[
        'Apply the two-flavor oscillation formula P(ν_α→ν_β) = sin²(2θ)sin²(Δm²L/4E) to solar and atmospheric data.',
        'Derive the MSW resonance condition and identify the electron density at which it occurs inside the Sun.',
        'Explain the seesaw mechanism and compute the required M_R to generate a light neutrino mass of 0.05 eV.',
        'Describe neutrinoless double beta decay and what its observation would prove about neutrino nature.',
        'Distinguish Dirac and Majorana mass terms and outline how leptogenesis connects neutrino masses to the baryon asymmetry.',
      ]} />

      <h2>NU.1 Neutrinos in the Standard Model (and Beyond)</h2>

      <p>
        The SM has three massless left-handed neutrinos: <InlineMath latex="\nu_e, \nu_\mu, \nu_\tau" /> (one per lepton family).
        Neutrinos interact only via the weak force (W±, Z) — cross section
        <InlineMath latex="\sigma \sim G_F^2 s/\pi \approx 10^{-45}\ \text{cm}^2" /> at 1 MeV (10⁷ times smaller than electromagnetic).
        Mean free path in water: <InlineMath latex="\lambda = 1/(n\sigma) \sim 10^{18}\ \text{km}" /> — the Earth is transparent to low-energy neutrinos.
      </p>

      <p>
        <strong>Solar neutrino problem</strong> (1968–2001): the Davis chlorine detector measured
        only 1/3 of the neutrino flux predicted by the Standard Solar Model.
        Resolution: electron neutrinos produced in the Sun oscillate to other flavors
        on their way to Earth — and the Davis detector was only sensitive to <InlineMath latex="\nu_e" />.
        Confirmed by SNO (2001): total flux of all flavors = predicted solar model flux.
        Nobel Prize 2015 to McDonald (SNO) and Kajita (Super-Kamiokande).
      </p>

      <h2>NU.2 Neutrino Oscillations</h2>

      <p>
        If neutrino mass eigenstates |ν₁⟩, |ν₂⟩, |ν₃⟩ differ from flavor eigenstates
        <InlineMath latex="|\nu_e\rangle, |\nu_\mu\rangle, |\nu_\tau\rangle" />, mixing occurs via the PMNS matrix U:
      </p>

      <EqNumbered number="NU.1" latex="|\nu_\alpha\rangle = \sum_i U^*_{\alpha i}\, |\nu_i\rangle \qquad \text{(PMNS mixing, } \alpha = e, \mu, \tau;\ i = 1, 2, 3\text{)}" />

      <p>
        For two-flavor mixing: <InlineMath latex="U = \begin{pmatrix} \cos\theta & \sin\theta \\ -\sin\theta & \cos\theta \end{pmatrix}" />.
        A <InlineMath latex="\nu_\alpha" /> produced at t=0 evolves in time. The probability of finding <InlineMath latex="\nu_\beta" /> at time t:
      </p>

      <EqNumbered number="NU.2" latex="P(\nu_\alpha \to \nu_\beta) = \sin^2(2\theta)\, \sin^2\!\left(\frac{\Delta m^2 L}{4E}\right) \qquad \text{(oscillation formula, } L = \text{distance, } E = \text{energy)}" />

      <p>
        where Δm² = m₂² − m₁² in eV². The oscillation length: <InlineMath latex="L_{\text{osc}} = 4\pi E/\Delta m^2 = 2.48\ \text{km} \times E[\text{GeV}]/\Delta m^2[\text{eV}^2]" />.
      </p>

      <Theorem number="NU.1" title="MSW Effect">
        In matter, the effective potential for ν_e differs from ν_μ,τ due to coherent
        forward scattering: V_CC = √2 G_F n_e (charged current), V_NC = −G_F n_n/√2.
        The effective Hamiltonian in the flavor basis:
        <InlineMath latex="H_{\text{eff}} = \frac{\Delta m^2}{4E}\begin{pmatrix} -\cos 2\theta + A & \sin 2\theta \\ \sin 2\theta & \cos 2\theta - A \end{pmatrix}" />
        where A = 2√2 G_F n_e E / Δm². Resonance condition A = cos2θ:
        maximal mixing even for small vacuum θ. This MSW (Mikheyev-Smirnov-Wolfenstein) effect
        explains why solar ν_e are converted to ν_μ/ν_τ inside the Sun.
      </Theorem>

      <WorkedExample number="NU.1" title="Atmospheric Neutrino Oscillation at Super-Kamiokande">
        <p>
          Super-Kamiokande (1998) observed a deficit of upward-going ν_μ vs. downward-going ν_μ
          (from cosmic ray interactions). Use the two-flavor formula to find Δm² and θ.
        </p>
        <Step label="Setup:">Cosmic ray pions decay: π → μ + ν_μ, μ → e + ν_e + ν_μ. Expected ratio R = ν_μ/ν_e ≈ 2. Observed: R was lower and strongly L-dependent (upward = longer path through Earth, L ~ 10,000 km vs. downward L ~ 15 km). ν_e shows no deficit; ν_μ shows strong deficit for upward-going — ν_μ oscillating to ν_τ (ν_τ undetected at Super-K at that energy).</Step>
        <Step label="L/E analysis:">Plot survival probability P(ν_μ → ν_μ) = 1 − sin²(2θ)sin²(1.27 Δm²[eV²] L[km]/E[GeV]) vs L/E. SK data: dip at L/E ~ 500 km/GeV. P_min ≈ 0: maximal mixing sin²(2θ) ≈ 1 → θ ≈ 45°.</Step>
        <Step label="Mass squared difference:">At minimum: 1.27 Δm² × 500 = π/2 → Δm² = π/(2 × 1.27 × 500) ≈ 2.5×10⁻³ eV². More precisely from fit: Δm²(23) ≈ 2.4×10⁻³ eV², sin²(2θ_23) &gt; 0.99 (nearly maximal). Normal ordering: m₃ &gt; m₂ &gt; m₁; inverted: m₃ &lt; m₁ &lt; m₂.</Step>
        <Step label="Implications:">Δm²(23) = 2.4×10⁻³ eV² implies m₃ ≥ √Δm² ≈ 0.05 eV (at least one mass eigenstate ≥ 50 meV). Solar mixing: Δm²(12) = 7.5×10⁻⁵ eV², θ₁₂ ≈ 34°. Absolute masses unknown; upper bound from cosmology: Σm_ν &lt; 0.12 eV (Planck 2018). KATRIN experiment: m(ν_e) &lt; 0.45 eV directly.</Step>
      </WorkedExample>

      <h2>NU.3 Neutrino Mass Mechanisms</h2>

      <p>
        The SM gives massless neutrinos (no right-handed component). To add mass:
      </p>

      <p>
        <strong>Dirac mass</strong>: add right-handed <InlineMath latex="\nu_R" /> (sterile). Yukawa coupling y: <InlineMath latex="m_D = yv/\sqrt{2}" />
        (v = Higgs VEV = 246 GeV). To get <InlineMath latex="m_\nu \sim 0.1" /> eV: y ~ 4×10⁻¹³ — unnaturally small.
      </p>

      <p>
        <strong>Majorana mass</strong>: if ν = ν̄ (its own antiparticle). Forbidden for charged
        particles (charge conservation). Allowed for neutral neutrinos.
        Majorana mass term: <InlineMath latex="m_M\, \nu^c \nu" /> (Lorentz invariant for neutral fermion).
      </p>

      <EqNumbered number="NU.3" latex="m_\nu \sim \frac{m_D^2}{M_R} \qquad \text{(seesaw type I: heavy } M_R \to \text{naturally light } m_\nu\text{)}" />

      <p>
        The seesaw mechanism: a heavy right-handed Majorana neutrino (mass <InlineMath latex="M_R \sim 10^{15}" /> GeV,
        GUT scale) generates naturally light left-handed neutrinos. Baryogenesis via
        leptogenesis: CP-violating decay of heavy <InlineMath latex="N_R" /> in early universe → lepton asymmetry →
        converted to baryon asymmetry via sphaleron processes.
      </p>

      <p>
        <strong>Neutrinoless double beta decay</strong> (0νββ): N → N+2 + 2e⁻ (no neutrinos).
        Only possible if ν is Majorana. Half-life: <InlineMath latex="T_{1/2} \ge 10^{26}" /> yr (KamLAND-Zen).
        Discovery would confirm Majorana nature and measure <InlineMath latex="|m_{\beta\beta}| = \left|\sum_i U_{ei}^2 m_i\right|" />.
      </p>

      <h2>NU.4 Neutrino Sources and Detectors</h2>

      <p>
        <strong>Solar neutrinos</strong>: pp chain dominates (<InlineMath latex="pp \to d + e^+ + \nu_e" />, E &lt; 0.42 MeV);
        ⁸B neutrinos (E ~ 14 MeV) detected by SNO. Total flux: ~6×10¹⁰ cm⁻²s⁻¹.
        <strong>Reactor antineutrinos</strong> (<InlineMath latex="\bar\nu_e" />): from β-decay of fission products.
        KamLAND: 180 km average baseline, measured θ₁₂ and <InlineMath latex="\Delta m^2_{12}" />.
        Daya Bay, RENO: short baseline (1-2 km), measured θ₁₃ = 8.5° (2012).
      </p>

      <p>
        <strong>IceCube</strong>: cubic-kilometer detector at South Pole. Cherenkov light from ν interactions.
        TeV-PeV astrophysical neutrinos detected (2013): diffuse flux consistent with <InlineMath latex="E^{-2.5}" /> spectrum.
        First sources: Seyfert galaxy NGC 1068 (2022), blazar TXS 0506+056.
        <strong>DUNE</strong>: long-baseline experiment (Fermilab to Homestake, 1300 km).
        Goals: CP violation in neutrino sector (<InlineMath latex="\delta_{CP}" />), mass ordering, proton decay.
      </p>

      <Definition number="NU.1" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Flavor states are not mass states:</strong> oscillations happen because propagation phases differ.</li>
          <li><strong>Oscillation needs nonzero mass differences:</strong> absolute mass scale is a separate question.</li>
          <li><strong>Matter changes mixing:</strong> the MSW effect can enhance flavor conversion.</li>
          <li><strong>Neutrinos are hard to detect because weak interactions are weak:</strong> huge fluxes still produce few events.</li>
        </ul>
      </Definition>

      <PracticeProblems section="NU.1–NU.4 Neutrino Physics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={0.57} unit="" tolerance={0.05}
          hints={[
            'The phase argument 1.267 × Δm² × L / E is enormous (≈ 10⁶) for solar neutrinos, so the sin² term averages to ½.',
            'P_ee = 1 - ½ sin²(2θ) = 1 - ½ × 0.855 = 1 - 0.4275 ≈ 0.57 in the averaging regime.',
          ]}
          problemText="Calculate the ν_e survival probability P_ee for solar ⁸B neutrinos (E = 10 MeV, L = 1.5×10⁸ km) using two-flavor vacuum oscillation with Δm²(12) = 7.5×10⁻⁵ eV² and sin²(2θ) = 0.855. Rapid oscillations average out."
          solution={<>Two-flavor oscillation probability. P(ν_α→ν_β) = sin²(2θ) sin²(Δm²L/4E), where Δm²L/4E = 1.267 Δm²[eV²] L[km] / E[GeV]. For solar ν_e → ν_μ: Δm²₁₂ = 7.5×10⁻⁵ eV² and sin²(2θ₁₂)=0.855. Distance Sun to Earth: L = 1.5×10⁸ km. For E = 10 MeV = 10⁻² GeV, phase = 1.267×7.5×10⁻⁵×1.5×10⁸/10⁻² = 1.43×10⁶. The rapid oscillations average to ½, so P(ν_e→ν_μ) ≈ ½×0.855 = 0.43 and P(ν_e→ν_e) ≈ 0.57 in vacuum. With the solar MSW effect, high-energy ⁸B neutrinos undergo adiabatic conversion and P_ee ≈ sin²θ₁₂ ≈ 0.30.</>}>
          Calculate the ν_e survival probability for solar ⁸B neutrinos (E = 10 MeV, L = 1.5×10⁸ km) using two-flavor vacuum oscillation with Δm²(12) = 7.5×10⁻⁵ eV² and sin²(2θ) = 0.855.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={1e25} unit="cm⁻³" tolerance={0.30}
          hints={[
            'MSW resonance condition: 2E√2 G_F n_e = Δm² cos2θ. Solve for n_e.',
            'Use V_e = √2 G_F n_e = 7.63×10⁻¹⁴ eV × Y_e × (ρ in g/cm³). For E = 10 MeV, Δm² = 7.5×10⁻⁵ eV², cos2θ ≈ 0.39, Y_e ≈ 0.5, find ρ_res then convert to n_e.',
          ]}
          problemText="Derive the MSW resonance condition in matter. At what electron number density n_e (in cm⁻³) does resonance occur for ⁸B solar neutrinos with E = 10 MeV? Use Δm²(12) = 7.5×10⁻⁵ eV² and cos2θ₁₂ ≈ 0.39."
          solution={<>MSW resonance in the Sun occurs when 2E√2G_F n_e = Δm² cos2θ. For solar parameters Δm²₁₂ = 7.5×10⁻⁵ eV² and cos2θ₁₂ ≈ 0.39. Using V_e = √2G_F n_e = 7.63×10⁻¹⁴ eV × Y_e ρ/(g cm⁻³), the resonance density is ρ_res = Δm² cos2θ/(2E×7.63×10⁻¹⁴Y_e). For E = 10 MeV and Y_e ≈ 0.5, ρ_res ≈ 40 g/cm³, corresponding to n_e ≈ 10²⁵ cm⁻³. This density is present in the solar interior, so high-energy ⁸B neutrinos pass through an MSW resonance and are depleted more strongly than low-energy pp neutrinos.</>}>
          Derive the MSW resonance condition in matter. At what electron density does resonance occur for ⁸B solar neutrinos (E = 10 MeV)? Is this density present in the Sun?
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Seesaw mechanism: mass matrix for one generation: <InlineMath latex="M = \begin{pmatrix} 0 & m_D \\ m_D & M_R \end{pmatrix}" /> where m_D ~ yv/√2 (Dirac) and M_R ≫ m_D (heavy Majorana). Eigenvalues are approximately M_R and −m_D²/M_R, so the light neutrino mass is m_ν = m_D²/M_R. For m_ν ~ 0.05 eV and m_D ~ m_τ = 1.78 GeV: M_R = (1.78×10⁹ eV)²/0.05 eV = 6.3×10¹⁹ eV = <strong>6.3×10¹⁰ GeV</strong>. Leptogenesis: CP-violating heavy N_R decays produce a lepton asymmetry Y_L; electroweak sphalerons violate B+L while conserving B−L and convert part of that lepton asymmetry into the observed baryon asymmetry Y_B ≈ 8.7×10⁻¹¹.</>}>
          Explain the type-I seesaw mechanism. What right-handed neutrino mass M_R is needed to generate m_ν ~ 0.05 eV with Dirac mass m_D ~ m_τ? Outline how leptogenesis generates the baryon asymmetry.
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Neutrinoless double beta decay would be (A,Z) → (A,Z+2) + 2e⁻ with no neutrinos, violating lepton number by two units. The standard light-Majorana exchange rate is (T_(1/2))⁻¹ = G^(0ν)(Q,Z)|M^(0ν)|²|m_ββ/m_e|², where m_ββ = |Σ_i U²_(ei)m_i| includes Majorana phases. For normal ordering, m_ββ can be only a few meV; for inverted ordering it is typically ~20–50 meV. KamLAND-Zen 800 (2023): T_(1/2)(¹³⁶Xe) &gt; 2.3×10²⁶ yr, implying m_ββ &lt; 36–156 meV depending on nuclear matrix elements. LEGEND-1000 uses ⁷⁶Ge and targets T_(1/2) &gt; 10²⁸ yr, reaching ~10 meV sensitivity and probing the inverted-ordering region.</>}>
          Explain neutrinoless double beta decay. What is the effective Majorana mass m_ββ? What do current experimental bounds (KamLAND-Zen: T½ &gt; 2.3×10²⁶ yr) imply for the neutrino mass hierarchy?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Neutrino oscillations: P(ν_α→ν_β) = sin²(2θ)sin²(1.267 Δm² L/E). Require nonzero masses → BSM physics.',
        'Atmospheric: Δm²(23) ≈ 2.4×10⁻³ eV², θ₂₃ ≈ 45°. Solar: Δm²(12) = 7.5×10⁻⁵ eV², θ₁₂ = 34°. θ₁₃ = 8.5°.',
        'MSW effect: matter potential for ν_e from W exchange. Resonance A=cos2θ → level crossing → adiabatic conversion.',
        'Seesaw: m_ν = m_D²/M_R. GUT-scale M_R ~ 10¹⁵ GeV gives naturally m_ν ~ 0.1 eV.',
        'Majorana vs Dirac: neutrinoless double beta decay tests Majorana nature. Current: T½ > 10²⁶ yr → m_ββ < 36-156 meV.',
        'Absolute masses: cosmological bound Σm_ν < 0.12 eV (Planck). KATRIN direct: m(ν_e) < 0.45 eV.',
      ]} />
    </div>
  );
}
