import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function ProbabilityPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#06b6d4' }}>Mathematics · Upper Division</div>
      <h1>Probability &amp; Statistics for Physics</h1>
      <p className="subtitle">
        Physics is inherently probabilistic at the quantum level and practical level alike.
        Probability theory, distributions, and statistical inference are tools every physicist
        uses — from analyzing data to formulating quantum mechanics.
      </p>

      <Prerequisites items={['Calculus (Ch. 22)', 'Basic probability concepts']} />

      <LearningGoals items={[
        'Identify the Gaussian, Poisson, Maxwell-Boltzmann, and Lorentzian distributions and their physical applications.',
        'Apply the central limit theorem to determine how measurement uncertainty decreases with sample size.',
        'Propagate errors through a function of multiple independent measurements using partial derivatives.',
        'Update beliefs from data using Bayes\' theorem, distinguishing prior, likelihood, and posterior.',
        'Interpret the chi-squared statistic and reduced chi-squared to assess goodness of fit.',
      ]} />

      <h2>PR.1 Probability Distributions</h2>

      <Definition number="PR.1" title="Key Distributions in Physics">
        <span style={{ display: 'block', marginBottom: '0.5rem' }}>
          <strong>Gaussian (Normal):</strong> P(x) = (1/√(2πσ²)) e^(−(x−μ)²/(2σ²)). Appears whenever many independent random contributions add (CLT). Quantum measurement uncertainties, thermal fluctuations, noise.
        </span>
        <span style={{ display: 'block', marginBottom: '0.5rem' }}>
          <strong>Poisson:</strong> P(k) = e^(−λ) λᵏ/k! — probability of k events when mean is λ. Radioactive decay counting, photon shot noise, rare events.
        </span>
        <span style={{ display: 'block', marginBottom: '0.5rem' }}>
          <strong>Maxwell-Boltzmann:</strong> f(v) = 4π n(m/(2πk_BT))^(3/2) v² e^(−mv²/(2k_BT)). Speed distribution of ideal gas molecules.
        </span>
        <span style={{ display: 'block' }}>
          <strong>Cauchy (Lorentzian):</strong> P(x) = (Γ/π)/(x²+Γ²). Heavy tails; resonance line shapes, random walk in 2D. No finite mean or variance!
        </span>
      </Definition>

      <h2>PR.2 Central Limit Theorem and Error Propagation</h2>

      <Theorem number="PR.1" title="Central Limit Theorem">
        If X₁, X₂, ..., Xₙ are independent identically distributed random variables with
        mean μ and variance σ², then the sample mean X̄ = (X₁+...+Xₙ)/n satisfies:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          (X̄ − μ) / (σ/√n) → N(0,1) as n → ∞
        </span>
        regardless of the distribution of individual Xᵢ (provided the variance is finite).
        The standard error of the mean is σ/√n — averaging n measurements reduces uncertainty
        by √n. This is why averaging works and why the Gaussian distribution is universal.
      </Theorem>

      <p>
        <strong>Error propagation:</strong> if a quantity z = f(x, y, ...) depends on measured
        quantities with uncertainties σ_x, σ_y:
      </p>

      <EqNumbered number="PR.1">σ_z² = (∂f/∂x)² σ_x² + (∂f/∂y)² σ_y² + 2(∂f/∂x)(∂f/∂y) σ_xy &nbsp;&nbsp;&nbsp; (error propagation)</EqNumbered>

      <p>
        For independent measurements (σ_xy = 0): σ_z² = Σᵢ (∂f/∂xᵢ)² σᵢ². For z = x·y:
        (σ_z/z)² = (σ_x/x)² + (σ_y/y)² (relative errors add in quadrature).
      </p>

      <WorkedExample number="PR.1" title="Radioactive Decay Counting Statistics">
        <p>
          A Geiger counter records an average count rate λ = 100 counts/minute. How precisely
          is this known after T = 5 minutes?
        </p>
        <Step label="Poisson statistics:">For N events counted, variance = N (Poisson property).</Step>
        <Step label="Total counts:">N = λT = 100×5 = 500 counts</Step>
        <Step label="Statistical uncertainty:">σ_N = √N = √500 ≈ 22.4</Step>
        <Step label="Uncertainty in rate:">σ_λ = σ_N/T = 22.4/5 = 4.5 counts/min</Step>
        <Step label="Relative precision:">σ_λ/λ = 1/√N = 1/√500 = 4.5%. To get 1% precision: need N = 10,000 counts (T = 100 min).</Step>
        <Step label="Systematic check:">After T minutes, if we see N ≠ λT by more than 3√(λT), investigate systematic errors. The √N rule is fundamental — shot noise is irreducible.</Step>
      </WorkedExample>

      <h2>PR.3 Bayesian Inference</h2>

      <p>
        Bayesian statistics provides a framework for updating beliefs with data:
      </p>

      <EqNumbered number="PR.2">P(θ|data) ∝ P(data|θ) × P(θ) &nbsp;&nbsp;&nbsp; (Bayes&apos; theorem)</EqNumbered>

      <p>
        Here P(θ) is the <strong>prior</strong> (belief before seeing data), P(data|θ) is the
        <strong>likelihood</strong> (probability of observing the data given parameter θ),
        and P(θ|data) is the <strong>posterior</strong> (updated belief). Bayesian methods
        are especially powerful when:
        (1) Prior information is available (previous experiments).
        (2) Data is limited.
        (3) Model comparison is needed.
        In gravitational wave detection, Bayesian parameter estimation recovers black hole
        masses, spins, and sky location from the noisy LIGO signal.
      </p>

      <h2>PR.4 The χ² Distribution and Goodness of Fit</h2>

      <p>
        For fitting a model with k free parameters to n data points, the
        <strong>chi-squared statistic</strong> is:
      </p>

      <EqNumbered number="PR.3">χ² = Σᵢ (y_i − f(x_i))² / σ_i² &nbsp;&nbsp;&nbsp; (chi-squared)</EqNumbered>

      <p>
        Under the null hypothesis (model is correct), χ²/(n−k) should be approximately 1
        (reduced chi-squared). Values much greater than 1 indicate poor fit or underestimated
        errors; values much less than 1 indicate overestimated errors or overfitting.
      </p>

      <p>
        The p-value — probability of observing χ² this large or larger by chance — is
        computed from the chi-squared distribution with ν = n−k degrees of freedom.
        Convention: p &lt; 0.05 → reject null hypothesis at 95% confidence;
        in particle physics, p &lt; 2.87×10⁻⁷ (5σ) is the "discovery" threshold.
      </p>

      <WorkedExample number="PR.2" title="Fitting a Decay Curve">
        <p>
          You measure N(t) = N₀ e^(−λt) at 5 time points. Find the best λ by maximum likelihood.
        </p>
        <Step label="Likelihood:">Each measurement Nᵢ at time tᵢ has Poisson uncertainty. Log-likelihood: ln L = Σᵢ [Nᵢ ln(N₀ e^(−λtᵢ)) − N₀ e^(−λtᵢ)].</Step>
        <Step label="Maximize over λ:">d(ln L)/dλ = Σᵢ [−Nᵢ tᵢ + N₀ tᵢ e^(−λtᵢ)] = 0</Step>
        <Step label="Equation:">Σᵢ Nᵢ tᵢ = N₀ Σᵢ tᵢ e^(−λtᵢ) — solve numerically for λ̂.</Step>
        <Step label="Uncertainty:">σ_λ² = −1/(d²lnL/dλ²) = 1/(N₀ Σᵢ tᵢ² e^(−λtᵢ)) — from the Fisher information.</Step>
        <Step label="Practical:">For Gaussian noise, maximum likelihood reduces to least squares. For Poisson data (counting experiments), use Poisson likelihood.</Step>
      </WorkedExample>

      <Definition number="PR.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Probability density is not probability:</strong> integrate density over an interval to get probability.</li>
          <li><strong>Independence is an assumption:</strong> uncorrelated variables need not be independent.</li>
          <li><strong>Bayes&apos; theorem updates beliefs with evidence:</strong> priors and likelihoods play different roles.</li>
          <li><strong>Standard deviation and standard error differ:</strong> one describes spread, the other uncertainty in a mean.</li>
        </ul>
      </Definition>

      <PracticeProblems section="PR.1–PR.4 Probability and Statistics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={4.47} unit="%" tolerance={0.05}
          hints={['Poisson: σ_N = √N. Relative uncertainty = 1/√N × 100%.']}
          problemText="Geiger counter records N=500 counts total. Find the relative statistical uncertainty (%)."
          solution={<>σ_N = √500 ≈ 22.4. Relative = 22.4/500 × 100% = 1/√500 × 100% ≈ <strong>4.47%</strong></>}>
          A Geiger counter records 500 total counts. What is the relative statistical uncertainty on the count rate?
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={4.47} unit="counts/min" tolerance={0.05}
          hints={['σ_λ = σ_N/T. σ_N = √(λT) = √500. T = 5 min.']}
          problemText="Count rate λ=100 counts/min measured over T=5 min. Find σ_λ (counts/min)."
          solution={<>N = λT = 500. σ_N = √500 ≈ 22.4. σ_λ = σ_N/T = 22.4/5 = <strong>4.47 counts/min</strong></>}>
          A count rate of 100 counts/min is measured over T = 5 min. Find the uncertainty in the measured rate.
        </InteractiveProblem>

        <Problem n={3} difficulty="easy"
          solution={<>Maxwell-Boltzmann speed distribution: f(v) = 4πn(m/2πk_BT)^(3/2) v² e^(−mv²/2k_BT). Mean speed: ⟨v⟩ = √(8k_BT/πm) = √(8×1.38×10⁻²³×300/π×4.65×10⁻²⁶) = √(2.26×10⁴) = 476 m/s (for N₂, m=28u). RMS: v_rms = √(3k_BT/m) = √(3×1.38×10⁻²³×300/4.65×10⁻²⁶) = √(2.67×10⁴) = 517 m/s. Most probable: v_mp = √(2k_BT/m) = 422 m/s. Ratio v_mp : ⟨v⟩ : v_rms = √2 : √(8/π) : √3 = 1 : 1.128 : 1.225. Sound speed in N₂: c_s = √(γk_BT/m) = √(1.4×k_BT/m) = 353 m/s ≈ 0.83 v_rms. The distribution tail (high-v) matters for escaping Earth&apos;s atmosphere — hydrogen escapes, N₂ does not.</>}>
          For nitrogen molecules (M = 28 g/mol) at T = 300 K, find the mean, rms, and most probable speeds. Compare to the speed of sound.
        </Problem>

        <Problem n={4} difficulty="medium"
          solution={<>Student&apos;s t-test: two independent samples x₁,...,xₙ and y₁,...,yₘ. Test H₀: μ_x = μ_y. t = (x̄ − ȳ)/√(s_p²(1/n+1/m)) where pooled variance s_p² = ((n−1)s_x²+(m−1)s_y²)/(n+m−2). For n=m=10: ν = 18 degrees of freedom. At 95% confidence: t_crit = 2.10 (from t-table). If |t| &gt; 2.10: reject H₀. Alternative: Welch&apos;s t-test (unequal variances). In particle physics: similar logic but need 5σ (t≈5) because of look-elsewhere effect (many mass hypotheses tested). Frequentist p-value: P(|t|&gt;t_obs|H₀). Not the same as P(H₀ true|data)! Bayesian inference naturally handles posterior probability of hypotheses.</>}>
          Explain the t-test for comparing two experimental means. When is 2σ sufficient and when is 5σ required? What is the look-elsewhere effect?
        </Problem>

        <Problem n={5} difficulty="medium"
          solution={<>Gaussian error propagation for g = 2L/T² (pendulum measurement): σ_g² = (∂g/∂L)² σ_L² + (∂g/∂T)² σ_T². ∂g/∂L = 2/T² = g/L. ∂g/∂T = −4L/T³ = −2g/T. (σ_g/g)² = (σ_L/L)² + (2σ_T/T)². For L=1.000 m (σ_L=1mm), T=2.007 s (σ_T=2ms): (σ_g/g)² = (10⁻³)² + (2×10⁻³/2.007)² = 10⁻⁶ + 9.96×10⁻⁷ ≈ 2×10⁻⁶. σ_g/g ≈ 0.14%. g = 2×1.000/2.007² = 0.9930 m/s² (expected: 9.80 m/s² — formula needs g_acc = 4π²L/T² not 2L/T²). Correct: g = 4π²L/T² = 4π²×1/2.007² = 9.807 m/s² ✓. Systematic errors (arc angle, air resistance) need separate analysis.</>}>
          Propagate errors for the pendulum measurement g = 4π²L/T²: length L = 1.000 ± 0.001 m, period T = 2.007 ± 0.002 s. What is σ_g?
        </Problem>

        <Problem n={6} difficulty="hard"
          solution={<>Information theory: Shannon entropy H = −Σ pᵢ log pᵢ (bits if log₂). Maximum entropy: for N outcomes, H_max = log N (uniform distribution). For Gaussian: H = ½ log(2πeσ²). Relation to physics: S = k_B H ln(2) relates information entropy to thermodynamic entropy. Jaynes principle: the correct probability distribution maximizing entropy subject to constraints (⟨E⟩=U, normalization) is the Boltzmann distribution: p_i = e^(−βE_i)/Z. This gives the deepest justification of statistical mechanics — not assuming ergodicity but maximizing ignorance subject to known macroscopic constraints. Fisher information I(θ) = E[(d/dθ ln P(x|θ))²]. Cramér-Rao bound: σ_θ ≥ 1/√(n I(θ)). For Gaussian: I = 1/σ² → standard result σ_mean = σ/√n. For quantum: quantum Fisher information gives Heisenberg limit ΔθΔN ≥ 1 in phase estimation with N photons → standard quantum limit √N, Heisenberg limit N.</>}>
          Connect information entropy S = −Σ pᵢ ln pᵢ to thermodynamic entropy via Jaynes&apos;s maximum entropy principle. State the Cramér-Rao bound and its quantum analog.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Key distributions: Gaussian (CLT, noise), Poisson (counting), Maxwell-Boltzmann (gas speeds), Lorentzian (resonances).',
        'CLT: X̄ → N(μ, σ/√n). Standard error scales as 1/√n — more data helps.',
        'Error propagation: σ_z² = Σᵢ (∂f/∂xᵢ)² σᵢ². Relative errors add in quadrature for products.',
        'Bayes: posterior ∝ likelihood × prior. Powerful for limited data and model comparison.',
        'χ²/ν ≈ 1 for good fit. p-value measures consistency with null hypothesis.',
        'Maximum entropy principle: Boltzmann distribution maximizes S subject to ⟨E⟩ = U.',
      ]} />
    </div>
  );
}
