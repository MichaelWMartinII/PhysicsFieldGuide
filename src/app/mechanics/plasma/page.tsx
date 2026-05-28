import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function PlasmaPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#3b82f6' }}>Classical Mechanics · Advanced Topics</div>
      <h1>Plasma Physics</h1>
      <p className="subtitle">
        Plasma — the fourth state of matter — is an ionized gas of electrons and ions.
        It makes up 99% of the visible universe: stars, nebulae, the solar wind, and lightning.
        Understanding plasma is key to fusion energy and space weather.
      </p>

      <Prerequisites items={['Electromagnetism (Ch. 14–15)', 'Maxwell\'s equations (Ch. EM)', 'Statistical mechanics (Ch. S)', 'Fluid mechanics (Ch. FM)']} />

      <LearningGoals items={[
        'State the three conditions that define a plasma (Debye shielding, quasi-neutrality, collective behaviour) and compute the Debye length for given n and T.',
        'Describe Larmor (cyclotron) motion and calculate the cyclotron frequency and Larmor radius for electrons and protons in a given magnetic field.',
        'Derive the dispersion relation for EM waves in a plasma and explain why frequencies below ω_p are reflected.',
        'Write the ideal MHD equations and explain flux-freezing (Alfvén\'s theorem) and Alfvén wave propagation.',
        'State the Lawson criterion and explain the triple product nTτ_E as the practical figure of merit for fusion ignition.',
      ]} />

      <h2>PL.1 What is a Plasma?</h2>

      <Definition number="PL.1" title="Plasma Conditions">
        An ionized gas becomes a true plasma when three conditions are met:
        <span style={{ display: 'block', marginTop: '0.5rem' }}>
          1. <strong>Collective behavior dominates:</strong> The Debye length λ_D = √(ε₀k_BT/(ne²))
          satisfies λ_D ≪ L (system size). Within λ_D, electrostatic shielding occurs.
        </span>
        <span style={{ display: 'block' }}>
          2. <strong>Many particles per Debye sphere:</strong> n λ_D³ ≫ 1 (quasi-neutrality
          holds on scales &gt; λ_D).
        </span>
        <span style={{ display: 'block' }}>
          3. <strong>Plasma frequency dominates collisions:</strong> ω_p τ ≫ 1, where
          ω_p = √(ne²/(ε₀m_e)) and τ is the collision time.
        </span>
      </Definition>

      <p>
        The <strong>Debye length</strong> is the key scale:
      </p>

      <EqNumbered number="PL.1" latex="\lambda_D=\sqrt{\frac{\varepsilon_0 k_BT}{ne^2}} \qquad \text{(Debye length)}" />

      <p>
        The potential of a test charge Q in a plasma: φ = (Q/4πε₀r) × e^(−r/λ_D).
        Beyond λ_D, the plasma screens the charge completely. For solar wind (T ≈ 10⁵ K,
        n ≈ 10⁷ m⁻³): λ_D ≈ 7 m. For fusion plasma (T ≈ 10⁸ K, n ≈ 10²⁰ m⁻³): λ_D ≈ 70 μm.
      </p>

      <h2>PL.2 Single-Particle Motion</h2>

      <p>
        A charged particle (charge q, mass m) in crossed E and B fields:
      </p>

      <EqNumbered number="PL.2" latex="m\frac{d\mathbf{v}}{dt}=q(\mathbf{E}+\mathbf{v}\times\mathbf{B}) \qquad \text{(Lorentz force)}" />

      <p>
        In a pure magnetic field B = Bẑ, the particle undergoes <strong>Larmor (cyclotron) motion</strong>
        — circular orbit in the plane perpendicular to B with:
      </p>

      <EqNumbered number="PL.3" latex="\omega_c=\frac{qB}{m} \qquad \text{(cyclotron frequency)} \qquad r_L=\frac{mv_\perp}{|q|B} \qquad \text{(Larmor radius)}" />

      <p>
        For electrons: ω_ce = eB/m_e ≈ 1.76×10¹¹ B rad/s. For protons: ω_ci = eB/m_p ≈
        9.58×10⁷ B rad/s (1836× smaller). In the Earth&apos;s field (B ≈ 5×10⁻⁵ T): electron
        cyclotron frequency ≈ 1.4 MHz (radio), proton ≈ 760 Hz (ELF).
      </p>

      <p>
        With crossed E ⊥ B fields, the guiding center drifts perpendicular to both:
      </p>

      <EqNumbered number="PL.4" latex="\mathbf{v}_E=\frac{\mathbf{E}\times\mathbf{B}}{B^2} \qquad \text{(}\mathbf{E}\times\mathbf{B}\text{ drift — same for all charges)}" />

      <p>
        Because E×B drift is charge-independent, electrons and ions drift together — no net
        current. Other drifts (gradient-B, curvature) are charge-dependent and drive currents.
      </p>

      <WorkedExample number="PL.1" title="Cyclotron Motion in Earth's Field">
        <p>
          An electron with kinetic energy 1 keV enters the Earth&apos;s magnetic equator
          (B = 3×10⁻⁵ T). Find the Larmor radius and cyclotron frequency.
        </p>
        <Step label="Velocity:">KE = ½m_e v² → v = √(2×1000×1.6×10⁻¹⁹/9.11×10⁻³¹) = √(3.51×10¹⁴) = 1.87×10⁷ m/s (non-relativistic: v/c = 6.3%).</Step>
        <Step label="Larmor radius:">r_L = m_e v/(eB) = 9.11×10⁻³¹ × 1.87×10⁷ / (1.6×10⁻¹⁹ × 3×10⁻⁵) = 1.70×10⁻²³/4.8×10⁻²⁴ ≈ 3.6 m.</Step>
        <Step label="Cyclotron frequency:">ω_c = eB/m_e = 1.6×10⁻¹⁹ × 3×10⁻⁵/9.11×10⁻³¹ = 5.27×10⁶ rad/s → f = 838 kHz (AM radio band).</Step>
        <Step label="Physical context:">Energetic electrons spiral along field lines in the Van Allen belts, bouncing between mirror points near the poles. Their cyclotron radiation (whistler waves) propagates along field lines.</Step>
      </WorkedExample>

      <h2>PL.3 Plasma Waves</h2>

      <p>
        Plasmas support a rich variety of waves. The simplest: <strong>plasma (Langmuir) oscillations</strong>.
        Displace all electrons by δx while ions are fixed: restoring force from charge separation
        → oscillations at the plasma frequency:
      </p>

      <EqNumbered number="PL.5" latex="\omega_p=\sqrt{\frac{ne^2}{\varepsilon_0m_e}} \qquad \text{(plasma frequency)}" />

      <p>
        EM waves in a plasma have the dispersion relation:
      </p>

      <EqNumbered number="PL.6" latex="\omega^2=\omega_p^2+c^2k^2 \qquad \text{(electromagnetic waves in plasma)}" />

      <p>
        For ω &lt; ω_p: k is imaginary — the wave is evanescent (reflected). This explains
        why AM radio waves bounce off the ionosphere (ω_p ∼ 10–30 MHz for the F layer).
        For ω &gt; ω_p: wave propagates, with phase velocity v_ph = ω/k &gt; c and group
        velocity v_g = dω/dk = c²k/ω &lt; c (information travels at v_g).
      </p>

      <p>
        The <strong>index of refraction</strong> for a plasma: n = ck/ω = √(1 − ω_p²/ω²).
        At ω_p: n → 0 (total reflection). This is used in magnetic confinement: microwaves
        probe the plasma density because their cutoff frequency equals ω_p.
      </p>

      <h2>PL.4 Magnetohydrodynamics (MHD)</h2>

      <p>
        When the plasma behavior is collective (many particles), we describe it as a
        conducting fluid — <strong>magnetohydrodynamics</strong>. The key equations:
      </p>

      <EqNumbered number="PL.7" latex="\frac{\partial\rho}{\partial t}+\nabla\cdot(\rho\mathbf{v})=0 \qquad \text{(continuity)}" />

      <EqNumbered number="PL.8" latex="\rho\left(\frac{\partial\mathbf{v}}{\partial t}+\mathbf{v}\cdot\nabla\mathbf{v}\right)=\mathbf{J}\times\mathbf{B}-\nabla P \qquad \text{(MHD momentum)}" />

      <EqNumbered number="PL.9" latex="\frac{\partial\mathbf{B}}{\partial t}=\nabla\times(\mathbf{v}\times\mathbf{B})-\frac{1}{\mu_0\sigma}\nabla^2\mathbf{B} \qquad \text{(induction equation)}" />

      <p>
        The induction equation describes <strong>flux freezing</strong>: in ideal MHD (σ → ∞),
        ∂B/∂t = ∇×(v×B) — magnetic field lines are frozen into the conducting fluid and
        move with it. This is Alfvén&apos;s theorem (Nobel 1970). The magnetic Reynolds number
        Rm = μ₀σvL governs whether diffusion (Rm ≪ 1) or advection (Rm ≫ 1) dominates.
      </p>

      <p>
        <strong>Alfvén waves</strong>: transverse perturbations propagating along B at:
      </p>

      <EqNumbered number="PL.10" latex="v_A=\frac{B}{\sqrt{\mu_0\rho}} \qquad \text{(Alfvén speed)}" />

      <p>
        In the solar wind (B ≈ 5 nT, ρ ≈ 10⁻²⁰ kg/m³): v_A ≈ 40 km/s. In the solar corona
        (B ≈ 100 G, n ≈ 10¹⁴ m⁻³): v_A ≈ 10⁴ km/s ≈ 3% c.
      </p>

      <h2>PL.5 Fusion Plasmas</h2>

      <p>
        The <strong>Lawson criterion</strong> for D-T fusion (nτE ≥ 10²⁰ m⁻³·s at T ≈ 10⁸ K)
        requires simultaneously high density n, confinement time τ_E, and temperature T.
        The <strong>triple product</strong> nTτ_E &gt; 3×10²¹ keV·m⁻³·s is the practical
        figure of merit.
      </p>

      <p>
        <strong>Tokamak</strong> geometry: toroidal solenoid with poloidal field from plasma
        current → helical field lines. Plasma pressure balance: β = nk_BT/(B²/2μ₀) ≈ 5–10%.
        Confinement: τ_E ∝ B^1.8 R^1.97 (Bohm/gyro-Bohm scaling — still not fully understood).
        ITER (under construction): designed to achieve Q = P_fusion/P_input ≥ 10 (first device).
      </p>

      <Definition number="PL.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Ionized gas is not automatically plasma:</strong> collective behavior and Debye shielding must dominate.</li>
          <li><strong>Quasi-neutral does not mean charge-free:</strong> small charge separations drive plasma oscillations and waves.</li>
          <li><strong>Cyclotron sign matters:</strong> electrons and ions gyrate in opposite senses.</li>
          <li><strong>E×B drift is charge independent:</strong> both signs drift together, so it does not by itself create current.</li>
          <li><strong>MHD averages over particles:</strong> it fails when kinetic effects, collisions, or small scales dominate.</li>
        </ul>
      </Definition>

      <PracticeProblems section="PL.1–PL.5 Plasma Physics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={69} unit="μm" tolerance={0.05}
          hints={['λ_D = √(ε₀ k_B T / (n e²)). Use T = 10⁸ K, n = 10²⁰ m⁻³.', 'Substitute ε₀ = 8.85×10⁻¹², k_B = 1.38×10⁻²³, e = 1.6×10⁻¹⁹ and simplify under the square root.']}
          problemText="Calculate the Debye length (in μm) for a fusion plasma at T = 1e8 K and n = 1e20 m⁻³."
          solution={<>Debye length for fusion plasma: T = 10⁸ K (= 8.6 keV), n = 10²⁰ m⁻³. λ_D = √(ε₀ k_B T/(ne²)) = √(8.85×10⁻¹² × 1.38×10⁻²³ × 10⁸/(10²⁰ × (1.6×10⁻¹⁹)²)) = √(8.85×10⁻¹² × 1.38×10⁻¹⁵/(10²⁰ × 2.56×10⁻³⁸)) = √(1.22×10⁻²⁶/2.56×10⁻¹⁸) = √(4.77×10⁻⁹) = 69 μm. Particles per Debye sphere: N_D = (4/3)π λ_D³ × n = (4/3)π(6.9×10⁻⁵)³ × 10²⁰ = (4/3)π × 3.3×10⁻¹³ × 10²⁰ = 1.4×10⁸ ≫ 1. Plasma frequency: ω_p = √(ne²/(ε₀ m_e)) = √(10²⁰ × 2.56×10⁻³⁸/(8.85×10⁻¹² × 9.11×10⁻³¹)) = √(2.56×10⁻¹⁸/8.07×10⁻⁴²) = √(3.17×10²³) = 5.6×10¹¹ rad/s → f_p = 90 GHz (mm-wave). Larmor radius for thermal electron (T=10⁸K, B=5T): v_th = √(2kT/m_e) = √(2×1.38×10⁻²³×10⁸/9.11×10⁻³¹) = 1.74×10⁸ m/s (relativistic!). r_L = m_e v/(eB) ≈ 0.2 mm.</>}>
          Calculate the Debye length λ_D (μm) for a fusion plasma at T = 10⁸ K, n = 10²⁰ m⁻³.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={1.24e12} unit="m⁻³" tolerance={0.1}
          hints={['The cutoff occurs when ω_p = 2π f. Solve for n from ω_p² = n e²/(ε₀ m_e).', 'n = ε₀ m_e (2π f_p)² / e². With f_p = 10⁷ Hz, plug in the constants.']}
          problemText="What electron density (m⁻³) in the ionosphere is needed to reflect radio waves at 10 MHz (AM skip frequency)?"
          solution={<>Ionospheric radio reflection: plasma frequency f_p = ω_p/2π. ω_p = √(ne²/(ε₀m_e)). For f_p = 10 MHz (AM skip): n = ε₀m_e(2πf_p)²/e² = 8.85×10⁻¹² × 9.11×10⁻³¹ × (2π×10⁷)² / (1.6×10⁻¹⁹)² = 8.85×10⁻¹² × 9.11×10⁻³¹ × 3.95×10¹⁵/2.56×10⁻³⁸ = 1.24×10¹² m⁻³. This is the electron density in the F-layer (~300 km altitude). AM radio (0.5–1.7 MHz) always reflects (ω &lt; ω_p). FM (88–108 MHz) and TV (50–800 MHz) pass through — no reflection, no skip distance. GPS/satellite: f &gt; 1 GHz ≫ f_p → passes through, but ionospheric delay shifts phase (TEC correction needed for GPS accuracy).</>}>
          Explain why AM radio bounces off the ionosphere but FM does not. What electron density (m⁻³) is needed for a 10 MHz cutoff?
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Magnetic mirror: charged particle bouncing between field-line cusps. Magnetic moment: μ = mv⊥²/(2B) = const (adiabatic invariant). At mirror point: all kinetic energy is perpendicular → v∥ = 0. Conservation: ½m v⊥² = μ B_mirror, ½m v_total² = μ B_min + ½m v∥₀². Mirror ratio R = B_max/B_min. Loss cone: particles with sin²θ₀ &lt; B_min/B_max (pitch angle too small) escape. Loss cone angle: θ_lc = arcsin(√(1/R)). For R = 10: θ_lc = arcsin(1/√10) = 18.4°. Van Allen belts: Earth's dipole field acts as magnetic mirror. Energetic particles bounce between mirror points near poles (L-shell parameter). Pitch-angle scattering into loss cone → precipitation → auroras. Plasma confinement in simple mirror reactor limited by loss cone → need minimum-B or tandem mirror configuration.</>}>
          Describe the magnetic mirror effect. What is the loss cone angle for a mirror ratio R = 10? How do the Van Allen belts act as a magnetic mirror?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Alfvén wave in tokamak: MHD wave propagating along B. For uniform B, ω = k∥ v_A. In a tokamak (major radius R = 3 m, B = 5 T, n = 10²⁰ m⁻³ of deuterium, m_D = 3.34×10⁻²⁷ kg): ρ = n m_D = 3.34×10⁻⁷ kg/m³. v_A = B/√(μ₀ρ) = 5/√(4π×10⁻⁷ × 3.34×10⁻⁷) = 7.7×10⁶ m/s. The toroidal Alfvén eigenmode (TAE) frequency: f_TAE ≈ v_A/(4πqR) where q ≈ 2 (safety factor). f_TAE ≈ 7.7×10⁶/(4π×2×3) ≈ 100 kHz. This frequency is in the range of fusion-produced alpha particles' precession frequency — alpha particles can resonantly drive TAEs unstable, potentially expelling them from the plasma before they heat it. TAE stabilization is a key challenge for burning plasma experiments.</>}>
          Estimate the Alfvén speed and toroidal Alfvén eigenmode (TAE) frequency in an ITER-like tokamak (R = 3 m, B = 5 T, deuterium plasma n = 10²⁰ m⁻³). Why do TAEs matter for fusion?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Plasma conditions: λ_D ≪ L, N_D ≫ 1, ω_p τ ≫ 1. Debye shielding screens charge over λ_D.',
        'Cyclotron motion: ω_c = qB/m, r_L = mv⊥/(qB). E×B drift is charge-independent.',
        'EM waves: ω² = ω_p² + c²k². Reflection below ω_p explains ionospheric radio bounce.',
        'MHD: plasma as conducting fluid. Flux freezing: B lines move with plasma in ideal MHD.',
        'Alfvén waves: transverse oscillations along B at v_A = B/√(μ₀ρ).',
        'Fusion: Lawson criterion nτ_E T &gt; 3×10²¹ keV·m⁻³·s. Tokamaks approach this with Q ≥ 1.',
      ]} />
    </div>
  );
}
