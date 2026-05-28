import PVDiagramClient from '@/components/sims/PVDiagramClient';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function LawsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: 'var(--thm-accent)' }}>Thermodynamics · Chapter 12</div>
      <h1>The Laws of Thermodynamics</h1>
      <p className="subtitle">
        Thermodynamics governs the direction of natural processes and the ultimate limits of
        heat engines — including every engine ever built or conceivable.
      </p>

      <Prerequisites items={['Heat & Temperature (Ch. 10)', 'Ideal Gas Law (Ch. 11)', 'Familiarity with calculus notation helps for entropy; no integrals required beyond recognition']} />

      <LearningGoals items={[
        'State all four laws of thermodynamics and explain the physical principle each encodes.',
        'Apply the first law ΔU = Q − W to isothermal, isochoric, and isobaric processes.',
        'Calculate Carnot efficiency from reservoir temperatures and identify it as the upper bound.',
        'Compute entropy changes for reversible heat transfers using dS = dQ_rev/T.',
        'Analyze refrigerator and heat pump performance using coefficients of performance.',
      ]} />

      <h2>12.1 The Zeroth and First Laws</h2>

      <p>
        The laws of thermodynamics are numbered oddly because the first two were well established
        before physicists recognized that an even more fundamental principle — the zeroth law — was
        being assumed without statement. The zeroth law defines temperature itself.
      </p>

      <Definition number="12.1" title="Zeroth Law of Thermodynamics">
        If system A is in thermal equilibrium with system C, and system B is also in thermal
        equilibrium with system C, then A and B are in thermal equilibrium with each other.
        This law is what makes temperature a well-defined, transitive quantity — it licenses the
        use of thermometers.
      </Definition>

      <p>
        The first law is the conservation of energy, stated for thermodynamic systems. It
        formalizes the equivalence of heat and work established experimentally by Joule in 1843.
      </p>

      <Definition number="12.2" title="First Law of Thermodynamics">
        The change in internal energy ΔU of a system equals the heat Q added to the system
        minus the work W done by the system:
      </Definition>

      <EqNumbered number="12.1" latex="\Delta U=Q-W" />

      <p>
        The sign convention matters: Q {'>'} 0 means heat flows <em>into</em> the system; W {'>'} 0
        means the system <em>does</em> work on its surroundings. For a gas expanding against
        pressure, W = ∫P dV.
      </p>

      <p>
        For a process at constant pressure (isobaric), W = PΔV, so ΔU = Q − PΔV. For a
        constant-volume (isochoric) process, W = 0, so all heat goes directly into internal energy.
        For an isothermal process, ΔU = 0 (for an ideal gas), so Q = W — all heat input is
        converted to work.
      </p>

      <h2>12.2 The Second Law and Entropy</h2>

      <p>
        The first law says energy is conserved, but it says nothing about <em>direction</em>.
        A hot coffee cup cools to room temperature; a cold cup never spontaneously heats itself
        by drawing heat from the room, even though energy conservation permits it. The second law
        captures this directional asymmetry.
      </p>

      <Definition number="12.3" title="Second Law of Thermodynamics (Clausius Statement)">
        Heat never flows spontaneously from a cold body to a hot body. Equivalently: no process
        is possible whose sole result is the transfer of heat from a cooler body to a warmer one.
      </Definition>

      <Definition number="12.4" title="Second Law (Kelvin–Planck Statement)">
        No heat engine operating in a cycle can convert heat entirely into work. There must always
        be some heat rejected to a cold reservoir.
      </Definition>

      <p>
        These statements are equivalent. The quantitative measure of the second law is <strong>entropy</strong>,
        introduced by Clausius in 1865. For a reversible process:
      </p>

      <EqNumbered number="12.2" latex="dS=\frac{dQ_\mathrm{rev}}{T}" />

      <Theorem number="12.1" title="Entropy and the Second Law">
        For any process in an isolated system, the total entropy either increases or remains
        constant — it never decreases:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          ΔS_total ≥ 0
        </span>
        Equality holds for reversible (quasi-static) processes. All real processes are irreversible
        and increase the total entropy of the universe.
      </Theorem>

      <p>
        Entropy has a statistical interpretation, given by Boltzmann: S = k_B ln Ω, where Ω is the
        number of microscopic configurations (microstates) consistent with the macroscopic state,
        and k_B = 1.38 × 10⁻²³ J/K. Systems evolve toward states with overwhelmingly more
        microstates — not because of a mysterious force, but because probability demands it.
      </p>

      <h2>12.3 Heat Engines and the Carnot Cycle</h2>

      <p>
        A <strong>heat engine</strong> is any device that converts heat into work by operating in a
        thermodynamic cycle. It absorbs heat Q_h from a hot reservoir at temperature T_h, converts
        some of it into net work W_net, and rejects the remainder Q_c to a cold reservoir at T_c.
        By energy conservation: W_net = Q_h − Q_c.
      </p>

      <p>
        The <strong>thermal efficiency</strong> η of a heat engine is the ratio of net work output
        to heat absorbed:
      </p>

      <EqNumbered number="12.3" latex="\eta=\frac{W_\mathrm{net}}{Q_h}=1-\frac{Q_c}{Q_h}" />

      <p>
        The question of how efficient an engine can theoretically be was answered by Sadi Carnot
        in 1824 — decades before the first and second laws were formally stated. The <strong>Carnot
        cycle</strong> is the most efficient possible cycle operating between two temperature
        reservoirs. It consists of four reversible steps: isothermal expansion, adiabatic expansion,
        isothermal compression, and adiabatic compression.
      </p>

      <Figure number="12.1" caption="The Carnot cycle on a P–V diagram. The shaded area equals the net work output per cycle. Adjust the reservoir temperatures to see how efficiency η = 1 − Tc/Th changes. The dot traces the cycle in real time.">
        <PVDiagramClient />
      </Figure>

      <Theorem number="12.2" title="Carnot Efficiency">
        The maximum possible efficiency of any heat engine operating between reservoirs at
        temperatures T_h and T_c (in kelvin) is the Carnot efficiency:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          η_Carnot = 1 − T_c / T_h
        </span>
        No engine can exceed this limit. A real engine always falls short because real processes
        are irreversible — they generate entropy.
      </Theorem>

      <p>
        This is a profound result. The maximum efficiency depends only on the temperatures of the
        two reservoirs — not on the working substance, the pressure, the volume, or any other
        detail of the engine. A steam turbine with T_h = 800 K and T_c = 300 K cannot exceed
        η = 1 − 300/800 = 62.5%, no matter how well engineered.
      </p>

      <WorkedExample number="12.1" title="Carnot Engine Efficiency">
        <p>
          A coal-fired power plant operates with steam at 580°C and rejects heat to a river at
          20°C. What is the maximum possible thermal efficiency?
        </p>
        <Step label="Convert to kelvin:">T_h = 580 + 273 = 853 K &nbsp;&nbsp; T_c = 20 + 273 = 293 K</Step>
        <Step label="Carnot efficiency:">η = 1 − T_c/T_h = 1 − 293/853 = 1 − 0.344 = 0.656 = 65.6%</Step>
        <Step label="Interpretation:">
          Even in principle, 34.4% of the fuel's heat energy must be rejected to the river.
          Real plants achieve 35–45% due to additional irreversibilities.
        </Step>
      </WorkedExample>

      <h2>12.4 Refrigerators and Heat Pumps</h2>

      <p>
        A <strong>refrigerator</strong> runs a heat engine in reverse: it uses work input to move
        heat from a cold reservoir to a hot one. By the second law, this requires net work input
        — you cannot cool your kitchen by leaving the refrigerator door open. The <strong>coefficient
        of performance</strong> (COP) of a refrigerator is:
      </p>

      <EqNumbered number="12.4" latex="\mathrm{COP}_\mathrm{ref}=\frac{Q_c}{W}=\frac{Q_c}{Q_h-Q_c}" />

      <p>
        A <strong>heat pump</strong> also moves heat from cold to hot, but the desired output is
        Q_h delivered to the hot space (e.g., heating a building). Its COP is:
      </p>

      <EqNumbered number="12.5" latex="\mathrm{COP}_\mathrm{hp}=\frac{Q_h}{W}=1+\mathrm{COP}_\mathrm{ref}" />

      <p>
        The Carnot COP sets the upper bound:
        COP_ref,max = T_c / (T_h − T_c) and COP_hp,max = T_h / (T_h − T_c).
        Under normal operating conditions, a heat pump can deliver more heat to a building per joule
        of electrical input than direct electrical resistance heating (COP = 1), which is why
        ground-source heat pumps often deliver 3–5 units of heat per unit of electrical energy.
      </p>

      <h2>12.5 The Third Law</h2>

      <Definition number="12.5" title="Third Law of Thermodynamics (Nernst's Theorem)">
        As the temperature of a system approaches absolute zero (T → 0 K), its entropy approaches
        a minimum value — typically zero for a perfect crystal in its ground state:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          lim_(T→0) S = 0
        </span>
        A consequence: absolute zero is unattainable by any finite sequence of processes.
      </Definition>

      <p>
        The third law has practical importance: it sets the reference point for absolute entropy
        measurements, and it explains why liquefying helium requires progressively more effort as
        you approach 0 K — each stage of cooling is less effective than the last.
      </p>

      <WorkedExample number="12.2" title="Entropy Change in Heat Transfer">
        <p>
          100 J of heat flows from a reservoir at 400 K to a reservoir at 200 K. What is the
          total entropy change of the universe?
        </p>
        <Step label="Hot reservoir loses heat:">ΔS_h = −Q/T_h = −100/400 = −0.250 J/K</Step>
        <Step label="Cold reservoir gains heat:">ΔS_c = +Q/T_c = +100/200 = +0.500 J/K</Step>
        <Step label="Total:">ΔS_total = −0.250 + 0.500 = +0.250 J/K {'>'} 0 ✓</Step>
        <Step label="Lesson:">
          This irreversible process increased the entropy of the universe by 0.25 J/K.
          No process can reverse this — the entropy increase is permanent.
        </Step>
      </WorkedExample>

      <Definition number="12.6" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Sign convention matters:</strong> here W is work done by the system, so expansion work reduces internal energy if Q = 0.</li>
          <li><strong>Carnot temperatures must be kelvin:</strong> Celsius ratios give physically meaningless efficiencies.</li>
          <li><strong>Entropy of a subsystem can decrease:</strong> the second law constrains the total entropy of an isolated system.</li>
          <li><strong>COP can exceed 1:</strong> refrigerators and heat pumps move heat; they do not convert work directly into heat output one-for-one.</li>
        </ul>
      </Definition>

      <PracticeProblems section="12.1–12.5 Laws of Thermodynamics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={65.6} unit="%" tolerance={0.02}
          hints={['η = 1 − Tc/Th. Convert to kelvin first.']}
          problemText="A heat engine operates between 580°C and 20°C. What is its maximum (Carnot) efficiency?"
          solution={<>T_h = 853 K, T_c = 293 K. η = 1 − 293/853 = <strong>65.6%</strong></>}>
          A heat engine operates between 580°C and 20°C. What is its maximum possible efficiency?
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={400} unit="K" tolerance={0.01}
          hints={['η = 1 − Tc/Th → Th = Tc/(1−η).']}
          problemText="A Carnot engine has efficiency 25% and cold reservoir at 300 K. Find Th."
          solution={<>T_h = T_c/(1−η) = 300/(1−0.25) = 300/0.75 = <strong>400 K</strong></>}>
          A Carnot engine rejects heat to a 300 K reservoir and has efficiency 25%. What is T_h?
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={0.25} unit="J/K" tolerance={0.02}
          hints={['ΔS_total = Q/T_cold − Q/T_hot. Q = 100 J flows from hot to cold.']}
          problemText="100 J of heat flows irreversibly from 400 K to 200 K. Find ΔS_universe (in J/K)."
          solution={<>ΔS = 100/200 − 100/400 = 0.500 − 0.250 = <strong>0.250 J/K</strong></>}>
          100 J of heat flows irreversibly from a 400 K reservoir to a 200 K reservoir. What is the total entropy change of the universe?
        </InteractiveProblem>

        <Problem n={4} difficulty="medium"
          solution={<>COP_hp = T_h/(T_h−T_c) = 293/(293−263) = 293/30 ≈ 9.8. For 1 kW of electrical input, the heat pump delivers 9.8 kW of heating power. Direct resistance heating delivers only 1 kW per kW of electricity — a factor of ~10 less efficient.</>}>
          A heat pump heats a house at 20°C (293 K) by drawing from outdoor air at −10°C (263 K). Calculate the maximum COP and compare to resistance heating.
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>W_net = Q_h − Q_c = 500 − 300 = 200 J. Actual η = W/Q_h = 200/500 = 40%. Carnot η = 1 − 300/600 = 50%. Irreversibility = (η_Carnot − η_actual)/η_Carnot = 20%. ΔS_engine = 0 per cycle (state function). ΔS_universe = Q_c/T_c − Q_h/T_h = 300/300 − 500/600 = 1.000 − 0.833 = +0.167 J/K per cycle.</>}>
          A heat engine absorbs Q_h = 500 J from a 600 K reservoir and rejects Q_c = 300 J to a 300 K reservoir per cycle. Find: (a) actual efficiency, (b) Carnot efficiency, (c) entropy generated per cycle.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Zeroth law: thermal equilibrium is transitive — this defines temperature.',
        'First law: ΔU = Q − W. Energy is conserved; heat and work are equivalent.',
        'Second law: entropy of an isolated system never decreases. Heat flows spontaneously only from hot to cold.',
        'Entropy S = k_B ln Ω connects macroscopic thermodynamics to microscopic probability.',
        'Carnot efficiency η = 1 − Tc/Th is the maximum possible for any heat engine — set by the second law alone.',
        'Third law: S → 0 as T → 0 K, making absolute zero unattainable by any finite process.',
      ]} />
    </div>
  );
}
