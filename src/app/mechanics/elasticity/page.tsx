import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function ElasticityPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#3b82f6' }}>Classical Mechanics · Advanced Topics</div>
      <h1>Continuum Mechanics &amp; Elasticity</h1>
      <p className="subtitle">
        Continuum mechanics describes the deformation of materials under applied forces.
        Elasticity theory — the mechanics of reversible deformation — governs everything
        from the vibration of guitar strings to earthquake seismic waves to the bending
        of DNA molecules.
      </p>

      <Prerequisites items={['Newton\'s laws (Ch. 3)', 'Vectors and calculus (Ch. 21-22)', 'Linear algebra (Ch. LA)', 'Fluid mechanics (Ch. FM)']} />

      <LearningGoals items={[
        'Define the linearised strain tensor and identify diagonal (stretch) vs. off-diagonal (shear) components.',
        'State the isotropic Hooke\'s law in terms of Lamé constants and relate λ and μ to Young\'s modulus, Poisson ratio, shear modulus, and bulk modulus.',
        'Derive the speeds of P-waves and S-waves from the Navier equation and explain why S-waves cannot propagate in a fluid.',
        'Calculate the tip deflection of a cantilever beam using beam-bending theory and determine its fundamental natural frequency.',
        'Apply the Griffith fracture criterion to compute the critical crack length for a given material and applied stress.',
      ]} />

      <h2>CE.1 Strain and Stress Tensors</h2>

      <p>
        A continuous body deforms when forces are applied. The <strong>displacement field</strong>
        u(r) maps each material point r to its new position r + u. The <strong>strain tensor</strong>
        measures local deformation:
      </p>

      <EqNumbered number="CE.1" latex="\varepsilon_{ij}=\frac{1}{2}\left(\frac{\partial u_i}{\partial x_j}+\frac{\partial u_j}{\partial x_i}\right) \qquad \text{(linearized strain tensor)}" />

      <p>
        The diagonal components ε_ii represent stretching/compression; off-diagonal ε_ij (i≠j)
        represent shear. The <strong>dilatation</strong> (fractional volume change) is the trace:
        θ = ε_ii = ∇·u.
      </p>

      <p>
        The <strong>stress tensor</strong> σ_ij is the i-th component of force per unit area
        on a surface with normal ĵ. The symmetry σ_ij = σ_ji follows from torque balance
        on an infinitesimal volume element.
      </p>

      <p>
        Equilibrium condition (Newton&apos;s 2nd for a volume element):
      </p>

      <EqNumbered number="CE.2" latex="\frac{\partial\sigma_{ij}}{\partial x_j}+f_i=\rho\frac{\partial^2u_i}{\partial t^2} \qquad \text{(Cauchy equation of motion)}" />

      <p>
        where f_i is the body force density (e.g., gravity ρg).
      </p>

      <h2>CE.2 Hooke&apos;s Law for Solids</h2>

      <p>
        For a linear elastic (Hookean) material, stress is proportional to strain:
      </p>

      <EqNumbered number="CE.3" latex="\sigma_{ij}=C_{ijkl}\varepsilon_{kl} \qquad \text{(generalized Hooke's law)}" />

      <p>
        The stiffness tensor C_ijkl has 81 components, reduced to 21 by symmetries. For an
        isotropic material (elastic properties same in all directions):
      </p>

      <EqNumbered number="CE.4" latex="\sigma_{ij}=\lambda\theta\delta_{ij}+2\mu\varepsilon_{ij} \qquad \text{(isotropic elastic solid, Lamé constants }\lambda,\mu\text{)}" />

      <p>
        The two Lamé constants (λ, μ) relate to the familiar moduli:
      </p>

      <p>
        <strong>Young&apos;s modulus</strong> E = μ(3λ+2μ)/(λ+μ) — uniaxial stress/strain ratio.
        <strong>Poisson ratio</strong> ν = λ/(2(λ+μ)) — ratio of transverse to axial strain.
        <strong>Shear modulus</strong> G = μ — shear stress/strain ratio.
        <strong>Bulk modulus</strong> K = λ + 2μ/3 — hydrostatic pressure/volume change.
      </p>

      <Definition number="CE.1" title="Common Elastic Moduli">
        For steel: E ≈ 200 GPa, ν ≈ 0.29, G ≈ 78 GPa.
        For rubber: E ≈ 0.01–0.1 GPa, ν ≈ 0.50 (nearly incompressible, K ≫ G).
        For water (fluid): G = 0 (no shear resistance), K = 2.2 GPa.
        For bone: E ≈ 20 GPa (along axis), highly anisotropic.
        The constraint −1 &lt; ν &lt; ½ follows from thermodynamic stability (positive-definite
        elastic energy). Materials with ν &lt; 0 (auxetic) expand when stretched — exist in
        some foams and metamaterials.
      </Definition>

      <h2>CE.3 Elastic Waves</h2>

      <p>
        Substituting Hooke&apos;s law into the Cauchy equation gives the <strong>Navier equation</strong>:
      </p>

      <EqNumbered number="CE.5" latex="(\lambda+\mu)\nabla(\nabla\cdot\mathbf{u})+\mu\nabla^2\mathbf{u}=\rho\frac{\partial^2\mathbf{u}}{\partial t^2} \qquad \text{(Navier equation)}" />

      <p>
        This supports two types of waves. Decompose u = ∇φ + ∇×H (Helmholtz):
      </p>

      <p>
        <strong>P-waves (compressional, primary)</strong>: longitudinal displacement, ∇×u = 0.
        Faster: v_P = √((λ+2μ)/ρ) = √(K+4G/3)/√ρ.
      </p>

      <p>
        <strong>S-waves (shear, secondary)</strong>: transverse displacement, ∇·u = 0.
        Slower: v_S = √(μ/ρ) = √G/√ρ.
      </p>

      <p>
        For the Earth&apos;s crust: v_P ≈ 6 km/s, v_S ≈ 3.5 km/s. For the Earth&apos;s liquid outer core:
        μ = 0 (fluid) → v_S = 0 (S-waves don&apos;t propagate), which is how we know the outer core
        is liquid. The ratio v_P/v_S = √((λ+2μ)/μ) ≥ √2 (for ν ≥ 0).
      </p>

      <WorkedExample number="CE.1" title="Bending of a Cantilever Beam">
        <p>
          A beam of length L, width b, height h, Young&apos;s modulus E, is clamped at one end
          with force F at the free end. Find the deflection curve and tip deflection.
        </p>
        <Step label="Setup:">Bending moment at position x from clamped end: M(x) = F(L − x). Beam bending equation: EI d²y/dx² = M(x) where I = bh³/12 is the second moment of area.</Step>
        <Step label="Integrate:">EI y&apos;&apos; = F(L−x). EI y&apos; = F(Lx − x²/2) + C₁. At clamped end: y&apos;(0) = 0 → C₁ = 0. EI y = F(Lx²/2 − x³/6) + C₂. At clamped end: y(0) = 0 → C₂ = 0.</Step>
        <Step label="Tip deflection:">y(L) = FL³/(3EI) = FL³/(3E × bh³/12) = 4FL³/(Ebh³). For a steel beam (E = 200 GPa) 1 m × 0.05 m × 0.01 m, F = 100 N: δ = 4×100×1³/(200×10⁹×0.05×10⁻⁶) = 400/10⁴ = 0.04 m = 4 cm.</Step>
        <Step label="Natural frequency:">The fundamental mode of a cantilever: f₁ = (1.875)²/(2πL²) √(EI/ρA) where A = bh. For same beam: f₁ ≈ 35 Hz. Heavier loads lower f₁ — used to measure mass in cantilever MEMS sensors.</Step>
      </WorkedExample>

      <h2>CE.4 Seismic Waves and Geophysics</h2>

      <p>
        Earthquakes generate elastic waves that propagate through the Earth. The <strong>moment
        magnitude</strong> M_w relates to the seismic moment M₀ = G A d (G = shear modulus,
        A = fault area, d = average slip):
      </p>

      <EqNumbered number="CE.6" latex="M_w=\frac{2}{3}\log_{10}(M_0)-10.7 \qquad \text{(moment magnitude scale)}" />

      <p>
        Each unit of M_w is a factor of 10 in seismic moment (factor 31.6 in energy).
        M_w = 9.0 (Tohoku 2011): M₀ ≈ 3.5×10²² N·m, energy ∼10¹⁸ J ≈ 500 million Hiroshima bombs.
      </p>

      <p>
        <strong>Surface waves</strong> (Love and Rayleigh) propagate along the Earth&apos;s surface.
        Rayleigh waves have a retrograde elliptical motion (coupled P and SV), speed ≈ 0.92 v_S.
        Seismic reflection/refraction is used to map Earth&apos;s interior — the same principles as
        ultrasound imaging.
      </p>

      <h2>CE.5 Elastic Energy and Fracture</h2>

      <p>
        The elastic strain energy density:
      </p>

      <EqNumbered number="CE.7" latex="U=\frac{1}{2}\sigma_{ij}\varepsilon_{ij}=\frac{\sigma^2}{2E}\ \text{(uniaxial)} \qquad \text{(elastic energy density)}" />

      <p>
        <strong>Griffith fracture criterion</strong>: a crack of length 2a in a plate under
        stress σ propagates when the strain energy release rate G_I = K_I²/E exceeds the
        fracture toughness G_Ic:
      </p>

      <EqNumbered number="CE.8" latex="K_I=\sigma\sqrt{\pi a} \qquad \text{(stress intensity factor, mode I)}" />

      <p>
        Critical crack length: a_c = K_Ic²/(πσ²). For glass (K_Ic = 0.7 MPa√m) under
        σ = 70 MPa: a_c = 0.49/(π×4900) ≈ 32 μm — scratches this size cause failure!
        For steel (K_Ic = 50 MPa√m): a_c ≈ 16 cm — much more defect-tolerant.
      </p>

      <Definition number="CE.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Stress and strain are tensors:</strong> direction and orientation matter, not just magnitude.</li>
          <li><strong>Linear elasticity is a small-deformation theory:</strong> large rotations or strains require nonlinear measures.</li>
          <li><strong>Young&apos;s modulus is not the only stiffness:</strong> shear, bulk, and Poisson response matter for 3D loading.</li>
          <li><strong>Fluids cannot support static shear:</strong> set μ = 0 for ideal fluids, so S-waves vanish.</li>
          <li><strong>Fracture is defect-controlled:</strong> small cracks can dominate failure even when average stress is modest.</li>
        </ul>
      </Definition>

      <PracticeProblems section="CE.1–CE.5 Continuum Mechanics">
        <Problem n={1} difficulty="easy"
          solution={<>Strain tensor for pure shear: displacement u = (γy, 0, 0) where γ is the shear angle. ε_xx = ∂u_x/∂x = 0. ε_yy = ∂u_y/∂y = 0. ε_xy = ½(∂u_x/∂y + ∂u_y/∂x) = ½(γ + 0) = γ/2. ε_xz = ε_yz = 0. Strain tensor: [[0, γ/2, 0],[γ/2, 0, 0],[0, 0, 0]]. Stress (isotropic): σ_ij = 2με_ij for off-diagonal. σ_xy = 2μ × γ/2 = μγ = Gγ. This is the definition of shear modulus G = σ/γ. Principal strains: eigenvalues of ε tensor: ε_± = ±γ/2. Principal strain directions at ±45° to the shear. Mohr&apos;s circle: radius γ/2, centered at origin. For γ = 0.001 (1 mrad), G = 80 GPa (steel): σ = 80 MPa. Applied to a bolt under torsion: the shear stress is maximum at the surface, causing failure at 45° (tension fracture in brittle materials).</>}>
          Write the strain tensor for a pure shear deformation u_x = γy. Find the corresponding stress and principal strains for an isotropic material.
        </Problem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={82.2} unit="GPa" tolerance={0.05}
          hints={['First find μ = ρ v_S². Then λ + 2μ = ρ v_P², so λ = ρ v_P² − 2μ.', 'Young\'s modulus: E = μ(3λ + 2μ)/(λ + μ).']}
          problemText="The Earth's crust has P-wave speed 6 km/s, S-wave speed 3.5 km/s, and density 2700 kg/m³. Find the Young's modulus E in GPa."
          solution={<>P-wave and S-wave speeds: v_P = √((λ+2μ)/ρ), v_S = √(μ/ρ). Given v_P = 6 km/s, v_S = 3.5 km/s, ρ = 2700 kg/m³: μ = ρv_S² = 2700×(3500)² = 2700×1.225×10⁷ = 3.31×10¹⁰ Pa = 33.1 GPa. λ+2μ = ρv_P² = 2700×(6000)² = 2700×3.6×10⁷ = 9.72×10¹⁰ Pa. λ = 9.72×10¹⁰ − 2×3.31×10¹⁰ = 3.10×10¹⁰ Pa. E = μ(3λ+2μ)/(λ+μ) = 3.31×10¹⁰(3×3.10+2×3.31)/(3.10+3.31)×10¹⁰ = 3.31×10¹⁰×15.92/6.41 = 82.2 GPa. ν = λ/(2(λ+μ)) = 3.10/(2×6.41) = 0.242. Seismic tomography: P-wave travel time inversions map density variations. The outer core (v_S = 0, v_P ≈ 8 km/s) is liquid. The inner core (v_S ≠ 0) is solid iron.</>}>
          The Earth&apos;s crust has P-wave speed 6 km/s, S-wave speed 3.5 km/s, and density 2700 kg/m³. Find the Young&apos;s modulus E (GPa).
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={-96} unit="MPa" tolerance={0.05}
          hints={['Thermal stress: σ = −E α ΔT for a fully clamped rod.', 'Use E = 200 GPa, α = 12×10⁻⁶ /K, ΔT = 40°C. The result is compressive (negative).']}
          problemText="A steel rail (E = 200 GPa, α = 12e-6 /K) is clamped between rigid supports at 20°C. Find the stress in MPa at 60°C (ΔT = 40°C). Enter a negative number for compression."
          solution={<>Thermal stress: rod of length L, linear expansion coefficient α, Young&apos;s modulus E, clamped at both ends. Temperature change ΔT. Free thermal strain: ε_thermal = α ΔT. Constrained: total strain = 0. Mechanical strain = −α ΔT (compression). Thermal stress: σ = E × (−α ΔT) = −Eα ΔT (compressive for ΔT &gt; 0). For steel rail (E = 200 GPa, α = 12×10⁻⁶/K, ΔT = 40°C summer): σ = −200×10⁹×12×10⁻⁶×40 = −96 MPa. Yield strength of rail steel: σ_Y ≈ 700 MPa — no yielding. But if foundation settles, additional bending stress can cause buckling (sun kink). Rail gaps: traditional track has 0.64 cm gap per 12 m rail: δL = αLΔT = 12×10⁻⁶×12×40 = 5.76 mm ≈ gap. Welded rail: deliberately prestressed (neutral temperature chosen to minimize compression in summer + tension in winter).</>}>
          A steel railway rail is clamped between two rigid supports at 20°C. Find the compressive stress (MPa) at 60°C (ΔT = 40°C). At what temperature would it yield?
        </InteractiveProblem>

        <Problem n={4} difficulty="hard"
          solution={<>Rayleigh wave dispersion in a layered medium: surface wave with depth-decaying amplitude. In a homogeneous half-space: v_R ≈ 0.9194 v_S (for ν = 0.25). No dispersion — all frequencies travel at the same speed. In a layered crust: short-wavelength (high-f) waves are confined to the surface layer (lower v_S); long-wavelength (low-f) waves sense the faster deeper rock → v_R(f) increases with period. Dispersion curve: v_R vs period T. Group velocity U = dω/dk (packet speed). Phase velocity c = ω/k. Inversion: measure dispersion curve from earthquake records → invert for v_S(z) profile. Multimodal: fundamental mode + overtones (first, second...). This is the basis of surface wave tomography — imaging global mantle velocity structure. Love waves: horizontally polarized SH shear (no vertical motion). Dispersion: requires velocity increasing with depth. Love and Rayleigh together constrain both vs and the velocity gradient.</>}>
          Explain why Rayleigh waves are dispersive in a layered Earth but not in a homogeneous half-space. How is this dispersion used in seismic tomography?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Strain tensor: ε_ij = ½(∂u_i/∂x_j + ∂u_j/∂x_i). Diagonal = stretch, off-diagonal = shear.',
        'Isotropic Hooke\'s law: σ_ij = λθδ_ij + 2με_ij. Two Lamé constants describe all elastic behavior.',
        'P-waves (longitudinal): v_P = √((λ+2μ)/ρ). S-waves (transverse): v_S = √(μ/ρ). Always v_P > v_S.',
        'Cantilever tip deflection: δ = FL³/(3EI). Stiffness scales as h³ — height is critical.',
        'Griffith fracture: K_I = σ√(πa). Critical crack size a_c = K_Ic²/(πσ²).',
        'Seismic waves map Earth\'s interior. Liquid outer core detected by absence of S-waves.',
      ]} />
    </div>
  );
}
