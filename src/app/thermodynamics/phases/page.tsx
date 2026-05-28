import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function PhasesPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#f97316' }}>Thermodynamics · Upper Division</div>
      <h1>Phase Transitions</h1>
      <p className="subtitle">
        Phase transitions — melting, boiling, ferromagnetism, superconductivity — are collective
        phenomena where macroscopic properties change discontinuously. They are among the
        most beautiful applications of thermodynamics and statistical mechanics.
      </p>

      <Prerequisites items={['Laws of thermodynamics (Ch. 12)', 'Statistical mechanics (Ch. S)', 'Basic calculus']} />

      <LearningGoals items={[
        'Apply the Gibbs phase rule to determine degrees of freedom for single and multi-component systems.',
        'Use the Clausius-Clapeyron equation to find coexistence curve slopes from latent heat and volume change.',
        'Distinguish first-order and second-order phase transitions by their signatures in entropy and heat capacity.',
        'Minimize the Landau free energy to find the order parameter and its temperature dependence.',
        'Explain the concept of universality and why critical exponents are independent of microscopic details.',
      ]} />

      <h2>P.1 Phase Diagrams and Coexistence</h2>

      <p>
        A <strong>phase diagram</strong> maps the equilibrium phase of a substance in the (T, P)
        plane. The boundaries between phases are <strong>coexistence curves</strong> where two
        phases can exist simultaneously. Three curves meet at the <strong>triple point</strong>
        — the unique (T, P) where all three phases coexist. The liquid–gas curve ends at the
        <strong>critical point</strong> (Tc, Pc) beyond which liquid and gas become indistinguishable.
      </p>

      <Definition number="P.1" title="Gibbs Phase Rule">
        For a system with C chemical components and P phases in thermodynamic equilibrium, the
        number of independent intensive variables (degrees of freedom) is:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          F = C − P + 2
        </span>
        For pure water (C=1): single phase → F=2 (T and P free); two-phase coexistence → F=1
        (a curve in the T-P plane); triple point → F=0 (a fixed point).
      </Definition>

      <h2>P.2 The Clausius–Clapeyron Equation</h2>

      <p>
        Along a coexistence curve, two phases α and β have equal Gibbs free energy:
        G_α(T, P) = G_β(T, P). Differentiating this equality with respect to T along the curve:
      </p>

      <EqNumbered number="P.1" latex="\frac{dP}{dT}=\frac{L}{T\Delta V} \qquad \text{(Clausius-Clapeyron)}" />

      <p>
        Here L is the <strong>latent heat</strong> (heat absorbed per mole at the transition) and
        ΔV = V_β − V_α is the molar volume change. This equation determines the slope of every
        coexistence curve:
      </p>

      <p>
        <strong>Liquid–gas:</strong> ΔV ≈ RT/P (ideal gas), so dP/dT = LP/(RT²), giving
        P = P₀ exp(−L/RT) — the vapor pressure increases exponentially with temperature.
      </p>

      <p>
        <strong>Solid–liquid:</strong> ΔV is small (liquids and solids have similar densities).
        For water, ΔV &lt; 0 (ice is less dense than water), so dP/dT &lt; 0 — increasing pressure
        lowers the melting point. Ice melts under pressure, which is why ice skating works (though
        the effect is only 0.007°C/atm, too small to matter for skating — surface friction actually
        explains that).
      </p>

      <WorkedExample number="P.1" title="Vapor Pressure of Water">
        <p>
          Use Clausius–Clapeyron to estimate the boiling point of water at 0.5 atm (high altitude).
          Given: L = 40.7 kJ/mol at 100°C.
        </p>
        <Step label="Integrated form:">ln(P₂/P₁) = −(L/R)(1/T₂ − 1/T₁)</Step>
        <Step label="Known point:">P₁ = 1 atm at T₁ = 373 K</Step>
        <Step label="Solve for T₂:">1/T₂ = 1/T₁ − (R/L)ln(P₂/P₁) = 1/373 − (8.314/40700)ln(0.5)</Step>
        <Step label="Compute:">= 0.002681 − (2.04×10⁻⁴)(−0.693) = 0.002681 + 0.000141 = 0.002822 K⁻¹</Step>
        <Step label="T₂:">T₂ = 1/0.002822 = 354 K = 81°C. Water boils at ~81°C at altitude — your pasta takes longer to cook.</Step>
      </WorkedExample>

      <h2>P.3 First and Second Order Phase Transitions</h2>

      <Definition number="P.2" title="Order of a Phase Transition">
        <span style={{ display: 'block', marginBottom: '0.4rem' }}>
          <strong>First-order transition:</strong> The first derivative of G (entropy S = −∂G/∂T
          and volume V = ∂G/∂P) is discontinuous. There is latent heat. Examples: melting,
          boiling, liquid crystal transitions.
        </span>
        <span style={{ display: 'block' }}>
          <strong>Second-order (continuous) transition:</strong> The first derivative of G is
          continuous but the second derivative (heat capacity Cp = −T∂²G/∂T²) diverges.
          No latent heat. Examples: ferromagnetic Curie point, superconducting transition,
          liquid He superfluidity, critical point.
        </span>
      </Definition>

      <p>
        At a second-order transition, the system develops an <strong>order parameter</strong>
        that grows continuously from zero. For a ferromagnet, this is the spontaneous
        magnetization M; for a superconductor, the amplitude of the Cooper pair wavefunction.
      </p>

      <h2>P.4 Landau Theory</h2>

      <p>
        Near a continuous phase transition, Landau (1937) proposed expanding the Gibbs free energy
        in powers of the order parameter φ:
      </p>

      <EqNumbered number="P.2" latex="G(T,\phi)=G_0+a(T)\phi^2+b\phi^4+\cdots \qquad (b>0)" />

      <p>
        where a(T) = a₀(T − Tc) changes sign at the critical temperature Tc. For T &gt; Tc,
        the minimum is at φ = 0 (disordered phase). For T &lt; Tc, two minima appear at
        φ = ±√(−a/2b) — spontaneous symmetry breaking.
      </p>

      <EqNumbered number="P.3" latex="|\phi|\propto (T_c-T)^\beta \qquad \beta=\frac{1}{2}\ \text{(Landau mean-field)}" />

      <p>
        The exponent β = ½ is the <strong>mean-field critical exponent</strong>. Real systems
        near the critical point have β ≈ 0.326 (Ising model in 3D) — a universal value that
        depends only on the symmetry of the order parameter and the dimensionality, not on
        microscopic details. This universality is explained by the renormalization group.
      </p>

      <WorkedExample number="P.2" title="Ferromagnetic Phase Transition">
        <p>
          The Ising model in mean-field approximation gives the self-consistency equation
          m = tanh(Jzm/k_BT), where m is the magnetization per site, z is coordination number,
          J is exchange energy. Find Tc and m(T) near Tc.
        </p>
        <Step label="At Tc:">For small m, tanh(x) ≈ x − x³/3. m = (Jz/k_BT)m − (Jz/k_BT)³ m³/3</Step>
        <Step label="Critical condition:">Non-trivial solution requires Jz/k_BTc = 1 → Tc = Jz/k_B</Step>
        <Step label="Near Tc:">Let τ = (T−Tc)/Tc ≪ 1. Then m² ≈ 3(1 − T/Tc)/(Jz/k_BT)³ ∝ (Tc−T)</Step>
        <Step label="Order parameter:">m ∝ (Tc − T)^(1/2) — the mean-field β = 1/2 exponent.</Step>
        <Step label="Heat capacity:">C jumps discontinuously at Tc but has no divergence — a characteristic of mean-field theory (real Ising: C diverges logarithmically in 2D, as (T−Tc)^(−α) in 3D).</Step>
      </WorkedExample>

      <Definition number="P.3" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Phase-rule P means number of phases:</strong> do not confuse it with pressure in F = C - P + 2.</li>
          <li><strong>Latent heat marks first-order transitions:</strong> continuous transitions have no latent heat even though heat capacity can diverge.</li>
          <li><strong>The sign of ΔV matters:</strong> water&apos;s melting curve slopes backward because ice has larger molar volume than liquid water.</li>
          <li><strong>Mean-field exponents are not universal truth:</strong> real critical exponents depend on symmetry and dimensionality.</li>
        </ul>
      </Definition>

      <PracticeProblems section="P.1–P.4 Phase Transitions">
        <InteractiveProblem n={0} difficulty="easy"
          answer={0.75} unit="°C" tolerance={0.03}
          hints={['From Clausius-Clapeyron: dT/dP = −0.0075 K/atm for ice-water. ΔT = (dT/dP) × ΔP. Take the magnitude.']}
          problemText="The Clausius-Clapeyron slope for ice-water is dT/dP = −0.0075 °C/atm. By how many °C does the melting point decrease (magnitude) when pressure increases by 100 atm?"
          solution={<>|ΔT| = 0.0075 × 100 = <strong>0.75 °C</strong>. The negative dT/dP for ice is unique among common substances (water expands on freezing) and is why ice can melt under pressure, though the effect is far too small to explain ice skating.</>}>
          State the triple point and critical point conditions for water. Why is the triple point used to define the Kelvin temperature scale? What is a supercritical fluid?
        </InteractiveProblem>

        <Problem n={1} difficulty="easy"
          solution={<>Triple point of water: T = 273.16 K, P = 611.7 Pa = 0.006 atm. By Gibbs phase rule: C=1, P_phases=3, F = 1−3+2 = 0 degrees of freedom — the triple point is a unique fixed point, no freedom to vary T or P while maintaining three-phase coexistence. Critical point: T = 647.1 K, P = 22.06 MPa = 218 atm. Above Tc: no distinction between liquid and gas — a supercritical fluid. It has liquid-like density and gas-like diffusivity. CO₂ at its critical point (T=304K, P=7.4 MPa) is used as a solvent in decaffeination and dry cleaning.</>}>
          State the triple point and critical point conditions for water. Why is the triple point used to define the Kelvin temperature scale? What is a supercritical fluid?
        </Problem>

        <Problem n={2} difficulty="medium"
          solution={<>Clausius–Clapeyron for ice–water: dP/dT = L/(TΔV). L_fus = 6010 J/mol. T = 273 K. ΔV = V_liquid − V_solid = (18/1000 − 18/917) × 10⁻³ = (18×10⁻⁶)(1 − 1/0.917) = 18×10⁻⁶ × (−0.0905) = −1.63×10⁻⁶ m³/mol. dP/dT = 6010/(273 × (−1.63×10⁻⁶)) = −1.35×10⁷ Pa/K = −134 atm/K. So dT/dP = −0.0075 K/atm. At 100 atm: ΔT = −0.75°C — negligible for ice skating. The modern explanation for skating is lubrication by a quasi-liquid layer on ice surfaces, not pressure melting.</>}>
          Calculate dP/dT for the ice–water coexistence curve. How much does pressure lower the melting point? Does this explain ice skating?
        </Problem>

        <Problem n={3} difficulty="medium"
          solution={<>Landau theory for second-order transition: G = a(T−Tc)φ² + bφ⁴. Minimizing: ∂G/∂φ = 2a(T−Tc)φ + 4bφ³ = 0. Solutions: φ=0 (T&gt;Tc, minimum) or φ²= −a(T−Tc)/(2b) (T&lt;Tc). Order parameter: |φ| ∝ (Tc−T)^(1/2). Heat capacity: G_min = 0 for T&gt;Tc; G_min = −a²(T−Tc)²/(4b) for T&lt;Tc. C = −T∂²G/∂T² gives jump ΔC = Ta²/(2b) at Tc (discontinuous but no divergence). This is the mean-field prediction — real systems show C ∝ |T−Tc|^(−α) with α≈0.11 for 3D Ising universality class.</>}>
          Minimize the Landau free energy G = a(T−Tc)φ² + bφ⁴ to find the order parameter and heat capacity on both sides of Tc.
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Van der Waals equation: (P + a/v²)(v − b) = RT, where v = V/n is molar volume. Critical point: ∂P/∂v = 0 and ∂²P/∂v² = 0 simultaneously. From P = RT/(v−b) − a/v²: ∂P/∂v = −RT/(v−b)² + 2a/v³ = 0 and ∂²P/∂v² = 2RT/(v−b)³ − 6a/v⁴ = 0. Dividing: (v−b)/2 = v/3 → v_c = 3b. Back-substituting: T_c = 8a/(27Rb), P_c = a/(27b²). Reduced variables: T_r = T/T_c, P_r = P/P_c, v_r = v/v_c. Law of corresponding states: (P_r + 3/v_r²)(3v_r − 1) = 8T_r — universal equation! All van der Waals gases have the same reduced equation of state. This prediction of universal behavior near the critical point motivated modern critical phenomena theory.</>}>
          Find the critical point (Tc, Pc, Vc) of the van der Waals gas. Show that the reduced equation of state (in terms of Tr = T/Tc, etc.) is universal — the law of corresponding states.
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Coexistence curves separate phases; triple point (all three phases) has F=0; critical point ends liquid–gas curve.',
        'Clausius–Clapeyron: dP/dT = L/(TΔV) — slope of coexistence curve from latent heat and volume change.',
        'First-order: latent heat, discontinuous S and V. Second-order: continuous S, divergent Cp, no latent heat.',
        'Order parameter φ appears at Tc; grows as (Tc−T)^β. Mean-field: β = ½.',
        'Landau theory: G = aφ² + bφ⁴; spontaneous symmetry breaking when a changes sign.',
        'Critical exponents are universal — depend on symmetry and dimension, not microscopic details.',
      ]} />
    </div>
  );
}
