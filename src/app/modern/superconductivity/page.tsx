import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function SuperconductivityPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Advanced Topics</div>
      <h1>Superconductivity & BCS Theory</h1>
      <p className="subtitle">
        Superconductors carry current with zero resistance and expel magnetic fields (Meissner effect).
        BCS theory explains conventional superconductivity through phonon-mediated Cooper pairing,
        producing a finite-temperature phase transition into a macroscopic coherent state.
      </p>

      <Prerequisites items={['Solid-state physics (Ch. SS)', 'Quantum mechanics (Ch. QM)', 'Statistical mechanics (Ch. SM)', 'Second quantization']} />

      <LearningGoals items={[
        'Derive the London penetration depth λ_L from the London equations and explain the Meissner effect.',
        'State the BCS gap equation and compute Δ(0) and T_c for a given coupling constant N(0)V.',
        'Apply the DC and AC Josephson effects to calculate junction current and frequency-to-voltage ratio.',
        'Classify Type I and Type II superconductors using the Ginzburg-Landau parameter κ = λ/ξ.',
        'Describe the Abrikosov vortex lattice and derive the upper critical field H_c2 in GL theory.',
      ]} />

      <h2>SC.1 Phenomenology</h2>

      <p>
        <strong>Perfect conductivity</strong>: resistivity ρ → 0 below T_c. Record high-T_c:
        HgBa₂Ca₂Cu₃O₈ at 138 K (at ambient pressure), HₓS at 203 K (at 150 GPa),
        LaH₁₀ at 250 K (under pressure). Room-temperature superconductivity remains elusive.
      </p>

      <p>
        <strong>Meissner effect</strong>: below T_c, B = 0 inside a superconductor regardless
        of whether it was cooled in a field or not. Not merely perfect diamagnetism —
        it is an active expulsion of flux. The London penetration depth λ_L characterizes
        the exponential decay of B from the surface: B(x) = B₀ e^(−x/λ_L).
      </p>

      <Definition number="SC.1" title="London Equations">
        F. and H. London (1935) proposed: ∂J_s/∂t = (n_s e²/m) E and J_s = −(n_s e²/m) A
        (London gauge ∇·A = 0). The second equation gives the Meissner effect:
        ∇²B = B/λ_L² where λ_L² = m/(μ₀ n_s e²). Typical values: λ_L ≈ 50 nm (Al), 500 nm (YBCO).
      </Definition>

      <p>
        <strong>Type I vs Type II</strong>: Type I (Hg, Al, Pb) have a single critical field H_c.
        Type II (Nb, YBCO, MgB₂) have H(c1) and H(c2) — between them, magnetic flux enters in
        quantized vortices (Abrikosov lattice). Flux quantum: Φ₀ = h/(2e) ≈ 2.07×10⁻¹⁵ Wb.
        The factor of 2e is direct evidence for Cooper pairs.
      </p>

      <h2>SC.2 Cooper Pairs and the BCS Ground State</h2>

      <p>
        L. Cooper (1956): two electrons near the Fermi surface, interacting via an attractive
        potential V (mediated by phonons), form a bound state (Cooper pair) for any V &gt; 0 —
        no matter how weak. This is special to 2D Fermi surface; no bound state in 3D free space for weak attraction.
      </p>

      <EqNumbered number="SC.1">E_binding = −2ℏω_D e^(−2/N(0)V) &nbsp;&nbsp;&nbsp; (Cooper pair binding energy, N(0) = density of states at E_F)</EqNumbered>

      <p>
        The BCS ground state (Bardeen-Cooper-Schrieffer, 1957):
      </p>

      <EqNumbered number="SC.2">|BCS⟩ = Π_k (u_k + v_k c†_(k↑) c†_(−k↓)) |0⟩ &nbsp;&nbsp;&nbsp; (BCS wavefunction)</EqNumbered>

      <p>
        where |u_k|² + |v_k|² = 1, and v_k² = ½(1 − ξ_k/E_k) with E_k = √(ξ_k² + Δ²).
        The order parameter (gap) Δ = V Σ_k ⟨c_(−k↓) c_(k↑)⟩ satisfies the BCS gap equation.
      </p>

      <Theorem number="SC.1" title="BCS Gap Equation">
        The superconducting gap Δ satisfies:
        1/(N(0)V) = ∫(0 to ℏω_D) dξ/√(ξ² + Δ²)
        &rarr; Δ(0) ≈ 2ℏω_D e^(−1/(N(0)V)) (weak coupling).
        Temperature dependence: Δ(T) → 0 as T → T_c where
        k_B T_c = 1.13 ℏω_D e^(−1/(N(0)V)) = Δ(0)/(1.76).
        The ratio 2Δ(0)/(k_B T_c) = 3.52 is a universal BCS prediction.
      </Theorem>

      <WorkedExample number="SC.1" title="Aluminum as a BCS Superconductor">
        <p>
          Al has T_c = 1.2 K, Debye temperature Θ_D = 428 K (ℏω_D = k_B × 428 K).
          Estimate Δ(0), N(0)V, and the Fermi velocity from the coherence length.
        </p>
        <Step label="Gap from T_c:">Δ(0) = 1.76 k_B T_c = 1.76 × (8.617×10⁻⁵ eV/K)(1.2 K) = 1.76 × 1.03×10⁻⁴ eV = 1.82×10⁻⁴ eV = 0.18 meV. This matches tunneling spectroscopy measurements on Al junctions.</Step>
        <Step label="Coupling constant N(0)V:">From T_c = 1.13 Θ_D e^(−1/(N(0)V)): N(0)V = 1/ln(1.13 Θ_D/T_c) = 1/ln(1.13 × 428/1.2) = 1/ln(402.8) = 1/5.999 ≈ 0.167. This is weak coupling (N(0)V ≪ 1) — BCS applies well.</Step>
        <Step label="Coherence length:">ξ₀ = ℏv_F/(πΔ) — the characteristic size of a Cooper pair. For Al: v_F = 2.03×10⁶ m/s. ξ₀ = (1.055×10⁻³⁴ × 2.03×10⁶)/(π × 1.82×10⁻⁴ × 1.6×10⁻¹⁹) = 2.14×10⁻²⁸/9.15×10⁻²³ ≈ 2.3×10⁻⁶ m = 2300 nm. This is much larger than the lattice spacing — Cooper pairs are highly overlapping, not tightly bound molecules.</Step>
        <Step label="GL ratio:">λ_L/ξ₀ ≈ 50nm/2300nm ≈ 0.022 ≪ 1/√2 ≈ 0.707. Al is a Type I superconductor (Ginzburg-Landau parameter κ = λ/ξ &lt; 1/√2). For κ &gt; 1/√2 (Type II): Abrikosov vortex lattice forms above H(c1).</Step>
      </WorkedExample>

      <h2>SC.3 Josephson Effect</h2>

      <p>
        Two superconductors separated by a thin insulator (tunnel junction).
        The macroscopic wavefunction is Ψ = √(n_s) e^(iθ). The phase difference δ = θ₁ − θ₂ drives:
      </p>

      <EqNumbered number="SC.3">I = I_c sin(δ) &nbsp;&nbsp;&nbsp; (DC Josephson effect) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; dδ/dt = 2eV/ℏ &nbsp;&nbsp;&nbsp; (AC Josephson effect)</EqNumbered>

      <p>
        <strong>DC Josephson</strong>: supercurrent flows with no voltage (V = 0). Critical current I_c ∝ Δ.
        <strong>AC Josephson</strong>: with DC voltage V, the phase oscillates at 2eV/ℏ — microwave
        radiation at f = 2eV/h ≈ 484 GHz/mV. The Josephson relation defines the
        voltage-frequency ratio 2e/h — used in metrology (voltage standard).
      </p>

      <p>
        <strong>SQUID</strong> (Superconducting Quantum Interference Device): two junctions in parallel.
        Total current I = 2I_c cos(πΦ/Φ₀) sin(δ_avg) — periodic in the enclosed flux Φ.
        Sensitivity: δΦ ~ 10⁻⁶ Φ₀ — the most sensitive magnetometer ever built.
        Applications: brain imaging (MEG), gravitational wave detection, dark matter searches.
      </p>

      <h2>SC.4 Ginzburg-Landau Theory</h2>

      <p>
        Near T_c, expand the free energy in the order parameter Ψ (complex):
      </p>

      <EqNumbered number="SC.4">F = F_n + α|Ψ|² + β/2 |Ψ|⁴ + 1/(2m*)|(-iℏ∇ − 2eA)Ψ|² + B²/(2μ₀)</EqNumbered>

      <p>
        where α = α₀(T − T_c) changes sign at T_c. Minimizing δF/δΨ* = 0 gives the
        Ginzburg-Landau (GL) equation. Two characteristic lengths emerge:
        penetration depth λ(T) = λ_L/√(1−T/T_c) and coherence length ξ(T) = ξ₀/√(1−T/T_c).
        GL parameter κ = λ/ξ: κ &lt; 1/√2 → Type I; κ &gt; 1/√2 → Type II.
      </p>

      <p>
        <strong>Vortex structure</strong> (Abrikosov, 1957): in Type II, each vortex carries
        one flux quantum Φ₀ = h/(2e). Order parameter |Ψ| → 0 at vortex core (radius ξ).
        Magnetic field decays over λ from the core. The upper critical field
        H(c2) = Φ₀/(2πξ²) — at H(c2) vortex cores overlap and superconductivity is destroyed.
        For YBCO: H(c2) ~ 100 T, enabling high-field magnet applications (MRI, LHC).
      </p>

      <Definition number="SC.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Zero resistance is not the whole story:</strong> the Meissner effect distinguishes superconductors from perfect conductors.</li>
          <li><strong>Cooper pairs are correlated states:</strong> they are not tiny molecules moving through the lattice.</li>
          <li><strong>Type I and type II behave differently in fields:</strong> vortices appear only in type II superconductors.</li>
          <li><strong>Critical current and field matter:</strong> exceeding either destroys superconductivity.</li>
        </ul>
      </Definition>

      <PracticeProblems section="SC.1–SC.4 Superconductivity">
        <InteractiveProblem n={1} difficulty="easy"
          answer={47} unit="nm" tolerance={0.05}
          hints={[
            'Start from J_s = -(n_s e²/m)A (London equation) and take the curl of ∇×B = μ₀J_s to get ∇²B = B/λ_L².',
            'λ_L = √(m/(μ₀ n_s e²)). Plug in n_s = 5×10²⁸ m⁻³, m = 9.11×10⁻³¹ kg, μ₀ = 4π×10⁻⁷ H/m.',
          ]}
          problemText="Derive the London penetration depth λ_L from the London equations. Estimate λ_L in nm for niobium with superfluid density n_s ≈ 5×10²⁸ m⁻³."
          solution={<>London equation: J_s = -(n_s e²/m)A. Maxwell: ∇×B = μ₀J_s. Taking curl: ∇×(∇×B) = μ₀∇×J_s = -μ₀(n_s e²/m) B. Using ∇×(∇×B) = ∇(∇·B) - ∇²B = -∇²B (since ∇·B=0): ∇²B = B/λ_L² where λ_L = √(m/(μ₀ n_s e²)). For a semi-infinite superconductor x&gt;0 with field B₀ at surface: B(x) = B₀ e^(-x/λ_L). For Nb: n_s ≈ 5×10²⁸ m⁻³, m = m_e = 9.11×10⁻³¹ kg: λ_L = √(9.11×10⁻³¹/(4π×10⁻⁷ × 5×10²⁸ × (1.6×10⁻¹⁹)²)) = √(9.11×10⁻³¹/2.01×10⁻¹¹) = √(4.53×10⁻²⁰) ≈ 47 nm. Nb measured λ_L ≈ 32 nm — same order (London model uses free-electron mass; effective mass and partial superfluid density affect the exact value).</>}>
          Derive the London penetration depth λ_L from the London equations. Estimate λ_L for niobium (density n_s ≈ 5×10²⁸ m⁻³).
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={1.1} unit="meV" tolerance={0.15}
          hints={[
            'Use Δ(0) = 2ℏω_D e^(-1/(N(0)V)). First find N(0)V = 1/ln(1.13 Θ_D/T_c) for Pb with T_c = 7.2 K, Θ_D = 96 K.',
            'ℏω_D = k_B Θ_D. Compute k_B Θ_D in eV, then multiply by 2 e^(-1/(N(0)V)). The BCS ratio 2Δ(0)/(k_B T_c) = 3.52 gives a quick check.',
          ]}
          problemText="Apply the BCS gap equation at T = 0 to lead (Pb, T_c = 7.2 K, Debye temperature Θ_D = 96 K). Calculate the zero-temperature gap Δ(0) in meV."
          solution={<>BCS gap equation at T=0: 1/(N(0)V) = ∫(0 to ℏω_D) dξ/√(ξ²+Δ²) = sinh⁻¹(ℏω_D/Δ) ≈ ln(2ℏω_D/Δ) (weak coupling). So Δ = 2ℏω_D e^(-1/(N(0)V)). At T: gap equation becomes 1/(N(0)V) = ∫dξ tanh(E/(2k_BT))/(2E) where E=√(ξ²+Δ(T)²). At T→T_c, Δ→0: 1/(N(0)V) = ∫(0 to ℏω_D) dξ tanh(ξ/(2k_BT_c))/(2ξ) ≈ ln(1.13ℏω_D/(k_BT_c)). After careful expansion near T_c: Δ(T) ≈ 1.74 Δ(0) √(1 - T/T_c) for T near T_c — mean-field order parameter behavior (critical exponent β=1/2). For Pb: T_c = 7.2 K, Θ_D = 96 K. N(0)V = 1/ln(1.13×96/7.2) = 1/ln(15.1) = 0.369. Δ(0) = 2k_B×96×e^(-1/0.369) = 2×8.617×10⁻⁵×96×e^(-2.71) = 0.01655×0.0668 = 1.1 meV. Measured: 1.35 meV — Pb is intermediate coupling, BCS slightly underestimates.</>}>
          Derive the BCS gap equation at T = 0 and show Δ(0) = 2ℏω_D e^(-1/(N(0)V)). Find the ratio 2Δ(0)/(k_B T_c) = 3.52. Apply to lead (Pb, T_c = 7.2 K, Θ_D = 96 K).
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>AC Josephson effect and voltage standard: dδ/dt = 2eV/ℏ. With constant voltage V, δ(t) = δ₀ + 2eVt/ℏ. Current I = I_c sin(2eVt/ℏ + δ₀) — oscillates at frequency f_J = 2eV/h. Numerically: f_J/V = 2e/h = 2×1.602×10⁻¹⁹/6.626×10⁻³⁴ = 483.6 GHz/mV = 483,597.9 MHz/mV (the Josephson constant K_J = 2e/h). Voltage standard: if microwave radiation at frequency f is applied, the junction phase-locks and generates a series of voltage steps (Shapiro steps) at V_n = n h f/(2e). By counting integer n and measuring f (tied to atomic clock), voltage is defined with relative uncertainty ~10⁻¹⁰. Since 1990, the volt is defined via K_J = 483,597.9 GHz/V (exact). This was central to the 2019 SI redefinition where e is exact. A programmable Josephson voltage standard uses thousands of junctions in series to achieve voltages up to 10 V with quantum accuracy.</>}>
          Explain the AC Josephson effect. Show that the frequency-to-voltage ratio is 2e/h = 483.6 GHz/mV. How is this used to define the volt in the modern SI?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Abrikosov vortex lattice and H_c2: In GL theory, above H_c1 flux enters as vortices, each carrying Φ₀ = h/(2e). At H_c2, vortex cores of radius ξ overlap: areal density n_v = B/Φ₀ ~ 1/ξ². H_c2 = Φ₀/(2πξ²). For triangular (Abrikosov) lattice spacing a_v = (2Φ₀/(√3 B))^(1/2). At H_c1: B just allows first vortex, energy cost = ε_L = (Φ₀/4πλ)² ln(λ/ξ) per unit length. H_c1 = Φ₀ ln(λ/ξ)/(4πλ²). Ratio: H_c2/H_c1 = 2λ²/ξ² ln(λ/ξ) = 2κ²/ln(κ) (κ = λ/ξ). For YBCO: κ ≈ 100, ξ(ab) ≈ 1.5 nm, λ ≈ 150 nm. H_c2 = Φ₀/(2πξ²) = 2.07×10⁻¹⁵/(2π×(1.5×10⁻⁹)²) = 2.07×10⁻¹⁵/1.41×10⁻¹⁷ ≈ 147 T. Measured: H_c2 ~ 100-400 T (anisotropic). Vortex pinning (at defects, twin boundaries) prevents flux flow (which causes resistance) — critical for high-field magnet applications. Vortex creep (thermally activated) limits practical performance in HTS cables.</>}>
          Derive the upper critical field H_c2 in GL theory and the Abrikosov vortex lattice spacing. Estimate H_c2 for YBCO (ξ ≈ 1.5 nm, λ ≈ 150 nm) and explain why vortex pinning matters for applications.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'London equations: J_s = -(n_s e²/m)A → Meissner effect, field decays over λ_L = √(m/(μ₀n_s e²)).',
        'Cooper pairs: phonon attraction binds electrons near E_F; any V>0 gives a bound state (special to Fermi surface).',
        'BCS gap: Δ(0) = 2ℏω_D e^(-1/(N(0)V)), ratio 2Δ(0)/(k_B T_c) = 3.52 universal.',
        'DC Josephson: I = I_c sin(δ), supercurrent with no voltage. AC Josephson: f = 2eV/h (voltage standard).',
        'Type II: flux enters as Abrikosov vortices above H_c1. Each carries Φ₀ = h/(2e). H_c2 = Φ₀/(2πξ²).',
        'GL theory: two lengths λ(T) and ξ(T), parameter κ = λ/ξ. κ < 1/√2: Type I; κ > 1/√2: Type II.',
      ]} />
    </div>
  );
}
