import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function AstrophysicsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Advanced Topics</div>
      <h1>Astrophysics &amp; Stellar Structure</h1>
      <p className="subtitle">
        Stars are self-gravitating balls of plasma in hydrostatic equilibrium, powered by
        nuclear fusion. Understanding stellar structure reveals the origin of chemical elements,
        the life cycle of stars, and the endpoints — white dwarfs, neutron stars, black holes.
      </p>

      <Prerequisites items={['Gravitation (Ch. 7)', 'Nuclear physics (Ch. NP)', 'Statistical mechanics (Ch. S)', 'General relativity (Ch. GR)']} />

      <LearningGoals items={[
        'Derive the hydrostatic equilibrium equation and use it to estimate central pressures and temperatures in stars.',
        'Apply the virial theorem to compare the Kelvin-Helmholtz timescale with the nuclear burning timescale of the Sun.',
        'Explain the mass-luminosity relation L ∝ M^3.5 and compute main-sequence lifetimes as a function of stellar mass.',
        'Describe stellar endpoints (white dwarfs, neutron stars, black holes) and the mass thresholds that determine them.',
        'Use the Chandrasekhar limit and the distance ladder (parallax, Cepheids, Type Ia SNe) to connect stellar physics to cosmological measurements.',
      ]} />

      <h2>AS.1 Hydrostatic Equilibrium</h2>

      <p>
        A star&apos;s structure is determined by the balance between gravity (inward) and
        pressure gradient (outward). For a spherical shell at radius r containing mass M(r):
      </p>

      <EqNumbered number="AS.1">dP/dr = −G M(r) ρ / r² &nbsp;&nbsp;&nbsp; (hydrostatic equilibrium)</EqNumbered>

      <EqNumbered number="AS.2">dM/dr = 4πr² ρ &nbsp;&nbsp;&nbsp; (mass continuity)</EqNumbered>

      <p>
        These two equations govern the pressure and density profiles. The <strong>virial theorem</strong>
        for a self-gravitating system states: 2K + U_grav = 0, so E_total = −K = U_grav/2.
        Contracting a star releases gravitational energy, half radiated away, half heating the gas.
      </p>

      <p>
        The <strong>Kelvin-Helmholtz timescale</strong> (gravitational contraction time):
      </p>

      <EqNumbered number="AS.3">τ_KH = GM²/(RL) ≈ 1.5×10⁷ yr (Sun) &nbsp;&nbsp;&nbsp; (Kelvin-Helmholtz timescale)</EqNumbered>

      <p>
        The Sun&apos;s actual age is 4.6×10⁹ yr — 300× longer. This proved that nuclear burning,
        not gravity, powers the Sun (Thomson/Kelvin&apos;s classical estimate was wrong).
      </p>

      <h2>AS.2 Energy Transport</h2>

      <p>
        Heat flows outward through a star by three mechanisms:
      </p>

      <p>
        <strong>Radiative transport:</strong> photons random-walk outward. The opacity κ
        (m²/kg) determines how far they travel. The radiative temperature gradient:
      </p>

      <EqNumbered number="AS.4">dT/dr|_rad = −(3κρ L)/(16πacr²T³) &nbsp;&nbsp;&nbsp; (radiative gradient)</EqNumbered>

      <p>
        where a = 4σ/c is the radiation constant and L(r) is the luminosity at r.
      </p>

      <p>
        <strong>Convection:</strong> when |dT/dr|_rad exceeds the adiabatic gradient, the gas
        is convectively unstable (Schwarzschild criterion). Convection is efficient — nearly
        adiabatic in stellar interiors. The outer ∼30% of the Sun (by radius) is convective;
        the core is radiative.
      </p>

      <h2>AS.3 Nuclear Burning in Stars</h2>

      <p>
        The proton-proton (pp) chain dominates in solar-mass stars (T_core ≈ 1.5×10⁷ K):
      </p>

      <p>
        pp I: 4 p → ⁴He + 2e⁺ + 2νe + 26.7 MeV. Rate ∝ T⁴ (steep T dependence).
        CNO cycle dominates for M &gt; 1.5 M☉ (T_core &gt; 1.7×10⁷ K): ε ∝ T¹⁶ to T²⁰.
      </p>

      <EqNumbered number="AS.5">ε_pp ∝ ρ T⁴ &nbsp;&nbsp;&nbsp; ε_CNO ∝ ρ T¹⁷ &nbsp;&nbsp;&nbsp; (nuclear energy generation rates)</EqNumbered>

      <p>
        The steep temperature dependence is a thermostat: if T rises, ε rises, pressure rises,
        star expands, T falls — negative feedback keeps stars stable. Main sequence lifetime:
      </p>

      <EqNumbered number="AS.6">τ_MS ≈ 0.1 × f_H × M c²/L ≈ 10¹⁰ yr × (M/M☉)/(L/L☉) &nbsp;&nbsp;&nbsp; (main sequence lifetime)</EqNumbered>

      <p>
        where f_H ≈ 10% of the mass is burned (core hydrogen fraction). Since L ∝ M³ to M⁴,
        massive stars (10 M☉) live only ∼30 Myr; low-mass stars (0.1 M☉) live &gt; 100 Gyr.
      </p>

      <WorkedExample number="AS.1" title="The Mass-Luminosity Relation">
        <p>
          Derive L ∝ M³ from stellar structure equations and explain the mass-luminosity relation.
        </p>
        <Step label="Pressure scale:">Central pressure from hydrostatic equilibrium: P_c ∼ GM²/R⁴. For ideal gas: P = ρk_BT/(μm_H), so T_c ∼ GMμm_H/(k_B R).</Step>
        <Step label="Opacity:">Electron scattering opacity κ ≈ 0.2(1+X) m²/kg ≈ const. The radiative luminosity: L = (4πcGM)/(κ) × β where β = P_gas/P_total (Eddington luminosity limit).</Step>
        <Step label="Eddington limit:">L_Edd = 4πcGM/κ ≈ 3.2×10⁴ (M/M☉) L☉. Stars must have L &lt; L_Edd or radiation pressure blows the envelope away.</Step>
        <Step label="Mass-luminosity:">Combining pressure and opacity arguments: L ∝ M³ for intermediate-mass stars. Observationally: L ≈ L☉(M/M☉)^3.5 (empirical fit). A 10M☉ star: L ≈ 10^3.5 L☉ ≈ 3000 L☉.</Step>
        <Step label="Main sequence:">Since L ∝ M^3.5 and τ ∝ M/L ∝ M^(-2.5): a 10M☉ star lives ∼316× shorter than the Sun: 10^10/316 ≈ 30 Myr. Consistent with the age of the Orion OB association.</Step>
      </WorkedExample>

      <h2>AS.4 Stellar Evolution and Death</h2>

      <p>
        After main sequence, the hydrogen shell burns, and the core contracts as the envelope
        expands → <strong>Red Giant</strong>. Helium ignites (triple-alpha process:
        3 ⁴He → ¹²C + 7.27 MeV), then carbon, oxygen in more massive stars.
      </p>

      <p>
        <strong>Stellar endpoints by mass:</strong>
      </p>

      <p>
        M &lt; 8 M☉: planetary nebula + <strong>white dwarf</strong> (supported by electron
        degeneracy pressure). Chandrasekhar limit: M_Ch = 1.44 M☉. Above this, no stable
        white dwarf exists.
      </p>

      <p>
        8 M☉ &lt; M &lt; ~20 M☉: core-collapse supernova → <strong>neutron star</strong>
        (supported by neutron degeneracy + repulsive nuclear force). Density ∼ nuclear:
        ρ ≈ 5×10¹⁷ kg/m³. Tolman-Oppenheimer-Volkoff limit ≈ 2–3 M☉.
      </p>

      <p>
        M &gt; ~20 M☉: collapse to <strong>black hole</strong>. Event horizon at r_s = 2GM/c².
        For 10 M☉ BH: r_s ≈ 30 km.
      </p>

      <Theorem number="AS.1" title="Chandrasekhar Limit">
        White dwarfs are supported by electron degeneracy pressure. For non-relativistic
        electrons: P_deg ∝ ρ^(5/3). The mass-radius relation: R ∝ M^(-1/3) — more massive
        WDs are smaller. As M increases, electrons become relativistic (P_deg ∝ ρ^(4/3)):
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          M_Ch = (5.87/μe²) (ℏc/G)^(3/2) m_H^(-2) ≈ 1.44 M☉
        </span>
        where μe is the mean molecular weight per electron (≈2 for C/O). At M = M_Ch,
        the radius goes to zero — no stable configuration. Type Ia supernovae occur when
        a white dwarf accretes to this limit and undergoes thermonuclear explosion — they are
        standard candles (discovered dark energy, Nobel 2011).
      </Theorem>

      <h2>AS.5 Cosmological Distance Ladder</h2>

      <p>
        Measuring cosmic distances requires a hierarchy of methods:
      </p>

      <p>
        <strong>Parallax</strong> (up to ∼1 kpc, Gaia satellite): d = 1/p arcsec (parsec).
        <strong>Cepheids</strong>: period-luminosity relation (Leavitt 1912): log L = a log P + b,
        P = 1–100 days. Used to ∼100 Mpc (HST Key Project, H₀ calibration).
        <strong>Type Ia supernovae</strong>: standard candles (M_V ≈ −19.3), usable to z ∼ 2.
        Used to discover accelerating expansion (dark energy).
      </p>

      <p>
        The <strong>Hubble constant</strong> H₀ = v_rec/d (recession velocity per distance)
        measures the expansion rate. Current tension: H₀ = 73.0 ± 1.0 km/s/Mpc (local, Cepheids/SNe Ia)
        vs H₀ = 67.4 ± 0.5 km/s/Mpc (CMB/Planck). 5σ discrepancy — possibly new physics.
      </p>

      <Definition number="AS.1" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Luminosity and brightness are different:</strong> observed flux falls with distance squared.</li>
          <li><strong>Magnitude is logarithmic:</strong> smaller magnitudes are brighter.</li>
          <li><strong>Hydrostatic balance is dynamic equilibrium:</strong> gravity is balanced by pressure gradients, not absent.</li>
          <li><strong>Stellar lifetimes depend strongly on mass:</strong> massive stars burn brighter and die sooner.</li>
        </ul>
      </Definition>

      <PracticeProblems section="AS.1–AS.5 Astrophysics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={8.97e37} unit="reactions/s" tolerance={0.05}
          hints={['Use N = L☉/E where L☉ = 3.83×10²⁶ W and E = 26.7 MeV per pp-chain cycle', 'Convert 26.7 MeV to joules: multiply by 1.6×10⁻¹⁹ J/eV then by 10⁶']}
          problemText="Calculate the number of pp-chain reactions per second in the Sun needed to power its luminosity L☉ = 3.83×10²⁶ W, given that each cycle releases 26.7 MeV."
          solution={<>Solar luminosity from pp chain: 4p → ⁴He + 2e⁺ + 2νe + 26.7 MeV. Mass deficit per cycle: Δm = 4m_p − m_He − 2m_e = 4×1.00728 − 4.00150 − 2×0.000549 = 4.02912 − 4.00150 − 0.001098 = 0.02652 u = 4.07×10⁻²⁹ kg. Energy: E = Δmc² = 26.7 MeV (includes 2νe loss ≈ 2% → 26.2 MeV deposited). Rate to power L☉ = 3.83×10²⁶ W: N = L☉/E = 3.83×10²⁶/(26.7×10⁶×1.6×10⁻¹⁹) = 3.83×10²⁶/4.27×10⁻¹² = 8.97×10³⁷ reactions/s. Mass converted: dm/dt = L☉/c² = 3.83×10²⁶/(3×10⁸)² = 4.25×10⁹ kg/s = 4.25 million tonnes/s. In 4.6 Gyr: total mass converted = 4.25×10⁹×3.15×10¹⁶ = 1.34×10²⁶ kg ≈ 0.007% of M☉. Neutrino flux at Earth: N_ν = 2 × 8.97×10³⁷/(4π(1.5×10¹¹)²) ≈ 6.6×10¹⁴ m⁻² s⁻¹ (solar neutrino units 1 SNU = 10⁻³⁶ captures/target atom/s).</>}>
          Calculate the number of pp-chain reactions per second in the Sun, the mass converted to energy per year, and the neutrino flux at Earth.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={2.97e8} unit="kg/m³" tolerance={0.05}
          hints={['Estimate the white dwarf radius using R_WD ≈ 0.0126 R☉ × (M/M☉)^(-1/3) with R☉ = 6.96×10⁸ m', 'Compute mean density: ρ = 3M/(4πR³) with M = 1.2×1.99×10³⁰ kg']}
          problemText="Estimate the mean density of a white dwarf with mass M = 1.2 M☉ composed of C/O (μe = 2), using the non-relativistic degeneracy pressure mass-radius relation."
          solution={<>White dwarf: M = 1.2 M☉ = 2.38×10³⁰ kg of C/O (μe = 2). Non-relativistic electron degeneracy pressure: P = K_NR (ρ/μe m_H)^(5/3), K_NR = (ℏ²/5m_e)(3/π)^(2/3) (6π²)^(2/3)/(m_H)^(5/3). Virial theorem: P_c ∼ GM²/R⁴ (from hydrostatic). Mass-radius: R ∝ M^(-1/3) → R = R☉(M/M_Ch)^(-1/3) × correction. Exact: R_WD = 0.0127 R☉ (M_Ch/M)^(1/3) − ..., non-rel limit: R_WD = 0.0126 R☉ × (1.2)^(-1/3) = 0.0126 × 0.942 = 0.0119 R☉ ≈ 8300 km. Mean density: ρ = 3M/(4πR³) = 3×2.38×10³⁰/(4π(8.3×10⁶)³) = 7.14×10³⁰/2.40×10²² = 2.97×10⁸ kg/m³ ≈ 3×10⁵ g/cm³. Sirius B (actual 1.0 M☉ WD): R = 0.0084 R☉, ρ = 3.9×10⁸ kg/m³. The Fermi energy of electrons: E_F = (ℏ²/2m_e)(3π²n_e)^(2/3) ≈ 0.3 MeV (relativistic!). Near Chandrasekhar limit, R → 0 and collapse is inevitable.</>}>
          Estimate the radius and mean density of a white dwarf with mass M = 1.2 M☉ (composed of C/O, μe = 2). How does this compare to the Chandrasekhar limit?
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Neutron star: M = 1.4 M☉ = 2.78×10³⁰ kg, R ≈ 10 km (nuclear density). Surface gravity: g = GM/R² = 6.67×10⁻¹¹×2.78×10³⁰/(10⁴)² = 1.85×10²⁰/10⁸ = 1.85×10¹² m/s² ≈ 2×10¹¹ g_Earth. Escape velocity: v_esc = √(2GM/R) = √(2×6.67×10⁻¹¹×2.78×10³⁰/10⁴) = √(3.70×10¹⁶) = 1.93×10⁸ m/s = 0.64c. Gravitational redshift: z = 1/√(1−2GM/Rc²) − 1 = 1/√(1−0.415) − 1 = 1/0.766 − 1 = 0.306 → 30% gravitational redshift at surface. Rotation period: angular momentum conserved from progenitor. If R_progenitor = R☉, P_progenitor = 30 days: J = I ω = 2MR²/5 × 2π/P = const. P_NS = P_progenitor × (R_NS/R_progenitor)² = 30×86400 × (10⁴/6.96×10⁸)² = 2.59×10⁶ × 2.06×10⁻¹⁰ = 5.3×10⁻⁴ s = 0.53 ms. Millisecond pulsars (B1937+21, P = 1.6 ms) are spun up by accretion.</>}>
          Calculate the surface gravity, escape velocity, and gravitational redshift at the surface of a neutron star (M = 1.4 M☉, R = 10 km). Estimate its rotation period.
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Hubble tension: Local: H₀ = 73 km/s/Mpc (SH0ES Cepheids + SNe Ia). CMB: H₀ = 67.4 km/s/Mpc (Planck, ΛCDM). Tension: Δ = (73−67.4)/√(1²+0.5²) = 5.6/1.12 = 5.0σ. Implications: (1) Systematic errors — Cepheid calibration (LMC distance, metallicity, crowding), SNe Ia host galaxy effects. (2) New physics — early dark energy (modifies sound horizon), extra relativistic species (ΔN_eff), decaying dark matter. Age of universe: t₀ = (2/3H₀) × (flat matter-dom) ≈ 13.8 Gyr for H₀ = 67.4 → 13.0 Gyr for H₀ = 73. Tension with oldest stars (globular clusters, 13.5±0.8 Gyr) marginal. CMB sound horizon: r_s = 147.3 Mpc (Planck) acts as standard ruler; if H₀ higher, r_s must be smaller → early dark energy must suppress it. Currently unresolved — systematic vs new physics debate ongoing (JWST and DESI adding data).</>}>
          Quantify the Hubble tension between local (Cepheid/SNeIa) and CMB measurements. What are the main proposed resolutions — systematic or new physics?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Hydrostatic equilibrium: dP/dr = −GMρ/r². Stars live on thermal nuclear energy, not gravity (KH timescale too short).',
        'Mass-luminosity: L ∝ M^3.5. Main sequence lifetime: τ ∝ M^(-2.5). Massive stars die young.',
        'Nuclear reactions: pp chain (T⁴) for solar-type; CNO cycle (T¹⁷) dominates above 1.5 M☉.',
        'Stellar endpoints: WD (M < 8M☉, Chandrasekhar 1.44M☉), NS (8–20M☉, TOV ~2.5M☉), BH (>20M☉).',
        'WD supported by electron degeneracy (P ∝ ρ^5/3 → ρ^4/3 near M_Ch). R ∝ M^(-1/3).',
        'Hubble constant H₀: 5σ tension between local (73) and CMB (67.4) measurements — unresolved.',
      ]} />
    </div>
  );
}
