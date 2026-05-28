import InductionSimClient from '@/components/sims/InductionSimClient';
import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals, InlineMath
} from '@/components/textbook';

export default function InductionPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#a855f7' }}>Electromagnetism · Chapter 16</div>
      <h1>Electromagnetic Induction</h1>
      <p className="subtitle">
        A changing magnetic flux generates an electric field. This single principle — Faraday&apos;s
        law — is the basis of every electrical generator, transformer, and induction motor ever built.
      </p>

      <Prerequisites items={['Magnetic fields (Ch. 15)', 'Basic calculus — derivatives and the concept of rate of change']} />

      <LearningGoals items={[
        'Calculate magnetic flux through a surface and identify the ways flux can change.',
        'Use Faraday\'s law to find induced EMF from changing B, area, or angle.',
        'Apply Lenz\'s law to determine the direction of induced current.',
        'Explain motional EMF from the magnetic force on moving charges.',
        'Connect induction to generators, transformers, and back-EMF in motors.',
      ]} />

      <h2>16.1 Magnetic Flux</h2>

      <p>
        Before stating Faraday&apos;s law, we need the concept of <strong>magnetic flux</strong>
        through a surface. Flux is the total amount of magnetic field threading through an area,
        accounting for the angle between <InlineMath latex="\mathbf{B}" /> and the surface:
      </p>

      <EqNumbered number="16.1" latex="\Phi_B = \int \mathbf{B}\cdot d\mathbf{A} = BA\cos\theta \qquad \text{(uniform field, flat surface)}" />

      <p>
        The SI unit of magnetic flux is the <strong>weber</strong> (<InlineMath latex="\mathrm{Wb} = \mathrm{T\,m^2}" />). Flux is maximum
        when <InlineMath latex="\mathbf{B}" /> is perpendicular to the surface (<InlineMath latex="\theta = 0^\circ" />, area faces the field) and zero when <InlineMath latex="\mathbf{B}" />
        is parallel to the surface (<InlineMath latex="\theta = 90^\circ" />, field skims the area).
      </p>

      <h2>16.2 Faraday&apos;s Law</h2>

      <Definition number="16.1" title="Faraday's Law of Electromagnetic Induction">
        The electromotive force (EMF) induced in a closed loop is equal to the negative rate of
        change of magnetic flux through the loop:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          <InlineMath latex="\varepsilon = -N\frac{d\Phi_B}{dt}" />
        </span>
        where <InlineMath latex="N" /> is the number of turns in a coil. The negative sign encodes <strong>Lenz&apos;s law</strong>.
      </Definition>

      <p>
        The key insight is that flux can change in three ways: (1) the magnitude of <InlineMath latex="\mathbf{B}" /> changes,
        (2) the area of the loop changes, or (3) the angle between <InlineMath latex="\mathbf{B}" /> and the loop changes. Any
        of these produces an EMF and, if the circuit is closed, a current.
      </p>

      <Figure number="16.1" caption="Induction simulator. Move the magnet slowly, then quickly: the galvanometer responds to the rate of flux change, not the flux itself. Reverse the magnet direction to test Lenz&apos;s law, and increase the number of turns to see why coils amplify induced EMF.">
        <InductionSimClient />
      </Figure>

      <Definition number="16.2" title="Lenz's Law">
        The induced current flows in a direction such that the magnetic field it creates
        opposes the change in flux that caused it.
        <span style={{ display: 'block', marginTop: '0.5rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
          If the flux through a loop is increasing, the induced current creates a field opposing
          that increase. If flux is decreasing, the induced current tries to maintain it. Lenz&apos;s
          law is a consequence of energy conservation — you must do work to move the magnet.
        </span>
      </Definition>

      <h2>16.3 Motional EMF</h2>

      <p>
        A conductor of length <InlineMath latex="L" /> moving with velocity <InlineMath latex="\mathbf{v}" /> through a magnetic field <InlineMath latex="\mathbf{B}" /> experiences
        a force <InlineMath latex="q\mathbf{v}\times\mathbf{B}" /> on every charge carrier. This separates charges and creates a potential
        difference — a <strong>motional EMF</strong>:
      </p>

      <EqNumbered number="16.2" latex="\varepsilon = BLv \qquad \text{(conductor perpendicular to both }\mathbf{B}\text{ and }\mathbf{v}\text{)}" />

      <p>
        This is the operating principle of the electric generator: a coil of wire rotates in
        a magnetic field, its area projected onto the field direction varies as <InlineMath latex="\cos(\omega t)" />, so
        <InlineMath latex="\Phi_B = NBA\cos(\omega t)" />, and <InlineMath latex="\varepsilon = NBA\omega\sin(\omega t)" />. The output is sinusoidal alternating current
        (AC) — which is why the power grid runs on AC.
      </p>

      <WorkedExample number="16.1" title="EMF from a Changing Magnetic Field">
        <p>
          A circular loop of radius 10 cm lies in a uniform magnetic field that increases from
          0.2 T to 0.8 T in 0.5 s. Find the induced EMF.
        </p>
        <Step label="Area:"><InlineMath latex="A = \pi r^2 = \pi(0.10)^2 = 3.14\times10^{-2}\,\mathrm{m^2}" /></Step>
        <Step label="Change in flux:"><InlineMath latex="\Delta\Phi = \Delta B\,A = (0.8 - 0.2)(3.14\times10^{-2}) = 1.885\times10^{-2}\,\mathrm{Wb}" /></Step>
        <Step label="EMF:"><InlineMath latex="\varepsilon = -\Delta\Phi/\Delta t = -(1.885\times10^{-2})/0.5 = -0.0377\,\mathrm{V} \approx 37.7\,\mathrm{mV}" /></Step>
        <Step label="Direction:">By Lenz&apos;s law, the induced current opposes the increasing flux — it flows to create <InlineMath latex="\mathbf{B}" /> opposing the increase.</Step>
      </WorkedExample>

      <h2>16.4 Inductance and Transformers</h2>

      <p>
        A coil opposes changes in current through itself because any change in current changes
        the flux through its own loops — this is <strong>self-inductance</strong>. The induced
        back-EMF is:
      </p>

      <EqNumbered number="16.3">ε = −L dI/dt &nbsp;&nbsp;&nbsp; (self-inductance)</EqNumbered>

      <p>
        The inductance <InlineMath latex="L" /> (in henries, <InlineMath latex="\mathrm{H} = \mathrm{V\,s/A}" />) depends only on the coil geometry. For a
        solenoid: <InlineMath latex="L = \mu_0n^2V" />, where <InlineMath latex="n" /> is turns per meter and <InlineMath latex="V" /> is the volume. Energy stored
        in an inductor: <InlineMath latex="U = \frac{1}{2}LI^2" />.
      </p>

      <p>
        A <strong>transformer</strong> uses mutual inductance — the flux from one coil threading
        a second coil — to step voltage up or down. With <InlineMath latex="N_1" /> turns in the primary and <InlineMath latex="N_2" /> in
        the secondary, and assuming all flux is shared:
      </p>

      <EqNumbered number="16.4" latex="\frac{V_2}{V_1} = \frac{N_2}{N_1} \qquad \text{(ideal transformer)}" />

      <p>
        Power is conserved (<InlineMath latex="I_1V_1 = I_2V_2" />), so stepping voltage up steps current down by the
        same factor. This is why electrical power is transmitted at high voltage (low current,
        low resistive loss <InlineMath latex="I^2R" />) and stepped down near homes. Without the transformer —
        without induction — the modern power grid would be impossible.
      </p>

      <Definition number="16.3" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Flux is not just field strength:</strong> it also depends on area and angle.</li>
          <li><strong>Constant flux gives no EMF:</strong> a large steady flux induces nothing unless it changes.</li>
          <li><strong>The minus sign is physical:</strong> Lenz&apos;s law enforces energy conservation by opposing the change.</li>
          <li><strong>Motional EMF needs geometry:</strong> ε = BLv assumes B, L, and v are mutually perpendicular.</li>
          <li><strong>Transformers need changing current:</strong> ideal transformers work with AC, not steady DC.</li>
        </ul>
      </Definition>

      <WorkedExample number="16.2" title="Step-Down Transformer">
        <p>
          A transformer has 2000 primary turns and 100 secondary turns. The primary is connected
          to 240 V AC. Find the secondary voltage and the secondary current if the load is 12 Ω.
        </p>
        <Step label="Turns ratio:"><InlineMath latex="N_2/N_1 = 100/2000 = 1/20" /></Step>
        <Step label="Secondary voltage:"><InlineMath latex="V_2 = V_1(N_2/N_1) = 240(1/20) = 12\,\mathrm{V}" /></Step>
        <Step label="Secondary current:"><InlineMath latex="I_2 = V_2/R = 12/12 = 1\,\mathrm{A}" /></Step>
        <Step label="Primary current:"><InlineMath latex="I_1 = I_2(N_2/N_1) = 1(1/20) = 0.05\,\mathrm{A}" /> (power conserved: <InlineMath latex="240(0.05)=12(1)=12\,\mathrm{W}" /> ✓)</Step>
      </WorkedExample>

      <PracticeProblems section="16.1–16.4 Electromagnetic Induction">
        <InteractiveProblem n={1} difficulty="easy"
          answer={37.7} unit="mV" tolerance={0.02}
          hints={['ε = ΔΦ/Δt. First find ΔΦ = ΔB × A = ΔB × πr².']}
          problemText="Loop r=10 cm, B increases 0.2→0.8 T in 0.5 s. Find induced EMF (mV)."
          solution={<>A = π(0.1)² = 0.0314 m². ΔΦ = 0.6×0.0314 = 0.01885 Wb. ε = 0.01885/0.5 = <strong>37.7 mV</strong></>}>
          A circular loop of radius 10 cm sits in a field that increases from 0.2 T to 0.8 T in 0.5 s. Find the induced EMF.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={12} unit="V" tolerance={0.01}
          hints={['V₂ = V₁ × N₂/N₁']}
          problemText="Transformer: N₁=2000, N₂=100, V₁=240 V. Find V₂."
          solution={<>V₂ = 240 × 100/2000 = <strong>12 V</strong></>}>
          A transformer with 2000 primary and 100 secondary turns connects to 240 V. Find the secondary voltage.
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={0.48} unit="V" tolerance={0.02}
          hints={['ε = BLv. All three quantities must be mutually perpendicular.']}
          problemText="A 0.4 m rod moves at 3 m/s perpendicular to a 0.4 T field. Find the motional EMF (V)."
          solution={<>ε = BLv = 0.4 × 0.4 × 3 = <strong>0.48 V</strong></>}>
          A conducting rod of length 0.4 m moves at 3 m/s perpendicular to a 0.4 T magnetic field. Find the induced EMF.
        </InteractiveProblem>

        <Problem n={4} difficulty="medium"
          solution={<>Lenz&apos;s law: the induced current opposes the cause. (a) Magnet approaching N-pole first: induced current creates a repelling N-pole facing the magnet → current flows counterclockwise (as viewed from magnet side). (b) Magnet receding: induced current tries to pull magnet back → creates an attracting S-pole facing magnet → current flows clockwise. In both cases, work must be done against the magnetic force — energy conservation demands it, and Lenz&apos;s law guarantees it.</>}>
          A bar magnet (N-pole leading) is pushed toward a coil, then pulled away. In each case, determine the direction of induced current and the force on the magnet. Explain how this exemplifies energy conservation.
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>AC generator: a coil rotates with angular frequency ω in uniform B field. Φ = NBAcos(ωt). By Faraday: ε = NBAω sin(ωt) = ε_max sin(ωt). This is sinusoidal EMF with amplitude ε_max = NBAω. Peak voltage increases with N (turns), B (field strength), A (coil area), and ω (rotation rate). A motor is the reverse: a current-carrying coil experiences torque τ = NIAB sin θ. The back-EMF of the motor opposes the supply voltage — this is why motors draw huge current at startup (no back-EMF) and less at full speed.</>}>
          Derive the sinusoidal EMF output of an AC generator from first principles using Faraday&apos;s law. What determines the peak voltage? How does the motor differ from the generator in principle?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Magnetic flux: Φ_B = BA cos θ — the total field threading an area.',
        'Faraday\'s law: ε = −N dΦ/dt — any change in flux (from B, area, or angle) induces an EMF.',
        'Lenz\'s law: induced current opposes the flux change that caused it (energy conservation).',
        'Motional EMF: ε = BLv for a rod of length L moving at speed v in field B.',
        'Self-inductance: ε = −L dI/dt — a coil resists changes in its own current.',
        'Transformer: V₂/V₁ = N₂/N₁ — steps voltage up or down; enables the power grid.',
      ]} />
    </div>
  );
}
