import DoubleSlitSimClient from '@/components/sims/DoubleSlitSimClient';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function WaveOpticsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#eab308' }}>Optics · Chapter 18</div>
      <h1>Wave Optics</h1>
      <p className="subtitle">
        When the scale of optical elements approaches the wavelength of light, geometric optics
        breaks down. Wave optics explains interference, diffraction, and the fundamental
        resolution limit of every optical instrument.
      </p>

      <Prerequisites items={['Wave properties (Ch. 8)', 'Interference (Ch. 11)', 'Geometric optics (Ch. 17)']} />

      <LearningGoals items={[
        'Predict bright and dark fringe positions in a double-slit experiment using the path difference condition.',
        'Calculate fringe spacing Δy = λL/d and infer wavelength from observed patterns.',
        'Apply the Rayleigh criterion to find the diffraction-limited resolution of an optical instrument.',
        'Determine constructive and destructive reflection conditions for thin films, accounting for phase shifts.',
        'Explain how anti-reflection coatings exploit destructive interference to minimize reflection losses.',
      ]} />

      <h2>18.1 The Wave Nature of Light</h2>

      <p>
        Light is an electromagnetic wave with wavelength roughly 380–780 nm. Its wave nature
        becomes apparent only when it interacts with objects or apertures comparable in size to
        its wavelength. For everyday objects (centimeters), λ/object ≈ 10⁻⁵ and light behaves
        as a ray. For a 500 nm aperture, wave effects dominate entirely.
      </p>

      <p>
        The <strong>principle of superposition</strong> governs wave optics: at any point, the
        total electric field is the sum of contributions from all sources. Constructive
        interference (crests meet crests) produces bright fringes; destructive interference
        (crests meet troughs) produces dark fringes.
      </p>

      <h2>18.2 Young&apos;s Double-Slit Experiment</h2>

      <p>
        In 1801, Thomas Young demonstrated light&apos;s wave nature by shining monochromatic light
        through two narrow slits separated by distance d and observing alternating bright and
        dark bands on a screen at distance L. The path difference from the two slits to a point
        at height y on the screen is Δ = d sin θ ≈ dy/L for small angles.
      </p>

      <Theorem number="18.1" title="Double-Slit Interference Conditions">
        <span style={{ display: 'block', marginBottom: '0.3rem' }}>
          Bright fringes (constructive): &nbsp; d sin θ = mλ &nbsp; (m = 0, ±1, ±2, …)
        </span>
        <span style={{ display: 'block', marginBottom: '0.3rem' }}>
          Dark fringes (destructive): &nbsp; d sin θ = (m + ½)λ
        </span>
        <span style={{ display: 'block' }}>
          Fringe spacing on screen: &nbsp; Δy = λL/d &nbsp; (small angle)
        </span>
      </Theorem>

      <p>
        The fringe spacing Δy = λL/d reveals the wavelength: smaller d or larger L spreads
        the fringes. This is how wavelengths of light were first measured with precision.
      </p>

      <Figure number="18.1" caption="Double-slit interference pattern. The colored band on the right is the intensity at the screen. Change λ (wavelength controls fringe color), d (slit separation controls fringe spacing), and a (slit width controls the single-slit envelope that modulates the pattern). Notice how narrower slits spread the envelope.">
        <DoubleSlitSimClient />
      </Figure>

      <WorkedExample number="18.1" title="Fringe Spacing in Young's Experiment">
        <p>
          Light of wavelength 589 nm passes through two slits 0.25 mm apart. A screen is 1.2 m
          away. Find the distance between adjacent bright fringes.
        </p>
        <Step label="Formula:">Δy = λL/d</Step>
        <Step label="Substitute:">Δy = (589×10⁻⁹ m × 1.2 m) / (0.25×10⁻³ m)</Step>
        <Step label="Calculate:">Δy = 7.068×10⁻⁷ / 2.5×10⁻⁴ = 2.83×10⁻³ m = <strong>2.83 mm</strong></Step>
      </WorkedExample>

      <h2>18.3 Single-Slit Diffraction</h2>

      <p>
        Even a single slit of finite width a produces a diffraction pattern. Each point within
        the slit acts as a secondary wave source (Huygens&apos; principle). The intensity pattern is:
      </p>

      <EqNumbered number="18.1">I(θ) = I₀ [sin(β/2) / (β/2)]² &nbsp;&nbsp; where β = (2πa/λ) sin θ</EqNumbered>

      <p>
        This sinc² function gives a central maximum flanked by minima at a sin θ = mλ
        (m = ±1, ±2, …). The central maximum has width 2λ/a — a narrower slit creates a
        <em>wider</em> diffraction pattern. This reciprocal relationship between object size
        and diffraction spread is a fundamental feature of wave physics (and of Fourier transforms).
      </p>

      <Definition number="18.1" title="Rayleigh Criterion — Resolution Limit">
        Two point sources are just resolved when the central maximum of one falls on the first
        minimum of the other. For a circular aperture of diameter D:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          θ_min = 1.22 λ/D
        </span>
        This is the diffraction-limited resolution of a telescope, microscope, or eye. Larger
        aperture D → better resolution. This formula ends the dream of perfect optical images
        — all real optical instruments are resolution-limited by diffraction.
      </Definition>

      <WorkedExample number="18.2" title="Resolution of the Human Eye">
        <p>
          The pupil diameter in bright light is about 2 mm. What is the angular resolution
          of the human eye at λ = 550 nm?
        </p>
        <Step label="Rayleigh criterion:">θ_min = 1.22 × λ/D = 1.22 × 550×10⁻⁹ / 2×10⁻³</Step>
        <Step label="Calculate:">θ_min = 1.22 × 2.75×10⁻⁴ = 3.35×10⁻⁴ rad ≈ 1.2 arcminutes</Step>
        <Step label="Context:">At arm&apos;s length (60 cm), this resolves features separated by 60 cm × 3.35×10⁻⁴ = 0.2 mm. The retina&apos;s cone spacing (≈3 μm at the fovea) matches this limit.</Step>
      </WorkedExample>

      <h2>18.4 Thin Film Interference</h2>

      <p>
        When light reflects off the top and bottom surfaces of a thin film (soap bubble,
        oil slick, lens coating), the two reflected waves interfere. The path difference
        is approximately 2t (where t is the film thickness), but reflections at boundaries
        where n increases introduce an extra <strong>half-wavelength phase shift</strong>.
      </p>

      <Theorem number="18.2" title="Thin Film Conditions (film of index n, in air)">
        <span style={{ display: 'block', marginBottom: '0.3rem' }}>
          Light reflects with phase shift at air→film boundary (lower→higher n), but not at film→air.
        </span>
        <span style={{ display: 'block', marginBottom: '0.3rem' }}>
          Constructive reflection: &nbsp; 2nt = (m + ½)λ &nbsp; (m = 0, 1, 2, …)
        </span>
        <span style={{ display: 'block' }}>
          Destructive reflection: &nbsp; 2nt = mλ
        </span>
        The wavelength in the film is λ/n, so effective path is scaled by n.
      </Theorem>

      <p>
        This is why soap bubbles show rainbow colors: different wavelengths constructively
        interfere at different film thicknesses. Anti-reflection coatings on camera lenses
        and eyeglasses are designed to cancel reflected light: choose thickness t = λ/(4n)
        so 2nt = λ/2, producing destructive reflection for the design wavelength.
      </p>

      <Definition number="18.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Use path difference for phase:</strong> bright and dark conditions depend on relative phase, not absolute distance.</li>
          <li><strong>Single-slit diffraction envelopes double-slit fringes:</strong> real slits are not point sources.</li>
          <li><strong>Rayleigh resolution is an angular limit:</strong> convert to linear separation only after using the distance to the image or object.</li>
          <li><strong>Thin-film phase flips matter:</strong> reflection from a higher-index boundary adds a half-cycle phase shift.</li>
        </ul>
      </Definition>

      <PracticeProblems section="18.1–18.4 Wave Optics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={2.83} unit="mm" tolerance={0.02}
          hints={['Δy = λL/d. Keep units consistent — convert nm and mm to meters.']}
          problemText="λ=589 nm, d=0.25 mm, L=1.2 m. Find fringe spacing Δy (mm)."
          solution={<>Δy = (589e-9 × 1.2)/(0.25e-3) = <strong>2.83 mm</strong></>}>
          Light of 589 nm passes through two slits 0.25 mm apart, screen at 1.2 m. Find the fringe spacing.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={3.35e-4} unit="rad" tolerance={0.05}
          hints={['θ_min = 1.22λ/D. Diameter = 2 mm = 0.002 m.']}
          problemText="Pupil D=2 mm, λ=550 nm. Find angular resolution θ_min (rad)."
          solution={<>θ_min = 1.22×550e-9/0.002 = <strong>3.35×10⁻⁴ rad</strong></>}>
          Find the diffraction-limited angular resolution of a 2 mm pupil at λ = 550 nm.
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={145} unit="nm" tolerance={0.02}
          hints={['Minimum thickness for first-order constructive: 2nt = λ/2, so t = λ/(4n).']}
          problemText="Anti-reflection coating, n=1.38, λ=800 nm. Find minimum thickness t (nm)."
          solution={<>t = λ/(4n) = 800/(4×1.38) = 800/5.52 = <strong>145 nm</strong></>}>
          An anti-reflection coating (n = 1.38) is applied for λ = 800 nm. Find the minimum thickness for destructive reflection.
        </InteractiveProblem>

        <Problem n={4} difficulty="medium"
          solution={<>A soap film (n≈1.33) in air: phase shift at first surface (air→soap), no phase shift at second (soap→air). Net: one phase shift = λ/2 equivalent path. For minimum reflected thickness (first constructive): 2nt = λ/2 → t = λ/(4n). For λ=600 nm: t = 600/(4×1.33) = 113 nm. At zero thickness (where film thins before bursting), the half-shift makes the film look black in reflection — destructive interference for all wavelengths.</>}>
          A soap bubble appears bright in the red (600 nm) at what minimum film thickness? What color does a very thin soap film (approaching zero thickness) appear, and why?
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>The Hubble Space Telescope (D = 2.4 m) achieves θ_min = 1.22×550e-9/2.4 = 2.8×10⁻⁷ rad ≈ 0.05 arcseconds. The James Webb (D = 6.5 m, λ∼2μm): θ_min = 1.22×2e-6/6.5 = 3.75×10⁻⁷ rad, worse per-pixel in IR but vastly more light-gathering. The ELT (39 m, adaptive optics): θ_min ≈ 4×10⁻⁹ rad at 500nm = 0.8 milliarcseconds — atmosphere is corrected, diffraction limit reached. Compare: 1 arcsecond = 4.85×10⁻⁶ rad.</>}>
          Calculate the diffraction-limited angular resolution of (a) the Hubble Space Telescope (D = 2.4 m, λ = 550 nm), (b) the James Webb Space Telescope (D = 6.5 m, λ = 2 μm), (c) the ELT ground telescope (D = 39 m). Express in arcseconds.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Wave optics governs when aperture or object size ≈ λ; geometric optics fails in this regime.',
        'Double-slit: bright fringes at d sinθ = mλ; fringe spacing Δy = λL/d on a distant screen.',
        'Single-slit diffraction: I ∝ sinc²(πa sinθ/λ); narrower slit → wider central maximum.',
        'Rayleigh criterion: θ_min = 1.22λ/D — diffraction limits resolution of all optical instruments.',
        'Thin film: constructive reflection when 2nt = (m+½)λ (accounting for phase shifts at boundaries).',
        'Anti-reflection coatings use destructive interference to eliminate reflection at a design wavelength.',
      ]} />
    </div>
  );
}
