import KineticGasClient from '@/components/sims/KineticGasClient';
import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function HeatPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#8a5c2a' }}>Thermodynamics · Chapter 10</div>
      <h1>Heat and Temperature</h1>
      <p className="subtitle">Temperature measures the average kinetic energy of microscopic motion — heat is the transfer of that energy across a boundary.</p>

      <Prerequisites items={['Energy & Work', 'Basic mechanics', 'Ideal Gas Law (helpful but not required)']} />

      <LearningGoals items={[
        'Distinguish temperature from heat and convert between Celsius, Fahrenheit, and Kelvin scales.',
        'Apply Q = mcΔT to calculate heat exchange and final equilibrium temperature in mixing problems.',
        'Identify the three mechanisms of heat transfer and apply Fourier\'s and Stefan-Boltzmann\'s laws.',
        'Calculate latent heat for phase changes using Q = mL.',
        'Compute rms molecular speed from the kinetic theory formula v_rms = √(3k_BT/m).',
      ]} />

      <h2>10.1 Temperature and the Zeroth Law</h2>

      <p>
        <strong>Temperature</strong> is a measure of the average translational kinetic energy of the particles
        in a substance. We cannot observe individual molecular motion directly, but we can measure
        its macroscopic effect: the tendency to spontaneously exchange energy with surroundings.
      </p>

      <Definition number="10.1" title="Zeroth Law of Thermodynamics">
        If two systems A and B are each in thermal equilibrium with a third system C, then A and B are
        in thermal equilibrium with each other. This law — logically prior to the other three — is the
        basis for temperature as a meaningful, transitive quantity, and for the operation of thermometers.
      </Definition>

      <p>
        The three common temperature scales relate by exact conversions:
      </p>

      <EqNumbered number="10.1" latex="T_K=T_C+273.15 \qquad T_F=\frac{9}{5}T_C+32" />

      <p>
        The Kelvin scale is the fundamental one — it starts at <em>absolute zero</em>, the temperature at
        which thermal motion would theoretically cease. All thermodynamic formulas require Kelvin.
      </p>

      <h2>10.2 Heat Transfer and Specific Heat</h2>

      <p>
        <strong>Heat</strong> Q is energy in transit — it flows from a hotter body to a cooler one until
        thermal equilibrium is reached. Heat is not stored; temperature is. When Q joules of heat enter
        a substance of mass m, the temperature change ΔT depends on the material:
      </p>

      <EqNumbered number="10.2" latex="Q=mc\Delta T" />

      <p>
        where c is the <strong>specific heat capacity</strong> (J/kg·K) — how much energy per kilogram
        per degree it takes to warm that material. Water has an unusually high c = 4186 J/kg·K, which
        is why oceans moderate coastal climates. Metals are far lower (aluminum: 900, iron: 450).
      </p>

      <WorkedExample number="10.1" title="Mixing Hot and Cold Water">
        <p>200 g of water at 80°C is mixed with 300 g of water at 20°C in an insulated container. Find the final temperature.</p>
        <Step label="Heat balance:">Heat lost by hot = heat gained by cold: m₁c(T₁−T_f) = m₂c(T_f−T₂)</Step>
        <Step label="Solve:">0.2(80−T_f) = 0.3(T_f−20) → 16−0.2T_f = 0.3T_f−6 → 22 = 0.5T_f → T_f = <strong>44°C</strong></Step>
        <Step label="Check:">Weighted average: (0.2×80 + 0.3×20)/(0.2+0.3) = (16+6)/0.5 = 44°C ✓</Step>
      </WorkedExample>

      <h2>10.3 Heat Transfer Mechanisms</h2>

      <p>
        Heat moves by three mechanisms:
      </p>

      <ul>
        <li><strong>Conduction</strong> — through direct molecular contact. Heat flux: Q/t = kA(ΔT/d), where k is thermal conductivity (W/m·K), A is area, and d is thickness.</li>
        <li><strong>Convection</strong> — by bulk fluid motion. Hot fluid rises, carrying energy. Responsible for ocean circulation and atmospheric weather.</li>
        <li><strong>Radiation</strong> — via electromagnetic waves (photons), requiring no medium. A blackbody emits power P = σT⁴A (Stefan-Boltzmann law, σ = 5.67×10⁻⁸ W/m²·K⁴).</li>
      </ul>

      <EqNumbered number="10.3" latex="P_\mathrm{conduction}=kA\frac{\Delta T}{d} \qquad P_\mathrm{radiation}=\varepsilon\sigma AT^4" />

      <h2>10.4 Phase Changes and Latent Heat</h2>

      <p>
        When a substance changes phase (solid ↔ liquid ↔ gas), energy is absorbed or released at constant
        temperature. This energy goes into rearranging molecular bonds, not increasing kinetic energy:
      </p>

      <EqNumbered number="10.4" latex="Q=mL" />

      <p>
        where L is the <strong>latent heat</strong> (J/kg). For water: L_fusion = 334 kJ/kg (melting ice),
        L_vaporization = 2257 kJ/kg (boiling water). The enormous L_vap is why sweating cools you so
        effectively — evaporating 1 g of sweat removes 2257 J from your skin.
      </p>

      <Definition number="10.2" title="Thermal Equilibrium Condition">
        When an isolated system reaches thermal equilibrium, all heat exchange has ceased.
        For two objects mixing: the total enthalpy is conserved (no work done, no phase change):
        <span style={{ display: 'block', margin: '0.5rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          Σ mᵢcᵢ(Tᶠ − Tᵢ) = 0
        </span>
        Each term is positive if the object gains heat, negative if it loses heat. The sum is exactly zero
        for a perfectly insulated system.
      </Definition>

      <h2>10.5 Kinetic Theory of Temperature</h2>

      <p>
        At the microscopic level, temperature is a measure of average translational kinetic energy per particle.
        For an ideal gas of N molecules, the equipartition theorem gives:
      </p>

      <EqNumbered number="10.5" latex="\frac{1}{2}mv_\mathrm{rms}^2=\frac{3}{2}k_BT \qquad v_\mathrm{rms}=\sqrt{\frac{3k_BT}{m}}" />

      <p>
        where k_B = 1.38×10⁻²³ J/K is Boltzmann&apos;s constant. At room temperature (T = 293 K),
        nitrogen molecules move at v_rms ≈ 511 m/s — faster than a rifle bullet. The simulation
        below shows this directly: faster particles appear redder.
      </p>

      <Figure number="10.1" caption="Kinetic gas simulation. Each dot is a molecule. Color encodes speed (blue=slow, red=fast). Raise the temperature to watch the speed distribution shift. Compress the volume (move the piston) to see pressure increase — Boyle's law in action.">
        <KineticGasClient />
      </Figure>

      <WorkedExample number="10.2" title="RMS Speed of Oxygen">
        <p>Find the rms speed of O₂ molecules at T = 300 K. (m_O₂ = 32 u = 5.31×10⁻²⁶ kg)</p>
        <Step label="Formula:">v_rms = √(3k_BT/m)</Step>
        <Step label="Calculate:">v_rms = √(3 × 1.38×10⁻²³ × 300 / 5.31×10⁻²⁶) = √(2.34×10⁵) = <strong>484 m/s</strong></Step>
      </WorkedExample>

      <Definition number="10.3" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Heat is not temperature:</strong> heat is energy crossing a boundary; temperature is a state variable.</li>
          <li><strong>Use Kelvin for proportional laws:</strong> Celsius differences are fine, but absolute temperature formulas need kelvin.</li>
          <li><strong>Phase changes happen at constant temperature:</strong> during melting or boiling, added energy changes phase before raising T.</li>
          <li><strong>Radiation depends on absolute temperature:</strong> Stefan-Boltzmann uses T in kelvin and scales as T⁴.</li>
        </ul>
      </Definition>

      <PracticeProblems section="10.1–10.5 Heat and Temperature">
        <InteractiveProblem n={1} difficulty="easy"
          answer={373} unit="K" tolerance={0.01}
          hints={['T_K = T_C + 273.15. Round to nearest integer.']}
          problemText="Convert 100°C (boiling point of water) to Kelvin."
          solution={<>T_K = 100 + 273.15 = <strong>373 K</strong></>}>
          Convert 100°C to Kelvin.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={83700} unit="J" tolerance={0.02}
          hints={['Q = mcΔT. Use c_water = 4186 J/kg·K.', 'ΔT = 100 − 20 = 80°C = 80 K']}
          problemText="How much heat is needed to heat 250 g of water from 20°C to 100°C? (c = 4186 J/kg·K)"
          solution={<>Q = mcΔT = 0.25 × 4186 × 80 = <strong>83,720 J ≈ 83.7 kJ</strong></>}>
          How much heat is required to warm 250 g of water from 20°C to 100°C? (c = 4186 J/kg·K)
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={50} unit="°C" tolerance={0.02}
          hints={[
            'Heat lost by hot water = heat gained by cold water: m₁c(T₁−Tf) = m₂c(Tf−T₂)',
            'Masses cancel if you use weighted average: Tf = (m₁T₁ + m₂T₂)/(m₁+m₂)',
          ]}
          problemText="100 g of water at 80°C is mixed with 100 g at 20°C in an insulated container. Find the final temperature."
          solution={<>Tf = (m₁T₁+m₂T₂)/(m₁+m₂) = (0.1×80+0.1×20)/0.2 = 10/0.2 = <strong>50°C</strong></>}>
          100 g of water at 80°C is mixed with 100 g of water at 20°C. Find the final equilibrium temperature.
        </InteractiveProblem>

        <InteractiveProblem n={4} difficulty="medium"
          answer={226000} unit="J" tolerance={0.02}
          hints={[
            'Phase change: Q = mL_vap for steam condensing, then Q = mcΔT for cooling water.',
            'This problem only asks about condensing 100 g of steam. Q = mL = 0.1 × 2.26×10⁶.',
          ]}
          problemText="How much heat is released when 100 g of steam at 100°C condenses to liquid water at 100°C? (L_vap = 2.26×10⁶ J/kg)"
          solution={<>Q = mL = 0.100 × 2.26×10⁶ = <strong>226,000 J = 226 kJ</strong></>}>
          How much heat is released when 100 g of steam at 100°C condenses to liquid water? (L_vap = 2.26×10⁶ J/kg)
        </InteractiveProblem>

        <Problem n={5} difficulty="hard"
          solution={<>The bullet&apos;s kinetic energy converts to heat: Q = ½mv² = ½(0.010)(300)² = 450 J. If the embedded bullet and wood block reach a common final temperature, they have the same temperature rise: ΔT = Q/(m_bullet c_Pb + m_block c_wood). With c_Pb ≈ 128 J/kg·K and c_wood ≈ 1700 J/kg·K, the total heat capacity is 0.010×128 + 0.5×1700 = 851.28 J/K. Thus ΔT = 450/851.28 = <strong>0.53°C</strong>. In a real impact, local heating near the collision path can be much larger before heat spreads through the whole block.</>}>
          A 10 g lead bullet (c = 128 J/kg·K) moving at 300 m/s embeds in a 0.5 kg wood block (c = 1700 J/kg·K). Assuming all kinetic energy converts to heat, estimate the temperature rise of the bullet.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Temperature is average molecular KE; heat is energy in transfer — they are not the same thing.',
        'T(K) = T(°C) + 273.15 — always use Kelvin in thermodynamic formulas.',
        'Q = mcΔT for sensible heat; Q = mL for phase changes at constant temperature.',
        'Three mechanisms: conduction (contact), convection (fluid flow), radiation (EM waves).',
        'Kinetic theory: v_rms = √(3k_BT/m) — molecules at room temperature move at hundreds of m/s.',
      ]} />
    </div>
  );
}
