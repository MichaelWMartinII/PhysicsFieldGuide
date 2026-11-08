import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, InlineMath, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function RenormalizationGroupPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#f97316' }}>Thermodynamics · Advanced Topics</div>
      <h1>The Renormalization Group</h1>
      <p className="subtitle">
        The renormalization group (RG) is a framework for understanding how physics changes
        with scale. It explains why phase transitions exhibit universal behavior independent
        of microscopic details, and connects condensed matter physics to quantum field theory
        through a profound mathematical analogy.
      </p>

      <Prerequisites items={['Phase transitions (Ch. PT)', 'Statistical mechanics (Ch. S)', 'Fourier analysis (Ch. F)', 'Group theory (Ch. GT)']} />

      <LearningGoals items={[
        'Explain why different systems near a continuous phase transition share identical critical exponents and belong to the same universality class.',
        'Perform a real-space RG decimation on the 1D Ising model and show that K flows to zero at any finite temperature, confirming the absence of a phase transition.',
        'Write the Landau-Ginzburg-Wilson φ⁴ functional and derive the one-loop RG flow equations for r and u near d = 4.',
        'Classify RG perturbations as relevant, irrelevant, or marginal, and use this classification to derive all critical exponents from two independent eigenvalues y_t and y_h.',
        'Verify the scaling relations α + 2β + γ = 2 and dν = 2 − α using the 3D Ising critical exponents.',
      ]} />

      <h2>RG.1 Scale and Universality</h2>

      <p>
        Near a continuous phase transition (<InlineMath latex="T \to T_c" />), the correlation length diverges:
        <InlineMath latex="\xi \sim |T - T_c|^{-\nu} \to \infty" />. At <InlineMath latex="T_c" />, the system looks the same at all length scales —
        it is <strong>scale invariant</strong>. This is why different systems (magnets, liquids,
        superconductors) show identical critical exponents — the same <strong>universality class</strong>.
      </p>

      <p>
        Critical exponents (defined near <InlineMath latex="T_c" />, h = 0 unless noted):
      </p>

      <p>
        <InlineMath latex="\xi \sim |t|^{-\nu}" />, &nbsp; <InlineMath latex="C \sim |t|^{-\alpha}" />, &nbsp; <InlineMath latex="m \sim |t|^{\beta}" /> (<InlineMath latex="t = (T - T_c)/T_c" />, h = 0),
        &nbsp; <InlineMath latex="\chi \sim |t|^{-\gamma}" />, &nbsp; <InlineMath latex="m \sim h^{1/\delta}" /> (<InlineMath latex="T = T_c" />).
      </p>

      <p>
        Mean-field values: α = 0, β = 1/2, γ = 1, δ = 3, ν = 1/2. Ising 3D (Wilson-Fisher):
        β ≈ 0.326, γ ≈ 1.237, ν ≈ 0.630. These differ from mean-field because of fluctuations.
      </p>

      <h2>RG.2 Real-Space Renormalization Group</h2>

      <p>
        The RG procedure: <strong>coarse-grain</strong> the system by a factor b, then
        rescale to restore the original lattice spacing. Under this transformation, the
        coupling constants of the Hamiltonian flow:
      </p>

      <EqNumbered number="RG.1" latex="K' = R(K) \qquad \text{(RG transformation: couplings } K \to K' \text{ after coarse-graining by } b\text{)}" />

      <p>
        <strong>Fixed points</strong> K* satisfy R(K*) = K* — scale-invariant systems. The
        nature of the fixed point determines the phase:
      </p>

      <p>
        K = 0 (high T): high-T fixed point — disordered phase.
        K = ∞ (low T): low-T fixed point — ordered phase.
        K = K* (critical): unstable fixed point — the phase transition.
      </p>

      <WorkedExample number="RG.1" title="1D Ising Model — Exact RG">
        <p>
          Apply the RG to the 1D Ising model H = −K Σᵢ sᵢ sᵢ₊₁ by summing out every other spin.
        </p>
        <Step label="Partition function:"><InlineMath latex="Z = \sum_{\{s\}} e^{K \sum_i s_i s_{i+1}}" />. Integrate out even spins s₂, s₄, ... (b = 2 decimation).</Step>
        <Step label="Sum s₂:">For each s₂: <InlineMath latex="\sum_{s_2 = \pm 1} e^{K s_1 s_2 + K s_2 s_3} = 2\cosh\bigl(K(s_1 + s_3)\bigr)" />. This depends on s₁s₃ only. Write as <InlineMath latex="e^{K' s_1 s_3 + \text{const}}" />.</Step>
        <Step label="New coupling:">Comparing: 2 cosh(2K) = A e^(K') (if s₁=s₃=+1). 2 cosh(0) = A e^(−K') (if s₁=−s₃). Dividing: tanh(K') = tanh²(K). So K' = arctanh(tanh²(K)) &lt; K.</Step>
        <Step label="Fixed points:">K' = K only for K = 0 (trivial) or K = ∞ (trivial). No finite fixed point → no phase transition in 1D Ising at finite T! RG confirms the exact result (Peierls argument).</Step>
        <Step label="Physical:">K → 0 under RG: the system always flows to disorder at any finite T. Long-range order requires T = 0. The 2D Ising model has a nontrivial fixed point (K_c = ln(1+√2)/2) — gives the phase transition.</Step>
      </WorkedExample>

      <h2>RG.3 The Wilson-Fisher Fixed Point</h2>

      <p>
        Kadanoff and Wilson reformulated RG in momentum space. Start with the Landau free
        energy functional (the Wilson-Fisher φ⁴ theory):
      </p>

      <EqNumbered number="RG.2" latex="F[\phi] = \int d^d r \left[\tfrac{1}{2}(\nabla\phi)^2 + \tfrac{1}{2} r \phi^2 + u \phi^4\right] \qquad \text{(Landau-Ginzburg-Wilson functional)}" />

      <p>
        RG in momentum space: integrate out modes with |k| between Λ/b and Λ (shell), then
        rescale k → bk to restore cutoff Λ. The couplings flow:
      </p>

      <EqNumbered number="RG.3" latex="\frac{dr}{dl} = 2r + \frac{12u K_d \Lambda^d}{r + \Lambda^2} \qquad \text{(flow of mass parameter)}" />

      <EqNumbered number="RG.4" latex="\frac{du}{dl} = (4-d)u - \frac{36u^2 K_d \Lambda^d}{(r + \Lambda^2)^2} \qquad \text{(flow of coupling)}" />

      <p>
        where l = ln(b). The crucial observation: the coefficient of u in Eq. RG.4 is
        (4−d). In d = 4: u is marginal (flows logarithmically). In d &lt; 4: u is relevant
        — interactions matter. In d &gt; 4: u is irrelevant — mean-field is exact.
      </p>

      <p>
        The <strong>Wilson-Fisher fixed point</strong> at d = 4−ε (ε expansion):
        <InlineMath latex="u^* = \dfrac{\varepsilon}{36 K_d} + O(\varepsilon^2)" />. The critical exponents to first order in ε:
      </p>

      <EqNumbered number="RG.5" latex="\nu = \tfrac{1}{2} + \frac{\varepsilon}{12} + O(\varepsilon^2) \qquad \eta = 0 + O(\varepsilon^2) \qquad \text{(Ising class, } \varepsilon = 4 - d\text{)}" />

      <p>
        At ε = 1 (d = 3): ν ≈ 0.583 (actual 0.630) — good first approximation. Higher orders:
        ν = 0.630 at 5-loop order, matching experiments and Monte Carlo to 4 significant figures.
      </p>

      <h2>RG.4 Scaling and Universality from Fixed Points</h2>

      <p>
        At a fixed point K*, linearize the RG transformation: <InlineMath latex="\delta K' = M\, \delta K" /> where <InlineMath latex="M = \left.dR/dK\right|_{K^*}" />.
        The eigenvalues <InlineMath latex="\Lambda_i = b^{y_i}" /> classify the perturbations:
      </p>

      <p>
        <strong>Relevant:</strong> <InlineMath latex="y_i > 0\ (\Lambda_i > 1)" /> — grows under RG, takes system away from fixed point.
        Controls the distance from <InlineMath latex="T_c" /> and h.
      </p>
      <p>
        <strong>Irrelevant:</strong> <InlineMath latex="y_i < 0\ (\Lambda_i < 1)" /> — shrinks under RG. Microscopic details that
        don&apos;t affect critical behavior. This is WHY universality exists!
      </p>
      <p>
        <strong>Marginal:</strong> <InlineMath latex="y_i = 0" /> — needs higher-order analysis. Leads to logarithmic corrections
        (2D Ising at <InlineMath latex="T_c" />, or QCD asymptotic freedom).
      </p>

      <Theorem number="RG.1" title="Scaling Hypothesis and Exponent Relations">
        At a fixed point with two relevant eigenvalues <InlineMath latex="y_t" /> (temperature) and <InlineMath latex="y_h" /> (field),
        the free energy obeys a homogeneous scaling form:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          <InlineMath latex="f(t, h) = b^{-d} f\bigl(b^{y_t} t,\ b^{y_h} h\bigr) \quad \text{for any } b" />
        </span>
        This leads to exact exponent relations — only two exponents are independent:
        α + 2β + γ = 2 (Rushbrooke), dν = 2 − α (hyperscaling), γ = ν(2 − η).
        All critical exponents of a universality class follow from two numbers (<InlineMath latex="y_t, y_h" />).
      </Theorem>

      <h2>RG.5 Applications Beyond Phase Transitions</h2>

      <p>
        The RG idea extends far beyond condensed matter:
      </p>

      <p>
        <strong>Quantum field theory</strong>: the beta function β(g) = μ dg/dμ is the RG flow
        of coupling g with energy scale μ. Asymptotic freedom (QCD) = g → 0 under RG to
        high energy. The Landau pole in QED = g → ∞ (UV problem).
      </p>

      <p>
        <strong>Chaotic systems</strong>: Feigenbaum constants (δ = 4.669..., α = 2.502...)
        in the period-doubling route to chaos — universal regardless of the map.
        Explained by a fixed point of the RG acting on maps.
      </p>

      <p>
        <strong>Turbulence</strong>: Kolmogorov scaling <InlineMath latex="E(k) \propto k^{-5/3}" /> can be understood as
        a fixed point of the RG for the Navier-Stokes equation (though a rigorous derivation
        remains incomplete).
      </p>

      <p>
        <strong>Disordered systems</strong>: random systems have infinite-randomness fixed points
        where quantum fluctuations are amplified — describes random quantum spin chains,
        many-body localization.
      </p>

      <Definition number="RG.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>RG transformations change descriptions, not the underlying system:</strong> coarse-graining tracks which couplings matter at large scale.</li>
          <li><strong>Relevant does not mean important in everyday language:</strong> it means the perturbation grows under repeated rescaling.</li>
          <li><strong>Universality ignores irrelevant details:</strong> lattice structure and microscopic chemistry often wash out near a fixed point.</li>
          <li><strong>Mean-field breaks below the upper critical dimension:</strong> fluctuations change exponents in d &lt; 4 for the Ising class.</li>
        </ul>
      </Definition>

      <PracticeProblems section="RG.1–RG.5 Renormalization Group">
        <InteractiveProblem n={1} difficulty="easy"
          answer={4} unit="(upper critical dimension)" tolerance={0.02}
          hints={['The hyperscaling relation dν = 2 − α holds for d ≤ d_uc. Mean-field gives ν = 1/2, α = 0.', 'Set d × (1/2) = 2 − 0 to find the upper critical dimension d_uc.']}
          problemText="Using the mean-field exponents ν = 1/2 and α = 0, find the upper critical dimension d_uc where mean-field theory becomes exact (dν = 2 − α)."
          solution={<>Scaling law from hyperscaling: α + 2β + γ = 2 (Rushbrooke). Ising 3D: α = 0.110, β = 0.326, γ = 1.237. Check: 0.110 + 2(0.326) + 1.237 = 0.110 + 0.652 + 1.237 = 1.999 ≈ 2 ✓ (within numerical accuracy). Hyperscaling: dν = 2 − α. For d=3, ν = 0.630: 3×0.630 = 1.890, 2 − 0.110 = 1.890 ✓. Fisher: γ = ν(2−η). γ = 1.237, ν(2−η) = 0.630(2−0.036) = 0.630×1.964 = 1.237 ✓. These relations hold exactly (assuming hyperscaling). Mean-field values: α=0, β=1/2, γ=1, ν=1/2, η=0. Check: 0 + 2(1/2) + 1 = 2 ✓. dν = 2: d×1/2 = 2 only for d=4 (upper critical dimension). Above d=4: mean field exact (irrelevant fluctuations).</>}>
          Verify the scaling relations α + 2β + γ = 2 and dν = 2 − α using the 3D Ising exponents α = 0.110, β = 0.326, γ = 1.237, ν = 0.630. What is the upper critical dimension?
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={0.4407} unit="" tolerance={0.02}
          hints={['The exact 2D Ising critical coupling follows from the Onsager solution: K_c = ln(1 + √2)/2.', 'Evaluate ln(1 + √2)/2 ≈ ln(2.414)/2.']}
          problemText="What is the exact critical coupling K_c for the 2D Ising model from Onsager's solution (K_c = ln(1+√2)/2)? Enter the numerical value."
          solution={<>Real-space RG for 2D Ising (Migdal-Kadanoff): approximate decimation. Bond-moving approximation: move bonds to chains, then decimate. For b=2 decimation on square lattice: K' = arctanh(tanh²(2K)) (double bonds then decimate). Fixed point: K'=K → numerically K_c ≈ 0.3047. Exact Onsager: K_c = ln(1+√2)/2 = 0.4407. Error ∼30% from Migdal-Kadanoff approximation. Better: block RG (2×2 blocks). Even better: numerical RG (Wilson, DMRG). Correlation length exponent: at K_c, K' − K_c ≈ b^(1/ν)(K − K_c). Taking derivative: ∂K'/∂K|_(K_c) = b^(1/ν). For Migdal-Kadanoff: slope ≈ 1.68 at K_c with b=2 → ν = ln(2)/ln(1.68) = 1.34. Exact: ν = 1. This approximate RG captures the qualitative physics (phase transition exists, exponent ~1) but misses the exact values.</>}>
          Apply the Migdal-Kadanoff real-space RG to the 2D Ising model with b=2. Find the approximate K_c and compare to the exact Onsager value K_c = ln(1+√2)/2.
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Renormalization group for the XY model in 2D (Berezinskii-Kosterlitz-Thouless transition). The XY model has O(2) symmetry (spin in plane, angle θ). At low T: quasi-long-range order (correlation decays as power law <InlineMath latex="r^{-\eta(T)}" />). At <InlineMath latex="T_{\text{BKT}}" />: proliferation of topological vortices drives a transition. Vortex pair: bound pairs at low T (logarithmic interaction E = πK ln(R/a), K = J/(k_B T)), unbound above <InlineMath latex="T_{\text{BKT}}" />. RG equations (Kosterlitz, 1974): <InlineMath latex="dK^{-1}/dl = 4\pi^3 y^2 + O(y^4)" />. dy/dl = (2 − πK)y + O(y³). Here y = vortex fugacity = e^(-πK/2) for a single vortex. Fixed line K = 2/π (for y = 0): η = 1/(2πK) = 1/(4). Jump: <InlineMath latex="\eta(T_{\text{BKT}}) = 1/4" />; above <InlineMath latex="T_{\text{BKT}}" /> correlations decay exponentially. Universal jump in superfluid density <InlineMath latex="\rho_s" />: <InlineMath latex="\rho_s(T_{\text{BKT}}) = 2mk_B T_{\text{BKT}}/\pi\hbar^2" /> — measured by Nelson-Kosterlitz prediction, confirmed in He-4 films.</>}>
          Describe the Berezinskii-Kosterlitz-Thouless (BKT) transition using the RG. What is the role of vortices and what is the universal jump in the superfluid density?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Perturbative RG for φ⁴ theory near d=4 (ε expansion). Partition each field into slow (|k| &lt; Λ/b) and fast modes (Λ/b &lt; |k| &lt; Λ). Integrate out fast modes perturbatively in u. One-loop correction to r: <InlineMath latex="\delta r = 12u \int_{\Lambda/b}^{\Lambda} \frac{d^d k}{(2\pi)^d} \frac{1}{r + k^2} \approx \frac{12u K_d \Lambda^d}{r + \Lambda^2}\, \delta l" /> where δl = ln b. Rescaling k → bk, <InlineMath latex="\phi \to b^{(d-2+\eta)/2} \phi" /> to restore cutoff: <InlineMath latex="r \to b^2 (r + \delta r) \approx r + \left(2r + \frac{12u K_d \Lambda^d}{r + \Lambda^2}\right)\delta l" />. Flow: <InlineMath latex="dr/dl = 2r + 12u K_d \Lambda^d/(r + \Lambda^2)" />. Similarly for u: one-loop correction <InlineMath latex="-36u^2 K_d \Lambda^{d-4}" />. Flow: <InlineMath latex="du/dl = (4-d)u - 36u^2 K_d \Lambda^{d-4}" />. Fixed point: <InlineMath latex="r^* = -6u K_d \Lambda^{d-2}/(2 + \ldots)" />, <InlineMath latex="u^* = \varepsilon/(36 K_d \Lambda^{-\varepsilon}) \times (1 + O(\varepsilon))" />. Eigenvalues at fixed point: <InlineMath latex="y_t = 2 - \varepsilon/3 + O(\varepsilon^2)" />, <InlineMath latex="y_h = (d+2)/2 - \eta/2 = (d+2-\eta)/2" />. Critical exponents: <InlineMath latex="\nu = 1/y_t = 1/2 + \varepsilon/12" />, γ = (2−η)ν, β = (d−2+η)ν/2. This ε-expansion, continued to ε=1 (d=3), gives quantitatively accurate exponents.</>}>
          Derive the Wilson-Fisher fixed point in the ε = 4−d expansion for the φ⁴ theory. What are the flow equations for r and u to one loop, and what is u*?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'RG: coarse-grain by b, rescale. Couplings flow K → K\'. Fixed points → phases; unstable fixed point → phase transition.',
        'Relevant perturbations (y>0): control critical behavior. Irrelevant (y<0): explains universality.',
        '1D Ising: RG flows to disorder at any T → no transition. 2D: nontrivial fixed point at K_c.',
        'Wilson-Fisher: φ⁴ theory near d=4. u* = ε/36, exponents in ε expansion. Ising 3D at ε=1.',
        'Exponent relations: α+2β+γ=2, dν=2−α, γ=ν(2−η). Only two independent exponents.',
        'RG explains QFT running couplings, Feigenbaum universality in chaos, Kolmogorov turbulence scaling.',
      ]} />
    </div>
  );
}
