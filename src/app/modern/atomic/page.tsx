import HydrogenSpectrumClient from '@/components/sims/HydrogenSpectrumClient';
import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function AtomicPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Chapter 21</div>
      <h1>Atomic Structure</h1>
      <p className="subtitle">
        The hydrogen atom is exactly solvable by quantum mechanics, yielding energy levels,
        orbitals, and selection rules that explain every spectral line ever observed.
      </p>

      <Prerequisites items={['Quantum mechanics (Ch. 20)', 'Electrostatics — Coulomb potential (Ch. 13)']} />

      <LearningGoals items={[
        'Calculate hydrogen energy levels and orbital radii using the Bohr model.',
        'Identify the spectral series of hydrogen and compute photon wavelengths for transitions.',
        'Label electron states with all four quantum numbers and determine orbital degeneracy.',
        'Apply the Pauli exclusion principle to write ground-state electron configurations.',
        'Explain how the Stern-Gerlach experiment reveals quantized spin and the two spin states.',
      ]} />

      <h2>21.1 The Bohr Model</h2>

      <p>
        Niels Bohr proposed in 1913 that the electron in hydrogen orbits the proton only at
        specific radii where the angular momentum is quantized: L = nℏ (n = 1, 2, 3, …).
        Setting the Coulomb attraction equal to centripetal force and imposing this condition
        yields discrete radii and energies:
      </p>

      <EqNumbered number="21.1">r_n = n² a₀ &nbsp;&nbsp;&nbsp; (a₀ = 0.0529 nm = Bohr radius)</EqNumbered>

      <EqNumbered number="21.2">E_n = −13.6 eV / n²</EqNumbered>

      <p>
        The ground state (n = 1) has E₁ = −13.6 eV. The minus sign means the electron is
        bound — you must supply 13.6 eV to ionize hydrogen from the ground state. The Bohr
        model correctly predicts hydrogen&apos;s spectrum but fails for multi-electron atoms and
        cannot explain line intensities or fine structure. It was superseded by Schrödinger&apos;s
        equation — but its energy levels are exactly right for hydrogen.
      </p>

      <WorkedExample number="21.1" title="Hydrogen Spectral Lines — the Balmer Series">
        <p>
          Find the wavelength of the photon emitted when hydrogen transitions from n=3 to n=2.
          This is the H-α line, the prominent red line of hydrogen.
        </p>
        <Step label="Energies:">E₃ = −13.6/9 = −1.511 eV &nbsp; E₂ = −13.6/4 = −3.400 eV</Step>
        <Step label="Photon energy:">ΔE = E₃ − E₂ = −1.511 − (−3.400) = 1.889 eV</Step>
        <Step label="Wavelength:">λ = hc/ΔE = (4.136×10⁻¹⁵ eV·s × 3×10⁸ m/s) / 1.889 eV = <strong>657 nm</strong> (red ✓)</Step>
      </WorkedExample>

      <Figure number="21.1" caption="Hydrogen spectral series. The left panel shows the energy level diagram with transition arrows; the right panel shows the resulting spectral lines at their actual wavelengths. Toggle between the Lyman (UV), Balmer (visible), and Paschen (IR) series. Click a transition label to highlight it.">
        <HydrogenSpectrumClient />
      </Figure>

      <Definition number="21.1" title="Spectral Series of Hydrogen">
        <span style={{ display: 'block', marginBottom: '0.3rem' }}>Lyman series: transitions to n=1 (ultraviolet, 91–122 nm)</span>
        <span style={{ display: 'block', marginBottom: '0.3rem' }}>Balmer series: transitions to n=2 (visible, 365–656 nm) — the series visible to the naked eye</span>
        <span style={{ display: 'block', marginBottom: '0.3rem' }}>Paschen series: transitions to n=3 (near infrared)</span>
        <span style={{ display: 'block' }}>General: 1/λ = R_H (1/n_f² − 1/n_i²), R_H = 1.097×10⁷ m⁻¹ (Rydberg constant)</span>
      </Definition>

      <h2>21.2 Quantum Numbers and Orbitals</h2>

      <p>
        Solving the Schrödinger equation in 3D with the Coulomb potential gives four quantum numbers
        that completely characterize each electron state:
      </p>

      <Definition number="21.2" title="The Four Quantum Numbers">
        <span style={{ display: 'block', marginBottom: '0.3rem' }}>
          <strong>n</strong> (principal): n = 1, 2, 3, … &nbsp; Determines energy: E_n = −13.6/n² eV. Shell.
        </span>
        <span style={{ display: 'block', marginBottom: '0.3rem' }}>
          <strong>ℓ</strong> (angular momentum): ℓ = 0, 1, …, n−1. &nbsp; Subshell (s, p, d, f for ℓ = 0,1,2,3). Shape of orbital.
        </span>
        <span style={{ display: 'block', marginBottom: '0.3rem' }}>
          <strong>m_ℓ</strong> (magnetic): m_ℓ = −ℓ, …, 0, …, +ℓ. &nbsp; Orientation in space.
        </span>
        <span style={{ display: 'block' }}>
          <strong>m_s</strong> (spin): m_s = +½ or −½. &nbsp; Intrinsic angular momentum of the electron.
        </span>
      </Definition>

      <p>
        The orbital shapes are striking: s orbitals are spherical, p orbitals have two lobes
        along an axis (p_x, p_y, p_z), d orbitals have four lobes. The <strong>probability density</strong>
        |ψ|² gives the region of space where the electron is likely to be found — not a definite
        orbit but a cloud.
      </p>

      <h2>21.3 The Pauli Exclusion Principle and the Periodic Table</h2>

      <Definition number="21.3" title="Pauli Exclusion Principle (1925)">
        No two electrons in an atom can have the same set of four quantum numbers (n, ℓ, m_ℓ, m_s).
        Each quantum state can hold at most one electron.
      </Definition>

      <p>
        This principle, combined with the energy ordering of orbitals, explains the entire
        periodic table. Electrons fill the lowest available states (aufbau principle), with
        at most two per orbital (spin up and spin down). The filling order explains why:
      </p>

      <p>
        n=1: 1s² (2 electrons) → Helium is noble (full shell)<br />
        n=2: 2s² 2p⁶ (8 electrons) → Neon is noble<br />
        n=3: 3s² 3p⁶ (8 electrons) → Argon is noble<br />
        Transition metals: 3d subshell fills after 4s (energy ordering crosses at n=3,4)
      </p>

      <p>
        Chemical properties — valence, bonding, reactivity — follow from the outermost electrons
        and their quantum numbers. Quantum mechanics reduces chemistry to physics.
      </p>

      <h2>21.4 Electron Spin and the Stern-Gerlach Experiment</h2>

      <p>
        In 1922, Stern and Gerlach sent silver atoms through an inhomogeneous magnetic field
        and observed the beam split into exactly two components — not a continuous smear.
        This demonstrated that the angular momentum of the valence electron is quantized with
        only two possible projections: m_s = +½ and m_s = −½. This intrinsic angular
        momentum — <strong>spin</strong> — has no classical analogue. Its magnitude is
        |S| = ℏ√(s(s+1)) = ℏ(√3)/2 for spin-½ particles.
      </p>

      <WorkedExample number="21.2" title="Electron Configuration of Iron">
        <p>
          Write the ground-state electron configuration of iron (Z = 26) and identify the number
          of unpaired electrons responsible for its magnetic properties.
        </p>
        <Step label="Fill orbitals:">1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶ &nbsp; (26 electrons total)</Step>
        <Step label="3d subshell:">6 electrons in 5 d-orbitals. By Hund&apos;s rule, maximize spin: ↑↑↑↑↑ + 1 paired = 4 unpaired</Step>
        <Step label="Magnetic moment:">4 unpaired electrons → 4 Bohr magnetons of magnetic moment → iron is ferromagnetic</Step>
      </WorkedExample>

      <Definition number="21.4" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Orbitals are not planet-like orbits:</strong> they are probability amplitudes with quantized angular structure.</li>
          <li><strong>Quantum numbers have allowed ranges:</strong> l and m are constrained by n.</li>
          <li><strong>Pauli exclusion applies to full quantum states:</strong> no two electrons share all four quantum numbers.</li>
          <li><strong>Spectral lines come from energy differences:</strong> photons are emitted or absorbed during transitions.</li>
        </ul>
      </Definition>

      <PracticeProblems section="21.1–21.4 Atomic Structure">
        <InteractiveProblem n={1} difficulty="easy"
          answer={-1.51} unit="eV" tolerance={0.02}
          hints={['E_n = −13.6/n² eV']}
          problemText="Find the energy of the n=3 level of hydrogen (eV)."
          solution={<>E₃ = −13.6/9 = <strong>−1.51 eV</strong></>}>
          What is the energy of the n = 3 energy level in hydrogen?
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={657} unit="nm" tolerance={2}
          hints={['ΔE = E₃ − E₂. λ = hc/ΔE. Use hc = 1240 eV·nm.']}
          problemText="Find the wavelength (nm) of the n=3→n=2 hydrogen transition."
          solution={<>ΔE = 1.889 eV. λ = 1240/1.889 = <strong>657 nm</strong></>}>
          Find the wavelength of the photon emitted in the n = 3 → n = 2 transition of hydrogen.
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={18} unit="" tolerance={0.01}
          hints={['For shell n, total states = 2n². For n=3: ℓ=0,1,2 → 1+3+5=9 orbitals × 2 spins.']}
          problemText="How many distinct quantum states exist in the n=3 shell of hydrogen?"
          solution={<>2n² = 2(9) = <strong>18</strong> states</>}>
          How many distinct electron states (n, ℓ, m_ℓ, m_s) exist in the n = 3 shell?
        </InteractiveProblem>

        <Problem n={4} difficulty="medium"
          solution={<>Sodium (Z=11): 1s² 2s² 2p⁶ 3s¹. One valence electron in 3s, easily removed → Na is reactive and forms Na⁺. Chlorine (Z=17): 1s² 2s² 2p⁶ 3s² 3p⁵. One vacancy in 3p → Cl readily accepts one electron to complete the subshell → Cl⁻. Na and Cl react because Na&apos;s lone valence electron drops into Cl&apos;s vacancy, forming NaCl with both ions achieving noble gas configurations. The ionization energy of Na (5.1 eV) is overcome by Cl&apos;s electron affinity (3.6 eV) plus the Madelung lattice energy.</>}>
          Write the electron configurations for Na (Z=11) and Cl (Z=17). Explain in terms of quantum numbers why they react to form NaCl.
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>The selection rules for electric dipole transitions in hydrogen are: Δℓ = ±1 (parity must change), Δm_ℓ = 0 or ±1, Δn = anything. The 2s → 1s transition has Δℓ = 0 — forbidden by electric dipole selection rule. The 2s state is metastable (lifetime ~0.12 s vs ~1 ns for 2p→1s). It can only decay via two-photon emission or collision. Selection rules arise from the matrix element ⟨ψ_f|r|ψ_i⟩: odd-parity operator, so both states must have different parity (different ℓ) for nonzero overlap.</>}>
          Why is the 2s → 1s transition in hydrogen forbidden by electric dipole selection rules? What happens instead? Derive the selection rule from the transition matrix element.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Bohr model: E_n = −13.6/n² eV, r_n = n²a₀ — correct energies, wrong physical picture.',
        'Four quantum numbers (n, ℓ, m_ℓ, m_s) completely label each electron state.',
        'Pauli exclusion: no two electrons share all four quantum numbers — the basis of the periodic table.',
        'Orbitals are probability clouds |ψ|², not definite orbits.',
        'Spectral lines: ΔE = E_i − E_f = hc/λ — emission when electron drops to lower level.',
        'Spin is intrinsic angular momentum with m_s = ±½ — revealed by Stern-Gerlach, no classical analogue.',
      ]} />
    </div>
  );
}
