import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function ScatteringPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Upper Division</div>
      <h1>Scattering Theory</h1>
      <p className="subtitle">
        Scattering is how we probe the structure of matter — from Rutherford discovering the
        nucleus to the LHC discovering the Higgs. The formal theory of quantum scattering
        connects asymptotic states to the S-matrix, and produces Feynman diagrams in the
        relativistic limit.
      </p>

      <Prerequisites items={['Quantum mechanics (Ch. 20)', 'Green\'s functions (Ch. GF)', 'Angular momentum (Ch. SP)']} />

      <LearningGoals items={[
        'Define the scattering amplitude f(θ) and relate it to the differential cross section dσ/dΩ = |f|².',
        'Apply the Born approximation to compute scattering amplitudes as Fourier transforms of the potential.',
        'Expand the scattering amplitude in partial waves, extract phase shifts δₗ, and apply the optical theorem.',
        'Derive the Breit-Wigner resonance formula and explain why nuclear resonances can have σ ≫ πR².',
        'Write down the Lippmann-Schwinger equation for the T-matrix and relate its Born expansion to Feynman diagrams.',
      ]} />

      <h2>SC.1 Scattering Formalism</h2>

      <p>
        A particle of momentum ℏk is scattered by a potential V(r), localized near the origin.
        Far from the target, the wavefunction is:
      </p>

      <EqNumbered number="SC.1">ψ(r) → e^(ik·r) + f(k, k') × e^(ikr)/r &nbsp;&nbsp;&nbsp; (asymptotic scattered wave)</EqNumbered>

      <p>
        where f(k, k&apos;) is the <strong>scattering amplitude</strong> (k&apos; = k r̂). The differential
        cross section is:
      </p>

      <EqNumbered number="SC.2">dσ/dΩ = |f(θ, φ)|² &nbsp;&nbsp;&nbsp; (differential cross section)</EqNumbered>

      <p>
        Total cross section: σ_total = ∫|f|² dΩ. The optical theorem relates σ_total to the
        forward scattering amplitude:
      </p>

      <EqNumbered number="SC.3">σ_total = (4π/k) Im f(θ=0) &nbsp;&nbsp;&nbsp; (optical theorem)</EqNumbered>

      <p>
        This is exact — it follows from unitarity of the S-matrix: probability is conserved.
        Physically: the forward scattered wave must interfere destructively with the incident
        wave to remove probability from the forward beam (shadow scattering).
      </p>

      <h2>SC.2 Born Approximation</h2>

      <p>
        For a weak potential V ≪ typical kinetic energies, the Born approximation gives:
      </p>

      <EqNumbered number="SC.4">f(q) = −m/(2πℏ²) ∫ e^(−iq·r) V(r) d³r = −m/(2πℏ²) Ṽ(q)</EqNumbered>

      <p>
        where q = k − k&apos; is the momentum transfer (|q| = 2k sin(θ/2)).
        The scattering amplitude is the Fourier transform of V at the momentum transfer.
      </p>

      <p>
        For Coulomb potential V = Ze²/(4πε₀r): Ṽ(q) = Ze²/(ε₀q²).
        Born cross section: dσ/dΩ = (2mZe²/(4πε₀ℏ²))² / (2k sin(θ/2))⁴ = (Ze²/(4E))² / sin⁴(θ/2).
        This is the <strong>Rutherford formula</strong> — and it is exact for Coulomb scattering
        (higher-order Born terms are zero due to the long range of Coulomb).
      </p>

      <h2>SC.3 Partial Waves</h2>

      <p>
        For a spherically symmetric potential V(r), expand in angular momentum eigenstates.
        The scattering amplitude:
      </p>

      <EqNumbered number="SC.5">f(θ) = (1/k) Σₗ (2l+1) e^(iδₗ) sin δₗ × Pₗ(cosθ) &nbsp;&nbsp;&nbsp; (partial wave expansion)</EqNumbered>

      <p>
        where δₗ is the <strong>phase shift</strong> of the l-th partial wave — the phase
        acquired relative to free propagation. The partial wave cross section:
      </p>

      <EqNumbered number="SC.6">σₗ = (4π/k²)(2l+1) sin² δₗ ≤ (4π/k²)(2l+1) &nbsp;&nbsp;&nbsp; (unitarity bound)</EqNumbered>

      <p>
        <strong>Resonances</strong>: when δₗ passes through π/2, the partial wave cross section
        reaches its maximum (unitarity limit). A Breit-Wigner resonance at energy E_r with
        width Γ:
      </p>

      <EqNumbered number="SC.7">σₗ(E) ≈ (4π/k²)(2l+1) × (Γ²/4)/((E−E_r)² + Γ²/4) &nbsp;&nbsp;&nbsp; (Breit-Wigner resonance)</EqNumbered>

      <WorkedExample number="SC.1" title="S-wave Scattering from a Hard Sphere">
        <p>
          Find the s-wave phase shift and cross section for a hard sphere of radius a
          (V = ∞ for r &lt; a, 0 for r &gt; a) at low energy ka ≪ 1.
        </p>
        <Step label="Radial equation:">For l=0, the radial equation gives u(r) = r ψ_0(r). Outside: u = A sin(kr + δ₀). At r=a: u(a) = 0 → ka + δ₀ = nπ → δ₀ = −ka (for small ka).</Step>
        <Step label="Scattering length:">Define the scattering length a_s = −lim(k→0) δ₀/k = a (positive for hard sphere). Low-energy limit: f ≈ −a_s = −a. σ_total = 4πa² (at low energy, four times the geometric cross section!).</Step>
        <Step label="Physical:">The factor of 4 arises because quantum diffraction occurs in all directions, not just the shadow. At ka ≫ 1 (high energy): σ → 2πa² (geometric πa² from shadow + πa² from diffraction ring).</Step>
        <Step label="Universality:">All short-range potentials with the same scattering length a_s have the same low-energy cross section σ → 4πa_s². The scattering length fully characterizes low-energy scattering — this is why ultracold atoms can be described by just a_s regardless of the microscopic potential details.</Step>
      </WorkedExample>

      <h2>SC.4 The S-Matrix</h2>

      <p>
        The <strong>S-matrix</strong> (scattering matrix) maps incoming asymptotic states to
        outgoing asymptotic states: |out⟩ = S|in⟩. For elastic scattering:
        S_l = e^(2iδₗ) — a pure phase (unitarity: S†S = 1 → |S_l| = 1).
      </p>

      <p>
        The T-matrix: S = 1 + 2iT. The cross section: dσ/dΩ = |⟨k&apos;|T|k⟩|². Lippmann-Schwinger
        equation:
      </p>

      <EqNumbered number="SC.8">T = V + V G₀(E+iε) T &nbsp;&nbsp;&nbsp; (Lippmann-Schwinger for the T-matrix)</EqNumbered>

      <p>
        where G₀ = 1/(E − H₀ + iε) is the free-particle Green&apos;s function. Iterating:
        T = V + VG₀V + VG₀VG₀V + ... — the Born series. Each term is a Feynman diagram
        in position-space (non-relativistic).
      </p>

      <h2>SC.5 Inelastic Scattering and Form Factors</h2>

      <p>
        For scattering from an extended object (nucleus, atom), the cross section involves
        the <strong>form factor</strong> F(q) — the Fourier transform of the charge distribution:
      </p>

      <EqNumbered number="SC.9">dσ/dΩ = (dσ/dΩ)_point × |F(q)|² &nbsp;&nbsp;&nbsp; (form factor)</EqNumbered>

      <p>
        At small q: F(q) ≈ 1 − q²⟨r²⟩/6 + ... where ⟨r²⟩ is the mean-square radius.
        The proton charge radius was measured by electron-proton scattering (Hofstadter, 1961):
        r_p ≈ 0.84 fm. This became the <strong>proton radius puzzle</strong> when muonic hydrogen
        measurements gave r_p = 0.84087 fm vs ordinary hydrogen spectroscopy giving 0.8775 fm —
        a 7σ discrepancy (since resolved to ~0.84 fm by 2019 CODATA).
      </p>

      <Definition number="SC.1" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Cross sections are probabilities per flux:</strong> they are not geometric areas except in special limits.</li>
          <li><strong>Phase shifts contain the interaction:</strong> different partial waves contribute differently by energy.</li>
          <li><strong>Resonances have widths:</strong> lifetime and energy uncertainty are linked.</li>
          <li><strong>Born approximation is weak-scattering:</strong> strong potentials require nonperturbative treatment.</li>
        </ul>
      </Definition>

      <PracticeProblems section="SC.1–SC.5 Scattering Theory">
        <InteractiveProblem n={1} difficulty="easy"
          answer={4} unit="× πa²" tolerance={0.05}
          hints={['At low energy ka ≪ 1, only s-wave (l=0) contributes: δ₀ ≈ −ka, so Im f(0) = ka²', 'Apply the optical theorem: σ = (4π/k) × Im f(0) = 4πa², which is how many times the geometric cross section πa²?']}
          problemText="Show that the low-energy total cross section for a hard sphere of radius a is σ = 4πa². Express your answer as a multiple of the geometric cross section πa²."
          solution={<>Optical theorem verification for hard sphere: forward scattering amplitude f(0) = (1/k)Σₗ(2l+1)e^(iδₗ)sinδₗ. At low energy ka≪1, only l=0 contributes: f(0) ≈ e^(iδ₀)sinδ₀/k. With δ₀ = −ka: f(0) = e^(−ika)sin(−ka)/k ≈ −a (for small ka). Im f(0) = Im(e^(−ika)sin(−ka))/k. For small ka: e^(−ika) ≈ 1 − ika. f(0) ≈ −a + ika² − ... Im f(0) = ka². Optical theorem: σ = 4π/k × Im f(0) = 4π/k × ka² = 4πa². ✓ Agrees with σ = 4πa². At high energy: need all partial waves. σ = 2πa² (geometric + diffraction). Intermediate: resonances can make σ ≫ πa² (but bounded by Σₗ unitarity bound). Shadow scattering always contributes πa² at high energy.</>}>
          Verify the optical theorem σ = (4π/k) Im f(0) for s-wave scattering from a hard sphere of radius a at low energy.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={1.4} unit="fm" tolerance={0.05}
          hints={['The Yukawa range is R = 1/μ where μ = m_π c/ℏ', 'Use m_π c² = 140 MeV and ℏc = 197.3 MeV·fm to get μ = 140/197.3 fm⁻¹']}
          problemText="The nuclear force is modeled by a Yukawa potential V = V₀ e^(−μr)/r with μ = m_π c/ℏ. Calculate the range R = 1/μ in fm using m_π c² = 140 MeV and ℏc = 197.3 MeV·fm."
          solution={<>Yukawa scattering: V(r) = V₀ e^(−μr)/r. Fourier transform: Ṽ(q) = 4πV₀/(q²+μ²). Born approximation: f = −m/(2πℏ²) × 4πV₀/(q²+μ²) = −2mV₀/(ℏ²(q²+μ²)). q² = 4k²sin²(θ/2). dσ/dΩ = |f|² = (2mV₀/ℏ²)² / (4k²sin²(θ/2)+μ²)². Total cross section: σ = ∫dσ/dΩ dΩ = 2π∫|f|²sinθdθ = 16π(2mV₀/ℏ²)²/(μ²(4k²+μ²)). Low energy (k→0): σ → 16π(2mV₀)²/(ℏ²μ²)² = (4πa_s)² where a_s = −mV₀/(π ℏ²μ²) is the Born scattering length. High energy (k≫μ): σ → 4π(2mV₀)²/(ℏ⁴μ²×4k²) ∝ 1/k² → σ → 0 (decreasing). For nuclear physics: Yukawa with μ = m_π c/ℏ ≈ 0.7 fm⁻¹, range R = 1/μ ≈ 1.4 fm. This gives the correct scale for nuclear forces from pion exchange.</>}>
          Find the differential and total cross section for Born scattering from a Yukawa potential V = V₀ e^(−μr)/r. How does σ behave at low and high energies?
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Resonance scattering: s-wave, V = attractive square well of depth V₀ and radius a. Phase shift: δ₀ = ka − arctan[k/κ × tan(κa)] where κ = √(2m(E+V₀)/ℏ²). Resonances at E_n where δ₀ = (n+½)π → κa = (n+½)π (approximate). Near resonance E ≈ E_r: expand δ₀ in Taylor series → Breit-Wigner form δ₀ = π/2 + (E−E_r)/Γ × 2. σ_0 = 4π/k² × sin²δ₀ = 4π/k² × (Γ²/4)/((E−E_r)²+Γ²/4). Maximum σ_0 = 4π/k_r² at resonance (unitarity bound). Width Γ = 2/|dδ₀/dE|(E_r). Physical example: thermal neutron scattering on ¹¹³Cd has resonance at E_r = 0.178 eV with Γ_n = 0.113 eV (partial wave l=0) → σ_max = 6.5×10⁴ barns (vs σ_geom ≈ 2.5 barns). This huge cross section makes cadmium control rods effective in nuclear reactors.</>}>
          Describe s-wave resonance scattering from an attractive square well. Derive the Breit-Wigner form for the cross section and explain why nuclear resonances can have σ ≫ πR².
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Eikonal approximation: valid for high energy (ka ≫ 1) and forward scattering (small θ). For a potential localized in the transverse plane b (impact parameter): χ(b) = −1/ℏv ∫(−∞ to ∞) V(b,z) dz (eikonal phase). Scattering amplitude: f(q) = ik∫d²b e^(−iq·b)(1 − e^(iχ(b))). Born limit: e^(iχ) ≈ 1+iχ → f = ik∫d²b e^(−iq·b)(−iχ) = k/ℏv ∫d²b e^(−iq·b)∫dz V(b,z) = m/(2πiℏ²k) × (Fourier transform of V in 3D) → agrees with Born. For Coulomb: χ(b) = (2Ze²/ℏv) ln(1/bμ). f(θ) → Rutherford exactly (all orders) for Coulomb. For nuclear (sharp edge): absorption → |e^(iχ)| &lt; 1 → diffractive peak at θ = 1.22λ/(2R). Eikonal = geometric optics of quantum scattering. Valid when dV/dr ≪ ℏv/a (weak scattering per de Broglie wavelength).</>}>
          Derive the eikonal approximation for scattering at high energy (ka ≫ 1). Show how it reduces to the Born approximation for weak potentials, and to Rutherford for Coulomb.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Scattering amplitude f(θ): dσ/dΩ = |f|². Optical theorem: σ = (4π/k) Im f(0) — from unitarity.',
        'Born approximation: f = −m/(2πℏ²) Ṽ(q). Cross section = |FT of potential|². Rutherford = exact Born.',
        'Partial waves: f = (1/k)Σ(2l+1) e^(iδₗ) sinδₗ Pₗ(cosθ). Phase shifts encode all scattering information.',
        'S-wave at low energy: σ → 4πa_s² (a_s = scattering length). Hard sphere: σ = 4πa² (4× geometric).',
        'Resonances: δₗ → π/2, σₗ → unitarity limit 4π(2l+1)/k². Breit-Wigner: Lorentzian in energy.',
        'S-matrix: S = e^(2iδ). T = V + VG₀T (Lippmann-Schwinger). Born series = Feynman diagrams.',
      ]} />
    </div>
  );
}
