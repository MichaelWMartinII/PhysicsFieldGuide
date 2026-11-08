import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, InlineMath, Prerequisites, Takeaways, LearningGoals
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

      <Prerequisites items={['Wave optics (Ch. 20)', 'Lasers and coherent light (Ch. LZ)', 'Maxwell\'s equations (Ch. M)', 'Electrostatics: boundary (Ch. ES)']} />

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

      <EqNumbered number="NL.1" latex="P = \varepsilon_0\left(\chi^{(1)}E + \chi^{(2)}E^2 + \chi^{(3)}E^3 + \cdots\right) \qquad \text{(nonlinear polarization)}" />

      <p>
        χ⁽¹⁾: linear susceptibility (index n = √(1+χ⁽¹⁾)).
        χ⁽²⁾: second-order (non-zero only in non-centrosymmetric materials — no inversion symmetry).
        χ⁽³⁾: third-order (present in all materials, responsible for Kerr effect).
      </p>

      <p>
        At what intensity is χ⁽²⁾ important? When χ⁽²⁾E ~ χ⁽¹⁾: E ~ χ⁽¹⁾/χ⁽²⁾ ~ 10¹⁰ V/m
        (atomic field scale). For a 1 W laser focused to 1 μm²: I = 10¹² W/m², E = √(2I/cε₀) ≈ 3×10⁷ V/m.
        Need pulsed lasers (MW–TW) to reach nonlinear regime. Modern OPAs achieve 10¹⁸ W/m².
      </p>

      <h2>NL.2 Second-Harmonic Generation</h2>

      <p>
        If E = E₀ cos(ωt), then χ⁽²⁾E² = χ⁽²⁾E₀²(1 + cos(2ωt))/2 — contains a component
        at 2ω. This is <strong>second-harmonic generation (SHG)</strong>. The nonlinear wave equation:
      </p>

      <EqNumbered number="NL.2" latex="\frac{\partial^2 E_{2\omega}}{\partial z^2} - \frac{n_{2\omega}^2}{c^2}\frac{\partial^2 E_{2\omega}}{\partial t^2} = \frac{1}{c^2\varepsilon_0}\frac{\partial^2 P_{2\omega}}{\partial t^2} \qquad \text{(NL wave equation)}" />

      <p>
        <strong>Phase matching</strong>: efficient SHG requires the fundamental and second-harmonic
        waves to stay in phase. Phase mismatch: <InlineMath latex="\Delta k = k_{2\omega} - 2k_\omega = 2\omega(n_{2\omega} - n_\omega)/c" />.
        Without phase matching: <InlineMath latex="I_{2\omega} \propto L^2\,\mathrm{sinc}^2(\Delta k L/2)" /> — oscillates, maximum at <InlineMath latex="L = \pi/\Delta k" />
        (coherence length <InlineMath latex="L_c" /> ~ 10 μm in typical crystals).
      </p>

      <p>
        <strong>Birefringent phase matching</strong>: use the ordinary and extraordinary rays
        of a birefringent crystal. Type I: <InlineMath latex="n_e(2\omega) = n_o(\omega)" /> by choosing the crystal angle.
        <strong>Quasi-phase-matching</strong> (QPM): periodically poled crystal (PPLN: Periodically
        Poled Lithium Niobate) with period <InlineMath latex="\Lambda = 2L_c" /> reverses χ⁽²⁾ every coherence length.
        Allows phase matching at any wavelength by choosing Λ. Conversion efficiencies &gt; 50%.
      </p>

      <WorkedExample number="NL.1" title="SHG in KTP Crystal">
        <p>
          A 1064 nm Nd:YAG laser (P = 1 W, beam area A = 1 mm²) is frequency-doubled
          in a 5 mm KTP crystal (χ⁽²⁾ = 10 pm/V, n = 1.74). Estimate the conversion efficiency.
        </p>
        <Step label="SHG intensity:">Under undepleted, plane-wave, phase-matched conditions, <InlineMath latex="I_{2\omega}" /> scales as <InlineMath latex="|\chi^{(2)}|^2 I_\omega^2 L^2" />. This gives the right dependence, but real efficiency also depends strongly on focusing, walkoff, coatings, absorption, and the effective nonlinear coefficient <InlineMath latex="d_{\text{eff}}" />.</Step>
        <Step label="Calculate:">I_ω = P/A = 1/(10⁻⁶) = 10⁶ W/m². This is modest intensity for nonlinear optics because the beam area is large. A reasonable plane-wave estimate gives conversion on the order of 10⁻⁴ to 10⁻³ for a few-mm crystal at this intensity.</Step>
        <Step label="Total conversion:">So the output is in the sub-milliwatt to milliwatt range for this loose 1 mm² beam. High 40–60% SHG efficiency is possible, but it requires much tighter focusing, a longer optimized crystal, quasi-phase matching, or an enhancement cavity.</Step>
      </WorkedExample>

      <h2>NL.3 Optical Parametric Amplification</h2>

      <p>
        A pump photon at <InlineMath latex="\omega_p" /> splits into signal (<InlineMath latex="\omega_s" />) and idler (<InlineMath latex="\omega_i" />) with <InlineMath latex="\omega_p = \omega_s + \omega_i" /> —
        <strong>optical parametric amplification (OPA)</strong>. The signal is amplified while the
        idler is generated. Phase matching: <InlineMath latex="\mathbf{k}_p = \mathbf{k}_s + \mathbf{k}_i" />.
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

      <EqNumbered number="NL.3" latex="\Delta\phi = n_2\, I(t)\, \omega_0 L/c \qquad \text{(self-phase modulation phase shift)}" />

      <p>
        SPM broadens the pulse spectrum (creates new frequencies: chirp). Combined with
        anomalous group velocity dispersion (β₂ &lt; 0, where the shorter-wavelength part travels
        faster), SPM can balance dispersion exactly — creating <strong>optical solitons</strong>:
        pulses that propagate without changing shape.
      </p>

      <EqNumbered number="NL.4" latex="\frac{\partial A}{\partial z} + \frac{i\beta_2}{2}\frac{\partial^2 A}{\partial t^2} - i\gamma|A|^2 A = 0 \qquad \text{(nonlinear Schrödinger equation, fiber)}" />

      <p>
        The NLS equation is exactly solvable (inverse scattering). Soliton solution:
        <InlineMath latex="A(z,t) = \sqrt{P_0}\,\operatorname{sech}(t/T_0)\,e^{i\gamma P_0 z/2}" />. Modern submarine fiber-optic cables use
        soliton-like pulses and dispersion-managed transmission for Tbit/s data rates.
      </p>

      <h2>NL.5 Frequency Combs</h2>

      <p>
        A mode-locked laser emits pulses with repetition rate <InlineMath latex="f_{\text{rep}}" />. In the frequency domain:
        a comb of modes equally spaced by <InlineMath latex="f_{\text{rep}}" />, offset by <InlineMath latex="f_{\text{CEO}}" /> (carrier-envelope offset).
        The <strong>optical frequency comb</strong>:
      </p>

      <EqNumbered number="NL.5" latex="f_n = n\, f_{\text{rep}} + f_{\text{CEO}} \qquad \text{(optical frequency comb, } n \text{ = integer)}" />

      <p>
        Self-referencing: use f-2f interferometry to measure <InlineMath latex="f_{\text{CEO}}" /> → fully determined comb.
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
          <li><strong>Comb lines need both spacing and offset:</strong> <InlineMath latex="f_{\text{rep}}" /> alone does not determine absolute optical frequencies.</li>
        </ul>
      </Definition>

      <PracticeProblems section="NL.1–NL.5 Nonlinear Optics">
        <Problem n={1} difficulty="easy"
          solution={<>Phase matching condition for SHG: need <InlineMath latex="k_{2\omega} = 2k_\omega" /> → n(2ω) = n(ω). In a dispersive medium: n increases with frequency (normal dispersion). So n(2ω) &gt; n(ω) always (no phase matching). Birefringent phase matching: in a uniaxial crystal, <InlineMath latex="n_e(\theta) = \left[\cos^2\theta/n_o^2 + \sin^2\theta/n_e^2\right]^{-1/2}" /> depends on angle θ to the optical axis. For Type I SHG: <InlineMath latex="n_e(2\omega, \theta_{\text{pm}}) = n_o(\omega)" />. Choose θ such that the extra-ordinary wave at 2ω has the same index as the ordinary wave at ω. For KDP (KH₂PO₄): <InlineMath latex="n_o(1064\,\mathrm{nm}) = 1.4938,\ n_e(532\,\mathrm{nm}) = 1.4705,\ n_o(532\,\mathrm{nm}) = 1.5123" />. Require <InlineMath latex="n_e(532\,\mathrm{nm}, \theta) = 1.4938" />: <InlineMath latex="\dfrac{\cos^2\theta}{1.5123^2} + \dfrac{\sin^2\theta}{1.4705^2} = \dfrac{1}{1.4938^2}" />. Solving: <InlineMath latex="\theta_{\text{pm}} \approx 41^\circ" />. Quasi-phase-matching in PPLN: <InlineMath latex="\Lambda = 2L_c = 2\pi/\Delta k" />. For SHG of 1064→532 in LiNbO₃ at 25°C: Λ ≈ 7 μm.</>}>
          Explain why perfect phase matching is impossible in an isotropic dispersive medium for SHG. How does birefringent phase matching work, and what is quasi-phase-matching?
        </Problem>

        <Problem n={2} difficulty="medium"
          solution={<>SPDC entangled photons: type II SPDC. Pump photon (405nm, H polarization) → signal (810nm, H) + idler (810nm, V). Energy conservation: ω_p = ω_s + ω_i → ν_s + ν_i = ν_p. Momentum conservation (phase matching): k_p = k_s + k_i. The signal and idler are anti-correlated in momentum (Born from same point, go in opposite directions such that k_s + k_i = k_p). Entanglement: the polarization state is |Ψ−⟩ = (|HV⟩ − |VH⟩)/√2 (Bell state). Measured by HOM (Hong-Ou-Mandel) dip: two-photon coincidence drops to 0 when path lengths equalized (quantum interference). Coincidence rate: R_c = R₀(1 − V e^(−(Δt/τ_c)²)) where τ_c = 1/Δω is coherence time. V = visibility (=100% for ideal entanglement). Applications: quantum key distribution (BB84 with entanglement), quantum teleportation, Bell inequality tests (Aspect 1982, Clauser-Freedman 1972). Loophole-free Bell tests (2015): confirmed quantum mechanics, excluded local hidden variables.</>}>
          Describe spontaneous parametric down-conversion (SPDC) for producing entangled photon pairs. What are the energy and momentum conservation conditions? How are the photons entangled?
        </Problem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={124} unit="ps" tolerance={0.05}
          hints={['Soliton condition N = 1: γ P₀ T₀² / |β₂| = 1, so T₀ = √(|β₂| / (γ P₀)).', 'With γ = 1.3×10⁻³ W⁻¹m⁻¹ (= 1.3 W⁻¹km⁻¹), |β₂| = 2×10⁻²⁶ s²/m (= 20 ps²/km), P₀ = 1×10⁻³ W.']}
          problemText="Find the fundamental soliton pulse duration T₀ (ps) for P₀ = 1 mW in single-mode fiber with β₂ = −20 ps²/km and γ = 1.3 W⁻¹km⁻¹."
          solution={<>Optical soliton: balance between SPM (n₂I) and anomalous GVD (β₂ &lt; 0). The NLS equation ∂A/∂z + iβ₂/2 × ∂²A/∂T² = iγ|A|²A (anomalous β₂ &lt; 0: put β₂ → −|β₂|). Soliton condition: N² = γP₀T₀²/|β₂| = 1. Fundamental soliton: N=1. For silica fiber: <InlineMath latex="\gamma = n_2\omega/(cA_{\text{eff}}) \approx 1.3\ \mathrm{W^{-1}km^{-1}}" />, |β₂| = 20 ps²/km at 1550 nm. For P₀ = 1 mW: <InlineMath latex="T_0 = \sqrt{|\beta_2|/(\gamma P_0)} = \sqrt{2\times10^{-26}/(1.3\times10^{-3}\times10^{-3})} \approx 124\,\mathrm{ps}" />. FWHM = 2 ln(1+√2) × T₀ ≈ 220 ps. For P₀ = 10 mW: T₀ ≈ 39 ps, FWHM ≈ 69 ps. Higher-order solitons (N=2,3,...): breathe periodically with period <InlineMath latex="z_0 = \pi T_0^2/(2|\beta_2|)" /> (≈ 1200 km for the 1 mW, 124 ps soliton). Raman soliton: N=1 soliton in the presence of stimulated Raman shifts red-shifts → soliton self-frequency shift, basis of supercontinuum generation in photonic crystal fiber.</>}>
          Find the pulse duration T₀ (ps) and power P₀ for a fundamental optical soliton in standard single-mode fiber (β₂ = −20 ps²/km, γ = 1.3 W⁻¹km⁻¹) with P₀ = 1 mW. What is the soliton period?
        </InteractiveProblem>

        <Problem n={4} difficulty="hard"
          solution={<>Optical frequency comb from mode-locked laser. Ti:sapphire laser: center λ = 800 nm, <InlineMath latex="f_{\text{rep}} = 100\,\mathrm{MHz}" /> (cavity length <InlineMath latex="L = c/(2f_{\text{rep}}) = 1.5\,\mathrm{m}" />). N modes: spectral width Δλ = 100 nm → Δν = c Δλ/λ² = 3×10⁸×10⁻⁷/(8×10⁻⁷)² = 47 THz. Number of modes: <InlineMath latex="N = \Delta\nu/f_{\text{rep}} = 47\times10^{12}/10^8 = 470{,}000" />. f-2f interferometry: broaden spectrum to octave span with PCF. Take fundamental at <InlineMath latex="\nu = n f_{\text{rep}} + f_{\text{CEO}}" />. Double it: <InlineMath latex="2\nu = 2n f_{\text{rep}} + 2 f_{\text{CEO}}" />. Take comb mode at 2n: <InlineMath latex="2n f_{\text{rep}} + f_{\text{CEO}}" />. Beat: <InlineMath latex="(2n f_{\text{rep}} + 2 f_{\text{CEO}}) - (2n f_{\text{rep}} + f_{\text{CEO}}) = f_{\text{CEO}}" />. Stabilize <InlineMath latex="f_{\text{CEO}}" /> with AOM feedback. Stabilize <InlineMath latex="f_{\text{rep}}" /> with piezo on cavity mirror, referenced to GPS/Cs clock. Result: each comb tooth <InlineMath latex="f_n = n f_{\text{rep}} + f_{\text{CEO}}" /> known to 10⁻¹⁸ fractional accuracy. Exoplanet application: 1 cm/s radial velocity → Doppler shift Δν/ν = v/c = 3.3×10⁻¹¹. At 500 THz: Δν ≈ 17 kHz. Comb spacing 1 GHz → can resolve this. ESPRESSO spectrograph on VLT (2018): uses 15 GHz comb to calibrate to 30 cm/s (limiting factor: detector, not comb).</>}>
          Describe how a mode-locked laser produces an optical frequency comb. How does f-2f interferometry stabilize <InlineMath latex="f_{\text{CEO}}" />? What fractional accuracy is achievable, and how is it used in exoplanet detection?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Nonlinear polarization: P = ε₀(χ⁽¹⁾E + χ⁽²⁾E² + ...). χ⁽²⁾ non-zero only in non-centrosymmetric crystals.',
        'SHG: χ⁽²⁾E² contains 2ω component. Efficient only with phase matching: n(2ω) = n(ω).',
        'OPA: ω_p → ω_s + ω_i. SPDC: vacuum fluctuations generate entangled photon pairs.',
        'Kerr effect: n = n₀ + n₂I. SPM: frequency broadening. With anomalous GVD → solitons.',
        'NLS equation: soliton N=1 balance. A = √P₀ sech(t/T₀) propagates without distortion.',
        'Frequency comb: f_n = nf_rep + f_CEO. f-2f stabilization → 10⁻¹⁹ accuracy. GPS, spectroscopy, exoplanets.',
      ]} />
    </div>
  );
}
