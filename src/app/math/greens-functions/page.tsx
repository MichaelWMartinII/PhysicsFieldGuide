import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function GreensFunctionsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#06b6d4' }}>Mathematics · Advanced Topics</div>
      <h1>Green&apos;s Functions</h1>
      <p className="subtitle">
        The Green&apos;s function is the response of a linear system to a point source — an impulse.
        Once known, the response to any source is a superposition. Green&apos;s functions unify
        potential theory, wave propagation, heat conduction, and quantum propagators.
      </p>

      <Prerequisites items={['Differential equations (Ch. DE)', 'Complex analysis (Ch. CA)', 'Fourier analysis (Ch. F)', 'Electrostatics (Ch. ES)']} />

      <LearningGoals items={[
        'Define the Green\'s function G via LG = δ(r − r\') and use superposition to write the general solution as a convolution with the source.',
        'Derive the 3D free-space Laplacian Green\'s function G = 1/(4π|r − r\'|) and connect it to Coulomb\'s law and the method of images.',
        'Write the outgoing Helmholtz Green\'s function G⁺ = e^(ik|r−r\'|)/(4π|r−r\'|) and use its far-field expansion to derive the Born scattering amplitude.',
        'Find the retarded Green\'s function for a driven harmonic oscillator and express the solution as a convolution of the driving force with sin(ω₀t)/(mω₀).',
        'State the spectral (Lehmann) representation G⁺(E) = Σ|n⟩⟨n|/(E − Eₙ + iε) and identify poles as energy levels and Im G as the density of states.',
      ]} />

      <h2>GF.1 Motivation — The Impulse Response</h2>

      <p>
        Consider a linear differential operator L acting on functions of position (or time).
        The <strong>Green&apos;s function</strong> G(r, r&apos;) is defined by:
      </p>

      <EqNumbered number="GF.1">L G(r, r') = δ(r − r') &nbsp;&nbsp;&nbsp; (defining equation for the Green's function)</EqNumbered>

      <p>
        Once G is known, the solution to L u = f(r) with appropriate boundary conditions is:
      </p>

      <EqNumbered number="GF.2">u(r) = ∫ G(r, r') f(r') d³r' &nbsp;&nbsp;&nbsp; (superposition principle)</EqNumbered>

      <p>
        Physical interpretation: f(r) is a source distribution. G(r, r&apos;) is the response at r
        due to a point source at r&apos;. The total response is the sum (integral) over all sources.
        This is the mathematical expression of the superposition principle for linear systems.
      </p>

      <p>
        <strong>Reciprocity:</strong> for self-adjoint operators, G(r, r&apos;) = G(r&apos;, r) —
        the response at r due to a source at r&apos; equals the response at r&apos; due to a source at r.
      </p>

      <h2>GF.2 Poisson&apos;s Equation — Electrostatics</h2>

      <p>
        The electrostatic potential satisfies ∇²φ = −ρ/ε₀. The Green&apos;s function for the
        Laplacian in 3D free space (L = −∇²):
      </p>

      <EqNumbered number="GF.3">G(r, r') = 1/(4π|r − r'|) &nbsp;&nbsp;&nbsp; (free-space Green's function, 3D)</EqNumbered>

      <p>
        This is just Coulomb&apos;s law in disguise. The potential from an arbitrary charge distribution:
      </p>

      <EqNumbered number="GF.4">φ(r) = (1/4πε₀) ∫ ρ(r')/(|r − r'|) d³r' &nbsp;&nbsp;&nbsp; (Coulomb integral)</EqNumbered>

      <p>
        For problems with boundaries, G must satisfy the boundary conditions.
        For a point charge q above a grounded plane (z = 0): the image charge at the mirror
        position gives the correct G with G = 0 on the plane — method of images is just finding
        the boundary-corrected Green&apos;s function.
      </p>

      <p>
        In 2D: G = −(1/2π) ln|r − r&apos;|. In 1D: G = −|x − x&apos;|/2. Note that dimensionality
        changes the form of G.
      </p>

      <h2>GF.3 The Helmholtz Equation</h2>

      <p>
        The Helmholtz equation (∇² + k²)u = −f arises in acoustics, EM waves, and quantum
        mechanics (time-independent Schrödinger). The outgoing Green&apos;s function (satisfying
        the Sommerfeld radiation condition — waves going out, not in):
      </p>

      <EqNumbered number="GF.5">G+(r, r') = e^(ik|r−r'|)/(4π|r−r'|) &nbsp;&nbsp;&nbsp; (retarded/outgoing Helmholtz Green's function)</EqNumbered>

      <p>
        At large distance r ≫ r&apos;: G+ ≈ (e^(ikr)/4πr) e^(−ik̂·r&apos;). This factor e^(−ik̂·r&apos;)
        is precisely the far-field factor in the <strong>Born approximation</strong> for quantum
        scattering:
      </p>

      <EqNumbered number="GF.6">f(k, k') = −(m/2πℏ²) ∫ e^(−ik'·r') V(r') ψ(r') d³r' &nbsp;&nbsp;&nbsp; (Born scattering amplitude)</EqNumbered>

      <p>
        For weak potentials (Born approx): ψ ≈ e^(ik·r), giving f ∝ Ṽ(q) (the Fourier
        transform of V at momentum transfer q = k − k&apos;). The Rutherford cross section follows
        from V = Ze²/r and its Fourier transform ∝ 1/q² → dσ/dΩ ∝ 1/sin⁴(θ/2).
      </p>

      <WorkedExample number="GF.1" title="Driven Harmonic Oscillator — Retarded Green's Function">
        <p>
          Find the Green&apos;s function for ẍ + ω₀² x = f(t)/m (driven harmonic oscillator)
          satisfying G = 0 for t &lt; t&apos; (causality).
        </p>
        <Step label="Define:">G(t, t') satisfies Ġ̈ + ω₀² G = δ(t−t')/m. For t &gt; t': G obeys the homogeneous equation → G = A sin(ω₀(t−t')) + B cos(ω₀(t−t')).</Step>
        <Step label="Boundary conditions:">Causality (G = 0, t &lt; t'): G must vanish for t &lt; t'. Jump conditions: at t = t'+, integrate once → Ġ jumps by 1/m. So G(t'+,t') = 0 and Ġ(t'+,t') = 1/m.</Step>
        <Step label="Solve:">G(t'+) = A sin(0) + B cos(0) = B = 0. Ġ(t'+) = Aω₀ cos(0) = Aω₀ = 1/m → A = 1/(mω₀).</Step>
        <Step label="Result:">G(t,t') = θ(t−t')/(mω₀) × sin(ω₀(t−t')) where θ is the Heaviside step function.</Step>
        <Step label="Solution:">x(t) = ∫G(t,t') f(t') dt' = ∫(−∞ to t) f(t')/(mω₀) sin(ω₀(t−t')) dt'. This is the convolution formula — F times the impulse response sin(ω₀t)/(mω₀).</Step>
      </WorkedExample>

      <h2>GF.4 Diffusion — Heat Equation Green&apos;s Function</h2>

      <p>
        For the heat equation ∂u/∂t − D∇²u = f(r,t), the causal Green&apos;s function is the
        Gaussian spreading kernel (already seen in diffusion):
      </p>

      <EqNumbered number="GF.7">G(r, t; r', t') = θ(t−t')/(4πD(t−t'))^(3/2) × exp(−|r−r'|²/(4D(t−t')))</EqNumbered>

      <p>
        For an initial condition u(r, 0) = u₀(r) with no source f = 0:
      </p>

      <EqNumbered number="GF.8">u(r, t) = ∫ G(r, t; r', 0) u₀(r') d³r' &nbsp;&nbsp;&nbsp; (propagate initial data)</EqNumbered>

      <p>
        This is the complete solution to the heat equation from any initial condition.
        The same Green&apos;s function appears in the path integral for quantum mechanics
        (imaginary time τ = it, D = ℏ/(2m)):
      </p>

      <EqNumbered number="GF.9">K(r, t; r', 0) = (m/(2πiℏt))^(3/2) × exp(im|r−r'|²/(2ℏt)) &nbsp;&nbsp;&nbsp; (free-particle propagator)</EqNumbered>

      <h2>GF.5 Spectral Representation</h2>

      <p>
        For a self-adjoint operator L with eigenfunctions φₙ and eigenvalues λₙ (L φₙ = λₙ φₙ):
      </p>

      <EqNumbered number="GF.10">G(r, r') = Σₙ φₙ(r) φₙ*(r') / (λₙ − λ) &nbsp;&nbsp;&nbsp; (spectral/Lehmann representation)</EqNumbered>

      <p>
        where λ is the eigenvalue of the source equation (Lu = λu + f, i.e., (L−λ)G = δ).
        This representation connects Green&apos;s functions to quantum mechanics: the retarded
        Green&apos;s function of the Schrödinger equation is:
      </p>

      <EqNumbered number="GF.11">G+(E) = Σₙ |n⟩⟨n| / (E − Eₙ + iε) &nbsp;&nbsp;&nbsp; (quantum retarded propagator)</EqNumbered>

      <p>
        Poles of G+(E) at E = Eₙ − iε give the energy levels. The imaginary part (spectral
        function) −(1/π) Im G+(E) = Σₙ |n⟩⟨n| δ(E − Eₙ) — the density of states.
        In condensed matter, the interacting Green&apos;s function&apos;s poles give quasiparticle energies;
        its spectral function is measured by ARPES (angle-resolved photoemission spectroscopy).
      </p>

      <Definition number="GF.1" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>A Green&apos;s function depends on boundary conditions:</strong> the same operator can have different Green&apos;s functions.</li>
          <li><strong>The delta function is a distribution:</strong> use it under integrals, not as an ordinary function.</li>
          <li><strong>Convolution solves linear problems:</strong> nonlinear equations do not superpose this way.</li>
          <li><strong>Retarded and advanced choices encode causality:</strong> choose the one matching the physical problem.</li>
        </ul>
      </Definition>

      <PracticeProblems section="GF.1–GF.5 Green's Functions">
        <InteractiveProblem n={1} difficulty="easy"
          answer={0.125} unit="" tolerance={0.02}
          hints={['The solution for uniform source f=1 on [0,L] with pinned ends is u(x) = x(L−x)/2.', 'Evaluate u at the midpoint x = L/2 with L = 1.']}
          problemText="Find the Green's function for −d²G/dx² = δ(x−x') on [0,1] with G(0)=G(1)=0. Use it to solve for f=1. What is the deflection u at x = 1/2?"
          solution={<>Poisson equation in 1D: −d²u/dx² = f(x), 0 ≤ x ≤ L, u(0) = u(L) = 0. Green's function: −G'' = δ(x−x'). Solution: G(x,x') = {'{'}x(L−x')/L for x &lt; x', x'(L−x)/L for x &gt; x'{'}'} (piecewise linear, slope discontinuity −1 at x=x', G(0)=G(L)=0). Symmetry: G(x,x') = G(x',x). Physical interpretation: G is the deflection curve of a string under a unit point load at x', pinned at both ends. For f = 1: u(x) = ∫₀ᴸG(x,x')dx' = ∫₀ˣ x'(L−x)/L dx' + ∫ₓᴸ x(L−x')/L dx' = <strong>x(L−x)/2</strong>. Checks: u(0) = u(L) = 0 and u'' = −1.</>}>
          Find the Green&apos;s function for −d²G/dx² = δ(x−x') on [0,L] with G(0) = G(L) = 0. Use it to solve the equation with uniform source f = 1.
        </InteractiveProblem>

        <Problem n={2} difficulty="medium"
          solution={<>Retarded Green's function for wave equation: (∂²/∂t² − c²∇²)G = δ(r)δ(t). Fourier transform in space and time: (−ω² + c²k²)G = 1/(2π)⁴. G(k,ω) = −1/((2π)⁴(ω²−c²k²)). Retarded: add iε to denominator: G_R(k,ω) = −1/((2π)⁴(ω+iε)²−c²k²). Inverse Fourier: G_R(r,t) = θ(t)/(4πcr) × δ(t − r/c) + θ(t)/(4πcr) × δ(t + r/c)... The retarded part: G_R(r,t) = θ(t)δ(t−r/c)/(4πr). Physical interpretation: impulse at origin at t=0 produces a spherical shell of disturbance expanding at speed c, arriving at radius r at time t = r/c. The δ(t−r/c) ensures signal travels at exactly c. In 1D wave equation: G has contributions for both t = |x|/c (forward and backward). For sound, light, gravitational waves — the Green's function shows wave propagation at finite speed.</>}>
          Find the retarded Green's function for the 3D wave equation (∂²/∂t² − c²∇²)G = δ³(r)δ(t). Interpret the result physically.
        </Problem>

        <Problem n={3} difficulty="medium"
          solution={<>Born approximation for Yukawa potential V(r) = V₀ e^(−μr)/r. Fourier transform: Ṽ(q) = ∫V(r)e^(−iq·r)d³r. In spherical coordinates: Ṽ(q) = 4π V₀/(q²+μ²) (standard result, Yukawa FT). Born amplitude: f(q) = −(m/2πℏ²) Ṽ(q) = −(2mV₀/ℏ²)/(q²+μ²). Differential cross section: dσ/dΩ = |f|² = (2mV₀/ℏ²)²/(q²+μ²)². Momentum transfer: q = 2k sin(θ/2) where k = mv/ℏ. q² = 4k² sin²(θ/2). At μ → 0 (Coulomb, V₀ → e₁e₂/4πε₀): dσ/dΩ ∝ 1/(4k² sin²(θ/2))² = (e₁e₂/4mv²)²/sin⁴(θ/2) — Rutherford formula! The Yukawa form is used for pion exchange in nuclear physics (μ = m_π c/ℏ, range ℏ/m_π c ≈ 1.4 fm). W/Z boson exchange similarly, with μ = M_W c/ℏ giving range ∼10⁻³ fm (explains weakness of weak force).</>}>
          Use the Born approximation to find dσ/dΩ for scattering from a Yukawa potential V(r) = V₀ e^(−μr)/r. Show that Rutherford scattering is the μ → 0 limit.
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Quantum propagator for harmonic oscillator: K(x,t;x',0) = √(mω/(2πiℏ sinωt)) × exp(imω[(x²+x'²)cosωt − 2xx']/(2ℏ sinωt)). Derivation via path integral: S_cl = mω[(x²+x'²)cosωt − 2xx']/(2sinωt). K = (prefactor) × e^(iS_cl/ℏ). Verification: at t → 0, K → δ(x−x') ✓ (using sin(ωt)→ωt). Period t = 2π/ω: K(x,2π/ω;x',0) = δ(x−x') × e^(−iπ/2) (up to Maslov index). This means the SHO wavefunction returns to itself after one period (with phase). Spectral form: K(x,t;x',0) = Σₙ ψₙ(x)ψₙ*(x') e^(−iEₙt/ℏ). At t = −iβℏ (Euclidean time): K = partition function Z = Σₙ e^(−βEₙ). Euclidean propagator: K_E(x,τ;x',0) for β=τ gives Z(β) = Tr e^(−βH). Path integral formulation naturally produces quantum statistics.</>}>
          Write down the exact propagator K(x,t; x', 0) for the harmonic oscillator. Show it encodes both the energy spectrum (as poles) and the partition function (Euclidean rotation).
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'G defined by LG = δ(r−r\'). Solution to Lu = f is u(r) = ∫G(r,r\')f(r\')dr\' (superposition).',
        '3D Laplacian: G = 1/(4π|r−r\'|) — Coulomb\'s law. Method of images = boundary-corrected G.',
        'Helmholtz: G+ = e^(ik|r−r\'|)/(4π|r−r\'|). Born approx follows from far-field expansion.',
        'Harmonic oscillator: G_R = θ(t−t\') sin(ω₀(t−t\'))/(mω₀). Convolution gives driven response.',
        'Heat/Schrödinger: same Gaussian kernel, real vs imaginary time. Euclidean → partition function.',
        'Spectral form: G+(E) = Σ|n⟩⟨n|/(E−Eₙ+iε). Poles = energies; Im G = density of states.',
      ]} />
    </div>
  );
}
