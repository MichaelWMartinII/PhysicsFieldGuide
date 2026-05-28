import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function SpinPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Upper Division</div>
      <h1>Quantum Mechanics: Spin &amp; Angular Momentum</h1>
      <p className="subtitle">
        Spin is a purely quantum mechanical property with no classical analogue. It determines
        the magnetic properties of atoms, the structure of the periodic table, and the
        statistical behavior of identical particles.
      </p>

      <Prerequisites items={['Quantum mechanics (Ch. 20)', 'Atomic structure (Ch. 21)', 'Linear algebra basics', 'Complex numbers']} />

      <LearningGoals items={[
        'Use the angular momentum commutation relations to derive the spectrum of L̂² and L̂z eigenvalues.',
        'Represent spin-½ states as spinors and compute measurement probabilities using Pauli matrices.',
        'Add two angular momenta using Clebsch-Gordan coefficients and identify singlet and triplet states.',
        'Calculate the fine-structure splitting of hydrogen levels due to spin-orbit coupling.',
        'Apply the Wigner-Eckart theorem to determine selection rules for spectral transitions.',
      ]} />

      <h2>SP.1 Orbital Angular Momentum</h2>

      <p>
        In quantum mechanics, the angular momentum operator L̂ = r̂ × p̂ has components
        L̂x, L̂y, L̂z. Their fundamental commutation relation is:
      </p>

      <EqNumbered number="SP.1">[L̂x, L̂y] = iℏL̂z &nbsp;&nbsp;&nbsp; (and cyclic permutations)</EqNumbered>

      <p>
        This algebraic structure determines everything: you cannot simultaneously specify
        two components of angular momentum. The commuting observables are L̂² and L̂z:
      </p>

      <EqNumbered number="SP.2">L̂² |l, m⟩ = ℏ² l(l+1) |l, m⟩ &nbsp;&nbsp;&nbsp;&nbsp; L̂z |l, m⟩ = ℏm |l, m⟩</EqNumbered>

      <p>
        Here l = 0, 1, 2, ... (orbital quantum number) and m = −l, −l+1, ..., +l (magnetic
        quantum number, 2l+1 values). The magnitude of angular momentum is ℏ√(l(l+1)), not ℏl —
        a purely quantum result with no classical analogue.
      </p>

      <h2>SP.2 Spin-½ and the Pauli Matrices</h2>

      <p>
        The Stern-Gerlach experiment (1922) revealed that electrons have an intrinsic
        angular momentum — <strong>spin</strong> — with s = ½. The spin operators satisfy
        the same algebra as orbital angular momentum, but with s = ½:
      </p>

      <EqNumbered number="SP.3">Ŝ² |s, mₛ⟩ = ℏ² s(s+1) |s, mₛ⟩ = (3/4)ℏ² |s, mₛ⟩ &nbsp;&nbsp;&nbsp;&nbsp; Ŝz = ±ℏ/2</EqNumbered>

      <p>
        The two spin-½ states are |↑⟩ (mₛ = +½) and |↓⟩ (mₛ = −½). The spin operators in
        this two-dimensional Hilbert space are:
      </p>

      <EqNumbered number="SP.4">Ŝ = (ℏ/2) σ &nbsp;&nbsp;&nbsp; where &nbsp;&nbsp; σx = [[0,1],[1,0]], &nbsp; σy = [[0,−i],[i,0]], &nbsp; σz = [[1,0],[0,−1]]</EqNumbered>

      <p>
        These are the <strong>Pauli matrices</strong>. They satisfy σᵢσⱼ = δᵢⱼI + iεᵢⱼₖσₖ.
        An arbitrary spin-½ state is a two-component spinor:
      </p>

      <EqNumbered number="SP.5">|χ⟩ = α|↑⟩ + β|↓⟩ = (α, β)ᵀ &nbsp;&nbsp;&nbsp;&nbsp; |α|² + |β|² = 1</EqNumbered>

      <WorkedExample number="SP.1" title="Spin Measurement in the x-direction">
        <p>
          An electron is in state |↑⟩ (spin-up along z). What is the probability of measuring
          +ℏ/2 along the x-axis?
        </p>
        <Step label="Eigenstates of Sx:">|+x⟩ = (1/√2)(|↑⟩ + |↓⟩) &nbsp;&nbsp; |−x⟩ = (1/√2)(|↑⟩ − |↓⟩)</Step>
        <Step label="Express state:">|↑⟩ = (1/√2)|+x⟩ + (1/√2)|−x⟩</Step>
        <Step label="Probability:">P(+x) = |⟨+x|↑⟩|² = |1/√2|² = ½</Step>
        <Step label="Expectation value:">⟨Sx⟩ = ⟨↑|Sx|↑⟩ = (ℏ/2)⟨↑|σx|↑⟩ = (ℏ/2)(1,0)[[0,1],[1,0]](1,0)ᵀ = 0</Step>
        <Step label="Interpretation:">50/50 chance of ±ℏ/2 along x, with zero average — x-spin is completely undetermined when z-spin is definite. This is the Heisenberg uncertainty principle for non-commuting spin components.</Step>
      </WorkedExample>

      <h2>SP.3 Addition of Angular Momenta</h2>

      <p>
        When two particles with angular momenta j₁ and j₂ are combined, the total angular
        momentum J = J₁ + J₂ has quantum numbers j = |j₁−j₂|, |j₁−j₂|+1, ..., j₁+j₂.
        The combined states are expressed in the <strong>Clebsch-Gordan basis</strong>:
      </p>

      <EqNumbered number="SP.6">|j, m⟩ = Σ(m₁, m₂) ⟨j₁ m₁ j₂ m₂ | j m⟩ |j₁ m₁⟩ |j₂ m₂⟩</EqNumbered>

      <p>
        The coefficients ⟨j₁m₁j₂m₂|jm⟩ are <strong>Clebsch-Gordan coefficients</strong>,
        tabulated for small j. For two spin-½ particles:
      </p>

      <EqNumbered number="SP.7">|1,1⟩ = |↑↑⟩ &nbsp;&nbsp; |1,0⟩ = (|↑↓⟩ + |↓↑⟩)/√2 &nbsp;&nbsp; |1,−1⟩ = |↓↓⟩ &nbsp;&nbsp; |0,0⟩ = (|↑↓⟩ − |↓↑⟩)/√2</EqNumbered>

      <p>
        The j=1 triplet is symmetric under particle exchange; the j=0 singlet is antisymmetric.
        This decomposition determines the spectral terms of helium (para- vs orthohelium),
        deuteron binding, and exchange interactions in ferromagnetism.
      </p>

      <h2>SP.4 Spin-Orbit Coupling and Fine Structure</h2>

      <p>
        An electron moving in a Coulomb field sees a magnetic field in its rest frame (from the
        moving nucleus). This couples orbital and spin angular momentum:
      </p>

      <EqNumbered number="SP.8">H_SO = (1/2m²c²) (1/r)(dV/dr) L·S &nbsp;&nbsp;&nbsp; (spin-orbit Hamiltonian)</EqNumbered>

      <p>
        Using J = L + S → L·S = (J²−L²−S²)/2 = ℏ²(j(j+1) − l(l+1) − s(s+1))/2. The
        energy splitting between j = l+½ and j = l−½ states is the
        <strong> fine-structure splitting</strong>, of order α⁴m_ec² (α = 1/137 is the fine
        structure constant). This lifts the degeneracy of the 2p₁/₂ and 2p₃/₂ levels of
        hydrogen by 0.365 cm⁻¹ (observed as the sodium D-line doublet).
      </p>

      <Theorem number="SP.1" title="Wigner-Eckart Theorem (Conceptual Statement)">
        Matrix elements of tensor operators between angular momentum eigenstates factor into
        a geometric part (Clebsch-Gordan coefficient) and a reduced matrix element:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          ⟨j&apos; m&apos; | T^(k)_q | j m⟩ = ⟨j m k q | j&apos; m&apos;⟩ ⟨j&apos; || T^(k) || j⟩
        </span>
        This theorem states that selection rules and relative intensities of spectral lines are
        determined entirely by angular momentum algebra, independent of the detailed dynamics.
        It explains why electric dipole transitions require Δl = ±1, Δm = 0, ±1.
      </Theorem>

      <Definition number="SP.1" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Spin is intrinsic angular momentum:</strong> it is not a classical ball spinning in space.</li>
          <li><strong>Components do not commute:</strong> measuring one spin axis changes predictions for another.</li>
          <li><strong>Add angular momenta with Clebsch-Gordan rules:</strong> quantum vector addition is not ordinary component addition.</li>
          <li><strong>Magnetic moments follow spin and orbital contributions:</strong> signs and g-factors matter.</li>
        </ul>
      </Definition>

      <PracticeProblems section="SP.1–SP.4 Spin and Angular Momentum">
        <InteractiveProblem n={1} difficulty="easy"
          answer={0.5} unit="" tolerance={0.02}
          hints={['Eigenstates of Sx: |+x⟩ = (|↑⟩+|↓⟩)/√2. P(+x) = |⟨+x|↑⟩|².']}
          problemText="Electron in state |↑⟩ (spin-up along z). Probability of measuring +ℏ/2 along x?"
          solution={<>|⟨+x|↑⟩|² = |1/√2|² = <strong>0.5</strong></>}>
          An electron is in state |↑⟩. Find the probability of obtaining +ℏ/2 in an x-direction spin measurement.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={4} unit="" tolerance={0.01}
          hints={['Decompose ℓ=1, s=1/2. j = |ℓ−s|,...,ℓ+s. Total states = (2ℓ+1)(2s+1).']}
          problemText="Hydrogen 2p electron (ℓ=1, s=1/2). How many distinct |j, m_j⟩ states exist?"
          solution={<>j = 1/2 (2 states) + j = 3/2 (4 states) = <strong>4+2 = 6 states</strong>. Also (2ℓ+1)(2s+1) = 3×2 = 6 ✓</>}>
          Count the number of distinct |j, m_j⟩ states for a hydrogen 2p electron (ℓ=1, s=1/2).
        </InteractiveProblem>

        <Problem n={3} difficulty="easy"
          solution={<>Larmor precession: spin in magnetic field B = Bẑ. H = −γL·B = −γBSz where γ = eμB/(ℏ) = ge/(2m). Time evolution: |χ(t)⟩ = e^(−iHt/ℏ)|χ(0)⟩. For |χ(0)⟩ = |+x⟩ = (|↑⟩+|↓⟩)/√2: |χ(t)⟩ = (e^(iω₀t/2)|↑⟩ + e^(−iω₀t/2)|↓⟩)/√2, where ω₀ = γB. ⟨Sx(t)⟩ = (ℏ/2)cos(ω₀t), ⟨Sy(t)⟩ = (ℏ/2)sin(ω₀t), ⟨Sz⟩ = 0. The expectation value precesses around z at the Larmor frequency ω₀ = eB/m (for electron). This is the classical Larmor precession — Ehrenfest theorem. MRI uses this precession: radio pulses flip spins; relaxation back gives the MRI signal.</>}>
          An electron spin initially in the +x direction is placed in magnetic field B = Bẑ. Find how the expectation values ⟨Sx⟩, ⟨Sy⟩, ⟨Sz⟩ evolve in time.
        </Problem>

        <Problem n={4} difficulty="medium"
          solution={<>Bell&apos;s inequality experiment: particles in singlet state |Ψ⟩ = (|↑↓⟩−|↓↑⟩)/√2. Measure A at angle a, B at angle b. QM correlation: ⟨A·B⟩ = −cos(a−b). CHSH inequality: for local hidden variables, |E(a,b) − E(a,b&apos;) + E(a&apos;,b) + E(a&apos;,b&apos;)| ≤ 2. QM prediction with a=0°, a&apos;=45°, b=22.5°, b&apos;=67.5°: S = −cos(22.5°)+cos(67.5°)−cos(22.5°)−cos(22.5°) = −2√2 ≈ −2.83. |S| = 2√2 &gt; 2. QM violates Bell&apos;s inequality. Experiments (Aspect 1982, Hensen 2015) confirm QM — no local hidden variable theory can reproduce QM correlations. Entanglement is physically real.</>}>
          Two electrons are in the singlet state. Compute the CHSH parameter S for the optimal angles. Does quantum mechanics violate Bell&apos;s inequality?
        </Problem>

        <Problem n={5} difficulty="medium"
          solution={<>Spin-orbit fine structure for hydrogen 2p: l=1, s=1/2. j = l+s = 3/2 or j = l−s = 1/2. E_SO = ℏ²α/(2) × [j(j+1) − l(l+1) − s(s+1)] where α = ⟨1/r³⟩ × (1/2m²c²)(dV/dr). For hydrogen: ⟨1/r³⟩_(nl) = Z³/(n³ l(l+1/2)(l+1) a₀³). j=3/2 state: L·S = ℏ²(15/4−2−3/4)/2 = ℏ²/2. j=1/2 state: L·S = ℏ²(3/4−2−3/4)/2 = −ℏ². Splitting ΔE = (3/2)ℏ²α ≈ 4.5×10⁻⁵ eV. This is the 0.365 cm⁻¹ 2P₃/₂−2P₁/₂ splitting (sodium D-line: 589.0 and 589.6 nm).</>}>
          Calculate the spin-orbit fine structure splitting for the n=2 hydrogen levels. Which levels are split, and by how much?
        </Problem>

        <Problem n={6} difficulty="hard"
          solution={<>Density matrix formalism: ρ = |χ⟩⟨χ| for pure state; ρ = Σ pᵢ|χᵢ⟩⟨χᵢ| for mixed. For spin-½: ρ = ½(I + ⟨σ⟩·σ) where ⟨σ⟩ is the Bloch vector. Pure state: |⟨σ⟩| = 1 (on Bloch sphere surface). Mixed state: |⟨σ⟩| &lt; 1 (inside sphere). Completely mixed (unpolarized): ρ = I/2, ⟨σ⟩ = 0 (Bloch sphere center). Time evolution: iℏ dρ/dt = [H, ρ] (von Neumann equation). Measurement: P(meas outcome a) = Tr(Πₐρ). Entanglement: for two-qubit state, Tr(ρ²_A) = 1 for separable state; Tr(ρ²_A) &lt; 1 for entangled (ρ_A = partial trace over B). Singlet: ρ_A = I/2 → Tr(ρ²_A) = 1/2 — maximally entangled.</>}>
          Explain the density matrix formalism for spin-½. What is the Bloch vector? How does the density matrix distinguish pure states from mixed states and separable from entangled states?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        '[Lx, Ly] = iℏLz — angular momentum components don\'t commute; only L² and Lz are simultaneously definable.',
        'Quantum numbers: l = 0,1,2,...; m = −l,...,+l. Magnitude |L| = ℏ√(l(l+1)) ≠ ℏl.',
        'Spin-½: s = ½; eigenstates |↑⟩, |↓⟩; Pauli matrices σx, σy, σz represent spin operators.',
        'Two spin-½: j = 0 (singlet, antisymmetric) or j = 1 (triplet, symmetric). Clebsch-Gordan decomposition.',
        'Spin-orbit coupling H_SO ∝ L·S → fine structure splitting; j = l ± ½ levels have different energies.',
        'Wigner-Eckart: selection rules (Δl=±1, Δm=0,±1) follow from angular momentum algebra alone.',
      ]} />
    </div>
  );
}
