import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function ParticlePhysicsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Upper Division</div>
      <h1>Particle Physics &amp; The Standard Model</h1>
      <p className="subtitle">
        The Standard Model of particle physics describes all known matter and three of the
        four fundamental forces in terms of quantum fields. It has been tested to extraordinary
        precision and remains the most successful scientific theory ever constructed.
      </p>

      <Prerequisites items={['Quantum mechanics (Ch. 20)', 'Special relativity (Ch. 19)', 'Spin & angular momentum (Ch. SP)']} />

      <LearningGoals items={[
        'Classify all Standard Model particles by spin, charge, and color and identify the force carrier for each interaction.',
        'Explain asymptotic freedom and confinement in QCD using the running coupling constant α_s(Q²).',
        'Apply quark model addition rules to verify charges and strangeness of baryons and mesons.',
        'Use the Weinberg angle to derive the W and Z boson masses from electroweak unification.',
        'Draw leading-order Feynman diagrams for QED and weak processes and extract cross sections from the amplitude M.',
      ]} />

      <h2>PP.1 Elementary Particles</h2>

      <Definition number="PP.1" title="The Standard Model Particles">
        <span style={{ display: 'block', marginBottom: '0.5rem' }}>
          <strong>Quarks (spin-½, fractional charge):</strong> up(+2/3e), down(−1/3e), charm, strange, top, bottom. Quarks combine into hadrons: baryons (3 quarks, e.g. proton uud) and mesons (quark-antiquark, e.g. pion u-dbar).
        </span>
        <span style={{ display: 'block', marginBottom: '0.5rem' }}>
          <strong>Leptons (spin-½, integer charge):</strong> electron (e⁻), muon (μ⁻), tau (τ⁻), and their neutrinos (νe, νμ, ντ). Each has an antiparticle.
        </span>
        <span style={{ display: 'block', marginBottom: '0.5rem' }}>
          <strong>Force carriers (spin-1 bosons):</strong> photon γ (EM), W±, Z⁰ (weak), 8 gluons (strong).
        </span>
        <span style={{ display: 'block' }}>
          <strong>Higgs boson (spin-0):</strong> discovered at LHC 2012. Mass 125 GeV. Responsible for electroweak symmetry breaking and gives fermions and W/Z their masses.
        </span>
      </Definition>

      <h2>PP.2 The Three Forces</h2>

      <p>
        <strong>Electromagnetism (QED):</strong> mediated by massless photon. Coupling strength
        α = e²/(4πε₀ℏc) = 1/137.036. Tested to 12 decimal places (electron g-factor).
        Range: infinite (massless mediator).
      </p>

      <p>
        <strong>Weak force:</strong> mediated by W± (80.4 GeV) and Z⁰ (91.2 GeV) — massive
        because of spontaneous symmetry breaking (Higgs mechanism). Responsible for β decay,
        neutrino interactions, flavor-changing processes. Parity-violating: W only couples to
        left-handed fermions. Range: 10⁻¹⁸ m.
      </p>

      <p>
        <strong>Strong force (QCD):</strong> mediated by gluons. Quarks carry "color charge"
        (red, green, blue). Two unique features distinguish QCD:
      </p>

      <EqNumbered number="PP.1">α_s(Q²) = 12π / [(33 − 2n_f) ln(Q²/Λ²_QCD)] &nbsp;&nbsp;&nbsp; (running coupling)</EqNumbered>

      <p>
        <strong>Asymptotic freedom:</strong> α_s → 0 at high Q² (short distances) — quarks
        behave like free particles inside the proton at high energies. 2004 Nobel Prize.
      </p>

      <p>
        <strong>Confinement:</strong> α_s → large at low Q² — color flux tubes form between
        quarks with energy density ~1 GeV/fm. If you try to separate a quark, the string
        breaks and produces a new quark-antiquark pair. Isolated quarks cannot exist.
      </p>

      <h2>PP.3 Symmetries and Conservation Laws</h2>

      <p>
        The Standard Model is built on gauge symmetry: SU(3) × SU(2) × U(1).
        Each factor corresponds to a force: SU(3) is QCD (8 gluons = 3²−1), SU(2)×U(1)
        gives electroweak (W±, Z⁰, γ = 4 bosons = 3 + 1, mixed by Weinberg angle θ_W).
      </p>

      <p>
        <strong>Conservation laws from symmetry (Noether):</strong>
        Gauge invariance → charge conservation.
        Lorentz invariance → energy-momentum conservation.
        Baryon number B, lepton numbers L_e, L_μ, L_τ conserved (at low energy).
      </p>

      <p>
        <strong>Discrete symmetries:</strong> C (charge conjugation), P (parity), T (time reversal).
        QED and QCD conserve all three. The weak interaction violates P maximally (Wu experiment 1956).
        CP violation (1964, K meson) explains matter-antimatter asymmetry — without it, the
        Big Bang would have produced equal matter and antimatter.
      </p>

      <WorkedExample number="PP.1" title="The Quark Model: Mass and Charge">
        <p>
          The proton (uud), neutron (udd), and π⁺ meson (ud̄). Verify charges. Estimate proton mass.
        </p>
        <Step label="Proton charge:">uud: Q = +2/3 + 2/3 − 1/3 = +1 ✓</Step>
        <Step label="Neutron charge:">udd: Q = +2/3 − 1/3 − 1/3 = 0 ✓</Step>
        <Step label="Pion charge:">π⁺ = ud̄: Q = +2/3 + 1/3 = +1 ✓ (d̄ has charge +1/3)</Step>
        <Step label="Proton mass:">m_u ≈ 2.2 MeV, m_d ≈ 4.7 MeV. Sum of quarks: 2×2.2 + 4.7 = 9.1 MeV. But proton mass = 938.3 MeV! The remaining ~929 MeV comes from gluon fields and quark kinetic energy — "dynamical mass generation" from QCD. 99% of the proton mass (and your mass) is energy, not quark rest mass.</Step>
      </WorkedExample>

      <h2>PP.4 Feynman Diagrams and Cross Sections</h2>

      <p>
        Feynman diagrams are pictorial representations of perturbation theory expansions in
        the coupling constant. Each diagram corresponds to a term in the S-matrix amplitude.
        The rules are: external lines (particles in/out), internal lines (propagators = virtual
        particles), vertices (coupling constant), loops (higher-order corrections).
      </p>

      <p>
        The <strong>cross section</strong> is the quantum mechanical transition rate normalized
        to incoming flux:
      </p>

      <EqNumbered number="PP.2">σ = (1/flux) × Σ |M|² × (phase space) &nbsp;&nbsp;&nbsp; [m²]</EqNumbered>

      <p>
        where M is the Feynman amplitude. For e⁺e⁻ → μ⁺μ⁻ at center-of-mass energy √s ≫ m_μ:
        σ = 4πα²/(3s) — the classic QED result, confirmed to percent level at LEP. The ratio
        R = σ(hadrons)/σ(μ⁺μ⁻) counts quark colors and flavors, proving quarks come in
        3 colors.
      </p>

      <Definition number="PP.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Conservation laws control reactions:</strong> charge, energy-momentum, baryon number, and lepton number must be checked.</li>
          <li><strong>Virtual particles are calculation terms:</strong> they are internal lines, not directly observed particles.</li>
          <li><strong>Cross section is not literal size:</strong> it is an effective interaction probability.</li>
          <li><strong>Running couplings depend on scale:</strong> interaction strength changes with momentum transfer.</li>
        </ul>
      </Definition>

      <PracticeProblems section="PP.1–PP.4 Particle Physics">
        <Problem n={1} difficulty="easy"
          solution={<>Particle identification: (a) Σ⁺ = uus (2/3+2/3−1/3=+1 ✓, baryon B=1). (b) K⁰ = ds̄ (−1/3+1/3=0 ✓, meson B=0, strangeness S=−1). (c) Ω⁻ = sss (3×(−1/3)=−1 ✓, B=1, S=−3). Ω⁻ was predicted by Gell-Mann&apos;s Eightfold Way (SU(3) flavor symmetry) in 1962 before its discovery in 1964 — a triumph of the quark model. (d) J/ψ = cc̄ (2/3−2/3=0, B=0, hidden charm C=0). Discovery in 1974 "November Revolution" confirmed charm quark existence. Width Γ=93 keV is narrow because J/ψ is below D-Dbar threshold — can&apos;t decay to open-charm hadrons, so decays only electromagnetically (slow). Compare ρ⁰ = uū−ddbar: Γ=150 MeV (decays strongly, wide).</>}>
          Identify the quark content of: (a) Σ⁺ (Q=+1, S=−1, B=1), (b) K⁰ (Q=0, S=−1, B=0), (c) Ω⁻ (Q=−1, S=−3, B=1). Why was the Ω⁻ discovery significant?
        </Problem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={1.23e-4} unit="" tolerance={0.05}
          hints={['Helicity suppression: the rate is proportional to m_lepton²', 'Ratio = (m_e/m_μ)² × [(m_π² − m_e²)/(m_π² − m_μ²)]²; use m_e = 0.511 MeV, m_μ = 105.7 MeV, m_π = 139.6 MeV']}
          problemText="Calculate the ratio Γ(π⁺ → e⁺νe) / Γ(π⁺ → μ⁺νμ) using the helicity suppression formula. Use m_e = 0.511 MeV, m_μ = 105.7 MeV, m_π = 139.6 MeV."
          solution={<>Pion lifetime: π⁺ → μ⁺ + νμ (dominant, ~99.99%). Weak decay through W⁺ (ud̄ → W⁺ → μ⁺νμ). Helicity suppression: W couples to left-handed particles (right-handed antiparticles). In π⁺ decay, conservation of angular momentum: π⁺ has J=0, so μ⁺ and νμ must be opposite helicity. νμ is always left-handed → μ⁺ must be right-handed. But W couples to left-handed muon/right-handed antimuon. Rate ∝ m_μ² (helicity suppression factor). Ratio: Γ(π→eν)/Γ(π→μν) = (m_e/m_μ)² × (m_π²−m_e²)²/(m_π²−m_μ²)² ≈ 1.23×10⁻⁴. Measured: 1.23×10⁻⁴ ✓ — helicity suppression verified. π⁰ lifetime ≈ 8×10⁻¹⁷ s (electromagnetic, via 2γ — much faster). π⁺ lifetime ≈ 2.6×10⁻⁸ s (weak).</>}>
          Why does π⁺ → e⁺ + νe have a much smaller rate than π⁺ → μ⁺ + νμ, even though the electron is lighter? Calculate the ratio.
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={80.0} unit="GeV" tolerance={0.02}
          hints={['From the Higgs mechanism: M_W = M_Z cos θ_W', 'Use M_Z = 91.19 GeV and sin²θ_W = 0.231, so cos θ_W = √(1 − 0.231)']}
          problemText="Predict the W boson mass (in GeV) from M_Z = 91.19 GeV and the Weinberg angle sin²θ_W = 0.231 using M_W = M_Z cos θ_W."
          solution={<>Electroweak unification: Glashow-Salam-Weinberg theory. Weinberg angle θ_W: sin²θ_W = 0.231. Masses from Higgs mechanism: M_W = M_Z cos θ_W. M_Z = 91.19 GeV, M_W = 91.19×cos(28.7°) = 91.19×0.877 = 80.0 GeV (measured: 80.38 GeV ✓). Fermi constant G_F/(ℏc)³ = π α/(√2 M_W²) = 1.166×10⁻⁵ GeV⁻². At low energies: G_F unified coupling; at E~M_W: W boson resolved. Running coupling: at M_Z: α = 1/128 (not 1/137 — vacuum polarization screens charge less at shorter distances). sin²θ_W = 1 − M_W²/M_Z² = 1 − 0.877² = 0.231 ✓. Charged current (W): quark flavor change; neutral current (Z): no flavor change. Discovery of neutral currents (Gargamelle 1973) confirmed unification.</>}>
          Use the Weinberg angle (sin²θ_W = 0.231) to predict the W and Z masses from the Z mass. How does electroweak unification work?
        </InteractiveProblem>

        <Problem n={4} difficulty="hard"
          solution={<>Higgs mechanism: SU(2)×U(1) gauge theory with Higgs doublet Φ with potential V = −μ²|Φ|² + λ|Φ|⁴. For μ²&gt;0: minimum at |Φ|² = μ²/(2λ) = v²/2 (vacuum expectation value v = 246 GeV). Expand around minimum: Φ = (0, (v+h)/√2). Covariant kinetic term |DμΦ|² with D = ∂−igW−ig&apos;B generates mass terms: L_mass = (gv/2)²W⁺W⁻ + (v²/8)(gW³−g&apos;B)² → M_W = gv/2 = 80.4 GeV, M_Z = (g²+g&apos;²)^(1/2)v/2 = 91.2 GeV. Photon A = (g&apos;W³+gB)/√(g²+g&apos;²) stays massless (U(1)_EM unbroken). Fermion masses: Yukawa coupling y_f Φ̄ψ_L ψ_R → m_f = y_f v/√2. Top quark: y_t ≈ 1 (strong coupling). Electron: y_e ≈ 3×10⁻⁶ (weak). Why hierarchies? — unsolved problem.</>}>
          Explain the Higgs mechanism: how does spontaneous symmetry breaking of SU(2)×U(1) give masses to the W and Z bosons while leaving the photon massless?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Matter: 6 quarks (fractional charge, color) + 6 leptons (integer charge). Antiparticles for each.',
        'Forces: γ (EM), W±/Z⁰ (weak), 8 gluons (strong). Higgs gives W/Z/fermion masses.',
        'QCD: asymptotic freedom (free at high E), confinement (confined at low E). Color flux tubes.',
        'Gauge symmetry SU(3)×SU(2)×U(1). Electroweak unification at ~100 GeV.',
        'CP violation: weak interaction. Explains matter-antimatter asymmetry.',
        'Feynman diagrams → S-matrix amplitudes. Cross section σ ∝ |M|². R ratio proves 3 colors.',
      ]} />
    </div>
  );
}
