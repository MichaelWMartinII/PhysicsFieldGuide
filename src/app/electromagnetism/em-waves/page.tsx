import EMWaveSimClient from '@/components/sims/EMWaveSimClient';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
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

      <Prerequisites items={['Maxwell\'s equations (Ch. M)', 'Wave properties (Ch. 8)', 'Vectors and calculus']} />

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

      <EqNumbered number="W.3">I = I₀ cos²θ &nbsp;&nbsp;&nbsp; (Malus&apos;s law)</EqNumbered>

      <p>
        This follows directly from the E-field projection: |E_transmitted|² = |E₀ cos θ|², and
        intensity scales as E². Two crossed polarizers transmit nothing; a third at 45° in between
        restores partial transmission — a consequence of the projection law applied twice.
      </p>

      <h2>W.3 Energy, Momentum, and Radiation Pressure</h2>

      <p>
        Electromagnetic waves carry both energy and momentum. The energy flux density is the
        Poynting vector (from Maxwell&apos;s equations chapter):
      </p>

      <EqNumbered number="W.4">S = (1/μ₀) E × B &nbsp;&nbsp;&nbsp; [W/m²]</EqNumbered>

      <p>
        For a plane wave, |S| = E²/(μ₀c) = cε₀E². The time-averaged intensity is:
      </p>

      <EqNumbered number="W.5">⟨I⟩ = ½cε₀E₀² = E₀²/(2μ₀c)</EqNumbered>

      <p>
        Electromagnetic waves also carry <strong>momentum</strong>. The momentum density is:
      </p>

      <EqNumbered number="W.6">g = S/c² = ε₀ E × B &nbsp;&nbsp;&nbsp; [kg/(m²·s)]</EqNumbered>

      <p>
        When a wave is absorbed by a surface, it deposits momentum, exerting a
        <strong> radiation pressure</strong>:
      </p>

      <EqNumbered number="W.7">P_rad = I/c &nbsp;&nbsp; (absorbed) &nbsp;&nbsp;&nbsp;&nbsp; P_rad = 2I/c &nbsp;&nbsp; (reflected)</EqNumbered>

      <WorkedExample number="W.1" title="Solar Radiation Pressure on a Sail">
        <p>
          The solar intensity at Earth&apos;s distance is I = 1361 W/m². Find the radiation pressure
          on a perfectly reflecting solar sail of area A = 100 m² and mass m = 5 kg.
        </p>
        <Step label="Radiation pressure:">P_rad = 2I/c = 2 × 1361 / (3×10⁸) = 9.07×10⁻⁶ Pa</Step>
        <Step label="Force:">F = P_rad × A = 9.07×10⁻⁶ × 100 = 9.07×10⁻⁴ N</Step>
        <Step label="Acceleration:">a = F/m = 9.07×10⁻⁴ / 5 = 1.81×10⁻⁴ m/s²</Step>
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
        <Step label="Plane wave ansatz:">E ∝ e^(ikz−iωt) with complex k² = iωμσ</Step>
        <Step label="Solve:">k = (1+i)√(ωμσ/2). Imaginary part gives exponential decay.</Step>
        <Step label="Skin depth:">δ = √(2/ωμσ) — e-folding length for field amplitude.</Step>
        <Step label="Example:">Copper at 60 Hz: σ = 6×10⁷ S/m → δ = √(2/(2π×60 × 4π×10⁻⁷ × 6×10⁷)) ≈ 8.5 mm. At 1 GHz: δ ≈ 2 μm — only the surface layer carries current.</Step>
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
          answer={1011} unit="V/m" tolerance={0.03}
          hints={['I = ½cε₀E₀² → E₀ = √(2I/cε₀)', 'I = 1361 W/m², c = 3×10⁸ m/s, ε₀ = 8.85×10⁻¹² F/m']}
          problemText="The solar constant is I = 1361 W/m². Find E₀ (peak electric field amplitude) in V/m."
          solution={<>E₀ = √(2×1361/(3×10⁸ × 8.85×10⁻¹²)) = √(1.02×10⁶) ≈ <strong>1011 V/m</strong>. B₀ = E₀/c ≈ 3.37 μT.</>}>
          The solar constant is I = 1361 W/m². Find E₀ and B₀ for sunlight. Verify using the Poynting vector formula.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={0.125} unit="" tolerance={0.02}
          hints={['Unpolarized → first polarizer: I₀/2', 'Malus\'s law for each subsequent polarizer: I = I_prev cos²θ', 'Second polarizer at 45°: cos²45° = 1/2. Third at 90° from first (45° from second): cos²45° = 1/2']}
          problemText="Unpolarized light of intensity I₀ passes through three polarizers at 0°, 45°, 90°. What fraction (as a decimal) of I₀ survives?"
          solution={<>I₀ → I₀/2 → (I₀/2)(1/2) = I₀/4 → (I₀/4)(1/2) = <strong>I₀/8 = 0.125 I₀</strong></>}>
          Unpolarized light passes through three polarizers at 0°, 45°, 90°. What fraction survives? Why does the middle polarizer matter?
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Radiation pressure force on Earth: F = I·A_cross/c (absorbed) where A_cross = πR_E² = π(6.37×10⁶)² = 1.27×10¹⁴ m². F = 1361 × 1.27×10¹⁴ / (3×10⁸) = 5.76×10⁸ N. Gravity from Sun: F_grav = GM_sun·M_Earth/R² = 6.67×10⁻¹¹ × 2×10³⁰ × 6×10²⁴/(1.5×10¹¹)² = 3.56×10²² N. Ratio: 5.76×10⁸ / 3.56×10²² ≈ 1.6×10⁻¹⁴. Radiation pressure is 14 orders of magnitude weaker than gravity for Earth. For dust grains (high A/m): can dominate → comet tails point away from Sun.</>}>
          Estimate the radiation pressure force on Earth from sunlight. Compare to the Sun&apos;s gravitational force on Earth. When does radiation pressure dominate?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Derivation from Maxwell: start with ∂u/∂t + ∇·S = −J·E (Poynting theorem). In free space J=0: ∂u/∂t + ∇·S = 0. This is an energy continuity equation. The EM momentum density is g = S/c² = ε₀E×B. Maxwell stress tensor T_ij = ε₀(E_iE_j − δ_ij E²/2) + (1/μ₀)(B_iB_j − δ_ij B²/2). The force per volume on matter: f = ∇·T − ∂g/∂t. For a wave hitting a perfect reflector: the momentum flux (T_zz for a z-traveling wave) = ε₀E²/2 + B²/(2μ₀) = u (energy density). The rate of momentum transfer per area = 2u·c/c = 2I/c = 2P_rad. The factor 2 comes from reversal of momentum upon reflection.</>}>
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
