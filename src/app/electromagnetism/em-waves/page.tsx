import EMWaveSimClient from '@/components/sims/EMWaveSimClient';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, InlineMath, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function EMWavesPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#a855f7' }}>Electromagnetism · Upper Division</div>
      <h1>Electromagnetic Wave Propagation</h1>
      <p className="subtitle">
        Maxwell&apos;s equations predict self-sustaining oscillations of E and B that travel at c.
        This chapter examines those waves in detail: polarization, energy transport, radiation
        pressure, and the behavior at boundaries between media.
      </p>

      <Prerequisites items={['Maxwell\'s equations (Ch. M)', 'Wave properties (Ch. 9)', 'Vectors and calculus']} />

      <LearningGoals items={[
        'Describe the structure of a plane electromagnetic wave and state the relationships between E, B, and k̂.',
        'Distinguish linear, circular, and elliptical polarization and apply Malus\'s law to polarizer problems.',
        'Calculate the time-averaged intensity and radiation pressure for an incident and reflected plane wave.',
        'Derive the index of refraction from permittivity and permeability of a medium.',
        'Apply the Fresnel equations at normal incidence to find reflectance at a dielectric interface.',
      ]} />

      <h2>W.1 Plane Wave Solutions</h2>

      <p>
        In free space (ρ = 0, J = 0), Maxwell&apos;s equations reduce to wave equations for both fields.
        The general monochromatic plane wave traveling in direction k̂ is:
      </p>

      <EqNumbered number="W.1">E(r,t) = E₀ ε̂ cos(k·r − ωt) &nbsp;&nbsp;&nbsp;&nbsp; B = (k̂ × E)/c</EqNumbered>

      <p>
        Here ε̂ is the <strong>polarization unit vector</strong> (perpendicular to k̂). The constraints
        from Maxwell&apos;s equations require:
      </p>

      <EqNumbered number="W.2">ω = ck &nbsp;&nbsp;&nbsp; E ⊥ B ⊥ k̂ &nbsp;&nbsp;&nbsp; |B| = |E|/c</EqNumbered>

      <p>
        These are purely transverse waves — no longitudinal component. The E and B fields are
        in phase with each other (both peak at the same x and t) and mutually perpendicular,
        with B always smaller by a factor of c.
      </p>

      <Figure number="W.1" caption="Animated electromagnetic plane wave. Blue: E field (y-direction). Green: B field (x-direction, projected). The inset shows the polarization state end-on. Toggle polarization states and Poynting vector.">
        <EMWaveSimClient />
      </Figure>

      <h2>W.2 Polarization</h2>

      <Definition number="W.1" title="States of Polarization">
        <span style={{ display: 'block', marginBottom: '0.4rem' }}>
          <strong>Linear polarization:</strong> E oscillates along a fixed direction. ε̂ = constant.
        </span>
        <span style={{ display: 'block', marginBottom: '0.4rem' }}>
          <strong>Circular polarization:</strong> E rotates in the transverse plane at frequency ω.
          Formed by two equal-amplitude linear components with 90° phase difference.
          &nbsp; E = E₀(x̂ cos(kz−ωt) ± ŷ sin(kz−ωt))
        </span>
        <span style={{ display: 'block' }}>
          <strong>Elliptical polarization:</strong> The general case — two components with unequal
          amplitudes and arbitrary phase difference. Linear and circular are special cases.
        </span>
      </Definition>

      <p>
        <strong>Malus&apos;s law</strong> governs a polarizing filter: if light of intensity I₀ is
        linearly polarized at angle θ to a polarizer axis, the transmitted intensity is:
      </p>

      <EqNumbered number="W.3" latex="I = I_0\cos^2\theta \qquad \text{(Malus's law)}" />

      <p>
        This follows directly from the E-field projection: <InlineMath latex="|E_{\text{transmitted}}|^2 = |E_0\cos\theta|^2" />, and
        intensity scales as E². Two crossed polarizers transmit nothing; a third at 45° in between
        restores partial transmission — a consequence of the projection law applied twice.
      </p>

      <h2>W.3 Energy, Momentum, and Radiation Pressure</h2>

      <p>
        Electromagnetic waves carry both energy and momentum. The energy flux density is the
        Poynting vector (from Maxwell&apos;s equations chapter):
      </p>

      <EqNumbered number="W.4" latex="\mathbf{S} = \frac{1}{\mu_0}\,\mathbf{E}\times\mathbf{B} \qquad [\mathrm{W/m^2}]" />

      <p>
        For a plane wave, |S| = E²/(μ₀c) = cε₀E². The time-averaged intensity is:
      </p>

      <EqNumbered number="W.5">⟨I⟩ = ½cε₀E₀² = E₀²/(2μ₀c)</EqNumbered>

      <p>
        Electromagnetic waves also carry <strong>momentum</strong>. The momentum density is:
      </p>

      <EqNumbered number="W.6" latex="\mathbf{g} = \mathbf{S}/c^2 = \varepsilon_0\,\mathbf{E}\times\mathbf{B} \qquad [\mathrm{kg/(m^2\cdot s)}]" />

      <p>
        When a wave is absorbed by a surface, it deposits momentum, exerting a
        <strong> radiation pressure</strong>:
      </p>

      <EqNumbered number="W.7" latex="P_{\text{rad}} = I/c \quad \text{(absorbed)} \qquad P_{\text{rad}} = 2I/c \quad \text{(reflected)}" />

      <WorkedExample number="W.1" title="Solar Radiation Pressure on a Sail">
        <p>
          The solar intensity at Earth&apos;s distance is I = 1361 W/m². Find the radiation pressure
          on a perfectly reflecting solar sail of area A = 100 m² and mass m = 5 kg.
        </p>
        <Step label="Radiation pressure:"><InlineMath latex="P_{\text{rad}} = 2I/c = 2 \times 1361 / (3\times10^8) = 9.07\times10^{-6}\,\mathrm{Pa}" /></Step>
        <Step label="Force:"><InlineMath latex="F = P_{\text{rad}} \times A = 9.07\times10^{-6} \times 100 = 9.07\times10^{-4}\,\mathrm{N}" /></Step>
        <Step label="Acceleration:"><InlineMath latex="a = F/m = 9.07\times10^{-4} / 5 = 1.81\times10^{-4}\,\mathrm{m/s^2}" /></Step>
        <Step label="Perspective:">This tiny acceleration, applied continuously without fuel for months, can accumulate to significant velocity changes. Solar sails are viable for deep-space propulsion — IKAROS (JAXA, 2010) demonstrated the principle.</Step>
      </WorkedExample>

      <h2>W.4 Waves in Media — Index of Refraction</h2>

      <p>
        In a linear, isotropic medium (permittivity ε, permeability μ), the wave equation gives
        wave speed v and index of refraction n:
      </p>

      <EqNumbered number="W.8">v = 1/√(με) &nbsp;&nbsp;&nbsp; n = c/v = √(μᵣεᵣ) &nbsp;&nbsp;&nbsp; (μᵣ = μ/μ₀, εᵣ = ε/ε₀)</EqNumbered>

      <p>
        At optical frequencies, μᵣ ≈ 1 for non-magnetic materials, so n ≈ √εᵣ. This connects the
        electromagnetic and optical properties: the refractive index is the square root of the
        relative permittivity.
      </p>

      <Theorem number="W.1" title="Fresnel Equations (Normal Incidence)">
        At a boundary between media n₁ and n₂, the reflection and transmission amplitudes for
        a wave at normal incidence are:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          r = (n₁ − n₂)/(n₁ + n₂) &nbsp;&nbsp;&nbsp;&nbsp; t = 2n₁/(n₁ + n₂)
        </span>
        Reflectance R = r² = [(n₁−n₂)/(n₁+n₂)]². For glass (n=1.5) in air: R = (0.5/2.5)² = 4%.
        Anti-reflection coatings (quarter-wave layers) use destructive interference to eliminate this loss.
      </Theorem>

      <WorkedExample number="W.2" title="Skin Depth in a Conductor">
        <p>
          In a good conductor (conductivity σ), EM waves decay exponentially. Find the skin depth δ.
        </p>
        <Step label="Wave equation in conductor:">∇²E = μσ ∂E/∂t + με ∂²E/∂t² ≈ μσ ∂E/∂t (σ/ε ≫ ω)</Step>
        <Step label="Plane wave ansatz:"><InlineMath latex="E \propto e^{i(kz-\omega t)}" /> with complex <InlineMath latex="k^2 = i\omega\mu\sigma" /></Step>
        <Step label="Solve:"><InlineMath latex="k = (1+i)\sqrt{\omega\mu\sigma/2}" />. Imaginary part gives exponential decay.</Step>
        <Step label="Skin depth:"><InlineMath latex="\delta = \sqrt{2/(\omega\mu\sigma)}" /> — e-folding length for field amplitude.</Step>
        <Step label="Example:">Copper at 60 Hz: <InlineMath latex="\sigma = 6\times10^7\,\mathrm{S/m} \;\Rightarrow\; \delta = \sqrt{\dfrac{2}{2\pi\times60 \times 4\pi\times10^{-7} \times 6\times10^7}} \approx 8.4\,\mathrm{mm}" />. At 1 GHz: δ ≈ 2 μm — only the surface layer carries current.</Step>
      </WorkedExample>

      <Definition number="W.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>B is smaller than E by c in SI units:</strong> compare physical field strengths with the correct unit conversion.</li>
          <li><strong>Unpolarized light loses half at the first ideal polarizer:</strong> Malus&apos;s law applies after a definite polarization direction exists.</li>
          <li><strong>Radiation pressure doubles on reflection:</strong> reflected light reverses momentum instead of merely depositing it.</li>
          <li><strong>Index depends on frequency in real media:</strong> dispersion means n is not a single constant for all wavelengths.</li>
        </ul>
      </Definition>

      <PracticeProblems section="W.1–W.4 EM Wave Propagation">
        <InteractiveProblem n={1} difficulty="easy"
          answer={1013} unit="V/m" tolerance={0.03}
          hints={['I = ½cε₀E₀² → E₀ = √(2I/cε₀)', 'I = 1361 W/m², c = 3×10⁸ m/s, ε₀ = 8.85×10⁻¹² F/m']}
          problemText="The solar constant is I = 1361 W/m². Find E₀ (peak electric field amplitude) in V/m."
          solution={<><InlineMath latex="E_0 = \sqrt{2\times1361/(3\times10^8 \times 8.85\times10^{-12})} = \sqrt{1.025\times10^6}" /> ≈ <strong>1013 V/m</strong>. <InlineMath latex="B_0 = E_0/c \approx 3.38\,\mu\mathrm{T}" />.</>}>
          The solar constant is I = 1361 W/m². Find E₀ and B₀ for sunlight. Verify using the Poynting vector formula.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={0.125} unit="" tolerance={0.02}
          hints={['Unpolarized → first polarizer: I₀/2', 'Malus\'s law for each subsequent polarizer: multiply the incoming intensity by cos²θ', 'Second polarizer at 45°: cos²45° = 1/2. Third at 90° from first (45° from second): cos²45° = 1/2']}
          problemText="Unpolarized light of intensity I₀ passes through three polarizers at 0°, 45°, 90°. What fraction (as a decimal) of I₀ survives?"
          solution={<>I₀ → I₀/2 → (I₀/2)(1/2) = I₀/4 → (I₀/4)(1/2) = <strong>I₀/8 = 0.125 I₀</strong></>}>
          Unpolarized light passes through three polarizers at 0°, 45°, 90°. What fraction survives? Why does the middle polarizer matter?
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Radiation pressure force on Earth: <InlineMath latex="F = I A_{\text{cross}}/c" /> (absorbed) where <InlineMath latex="A_{\text{cross}} = \pi R_E^2 = \pi(6.37\times10^6)^2 = 1.27\times10^{14}\,\mathrm{m^2}" />. <InlineMath latex="F = 1361 \times 1.27\times10^{14} / (3\times10^8) = 5.76\times10^8\,\mathrm{N}" />. Gravity from Sun: <InlineMath latex="F_{\text{grav}} = GM_{\text{Sun}}M_{\text{Earth}}/R^2 = 6.67\times10^{-11} \times 2\times10^{30} \times 6\times10^{24}/(1.5\times10^{11})^2 = 3.56\times10^{22}\,\mathrm{N}" />. Ratio: 5.76×10⁸ / 3.56×10²² ≈ 1.6×10⁻¹⁴. Radiation pressure is 14 orders of magnitude weaker than gravity for Earth. For dust grains (high A/m): can dominate → comet tails point away from Sun.</>}>
          Estimate the radiation pressure force on Earth from sunlight. Compare to the Sun&apos;s gravitational force on Earth. When does radiation pressure dominate?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Derivation from Maxwell: start with ∂u/∂t + ∇·S = −J·E (Poynting theorem). In free space J=0: ∂u/∂t + ∇·S = 0. This is an energy continuity equation. The EM momentum density is g = S/c² = ε₀E×B. Maxwell stress tensor <InlineMath latex="T_{ij} = \varepsilon_0\left(E_iE_j - \tfrac{1}{2}\delta_{ij}E^2\right) + \frac{1}{\mu_0}\left(B_iB_j - \tfrac{1}{2}\delta_{ij}B^2\right)" />. The force per volume on matter: <InlineMath latex="\mathbf{f} = \nabla\cdot\overleftrightarrow{T} - \partial\mathbf{g}/\partial t" />. For a wave hitting a perfect reflector: the momentum flux (<InlineMath latex="-T_{zz}" /> for a z-traveling wave) <InlineMath latex="= \varepsilon_0E^2/2 + B^2/(2\mu_0) = u" /> (energy density). The rate of momentum transfer per area <InlineMath latex="= 2u\cdot c/c = 2I/c = 2P_{\text{rad}}" />. The factor 2 comes from reversal of momentum upon reflection.</>}>
          Derive the radiation pressure formula P = I/c for an absorbed wave from the Maxwell stress tensor. Explain the factor of 2 for reflection.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Plane wave: E ⊥ B ⊥ k̂, both transverse; |B| = |E|/c; ω = ck.',
        'Polarization: linear (fixed direction), circular (E rotates), elliptical (general case).',
        'Malus\'s law: I = I₀ cos²θ for a polarizer at angle θ.',
        'Poynting vector S = E×B/μ₀; intensity ⟨I⟩ = E₀²/(2μ₀c) = ½cε₀E₀².',
        'Radiation pressure: P = I/c (absorbed), 2I/c (reflected). EM waves carry momentum g = S/c².',
        'In medium: v = c/n, n = √(μᵣεᵣ). Fresnel: R = [(n₁−n₂)/(n₁+n₂)]² at normal incidence.',
      ]} />
    </div>
  );
}
