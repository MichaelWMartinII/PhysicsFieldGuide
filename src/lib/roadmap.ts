export type Level = 'hs' | 'intro' | 'upper' | 'grad' | 'research';

export interface RoadmapTopic {
  id: string;
  title: string;
  level: Level;
  prereqs?: string[];
  href?: string;
  built?: boolean;
  description: string;
}

export interface RoadmapTrack {
  id: string;
  title: string;
  color: string;
  icon: string;
  topics: RoadmapTopic[];
}

export const LEVELS: { id: Level; label: string; sublabel: string; color: string }[] = [
  { id: 'hs',       label: 'High School',     sublabel: 'Algebra/Pre-calc',    color: '#22c55e' },
  { id: 'intro',    label: 'Introductory',    sublabel: 'Calculus-based',      color: '#3b82f6' },
  { id: 'upper',    label: 'Upper Division',  sublabel: 'Junior / Senior',     color: '#a855f7' },
  { id: 'grad',     label: 'Graduate',        sublabel: 'MS / PhD coursework', color: '#f97316' },
  { id: 'research', label: 'Research',        sublabel: 'Frontier topics',     color: '#ec4899' },
];

export const roadmap: RoadmapTrack[] = [
  {
    id: 'mechanics',
    title: 'Classical Mechanics',
    color: '#3b82f6',
    icon: '⚙️',
    topics: [
      { id: 'mech-hs-kinematics', title: 'Kinematics', level: 'hs', href: '/mechanics/kinematics', built: true, description: '1D & 2D motion, projectile, free fall' },
      { id: 'mech-hs-forces', title: "Newton's Laws", level: 'hs', href: '/mechanics/forces', built: true, prereqs: ['mech-hs-kinematics'], description: 'F=ma, friction, normal force' },
      { id: 'mech-hs-energy', title: 'Energy & Work', level: 'hs', href: '/mechanics/energy', built: true, prereqs: ['mech-hs-forces'], description: 'KE, PE, conservation of energy' },
      { id: 'mech-hs-momentum', title: 'Momentum', level: 'hs', href: '/mechanics/momentum', built: true, prereqs: ['mech-hs-forces'], description: 'Impulse, collisions, conservation' },
      { id: 'mech-intro-rotation', title: 'Rotational Mechanics', level: 'intro', href: '/mechanics/rotation', built: true, prereqs: ['mech-hs-energy'], description: 'Torque, angular momentum, moment of inertia, rolling' },
      { id: 'mech-intro-gravitation', title: 'Gravitation & Orbits', level: 'intro', href: '/mechanics/gravitation', built: true, prereqs: ['mech-hs-forces'], description: "Newton's gravity, Kepler's laws, orbital mechanics" },
      { id: 'mech-intro-oscillations', title: 'Oscillations & SHM', level: 'intro', prereqs: ['mech-hs-energy'], description: 'Simple harmonic motion, pendulum, resonance, damping' },
      { id: 'mech-upper-lagrangian', title: 'Lagrangian Mechanics', level: 'upper', prereqs: ['mech-intro-rotation'], description: 'Generalized coordinates, Euler-Lagrange equations, constraints' },
      { id: 'mech-upper-hamiltonian', title: 'Hamiltonian Mechanics', level: 'upper', prereqs: ['mech-upper-lagrangian'], description: 'Phase space, Poisson brackets, canonical transformations' },
      { id: 'mech-upper-chaos', title: 'Nonlinear Dynamics & Chaos', level: 'upper', prereqs: ['mech-upper-lagrangian'], description: 'Strange attractors, Lyapunov exponents, double pendulum' },
      { id: 'mech-grad-continuum', title: 'Continuum Mechanics', level: 'grad', prereqs: ['mech-upper-hamiltonian'], description: 'Stress, strain, elasticity, fluid mechanics' },
      { id: 'mech-research-turbulence', title: 'Turbulence', level: 'research', prereqs: ['mech-grad-continuum'], description: 'Navier-Stokes, Kolmogorov scaling, computational fluid dynamics' },
    ],
  },
  {
    id: 'waves',
    title: 'Waves & Oscillations',
    color: '#10b981',
    icon: '〰️',
    topics: [
      { id: 'wave-hs-basics', title: 'Wave Basics', level: 'hs', href: '/waves/wave-properties', built: true, description: 'Wavelength, frequency, speed, transverse vs longitudinal' },
      { id: 'wave-hs-sound', title: 'Sound & Acoustics', level: 'hs', description: 'Decibels, Doppler effect, resonance in pipes' },
      { id: 'wave-intro-interference', title: 'Interference & Diffraction', level: 'intro', href: '/waves/interference', built: true, prereqs: ['wave-hs-basics'], description: 'Double-slit, diffraction gratings, Huygens principle' },
      { id: 'wave-intro-standing', title: 'Standing Waves & Modes', level: 'intro', prereqs: ['wave-hs-basics'], description: 'Normal modes, harmonics, boundary conditions' },
      { id: 'wave-upper-fourier', title: 'Fourier Analysis', level: 'upper', prereqs: ['wave-intro-standing'], description: 'Fourier series, transform, signal decomposition' },
      { id: 'wave-upper-wave-eqn', title: 'Wave Equation & Solutions', level: 'upper', prereqs: ['wave-intro-interference'], description: 'PDE derivation, d\'Alembert solution, dispersion relations' },
      { id: 'wave-upper-nonlinear', title: 'Nonlinear Waves', level: 'upper', prereqs: ['wave-upper-wave-eqn'], description: 'Solitons, shock waves, KdV equation' },
      { id: 'wave-grad-field-theory', title: 'Classical Field Theory', level: 'grad', prereqs: ['wave-upper-wave-eqn'], description: 'Action principle for fields, Noether theorem, stress-energy tensor' },
      { id: 'wave-research-gw', title: 'Gravitational Waves', level: 'research', prereqs: ['wave-grad-field-theory'], description: 'Linearized GR, strain, LIGO detection, ringdown' },
    ],
  },
  {
    id: 'em',
    title: 'Electromagnetism',
    color: '#a855f7',
    icon: '⚡',
    topics: [
      { id: 'em-hs-fields', title: 'Electric Charges & Fields', level: 'hs', href: '/electromagnetism/fields', description: "Coulomb's law, field lines, electric potential" },
      { id: 'em-hs-circuits', title: 'DC Circuits', level: 'hs', href: '/electromagnetism/circuits', description: "Ohm's law, series/parallel, Kirchhoff's rules" },
      { id: 'em-intro-magnetism', title: 'Magnetism', level: 'intro', prereqs: ['em-hs-fields'], description: 'Lorentz force, Biot-Savart, Ampere\'s law' },
      { id: 'em-intro-induction', title: 'Electromagnetic Induction', level: 'intro', prereqs: ['em-intro-magnetism'], description: "Faraday's law, Lenz's law, inductance, AC circuits" },
      { id: 'em-upper-maxwell', title: "Maxwell's Equations", level: 'upper', prereqs: ['em-intro-induction'], description: 'Integral and differential forms, displacement current, EM waves' },
      { id: 'em-upper-em-waves', title: 'EM Wave Propagation', level: 'upper', prereqs: ['em-upper-maxwell'], description: 'Plane waves, polarization, Poynting vector, radiation pressure' },
      { id: 'em-upper-potential', title: 'Electrostatics & Potentials', level: 'upper', prereqs: ['em-upper-maxwell'], description: 'Multipole expansion, Green\'s functions, boundary value problems' },
      { id: 'em-grad-jackson', title: 'Classical Electrodynamics', level: 'grad', prereqs: ['em-upper-maxwell'], description: 'Radiation from accelerating charges, retarded potentials, scattering' },
      { id: 'em-research-plasma', title: 'Plasma Physics', level: 'research', prereqs: ['em-grad-jackson'], description: 'MHD, Alfvén waves, fusion, tokamak confinement' },
    ],
  },
  {
    id: 'thermo',
    title: 'Thermodynamics & Stat Mech',
    color: '#f97316',
    icon: '🌡️',
    topics: [
      { id: 'thermo-hs-heat', title: 'Heat & Temperature', level: 'hs', href: '/thermodynamics/heat', description: 'Thermal equilibrium, specific heat, calorimetry' },
      { id: 'thermo-hs-gas', title: 'Ideal Gas Laws', level: 'hs', href: '/thermodynamics/gas-laws', description: 'PV=nRT, Boyle, Charles, Avogadro, kinetic theory' },
      { id: 'thermo-intro-laws', title: 'Laws of Thermodynamics', level: 'intro', href: '/thermodynamics/laws', prereqs: ['thermo-hs-gas'], description: 'Entropy, heat engines, Carnot efficiency, free energy' },
      { id: 'thermo-intro-phases', title: 'Phase Transitions', level: 'intro', prereqs: ['thermo-intro-laws'], description: 'Phase diagrams, latent heat, Clausius-Clapeyron' },
      { id: 'thermo-upper-stat', title: 'Statistical Mechanics', level: 'upper', prereqs: ['thermo-intro-laws'], description: 'Microstates, Boltzmann distribution, partition functions' },
      { id: 'thermo-upper-ensembles', title: 'Statistical Ensembles', level: 'upper', prereqs: ['thermo-upper-stat'], description: 'Canonical, grand canonical, microcanonical ensembles' },
      { id: 'thermo-upper-quantum-stat', title: 'Quantum Statistics', level: 'upper', prereqs: ['thermo-upper-ensembles'], description: 'Fermi-Dirac, Bose-Einstein distributions, degeneracy' },
      { id: 'thermo-grad-critical', title: 'Critical Phenomena & RG', level: 'grad', prereqs: ['thermo-upper-quantum-stat'], description: 'Phase transitions, critical exponents, renormalization group' },
      { id: 'thermo-research-nonequil', title: 'Non-equilibrium Stat Mech', level: 'research', prereqs: ['thermo-grad-critical'], description: 'Fluctuation theorems, Jarzynski equality, active matter' },
    ],
  },
  {
    id: 'optics',
    title: 'Optics & Photonics',
    color: '#eab308',
    icon: '🔭',
    topics: [
      { id: 'opt-hs-geometric', title: 'Geometric Optics', level: 'hs', href: '/optics/geometric', description: 'Reflection, refraction, Snell\'s law, lenses, mirrors' },
      { id: 'opt-intro-wave-optics', title: 'Wave Optics', level: 'intro', href: '/optics/wave-optics', prereqs: ['opt-hs-geometric'], description: 'Thin-film interference, diffraction, polarization' },
      { id: 'opt-upper-fourier-optics', title: 'Fourier Optics', level: 'upper', prereqs: ['opt-intro-wave-optics'], description: 'Spatial frequency, lens as Fourier transform, 4f systems' },
      { id: 'opt-upper-lasers', title: 'Lasers & Coherent Light', level: 'upper', prereqs: ['opt-intro-wave-optics'], description: 'Stimulated emission, cavity modes, coherence, Gaussian beams' },
      { id: 'opt-grad-quantum-optics', title: 'Quantum Optics', level: 'grad', prereqs: ['opt-upper-lasers'], description: 'Photon statistics, squeezed states, cavity QED, entanglement' },
      { id: 'opt-research-photonics', title: 'Nanophotonics & Plasmonics', level: 'research', href: '/optics/photonics', built: true, prereqs: ['opt-grad-quantum-optics'], description: 'Optical antennas, metamaterials, near-field optics' },
    ],
  },
  {
    id: 'modern',
    title: 'Modern Physics',
    color: '#ec4899',
    icon: '⚛️',
    topics: [
      { id: 'mod-hs-relativity', title: 'Special Relativity (intro)', level: 'hs', href: '/modern/relativity', description: 'Time dilation, length contraction, E=mc²' },
      { id: 'mod-hs-quantum-intro', title: 'Quantum Intro', level: 'hs', href: '/modern/quantum', description: 'Photoelectric effect, Bohr model, wave-particle duality' },
      { id: 'mod-intro-qm', title: 'Quantum Mechanics I', level: 'intro', prereqs: ['mod-hs-quantum-intro'], description: 'Schrödinger equation, wavefunctions, particle in a box, tunneling' },
      { id: 'mod-upper-qm2', title: 'Quantum Mechanics II', level: 'upper', prereqs: ['mod-intro-qm'], description: 'Hydrogen atom, spin, angular momentum, perturbation theory' },
      { id: 'mod-upper-relativity2', title: 'Special Relativity (full)', level: 'upper', prereqs: ['mod-hs-relativity'], description: '4-vectors, relativistic dynamics, covariant electrodynamics' },
      { id: 'mod-upper-nuclear', title: 'Nuclear Physics', level: 'upper', prereqs: ['mod-upper-qm2'], description: 'Binding energy, radioactive decay, fission, fusion' },
      { id: 'mod-upper-particles', title: 'Particle Physics Intro', level: 'upper', prereqs: ['mod-upper-qm2'], description: 'Standard model overview, Feynman diagrams, conservation laws' },
      { id: 'mod-upper-neutrino', title: 'Neutrino Physics', level: 'upper', href: '/modern/neutrino-physics', built: true, prereqs: ['mod-upper-particles'], description: 'Oscillations, MSW matter effects, mass generation, neutrinoless double beta decay' },
      { id: 'mod-grad-qft', title: 'Quantum Field Theory', level: 'grad', prereqs: ['mod-upper-relativity2', 'mod-upper-particles'], description: 'Path integrals, canonical quantization, Feynman rules, QED' },
      { id: 'mod-grad-gr', title: 'General Relativity', level: 'grad', prereqs: ['mod-upper-relativity2'], description: 'Curved spacetime, Einstein equations, black holes, cosmology' },
      { id: 'mod-research-quantum-gravity', title: 'Quantum Gravity', level: 'research', prereqs: ['mod-grad-qft', 'mod-grad-gr'], description: 'Loop quantum gravity, string theory, holography, information paradox' },
    ],
  },
  {
    id: 'math',
    title: 'Mathematics for Physics',
    color: '#06b6d4',
    icon: '∑',
    topics: [
      { id: 'math-hs-algebra', title: 'Algebra & Trigonometry', level: 'hs', description: 'Equations, unit analysis, trig identities, vectors' },
      { id: 'math-intro-calc1', title: 'Single-Variable Calculus', level: 'intro', href: '/math/calculus', description: 'Derivatives, integrals, fundamental theorem, chain rule' },
      { id: 'math-intro-vectors', title: 'Multivariable Calculus', level: 'intro', href: '/math/vectors', prereqs: ['math-intro-calc1'], description: 'Gradient, divergence, curl, Stokes and divergence theorems' },
      { id: 'math-upper-linalg', title: 'Linear Algebra', level: 'upper', prereqs: ['math-intro-calc1'], description: 'Eigenvectors, matrix exponentiation, diagonalization' },
      { id: 'math-upper-odes', title: 'Differential Equations', level: 'upper', href: '/math/differential-equations', prereqs: ['math-intro-calc1'], description: '2nd-order ODEs, oscillator, Green\'s functions, Laplace transforms' },
      { id: 'math-upper-pdes', title: 'Partial Differential Equations', level: 'upper', prereqs: ['math-upper-odes'], description: 'Wave, heat, Laplace equations; separation of variables' },
      { id: 'math-upper-complex', title: 'Complex Analysis', level: 'upper', prereqs: ['math-intro-calc1'], description: 'Analytic functions, contour integration, residue theorem' },
      { id: 'math-upper-groups', title: 'Group Theory for Physics', level: 'upper', prereqs: ['math-upper-linalg'], description: 'Symmetry groups, representations, Lie algebras' },
      { id: 'math-grad-tensors', title: 'Differential Geometry & Tensors', level: 'grad', prereqs: ['math-upper-complex'], description: 'Manifolds, metric tensor, covariant derivative, Riemann curvature' },
      { id: 'math-research-topology', title: 'Topology in Physics', level: 'research', prereqs: ['math-grad-tensors'], description: 'Berry phase, Chern numbers, topological insulators' },
    ],
  },
];
