import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function StatisticalPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#f97316' }}>Thermodynamics · Upper Division</div>
      <h1>Statistical Mechanics</h1>
      <p className="subtitle">
        Statistical mechanics derives thermodynamics from first principles by counting
        microscopic states. Temperature, entropy, and pressure emerge from probability theory
        applied to systems with ~10²³ particles.
      </p>

      <Prerequisites items={['Laws of thermodynamics (Ch. 12)', 'Quantum mechanics (Ch. 20) for quantum statistics', 'Basic calculus and probability']} />

      <LearningGoals items={[
        'State Boltzmann\'s entropy formula S = k_B ln Ω and use it to compare likelihoods of macrostates.',
        'Derive the Boltzmann distribution from the maximum-entropy principle and define the partition function Z.',
        'Extract mean energy and free energy from Z using the standard thermodynamic relations.',
        'Apply the equipartition theorem to predict heat capacities of monatomic and diatomic gases.',
        'Contrast Fermi-Dirac and Bose-Einstein statistics and describe their physical consequences.',
      ]} />

      <h2>S.1 Microstates and the Boltzmann Entropy</h2>

      <p>
        The central insight of statistical mechanics is that macroscopic thermodynamic
        quantities — temperature, pressure, entropy — correspond to averages over an enormous
        number of microscopic configurations (<strong>microstates</strong>). Each microstate is
        a complete specification of every particle&apos;s position and momentum.
      </p>

      <Definition number="S.1" title="Boltzmann Entropy">
        The entropy of a macrostate is proportional to the logarithm of the number of
        microstates Ω consistent with it:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          S = k_B ln Ω &nbsp;&nbsp;&nbsp; (k_B = 1.381×10⁻²³ J/K)
        </span>
        This is carved on Boltzmann&apos;s gravestone. It connects the microscopic world (Ω, counting)
        to the macroscopic (S, measurable). A system evolves toward states of maximum Ω —
        the second law is just the law of large numbers.
      </Definition>

      <WorkedExample number="S.1" title="Entropy of a Two-State System">
        <p>
          N = 100 coins, each showing heads (H) or tails (T). How many ways can exactly 50
          be heads? Compare to all-heads. What does this say about the second law?
        </p>
        <Step label="Ω(50H):">C(100,50) = 100!/(50!50!) ≈ 10²⁹ — an astronomical number</Step>
        <Step label="Ω(100H):">C(100,100) = 1</Step>
        <Step label="Entropy difference:">ΔS = k_B ln(10²⁹/1) = k_B × 29 × ln10 ≈ 10⁻²¹ J/K</Step>
        <Step label="Moral:">The all-heads state is fantastically improbable. For 10²³ coins (moles of gas molecules), the overwhelmingly most probable macrostate is the uniform distribution. Deviations are essentially impossible — this is the second law.</Step>
      </WorkedExample>

      <h2>S.2 The Boltzmann Distribution</h2>

      <p>
        Consider a small system in contact with a large thermal reservoir at temperature T.
        The probability that the system occupies a microstate with energy E is the
        <strong>Boltzmann distribution</strong>:
      </p>

      <EqNumbered number="S.1">P(E) = (1/Z) e^(−E/k_BT) = (1/Z) e^(−βE) &nbsp;&nbsp;&nbsp; (β ≡ 1/k_BT)</EqNumbered>

      <p>
        The <strong>partition function</strong> Z = Σ_i e^(−βEᵢ) (sum over all microstates) is the
        normalization factor and encodes all thermodynamic information. Once Z is known:
      </p>

      <EqNumbered number="S.2">⟨E⟩ = −∂(ln Z)/∂β &nbsp;&nbsp;&nbsp; F = −k_BT ln Z &nbsp;&nbsp;&nbsp; S = −∂F/∂T</EqNumbered>

      <p>
        The partition function is to statistical mechanics what the wavefunction is to quantum
        mechanics — everything follows from it.
      </p>

      <WorkedExample number="S.2" title="Two-Level System">
        <p>
          A system has two energy levels: E = 0 and E = ε. Find the partition function, mean
          energy, and heat capacity.
        </p>
        <Step label="Z:">Z = e^(−β·0) + e^(−βε) = 1 + e^(−βε)</Step>
        <Step label="ln Z:">ln Z = ln(1 + e^(−βε))</Step>
        <Step label="⟨E⟩:">⟨E⟩ = −∂(lnZ)/∂β = ε e^(−βε)/(1 + e^(−βε)) = ε/(e^(βε) + 1)</Step>
        <Step label="Heat capacity:">C = d⟨E⟩/dT = k_B (βε)² e^(βε)/(e^(βε)+1)²</Step>
        <Step label="Schottky anomaly:">C peaks at k_BT ≈ 0.42ε then decays. At high T (k_BT ≫ ε): ⟨E⟩ → ε/2 (equal population). At low T: system freezes into ground state.</Step>
      </WorkedExample>

      <h2>S.3 The Equipartition Theorem</h2>

      <Theorem number="S.1" title="Equipartition Theorem">
        In thermal equilibrium at temperature T, every quadratic degree of freedom contributes
        ½k_BT to the mean energy:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          ⟨½mẋ²⟩ = ½k_BT &nbsp;&nbsp;&nbsp; for each translational, rotational, or vibrational mode
        </span>
        A monatomic ideal gas has 3 translational DOF → ⟨E⟩ = 3/2 k_BT per particle.
        A diatomic molecule has 3 translational + 2 rotational = 5 DOF → ⟨E⟩ = 5/2 k_BT.
        This gives Cv = (f/2)Nk_B, where f is the number of active quadratic modes.
      </Theorem>

      <p>
        The equipartition theorem breaks down at low temperatures where quantum effects freeze
        out modes with spacing ε ≫ k_BT. This is why the heat capacity of hydrogen drops
        from 5/2 Nk_B (room temperature, 5 modes) to 3/2 Nk_B (low temperature, only translation)
        — a purely quantum effect observed by Boltzmann himself but not understood until
        quantum mechanics.
      </p>

      <h2>S.4 Quantum Statistics</h2>

      <p>
        Identical quantum particles obey one of two statistics, depending on their spin:
      </p>

      <Definition number="S.2" title="Quantum Distribution Functions">
        <span style={{ display: 'block', marginBottom: '0.4rem' }}>
          <strong>Bosons</strong> (integer spin, e.g., photons, ⁴He): Bose-Einstein distribution
          &nbsp; ⟨n_k⟩ = 1/(e^(β(ε_k−μ)) − 1)
        </span>
        <span style={{ display: 'block' }}>
          <strong>Fermions</strong> (half-integer spin, e.g., electrons, protons): Fermi-Dirac distribution
          &nbsp; ⟨n_k⟩ = 1/(e^(β(ε_k−μ)) + 1)
        </span>
        μ is the chemical potential. At T=0, the Fermi-Dirac distribution is a step function —
        all states below the Fermi energy E_F are filled, all above are empty.
      </Definition>

      <p>
        Fermi-Dirac statistics explains why metals conduct electricity (electrons near E_F are
        mobile), why white dwarf stars don&apos;t collapse (electron degeneracy pressure), and why
        the specific heat of metals is linear in T (only electrons within ~k_BT of E_F contribute).
        Bose-Einstein statistics permits photon bunching (laser light) and Bose-Einstein condensation
        — all bosons collapsing into the ground state below a critical temperature.
      </p>

      <Definition number="S.3" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Microstates and macrostates are different levels:</strong> entropy counts microscopic arrangements compatible with one macrostate.</li>
          <li><strong>Z is more than normalization:</strong> derivatives of ln Z generate energy, entropy, and free energy.</li>
          <li><strong>Equipartition has limits:</strong> quantum level spacing freezes out modes when k_BT is too small.</li>
          <li><strong>Fermions and bosons differ by occupancy rules:</strong> the plus/minus sign changes low-temperature behavior completely.</li>
        </ul>
      </Definition>

      <PracticeProblems section="S.1–S.4 Statistical Mechanics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={12.47} unit="J/(mol·K)" tolerance={0.02}
          hints={['Equipartition: ½k_BT per degree of freedom. Monatomic gas has 3 translational DOF. Cv = dU/dT.']}
          problemText="Using equipartition, find Cv (in J/(mol·K)) for a monatomic ideal gas (1 mole)."
          solution={<>U = 3/2 nRT. Cv = dU/dT = 3/2 R = 3/2 × 8.314 = <strong>12.47 J/(mol·K)</strong>.</>}>
          Using equipartition, derive the heat capacity Cv of a monatomic ideal gas. Express in terms of N, k_B and as a number for one mole.
        </InteractiveProblem>

        <Problem n={2} difficulty="medium"
          solution={<>Z = 1 + e^(−βε). ⟨E⟩ = εe^(−βε)/(1+e^(−βε)). C = d⟨E⟩/dT = k_B(βε)²e^(βε)/(e^(βε)+1)². At T→0: βε→∞, e^(βε)≫1, C ≈ k_B(βε)²e^(−βε)→0. At T→∞: βε→0, expand e^(βε)≈1+βε, C ≈ k_B(βε)²·1/(2+βε)² → k_B/4. Peak: dC/dT=0 at k_BT ≈ 0.417ε (Schottky peak). A Schottky anomaly in a material reveals the existence of two nearly-degenerate quantum levels separated by ε.</>}>
          For the two-level system (E=0, E=ε), plot the heat capacity C(T) qualitatively. Where is the Schottky peak? What happens as T→0 and T→∞?
        </Problem>

        <Problem n={3} difficulty="medium"
          solution={<>Photon gas (blackbody): photons are bosons with μ=0 (photon number not conserved). ⟨n_k⟩ = 1/(e^(βℏω)−1). Energy density: u(ω) = (ℏω³/π²c³)/(e^(βℏω)−1) (Planck distribution). Total energy density: U/V = (π²/15)(k_BT)⁴/(ℏc)³. This gives Stefan-Boltzmann: j = σT⁴, σ = 2π⁵k_B⁴/(15h³c²). The ultraviolet catastrophe is avoided because at high ω (hf ≫ k_BT), the Bose-Einstein factor suppresses the classical equipartition result.</>}>
          Derive the Planck blackbody distribution from the Bose-Einstein distribution (μ=0). Show how this resolves the ultraviolet catastrophe.
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Degenerate Fermi gas at T=0: E_F = (ℏ²/2m)(3π²n)^{2/3} where n = N/V. All states with ε &lt; E_F are filled. Total energy: U₀ = 3/5 NE_F. Pressure: P = 2/3 U₀/V = 2/5 nE_F (degeneracy pressure — exists even at T=0). For electrons in Cu: n=8.49×10²⁸ m⁻³ → E_F = 7.0 eV ≫ k_BT at room temperature. Low-T heat capacity: Cv = π²Nk_B²T/(2E_F) — linear in T, much smaller than classical 3/2 Nk_B. This explains why electrons barely contribute to specific heat despite being the conductors.</>}>
          Calculate the Fermi energy E_F for a free electron gas with density n. Find the total ground-state energy and the degeneracy pressure. Why is Cv of electrons linear in T rather than constant?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'S = k_B ln Ω — entropy counts microstates; the second law is just probability theory at scale.',
        'Boltzmann distribution: P(E) ∝ e^{−βE}, β = 1/k_BT. Higher energy → exponentially less probable.',
        'Partition function Z = Σe^{−βE} encodes all thermodynamics: ⟨E⟩ = −∂lnZ/∂β.',
        'Equipartition: ½k_BT per quadratic DOF. Breaks down when k_BT ≪ ε (quantum freezeout).',
        'Fermions obey Fermi-Dirac: at T=0 all states below E_F filled — explains metals, white dwarfs.',
        'Bosons obey Bose-Einstein: photons → blackbody spectrum; at low T → Bose-Einstein condensation.',
      ]} />
    </div>
  );
}
