import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function SpecialFunctionsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#06b6d4' }}>Mathematics · Advanced Topics</div>
      <h1>Special Functions in Physics</h1>
      <p className="subtitle">
        Special functions — Bessel functions, Legendre polynomials, spherical harmonics,
        Hermite polynomials, Gamma function — arise as solutions to the differential equations
        of physics and encode the geometry and symmetry of the problem.
      </p>

      <Prerequisites items={['Differential equations (Ch. DE)', 'Complex analysis (Ch. CA)', 'Fourier analysis (Ch. F)', 'Linear algebra (Ch. LA)']} />

      <LearningGoals items={[
        'Use the Gamma function recursion, reflection formula, and Stirling approximation, and evaluate Gaussian integrals via Γ(1/2) = √π.',
        'Write Legendre polynomials via their Rodrigues formula and orthogonality relation, and expand a function in a Legendre series.',
        'Construct the multipole expansion of an electrostatic potential using spherical harmonics and identify the monopole, dipole, and quadrupole terms.',
        'Identify the Bessel equation, state the boundary conditions selecting J_n over Y_n, and use the zeros of J₀ to find waveguide cutoff frequencies.',
        'Express harmonic-oscillator eigenfunctions in terms of Hermite polynomials and connect them to coherent-state expansions in quantum optics.',
      ]} />

      <h2>SF.1 The Gamma Function</h2>

      <p>
        The <strong>Gamma function</strong> Γ(z) extends the factorial to complex numbers:
      </p>

      <EqNumbered number="SF.1">Γ(z) = ∫(0 to ∞) t^(z−1) e^(−t) dt &nbsp;&nbsp;&nbsp; (Re z &gt; 0)</EqNumbered>

      <p>
        Key properties: Γ(n+1) = n! (for n = 0,1,2,...), Γ(1/2) = √π, Γ(z+1) = zΓ(z)
        (recursion). The reflection formula: Γ(z)Γ(1−z) = π/sin(πz).
        Stirling&apos;s approximation: ln Γ(n+1) ≈ n ln n − n + ½ ln(2πn) for large n.
      </p>

      <p>
        The Gamma function appears in:
        volume of n-ball (V_n = π^(n/2) R^n / Γ(n/2+1)),
        Gaussian integrals (∫ x^(2n) e^(−x²) dx = Γ(n+1/2)/2),
        the Beta function B(m,n) = Γ(m)Γ(n)/Γ(m+n).
      </p>

      <h2>SF.2 Legendre Polynomials and Spherical Harmonics</h2>

      <p>
        The <strong>Legendre equation</strong>: (1−x²)P&apos;&apos; − 2xP&apos; + l(l+1)P = 0 arises in
        any problem with azimuthal symmetry. Solutions regular on [−1, 1]: Pₗ(x) with l = 0,1,2,...
      </p>

      <EqNumbered number="SF.2">P₀ = 1, &nbsp;&nbsp; P₁ = x, &nbsp;&nbsp; P₂ = (3x²−1)/2, &nbsp;&nbsp; P₃ = (5x³−3x)/2</EqNumbered>

      <p>
        Orthogonality: ∫(−1 to 1) Pₗ(x) Pₘ(x) dx = 2δ_lm/(2l+1).
        Generating function: 1/√(1−2xt+t²) = Σ Pₗ(x) tˡ (useful for multipole expansion).
      </p>

      <p>
        <strong>Spherical harmonics</strong> Y_l^m(θ, φ) are joint eigenfunctions of L² and L_z:
      </p>

      <EqNumbered number="SF.3">Y_l^m(θ, φ) = N_lm P_l^m(cosθ) e^(imφ) &nbsp;&nbsp;&nbsp; (−l ≤ m ≤ l)</EqNumbered>

      <p>
        where P_l^m are associated Legendre polynomials. Orthonormality:
        ∫ Y_l^m* Y_(l')^(m') dΩ = δ_(ll') δ_(mm'). Addition theorem:
        Pₗ(cos γ) = (4π/(2l+1)) Σ_m Y_l^m*(Ω₁) Y_l^m(Ω₂) where γ is the angle between
        directions Ω₁ and Ω₂.
      </p>

      <WorkedExample number="SF.1" title="Multipole Expansion of a Charge Distribution">
        <p>
          A charge distribution ρ(r) has total charge Q = q, dipole p = qd ẑ, and quadrupole Q₂₀.
          Write the far-field potential.
        </p>
        <Step label="Multipole expansion:">φ(r) = (1/4πε₀) Σ_l [4π/(2l+1)] (1/r^(l+1)) Σ_m q_lm Y_l^m(θ,φ). Multipole moments: q_lm = ∫ ρ(r') r'^l Y_l^m*(θ',φ') d³r'.</Step>
        <Step label="l=0 (monopole):">q_00 = Q/√(4π). φ_monopole = Q/(4πε₀r).</Step>
        <Step label="l=1 (dipole):">q_10 = p_z/√(4π/3) (z-component of p). φ_dipole = p cosθ/(4πε₀r²) = p·r̂/(4πε₀r²).</Step>
        <Step label="l=2 (quadrupole):">Q₂₀ = ½∫ρ(3z²−r²)d³r (traceless quadrupole moment). φ_quad = Q₂₀(3cos²θ−1)/(8πε₀r³).</Step>
        <Step label="Physical:">A neutral atom (Q=0) in external field: the dipole p = αE (polarizability). The quadrupole Q₂₀ determines the electric field gradient interaction (used in NQR — nuclear quadrupole resonance — to study crystal field environments).</Step>
      </WorkedExample>

      <h2>SF.3 Bessel Functions</h2>

      <p>
        <strong>Bessel&apos;s equation</strong>: x²y&apos;&apos; + xy&apos; + (x² − n²)y = 0 arises in
        problems with cylindrical symmetry (waveguide modes, drumhead vibrations).
        Solutions: J_n(x) (Bessel of 1st kind, regular at x=0), Y_n(x) (2nd kind, singular).
      </p>

      <p>
        Important properties:
        J₀(0) = 1, J_n(0) = 0 (n ≠ 0).
        Zeros: J₀ vanishes at x = 2.405, 5.520, 8.654, ... (used for waveguide cutoffs).
        Asymptotic: J_n(x) ≈ √(2/(πx)) cos(x − nπ/2 − π/4) for x ≫ 1.
        Recursion: J_(n+1)(x) + J_(n−1)(x) = (2n/x) J_n(x).
      </p>

      <p>
        <strong>Spherical Bessel functions</strong> j_l(r) = √(π/(2r)) J_(l+1/2)(r) arise in
        quantum mechanics (radial equation in free space):
        j₀(x) = sin(x)/x, j₁(x) = sin(x)/x² − cos(x)/x.
      </p>

      <h2>SF.4 Hermite Polynomials — Quantum Harmonic Oscillator</h2>

      <p>
        The Schrödinger equation for the harmonic oscillator leads to the
        <strong>Hermite equation</strong>: y&apos;&apos; − 2xy&apos; + 2ny = 0.
        Solutions: H_n(x) (Hermite polynomials):
      </p>

      <EqNumbered number="SF.4">H_n(x) = (−1)^n e^(x²) d^n e^(−x²)/dx^n &nbsp;&nbsp;&nbsp; (Rodrigues formula)</EqNumbered>

      <p>
        H₀ = 1, H₁ = 2x, H₂ = 4x²−2, H₃ = 8x³−12x.
        Orthogonality: ∫(−∞ to ∞) H_m(x) H_n(x) e^(−x²) dx = 2^n n! √π δ_mn.
        Generating function: e^(2xt−t²) = Σ H_n(x) t^n/n!.
      </p>

      <p>
        The harmonic oscillator eigenfunctions:
        ψ_n(x) = (1/√(2^n n!)) (mω/(πℏ))^(1/4) H_n(√(mω/ℏ) x) e^(−mωx²/(2ℏ)).
        These appear in quantum optics (Fock states), molecular spectroscopy, and as basis for
        coherent states: |α⟩ = e^(−|α|²/2) Σ α^n/√n! |n⟩ (eigenstates of â).
      </p>

      <h2>SF.5 Confluent Hypergeometric and Whittaker Functions</h2>

      <p>
        The <strong>hypergeometric equation</strong> is the master ODE — most special functions
        are special cases:
      </p>

      <EqNumbered number="SF.5">z(1−z)w'' + [c−(a+b+1)z]w' − abw = 0 &nbsp;&nbsp;&nbsp; (hypergeometric equation)</EqNumbered>

      <p>
        Solution: F(a,b;c;z) = Σₙ (a)_n (b)_n/(c)_n × z^n/n! (Gauss hypergeometric series).
        Special cases: P_l(x) = F(−l, l+1; 1; (1−x)/2), (1−x)^(−α) = F(α,1;1;x),
        complete elliptic K(k) = (π/2) F(1/2, 1/2; 1; k²).
      </p>

      <p>
        The hydrogen radial wavefunctions are confluent hypergeometric functions:
        R_nl ∝ L_(n−l−1)^(2l+1)(2r/na₀) — Laguerre polynomials.
      </p>

      <Definition number="SF.1" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Special functions usually solve eigenvalue problems:</strong> their domains and boundary conditions matter.</li>
          <li><strong>Normalization conventions vary:</strong> check factors for Legendre, Bessel, and spherical harmonics.</li>
          <li><strong>Orthogonality uses a weight function:</strong> the inner product is not always plain integration.</li>
          <li><strong>Asymptotic forms have limits:</strong> large-argument approximations fail near zeros or turning points.</li>
        </ul>
      </Definition>

      <PracticeProblems section="SF.1–SF.5 Special Functions">
        <InteractiveProblem n={1} difficulty="easy"
          answer={1.329} unit="" tolerance={0.02}
          hints={['Use t = x² to write ∫₀^∞ x⁴ e^(−x²) dx = ∫₀^∞ t^(3/2) e^(−t) dt / 2 = Γ(5/2)/2.', 'Γ(5/2) = (3/2)(1/2)Γ(1/2) = (3/4)√π ≈ 1.329. The integral from −∞ to ∞ doubles this to (3/2)√π/2... wait: ∫_{-∞}^{∞} = 2∫₀^∞ = Γ(5/2) = 3√π/4.']}
          problemText="Evaluate ∫_{-∞}^{∞} x⁴ e^{-x²} dx using Γ(1/2) = √π. Express as a decimal rounded to 3 significant figures."
          solution={<>Gamma function identities. Γ(1/2) = √π (standard). Proof: [Γ(1/2)]² = ∫(0 to ∞)∫(0 to ∞) t^(-1/2) s^(-1/2) e^(-t-s) dt ds. Let t=x², s=y²: = 4∫∫ e^(-x²-y²) dx dy = 4×(π/4) = π. So Γ(1/2) = √π. Gaussian integral: ∫(−∞ to ∞) x^(2n) e^(-x²) dx = 2∫(0 to ∞) x^(2n) e^(-x²) dx. Let t=x²: = ∫(0 to ∞) t^(n-1/2) e^(-t) dt = Γ(n+1/2). By recursion: Γ(n+1/2) = (n-1/2)Γ(n-1/2) = ... = (2n-1)!!/2^n × √π. So ∫x^(2n) e^(-x²)dx = (2n-1)!!/2^n × √π. For n=2: ∫x⁴e^(-x²)dx = 3/4 × √π ≈ 1.329. Surface area of n-sphere: S_n = 2π^(n/2)/Γ(n/2). For n=3: S_3 = 2π^(3/2)/Γ(3/2) = 2π^(3/2)/(√π/2) = 4π ✓. Volume V_n = π^(n/2)R^n/Γ(n/2+1).</>}>
          Prove that Γ(1/2) = √π using a 2D Gaussian integral. Use this to evaluate ∫(−∞ to ∞) x⁴ e^(−x²) dx.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={11.5} unit="GHz" tolerance={0.05}
          hints={['The first zero of J₀ is x₀₁ = 2.405. The cutoff wavenumber k_c = 2.405/a.', 'Cutoff frequency f_c = c k_c / (2π). With a = 0.01 m and c = 3×10⁸ m/s.']}
          problemText="Find the cutoff frequency (GHz) for the TM₀₁ mode in a circular metallic waveguide of radius a = 1 cm."
          solution={<>Bessel function waveguide. Cylindrical waveguide, radius a, conducting walls. TM modes: E_z satisfies (∇²_⊥ + k_c²)E_z = 0 in cylindrical coordinates. Solution: E_z = E₀ J_n(k_c r) cos(nφ). Boundary condition E_z = 0 at r=a gives J_n(k_c a) = 0. For TM₀₁: J₀(x) = 0 → x₀₁ = 2.405 → k_c = 2.405/a. Cutoff frequency: f_c = c k_c/(2π) = 2.405c/(2πa) = 0.383c/a. For a = 1 cm: f_c = <strong>11.5 GHz</strong>. TE modes obey dH_z/dr = 0 at r=a, so J_n&apos;(k_c a) = 0. The lowest circular-waveguide cutoff is TE₁₁, with x&apos;₁₁ = 1.841, giving f_c = 1.841c/(2πa) = <strong>8.79 GHz</strong> for a = 1 cm. TE₁₁ is therefore the dominant mode.</>}>
          Find the cutoff frequency (GHz) for the TM₀₁ mode in a circular waveguide of radius a = 1 cm. Which mode has the lowest cutoff frequency?
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Spherical harmonic expansion of Coulomb potential 1/|r−r'|: the generating function for Legendre polynomials: 1/√(1−2xt+t²) = Σ Pₗ(x) tˡ with x = cosγ (angle between r and r'), t = r'/r (for r'&lt;r). 1/|r−r'| = (1/r)Σₗ (r'/r)ˡ Pₗ(cosγ). By addition theorem: Pₗ(cosγ) = (4π/(2l+1))Σ_m Y_l^m*(θ',φ') Y_l^m(θ,φ). So 1/|r−r'| = 4π Σ_(lm) (1/(2l+1)) r'^l/r^(l+1) Y_l^m*(Ω') Y_l^m(Ω) for r'&lt;r. This is the multipole expansion used in atomic physics. The Coulomb matrix element: ⟨ab|1/r₁₂|cd⟩ = 4π Σ_(lm) (1/(2l+1)) × ∫ψ_a*(r₁) r_&lt;^l/r_&gt;^(l+1) Y_l^m*(Ω₁) ψ_c(r₁)d³r₁ × ∫ψ_b*(r₂) Y_l^m(Ω₂) ψ_d(r₂)d³r₂. The angular integrals are Clebsch-Gordan coefficients; the radial integrals are Slater integrals F_k and G_k. This is the starting point for atomic structure calculations (Slater-Condon rules).</>}>
          Expand 1/|r−r'| in spherical harmonics using the addition theorem. How is this used in computing Coulomb matrix elements in atomic structure calculations?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Coherent states: |α⟩ = e^(-|α|²/2) Σ_(n=0 to ∞) α^n/√n! |n⟩. Eigenstate of â: â|α⟩ = α|α⟩. Mean photon number: ⟨n⟩ = |α|². Photon number distribution: P(n) = |⟨n|α⟩|² = e^(-|α|²)|α|^(2n)/n! — Poisson distribution! This is why a laser produces Poisson photon statistics: shot noise. Overcomplete: ∫|α⟩⟨α|d²α/π = 1 (resolution of identity). Non-orthogonal: ⟨α|β⟩ = e^(-|α-β|²/2) e^(i Im(αβ*)). Time evolution: |α(t)⟩ = e^(-iωt/2)|α e^(-iωt)⟩ — coherent states maintain their form, just the amplitude rotates in phase space. Squeezed states: reduce ΔX below shot noise at expense of increasing ΔP. Min uncertainty: ΔX ΔP = ℏ/2, but can have ΔX = ℏ/2 × e^(-r) (squeezed) with ΔP = ℏ/2 × e^(+r). Used in gravitational wave detection (LIGO Advanced) to go beyond shot noise limit. Wigner function: W(α) = (2/π)⟨−α|ρ|α⟩ e^(2|α|²) — quasi-probability distribution in phase space. For coherent state: Gaussian, positive. For Fock state |n⟩: oscillatory, partially negative (non-classical).</>}>
          Define coherent states |α⟩ and show they are eigenstates of the annihilation operator. What is the photon number distribution and why does this imply Poisson shot noise? How does squeezing improve measurement beyond shot noise?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Gamma function: Γ(n+1) = n!, Γ(1/2) = √π. Appears in Gaussian integrals, n-sphere volumes.',
        'Legendre Pₗ(x): eigenfunctions of L² in azimuthal symmetry. Generating function → multipole expansion.',
        'Spherical harmonics Y_l^m: eigenfunctions of L² and L_z. Complete basis for functions on a sphere.',
        'Bessel J_n(x): cylindrical symmetry problems. Zeros determine waveguide modes.',
        'Hermite H_n(x): harmonic oscillator eigenfunctions. Generating function → coherent states.',
        'Hypergeometric F(a,b;c;z): master ODE containing most special functions as special cases.',
      ]} />
    </div>
  );
}
