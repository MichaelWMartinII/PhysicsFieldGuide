import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function ManyBodyPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Advanced Topics</div>
      <h1>Many-Body Quantum Physics</h1>
      <p className="subtitle">
        Interacting quantum systems of many particles exhibit emergent phenomena —
        superconductivity, the Mott transition, the fractional quantum Hall effect —
        that cannot be understood from single-particle physics. Second quantization,
        Green&apos;s functions, and diagrammatic methods are the essential tools.
      </p>

      <Prerequisites items={['Quantum mechanics (Ch. QM)', 'Statistical mechanics (Ch. SM)', 'Solid-state physics (Ch. SS)', 'QFT basics (Ch. QFT)']} />

      <LearningGoals items={[
        'Write the electron-electron Coulomb interaction in second-quantized form and identify Hartree and Fock contributions.',
        'Derive the RPA dielectric function and the Thomas-Fermi screening length from the static Lindhard function.',
        'Explain the Hubbard model and the Mott insulator transition in terms of U/t ratio.',
        'Interpret the spectral function A(k,ω) and the quasiparticle weight Z_k in Fermi liquid theory.',
        'State the Laughlin wavefunction for filling ν = 1/m and explain fractional charge using the plasma analogy.',
      ]} />

      <h2>MB.1 Second Quantization</h2>

      <p>
        For N identical particles, the Fock space formalism is more natural than
        first quantization. Creation and annihilation operators:
      </p>

      <p>
        <strong>Bosons</strong>: [b_k, b†_(k')] = δ_(kk'), [b_k, b_(k')] = 0.
        <strong>Fermions</strong>: {'{'}c_k, c†_(k'){'}'} = δ_(kk'), {'{'}c_k, c_(k'){'}'} = 0 (anticommutators).
        The Pauli exclusion principle is automatic: (c†_k)² = 0 (can&apos;t create two fermions in same state).
      </p>

      <p>
        The Hamiltonian in second quantization:
      </p>

      <EqNumbered number="MB.1">H = Σ_(kσ) ε_k c†_(kσ) c_(kσ) + ½ Σ_(k,k',q,σ,σ') V_q c†_(k+q,σ) c†_(k'−q,σ') c_(k',σ') c_(k,σ)</EqNumbered>

      <p>
        The first term is kinetic energy; the second is the two-body interaction in momentum space.
        For the Coulomb interaction V_q = e²/(ε₀ q²) in 3D.
      </p>

      <h2>MB.2 Hartree-Fock Theory</h2>

      <p>
        The simplest variational ansatz: a Slater determinant |ΦHF⟩ = Π_(k∈occ) c†_k |0⟩.
        Variation gives the <strong>Hartree-Fock equations</strong>:
      </p>

      <EqNumbered number="MB.2">[−ℏ²∇²/(2m) + V_H(r) + V_X] ψ_k(r) = ε_k ψ_k(r)</EqNumbered>

      <p>
        where V_H = ∫ n(r') e²/(4πε₀|r−r'|) d³r' (Hartree, electrostatic) and V_X is the
        non-local Fock exchange operator. For the homogeneous electron gas: exchange
        energy per electron E_X/N = −(3e²)/(4π)(3/π)^(1/3) r_s^(−1) (in Rydberg units),
        where r_s = (3/(4πn))^(1/3) a₀ is the Wigner-Seitz radius.
      </p>

      <Definition number="MB.1" title="Hubbard Model">
        The single-band Hubbard model captures the competition between kinetic energy
        (hopping t) and on-site Coulomb repulsion (U):
        H = −t Σ_(⟨ij⟩,σ) c†_(iσ) c_(jσ) + U Σ_i n_(i↑) n_(i↓)
        At half-filling (one electron per site): for U/t ≫ 1, hopping is suppressed →
        Mott insulator. For U/t ≪ 1: metallic (Fermi liquid). The Mott transition at
        intermediate U/t is a paradigmatic strongly correlated problem — not captured by HF.
      </Definition>

      <h2>MB.3 Green&apos;s Functions and Self-Energy</h2>

      <p>
        The single-particle Green&apos;s function encodes excitation properties:
      </p>

      <EqNumbered number="MB.3">G(k, ω) = 1/(ω − ε_k − Σ(k,ω) + iη) &nbsp;&nbsp;&nbsp; (Dyson equation: G = G₀ + G₀ Σ G)</EqNumbered>

      <p>
        The <strong>self-energy</strong> Σ(k, ω) encodes all interaction effects.
        The spectral function A(k, ω) = −(1/π) Im G(k, ω+iη) gives the probability of
        creating an excitation with momentum k and energy ω. For a Fermi liquid:
        A(k, ω) = Z_k δ(ω − ε_k*) + incoherent background, where Z_k is the quasiparticle weight.
      </p>

      <p>
        <strong>Fermi liquid theory</strong> (Landau): despite interactions, the low-energy
        excitations of a metallic system are quasiparticles — dressed electrons with
        renormalized mass m* and finite lifetime τ ∝ (ε − ε_F)^(−2). This justifies
        band theory for metals. Fails when: Mott insulator (strong U), non-Fermi liquids
        (1D Luttinger liquid, strange metal in cuprates, heavy fermions).
      </p>

      <WorkedExample number="MB.1" title="RPA Screening and the Plasmon">
        <p>
          In the random phase approximation (RPA), compute the dielectric function ε(q, ω)
          for the electron gas. Find the plasmon dispersion.
        </p>
        <Step label="Bare polarization:">Lindhard function: Π₀(q, ω) = 2Σ_k (f_(k+q) − f_k)/(ω − ε_(k+q) + ε_k + iη). At q→0, ω→0: Π₀ → −N(0) (density of states at E_F). At q→0, finite ω: Π₀ → −n_e q²/(mω²) (Thomas-Fermi limit).</Step>
        <Step label="RPA dielectric function:">ε(q,ω) = 1 − V_q Π₀(q,ω) where V_q = e²/(ε₀ q²). ε(q,ω) = 1 + (e²/(ε₀ q²)) N(0) at static long-wavelength → Thomas-Fermi screening: ε = 1 + q_TF²/q² where q_TF² = e² N(0)/ε₀.</Step>
        <Step label="Plasmon:">Poles of G_screened at ε(q,ω) = 0. At q→0: ε(q,ω) = 1 − ω_p²/ω² where ω_p² = n_e e²/(ε₀ m). Plasmon frequency: ω = ω_p (independent of q at long wavelength). For metals: ω_p ~ 10 eV (UV plasma edge — why metals reflect below ω_p and transmit above for ω &gt; ω_p). Dispersion at small q: ω = ω_p + (3v_F²/(10ω_p))q² + O(q⁴). The plasmon is a gapped collective mode (Goldstone if long-range forces were absent).</Step>
        <Step label="Screening length:">Screened potential: V_scr = V_q/ε(q) → V(r) = (e²/r) e^(−q_TF r) (Yukawa). Thomas-Fermi screening length: λ_TF = 1/q_TF. For Cu: n_e = 8.4×10²⁸ m⁻³, N(0) = (3/2)n/E_F ≈ 1.51×10⁴⁷ J⁻¹m⁻³. λ_TF ≈ 0.55 Å — very short screening in metals.</Step>
      </WorkedExample>

      <h2>MB.4 Diagrammatic Perturbation Theory</h2>

      <p>
        The self-energy and correlation functions can be expanded in Feynman diagrams.
        At the Hartree-Fock level: Σ_HF = Σ_direct + Σ_exchange.
        Beyond HF: the GW approximation Σ = iG W (W = screened Coulomb interaction from RPA)
        is the standard first-principles method for band gaps in semiconductors.
      </p>

      <p>
        <strong>Linked-cluster theorem</strong>: only connected diagrams contribute to extensive
        quantities (free energy, self-energy). Unlinked (vacuum bubble) diagrams cancel
        between numerator and denominator in perturbation theory — this is what makes
        many-body perturbation theory tractable.
      </p>

      <p>
        <strong>Quantum Monte Carlo</strong> (QMC): stochastic evaluation of the many-body
        path integral. Variational MC (VMC): optimize a trial wavefunction (Jastrow factor
        × Slater determinant). Diffusion MC (DMC): project to ground state via e^(−τH).
        Sign problem for fermions (cancellations between ± signs) is the fundamental bottleneck.
        Fixed-node approximation: constrain to same nodal surface as trial function.
      </p>

      <h2>MB.5 Correlated Phases</h2>

      <p>
        <strong>Mott insulator → superfluid transition</strong> (Bose-Hubbard model in optical lattice):
        at integer filling, for U/t &gt; z×5.83: Mott lobes in the phase diagram.
        Jaksch et al. (1998) predicted; Greiner et al. (2002) observed with ultracold bosons
        in an optical lattice — quantum phase transition at T = 0.
      </p>

      <p>
        <strong>Fractional quantum Hall effect</strong> (FQHE): at ν = 1/3 (and other fractions),
        the ground state is the Laughlin wavefunction Ψ = Π_(i&lt;j) (z_i − z_j)^m e^(−Σ|z_k|²/4ℓ²)
        (m = 3 for ν=1/3). Excitations carry fractional charge e/3 and obey fractional statistics
        (anyons). Topological order — no local order parameter.
      </p>

      <p>
        <strong>High-T_c superconductors</strong>: cuprates (La₂CuO₄ doped with Sr) have T_c up to 138 K.
        Undoped: Mott insulator (half-filled Cu 3d band, strong U). Doped: d-wave superconductivity
        (gap Δ_k = Δ₀(cos k_x − cos k_y)), pseudogap phase, strange metal. Not fully explained.
      </p>

      <Definition number="MB.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Mean field replaces interactions with averages:</strong> it can miss correlations and fluctuations.</li>
          <li><strong>Quasiparticles are emergent excitations:</strong> they are not always bare particles.</li>
          <li><strong>Green&apos;s functions encode response:</strong> poles, residues, and spectral weight all matter.</li>
          <li><strong>Strong coupling often needs new methods:</strong> weak perturbation can fail qualitatively.</li>
        </ul>
      </Definition>

      <PracticeProblems section="MB.1–MB.5 Many-Body Physics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={10} unit="eV" tolerance={0.30}
          hints={[
            'The plasmon frequency is ω_p = √(n_e e²/(ε₀ m_e)). For a typical metal n_e ~ 10²⁸–10²⁹ m⁻³, giving ω_p in the UV range.',
            'Convert ω_p from rad/s to eV using ℏω_p. For Cu with n_e = 8.4×10²⁸ m⁻³, ω_p ≈ 1.6×10¹⁶ rad/s ≈ 10 eV.',
          ]}
          problemText="Write the electron-electron Coulomb interaction in second-quantized form. Identify the Hartree and Fock contributions. Using n_e = 8.4×10²⁸ m⁻³ for copper, estimate the plasmon energy ℏω_p in eV."
          solution={<>Second quantization: electron-electron Coulomb interaction. In first quantization: H_ee = ½ Σ_(i≠j) e²/(4πε₀|r_i - r_j|). Fourier expand: 1/|r-r'| = (1/V) Σ_q (4π/q²) e^(iq·(r-r')). In second quantization: H_ee = ½ Σ_(q≠0, σ, σ') (e²/(ε₀ V q²)) c†_(k+q,σ) c†_(k'-q,σ') c_(k',σ') c_(k,σ). The q=0 term is the neutralizing background (jellium model). Normal ordering eliminates self-interaction. Hartree term: k' = k, σ' = σ gives constant (uniform background). Exchange (Fock) term: swapping k↔k', σ↔σ'. Coulomb hole + screened exchange = GW. Physical meaning: the Fock term lowers the energy for parallel spins because the antisymmetric wavefunction keeps parallel-spin electrons apart (exchange-correlation hole). Exchange energy ~ -0.916/r_s Ry for the electron gas (per electron). Plasmon energy for Cu: ω_p = √(n_e e²/(ε₀ m_e)) = √(8.4×10²⁸ × (1.6×10⁻¹⁹)² / (8.85×10⁻¹² × 9.11×10⁻³¹)) ≈ 1.64×10¹⁶ rad/s → ℏω_p ≈ 10.8 eV ~ 10 eV.</>}>
          Write the electron-electron Coulomb interaction in second-quantized form. Identify the Hartree and Fock (exchange) contributions and give their physical interpretations.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={0.55} unit="Å" tolerance={0.10}
          hints={[
            'Thomas-Fermi screening length: λ_TF = 1/q_TF where q_TF² = e² N(0)/ε₀ and N(0) = (3/2)n_e/E_F.',
            'For Cu: n_e = 8.4×10²⁸ m⁻³, E_F ≈ 7.0 eV. Compute N(0), then q_TF, then λ_TF = 1/q_TF in Å.',
          ]}
          problemText="Derive the Thomas-Fermi screening length λ_TF from the static Lindhard function at long wavelengths. Calculate λ_TF in Å for copper (n_e = 8.4×10²⁸ m⁻³, E_F = 7.0 eV). What are Friedel oscillations?"
          solution={<>Lindhard function and static screening at q≪k_F: Π₀(q,0) at T=0. ε(k+q) - ε(k) ≈ ℏ²k·q/m. Π₀(q,0) = 2Σ_k (f_(k+q)-f_k)/(ε(k+q)-ε(k)) ≈ 2Σ_k (∂f/∂ε)(q·∂ε/∂k) / (q·ℏ²k/m). For small q: Π₀ → -N(0) where N(0) = mk_F/(π²ℏ²) is the DOS at E_F. Dielectric function: ε(q) = 1 + (e²/(ε₀q²))N(0) = 1 + q_TF²/q². For q≫q_TF: ε→1 (unscreened). For q≪q_TF: ε≈q_TF²/q² (strong screening). Friedel oscillations: exact Lindhard at q=2k_F has a kink (logarithmic singularity in ∂Π/∂q), leading to real-space oscillation V(r) ~ cos(2k_F r)/r³. These are observable in STM images of metals as oscillations in the local density of states around impurities (Crommie et al. 1993 quantum coral). For Cu: N(0) = (3/2)×8.4×10²⁸/(7.0×1.6×10⁻¹⁹) ≈ 1.13×10⁴⁷ J⁻¹m⁻³. q_TF² = (1.6×10⁻¹⁹)²×1.13×10⁴⁷/8.85×10⁻¹² ≈ 3.27×10²⁰ m⁻² → q_TF ≈ 1.81×10¹⁰ m⁻¹ → λ_TF = 0.55 Å.</>}>
          Derive the Thomas-Fermi screening length from the static Lindhard function at long wavelengths. What are Friedel oscillations and why do they have wavevector 2k_F?
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Quasiparticle weight Z_k in Fermi liquid theory: G(k,ω) = Z_k/(ω - ε_k* - iΓ_k) + G_incoh. Spectral function: A(k,ω) = Z_k Γ_k/π/(ω-ε_k*)² + Γ_k²) (Lorentzian) + incoherent part. Z_k = (1 - ∂ReΣ/∂ω|_(ω=ε_k*))⁻¹. Fermi liquid: Z_k is finite at ε_F (0 &lt; Z &lt; 1). Lifetime: Γ_k = Z_k ImΣ(k,ε_k*) ∝ (ε_k* - ε_F)². Scattering rate ~ (kT)² + (ε-μ)² — quadratic in temperature and energy. In a non-Fermi liquid (e.g., cuprate strange metal): resistivity ρ ~ T (linear in T, not T²). Z→0 as T→0 in 1D → Luttinger liquid (no quasiparticles, only collective modes: holon + spinon). ARPES measurement: A(k,ω) directly measured. For cuprates at (π/2,π/2) (nodal direction): sharp quasiparticle peak at E_F with Z ≈ 0.3. Near (π,0) (antinodal): broad incoherent feature, large ImΣ — strongly correlated.</>}>
          Explain quasiparticle weight Z_k and the Fermi liquid lifetime τ ∝ (ε−ε_F)^(−2). How does ARPES measure the spectral function, and what signals a non-Fermi liquid?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Laughlin wavefunction: Ψ_m = Π_(i&lt;j) (z_i-z_j)^m exp(-Σ_k |z_k|²/(4ℓ²)) where z = x+iy, ℓ = √(ℏ/(eB)) is the magnetic length. For ν=1/m (m odd). Properties: (1) Analytical in z_i → all in lowest Landau level. (2) Antisymmetric for odd m (fermions). (3) Has zeros of order m when z_i → z_j (Pauli+correlations). (4) Normalization: ∫|Ψ|²d²r₁...d²r_N = 1 defines filling ν = 1/m. Quasihole at w: Ψ_qh = Π_i(z_i-w) Ψ_m. This inserts a flux quantum and has charge e* = e/m (fractional!). Proof: Aharonov-Bohm phase when quasihole circles another: γ = 2π(1/m) — fractional statistics (anyons, neither bosons nor fermions). Plasma analogy: |Ψ|² = exp(-β H_plasma) where H_plasma = -2m Σ_(i&lt;j) ln|z_i-z_j| + Σ_i |z_i|²/2ℓ² corresponds to a 2D one-component plasma at temperature β=1/m with a uniform background. In the plasma, correlations are known — used to extract structure factor and ground state energy. Energy gap above Laughlin state: Δ ≈ 0.1 e²/(ε ℓ) from numerical exact diagonalization.</>}>
          Write down the Laughlin wavefunction for filling ν = 1/m. Show it describes fractional charge e/m quasiparticles using the plasma analogy. What is the energy gap?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Fermion operators: {c_k, c†_(k\')} = δ_{kk\'} (anticommutators). (c†)² = 0 encodes Pauli exclusion.',
        'HF theory: Slater determinant ansatz. Hartree (direct Coulomb) + Fock (exchange). Misses correlations.',
        'Hubbard model: kinetic t vs on-site U. U/t ≫ 1 → Mott insulator. Half-filling + large U → antiferromagnetism.',
        'Self-energy Σ(k,ω): Dyson eq G = G₀ + G₀ Σ G. Fermi liquid: sharp quasiparticle, lifetime ~ (ε-ε_F)².',
        'RPA plasmon: collective oscillation at ω_p = √(ne²/(ε₀m)). Thomas-Fermi screening λ_TF = 1/q_TF.',
        'FQHE Laughlin state ν = 1/m: fractional charge e/m, anyonic statistics. Topological — no local order parameter.',
      ]} />
    </div>
  );
}
