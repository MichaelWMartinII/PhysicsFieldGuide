import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function GeneralRelativityPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Upper Division</div>
      <h1>General Relativity</h1>
      <p className="subtitle">
        Einstein&apos;s general theory of relativity identifies gravity with the curvature of
        spacetime. Mass and energy curve spacetime; curved spacetime tells matter how to move.
        The theory has passed every experimental test and underlies GPS, black holes, and cosmology.
      </p>

      <Prerequisites items={['Special relativity (Ch. 19)', 'Vectors and tensors', 'Differential equations']} />

      <LearningGoals items={[
        'State the equivalence principle and derive gravitational time dilation and light deflection from it.',
        'Interpret the metric tensor and the geodesic equation as replacements for Newtonian gravity.',
        'Identify the key terms in Einstein\'s field equations and explain the physical meaning of each side.',
        'Use the Schwarzschild metric to calculate the event horizon radius, ISCO, and gravitational redshift.',
        'Describe the observational tests of general relativity: Mercury\'s precession, lensing, LIGO, and GPS.',
      ]} />

      <h2>GR.1 The Equivalence Principle</h2>

      <Definition number="GR.1" title="The Equivalence Principle">
        <span style={{ display: 'block', marginBottom: '0.4rem' }}>
          <strong>Weak Equivalence Principle (WEP):</strong> The trajectory of a freely falling
          test body is independent of its composition or mass (inertial mass = gravitational mass).
          Known to 10⁻¹⁵ precision (Eötvös experiments, MICROSCOPE satellite).
        </span>
        <span style={{ display: 'block' }}>
          <strong>Einstein Equivalence Principle (EEP):</strong> In a small, freely falling
          laboratory, all non-gravitational physics is identical to what it would be in a flat
          spacetime inertial frame. Consequence: gravity can always be locally transformed away
          by going to a freely falling frame — gravity is not a force but a geometric effect.
        </span>
      </Definition>

      <p>
        Immediate consequences of EEP:
        (1) Light deflects in a gravitational field — photons follow geodesics.
        (2) Clocks run slow in a gravitational potential (gravitational time dilation):
      </p>

      <EqNumbered number="GR.1">Δτ/Δt = √(1 − 2GM/rc²) ≈ 1 − GM/(rc²) &nbsp;&nbsp;&nbsp; (gravitational redshift)</EqNumbered>

      <h2>GR.2 Spacetime and the Metric</h2>

      <p>
        General relativity describes spacetime as a 4D <strong>Lorentzian manifold</strong> with
        a metric tensor gμν. The spacetime interval between nearby events is:
      </p>

      <EqNumbered number="GR.2">ds² = gμν dxμ dxν &nbsp;&nbsp;&nbsp; (summation over repeated indices)</EqNumbered>

      <p>
        In flat spacetime: gμν = ημν = diag(−1, +1, +1, +1) (Minkowski metric).
        The metric encodes the gravitational field — it determines distances, angles,
        and the paths of freely falling objects (<strong>geodesics</strong>).
      </p>

      <p>
        Freely falling particles follow geodesics — the straightest possible paths in curved
        spacetime — determined by the <strong>geodesic equation</strong>:
      </p>

      <EqNumbered number="GR.3">d²xμ/dτ² + Γμ_αβ (dxα/dτ)(dxβ/dτ) = 0</EqNumbered>

      <p>
        where Γμ_αβ are the <strong>Christoffel symbols</strong>, computed from derivatives of gμν.
        These play the role of the gravitational force in Newtonian mechanics — but they are
        coordinate-dependent (fictitious forces), not true forces.
      </p>

      <h2>GR.3 Einstein&apos;s Field Equations</h2>

      <p>
        The field equations relate the geometry of spacetime (left side) to the energy-momentum
        content (right side):
      </p>

      <EqNumbered number="GR.4">Gμν ≡ Rμν − ½ gμν R = 8πG/c⁴ × Tμν &nbsp;&nbsp;&nbsp; (Einstein&apos;s equations)</EqNumbered>

      <p>
        Here: Rμν is the Ricci tensor (curvature from Christoffel symbols), R = gμν Rμν is the
        Ricci scalar, Gμν is the Einstein tensor, and Tμν is the stress-energy tensor
        (energy density, momentum flux, pressure). In vacuum (Tμν = 0): Rμν = 0.
        The field equations are 10 nonlinear second-order PDEs — exact solutions are rare and precious.
      </p>

      <WorkedExample number="GR.1" title="The Schwarzschild Metric">
        <p>
          The unique spherically symmetric vacuum solution (Birkhoff&apos;s theorem) is the
          Schwarzschild metric:
        </p>
        <Step label="Metric:">ds² = −(1−r_s/r)c²dt² + (1−r_s/r)⁻¹dr² + r²dΩ² &nbsp;&nbsp; (r_s = 2GM/c²)</Step>
        <Step label="Schwarzschild radius:">r_s = 2GM/c². For the Sun: r_s = 2×6.67×10⁻¹¹×2×10³⁰/(3×10⁸)² = 2.95 km (Sun&apos;s radius is 696,000 km — safe).</Step>
        <Step label="Gravitational time dilation:">A clock at r ticks at rate √(1−r_s/r) relative to one at infinity. At r = 2r_s: rate = 1/√2 ≈ 71% — significant slowing.</Step>
        <Step label="Black hole:">At r = r_s: g_tt = 0, g_rr → ∞. The event horizon — an infalling observer crosses it in finite proper time but a distant observer never sees them cross (infinite coordinate time). Inside r_s: r and t swap roles; everything must fall toward r=0 (future singularity).</Step>
        <Step label="Orbits:">Innermost stable circular orbit (ISCO): r_ISCO = 3r_s = 6GM/c². Below this, there are no stable circular orbits — matter accreting in a black hole spirals rapidly to the ISCO then plunges in.</Step>
      </WorkedExample>

      <h2>GR.4 Observational Tests and Applications</h2>

      <p>
        GR has passed every precision test:
      </p>

      <p>
        <strong>Perihelion precession of Mercury:</strong> GR predicts 42.98″/century extra
        precession (Newtonian mechanics gives 532″, observations give 575″ — the discrepancy
        of 43″ is explained exactly by GR). Einstein famously said his heart trembled when
        he computed this in 1915.
      </p>

      <p>
        <strong>Gravitational lensing:</strong> Light deflection angle θ = 4GM/(rc²) at impact
        parameter r. For the Sun: θ = 1.75″ (confirmed by Eddington&apos;s 1919 eclipse expedition).
        Strong lensing creates Einstein rings; weak lensing maps dark matter.
      </p>

      <p>
        <strong>Gravitational waves:</strong> Linearized GR predicts waves propagating at c in
        the metric perturbation hμν. First direct detection: LIGO 2015 (GW150914), from two
        ~30 M☉ black holes merging 1.3 billion light-years away. Peak luminosity ~50 M☉c²/s —
        briefly outshining all stars in the observable universe.
      </p>

      <p>
        <strong>GPS:</strong> Combines both GR effects: gravitational time dilation (clocks on
        satellites run 45 μs/day fast at altitude) and special relativistic time dilation
        (clocks run 7 μs/day slow from velocity). Net: +38 μs/day — uncorrected, GPS would
        accumulate 10 km position error per day.
      </p>

      <Definition number="GR.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Gravity is geometry in GR:</strong> free-falling objects follow geodesics, not force paths in flat space.</li>
          <li><strong>Coordinates can mislead:</strong> physical conclusions should use invariants or observable intervals.</li>
          <li><strong>Local inertial frames still exist:</strong> curvature appears through tidal effects across finite regions.</li>
          <li><strong>Schwarzschild radius is not a material surface:</strong> the event horizon is a causal boundary.</li>
        </ul>
      </Definition>

      <PracticeProblems section="GR.1–GR.4 General Relativity">
        <InteractiveProblem n={1} difficulty="easy"
          answer={2.95} unit="km" tolerance={0.03}
          hints={['r_s = 2GM/c². M_☉ = 2×10³⁰ kg, G = 6.674×10⁻¹¹, c = 3×10⁸ m/s.']}
          problemText="Find the Schwarzschild radius r_s of the Sun (km). M_☉ = 2×10³⁰ kg."
          solution={<>r_s = 2×6.674×10⁻¹¹×2×10³⁰/(3×10⁸)² = 2.65×10²⁰/9×10¹⁶ = 2953 m ≈ <strong>2.95 km</strong></>}>
          Calculate the Schwarzschild radius of the Sun.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={38} unit="μs/day" tolerance={0.05}
          hints={['GPS net correction = +45 μs/day (GR) − 7 μs/day (SR) = +38 μs/day.']}
          problemText="GPS satellite clocks run +45 μs/day fast (GR) and −7 μs/day slow (SR). Net correction (μs/day)?"
          solution={<>Net = 45 − 7 = <strong>38 μs/day</strong> fast — clocks must be slowed before launch.</>}>
          What is the net daily clock correction required for GPS satellites combining both GR and SR effects?
        </InteractiveProblem>

        <Problem n={3} difficulty="easy"
          solution={<>Gravitational redshift: from GR.1, ratio of clock rates at r₁ and r₂: Δτ₁/Δτ₂ = √(g_tt(r₁)/g_tt(r₂)) = √((1−r_s/r₁)/(1−r_s/r₂)). For photon emitted from surface (r₁) received at infinity (r₂→∞): z = (λ_obs−λ_em)/λ_em = 1/√(1−r_s/r₁) − 1 ≈ r_s/(2r₁) = GM/(r₁c²) for weak field. For white dwarf Sirius B: M = 1.018 M☉, R = 0.0084 R☉ = 5840 km. z = GM/(Rc²) = 6.67×10⁻¹¹×2.03×10³⁰/(5.84×10⁶×9×10¹⁶) = 2.57×10⁻⁴. Measured: 3.0×10⁻⁴ — first precision measurement confirming gravitational redshift (1925, Adams). Neutron star: R~10km, M~1.4M☉ → z ≈ 0.3 — not perturbative!</>}>
          Calculate the gravitational redshift of light from the surface of a white dwarf (M = 1M☉, R = 0.0085 R☉). Compare to the historical measurement from Sirius B.
        </Problem>

        <Problem n={4} difficulty="medium"
          solution={<>Geodesic in Schwarzschild: for a test particle, energy E and angular momentum L are conserved, and the radial motion can be written with an effective potential V_eff(r) = (1−2GM/rc²)(c² + L²/r²). Circular orbits satisfy dV_eff/dr = 0; stability requires d²V_eff/dr² &gt; 0. The marginally stable orbit occurs when the minimum becomes an inflection point, giving <strong>r_ISCO = 6GM/c² = 3r_s</strong> for a non-rotating black hole. At ISCO: E_ISCO/mc² = √(8/9), so the binding energy released is (1−√(8/9))mc² = 0.0572mc² = 5.72%. This accretion efficiency is much larger than chemical energy and comparable to or larger than nuclear-burning efficiencies, making black-hole accretion one of the most powerful astrophysical energy sources.</>}>
          Using the Schwarzschild effective potential, find the innermost stable circular orbit (ISCO). What is the binding energy of a particle there, and why does this matter for astrophysics?
        </Problem>

        <Problem n={5} difficulty="medium"
          solution={<>Gravitational wave strain: h = ΔL/L (fractional change in interferometer arm). GW150914: M₁ = 36M☉, M₂ = 29M☉, d = 1.3 Gpc = 4.0×10²⁵m. Peak strain h_peak ≈ 10⁻²¹. Quadrupole formula: h ~ (G/c⁴) × (second time derivative of quadrupole moment) / d. For two equal masses M orbiting at frequency f_orbit = f_GW/2: Q̈̈ ≈ 4M(πf)²r² where r ~ GM/f²c² (orbital radius). Power radiated: P = 32G⁴M⁵/(5c⁵r⁵). Inspiral timescale ~ 1/f × df/dt. Peak frequency at merger: f_peak ~ c³/(6√6 πGM_chirp) where M_chirp = (M₁M₂)^(3/5)/(M₁+M₂)^(1/5). For GW150914: M_chirp = 28.3M☉ → f_peak ≈ 150 Hz (in LIGO band 10-2000 Hz).</>}>
          Estimate the gravitational wave strain from a binary black hole merger at 1 Gpc. What determines the frequency at merger?
        </Problem>

        <Problem n={6} difficulty="hard"
          solution={<>Friedmann equation from GR for homogeneous isotropic universe (FRW metric): ds² = −c²dt² + a(t)²[dr²/(1−kr²) + r²dΩ²]. Einstein equations → (ȧ/a)² = 8πGρ/3 − kc²/a² + Λc²/3. H = ȧ/a (Hubble). Flat (k=0) ΛCDM: H² = H₀²[Ω_m(1+z)³ + Ω_Λ]. Current: H₀=67km/s/Mpc, Ω_m=0.31, Ω_Λ=0.69. At z=0: H₀² ≈ Λc²/3 + 8πGρ_m/3. Cosmological constant Λ = 3H₀²Ω_Λ/c² = dark energy density. Age of universe: t₀ = ∫₀¹ da/(a H(a)) ≈ 13.8 Gyr. Deceleration at early times (matter-dominated: a∝t^(2/3)); acceleration now (Λ-dominated: a∝e^(Ht)). Hubble tension: H₀=67 (CMB) vs 73 (distance ladder) — 5σ discrepancy unresolved as of 2025.</>}>
          Derive the Friedmann equation governing cosmological expansion. Describe the history of the universe: radiation-dominated, matter-dominated, and dark-energy-dominated eras.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'EEP: gravity is locally indistinguishable from acceleration. Gravity curves spacetime.',
        'Metric ds² = gμν dxμ dxν encodes geometry. Geodesic equation gives free-fall trajectories.',
        'Einstein equations: Gμν = 8πG/c⁴ × Tμν. Mass-energy tells spacetime how to curve.',
        'Schwarzschild metric: r_s = 2GM/c² is the event horizon. ISCO at 3r_s.',
        'Tested: Mercury perihelion, gravitational lensing (4GM/rc²), LIGO gravitational waves (2015).',
        'GPS: +45μs/day GR time dilation, −7μs/day SR time dilation, net +38μs/day must be corrected.',
      ]} />
    </div>
  );
}
