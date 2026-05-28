import ElectricFieldClient from '@/components/sims/ElectricFieldClient';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals, InlineMath, HistoryNote
} from '@/components/textbook';

export default function ElectricFieldsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: 'var(--thm-accent)' }}>Electromagnetism · Chapter 13</div>
      <h1>Electric Charges and Fields</h1>
      <p className="subtitle">Like charges repel, unlike charges attract — but the field concept turns this force-at-a-distance into something local and geometric.</p>

      <Prerequisites items={['Newton\'s Laws', 'Vectors', 'Basic calculus (helpful)']} />

      <LearningGoals items={[
        'Use Coulomb\'s law to compute electrostatic forces between point charges.',
        'Explain why the electric field is a local vector description of force-at-a-distance.',
        'Apply superposition to forces, fields, and potentials from multiple charges.',
        'Distinguish electric potential energy from electric potential.',
        'Use Gauss\'s law qualitatively and recognize when symmetry makes it powerful.',
      ]} />

      <h2>13.1 Electric Charge</h2>

      <p>
        Electric charge is a fundamental property of matter, carried by protons (<InlineMath latex="+e" />) and electrons (<InlineMath latex="-e" />),
        where <InlineMath latex="e = 1.602 \times 10^{-19}\,\mathrm{C}" /> is the elementary charge. Charge comes in two signs; like signs repel
        and unlike signs attract. Charge is <strong>quantized</strong> (always a multiple of <InlineMath latex="e" />) and
        <strong>conserved</strong> — the total charge of an isolated system never changes.
      </p>

      <Definition number="13.1" title="Coulomb's Law">
        The electrostatic force between two point charges <InlineMath latex="q_1" /> and <InlineMath latex="q_2" /> separated by distance <InlineMath latex="r" />:
        <span style={{ display: 'block', margin: '0.6rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          <InlineMath latex="F = \frac{k|q_1q_2|}{r^2}" /> &nbsp;&nbsp;&nbsp; <InlineMath latex="k = 8.99 \times 10^9\,\mathrm{N\,m^2/C^2}" />
        </span>
        The force is along the line connecting the charges: repulsive if same sign, attractive if opposite.
        It obeys a <InlineMath latex="1/r^2" /> inverse-square law — the same mathematical form as gravity, but
        enormously stronger (about <InlineMath latex="10^{36}" /> times for electrons vs. gravity).
      </Definition>

      <p>
        Coulomb&apos;s constant <InlineMath latex="k = 1/(4\pi\varepsilon_0)" />, where <InlineMath latex="\varepsilon_0 = 8.85 \times 10^{-12}\,\mathrm{C^2/(N\,m^2)}" /> is the permittivity of
        free space. For multiple charges, forces add as vectors (superposition principle).
      </p>

      <WorkedExample number="13.1" title="Force Between Charges">
        <p>Two charges, <InlineMath latex="q_1 = +3\,\mu\mathrm{C}" /> and <InlineMath latex="q_2 = -2\,\mu\mathrm{C}" />, are <InlineMath latex="0.15\,\mathrm{m}" /> apart. Find the force between them.</p>
        <Step label="Apply Coulomb's law:"><InlineMath latex="F = \frac{k|q_1q_2|}{r^2} = \frac{(8.99\times10^9)(3\times10^{-6})(2\times10^{-6})}{(0.15)^2}" /></Step>
        <Step label="Calculate:"><InlineMath latex="F = \frac{(8.99\times10^9)(6\times10^{-12})}{0.0225} = \frac{53.94\times10^{-3}}{0.0225} = 2.40\,\mathrm{N}" /></Step>
        <Step label="Direction:">Attractive — unlike charges. The force pulls them toward each other.</Step>
      </WorkedExample>

      <h2>13.2 The Electric Field</h2>

      <p>
        Rather than thinking about force-at-a-distance, <HistoryNote
          trigger="Faraday"
          year="1830s"
          title="The field idea starts as a picture"
        >
          Michael Faraday had little formal mathematics, but his line-of-force diagrams were physically sharp.
          Maxwell later translated those pictures into equations.
        </HistoryNote> introduced the <strong>electric field</strong>:
        a charge creates a field everywhere in space, and other charges respond to that field locally.
        The field <InlineMath latex="\mathbf{E}" /> at a point is the force per unit positive test charge placed there:
      </p>

      <HistoryNote year="1785" title="Coulomb's torsion balance">
        Charles-Augustin de Coulomb measured tiny electric forces with a twisting fiber. By watching the fiber's angle,
        he found the same inverse-square pattern that Newton had found for gravity.
      </HistoryNote>

      <EqNumbered number="13.1" latex="\mathbf{E} = \frac{\mathbf{F}}{q_0} \qquad |\mathbf{E}| = \frac{kq}{r^2} \qquad \text{(point charge)}" />

      <p>
        The electric field is a <strong>vector field</strong> — it has a direction (away from + charges,
        toward − charges) and a magnitude at every point in space. For multiple charges, fields add as vectors.
      </p>

      <Definition number="13.2" title="Electric Field Lines">
        Field lines are a visual tool for representing electric fields:
        <ul style={{ marginTop: '0.4rem' }}>
          <li>Field lines originate on positive charges and terminate on negative charges.</li>
          <li>The <strong>direction</strong> of the field at any point is tangent to the field line.</li>
          <li>The <strong>magnitude</strong> is proportional to the density of field lines.</li>
          <li>Field lines never cross (the field has a unique direction at each point).</li>
        </ul>
      </Definition>

      <Figure number="13.1" caption="Interactive electric field simulation. Start with one positive charge and one negative charge, then add a second positive charge to see superposition. Field lines show direction by their tangent and relative strength by their density; drag charges around and watch where lines crowd together or cancel.">
        <ElectricFieldClient />
      </Figure>

      <h2>13.3 Electric Potential Energy and Potential</h2>

      <p>
        Just as gravitational force has an associated potential energy <InlineMath latex="U = mgh" />, the electric force is
        conservative and has a potential energy. For two point charges:
      </p>

      <EqNumbered number="13.2" latex="U = \frac{kq_1q_2}{r}" />

      <p>
        The <strong>electric potential</strong> V (not to be confused with voltage) is potential energy per unit charge:
      </p>

      <EqNumbered number="13.3" latex="V = \frac{U}{q_0} = \frac{kq}{r} \qquad \text{(point charge)} \qquad \Delta V = -\int \mathbf{E}\cdot d\mathbf{l}" />

      <p>
        Potential is a scalar — it&apos;s easier to work with than the vector field. The field points from
        high to low potential: <InlineMath latex="\mathbf{E} = -\nabla V" />. Equipotential surfaces (surfaces of constant <InlineMath latex="V" />) are always
        perpendicular to field lines.
      </p>

      <Theorem number="13.1" title="Gauss's Law">
        The total electric flux through any closed surface equals the enclosed charge divided by ε₀:
        <span style={{ display: 'block', margin: '0.6rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          <InlineMath latex="\Phi_E = \oint \mathbf{E}\cdot d\mathbf{A} = \frac{Q_\mathrm{enc}}{\varepsilon_0}" />
        </span>
        This is equivalent to Coulomb&apos;s law for static charges but is far more powerful — it can
        determine the field from highly symmetric charge distributions (sphere, cylinder, plane) with
        a single integral. It is one of Maxwell&apos;s four equations.
      </Theorem>

      <WorkedExample number="13.2" title="Field from a Charged Sphere">
        <p>A solid metal sphere of radius <InlineMath latex="R = 0.1\,\mathrm{m}" /> carries charge <InlineMath latex="Q = 5\,\mu\mathrm{C}" />. Find <InlineMath latex="E" /> at <InlineMath latex="r = 0.3\,\mathrm{m}" /> from the center.</p>
        <Step label="By Gauss's law:">For <InlineMath latex="r > R" />, the sphere looks like a point charge: <InlineMath latex="E = kQ/r^2" />.</Step>
        <Step label="Calculate:"><InlineMath latex="E = \frac{(8.99\times10^9)(5\times10^{-6})}{(0.3)^2} = \frac{44950}{0.09} = 4.99\times10^5\,\mathrm{N/C} \approx 500\,\mathrm{kN/C}" /></Step>
        <Step label="Inside:">For <InlineMath latex="r < R" /> (inside a conductor): <InlineMath latex="E = 0" />. All charge resides on the surface.</Step>
      </WorkedExample>

      <Definition number="13.3" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Force and field are not the same:</strong> E is force per unit test charge; F = qE depends on the charge placed in the field.</li>
          <li><strong>Potential is a scalar:</strong> add potentials algebraically, but add electric fields as vectors.</li>
          <li><strong>Signs matter for potential energy:</strong> opposite charges have negative U and are bound by attraction.</li>
          <li><strong>Field lines are a model:</strong> they visualize direction and density, not physical strings in space.</li>
          <li><strong>Gauss&apos;s law is always true:</strong> it is only easy to use when symmetry makes E constant on a chosen surface.</li>
        </ul>
      </Definition>

      <PracticeProblems section="13.1–13.3 Electric Charges and Fields">
        <InteractiveProblem n={1} difficulty="easy"
          answer={8.99} unit="N" tolerance={0.02}
          hints={['F = kq₁q₂/r². With q₁=q₂=1×10⁻⁶ C, r=0.1 m, k=8.99×10⁹.', 'F = (8.99×10⁹)(10⁻⁶)(10⁻⁶)/(0.1)²']}
          problemText="Two +1 μC charges are 0.1 m apart. Find the repulsive force. (k = 8.99×10⁹ N·m²/C²)"
          solution={<>F = kq²/r² = (8.99×10⁹)(10⁻⁶)²/(0.1)² = (8.99×10⁹×10⁻¹²)/0.01 = <strong>8.99 N</strong></>}>
          Two point charges each of +1.0 μC are 0.1 m apart. Find the magnitude of the electrostatic force.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={8990} unit="N/C" tolerance={0.02}
          hints={['E = kq/r². A point charge q = 1 μC at distance r = 1 m.', 'E = (8.99×10⁹)(10⁻⁶)/(1)²']}
          problemText="Find the electric field magnitude at 1.0 m from a +1 μC point charge. (k = 8.99×10⁹)"
          solution={<>E = kq/r² = (8.99×10⁹)(10⁻⁶)/(1.0)² = <strong>8990 N/C</strong></>}>
          Find the electric field 1.0 m from a +1.0 μC point charge.
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={89900} unit="V" tolerance={0.02}
          hints={['V = kq/r for a point charge.', 'V = (8.99×10⁹)(10⁻⁶)/(0.1)']}
          problemText="Find the electric potential at 0.1 m from a +1.0 μC charge. (k = 8.99×10⁹)"
          solution={<>V = kq/r = (8.99×10⁹)(10⁻⁶)/(0.1) = <strong>89,900 V ≈ 90 kV</strong></>}>
          Find the electric potential at a distance of 0.10 m from a +1.0 μC point charge.
        </InteractiveProblem>

        <InteractiveProblem n={4} difficulty="medium"
          answer={2.4} unit="N" tolerance={0.02}
          hints={[
            'Coulomb\'s law: F = k|q₁q₂|/r². Watch sign conventions — magnitude only.',
            'F = (8.99×10⁹)(3×10⁻⁶)(2×10⁻⁶)/(0.15)²',
          ]}
          problemText="q₁ = +3 μC and q₂ = −2 μC are 15 cm apart. Find the magnitude of the force between them."
          solution={<>F = k|q₁q₂|/r² = (8.99×10⁹)(3×10⁻⁶)(2×10⁻⁶)/(0.15)² = 53.94×10⁻³/0.0225 = <strong>2.40 N</strong></>}>
          Charges q₁ = +3.0 μC and q₂ = −2.0 μC are separated by 15 cm. Find the magnitude of the electrostatic force.
        </InteractiveProblem>

        <Problem n={5} difficulty="hard"
          solution={<>Place q₁ = +q at x=0 and q₂ = +4q at x=d. The field from q₁ at position x: E₁ = kq/x², pointing right (+x). The field from q₂ at x: E₂ = 4kq/(d−x)², pointing left (−x). Setting E₁ = E₂: kq/x² = 4kq/(d−x)² → (d−x)² = 4x² → d−x = 2x → x = d/3. The null point is 1/3 of the way from the smaller charge toward the larger one.</>}>
          Two positive charges, q and 4q, are placed d apart. Find the location between them where the electric field is zero.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Coulomb\'s law: F = kq₁q₂/r² — inverse square, like gravity, but 10³⁶× stronger.',
        'Electric field E = F/q₀: force per unit positive charge, a vector field pointing away from +, toward −.',
        'Superposition: fields and forces from multiple charges add vectorially.',
        'Electric potential V = kq/r is a scalar; E = −∇V.',
        'Gauss\'s law ∮E·dA = Q_enc/ε₀ is the most powerful tool for symmetric charge distributions.',
      ]} />
    </div>
  );
}
