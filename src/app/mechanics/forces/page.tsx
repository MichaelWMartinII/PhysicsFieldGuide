import ForceDiagram from '@/components/sims/ForceDiagram';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals, HistoryNote
} from '@/components/textbook';

export default function ForcesPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: 'var(--def-accent)' }}>Classical Mechanics · Chapter 3</div>
      <h1>Newton&apos;s Laws</h1>
      <p className="subtitle">Three laws, written in <HistoryNote
        trigger="1687"
        title="The Principia"
      >
        Newton's Philosophiæ Naturalis Principia Mathematica unified terrestrial motion and celestial motion with the same mechanics.
        That was the move: apples and planets became one subject.
      </HistoryNote>, that governed all of physics for 230 years — and still govern most of engineering today.</p>

      <Prerequisites items={['Kinematics', 'Vectors', 'Basic algebra']} />

      <LearningGoals items={[
        'State Newton\'s three laws and identify the object each force acts on.',
        'Draw free-body diagrams that include every external force on one isolated object.',
        'Resolve forces into components and apply ΣF = ma along each axis.',
        'Distinguish static friction from kinetic friction and use the correct inequality or equation.',
        'Solve connected-body and incline problems with consistent sign conventions.',
      ]} />

      <h2>3.1 The Three Laws</h2>

      <HistoryNote year="1687" title="Why Newton's laws felt so radical">
        Before Newton, motion on Earth and motion in the heavens were usually treated as different kinds of phenomena.
        The Principia made the bolder claim: a thrown stone, the Moon, and Jupiter's moons all obey the same rules.
      </HistoryNote>

      <Theorem number="3.1" title="Newton's First Law — Inertia">
        An object at rest remains at rest, and an object in motion remains in uniform motion (constant
        velocity), unless acted upon by a net external force.
        <br /><br />
        This is a statement about inertial reference frames: in the absence of forces, objects maintain
        their state of motion. Inertia is the resistance to change — and it scales with mass.
      </Theorem>

      <Theorem number="3.2" title="Newton's Second Law — Force and Acceleration">
        The net force on an object equals its mass times acceleration:
        <span style={{ display: 'block', margin: '0.5rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          F_net = ma &nbsp;&nbsp;&nbsp; or &nbsp;&nbsp;&nbsp; ΣF = ma
        </span>
        More precisely, F_net = dp/dt (the rate of change of momentum). Force is a vector — direction matters.
        When multiple forces act, they add vectorially to give the net force.
      </Theorem>

      <Theorem number="3.3" title="Newton's Third Law — Action-Reaction">
        For every force exerted by object A on object B, there is an equal and opposite force exerted by
        B on A:
        <span style={{ display: 'block', margin: '0.5rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          F_{'{A on B}'} = −F_{'{B on A}'}
        </span>
        Critical: these forces act on <em>different</em> objects. A horse pulling a cart exerts a force
        on the cart; the cart exerts an equal force back on the horse. They don&apos;t cancel (they&apos;re on
        different objects) — which is why the horse-cart system can still accelerate.
      </Theorem>

      <h2>3.2 Free Body Diagrams</h2>

      <p>
        A free body diagram (FBD) is a sketch that shows a single object with all forces acting <em>on</em> it
        as labeled arrows. Drawing a correct FBD is the essential first step in any force problem.
      </p>

      <p>Rules for drawing FBDs:</p>
      <ol>
        <li>Isolate the object — draw a dot or simple shape representing it.</li>
        <li>Identify every force acting on that object (not forces it exerts on other things).</li>
        <li>Draw each force as an arrow from the object, with length proportional to magnitude.</li>
        <li>Label each force with its type and magnitude if known.</li>
        <li>Choose a coordinate system and resolve forces into components.</li>
      </ol>

      <h2>3.3 Friction</h2>

      <Definition number="3.1" title="Static and Kinetic Friction">
        Friction is the contact force that opposes relative sliding between surfaces.
        <ul style={{ marginTop: '0.5rem' }}>
          <li><strong>Static friction</strong> f_s ≤ μ_s N: prevents sliding. Adjusts to match applied force up to a maximum.</li>
          <li><strong>Kinetic friction</strong> f_k = μ_k N: constant once sliding begins. Always μ_k &lt; μ_s.</li>
        </ul>
        <span style={{ display: 'block', margin: '0.5rem 0 0.25rem 1rem', fontStyle: 'italic' }}>
          f_k = μ_k N = μ_k mg (on flat surface) &nbsp;&nbsp;&nbsp; direction: opposes motion
        </span>
      </Definition>

      <EqNumbered number="3.1" latex="a = \frac{F_\mathrm{applied} - \mu_k mg}{m} = \frac{F_\mathrm{applied}}{m} - \mu_k g" />

      <p>
        The block won&apos;t move at all if F_applied &lt; μ_s N. Once moving, use μ_k. In the simulation,
        we model the transition: if |v| &lt; 0.01 m/s and |F| &lt; μN, acceleration is zero.
      </p>

      <Figure number="3.1" caption="Force diagram simulation. Forces are drawn proportionally to magnitude. The velocity bar (top right) shows speed and direction. Negative applied force reverses the block.">
        <ForceDiagram />
      </Figure>

      <WorkedExample number="3.1" title="Block on an Incline">
        <p>A 5 kg block sits on a 30° incline with μ_k = 0.2. Find the acceleration down the slope.</p>
        <Step label="Weight components:">Along slope: mg sin30° = 5×9.81×0.5 = 24.5 N (down). Normal: N = mg cos30° = 5×9.81×0.866 = 42.5 N</Step>
        <Step label="Friction:">f_k = μN = 0.2×42.5 = 8.5 N (up the slope, opposing motion)</Step>
        <Step label="Net force:">F_net = 24.5 − 8.5 = 16 N (down slope)</Step>
        <Step label="Acceleration:">a = F_net/m = 16/5 = <strong style={{color:'var(--def-accent)'}}>3.2 m/s²</strong> (down the incline)</Step>
      </WorkedExample>

      <WorkedExample number="3.2" title="Atwood Machine">
        <p>Two masses m₁ = 3 kg and m₂ = 5 kg hang over a frictionless pulley. Find the acceleration and tension.</p>
        <Step label="System equation:">Net force = (m₂ − m₁)g = (5−3)×9.81 = 19.62 N. Total mass = 8 kg.</Step>
        <Step label="Acceleration:">a = (m₂−m₁)g/(m₁+m₂) = 19.62/8 = <strong>2.45 m/s²</strong></Step>
        <Step label="Tension:">From m₁: T − m₁g = m₁a → T = m₁(g+a) = 3×12.26 = <strong>36.8 N</strong></Step>
        <Step label="Verify from m₂:">m₂g − T = m₂a → T = m₂(g−a) = 5×7.36 = 36.8 N ✓</Step>
      </WorkedExample>

      <Definition number="3.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Third-law pairs do not cancel:</strong> they act on different objects.</li>
          <li><strong>Normal force is not always mg:</strong> inclines, elevators, and added vertical forces change it.</li>
          <li><strong>Static friction is an inequality:</strong> use f_s ≤ μ_sN until sliding begins.</li>
          <li><strong>Choose axes intelligently:</strong> for inclines, align one axis along the slope.</li>
          <li><strong>Tension is shared only under assumptions:</strong> massless rope and frictionless pulley make the tension uniform.</li>
        </ul>
      </Definition>

      <PracticeProblems section="3.1–3.3 Newton's Laws">
        <InteractiveProblem n={1} difficulty="easy"
          answer={3835} unit="N" tolerance={0.02}
          hints={['F_engine = ma + f_friction. Rolling friction f = μmg.']}
          problemText="A 1200 kg car accelerates at 3 m/s². Rolling friction μ = 0.02. What engine force (N) is required?"
          solution={<>F_net = ma = 1200×3 = 3600 N. Friction: f = μmg = 0.02×1200×9.81 = 235 N. F_engine = 3600 + 235 = <strong>3,835 N</strong>.</>}>
          A 1,200 kg car accelerates at 3 m/s². Rolling friction coefficient is 0.02. What force must the engine provide?
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={200} unit="N" tolerance={0.02}
          hints={['Check if 200 N exceeds μ_s mg. If not, static friction equals the applied force exactly.']}
          problemText="An 80 kg block (μ_s = 0.4) has 200 N applied horizontally. The block does not move. What is the friction force (N)?"
          solution={<>Max static friction = μ_s mg = 0.4×80×9.81 = 314 N &gt; 200 N, so block stays put. Static friction = <strong>200 N</strong> (equal and opposite to the applied force).</>}>
          An 80 kg block sits on a surface with μ_s = 0.4. A 200 N force is applied horizontally. Does the block move? If not, what is the friction force?
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>On incline angle θ: weight along slope = mg sinθ, normal = mg cosθ, friction = μmg cosθ. For equilibrium: mg sinθ = μmg cosθ → tan θ = μ = 0.35 → θ = arctan(0.35) = <strong>19.3°</strong>. Note: mass cancels! The critical angle is independent of mass.</>}>
          A box (μ_s = 0.35) just starts to slide when an incline is tilted to angle θ. Find θ. Interestingly, the answer is independent of mass — explain why.
        </Problem>

        <Problem n={4} difficulty="medium"
          solution={<>Tension T is the same throughout (massless rope). For m₁ (on table): T = m₁a. For m₂ (hanging): m₂g − T = m₂a. Adding: m₂g = (m₁+m₂)a → a = m₂g/(m₁+m₂) = 3×9.81/(5+3) = 3.68 m/s². T = 5×3.68 = <strong>18.4 N</strong>.</>}>
          A 5 kg block sits on a frictionless table, connected by a rope over a frictionless pulley to a hanging 3 kg mass. Find the acceleration and rope tension.
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>Three forces: gravity mg down, normal N perpendicular to slope, friction f up the slope (opposing downward slide). Resolving perpendicular to slope: N = mg cos θ. Along slope: mg sin θ − f = ma. For constant velocity, a = 0: f = mg sin θ. But f = μN = μmg cos θ. So μ = sin θ/cos θ = tan θ. For θ = 25°: μ_k = tan 25° = <strong>0.466</strong>. (This is the most elegant derivation of μ for sliding at constant speed.)</>}>
          A block slides at constant velocity down a 25° incline. Derive the kinetic friction coefficient μ_k purely from the angle. (Hint: draw the FBD and apply Newton&apos;s 2nd law with a = 0.)
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        "Newton's 1st: Objects resist changes in motion (inertia). Force is needed to change velocity.",
        "Newton's 2nd: F_net = ma is the quantitative link between force and motion.",
        "Newton's 3rd: Forces come in pairs — but they act on different objects, so they don't cancel.",
        'Free body diagrams: isolate one object, draw all forces acting ON it, resolve components.',
        'Static friction ≤ μ_s N prevents motion; kinetic friction = μ_k N (always < μ_s) resists sliding.',
      ]} />
    </div>
  );
}
