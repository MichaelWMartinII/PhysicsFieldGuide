import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function WaveEquationPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#10b981' }}>Waves &amp; Oscillations · Upper Division</div>
      <h1>The Wave Equation</h1>
      <p className="subtitle">
        The wave equation is the PDE that governs sound, light, vibrating strings, water waves,
        and quantum probability amplitudes. Its solutions — d&apos;Alembert&apos;s formula, standing waves,
        and dispersive packets — appear across all of physics.
      </p>

      <Prerequisites items={['Wave properties (Ch. 8)', 'Fourier analysis (Ch. F)', 'Partial derivatives']} />

      <LearningGoals items={[
        'Derive the 1D wave equation from Newton\'s second law applied to a vibrating string.',
        'Apply d\'Alembert\'s formula to find the motion of a plucked string from initial conditions.',
        'Use separation of variables to find normal modes and their frequencies for a fixed string.',
        'Distinguish phase velocity and group velocity and compute them from a dispersion relation.',
        'Calculate the power transmitted by a traveling wave from amplitude and wave parameters.',
      ]} />

      <h2>WE.1 Derivation from a Vibrating String</h2>

      <p>
        Consider a taut string with tension T and linear mass density μ. For small transverse
        displacements y(x, t), Newton&apos;s second law applied to a small element gives:
      </p>

      <EqNumbered number="WE.1" latex="\frac{\partial^2y}{\partial t^2}=v^2\frac{\partial^2y}{\partial x^2} \qquad v=\sqrt{\frac{T}{\mu}} \qquad \text{(1D wave equation)}" />

      <p>
        This is the canonical form of the wave equation with wave speed v. The same equation
        governs longitudinal sound waves (v = √(B/ρ), B = bulk modulus), EM waves
        (v = 1/√(με)), and quantum mechanical free particles (v → operator, giving Schrödinger).
      </p>

      <h2>WE.2 D&apos;Alembert&apos;s Solution</h2>

      <Theorem number="WE.1" title="D'Alembert's Formula (1747)">
        The general solution to the 1D wave equation with initial conditions y(x,0) = f(x)
        and ∂y/∂t(x,0) = g(x) is:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          y(x, t) = ½[f(x−vt) + f(x+vt)] + (1/2v) ∫(x−vt to x+vt) g(s) ds
        </span>
        The first term is the superposition of two copies of the initial shape — one traveling
        right at speed v, one left at speed v. Every solution is a sum of rightward and
        leftward traveling waves.
      </Theorem>

      <WorkedExample number="WE.1" title="Plucked String">
        <p>
          A string of length L is plucked at its center to height h and released from rest
          (g = 0). Describe the subsequent motion.
        </p>
        <Step label="Initial shape:">f(x) = triangular peak: 2hx/L for 0 ≤ x ≤ L/2, then 2h(L−x)/L for L/2 ≤ x ≤ L.</Step>
        <Step label="D'Alembert:">y(x,t) = ½[f(x−vt) + f(x+vt)], extended as odd periodic function.</Step>
        <Step label="Motion:">The triangle splits into two half-height triangles that travel in opposite directions. They bounce off the fixed ends (boundary condition y=0 there) and invert. The pattern repeats with period T = 2L/v.</Step>
        <Step label="Fourier view:">The triangular shape has Fourier series with only odd harmonics. Each harmonic has frequency nv/(2L) — the harmonics of a guitar string. The n=1 mode (fundamental) has frequency f₁ = v/(2L) = √(T/μ)/(2L).</Step>
      </WorkedExample>

      <h2>WE.3 Separation of Variables and Normal Modes</h2>

      <p>
        For a string fixed at x=0 and x=L, try y(x,t) = X(x)T(t). Substituting:
      </p>

      <EqNumbered number="WE.2" latex="\frac{\ddot T}{T}=v^2\frac{X''}{X}=-\omega^2 \qquad \text{(separation constant)}" />

      <p>
        The spatial equation X&apos;&apos; + (ω/v)²X = 0 with boundary conditions X(0)=X(L)=0 gives:
      </p>

      <EqNumbered number="WE.3" latex="X_n(x)=\sin\left(\frac{n\pi x}{L}\right) \qquad \omega_n=\frac{n\pi v}{L} \qquad n=1,2,3,\ldots" />

      <p>
        These are the <strong>normal modes</strong> (standing waves). The general solution is a
        superposition:
      </p>

      <EqNumbered number="WE.4" latex="y(x,t)=\sum_{n=1}^{\infty}\sin\left(\frac{n\pi x}{L}\right)\left[A_n\cos(\omega_nt)+B_n\sin(\omega_nt)\right]" />

      <p>
        The coefficients Aₙ and Bₙ are determined by the initial conditions via Fourier
        sine series — Aₙ = (2/L)∫(0 to L) f(x) sin(nπx/L) dx.
      </p>

      <h2>WE.4 Dispersion Relations</h2>

      <Definition number="WE.1" title="Dispersion Relation">
        The <strong>dispersion relation</strong> ω(k) relates angular frequency ω to wavenumber k
        for waves in a medium. For the standard wave equation: ω = vk (linear, non-dispersive).
        Two velocities characterize dispersive waves:
        <span style={{ display: 'block', marginTop: '0.5rem' }}>
          <strong>Phase velocity:</strong> vₚ = ω/k — speed of a single-frequency wave crest.
        </span>
        <span style={{ display: 'block' }}>
          <strong>Group velocity:</strong> v_g = dω/dk — speed of a wave packet (carries energy and information).
        </span>
        When vₚ ≠ v_g, the medium is <strong>dispersive</strong>: different frequencies travel at
        different speeds, and pulses spread out over time.
      </Definition>

      <p>
        Examples of dispersion relations:
      </p>

      <EqNumbered number="WE.5" latex="\omega^2=v^2k^2+\omega_p^2 \qquad \text{(plasma, where }\omega_p\text{ is the plasma frequency)}" />

      <EqNumbered number="WE.6" latex="\omega^2=gk+\frac{\gamma k^3}{\rho} \qquad \text{(deep water: gravity + surface tension)}" />

      <EqNumbered number="WE.7" latex="\omega=\frac{\hbar k^2}{2m} \qquad \text{(non-relativistic de Broglie waves)}" />

      <WorkedExample number="WE.2" title="Group Velocity of a Wave Packet">
        <p>
          Two cosine waves with nearly equal frequencies: k₁ = k−δk, k₂ = k+δk,
          ω₁ = ω−δω, ω₂ = ω+δω. Find the envelope velocity.
        </p>
        <Step label="Superpose:">y = cos(k₁x − ω₁t) + cos(k₂x − ω₂t)</Step>
        <Step label="Sum-to-product:">= 2 cos((k₁−k₂)x/2 − (ω₁−ω₂)t/2) · cos((k₁+k₂)x/2 − (ω₁+ω₂)t/2)</Step>
        <Step label="Result:">= 2 cos(δk · x − δω · t) · cos(kx − ωt)</Step>
        <Step label="Interpretation:">Fast oscillation at (k, ω) — the carrier wave. Slow envelope at (δk, δω) — the beat. The envelope travels at v_envelope = δω/δk → dω/dk in the limit.</Step>
        <Step label="Conclusion:">v_group = dω/dk — the group velocity carries the packet and, in QM, the probability density.</Step>
      </WorkedExample>

      <h2>WE.5 Energy and Power in Waves</h2>

      <p>
        For a traveling wave on a string y = A sin(kx − ωt), the power transmitted past any
        point is:
      </p>

      <EqNumbered number="WE.8" latex="P=\frac{1}{2}\mu\omega^2A^2v=\frac{1}{2}TkA^2\omega" />

      <p>
        More usefully: P = ½μvω²A². The energy per wavelength is E_λ = P · (λ/v) = ½μωA² · λ.
        The energy density (energy per unit length) is u = ½μω²A² — equally divided between
        kinetic (½μẏ²) and potential (½T(∂y/∂x)²) at each instant, averaged over time.
      </p>

      <Definition number="WE.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Boundary conditions choose the modes:</strong> the PDE alone does not decide whether sine, cosine, or mixed modes appear.</li>
          <li><strong>Phase velocity is not always signal speed:</strong> in dispersive media, energy and information travel with group velocity.</li>
          <li><strong>Fourier coefficients are set by initial conditions:</strong> normal modes are the basis, not the full answer by themselves.</li>
          <li><strong>Average power is cycle-averaged:</strong> instantaneous energy density oscillates between kinetic and potential forms.</li>
        </ul>
      </Definition>

      <PracticeProblems section="WE.1–WE.5 The Wave Equation">
        <InteractiveProblem n={1} difficulty="easy"
          answer={374} unit="m/s" tolerance={0.02}
          hints={['Wave speed on a string: v = √(T/μ). T = 70 N, μ = 5×10⁻⁴ kg/m.']}
          problemText="A guitar string (L = 65 cm, tension = 70 N, μ = 5×10⁻⁴ kg/m). Find the wave speed in m/s."
          solution={<>v = √(T/μ) = √(70 / 5×10⁻⁴) = √(1.4×10⁵) = <strong>374 m/s</strong>. Fundamental: f₁ = v/(2L) = 374/1.3 = 288 Hz.</>}>
          A guitar string is 65 cm long, under 70 N tension, with linear density μ = 5×10⁻⁴ kg/m. Find the wave speed, fundamental frequency, and first three harmonics.
        </InteractiveProblem>

        <Problem n={2} difficulty="medium"
          solution={<>Gaussian pulse y(x,0) = exp(−x²/2σ²) in dispersive medium ω = ck + αk³ (cubic dispersion). At t=0: FT is Ŷ(k) = σ√(2π) exp(−k²σ²/2). At time t: Ŷ(k,t) = σ√(2π) exp(−k²σ²/2) exp(−iωt) = exp(−k²σ²/2) exp(−i(ckt + αk³t)). The linear term ck gives group delay (packet moves at c). The cubic term αk³t gives phase shift ∝ k³ — different frequencies arrive at slightly different times, spreading the pulse. Width grows: σ_eff ≈ √(σ² + (3α t/σ)²). In optical fibers: group velocity dispersion (GVD) is characterized by β₂ = d²k/dω² in ps²/km — a 1ps pulse in standard fiber spreads ~10× in 1km.</>}>
          A Gaussian pulse travels in a medium with cubic dispersion ω = ck + αk³. Describe qualitatively how the pulse shape changes over time. What is this called in fiber optics?
        </Problem>

        <Problem n={3} difficulty="medium"
          solution={<>Normal modes of 2D square membrane (Lx=Ly=L): separation X(x)Y(y)T(t). X&apos;&apos; = −(nπ/L)²X, Y&apos;&apos; = −(mπ/L)²Y. ωₙₘ = vπ√(n²+m²)/L. Degenerate modes: ω₁₂ = ω₂₁ = vπ√5/L (n=1,m=2 and n=2,m=1 have same frequency but different patterns). ω₂₂ = 2πv√2/L, ω₃₁ = ω₁₃ = πv√10/L. The (1,2) and (2,1) modes are degenerate — any linear combination also satisfies BC and has the same ω. Chladni figures on a square plate show these nodal patterns as sand settles on nodal lines.</>}>
          Find the normal modes of a 2D square membrane (fixed boundary, side L). Which modes are degenerate? Sketch the nodal patterns for the lowest modes.
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Schrödinger wave equation: iℏ ∂ψ/∂t = −ℏ²/(2m) ∂²ψ/∂x². This is a wave equation but with first derivative in t (not second), and imaginary coefficient → dispersion. Trial solution ψ = e^(ikx−iωt): −ℏω = −ℏ²k²/(2m) → ω = ℏk²/(2m). Group velocity: v_g = dω/dk = ℏk/m = p/m = v_classical ✓. Phase velocity: v_p = ω/k = ℏk/(2m) = v_classical/2 — half the classical speed. The phase velocity is unphysical; only the group velocity carries information. The probability density |ψ|² moves at v_g, consistent with the expectation value ⟨x⟩ = ∫x|ψ|²dx evolving at ⟨p⟩/m (Ehrenfest theorem).</>}>
          Show that the Schrödinger equation iℏ ∂ψ/∂t = (−ℏ²/2m)∂²ψ/∂x² has a plane wave solution. Find the phase and group velocities. Which matches the classical particle velocity?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Wave equation: ∂²y/∂t² = v²∂²y/∂x². Applies to strings (v=√(T/μ)), sound, EM, QM.',
        'D\'Alembert: general solution = f(x−vt) + g(x+vt) — rightward plus leftward waves.',
        'Normal modes: sin(nπx/L) with ωₙ = nπv/L. Superpose with Fourier coefficients.',
        'Phase velocity vₚ = ω/k (crest speed); group velocity v_g = dω/dk (packet speed, carries energy).',
        'Non-dispersive: ω = vk → vₚ = v_g. Dispersive: vₚ ≠ v_g, pulses spread.',
        'Energy density: u = ½μω²A², equally kinetic and potential (averaged over cycle).',
      ]} />
    </div>
  );
}
