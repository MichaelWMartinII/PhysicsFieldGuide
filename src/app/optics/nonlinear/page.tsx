import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function NonlinearOpticsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#eab308' }}>Optics · Advanced Topics</div>
      <h1>Nonlinear Optics</h1>
      <p className="subtitle">
        When light is intense enough, the optical response of a medium becomes nonlinear —
        photons interact with each other through the medium. Nonlinear optics is the physics
        of lasers interacting with matter: frequency doubling, optical parametric amplification,
        solitons, and quantum light generation.
      </p>

      <Prerequisites items={['Wave optics (Ch. WO)', 'Lasers & coherent light (Ch. LA)', 'Maxwell\'s equations (Ch. EM)', 'Electrostatics: boundary (Ch. ES)']} />

      <LearningGoals items={[
        'Write the nonlinear polarization expansion and identify which symmetry classes permit non-zero χ⁽²⁾ vs. χ⁽³⁾.',
        'Explain the phase-matching condition for SHG, derive the coherence length, and contrast birefringent vs. quasi-phase-matching.',
        'Describe optical parametric amplification (OPA) and spontaneous parametric down-conversion (SPDC) as sources of entangled photon pairs.',
        'Derive the nonlinear Schrödinger equation for pulse propagation in fibre and identify the conditions for soliton formation.',
        'Explain how a mode-locked laser generates an optical frequency comb and how f-2f self-referencing stabilises f_CEO.',
      ]} />

      <h2>NL.1 Nonlinear Polarization</h2>

      <p>
        The polarization of a medium in an electric field E:
      </p>

      <EqNumbered number="NL.1">P = ε₀(χ⁽¹⁾E + χ⁽²⁾E² + χ⁽³⁾E³ + ...) &nbsp;&nbsp;&nbsp; (nonlinear polarization)</EqNumbered>

      <p>
        χ⁽¹⁾: linear susceptibility (index n = √(1+χ⁽¹⁾)).
        χ⁽²⁾: second-order (non-zero only in non-centrosymmetric materials — no inversion symmetry).
        χ⁽³⁾: third-order (present in all materials, responsible for Kerr effect).
      </p>

      <p>
        At what intensity is χ⁽²⁾ important? When χ⁽²⁾E ~ χ⁽¹⁾: E ~ χ⁽¹⁾/χ⁽²⁾ ~ 10¹⁰ V/m
        (atomic field scale). For a 1 W laser focused to 1 μm²: I = 10⁹ W/m², E = √(2I/cε₀) ≈ 10⁶ V/m.
        Need pulsed lasers (MW–TW) to reach nonlinear regime. Modern OPAs achieve 10¹⁸ W/m².
      </p>

      <h2>NL.2 Second-Harmonic Generation</h2>

      <p>
        If E = E₀ cos(ωt), then χ⁽²⁾E² = χ⁽²⁾E₀²(1 + cos(2ωt))/2 — contains a component
        at 2ω. This is <strong>second-harmonic generation (SHG)</strong>. The nonlinear wave equation:
      </p>

      <EqNumbered number="NL.2">∂²E_(2ω)/∂z² − (n_(2ω)²/c²)∂²E_(2ω)/∂t² = (1/c²ε₀) ∂²P_(2ω)/∂t² &nbsp;&nbsp;&nbsp; (NL wave equation)</EqNumbered>

      <p>
        <strong>Phase matching</strong>: efficient SHG requires the fundamental and second-harmonic
        waves to stay in phase. Phase mismatch: Δk = k_(2ω) − 2k_ω = 2ω(n_(2ω) − n_ω)/c.
        Without phase matching: I_(2ω) ∝ sinc²(ΔkL/2) — oscillates, maximum at L = π/(2Δk)
        (coherence length L_c ~ 10 μm in typical crystals).
      </p>

      <p>
        <strong>Birefringent phase matching</strong>: use the ordinary and extraordinary rays
        of a birefringent crystal. Type I: n_e(2ω) = n_o(ω) by choosing the crystal angle.
        <strong>Quasi-phase-matching</strong> (QPM): periodically poled crystal (PPLN: Periodically
        Poled Lithium Niobate) with period Λ = 2L_c reverses χ⁽²⁾ every coherence length.
        Allows phase matching at any wavelength by choosing Λ. Conversion efficiencies &gt; 50%.
      </p>

      <WorkedExample number="NL.1" title="SHG in KTP Crystal">
        <p>
          A 1064 nm Nd:YAG laser (P = 1 W, beam area A = 1 mm²) is frequency-doubled
          in a 5 mm KTP crystal (χ⁽²⁾ = 10 pm/V, n = 1.74). Estimate the conversion efficiency.
        </p>
        <Step label="SHG intensity:">Under undepleted, plane-wave, phase-matched conditions, I_(2ω) scales as |χ⁽²⁾|² I_ω² L². This gives the right dependence, but real efficiency also depends strongly on focusing, walkoff, coatings, absorption, and the effective nonlinear coefficient d_eff.</Step>
        <Step label="Calculate:">I_ω = P/A = 1/(10⁻⁶) = 10⁶ W/m². This is modest intensity for nonlinear optics because the beam area is large. A reasonable plane-wave estimate gives conversion on the order of 10⁻⁴ to 10⁻³ for a few-mm crystal at this intensity.</Step>
        <Step label="Total conversion:">So the output is in the sub-milliwatt to milliwatt range for this loose 1 mm² beam. High 40–60% SHG efficiency is possible, but it requires much tighter focusing, a longer optimized crystal, quasi-phase matching, or an enhancement cavity.</Step>
      </WorkedExample>

      <h2>NL.3 Optical Parametric Amplification</h2>

      <p>
        A pump photon at ω_p splits into signal (ω_s) and idler (ω_i) with ω_p = ω_s + ω_i —
        <strong>optical parametric amplification (OPA)</strong>. The signal is amplified while the
        idler is generated. Phase matching: k_p = k_s + k_i.
      </p>

      <p>
        OPAs can be tuned over wide ranges by adjusting the crystal angle or temperature.
        Optical parametric oscillators (OPOs) add a cavity — threshold when gain exceeds losses.
        Coverage: UV to mid-IR from a single pump laser. Applications: terahertz generation,
        frequency combs, squeezed light for quantum optics.
      </p>

      <p>
        <strong>Spontaneous parametric down-conversion (SPDC)</strong>: even at zero signal input,
        vacuum fluctuations seed the conversion. Produces <strong>entangled photon pairs</strong>
        — the workhorse source for quantum optics experiments. The signal and idler photons
        are entangled in polarization, momentum, and energy.
      </p>

      <h2>NL.4 Self-Phase Modulation and Solitons</h2>

      <p>
        The intensity-dependent refractive index (Kerr effect): n = n₀ + n₂I.
        For silica fiber: n₂ ≈ 2.6×10⁻²⁰ m²/W. An intense pulse modulates its own phase:
      </p>

      <EqNumbered number="NL.3">Δφ = n₂ I(t) ω₀ L/c &nbsp;&nbsp;&nbsp; (self-phase modulation phase shift)</EqNumbered>

      <p>
        SPM broadens the pulse spectrum (creates new frequencies: chirp). Combined with
        anomalous group velocity dispersion (β₂ &lt; 0, where the shorter-wavelength part travels
        faster), SPM can balance dispersion exactly — creating <strong>optical solitons</strong>:
        pulses that propagate without changing shape.
      </p>

      <EqNumbered number="NL.4">∂A/∂z + iβ₂/2 × ∂²A/∂t² − iγ|A|²A = 0 &nbsp;&nbsp;&nbsp; (nonlinear Schrödinger equation, fiber)</EqNumbered>

      <p>
        The NLS equation is exactly solvable (inverse scattering). Soliton solution:
        A(z,t) = √P_0 sech(t/T₀) e^(iγP₀z/2). Modern submarine fiber-optic cables use
        soliton-like pulses and dispersion-managed transmission for Tbit/s data rates.
      </p>

      <h2>NL.5 Frequency Combs</h2>

      <p>
        A mode-locked laser emits pulses with repetition rate f_rep. In the frequency domain:
        a comb of modes equally spaced by f_rep, offset by f_CEO (carrier-envelope offset).
        The <strong>optical frequency comb</strong>:
      </p>

      <EqNumbered number="NL.5">f_n = n × f_rep + f_CEO &nbsp;&nbsp;&nbsp; (optical frequency comb, n = integer)</EqNumbered>

      <p>
        Self-referencing: use f-2f interferometry to measure f_CEO → fully determined comb.
        Accuracy: 10⁻¹⁹ fractional (limited by optical clocks). Applications: GPS,
        optical clock comparison, search for dark matter (variation of constants),
        exoplanet spectrograph calibration (radial velocities to cm/s precision).
        Nobel Prize 2005 (Hänsch and Hall).
      </p>

      <Definition number="NL.1" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Nonlinear effects need high field strengths:</strong> ordinary weak light usually sees only χ⁽¹⁾.</li>
          <li><strong>Energy conservation is not enough:</strong> efficient frequency conversion also needs phase matching.</li>
          <li><strong>Self-phase modulation changes spectrum:</strong> time-dependent intensity creates time-dependent phase and frequency chirp.</li>
          <li><strong>Comb lines need both spacing and offset:</strong> f_rep alone does not determine absolute optical frequencies.</li>
        </ul>
      </Definition>

      <PracticeProblems section="NL.1–NL.5 Nonlinear Optics">
        <Problem n={1} difficulty="easy"
          solution={<>Phase matching condition for SHG: need k_(2ω) = 2k_ω → n(2ω) = n(ω). In a dispersive medium: n increases with frequency (normal dispersion). So n(2ω) &gt; n(ω) always (no phase matching). Birefringent phase matching: in a uniaxial crystal, n_e(θ) = [cos²θ/n_o² + sin²θ/n_e²]^(-1/2) depends on angle θ to the optical axis. For Type I SHG: n_e(2ω, θ_pm) = n_o(ω). Choose θ such that the extra-ordinary wave at 2ω has the same index as the ordinary wave at ω. For KDP (KH₂PO₄): n_o(1064nm) = 1.5065, n_e(532nm) = 1.4669, n_o(532nm) = 1.5126. n_e(532nm, θ) = 1.5065. sin²θ/(1/1.4669² − 1/1.5126²) + cos²θ/1.5126² = 1/1.5065². Solving: θ_pm ≈ 41°. Quasi-phase-matching in PPLN: Λ = 2L_c = 2π/Δk. For SHG of 1064→532 in LiNbO₃ at 25°C: Λ ≈ 19 μm.</>}>
          Explain why perfect phase matching is impossible in an isotropic dispersive medium for SHG. How does birefringent phase matching work, and what is quasi-phase-matching?
        </Problem>

        <Problem n={2} difficulty="medium"
          solution={<>SPDC entangled photons: type II SPDC. Pump photon (405nm, H polarization) → signal (810nm, H) + idler (810nm, V). Energy conservation: ω_p = ω_s + ω_i → ν_s + ν_i = ν_p. Momentum conservation (phase matching): k_p = k_s + k_i. The signal and idler are anti-correlated in momentum (Born from same point, go in opposite directions such that k_s + k_i = k_p). Entanglement: the polarization state is |Ψ−⟩ = (|HV⟩ − |VH⟩)/√2 (Bell state). Measured by HOM (Hong-Ou-Mandel) dip: two-photon coincidence drops to 0 when path lengths equalized (quantum interference). Coincidence rate: R_c = R₀(1 − V e^(−(Δt/τ_c)²)) where τ_c = 1/Δω is coherence time. V = visibility (=100% for ideal entanglement). Applications: quantum key distribution (BB84 with entanglement), quantum teleportation, Bell inequality tests (Aspect 1982, Clauser-Freedman 1972). Loophole-free Bell tests (2015): confirmed quantum mechanics, excluded local hidden variables.</>}>
          Describe spontaneous parametric down-conversion (SPDC) for producing entangled photon pairs. What are the energy and momentum conservation conditions? How are the photons entangled?
        </Problem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={124} unit="ps" tolerance={0.05}
          hints={['Soliton condition N = 1: γ P₀ T₀² / |β₂| = 1, so T₀ = √(|β₂| / (γ P₀)).', 'With γ = 1.3×10⁻³ W⁻¹m⁻¹ (= 1.3 W⁻¹km⁻¹), |β₂| = 20×10⁻²⁴ s²/m, P₀ = 1×10⁻³ W.']}
          problemText="Find the fundamental soliton pulse duration T₀ (ps) for P₀ = 1 mW in single-mode fiber with β₂ = −20 ps²/km and γ = 1.3 W⁻¹km⁻¹."
          solution={<>Optical soliton: balance between SPM (n₂I) and anomalous GVD (β₂ &lt; 0). The NLS equation ∂A/∂z + iβ₂/2 × ∂²A/∂T² = iγ|A|²A (anomalous β₂ &lt; 0: put β₂ → −|β₂|). Soliton condition: N² = γP₀T₀²/|β₂| = 1. Fundamental soliton: N=1. For silica fiber: γ = n₂ω/(cA_eff) ≈ 1.3 W⁻¹km⁻¹, |β₂| = 20 ps²/km at 1550 nm. For P₀ = 1 mW: T₀ = √(γP₀/|β₂|)^(-1/2) = √(1.3×10⁻³/20×10⁻²⁴)^(-1) ≈ 124 ps. FWHM = 2 ln(1+√2) × T₀ ≈ 220 ps. For P₀ = 10 mW: T₀ ≈ 70 ps, FWHM ≈ 123 ps. Higher-order solitons (N=2,3,...): breathe periodically with period z_0 = π T₀²/(2|β₂|). Raman soliton: N=1 soliton in the presence of stimulated Raman shifts red-shifts → soliton self-frequency shift, basis of supercontinuum generation in photonic crystal fiber.</>}>
          Find the pulse duration T₀ (ps) and power P₀ for a fundamental optical soliton in standard single-mode fiber (β₂ = −20 ps²/km, γ = 1.3 W⁻¹km⁻¹) with P₀ = 1 mW. What is the soliton period?
        </InteractiveProblem>

        <Problem n={4} difficulty="hard"
          solution={<>Optical frequency comb from mode-locked laser. Ti:sapphire laser: center λ = 800 nm, f_rep = 100 MHz (cavity length L = c/(2f_rep) = 1.5 m). N modes: spectral width Δλ = 100 nm → Δν = c Δλ/λ² = 3×10⁸×10⁻⁷/(8×10⁻⁷)² = 47 THz. Number of modes: N = Δν/f_rep = 47×10¹²/10⁸ = 470,000. f-2f interferometry: broaden spectrum to octave span with PCF. Take fundamental at ν = n f_rep + f_CEO. Double it: 2ν = 2n f_rep + 2 f_CEO. Take comb mode at 2n: 2n f_rep + f_CEO. Beat: (2n f_rep + 2 f_CEO) − (2n f_rep + f_CEO) = f_CEO. Stabilize f_CEO with AOM feedback. Stabilize f_rep with piezo on cavity mirror, referenced to GPS/Cs clock. Result: each comb tooth f_n = n×f_rep + f_CEO known to 10⁻¹⁸ fractional accuracy. Exoplanet application: 1 cm/s radial velocity → Doppler shift Δν/ν = v/c = 3×10⁻¹¹. At 500 THz: Δν = 15 kHz. Comb spacing 1 GHz → can resolve this. ESPRESSO spectrograph on VLT (2018): uses 15 GHz comb to calibrate to 30 cm/s (limiting factor: detector, not comb).</>}>
          Describe how a mode-locked laser produces an optical frequency comb. How does f-2f interferometry stabilize f_CEO? What fractional accuracy is achievable, and how is it used in exoplanet detection?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Nonlinear polarization: P = ε₀(χ¹E + χ²E² + ...). χ² non-zero only in non-centrosymmetric crystals.',
        'SHG: χ²E² contains 2ω component. Efficient only with phase matching: n(2ω) = n(ω).',
        'OPA: ω_p → ω_s + ω_i. SPDC: vacuum fluctuations generate entangled photon pairs.',
        'Kerr effect: n = n₀ + n₂I. SPM: frequency broadening. With anomalous GVD → solitons.',
        'NLS equation: soliton N=1 balance. A = √P₀ sech(t/T₀) propagates without distortion.',
        'Frequency comb: f_n = nf_rep + f_CEO. f-2f stabilization → 10⁻¹⁹ accuracy. GPS, spectroscopy, exoplanets.',
      ]} />
    </div>
  );
}
