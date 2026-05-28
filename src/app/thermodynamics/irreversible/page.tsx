import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function IrreversiblePage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#f97316' }}>Thermodynamics · Upper Division</div>
      <h1>Irreversible Processes &amp; Transport</h1>
      <p className="subtitle">
        Real processes are irreversible — they produce entropy. The phenomenology of entropy
        production, driven by gradients in temperature, concentration, and velocity, leads to
        heat conduction, diffusion, and viscosity — the transport coefficients.
      </p>

      <Prerequisites items={['Laws of thermodynamics (Ch. 12)', 'Statistical mechanics (Ch. S)', 'Partial derivatives']} />

      <LearningGoals items={[
        'Express entropy production rate as a sum of flux-force products and state why it is non-negative.',
        'Apply Fourier\'s, Fick\'s, and Ohm\'s laws as examples of the linear flux-force relationship.',
        'State the Onsager reciprocal relations and connect them to thermoelectric effects.',
        'Derive the diffusion equation from Fick\'s law and the continuity equation.',
        'Apply the Einstein-Stokes relation to compute diffusion coefficients from fluid viscosity.',
      ]} />

      <h2>IR.1 Entropy Production</h2>

      <p>
        The second law states dS ≥ δQ/T, with equality for reversible processes. For an
        isolated system, entropy never decreases. The <strong>entropy production rate</strong> σ
        (per unit volume) is always non-negative:
      </p>

      <EqNumbered number="IR.1">σ = J_q · ∇(1/T) + J · (−∇μ/T) + ... ≥ 0</EqNumbered>

      <p>
        Here J_q is heat flux and J is particle flux. Each term is a product of a <strong>flux</strong>
        and a <strong>thermodynamic force</strong> (gradient of an intensive variable). Entropy
        production reaches zero only when all gradients vanish — equilibrium.
      </p>

      <h2>IR.2 Phenomenological Laws</h2>

      <p>
        The linear response between fluxes and forces (valid near equilibrium):
      </p>

      <EqNumbered number="IR.2">J_q = −κ ∇T &nbsp;&nbsp;&nbsp; (Fourier&apos;s law, heat conduction)</EqNumbered>

      <EqNumbered number="IR.3">J = −D ∇n &nbsp;&nbsp;&nbsp; (Fick&apos;s law, diffusion)</EqNumbered>

      <EqNumbered number="IR.4">J_elec = σ E = −σ ∇V &nbsp;&nbsp;&nbsp; (Ohm&apos;s law)</EqNumbered>

      <p>
        These three laws have the same form: flux = −(coefficient) × (gradient of intensive
        variable). The transport coefficients κ (thermal conductivity, W/m·K), D (diffusion
        coefficient, m²/s), and σ (electrical conductivity, S/m) are not independent —
        they are related by microscopic physics.
      </p>

      <h2>IR.3 Onsager Reciprocal Relations</h2>

      <p>
        Onsager (1931) proved that the cross-coefficients in the flux-force matrix are equal:
      </p>

      <EqNumbered number="IR.5">Lᵢⱼ = Lⱼᵢ &nbsp;&nbsp;&nbsp; (Onsager reciprocal relations)</EqNumbered>

      <p>
        These relate thermoelectric effects: the Seebeck effect (heat flow drives electric
        current) and the Peltier effect (electric current drives heat flow) have coefficients
        related by L₁₂ = L₂₁. The proof uses time-reversal symmetry of microscopic dynamics.
        Onsager won the 1968 Nobel Prize for this fundamental result.
      </p>

      <p>
        <strong>Thermoelectric effects (Seebeck and Peltier):</strong> A temperature gradient
        drives a current (Seebeck, basis of thermocouples); a current drives heat flow (Peltier,
        basis of solid-state cooling — no moving parts). The figure of merit ZT = S²σT/κ
        (S = Seebeck coefficient) must exceed ~3 for competitive cooling devices. Current
        best: ZT ≈ 2.5 in some nanostructured materials.
      </p>

      <WorkedExample number="IR.1" title="Heat Conduction Through a Wall">
        <p>
          A wall (area A, thickness L, conductivity κ) separates regions at temperatures T₁
          and T₂ &gt; T₁. Find the heat flux and entropy production rate.
        </p>
        <Step label="Fourier's law:">J_q = −κ ∇T = κ(T₂−T₁)/L (magnitude, directed from hot to cold)</Step>
        <Step label="Heat flow rate:">Q̇ = A J_q = κ A(T₂−T₁)/L &nbsp;&nbsp; (thermal resistance R = L/(κA))</Step>
        <Step label="Entropy production:">σ = J_q · ∇(1/T). In 1D: σ = −J_q (1/T)&apos; = J_q × (T₂−T₁)/(LT²) ≈ Q̇(T₂−T₁)/(AT²). Integrated: σ̇_total = Q̇(1/T₁ − 1/T₂) &gt; 0 ✓.</Step>
        <Step label="Physical meaning:">The cold side gains entropy Q̇/T₁; the hot side loses Q̇/T₂. Net entropy production Q̇(1/T₁−1/T₂) &gt; 0 as required by the 2nd law.</Step>
      </WorkedExample>

      <h2>IR.4 Diffusion Equation</h2>

      <p>
        Combining Fick&apos;s law J = −D∇n with the continuity equation ∂n/∂t + ∇·J = 0:
      </p>

      <EqNumbered number="IR.6">∂n/∂t = D ∇²n &nbsp;&nbsp;&nbsp; (diffusion equation)</EqNumbered>

      <p>
        This is the <strong>heat equation</strong> with n → T, D → κ/(ρc_p) ≡ α (thermal
        diffusivity). It is a parabolic PDE: information propagates instantaneously (infinite
        speed) — a result of the approximation that ignores the finite time for microscopic
        collisions.
      </p>

      <p>
        Solution for a point source at origin at t=0:
      </p>

      <EqNumbered number="IR.7">n(r, t) = N/(4πDt)^(3/2) × exp(−r²/(4Dt)) &nbsp;&nbsp;&nbsp; (Gaussian spreading)</EqNumbered>

      <p>
        The concentration spreads as a Gaussian with width σ = √(2Dt). The mean-square
        displacement ⟨r²⟩ = 6Dt — Einstein&apos;s 1905 result for Brownian motion.
        Einstein&apos;s relation connects D to the mobility μ = D/(k_BT) — both arise from the same
        thermal fluctuations.
      </p>

      <Theorem number="IR.1" title="Fluctuation-Dissipation Theorem">
        The dissipation (irreversibility) and the fluctuations of a system in equilibrium
        are related:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          D = k_BT / (6πηR) = k_BT μ &nbsp;&nbsp;&nbsp;&nbsp; (Einstein-Stokes relation)
        </span>
        The same friction (η) that dissipates energy also drives the random kicks (Brownian
        motion) that diffuse particles. This fundamental relation extends to: Johnson-Nyquist
        noise ⟨V²⟩ = 4k_BTR (thermal noise in resistor R), Wiener-Khinchin (power spectrum
        of fluctuations = dissipative part of response), and quantum version (zero-point
        fluctuations at T=0).
      </Theorem>

      <Definition number="IR.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Entropy production is local and nonnegative near equilibrium:</strong> individual flux terms can be coupled, but the total production cannot be negative.</li>
          <li><strong>Flux points down the gradient:</strong> the minus sign in Fourier&apos;s and Fick&apos;s laws encodes hot-to-cold and high-to-low flow.</li>
          <li><strong>Onsager symmetry needs microscopic reversibility:</strong> magnetic fields and active driving can modify reciprocal relations.</li>
          <li><strong>Diffusion width grows as √t:</strong> mean-square displacement is linear in time, not the displacement itself.</li>
        </ul>
      </Definition>

      <PracticeProblems section="IR.1–IR.4 Irreversible Processes">
        <InteractiveProblem n={0} difficulty="easy"
          answer={44.0} unit="μm²/s" tolerance={0.03}
          hints={['Einstein-Stokes: D = k_BT/(6πηR). Use k_B = 1.381×10⁻²³ J/K, η = 10⁻³ Pa·s, R = 5×10⁻⁹ m, T = 300 K. Convert m²/s → μm²/s by multiplying by 10¹².']}
          problemText="Using the Einstein-Stokes relation D = k_BT/(6πηR), find the diffusion coefficient (in μm²/s) of a protein with Stokes radius R = 5 nm in water (η = 10⁻³ Pa·s) at T = 300 K."
          solution={<>D = (1.381×10⁻²³ × 300) / (6π × 10⁻³ × 5×10⁻⁹) = 4.14×10⁻²¹ / 9.42×10⁻¹¹ = 4.40×10⁻¹¹ m²/s = <strong>44.0 μm²/s</strong>.</>}>
          Use the Einstein-Stokes relation D = k_BT/(6πηR) to find the diffusion coefficient (in μm²/s) of a protein with Stokes radius R = 5 nm in water (η = 10⁻³ Pa·s) at T = 300 K.
        </InteractiveProblem>

        <Problem n={1} difficulty="easy"
          solution={<>Fick&apos;s law 1D: J = −D dn/dx. Steady state: d²n/dx² = 0 → n = n₁ + (n₂−n₁)x/L. J = D(n₁−n₂)/L. For O₂ across a cell membrane: L = 10 nm, D_O₂ = 10⁻⁹ m²/s (in water), Δn = 10¹⁸ m⁻³ (dissolved O₂ gradient). J = 10⁻⁹ × 10¹⁸/10⁻⁸ = 10¹⁷ molecules/m²/s = 1.7×10⁻⁷ mol/m²/s. For cell area 100 μm²: flux = 1.7×10⁻⁷ × 10⁻⁸ = 1.7×10⁻¹⁵ mol/s = about 10⁹ O₂ molecules/s. Typical cell consumes 10⁹ ATP/s, requiring ~10⁸ O₂/s → diffusion is marginally adequate for small cells. Large cells (neurons) need active transport (hemoglobin).</>}>
          Apply Fick&apos;s law to find the oxygen flux across a cell membrane 10 nm thick, given a concentration difference of 10¹⁸ m⁻³. Is passive diffusion adequate for cell respiration?
        </Problem>

        <Problem n={2} difficulty="medium"
          solution={<>Peltier cooler: current I flows through Bi₂Te₃ junctions. Seebeck S ≈ 200 μV/K. Thermal conductance K = κA/L. Heat pumped: Q̇_Peltier = S×T_cold×I. Joule heating (returned to cold side): Q̇_Joule = I²R/2. Net cooling: Q̇_cool = S×T_cold×I − I²R/2 − K(T_hot−T_cold). Optimize I: dQ̇_cool/dI = 0 → I_opt = S×T_cold/R. At optimum: Q̇_cool = S²T_cold²/(2R) − KΔT. COP = Q̇_cool/P_elec (P = SI_opt ΔT + I²_opt R). Maximum temperature difference: ΔT_max = ZT_cold²/2 where Z = S²/(Rκ) = S²σ/κ (figure of merit). For ZT = 1, T_cold = 250K: ΔT_max = 31 K — can cool to −21°C from room temperature. Higher ZT = better cooling; goal is ZT&gt;3 for competitive refrigerators.</>}>
          Analyze a Peltier cooler: find the optimal current for maximum cooling power and the maximum achievable temperature difference in terms of ZT.
        </Problem>

        <Problem n={3} difficulty="medium"
          solution={<>Brownian motion simulation: ⟨r²⟩ = 6Dt. For glucose molecule (R≈5Å) in water at 37°C: D = k_BT/(6πηR) = 1.38×10⁻²³×310/(6π×10⁻³×5×10⁻¹⁰) = 4.28×10⁻¹¹/9.42×10⁻¹² = 4.5×10⁻¹⁰ m²/s. rms displacement in 1s: √(6×4.5×10⁻¹⁰×1) = 52 μm. In 1ms: 1.6 μm. In 1μs: 52 nm. Glucose diffuses across a 1 μm cell in ~1ms — very fast! But for a protein (R≈5nm): D = 4.5×10⁻¹¹ m²/s → 1 μm takes ~10ms. The cell uses active transport (motor proteins) for molecules that diffuse too slowly, especially in axons where the cell body is meters away.</>}>
          Calculate the diffusion coefficient of glucose (radius 0.5 nm) in water at 37°C using the Einstein-Stokes relation. How long to diffuse across a 1 μm cell?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Johnson-Nyquist noise: thermal fluctuations in resistor R at temperature T. By FDT: S_V(f) = 4k_BTR (power spectral density, V²/Hz). Mean-square voltage: ⟨V²⟩ = 4k_BTR×Δf (over bandwidth Δf). For R=1kΩ, T=300K, Δf=1MHz: ⟨V⟩_rms = √(4×1.38×10⁻²³×300×10³×10⁶) = √(1.66×10⁻¹¹) = 4.1 μV. Signal-to-noise: if signal V_s ≫ 4.1 μV. Derivation: model resistor as Langevin equation. Current fluctuation dI/dt = −(R/L)I + ξ(t) where ξ is white noise. In steady state: ⟨I²⟩ = k_BT/L (equipartition). Voltage noise: S_V = 4k_BTR. Quantum version at low T: S_V = 2ℏωR coth(ℏω/2k_BT) — at T=0: S_V = 2ℏωR ≠ 0 (zero-point fluctuations). Quantum noise sets the fundamental limit for amplifiers.</>}>
          Derive the Johnson-Nyquist noise voltage ⟨V²⟩ = 4k_BTRΔf from the fluctuation-dissipation theorem. What is the rms noise voltage for a 1 kΩ resistor at room temperature in 1 MHz bandwidth?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Entropy production σ = Σ Jᵢ Xᵢ ≥ 0 (flux × force). Zero only at equilibrium.',
        'Fourier: J_q = −κ∇T. Fick: J = −D∇n. Ohm: J = σE. Same structure: flux = coefficient × gradient.',
        'Onsager: L_ij = L_ji — cross-effects (Seebeck/Peltier, Soret/Dufour) are related by time-reversal.',
        'Diffusion equation: ∂n/∂t = D∇²n. Gaussian spreading: ⟨r²⟩ = 6Dt.',
        'Einstein-Stokes: D = k_BT/(6πηR). Mobility and diffusivity related by k_BT.',
        'Fluctuation-dissipation: Johnson-Nyquist noise ⟨V²⟩ = 4k_BTRΔf. Same physics as friction.',
      ]} />
    </div>
  );
}
