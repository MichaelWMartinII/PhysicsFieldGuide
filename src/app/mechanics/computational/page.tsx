import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function ComputationalPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#3b82f6' }}>Classical Mechanics · Advanced Topics</div>
      <h1>Computational Physics</h1>
      <p className="subtitle">
        Computational physics bridges theory and experiment — solving equations that cannot
        be solved analytically, simulating systems too complex for closed-form treatment,
        and testing theoretical predictions with numerical precision. It is now a third
        pillar of physics alongside theory and experiment.
      </p>

      <Prerequisites items={['Differential equations (Ch. DE)', 'Linear algebra (Ch. LA)', 'Fourier analysis (Ch. F)', 'Lagrangian mechanics (Ch. LA-Mech)']} />

      <LearningGoals items={[
        'Implement and compare Euler, Verlet, and RK4 integrators and explain why symplectic methods conserve energy over long times.',
        'Derive the von Neumann stability condition for explicit finite-difference schemes and state when Crank-Nicolson is preferred.',
        'Apply the Metropolis algorithm to sample the Boltzmann distribution and identify the role of the acceptance probability e^(−ΔE/kT).',
        'Describe molecular dynamics simulations: force evaluation, Nosé-Hoover thermostats, and the O(N log N) neighbor-list optimisation.',
        'Explain spectral (pseudospectral) methods and why they achieve exponential convergence for smooth periodic problems.',
      ]} />

      <h2>CP.1 Numerical Integration of ODEs</h2>

      <p>
        Most physics problems reduce to ODEs: ẋ = f(x, t). The simplest integrator:
      </p>

      <EqNumbered number="CP.1" latex="x_{n+1}=x_n+h f(x_n,t_n)+O(h^2) \qquad \text{(Euler method, first order)}" />

      <p>
        Euler is first-order accurate (local error O(h²), global O(h)). For conservative
        systems it does not preserve energy. The <strong>Leapfrog/Störmer-Verlet</strong> method:
      </p>

      <EqNumbered number="CP.2" latex="x_{n+1}=2x_n-x_{n-1}+h^2a(x_n) \qquad \text{(Störmer-Verlet, symplectic)}" />

      <p>
        Verlet is second-order and <strong>symplectic</strong> — it preserves the Poincaré
        invariants (area in phase space) and exhibits bounded energy drift instead of
        accumulating error. Essential for long-time integrations (molecular dynamics, orbital mechanics).
      </p>

      <p>
        The <strong>Runge-Kutta 4th order (RK4)</strong> method is the workhorse for
        non-conservative problems:
      </p>

      <EqNumbered number="CP.3" latex="x_{n+1}=x_n+\frac{h}{6}(k_1+2k_2+2k_3+k_4)+O(h^5)" />

      <p>
        where k₁ = f(x_n, t_n), k₂ = f(x_n + hk₁/2, t_n + h/2), etc. Fourth-order accurate.
        Adaptive step-size control: use embedded methods (Runge-Kutta-Fehlberg RK45) that
        estimate local error and adjust h automatically.
      </p>

      <h2>CP.2 Finite Difference Methods for PDEs</h2>

      <p>
        Replace continuous derivatives with finite differences on a grid (spacing Δx, Δt):
      </p>

      <EqNumbered number="CP.4" latex="\frac{\partial^2u}{\partial x^2}\approx\frac{u_{i+1}-2u_i+u_{i-1}}{\Delta x^2} \qquad \text{(second derivative, centered)}" />

      <p>
        <strong>1D Heat equation</strong> ∂u/∂t = D ∂²u/∂x²:
        Explicit FTCS: u_(i,n+1) = uᵢₙ + r(u_(i-1,n) − 2u_(i,n) + u_(i+1,n))
        where r = DΔt/Δx². Stability requires r ≤ 1/2 (von Neumann analysis).
        Implicit Crank-Nicolson: r ≤ ∞ (unconditionally stable, second order in both t and x).
      </p>

      <p>
        <strong>Wave equation</strong> ∂²u/∂t² = c² ∂²u/∂x²:
        FTCS explicit: u_(i,n+1) = 2u_(i,n) − u_(i,n-1) + s²(u_(i+1,n) − 2u_(i,n) + u_(i-1,n))
        where s = cΔt/Δx (CFL number). Stability requires s ≤ 1 (Courant-Friedrichs-Lewy condition).
      </p>

      <WorkedExample number="CP.1" title="Orbital Mechanics with Verlet Integration">
        <p>
          Simulate Earth&apos;s orbit around the Sun using Störmer-Verlet with adaptive timestep.
        </p>
        <Step label="Units:">Astronomical units: 1 AU = 1.496×10¹¹ m, 1 yr = 3.156×10⁷ s. In these units: G M_Sun = 4π² AU³/yr² (from T² = (4π²/GM)a³ with T=1yr, a=1AU).</Step>
        <Step label="Verlet:">x_(n+1) = 2x_n − x_(n-1) + h² a(x_n). a = −GM/r³ × r (vector). For Earth: starts at (1,0) AU with velocity (0, 2π) AU/yr.</Step>
        <Step label="Energy conservation:">E = ½v² − GM/r. With Euler: E drifts linearly. With Verlet: E oscillates but remains bounded — crucial for multi-year integrations. For Mercury precession: need GR correction a_GR = a_Newton × (1 + 3v²/c² + ...) to get 43″/century.</Step>
        <Step label="Accuracy:">With h = 0.01 yr and Verlet: period error ~10⁻⁶. With h = 0.01 yr and Euler: period error ~10⁻³. For the full Solar System (N-body), use REBOUND or similar symplectic N-body code. Mercury&apos;s orbit unstable on 10⁹ yr timescales (Laskar & Gastineau, 2009).</Step>
      </WorkedExample>

      <h2>CP.3 Monte Carlo Methods</h2>

      <p>
        <strong>Monte Carlo integration</strong>: estimate ∫ f(x) dx by sampling random
        points. For d dimensions, the error scales as N^(−1/2) independent of d — far better
        than grid methods (which scale as N^(−2/d) in d dimensions, becoming useless for d ≫ 3).
      </p>

      <p>
        <strong>Markov Chain Monte Carlo (MCMC)</strong> — Metropolis algorithm:
        Generate trial move x → x&apos;. Accept if E(x&apos;) &lt; E(x). If E(x&apos;) &gt; E(x):
        accept with probability e^(−ΔE/(k_BT)). This samples the Boltzmann distribution P ∝ e^(−E/(k_BT)).
      </p>

      <EqNumbered number="CP.5" latex="P_\mathrm{accept}=\min\left(1,e^{-\Delta E/(k_BT)}\right) \qquad \text{(Metropolis acceptance criterion)}" />

      <p>
        Applications: the Ising model (compute phase transition), protein conformation sampling,
        Bayesian posterior sampling, path integrals (lattice QCD computes hadron masses this way).
      </p>

      <p>
        <strong>Quantum Monte Carlo</strong> (diffusion Monte Carlo, variational MC): computes
        exact ground state energies for quantum many-body systems. The Schrödinger equation
        in imaginary time τ = it: ∂ψ/∂τ = −Hψ → the long-time solution is the ground state
        (exponentially grows for ground state, decays for excited states). Treat this as a
        diffusion equation with source/sink from the potential.
      </p>

      <h2>CP.4 Molecular Dynamics</h2>

      <p>
        Molecular dynamics (MD): integrate Newton&apos;s equations for N interacting particles.
        Force: F_i = −∂U/∂r_i where U = Σ V(rᵢⱼ) (pair potential).
        Lennard-Jones potential: V(r) = 4ε[(σ/r)¹² − (σ/r)⁶] (repulsion + attraction).
      </p>

      <p>
        Typical MD: N = 10⁴–10⁷ atoms, timestep h = 1 fs (10⁻¹⁵ s),
        total time 1 ns–1 μs. The key challenge: force calculation scales as O(N²) naively
        → reduced to O(N log N) with Verlet neighbor lists and particle-mesh Ewald for electrostatics.
      </p>

      <p>
        <strong>Thermostats</strong> control temperature by coupling to a heat bath:
        Nosé-Hoover (NVT ensemble), Langevin dynamics (adds friction and random force).
        <strong>Barostats</strong> control pressure (NPT). Most biological simulations use NPT.
      </p>

      <h2>CP.5 Spectral Methods and FFT</h2>

      <p>
        For periodic boundary conditions or smooth solutions, expand in Fourier modes.
        Derivatives become multiplications: (d^n f/dx^n)_k = (ik)^n f_k.
        The FFT computes all N Fourier coefficients in O(N log N) time.
      </p>

      <p>
        <strong>Pseudospectral method</strong>: advance in time in real space (simple);
        compute derivatives in k-space (accurate). For Navier-Stokes turbulence:
        dealiasing (2/3 rule removes aliasing error). Spectral accuracy: error ∝ e^(−cN) for
        smooth functions (exponential convergence vs. algebraic for finite differences).
      </p>

      <p>
        <strong>DMRG (Density Matrix Renormalization Group):</strong> O(D³) algorithm to
        find ground states of 1D quantum systems with matrix product states (MPS). D is the
        bond dimension. For gapped systems: D grows slowly with system size (area law of entanglement).
        Extends to 2D (PEPS) and to finite T (MERA, MPO thermofield). State of the art for
        1D quantum chemistry.
      </p>

      <Definition number="CP.1" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Small timestep is not a proof of correctness:</strong> check convergence by reducing h and comparing invariants.</li>
          <li><strong>Euler is rarely acceptable for long conservative dynamics:</strong> energy drift can dominate the physics.</li>
          <li><strong>Stability and accuracy differ:</strong> a stable finite-difference scheme can still be too inaccurate.</li>
          <li><strong>Random sampling needs equilibration:</strong> discard burn-in and account for autocorrelation.</li>
          <li><strong>Spectral methods assume smoothness:</strong> discontinuities cause ringing and destroy exponential convergence.</li>
        </ul>
      </Definition>

      <PracticeProblems section="CP.1–CP.5 Computational Physics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={2.006} unit="s" tolerance={0.01}
          hints={['Small-angle period: T = 2π√(L/g). With L = 1 m and g = 9.8 m/s².', 'The large-amplitude correction adds ~3.9% at θ₀ = 45°, making T ≈ 2.08 s.']}
          problemText="A simple pendulum has length L = 1 m. What is the small-angle period T in seconds? Then estimate the large-amplitude correction for θ₀ = π/4."
          solution={<>RK4 for simple pendulum: θ̈ = −(g/L) sin θ. Let y₁ = θ, y₂ = θ̇. f₁ = y₂, f₂ = −(g/L) sin y₁. RK4 step with h = 0.01 s, L = 1 m, g = 9.8: k₁ = (y₂, −9.8 sin y₁). At θ₀ = π/4 = 0.785, θ̇₀ = 0: k₁ = (0, −9.8 × 0.707) = (0, −6.93). k₂ = f(y + h k₁/2) with y₁_mid = 0.785 + 0.005×0 = 0.785, y₂_mid = 0 + 0.005×(−6.93) = −0.0347. k₂ = (−0.0347, −9.8 sin(0.785)) = (−0.0347, −6.93). k₃ similarly ≈ k₂ (small h). k₄ = f(y + h k₃). Final: y₁(h) = 0.785 + 0.01×(0 + 2×(−0.0347) + 2×(−0.0347) + ...)/ 6 ≈ 0.785 − 0.0001 = 0.7849. Energy check: E = ½L²θ̇² + gL(1−cosθ). With exact h (small angle): T = 2π√(L/g) = 2.006 s. Large amplitude correction: T = T₀(1 + θ₀²/16 + ...) = 2.006 × 1.039 ≈ 2.08 s (5% correction for θ₀=45°). RK4 with h=0.01 s gives period error &lt; 10⁻⁵.</>}>
          Implement one step of RK4 for the nonlinear pendulum θ̈ = −(g/L)sinθ with θ₀ = π/4, θ̇₀ = 0, h = 0.01 s. What is the small-angle period T (s) for L = 1 m?
        </InteractiveProblem>

        <Problem n={2} difficulty="medium"
          solution={<>1D heat equation with finite differences: ∂T/∂t = α ∂²T/∂x², α = thermal diffusivity. Domain: 0 ≤ x ≤ L, T(0,t) = T(L,t) = 0 (fixed endpoints), T(x,0) = T₀ sin(πx/L). Exact solution: T(x,t) = T₀ sin(πx/L) e^(−α π² t/L²). Stability of explicit FTCS: r = α Δt/Δx². Von Neumann analysis: G = 1 − 4r sin²(k Δx/2). Stable if |G| ≤ 1 for all k → r ≤ 1/2. For α = 10⁻⁶ m²/s, L = 1m, Δx = 0.01m: Δt_max = 0.5×(0.01)²/(10⁻⁶) = 50 s. Crank-Nicolson (implicit): u_(i,n+1) − r/2 × (u_(i+1,n+1) − 2u_(i,n+1) + u_(i-1,n+1)) = u_(i,n) + r/2 × (u_(i+1,n) − 2u_(i,n) + u_(i-1,n)). Tridiagonal system → O(N) solve. Unconditionally stable, can use Δt = 500 s (10× larger) with same accuracy. Error after t=1000s: explicit vs CN vs exact — CN is 2nd order in both t and x.</>}>
          Write the FTCS finite difference scheme for the 1D heat equation. Derive the stability condition r ≤ 1/2. How does Crank-Nicolson improve on this?
        </Problem>

        <Problem n={3} difficulty="medium"
          solution={<>Metropolis Monte Carlo for 2D Ising model. Initialize N×N lattice of spins ±1 at random (or all +1). Energy: E = −J Σ_(nn) sᵢ sⱼ. Metropolis step: (1) Pick random spin i. (2) Compute ΔE = energy if spin flipped = 2J sᵢ(Σ_nn sⱼ). (3) If ΔE ≤ 0: flip. Else: flip with prob e^(-ΔE/T). (4) Repeat. Efficient: ΔE only has 5 values (−8J,−4J,0,4J,8J for 2D square), precompute exp(-ΔE/T). Measurement: compute ⟨m⟩ = ⟨|ΣSᵢ|⟩/N², ⟨E⟩/N², and their variances for χ and C. Critical slowing down near T_C: correlation time τ ∝ ξ^z where z ≈ 2.17 (2D Ising). At T_C (= 2J/ln(1+√2) ≈ 2.269J/k_B): need ~10⁶ sweeps for good statistics on 128×128 lattice. Cluster algorithms (Wolff, Swendsen-Wang): flip correlated clusters of spins at once → τ ~ 1 at T_C. 1000× speedup near T_C.</>}>
          Describe the Metropolis algorithm for the 2D Ising model. What is critical slowing down and how do cluster algorithms solve it?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>FFT and pseudospectral for 1D Burgers equation: ∂u/∂t + u ∂u/∂x = ν ∂²u/∂x². In k-space: ∂û_k/∂t = −ik (u ∂u/∂x)_k − νk² û_k. The nonlinear term: compute u and u_x in real space, multiply, FFT back. Pseudospectral: dealiasing by zeroing modes |k| &gt; N/3 (2/3 rule prevents aliasing from convolution). Time integration: RK4 in k-space (stiff ν k² term → integrating factor: û_k(t) = e^(-νk²t) v_k(t), compute dv_k/dt = RHS without the stiff term). For ν → 0 (inviscid Burgers): shock develops at t_shock = 1/(max |du₀/dx|). Shock width scales as ν (diffusion must balance nonlinear steepening in Burgers). Resolution N must satisfy k_max × shock_width ~ 1 → N ~ L/(ν t_shock). For turbulence: similar structure, 3D, additional stretching term ω·∇u in vorticity. DNS requires N³ ∝ Re^(9/4) grid points → impractical for Re &gt; 10⁴ → need LES or turbulence models.</>}>
          Describe a pseudospectral method for the 1D Burgers equation ∂u/∂t + u∂u/∂x = ν∂²u/∂x². How is the stiff viscous term handled? What is the resolution requirement as ν → 0?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Verlet/leapfrog: symplectic integrator preserving phase space volume. Essential for Hamiltonian systems.',
        'RK4: fourth-order, general purpose. Adaptive step-size (RK45) controls global error automatically.',
        'FD stability: FTCS heat eq requires r ≤ 1/2. Wave eq: CFL s ≤ 1. Crank-Nicolson: unconditionally stable.',
        'Metropolis MCMC: accept always if ΔE ≤ 0; accept e^(-ΔE/kT) if ΔE &gt; 0. Samples Boltzmann distribution.',
        'FFT: O(N log N). Pseudospectral: exponential accuracy for smooth problems + 2/3 dealiasing rule.',
        'DMRG: O(D³) ground states of 1D quantum systems. MPS/PEPS are tensor network representations.',
      ]} />
    </div>
  );
}
