export interface PhysicsEquation {
  id: string;
  name: string;
  latex: string;
  description: string;
  sectionId: string;
  section: string;
  color: string;
  tags?: string[];
}

export const equations: PhysicsEquation[] = [
  // Mathematics
  {
    id: 'dot-product',
    name: 'Vector Dot Product',
    latex: '\\mathbf{A} \\cdot \\mathbf{B} = |A||B|\\cos\\theta',
    description: 'Scalar product; equals the sum of component products. θ is the angle between the vectors.',
    sectionId: 'math', section: 'Mathematics', color: '#06b6d4',
  },
  {
    id: 'cross-product-mag',
    name: 'Vector Cross Product',
    latex: '|\\mathbf{A} \\times \\mathbf{B}| = |A||B|\\sin\\theta',
    description: 'Magnitude of the cross product. Direction by right-hand rule; result is perpendicular to both vectors.',
    sectionId: 'math', section: 'Mathematics', color: '#06b6d4',
  },
  {
    id: 'chain-rule',
    name: 'Chain Rule',
    latex: '\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}',
    description: 'Derivative of a composite function. Used whenever variables are related through intermediate quantities.',
    sectionId: 'math', section: 'Mathematics', color: '#06b6d4',
  },
  {
    id: 'ftc',
    name: 'Fundamental Theorem of Calculus',
    latex: '\\int_a^b f\'(x)\\,dx = f(b) - f(a)',
    description: 'Integration and differentiation are inverse operations. Net change equals integral of rate of change.',
    sectionId: 'math', section: 'Mathematics', color: '#06b6d4',
  },

  // Classical Mechanics — Kinematics
  {
    id: 'kin-v',
    name: 'Kinematic Velocity',
    latex: 'v = v_0 + at',
    description: 'Velocity under constant acceleration. Valid only when acceleration is uniform.',
    sectionId: 'mechanics', section: 'Classical Mechanics', color: '#3b82f6', tags: ['kinematics'],
  },
  {
    id: 'kin-x',
    name: 'Kinematic Displacement',
    latex: 'x = x_0 + v_0 t + \\tfrac{1}{2}at^2',
    description: 'Position under constant acceleration. Quadratic in time; gives parabolic trajectories for projectiles.',
    sectionId: 'mechanics', section: 'Classical Mechanics', color: '#3b82f6', tags: ['kinematics'],
  },
  {
    id: 'kin-v2',
    name: 'Velocity–Displacement Relation',
    latex: 'v^2 = v_0^2 + 2a\\,\\Delta x',
    description: 'Relates velocity to displacement without time — useful whenever the time of flight is unknown.',
    sectionId: 'mechanics', section: 'Classical Mechanics', color: '#3b82f6', tags: ['kinematics'],
  },

  // Classical Mechanics — Forces & Energy
  {
    id: 'newtons-second',
    name: "Newton's Second Law",
    latex: '\\mathbf{F} = m\\mathbf{a}',
    description: 'Net force equals mass times acceleration. The foundation of classical mechanics.',
    sectionId: 'mechanics', section: 'Classical Mechanics', color: '#3b82f6', tags: ['forces'],
  },
  {
    id: 'friction',
    name: 'Kinetic Friction',
    latex: 'f_k = \\mu_k N',
    description: 'Friction force equals the coefficient of kinetic friction times the normal force. Direction opposes motion.',
    sectionId: 'mechanics', section: 'Classical Mechanics', color: '#3b82f6', tags: ['forces'],
  },
  {
    id: 'work',
    name: 'Work by a Force',
    latex: 'W = \\int \\mathbf{F}\\cdot d\\mathbf{s} = Fd\\cos\\theta',
    description: 'Work done by a constant force through displacement d at angle θ to the force.',
    sectionId: 'mechanics', section: 'Classical Mechanics', color: '#3b82f6', tags: ['energy'],
  },
  {
    id: 'kinetic-energy',
    name: 'Kinetic Energy',
    latex: 'K = \\tfrac{1}{2}mv^2',
    description: 'Energy of motion. Scales as the square of speed. Work-energy theorem: W_net = ΔK.',
    sectionId: 'mechanics', section: 'Classical Mechanics', color: '#3b82f6', tags: ['energy'],
  },
  {
    id: 'gravitational-pe',
    name: 'Gravitational Potential Energy',
    latex: 'U = mgh \\qquad \\left(U = -\\frac{GMm}{r}\\text{ exact}\\right)',
    description: 'Near-surface approximation (U = mgh) valid for h ≪ Re. Conservation: K + U = const.',
    sectionId: 'mechanics', section: 'Classical Mechanics', color: '#3b82f6', tags: ['energy'],
  },
  {
    id: 'momentum',
    name: 'Linear Momentum',
    latex: '\\mathbf{p} = m\\mathbf{v}',
    description: 'Conserved in isolated systems. Newton\'s 2nd law: F_net = dp/dt.',
    sectionId: 'mechanics', section: 'Classical Mechanics', color: '#3b82f6', tags: ['momentum'],
  },
  {
    id: 'impulse',
    name: 'Impulse–Momentum Theorem',
    latex: '\\mathbf{J} = \\int \\mathbf{F}\\,dt = \\Delta\\mathbf{p}',
    description: 'Impulse (area under F–t curve) equals change in momentum. Foundation of collision analysis.',
    sectionId: 'mechanics', section: 'Classical Mechanics', color: '#3b82f6', tags: ['momentum'],
  },
  {
    id: 'torque',
    name: 'Torque',
    latex: '\\boldsymbol{\\tau} = \\mathbf{r}\\times\\mathbf{F} \\qquad |\\tau| = rF\\sin\\theta',
    description: 'Rotational analogue of force. τ = Iα (Newton\'s 2nd law for rotation).',
    sectionId: 'mechanics', section: 'Classical Mechanics', color: '#3b82f6', tags: ['rotation'],
  },
  {
    id: 'angular-momentum',
    name: 'Angular Momentum',
    latex: '\\mathbf{L} = I\\boldsymbol{\\omega} = \\mathbf{r}\\times\\mathbf{p}',
    description: 'Conserved when net torque is zero. Explains planetary orbits, tops, and electron spin.',
    sectionId: 'mechanics', section: 'Classical Mechanics', color: '#3b82f6', tags: ['rotation'],
  },
  {
    id: 'gravity-newton',
    name: "Newton's Law of Gravitation",
    latex: 'F = \\frac{GMm}{r^2}',
    description: 'Gravitational force between masses M and m separated by distance r. G ≈ 6.674×10⁻¹¹ N·m²/kg².',
    sectionId: 'mechanics', section: 'Classical Mechanics', color: '#3b82f6', tags: ['gravitation'],
  },
  {
    id: 'orbital-velocity',
    name: 'Circular Orbital Speed',
    latex: 'v_{\\rm orb} = \\sqrt{\\frac{GM}{r}}',
    description: 'Speed for a circular orbit at radius r. Derived by setting gravitational force equal to centripetal acceleration.',
    sectionId: 'mechanics', section: 'Classical Mechanics', color: '#3b82f6', tags: ['gravitation'],
  },
  {
    id: 'escape-velocity',
    name: 'Escape Velocity',
    latex: 'v_{\\rm esc} = \\sqrt{\\frac{2GM}{r}}',
    description: 'Minimum speed to escape a gravitational well from radius r. For Earth: ≈ 11.2 km/s.',
    sectionId: 'mechanics', section: 'Classical Mechanics', color: '#3b82f6', tags: ['gravitation'],
  },

  // Waves & Oscillations
  {
    id: 'hookes-law',
    name: "Hooke's Law",
    latex: 'F = -kx',
    description: 'Restoring force of a spring. The minus sign means the force always points back toward equilibrium.',
    sectionId: 'waves', section: 'Waves & Oscillations', color: '#10b981', tags: ['oscillations'],
  },
  {
    id: 'shm-period-spring',
    name: 'Period of a Spring',
    latex: 'T = 2\\pi\\sqrt{\\frac{m}{k}}',
    description: 'Period is independent of amplitude — the hallmark of simple harmonic motion called isochrony.',
    sectionId: 'waves', section: 'Waves & Oscillations', color: '#10b981', tags: ['oscillations'],
  },
  {
    id: 'pendulum-period',
    name: 'Period of a Simple Pendulum',
    latex: 'T = 2\\pi\\sqrt{\\frac{L}{g}}',
    description: 'Valid for small angles (θ ≤ ≈15°). Independent of mass and amplitude for small oscillations.',
    sectionId: 'waves', section: 'Waves & Oscillations', color: '#10b981', tags: ['oscillations'],
  },
  {
    id: 'wave-speed',
    name: 'Wave Speed',
    latex: 'v = f\\lambda',
    description: 'Speed equals frequency times wavelength. Constant in a given medium; v changes between media, not f.',
    sectionId: 'waves', section: 'Waves & Oscillations', color: '#10b981', tags: ['wave properties'],
  },
  {
    id: 'angular-freq',
    name: 'Angular Frequency',
    latex: '\\omega = 2\\pi f = \\frac{2\\pi}{T}',
    description: 'Radians per second. Appears naturally in SHM: x(t) = A cos(ωt + φ).',
    sectionId: 'waves', section: 'Waves & Oscillations', color: '#10b981', tags: ['wave properties'],
  },
  {
    id: 'double-slit',
    name: 'Double-Slit Constructive Interference',
    latex: 'd\\sin\\theta = n\\lambda \\qquad n = 0, 1, 2, \\ldots',
    description: 'Bright fringes when path difference equals integer multiples of λ. Destructive: d sinθ = (n + ½)λ.',
    sectionId: 'waves', section: 'Waves & Oscillations', color: '#10b981', tags: ['interference'],
  },
  {
    id: 'doppler',
    name: 'Doppler Effect',
    latex: "f' = f\\,\\frac{v \\pm v_{\\rm obs}}{v \\mp v_{\\rm src}}",
    description: 'Upper signs when source and observer approach; lower when receding. v is wave speed in medium.',
    sectionId: 'waves', section: 'Waves & Oscillations', color: '#10b981', tags: ['sound'],
  },
  {
    id: 'fourier-series',
    name: 'Fourier Series',
    latex: 'f(x) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty\\!\\left(a_n\\cos\\frac{n\\pi x}{L} + b_n\\sin\\frac{n\\pi x}{L}\\right)',
    description: 'Any periodic function decomposes into sinusoids. The coefficients encode frequency content.',
    sectionId: 'waves', section: 'Waves & Oscillations', color: '#10b981', tags: ['fourier'],
  },

  // Thermodynamics
  {
    id: 'ideal-gas',
    name: 'Ideal Gas Law',
    latex: 'PV = nRT',
    description: 'P pressure, V volume, n moles, R = 8.314 J/mol·K, T absolute temperature. Equivalently: PV = NkBT.',
    sectionId: 'thermo', section: 'Thermodynamics', color: '#f97316', tags: ['gas laws'],
  },
  {
    id: 'first-law',
    name: 'First Law of Thermodynamics',
    latex: '\\Delta U = Q - W',
    description: 'Energy conservation for a thermodynamic system. Q: heat added; W: work done by system.',
    sectionId: 'thermo', section: 'Thermodynamics', color: '#f97316', tags: ['laws'],
  },
  {
    id: 'entropy-clausius',
    name: 'Entropy (Clausius)',
    latex: 'dS = \\frac{\\delta Q_{\\rm rev}}{T} \\qquad \\Delta S \\geq 0',
    description: 'Entropy change equals reversible heat divided by temperature. Total entropy of an isolated system never decreases.',
    sectionId: 'thermo', section: 'Thermodynamics', color: '#f97316', tags: ['laws', 'entropy'],
  },
  {
    id: 'entropy-boltzmann',
    name: 'Entropy (Boltzmann)',
    latex: 'S = k_B \\ln\\Omega',
    description: 'Microscopic definition: entropy scales with the logarithm of the number of accessible microstates Ω.',
    sectionId: 'thermo', section: 'Thermodynamics', color: '#f97316', tags: ['statistical mechanics'],
  },
  {
    id: 'carnot',
    name: 'Carnot Efficiency',
    latex: '\\eta = 1 - \\frac{T_c}{T_h}',
    description: 'Maximum efficiency of any heat engine operating between hot reservoir Th and cold reservoir Tc (in kelvin).',
    sectionId: 'thermo', section: 'Thermodynamics', color: '#f97316', tags: ['heat engines'],
  },
  {
    id: 'stefan-boltzmann',
    name: 'Stefan–Boltzmann Law',
    latex: 'P = \\sigma A T^4',
    description: 'Power radiated by a blackbody. σ = 5.67×10⁻⁸ W/m²·K⁴. The T⁴ dependence makes hot stars vastly brighter.',
    sectionId: 'thermo', section: 'Thermodynamics', color: '#f97316', tags: ['radiation'],
  },
  {
    id: 'partition-function',
    name: 'Partition Function',
    latex: 'Z = \\sum_n e^{-E_n/k_BT}',
    description: 'Sum over all states weighted by Boltzmann factor. All thermodynamic quantities follow from Z: F = −kBT ln Z.',
    sectionId: 'thermo', section: 'Thermodynamics', color: '#f97316', tags: ['statistical mechanics'],
  },

  // Electromagnetism
  {
    id: 'coulomb',
    name: "Coulomb's Law",
    latex: 'F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r^2}',
    description: 'Electrostatic force between point charges. k = 1/(4πε₀) ≈ 8.99×10⁹ N·m²/C².',
    sectionId: 'em', section: 'Electromagnetism', color: '#a855f7', tags: ['electric fields'],
  },
  {
    id: 'gauss-electric',
    name: "Gauss's Law",
    latex: '\\oint \\mathbf{E}\\cdot d\\mathbf{A} = \\frac{Q_{\\rm enc}}{\\varepsilon_0}',
    description: 'Electric flux through any closed surface equals enclosed charge over ε₀. One of Maxwell\'s equations.',
    sectionId: 'em', section: 'Electromagnetism', color: '#a855f7', tags: ['electric fields', 'Maxwell'],
  },
  {
    id: 'ohms-law',
    name: "Ohm's Law",
    latex: 'V = IR',
    description: 'Voltage across a resistor equals current times resistance. Valid for ohmic materials at constant temperature.',
    sectionId: 'em', section: 'Electromagnetism', color: '#a855f7', tags: ['circuits'],
  },
  {
    id: 'power-circuit',
    name: 'Electrical Power',
    latex: 'P = IV = I^2 R = \\frac{V^2}{R}',
    description: 'Power dissipated or delivered in a circuit element. Three equivalent forms via Ohm\'s law.',
    sectionId: 'em', section: 'Electromagnetism', color: '#a855f7', tags: ['circuits'],
  },
  {
    id: 'lorentz',
    name: 'Lorentz Force',
    latex: '\\mathbf{F} = q(\\mathbf{E} + \\mathbf{v}\\times\\mathbf{B})',
    description: 'Force on a charge q moving with velocity v in fields E and B. Basis of all electric motors.',
    sectionId: 'em', section: 'Electromagnetism', color: '#a855f7', tags: ['magnetic fields'],
  },
  {
    id: 'faraday',
    name: "Faraday's Law",
    latex: '\\mathcal{E} = -N\\frac{d\\Phi_B}{dt}',
    description: 'Induced EMF in a coil equals the negative rate of magnetic flux change. Basis of every generator and transformer.',
    sectionId: 'em', section: 'Electromagnetism', color: '#a855f7', tags: ['induction', 'Maxwell'],
  },
  {
    id: 'ampere-maxwell',
    name: "Ampère's Law (with Maxwell Correction)",
    latex: '\\oint \\mathbf{B}\\cdot d\\mathbf{l} = \\mu_0\\!\\left(I_{\\rm enc} + \\varepsilon_0\\frac{d\\Phi_E}{dt}\\right)',
    description: 'Magnetic circulation equals enclosed current plus displacement current. The displacement current term predicts EM waves.',
    sectionId: 'em', section: 'Electromagnetism', color: '#a855f7', tags: ['Maxwell', 'magnetic fields'],
  },
  {
    id: 'em-wave-speed',
    name: 'Speed of Electromagnetic Wave',
    latex: 'c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}} \\approx 3\\times10^8\\,\\mathrm{m/s}',
    description: 'Maxwell derived this from purely electrical constants, proving light is an electromagnetic wave.',
    sectionId: 'em', section: 'Electromagnetism', color: '#a855f7', tags: ['Maxwell', 'em waves'],
  },
  {
    id: 'transformer',
    name: 'Ideal Transformer',
    latex: '\\frac{V_2}{V_1} = \\frac{N_2}{N_1} \\qquad I_1 V_1 = I_2 V_2',
    description: 'Voltage ratio equals turns ratio; power is conserved. Enables long-distance power transmission.',
    sectionId: 'em', section: 'Electromagnetism', color: '#a855f7', tags: ['induction'],
  },

  // Optics
  {
    id: 'snell',
    name: "Snell's Law",
    latex: 'n_1\\sin\\theta_1 = n_2\\sin\\theta_2',
    description: 'Refraction at an interface. Larger index n means slower speed and stronger bending toward the normal.',
    sectionId: 'optics', section: 'Optics', color: '#eab308',
  },
  {
    id: 'thin-lens',
    name: 'Thin Lens Equation',
    latex: '\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}',
    description: 'Relates focal length f, object distance do, and image distance di. Works for mirrors with f = R/2.',
    sectionId: 'optics', section: 'Optics', color: '#eab308',
  },
  {
    id: 'magnification',
    name: 'Lateral Magnification',
    latex: 'm = -\\frac{d_i}{d_o} = \\frac{h_i}{h_o}',
    description: 'Negative m: inverted image. |m| > 1: magnified; |m| < 1: reduced.',
    sectionId: 'optics', section: 'Optics', color: '#eab308',
  },
  {
    id: 'critical-angle',
    name: 'Critical Angle (Total Internal Reflection)',
    latex: '\\theta_c = \\arcsin\\!\\left(\\frac{n_2}{n_1}\\right) \\qquad n_1 > n_2',
    description: 'Above this angle, light cannot exit a denser medium — the basis of optical fibers.',
    sectionId: 'optics', section: 'Optics', color: '#eab308',
  },

  // Modern Physics — Relativity
  {
    id: 'lorentz-factor',
    name: 'Lorentz Factor',
    latex: '\\gamma = \\frac{1}{\\sqrt{1-v^2/c^2}}',
    description: 'Factor by which time dilates and length contracts at speed v. γ ≥ 1, diverges as v → c.',
    sectionId: 'modern', section: 'Modern Physics', color: '#ec4899', tags: ['relativity'],
  },
  {
    id: 'time-dilation',
    name: 'Time Dilation',
    latex: "\\Delta t = \\gamma\\,\\Delta t_0",
    description: "Moving clocks run slow by factor γ. Δt₀ is proper time (measured in object's rest frame).",
    sectionId: 'modern', section: 'Modern Physics', color: '#ec4899', tags: ['relativity'],
  },
  {
    id: 'length-contraction',
    name: 'Length Contraction',
    latex: 'L = \\frac{L_0}{\\gamma}',
    description: 'Moving rulers are shorter by factor γ. L₀ is proper length (in object\'s rest frame).',
    sectionId: 'modern', section: 'Modern Physics', color: '#ec4899', tags: ['relativity'],
  },
  {
    id: 'mass-energy',
    name: 'Mass–Energy Equivalence',
    latex: 'E = mc^2 \\qquad E^2 = (pc)^2 + (mc^2)^2',
    description: 'Rest energy equals mc². Full relation holds for all particles; for photons (m = 0): E = pc.',
    sectionId: 'modern', section: 'Modern Physics', color: '#ec4899', tags: ['relativity'],
  },

  // Modern Physics — Quantum
  {
    id: 'photon-energy',
    name: 'Photon Energy',
    latex: 'E = hf = \\frac{hc}{\\lambda}',
    description: 'Energy of a photon. Planck\'s constant h = 6.626×10⁻³⁴ J·s. Explains the photoelectric effect.',
    sectionId: 'modern', section: 'Modern Physics', color: '#ec4899', tags: ['quantum'],
  },
  {
    id: 'de-broglie',
    name: 'de Broglie Wavelength',
    latex: '\\lambda = \\frac{h}{p} = \\frac{h}{mv}',
    description: 'Every particle with momentum p has an associated wavelength. Explains electron diffraction.',
    sectionId: 'modern', section: 'Modern Physics', color: '#ec4899', tags: ['quantum'],
  },
  {
    id: 'uncertainty',
    name: 'Heisenberg Uncertainty Principle',
    latex: '\\Delta x\\,\\Delta p \\geq \\frac{\\hbar}{2} \\qquad \\Delta E\\,\\Delta t \\geq \\frac{\\hbar}{2}',
    description: 'Fundamental limit — not a measurement problem. Intrinsic to the quantum state. Explains atomic stability.',
    sectionId: 'modern', section: 'Modern Physics', color: '#ec4899', tags: ['quantum'],
  },
  {
    id: 'schrodinger',
    name: 'Schrödinger Equation',
    latex: 'i\\hbar\\frac{\\partial\\psi}{\\partial t} = \\left[-\\frac{\\hbar^2}{2m}\\frac{\\partial^2}{\\partial x^2} + V(x)\\right]\\psi',
    description: 'Governs the wavefunction ψ(x,t). |ψ|² is probability density. Solutions give quantized energy levels.',
    sectionId: 'modern', section: 'Modern Physics', color: '#ec4899', tags: ['quantum'],
  },
  {
    id: 'particle-in-box',
    name: 'Particle in a Box',
    latex: 'E_n = \\frac{n^2\\pi^2\\hbar^2}{2mL^2} \\qquad n = 1, 2, 3, \\ldots',
    description: 'Quantized energies for infinite square well of width L. Ground state n=1 has nonzero energy: zero-point energy.',
    sectionId: 'modern', section: 'Modern Physics', color: '#ec4899', tags: ['quantum'],
  },
  {
    id: 'bohr-energy',
    name: 'Hydrogen Energy Levels (Bohr)',
    latex: 'E_n = -\\frac{13.6\\,\\mathrm{eV}}{n^2} \\qquad n = 1, 2, 3, \\ldots',
    description: 'Energy levels of the hydrogen atom. Ionization from ground state requires 13.6 eV.',
    sectionId: 'modern', section: 'Modern Physics', color: '#ec4899', tags: ['quantum', 'atomic'],
  },
  {
    id: 'fine-structure-const',
    name: 'Fine-Structure Constant',
    latex: '\\alpha = \\frac{e^2}{4\\pi\\varepsilon_0\\hbar c} \\approx \\frac{1}{137}',
    description: 'Dimensionless coupling constant for electromagnetism. Its value cannot be derived from any known theory.',
    sectionId: 'modern', section: 'Modern Physics', color: '#ec4899', tags: ['quantum', 'atomic'],
  },
];

export const SECTION_ORDER = ['math', 'mechanics', 'waves', 'thermo', 'em', 'optics', 'modern'] as const;
