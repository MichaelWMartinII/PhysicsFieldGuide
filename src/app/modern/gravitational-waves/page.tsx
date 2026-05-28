import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function GravitationalWavesPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Advanced Topics</div>
      <h1>Gravitational Waves</h1>
      <p className="subtitle">
        Ripples in spacetime curvature propagating at c — predicted by Einstein in 1916,
        first directly detected by LIGO in 2015. Gravitational wave astronomy has opened
        a new observational window on black holes, neutron stars, and the Big Bang.
      </p>

      <Prerequisites items={['General relativity (Ch. GR)', 'Tensor calculus (Ch. TC)', 'Electromagnetic waves (Ch. EM-waves)', 'Special relativity (Ch. SR)']} />

      <LearningGoals items={[
        'Derive the linearized Einstein equations in Lorenz gauge and identify the two GW polarizations.',
        'Apply the quadrupole formula to compute GW strain amplitude and radiated power for a binary system.',
        'Extract the chirp mass from an observed df/dt and use it to estimate the source distance.',
        'Explain the noise sources limiting LIGO sensitivity and how squeezed light surpasses the SQL.',
        'Describe multi-messenger astronomy with GW170817 and how standard sirens constrain H₀.',
      ]} />

      <h2>GW.1 Linearized General Relativity</h2>

      <p>
        In the weak-field limit, write g_μν = η_μν + h_μν with |h_μν| ≪ 1.
        The Einstein equations linearize. In Lorenz (harmonic) gauge ∂^μ h̄_μν = 0
        (where h̄_μν = h_μν − ½η_μν h is the trace-reversed perturbation):
      </p>

      <EqNumbered number="GW.1">□ h̄_μν = −16πG/c⁴ T_μν &nbsp;&nbsp;&nbsp; (linearized Einstein equations)</EqNumbered>

      <p>
        In vacuum (T_μν = 0), this is a wave equation: □ h̄_μν = 0, giving waves propagating
        at speed c. Residual gauge freedom → transverse-traceless (TT) gauge:
        h̄_TT has only spatial components, h_ii = 0 (traceless), and h_μi ∝ k^i = 0 (transverse).
        Two independent polarizations: plus (+) and cross (×).
      </p>

      <Definition number="GW.1" title="GW Polarizations">
        A GW propagating in the z-direction in TT gauge:
        h_μν = h_+ e_+^(μν) cos(kz − ωt) + h_× e_×^(μν) cos(kz − ωt + φ)
        where e_+ = diag(0, 1, −1, 0)/2 and e_× has off-diagonal ±1/2 in xy.
        The plus polarization stretches x while compressing y (and vice versa), oscillating at 2f_GW.
        The cross polarization does the same but rotated by 45°.
      </Definition>

      <h2>GW.2 Generation: The Quadrupole Formula</h2>

      <p>
        GWs are produced by changing quadrupole moments (not monopole/dipole — those
        are conserved by mass/momentum conservation). The leading-order emission:
      </p>

      <EqNumbered number="GW.2">h_+, h_× ~ (2G)/(r c⁴) × d²I_ij/dt² &nbsp;&nbsp;&nbsp; (quadrupole formula, I_ij = reduced quadrupole moment)</EqNumbered>

      <EqNumbered number="GW.3">P_GW = G/(5c⁵) × ⟨...I_ij ...I_ij⟩ &nbsp;&nbsp;&nbsp; (radiated power, ... = third time derivative)</EqNumbered>

      <p>
        The factor G/c⁵ = 3.6×10⁻⁵³ W⁻¹ makes GW emission extremely weak for
        laboratory sources. Only compact astrophysical objects (NS, BH) emit detectable GWs.
      </p>

      <Theorem number="GW.1" title="Inspiral and Merger">
        A binary system of masses m₁, m₂ (chirp mass M_c = (m₁m₂)^(3/5)/(m₁+m₂)^(1/5))
        loses energy to GWs and spirals inward. The frequency evolves as:
        df/dt = (96/5)π^(8/3)(GM_c/c³)^(5/3) f^(11/3)
        The strain amplitude:
        h ~ (4/r)(GM_c/c²)^(5/3)(πf/c)^(2/3)
        At merger (Schwarzschild radius contact): f_ISCO ≈ c³/(6^(3/2) π G M_total) ≈ 4400 Hz × (M_☉/M_total).
      </Theorem>

      <WorkedExample number="GW.1" title="GW150914 — First Direct Detection">
        <p>
          LIGO detected GW150914 on September 14, 2015. Reconstruct key parameters
          from the observed signal: f sweeps 35 → 150 Hz in ~0.2 s, peak strain h ≈ 10⁻²¹,
          estimated distance ~410 Mpc.
        </p>
        <Step label="Chirp mass from df/dt:">At f ≈ 100 Hz, df/dt ≈ (150−35)/0.2 Hz/s ≈ 575 Hz/s. M = (c³/(G π^(8/3))) × (5/96) × (df/dt)^(3/5) × f^(-11/5) ≈ 28.3 M_☉. This is the best-measured parameter from the inspiral phase (fractional uncertainty ~1%).</Step>
        <Step label="Mass scale from high-frequency cutoff:">The observed high-frequency merger/ringdown near 150 Hz is not a clean Schwarzschild ISCO frequency, but it sets the compact-object mass scale. Detailed waveform matching gives initial black-hole masses ≈ 36 M_☉ and 29 M_☉, with final mass ~62 M_☉. About 3 M_☉c² ≈ 5×10⁴⁷ J was radiated in GWs over ~0.2 s. Power: ~3×10⁴⁸ W — briefly outshining all stars in the observable universe combined.</Step>
        <Step label="Distance from strain:">h ~ (4 G^(5/3) (πfM)^(2/3))/(c⁴ r). At f = 100 Hz, M = 28 M_☉: h ≈ 10⁻²¹ → r ≈ 410 Mpc. LIGO arm length L = 4 km; length change ΔL = h L/2 ≈ 10⁻²¹ × 4000m/2 = 2×10⁻¹⁸ m = 2 am (attometers). 1/500 of a proton radius.</Step>
        <Step label="Significance:">Signal-to-noise ratio SNR ≈ 24. Detection significance: 5.3σ (false alarm rate &lt; 1 per 200,000 yr). Confirmed as two black holes — first direct observation of a binary black hole merger, and first observation of black holes with masses M &gt; 20 M_☉. Nobel Prize in Physics 2017 to Weiss, Barish, Thorne.</Step>
      </WorkedExample>

      <h2>GW.3 LIGO Interferometer</h2>

      <p>
        LIGO uses a modified Michelson interferometer with 4 km arms.
        A GW stretches one arm and squeezes the other: ΔL = h L/2.
      </p>

      <p>
        Noise sources (from high to low frequency):
        1. <strong>Seismic noise</strong> (below ~10 Hz): ground vibrations. Mitigated by 4-stage pendulum isolation.
        2. <strong>Thermal noise</strong> (10–200 Hz): Brownian motion of mirror coatings and suspensions.
           Fused silica fibers, low-loss coatings (SiO₂/Ta₂O₅), low temperature prototypes.
        3. <strong>Quantum noise</strong> (above ~100 Hz): photon shot noise. Standard quantum limit:
           h_SQL = (1/L)√(8ℏ/(mω²)) — trades off shot noise against radiation pressure noise.
           Overcome by squeezed light injection (LIGO O3: 15 dB squeezing applied).
      </p>

      <p>
        <strong>Power recycling</strong>: mirror between laser and BS reflects light back → builds up
        200 kW of intracavity power (from 20 W laser input). <strong>Signal recycling</strong>:
        mirror at dark port tunes the detector's frequency response.
        Advanced LIGO sensitivity (O4): h ~ 3×10⁻²⁴/√Hz at 100 Hz,
        horizon distance ~200 Mpc for binary neutron star mergers.
      </p>

      <h2>GW.4 Sources and Multi-Messenger Astronomy</h2>

      <p>
        <strong>Binary black holes (BBH)</strong>: most numerous detections (~100+ by O3 end).
        No EM counterpart (BH mergers don't produce photons).
        <strong>Binary neutron stars (BNS)</strong>: GW170817 (2017) — first BNS detection.
        Simultaneous gamma-ray burst GRB170817A detected 1.7 s after merger by Fermi.
        Multi-messenger observation confirmed: NS mergers = short GRBs + kilonovae (r-process nucleosynthesis — gold, platinum produced).
      </p>

      <p>
        <strong>Hubble constant from GW</strong>: "standard siren" — GW gives absolute distance (no
        distance ladder), EM gives redshift. GW170817: H₀ = 70⁺¹²_(-8) km/s/Mpc.
        With more events: will resolve Hubble tension model-independently.
      </p>

      <p>
        <strong>Pulsar timing arrays</strong> (PTAs): millisecond pulsars as a GW detector.
        Nanohertz GW background (f ~ 1–100 nHz) from supermassive black hole binaries.
        First evidence (NANOGrav 2023, ~5σ) for GW background — new frequency window.
        <strong>LISA</strong> (2030s): space-based, 2.5 Mkm arms, millihertz band —
        targets SMBH mergers, extreme mass-ratio inspirals, stochastic GW background from inflation.
      </p>

      <Definition number="GW.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Gravitational waves are strain waves:</strong> detectors measure fractional length change, not a force meter reading.</li>
          <li><strong>Monopole and dipole radiation are absent:</strong> gravitational radiation begins at quadrupole order.</li>
          <li><strong>Polarizations are transverse tidal patterns:</strong> plus and cross describe stretching directions.</li>
          <li><strong>Signal frequency tracks orbital motion:</strong> inspiral chirps upward as the orbit shrinks.</li>
        </ul>
      </Definition>

      <PracticeProblems section="GW.1–GW.4 Gravitational Waves">
        <Problem n={1} difficulty="easy"
          solution={<>Effect of plus-polarization GW on a ring of test masses: A GW h_+ propagating in z-direction: g_ij = diag(1+h_+cos(ωt), 1−h_+cos(ωt), 1) (TT gauge). Physical distance between two particles at (±L/2, 0, 0): Δx = ∫√g_xx dx ≈ L(1 + h_+ cos(ωt)/2). Change: δL_x = h_+ L cos(ωt)/2. Simultaneously, particles at (0, ±L/2, 0): δL_y = -h_+ L cos(ωt)/2. A ring of particles deforms elliptically: x-axis and y-axis stretch/compress alternately at frequency ω_GW (twice orbital frequency). Cross polarization (h_×): same but ring rotated 45°. The two polarizations are independent. This is the geodesic deviation equation: d²ξ^i/dτ² = R^i(0j0) ξ^j → linear in ξ, hence linear detector (LIGO) measures h directly. The pattern function F_+ = ½(1+cos²θ)cos(2φ), F_× = cosθ sin(2φ) gives the antenna response for source direction (θ,φ). LIGO+Virgo triangulation: timing difference at 3 detectors (max ~10 ms for Earth baseline) localizes source to sky patch.</>}>
          Describe how the plus polarization of a gravitational wave deforms a ring of test masses. What is the antenna pattern F_+ for a Michelson interferometer?
        </Problem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={300} unit="Myr" tolerance={0.10}
          hints={[
            'Use the Peters formula: t_merger = 5a₀⁴c⁵/(256 G³ M²μ). For the Hulse-Taylor pulsar, m₁ = 1.44 M☉, m₂ = 1.39 M☉, initial separation a₀ ≈ 1.95×10⁹ m.',
            'Compute M = m₁+m₂ and μ = m₁m₂/M. M☉ = 2×10³⁰ kg. The result should be in the range of hundreds of Myr.',
          ]}
          problemText="Derive the gravitational wave luminosity (Peters formula) for an equal-mass circular binary. Compute the merger timescale in Myr for the Hulse-Taylor pulsar (m₁ = 1.44 M☉, m₂ = 1.39 M☉, a₀ = 1.95×10⁹ m)."
          solution={<>Quadrupole radiation from a binary: masses m₁ = m₂ = M/2 in circular orbit of separation a. Orbital frequency Ω² = G M/a³ (Kepler). Reduced mass μ = M/4. Quadrupole moment tensor I_ij: using center-of-mass frame, I_xx = μa²cos²(Ωt)/2, I_yy = μa²sin²(Ωt)/2, I_xy = μa²sin(Ωt)cos(Ωt)/2. ...I_ij (third derivative) has amplitude ~ μa²Ω³. Power: P = (32/5)(G⁴/c⁵)(M³μ²/a⁵) (Peters formula). For equal masses m₁=m₂=m: M=2m, μ=m/2. P = (32/5)(G/c⁵)(m/2)²(2m)³/a⁵ × G³ = ... P = (32/5)(G⁴m⁵/(4a⁵c⁵)). Energy E = -GMμ/(2a) = -G m²/(2a). ȧ = -P/(dE/da) → ȧ = -(64/5)(G³M²μ)/(c⁵a³). Integration: a⁴ decreases → merger time t_merger = 5a₀⁴c⁵/(256 G³ M²μ). For Hulse-Taylor pulsar (m₁=1.44 M_☉, m₂=1.39 M_☉, a₀ = 1.95×10⁹ m): t_merger ≈ 300 Myr. Measured orbital decay rate ȧ agrees with GR to 0.13% — indirect Nobel (1993) for Hulse and Taylor.</>}>
          Derive the gravitational wave luminosity (Peters formula) for an equal-mass circular binary. Compute the merger timescale for the Hulse-Taylor pulsar.
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={74} unit="km/s/Mpc" tolerance={0.05}
          hints={[
            'Use the Hubble law: H₀ = cz/D_L. Plug in c = 3×10⁵ km/s, z = 0.0099, D_L = 40 Mpc.',
            'Multiply c by z to get the recession velocity in km/s, then divide by the distance in Mpc.',
          ]}
          problemText="Binary neutron star mergers act as standard sirens. Use GW170817 data — luminosity distance D_L = 40 Mpc from the GW waveform, host galaxy redshift z = 0.0099 — to estimate H₀ in km/s/Mpc."
          solution={<>Standard siren cosmology with GW170817: GW amplitude h ~ (4G^(5/3)(πfM)^(2/3))/(c⁴ r). From GW signal alone: luminosity distance D_L = r = (4G^(5/3)(πfM)^(2/3))/(c⁴ h). No standardization needed — GR determines the amplitude. For GW170817: D_L = 40⁺⁸_(-14) Mpc (from waveform fitting). EM counterpart (AT2017gfo kilonova) in galaxy NGC 4993. Redshift of NGC 4993: z = 0.00968 (peculiar velocity corrected: z = 0.0099±0.0015). Hubble law: H₀ = v/D_L = cz/D_L = (3×10⁵ km/s × 0.0099)/40 Mpc = 74 km/s/Mpc. With uncertainties: H₀ = 70⁺¹²_(-8) km/s/Mpc. Tension: CMB gives 67.4, Cepheids give 73.0. GW value consistent with both (large uncertainty from inclination angle degeneracy — reduces as more BNS events observed). With 50 BNS mergers: σ(H₀) ≈ 2 km/s/Mpc — will discriminate between CMB and Cepheid values.</>}>
          Explain how binary neutron star mergers serve as &quot;standard sirens&quot; for measuring H₀. Use GW170817 data (D_L = 40 Mpc, z = 0.0099) to estimate H₀ and compare to other measurements.
        </InteractiveProblem>

        <Problem n={4} difficulty="hard"
          solution={<>LIGO quantum noise and the SQL: Shot noise (photon counting): fluctuation in photon number δN ~ √N where N = P_circ T/ℏω. Phase error: δφ = 1/√N. Strain noise: h_shot = δφ × (λ/(4πL)) = c/(4πL) × √(ℏω/P_circ). Radiation pressure (back-action): force fluctuation δF ~ √(P/c) × (2ℏω/(c λ)) per photon... F_rad = 2P/c on mirror, δF_rad = √(2ℏωP/c²). Position noise: δx_rad = δF/(m ω²) for a free mirror at frequency ω_signal. Strain: h_rad = 2δx_rad/L = (2/(Lω²))√(2ℏωP/(mc²)). SQL: minimize h_total = √(h_shot² + h_rad²) over P: dh_total/dP = 0 → P_SQL = mω²Lc²/(4). h_SQL = √(8ℏ/(mω²L²)). For LIGO (m = 40 kg, L = 4 km, f = 100 Hz): h_SQL = √(8×1.055×10⁻³⁴/(40×(2π×100)²×(4000)²)) = √(8.44×10⁻³⁴/6.32×10¹²) = √(1.34×10⁻⁴⁶) ≈ 3.7×10⁻²³ — achieved in current LIGO. To go below SQL: use frequency-dependent squeezing (different squeeze angle at different frequencies): inject phase-squeezed at low f (beat RA noise), amplitude-squeezed at high f (beat shot noise). Achieved via filter cavity (300 m in LIGO). O4 squeezing: ~6 dB in current band.</>}>
          Derive the standard quantum limit (SQL) for a gravitational wave detector by balancing shot noise and radiation pressure noise. How does squeezed light injection help LIGO surpass the SQL?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Linearized GR: □h̄_μν = -16πG/c⁴ T_μν. TT gauge: two polarizations h_+, h_× propagating at c.',
        'Quadrupole formula: h ~ (2G/rc⁴) × d²I/dt². Power P ~ (G/5c⁵)(...I)² — extremely weak for lab sources.',
        'Inspiral: chirp mass M from df/dt. Strain h ~ (GM)^(5/3)/(c⁴ r). Merger at f_ISCO ≈ 4400 Hz × M_☉/M_total.',
        'GW150914: BBH merger, 3 M_☉c² radiated, ΔL ~ 2 am (2×10⁻¹⁸ m). 5.3σ. Nobel 2017.',
        'LIGO noise: seismic (&lt;10 Hz), thermal (10-200 Hz), quantum (shot + radiation pressure). SQL ~ 3.7×10⁻²³.',
        'GW170817 (BNS): confirmed NS mergers = short GRBs + kilonovae. H₀ = 70 km/s/Mpc as "standard siren".',
      ]} />
    </div>
  );
}
