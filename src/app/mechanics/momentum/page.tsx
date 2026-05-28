import Collision1D from '@/components/sims/Collision1D';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function MomentumPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: 'var(--def-accent)' }}>Classical Mechanics · Chapter 5</div>
      <h1>Momentum &amp; Collisions</h1>
      <p className="subtitle">Momentum is the most conserved quantity in mechanics — it&apos;s conserved even when energy is not, even across relativity.</p>

      <Prerequisites items={["Newton's laws", 'Vectors', 'Energy concepts (helpful)']} />

      <LearningGoals items={[
        'Use momentum and impulse to connect force, time, and changes in motion.',
        'Recognize when a system is isolated enough to conserve total momentum.',
        'Classify collisions as elastic, perfectly inelastic, or partially inelastic.',
        'Use coefficient of restitution with momentum conservation to solve 1D collisions.',
        'Separate collision stages from later energy-conversion stages in ballistic pendulum problems.',
      ]} />

      <h2>5.1 Linear Momentum</h2>

      <p>
        Newton&apos;s second law is most generally stated as F = dp/dt, not F = ma. When mass is constant
        these are equivalent, but the momentum form extends naturally to variable-mass systems
        (rockets) and special relativity.
      </p>

      <Definition number="5.1" title="Linear Momentum and Impulse">
        The linear momentum of an object is:
        <span style={{ display: 'block', margin: '0.5rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          p = mv &nbsp;&nbsp;&nbsp; [units: kg·m/s]
        </span>
        The impulse J is the change in momentum, equal to the integral of force over time:
        <span style={{ display: 'block', margin: '0.5rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          J = Δp = ∫F dt = F_avg · Δt
        </span>
        This is why airbags save lives: same Δp (car decelerates to rest either way), but larger Δt →
        smaller F_avg → survivable force.
      </Definition>

      <Theorem number="5.1" title="Conservation of Momentum">
        For an isolated system (no net external forces), total linear momentum is conserved:
        <span style={{ display: 'block', margin: '0.5rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          p_total = Σmᵢvᵢ = const. &nbsp;&nbsp;&nbsp; (when F_external = 0)
        </span>
        This follows directly from Newton&apos;s third law: internal forces come in equal-and-opposite pairs
        and cancel in the total. Conservation of momentum holds even when energy is not conserved.
      </Theorem>

      <h2>5.2 Collisions and Coefficient of Restitution</h2>

      <p>
        All collisions conserve momentum. They differ in what happens to kinetic energy:
      </p>

      <ul>
        <li><strong>Elastic (e = 1):</strong> KE is conserved. Microscopic collisions (billiard balls at low speed, atomic collisions) are approximately elastic.</li>
        <li><strong>Perfectly inelastic (e = 0):</strong> Objects stick together. Maximum KE loss consistent with momentum conservation.</li>
        <li><strong>Partially inelastic (0 &lt; e &lt; 1):</strong> Most real macroscopic collisions. KE is lost to heat, sound, deformation.</li>
      </ul>

      <p>
        The coefficient of restitution e is defined as the ratio of relative speed after to relative speed before:
      </p>

      <EqNumbered number="5.1" latex="e = \frac{v_2' - v_1'}{v_1 - v_2} \qquad 0 \le e \le 1" />

      <p>
        Combined with conservation of momentum m₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′, solving the system:
      </p>

      <EqNumbered number="5.2" latex="v_1' = \frac{(m_1 - em_2)v_1 + (1+e)m_2v_2}{m_1+m_2}" />
      <EqNumbered number="5.3" latex="v_2' = \frac{(m_2 - em_1)v_2 + (1+e)m_1v_1}{m_1+m_2}" />

      <WorkedExample number="5.1" title="Newton's Cradle — Equal Mass Elastic">
        <p>Ball 1 (m = 1 kg) moving at 3 m/s strikes stationary Ball 2 (m = 1 kg) elastically (e = 1).</p>
        <Step label="Apply (5.2):">v₁′ = [(1−1×1)(3) + (1+1)(1)(0)] / 2 = 0/2 = <strong>0 m/s</strong></Step>
        <Step label="Apply (5.3):">v₂′ = [(1−1)(0) + (1+1)(1)(3)] / 2 = 6/2 = <strong>3 m/s</strong></Step>
        <Step label="Result:">Ball 1 stops completely; Ball 2 moves at 3 m/s. This is the Newton&apos;s Cradle effect — for equal masses, elastic collisions transfer velocity completely.</Step>
      </WorkedExample>

      <WorkedExample number="5.2" title="Ballistic Pendulum">
        <p>A 10 g bullet embeds in a 2 kg pendulum bob at rest. The pendulum rises 8 cm. Find the bullet&apos;s initial speed.</p>
        <Step label="Phase 2 (energy):">½(m+M)v_f² = (m+M)gh → v_f = √(2gh) = √(2×9.81×0.08) = 1.253 m/s</Step>
        <Step label="Phase 1 (momentum):">mv_bullet = (m+M)v_f → v_bullet = (m+M)v_f/m = (2.01)(1.253)/0.01 = <strong>251.9 m/s</strong></Step>
        <Step label="Note:">Momentum conserved in the collision (Phase 1); energy conserved in the swing (Phase 2). You can&apos;t use energy conservation across the collision itself — the impact is inelastic.</Step>
      </WorkedExample>

      <Figure number="5.1" caption="1D collision simulation. The coefficient of restitution slider morphs from perfectly inelastic (e = 0, objects stick) to elastic (e = 1, billiard ball behavior). The stats panel shows momentum and KE before and after.">
        <Collision1D />
      </Figure>

      <Definition number="5.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Momentum is vectorial:</strong> signs or directions matter even in one dimension.</li>
          <li><strong>Momentum conservation needs a system:</strong> external impulse breaks conservation for the chosen objects.</li>
          <li><strong>Kinetic energy is not always conserved:</strong> only elastic collisions conserve KE.</li>
          <li><strong>Objects sticking together is not enough information for energy:</strong> use momentum for the collision, then energy for later motion if appropriate.</li>
          <li><strong>Impulse depends on time:</strong> increasing stopping time reduces average force for the same Δp.</li>
        </ul>
      </Definition>

      <PracticeProblems section="5.1–5.2 Momentum">
        <InteractiveProblem n={1} difficulty="easy"
          answer={5800} unit="N" tolerance={0.02}
          hints={['Impulse J = Δp = p_f − p_i. The ball reverses, so J = 2mv. Then F_avg = J/Δt.']}
          problemText="A 145 g baseball moving at 40 m/s is hit straight back at 40 m/s. Contact time is 2 ms. Find the average force (N) during contact."
          solution={<>Impulse J = Δp = 5.8 − (−5.8) = 11.6 kg·m/s. F_avg = J/Δt = 11.6/0.002 = <strong>5,800 N</strong>.</>}>
          A 145 g baseball moving at 40 m/s is hit straight back at 40 m/s. Contact time is 2 ms. Find (a) the impulse and (b) the average force during contact.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={5} unit="m/s" tolerance={0.02}
          hints={['For elastic collision: v₂′ = [(m₂−m₁)v₂ + 2m₁v₁]/(m₁+m₂). Substitute and solve.']}
          problemText="3 kg block at 4 m/s collides elastically with 2 kg block at −1 m/s. Find the 2 kg block's final velocity (m/s)."
          solution={<>v₂′ = [(2−3)(−1) + 2(3)(4)] / (3+2) = [1 + 24]/5 = <strong>5 m/s</strong>. (v₁′ = 0 m/s; total KE and p conserved.)</>}>
          3 kg block moving at 4 m/s collides elastically with a 2 kg block moving at −1 m/s. Find the velocities after and verify KE conservation.
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Perfectly inelastic: m_combined = 1200+2000 = 3200 kg. p_before = 1200×20+2000×0 = 24,000 kg·m/s. v_f = p/m = 24000/3200 = 7.5 m/s. KE_before = ½(1200)(400) = 240,000 J. KE_after = ½(3200)(56.25) = 90,000 J. KE lost = <strong>150,000 J</strong> (62.5% lost to deformation).</>}>
          A 1200 kg car traveling 20 m/s rear-ends a stationary 2000 kg truck. They stick together. Find the final speed and the kinetic energy lost.
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>For e = 0 (perfectly inelastic): v_f = (m₁v₁+m₂v₂)/(m₁+m₂) = m₁v₁/(m₁+m₂) (if v₂=0). KE_f/KE_i = (½(m₁+m₂)v_f²)/(½m₁v₁²) = m₁/(m₁+m₂). Fraction LOST = 1 − m₁/(m₁+m₂) = m₂/(m₁+m₂). For m₁ = m₂: fraction lost = 1/2 = 50%. For m₁ ≫ m₂: fraction lost → 0 (heavy bullet barely slows). For m₁ ≪ m₂: fraction lost → 1 (light bullet transfers almost all KE).</>}>
          Derive a general formula for the fraction of kinetic energy lost in a perfectly inelastic collision between mass m₁ (moving) and m₂ (stationary). Evaluate for equal masses and for m₁ ≪ m₂.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Momentum p = mv is always conserved in an isolated system — even when energy is not.',
        'Impulse J = Δp = F_avg Δt; increasing collision time reduces peak force (airbags, crumple zones).',
        'Elastic (e=1): KE conserved. Perfectly inelastic (e=0): objects stick. Most real collisions are in between.',
        'For equal-mass elastic collisions, velocities are exchanged — the basis of Newton\'s cradle.',
        'The ballistic pendulum is a classic example of combining inelastic collision (momentum) with energy conservation separately.',
      ]} />
    </div>
  );
}
