import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function CurvedSpacetimePage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Advanced Topics</div>
      <h1>QFT in Curved Spacetime</h1>
      <p className="subtitle">
        Quantum field theory on a curved background — without quantizing gravity itself —
        reveals profound effects: particle creation by expanding universes,
        Hawking radiation from black holes, and the Unruh effect for accelerating observers.
        These semiclassical results sit at the intersection of quantum mechanics and general relativity.
      </p>

      <Prerequisites items={['General relativity (Ch. GR)', 'QFT (Ch. QFT)', 'Tensor calculus (Ch. TC)', 'Statistical mechanics (Ch. S)']} />

      <LearningGoals items={[
        'Explain how Bogoliubov transformations between mode decompositions lead to particle creation in curved spacetime.',
        'Derive the Hawking temperature T_H = ℏc³/(8πGMk_B) and compute it for black holes of various masses.',
        'Apply the Stefan-Boltzmann law to Hawking radiation to find the black hole evaporation timescale t_ev ∝ M₀³.',
        'Explain the Unruh effect and compute the Unruh temperature for a given proper acceleration.',
        'Describe how quantum fluctuations during inflation seed the CMB power spectrum via the Gibbons-Hawking temperature.',
      ]} />

      <h2>CST.1 Quantum Fields on Curved Backgrounds</h2>

      <p>
        Replace the flat Minkowski metric η_μν with a general curved metric g_μν(x).
        The action for a real scalar field becomes:
      </p>

      <EqNumbered number="CST.1">S = −½ ∫ d⁴x √(−g) [g^(μν) ∂_μφ ∂_νφ + (m² + ξR) φ²]</EqNumbered>

      <p>
        where ξ is the non-minimal coupling to the Ricci scalar R. Minimal coupling: ξ = 0.
        Conformal coupling (massless): ξ = 1/6 in 4D. The Klein-Gordon equation becomes:
        (□ − m² − ξR) φ = 0 where □ = (1/√−g) ∂_μ(√−g g^(μν) ∂_ν).
      </p>

      <p>
        <strong>Bogoliubov transformation</strong>: in curved spacetime, there is no unique notion
        of a vacuum. Two observers use different mode decompositions (u_k) and (ū_k):
        φ = Σ_k (a_k u_k + a†_k u*_k) = Σ_k (b_k ū_k + b†_k ū*_k).
        The Bogoliubov coefficients α_kk', β_kk' relate a_k to b_k and b†_k:
        a_k = Σ_(k') (α_(kk') b_(k') + β*_(kk') b†_(k')).
        The number of particles in mode k of the (ū) vacuum:
        ⟨0_u|N̂_k|0_u⟩ = Σ_(k') |β_(kk')|² ≠ 0.
      </p>

      <h2>CST.2 Hawking Radiation</h2>

      <p>
        Hawking (1974): a Schwarzschild black hole emits thermal radiation at temperature:
      </p>

      <EqNumbered number="CST.2">T_H = ℏc³/(8πG M k_B) = ℏκ/(2πk_B c) &nbsp;&nbsp;&nbsp; (Hawking temperature, κ = surface gravity)</EqNumbered>

      <p>
        Derivation sketch: in the Schwarzschild geometry, modes near the future horizon
        experience extreme blueshift tracing back to the past horizon.
        An ingoing vacuum mode in the far past (Unruh/Hartle-Hawking state) appears
        as an outgoing thermal state at infinity with Planck spectrum T = T_H.
        The derivation uses the Bogoliubov transformation between early-time (Minkowski-like)
        and late-time (Schwarzschild) modes — the β coefficients are non-zero,
        giving a thermal spectrum.
      </p>

      <Theorem number="CST.1" title="Bekenstein-Hawking Entropy">
        A black hole with area A has thermodynamic entropy:
        S_BH = k_B A/(4 ℓ_Pl²) = k_B c³ A/(4 Gℏ)
        Equivalently: S_BH = k_B × (area in Planck units)/4. For a solar-mass black hole:
        S_BH ≈ 10⁷⁷ k_B — vastly larger than the entropy of the original star (~10⁵⁷ k_B).
        The first law of black hole mechanics:
        dM = T_H dS_BH + Ω_H dJ + Φ_H dQ (rotation and charge included).
        The four laws of black hole mechanics map exactly onto the four laws of thermodynamics,
        with T_H and S_BH playing the roles of temperature and entropy.
      </Theorem>

      <WorkedExample number="CST.1" title="Black Hole Evaporation Timescale">
        <p>
          A black hole radiates as a blackbody at T_H ≈ ℏc³/(8πGMk_B). Compute
          how long it takes a black hole of initial mass M₀ to evaporate completely.
        </p>
        <Step label="Luminosity:">Stefan-Boltzmann: L = σ A T_H⁴ where A = 4πr_s² = 16πG²M²/c⁴ and σ = π²k_B⁴/(60ℏ³c²). Substituting T_H: L = (ℏc⁶)/(15360π G²M²) — decreases as M⁻². Note: as M decreases, T increases, L increases → runaway (black hole bomb).</Step>
        <Step label="Mass loss rate:">dM/dt = −L/c² = −ℏc⁴/(15360π G²M²). Rearrange: M² dM = −ℏc⁴/(15360π G²) dt. Integrate: M³(t) = M₀³ − 3ℏc⁴/(15360π G²) × t.</Step>
        <Step label="Evaporation time:">Set M(t_ev) = 0: t_ev = M₀³ × (15360π G²)/(3ℏc⁴) = 5120π G²M₀³/(ℏc⁴). Numerically: t_ev ≈ 5120π G²/(ℏc⁴) × M₀³. For M₀ = M_☉ = 2×10³⁰ kg: t_ev ≈ 6.6×10⁷⁴ s ≈ 2.1×10⁶⁷ years — vastly longer than the age of the universe (1.4×10¹⁰ yr).</Step>
        <Step label="Primordial BH:">For t_ev = 13.8×10⁹ yr ≈ 4.35×10¹⁷ s: M₀ = (ℏc⁴ × t_ev/(5120π G²))^(1/3) ≈ 2.6×10¹¹ kg ≈ mass of a large asteroid. Primordial BHs with M &lt; 2.6×10¹¹ kg have already evaporated. M ~ 10¹² kg: currently evaporating, producing gamma-ray bursts (searched for but not detected — constrains primordial BH abundance).</Step>
      </WorkedExample>

      <h2>CST.3 Unruh Effect</h2>

      <p>
        An accelerating observer (Rindler observer with acceleration a) sees the Minkowski
        vacuum as a thermal bath at the Unruh temperature:
      </p>

      <EqNumbered number="CST.3">T_U = ℏa/(2πk_B c) &nbsp;&nbsp;&nbsp; (Unruh temperature)</EqNumbered>

      <p>
        Numerically: T_U = 1 K requires a = 2πk_Bc/ℏ ≈ 2.5×10²⁰ m/s² — 10²⁰ times Earth&apos;s gravity.
        The Unruh effect has not been directly measured (requires enormous accelerations),
        but it is closely related to Hawking radiation via a coordinate transformation.
      </p>

      <p>
        Both the Hawking and Unruh temperatures have the same mathematical structure:
        T = ℏκ/(2πk_B) where κ is the relevant acceleration (surface gravity or proper acceleration).
        The KMS condition: a thermal state satisfies the Kubo-Martin-Schwinger condition
        on Green&apos;s functions, a universal characterization of thermal equilibrium in QFT.
      </p>

      <h2>CST.4 Particle Creation in Cosmology</h2>

      <p>
        An expanding universe with scale factor a(t) creates particles. The
        Friedmann-Robertson-Walker (FRW) metric: ds² = −dt² + a²(t)(dx² + dy² + dz²).
        The conformal time η: dη = dt/a(t); the metric becomes ds² = a²(η)(−dη² + dx²).
      </p>

      <p>
        <strong>Cosmological particle creation</strong>: in de Sitter space (inflationary epoch,
        H = const), the Bogoliubov coefficients between in and out modes give thermal
        distribution at the Gibbons-Hawking temperature T_GH = ℏH/(2πk_B) — the de Sitter
        horizon radiates like a black hole. During inflation, quantum fluctuations of the
        inflaton field (δφ ~ H/(2π)) freeze out when k = aH — this seeds the CMB temperature
        anisotropies observed today!
      </p>

      <p>
        <strong>Schwinger effect</strong>: a strong electric field E creates electron-positron pairs
        at rate Γ ∝ exp(−πm²c³/(eEℏ)) — the QED vacuum is unstable above E_Sch = m²c³/(eℏ) ≈ 1.3×10¹⁸ V/m.
        Analogous to Hawking radiation via the Bogoliubov mechanism (exponential suppression ≡ tunneling).
      </p>

      <Definition number="CST.1" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Particle number can be observer-dependent:</strong> curved spacetime changes the meaning of vacuum.</li>
          <li><strong>Hawking radiation is quantum field theory on curved geometry:</strong> it is not classical radiation from the horizon surface.</li>
          <li><strong>Backreaction is hard:</strong> treating spacetime as fixed ignores energy carried by quantum fields.</li>
          <li><strong>Horizons are causal boundaries:</strong> coordinate singularities must be separated from physical singularities.</li>
        </ul>
      </Definition>

      <PracticeProblems section="CST.1–CST.4 QFT in Curved Spacetime">
        <InteractiveProblem n={1} difficulty="easy"
          answer={1.2e11} unit="K" tolerance={0.15}
          hints={[
            'Use T_H = ℏc³/(8πGMk_B). For a solar-mass BH this gives 6.17×10⁻⁸ K, so T_H scales as M_☉/M.',
            'For a primordial BH of mass M = 10¹² kg, multiply 6.17×10⁻⁸ K by (M_☉/M) = (2×10³⁰/10¹²) = 2×10¹⁸.',
          ]}
          problemText="Calculate the Hawking temperature for (a) a solar-mass black hole (answer in K, expected ~6×10⁻⁸ K) and (b) a primordial black hole of mass 10¹² kg. Enter the temperature of the primordial black hole in K."
          solution={<>Hawking temperature for various black holes. T_H = ℏc³/(8πGMk_B) = 6.17×10⁻⁸ K × (M_☉/M). Solar mass BH (M=M_☉=2×10³⁰ kg): T_H = 6.2×10⁻⁸ K — colder than the CMB (2.7 K). BH grows by absorbing CMB photons. Stellar BH (M=10M_☉): T_H = 6.2×10⁻⁹ K. Primordial BH (M=10¹² kg): T_H = ℏc³/(8πG×10¹² kg×k_B) = 6.17×10⁻⁸ × (2×10³⁰/10¹²) K = 6.17×10⁻⁸ × 2×10¹⁸ K ≈ 1.2×10¹¹ K → gamma rays (E ~ k_BT ~ 10 MeV). M = 10¹⁵ kg (micro BH): T ~ 10⁸ K → X-rays. Supermassive BH (M = 10⁹ M_☉): T_H ~ 6.2×10⁻¹⁷ K → completely unobservable. Summary: Hawking radiation only relevant for M ≪ M_☉; for any astrophysical BH, T_H ≪ T_CMB and BH grows, not shrinks.</>}>
          Calculate the Hawking temperature for (a) a solar-mass black hole, (b) a primordial black hole of mass 10¹² kg. Compare to the CMB temperature (2.7 K).
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={2.5e20} unit="m/s²" tolerance={0.10}
          hints={[
            'The Unruh temperature is T_U = ℏa/(2πk_Bc). Rearrange for a: a = 2πk_BcT_U/ℏ.',
            'For T_U = 1 K: a = 2π × (1.38×10⁻²³) × (3×10⁸) × 1 / (1.055×10⁻³⁴) ≈ 2.5×10²⁰ m/s².',
          ]}
          problemText="Explain physically why a uniformly accelerating observer perceives the Minkowski vacuum as a thermal state (Unruh effect). What proper acceleration in m/s² is required to observe an Unruh temperature of T_U = 1 K?"
          solution={<>Unruh effect derivation concept: in Minkowski spacetime, a uniformly accelerated observer (Rindler) with acceleration a follows trajectory: t = (c/a)sinh(aτ/c), x = (c²/a)cosh(aτ/c). The Rindler wedge (x&gt;|t|) is causally disconnected from region x&lt;-|t| (analogous to BH interior). The field mode decomposition appropriate to Rindler coordinates: u_Ω ~ (e^(iΩξ-iΩη)) where ξ, η are Rindler coordinates (η = at/c, e^ξ = a(x²-c²t²)^(1/2)/c²). Bogoliubov transformation between Rindler modes and Minkowski modes gives: β^(Rindler)_ΩΩ' ~ e^(-πΩc/a). The number density of Rindler quanta (Minkowski vacuum): n_Ω = |β|²/(|α|²-|β|²) = 1/(e^(2πΩc/a)-1) — Planck distribution at T_U = ℏa/(2πk_Bc). For T_U = 1 K: a = 2πk_BcT_U/ℏ = 2π×1.38×10⁻²³×3×10⁸×1/1.055×10⁻³⁴ ≈ 2.5×10²⁰ m/s² — 10²⁰ times Earth gravity. Physical interpretation: the Rindler horizon acts like a black hole horizon; causal boundary creates thermal correlations. Same mechanism as Hawking — confirms Hawking effect is kinematic, not dynamical.</>}>
          Explain physically why a uniformly accelerating observer perceives the Minkowski vacuum as a thermal state. What is the Unruh temperature for an electron at the Schwinger field E_sch ≈ 1.3×10¹⁸ V/m?
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Information paradox: Hawking (1976) argued that black hole evaporation destroys quantum information. Initially pure state |ψ⟩ evolves to a mixed thermal state ρ_thermal — violating unitarity of quantum mechanics. This is the black hole information paradox. Page (1993): for a unitary evaporation process, the entanglement entropy S_rad of the radiation must first increase (as radiated photons accumulate) then decrease back to zero by the end of evaporation. The "Page time" = half-evaporation time ~ t_ev/2. Entanglement entropy of radiation that follows Page curve ≠ thermal entropy (which always increases). Recent resolution (Penington 2020, Almheiri-Mahajan-Maldacena-Zhao 2019): island formula. S_rad = min over islands: A(∂Is)/(4G) + S_QFT(Is ∪ rad). For t &lt; t_Page: island = empty, S_rad = Hawking thermal entropy (increasing). For t &gt; t_Page: island includes BH interior near singularity; S_rad decreases back to zero. The island contribution (replica wormhole) — a gravitational saddle in the path integral — implements unitarity. Connection to AdS/CFT: boundary CFT is unitary → BH evaporation must be unitary → information preserved. But mechanism is subtle (firewalls? ER=EPR?).</>}>
          State the black hole information paradox. What is the Page curve, and how does the island formula (replica wormholes) restore unitarity?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>CMB power spectrum from inflation: during de Sitter inflation, each Fourier mode φ_k of the inflaton evolves in FRW background. In conformal time η (negative during inflation), the mode equation is: v_k'' + (k² - a''/a) v_k = 0 where v_k = a φ_k and '' = d²/dη². In de Sitter: a = -1/(Hη), a''/a = 2/η². For k|η| ≫ 1 (sub-horizon): v_k ~ e^(-ikη)/√(2k) (Minkowski vacuum). For k|η| → 0 (super-horizon freeze-out): v_k ~ C_k × (-η)^0 + D_k × (-η)^3. Matching: C_k = -iH/(√(2k³)). Power spectrum: P_φ(k) = k³|φ_k|²/(2π²) = (H/(2π))² (nearly scale-invariant, Harrison-Zel'dovich). Spectral tilt: n_s - 1 = -2ε - η_sl where ε = -(Ḣ/H²) and η_sl = (V''/V)/(3H²) are slow-roll parameters. Tensor modes: gravitational waves with amplitude P_t = 2(H/πM_Pl)². Tensor-to-scalar ratio r = P_t/P_s = 16ε. Measured: n_s = 0.965 ± 0.004 → ε + η_sl/2 ≈ 0.018. Planck 2018: r &lt; 0.06. These quantum-to-classical fluctuations seeded all structure in the universe.</>}>
          Derive the nearly scale-invariant power spectrum of scalar fluctuations during inflation. How does the Unruh/de Sitter temperature T_GH = H/(2π) relate to the amplitude of CMB temperature anisotropies?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'No unique vacuum in curved spacetime. Bogoliubov transformation: a_k = Σ(α b + β* b†). |β|² = particle creation.',
        'Hawking temperature: T_H = ℏc³/(8πGMk_B). BH radiates thermally. 1 M_☉ BH: T_H = 6×10⁻⁸ K (unobservable).',
        'BH entropy: S = A/(4ℓ_Pl²). First law: dM = T_H dS + Ω dJ. Evaporation time ~ M₀³.',
        'Unruh effect: accelerating observer sees T_U = ℏa/(2πk_Bc). Same mechanism as Hawking via Rindler horizon.',
        'Inflation: de Sitter Gibbons-Hawking T = H/(2π). Quantum fluctuations δφ ~ H/2π freeze out → CMB anisotropies.',
        'Information paradox: island formula / replica wormholes restore Page curve and unitarity via gravitational saddles.',
      ]} />
    </div>
  );
}
