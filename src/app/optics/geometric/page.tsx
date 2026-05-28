import RayOpticsClient from '@/components/sims/RayOpticsClient';
import {
  Definition, Theorem, WorkedExample, Step,
  PracticeProblems, Problem, InteractiveProblem, EqNumbered, Figure, Prerequisites, Takeaways, LearningGoals
} from '@/components/textbook';

export default function GeometricOpticsPage() {
  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#eab308' }}>Optics · Chapter 17</div>
      <h1>Geometric Optics</h1>
      <p className="subtitle">
        When the wavelength of light is much smaller than the optical elements — lenses, mirrors,
        apertures — we can treat light as rays traveling in straight lines. This is geometric optics.
      </p>

      <Prerequisites items={['Wave properties (Ch. 8) for the physical picture', 'Trigonometry for Snell\'s law calculations']} />

      <LearningGoals items={[
        'Apply the law of reflection and the mirror equation to find image properties.',
        'Use Snell\'s law to calculate refraction angles at a boundary between two media.',
        'Determine the critical angle for total internal reflection and explain its applications.',
        'Solve the thin lens equation for image distance and magnification.',
        'Trace principal rays through lens and mirror systems to locate images.',
      ]} />

      <h2>17.1 Reflection</h2>

      <p>
        When light strikes a smooth surface, it reflects. The <strong>law of reflection</strong>
        states that the angle of incidence equals the angle of reflection, both measured from the
        normal to the surface:
      </p>

      <EqNumbered number="17.1">θ_i = θ_r</EqNumbered>

      <p>
        For a flat mirror, the image appears as far behind the mirror as the object is in front —
        virtual (no real light passes through it), upright, and the same size as the object.
        For a curved mirror, we use the <strong>mirror equation</strong>:
      </p>

      <EqNumbered number="17.2">1/d_o + 1/d_i = 1/f = 2/R</EqNumbered>

      <p>
        where d_o is the object distance, d_i is the image distance, f is the focal length,
        and R is the radius of curvature. A concave mirror has f {'>'} 0; convex has f {'<'} 0.
        The magnification m = −d_i/d_o: negative means inverted.
      </p>

      <h2>17.2 Refraction and Snell&apos;s Law</h2>

      <p>
        Light bends when it passes from one medium to another because its speed changes.
        The ratio of light&apos;s speed in vacuum to its speed in the medium is the <strong>index
        of refraction</strong> n = c/v. The bending is governed by Snell&apos;s law:
      </p>

      <EqNumbered number="17.3">n₁ sin θ₁ = n₂ sin θ₂</EqNumbered>

      <p>
        Light bends toward the normal when entering a denser medium (larger n) and away from
        the normal when entering a less dense medium. Common indices: air ≈ 1.00, water ≈ 1.33,
        glass ≈ 1.5, diamond ≈ 2.42.
      </p>

      <Definition number="17.1" title="Total Internal Reflection">
        When light travels from a dense medium (n₁) to a less dense medium (n₂ {'<'} n₁),
        there exists a critical angle θ_c above which all light is reflected and none transmitted:
        <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          θ_c = arcsin(n₂/n₁)
        </span>
        For glass-air (n₁=1.5, n₂=1.0): θ_c = arcsin(1/1.5) = 41.8°. This is the principle
        behind optical fiber communication: light is trapped inside the fiber by total internal
        reflection around every bend.
      </Definition>

      <Figure number="17.1" caption="Ray optics simulation. Refraction tab: adjust the incident angle and index n₂ to see bending and total internal reflection. Thin lens tab: principal rays show how a converging lens forms a real image. Mirror tab: concave mirror with mirror equation.">
        <RayOpticsClient />
      </Figure>

      <WorkedExample number="17.1" title="Snell's Law at a Glass Surface">
        <p>
          A light ray in air strikes a glass surface (n = 1.52) at θ₁ = 45°. Find the
          refracted angle. What is the critical angle for this glass?
        </p>
        <Step label="Snell's law:">n₁ sin θ₁ = n₂ sin θ₂ → 1.00 × sin 45° = 1.52 × sin θ₂</Step>
        <Step label="Refracted angle:">sin θ₂ = sin 45° / 1.52 = 0.707 / 1.52 = 0.465 → θ₂ = 27.7°</Step>
        <Step label="Critical angle:">θ_c = arcsin(n₂/n₁) = arcsin(1/1.52) = arcsin(0.658) = 41.1°</Step>
        <Step label="Interpretation:">Any ray inside the glass hitting the surface at {'>'} 41.1° will be totally internally reflected.</Step>
      </WorkedExample>

      <h2>17.3 Thin Lenses</h2>

      <p>
        A thin lens refracts light at two surfaces. For a lens much thinner than its focal
        length, both refractions are treated as occurring at the lens plane. The thin lens
        equation is the same form as the mirror equation:
      </p>

      <EqNumbered number="17.4">1/d_o + 1/d_i = 1/f</EqNumbered>

      <p>
        A converging (convex) lens has f {'>'} 0. A diverging (concave) lens has f {'<'} 0.
        The focal length is related to the lens geometry by the <strong>lensmaker&apos;s equation</strong>:
      </p>

      <EqNumbered number="17.5">1/f = (n−1) × (1/R₁ − 1/R₂)</EqNumbered>

      <p>
        where R₁ and R₂ are the radii of curvature of the two surfaces (positive if center of
        curvature is to the right). The power of a lens is P = 1/f measured in diopters (D = m⁻¹).
      </p>

      <Theorem number="17.1" title="Image Properties for a Converging Lens">
        <span style={{ display: 'block', marginBottom: '0.3rem' }}>Object beyond 2f: real, inverted, reduced, on far side of lens</span>
        <span style={{ display: 'block', marginBottom: '0.3rem' }}>Object at 2f: real, inverted, same size, at 2f</span>
        <span style={{ display: 'block', marginBottom: '0.3rem' }}>Object between f and 2f: real, inverted, enlarged (projector)</span>
        <span style={{ display: 'block' }}>Object inside f: virtual, upright, enlarged (magnifying glass)</span>
      </Theorem>

      <WorkedExample number="17.2" title="Image Location from a Thin Lens">
        <p>
          A converging lens has f = 20 cm. An object is placed 60 cm from the lens. Find the
          image distance and magnification.
        </p>
        <Step label="Thin lens equation:">1/d_i = 1/f − 1/d_o = 1/20 − 1/60 = 3/60 − 1/60 = 2/60</Step>
        <Step label="Image distance:">d_i = 60/2 = 30 cm (positive: real, on far side)</Step>
        <Step label="Magnification:">m = −d_i/d_o = −30/60 = −0.5 (inverted, half the size)</Step>
      </WorkedExample>

      <WorkedExample number="17.3" title="Combination of Two Lenses">
        <p>
          Two converging lenses, f₁ = 30 cm and f₂ = 10 cm, are 20 cm apart. Object is 45 cm
          to the left of lens 1. Find the final image.
        </p>
        <Step label="Lens 1:">1/di₁ = 1/30 − 1/45 = 3/90 − 2/90 = 1/90 → di₁ = 90 cm</Step>
        <Step label="Object for lens 2:">do₂ = 20 − 90 = −70 cm (virtual object, behind lens 2)</Step>
        <Step label="Lens 2:">1/di₂ = 1/10 − 1/(−70) = 7/70 + 1/70 = 8/70 → di₂ = 8.75 cm</Step>
        <Step label="Final image:">8.75 cm to the right of lens 2. Real and inverted.</Step>
      </WorkedExample>

      <Definition number="17.2" title="Common Traps">
        <ul style={{ marginTop: '0.4rem' }}>
          <li><strong>Angles are measured from the normal:</strong> not from the surface.</li>
          <li><strong>Virtual images have sign meaning:</strong> track the sign convention before interpreting image distance.</li>
          <li><strong>Total internal reflection needs high-to-low index:</strong> there is no critical angle going from air into glass.</li>
          <li><strong>Thin-lens systems are sequential:</strong> the first image becomes the object for the second lens.</li>
        </ul>
      </Definition>

      <PracticeProblems section="17.1–17.3 Geometric Optics">
        <InteractiveProblem n={1} difficulty="easy"
          answer={27.7} unit="°" tolerance={0.5}
          hints={['Snell\'s law: sin θ₂ = n₁ sin θ₁ / n₂ = sin(45°)/1.52']}
          problemText="Light in air hits glass (n=1.52) at 45°. Find the refraction angle (degrees)."
          solution={<>sin θ₂ = sin45°/1.52 = 0.465 → θ₂ = arcsin(0.465) = <strong>27.7°</strong></>}>
          A ray in air strikes glass (n = 1.52) at an angle of incidence of 45°. Find the refracted angle.
        </InteractiveProblem>

        <InteractiveProblem n={2} difficulty="easy"
          answer={30} unit="cm" tolerance={0.02}
          hints={['1/di = 1/f − 1/do = 1/20 − 1/60. Find a common denominator.']}
          problemText="Lens f=20 cm, object at 60 cm. Find image distance di (cm)."
          solution={<>1/di = 1/20 − 1/60 = 2/60. di = <strong>30 cm</strong></>}>
          A converging lens (f = 20 cm) has an object 60 cm away. Find the image distance.
        </InteractiveProblem>

        <InteractiveProblem n={3} difficulty="medium"
          answer={41.8} unit="°" tolerance={0.5}
          hints={['θ_c = arcsin(n₂/n₁) = arcsin(1.0/1.5)']}
          problemText="Find the critical angle (degrees) for glass (n=1.5) to air."
          solution={<>θ_c = arcsin(1/1.5) = arcsin(0.667) = <strong>41.8°</strong></>}>
          What is the critical angle for total internal reflection at a glass (n = 1.5) to air interface?
        </InteractiveProblem>

        <Problem n={4} difficulty="medium"
          solution={<>Object at d_o = 15 cm from f = 20 cm lens (inside focal length). 1/d_i = 1/20 − 1/15 = 3/60 − 4/60 = −1/60. d_i = −60 cm. Negative: virtual image, 60 cm to the left (same side as object). m = −d_i/d_o = −(−60)/15 = +4. Upright, 4× magnified — this is a magnifying glass configuration.</>}>
          An object is 15 cm from a converging lens of focal length 20 cm. Find the image location and magnification. What type of image is it?
        </Problem>

        <Problem n={5} difficulty="hard"
          solution={<>A simple telescope uses two converging lenses: objective (long f_obj) and eyepiece (short f_eye). An object at infinity forms an image at f_obj. This image serves as object for the eyepiece, placed at distance f_eye from it. Angular magnification M = −f_obj/f_eye. For f_obj = 100 cm, f_eye = 5 cm: M = −20 (20×, inverted). Total length = f_obj + f_eye = 105 cm.</>}>
          Derive the angular magnification of a simple two-lens telescope with objective focal length f_obj and eyepiece focal length f_eye. If f_obj = 100 cm and f_eye = 5 cm, what is the magnification and tube length?
        </Problem>
      </PracticeProblems>

      <Takeaways items={[
        'Law of reflection: θ_i = θ_r — angle in equals angle out, measured from normal.',
        'Snell\'s law: n₁ sin θ₁ = n₂ sin θ₂ — light bends toward normal entering a denser medium.',
        'Total internal reflection at θ > θ_c = arcsin(n₂/n₁) — basis of optical fiber.',
        'Thin lens equation: 1/d_o + 1/d_i = 1/f, same form as mirror equation.',
        'Magnification m = −d_i/d_o — negative means inverted.',
        'Object inside focal length gives a virtual, upright, magnified image (magnifying glass).',
      ]} />
    </div>
  );
}
