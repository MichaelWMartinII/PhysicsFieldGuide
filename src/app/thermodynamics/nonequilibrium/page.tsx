import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function NonequilibriumPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#f97316' }}>Thermodynamics · Advanced Topics</div>
      <h1>Nonequilibrium Statistical Mechanics</h1>
      <p className="subtitle">
        Most of nature operates far from equilibrium — living cells, driven chemical systems,
        turbulent flows, and active matter. Nonequilibrium statistical mechanics goes beyond
        Boltzmann to characterize driven, dissipative, and fluctuating systems.
      </p>

      <Prerequisites items={['Statistical mechanics (Ch. S)', 'Irreversible processes (Ch. IR)', 'Probability (Ch. PR)', 'Differential equations (Ch. DE)']} />

      <LearningGoals items={[
        'Write the Boltzmann transport equation and explain the H-theorem as a derivation of the second law from molecular dynamics.',
        'Derive the Smoluchowski Fokker-Planck equation for a Brownian particle in a potential and identify the Einstein relation D = k_BT/(mγ).',
        'Apply Kramers\' escape-rate theory and explain the exponential sensitivity of reaction rates to barrier height ΔV.',
        'State the Jarzynski equality ⟨e^(−W/k_BT)⟩ = e^(−ΔF/k_BT) and describe how it is used to extract equilibrium free energies from irreversible pulling experiments.',
        'Write and solve the master equation for a two-state Markov chain and relate it to ion-channel gating kinetics.',
      ]} />

      <h2>NE.1 The Boltzmann Equation</h2>

      <p>
        The <strong>Boltzmann equation</strong> describes the time evolution of the one-particle
        distribution function f(r, v, t) — the probability density of finding a particle at
        position r with velocity v at time t:
      </p>

      <EqNumbered number="NE.1">∂f/∂t + v·∇_r f + (F/m)·∇_v f = (∂f/∂t)_coll &nbsp;&nbsp;&nbsp; (Boltzmann transport equation)</EqNumbered>

      <p>
        The left side is the Liouville streaming term (free evolution). The right side is the
        collision term — the rate of change of f due to two-particle collisions. For elastic
        hard-sphere collisions:
      </p>

      <EqNumbered number="NE.2">(∂f/∂t)_coll = ∫ d³v₁ dΩ σ(Ω)|v−v₁| [f(v')f(v₁') − f(v)f(v₁)]</EqNumbered>

      <p>
        where v&apos; and v₁&apos; are post-collision velocities. The Boltzmann equation assumes
        <strong>molecular chaos</strong> (Stosszahlansatz): pre-collision velocities are
        uncorrelated.
      </p>

      <Theorem number="NE.1" title="Boltzmann's H-Theorem">
        Define H = ∫ f ln f d³r d³v. Then dH/dt ≤ 0 — H always decreases (or stays constant
        in equilibrium). Since thermodynamic entropy S = −k_B H, this gives dS/dt ≥ 0 —
        the second law of thermodynamics, derived from molecular dynamics!
        <span style={{ display: 'block', marginTop: '0.5rem' }}>
          Equilibrium distribution: f = 0 in (∂f/∂t)_coll → Maxwell-Boltzmann f_eq ∝ e^(−mv²/(2k_BT)).
          The H-theorem proves that any initial distribution relaxes to Maxwell-Boltzmann.
          Controversy: it assumes time-irreversibility (molecular chaos), which is not present
          in the time-symmetric underlying mechanics — Loschmidt&apos;s paradox.
        </span>
      </Theorem>

      <h2>NE.2 The Fokker-Planck Equation</h2>

      <p>
        For a Brownian particle in a potential V(x), driven by noise, the probability
        distribution P(x, t) evolves by the <strong>Fokker-Planck equation</strong>:
      </p>

      <EqNumbered number="NE.3">∂P/∂t = ∂/∂x [P/(mγ) × dV/dx] + (k_BT/(mγ)) ∂²P/∂x² &nbsp;&nbsp;&nbsp; (Smoluchowski, overdamped)</EqNumbered>

      <p>
        where γ is the friction coefficient. The first term is drift (down the potential gradient);
        the second is diffusion (D = k_BT/(mγ) — Einstein relation). Steady-state solution:
        P_eq(x) ∝ e^(−V(x)/(k_BT)) (Boltzmann distribution).
      </p>

      <p>
        For a particle in a periodic potential tilted by a constant force F (modeling ion
        channels, molecular motors):
      </p>

      <EqNumbered number="NE.4">V(x) = V₀ sin(2πx/a) − Fx &nbsp;&nbsp;&nbsp; (tilted washboard potential)</EqNumbered>

      <p>
        Below a critical force F_c = πV₀/a: particle is trapped (locked). Above F_c: particle
        drifts (running). The transition is a <strong>saddle-node bifurcation</strong>.
        Thermal fluctuations allow escape (Kramers theory) at rate Γ = ω₀ ω_b/(2πγ) × e^(−ΔV/k_BT).
      </p>

      <WorkedExample number="NE.1" title="Escape Rate from a Potential Well — Kramers Theory">
        <p>
          Estimate the thermal escape rate of a molecule from a potential well of depth ΔV = 1 eV
          at T = 300 K.
        </p>
        <Step label="Kramers rate:">Γ = (ω_min ω_max)/(2πγ) × e^(−ΔV/(k_BT)) for overdamped case. Here ω_min and ω_max are the frequencies at the minimum and saddle point.</Step>
        <Step label="Exponent:">ΔV/(k_BT) = 1.6×10⁻¹⁹/(1.38×10⁻²³×300) = 1.6×10⁻¹⁹/4.14×10⁻²¹ = 38.6. This is a huge number.</Step>
        <Step label="Rate:">e^(−38.6) ≈ 2×10⁻¹⁷. For a molecular oscillation frequency ω₀ ∼ 10¹³ s⁻¹ (infrared): Γ ≈ 10¹³ × 2×10⁻¹⁷ = 2×10⁻⁴ s⁻¹. Escape time τ ≈ 5000 s ≈ 1.4 hours.</Step>
        <Step label="Sensitivity:">ΔV = 0.5 eV: e^(−19.3) ≈ 4×10⁻⁹, Γ ≈ 4×10⁴ s⁻¹, τ ≈ 25 μs. Factor 2 in barrier → 10²⁰ change in rate! Chemical kinetics (Arrhenius) and protein folding both governed by this exponential sensitivity.</Step>
      </WorkedExample>

      <h2>NE.3 Fluctuation Theorems</h2>

      <p>
        For systems driven out of equilibrium, exact relations hold between fluctuations
        of the entropy production σ over a time interval τ:
      </p>

      <EqNumbered number="NE.5">P(σ_τ = A) / P(σ_τ = −A) = e^A &nbsp;&nbsp;&nbsp; (Crooks fluctuation theorem)</EqNumbered>

      <p>
        Entropy-decreasing trajectories (σ &lt; 0) exist — they&apos;re just exponentially rare.
        The second law follows on average: ⟨σ⟩ ≥ 0.
      </p>

      <p>
        The <strong>Jarzynski equality</strong> (1997) relates the free energy difference ΔF
        between equilibrium states to the work W done in a non-equilibrium process:
      </p>

      <EqNumbered number="NE.6">⟨e^(−W/(k_BT))⟩ = e^(−ΔF/(k_BT)) &nbsp;&nbsp;&nbsp; (Jarzynski equality)</EqNumbered>

      <p>
        This is remarkable: ΔF (an equilibrium quantity) can be extracted from
        non-equilibrium work measurements — even if the process is irreversible. Verified
        by single-molecule RNA unfolding experiments (Liphardt et al., 2002, Science).
        Jensen&apos;s inequality W ≥ ΔF follows immediately (second law).
      </p>

      <h2>NE.4 Stochastic Thermodynamics</h2>

      <p>
        Stochastic thermodynamics extends thermodynamic concepts to individual stochastic
        trajectories. For a single molecule following path x(t) in time [0, τ]:
      </p>

      <p>
        <strong>Trajectory entropy</strong>: s(t) = −k_B ln P(x(t), t).
        <strong>Medium entropy</strong>: δs_med = −δQ/T (heat exchanged with bath).
        <strong>Total entropy production</strong>: Δs_tot = Δs + Δs_med ≥ 0 (along any trajectory).
      </p>

      <p>
        <strong>Active matter</strong>: driven systems with local energy input — bacteria,
        bird flocks, cytoskeleton. Self-propelled particles break detailed balance at the
        microscopic level. Flocking (Vicsek model): polar order emerges above a density
        threshold — a non-equilibrium phase transition with no equilibrium analog.
      </p>

      <Definition number="NE.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>The Boltzmann equation assumes molecular chaos:</strong> irreversibility enters through the collision assumption, not Newton&apos;s laws alone.</li>
          <li><strong>Fokker-Planck describes distributions:</strong> it is not one particle trajectory but the evolution of probability density.</li>
          <li><strong>Rare trajectories matter in Jarzynski averages:</strong> the exponential average is dominated by unusually low-work samples.</li>
          <li><strong>Detailed balance is an equilibrium condition:</strong> active matter and driven steady states usually break it.</li>
        </ul>
      </Definition>

      <PracticeProblems section="NE.1–NE.4 Nonequilibrium Stat Mech">
        <Problem n={1} difficulty="easy"
          solution={<>Chapman-Enskog expansion: expand f = f_eq(1 + φ) where φ is small. To first order in gradients: φ ∝ viscous stress and heat flux. The Navier-Stokes equations emerge as the hydrodynamic limit of the Boltzmann equation. Transport coefficients from Boltzmann: viscosity η = (5/16)√(πmk_BT) / (πd²) (hard spheres diameter d). Thermal conductivity κ = (25/32)√(πk_B³T/m) / (πd²). Prandtl number Pr = η c_p/κ = 2/3 (hard spheres). For argon (d ≈ 3.4 Å, m = 40u, T = 300K): η ≈ 2.2×10⁻⁵ Pa·s (experimental: 2.27×10⁻⁵). This is the kinetic theory derivation of viscosity without phenomenological input. Fails at high density (more particle correlations needed → BBGKY hierarchy) and in rarefied gases with Knudsen number Kn = l_mfp/L &gt; 0.01.</>}>
          Show how the Boltzmann equation yields Navier-Stokes equations in the hydrodynamic limit. What determines the shear viscosity of a dilute gas?
        </Problem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={2.2e-13} unit="m²/s" tolerance={0.1}
          hints={['Use the Einstein-Stokes formula: D = k_BT / (6π η R).', 'With k_B = 1.38×10⁻²³ J/K, T = 300 K, η_water = 10⁻³ Pa·s, R = 1×10⁻⁶ m.']}
          problemText="Calculate the diffusion coefficient D (m²/s) for a pollen grain of radius R = 1 μm in water at T = 300 K. (η_water = 1e-3 Pa·s)"
          solution={<>Langevin equation: m dv/dt = −mγv + ξ(t) where ξ is Gaussian white noise: ⟨ξ(t)⟩ = 0, ⟨ξ(t)ξ(t')⟩ = 2mγk_BT δ(t−t') (fluctuation-dissipation theorem, fixes noise amplitude). Solution: v(t) = v₀ e^(−γt) + ∫(0 to t) e^(−γ(t−t')) ξ(t')/m dt'. Velocity autocorrelation: ⟨v(t)v(0)⟩ = ⟨v²⟩ e^(−γt) = k_BT/m × e^(−γt) (equipartition at t=0). Mean square displacement: ⟨x²⟩ = 2∫(0 to t) dt' ∫(0 to t') dt'' ⟨v(t')v(t'')⟩. For t ≫ 1/γ: ⟨x²⟩ → 2(k_BT/(mγ))t = 2Dt where D = k_BT/(mγ) (Einstein-Stokes). For t ≪ 1/γ (ballistic): ⟨x²⟩ → (k_BT/m)t². Crossover at t* = 1/γ. For pollen in water (R=1μm, T=300K): D = k_BT/(6πηR) = 2.2×10⁻¹³ m²/s. γ = k_BT/(mD) = 6πηR/m ≈ 10⁶ s⁻¹. Ballistic time t* = 1 μs.</>}>
          Solve the Langevin equation for a Brownian particle and find ⟨x²(t)⟩. Show the crossover from ballistic to diffusive behavior. Calculate D (m²/s) for a 1 μm pollen grain in water at 300 K.
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Jarzynski equality: ⟨e^(−W/k_BT)⟩ = e^(−ΔF/k_BT). Application to RNA hairpin unfolding: equilibrium: ΔF = −k_BT ln(Z_unfolded/Z_folded). Non-equilibrium experiment: pull RNA at various speeds v. Slow pull: W ≈ ΔF (quasi-reversible, small dissipation). Fast pull: W ≫ ΔF (large dissipation, irreversible). To apply Jarzynski: collect many trajectories, compute ⟨e^(−W/k_BT)⟩ = e^(−ΔF/k_BT) → ΔF = −k_BT ln⟨e^(−W/k_BT)⟩. The exponential average weights rare low-W trajectories exponentially more → need many samples. Bias: for fast pulls, need ∼10³-10⁶ samples for convergence. Bennett acceptance ratio (BAR) is more efficient. Experimental issue: optical tweezers calibration, feedback time, non-ideal harmonic trap. The Liphardt experiment (2002): ΔF from Jarzynski agrees with equilibrium ΔF within 2%. Demonstrated thermodynamics at the single-molecule level.</>}>
          Describe the Jarzynski equality. How was it applied to single-molecule RNA unfolding experiments? What are the practical challenges in extracting ΔF from non-equilibrium work measurements?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Master equation for a two-state system (e.g., ion channel: closed ↔ open). State probabilities P₀(t) and P₁(t). Transition rates k₊ (closed→open), k₋ (open→closed). Master equation: dP₁/dt = k₊ P₀ − k₋ P₁ = k₊(1−P₁) − k₋ P₁. Steady state: P₁* = k₊/(k₊+k₋), P₀* = k₋/(k₊+k₋). Approach to steady state: P₁(t) = P₁* + (P₁(0)−P₁*) e^(−(k₊+k₋)t). Relaxation time τ = 1/(k₊+k₋). Detailed balance: k₊ P₀* = k₋ P₁* ✓. For more states (Markov chain): d𝐩/dt = W𝐩 where W is the rate matrix. Perron-Frobenius: largest eigenvalue 0, all others negative → steady state is unique. Chemical kinetics, protein folding, single-molecule fluorescence all described by master equations. Gillespie algorithm: exact stochastic simulation of chemical master equation (used in systems biology for gene expression noise).</>}>
          Write and solve the master equation for a two-state Markov chain. Show the relaxation to steady state. How does this describe ion channel gating?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Boltzmann equation: ∂f/∂t + v·∇f + (F/m)·∇_v f = collision term. H-theorem: dH/dt ≤ 0 → 2nd law.',
        'Fokker-Planck: ∂P/∂t = −∂(drift·P)/∂x + D ∂²P/∂x². Steady state: Boltzmann distribution.',
        'Kramers rate: Γ ∝ e^(−ΔV/k_BT). Exponential sensitivity to barrier height — controls chemistry.',
        'Jarzynski: ⟨e^(−W/k_BT)⟩ = e^(−ΔF/k_BT). Extract equilibrium ΔF from irreversible work.',
        'Crooks theorem: P(σ)/P(−σ) = e^σ. Second law (⟨σ⟩≥0) is a statement about fluctuation asymmetry.',
        'Master equations describe stochastic kinetics: protein folding, ion channels, gene expression.',
      ]} />
    </div>
  );
}
