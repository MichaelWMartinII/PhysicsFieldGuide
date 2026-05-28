import KineticGasClient from '@/components/sims/KineticGasClient';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function GasLawsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#8a5c2a' }}>Thermodynamics · Chapter 11</div>
      <h1>Ideal Gas Law</h1>
      <p className="subtitle">PV = nRT connects pressure, volume, temperature, and amount of gas into a single elegant relation — derived from nothing more than counting molecular collisions.</p>

      <Prerequisites items={['Heat and Temperature', 'Kinetic theory basics']} />

      <LearningGoals items={[
        'State Boyle\'s, Charles\'s, Gay-Lussac\'s, and Avogadro\'s laws as special cases of PV = nRT.',
        'Apply the ideal gas law to find P, V, n, or T given the other three quantities.',
        'Derive PV = Nk_BT from Newton\'s laws applied to molecular collisions.',
        'Calculate internal energy and molar heat capacity using the equipartition theorem.',
        'Identify when real gases deviate from ideal behavior and apply the van der Waals correction.',
      ]} />

      <h2>11.1 The Gas Laws</h2>

      <p>
        Three empirical gas laws, each discovered independently in the 17th–19th centuries, all turn out
        to be special cases of a single unified law:
      </p>

      <Definition number="11.1" title="The Empirical Gas Laws">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Boyle&apos;s Law</strong> (const T): PV = constant &nbsp; → &nbsp; P₁V₁ = P₂V₂</li>
          <li><strong>Charles&apos;s Law</strong> (const P): V/T = constant &nbsp; → &nbsp; V₁/T₁ = V₂/T₂</li>
          <li><strong>Gay-Lussac&apos;s Law</strong> (const V): P/T = constant &nbsp; → &nbsp; P₁/T₁ = P₂/T₂</li>
          <li><strong>Avogadro&apos;s Law</strong> (const T, P): V ∝ n</li>
        </ul>
      </Definition>

      <p>
        Boyle noticed that halving the volume of a gas doubles its pressure — the molecules hit the walls
        twice as often. Charles observed that heating a gas at constant pressure makes it expand proportionally
        to absolute temperature. These combine into:
      </p>

      <h2>11.2 The Ideal Gas Law</h2>

      <EqNumbered number="11.1" latex="PV=nRT" />

      <p>
        Here P is pressure (Pa), V is volume (m³), n is the amount of gas (moles), R = 8.314 J/mol·K is
        the universal gas constant, and T is absolute temperature (Kelvin). An equivalent form uses the
        number of molecules N and Boltzmann&apos;s constant k_B = R/N_A:
      </p>

      <EqNumbered number="11.2" latex="PV=Nk_BT \qquad k_B=1.381\times10^{-23}\,\mathrm{J/K}" />

      <p>
        An <strong>ideal gas</strong> is one in which (1) molecular volume is negligible compared to container volume,
        (2) molecules interact only via brief elastic collisions, and (3) there are no intermolecular
        attractive forces. Real gases obey this law closely at low pressure and high temperature.
      </p>

      <WorkedExample number="11.1" title="Bicycle Tire Pressure">
        <p>A bicycle tire has volume 1.2 L and is filled to gauge pressure 6.0 atm at 20°C. The tire heats to 40°C in the sun. Find the new pressure. (Gauge pressure = pressure above atmospheric.)</p>
        <Step label="Setup:">Volume is constant, so use Gay-Lussac: P₁/T₁ = P₂/T₂.</Step>
        <Step label="Absolute pressures:">P₁ = 6.0 + 1.0 = 7.0 atm, T₁ = 293 K, T₂ = 313 K</Step>
        <Step label="New pressure:">P₂ = P₁(T₂/T₁) = 7.0 × (313/293) = <strong>7.48 atm</strong> absolute = 6.48 atm gauge</Step>
      </WorkedExample>

      <h2>11.3 Kinetic Theory Derivation</h2>

      <p>
        The ideal gas law is not just empirical — it can be derived from Newton&apos;s laws applied to
        point-mass molecules. Consider N molecules in a cubic box of side L. Each molecule bouncing
        off a wall delivers impulse 2mv_x. The average force on one wall:
      </p>

      <EqNumbered number="11.3" latex="F=\frac{Nm\langle v_x^2\rangle}{L} \qquad P=\frac{F}{L^2}=\frac{Nm\langle v_x^2\rangle}{V}" />

      <p>
        Using isotropy (v²_x = v²_y = v²_z = v²_rms/3) and the definition of temperature
        (½mv²_rms = (3/2)k_BT), this gives PV = Nk_BT exactly.
      </p>

      <Theorem number="11.1" title="Internal Energy of an Ideal Gas">
        The total internal energy of a monatomic ideal gas (3 translational degrees of freedom) is:
        <span style={{ display: 'block', margin: '0.6rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          U = (3/2)Nk_BT = (3/2)nRT
        </span>
        For a diatomic gas (5 degrees of freedom — 3 translational, 2 rotational): U = (5/2)nRT.
        The molar heat capacity at constant volume is C_V = (f/2)R where f is the number of degrees of freedom.
      </Theorem>

      <Figure number="11.1" caption="Kinetic gas simulation. Observe Boyle's law: compress the volume (slider) while watching pressure rise. Observe Charles's law: raise temperature while watching the gas expand at constant pressure. Color = speed.">
        <KineticGasClient />
      </Figure>

      <h2>11.4 Real Gases and the van der Waals Equation</h2>

      <p>
        At high pressure or low temperature, the ideal gas law fails because molecular volume and
        intermolecular attraction become significant. The van der Waals equation corrects for these:
      </p>

      <EqNumbered number="11.4" latex="\left(P+a\frac{n^2}{V^2}\right)(V-nb)=nRT" />

      <p>
        The term an²/V² accounts for attractive forces reducing effective pressure; nb accounts for
        the excluded volume of the molecules. The constants a and b are different for every gas.
        For CO₂: a = 3.64 L²·atm/mol², b = 0.0427 L/mol.
      </p>

      <WorkedExample number="11.2" title="Volume of One Mole of Gas">
        <p>What volume does 1 mol of ideal gas occupy at STP (T = 273.15 K, P = 101.325 kPa)?</p>
        <Step label="Ideal gas law:">V = nRT/P = (1)(8.314)(273.15)/(101325) = 2271/101325</Step>
        <Step label="Result:">V = <strong>0.02241 m³ = 22.41 L</strong> — the molar volume at STP.</Step>
        <Step label="Note:">Every gas has the same molar volume at STP — this is Avogadro&apos;s principle.</Step>
      </WorkedExample>

      <Definition number="11.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Gauge pressure is not absolute pressure:</strong> add atmospheric pressure before using PV = nRT.</li>
          <li><strong>Gas laws require kelvin:</strong> proportionality to temperature fails if Celsius is used.</li>
          <li><strong>Units must match R:</strong> use pascals and cubic meters with 8.314 J/(mol·K), or use a matching atm·L value.</li>
          <li><strong>Ideal behavior is an approximation:</strong> high pressure and low temperature require real-gas corrections.</li>
        </ul>
      </Definition>

      <PracticeProblems section="11.1–11.4 Ideal Gas Law">
        <InteractiveProblem n={1} difficulty="easy"
          answer={2.0} unit="atm" tolerance={0.02}
          hints={['Boyle\'s Law: P₁V₁ = P₂V₂. Solve for P₂.', 'P₂ = P₁V₁/V₂ = 1.0 × 4.0 / 2.0']}
          problemText="A gas at 1.0 atm occupies 4.0 L. The volume is compressed to 2.0 L at constant temperature. Find the new pressure."
          solution={<>P₁V₁ = P₂V₂ → P₂ = P₁V₁/V₂ = (1.0)(4.0)/(2.0) = <strong>2.0 atm</strong></>}>
          A gas at 1.0 atm occupies 4.0 L. It is compressed to 2.0 L at constant temperature. What is the new pressure?
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={546} unit="K" tolerance={0.01}
          hints={['Charles\'s Law: V₁/T₁ = V₂/T₂. Solve for T₂.', 'T₂ = T₁ × V₂/V₁ = 273 × (4.0/2.0)']}
          problemText="A gas occupies 2.0 L at 273 K. At constant pressure, the volume doubles. Find the new temperature."
          solution={<>V₁/T₁ = V₂/T₂ → T₂ = T₁(V₂/V₁) = 273 × 2 = <strong>546 K</strong></>}>
          A gas at 273 K occupies 2.0 L. At constant pressure its volume doubles. Find the new temperature in Kelvin.
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={0.0164} unit="m³" tolerance={0.02}
          hints={[
            'PV = nRT. Solve for V = nRT/P.',
            'Use R = 8.314 J/mol·K. Convert P to Pa: 1 atm = 101325 Pa.',
            'V = (0.5)(8.314)(400) / 101325',
          ]}
          problemText="Find the volume of 0.5 mol of ideal gas at T = 400 K and P = 1 atm. (R = 8.314 J/mol·K, 1 atm = 101325 Pa)"
          solution={<>V = nRT/P = (0.5)(8.314)(400)/101325 = 1662.8/101325 = <strong>0.0164 m³</strong> ≈ 16.4 L.</>}>
          Find the volume of 0.5 mol of ideal gas at T = 400 K and P = 1 atm. (R = 8.314 J/mol·K, 1 atm = 101325 Pa)
        </InteractiveProblem>

        <InteractiveProblem n={4} difficulty="medium"
          answer={2.50e22} unit="molecules" tolerance={0.04}
          hints={[
            'Use PV = Nk_BT → N = PV/(k_BT)',
            'Convert: P = 1.0 atm = 101325 Pa, V = 1.0 L = 0.001 m³, T = 293 K',
          ]}
          problemText="How many molecules are in 1.0 L of air at 1.0 atm and 20°C? (k_B = 1.381×10⁻²³ J/K)"
          solution={<>N = PV/(k_BT) = (101325 × 0.001)/(1.381×10⁻²³ × 293) = 101.3/(4.05×10⁻²¹) = <strong>2.50×10²²</strong> molecules</>}>
          How many molecules are in 1.0 L of ideal gas at 1.0 atm and 20°C? (k_B = 1.381×10⁻²³ J/K)
        </InteractiveProblem>

        <Problem n={5} difficulty="hard"
          solution={<>Using the combined gas law P₁V₁/T₁ = P₂V₂/T₂ (fixed n): V₂ = V₁(P₁/P₂)(T₂/T₁). Initial: P₁=1 atm, V₁=10 L, T₁=300 K. Final: P₂=3 atm, T₂=450 K. V₂ = 10×(1/3)×(450/300) = 10×(1/3)×1.5 = 5.0 L. The volume halves because pressure tripled but temperature only rose 50%.</>}>
          A gas balloon contains 10 L of gas at 1.0 atm and 300 K. It is compressed to 3.0 atm and heated to 450 K. Find the new volume.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'PV = nRT unifies Boyle\'s, Charles\'s, Gay-Lussac\'s, and Avogadro\'s laws.',
        'Always use Kelvin in gas law calculations — never Celsius.',
        'Ideal gas internal energy: U = (f/2)nRT, where f = degrees of freedom (3 monatomic, 5 diatomic).',
        'One mole of ideal gas at STP occupies 22.4 L regardless of which gas.',
        'Real gases depart from ideal behavior at high pressure and low temperature — use van der Waals.',
      ]} />
    </div>
  );
}
