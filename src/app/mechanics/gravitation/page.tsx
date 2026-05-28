import Orbit3D from '@/components/sims/Orbit3DClient';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function GravitationPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: 'var(--def-accent)' }}>Classical Mechanics · Chapter 6</div>
      <h1>Gravitation</h1>
      <p className="subtitle">Newton&apos;s universal law of gravity, Kepler&apos;s laws, and orbital mechanics in three dimensions.</p>

      <Prerequisites items={['Newton\'s laws', 'Circular motion', 'Energy conservation', 'Basic calculus']} />

      <LearningGoals items={[
        'Apply Newton\'s law of universal gravitation to calculate the gravitational force between two masses.',
        'Derive escape velocity from conservation of energy and calculate it for Earth.',
        'State and apply Kepler\'s three laws to describe orbital shape, speed variation, and period.',
        'Use Kepler\'s third law to find orbital periods and semi-major axes of planetary bodies.',
        'Relate orbital speed, energy, and radius using the vis-viva equation.',
      ]} />

      <h2>6.1 Newton&apos;s Law of Universal Gravitation</h2>

      <p>
        In 1687, Newton proposed that every pair of massive objects attracts each other with a force
        proportional to their masses and inversely proportional to the square of the distance between them.
        This was a radical unification — the same force that pulls an apple to Earth governs planetary orbits.
      </p>

      <EqNumbered number="6.1" latex="F = G\frac{m_1m_2}{r^2} \qquad G = 6.674\times10^{-11}\,\mathrm{N\,m^2/kg^2}" />

      <p>
        Near Earth&apos;s surface (r ≈ R_E), this reduces to F = mg where g = GM_E/R_E² = 9.81 m/s².
        At the Moon&apos;s distance (r = 60 R_E), g drops by a factor of 3600.
      </p>

      <Definition number="6.1" title="Gravitational Potential Energy">
        For objects separated by arbitrary distances, gravitational PE is:
        <span style={{ display: 'block', margin: '0.5rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          U(r) = −Gm₁m₂ / r
        </span>
        This is negative (gravity is attractive and does positive work as objects approach).
        The escape velocity is the speed needed to reach r → ∞: v_esc = √(2GM/R).
      </Definition>

      <WorkedExample number="6.1" title="Escape Velocity from Earth">
        <p>Find Earth&apos;s escape velocity. (M_E = 5.97 × 10²⁴ kg, R_E = 6.37 × 10⁶ m)</p>
        <Step label="Set KE = |PE|:">½mv² = GMm/R → v = √(2GM/R)</Step>
        <Step label="Calculate:">v = √(2 × 6.674×10⁻¹¹ × 5.97×10²⁴ / 6.37×10⁶) = √(125.1×10⁶)</Step>
        <Step label="Result:">v_esc = <strong style={{color:'#93c5fd'}}>11.2 km/s</strong> ≈ 40,000 km/h</Step>
      </WorkedExample>

      <h2>6.2 Kepler&apos;s Three Laws</h2>

      <p>
        Johannes Kepler (1609–1619) derived three empirical laws from Tycho Brahe&apos;s astronomical observations.
        Newton later showed they follow directly from the inverse-square gravity law.
      </p>

      <Theorem number="6.1" title="Kepler's First Law — Elliptical Orbits">
        Every planet orbits the Sun in an ellipse, with the Sun at one focus. An ellipse has two parameters:
        <ul style={{ marginTop: '0.5rem' }}>
          <li>Semi-major axis <em>a</em> — half the longest diameter</li>
          <li>Eccentricity <em>e</em> — shape parameter (0 = circle, 1 = parabola)</li>
        </ul>
        <span style={{ display: 'block', margin: '0.5rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          r(θ) = a(1 − e²) / (1 + e cos θ) &nbsp;&nbsp;&nbsp; (polar equation of orbit)
        </span>
      </Theorem>

      <Theorem number="6.2" title="Kepler's Second Law — Equal Areas">
        A line segment joining a planet and the Sun sweeps out equal areas in equal times.
        This is equivalent to conservation of angular momentum: L = mr²θ̇ = const.
        Consequence: the planet moves <em>faster</em> near perihelion (closest approach) and
        <em>slower</em> near aphelion (farthest point).
      </Theorem>

      <Theorem number="6.3" title="Kepler's Third Law — Orbital Period">
        The square of the orbital period T is proportional to the cube of the semi-major axis a:
        <span style={{ display: 'block', margin: '0.5rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          T² = (4π²/GM) · a³ &nbsp;&nbsp;&nbsp; or &nbsp;&nbsp;&nbsp; T² ∝ a³
        </span>
        Earth: a = 1 AU, T = 1 year. Jupiter: a = 5.2 AU → T = 5.2^(3/2) = 11.9 years.
      </Theorem>

      <h2>6.3 Orbital Simulation — 3D</h2>

      <p>
        The simulation below shows a planet orbiting a star using Kepler&apos;s equations of motion,
        solved via the eccentric anomaly. The velocity arrow (gold) grows near perihelion where
        orbital speed peaks, following the vis-viva equation:
      </p>

      <EqNumbered number="6.2" latex="v^2 = GM\left(\frac{2}{r} - \frac{1}{a}\right) \qquad \text{(vis-viva)}" />

      <p>
        Notice that inclination tilts the orbit out of the ecliptic plane. Real planetary orbits have
        inclinations of 0°–7° relative to Earth&apos;s orbital plane; comets can be inclined up to 90°+.
      </p>

      <Figure number="6.1" caption="3D orbital simulation. Eccentricity controls shape (0 = circle, 0.95 = elongated ellipse). Inclination tilts the orbit plane. The gold arrow is the velocity vector — watch it lengthen near perihelion.">
        <Orbit3D />
      </Figure>

      <WorkedExample number="6.2" title="Period of a Geostationary Satellite">
        <p>Find the altitude of a geostationary orbit (T = 24 h = 86,400 s). M_E = 5.97 × 10²⁴ kg.</p>
        <Step label="Kepler's 3rd:">T² = 4π²a³/GM_E → a³ = GM_E T²/(4π²)</Step>
        <Step label="Calculate:">a³ = (6.674×10⁻¹¹)(5.97×10²⁴)(86400)² / (4π²) = 7.54×10²² m³</Step>
        <Step label="Solve:">a = (7.54×10²²)^(1/3) = 4.22×10⁷ m = 42,200 km</Step>
        <Step label="Altitude:">h = a − R_E = 42,200 − 6,370 = <strong style={{color:'#93c5fd'}}>35,830 km</strong> above Earth&apos;s surface</Step>
      </WorkedExample>

      <Definition number="6.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Gravity is universal:</strong> both masses pull equally on each other, even when one acceleration is tiny.</li>
          <li><strong>Use center-to-center distance:</strong> orbital radius is measured from the central body&apos;s center, not its surface.</li>
          <li><strong>Weight is not mass:</strong> mass stays fixed; weight changes with local gravitational field strength.</li>
          <li><strong>Potential energy is negative for bound gravity:</strong> zero is chosen at infinite separation.</li>
          <li><strong>Kepler&apos;s third law uses semi-major axis:</strong> for ellipses, do not substitute perihelion or aphelion distance.</li>
        </ul>
      </Definition>

      <PracticeProblems section="6.1–6.3 Gravitation">
        <InteractiveProblem n={1} difficulty="easy"
          answer={11.2} unit="km/s" tolerance={0.02}
          hints={['v_esc = √(2GM/R). Use M_E=5.97×10²⁴ kg, R_E=6.37×10⁶ m, G=6.674×10⁻¹¹.']}
          problemText="Find Earth's escape velocity (km/s)."
          solution={<>v = √(2×6.674×10⁻¹¹×5.97×10²⁴/6.37×10⁶) = √(125.1×10⁶) = <strong>11.2 km/s</strong></>}>
          Calculate the escape velocity from Earth's surface.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={1.87} unit="years" tolerance={0.02}
          hints={['T² ∝ a³. T_Mars = T_Earth × (a_Mars/a_Earth)^(3/2). a_Mars = 1.52 AU.']}
          problemText="Mars semi-major axis a=1.52 AU. Find orbital period T (Earth years)."
          solution={<>T = 1 × (1.52)^(3/2) = 1 × 1.874 = <strong>1.87 years</strong></>}>
          Using Kepler's third law, find Mars's orbital period given its semi-major axis of 1.52 AU.
        </InteractiveProblem>

        <Problem n={3} difficulty="easy"
          solution={<>At altitude h, g = GM_E/(R_E+h)². At h = R_E: g = GM_E/(2R_E)² = GM_E/(4R_E²) = g_surface/4 = 9.81/4 = <strong>2.45 m/s²</strong>.</>}>
          At what altitude above Earth (in terms of R_E) does gravitational acceleration equal g/4? What is the actual g there?
        </Problem>

        <Problem n={4} difficulty="medium"
          solution={<>T² ∝ a³ → (T_M/T_E)² = (a_M/a_E)³ → T_M = T_E (a_M/a_E)^(3/2) = 1 year × (1.52)^(3/2) = 1 × 1.874 = <strong>1.87 years</strong> ≈ 687 Earth days.</>}>
          Mars&apos;s orbital semi-major axis is 1.52 AU. Using Kepler&apos;s Third Law, find Mars&apos;s orbital period in Earth years.
        </Problem>

        <Problem n={5} difficulty="medium"
          solution={<>Angular momentum L = mr²ω = mr²(2π/T). By Kepler&apos;s 2nd law L = const. At perihelion r_p = a(1−e), at aphelion r_a = a(1+e). Since r_p v_p = r_a v_a (L/m = const): v_p/v_a = r_a/r_p = (1+e)/(1−e). For e = 0.5: ratio = 1.5/0.5 = <strong>3</strong>.</>}>
          A comet has orbital eccentricity e = 0.5. What is the ratio of its speed at perihelion to its speed at aphelion?
        </Problem>

        <Problem n={6} difficulty="hard"
          solution={<>v_circ = √(GM/r). Orbital KE = ½mv² = GMm/(2r). PE = −GMm/r. Total E = KE + PE = −GMm/(2r). The total energy is negative (bound orbit) and equals exactly −KE. To escape, need ΔE = GMm/(2r) — this is half the absolute PE, or equivalently KE_escape = 2 × KE_orbital.</>}>
          Show that for a circular orbit, the total mechanical energy is E = −GMm/(2r). What is the minimum additional kinetic energy needed to escape from that orbit?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        "Newton's gravity (F ∝ 1/r²) explains why planets follow ellipses — Kepler's laws are consequences.",
        "Kepler's 2nd law (equal areas) is conservation of angular momentum in disguise.",
        "Kepler's 3rd law (T² ∝ a³) lets us calculate orbital periods from semi-major axis alone.",
        "Orbital speed peaks at perihelion; the vis-viva equation gives speed at any point.",
        "Escape velocity from a body is v = √(2GM/R) — independent of escape direction.",
      ]} />
    </div>
  );
}
