import QuantumWellClient from '@/components/sims/QuantumWellClient';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function QuantumPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Chapter 20</div>
      <h1>Quantum Mechanics</h1>
      <p className="subtitle">
        At the atomic scale, nature is neither wave nor particle but something fundamentally
        stranger — a probability amplitude that collapses to a definite outcome only upon measurement.
      </p>

      <Prerequisites items={['Wave properties (Ch. 8)', 'Special relativity (Ch. 19)', 'Basic calculus']} />

      <LearningGoals items={[
        'Explain the photoelectric effect and blackbody radiation as evidence for energy quantization.',
        'Calculate the de Broglie wavelength of a particle from its momentum.',
        'Apply the Heisenberg uncertainty principle to estimate minimum kinetic energies of confined particles.',
        'Interpret the wavefunction as a probability amplitude and |ψ|² as a probability density.',
        'Find the quantized energy levels of a particle in an infinite square well.',
      ]} />

      <h2>20.1 The Failure of Classical Physics</h2>

      <p>
        By 1900, several experiments could not be explained by classical mechanics and
        electromagnetism. Three were decisive:
      </p>

      <p>
        <strong>Blackbody radiation.</strong> A hot object emits light across a spectrum of
        wavelengths. Classical theory (the Rayleigh–Jeans law) predicted infinite energy emission
        at short wavelengths — the &quot;ultraviolet catastrophe.&quot; In 1900, Planck resolved this by
        assuming energy is emitted in discrete quanta E = hf, where h = 6.626×10⁻³⁴ J·s is
        Planck&apos;s constant.
      </p>

      <p>
        <strong>Photoelectric effect.</strong> Light shining on a metal ejects electrons, but
        only if the frequency exceeds a threshold — more intensity at low frequency does nothing.
        In 1905, Einstein explained this by treating light as particles (photons) each carrying
        energy E = hf.
      </p>

      <p>
        <strong>Atomic spectra.</strong> Hydrogen emits light at only discrete wavelengths —
        a spectrum of sharp lines. Classical orbiting electrons should radiate continuously and
        spiral into the nucleus in nanoseconds. Bohr&apos;s 1913 model imposed quantization by fiat;
        the explanation had to wait for Schrödinger.
      </p>

      <h2>20.2 Wave-Particle Duality</h2>

      <Definition number="20.1" title="De Broglie Hypothesis (1924)">
        Every particle with momentum p has an associated wavelength:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          λ = h/p = h/(mv) &nbsp;&nbsp;&nbsp; (de Broglie wavelength)
        </span>
        This applies to electrons, protons, neutrons — and, in principle, baseballs, though
        their wavelengths (~10⁻³⁴ m) are unmeasurably small. For electrons at atomic scales,
        λ ≈ 0.1–1 nm, comparable to atomic spacings, and diffraction effects are observable.
      </Definition>

      <p>
        The double-slit experiment with electrons (Davisson–Germer, 1927; Jönsson, 1961)
        shows interference fringes identical to light — even when electrons are sent one at a time.
        Each electron passes through both slits simultaneously (as a wave), then lands at a definite
        spot (as a particle). No classical picture explains this.
      </p>

      <WorkedExample number="20.1" title="De Broglie Wavelength of an Electron">
        <p>
          An electron is accelerated through V = 100 V. Find its de Broglie wavelength.
        </p>
        <Step label="Kinetic energy:">K = eV = 1.6×10⁻¹⁹ × 100 = 1.6×10⁻¹⁷ J</Step>
        <Step label="Momentum:">K = p²/2m → p = √(2mK) = √(2 × 9.11×10⁻³¹ × 1.6×10⁻¹⁷) = 1.71×10⁻²⁴ kg·m/s</Step>
        <Step label="Wavelength:">λ = h/p = 6.626×10⁻³⁴ / 1.71×10⁻²⁴ = <strong>3.88×10⁻¹⁰ m = 0.388 nm</strong></Step>
        <Step label="Context:">This is comparable to atomic spacings — explaining why electron microscopes achieve atomic resolution.</Step>
      </WorkedExample>

      <h2>20.3 The Heisenberg Uncertainty Principle</h2>

      <Definition number="20.2" title="Heisenberg Uncertainty Principle (1927)">
        It is impossible to simultaneously know a particle&apos;s position and momentum with
        arbitrary precision. The product of their uncertainties is bounded:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          Δx · Δp ≥ ℏ/2 &nbsp;&nbsp;&nbsp; (ℏ = h/2π = 1.055×10⁻³⁴ J·s)
        </span>
        Similarly for energy and time: ΔE · Δt ≥ ℏ/2.
      </Definition>

      <p>
        This is not a statement about measurement clumsiness — it is a fundamental property
        of nature. A particle with a precisely defined momentum has a perfectly defined
        wavelength (λ = h/p) and therefore a completely delocalized position (a pure sine wave
        extends to infinity). Localizing a particle requires superposing many wavelengths
        (many momenta), so Δp grows.
      </p>

      <p>
        The uncertainty principle explains atomic stability: an electron cannot collapse into
        the nucleus because confining it to Δx ≈ 10⁻¹⁵ m would require Δp ≥ ℏ/(2Δx) —
        enormous momentum and kinetic energy that blows it back out. The hydrogen atom sits at
        the radius where kinetic and potential energies balance.
      </p>

      <WorkedExample number="20.2" title="Uncertainty Principle Applied">
        <p>
          An electron is confined to a region of size Δx = 0.1 nm (atomic scale). Estimate
          the minimum uncertainty in its momentum and kinetic energy.
        </p>
        <Step label="Minimum Δp:">Δp ≥ ℏ/(2Δx) = 1.055×10⁻³⁴ / (2 × 10⁻¹⁰) = 5.28×10⁻²⁵ kg·m/s</Step>
        <Step label="Minimum K:">K = (Δp)²/(2m) = (5.28×10⁻²⁵)² / (2 × 9.11×10⁻³¹) = 1.53×10⁻¹⁹ J = <strong>0.96 eV</strong></Step>
        <Step label="Context:">This is comparable to atomic binding energies (~13.6 eV for hydrogen). The electron cannot be confined more tightly without enormous energy cost.</Step>
      </WorkedExample>

      <h2>20.4 The Schrödinger Equation</h2>

      <p>
        De Broglie&apos;s matter waves needed a wave equation. In 1926, Schrödinger provided it.
        The time-dependent Schrödinger equation governs the quantum state ψ(x,t) —
        the <strong>wavefunction</strong>:
      </p>

      <EqNumbered number="20.1">iℏ ∂ψ/∂t = [−ℏ²/2m · ∂²/∂x² + V(x)] ψ</EqNumbered>

      <p>
        The wavefunction ψ is complex-valued. Its physical meaning, given by Born (1926):
        |ψ(x,t)|² is the <strong>probability density</strong> — the probability of finding
        the particle between x and x + dx is |ψ(x)|² dx.
      </p>

      <p>
        For a particle in a box (infinite square well of width L), the allowed energies are:
      </p>

      <EqNumbered number="20.2">E_n = n² π² ℏ² / (2mL²) &nbsp;&nbsp;&nbsp; n = 1, 2, 3, …</EqNumbered>

      <p>
        Energy is quantized — only discrete values are allowed. This is not an assumption;
        it follows from the boundary conditions on ψ. The wavefunctions are ψ_n(x) = √(2/L) sin(nπx/L),
        standing waves just like a guitar string — but the &quot;string&quot; is a probability amplitude.
      </p>

      <Figure number="20.1" caption="Particle in an infinite square well. Toggle between the wavefunction ψ(x) (animated, showing the oscillation in time) and the probability density |ψ|². Higher quantum number n means more nodes and higher energy. Energy scales as n².">
        <QuantumWellClient />
      </Figure>

      <Theorem number="20.1" title="Quantum Numbers and Ground State Energy">
        The lowest energy state (n=1) has energy E₁ = π²ℏ²/(2mL²) {'>'} 0. A quantum particle
        can never be at rest at the bottom of a potential well. This <strong>zero-point energy</strong>
        is another consequence of the uncertainty principle: zero momentum would mean Δp = 0,
        requiring Δx = ∞.
      </Theorem>

      <Definition number="20.3" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>The wavefunction is not the probability:</strong> probability density is |ψ|².</li>
          <li><strong>Uncertainty is not bad equipment:</strong> ΔxΔp is a property of the state.</li>
          <li><strong>Energy levels depend on boundary conditions:</strong> changing the well changes the spectrum.</li>
          <li><strong>Measurement changes the state:</strong> a definite outcome generally prepares a new state.</li>
        </ul>
      </Definition>

      <PracticeProblems section="20.1–20.4 Quantum Mechanics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={1.22} unit="eV" tolerance={0.03}
          hints={['E = hf. First find f = c/λ. Then convert J to eV: 1 eV = 1.602×10⁻¹⁹ J.']}
          problemText="Find the photon energy (eV) for λ = 1020 nm light."
          solution={<>E = hc/λ = (6.626e-34 × 3e8)/(1020e-9) = 1.95e-19 J = <strong>1.22 eV</strong></>}>
          A photon has wavelength λ = 1020 nm. Find its energy in eV.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={0.388} unit="nm" tolerance={0.02}
          hints={['λ = h/p. Find p from K = eV = p²/2m.']}
          problemText="Electron accelerated through 100 V. Find de Broglie wavelength (nm)."
          solution={<>p = √(2 × 9.11e-31 × 1.6e-17) = 1.71e-24. λ = 6.626e-34/1.71e-24 = <strong>0.388 nm</strong></>}>
          An electron is accelerated through 100 V. Find its de Broglie wavelength.
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={0.96} unit="eV" tolerance={0.05}
          hints={['Δp_min = ℏ/(2Δx). K = Δp²/(2m). Convert to eV.']}
          problemText="Electron confined to Δx=0.1 nm. Find minimum kinetic energy (eV)."
          solution={<>Δp = 1.055e-34/(2e-10) = 5.28e-25. K = (5.28e-25)²/(2×9.11e-31) = 1.53e-19 J = <strong>0.96 eV</strong></>}>
          An electron is confined to Δx = 0.1 nm. Estimate its minimum kinetic energy from the uncertainty principle.
        </InteractiveProblem>

        <Problem n={4} difficulty="medium"
          solution={<>Particle in box with L = 0.5 nm (5×10⁻¹⁰ m), m = electron mass. E_n = n²π²ℏ²/(2mL²). E₁ = π²(1.055e−34)²/(2×9.11e−31×(5e−10)²) = 2.41e−19 J = 1.51 eV. E₂ = 4E₁ = 6.02 eV. E₃ = 9E₁ = 13.5 eV. Transition 3→2: ΔE = 7.52 eV → λ = hc/ΔE = (4.136e−15 eV·s × 3e8)/7.52 = 165 nm (UV).</>}>
          An electron is confined in a 1D box of width L = 0.5 nm. Find the energies of the first three levels and the wavelength of the photon emitted in the 3→2 transition.
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>Quantum tunneling: a particle encounters a potential barrier of height V₀ {'>'} E (classically forbidden). The wavefunction does not vanish inside the barrier — it decays exponentially: ψ ∝ e^(−κx), where κ = √(2m(V₀−E))/ℏ. On the far side, a traveling wave emerges with reduced amplitude — the particle has tunneled through. Tunneling probability T ≈ e^(−2κL) for barrier width L. Applications: alpha decay (nucleus tunneling through Coulomb barrier), scanning tunneling microscope (electron tunneling across vacuum gap), tunnel diodes, and fusion in stars (protons tunnel through Coulomb repulsion).</>}>
          Explain quantum tunneling. Why is it allowed by quantum mechanics but forbidden classically? Give three real-world phenomena that depend on tunneling.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Energy is quantized: E = hf (Planck); photons carry energy hf regardless of intensity.',
        'Wave-particle duality: matter has wavelength λ = h/p (de Broglie); confirmed by electron diffraction.',
        'Uncertainty principle: Δx·Δp ≥ ℏ/2 — a fundamental limit, not a measurement problem.',
        'Wavefunction ψ: |ψ|² is probability density. Schrödinger\'s equation governs its evolution.',
        'Quantized energy in a box: E_n = n²π²ℏ²/2mL² — only discrete energies allowed.',
        'Zero-point energy: quantum particles can never be at rest; minimum energy is always nonzero.',
      ]} />
    </div>
  );
}
