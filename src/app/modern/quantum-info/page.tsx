import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function QuantumInfoPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Advanced Topics</div>
      <h1>Quantum Information &amp; Computation</h1>
      <p className="subtitle">
        Quantum mechanics allows information processing fundamentally beyond classical limits.
        Quantum bits exploit superposition and entanglement to factor large numbers exponentially
        faster, generate provably secure keys, and simulate quantum systems efficiently.
      </p>

      <Prerequisites items={['Quantum mechanics (Ch. 20)', 'Spin & angular momentum (Ch. SP)', 'Linear algebra (Ch. LA)']} />

      <LearningGoals items={[
        'Represent single- and multi-qubit states on the Bloch sphere and in the computational basis.',
        'Apply quantum gates (H, CNOT, Pauli, phase) to create entangled Bell states and verify entanglement.',
        'Trace through the Deutsch-Jozsa, Grover, and Shor algorithms and quantify their quantum speedups.',
        'Prove the no-cloning theorem and explain its role in quantum key distribution security.',
        'Estimate the physical qubit overhead required for fault-tolerant quantum computation using surface codes.',
      ]} />

      <h2>QI.1 Qubits and Quantum States</h2>

      <p>
        A <strong>qubit</strong> is a two-level quantum system. In the computational basis:
        |0⟩ and |1⟩. A general single-qubit state:
      </p>

      <EqNumbered number="QI.1">|ψ⟩ = α|0⟩ + β|1⟩ &nbsp;&nbsp;&nbsp; with |α|² + |β|² = 1</EqNumbered>

      <p>
        The state lives on the <strong>Bloch sphere</strong>: |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ) sin(θ/2)|1⟩.
        The north pole is |0⟩, south pole |1⟩, equator is superpositions.
        Physical implementations: spin-½ (nuclear or electron), photon polarization,
        transmon circuit (superconducting qubit), trapped ion internal states, nitrogen-vacancy
        centers in diamond.
      </p>

      <p>
        An n-qubit system lives in a 2^n-dimensional Hilbert space. The general state:
        |ψ⟩ = Σ c_x |x⟩ for x ∈ {'{'}0,1{'}'}^n — requires 2^n complex amplitudes.
        A 300-qubit state cannot be stored classically (2^300 &gt; atoms in observable universe).
      </p>

      <Definition number="QI.1" title="Entanglement">
        A multi-qubit state is <strong>entangled</strong> if it cannot be written as a product
        of single-qubit states. The four Bell states are maximally entangled two-qubit states:
        <span style={{ display: 'block', marginTop: '0.5rem', textAlign: 'center', fontStyle: 'italic' }}>
          |Φ±⟩ = (|00⟩ ± |11⟩)/√2 &nbsp;&nbsp; |Ψ±⟩ = (|01⟩ ± |10⟩)/√2
        </span>
        Measuring one qubit instantly collapses the other — but no information is transmitted
        (no-communication theorem). Entanglement is a resource for quantum teleportation,
        dense coding, and quantum cryptography.
      </Definition>

      <h2>QI.2 Quantum Gates and Circuits</h2>

      <p>
        Quantum operations on n qubits are <strong>unitary matrices</strong> U ∈ U(2^n).
        Single-qubit gates correspond to rotations of the Bloch sphere:
      </p>

      <p>
        <strong>Pauli gates:</strong> X = [[0,1],[1,0]] (bit flip), Y = [[0,−i],[i,0]], Z = [[1,0],[0,−1]] (phase flip).
      </p>
      <p>
        <strong>Hadamard:</strong> H = (1/√2)[[1,1],[1,−1]]. Maps |0⟩ → (|0⟩+|1⟩)/√2, creates superposition.
      </p>
      <p>
        <strong>Phase gate:</strong> S = [[1,0],[0,i]], T = [[1,0],[0,e^(iπ/4)]].
      </p>

      <p>
        <strong>Two-qubit gates:</strong> CNOT (controlled-NOT): flips target if control = |1⟩.
        Matrix: [[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]] in the |00⟩, |01⟩, |10⟩, |11⟩ basis.
        CNOT + single-qubit gates form a <strong>universal gate set</strong> — any unitary can
        be approximated to arbitrary precision (Solovay-Kitaev theorem, O(log³(1/ε)) gates).
      </p>

      <WorkedExample number="QI.1" title="Creating a Bell State">
        <p>
          Show how to create the entangled state |Φ+⟩ = (|00⟩ + |11⟩)/√2 from |00⟩
          using H and CNOT.
        </p>
        <Step label="Start:">|ψ₀⟩ = |00⟩</Step>
        <Step label="Apply H to qubit 1:">|ψ₁⟩ = (H ⊗ I)|00⟩ = (|0⟩+|1⟩)/√2 ⊗ |0⟩ = (|00⟩+|10⟩)/√2</Step>
        <Step label="Apply CNOT (control=1, target=2):">|ψ₂⟩ = CNOT|ψ₁⟩ = (|00⟩+|11⟩)/√2 = |Φ+⟩ ✓</Step>
        <Step label="Verify entanglement:">Cannot write |Φ+⟩ = (a|0⟩+b|1⟩)(c|0⟩+d|1⟩) for any a,b,c,d. Proof: would require ac=1/√2, ad=0, bc=0, bd=1/√2. From ad=0: a=0 or d=0. From ac=1/√2 ≠ 0: a≠0, so d=0. But bd=0 and bd=1/√2 — contradiction.</Step>
        <Step label="Measurement:">Measure qubit 1 in |0⟩,|1⟩ basis. If result |0⟩ (prob ½): qubit 2 collapses to |0⟩. If result |1⟩ (prob ½): qubit 2 collapses to |1⟩. Perfect correlation — EPR pair.</Step>
      </WorkedExample>

      <h2>QI.3 Quantum Algorithms</h2>

      <p>
        <strong>Deutsch-Jozsa</strong>: determines if f:{'{'}0,1{'}'}^n → {'{'}0,1{'}'} is constant or balanced
        in ONE query (classically needs 2^(n−1)+1 queries in the worst case). Demonstrates
        quantum parallelism — all 2^n inputs evaluated simultaneously.
      </p>

      <p>
        <strong>Grover&apos;s algorithm</strong>: searches an unsorted database of N items for a
        marked item in O(√N) queries (classical: O(N)). The quantum speedup is quadratic:
        for N = 10⁶, classical needs ~500,000 queries; Grover needs ~785.
      </p>

      <p>
        <strong>Shor&apos;s algorithm</strong> (1994): factors an n-bit number N in O(n³) time
        (polynomial). Best classical: O(e^(cn^(1/3) (log n)^(2/3))) (sub-exponential).
        A 2048-bit RSA key would require ∼4×10⁹ quantum gates on a fault-tolerant quantum
        computer — breaking public-key cryptography. Shor uses the quantum Fourier transform
        (QFT) to find the period of f(x) = a^x mod N, which determines the factors.
      </p>

      <Theorem number="QI.1" title="No-Cloning Theorem">
        It is impossible to create an exact copy of an arbitrary unknown quantum state.
        Proof: suppose a unitary U copies states: U(|ψ⟩|0⟩) = |ψ⟩|ψ⟩ for all |ψ⟩. Apply
        to |ψ⟩ = (|0⟩+|1⟩)/√2:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          U(|+⟩|0⟩) = |+⟩|+⟩ = (|00⟩+|01⟩+|10⟩+|11⟩)/2
        </span>
        But linearity of U requires U(|+⟩|0⟩) = (U(|0⟩|0⟩)+U(|1⟩|0⟩))/√2 = (|00⟩+|11⟩)/√2 — contradiction.
        Consequence: quantum states cannot be copied. This is why quantum error correction
        is non-trivial — you cannot simply back up qubits. It also prevents eavesdroppers
        from quietly copying a quantum key (basis of BB84 security).
      </Theorem>

      <h2>QI.4 Quantum Error Correction</h2>

      <p>
        Qubits decohere — they interact with the environment and lose their quantum state.
        Decoherence times: superconducting qubits ∼100 μs, trapped ions ∼seconds. Any
        useful quantum computation needs error correction.
      </p>

      <p>
        The key insight: encode one <strong>logical qubit</strong> in many <strong>physical qubits</strong>.
        The <strong>3-qubit repetition code</strong>: |0⟩_L = |000⟩, |1⟩_L = |111⟩. Detects
        (but doesn&apos;t correct) a single bit flip. Full correction needs more qubits.
      </p>

      <p>
        The <strong>Shor code</strong> (1995): 9 physical qubits per logical qubit. Corrects
        any single-qubit error (bit flip OR phase flip). Modern surface codes: ∼1000 physical
        qubits per logical qubit for a logical error rate of 10⁻¹⁵ (fault-tolerant threshold:
        physical error rate &lt; ∼1%). Google&apos;s 72-qubit Sycamore has ∼0.1% two-qubit gate error
        — approaching but not yet at fault-tolerant threshold.
      </p>

      <h2>QI.5 Quantum Cryptography</h2>

      <p>
        <strong>BB84 protocol</strong> (Bennett-Brassard, 1984): Alice sends photons in one of
        four polarization states (0°, 45°, 90°, 135°). Bob measures in randomly chosen bases.
        They publicly compare bases (not results) and keep bits where bases matched. Any
        eavesdropper disturbs the quantum state (no-cloning theorem) and is detectable via
        elevated error rate. Security is unconditional — based on quantum mechanics, not
        computational hardness.
      </p>

      <p>
        <strong>Quantum key distribution</strong> (QKD) networks are commercially deployed:
        Chinese satellite Micius demonstrated QKD over 1200 km (2017). The Toshiba system
        achieves Mbit/s key rates over fiber.
      </p>

      <Definition number="QI.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Qubits are amplitudes, not probabilities:</strong> phases matter until measurement.</li>
          <li><strong>Entanglement is not cloning:</strong> unknown quantum states cannot be copied perfectly.</li>
          <li><strong>Measurement is basis-dependent:</strong> changing the basis changes outcome probabilities.</li>
          <li><strong>Error correction protects logical states:</strong> it detects syndromes without learning the encoded quantum information.</li>
        </ul>
      </Definition>

      <PracticeProblems section="QI.1–QI.5 Quantum Information">
        <Problem n={1} difficulty="easy"
          solution={<>Deutsch algorithm: one query determines if f:{'{'}0,1{'}'} → {'{'}0,1{'}'} is constant (f(0)=f(1)) or balanced (f(0)≠f(1)). Circuit: start |0⟩|1⟩. Apply H⊗H: (|0⟩+|1⟩)/√2 × (|0⟩−|1⟩)/√2. Apply U_f: U_f|x⟩|y⟩ = |x⟩|y⊕f(x)⟩. (|0⟩+|1⟩)/√2 × (|0⟩−|1⟩)/√2 → (−1)^f(0)|0⟩(|0⟩−|1⟩)/√2 and (−1)^f(1)|1⟩(|0⟩−|1⟩)/√2 → [(−1)^f(0)|0⟩+(−1)^f(1)|1⟩]/√2 × (|0⟩−|1⟩)/√2. If constant: (−1)^f(0)(|0⟩+|1⟩)/√2 → after H: |0⟩. If balanced: (|0⟩−|1⟩)/√2 (up to global phase) → after H: |1⟩. Measure first qubit: 0 = constant, 1 = balanced. One query vs. classical 2 queries. This problem is trivial but demonstrates that quantum parallelism can provide exponential speedup in structured problems.</>}>
          Walk through the Deutsch algorithm for a single-bit function. Why does it determine constant-vs-balanced in one query when classical requires two?
        </Problem>

        <Problem n={2} difficulty="medium"
          solution={<>Quantum teleportation: transfers |ψ⟩ = α|0⟩+β|1⟩ from Alice to Bob using shared Bell pair + 2 classical bits. Protocol: (1) Alice and Bob share |Φ+⟩ = (|00⟩+|11⟩)/√2 (qubits 2 and 3). (2) Full state: |ψ⟩ ⊗ |Φ+⟩ = (α|0⟩+β|1⟩)(|00⟩+|11⟩)/√2. (3) Alice applies CNOT (1→2), then H to qubit 1. Full state expands to: ¼[|00⟩(α|0⟩+β|1⟩) + |01⟩(α|1⟩+β|0⟩) + |10⟩(α|0⟩−β|1⟩) + |11⟩(α|1⟩−β|0⟩)]. (4) Alice measures qubits 1,2 → gets 00, 01, 10, or 11. (5) Alice sends result (2 classical bits) to Bob. (6) Bob applies corrections: 00→I, 01→X, 10→Z, 11→ZX to qubit 3. Result: Bob&apos;s qubit 3 = |ψ⟩. No-cloning not violated: Alice&apos;s qubit 1 is destroyed by measurement. No FTL: Bob must receive 2 classical bits before applying correction.</>}>
          Describe quantum teleportation. Why doesn't it violate no-cloning or allow faster-than-light communication?
        </Problem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={1} unit="Grover iterations" tolerance={0.01}
          hints={['For N items, the number of Grover iterations needed is ⌊π√N/4⌋', 'For N = 4: π√4/4 = π/2 ≈ 1.57, so floor to 1 iteration gives probability 1']}
          problemText="How many Grover iterations are needed to find a marked item with certainty when searching N = 4 items?"
          solution={<>Grover iteration for N = 4 (2 qubits, 1 marked item |11⟩). Oracle O: flips phase of |11⟩ → O|x⟩ = −|x⟩ if x=11, else |x⟩. Diffusion operator D = 2|s⟩⟨s| − I where |s⟩ = H⊗²|00⟩ = (|00⟩+|01⟩+|10⟩+|11⟩)/2. Start: |s⟩ (uniform superposition). After O: (|00⟩+|01⟩+|10⟩−|11⟩)/2 (flip |11⟩ amplitude). After D (invert about mean): mean = (1+1+1−1)/(4×2) = 1/4 × amplitude... After 1 Grover step: |11⟩ amplitude becomes 1 (prob=1). For N=4: exact in 1 step. For general N: need π√N/4 iterations (rounded). For N=1000: 25 steps vs 500 classical average. Quantum speedup: quadratic O(√N) vs classical O(N). Cannot do better than √N (BBBV lower bound). Grover is optimal for unstructured search.</>}>
          Apply one step of Grover's algorithm to search N = 4 items for a marked state. Show that a single iteration is sufficient to find the answer.
        </InteractiveProblem>

        <InteractiveProblem n={4} difficulty="hard"
          answer={12e6} unit="physical qubits" tolerance={0.5}
          hints={['With surface code distance d, you need ~2d² physical qubits per logical qubit (data + ancilla)', 'For 2048-bit RSA factoring, estimate ~6000 logical qubits and find d ≈ 27 for p = 0.1%']}
          problemText="Estimate the total number of physical qubits required to factor a 2048-bit RSA key using surface codes at a physical gate error rate of p = 0.1%, given a fault-tolerance threshold of p_th = 1%."
          solution={<>Quantum error correction threshold theorem: below a critical error rate p_th per gate (∼1%), arbitrarily long quantum computation possible with polynomial overhead. Surface code: arrange qubits on 2D grid with ancilla qubits for syndrome measurement. Logical qubit: d×d grid (d = code distance). Logical error rate: p_L ∼ (p/p_th)^(d/2). For p = 10⁻³, p_th = 10⁻², p_L ∼ (0.1)^(d/2). For d = 7: p_L ∼ 10⁻³·⁵ ≈ 3×10⁻⁴ (worse! — too few qubits). For d = 15: p_L ∼ 10⁻⁷·⁵ ≈ 3×10⁻⁸ (better). To factor a 2048-bit RSA key: ∼10¹⁰ gates, need p_L &lt; 10⁻¹¹ per gate → d ≈ 27 → (27)² ≈ 730 physical qubits per logical, plus ancillas ∼ 2000. Total: ∼6000 logical qubits × 2000 physical ≈ 12 million physical qubits at p=0.1%. Current state (2024): Google Willow 105 qubits, below threshold. Cryptographically relevant quantum computing: ∼10 years away at current pace.</>}>
          Estimate the number of physical qubits needed for fault-tolerant factoring of a 2048-bit RSA key using surface codes. What error rate threshold must physical gates satisfy?
        </InteractiveProblem>
      </PracticeProblems>

      <Takeaways items={[
        'Qubit: |ψ⟩ = α|0⟩+β|1⟩, Bloch sphere. n qubits span 2^n-dimensional Hilbert space.',
        'Bell states: maximally entangled 2-qubit states. Entanglement is a computational/cryptographic resource.',
        'Universal gates: single-qubit rotations + CNOT. Solovay-Kitaev: efficient approximation.',
        'No-cloning: unknown quantum states cannot be copied. Basis of QKD security.',
        'Shor: factor N in poly(log N) time. Grover: search N items in O(√N). Both exponentially beat classical.',
        'Error correction: surface codes need ~1000 physical qubits per logical, threshold ~1% error rate.',
      ]} />
    </div>
  );
}
