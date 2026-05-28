import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function CosmologyPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Advanced Topics</div>
      <h1>Cosmology</h1>
      <p className="subtitle">
        Cosmology is the study of the universe as a whole — its origin, structure, evolution,
        and ultimate fate. From the Big Bang to dark energy, from the cosmic microwave background
        to the large-scale structure, cosmology is one of the most precisely tested areas of physics.
      </p>

      <Prerequisites items={['General relativity (Ch. GR)', 'Statistical mechanics (Ch. S)', 'Nuclear physics (Ch. NP)', 'Astrophysics (Ch. AS)']} />

      <LearningGoals items={[
        'Write down the FLRW metric and derive the Friedmann equations from Einstein field equations.',
        'Compute the age of the universe by integrating the Friedmann equation for a flat ΛCDM model.',
        'Describe the sequence of cosmic epochs from inflation through BBN, recombination, and reionization.',
        'Interpret CMB acoustic peaks to extract the curvature, baryon density, and matter density of the universe.',
        'Quantify the Hubble tension and evaluate proposed resolutions including systematic errors and new physics.',
      ]} />

      <h2>CO.1 The Expanding Universe</h2>

      <p>
        Hubble (1929) discovered that galaxies recede with velocity v = H₀ d — the universe
        is expanding. In general relativity, the <strong>FLRW metric</strong> describes a
        homogeneous, isotropic universe:
      </p>

      <EqNumbered number="CO.1">ds² = −c²dt² + a(t)²[dr²/(1−kr²) + r²dΩ²] &nbsp;&nbsp;&nbsp; (FLRW metric)</EqNumbered>

      <p>
        where a(t) is the <strong>scale factor</strong> (a = 1 today) and k = −1, 0, +1
        for open, flat, closed geometry. The Hubble parameter H(t) = ȧ/a; today H₀ ≈ 70 km/s/Mpc.
      </p>

      <p>
        Redshift z relates the observed to emitted wavelength: 1 + z = a_obs/a_emit = 1/a(t_emit).
        Cosmological redshift is not a Doppler effect but the stretching of photon wavelengths
        by the expanding space.
      </p>

      <h2>CO.2 The Friedmann Equations</h2>

      <p>
        Substituting FLRW into Einstein&apos;s equations gives the <strong>Friedmann equations</strong>:
      </p>

      <EqNumbered number="CO.2">(ȧ/a)² = H² = 8πG ρ_total/(3) − kc²/a² + Λc²/3 &nbsp;&nbsp;&nbsp; (Friedmann equation)</EqNumbered>

      <EqNumbered number="CO.3">ä/a = −4πG(ρ + 3P/c²)/3 + Λc²/3 &nbsp;&nbsp;&nbsp; (Raychaudhuri equation)</EqNumbered>

      <p>
        The cosmological constant Λ (dark energy) drives acceleration (ä &gt; 0) when
        Λc²/3 &gt; 4πG(ρ + 3P/c²). The <strong>critical density</strong> (k = 0, Λ = 0):
      </p>

      <EqNumbered number="CO.4">ρ_c = 3H₀²/(8πG) ≈ 9.47×10⁻²⁷ kg/m³ ≈ 5.6 protons/m³</EqNumbered>

      <p>
        <strong>Density parameters</strong>: Ω_i = ρ_i/ρ_c. Current values (Planck 2018):
        Ω_m ≈ 0.315 (matter: 5% baryonic + 27% dark), Ω_Λ ≈ 0.685 (dark energy), k = 0 (flat).
      </p>

      <Definition number="CO.1" title="ΛCDM — The Standard Model of Cosmology">
        Lambda-Cold Dark Matter (ΛCDM): flat universe with cosmological constant Λ (dark energy,
        w = −1) and cold dark matter. Six free parameters: H₀, Ω_b h², Ω_c h², A_s, n_s, τ.
        Fits CMB, BAO, weak lensing, supernovae to remarkable precision. Tensions: Hubble (5σ),
        S₈ (matter fluctuation amplitude, 2–3σ), possibly hinting at extensions. Despite its
        success, ΛCDM tells us nothing about what dark matter or dark energy actually are.
      </Definition>

      <h2>CO.3 Cosmic History</h2>

      <p>
        The universe cools as it expands: T ∝ 1/a ∝ (1+z). Key epochs:
      </p>

      <p>
        <strong>t ∼ 10⁻³⁵ s: Inflation</strong> — exponential expansion driven by inflaton field.
        Solves the flatness, horizon, and monopole problems. Generates primordial perturbations
        with spectrum P(k) ∝ k^(n_s−1), n_s ≈ 0.965 (nearly scale-invariant, Planck 2018).
      </p>

      <p>
        <strong>t ∼ 1 s – 3 min: Big Bang Nucleosynthesis (BBN)</strong> — T falls to ∼1 MeV.
        Free neutrons freeze out (n/p ≈ 1/7). Protons and neutrons fuse:
        p + n → d + γ, then ²H + ²H → ³He + n → ⁴He + γ. Final abundances:
        ⁴He: 25% by mass, ²H/H ≈ 2.5×10⁻⁵, ³He/H ≈ 10⁻⁵, ⁷Li/H ≈ 10⁻¹⁰.
        Predicted from one parameter (baryon-to-photon ratio η): match with observed primordial
        abundances is a triumph of Big Bang cosmology.
      </p>

      <p>
        <strong>t ∼ 380,000 yr: Recombination</strong> — T ≈ 3000 K. Electrons and protons
        combine to form neutral hydrogen. Universe becomes transparent. Relic photons
        today: <strong>CMB</strong> at T₀ = 2.7255 K.
      </p>

      <p>
        <strong>t ∼ 10⁸ yr: Reionization</strong> — first stars and quasars reionize the
        intergalactic medium. Absorption spectra of distant quasars show the Gunn-Peterson trough.
      </p>

      <WorkedExample number="CO.1" title="Age of the Universe in ΛCDM">
        <p>
          Given H₀ = 67.4 km/s/Mpc and Ω_m = 0.315, Ω_Λ = 0.685, compute the age of the universe.
        </p>
        <Step label="Friedmann:">H(a) = H₀ √(Ω_m/a³ + Ω_Λ). The age is t₀ = ∫(0 to 1) da/(a H(a)).</Step>
        <Step label="Convert H₀:">H₀ = 67.4 km/s/Mpc = 67.4×10³/(3.086×10²²) = 2.18×10⁻¹⁸ s⁻¹.</Step>
        <Step label="Integral:">Numerically: t₀ = (1/H₀) ∫(0 to 1) da/√(0.315/a + 0.685a²) ≈ (1/H₀) × 0.964 = 0.964/(2.18×10⁻¹⁸) = 4.42×10¹⁷ s.</Step>
        <Step label="Convert:">t₀ = 4.42×10¹⁷/(3.156×10⁷) = 1.40×10¹⁰ yr = 13.8 Gyr.</Step>
        <Step label="Check:">Consistent with oldest globular clusters (∼13.5 Gyr) and stellar dating. A matter-only universe (Ω_m = 1, Ω_Λ = 0) gives t₀ = 2/(3H₀) = 9.3 Gyr — too young! Dark energy is needed.</Step>
      </WorkedExample>

      <h2>CO.4 Cosmic Microwave Background</h2>

      <p>
        The CMB is a near-perfect blackbody at T₀ = 2.7255 K with tiny anisotropies δT/T ∼ 10⁻⁵.
        The angular power spectrum C_l (variance per multipole l) shows:
      </p>

      <p>
        <strong>Acoustic peaks</strong>: the primordial plasma was a photon-baryon fluid.
        Pressure waves (sound) oscillated until recombination. Modes caught at maximum
        compression/rarefaction appear as peaks at l ≈ 200, 500, 800... The first peak
        location θ ∼ 1° determines the curvature: flat universe. The peak heights determine
        Ω_b (baryons) and Ω_m (total matter).
      </p>

      <p>
        <strong>Damping tail</strong> (l &gt; 1000): photon diffusion erases small-scale fluctuations
        (Silk damping). Exponential suppression ∝ e^(−(l/l_D)²).
      </p>

      <p>
        <strong>Polarization</strong>: CMB is polarized (E and B modes). B-modes from primordial
        gravitational waves would confirm inflation — not yet detected.
      </p>

      <h2>CO.5 Dark Matter and Dark Energy</h2>

      <p>
        <strong>Dark matter evidence:</strong> galaxy rotation curves (flat, not Keplerian decline),
        galaxy cluster mass vs. temperature/lensing discrepancy, BBN (Ω_b = 0.049 ≪ Ω_m = 0.315),
        CMB peak heights, large-scale structure formation. Dark matter must be: cold (non-relativistic),
        non-baryonic, collisionless. Candidates: WIMPs (100 GeV−TeV scale), axions (μeV scale),
        sterile neutrinos, primordial black holes. No direct detection yet.
      </p>

      <p>
        <strong>Dark energy</strong>: Ω_Λ = 0.685, equation of state w = P/(ρc²) ≈ −1 (consistent
        with Λ). The cosmological constant problem: why is Λ ≈ 10⁻¹²³ × (Planck scale)? The
        worst prediction in physics. Alternatives: quintessence (w(t) varies), phantom energy
        (w &lt; −1, leads to Big Rip), modifications of gravity.
      </p>

      <Definition number="CO.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Expansion is metric expansion:</strong> galaxies are not flying through pre-existing space from a central explosion.</li>
          <li><strong>Redshift has multiple causes:</strong> cosmological, Doppler, and gravitational shifts are conceptually distinct.</li>
          <li><strong>Critical density is a benchmark:</strong> it does not mean the universe is spatially small or large by itself.</li>
          <li><strong>Lookback time is not distance:</strong> cosmology has several useful distance measures.</li>
        </ul>
      </Definition>

      <PracticeProblems section="CO.1–CO.5 Cosmology">
        <InteractiveProblem n={1} difficulty="easy"
          answer={4.08e8} unit="m⁻³" tolerance={0.05}
          hints={['Use n_γ = 2ζ(3)/π² × (k_BT/ℏc)³ with ζ(3) = 1.202', 'First compute k_BT/(ℏc) = 1.38×10⁻²³ × 2.7255 / (1.055×10⁻³⁴ × 3×10⁸) ≈ 1188 m⁻¹']}
          problemText="Calculate the CMB photon number density at T₀ = 2.7255 K using the Bose-Einstein formula n_γ = 2ζ(3)/π² × (k_BT/ℏc)³."
          solution={<>CMB temperature today T₀ = 2.7255 K. Photon number density: n_γ = 2ζ(3)/π² × (k_BT/ℏc)³. ζ(3) = 1.202. n_γ = 2×1.202/π² × (1.38×10⁻²³×2.7255/(1.055×10⁻³⁴×3×10⁸))³ = (2.404/9.87) × (5.35×10⁻²³)³ = 0.2436 × (5.35×10⁻²³/3.16×10⁻²⁶)³... Let me compute k_BT/(ℏc): = 1.38×10⁻²³×2.7255/(1.055×10⁻³⁴×3×10⁸) = 3.76×10⁻²³/3.165×10⁻²⁶ = 1188 m⁻¹. n_γ = 2×1.202/π² × 1188³ = 0.2436 × 1.676×10⁹ = 4.08×10⁸ m⁻³ ≈ 411/cm³. Baryon number density: Ω_b = 0.049, ρ_b = 0.049×9.47×10⁻²⁷ = 4.6×10⁻²⁸ kg/m³. n_b = ρ_b/m_p = 4.6×10⁻²⁸/1.67×10⁻²⁷ = 0.28 m⁻³. Baryon-to-photon ratio: η = n_b/n_γ = 0.28/4.08×10⁸ = 6.9×10⁻¹⁰. This is the same η that BBN predicts from primordial ⁴He abundance — a beautiful consistency check.</>}>
          Calculate the CMB photon number density at T₀ = 2.7255 K. What is the baryon-to-photon ratio η given Ω_b = 0.049?
        </InteractiveProblem>

        <Problem n={2} difficulty="medium"
          solution={<>Inflation solves the horizon problem: at recombination, the particle horizon was d_H ∼ c/H(z_rec). The angular size of the horizon on the CMB sky: θ_H ∼ 1°−2°. But the CMB is uniform to 10⁻⁵ across the full sky (360°). In standard Big Bang without inflation: regions more than ∼1° apart were never in causal contact — yet they have the same temperature. Inflation: before the hot Big Bang, the universe underwent ∼60+ e-folds of exponential expansion. All observed regions emerged from a causally connected pre-inflationary patch. Flatness problem: without inflation, Ω must be fine-tuned to 10⁻⁵⁰ at Planck time for Ω₀ ≈ 1 today (any deviation grows as t). During inflation: the spatial curvature term k/a² is exponentially diluted → forced to near-perfect flatness. Monopole problem: GUT phase transition produces magnetic monopoles. Inflation dilutes their density to one per Hubble volume → effectively zero monopoles today. The inflationary predictions: n_s ≈ 0.965 (slightly red-tilted spectrum) and r = T/S &lt; 0.064 (tensor-to-scalar ratio, BICEP/Keck).</>}>
          Explain how inflation solves the horizon problem, flatness problem, and monopole problem. What observational signatures of inflation have been confirmed?
        </Problem>

        <Problem n={3} difficulty="medium"
          solution={<>Baryon Acoustic Oscillations (BAO): the same acoustic oscillations that produce CMB peaks leave an imprint in the matter distribution. The sound horizon at recombination: r_s = ∫(0 to t_rec) c_s dt/a ≈ 147 Mpc (comoving). At recombination, the photon-baryon plasma freezes → a preferred galaxy separation of 147 Mpc. The BAO peak in the galaxy correlation function at 100 h⁻¹ Mpc (∼150 Mpc) was detected by SDSS (2005, Eisenstein et al.). Uses: (1) Standard ruler — measure r_s/d_A(z) and r_s H(z)/c → constrain H₀ and dark energy w(z). (2) At z = 0.1 (2dFGRS): BAO constrains Ω_m h² = 0.135. (3) DESI (2024): high-precision BAO at z = 0.3–3.5, confirms ΛCDM but hints at w &gt; −1. BAO is immune to galaxy bias (same absolute scale regardless of how galaxies form) → clean cosmological probe. Combined with CMB: H₀ discrepancy measured to 5σ.</>}>
          Explain baryon acoustic oscillations (BAO) as a cosmological standard ruler. What is the BAO scale and how is it used to measure dark energy?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Large-scale structure growth: perturbation δ = δρ/ρ. In matter domination (Ω_m ≈ 1, a ∝ t^(2/3)): δ̈ + 2Hδ̇ − 4πGρδ = 0 (density perturbation equation). Growing mode: δ ∝ a ∝ t^(2/3) (linear growth in matter era). In Λ domination: growth suppresses (universe accelerates, perturbations freeze). Growth factor D(z): δ(z) = δ₀ D(z)/D(0). Matter power spectrum: P(k,z) = A k^(n_s) T²(k) D²(z) where T(k) is the transfer function (encodes BAO, damping). The matter-radiation equality sets the peak of P(k) at k_eq = H_eq/c ≈ 0.014 Mpc⁻¹. Below this scale (smaller k): P(k) ∝ k^(n_s) (Harrison-Zel&apos;dovich). Above (larger k, sub-Hubble in radiation era): T(k) ∝ k⁻² ln(k) → P(k) ∝ k^(n_s−4) ln²(k). N-body simulations: solve N-particle gravitational dynamics. Navarro-Frenk-White profile: ρ ∝ 1/(r/r_s(1+r/r_s)²) for dark matter halos — universal profile independent of halo mass. Halo mass function (Press-Schechter): dn/dM gives number of halos per comoving volume per mass interval.</>}>
          Describe the growth of structure from linear perturbation theory to N-body simulations. What determines the shape of the matter power spectrum P(k)?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'FLRW metric: expanding universe with scale factor a(t). Redshift z+1 = 1/a. Hubble H = ȧ/a.',
        'Friedmann: H² = 8πGρ/3 − kc²/a² + Λc²/3. Flat ΛCDM: Ω_m + Ω_Λ = 1.',
        'Cosmic history: inflation → BBN (⁴He, ²H) → recombination → reionization → structure.',
        'CMB: T = 2.7255 K blackbody, δT/T ∼ 10⁻⁵. Acoustic peaks → flat geometry, Ω_b, Ω_m.',
        'Dark matter (27%): cold, non-baryonic. Galaxy rotation curves, lensing, CMB peaks.',
        'Dark energy (68%): w ≈ −1. Drives accelerated expansion. Cosmological constant problem unsolved.',
      ]} />
    </div>
  );
}
