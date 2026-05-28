import FourierSimClient from '@/components/sims/FourierSimClient';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function FourierPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#10b981' }}>Waves &amp; Oscillations · Upper Division</div>
      <h1>Fourier Analysis</h1>
      <p className="subtitle">
        Any periodic function — however complicated — can be decomposed into a sum of sines and cosines.
        This single idea underlies signal processing, quantum mechanics, optics, and partial differential equations.
      </p>

      <Prerequisites items={['Wave properties (Ch. 8)', 'Calculus (Ch. 22)', 'Linear algebra helps but is not required']} />

      <LearningGoals items={[
        'Compute Fourier series coefficients using orthogonality integrals.',
        'Identify the Gibbs phenomenon and explain why the overshoot persists at discontinuities.',
        'Define the Fourier transform and apply it to compute spectra of simple functions.',
        'State and apply Parseval\'s theorem to relate energy in position and frequency space.',
        'Derive the Heisenberg uncertainty relation from the Fourier uncertainty principle.',
      ]} />

      <h2>F.1 The Fourier Series</h2>

      <p>
        Let f(x) be a periodic function with period 2L. The <strong>Fourier series</strong> of f is
        the decomposition into harmonics:
      </p>

      <EqNumbered number="F.1" latex="f(x)=\frac{a_0}{2}+\sum_{n=1}^{\infty}\left[a_n\cos\left(\frac{n\pi x}{L}\right)+b_n\sin\left(\frac{n\pi x}{L}\right)\right]" />

      <p>
        The coefficients aₙ and bₙ are found by exploiting the <strong>orthogonality</strong> of
        sines and cosines: ∫(−L to L) sin(mπx/L) sin(nπx/L) dx = 0 unless m = n.
        Multiplying both sides by the appropriate trig function and integrating isolates each coefficient:
      </p>

      <EqNumbered number="F.2" latex="a_n=\frac{1}{L}\int_{-L}^{L}f(x)\cos\left(\frac{n\pi x}{L}\right)\,dx \qquad b_n=\frac{1}{L}\int_{-L}^{L}f(x)\sin\left(\frac{n\pi x}{L}\right)\,dx" />

      <WorkedExample number="F.1" title="Fourier Series of a Square Wave">
        <p>f(x) = +1 for 0 &lt; x &lt; L, −1 for −L &lt; x &lt; 0. Find the Fourier coefficients.</p>
        <Step label="Symmetry:">f is odd → all aₙ = 0 (cosine terms vanish)</Step>
        <Step label="bₙ:">bₙ = (1/L)∫(−L to L) f(x)sin(nπx/L)dx = (2/L)∫(0 to L) sin(nπx/L)dx</Step>
        <Step label="Integrate:">= (2/L)[−L/(nπ) cos(nπx/L)]₀^L = (2/nπ)(1 − cos nπ)</Step>
        <Step label="Result:">bₙ = 4/(nπ) for odd n, 0 for even n</Step>
        <Step label="Series:">f(x) = (4/π)[sin(πx/L) + sin(3πx/L)/3 + sin(5πx/L)/5 + …]</Step>
      </WorkedExample>

      <Figure number="F.1" caption="Fourier series approximation. Each slider adds more harmonics to the sum (blue curve). Individual harmonics are shown as faint colored lines. The target function is the dim gray curve. Notice the Gibbs phenomenon — the overshoot near discontinuities never disappears, it just moves closer to the jump.">
        <FourierSimClient />
      </Figure>

      <h2>F.2 The Gibbs Phenomenon</h2>

      <p>
        When a Fourier series approximates a function with a jump discontinuity, the partial sums
        overshoot by approximately 9% of the jump height near the discontinuity — and this overshoot
        persists no matter how many terms are added; it just becomes narrower. This is the
        <strong>Gibbs phenomenon</strong>, discovered in 1899.
      </p>

      <p>
        It reflects a deep truth: a uniformly convergent series cannot converge to a discontinuous function.
        The Fourier series converges in the <em>mean square</em> sense (minimum total error), not pointwise
        at the discontinuity. This distinction matters in signal processing (ringing artifacts in audio
        and image compression) and in solving PDEs with discontinuous boundary conditions.
      </p>

      <h2>F.3 The Fourier Transform</h2>

      <p>
        For non-periodic functions, we take the period L → ∞ and the discrete sum becomes an integral.
        The <strong>Fourier transform</strong> decomposes f(x) into a continuous spectrum of frequencies:
      </p>

      <EqNumbered number="F.3" latex="\hat F(k)=\int_{-\infty}^{\infty}f(x)e^{-ikx}\,dx \qquad \text{(forward transform)}" />

      <EqNumbered number="F.4" latex="f(x)=\frac{1}{2\pi}\int_{-\infty}^{\infty}\hat F(k)e^{ikx}\,dk \qquad \text{(inverse transform)}" />

      <p>
        The variable k is the spatial frequency (wavenumber). |F̂(k)|² is the <strong>power spectrum</strong>
        — how much of each frequency is present. The Fourier transform turns convolutions into
        multiplications, differential equations into algebraic equations, and is the mathematical
        backbone of every filter, antenna, and spectrometer.
      </p>

      <Theorem number="F.1" title="Parseval's Theorem">
        The total energy is the same whether computed in position space or frequency space:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          ∫₋∞^∞ |f(x)|² dx = (1/2π) ∫₋∞^∞ |F̂(k)|² dk
        </span>
        This means no information is lost in the transform — it is a unitary operation.
      </Theorem>

      <h2>F.4 Connection to Physics</h2>

      <p>
        The Fourier transform is everywhere in physics, often wearing disguises:
      </p>

      <p>
        <strong>Quantum mechanics.</strong> The position wavefunction ψ(x) and momentum wavefunction
        φ(p) are Fourier transforms of each other: φ(p) = (1/√2πℏ)∫ψ(x)e^(−ipx/ℏ)dx.
        The Heisenberg uncertainty relation Δx·Δp ≥ ℏ/2 is a direct consequence of the
        Fourier uncertainty principle: a narrow ψ(x) requires a broad φ(p) and vice versa.
      </p>

      <p>
        <strong>Diffraction.</strong> The far-field diffraction pattern of an aperture is exactly
        the Fourier transform of the aperture&apos;s transmission function. The single-slit sinc² pattern
        from Chapter 18 is the squared magnitude of the Fourier transform of a rectangular function.
      </p>

      <p>
        <strong>Signal processing.</strong> The discrete Fourier transform (DFT), computed efficiently
        by the Fast Fourier Transform (FFT) algorithm (Cooley–Tukey, 1965), underlies MP3 audio
        compression, JPEG image compression, radar, MRI, and Wi-Fi (OFDM).
      </p>

      <Definition number="F.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Orthogonality sets coefficients:</strong> guessing harmonic amplitudes usually misses normalization factors.</li>
          <li><strong>Gibbs overshoot does not vanish:</strong> adding terms narrows the ringing but leaves the overshoot height near a jump.</li>
          <li><strong>Transform conventions vary:</strong> factors of 2π move between the forward and inverse transforms by convention.</li>
          <li><strong>Narrow in x means broad in k:</strong> localization and bandwidth are reciprocal, not independently adjustable.</li>
        </ul>
      </Definition>

      <PracticeProblems section="F.1–F.4 Fourier Analysis">
        <InteractiveProblem n={0} difficulty="easy"
          answer={0.577} unit="" tolerance={0.02}
          hints={['RMS² = (1/2π)∫_{-π}^{π} (x/π)² dx. Compute the integral then take the square root.']}
          problemText="For the sawtooth wave f(x) = x/π on −π < x < π, compute its RMS value. (RMS² = (1/2π)∫f(x)²dx.)"
          solution={<>(1/2π)∫(−π to π)(x/π)²dx = (1/2π)(1/π²)(2π³/3) = 1/3. RMS = √(1/3) = <strong>0.577</strong>. This equals what Parseval&apos;s theorem gives from summing |bₙ|² of the Fourier series.</>}>
          Compute the RMS value of the sawtooth wave f(x) = x/π on −π &lt; x &lt; π using the definition (1/2π)∫f(x)²dx, and verify using Parseval&apos;s theorem.
        </InteractiveProblem>

        <Problem n={1} difficulty="easy"
          solution={<>Sawtooth wave f(x) = x/π for −π &lt; x &lt; π. It is an odd function, so aₙ=0. bₙ = (1/π)∫₋π^π(x/π)sin(nx)dx = (2/π)∫₀^π (x/π)sin(nx)dx. Integration by parts: = (2/π²)[(−x cos(nx)/n + sin(nx)/n²)]₀^π = (2/π²)(−π cos(nπ)/n) = −(2/nπ)cos(nπ) = (2/(nπ))(−1)^(n+1). f(x) = (2/π)[sin x − sin(2x)/2 + sin(3x)/3 − …]</>}>
          Find the Fourier sine series of f(x) = x/π on −π &lt; x &lt; π (the sawtooth wave).
        </Problem>

        <Problem n={2} difficulty="medium"
          solution={<>The Fourier transform of f(x) = e^(−a|x|) (a &gt; 0): F̂(k) = ∫₋∞^∞ e^(−a|x|)e^(−ikx)dx = ∫₋∞^0 e^(ax)e^(−ikx)dx + ∫₀^∞ e^(−ax)e^(−ikx)dx = 1/(a−ik) + 1/(a+ik) = 2a/(a²+k²). This is a Lorentzian. Wider in x (small a) → narrower in k (sharp peak). Narrower in x (large a) → broader in k. This is Fourier uncertainty directly.</>}>
          Find the Fourier transform F̂(k) of f(x) = e^(−a|x|) for a {'>'} 0. How does the width of f in x relate to the width of F̂ in k?
        </Problem>

        <Problem n={3} difficulty="medium"
          solution={<>The convolution theorem: if h = f * g (convolution), then Ĥ(k) = F̂(k)Ĝ(k). Application: solving the inhomogeneous ODE y'' + y = f(x) by Fourier transform: (−k²+1)Ŷ = F̂ → Ŷ = F̂/(1−k²). Inverse transform gives y(x) = ∫ f(τ) G(x−τ)dτ where G is the Green&apos;s function (inverse FT of 1/(1−k²)).</>}>
          State the convolution theorem for Fourier transforms. Show how it can be used to solve the ODE y'' + y = f(x).
        </Problem>

        <Problem n={4} difficulty="hard"
          solution={<>Heisenberg uncertainty from Fourier: for any function f(x) normalized so ∫|f|²dx=1, define ψ=f and its FT ψ̂. Then (Δx)²(Δk)² ≥ 1/4 (Robertson inequality). In QM: p = ℏk so Δp = ℏΔk → ΔxΔp ≥ ℏ/2. The Gaussian f(x) = e^(−x²/4σ²) achieves the minimum: Δx=σ, Δk=1/(2σ), ΔxΔk = 1/2. So a Gaussian wavepacket is the minimum uncertainty state. Any other shape has larger ΔxΔp.</>}>
          Derive the Heisenberg uncertainty relation ΔxΔp ≥ ℏ/2 from the Fourier uncertainty principle. Which wavefunction shape achieves the minimum uncertainty?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Fourier series: any periodic f(x) = Σ[aₙcos + bₙsin]; coefficients found by orthogonality integrals.',
        'Square wave: only odd harmonics, bₙ = 4/(nπ). Adding terms reduces error but Gibbs overshoot persists.',
        'Fourier transform: extends series to non-periodic f; F̂(k) = ∫f(x)e^(−ikx)dx.',
        'Parseval\'s theorem: energy is preserved by the transform (it\'s unitary).',
        'Narrow in x ↔ broad in k: the Fourier uncertainty principle, which implies Heisenberg.',
        'Diffraction pattern = |FT of aperture|². Convolution in space = multiplication in frequency.',
      ]} />
    </div>
  );
}
