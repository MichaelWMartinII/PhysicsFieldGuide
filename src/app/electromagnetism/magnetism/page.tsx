import MagneticFieldClient from '@/components/sims/MagneticFieldClient';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals, InlineMath
} from '@/components/textbook';

export default function MagnetismPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#a855f7' }}>Electromagnetism · Chapter 15</div>
      <h1>Magnetic Fields</h1>
      <p className="subtitle">
        A moving charge creates a magnetic field, and a magnetic field exerts a force on moving
        charges. These two facts, combined with Faraday&apos;s law, unify electricity and magnetism
        into a single theory.
      </p>

      <Prerequisites items={['Electric fields (Ch. 13)', 'DC circuits (Ch. 14)', 'Vectors and cross products (Math Ch.)']} />

      <LearningGoals items={[
        'Use the Lorentz force law to predict the magnitude and direction of magnetic forces.',
        'Explain why magnetic forces change particle direction but do no work.',
        'Derive cyclotron radius and period for motion perpendicular to a uniform magnetic field.',
        'Compute magnetic fields from common current geometries.',
        'Apply Ampère\'s law when symmetry makes the line integral simple.',
      ]} />

      <h2>15.1 The Magnetic Force</h2>

      <p>
        A charged particle moving with velocity <InlineMath latex="\mathbf{v}" /> in a magnetic field <InlineMath latex="\mathbf{B}" />
        {' '}experiences the <strong>Lorentz force</strong>:
      </p>

      <EqNumbered number="15.1" latex="\mathbf{F} = q\mathbf{v}\times\mathbf{B}" />

      <p>
        The cross product means the force is perpendicular to both the velocity and the field.
        This has three immediate consequences: (1) a stationary charge feels no magnetic force;
        (2) a charge moving parallel to <InlineMath latex="\mathbf{B}" /> feels no force; (3) the force does no work — it can
        change direction but not speed.
      </p>

      <p>
        The magnitude is <InlineMath latex="F = |q|vB\sin\theta" />, where <InlineMath latex="\theta" /> is the angle between <InlineMath latex="\mathbf{v}" /> and <InlineMath latex="\mathbf{B}" />. The direction
        is given by the right-hand rule: point fingers in the direction of <InlineMath latex="\mathbf{v}" />, curl toward <InlineMath latex="\mathbf{B}" />,
        and the thumb points in the direction of <InlineMath latex="\mathbf{F}" /> (for positive <InlineMath latex="q" />; reverse for negative <InlineMath latex="q" />).
      </p>

      <Definition number="15.1" title="Cyclotron Motion">
        A charged particle moving perpendicular to a uniform magnetic field follows a circular
        path. The magnetic force provides the centripetal acceleration:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          <InlineMath latex="|q|vB = \frac{mv^2}{r}" /> &nbsp;&nbsp; → &nbsp;&nbsp; <InlineMath latex="r = \frac{mv}{|q|B}" />
        </span>
        This radius <InlineMath latex="r" /> is the <strong>cyclotron radius</strong> (or Larmor radius). The period
        <InlineMath latex="T = 2\pi m/(|q|B)" /> is independent of velocity — the basis of the cyclotron particle accelerator.
      </Definition>

      <Figure number="15.1" caption="Magnetic field simulator. Toggle among a straight wire, solenoid, and moving charge: reverse the current to see field directions flip, increase current to see field strength rise, and change charge sign to reverse the Lorentz-force direction in cyclotron motion.">
        <MagneticFieldClient />
      </Figure>

      <h2>15.2 Magnetic Fields from Currents</h2>

      <p>
        Just as a charge creates an electric field, a <em>moving</em> charge (current) creates a
        magnetic field. The fundamental law for this is the <strong>Biot–Savart law</strong>:
        each current element <InlineMath latex="I\,d\mathbf{l}" /> contributes a field <InlineMath latex="d\mathbf{B}" /> at position <InlineMath latex="\mathbf{r}" />:
      </p>

      <EqNumbered number="15.2" latex="d\mathbf{B} = \frac{\mu_0}{4\pi}\frac{I\,d\mathbf{l}\times\hat{\mathbf{r}}}{r^2}" />

      <p>
        where <InlineMath latex="\mu_0 = 4\pi \times 10^{-7}\,\mathrm{T\,m/A}" /> is the permeability of free space. For practical geometries,
        we integrate this law to find closed-form results.
      </p>

      <Theorem number="15.1" title="Magnetic Field of Common Current Configurations">
        <span style={{ display: 'block', marginBottom: '0.3rem' }}>
          Infinite straight wire at distance <InlineMath latex="r" />: &nbsp; <InlineMath latex="B = \mu_0I/(2\pi r)" />, &nbsp; circles the wire by right-hand rule
        </span>
        <span style={{ display: 'block', marginBottom: '0.3rem' }}>
          Circular loop of radius <InlineMath latex="R" /> at center: &nbsp; <InlineMath latex="B = \mu_0I/(2R)" />, &nbsp; along the axis
        </span>
        <span style={{ display: 'block' }}>
          Solenoid (<InlineMath latex="n" /> turns/meter, inside): &nbsp; <InlineMath latex="B = \mu_0nI" />, &nbsp; uniform and axial
        </span>
      </Theorem>

      <h2>15.3 Ampère&apos;s Law</h2>

      <p>
        Ampère&apos;s law is the magnetic analogue of Gauss&apos;s law. For any closed loop (Amperian loop),
        the line integral of <InlineMath latex="\mathbf{B}" /> around the loop equals <InlineMath latex="\mu_0" /> times the current threading the loop:
      </p>

      <EqNumbered number="15.3" latex="\oint \mathbf{B}\cdot d\mathbf{l} = \mu_0 I_\mathrm{enc}" />

      <p>
        Like Gauss&apos;s law, Ampère&apos;s law is always true but only useful for deriving fields when
        the geometry is highly symmetric (infinite wire, solenoid, toroid). For the infinite wire,
        choose a circular Amperian loop of radius <InlineMath latex="r" />: <InlineMath latex="B(2\pi r) = \mu_0I" />, immediately giving <InlineMath latex="B = \mu_0I/(2\pi r)" />.
      </p>

      <WorkedExample number="15.1" title="Force Between Two Parallel Wires">
        <p>
          Two parallel wires <InlineMath latex="0.5\,\mathrm{m}" /> apart carry currents <InlineMath latex="I_1 = 10\,\mathrm{A}" /> and <InlineMath latex="I_2 = 20\,\mathrm{A}" /> in the same
          direction. Find the force per unit length between them.
        </p>
        <Step label="Field from wire 1:"><InlineMath latex="B_1 = \frac{\mu_0I_1}{2\pi d} = \frac{(4\pi\times10^{-7})(10)}{2\pi(0.5)} = 4\times10^{-6}\,\mathrm{T}" /></Step>
        <Step label="Force on wire 2:"><InlineMath latex="F/L = I_2B_1 = 20(4\times10^{-6}) = 8\times10^{-5}\,\mathrm{N/m}" /></Step>
        <Step label="Direction:">Same-direction currents attract (opposite-direction repel).</Step>
        <Step label="Note:">This experiment defines the ampere: 2×10⁻⁷ N/m force per meter between wires 1 m apart carrying 1 A each.</Step>
      </WorkedExample>

      <WorkedExample number="15.2" title="Cyclotron Radius of a Proton">
        <p>
          A proton (<InlineMath latex="m = 1.67 \times 10^{-27}\,\mathrm{kg}" />, <InlineMath latex="q = 1.6 \times 10^{-19}\,\mathrm{C}" />) moves at <InlineMath latex="2 \times 10^6\,\mathrm{m/s}" /> perpendicular
          to a <InlineMath latex="0.1\,\mathrm{T}" /> magnetic field. Find the radius of its circular orbit.
        </p>
        <Step label="Formula:"><InlineMath latex="r = \frac{mv}{qB}" /></Step>
        <Step label="Substitute:"><InlineMath latex="r = \frac{(1.67\times10^{-27})(2\times10^6)}{(1.6\times10^{-19})(0.1)}" /></Step>
        <Step label="Calculate:"><InlineMath latex="r = \frac{3.34\times10^{-21}}{1.6\times10^{-20}} = 0.209\,\mathrm{m} \approx 21\,\mathrm{cm}" /></Step>
      </WorkedExample>

      <h2>15.4 The Magnetic Force on a Current</h2>

      <p>
        A current-carrying wire in a magnetic field experiences a force — since each mobile
        charge experiences <InlineMath latex="\mathbf{F} = q\mathbf{v}\times\mathbf{B}" />, the wire as a whole feels a net force. For a straight
        segment of length <InlineMath latex="L" /> carrying current <InlineMath latex="I" /> in field <InlineMath latex="\mathbf{B}" />:
      </p>

      <EqNumbered number="15.4" latex="\mathbf{F} = I\mathbf{L}\times\mathbf{B} \qquad \text{(magnitude: }F = BIL\sin\theta\text{)}" />

      <p>
        This is the operating principle of every electric motor: a current loop in a magnetic
        field experiences a torque <InlineMath latex="\tau = NIAB\sin\theta" /> (<InlineMath latex="N" /> turns, area <InlineMath latex="A" />, tilt angle <InlineMath latex="\theta" />), which causes
        rotation. The torque is maximized when the loop is parallel to the field (<InlineMath latex="\theta = 90^\circ" />) and
        zero when it is perpendicular (aligned with <InlineMath latex="\mathbf{B}" />) — requiring a commutator to maintain
        continuous rotation.
      </p>

      <Definition number="15.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Magnetic force needs motion:</strong> a stationary charge feels no magnetic force.</li>
          <li><strong>Perpendicular matters:</strong> only the velocity component perpendicular to B curves the path.</li>
          <li><strong>The force does no work:</strong> it changes direction, not speed, for an isolated charged particle.</li>
          <li><strong>Right-hand rules depend on sign:</strong> reverse the direction for negative charges.</li>
          <li><strong>Ampère&apos;s law needs symmetry:</strong> the law is general, but the shortcut works only when B is constant along the chosen loop.</li>
        </ul>
      </Definition>

      <PracticeProblems section="15.1–15.4 Magnetic Fields">
        <InteractiveProblem n={1} difficulty="easy"
          answer={0.209} unit="m" tolerance={0.02}
          hints={['r = mv/|q|B. Plug in m = 1.67×10⁻²⁷ kg, v = 2×10⁶ m/s, q = 1.6×10⁻¹⁹ C, B = 0.1 T.']}
          problemText="Proton at v=2×10⁶ m/s in B=0.1 T field. Find cyclotron radius in meters."
          solution={<>r = mv/qB = (1.67e-27 × 2e6)/(1.6e-19 × 0.1) = <strong>0.209 m</strong></>}>
          A proton moves at 2×10⁶ m/s perpendicular to a 0.1 T field. Find the cyclotron radius.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={8e-5} unit="N/m" tolerance={0.02}
          hints={['B₁ = μ₀I₁/(2πd), then F/L = I₂ B₁']}
          problemText="Two wires 0.5 m apart, I₁=10 A, I₂=20 A. Find force per unit length (N/m)."
          solution={<>B₁ = 4×10⁻⁶ T. F/L = 20 × 4×10⁻⁶ = <strong>8×10⁻⁵ N/m</strong></>}>
          Two parallel wires are 0.5 m apart carrying I₁ = 10 A and I₂ = 20 A. Find the force per meter.
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={4e-6} unit="T" tolerance={0.02}
          hints={['B = μ₀I/(2πr). Use μ₀ = 4π×10⁻⁷ T·m/A.']}
          problemText="Find B (in T) at 0.5 m from an infinite wire carrying 10 A."
          solution={<>B = (4π×10⁻⁷ × 10)/(2π × 0.5) = <strong>4×10⁻⁶ T = 4 μT</strong></>}>
          Find the magnetic field 0.5 m from an infinite straight wire carrying 10 A.
        </InteractiveProblem>

        <Problem n={4} difficulty="medium"
          solution={<>The cyclotron period T = 2πm/(|q|B) is independent of v. Faster particles make larger circles but at the same angular frequency ω = |q|B/m (cyclotron frequency). This independence is why a cyclotron can accelerate particles repeatedly with a fixed RF frequency — particles of all energies arrive at the gap in sync until relativistic effects require synchrotron corrections.</>}>
          Explain why the period of circular cyclotron motion is independent of the particle&apos;s speed. How does this make the cyclotron particle accelerator possible?
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>A mass spectrometer uses a velocity selector (E×B drift: only particles with v = E/B pass) followed by a uniform magnetic field. In the field, the radius r = mv/qB. Two ions of the same charge but masses m₁ and m₂ have radii r₁ and r₂ with r₁/r₂ = m₁/m₂. The separation on the detector is Δx = 2(r₁−r₂) = 2v(m₁−m₂)/(qB). For ¹²C and ¹³C: Δm/m ≈ 1/12, so Δx ≈ 2× ⁱ⁶m_u/(qB) for typical parameters gives mm-scale separation.</>}>
          Describe how a mass spectrometer separates ions by mass-to-charge ratio. Derive the detector separation Δx for two ions of the same charge differing in mass by Δm.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Lorentz force: F = q(v × B) — perpendicular to both velocity and field, does no work.',
        'Cyclotron radius r = mv/|q|B; period T = 2πm/|q|B is speed-independent.',
        'Biot–Savart law gives field from current elements; Ampère\'s law gives field from symmetric configurations.',
        'Infinite wire: B = μ₀I/2πr; solenoid: B = μ₀nI (uniform, inside).',
        'Parallel wires attract if currents are in the same direction, repel if opposite.',
        'Motor torque: τ = NIAB sin θ — the rotating coil is maximally torqued when parallel to B.',
      ]} />
    </div>
  );
}
