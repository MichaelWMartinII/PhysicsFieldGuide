import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function TopologicalPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Advanced Topics</div>
      <h1>Topological Phases of Matter</h1>
      <p className="subtitle">
        Topology — the mathematics of shapes and connectivity — enters condensed matter physics
        in a profound way. Topological insulators, the quantum Hall effect, and topological
        superconductors host protected surface states and exotic quasiparticles that cannot
        be removed by any smooth perturbation.
      </p>

      <Prerequisites items={['Solid-state physics (Ch. SS)', 'Quantum mechanics (Ch. 20)', 'Group theory (Ch. GT)', 'Linear algebra (Ch. LA)']} />

      <LearningGoals items={[
        'Define the Berry phase and Berry curvature and compute them for a spin-1/2 in a rotating magnetic field.',
        'Derive the TKNN formula relating Hall conductance to the first Chern number of filled Bloch bands.',
        'Classify 1D topological phases using the SSH model winding number and identify protected edge states.',
        'Explain how time-reversal symmetry gives rise to the Z₂ invariant and spin-momentum-locked surface states in 3D topological insulators.',
        'Describe Majorana bound states in the Kitaev chain and their potential role in topological quantum computation.',
      ]} />

      <h2>TP.1 Topology in Quantum Mechanics</h2>

      <p>
        In band theory, the electronic states at each crystal momentum k form a Hilbert space.
        As k traverses the Brillouin zone (a torus T^d in d dimensions), the occupied bands
        define a <strong>vector bundle</strong> — and vector bundles are classified by
        topological invariants.
      </p>

      <p>
        The key invariant: the <strong>Berry phase</strong>. As k evolves slowly around a loop
        in the Brillouin zone, the eigenstate |u_k⟩ acquires a geometric phase:
      </p>

      <EqNumbered number="TP.1">γ = i ∮ ⟨u_k|∇_k|u_k⟩ · dk &nbsp;&nbsp;&nbsp; (Berry phase around a loop in k-space)</EqNumbered>

      <p>
        The integrand A_k = i⟨u_k|∇_k|u_k⟩ is the <strong>Berry connection</strong> (analogous
        to the vector potential A in electromagnetism). The associated curvature is the
        <strong>Berry curvature</strong>: Ω_k = ∇_k × A_k (analogous to the magnetic field B).
      </p>

      <h2>TP.2 The Quantum Hall Effect and Chern Numbers</h2>

      <p>
        In a 2D electron gas under strong perpendicular magnetic field B, the Hall conductance
        is quantized with extraordinary precision:
      </p>

      <EqNumbered number="TP.2">σ_xy = ν × e²/h &nbsp;&nbsp;&nbsp; (integer quantum Hall effect, IQHE)</EqNumbered>

      <p>
        where ν = 1, 2, 3, ... is an integer. The quantization is exact — better than 1 part in
        10⁹ — independent of sample size, purity, or microscopic details. This robustness is
        topological in origin.
      </p>

      <Theorem number="TP.1" title="TKNN Formula — Chern Number">
        Thouless, Kohmoto, Nightingale, den Nijs (1982): the Hall conductance of a filled band
        is given by the first Chern number C₁:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          σ_xy = C₁ × e²/h &nbsp;&nbsp;&nbsp; C₁ = (1/2π) ∫_BZ Ω_k d²k ∈ ℤ
        </span>
        The Chern number C₁ is a topological invariant — it cannot change without closing
        the band gap. A sample with C₁ = 1 and a vacuum with C₁ = 0 must have a topological
        interface — a gapless edge state that conducts without dissipation. This is the
        quantum Hall edge channel.
      </Theorem>

      <p>
        The fractional quantum Hall effect (ν = 1/3, 2/5, ...) requires strongly correlated
        states — Laughlin wavefunctions — beyond simple band theory. The elementary excitations
        carry fractional charge e/3 (Nobel 1998 to Laughlin, Störmer, Tsui). These anyons
        (with fractional statistics) are candidates for topological quantum computing.
      </p>

      <h2>TP.3 Time-Reversal Invariant Topological Insulators</h2>

      <p>
        Without a magnetic field, time-reversal symmetry T² = −1 (for spin-½ particles) allows
        a different topological invariant — the <strong>ℤ₂ invariant</strong> ν ∈ {'{'}0, 1{'}'}.
      </p>

      <p>
        ν = 0: ordinary insulator. ν = 1: <strong>topological insulator</strong> (TI).
        The TI has a bulk band gap but gapless surface states — protected by time-reversal
        symmetry. These surface states cannot be gapped without breaking time-reversal or
        closing the bulk gap.
      </p>

      <p>
        Key feature: <strong>spin-momentum locking</strong>. The surface Dirac cone has
        spin perpendicular to momentum — spin up goes right, spin down goes left. Backscattering
        (k → −k) requires flipping spin, which is forbidden by time-reversal. This makes the
        surface states immune to non-magnetic disorder.
      </p>

      <p>
        First 2D TI: HgTe quantum wells (König et al., 2007, Science). First 3D TI:
        Bi₂Se₃ (Chen et al., 2009) — metallic Dirac cone on the surface, insulating bulk.
        ARPES directly images the Dirac cone surface state.
      </p>

      <WorkedExample number="TP.1" title="SSH Model — 1D Topological Insulator">
        <p>
          The Su-Schrieffer-Heeger (SSH) model: 1D chain with alternating hopping t₁ (intracell)
          and t₂ (intercell). Find the bulk invariant and edge states.
        </p>
        <Step label="Bloch Hamiltonian:">H(k) = (t₁ + t₂ cos k)σ_x + t₂ sin k σ_y (2×2 matrix, two sites per unit cell). Eigenvalues: E = ±√((t₁+t₂cos k)² + t₂²sin²k).</Step>
        <Step label="Gap condition:">Gap closes at k = 0: t₁ + t₂ = 0 → |t₁| = t₂. Gap closes at k = π: t₁ − t₂ = 0 → t₁ = t₂. Phase transition at |t₁| = |t₂|.</Step>
        <Step label="Winding number:">The Hamiltonian H(k) = d(k)·σ. As k: 0 → 2π, d(k) = (t₁+t₂cos k, t₂sin k) traces an ellipse. Winding number W = number of times it winds around origin. W = 0 for t₁ &gt; t₂ (trivial); W = 1 for t₁ &lt; t₂ (topological).</Step>
        <Step label="Edge states:">Topological phase (t₂ &gt; t₁): semi-infinite chain has zero-energy edge state localized at the boundary, with wavefunction decaying as (t₁/t₂)^n. Two edge states at opposite ends — robust to perturbations that preserve chiral symmetry.</Step>
        <Step label="Physical realization:">Polyacetylene (CH)_n in dimerized (Peierls) phase — the SSH model. Soliton defects carry charge e/2 (fractionalization). Modern realizations: photonic lattices, ultracold atoms, acoustic metamaterials.</Step>
      </WorkedExample>

      <h2>TP.4 Topological Superconductors and Majorana Fermions</h2>

      <p>
        A <strong>topological superconductor</strong> has a superconducting bulk gap but
        hosts <strong>Majorana bound states</strong> at its boundaries. Majorana fermions
        are their own antiparticle: γ† = γ. They obey non-Abelian statistics.
      </p>

      <p>
        The <strong>Kitaev chain</strong> model: 1D chain of spinless fermions with p-wave
        pairing Δ. Topological phase for |μ| &lt; 2t. Majorana modes at each end:
        γ₁ = c₁ + c₁†, γ₂ = i(c_N − c_N†). The two Majoranas form a zero-energy
        non-local fermion c = (γ₁ + iγ₂)/2 — the ground state is degenerate (two-fold:
        c|0⟩ and |0⟩).
      </p>

      <p>
        Non-Abelian anyons: exchanging two Majoranas performs a unitary rotation in the
        degenerate ground state subspace. This rotation depends on the order of exchanges —
        non-commuting, hence non-Abelian. <strong>Topological quantum computation</strong>:
        encode qubits in Majorana pairs; gates implemented by braiding. Errors require
        exciting quasiparticles across the gap — exponentially suppressed.
      </p>

      <p>
        Experimental candidates: semiconductor nanowires (InAs, InSb) with strong spin-orbit
        coupling, proximity-coupled to s-wave superconductors and in a magnetic field.
        Zero-bias conductance peak signatures observed but not yet conclusively proven to be
        Majorana (2012–2024). Recent Microsoft experiments (2023) show promising signatures.
      </p>

      <h2>TP.5 Weyl Semimetals</h2>

      <p>
        A <strong>Weyl semimetal</strong> is a 3D material with band crossings (Weyl points)
        in the bulk. Near each crossing, the Hamiltonian:
      </p>

      <EqNumbered number="TP.3">H(k) = ±v_F (k · σ) &nbsp;&nbsp;&nbsp; (Weyl Hamiltonian, ± = chirality)</EqNumbered>

      <p>
        Weyl points act as monopoles of Berry curvature in k-space — they come in pairs of
        opposite chirality (Nielsen-Ninomiya theorem) and cannot be annihilated individually.
        On the surface, Weyl points project onto arcs — <strong>Fermi arcs</strong> — open
        contours connecting projections of Weyl points of opposite chirality.
      </p>

      <p>
        The <strong>chiral anomaly</strong>: in a parallel E and B field, charge is pumped
        between Weyl nodes of opposite chirality → negative magnetoresistance. First observed
        in TaAs (2015). Weyl semimetals are 3D analogues of graphene&apos;s Dirac points, but
        topologically protected in 3D.
      </p>

      <Definition number="TP.1" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Topology is global:</strong> local perturbations cannot change an invariant without closing a gap.</li>
          <li><strong>Edge states depend on bulk topology:</strong> they are not ordinary surface defects.</li>
          <li><strong>Berry phase is gauge-sensitive but observables are not:</strong> invariants remove arbitrary phase choices.</li>
          <li><strong>Protection has limits:</strong> disorder or interactions that break required symmetries can destroy a phase.</li>
        </ul>
      </Definition>

      <PracticeProblems section="TP.1–TP.5 Topological Phases">
        <InteractiveProblem n={1} difficulty="easy"
          answer={-3.14159} unit="radians" tolerance={0.05}
          hints={['The Berry phase for a spin-½ around a loop subtending solid angle Ω is γ = −Ω/2', 'An equatorial loop (θ = π/2) on the unit sphere subtends solid angle Ω = 2π']}
          problemText="Calculate the Berry phase γ acquired by a spin-½ particle when its quantization axis traces an equatorial loop (solid angle Ω = 2π) on the Bloch sphere."
          solution={<>Berry phase for a spin-½ in a magnetic field B = B(sin θ cos φ, sin θ sin φ, cos θ). The ground state |+;n̂⟩ precesses as B rotates. Berry phase for a closed loop C on the unit sphere: γ = −½ Ω(C) where Ω is the solid angle subtended. For equatorial loop (θ = π/2): Ω = 2π → γ = −π. For general solid angle Ω: γ = −Ω/2. This half-integer is the signature of spin-½. Berry curvature: Ω_k = −σ/(2r³) — monopole of strength −½ at origin in parameter space (the Dirac monopole in disguise). Physical consequence: Aharonov-Bohm-like phase in spin systems; measured via neutron interferometry. The ±π phase difference between spin-up and spin-down after a 2π rotation (spinor sign change) is this Berry phase.</>}>
          Calculate the Berry phase for a spin-½ particle when its quantization axis traces a closed loop of solid angle Ω on the Bloch sphere. What is the result for an equatorial loop?
        </InteractiveProblem>

        <Problem n={2} difficulty="medium"
          solution={<>Chern number for 2-band model H(k) = d(k)·σ where d = (d_x, d_y, d_z). Chern number: C₁ = (1/4π)∫_BZ d̂·(∂d̂/∂k_x × ∂d̂/∂k_y) dk_x dk_y — the solid angle swept by d̂(k) over the BZ. Dirac Hamiltonian: H = v_F(k_x σ_x + k_y σ_y) + m σ_z (massive 2D Dirac fermion). d = (v_F k_x, v_F k_y, m). At k=0: d = mẑ (north/south pole depending on sign of m). As k → ∞: d → (v_F k_x, v_F k_y, m) → mostly in-plane. Topological transition at m=0: gap closes. For m &lt; 0: C₁ = +½ (half-integer → need to regularize at UV). Lattice version gives integer C₁. Physical: the sign change of the mass at a domain wall gives a chiral edge mode. This is the Jackiw-Rebbi mechanism — a bound state at each sign change of the mass.</>}>
          Compute the Chern number for the 2D massive Dirac Hamiltonian H = v_F(k_x σ_x + k_y σ_y) + m σ_z. Show it changes at m = 0.
        </Problem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={17e-3} unit="eV" tolerance={0.05}
          hints={['Cyclotron frequency: ω_c = eB/m* with m* = 0.07×9.11×10⁻³¹ kg and B = 10 T', 'Landau level spacing: ℏω_c, then convert joules to eV by dividing by 1.6×10⁻¹⁹']}
          problemText="Calculate the Landau level spacing ℏω_c in eV for GaAs (m* = 0.07 m_e) in a perpendicular magnetic field B = 10 T."
          solution={<>Landau levels in a magnetic field B = Bẑ. Hamiltonian: H = (p + eA)²/(2m). In Landau gauge A = (0, Bx, 0): H = p_x²/(2m) + (p_y + eBx)²/(2m). Let ky = k (good quantum number). H = p_x²/(2m) + ½m ω_c²(x − k l_B²)² where l_B = √(ℏ/eB) (magnetic length), ω_c = eB/m. This is SHO centered at X_0 = k l_B². Energy: E_n = ℏω_c(n + ½), n = 0,1,2... (Landau levels). Degeneracy: N = Area/(2π l_B²) = eBArea/(h) per Landau level per spin. Filling factor ν = n_e/(eB/h) = number of filled Landau levels = integer for IQHE. For B=10T, m*=0.07m_e (GaAs): ω_c = 1.6×10⁻¹⁹×10/(0.07×9.11×10⁻³¹) = 2.5×10¹³ rad/s. Level spacing ℏω_c = 17 meV ≫ k_BT at T=4K (0.35 meV). IQHE requires T ≪ ℏω_c/k_B ≈ 200 K.</>}>
          Derive the Landau level spectrum in a perpendicular magnetic field. What is the degeneracy per level? At what temperature does the IQHE occur for GaAs (m* = 0.07m_e) in B = 10 T?
        </InteractiveProblem>

        <Problem n={4} difficulty="hard"
          solution={<>Topological classification: tenfold way (Altland-Zirnbauer). Symmetry classes determined by presence/absence of: time reversal T (T²=+1 or −1), particle-hole C (C²=+1 or −1), chiral S = TC. Ten classes × spatial dimension d → topological invariant. Key examples: class D (superconductors, T broken, C²=+1): 1D → ℤ₂ (Kitaev chain), 2D → ℤ (chiral Majorana). Class DIII (T²=−1, C²=+1): 1D → ℤ₂, 3D → ℤ (He-3 B phase). Class AII (T²=−1, no C): 2D → ℤ₂ (QSHI), 3D → ℤ₂ (3D TI, Bi₂Se₃). Bulk-boundary correspondence: each topological phase has protected boundary states. ℤ invariant: number of protected edge modes. ℤ₂ invariant: even/odd number of Kramers pairs at boundary. The periodic table has a mod-2 and mod-8 periodicity in dimension (Bott periodicity from K-theory). This mathematical structure connects to the K-theory classification of Hamiltonians as fiber bundles over momentum space.</>}>
          Describe the tenfold way classification of topological insulators and superconductors. What symmetry classes govern 3D topological insulators and 1D topological superconductors?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Berry phase γ = i∮⟨u|∇_k|u⟩·dk: geometric phase from adiabatic evolution in parameter space.',
        'Chern number C₁ = (1/2π)∫Ω_k d²k ∈ ℤ. Hall conductance σ_xy = C₁ e²/h (TKNN).',
        'Topological insulators: ℤ₂ invariant from T²=−1. Gapless Dirac surface states, spin-momentum locking.',
        'SSH model: winding number W=0 (trivial) or W=1 (topological). Edge zero modes in topological phase.',
        'Majorana fermions (γ†=γ): at ends of Kitaev chain. Non-Abelian statistics → topological qubits.',
        'Tenfold way: 10 symmetry classes × dimension → periodic table of topological phases.',
      ]} />
    </div>
  );
}
