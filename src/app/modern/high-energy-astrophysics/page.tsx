import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function HighEnergyAstrophysicsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Advanced Topics</div>
      <h1>High-Energy Astrophysics & Compact Objects</h1>
      <p className="subtitle">
        Neutron stars, black holes, gamma-ray bursts, and cosmic rays are laboratories
        for extreme physics — densities beyond nuclear, magnetic fields 10¹⁵ G,
        relativistic jets, and particle energies 10²⁰ eV. These objects probe GR,
        nuclear physics, plasma physics, and particle physics simultaneously.
      </p>

      <Prerequisites items={['General relativity (Ch. GR)', 'Nuclear physics (Ch. Nuc)', 'Astrophysics (Ch. Astro)', 'Statistical mechanics (Ch. SM)']} />

      <LearningGoals items={[
        'Apply the TOV equation to neutron stars and explain how the nuclear equation of state determines M_max.',
        'Compute the surface magnetic field, characteristic age, and spindown luminosity of a pulsar from P and Ṗ.',
        'Derive the Eddington luminosity and compute the Eddington accretion rate for a compact object.',
        'Describe the Kerr metric, the ergosphere, and the Penrose process for extracting black hole rotational energy.',
        'Derive the GZK cutoff energy and estimate the maximum distance from which UHECR can reach Earth.',
      ]} />

      <h2>HEA.1 Neutron Stars</h2>

      <p>
        Neutron stars (NS): stellar remnants with M ~ 1.4 M_☉ compressed to R ~ 12 km.
        Central density ρ ~ 5–10 ρ_nuc (ρ_nuc = 2.7×10¹⁴ g/cm³). Supported by neutron
        degeneracy pressure (Fermi pressure of neutrons + nuclear interactions).
      </p>

      <p>
        <strong>Tolman-Oppenheimer-Volkoff (TOV) equation</strong>: the GR analog of hydrostatic equilibrium:
      </p>

      <EqNumbered number="HEA.1">dP/dr = −(G/r²)(ρ + P/c²)(M + 4πr³P/c²)/(1 − 2GM/(rc²)) &nbsp;&nbsp;&nbsp; (TOV)</EqNumbered>

      <p>
        The factors (ρ + P/c²) and (1 − 2GM/(rc²)) are GR corrections — absent in Newtonian gravity.
        Maximum NS mass (Oppenheimer-Volkoff limit): M_max depends on the nuclear equation of state (EOS).
        Observed: J0348+0432, M = 2.01 M_☉; PSR J0952-0607, M ≈ 2.35 M_☉ — constrains EOS.
        Minimum mass for a black hole (after NS collapse): M &gt; M_max ~ 2.3 M_☉.
      </p>

      <Definition number="HEA.1" title="Pulsar">
        A rapidly rotating NS with a strong magnetic field B ~ 10⁸–10¹⁵ G.
        Rotation frequency: up to f = 716 Hz (PSR J1748-2446ad). Lighthouse model:
        a misaligned rotating magnetic dipole radiates and sweeps a beam across Earth.
        Pulsar period derivative Ṗ gives the spindown luminosity:
        L_sd = −4π²IṖ/P³ (I = NS moment of inertia ~ 10⁴⁵ g·cm²).
        Surface magnetic field: B = 3.2×10¹⁹ √(PṖ) Gauss. Pulsars are the most accurate
        clocks in nature (stability 10⁻¹⁴ — rivaling atomic clocks at long basescales).
      </Definition>

      <h2>HEA.2 Accretion and X-ray Binaries</h2>

      <p>
        Accretion onto compact objects converts gravitational potential energy to radiation.
        Efficiency η = ΔE/Mc²:
      </p>

      <EqNumbered number="HEA.2">L = η Ṁ c² &nbsp;&nbsp;&nbsp; η_NS ≈ GM/(Rc²) ≈ 0.2, &nbsp; η_BH ≈ 0.06–0.42 (depends on spin)</EqNumbered>

      <p>
        For a 1 M_☉ NS (R = 10 km): η ≈ 0.2 — 20% mass-to-energy conversion.
        Compare: nuclear fusion η_nuc ≈ 0.007 (0.7%). Accretion is the most efficient
        known energy source (after matter-antimatter annihilation η = 1).
      </p>

      <p>
        <strong>Eddington luminosity</strong>: maximum luminosity before radiation pressure
        exceeds gravity (for electron scattering opacity):
        L_Edd = 4πGMm_p c/σ_T = 1.26×10³⁸ erg/s × (M/M_☉). Above L_Edd: super-Eddington
        accretion (jets, winds). ULX sources (ultra-luminous X-ray): L &gt; L_Edd for M = 1 M_☉ —
        either super-Eddington accretion or intermediate-mass BHs.
      </p>

      <WorkedExample number="HEA.1" title="Crab Pulsar Energy Budget">
        <p>
          The Crab pulsar (PSR B0531+21): P = 33.1 ms, Ṗ = 4.22×10⁻¹³ s/s.
          Calculate B_surface, age, and spindown luminosity. Compare to the Crab Nebula luminosity.
        </p>
        <Step label="Magnetic field:">B = 3.2×10¹⁹ √(PṖ) G = 3.2×10¹⁹ √(33.1×10⁻³ × 4.22×10⁻¹³) G = 3.2×10¹⁹ √(1.40×10⁻¹³) G = 3.2×10¹⁹ × 1.18×10⁻⁷ G ≈ 3.8×10¹² G. Magnetar range: B ~ 10¹⁴–10¹⁵ G (1000× stronger). The Crab is a normal young pulsar.</Step>
        <Step label="Characteristic age:">τ_c = P/(2Ṗ) = 33.1×10⁻³/(2 × 4.22×10⁻¹³) s = 3.92×10¹⁰ s ≈ 1240 yr. Actual age: SN1054 → age = 971 yr (as of 2025). Good agreement (characteristic age overestimates slightly if initial spin was much faster).</Step>
        <Step label="Spindown luminosity:">L_sd = 4π²I Ṗ/P³ = 4π² × 10⁴⁵ g cm² × 4.22×10⁻¹³ / (33.1×10⁻³)³ = 4π² × 4.22×10³² / 3.63×10⁻⁵ erg/s ≈ 4.5×10³⁸ erg/s = 1.2×10⁵ L_☉. This is the rotational kinetic energy being radiated.</Step>
        <Step label="Nebula luminosity:">Crab Nebula: L_Neb ≈ 1.3×10³⁸ erg/s (synchrotron + optical + X-ray). L_sd/L_Neb ≈ 3.5 — the pulsar wind carries about 3× the radiated nebula luminosity (rest goes into accelerating the remnant). The Crab pulsar is the engine of the Crab Nebula — confirmed by the pulsar-powered nebula (PWN) model. Discovery (1968): first identified pulsar inside a supernova remnant, establishing NS as SN remnants.</Step>
      </WorkedExample>

      <h2>HEA.3 Black Hole Physics</h2>

      <p>
        <strong>Schwarzschild BH</strong>: ds² = −(1−r_s/r)c²dt² + dr²/(1−r_s/r) + r²dΩ².
        Event horizon at r = r_s = 2GM/c². Last stable circular orbit (ISCO): r_ISCO = 3r_s = 6GM/c²
        (Schwarzschild). Efficiency of accretion: η = 1 − √(1−2/3) × ... = 1 − √(8/9) ≈ 5.7%.
      </p>

      <p>
        <strong>Kerr BH</strong> (rotating): ergosphere at r = r_s (equator), ISCO shrinks.
        Penrose process: extract energy from BH by splitting particle in ergosphere —
        one fragment falls in, the other escapes with more energy than the original.
        Maximum extractable rotational energy: 29% of M_BH c². Blandford-Znajek mechanism:
        magnetic field threading a spinning BH drives relativistic jets.
      </p>

      <p>
        <strong>Supermassive BHs</strong>: M = 10⁶–10¹⁰ M_☉ in galactic nuclei (AGN, quasars).
        M87* image (Event Horizon Telescope, 2019): M = 6.5×10⁹ M_☉, r_s = 19 billion km,
        shadow diameter ≈ 40 μas — resolved at radio wavelengths.
        Sgr A* (Milky Way center): M = 4.15×10⁶ M_☉, image released 2022.
      </p>

      <h2>HEA.4 Gamma-Ray Bursts and Cosmic Rays</h2>

      <p>
        <strong>Gamma-ray bursts (GRBs)</strong>: brightest electromagnetic events in the universe.
        E ~ 10⁵¹–10⁵³ erg (isotropic equivalent), duration 0.1–1000 s.
        Short GRBs (&lt; 2 s): binary NS/NS or NS/BH mergers — confirmed by GW170817.
        Long GRBs (&gt; 2 s): collapsar model — rapidly rotating massive star core collapse,
        forming a BH + accretion disk + relativistic jet (Lorentz factor Γ ~ 300).
        Internal shocks: variability in jet → shocks → γ-ray emission (prompt).
        External shock (afterglow): jet decelerates in ISM → X-ray/optical/radio.
      </p>

      <p>
        <strong>Fireball model</strong>: opacity problem solved if jet is ultra-relativistic (Γ &gt; 100):
        comoving photon energy E' = E/Γ drops below pair-production threshold.
        Compactness parameter: ℓ = (σ_T L)/(4πR²m_ec³) — requires Γ ≥ 100 to give ℓ &lt; 1 (transparent).
      </p>

      <p>
        <strong>Ultra-high-energy cosmic rays</strong> (UHECR): E &gt; 10¹⁸ eV (EeV).
        GZK cutoff (Greisen-Zatsepin-Kuzmin, 1966): protons above 5×10¹⁹ eV interact with CMB
        photons: p + γ_CMB → Δ⁺ → n + π⁺ — lose energy over ~50 Mpc.
        Sources: AGN, magnetars, NS mergers (uncertain). Air shower experiments:
        Auger Observatory (Argentina), Telescope Array (Utah).
        Maximum energy from acceleration: E_max = ZeBR (Hillas criterion, B = field, R = size).
      </p>

      <Definition number="HEA.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Nonthermal spectra are common:</strong> high-energy sources often need synchrotron or inverse-Compton models.</li>
          <li><strong>Compactness sets timescales:</strong> rapid variability implies small emitting regions.</li>
          <li><strong>Accretion efficiency can exceed fusion:</strong> gravity near compact objects is an enormous energy source.</li>
          <li><strong>Jets are relativistic:</strong> beaming can make luminosities appear much larger along the line of sight.</li>
        </ul>
      </Definition>

      <PracticeProblems section="HEA.1–HEA.4 High-Energy Astrophysics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={1.26e32} unit="W" tolerance={0.05}
          hints={[
            'L_Edd = 4πGMm_pc/σ_T. A convenient form: L_Edd = 1.26×10³¹ × (M/M_☉) W.',
            'For M = 10 M_☉, multiply 1.26×10³¹ W by 10 to get L_Edd in watts.',
          ]}
          problemText="Derive the Eddington luminosity for a 10 M☉ black hole. Express your answer in watts. Then estimate the Eddington accretion rate for η = 0.1 and how long it would take to grow a 10⁹ M☉ quasar starting from 1 M☉."
          solution={<>Eddington luminosity and accretion. L_Edd = 4πGMm_pc/σ_T. A useful form is L_Edd = 1.26×10³⁸ (M/M_☉) erg/s = 1.26×10³¹ (M/M_☉) W. For M = 10 M_☉: L_Edd = 1.26×10³² W = 1.26×10³⁹ erg/s. Maximum Eddington accretion rate for η=0.1: Ṁ_Edd = L_Edd/(ηc²) = 1.26×10³²/(0.1×9×10¹⁶) = 1.4×10¹⁶ kg/s ≈ 2.2×10⁻⁷ M_☉/yr for a 10 M_☉ black hole. Because Ṁ_Edd ∝ M, exponential growth has a Salpeter e-folding time of about 4.5×10⁷ yr for η=0.1. Growing by 10⁹ in mass needs ln(10⁹)=20.7 e-folds, roughly 9×10⁸ yr, implying early quasars need large seeds, sustained near-Eddington accretion, or super-Eddington phases.</>}>
          Derive the Eddington luminosity for a 10 M_☉ black hole. What accretion rate does this imply? How long would it take to grow a 10⁹ M_☉ quasar starting from 1 M_☉?
        </InteractiveProblem>

        <Problem n={2} difficulty="medium"
          solution={<>TOV equation for neutron star mass limit. At the center (r→0): M(r) ≈ 4πρ_c r³/3. For a uniform-density star (ρ = const, P varying), TOV gives: P(r) = ρc²[(1-2GM r²/(R³c²))^(1/2) - (1-2GM/Rc²)^(1/2)] / [3(1-2GM/Rc²)^(1/2) - (1-2GM r²/(R³c²))^(1/2)]. Central pressure diverges when denominator → 0: (1-2GM/Rc²)^(1/2) = 1/3 → 2GM/Rc² = 8/9 → R = 9GM/(4c²) = 9r_s/8. This is the Buchdahl limit: any self-gravitating star must have R &gt; 9GM/(4c²) = 2.25r_s. For NS: M_max ~ 0.7 M_☉ (simple uniform density) but realistic EOS give 2-3 M_☉. For stiff EOS (high P at high ρ): larger M_max. For soft EOS: smaller M_max. GW170817 neutron star merger: chirp mass + tidal deformability parameter Λ (ratio of induced quadrupole to tidal field) constrain R ≈ 11-13 km and M_max &gt; 2.17 M_☉. This rules out very soft EOS (like free quark matter with no interaction).</>}>
          Discuss the Tolman-Oppenheimer-Volkoff equation and the neutron star maximum mass. What is the Buchdahl limit and how do GW observations constrain the nuclear equation of state?
        </Problem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={2.5e20} unit="eV" tolerance={0.10}
          hints={[
            'Use threshold condition E_p E_γ = (M_Δ² - m_p²)c⁴/4 for head-on collision. M_Δ = 1.232 GeV, m_p = 0.938 GeV.',
            'CMB photon energy: E_γ ~ 2.7 k_B T_CMB ≈ 6.3×10⁻⁴ eV. Compute (M_Δ²-m_p²)×10¹⁸ eV² and divide by 4E_γ.',
          ]}
          problemText="Derive the GZK cutoff energy for cosmic ray protons interacting with CMB photons via p + γ → Δ⁺(1232). Use M_Δ = 1.232 GeV, m_p = 0.938 GeV, and CMB temperature 2.725 K. Express your answer in eV."
          solution={<>GZK cutoff calculation: CMB photons at T = 2.725 K have energy E_CMB ~ 2.7k_BT ~ 6.3×10⁻⁴ eV. Pion production threshold: p + γ → Δ⁺(1232) → p + π⁰ or n + π⁺. Delta resonance mass M_Δ = 1.232 GeV. Threshold condition in CM frame: s = (M_Δc²)² = (E_p + E_γ)² - (p_p + p_γ)²c² ≈ 2E_p E_γ(1-cosθ) + m_p²c⁴. Head-on collision (cosθ=-1): 2E_p E_γ × 2 = M_Δ²c⁴ - m_p²c⁴. E_p^(GZK) = (M_Δ²-m_p²)c⁴/(4E_γ) = ((1.232)²-(0.938)²)×10¹⁸ eV² / (4 × 6.3×10⁻⁴ eV) = (1.518-0.880)×10¹⁸ / (2.52×10⁻³) eV = 6.38×10¹⁷/2.52×10⁻³ eV ≈ 2.5×10²⁰ eV. Above this energy, the proton loses ~20% energy per interaction. Mean free path ~ 1/(n_CMB σ_Δ) ~ 6 Mpc. After ~10 interactions (loss of factor e): E drops to GZK. Sources above 5×10¹⁹ eV must be within ~50 Mpc — the GZK horizon. Auger data (2017): mild suppression near 6×10¹⁹ eV consistent with GZK. Sources correlated with nearby AGN (Centaurus A at 3.8 Mpc is nearest).</>}>
          Derive the GZK cutoff energy for cosmic ray protons interacting with CMB photons. What is the &quot;GZK horizon&quot; — the maximum distance from which UHECR can reach Earth?
        </InteractiveProblem>

        <Problem n={4} difficulty="hard"
          solution={<>Pulsar timing and gravitational wave background: millisecond pulsars (MSP) have P ~ 1-10 ms, Ṗ ~ 10⁻²⁰ s/s (recycled by accretion). Timing residual: deviation of pulse arrival time from the model. A GW background h(t,Ω̂) causes correlated timing residuals between pulsars i,j. Cross-correlation: C(ζ_ij) depends on the angular separation ζ_ij between pulsars — the Hellings-Downs curve: Γ(ζ) = ½ - ¼(1-cos ζ)/2 × [ln((1-cosζ)/2) - 1/6] + δ(ζ)/2. GW background spectrum: h_c(f) (characteristic strain). NANOGrav 15-year dataset (2023): 68 pulsars, baseline 15 yr, cadence ~monthly. Detected GWB: h_c ~ 2.4×10⁻¹⁵ at f = 1/yr, spectral index consistent with SMBH binary background (h_c ~ f^(-2/3)). Significance: Hellings-Downs angular correlation measured at 3σ → 4σ, confirming GW origin. Signal consistent with population of SMBH binaries at z=1-3. Possible contributions: cosmic strings, inflation, phase transitions. Future with SKA (Square Kilometer Array): 10× more pulsars, 100× better sensitivity → identify individual SMBH binaries below the confusion noise.</>}>
          Explain pulsar timing arrays as gravitational wave detectors. What is the Hellings-Downs correlation? Describe the NANOGrav 2023 detection of the gravitational wave background.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'TOV equation: GR hydrostatic equilibrium. NS mass limit ~ 2-3 M_☉ (EOS dependent). Tidal deformability constrains EOS.',
        'Pulsars: rotating magnetized NS. B = 3.2×10¹⁹√(PṖ) G. L_sd = 4π²IṖ/P³. Most accurate natural clocks.',
        'Accretion efficiency: η ~ 6-42% for BH (vs 0.7% for fusion). L_Edd = 1.26×10³⁸(M/M_☉) erg/s.',
        'Kerr BH: ergosphere, Penrose process (29% rotational energy extractable), Blandford-Znajek jet mechanism.',
        'GRBs: short = NS mergers (GW170817 confirmed). Long = collapsars, Γ ~ 300, E ~ 10⁵² erg. Internal shock model.',
        'GZK cutoff: E_GZK ~ 5×10¹⁹ eV. UHECR from &gt;10²⁰ eV must originate within ~50 Mpc (GZK horizon).',
      ]} />
    </div>
  );
}
