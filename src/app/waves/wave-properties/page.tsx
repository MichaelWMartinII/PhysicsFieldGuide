import WaveInterference from '@/components/sims/WaveInterference';
import WaveSurface3D from '@/components/sims/WaveSurface3DClient';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function WavePropertiesPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: 'var(--ex-accent)' }}>Waves &amp; Oscillations · Chapter 8</div>
      <h1>Wave Properties</h1>
      <p className="subtitle">Waves carry energy without carrying matter. Understanding their properties unlocks optics, acoustics, electromagnetism, and quantum mechanics.</p>

      <Prerequisites items={['Simple harmonic motion', 'Trigonometry', 'Basic calculus']} />

      <LearningGoals items={[
        'Identify amplitude, wavelength, frequency, wave number, and wave speed from the equation y = A sin(kx − ωt + φ).',
        'Verify that a sinusoidal wave satisfies the wave equation and relate wave speed to medium properties.',
        'Derive the standing wave pattern from superposition of two counter-propagating waves.',
        'Calculate resonant harmonic frequencies for a string fixed at both ends.',
        'Apply the conditions for constructive and destructive interference to two-source problems.',
      ]} />

      <h2>8.1 What is a Wave?</h2>

      <p>
        A wave is a disturbance that propagates through space and time, transferring energy without
        permanently displacing matter. The medium oscillates locally while the pattern moves.
        There are two fundamental types:
      </p>

      <ul>
        <li><strong>Transverse waves</strong> — medium displaces perpendicular to propagation direction. Examples: light, string waves, seismic S-waves.</li>
        <li><strong>Longitudinal waves</strong> — medium displaces parallel to propagation. Examples: sound, seismic P-waves.</li>
      </ul>

      <Definition number="8.1" title="Wave Parameters">
        A sinusoidal traveling wave is described by:
        <span style={{ display: 'block', margin: '0.5rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          y(x, t) = A sin(kx − ωt + φ)
        </span>
        where:
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>A</strong> — amplitude (maximum displacement, meters)</li>
          <li><strong>k = 2π/λ</strong> — wave number (radians per meter)</li>
          <li><strong>ω = 2πf = 2π/T</strong> — angular frequency (radians per second)</li>
          <li><strong>φ</strong> — initial phase (radians)</li>
          <li><strong>v = ω/k = fλ</strong> — wave speed (meters per second)</li>
        </ul>
      </Definition>

      <h2>8.2 The Wave Equation</h2>

      <p>
        All waves satisfy the wave equation — a second-order partial differential equation that
        relates the spatial and temporal second derivatives of displacement:
      </p>

      <EqNumbered number="8.1" latex="\frac{\partial^2 y}{\partial t^2}=v^2\frac{\partial^2 y}{\partial x^2}" />

      <p>
        You can verify that y = A sin(kx − ωt) satisfies (8.1) with v = ω/k. This equation arises
        from Newton&apos;s second law applied to an elastic medium. The wave speed v depends on the medium:
      </p>

      <EqNumbered number="8.2" latex="v_\mathrm{string}=\sqrt{\frac{F_T}{\mu}} \qquad v_\mathrm{sound}=\sqrt{\frac{B}{\rho}} \qquad v_\mathrm{light}=c=3.00\times10^8\,\mathrm{m/s}" />

      <p>
        where F_T is string tension, μ is linear mass density, B is bulk modulus, and ρ is density.
        Note: wave speed in a medium is a property of that medium, not of frequency.
      </p>

      <h2>8.3 Standing Waves</h2>

      <p>
        When two identical waves travel in opposite directions, their superposition creates a
        <strong> standing wave</strong> — a pattern that oscillates in place with fixed nodes and antinodes.
      </p>

      <Theorem number="8.1" title="Standing Wave Formation">
        Adding two traveling waves of equal amplitude moving in opposite directions:
        <span style={{ display: 'block', margin: '0.5rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          y = A sin(kx − ωt) + A sin(kx + ωt) = 2A sin(kx) cos(ωt)
        </span>
        This factors into a spatial part 2A sin(kx) and a temporal part cos(ωt). The nodes (zeros)
        are fixed at kx = nπ → x = nλ/2. The antinodes (maxima) are at x = (2n+1)λ/4.
      </Theorem>

      <p>
        Standing waves on a string fixed at both ends satisfy the boundary condition: nodes at x = 0
        and x = L. This forces the allowed wavelengths:
      </p>

      <EqNumbered number="8.3" latex="\lambda_n=\frac{2L}{n} \qquad f_n=\frac{nv}{2L} \qquad n=1,2,3,\ldots" />

      <p>
        These are the <strong>harmonics</strong> (or overtones). n = 1 is the fundamental frequency;
        n = 2 is the first overtone, and so on. This is why guitar strings produce musical notes:
        the string length forces specific resonant frequencies.
      </p>

      <Figure number="8.1" caption="3D wave surface simulation. Switch between traveling, standing, and circular (point source) modes. Note how the standing wave has fixed nodes — points that never move. Drag to rotate, scroll to zoom.">
        <WaveSurface3D />
      </Figure>

      <WorkedExample number="8.1" title="Guitar String Harmonics">
        <p>A guitar string is 65 cm long. The wave speed on this string is 400 m/s. Find the first three harmonic frequencies.</p>
        <Step label="Fundamental (n=1):">f₁ = v/(2L) = 400/(2 × 0.65) = <strong>307.7 Hz</strong> ≈ E₄ note</Step>
        <Step label="Second harmonic (n=2):">f₂ = 2f₁ = <strong>615 Hz</strong> ≈ E₅</Step>
        <Step label="Third harmonic (n=3):">f₃ = 3f₁ = <strong>923 Hz</strong></Step>
        <Step label="Note:">The harmonics are integer multiples of the fundamental — this is what gives musical instruments their timbre.</Step>
      </WorkedExample>

      <h2>8.4 Wave Interference</h2>

      <p>
        When two or more waves overlap in the same medium, the resulting displacement is the sum of
        the individual displacements. This is the <strong>superposition principle</strong>.
      </p>

      <Figure number="8.2" caption="Two-source interference pattern. Blue = constructive (waves in phase), Red = destructive (waves out of phase). Adjust phase difference to see the pattern invert.">
        <WaveInterference />
      </Figure>

      <WorkedExample number="8.2" title="Double-Slit Fringe Spacing">
        <p>In Young&apos;s double-slit experiment: slit separation d = 0.2 mm, screen distance L = 2 m, λ = 550 nm. Find fringe spacing.</p>
        <Step label="Formula:">Δy = λL/d</Step>
        <Step label="Calculate:">Δy = (550×10⁻⁹ × 2) / (0.2×10⁻³) = <strong>5.5 mm</strong></Step>
        <Step label="Interpretation:">Bright fringes appear every 5.5 mm. Shorter wavelength → closer fringes; larger slit separation → closer fringes.</Step>
      </WorkedExample>

      <Definition number="8.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Amplitude is not wave speed:</strong> larger amplitude carries more energy, but the speed is set by the medium.</li>
          <li><strong>Frequency and wavelength trade off in one medium:</strong> if v is fixed, increasing f decreases λ.</li>
          <li><strong>Standing waves do not transport energy along the string on average:</strong> the pattern stores energy locally between nodes.</li>
          <li><strong>Nodes are fixed points:</strong> antinodes have maximum displacement amplitude, not maximum displacement at every instant.</li>
        </ul>
      </Definition>

      <PracticeProblems section="8.1–8.4 Waves">
        <InteractiveProblem n={1} difficulty="easy"
          answer={500} unit="Hz" tolerance={0.02}
          hints={['v = fλ → f = v/λ', 'v = 340 m/s, λ = 0.68 m']}
          problemText="A sound wave in air (v = 340 m/s) has wavelength λ = 68 cm. Find its frequency in Hz."
          solution={<>f = v/λ = 340/0.68 = <strong>500 Hz</strong>. (Also: T = 1/f = 2 ms, k = 2π/λ = 9.24 rad/m.)</>}>
          A sound wave in air (v = 340 m/s) has wavelength λ = 68 cm. Find its frequency, period, and wave number.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={0.773} unit="m" tolerance={0.02}
          hints={['λ = v/f = 340/440', 'ω = 2πf, k = ω/v = 2πf/v, λ = 2π/k']}
          problemText="A 440 Hz sound wave travels at 340 m/s. Find its wavelength in meters."
          solution={<>λ = v/f = 340/440 = <strong>0.773 m</strong>. Full wave: y = (0.0005) sin(8.13x − 2765t) m.</>}>
          Write the equation for a sound wave with frequency 440 Hz (concert A), amplitude 0.5 mm, traveling in the +x direction at 340 m/s.
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>For both ends fixed: f_n = nv/(2L). We need f_n = 440 Hz, v = √(T/μ) = √(80/0.005) = 126.5 m/s. For n=1: L = v/(2f) = 126.5/(880) = <strong>14.4 cm</strong>. For n=3: L = 3×14.4 = 43.1 cm.</>}>
          A guitar string has tension 80 N and linear density 5 g/m. What length string produces 440 Hz as its fundamental? As its third harmonic?
        </Problem>

        <Problem n={4} difficulty="medium"
          solution={<>Destructive: path difference = (m+½)λ. First dark fringe: |r₁−r₂| = λ/2. For two sources 4λ apart, the central line (equidistant) has Δr = 0 → constructive. First dark fringe at sin(θ) = λ/(2d) = 1/8 → θ = 7.2°.</>}>
          Two coherent sources are 4λ apart (same frequency, in phase). Find the angle of the first dark fringe.
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>Standing wave on string: y = 2A sin(kx) cos(ωt). Velocity: ∂y/∂t = −2Aω sin(kx) sin(ωt). At a node (kx = nπ): y = 0 always, velocity = 0 always — no motion. At an antinode (kx = (2n+1)π/2): y_max = 2A (max displacement), but v_max = 2Aω (max velocity) occurs when cos(ωt) = 0 (when displacement is zero). Antinodes have maximum amplitude but KE and PE alternate — just like a simple harmonic oscillator.</>}>
          Analyze the energy distribution in a standing wave. Where are the nodes and antinodes of displacement? Of velocity? At what phase in the oscillation does a standing wave have maximum kinetic energy vs maximum potential energy?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'All sinusoidal waves satisfy y = A sin(kx − ωt + φ); speed v = ω/k = fλ.',
        'Wave speed depends on the medium (tension, density, elasticity) — not on frequency.',
        'Standing waves arise from superposition of counter-propagating waves; they have fixed nodes.',
        "Allowed harmonics on a fixed string: f_n = nv/(2L) — the basis of stringed instrument physics.",
        'Interference is fundamental: constructive where Δr = mλ, destructive where Δr = (m+½)λ.',
      ]} />
    </div>
  );
}
