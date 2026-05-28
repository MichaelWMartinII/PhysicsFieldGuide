import DopplerWaveClient from '@/components/sims/DopplerWaveClient';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function SoundPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#10b981' }}>Waves &amp; Oscillations · Chapter 10</div>
      <h1>Sound</h1>
      <p className="subtitle">
        Sound is a longitudinal pressure wave in a medium. Its physics spans the piano and the
        sonic boom, the bat&apos;s sonar and the medical ultrasound scan.
      </p>

      <Prerequisites items={['Wave properties (Ch. 8) — wavelength, frequency, speed, superposition']} />

      <LearningGoals items={[
        'Calculate the speed of sound in an ideal gas from γ, R, T, and M.',
        'Convert between intensity in W/m² and decibels using the logarithmic scale.',
        'Apply the Doppler formula to find observed frequency for moving sources and observers.',
        'Determine resonant frequencies of open-open and open-closed tubes.',
        'Predict beat frequency when two nearly equal frequencies are superposed.',
      ]} />

      <h2>10.1 The Nature of Sound</h2>

      <p>
        Sound is a <strong>longitudinal mechanical wave</strong>: the displacement of the medium
        (air molecules) is parallel to the direction of wave propagation. A vibrating source
        creates alternating regions of compression (high pressure) and rarefaction (low pressure)
        that propagate outward as a traveling wave.
      </p>

      <p>
        The speed of sound depends on the medium&apos;s elastic and inertial properties. In an
        ideal gas it is:
      </p>

      <EqNumbered number="10.1" latex="v_s=\sqrt{\frac{\gamma RT}{M}}" />

      <p>
        where γ is the adiabatic index (≈1.4 for air), R = 8.314 J/(mol·K), T is the
        absolute temperature, and M is the molar mass. At 20°C, v_s ≈ 343 m/s in air.
        Sound travels faster in denser solids — about 5100 m/s in steel — because the restoring
        force (bulk modulus) increases faster than the density.
      </p>

      <h2>10.2 Intensity and the Decibel Scale</h2>

      <p>
        The <strong>intensity</strong> I of a sound wave is the power transported per unit area,
        measured in W/m². For a point source radiating isotropically at power P in free space,
        intensity falls as the inverse square of distance: I = P/(4πr²).
      </p>

      <p>
        Because human hearing spans twelve orders of magnitude in intensity — from 10⁻¹² W/m²
        (threshold of hearing) to 1 W/m² (painful) — we use a logarithmic scale:
      </p>

      <EqNumbered number="10.2" latex="\beta=10\log_{10}\left(\frac{I}{I_0}\right) \qquad \text{(decibels, dB)}" />

      <p>
        where I₀ = 10⁻¹² W/m² is the reference intensity. Ordinary conversation ≈ 60 dB,
        a rock concert ≈ 110 dB, a jet engine at 30 m ≈ 140 dB (threshold of pain).
        Every 10 dB increase is a factor of 10 in intensity and roughly a factor of 2 in
        perceived loudness.
      </p>

      <WorkedExample number="10.1" title="Sound Level at Different Distances">
        <p>
          A speaker outputs 1 W of acoustic power. Find the intensity and decibel level
          at 1 m and 10 m.
        </p>
        <Step label="At 1 m:">I₁ = P/(4πr²) = 1/(4π) = 0.0796 W/m²</Step>
        <Step label="dB at 1 m:">β₁ = 10 log₁₀(0.0796 / 10⁻¹²) = 10 × 10.9 = 109 dB</Step>
        <Step label="At 10 m:">I₁₀ = 0.0796/100 = 7.96×10⁻⁴ W/m²</Step>
        <Step label="dB at 10 m:">β₁₀ = 10 log₁₀(7.96×10⁻⁴ / 10⁻¹²) = 10 × 8.9 = 89 dB</Step>
        <Step label="Note:">10× distance → intensity drops 100× → sound level drops 20 dB. ✓ (inverse square)</Step>
      </WorkedExample>

      <h2>10.3 The Doppler Effect</h2>

      <p>
        When a source of sound moves relative to an observer, the observed frequency differs
        from the emitted frequency. This is the <strong>Doppler effect</strong>: motion toward
        the observer compresses the wavefronts, raising the perceived pitch; motion away
        stretches them, lowering it.
      </p>

      <Definition number="10.1" title="Doppler Frequency Formula">
        For a source moving at speed v_s and observer moving at speed v_o, both measured
        relative to the medium (positive when moving toward each other):
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          f_obs = f₀ × (v + v_o) / (v − v_s)
        </span>
        where v = 343 m/s is the speed of sound. If source approaches: v_s {'>'} 0 → f_obs {'>'} f₀.
        If source recedes: v_s {'<'} 0 → f_obs {'<'} f₀.
      </Definition>

      <Figure number="10.1" caption="Doppler effect simulation. At rest, the wavefronts are evenly spaced. As the source moves right, wavefronts bunch toward the observer on the right (higher pitch) and spread out to the left (lower pitch). Push the source toward Mach 1 to see the Mach cone form.">
        <DopplerWaveClient />
      </Figure>

      <h2>10.4 Resonance in Tubes</h2>

      <p>
        A sound wave reflecting inside a tube creates a standing wave. The frequencies at which
        standing waves form are the <strong>natural frequencies</strong> or resonant modes.
        These are the fundamentals and harmonics heard from organ pipes, clarinets, and trumpets.
      </p>

      <Theorem number="10.1" title="Resonant Frequencies in Tubes">
        <span style={{ display: 'block', marginBottom: '0.35rem' }}>
          <strong>Open–open tube</strong> (both ends open, pressure nodes at ends):
          f_n = nv/(2L), n = 1, 2, 3, … &nbsp; (all harmonics)
        </span>
        <span style={{ display: 'block' }}>
          <strong>Open–closed tube</strong> (one open, one closed end):
          f_n = nv/(4L), n = 1, 3, 5, … &nbsp; (odd harmonics only)
        </span>
        A closed end is a displacement node (pressure antinode); an open end is a displacement
        antinode (pressure node).
      </Theorem>

      <WorkedExample number="10.2" title="Fundamental Frequency of an Organ Pipe">
        <p>
          An open organ pipe is 2.0 m long. Find its fundamental frequency and the first three
          harmonics. (v_s = 343 m/s)
        </p>
        <Step label="Fundamental (n=1):">f₁ = v/(2L) = 343/(2×2.0) = 343/4 = 85.75 Hz</Step>
        <Step label="Second harmonic:">f₂ = 2f₁ = 171.5 Hz</Step>
        <Step label="Third harmonic:">f₃ = 3f₁ = 257.3 Hz</Step>
        <Step label="Note:">If the pipe were closed at one end (length same), f₁ = v/(4L) = 42.9 Hz — an octave lower, with only odd harmonics.</Step>
      </WorkedExample>

      <h2>10.5 Beats</h2>

      <p>
        When two sound waves of slightly different frequencies f₁ and f₂ overlap, their
        superposition produces a slowly varying amplitude modulation called <strong>beats</strong>.
        The beat frequency — the rate at which the amplitude pulsates — is:
      </p>

      <EqNumbered number="10.3" latex="f_\mathrm{beat}=|f_1-f_2|" />

      <p>
        Musicians use beats to tune instruments: when f_beat → 0, the two instruments are
        in tune. A guitar string slightly sharp relative to a 440 Hz tuning fork produces a
        3 Hz beat — three loud pulses per second — which slows to zero as the string is
        loosened to pitch.
      </p>

      <Definition number="10.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Sound needs a medium:</strong> unlike light, sound does not propagate through vacuum.</li>
          <li><strong>Decibels are logarithmic:</strong> adding 10 dB multiplies intensity by 10; it does not add a fixed W/m² amount.</li>
          <li><strong>Doppler signs follow relative motion:</strong> approach raises observed frequency; recession lowers it.</li>
          <li><strong>Open and closed pipe ends swap node types:</strong> open ends are pressure nodes, closed ends are pressure antinodes.</li>
        </ul>
      </Definition>

      <PracticeProblems section="8.1–8.5 Sound">
        <InteractiveProblem n={1} difficulty="easy"
          answer={438} unit="Hz" tolerance={0.02}
          hints={['f_obs = f₀(v+v_o)/(v−v_s). Source approaching: v_s > 0.']}
          problemText="A 400 Hz source moves toward a stationary observer at 30 m/s. v_s=343 m/s. Find f_obs."
          solution={<>f = 400 × 343/(343−30) = 400 × 343/313 = 400 × 1.096 = <strong>438 Hz</strong></>}>
          A 400 Hz source moves toward a stationary observer at 30 m/s. Find the observed frequency. (v = 343 m/s)
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={85.75} unit="Hz" tolerance={0.02}
          hints={['For open-open tube: f = v/(2L).']}
          problemText="Open organ pipe, L=2.0 m, v=343 m/s. Find fundamental frequency (Hz)."
          solution={<>f₁ = 343/(2×2.0) = 343/4 = <strong>85.75 Hz</strong></>}>
          An open organ pipe is 2.0 m long. Find its fundamental frequency. (v = 343 m/s)
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={89} unit="dB" tolerance={0.5}
          hints={['β = 10 log(I/I₀). Inverse square: I at 10m = I at 1m / 100. Or subtract 20 dB.']}
          problemText="Sound is 109 dB at 1 m from a speaker. What is it at 10 m?"
          solution={<>I drops by factor 100 → β drops by 20 dB → 109 − 20 = <strong>89 dB</strong></>}>
          A sound measures 109 dB at 1 m from a speaker. What does it measure at 10 m?
        </InteractiveProblem>

        <Problem n={4} difficulty="medium"
          solution={<>f₁ = 445 Hz, f₂ = 441 Hz. f_beat = |445−441| = 4 Hz. The violinist hears 4 beats per second. To bring them into tune, they must lower the 445 Hz string (loosen it) or raise the 441 Hz string (tighten it) until f_beat → 0.</>}>
          Two violin strings sound at 445 Hz and 441 Hz. How many beats per second are heard, and which string must be adjusted to bring them into tune?
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>The shock wave (Mach cone) forms when v_source ≥ v_sound, i.e., Mach number M = v_s/v ≥ 1. The half-angle of the Mach cone: sin α = v/v_s = 1/M. At Mach 2: α = 30°, cone half-angle = 30°. The sonic boom is heard when the cone's oblique shock wave passes the observer — not when the aircraft breaks Mach 1. The observer on the ground hears nothing until the cone sweeps over them.</>}>
          Derive the Mach cone half-angle as a function of Mach number. At Mach 2, what is the cone angle? Explain why an observer on the ground hears silence until the boom arrives.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Sound is a longitudinal pressure wave; speed in air ≈ 343 m/s at 20°C, faster in denser solids.',
        'Intensity I = P/(4πr²); decibel scale β = 10 log(I/I₀) compresses the 10¹² dynamic range.',
        'Doppler effect: f_obs = f₀(v+v_o)/(v−v_s) — approach raises pitch, recession lowers it.',
        'Resonance: open–open pipe has all harmonics; open–closed pipe has only odd harmonics.',
        'Beats: f_beat = |f₁−f₂|; used by musicians to tune by ear.',
        'Sonic boom at Mach ≥ 1: shock cone half-angle = arcsin(1/M).',
      ]} />
    </div>
  );
}
