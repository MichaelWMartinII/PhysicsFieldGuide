import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function StringTheoryPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Advanced Topics</div>
      <h1>String Theory &amp; Beyond the Standard Model</h1>
      <p className="subtitle">
        String theory posits that fundamental particles are one-dimensional vibrating strings.
        It naturally includes gravity, gauge theories, and produces a finite theory —
        but requires extra dimensions and supersymmetry. Here we survey its key ideas,
        the landscape problem, and leading alternative approaches to quantum gravity.
      </p>

      <Prerequisites items={['Quantum field theory (Ch. QFT)', 'General relativity (Ch. GR)', 'Group theory (Ch. GT)', 'Special functions (Ch. SF)']} />

      <LearningGoals items={[
        'Calculate the Planck length, mass, and time from G, ℏ, and c, and compare the Planck energy to LHC energies.',
        'Explain how SUSY cancels the quadratic Higgs mass divergence and estimate the required stop mass for naturalness.',
        'Describe how open and closed strings give rise to gauge bosons and gravitons respectively.',
        'State the AdS/CFT correspondence and explain the holographic dictionary relating bulk fields to boundary operators.',
        'Outline the landscape problem and compare string theory with loop quantum gravity as approaches to quantum gravity.',
      ]} />

      <h2>ST.1 Why We Need Something Beyond the Standard Model</h2>

      <p>
        The Standard Model (SM) is extraordinarily successful — but incomplete:
      </p>

      <p>
        1. <strong>Gravity</strong>: SM does not include quantum gravity. Perturbative quantum
        gravity (adding gravitons to QFT) is non-renormalizable. The Planck scale
        E_Pl = √(ℏc⁵/G) ≈ 1.22×10¹⁹ GeV is where quantum gravity effects become O(1).
      </p>

      <p>
        2. <strong>Dark matter and dark energy</strong>: SM has no dark matter candidate.
        Dark energy (Λ) is 123 orders of magnitude smaller than the Planck-scale vacuum energy —
        the cosmological constant problem.
      </p>

      <p>
        3. <strong>Hierarchy problem</strong>: why is M_Higgs = 125 GeV ≪ M_Pl = 10¹⁹ GeV?
        Quantum corrections to the Higgs mass are quadratically UV-divergent: δm_H² ∝ Λ²_UV.
        Fine-tuning of 10³⁴ is required unless new physics appears near the TeV scale.
      </p>

      <p>
        4. <strong>Gauge coupling unification</strong>: the three gauge couplings (α₁, α₂, α₃)
        nearly meet at ~10¹⁵ GeV in the MSSM (with supersymmetry) — hinting at grand unification.
      </p>

      <h2>ST.2 Supersymmetry</h2>

      <p>
        <strong>Supersymmetry (SUSY)</strong> introduces a symmetry between bosons and fermions.
        Every SM particle has a superpartner:
      </p>

      <p>
        Quarks → squarks, Leptons → sleptons, Gluons → gluinos,
        W/Z → winos/zinos, Higgs → higgsinos, Photon → photino.
      </p>

      <p>
        SUSY algebra: {'{'}Q_α, Q̄_α̇{'}'} = 2σ^μ_(αα̇) P_μ — the supercharges Q relate bosons to fermions.
        SUSY cancels the quadratic divergences in δm_H² because boson loops (+) and fermion loops (−)
        cancel exactly if SUSY is exact. If SUSY is broken at scale M_SUSY ~ TeV: δm_H² ~ M_SUSY² — acceptable.
      </p>

      <p>
        The lightest SUSY particle (LSP) — typically the neutralino — is stable (R-parity conservation)
        and is a natural dark matter candidate (WIMP). LHC searches (2012–2023): no SUSY particles found
        at energies accessible so far. Naturalness arguments push against M_SUSY &gt; few TeV.
      </p>

      <h2>ST.3 String Theory Basics</h2>

      <p>
        Replace point particles with 1D strings (length ℓ_s = √(α&apos;), with α&apos; ≈ (10⁻³³ cm)²
        for strings near the Planck scale). A string can vibrate in many modes —
        each vibrational mode is a different particle:
      </p>

      <p>
        <strong>Open strings</strong> (endpoints free or on D-branes): lowest excitations are gauge
        bosons (vector representation). <strong>Closed strings</strong> (loops): lowest excitations
        include the graviton (spin 2). This is why string theory automatically contains gravity!
      </p>

      <EqNumbered number="ST.1">M² = (N − a)/α' &nbsp;&nbsp;&nbsp; (mass spectrum, N = oscillator excitation, a = normal-ordering constant)</EqNumbered>

      <p>
        For bosonic string: a = 1. Massless states (N=1): gauge bosons, graviton. Tachyon (N=0):
        M² &lt; 0 — unstable vacuum. Superstring theory eliminates the tachyon via worldsheet supersymmetry.
      </p>

      <p>
        <strong>Critical dimension</strong>: conformal anomaly vanishes only in specific spacetime dimensions.
        Bosonic string: D = 26. Superstring: D = 10. We observe D = 4, so 6 dimensions must be
        compactified (curled up) at the Planck scale.
      </p>

      <WorkedExample number="ST.1" title="Regge Trajectories and String Tension">
        <p>
          Hadron spectroscopy shows J_max ∝ M² (Regge trajectories). Explain this
          from string theory and estimate the string tension.
        </p>
        <Step label="Rotating string:">Model a meson as two quarks connected by a relativistic string of tension T_s (energy per unit length). A rotating string in the center of mass frame.</Step>
        <Step label="Regge slope:">For a rotating open string: J = E²/(2πT_s) = α&apos; M² where α&apos; = 1/(2πT_s). This gives the Regge trajectory J = α&apos; M² + α&apos;(0) (intercept from vacuum quantum numbers).</Step>
        <Step label="Data:">For ρ mesons: α&apos; ≈ 0.9 GeV⁻² (experimental). String tension: T_s = 1/(2π × 0.9 GeV⁻²) = 0.18 GeV/fm ≈ 1 GeV/fm (in natural units). This is the QCD string tension from lattice QCD — consistent!</Step>
        <Step label="Interpretation:">Quark-antiquark pairs connected by a QCD flux tube (color string). At short distances: Coulomb. At long distances: linear confinement V(r) = T_s r. The string tension T_s ≈ 0.2 GeV/fm explains why free quarks are never observed.</Step>
      </WorkedExample>

      <h2>ST.4 D-Branes and Dualities</h2>

      <p>
        <strong>D-branes</strong> (Dirichlet branes): hypersurfaces on which open string endpoints
        are confined. A D_p-brane is p-dimensional. D0-branes = particles, D1-branes = strings,
        D3-branes = 4D membranes.
      </p>

      <p>
        N coincident D3-branes have a worldvolume theory: N=4 super-Yang-Mills (SYM) with gauge
        group U(N). This led to the discovery of:
      </p>

      <p>
        <strong>AdS/CFT correspondence</strong> (Maldacena 1997): string theory on
        AdS₅ × S⁵ is dual to N=4 SYM on its 4D boundary. A theory of quantum gravity in 5D
        Anti-de-Sitter space is equivalent to a conformal field theory in 4D.
        The <strong>holographic principle</strong>: information in a volume is encoded on its boundary.
      </p>

      <p>
        Applications: quark-gluon plasma at the LHC (strong coupling = weakly coupled gravity),
        condensed matter (strange metals, high-T_c via holography), entanglement entropy
        (Ryu-Takayanagi formula: S_EE = Area/(4G_N)).
      </p>

      <h2>ST.5 Alternatives and the Landscape</h2>

      <p>
        <strong>String landscape</strong>: compactifying 6D to 4D with different fluxes gives
        ~10^500 distinct vacua with different low-energy physics. This is the
        "landscape" — each vacuum is a possible universe.
        Anthropic argument (Weinberg 1987): we live in a vacuum where Λ allows structure formation.
        Correct order of magnitude for Λ! But this is controversial — is it science or metaphysics?
      </p>

      <p>
        <strong>Loop quantum gravity (LQG)</strong>: quantize the gravitational field directly.
        Space is made of discrete units — spin networks (Penrose 1971). Area and volume operators
        have discrete spectra: A = 8πγ ℓ_Pl² √(j(j+1)) (Barbero-Immirzi parameter γ).
        No extra dimensions, no supersymmetry. Problem: low-energy limit not yet fully derived.
      </p>

      <p>
        <strong>Causal dynamical triangulations (CDT)</strong>: quantum gravity via path integral
        over piecewise-linear spacetimes. Shows 4D spacetime emerges dynamically.
        <strong>Asymptotic safety</strong>: gravity is UV-complete at a non-Gaussian fixed point.
      </p>

      <Definition number="ST.1" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Strings replace point particles at high energy:</strong> low-energy limits can still look like field theory.</li>
          <li><strong>Extra dimensions are compactified or otherwise hidden:</strong> they are not ordinary large spatial directions.</li>
          <li><strong>Dualities relate different descriptions:</strong> two theories can describe the same physics in different variables.</li>
          <li><strong>Consistency constraints are severe:</strong> anomaly cancellation and supersymmetry assumptions shape the theory.</li>
        </ul>
      </Definition>

      <PracticeProblems section="ST.1–ST.5 String Theory and Beyond">
        <InteractiveProblem n={1} difficulty="easy"
          answer={1.22e19} unit="GeV" tolerance={0.05}
          hints={[
            'Planck mass: m_Pl = √(ℏc/G). Plug in ℏ = 1.055×10⁻³⁴ J·s, c = 3×10⁸ m/s, G = 6.67×10⁻¹¹ m³/(kg·s²).',
            'Convert m_Pl in kg to GeV using 1 GeV/c² = 1.78×10⁻²⁷ kg, so m_Pl in GeV = m_Pl(kg) × c²/(1.6×10⁻¹⁰ J/GeV).',
          ]}
          problemText="Calculate the Planck mass m_Pl = √(ℏc/G) in GeV. Also find the Planck length and Planck time. How does the LHC energy (13 TeV) compare to the Planck energy?"
          solution={<>Natural units and Planck scale. Set G = ℏ = c = 1. Planck length: ℓ_Pl = √(ℏG/c³) = √(6.67×10⁻¹¹ × 1.055×10⁻³⁴/(3×10⁸)³) = √(2.61×10⁻⁴⁵/2.7×10²⁵) = √(9.67×10⁻⁷¹) = 9.83×10⁻³⁶ m. Planck mass: m_Pl = √(ℏc/G) = √(1.055×10⁻³⁴×3×10⁸/6.67×10⁻¹¹) = √(4.74×10⁻¹⁶) = 2.18×10⁻⁸ kg ≈ 2.18×10⁻⁸/1.67×10⁻²⁷ = 1.31×10¹⁹ proton masses = 1.22×10¹⁹ GeV. Planck time: t_Pl = ℓ_Pl/c = 5.39×10⁻⁴⁴ s. Planck temperature: T_Pl = m_Pl c²/k_B = 1.42×10³² K. At the LHC (13 TeV): E/m_Pl c² = 13×10³/(1.22×10¹⁹) = 10⁻¹⁵. Quantum gravity is 15 orders of magnitude away in energy. This is why gravity is undetectable at colliders — it&apos;s intrinsically weak at sub-Planck energies.</>}>
          Calculate the Planck length, mass, and time from G, ℏ, and c. How does the LHC energy compare to the Planck energy? Why is quantum gravity so difficult to test experimentally?
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={77} unit="" tolerance={0.10}
          hints={[
            'Fine-tuning is measured by how much the stop mass squared exceeds the Higgs mass squared: Δ ≈ m_stop²/m_H².',
            'm_stop &gt; 1.1 TeV = 1100 GeV, m_H = 125 GeV. Compute (1100/125)².',
          ]}
          problemText="Explain why the hierarchy problem motivates SUSY partners near the TeV scale. With current LHC limits of m_stop &gt; 1.1 TeV and m_H = 125 GeV, compute the fine-tuning parameter Δ = m_stop²/m_H²."
          solution={<>SUSY breaking and the hierarchy problem: in unbroken SUSY, m_squark = m_quark exactly. The Higgs mass correction: δm_H² = (3λ²/(8π²)) × [m_t² ln(Λ/m_t) − m_stop² ln(Λ/m_stop)] ≈ (3λ_t²/(8π²)) × Δm² × ln(Λ/m_t). For natural SUSY (δm_H² ~ m_H²): Δm² = m_stop² − m_t² ~ (few m_H)². This gives m_stop ~ 500 GeV - few TeV. LHC current limit: m_stop &gt; 1.1 TeV (direct pair production). At 1.1 TeV: fine-tuning = m_stop²/m_H² ≈ (1100/125)² ≈ 77. 1% tuning — acceptable by many standards, but naturalness is subjective. Alternative: focus point (high m_0, specific relation eliminates tuning), natural SUSY (only stops light, others can be heavy), Twin Higgs (Z₂ symmetry cancels top loop without SUSY partners at collider scale).</>}>
          Explain why the hierarchy problem motivates SUSY partners near the TeV scale. Given current LHC limits (m_stop &gt; 1.1 TeV), how much fine-tuning does this imply?
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>AdS/CFT: Maldacena duality between Type IIB string theory on AdS₅×S⁵ and N=4 SU(N) SYM in 4D. Dictionary: string coupling g_s = g_YM²/(4π). t&apos; Hooft coupling λ = g_YM² N = g_s N (fixed, large N limit). Curvature: R_AdS/ℓ_s = (λ)^(1/4). Strong coupling regime λ≫1 (SYM) ↔ classical supergravity on AdS₅ (calculable). Weak coupling λ≪1 (SYM perturbation theory) ↔ string quantum gravity (hard). Holography: bulk field φ(r,x) with boundary behavior φ ~ r^Δ source + ... maps to operator O of dimension Δ in CFT. Partition functions agree: Z_AdS[φ_0] = ⟨e^(∫φ₀O)⟩_CFT. Application (QGP): RHIC observed sQGP with η/s = 1/(4π) (minimal viscosity from AdS calculation: η/s = ℏ/(4π k_B)) — strong coupling. N=4 SYM at strong coupling predicts this value; perturbative QCD gives η/s ~ 1. The holographic viscosity bound was a triumph of AdS/CFT.</>}>
          Describe the AdS/CFT correspondence. What is the holographic dictionary? How was it applied to the quark-gluon plasma at RHIC to predict the shear viscosity?
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Bekenstein-Hawking entropy: S_BH = A/(4ℓ_Pl²) = k_B c³ A/(4Gℏ). For a Schwarzschild black hole: A = 4πr_s² = 16πG²M²/c⁴. S_BH = 4πk_B G M²/(ℏc) = 4πG M²/(ℏc) in natural units. Hawking radiation: a BH radiates as a blackbody at temperature T_H = ℏc³/(8πGMk_B) = ℏ/(4πr_s k_B) (Unruh effect near horizon). For Solar mass BH: T_H = ℏc³/(8πGM_☉k_B) = 1.055×10⁻³⁴×(3×10⁸)³/(8π×6.67×10⁻¹¹×2×10³⁰×1.38×10⁻²³) = 2.88×10⁻³⁰/2.32×10⁻²⁰ = 10⁻¹⁰ K. Unobservably cold. For primordial BH with M=10¹⁵g: T_H = M_☉/M × 10⁻¹⁰ K ≈ 10¹¹ K → evaporates in ~10¹⁰ yr (present age of universe). Information paradox: Hawking radiation is thermal (no info) → but unitary quantum evolution preserves info → Page curve. Resolution candidates: fuzzball (string theory), black hole complementarity (Susskind), ER=EPR (Maldacena-Susskind), island formula for entropy (Penington, Almheiri et al. 2019).</>}>
          Derive the Bekenstein-Hawking entropy S = A/(4G) and Hawking temperature T_H = ℏc³/(8πGMk_B). What is the information paradox and what are the leading proposed resolutions?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'SM gaps: no gravity, no DM, hierarchy problem, gauge coupling unification hint.',
        'SUSY: cancels Higgs mass divergences. Superpartners at ~TeV. LSP = DM candidate. No LHC signal yet.',
        'Strings: replace particles with 1D objects. Different vibrations → different particles. Gravity automatic.',
        'Critical dimensions: D=26 (bosonic), D=10 (superstring). Extra 6D compactified to get 4D.',
        'D-branes + AdS/CFT: quantum gravity in D+1D = CFT in D. η/s = 1/(4π) — tested at RHIC.',
        'Alternatives: LQG (discrete spacetime), CDT (emergent 4D), asymptotic safety. No quantum gravity test yet.',
      ]} />
    </div>
  );
}
