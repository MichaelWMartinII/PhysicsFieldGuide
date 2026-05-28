import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function MagnetismPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Advanced Topics</div>
      <h1>Magnetism in Condensed Matter</h1>
      <p className="subtitle">
        Magnetism arises from spin — quantum mechanical angular momentum with no classical
        analog. From ferromagnetism to frustrated magnets to quantum spin liquids, magnetic
        materials display a rich variety of quantum phases driven by exchange interactions.
      </p>

      <Prerequisites items={['Solid-state physics (Ch. SS)', 'Statistical mechanics (Ch. S)', 'Quantum mechanics (Ch. 20)', 'Group theory (Ch. GT)']} />

      <LearningGoals items={[
        'Derive the Brillouin function and Curie law for a paramagnet and identify when saturation occurs.',
        'Explain the origin of the exchange interaction and use mean-field theory to compute the Curie temperature T_C.',
        'Derive the magnon dispersion ω_k ∝ k² for a Heisenberg ferromagnet and predict the Bloch T^(3/2) heat capacity.',
        'Distinguish ferromagnetic, antiferromagnetic, and frustrated geometries and explain how frustration produces spin liquids.',
        'Apply Larmor precession to describe NMR signal generation and spatial encoding in MRI.',
      ]} />

      <h2>MG.1 Paramagnetism and Diamagnetism</h2>

      <p>
        In an external field H, a free spin-J atom acquires energy −g_J μ_B m_J H.
        The partition function Z = Σ e^(g_J μ_B m_J H/(k_BT)) gives the magnetization:
      </p>

      <EqNumbered number="MG.1">M = N g_J μ_B J B_J(x) &nbsp;&nbsp;&nbsp; where x = g_J μ_B J H / (k_B T) and B_J is the Brillouin function</EqNumbered>

      <p>
        At high T (x ≪ 1): M ≈ N g_J² μ_B² J(J+1) H/(3k_BT) — <strong>Curie law</strong>:
        χ = C/T. At low T (x ≫ 1): M → N g_J μ_B J (saturation).
      </p>

      <p>
        <strong>Diamagnetism</strong>: all materials are weakly diamagnetic. The orbital
        response of closed shells to H gives χ_dia = −Ze²⟨r²⟩/(6m_e c²) per atom (Langevin).
        Negative susceptibility: induced magnetization opposes applied field. Superconductors
        are perfect diamagnets (Meissner effect): χ = −1.
      </p>

      <h2>MG.2 Exchange Interaction and the Heisenberg Model</h2>

      <p>
        Magnetism in solids comes from the <strong>exchange interaction</strong> — a purely
        quantum mechanical effect arising from the overlap of wavefunctions and the Pauli
        exclusion principle. For two electrons on adjacent atoms:
      </p>

      <EqNumbered number="MG.2">H_ex = −2J S₁ · S₂ &nbsp;&nbsp;&nbsp; (Heisenberg exchange Hamiltonian)</EqNumbered>

      <p>
        J &gt; 0: ferromagnetic exchange (parallel spins lower energy — triplet state preferred).
        J &lt; 0: antiferromagnetic exchange (antiparallel spins — singlet preferred).
        Exchange integral: J = ⟨↑↓|1/r₁₂|↑↓⟩ − ⟨↑↓|1/r₁₂|↓↑⟩ (direct vs exchange term).
      </p>

      <p>
        The full <strong>Heisenberg model</strong> on a lattice:
        H = −J Σ_(ij) S_i · S_j − g μ_B H Σᵢ S_i^z. For J &gt; 0: ferromagnet.
        For J &lt; 0: antiferromagnet. The Ising model (1D solvable): H = −J Σ σᵢ σᵢ₊₁.
      </p>

      <h2>MG.3 Ferromagnetism — Mean-Field Theory</h2>

      <p>
        In mean-field theory, replace S_j · S_i → ⟨S_j⟩ · S_i = m S_i^z (Weiss molecular
        field approximation). Each spin sees an effective field H_eff = H + λm where
        λ = 2zJ/(g μ_B)² is the Weiss constant (z = coordination number).
      </p>

      <p>
        Self-consistency equation: m = B_J(g μ_B J H_eff/(k_BT)).
        Curie temperature: T_C = 2zJ J(J+1)/(3k_B) (for J→1/2 Ising: T_C = zJ/(2k_B)).
      </p>

      <EqNumbered number="MG.3">T_C = 2zJ J(J+1)/(3k_B) &nbsp;&nbsp;&nbsp; (Curie-Weiss temperature, mean field)</EqNumbered>

      <p>
        Below T_C: spontaneous magnetization m ≠ 0. Near T_C: m ∝ (T_C − T)^β with mean-field
        β = 1/2. Actual 3D Ising: β ≈ 0.326 (fluctuations matter). Curie-Weiss law above T_C:
        χ = C/(T − T_C).
      </p>

      <WorkedExample number="MG.1" title="Iron Ferromagnetism — Curie Temperature">
        <p>
          Iron has T_C = 1043 K, spin S = 1, g ≈ 2.2, BCC lattice (z = 8).
          Estimate J from mean-field theory and compare to the actual exchange energy.
        </p>
        <Step label="Mean-field:">T_C = 2zJ S(S+1)/(3k_B). With S=1, z=8: T_C = 2×8×J×2/(3×1.38×10⁻²³).</Step>
        <Step label="Solve for J:">J = 3k_B T_C/(2zS(S+1)) = 3×1.38×10⁻²³×1043/(2×8×1×2) = 4.31×10⁻²⁰/32 = 1.35×10⁻²¹ J = 0.0084 eV.</Step>
        <Step label="Compare:">This is the effective exchange per bond. The actual 3d exchange in Fe is ~100 meV — 10× larger. Mean-field overestimates T_C by including all fluctuations as if they all point in the mean-field direction. Actual quantum Monte Carlo gives correct T_C with proper treatment of fluctuations.</Step>
        <Step label="Spin waves:">The low-T excitations of a ferromagnet are magnons — collective spin-wave modes with dispersion ω_k ∝ k² (quadratic, unlike phonons which are linear). Magnon contribution to heat capacity: C_V ∝ T^(3/2) (Bloch T^(3/2) law).</Step>
      </WorkedExample>

      <h2>MG.4 Antiferromagnetism and Frustration</h2>

      <p>
        For J &lt; 0 on a bipartite lattice (two sublattices A and B), the ground state has
        spins on A pointing up and B pointing down — <strong>antiferromagnetism</strong>.
        Néel temperature T_N = 2z|J|S(S+1)/(3k_B) (same formula as T_C).
        Neutron scattering (magnetic Bragg peaks) detects the antiferromagnetic order.
      </p>

      <p>
        <strong>Geometric frustration</strong>: on a triangular or kagome lattice, you cannot
        simultaneously satisfy all antiferromagnetic bonds. For three spins on a triangle:
        two can be antiparallel but the third cannot be antiparallel to both. This frustration
        prevents conventional magnetic order and can give rise to:
      </p>

      <p>
        <strong>Spin liquid</strong>: highly entangled state with no long-range order even at
        T = 0. Ground state is a superposition of many configurations (resonating valence bonds,
        proposed by Anderson 1973 for high-T_c). Characterized by fractional excitations
        (spinons) and topological order. Candidate materials: herbertsmithite (ZnCu₃(OH)₆Cl₂),
        RVB models of cuprate superconductors.
      </p>

      <h2>MG.5 Spin Dynamics and NMR</h2>

      <p>
        A spin in a magnetic field H precesses (Larmor precession):
      </p>

      <EqNumbered number="MG.4">dS/dt = γ S × H &nbsp;&nbsp;&nbsp; (Larmor precession, γ = gyromagnetic ratio)</EqNumbered>

      <p>
        For protons: γ = 2.675×10⁸ rad/(s·T) → Larmor frequency ν_L = γH/(2π).
        At H = 3 T (clinical MRI): ν_L = 127 MHz (RF range).
      </p>

      <p>
        <strong>NMR (Nuclear Magnetic Resonance):</strong> RF pulse at ν_L tips the magnetization.
        Relaxation times T₁ (longitudinal, spin-lattice) and T₂ (transverse, spin-spin) encode
        local chemical environment. <strong>MRI</strong> adds a gradient field to encode spatial
        position in the Larmor frequency: frequency encodes location. Fourier transform of FID
        (free induction decay) → image. Nobel Prizes: Bloch & Purcell 1952, Lauterbur &
        Mansfield 2003.
      </p>

      <Definition number="MG.1" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Magnetization is material response:</strong> it is not the same quantity as applied H or total B.</li>
          <li><strong>Exchange is quantum mechanical:</strong> ferromagnetism is not caused by classical dipole alignment alone.</li>
          <li><strong>Domains reduce magnetic energy:</strong> a demagnetized sample can still have ordered domains.</li>
          <li><strong>Curie temperature marks collective order:</strong> above it, thermal disorder destroys spontaneous magnetization.</li>
        </ul>
      </Definition>

      <PracticeProblems section="MG.1–MG.5 Magnetism">
        <InteractiveProblem n={1} difficulty="easy"
          answer={0.2e-3} unit="eV" tolerance={0.1}
          hints={['From mean-field: T_C = 2zJS(S+1)/(3k_B), solve for J with z=12, S=7/2, T_C=292 K', 'J = 3k_B T_C / (2 × 12 × (7/2) × (9/2)); convert joules to eV by dividing by 1.6×10⁻¹⁹']}
          problemText="Gadolinium (J = 7/2, g = 2) has T_C = 292 K. Use the mean-field Curie-Weiss formula T_C = 2zJS(S+1)/(3k_B) with z = 12 to estimate the exchange integral J in meV."
          solution={<>Curie-Weiss law: χ = C/(T−T_C) above T_C. Plot 1/χ vs T → straight line with x-intercept at T_C and slope 1/C. Curie constant C = Nμ₀g²μ_B²J(J+1)/(3k_B) per mole. For Gd (S=7/2, L=0, J=7/2, g=2): C = 6.02×10²³×4π×10⁻⁷×4×(9.274×10⁻²⁴)²×(7/2)(9/2)/(3×1.38×10⁻²³) ≈ 7.82 emu·K/mol. T_C(Gd) = 292 K (measured). From Curie-Weiss: T_C = 2zJS(S+1)/(3k_B). For HCP Gd (z=12): J = 3×1.38×10⁻²³×292/(2×12×7/2×9/2) = 1.21×10⁻²⁰/378 = 3.2×10⁻²³ J = 0.2 meV. This is the nearest-neighbor RKKY exchange (itinerant electrons mediate the 4f-4f interaction): J_RKKY ∝ cos(2k_F r)/(k_F r)³ — oscillatory with distance. Measurements: χ vs T measured by SQUID (superconducting quantum interference device), sensitive to 10⁻¹² emu.</>}>
          Gadolinium (Gd³⁺, J = 7/2, g = 2) has T_C = 292 K. Use the Curie-Weiss law to estimate the exchange integral J for a z = 12 lattice. What is the Curie constant?
        </InteractiveProblem>

        <Problem n={2} difficulty="medium"
          solution={<>Spin wave (magnon) dispersion for Heisenberg ferromagnet H = −J Σ S_i·S_j. Linear spin-wave theory: expand around classical ferromagnetic ground state |↑↑...↑⟩. Holstein-Primakoff: S+ = √(2S) a (for S=1/2: S+ = a, Sz = 1/2 − a†a). Magnon dispersion: ℏω_k = 2S J(1−γ_k) where γ_k = (1/z)Σ_δ e^(ik·δ) (structure factor, δ=nearest neighbor vectors). At small k (long wavelength): γ_k ≈ 1 − (ka)²/2 (for simple cubic) → ω_k = SJ(ka)². Quadratic dispersion ω ∝ k² (contrast phonons: ω = ck, linear). Magnon density of states: g(ω) ∝ ω^(1/2) (in 3D, from ω ∝ k²). Heat capacity: C = dU/dT where U = ∫ℏω g(ω) n_B(ω) dω, n_B = 1/(e^(ℏω/k_BT)−1). For ω ∝ k²: C ∝ T^(3/2) (Bloch T^(3/2) law). For k → 0: ω_k → 0 (Goldstone mode from broken O(3) symmetry). This is why ferromagnets have T^(3/2) heat capacity at low T, unlike antiferromagnets (linear dispersion → T³).</>}>
          Derive the magnon dispersion ω_k ∝ k² for a Heisenberg ferromagnet and show that the low-temperature heat capacity is C ∝ T^(3/2).
        </Problem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={127.7e6} unit="Hz" tolerance={0.02}
          hints={['Larmor frequency: ν_L = γH₀/(2π) with γ = 2.675×10⁸ rad/(s·T)', 'At H₀ = 3 T: ν_L = 2.675×10⁸ × 3 / (2π)']}
          problemText="Calculate the proton Larmor frequency (in MHz) at a clinical MRI field of H₀ = 3 T, given γ = 2.675×10⁸ rad/(s·T)."
          solution={<>MRI signal: magnetization M₀ = χ H₀ ∝ H₀/T. At H₀ = 3 T: ν_L = γ H₀/(2π) = 2.675×10⁸×3/(2π) = 127.7 MHz. Signal (from Faraday induction): V ∝ ω_L M₀ ∝ H₀². SNR ∝ H₀^(7/4) (including noise from coil resistance). At H₀=7T (research): SNR ∝ (7/3)^(7/4) = 2.33^(7/4) ≈ 4.6× better than 3T. Spatial encoding: gradient G_z applied → ν(z) = γ(H₀+G_z z)/(2π). RF pulse at ν(z₀) → selects slice at z₀. Phase encoding: gradient G_y for time τ → phase = γ G_y y τ. Frequency encoding: G_x during readout → ν(x) = γ(H₀+G_x x)/(2π). FID signal: S(t) = ∫∫ ρ(x,y) e^(iγG_x x t) e^(iφ_y(y)) e^(−t/T₂*) dx dy. 2D Fourier transform → image. Resolution: Δx = 1/(γ G_x T_acq). For G_x = 10 mT/m, T_acq = 10 ms: Δx = 1/(2.675×10⁸×0.01×0.01) = 0.37 mm.</>}>
          Explain the physics of MRI. How does spatial encoding work? Why does SNR scale as H₀²? What is achievable resolution at 3 T?
        </InteractiveProblem>

        <Problem n={4} difficulty="hard"
          solution={<>Kitaev honeycomb model: spin-1/2 on a honeycomb lattice. H = −J_x Σ_x K^x_j K^x_k − J_y Σ_y K^y_j K^y_k − J_z Σ_z K^z_j K^z_k. Each bond has a direction-dependent Ising-like coupling. Exact solution: map to Majorana fermions c_j (Jordan-Wigner extended). Each site: two Majoranas a_j, b_j with c_j = ia_j b_j. Define link variables u_(jk) = ib_j b_k for each bond (conserved quantities, Z₂ gauge field). In the flux-free sector (u=+1): H_Majorana = free Majorana fermion hopping. Dispersion: for J_x=J_y=J_z=J: Dirac cones at K, K' points (gapless). For J_z ≫ J_x,J_y: gapped phase. The gapless phase has topological nature: non-Abelian anyons in the vortex sector. Physical realization: α-RuCl₃, Na₂IrO₃ (strong spin-orbit, honeycomb). Signatures: fractionalization of neutron scattering response (no magnon peak), spin-1/2 continuum. Nobel candidate work (Kitaev 2003).</>}>
          Describe the Kitaev honeycomb model and its exact solution via Majorana fermions. Why is this a quantum spin liquid and what physical materials realize it?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Paramagnetism: M = N gμ_B J B_J(x). Curie law χ = C/T at high T. Saturation at low T.',
        'Exchange interaction J: J>0 ferromagnet, J<0 antiferromagnet. From wavefunction overlap + Pauli.',
        'Curie temperature: T_C = 2zJS(S+1)/(3k_B) from mean field. Curie-Weiss: χ = C/(T−T_C).',
        'Magnon dispersion: ω ∝ k² (ferromagnet). Low-T heat capacity C ∝ T^(3/2) (Bloch).',
        'Frustration (triangular/kagome): prevents long-range order → quantum spin liquid, fractional excitations.',
        'Larmor precession: dS/dt = γS×H. NMR/MRI uses ω_L = γH to probe matter.',
      ]} />
    </div>
  );
}
