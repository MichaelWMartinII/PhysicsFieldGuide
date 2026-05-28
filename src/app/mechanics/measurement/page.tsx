import OrdersOfMagnitudeClient from '@/components/sims/OrdersOfMagnitudeClient';
import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Takeaways, LearningGoals, HistoryNote
} from '@/components/textbook';

export default function MeasurementPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: 'var(--def-accent)' }}>Classical Mechanics · Chapter 1</div>
      <h1>Measurement, Units, and Dimensional Analysis</h1>
      <p className="subtitle">
        Before we can do physics, we need a language for describing the physical world precisely.
        That language is mathematics, and its vocabulary begins with units of measurement.
      </p>

      <LearningGoals items={[
        'Identify the seven SI base units and express derived quantities in terms of them.',
        'Apply dimensional analysis to check equations and derive the functional form of physical laws.',
        'Convert measurements between unit systems using appropriate conversion factors.',
        'Use significant figures correctly in multiplication, division, addition, and subtraction.',
        'Perform order-of-magnitude Fermi estimates by combining rough numerical facts.',
      ]} />

      <h2>1.1 What is Physics?</h2>

      <p>
        Physics is the science of matter, energy, space, and time — and, more ambitiously, of the
        fundamental principles that govern all of them. Its central method is the same as it has been
        since <HistoryNote
          trigger="Galileo"
          year="1600s"
          title="Measurement becomes physics"
        >
          Galileo did not just watch falling bodies. He slowed motion down with ramps, timed it, and looked for mathematical regularities.
          That shift from argument to measurement is one reason modern physics begins with him.
        </HistoryNote>: observe nature, construct a mathematical model, derive consequences from that
        model, and test those consequences against new observations. When the model fails, revise it.
        When it succeeds, extend it.
      </p>

      <p>
        What distinguishes physics from other natural sciences is its commitment to <em>generality</em>.
        A physicist who understands Newton&apos;s second law F = ma can immediately analyze a falling
        apple, a planet&apos;s orbit, the vibration of a guitar string, and the collision of billiard balls —
        because all of these are instances of the same principle. This pursuit of the fewest, most
        general laws has been spectacularly successful. Four equations (Maxwell&apos;s) describe every
        electric and magnetic phenomenon ever observed. One equation (Schrödinger&apos;s) governs the
        behavior of every atom and molecule. The same inverse-square law that pulls an apple to the
        Earth guides the trajectory of the Voyager spacecraft, now more than 20 billion kilometers away.
      </p>

      <p>
        Physics also provides the foundation for all other physical sciences and for engineering.
        Chemistry rests on quantum mechanics. Geology depends on thermodynamics and fluid mechanics.
        Neuroscience relies on electromagnetism and statistical physics. The tools you will develop
        here are genuinely universal.
      </p>

      <h2>1.2 The Scale of the Universe</h2>

      <p>
        One of the first things to appreciate about physics is the extraordinary range of scales it must
        address. The observable universe is about 10²⁶ meters across. The Planck length — the scale at
        which quantum gravity effects become important — is about 10⁻³⁵ meters. Between these two
        extremes lies 61 orders of magnitude. Physics operates fluently across all of it.
      </p>

      <Figure number="1.1" caption="Orders of magnitude from the Planck length to the observable universe. Drag or scroll to travel through the scales. Notice how vastly different regimes of physics apply at different scales: quantum mechanics below 10⁻¹⁰ m, classical mechanics from 10⁻³ m to 10⁶ m, general relativity above 10¹⁵ m.">
        <OrdersOfMagnitudeClient />
      </Figure>

      <p>
        The ability to think in orders of magnitude — to say confidently that an atom is roughly
        10⁻¹⁰ m across and a human cell is roughly 10⁻⁵ m — is one of the most valuable habits
        a physicist can develop. We will practice it throughout this curriculum.
      </p>

      <h2>1.3 The SI System of Units</h2>

      <p>
        Any quantitative description of nature requires units of measurement. The <em>Système International
        d&apos;Unités</em> (SI) is the international standard used in all scientific work. It is built on
        seven <strong>base units</strong>, from which every other unit can be derived:
      </p>

      <Definition number="1.1" title="The Seven SI Base Units">
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.5rem', fontSize: '0.9rem', fontFamily: 'system-ui, sans-serif' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border2)' }}>
              <th style={{ textAlign: 'left', padding: '0.3rem 0.75rem 0.3rem 0', color: 'var(--muted)', fontWeight: 600 }}>Quantity</th>
              <th style={{ textAlign: 'left', padding: '0.3rem 0.75rem', color: 'var(--muted)', fontWeight: 600 }}>Unit</th>
              <th style={{ textAlign: 'left', padding: '0.3rem 0', color: 'var(--muted)', fontWeight: 600 }}>Symbol</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Length', 'meter', 'm'],
              ['Mass', 'kilogram', 'kg'],
              ['Time', 'second', 's'],
              ['Electric current', 'ampere', 'A'],
              ['Temperature', 'kelvin', 'K'],
              ['Amount of substance', 'mole', 'mol'],
              ['Luminous intensity', 'candela', 'cd'],
            ].map(([q, u, s]) => (
              <tr key={q} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.35rem 0.75rem 0.35rem 0', color: 'var(--text)' }}>{q}</td>
                <td style={{ padding: '0.35rem 0.75rem', color: 'var(--text)' }}>{u}</td>
                <td style={{ padding: '0.35rem 0', color: 'var(--text)', fontStyle: 'italic' }}>{s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Definition>

      <p>
        All other units are combinations of these seven. A newton (N) = kg·m/s². A joule (J) = kg·m²/s².
        A pascal (Pa) = kg/(m·s²). Understanding how derived units are constructed is the key to
        dimensional analysis.
      </p>

      <p>
        The SI prefix system allows us to express any quantity without resorting to scientific notation
        in everyday contexts:
      </p>

      <Definition number="1.2" title="SI Prefixes">
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.88rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.3rem 0', marginTop: '0.4rem' }}>
          {[
            ['pico (p)', '10⁻¹²'], ['nano (n)', '10⁻⁹'], ['micro (μ)', '10⁻⁶'], ['milli (m)', '10⁻³'],
            ['centi (c)', '10⁻²'], ['kilo (k)', '10³'], ['mega (M)', '10⁶'], ['giga (G)', '10⁹'],
            ['tera (T)', '10¹²'], ['peta (P)', '10¹⁵'], ['', ''], ['', ''],
          ].map(([name, val], i) => name ? (
            <div key={i}>
              <span style={{ color: 'var(--text-strong)', fontWeight: 600 }}>{name}</span>
              <span style={{ color: 'var(--muted)', marginLeft: '0.4rem' }}>{val}</span>
            </div>
          ) : <div key={i} />)}
        </div>
      </Definition>

      <h2>1.4 Dimensional Analysis</h2>

      <p>
        <strong>Dimensional analysis</strong> is the most powerful elementary tool in physics. The core
        principle is simple: in any valid physical equation, every term must have the same dimensions.
        You cannot add meters to kilograms. You cannot set a force equal to a velocity. Checking dimensions
        catches errors, guides derivations, and can even tell you the answer before you do the calculation.
      </p>

      <Definition number="1.3" title="Dimensional Consistency">
        In any physically valid equation, all terms must have identical dimensions.
        Dimensions are denoted with square brackets: [length] = L, [mass] = M, [time] = T.
        <span style={{ display: 'block', marginTop: '0.5rem', fontStyle: 'italic' }}>
          Example: [velocity] = L/T &nbsp;&nbsp;&nbsp; [force] = MLT⁻² &nbsp;&nbsp;&nbsp; [energy] = ML²T⁻²
        </span>
      </Definition>

      <WorkedExample number="1.1" title="Checking the Kinematic Equation">
        <p>Verify that x = x₀ + v₀t + ½at² is dimensionally consistent.</p>
        <Step label="[x] = [x₀] =">[L] — displacement, meters. ✓</Step>
        <Step label="[v₀t] =">[LT⁻¹][T] = [L] ✓</Step>
        <Step label="[at²] =">[LT⁻²][T²] = [L] ✓</Step>
        <Step label="Conclusion:">Every term has dimension L. The equation is dimensionally consistent.</Step>
      </WorkedExample>

      <p>
        Dimensional analysis can also <em>derive</em> the form of equations. If you know a result
        depends on certain variables, and you know their dimensions, you can often determine the
        answer up to a dimensionless constant.
      </p>

      <WorkedExample number="1.2" title="Deriving the Pendulum Period by Dimensional Analysis">
        <p>A pendulum&apos;s period T might depend on length L, mass m, and gravitational acceleration g. Find T.</p>
        <Step label="Write the ansatz:">T = Cᵢ Lᵃ mᵇ gᶜ for some powers a, b, c and constant C.</Step>
        <Step label="Dimension equation:">[T] = Lᵃ Mᵇ (LT⁻²)ᶜ → T¹ = L^(a+c) M^b T^(-2c)</Step>
        <Step label="Match powers:">T: 1 = −2c → c = −½ &nbsp;&nbsp; M: 0 = b → b = 0 &nbsp;&nbsp; L: 0 = a+c → a = ½</Step>
        <Step label="Result:">T = C √(L/g). The mass drops out entirely. Experiment gives C = 2π.</Step>
      </WorkedExample>

      <h2>1.5 Scientific Notation and Significant Figures</h2>

      <p>
        Physics routinely deals with numbers spanning many orders of magnitude. Scientific notation
        expresses any number as a × 10ⁿ where 1 ≤ a {'<'} 10:
      </p>

      <EqNumbered number="1.1" latex="602{,}214{,}076{,}000{,}000{,}000{,}000{,}000 = 6.022 \times 10^{23} \qquad \text{(Avogadro's number)}" />

      <p>
        <strong>Significant figures</strong> express measurement precision. A measurement of 3.45 m has
        three significant figures, meaning uncertainty in the last digit: the true value is between
        3.445 and 3.455 m. When multiplying or dividing, the result has as many significant figures
        as the least-precise input. When adding or subtracting, align decimal places.
      </p>

      <p>
        In this curriculum, intermediate calculations retain extra digits; final answers are reported
        to three or four significant figures unless otherwise specified.
      </p>

      <h2>1.6 Order-of-Magnitude Estimation</h2>

      <p>
        A Fermi estimate is a rapid calculation to within a factor of 10 using only rough knowledge and
        dimensional reasoning. Fermi himself famously estimated the yield of the first atomic bomb by
        dropping scraps of paper during the Trinity test and watching how far they drifted. The ability to
        make rapid, reliable order-of-magnitude estimates is essential in every branch of physics.
      </p>

      <HistoryNote year="1945" title="Fermi's paper scraps">
        At the Trinity test, Enrico Fermi dropped small pieces of paper as the blast wave passed and estimated the bomb yield from how far
        they moved. The point was not precision; it was physical judgment under uncertainty.
      </HistoryNote>

      <WorkedExample number="1.3" title="How many piano tuners are there in Chicago?">
        <p>This is the original Fermi problem, asked in the University of Chicago physics PhD entrance exam.</p>
        <Step label="Population:">Chicago ≈ 3 million people ≈ 3×10⁶</Step>
        <Step label="Pianos:">~1 piano per 20 households, ~2.5 people/household → ~60,000 pianos</Step>
        <Step label="Tunings per year:">Each piano tuned ~1/year → 60,000 tunings/year</Step>
        <Step label="Tuner capacity:">Tuner works ~250 days/year, ~8 jobs/day → 2,000 tunings/tuner/year</Step>
        <Step label="Result:">60,000 / 2,000 ≈ <strong>30 piano tuners</strong>. (Yellow Pages listed ~50.)</Step>
      </WorkedExample>

      <Definition number="1.4" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Units are part of the number:</strong> 5 meters and 5 seconds are not interchangeable just because both contain 5.</li>
          <li><strong>Dimensional consistency is necessary, not sufficient:</strong> it catches many errors but does not prove an equation is correct.</li>
          <li><strong>Prefixes attach to units:</strong> 1 km² means (1000 m)², not 1000 m².</li>
          <li><strong>Significant figures track measurement precision:</strong> do not report more precision than the data support.</li>
          <li><strong>Fermi estimates should be honest approximations:</strong> one significant digit is usually the right level of confidence.</li>
        </ul>
      </Definition>

      <PracticeProblems section="1.1–1.6 Measurement and Units">
        <InteractiveProblem n={1} difficulty="easy"
          answer={5500} unit="m" tolerance={0.02}
          hints={['1 km = 1000 m. Multiply.']}
          problemText="Convert 5.5 km to meters."
          solution={<>5.5 km × 1000 m/km = <strong>5500 m</strong></>}>
          Convert 5.5 km to meters.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={3.6} unit="m/s" tolerance={0.02}
          hints={['1 km/h × (1000 m/km) × (1 h/3600 s). What does that simplify to?', '1 km/h = 1/3.6 m/s, so 13 km/h = 13/3.6 m/s']}
          problemText="Convert 13 km/h to m/s."
          solution={<>13 km/h × (1000 m/km) / (3600 s/h) = 13/3.6 = <strong>3.61 m/s</strong></>}>
          Convert 13 km/h to m/s.
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={2} unit="(dimensionless power)"
          tolerance={0.01}
          hints={[
            '[F] = MLT⁻², [v] = LT⁻¹, [A] = L². If F = ρv²A, find [ρ] and check.',
            'Solving for the power of v: [MLT⁻²] = [M/L³][v^n][L²]. Match dimensions.',
          ]}
          problemText="The drag force on an object is F = CρAv^n where ρ is fluid density (kg/m³), A is area (m²), v is velocity (m/s). What must n be for dimensional consistency?"
          solution={<>[F] = MLT⁻². [ρ] = ML⁻³, [A] = L², [v^n] = LⁿT⁻ⁿ. So ML T⁻² = (ML⁻³)(L²)(LⁿT⁻ⁿ) = ML^(n−1)T⁻ⁿ. Match: T: n=2. L: n−1=1 ✓. So <strong>n = 2</strong>.</>}>
          Determine the power n in the drag force formula F = CρAv^n by dimensional analysis.
        </InteractiveProblem>

        <Problem n={4} difficulty="medium"
          solution={<>Estimate: ~7 billion people. ~1.8 m tall average. Laid end to end: 7×10⁹ × 1.8 m = 1.26×10¹⁰ m. Earth–Moon distance ≈ 3.84×10⁸ m. Ratio = 1.26×10¹⁰ / 3.84×10⁸ ≈ 33. So humanity could reach the Moon about 33 times over, or span the Earth–Moon distance more than 16 round trips.</>}>
          Fermi estimate: If all 8 billion humans were laid end to end, how many times would they stretch from Earth to the Moon? (Earth–Moon distance ≈ 3.84×10⁸ m, average human height ≈ 1.8 m)
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>The period T of a satellite orbit could depend on: orbital radius r (L), mass of planet M_p (M), and G (L³M⁻¹T⁻²). Write T = C·rᵃ·M_pᵇ·Gᶜ. Dimension equation: T¹ = Lᵃ Mᵇ (L³M⁻¹T⁻²)ᶜ = L^(a+3c) M^(b-c) T^(-2c). Matching: T: 1=-2c → c=-½; M: 0=b-c → b=-½; L: 0=a+3c → a=3/2. Result: T = C√(r³/GM_p) — this is exactly Kepler&apos;s third law, derived purely from dimensional analysis. The constant C = 2π comes from the full calculation.</>}>
          Use dimensional analysis to derive the form of the orbital period T of a satellite as a function of orbital radius r, planetary mass M_p, and the gravitational constant G = 6.674×10⁻¹¹ m³/(kg·s²).
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Physics seeks the fewest general principles that explain the widest range of phenomena.',
        'SI base units: meter, kilogram, second, ampere, kelvin, mole, candela — all others are derived.',
        'Every valid physical equation is dimensionally consistent — dimensions are an algebraic tool.',
        'Dimensional analysis can derive the form of physical laws before doing any detailed calculation.',
        'Order-of-magnitude estimation is a core skill: 30 piano tuners is as good as the exact answer.',
        'The universe spans 61 orders of magnitude; physics operates fluently across all of them.',
      ]} />
    </div>
  );
}
