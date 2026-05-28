import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function FluidMechanicsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#3b82f6' }}>Classical Mechanics · Upper Division</div>
      <h1>Fluid Mechanics</h1>
      <p className="subtitle">
        Fluids are continuous media described by field equations — the Navier-Stokes equations
        — that govern everything from blood flow to ocean currents to atmospheric weather,
        and remain one of the great unsolved problems of mathematics.
      </p>

      <Prerequisites items={['Newton\'s laws (Ch. 3)', 'Vectors and calculus (Ch. 21-22)', 'Partial differential equations']} />

      <LearningGoals items={[
        'Distinguish Eulerian and Lagrangian descriptions and write the material derivative D/Dt in terms of partial derivatives.',
        'Derive the continuity equation for a compressible fluid and state the incompressibility condition ∇·v = 0.',
        'Apply Bernoulli\'s equation to find flow velocities and pressure differences in steady, inviscid, incompressible flow.',
        'Define the Reynolds number and use it to classify flow regimes from creeping (Stokes) to fully turbulent.',
        'Explain Prandtl\'s boundary layer concept and the δ ∝ √(νx/U) scaling for a flat plate.',
      ]} />

      <h2>FM.1 Kinematics and the Continuity Equation</h2>

      <p>
        A fluid is described by the <strong>velocity field</strong> v(r, t) — the velocity of
        the fluid element at position r at time t. Two frames of description:
      </p>

      <p>
        <strong>Eulerian:</strong> fixed position r, varying t. What velocity do we observe at
        a fixed point in space? The relevant time derivative is ∂/∂t (local).
      </p>

      <p>
        <strong>Lagrangian:</strong> follow a fluid parcel. The <strong>material derivative</strong>
        (rate of change following the fluid) is:
      </p>

      <EqNumbered number="FM.1" latex="\frac{D}{Dt} = \frac{\partial}{\partial t} + \mathbf{v}\cdot\nabla \qquad \text{(material/substantial derivative)}" />

      <p>
        Mass conservation gives the <strong>continuity equation</strong>:
      </p>

      <EqNumbered number="FM.2" latex="\frac{\partial \rho}{\partial t} + \nabla\cdot(\rho\mathbf{v}) = 0 \qquad \text{(continuity, compressible)}" />

      <p>
        For an incompressible fluid (ρ = const): ∇·v = 0 — the flow is divergence-free.
        This holds for liquids and subsonic gas flows.
      </p>

      <h2>FM.2 Euler and Navier-Stokes Equations</h2>

      <p>
        Newton&apos;s second law for a fluid element, including pressure and viscosity:
      </p>

      <EqNumbered number="FM.3" latex="\rho\left(\frac{\partial \mathbf{v}}{\partial t}+(\mathbf{v}\cdot\nabla)\mathbf{v}\right) = -\nabla P + \eta\nabla^2\mathbf{v} + \rho\mathbf{g} \qquad \text{(Navier-Stokes)}" />

      <p>
        For inviscid flow (η = 0): <strong>Euler&apos;s equation</strong>. The nonlinear term (v·∇)v
        is the inertial term — it causes turbulence, vortex stretching, and makes Navier-Stokes
        brutally difficult. Whether smooth solutions always exist in 3D is one of the
        Millennium Prize Problems (unsolved, $1M prize).
      </p>

      <Definition number="FM.1" title="Reynolds Number">
        The Reynolds number Re = ρvL/η = vL/ν (ν = η/ρ is kinematic viscosity) measures
        the ratio of inertial to viscous forces:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          Re = (inertial force) / (viscous force) = ρv²L² / (ηvL) = ρvL/η
        </span>
        Re ≪ 1: viscous dominates (Stokes flow — creeping, reversible, sperm swimming).
        Re ≫ 1: inertial dominates (turbulent, mixing, aircraft).
        Transition: Re ≈ 2300 for pipe flow, ~10⁵ for flat plate boundary layer.
      </Definition>

      <h2>FM.3 Bernoulli&apos;s Equation</h2>

      <p>
        For inviscid, steady, incompressible flow along a streamline:
      </p>

      <EqNumbered number="FM.4" latex="P + \frac{1}{2}\rho v^2 + \rho gh = \mathrm{constant} \qquad \text{(Bernoulli's equation)}" />

      <p>
        This is energy conservation for fluid elements. Bernoulli&apos;s principle — faster flow,
        lower pressure — explains airfoil lift (wing), carburetor operation, and the Venturi
        effect. It is derived from Euler&apos;s equation by integration along a streamline.
      </p>

      <WorkedExample number="FM.1" title="Torricelli's Law">
        <p>
          A large tank has a small hole at depth h below the surface. Find the exit velocity.
        </p>
        <Step label="Apply Bernoulli:">At surface: P = P_atm, v ≈ 0 (large tank), height = h. At hole: P = P_atm, height = 0.</Step>
        <Step label="Bernoulli:">P_atm + 0 + ρgh = P_atm + ½ρv²_exit + 0</Step>
        <Step label="Result:">v_exit = √(2gh) &nbsp;&nbsp; (Torricelli&apos;s law, 1643)</Step>
        <Step label="Same as projectile:">This is the velocity a ball acquires falling freely a height h — as if the water fell freely. Discharge rate: Q = A_hole × v_exit = A_hole √(2gh).</Step>
      </WorkedExample>

      <h2>FM.4 Vorticity and Potential Flow</h2>

      <p>
        The <strong>vorticity</strong> ω = ∇ × v measures local rotation of the fluid.
        For irrotational flow (ω = 0): v = ∇φ for a <strong>velocity potential</strong> φ.
        Combined with incompressibility (∇·v = 0):
      </p>

      <EqNumbered number="FM.5" latex="\nabla^2\phi = 0 \qquad \text{(Laplace's equation for potential flow)}" />

      <p>
        Potential flow is solved by the same methods as electrostatics! A cylinder in uniform
        flow U_∞ has solution φ = U_∞ r(1 + R²/r²) cos θ — D&apos;Alembert&apos;s paradox: no drag.
        Real fluids have viscous boundary layers that separate, creating drag — potential flow
        misses this entirely. Adding circulation Γ (rotation around the cylinder) gives lift:
      </p>

      <EqNumbered number="FM.6" latex="L = \rho U_\infty \Gamma \qquad \text{(Kutta-Joukowski theorem)}" />

      <WorkedExample number="FM.2" title="Stokes Drag on a Sphere">
        <p>
          For very viscous flow (Re ≪ 1) past a sphere of radius R moving at velocity U,
          the drag force is:
        </p>
        <Step label="Stokes flow solution:">In the Stokes limit, drop the inertial term in N-S: η∇²v = ∇P. Solve with no-slip BC at sphere surface.</Step>
        <Step label="Stokes drag formula:">F_drag = 6πηRU</Step>
        <Step label="Terminal velocity:">For a sphere of density ρ_s in fluid ρ_f: weight − buoyancy = drag → (4/3)πR³(ρ_s − ρ_f)g = 6πηRU → U_terminal = 2R²(ρ_s−ρ_f)g/(9η)</Step>
        <Step label="Example:">Rain drop R=1mm, ρ_water = 1000, ρ_air = 1.2 kg/m³, η_air = 1.8×10⁻⁵ Pa·s. U = 2(10⁻³)²×999×9.8/(9×1.8×10⁻⁵) ≈ 12 m/s. (Re = ρvR/η ≈ 800 — Stokes is not valid here; the actual terminal velocity with form drag correction is ~9 m/s.)</Step>
      </WorkedExample>

      <Definition number="FM.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Eulerian and Lagrangian are viewpoints:</strong> fixed-point derivatives and parcel-following derivatives are not the same.</li>
          <li><strong>Incompressible does not mean densityless:</strong> it means density of each parcel is constant, giving ∇·v = 0.</li>
          <li><strong>Bernoulli has assumptions:</strong> steady, inviscid, incompressible flow along a streamline.</li>
          <li><strong>High Reynolds number does not mean no viscosity:</strong> viscosity may dominate thin boundary layers.</li>
          <li><strong>Potential flow misses drag:</strong> real drag often comes from viscosity, separation, and wake formation.</li>
        </ul>
      </Definition>

      <PracticeProblems section="FM.1–FM.4 Fluid Mechanics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={1.8} unit="L/s" tolerance={0.05}
          hints={['Use continuity A₁v₁ = A₂v₂ and Bernoulli P₁ + ½ρv₁² = P₂ + ½ρv₂².', 'ΔP = ½ρ v₁²((r₁/r₂)⁴ − 1). Solve for v₁ then Q = A₁ v₁. With r₁ = 5 cm, r₂ = 2 cm, (r₁/r₂)⁴ = 39.1.']}
          problemText="A Venturi meter has upstream radius 5 cm, throat radius 2 cm, and pressure difference 1000 Pa. Find the volume flow rate Q in L/s for water (ρ = 1000 kg/m³)."
          solution={<>Venturi meter: narrow throat at radius r₂ &lt; r₁ (upstream). Continuity: A₁v₁ = A₂v₂ → v₂ = v₁(r₁/r₂)². Bernoulli (horizontal): P₁ + ½ρv₁² = P₂ + ½ρv₂². ΔP = P₁−P₂ = ½ρ(v₂²−v₁²) = ½ρv₁²((r₁/r₂)⁴−1). v₁ = √(2ΔP/(ρ((r₁/r₂)⁴−1))). Volume flow: Q = A₁v₁. For r₁=5cm, r₂=2cm, ΔP=1000 Pa, ρ=1000kg/m³: (r₁/r₂)⁴ = (2.5)⁴ = 39.1. v₁ = √(2000/(1000×38.1)) = √0.0525 = 0.229 m/s. Q = π(0.05)²×0.229 = 1.8×10⁻³ m³/s = 1.8 L/s. The Venturi effect is also used in aircraft carburetors (the airflow through a constriction draws fuel into the intake) and in jet pumps (high-velocity jet entrains surrounding fluid).</>}>
          A Venturi meter has upstream radius 5 cm and throat radius 2 cm. The pressure difference is 1000 Pa. Find the flow velocity and volume flow rate Q (L/s) for water.
        </InteractiveProblem>

        <Problem n={2} difficulty="medium"
          solution={<>Vortex line: v = Γ/(2πr) in θ-direction. ∇×v = ω = Γδ²(r) ẑ (all vorticity concentrated at core). By Kelvin&apos;s circulation theorem (inviscid): Γ = ∮v·dl = const following fluid parcel. Two vortices with circulation Γ₁ and Γ₂ separated by distance d: each is advected by the velocity field of the other. Γ₁=Γ₂=Γ (like-sign): orbit each other at frequency ω = Γ/(πd²). Γ₁=Γ, Γ₂=−Γ (opposite): translate at velocity U = Γ/(2πd) (vortex pair, airplane wing tip vortices). Vortex ring (closed loop): self-propels at U = Γ/(4πR)(ln(8R/a)−1/2) where R is ring radius, a is core radius. Smoke rings, dolphin bubble rings, and the starting vortex in airplane takeoff all follow this physics.</>}>
          Describe the dynamics of two parallel line vortices with circulations ±Γ separated by distance d. What happens if both have the same sign? Opposite signs?
        </Problem>

        <Problem n={3} difficulty="medium"
          solution={<>Boundary layer: near a flat plate at Re≫1, viscous effects confined to thin layer. Prandtl (1904): outside layer, potential flow. Inside: viscous-inertial balance. Thickness δ ~ √(νx/U) (grows as √distance). Similarity solution: ψ = √(νUx) f(η), η = y/√(νx/U). Blasius equation: 2f''' + f f'' = 0 (nonlinear ODE). Drag: τ_wall = ρU²/(2)×0.664/√Re_x. Total drag: F = 0.664 bρU²L√(Re_L)^(-1/2) for plate of width b, length L. At Re_x ≈ 5×10⁵: transition to turbulent. Turbulent BL: δ ∝ x^(4/5) (thicker), more drag. Separation: adverse pressure gradient (decelerating flow) reverses near-wall flow → wake → form drag. Design of airfoils is about delaying separation to maximize lift/drag ratio.</>}>
          Describe the Prandtl boundary layer. How does the thickness δ scale with distance x along a flat plate? When does the boundary layer separate?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Turbulence — Kolmogorov theory (1941): energy cascades from large scales L (energy injection) to small scales η (dissipation). Power spectrum E(k) ∝ k^(−5/3) in the inertial range (Kolmogorov -5/3 law). Argument: in inertial range, energy flux ε (W/kg) is constant. On dimensional grounds: E(k) = Cε^(2/3) k^(−5/3) where C ≈ 1.5 (Kolmogorov constant). Dissipation scale: η = (ν³/ε)^(1/4) (Kolmogorov microscale). For atmospheric turbulence: L~1km, η~1mm, ratio L/η = Re^(3/4) ≈ 10⁶ scales across 6 decades! DNS (direct numerical simulation) must resolve all scales → requires grid ~Re^(9/4) points → impossible at atmospheric Re. LES (large eddy simulation) resolves large scales, models small. Turbulence is the hardest problem in classical mechanics — no analytic theory exists for Re≫1 flows.</>}>
          State Kolmogorov&apos;s theory of turbulence and the -5/3 power law for the energy spectrum. What determines the smallest and largest scales? Why is turbulence computationally intractable?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Material derivative: D/Dt = ∂/∂t + v·∇ (rate of change following fluid parcel).',
        'Continuity: ∂ρ/∂t + ∇·(ρv) = 0. Incompressible: ∇·v = 0.',
        'Navier-Stokes: ρ Dv/Dt = −∇P + η∇²v + ρg. Nonlinear, unsolved in 3D.',
        'Reynolds number Re = ρvL/η: Re≪1 laminar (Stokes), Re≫1 turbulent.',
        'Bernoulli (inviscid, steady): P + ½ρv² + ρgh = const along streamline.',
        'Potential flow: ∇²φ = 0 = electrostatics. Kutta-Joukowski: L = ρU∞Γ.',
      ]} />
    </div>
  );
}
