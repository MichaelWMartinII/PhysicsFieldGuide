import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function BiophysicsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Advanced Topics</div>
      <h1>Biophysics</h1>
      <p className="subtitle">
        Physics provides the quantitative framework for understanding biological systems —
        from the mechanics of molecular motors to the statistical physics of protein folding,
        from the electrophysiology of neurons to the optics of the eye. Life operates at
        the boundary between order and thermal chaos.
      </p>

      <Prerequisites items={['Statistical mechanics (Ch. S)', 'Fluid mechanics (Ch. FM)', 'Irreversible processes (Ch. IR)', 'Probability (Ch. PR)']} />

      <LearningGoals items={[
        'Apply the worm-like chain model to compute the force-extension curve of DNA and identify the entropic spring regime.',
        'Compare diffusion timescales with active motor transport to explain why neurons require kinesin-based transport.',
        'Explain the funnel energy landscape and Kramers rate theory as resolutions to the Levinthal paradox for protein folding.',
        'Derive the resting membrane potential from the Goldman equation and describe the Hodgkin-Huxley action potential mechanism.',
        'Interpret the Hill equation for cooperative binding and explain how cooperativity enables hemoglobin to load and unload O₂.',
      ]} />

      <h2>BP.1 Forces at the Molecular Scale</h2>

      <p>
        Biological molecules operate in the thermal energy scale k_BT ≈ 4.1 pN·nm (at 310 K).
        Forces in biology:
      </p>

      <p>
        <strong>Thermal forces:</strong> kT/ℓ ≈ 4 pN for ℓ = 1 nm. Dominates at nanoscale.
        <strong>Chemical bonds:</strong> covalent ~1 nN (GPa range), hydrogen bonds ~5–50 pN.
        <strong>Motor forces:</strong> kinesin 5–7 pN, myosin ~3 pN (optical trap measurements).
        <strong>DNA mechanics:</strong> persistence length ℓ_p = 50 nm (double-stranded DNA).
        The worm-like chain (WLC) model:
      </p>

      <EqNumbered number="BP.1">F = k_BT/(2 ℓ_p) × [x/L + 1/(4(1−x/L)²) − 1/4] &nbsp;&nbsp;&nbsp; (WLC force-extension, DNA)</EqNumbered>

      <p>
        where x is extension and L is contour length. At small extension: F ≈ k_BT x/(ℓ_p L)
        (entropic spring). At near full extension: F ≈ k_BT/(4ℓ_p (1−x/L)²) (diverges as x→L).
      </p>

      <h2>BP.2 Molecular Motors</h2>

      <p>
        Molecular motors convert chemical energy (ATP hydrolysis, ΔG ≈ −54 kJ/mol = −23 k_BT)
        to mechanical work. Key systems:
      </p>

      <p>
        <strong>Kinesin:</strong> moves along microtubules toward the plus end (8 nm steps).
        Two heads alternately bind/release: hand-over-hand mechanism. Stall force: F_stall ≈ 7 pN.
        Velocity: v ≈ 800 nm/s at zero load. Efficiency: η = F×d/(ΔGATP) ≈ 7×8/(23×4.1) ≈ 60%.
      </p>

      <p>
        <strong>ATP synthase:</strong> rotary motor. The F₀ motor (driven by proton gradient)
        rotates the γ-subunit, mechanically coupling to F₁ (synthesizes ATP). Speed: up to
        100 rotations/s. Generates ~3 ATP per revolution (3 catalytic sites). Efficiency near
        100% (thermodynamic limit). Flagellar motor: similar rotary mechanism, powers swimming.
      </p>

      <EqNumbered number="BP.2">v = v₀(1 − F/F_stall) &nbsp;&nbsp;&nbsp; (linear force-velocity for motor near stall)</EqNumbered>

      <p>
        The fluctuation-dissipation theorem applies to motors: the randomness (diffusion-like
        wandering) and the mean drift are both thermally driven. Efficiency is limited by
        the Carnot-like second law for chemical machines: η ≤ 1 − T_diss/T.
      </p>

      <WorkedExample number="BP.1" title="Diffusion vs. Active Transport in a Cell">
        <p>
          Compare diffusion time for a protein (D = 10 μm²/s) vs. kinesin transport
          across a 1 m axon (v = 1 μm/s).
        </p>
        <Step label="Diffusion time:">From ⟨x²⟩ = 2Dt: t_diff = L²/(2D) = (1 m)²/(2×10×10⁻¹² m²/s) = 1/(2×10⁻¹¹) = 5×10¹⁰ s ≈ 1600 years.</Step>
        <Step label="Active transport:">t_motor = L/v = 1 m/(10⁻⁶ m/s) = 10⁶ s ≈ 11.6 days.</Step>
        <Step label="Comparison:">Motor transport is ~50,000× faster than diffusion for 1 m. This is why neurons have an elaborate axonal transport system — diffusion simply fails at macroscopic distances.</Step>
        <Step label="Small cells:">For a 1 μm cell: t_diff = (10⁻⁶)²/(2×10⁻¹¹) = 5×10⁻² s = 50 ms. Diffusion adequate! The crossover length for transport: L* ∼ √(2Dτ) where τ is a characteristic time. Motors become necessary when L ≫ L*.</Step>
      </WorkedExample>

      <h2>BP.3 Protein Folding</h2>

      <p>
        A protein of N amino acids in its native state has a unique 3D structure determined
        by its sequence (Anfinsen&apos;s principle). The folding energy landscape:
      </p>

      <p>
        <strong>Levinthal paradox:</strong> if a 100-residue protein sampled all conformations
        at 10⁹ s⁻¹: τ ∼ 10^(300)/10⁹ ≈ 10^(291) years — longer than the age of the universe!
        Yet proteins fold in μs–ms. Resolution: the energy landscape is funnel-shaped (not
        random) — folding is directed by the overall gradient toward the native state.
      </p>

      <p>
        <strong>Two-state folding:</strong> small proteins fold in a highly cooperative,
        all-or-none transition. Rate: k_fold ∝ e^(−ΔG‡/(k_BT)) (Kramers theory).
        Chymotrypsin inhibitor 2 (CI2): folds in 10 μs. Folded proteins marginally stable:
        ΔG_stab ≈ −50 kJ/mol ≈ −20 k_BT — only a few hydrogen bonds above random-coil.
      </p>

      <p>
        <strong>Misfolding diseases:</strong> Alzheimer&apos;s (amyloid β), Parkinson&apos;s (α-synuclein),
        prion diseases — all involve proteins aggregating into ordered β-sheet fibers.
        The free energy of the fiber can be lower than the native state when concentration
        is high enough.
      </p>

      <h2>BP.4 Membrane Biophysics</h2>

      <p>
        Cell membranes are lipid bilayers (~4 nm thick). Elasticity described by the
        Helfrich Hamiltonian:
      </p>

      <EqNumbered number="BP.3">E = ∫ dA [½ κ (2H)² + κ_G K + σ] &nbsp;&nbsp;&nbsp; (Helfrich membrane energy)</EqNumbered>

      <p>
        where H is mean curvature, K is Gaussian curvature, κ ≈ 10–100 k_BT is the bending
        rigidity, κ_G is saddle-splay modulus, and σ is surface tension.
        Thermal fluctuations cause the membrane to undulate (Helfrich fluctuations).
        The Gauss-Bonnet theorem: ∫ K dA = 4π(1−g) (genus g) — topology constrains
        the total Gaussian curvature.
      </p>

      <p>
        <strong>Ion channels and action potentials:</strong> membrane potential V_m across
        a cell (inside −70 mV). An action potential propagates along an axon via the
        Hodgkin-Huxley model: coupled ODEs for V_m and gating variables n, m, h of Na⁺/K⁺
        channels. Nobel 1963. Propagation speed: v ∝ √(D/τ_RC) where D = λ²/(RC) is the
        cable diffusivity (λ = space constant, τ_RC = RC = time constant).
      </p>

      <h2>BP.5 Statistical Physics of Biological Networks</h2>

      <p>
        Gene regulatory networks, protein-protein interaction networks, and neural networks
        all share statistical properties. The <strong>Hill equation</strong> describes
        cooperative binding:
      </p>

      <EqNumbered number="BP.4">θ = [L]^n / (K_d^n + [L]^n) &nbsp;&nbsp;&nbsp; (Hill equation, n = Hill coefficient)</EqNumbered>

      <p>
        n = 1: Michaelis-Menten (no cooperativity). n &gt; 1: cooperative (sigmoidal switch).
        Hemoglobin: n = 2.8 (cooperative O₂ binding). This cooperativity allows hemoglobin to
        load in the lungs (pO₂ = 100 mmHg) and unload in tissues (pO₂ = 40 mmHg).
      </p>

      <Definition number="BP.1" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Thermal energy is comparable to molecular energies:</strong> k_BT sets the scale for biological fluctuations.</li>
          <li><strong>Low Reynolds number changes intuition:</strong> microscopic swimmers cannot coast.</li>
          <li><strong>Binding curves reflect ensembles:</strong> fractional occupancy is a probability, not one molecule half-bound.</li>
          <li><strong>Free energy drives direction:</strong> favorable processes can still have kinetic barriers.</li>
        </ul>
      </Definition>

      <PracticeProblems section="BP.1–BP.5 Biophysics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={0.051} unit="pN" tolerance={0.10}
          hints={[
            'WLC formula: F = k_BT/(2ℓ_p) × [x/L + 1/(4(1−x/L)²) − 1/4]. At 50% extension, x/L = 0.5.',
            'k_BT/(2ℓ_p) = 4.1 pN·nm/(2×50 nm) = 0.041 pN. Evaluate [0.5 + 1/(4×0.25) − 0.25] = [0.5 + 1 − 0.25] = 1.25.',
          ]}
          problemText="Apply the worm-like chain model to dsDNA with ℓ_p = 50 nm and contour length L = 3400 nm. Calculate the stretching force in pN at 50% extension (x/L = 0.5)."
          solution={<>DNA persistence length experiment: optical tweezers stretch a DNA molecule. Force-extension from WLC: F = k_BT/(2ℓ_p)[x/L + 1/(4(1-x/L)²) - 1/4]. For double-stranded DNA: ℓ_p = 50 nm, L = 0.34 nm/bp. For a 10 kbp molecule: L_total = 0.34×10⁴ = 3400 nm. At x/L = 0.5: F = k_BT/(2×50nm) × [0.5 + 1/(4×0.25) - 0.25] = 0.041 pN × [0.5 + 1 - 0.25] = 0.041 × 1.25 = 0.051 pN. At x/L = 0.9: F = 0.041 × [0.9 + 1/(4×0.01) - 0.25] = 0.041 × [0.9 + 25 - 0.25] = 0.041 × 25.65 = 1.05 pN. At x/L = 0.99: F = 0.041 × [0.99 + 1/(4×0.0001) - 0.25] ≈ 0.041 × 2500 ≈ 100 pN (B→S transition at ~65 pN). The entropic spring at low extension matches F = 3k_BT x/(2ℓ_p L) exactly. Smith et al. (1992) confirmed this experimentally, measuring ℓ_p = 50 nm.</>}>
          Apply the WLC model to DNA (ℓ_p = 50 nm, L = 3400 nm) and calculate the force at 50% and 90% extension. Sketch the force-extension curve.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={-70} unit="mV" tolerance={0.05}
          hints={[
            'Goldman equation: V_m = (k_BT/e) ln[(P_K[K]_out + P_Na[Na]_out + P_Cl[Cl]_in)/(P_K[K]_in + P_Na[Na]_in + P_Cl[Cl]_out)].',
            'Numerator: 1×5 + 0.04×145 + 0.45×4 = 12.6. Denominator: 1×140 + 0.04×12 + 0.45×120 = 194.5. V_m = 25.7 mV × ln(12.6/194.5).',
          ]}
          problemText="Use the Goldman equation to calculate the resting membrane potential (in mV) for a neuron. Use [K]_in=140, [K]_out=5, [Na]_in=12, [Na]_out=145, [Cl]_in=4, [Cl]_out=120 mM and permeability ratios P_K:P_Na:P_Cl = 1:0.04:0.45."
          solution={<>Resting potential from Goldman equation: V_m = (k_BT/e) ln[(P_K[K]_out + P_Na[Na]_out + P_Cl[Cl]_in)/(P_K[K]_in + P_Na[Na]_in + P_Cl[Cl]_out)]. At rest: [K]_in = 140, [K]_out = 5, [Na]_in = 12, [Na]_out = 145, [Cl]_in = 4, [Cl]_out = 120 mM. P_K : P_Na : P_Cl = 1 : 0.04 : 0.45 (at rest). Numerator: 1×5 + 0.04×145 + 0.45×4 = 5 + 5.8 + 1.8 = 12.6. Denominator: 1×140 + 0.04×12 + 0.45×120 = 140 + 0.48 + 54 = 194.5. V_m = 0.0257 × ln(12.6/194.5) = 0.0257 × (-2.736) = -0.070 V = -70 mV. Nernst equation for K alone: V_K = (k_BT/e) ln([K]_out/[K]_in) = 25.7 mV × ln(5/140) = -88 mV. The resting potential is between V_K and V_Na (58 mV), weighted by permeabilities. Na-K pump maintains the concentration gradients by actively pumping 3 Na⁺ out and 2 K⁺ in per ATP.</>}>
          Use the Goldman equation to calculate the resting membrane potential for a neuron with given ionic concentrations. How does the Na-K pump maintain this potential?
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Brownian ratchet (Feynman ratchet, 1963). A thermal ratchet extracts work from a single heat bath — or so it seems. Feynman's insight: if the ratchet and pawl are at the same temperature T as the gas, the ratchet fluctuates backward as often as forward → no net work. The fluctuation-dissipation theorem: any mechanism that rectifies fluctuations must dissipate at least as much energy. For a two-temperature ratchet (gas T₁, ratchet T₂ &lt; T₁): can extract work, but Carnot efficiency η &lt; 1-T₂/T₁. Biological ratchet (molecular motor): ATP hydrolysis provides the symmetry-breaking free energy, not thermal noise. The motor is NOT a perpetual motion machine — it consumes chemical energy. Rate of stepping: k = k₀ e^(-(ΔG‡ - Fd)/(k_BT)) (Kramers with load). At F=0: steps forward. At F=F_stall: forward and backward steps balance. The motor uses free energy to rectify thermal fluctuations directionally — thermodynamically consistent with ΔG_ATP &gt; 0.</>}>
          Explain why Feynman's ratchet cannot extract work from a single heat bath, but biological motors can extract work from ATP. What principle distinguishes the two cases?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Hodgkin-Huxley model: C_m dV/dt = I_ext − g_Na m³ h (V-E_Na) − g_K n⁴ (V-E_K) − g_L(V-E_L). Gate variables: dx/dt = α_x(V)(1-x) - β_x(V)x for x = m,n,h. Parameters from squid giant axon: g_Na=120, g_K=36, g_L=0.3 mS/cm², E_Na=50, E_K=-77, E_L=-54.4 mV, C_m=1 μF/cm². Threshold: ~-55 mV. Action potential: Na channels open (m³h → max in ~0.5 ms), rapid depolarization. Na inactivation (h → 0) stops depolarization. K channels open (n⁴ delayed activation), repolarization. Refractory period: Na inactivation (absolute) + lingering K activation (relative). Propagation in myelinated axon: saltatory conduction between Nodes of Ranvier. Speed: v = λ/τ_RC = √(r_a/(r_m C_m)) × L/δ where L = internodal distance, δ = nodal width. For myelin: λ increases 10×, τ_RC constant → v increases 10×. Human nerve: 70 m/s. Unmyelinated: 0.5-2 m/s. Multiple sclerosis: demyelination slows conduction → neurological deficits.</>}>
          Describe the Hodgkin-Huxley model for the action potential. What is the role of each ionic current? How does myelination increase conduction velocity?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Thermal energy k_BT ≈ 4 pN·nm sets the scale for biological forces and fluctuations.',
        'WLC model: DNA as elastic rod with persistence length ℓ_p = 50 nm. Entropic spring at low extension.',
        'Molecular motors convert ATP (23 k_BT) to mechanical work. Kinesin: 7 pN stall, 800 nm/s.',
        'Protein folding: funnel energy landscape resolves Levinthal paradox. Two-state kinetics.',
        'Helfrich membrane: κ ≈ 10-100 k_BT bending rigidity. Thermal fluctuations cause undulations.',
        'Hodgkin-Huxley: Na⁺ and K⁺ channel gating equations describe action potential propagation.',
      ]} />
    </div>
  );
}
