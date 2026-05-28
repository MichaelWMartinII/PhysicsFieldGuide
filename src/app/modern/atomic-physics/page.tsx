import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function AtomicPhysicsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Upper Division</div>
      <h1>Atomic Physics &amp; Spectroscopy</h1>
      <p className="subtitle">
        Atoms are the best-understood quantum systems. From the hydrogen spectrum to many-electron
        atoms, from laser cooling to precision measurements, atomic physics provides the most
        stringent tests of quantum electrodynamics and probes for new physics beyond the Standard Model.
      </p>

      <Prerequisites items={['Quantum mechanics (Ch. 20)', 'Spin & angular momentum (Ch. SP)', 'Perturbation theory (Ch. PT)', 'Electromagnetism (Ch. 14–15)']} />

      <LearningGoals items={[
        'Apply the Dirac fine-structure formula to compute energy splittings and compare them to the Lamb shift from QED.',
        'Use Hund\'s rules and term symbols to determine the ground-state configuration of many-electron atoms.',
        'Identify allowed electric dipole transitions using E1 selection rules and explain why forbidden lines still appear.',
        'Derive the Doppler cooling force and the Doppler temperature limit T_D = ℏΓ/(2k_B) for a given atomic transition.',
        'Explain how Ramsey spectroscopy achieves the linewidth Δν = 1/(2T) and how optical lattice clocks reach 10⁻¹⁸ fractional uncertainty.',
      ]} />

      <h2>AT.1 Hydrogen Atom — Complete Solution</h2>

      <p>
        The hydrogen Hamiltonian H = p²/(2m) − e²/(4πε₀r) has exact solutions in spherical
        coordinates. The energy levels:
      </p>

      <EqNumbered number="AT.1">E_n = −13.6 eV / n² &nbsp;&nbsp;&nbsp; (n = 1, 2, 3, ...) &nbsp;&nbsp;&nbsp; (hydrogen energy levels)</EqNumbered>

      <p>
        The wavefunctions ψ_nlm = R_nl(r) Y_l^m(θ,φ) where:
        n = 1, 2, 3, ... (principal), l = 0, 1, ..., n−1 (angular), m = −l, ..., +l (magnetic).
        Degeneracy: n² (including spin: 2n²).
      </p>

      <p>
        The n² degeneracy in energy (independence of l) is the hidden SO(4) symmetry —
        the Laplace-Runge-Lenz vector is conserved. This degeneracy is broken by fine structure.
      </p>

      <p>
        <strong>Fine structure</strong> splits levels with the same n but different l,j:
      </p>

      <EqNumbered number="AT.2">E_nj = −13.6 eV/n² × [1 + (α²/n²)(n/(j+½) − 3/4)] &nbsp;&nbsp;&nbsp; (Dirac formula)</EqNumbered>

      <p>
        where α = e²/(4πε₀ℏc) ≈ 1/137 is the fine structure constant and j = l ± ½.
        The 2p_(1/2) and 2s_(1/2) states are predicted to be degenerate by the Dirac equation
        — but they differ by the <strong>Lamb shift</strong> (1057 MHz, due to QED vacuum fluctuations).
      </p>

      <h2>AT.2 Many-Electron Atoms</h2>

      <p>
        For atoms with Z electrons, the Hamiltonian includes electron-electron repulsion:
        H = Σᵢ [p_i²/(2m) − Ze²/rᵢ] + Σ_(i&lt;j) e²/rᵢⱼ (atomic units: ℏ=m=e=1).
      </p>

      <p>
        <strong>Hartree-Fock method:</strong> approximate the many-electron wavefunction as
        a Slater determinant (antisymmetrized product of single-particle orbitals). Each
        electron moves in the mean field of all others. Self-consistent field (SCF) iteration
        gives the HF ground state. Accuracy: 99% of total energy (1% = correlation energy,
        crucial for chemistry).
      </p>

      <p>
        <strong>Hund&apos;s rules</strong> determine the ground state of atoms with partially
        filled shells:
        (1) Maximum S (highest spin multiplicity).
        (2) Maximum L (for same S).
        (3) J = |L−S| for less-than-half-filled shell; J = L+S for more-than-half-filled.
      </p>

      <p>
        <strong>Term symbols</strong>: ²S+¹L_J. Example: carbon ground state (2p²):
        S = 1, L = 1, J = 0 → ³P₀. Iron (3d⁶): S = 2, L = 2, J = 4 → ⁵D₄.
      </p>

      <h2>AT.3 Selection Rules and Spectroscopy</h2>

      <p>
        Electric dipole transitions (strongest, determines most spectroscopy):
      </p>

      <EqNumbered number="AT.3">Δl = ±1 &nbsp;&nbsp;&nbsp; Δm = 0, ±1 &nbsp;&nbsp;&nbsp; Δj = 0, ±1 &nbsp;&nbsp;&nbsp; Δs = 0 &nbsp;&nbsp;&nbsp; (E1 selection rules)</EqNumbered>

      <p>
        These follow from parity conservation and angular momentum conservation of the photon.
        Transitions violating these rules are forbidden at electric dipole order but occur via
        magnetic dipole (M1), electric quadrupole (E2), or two-photon processes — much weaker.
      </p>

      <p>
        The <strong>21 cm hyperfine line</strong> of hydrogen: the spin-flip transition
        1s (F=1) → 1s (F=0) at 1420 MHz = 21.1 cm. Forbidden by M1 rules, occurs only
        via hyperfine interaction. Einstein A coefficient: A = 2.87×10⁻¹⁵ s⁻¹ (τ ≈ 10 Myr!).
        Despite its extreme weakness, it is the most important line in radio astronomy —
        maps the distribution of neutral hydrogen in galaxies.
      </p>

      <WorkedExample number="AT.1" title="Zeeman Effect in Sodium D-Lines">
        <p>
          Sodium&apos;s D-lines are 3s → 3p transitions at 589 nm. In a magnetic field B,
          compute the Zeeman splitting.
        </p>
        <Step label="States:">3s: l=0, j=1/2, mⱼ=±1/2. 3p: l=1, j=3/2 (²P_(3/2)) or j=1/2 (²P_(1/2)).</Step>
        <Step label="Energy shift:">ΔE = g_J μ_B B mⱼ where g_J is the Landé g-factor: g_J = 1 + [J(J+1)+S(S+1)−L(L+1)]/(2J(J+1)).</Step>
        <Step label="g-factors:">For ²S_(1/2) (3s): L=0, S=1/2, J=1/2 → g_J = 2. For ²P_(1/2): L=1, S=1/2, J=1/2 → g_J = 2/3. For ²P_(3/2): L=1, S=1/2, J=3/2 → g_J = 4/3.</Step>
        <Step label="D₁ line (3s→³P_(1/2)):">Transitions: mⱼ = +1/2 → mⱼ = +1/2, −1/2 (Δmⱼ = 0, −1); mⱼ = −1/2 → mⱼ = +1/2, −1/2. Splitting: Δν = μ_B B(g_J(upper)−g_J(lower)) × mⱼ/(h) — gives 4 lines (anomalous Zeeman).</Step>
        <Step label="Scale:">μ_B B/h = 1.4×10¹⁰ B Hz. For B = 1 T: splitting ≈ 14 GHz (0.016 nm at 589 nm). With B = 10 mT (lab magnet): 140 MHz → easily resolved by a spectrometer.</Step>
      </WorkedExample>

      <h2>AT.4 Laser Cooling and Trapping</h2>

      <p>
        <strong>Doppler cooling</strong>: an atom moving toward a red-detuned laser (ω &lt; ω_0)
        sees the photon blue-shifted into resonance (ω + kv ≈ ω_0). Each absorbed photon
        transfers momentum −ℏk (opposing motion). Spontaneously emitted photons go in
        random directions — average to zero. Net force: F = −αv (friction, Doppler cooling force).
      </p>

      <p>
        Doppler cooling limit: T_D = ℏΓ/(2k_B) where Γ is the natural linewidth. For Na
        (Γ/2π = 10 MHz): T_D = 240 μK. Achieved in 1985 (Chu, Cohen-Tannoudji, Phillips;
        Nobel 1997).
      </p>

      <p>
        <strong>Sub-Doppler cooling</strong> (polarization gradient, Sisyphus):
        T_min = ℏΓ/(2k_B) × (Γ/4Ω)² where Ω is the Rabi frequency. Can reach
        T ~ μK for weak fields.
      </p>

      <p>
        <strong>Bose-Einstein condensation</strong> (BEC) of ultracold atoms: achieved
        when the de Broglie wavelength λ_dB = h/√(2πmk_BT) exceeds the interparticle spacing
        n^(1/3). Transition temperature T_BEC ≈ (ℏ²/mk_B)(n/ζ(3/2))^(2/3) ≈ 100 nK – 1 μK
        for typical alkali densities. First achieved in Rb⁸⁷ (Cornell and Wieman) and Na²³
        (Ketterle), 1995 (Nobel 2001).
      </p>

      <h2>AT.5 Precision Measurements and Atomic Clocks</h2>

      <p>
        Atomic clocks use the hyperfine transition of ¹³³Cs at 9,192,631,770 Hz (defined).
        The second is defined by this frequency. Accuracy: 10⁻¹⁶ (one second per 300 million years).
      </p>

      <p>
        <strong>Optical lattice clocks</strong> (Sr, Yb, Hg): use optical transitions at
        ∼10¹⁵ Hz, achieving 10⁻¹⁸ fractional uncertainty — better than the Cs standard by 100×.
        This is so precise it can measure gravitational redshift due to a 1 cm height difference
        (ΔGR/c² ≈ 1.1×10⁻¹⁸/cm). Applications: relativistic geodesy, dark matter searches,
        variation of fundamental constants.
      </p>

      <p>
        The <strong>quantum electrodynamics</strong> test: the electron g-factor g/2 = 1.001159652181643(764)
        (theory) vs 1.00115965218059(13) (Harvard 2023). Agreement to 10 significant figures —
        the most precise test of any theory in science.
      </p>

      <Definition number="AT.1" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Selection rules are symmetry rules:</strong> forbidden transitions are suppressed, not always impossible.</li>
          <li><strong>Fine and hyperfine structure have different origins:</strong> spin-orbit coupling is not nuclear spin coupling.</li>
          <li><strong>Linewidths encode lifetimes:</strong> shorter-lived states have broader natural lines.</li>
          <li><strong>Perturbations split degeneracies:</strong> Zeeman and Stark effects reveal hidden quantum numbers.</li>
        </ul>
      </Definition>

      <PracticeProblems section="AT.1–AT.5 Atomic Physics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={10.9e9} unit="Hz" tolerance={0.05}
          hints={['The fine structure splitting goes as ΔE_FS ∝ α² × |E_n|; for n=2: ΔE ≈ (α²/4) × 3.4 eV × 1', 'Convert eV to Hz: divide by h = 4.136×10⁻¹⁵ eV·s']}
          problemText="Calculate the fine structure splitting (in Hz) between the 2p_(3/2) and 2p_(1/2) states of hydrogen using the Dirac formula with α = 1/137 and E_2 = −3.4 eV."
          solution={<>Hydrogen fine structure: E_nj = −13.6/n² × [1 + α²/n²(n/(j+½)−3/4)] eV. For n=2: E_2 = −3.4 eV. Fine structure correction: ΔE_2j = E_2 × α²/4 × (4/(2j+1) − 3) / 4. For 2p_(3/2), j=3/2: ΔE = −3.4 × (1/137)² / 4 × (4/4 − 3) = −3.4 × 5.33×10⁻⁵ × (−2) = 3.6×10⁻⁴ eV. For 2p_(1/2)=2s_(1/2), j=1/2: (4/2 − 3) = −1 → ΔE = 1.8×10⁻⁴ eV. Splitting 2p_(3/2) − 2p_(1/2): ΔE_FS = (α²/4) × E_2 × (4/2−4/4) = (α²/4) × 3.4 × 1 = 4.5×10⁻⁵ eV = 10.9 GHz. But the Lamb shift (QED) separates 2s_(1/2) from 2p_(1/2) by 1057 MHz ≪ 10.9 GHz. The fine structure splitting 2p_(3/2) − 2p_(1/2) = 10.9 GHz is visible in the Na D-line doublet as the 0.6 nm separation. Fine structure constant α = 1/137 sets the scale of all atomic spectra relative to Bohr energies.</>}>
          Calculate the fine structure splitting between the 2p_(3/2) and 2p_(1/2) states of hydrogen. How does the Lamb shift compare?
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={-74.8} unit="eV" tolerance={0.05}
          hints={['Each 1s electron in Z=2 helium has energy E_1s = −Z²/2 = −2 a.u. = −54.4 eV', 'Add the direct Coulomb repulsion J = (5/8)Z a.u. = 1.25 a.u. = 34.0 eV; convert total to eV (1 a.u. = 27.2 eV)']}
          problemText="Estimate the Hartree-Fock ground state energy of helium (Z = 2), including the electron-electron Coulomb repulsion J = (5/8)Z a.u., and express the result in eV."
          solution={<>Hartree-Fock estimate for helium: use ψ(1,2) = ψ_1s(1)ψ_1s(2) times a spin singlet. Each hydrogenic 1s electron with Z=2 has E_1s = −Z²/2 = −2 a.u. The direct Coulomb repulsion for two 1s orbitals is J = (5/8)Z = 1.25 a.u.; the exchange term vanishes for opposite spins in the same spatial orbital. Thus E_HF ≈ 2(−2) + 1.25 = <strong>−2.75 a.u. = −74.8 eV</strong>. The experimental nonrelativistic ground-state energy is about −2.904 a.u. = −79.0 eV, so the correlation energy is −2.904 − (−2.75) = <strong>−0.154 a.u. ≈ −4.2 eV</strong>. Hartree-Fock captures most of the total energy but misses electron correlation, which is chemically important.</>}>
          Estimate the ground state energy of helium using the Hartree-Fock method. What is the correlation energy and why is it important in chemistry?
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Doppler cooling: atom of mass m in 1D, laser detuning δ = ω_L − ω_0 &lt; 0 (red-detuned). Scattering rate: Γ_sc(v) = (Γ/2) × (Ω²/2)/((δ+kv)² + Γ²/2 + Ω²/2). Expanding for small v: Γ_sc ≈ Γ_sc(0) + dΓ_sc/dv × v. Cooling force: F = ℏk[Γ_sc(+k) − Γ_sc(−k)] for counter-propagating beams. F = −αv where α = 8ℏk²|δ|Γ(Ω/2)²/((δ²+Γ²/2+Ω²/2)²). Optimal detuning δ = −Γ/2: α_max = ℏk²Γ/2 × I/I_sat/(1+I/I_sat)². Doppler limit from heating (photon recoil): D_p = ℏ²k²Γ/2 (momentum diffusion). Equilibrium: αk_BT_D = D_p → T_D = ℏΓ/(2k_B). For Rb-87 (Γ = 2π×6.07 MHz): T_D = 1.055×10⁻³⁴×2π×6.07×10⁶/(2×1.38×10⁻²³) = 146 μK. For Na (Γ = 2π×9.8 MHz): T_D = 236 μK. Achieved temperatures routinely 2-3× T_D in 3D MOT (magneto-optical trap).</>}>
          Derive the Doppler cooling force and the Doppler temperature limit T_D = ℏΓ/(2k_B) for rubidium (Γ = 2π × 6.07 MHz). What temperature is achieved in practice?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Ramsey spectroscopy: two π/2 pulses separated by free precession time T. First pulse: rotate Bloch vector from |g⟩ to equator. Free precession: vector rotates at (ω₀ − ω_L)T. Second pulse: interference. Transition probability: P(T) = ½[1 − cos((ω₀−ω_L)T)]. Fringe width: Δω = π/T → Δν = 1/(2T). For Cs clock T = 0.1s: Δν = 5 Hz out of 9.19×10⁹ Hz → fractional accuracy 5×10⁻¹⁰. Modern fountain clocks: T = 1s → Δν = 0.5 Hz → 5×10⁻¹¹ per shot. After averaging for 1 day (√N improvement): 5×10⁻¹¹/√(10⁵) ≈ 1.6×10⁻¹³. Systematic effects (Zeeman, Stark, cavity pulling, gravitational redshift) limit to ~10⁻¹⁶. Optical lattice clock: ν ≈ 5×10¹⁴ Hz, T ~ 1s → Δν ~ 0.5 Hz / 5×10¹⁴ = 10⁻¹⁵ per shot. Sr clock frequency uncertainty: 2×10⁻¹⁸ — can measure gravitational redshift from 2 cm height difference. Network of optical clocks → relativistic geodesy (monitor height changes of Earth's surface with 1 cm precision via redshift).</>}>
          Describe Ramsey spectroscopy and derive the linewidth Δν = 1/(2T). How do modern atomic clocks achieve 10⁻¹⁸ accuracy? What is the ultimate limit?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Hydrogen: E_n = −13.6/n² eV. Degeneracy n² from SO(4) symmetry. Fine structure ∝ α².',
        'Fine structure formula: E_nj from Dirac. Lamb shift (1057 MHz) from QED — g-factor test.',
        'Hund\'s rules: maximize S, then L, then J. Determine ground state of many-electron atoms.',
        'E1 selection rules: Δl = ±1, Δj = 0,±1, Δm = 0,±1. Higher multipoles are weaker.',
        'Doppler cooling: F = −αv. Limit T_D = ℏΓ/(2k_B). BEC at T_BEC ~ 100 nK–1 μK.',
        'Atomic clocks: Cs hyperfine at 9.19 GHz (defines second). Sr optical: 10⁻¹⁸ — measures 1 cm redshift.',
      ]} />
    </div>
  );
}
