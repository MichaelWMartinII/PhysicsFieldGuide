import WaveInterference from '@/components/sims/WaveInterference';
import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function InterferencePage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#10b981' }}>Waves &amp; Oscillations · Chapter 11</div>
      <h1>Interference &amp; Diffraction</h1>
      <p className="subtitle">
        Waves add together. Where they add constructively, you get bright spots. Where they cancel, darkness.
        These patterns encode deep information about sources, slits, and the wave nature of light itself.
      </p>

      <Prerequisites items={['Wave properties (Ch. 8) — superposition, wavelength, phase', 'Trigonometry']} />

      <LearningGoals items={[
        'State the superposition principle and express the total displacement of two overlapping waves.',
        'Derive the conditions for constructive and destructive interference from path difference.',
        'Apply the Young\'s double-slit fringe spacing formula y_m = mλL/d to calculate fringe positions.',
        'Predict how fringe spacing changes with wavelength, slit separation, and screen distance.',
        'Explain why single-photon and single-electron double-slit experiments still show interference.',
      ]} />

      <h2>11.1 The Superposition Principle</h2>

      <p>
        When two waves overlap in space, the resulting displacement at any point is simply the sum of
        the individual displacements. This linearity is the <strong>superposition principle</strong>,
        and it is what gives rise to interference patterns.
      </p>

      <EqNumbered number="11.1" latex="y_\mathrm{total}(x,t)=y_1(x,t)+y_2(x,t)" />

      <p>
        The superposition principle holds for all linear wave systems — light, sound, water waves, and
        quantum mechanical probability amplitudes. It breaks down only when the medium responds
        nonlinearly to large amplitudes (e.g., nonlinear optics, shock waves).
      </p>

      <h2>11.2 Two-Source Interference</h2>

      <p>
        Two coherent point sources emit identical waves. At any point P in the field, the two waves
        arrive having traveled different distances r₁ and r₂. The <strong>path difference</strong>
        Δr = |r₂ − r₁| determines whether they interfere constructively or destructively.
      </p>

      <Definition number="11.1" title="Conditions for Two-Source Interference">
        For two coherent sources in phase (Δφ = 0):
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Constructive:</strong> Δr = mλ &nbsp; (m = 0, ±1, ±2, …) — waves arrive in phase, amplitudes add.</li>
          <li><strong>Destructive:</strong> Δr = (m + ½)λ &nbsp; (m = 0, ±1, ±2, …) — waves arrive out of phase, amplitudes cancel.</li>
        </ul>
        If the sources have an initial phase offset Δφ, replace Δr = mλ with Δr = mλ − Δφ/(2π)λ.
      </Definition>

      <p>
        Each source emits:
      </p>

      <EqNumbered number="11.2" latex="y=A\sin(kr-\omega t+\phi) \qquad k=\frac{2\pi}{\lambda}" />

      <Figure number="11.1" caption="Two-source interference pattern. Blue = constructive interference (waves in phase), red = destructive (out of phase), black = nodal lines. Adjust source separation, wavelength, and phase difference to watch the pattern change.">
        <WaveInterference />
      </Figure>

      <h2>11.3 Young&apos;s Double-Slit Experiment</h2>

      <p>
        Thomas Young&apos;s 1801 experiment showed that light produces an interference pattern, proving
        its wave nature. A monochromatic source illuminates two narrow slits separated by distance d.
        On a screen at distance L (with L ≫ d), bright fringes appear at positions:
      </p>

      <EqNumbered number="11.3" latex="y_m=\frac{m\lambda L}{d} \qquad m=0,\pm1,\pm2,\ldots" />

      <p>
        where m is the fringe order. The fringe spacing is constant: Δy = λL/d. Shorter wavelength
        gives closer fringes; larger slit separation also gives closer fringes.
      </p>

      <WorkedExample number="11.1" title="Double-Slit Fringe Spacing">
        <p>
          In Young&apos;s experiment: slit separation d = 0.2 mm, screen distance L = 2.0 m,
          wavelength λ = 550 nm. Find the fringe spacing and the position of the third bright fringe.
        </p>
        <Step label="Fringe spacing:">Δy = λL/d = (550×10⁻⁹ × 2.0) / (0.2×10⁻³) = <strong>5.5 mm</strong></Step>
        <Step label="Third fringe (m=3):">y₃ = 3 × 5.5 mm = <strong>16.5 mm</strong> from center</Step>
        <Step label="Note:">Switching to λ = 440 nm (violet): Δy = 4.4 mm — fringes pack closer together. Switching to d = 0.4 mm: Δy = 2.75 mm — same effect.</Step>
      </WorkedExample>

      <h2>11.4 What to Watch in the Simulation</h2>

      <ul>
        <li>
          <strong>Phase Δ = 0°:</strong> Standard double-slit pattern — bright central maximum, symmetric fringes on both sides.
        </li>
        <li>
          <strong>Phase Δ = 180°:</strong> Dark central minimum — the two waves arrive out of phase and cancel exactly at the center.
        </li>
        <li>
          <strong>Source spacing:</strong> Increasing the spacing makes the fringes closer together (angular separation decreases).
        </li>
        <li>
          <strong>Wavelength:</strong> Shorter λ produces more fringes packed in the same angular range.
        </li>
      </ul>

      <p>
        This experiment is so fundamental that it has been repeated with single photons, electrons,
        atoms, and even molecules — and it still shows interference. The wave nature is a property of
        quantum probability amplitudes, not just classical wave superposition.
      </p>

      <Definition number="11.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Constructive does not mean high everywhere:</strong> the path difference changes from point to point.</li>
          <li><strong>Fringe spacing uses consistent units:</strong> convert nm, mm, and m before using Δy = λL/d.</li>
          <li><strong>Increasing slit separation narrows the pattern:</strong> Δy is inversely proportional to d.</li>
          <li><strong>Single-particle interference is not particle collision:</strong> the interference belongs to probability amplitudes.</li>
        </ul>
      </Definition>

      <PracticeProblems section="11.1–11.4 Interference">
        <InteractiveProblem n={1} difficulty="easy"
          answer={5.5} unit="mm" tolerance={0.02}
          hints={['Δy = λL/d', 'Convert all units: λ in m, L in m, d in m', 'Δy = (550×10⁻⁹ × 2.0) / (0.2×10⁻³)']}
          problemText="Young's double-slit: d = 0.2 mm, L = 2.0 m, λ = 550 nm. Find fringe spacing in mm."
          solution={<>Δy = λL/d = (550×10⁻⁹ × 2.0)/(0.2×10⁻³) = <strong>5.5 mm</strong></>}>
          In Young&apos;s double-slit experiment with d = 0.2 mm, L = 2.0 m, and λ = 550 nm, find the fringe spacing.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={4.4} unit="mm" tolerance={0.02}
          hints={['Δy = λL/d — fringe spacing scales linearly with wavelength.', 'Δy(440) / Δy(550) = 440/550']}
          problemText="Same setup as above (d = 0.2 mm, L = 2.0 m) but with violet light λ = 440 nm. Find fringe spacing in mm."
          solution={<>Δy = (440×10⁻⁹ × 2.0)/(0.2×10⁻³) = <strong>4.4 mm</strong></>}>
          Repeat the Young&apos;s double-slit calculation with violet light (λ = 440 nm), same geometry. What is the new fringe spacing?
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Destructive: path difference = (m+½)λ. First dark fringe: Δr = λ/2. For two sources 4λ apart, the central line (equidistant) has Δr = 0 → constructive. First dark fringe at sin(θ) = λ/(2d) = 1/8 → θ ≈ 7.2°.</>}>
          Two coherent sources are 4λ apart (same frequency, in phase). Find the angle of the first dark fringe.
        </Problem>

        <Problem n={4} difficulty="medium"
          solution={<>Three slits equally spaced by d. At angles where sin θ = mλ/d (m integer), all three slits add constructively → principal maxima with amplitude 3A, intensity 9I. Between principal maxima there are secondary maxima and two minima. The first minimum is where the three phasors sum to zero; this occurs at Δφ = 2π/3 between adjacent slits, giving sin θ = mλ/(3d). The central principal maximum is three times narrower than the two-slit fringe — more slits give sharper, brighter fringes. This is the principle of the diffraction grating.</>}>
          Compare the interference pattern from two slits vs. three equally spaced slits (same spacing d). Where are the principal maxima for three slits? How do intensity and fringe width compare?
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>Single-slit diffraction: slit of width a, minima at sin θ = mλ/a (m = ±1, ±2, …). Central maximum width = 2λ/a (half-angle). Double-slit with finite width: intensity = I_0 (cos²δ)(sinc²β), where δ = πd sin θ/λ (interference) and β = πa sin θ/λ (diffraction). The missing orders occur when a double-slit maximum coincides with a single-slit minimum: d/a = m_i/m_d (integer ratio). Example: d = 3a → every 3rd order double-slit maximum is missing (suppressed by diffraction envelope). Real slits always show this combined pattern — pure two-source analysis ignores the envelope.</>}>
          Derive the intensity pattern for a double slit with finite slit width a and separation d. Explain missing orders and when they occur.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Superposition: y_total = y₁ + y₂. Linear waves add pointwise.',
        'Constructive: Δr = mλ; destructive: Δr = (m+½)λ (for in-phase sources).',
        'Young\'s fringe spacing: Δy = λL/d. Smaller λ or larger d → closer fringes.',
        'Phase offset Δφ shifts the entire pattern — 180° phase inverts constructive and destructive.',
        'Single-particle experiments (photon, electron) reproduce the interference pattern — wave nature is intrinsic to quantum amplitude, not a classical field effect.',
      ]} />
    </div>
  );
}
