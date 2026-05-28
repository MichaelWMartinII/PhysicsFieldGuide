import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function MaxwellPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#a855f7' }}>Electromagnetism · Upper Division</div>
      <h1>Maxwell&apos;s Equations</h1>
      <p className="subtitle">
        Four equations. Every electromagnetic phenomenon ever observed — radio waves, light,
        magnetism, the photoelectric effect — follows from them.
      </p>

      <Prerequisites items={['Electric fields (Ch. 13)', 'Magnetic fields (Ch. 15)', 'Induction (Ch. 16)', 'Vectors and calculus (Ch. 21–22)']} />

      <LearningGoals items={[
        'State Maxwell\'s four equations in both integral and differential form and identify what each encodes.',
        'Explain why Maxwell\'s displacement current was necessary for consistency of Ampère\'s law.',
        'Derive the electromagnetic wave equation from Maxwell\'s equations and calculate c = 1/√(μ₀ε₀).',
        'Find the B field associated with a given plane wave E field using Faraday\'s law.',
        'Apply Poynting\'s theorem to relate energy flux to field energy density and Ohmic dissipation.',
      ]} />

      <h2>M.1 The Four Laws in Integral Form</h2>

      <p>
        Maxwell&apos;s equations unify the laws we have studied individually — Gauss&apos;s law,
        Faraday&apos;s law, Ampère&apos;s law — into one consistent system, with one crucial addition:
        the <strong>displacement current</strong>.
      </p>

      <Theorem number="M.1" title="Maxwell's Equations (Integral Form, in vacuum)">
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: 2 }}>
          <div><strong>I. Gauss&apos;s law:</strong> &nbsp; ∮ E·dA = Q_enc/ε₀ &nbsp;&nbsp; (electric field from charges)</div>
          <div><strong>II. Gauss&apos;s law for magnetism:</strong> &nbsp; ∮ B·dA = 0 &nbsp;&nbsp; (no magnetic monopoles)</div>
          <div><strong>III. Faraday&apos;s law:</strong> &nbsp; ∮ E·dl = −dΦ_B/dt &nbsp;&nbsp; (changing B creates E)</div>
          <div><strong>IV. Ampère–Maxwell law:</strong> &nbsp; ∮ B·dl = μ₀(I + ε₀ dΦ_E/dt) &nbsp;&nbsp; (current and changing E create B)</div>
        </div>
      </Theorem>

      <p>
        The new term ε₀ dΦ_E/dt is Maxwell&apos;s 1865 addition. Without it, Ampère&apos;s law was
        inconsistent — charge conservation was violated at a capacitor plate. With it, the
        equations are consistent, and they predict electromagnetic waves.
      </p>

      <h2>M.2 The Differential Form</h2>

      <p>
        Using the divergence theorem and Stokes&apos; theorem, the integral forms convert to
        differential equations that hold at every point in space:
      </p>

      <EqNumbered number="M.1">∇·E = ρ/ε₀ &nbsp;&nbsp;&nbsp;&nbsp; ∇·B = 0</EqNumbered>

      <EqNumbered number="M.2">∇×E = −∂B/∂t &nbsp;&nbsp;&nbsp;&nbsp; ∇×B = μ₀J + μ₀ε₀ ∂E/∂t</EqNumbered>

      <p>
        Here ρ is charge density (C/m³) and J is current density (A/m²). The differential
        forms are local — they describe what happens at each point, rather than requiring
        integration over surfaces and loops. In free space (ρ = 0, J = 0) the equations
        are perfectly symmetric between E and B.
      </p>

      <h2>M.3 Electromagnetic Waves</h2>

      <p>
        In free space, take the curl of Faraday&apos;s law and substitute the Ampère-Maxwell law:
      </p>

      <EqNumbered number="M.3">∇²E = μ₀ε₀ ∂²E/∂t² &nbsp;&nbsp;&nbsp; (wave equation for E)</EqNumbered>

      <p>
        This is the wave equation with speed:
      </p>

      <EqNumbered number="M.4">c = 1/√(μ₀ε₀) = 2.998×10⁸ m/s</EqNumbered>

      <p>
        Maxwell calculated this in 1865 from the measured values of μ₀ and ε₀ — and recognized
        it as the speed of light. Light is an electromagnetic wave. This was one of the great
        unifications in the history of physics: electricity, magnetism, and optics were one subject.
      </p>

      <WorkedExample number="M.1" title="Displacement Current in a Charging Capacitor">
        <p>
          A parallel-plate capacitor (plate area A) is being charged by current I. Find the
          displacement current density between the plates and verify Ampère&apos;s law is satisfied.
        </p>
        <Step label="E between plates:">E = σ/ε₀ = Q/(ε₀A). &nbsp; dE/dt = (1/ε₀A) dQ/dt = I/(ε₀A)</Step>
        <Step label="Displacement current density:">J_d = ε₀ dE/dt = I/A (same as conduction current density in wires!)</Step>
        <Step label="Total displacement current:">I_d = J_d × A = I — exactly the conduction current I entering the capacitor.</Step>
        <Step label="Consistency:">Ampère&apos;s law now works for any surface bounded by the Amperian loop — the result is the same whether the surface passes through the wire (I) or between the plates (I_d). ✓</Step>
      </WorkedExample>

      <WorkedExample number="M.2" title="Plane Wave Solution">
        <p>
          Verify that E(z,t) = E₀ x̂ sin(kz − ωt) is a solution to Maxwell&apos;s equations in
          free space, and find the associated B field.
        </p>
        <Step label="Wave equation:">∂²E/∂z² = −k²E₀ sin(kz−ωt). &nbsp; ∂²E/∂t² = −ω²E₀ sin(kz−ωt).</Step>
        <Step label="Condition:">k² = μ₀ε₀ω² → ω/k = c ✓</Step>
        <Step label="B from Faraday:">∇×E = −∂B/∂t → ∂E_x/∂z ŷ = kE₀cos(kz−ωt) ŷ = −∂B/∂t</Step>
        <Step label="Integrate:">B = (E₀k/ω) ŷ sin(kz−ωt) = (E₀/c) ŷ sin(kz−ωt)</Step>
        <Step label="Result:">B ⊥ E ⊥ k̂, |B| = |E|/c. The fields are perpendicular and in phase. ✓</Step>
      </WorkedExample>

      <h2>M.4 Energy and the Poynting Vector</h2>

      <p>
        Electromagnetic fields carry energy. The <strong>energy density</strong> stored in
        the fields is:
      </p>

      <EqNumbered number="M.5">u = ½ε₀E² + B²/(2μ₀)</EqNumbered>

      <p>
        The rate of energy flow per unit area is given by the <strong>Poynting vector</strong>:
      </p>

      <EqNumbered number="M.6">S = (1/μ₀) E × B &nbsp;&nbsp;&nbsp; [W/m²]</EqNumbered>

      <p>
        For a plane wave, S = (E²/μ₀c) ẑ — energy flows in the direction of propagation,
        as it must. The time-averaged intensity (irradiance) is I = ⟨|S|⟩ = E₀²/(2μ₀c) =
        cε₀E₀²/2. This connects Maxwell&apos;s equations directly to the intensity observed in
        optics experiments.
      </p>

      <Definition number="M.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Integral and differential forms are equivalent only with the right calculus theorems:</strong> use Gauss for flux and Stokes for circulation.</li>
          <li><strong>Displacement current is not optional:</strong> it is required by charge conservation and predicts EM waves.</li>
          <li><strong>Free-space waves are transverse:</strong> E, B, and propagation direction are mutually perpendicular.</li>
          <li><strong>The Poynting vector gives energy flux:</strong> its direction is the direction of field energy transport, not necessarily wire current direction.</li>
        </ul>
      </Definition>

      <PracticeProblems section="M.1–M.4 Maxwell's Equations">
        <InteractiveProblem n={1} difficulty="easy"
          answer={3.0e8} unit="m/s" tolerance={0.002}
          hints={['c = 1/√(μ₀ε₀)', 'μ₀ = 4π×10⁻⁷ H/m, ε₀ = 8.854×10⁻¹² F/m', 'μ₀ε₀ ≈ 1.113×10⁻¹⁷ s²/m²']}
          problemText="Calculate c = 1/√(μ₀ε₀) using μ₀ = 4π×10⁻⁷ H/m and ε₀ = 8.854×10⁻¹² F/m."
          solution={<>μ₀ε₀ = 1.113×10⁻¹⁷ → c = 1/√(1.113×10⁻¹⁷) = <strong>2.998×10⁸ m/s</strong> ✓</>}>
          Calculate c = 1/√(μ₀ε₀) using μ₀ = 4π×10⁻⁷ H/m and ε₀ = 8.854×10⁻¹² F/m. Compare to the known speed of light.
        </InteractiveProblem>

        <Problem n={2} difficulty="medium"
          solution={<>Gauss&apos;s law for B (∇·B = 0 or ∮B·dA = 0) says the total magnetic flux through any closed surface is zero. This means magnetic field lines never begin or end — they always form closed loops. If magnetic monopoles existed, ∮B·dA = μ₀ q_m (magnetic charge) ≠ 0. Dirac showed in 1931 that if even one monopole exists in the universe, it would quantize all electric charge — explaining why all observed charges are multiples of e. Searches continue at LHC and in cosmic rays; none found yet.</>}>
          Explain the physical meaning of ∇·B = 0. What would it mean if this were not zero? What is the significance of Dirac&apos;s magnetic monopole argument?
        </Problem>

        <Problem n={3} difficulty="medium"
          solution={<>Plane wave E = E₀ ŷ sin(kx−ωt). From Faraday&apos;s law, ∇×E = ∂E_y/∂x ẑ = kE₀cos(kx−ωt) ẑ = −∂B/∂t, so B = (E₀/c) ẑ sin(kx−ωt). Thus |B| = E₀/c and E, B, and the propagation direction are mutually perpendicular. Energy density: u = ½ε₀E₀² sin²(kx−ωt) + (E₀/c)²/(2μ₀) sin²(kx−ωt). Since c = 1/√(μ₀ε₀), the electric and magnetic contributions are equal, and ⟨u⟩ = ε₀E₀²/2.</>}>
          For a plane wave polarized in the ŷ direction traveling in x, show that the electric and magnetic energy densities are equal. Find the time-averaged total energy density.
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>The Poynting vector theorem (EM energy conservation): ∂u/∂t + ∇·S = −J·E (energy dissipated by currents). Derivation: take E·(Ampère-Maxwell) − B·(Faraday): E·(∇×B) − B·(∇×E) = μ₀J·E + μ₀ε₀E·∂E/∂t + B·∂B/∂t. Left side = ∇·(E×B) by vector identity. Right = μ₀J·E + ½μ₀∂(ε₀E²+B²/μ₀)/∂t. Rearrange: ∂u/∂t + ∇·S = −J·E, where S = E×B/μ₀ (Poynting vector) and u = ½(ε₀E²+B²/μ₀). This is Poynting&apos;s theorem — EM energy continuity equation.</>}>
          Derive Poynting&apos;s theorem ∂u/∂t + ∇·S = −J·E from Maxwell&apos;s equations. Interpret each term physically.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        '∇·E = ρ/ε₀: charges create diverging electric field lines.',
        '∇·B = 0: no magnetic monopoles; B field lines always form closed loops.',
        '∇×E = −∂B/∂t: changing B creates a curling E (Faraday).',
        '∇×B = μ₀J + μ₀ε₀∂E/∂t: currents and changing E create B. The second term is Maxwell\'s addition.',
        'Free space: c = 1/√(μ₀ε₀) = 3×10⁸ m/s — light is an electromagnetic wave.',
        'Poynting vector S = E×B/μ₀ gives power flow per area; energy density u = ½(ε₀E²+B²/μ₀).',
      ]} />
    </div>
  );
}
