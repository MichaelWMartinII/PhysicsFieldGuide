import {
  Definition, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function NuclearPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#ec4899' }}>Modern Physics · Upper Division</div>
      <h1>Nuclear Physics</h1>
      <p className="subtitle">
        The nucleus is a quantum system of strongly interacting protons and neutrons. Its
        properties — binding energy, decay modes, fission, fusion — follow from quantum mechanics
        applied to the strong and weak nuclear forces.
      </p>

      <Prerequisites items={['Quantum mechanics (Ch. 20)', 'Atomic structure (Ch. 21)', 'Special relativity (Ch. 19)']} />

      <LearningGoals items={[
        'Calculate nuclear binding energies using the semi-empirical Bethe-Weizsäcker mass formula and identify the five contributing terms.',
        'Apply the Gamow tunneling factor to explain the enormous range of alpha-decay half-lives from a single formula.',
        'Compute Q values for alpha, beta, and fission reactions and convert mass deficits into energy yields.',
        'Use the Lawson criterion to assess the requirements for fusion ignition and compare D-T energy density to chemical fuels.',
        'Explain nuclear magic numbers using the shell model with spin-orbit coupling and cite experimental evidence for shell closure.',
      ]} />

      <h2>N.1 Nuclear Binding Energy</h2>

      <p>
        A nucleus with Z protons and N neutrons (A = Z + N nucleons) has mass M less than the
        sum of its constituents. The <strong>binding energy</strong> is the energy released in
        assembly:
      </p>

      <EqNumbered number="N.1">B = (Z m_p + N m_n − M) c² &nbsp;&nbsp;&nbsp; (binding energy)</EqNumbered>

      <p>
        The <strong>semi-empirical mass formula</strong> (Bethe-Weizsäcker, 1935) fits B/A across
        all nuclei:
      </p>

      <EqNumbered number="N.2">B = a_V A − a_S A^(2/3) − a_C Z(Z−1)/A^(1/3) − a_A(A−2Z)²/A ± δ(A)</EqNumbered>

      <p>
        The five terms are: volume (nuclear density uniform), surface (nucleons on surface
        have fewer bonds), Coulomb (proton repulsion), asymmetry (neutron-proton balance from
        Pauli exclusion), and pairing (even-even nuclei more stable). With a_V ≈ 15.8,
        a_S ≈ 18.3, a_C ≈ 0.71, a_A ≈ 23.2 MeV, this formula reproduces B/A ≈ 8 MeV for all
        stable nuclei to within ~1%.
      </p>

      <p>
        B/A peaks at Fe-56 (~8.8 MeV/nucleon). Nuclei lighter than iron can release energy
        by <strong>fusion</strong>; heavier nuclei by <strong>fission</strong> — this is the
        energy source of all stars and nuclear weapons.
      </p>

      <h2>N.2 Radioactive Decay</h2>

      <Definition number="N.1" title="Decay Law and Half-Life">
        Radioactive decay is a quantum tunneling (α, spontaneous fission) or weak interaction
        (β decay) process. The fundamental law:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          N(t) = N₀ e^(−λt) &nbsp;&nbsp;&nbsp;&nbsp; t₁/₂ = ln2/λ
        </span>
        where λ is the decay constant (probability per unit time). Activity A = λN decays
        with the same exponential. The activity unit: 1 Becquerel = 1 decay/s; 1 Curie = 3.7×10¹⁰ Bq.
      </Definition>

      <p>
        <strong>Alpha decay (α):</strong> emission of ⁴He nucleus. Energetically favored for
        A &gt; 140. The α particle tunnels through the Coulomb barrier — Gamow&apos;s tunnel theory
        (1928) gave the first quantitative QM result for nuclear physics, explaining the huge
        range of α lifetimes (10⁻⁷ s to 10¹⁰ years) from a single formula:
      </p>

      <EqNumbered number="N.3">λ = f × e^(−2G) &nbsp;&nbsp;&nbsp; G = π Z_α Ze²/(ℏv) &nbsp;&nbsp;&nbsp; (Gamow factor)</EqNumbered>

      <p>
        <strong>Beta decay (β):</strong> weak interaction transforms n → p + e⁻ + ν̄_e (β⁻)
        or p → n + e⁺ + νe (β⁺). Fermi&apos;s 1934 theory modeled this as a point interaction —
        it predicted the continuous β spectrum and Pauli&apos;s neutrino hypothesis was confirmed.
      </p>

      <p>
        <strong>Gamma decay (γ):</strong> excited nucleus emits a photon. Selection rules are
        analogous to atomic transitions but with nuclear moments. Internal conversion
        (transferring energy directly to an electron) competes with γ emission.
      </p>

      <WorkedExample number="N.1" title="Carbon-14 Dating">
        <p>
          A wood sample has ¹⁴C activity 7.5 Bq/g vs. fresh wood 15.3 Bq/g. How old is it?
        </p>
        <Step label="¹⁴C half-life:">t₁/₂ = 5730 years → λ = ln2/5730 = 1.21×10⁻⁴ yr⁻¹</Step>
        <Step label="Ratio:">A(t)/A₀ = e^(−λt) = 7.5/15.3 = 0.490</Step>
        <Step label="Solve:">−λt = ln(0.490) = −0.713 → t = 0.713/1.21×10⁻⁴ = 5890 years</Step>
        <Step label="Conclusion:">The sample is approximately 5,900 years old — consistent with early Bronze Age. Calibration using tree rings corrects for past variations in atmospheric ¹⁴C (produced by cosmic ray interactions).</Step>
      </WorkedExample>

      <h2>N.3 Fission and Fusion</h2>

      <p>
        <strong>Fission:</strong> a heavy nucleus (typically ²³⁵U or ²³⁹Pu) absorbs a thermal
        neutron and splits into two medium-mass fragments plus 2-3 fast neutrons and ~200 MeV
        of energy. The released neutrons can trigger further fissions — a <strong>chain reaction</strong>.
        The critical mass is the minimum mass for a self-sustaining chain reaction
        (where each fission produces on average ≥1 subsequent fission).
      </p>

      <p>
        <strong>Fusion:</strong> light nuclei (H, D, T, He) combine to release energy.
        The reaction with lowest Coulomb barrier and highest Q is:
      </p>

      <EqNumbered number="N.4">²H + ³H → ⁴He + n + 17.6 MeV &nbsp;&nbsp;&nbsp; (D-T fusion)</EqNumbered>

      <p>
        Stars burn protons to helium via the pp chain (our Sun) or the CNO cycle (massive stars).
        The cross section peak is at the <strong>Gamow window</strong> — the energy range where
        the Maxwell-Boltzmann distribution and the tunnel probability both contribute:
      </p>

      <EqNumbered number="N.5">E_Gamow ≈ (πα Z₁ Z₂ / √2)^(2/3) (k_BT/2)^(2/3) m_r^(1/3) c^(2/3) ℏ^(2/3)</EqNumbered>

      <WorkedExample number="N.2" title="Energy from Fission of ²³⁵U">
        <p>
          A typical fission reaction: ²³⁵U + n → ¹⁴⁴Ba + ⁸⁹Kr + 3n. Estimate the energy release.
        </p>
        <Step label="Mass deficit approach:">M(²³⁵U) = 235.044 u, M(¹⁴⁴Ba) = 143.923 u, M(⁸⁹Kr) = 88.918 u, 3 M(n) = 3×1.009 u = 3.026 u</Step>
        <Step label="Products total:">143.923 + 88.918 + 3.026 = 235.867 u</Step>
        <Step label="Reactants:">235.044 + 1.009 = 236.053 u</Step>
        <Step label="Mass deficit:">Δm = 236.053 − 235.867 = 0.186 u = 0.186 × 931.5 MeV/u = 173 MeV</Step>
        <Step label="Scale:">173 MeV per fission. 1 kg of ²³⁵U has 2.56×10²⁴ atoms → 2.56×10²⁴ × 173 MeV = 4.43×10²⁶ MeV = 7.1×10¹³ J = 71 TJ ≈ 17 kilotons of TNT equivalent.</Step>
      </WorkedExample>

      <Definition number="N.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Binding energy is a mass deficit:</strong> a more tightly bound nucleus has less mass than its separated nucleons.</li>
          <li><strong>Half-life is probabilistic:</strong> individual nuclei do not become more likely to decay with age.</li>
          <li><strong>Fission and fusion release energy for different mass ranges:</strong> both move nuclei toward higher binding energy per nucleon.</li>
          <li><strong>Activity and dose are different:</strong> decay rate is not the same as absorbed biological energy.</li>
        </ul>
      </Definition>

      <PracticeProblems section="N.1–N.3 Nuclear Physics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={8.55} unit="MeV/nucleon" tolerance={0.02}
          hints={['B = (Z m_p + N m_n − M)c² with Z=26, N=30; use m_p=938.272 MeV/c², m_n=939.565 MeV/c², M(⁵⁶Fe)=55.934939 u', 'Convert M(⁵⁶Fe) to MeV/c²: multiply by 931.494 MeV/u; then B/A = B/56']}
          problemText="Calculate the binding energy per nucleon (in MeV/nucleon) for ⁵⁶Fe using M(⁵⁶Fe) = 55.934939 u, m_p = 938.272 MeV/c², m_n = 939.565 MeV/c², and 1 u = 931.494 MeV/c²."
          solution={<>Binding energy of ⁵⁶Fe: Z=26, N=30, A=56. m_p = 938.272 MeV/c², m_n = 939.565 MeV/c², M(Fe-56) = 55.934939 u × 931.494 MeV/u = 52103.1 MeV/c². B = (26×938.272 + 30×939.565 − 55.934939×931.494) = (24395.1 + 28186.9 − 52103.2) = 478.8 MeV. B/A = 478.8/56 = 8.55 MeV/nucleon. This is near the maximum of the binding energy per nucleon curve. Semi-empirical: a_V×56 − a_S×56^(2/3) − a_C×26×25/56^(1/3) − a_A×4/56 ≈ 885 − 300 − 101 − 1.7 ≈ 482 MeV (close to 479 MeV). Iron is the endpoint of stellar nucleosynthesis — energy cannot be extracted from iron by fusion or fission.</>}>
          Calculate the total binding energy and binding energy per nucleon for ⁵⁶Fe. Why is iron the endpoint of stellar nucleosynthesis?
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="medium"
          answer={4.28} unit="MeV" tolerance={0.03}
          hints={['Q_α = [M(²³⁸U) − M(²³⁴Th) − M(⁴He)] × 931.5 MeV/u', 'Use M(²³⁸U) = 238.0508 u, M(²³⁴Th) = 234.0436 u, M(⁴He) = 4.00260 u']}
          problemText="Calculate the Q value (in MeV) for alpha decay of ²³⁸U → ²³⁴Th + ⁴He using atomic masses: M(²³⁸U) = 238.0508 u, M(²³⁴Th) = 234.0436 u, M(⁴He) = 4.00260 u, and 1 u = 931.5 MeV/c²."
          solution={<>Alpha decay: Q_α = M(parent) − M(daughter) − M(α) in mass units × c². For ²³⁸U→²³⁴Th: M(²³⁸U)=238.0508u, M(²³⁴Th)=234.0436u, M(⁴He)=4.00260u. Q = (238.0508 − 234.0436 − 4.00260)×931.5 = <strong>4.28 MeV</strong>. The Geiger-Nuttall/Gamow picture treats the alpha particle as tunneling through the Coulomb barrier from a finite nuclear radius, giving decay rates exponentially sensitive to Q. For ²³⁸U the barrier exponent is of order 80, yielding a half-life of order 10⁹ years; the measured value is 4.47 billion years.</>}>
          Calculate the Q value for alpha decay of ²³⁸U and explain why the half-life is 4.5 billion years using the Gamow tunneling formula.
        </InteractiveProblem>

        <Problem n={3} difficulty="medium"
          solution={<>Q value for D-T fusion: Q = (m_D + m_T − m_α − m_n)c². m_D = 2.01410u, m_T = 3.01605u, m_α = 4.00260u, m_n = 1.00866u. Q = (5.03015 − 5.01126)×931.5 = 0.01889×931.5 = 17.60 MeV. Energy per kg of fuel: D+T mixture, molar mass ≈ 2.5 g/mol (50/50 D-T). N_reactions/kg = 10³g/2.5 × 6.02×10²³ × 1 = 2.41×10²⁶. E_total = 2.41×10²⁶ × 17.60 MeV = 4.24×10²⁷ MeV = 6.79×10¹⁴ J/kg ≈ 340 MJ/g. Compare: chemical (TNT) ~4kJ/g. Fusion ≈ 85 million times denser energy. Lawson criterion for ignition: nτ_E &gt; 10²⁰ s/m³ (n = plasma density, τ_E = energy confinement time). ITER: n≈10²⁰m⁻³, τ_E≈3.7s → nτ_E≈3.7×10²⁰ — just above ignition threshold.</>}>
          Calculate the energy released per kg of D-T fuel. Compare to chemical fuels and state the Lawson criterion for fusion ignition.
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Shell model: magic numbers (2,8,20,28,50,82,126) from filling nuclear shells similar to atomic shells but with a strong spin-orbit term −l·s (note: nuclear spin-orbit has opposite sign to atomic). The 1d₅/₂ level (l=2, j=5/2) holds 6 nucleons; 1f₇/₂ (l=3,j=7/2) holds 8. Magic 28 = 2+2+4+4+6+2+8. The spin-orbit coupling separates levels by ~3 MeV (atomic: ~0.01 eV). Evidence for magic numbers: (1) Peaks in binding energy/nucleon at Z or N = magic. (2) First excited state very high (hard to excite doubly-magic ²⁰⁸Pb). (3) Isotope abundance peaks (⁴He, ¹⁶O, ⁴⁰Ca, ²⁰⁸Pb all doubly magic, extremely abundant). Mayer and Jensen won 1963 Nobel Prize for the shell model.</>}>
          Explain the nuclear shell model and magic numbers. How does the spin-orbit coupling differ from the atomic case? What experimental evidence supports magic numbers?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Binding energy B = (Z m_p + N m_n − M)c². Peaks at B/A ≈ 8.8 MeV/nucleon for Fe-56.',
        'Semi-empirical formula: volume + surface + Coulomb + asymmetry + pairing terms.',
        'Decay law: N(t) = N₀ e^(−λt), t₁/₂ = ln2/λ. Alpha: tunneling (Gamow). Beta: weak force. Gamma: EM.',
        'Fission: ~200 MeV per event, chain reaction. Critical mass = minimum for k_eff ≥ 1.',
        'Fusion: D+T → He+n + 17.6 MeV. Stars powered by pp-chain/CNO. Lawson criterion for ignition.',
        'Shell model: magic numbers from filling nuclear orbitals with spin-orbit splitting.',
      ]} />
    </div>
  );
}
