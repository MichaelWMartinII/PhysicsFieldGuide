import ProjectileMotion from '@/components/sims/ProjectileMotion';
import Projectile3DClient from '@/components/sims/Projectile3DClient';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function KinematicsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: 'var(--def-accent)' }}>Classical Mechanics · Chapter 2</div>
      <h1>Kinematics</h1>
      <p className="subtitle">The geometry of motion — describing how things move without asking why.</p>

      <Prerequisites items={['Basic algebra', 'Trigonometry (sin, cos)', 'Vectors']} />

      <LearningGoals items={[
        'Distinguish position, displacement, velocity, speed, and acceleration.',
        'Choose the right constant-acceleration equation based on given and missing variables.',
        'Break projectile motion into independent horizontal and vertical components.',
        'Derive range, height, and time of flight for ideal projectiles on level ground.',
        'Extend 2D projectile reasoning to simple 3D motion with lateral acceleration.',
      ]} />

      <h2>2.1 Motion in One Dimension</h2>

      <p>
        Kinematics is the branch of mechanics that describes motion in terms of position, velocity, and acceleration
        — without reference to the forces that cause that motion. Before Newton can tell us <em>why</em> something
        accelerates, kinematics gives us the language to describe <em>how</em> it moves.
      </p>

      <Definition number="2.1" title="Average and Instantaneous Velocity">
        The <strong>average velocity</strong> over a time interval Δt is the displacement divided by elapsed time:
        <span style={{ display: 'block', margin: '0.5rem 0 0.5rem 1rem', fontStyle: 'italic' }}>v̄ = Δx / Δt</span>
        The <strong>instantaneous velocity</strong> is the limit as Δt → 0 — the derivative of position with respect to time:
        <span style={{ display: 'block', margin: '0.5rem 0 0.25rem 1rem', fontStyle: 'italic' }}>v(t) = dx/dt</span>
        Similarly, acceleration is the rate of change of velocity: <em>a(t) = dv/dt = d²x/dt²</em>.
      </Definition>

      <p>
        For the special case of <strong>constant acceleration</strong> — which applies to free fall near Earth&apos;s
        surface, and to many idealized problems — we can integrate twice to get the four kinematic equations:
      </p>

      <EqNumbered number="2.1" latex="v = v_0 + at" />
      <EqNumbered number="2.2" latex="x = x_0 + v_0t + \frac{1}{2}at^2" />
      <EqNumbered number="2.3" latex="v^2 = v_0^2 + 2a(x - x_0)" />
      <EqNumbered number="2.4" latex="x = x_0 + \frac{1}{2}(v_0 + v)t" />

      <p>
        These four equations contain six variables: x, x₀, v, v₀, a, t. Each equation omits one variable.
        When solving a problem, identify which variable is unknown and which is not given, then choose
        the equation that doesn&apos;t involve the missing variable.
      </p>

      <WorkedExample number="2.1" title="Braking Distance">
        <p>A car traveling at 30 m/s (≈ 108 km/h) brakes with deceleration 8 m/s². How far does it travel before stopping?</p>
        <Step label="Identify:">v₀ = 30 m/s, v = 0 m/s, a = −8 m/s². Find Δx.</Step>
        <Step label="Choose equation:">Since time is not given or needed, use (2.3): v² = v₀² + 2aΔx</Step>
        <Step label="Solve:">0 = (30)² + 2(−8)Δx → Δx = 900/16 = <strong style={{color:'var(--ex-accent)'}}>56.25 m</strong></Step>
        <Step label="Sanity check:">At 108 km/h, stopping in 56 m sounds right. Highway braking distances are ~50–80 m.</Step>
      </WorkedExample>

      <h2>2.2 Two-Dimensional Motion — Projectile</h2>

      <p>
        When an object moves in two dimensions under constant gravitational acceleration, we decompose the
        problem along two independent axes. This is the key insight: <strong>the horizontal and vertical
        components of motion are completely independent of each other.</strong>
      </p>

      <Theorem number="2.1" title="Superposition of Motions">
        In projectile motion (neglecting air resistance), the horizontal velocity component remains
        constant throughout the flight, while the vertical component changes at rate −g:
        <span style={{ display: 'block', margin: '0.75rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          vₓ(t) = v₀ cos(θ) = const &nbsp;&nbsp;&nbsp; vᵧ(t) = v₀ sin(θ) − gt
        </span>
        <span style={{ display: 'block', margin: '0.25rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          x(t) = v₀ cos(θ) · t &nbsp;&nbsp;&nbsp; y(t) = v₀ sin(θ) · t − ½gt²
        </span>
      </Theorem>

      <p>
        From these equations we can derive the trajectory shape. Eliminating t by solving for t from the
        x-equation and substituting:
      </p>

      <EqNumbered number="2.5" latex="y = x\tan\theta - \frac{gx^2}{2v_0^2\cos^2\theta}" />

      <p>
        This is a downward-opening parabola — the trajectory is parabolic. We can also derive closed-form
        expressions for range R, maximum height H, and time of flight T:
      </p>

      <EqNumbered number="2.6" latex="R = \frac{v_0^2\sin(2\theta)}{g} \qquad H = \frac{v_0^2\sin^2\theta}{2g} \qquad T = \frac{2v_0\sin\theta}{g}" />

      <p>
        A notable result from (2.6): range is maximized at θ = 45°, and complementary angles
        (e.g., 30° and 60°) yield the same range. Try this in the simulation below.
      </p>

      <Figure number="2.1" caption="Interactive projectile simulation. The dashed line shows the predicted parabolic trajectory; the yellow arrow shows the current velocity vector. Try comparing the same launch speed across different gravity presets.">
        <ProjectileMotion />
      </Figure>

      <h2>2.3 Projectile Motion in Three Dimensions</h2>

      <p>
        In reality, projectiles are not confined to a vertical plane. A crosswind adds a lateral acceleration,
        turning the flat parabola into a <strong>twisted 3D curve</strong>. This is why a quarterback must
        account for wind, and why long-range artillery shells deviate significantly from 2D predictions.
      </p>

      <EqNumbered number="2.7" latex="x(t) = v_0\cos\theta\,t + \frac{1}{2}a_xt^2 \qquad y(t) = v_0\sin\theta\,t - \frac{1}{2}gt^2 \qquad z(t) = \frac{1}{2}a_\mathrm{wind}t^2" />

      <p>
        With a sideways wind acceleration a_wind, the range projection in the xz-plane is a parabola in both
        the vertical (xy) and horizontal (xz) senses simultaneously — a <em>spatial</em> parabola.
      </p>

      <Figure number="2.2" caption="3D projectile simulation. Set crosswind speed and direction to see the flat parabola bend into 3D space. The ground shadow shows actual landing displacement. Drag to rotate, scroll to zoom.">
        <Projectile3DClient />
      </Figure>

      <WorkedExample number="2.2" title="Cliff Launch">
        <p>A ball is thrown horizontally from a cliff 45 m high with speed 15 m/s. Find where it lands.</p>
        <Step label="Vertical (free fall):">y = ½gt² → 45 = ½(9.81)t² → t = √(90/9.81) = <strong>3.03 s</strong></Step>
        <Step label="Horizontal:">x = v₀t = 15 × 3.03 = <strong style={{color:'var(--ex-accent)'}}>45.5 m</strong> from the base of the cliff.</Step>
        <Step label="Impact speed:">vₓ = 15 m/s, vᵧ = gt = 9.81 × 3.03 = 29.7 m/s → v = √(15² + 29.7²) = 33.2 m/s</Step>
      </WorkedExample>

      <Definition number="2.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Distance is not displacement:</strong> displacement includes direction and can be zero after a round trip.</li>
          <li><strong>Velocity is not speed:</strong> velocity can be negative; speed is the magnitude.</li>
          <li><strong>Use signs consistently:</strong> if up is positive, gravitational acceleration is −g.</li>
          <li><strong>Horizontal and vertical motion share time only:</strong> do not use horizontal velocity in vertical equations.</li>
          <li><strong>Range formulas have assumptions:</strong> the closed forms above require level launch and landing heights with no air resistance.</li>
        </ul>
      </Definition>

      <PracticeProblems section="2.1–2.3 Kinematics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={63.7} unit="m" tolerance={0.02}
          hints={[
            'Use R = v₀² sin(2θ) / g. What is 2θ when θ = 45°?',
            'sin(90°) = 1, so the formula simplifies to R = v₀²/g.',
          ]}
          problemText="A ball is launched at 45° with v₀ = 25 m/s on flat ground. Find the range. (g = 9.81 m/s²)"
          solution={<>R = v₀² sin(2θ)/g = (25)² × sin(90°)/9.81 = 625/9.81 = <strong>63.7 m</strong>. Max height H = v₀² sin²(45°)/(2g) = 625×0.5/19.62 = 15.9 m.</>}>
          A ball is launched at 45° with v₀ = 25 m/s on flat ground. Find the <strong>range</strong>. (g = 9.81 m/s²)
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={19.8} unit="m/s" tolerance={0.02}
          hints={[
            'At the top of the arc, the vertical velocity is zero. Use v² = v₀² − 2gh.',
            'Set v = 0 and solve for v₀: v₀ = √(2gh).',
          ]}
          problemText="A ball is thrown straight upward and reaches a maximum height of 20 m. What was the initial upward velocity? (g = 9.81 m/s²)"
          solution={<>v² = v₀² − 2g·h → 0 = v₀² − 2(9.81)(20) → v₀ = √(392.4) = <strong>19.8 m/s</strong>.</>}>
          A ball is thrown straight upward and reaches a maximum height of 20 m. What was the initial upward velocity?
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={29.7} unit="m/s" tolerance={0.02}
          hints={[
            'A horizontal throw has vᵧ₀ = 0. Find the time to fall 80 m first.',
            'y = ½gt² → t = √(2h/g). Then vₓ = horizontal distance / t.',
          ]}
          problemText="A stone is thrown horizontally from the top of a building 80 m tall. It must land at least 120 m horizontally from the base. What minimum horizontal speed is needed? (g = 9.81 m/s²)"
          solution={<>Time to fall: t = √(2×80/9.81) = 4.04 s. Required speed: vₓ = 120/4.04 = <strong>29.7 m/s</strong>.</>}>
          A stone is thrown horizontally from the top of a building 80 m tall. What minimum horizontal speed is needed to land 120 m away?
        </InteractiveProblem>

        <InteractiveProblem n={4} difficulty="medium"
          answer={22.1} unit="m/s" tolerance={0.02}
          hints={[
            'The maximum range at any angle is achieved at θ = 45°, giving R_max = v₀²/g.',
            '20 m/s gives R_max = 400/9.81 = 40.8 m — not enough. Find v₀ = √(Rg) for R = 50 m.',
          ]}
          problemText="A ball is launched at v₀ = 20 m/s. A target is 50 m away on flat ground. The ball can't reach it. What is the minimum launch speed needed to reach the 50 m target? (g = 9.81 m/s²)"
          solution={<>Max range = v₀²/g at 45°. Need v₀² = Rg = 50 × 9.81 = 490.5 → v₀ = <strong>22.1 m/s</strong>. At 20 m/s, R_max is only 40.8 m.</>}>
          A target is 50 m away on flat ground. What is the minimum launch speed needed to reach it? (g = 9.81 m/s²)
        </InteractiveProblem>

        <Problem n={5} difficulty="hard"
          solution={<>Parametrize both with different angles θ₁ and θ₂ = π/2 − θ₁ (complementary). Range₁ = v₀² sin(2θ₁)/g. Range₂ = v₀² sin(2(90°−θ₁))/g = v₀² sin(180°−2θ₁)/g = v₀² sin(2θ₁)/g = Range₁. QED: sin(2θ) = sin(π − 2θ), so complementary angles always give equal range. However, H₁ = v₀² sin²(θ₁)/(2g) ≠ H₂ in general — they reach different heights.</>}>
          Prove algebraically that complementary launch angles (θ and 90° − θ) always produce the same range on flat ground. Do they also reach the same maximum height?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'The four kinematic equations apply whenever acceleration is constant.',
        'In projectile motion, horizontal and vertical components are independent — solve each axis separately.',
        'Range is maximized at θ = 45°; complementary angles give identical range.',
        'Trajectory shape is parabolic (quadratic in x).',
        "On the Moon (g = 1.62 m/s²), the same launch produces a 6× longer range than on Earth.",
      ]} />
    </div>
  );
}
