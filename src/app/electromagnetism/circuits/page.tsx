import CircuitBuilderClient from '@/components/sims/CircuitBuilderClient';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, Eq, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals, InlineMath
} from '@/components/textbook';

export default function CircuitsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#a855f7' }}>Electromagnetism · Chapter 14</div>
      <h1>DC Circuits</h1>
      <p className="subtitle">
        The laws governing steady currents in resistive networks — Ohm&apos;s law and Kirchhoff&apos;s
        rules — reduce any circuit, no matter how complex, to a system of linear equations.
      </p>

      <Prerequisites items={['Electric fields and potential (Ch. 13)', 'Basic algebra — no calculus needed for DC circuits']} />

      <LearningGoals items={[
        'Distinguish conventional current from electron drift and connect current to charge flow.',
        'Use Ohm\'s law and power formulas to solve resistor-network problems.',
        'Reduce series and parallel resistor combinations without confusing voltage and current rules.',
        'Apply Kirchhoff\'s junction and loop rules to circuits that cannot be simplified directly.',
        'Explain how internal resistance changes a real battery\'s terminal voltage under load.',
      ]} />

      <h2>14.1 Electric Current and Resistance</h2>

      <p>
        When a potential difference (voltage) is applied across a conductor, charge carriers —
        electrons in metals — drift in the direction opposite to the field. The rate of charge
        flow is the <strong>electric current</strong>:
      </p>

      <EqNumbered number="14.1" latex="I = \frac{dQ}{dt}" />

      <p>
        Current is measured in amperes (A = C/s). By convention, the direction of current is the
        direction positive charges would flow — opposite to actual electron motion in metals.
      </p>

      <p>
        In this chapter every circuit is assumed to have reached a <strong>steady state</strong>:
        currents are constant in time, charge does not pile up at junctions, and capacitors or
        inductors are not changing the current. That is why the algebraic rules below are enough.
      </p>

      <Definition number="14.1" title="Ohm's Law">
        For many materials over a wide range of conditions, the current through a conductor
        is proportional to the voltage across it:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          <InlineMath latex="V = IR" />
        </span>
        where R is the <strong>resistance</strong> in ohms (Ω = V/A). Materials that obey this
        relationship are called ohmic. The resistance depends on the material (resistivity ρ),
        length <InlineMath latex="L" />, and cross-sectional area <InlineMath latex="A" />: <InlineMath latex="R = \rho L/A" />.
      </Definition>

      <p>
        Power dissipated in a resistor (converted to heat) follows from <InlineMath latex="P = IV" /> combined with Ohm&apos;s law:
      </p>

      <EqNumbered number="14.2" latex="P = IV = I^2R = \frac{V^2}{R}" />

      <h2>14.2 Series and Parallel Combinations</h2>

      <p>
        Resistors in <strong>series</strong> carry the same current; their resistances add directly.
        Resistors in <strong>parallel</strong> share the same voltage; their reciprocals add.
      </p>

      <Theorem number="14.1" title="Equivalent Resistance">
        <Eq latex="R_\mathrm{eq} = R_1 + R_2 + R_3 + \cdots" />
        <Eq latex="\frac{1}{R_\mathrm{eq}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3} + \cdots" />
        <span style={{ display: 'block', marginTop: '0.4rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
          For two resistors in parallel: <InlineMath latex="R_\mathrm{eq} = \frac{R_1R_2}{R_1 + R_2}" />
        </span>
      </Theorem>

      <Figure number="14.1" caption="Interactive circuit simulator. Compare series and parallel modes: in series, every resistor carries the same current and voltage divides; in parallel, every branch has the same voltage and current divides. Adjust the battery voltage and resistances, then check whether the animated charge flow matches those rules.">
        <CircuitBuilderClient />
      </Figure>

      <WorkedExample number="14.1" title="Series-Parallel Network">
        <p>
          R₁ = 6 Ω and R₂ = 3 Ω are in parallel; this combination is in series with R₃ = 2 Ω.
          A 12 V battery is connected. Find the current through each resistor.
        </p>
        <Step label="Parallel equivalent:"><InlineMath latex="R_{12} = \frac{6 \times 3}{6 + 3} = \frac{18}{9} = 2\,\Omega" /></Step>
        <Step label="Total resistance:"><InlineMath latex="R_\mathrm{total} = R_{12} + R_3 = 2 + 2 = 4\,\Omega" /></Step>
        <Step label="Total current:"><InlineMath latex="I = V/R = 12/4 = 3\,\mathrm{A}" /> (this flows through <InlineMath latex="R_3" />)</Step>
        <Step label="Voltage across parallel:"><InlineMath latex="V_{12} = I R_{12} = 3 \times 2 = 6\,\mathrm{V}" /></Step>
        <Step label="Branch currents:"><InlineMath latex="I_1 = V_{12}/R_1 = 6/6 = 1\,\mathrm{A}" /> &nbsp;&nbsp; <InlineMath latex="I_2 = V_{12}/R_2 = 6/3 = 2\,\mathrm{A}" /></Step>
        <Step label="Check:"><InlineMath latex="I_1 + I_2 = 1 + 2 = 3\,\mathrm{A}" /> = total ✓</Step>
      </WorkedExample>

      <h2>14.3 Kirchhoff&apos;s Rules</h2>

      <p>
        For circuits too complex to reduce by series/parallel rules, Kirchhoff&apos;s two laws provide
        a systematic approach. They follow directly from charge conservation and energy conservation.
      </p>

      <p>
        The method is procedural: assign current directions, write one current-conservation equation
        at a junction, write voltage-conservation equations around independent loops, then solve the
        resulting linear system. A negative current is not an error; it means the real direction is
        opposite to the one you guessed.
      </p>

      <Definition number="14.2" title="Kirchhoff's Junction Rule (KCL)">
        At any junction in a circuit, the sum of currents entering equals the sum of currents leaving:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          <InlineMath latex="\sum I_\mathrm{in} = \sum I_\mathrm{out}" />
        </span>
        This is conservation of charge — no charge accumulates at a junction.
      </Definition>

      <Definition number="14.3" title="Kirchhoff's Loop Rule (KVL)">
        The sum of all potential changes around any closed loop in a circuit is zero:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          <InlineMath latex="\sum \Delta V = 0" /> &nbsp;&nbsp; (around any closed loop)
        </span>
        This is conservation of energy — a charge returning to its starting point gains and loses
        equal energy. Traversing a resistor in the direction of current: <InlineMath latex="\Delta V = -IR" />.
        Traversing a battery from − to +: <InlineMath latex="\Delta V = +\varepsilon" />.
      </Definition>

      <WorkedExample number="14.2" title="Two-Loop Circuit by Kirchhoff's Rules">
        <p>
          Two batteries (ε₁ = 12 V, ε₂ = 6 V) and three resistors (R₁ = 2 Ω, R₂ = 4 Ω,
          R₃ = 3 Ω). ε₁ and R₁ in the left branch, ε₂ and R₂ in the right, R₃ in the middle.
          Find I₁, I₂, I₃.
        </p>
        <Step label="Assign currents:"><InlineMath latex="I_1" /> (left, upward), <InlineMath latex="I_2" /> (right, upward), <InlineMath latex="I_3" /> (middle, upward)</Step>
        <Step label="Junction rule (top):"><InlineMath latex="I_1 + I_2 = I_3" /> → <InlineMath latex="I_3 = I_1 + I_2" /></Step>
        <Step label="Left loop (KVL):"><InlineMath latex="+\varepsilon_1 - I_1R_1 - I_3R_3 = 0" /> → <InlineMath latex="12 - 2I_1 - 3(I_1+I_2) = 0" /> → <InlineMath latex="5I_1 + 3I_2 = 12" /></Step>
        <Step label="Right loop (KVL):"><InlineMath latex="+\varepsilon_2 - I_2R_2 - I_3R_3 = 0" /> → <InlineMath latex="6 - 4I_2 - 3(I_1+I_2) = 0" /> → <InlineMath latex="3I_1 + 7I_2 = 6" /></Step>
        <Step label="Solve system:">From eq. 1: <InlineMath latex="I_1 = (12-3I_2)/5" />. Substitute: <InlineMath latex="3(12-3I_2)/5 + 7I_2 = 6" /> → <InlineMath latex="I_2 = -0.47\,\mathrm{A}" /></Step>
        <Step label="Result:"><InlineMath latex="I_1 \approx 2.68\,\mathrm{A}" />, <InlineMath latex="I_2 \approx -0.47\,\mathrm{A}" /> (flows opposite to assumed direction), <InlineMath latex="I_3 \approx 2.21\,\mathrm{A}" /></Step>
      </WorkedExample>

      <h2>14.4 EMF and Internal Resistance</h2>

      <p>
        A real battery is not a pure voltage source — it has <strong>internal resistance</strong> r.
        The terminal voltage <InlineMath latex="V_t" /> differs from the EMF <InlineMath latex="\varepsilon" /> whenever current flows:
      </p>

      <EqNumbered number="14.3" latex="V_t = \varepsilon - Ir \qquad \text{(discharging)}" />

      <p>
        This means the terminal voltage drops under load. A car battery rated at 12 V might deliver
        only 10 V while cranking the engine (drawing 200 A through r ≈ 0.01 Ω). To maximize
        power transfer to an external load <InlineMath latex="R_L" />, set <InlineMath latex="R_L = r" /> (maximum power transfer theorem).
      </p>

      <Definition number="14.4" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Current is not used up:</strong> charge flow is conserved at junctions; energy is dissipated, not charge.</li>
          <li><strong>Series and parallel rules swap what stays the same:</strong> series means same current; parallel means same voltage.</li>
          <li><strong>Power formulas require local values:</strong> in P = V²/R, V must be the voltage across that resistor, not automatically the battery voltage.</li>
          <li><strong>Negative Kirchhoff currents are useful:</strong> they reveal an incorrect guessed direction, not a failed solution.</li>
          <li><strong>Real batteries sag under load:</strong> terminal voltage is lower than EMF whenever current flows out through internal resistance.</li>
        </ul>
      </Definition>

      <PracticeProblems section="14.1–14.4 DC Circuits">
        <InteractiveProblem n={1} difficulty="easy"
          answer={3} unit="A" tolerance={0.01}
          hints={['I = V/R. Add resistors in series first.']}
          problemText="A 12 V battery drives 3 Ω and 1 Ω in series. Find the current (in A)."
          solution={<><InlineMath latex="R_\mathrm{total} = 4\,\Omega" />. <InlineMath latex="I = 12/4 = 3\,\mathrm{A}" />.</>}>
          A 12 V battery is connected to R₁ = 3 Ω and R₂ = 1 Ω in series. Find the current.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={2.4} unit="Ω" tolerance={0.02}
          hints={['1/R_eq = 1/4 + 1/6 = 3/12 + 2/12 = 5/12 → R_eq = 12/5']}
          problemText="R₁ = 4 Ω and R₂ = 6 Ω in parallel. Find R_eq (in Ω)."
          solution={<><InlineMath latex="R_\mathrm{eq} = \frac{4 \times 6}{4 + 6} = \frac{24}{10} = 2.4\,\Omega" />.</>}>
          Find the equivalent resistance of 4 Ω and 6 Ω connected in parallel.
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={3.4} unit="W" tolerance={0.02}
          hints={['First find the equivalent resistance, then total current, then voltage across R₂.']}
          problemText="9 V battery, R₁ = 3 Ω in series with R₂ ∥ R₃ (both 6 Ω). Find power in R₂ (W)."
          solution={<><InlineMath latex="R_{23} = 3\,\Omega" />. <InlineMath latex="R_\mathrm{total} = 6\,\Omega" />. <InlineMath latex="I = 9/6 = 1.5\,\mathrm{A}" />. The parallel branch voltage is <InlineMath latex="V_{23} = 1.5 \times 3 = 4.5\,\mathrm{V}" />. Current through <InlineMath latex="R_2" /> is <InlineMath latex="I_2 = 4.5/6 = 0.75\,\mathrm{A}" />, so <InlineMath latex="P_2 = I_2^2R_2 = 0.75^2 \times 6 = 3.4\,\mathrm{W}" />.</>}>
          A 9 V battery drives R₁ = 3 Ω in series with R₂ = 6 Ω ∥ R₃ = 6 Ω. Find the power dissipated in R₂.
        </InteractiveProblem>

        <Problem n={4} difficulty="medium"
          solution={<>Assign I₁ (left branch, down through R₁), I₂ (right branch, down through R₂), I₃ (middle, down). Junction: I₁ = I₂ + I₃. Left loop: 10 − 2I₁ − 5I₃ = 0. Right loop: 8 − 3I₂ + 5I₃ = 0... (applying KVL systematically yields I₁ ≈ 1.96 A, I₂ ≈ 0.48 A, I₃ ≈ 1.48 A).</>}>
          Apply Kirchhoff&apos;s rules: ε₁ = 10 V, R₁ = 2 Ω (left branch); ε₂ = 8 V, R₂ = 3 Ω (right branch); R₃ = 5 Ω (connecting middle). Find all three branch currents.
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>A Wheatstone bridge is balanced when R₁/R₂ = R₃/R₄, making V_AB = 0 (no current through galvanometer). This allows precise resistance measurement by adjusting a known variable resistor until balance is achieved. With R₁=100 Ω, R₂=50 Ω, R₃=200 Ω, balance requires R₄ = R₃(R₂/R₁) = 200(50/100) = 100 Ω.</>}>
          Derive the balance condition for a Wheatstone bridge (R₁, R₂ in one branch; R₃, R₄ in the other; galvanometer between midpoints). What unknown R₄ balances the bridge if R₁ = 100 Ω, R₂ = 50 Ω, R₃ = 200 Ω?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Current I = dQ/dt; Ohm\'s law: V = IR; power P = I²R = V²/R.',
        'Series resistors add; parallel resistors add as reciprocals.',
        'Kirchhoff\'s junction rule (KCL): charge is conserved at every node.',
        'Kirchhoff\'s loop rule (KVL): energy is conserved around every loop.',
        'Real batteries have internal resistance r; terminal voltage V = ε − Ir drops under load.',
        'Maximum power transfer occurs when load resistance equals source internal resistance.',
      ]} />
    </div>
  );
}
