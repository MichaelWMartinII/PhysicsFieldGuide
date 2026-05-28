export interface Topic {
  id: string;
  title: string;
  href: string;
  description?: string;
  built?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  color: string;
  textColor: string;
  topics: Topic[];
}

export const curriculum: Chapter[] = [
  {
    id: 'mechanics',
    title: 'Classical Mechanics',
    color: '#3b82f6',
    textColor: 'text-blue-400',
    topics: [
      { id: 'measurement', title: 'Measurement & Units', href: '/mechanics/measurement', description: 'SI units, dimensional analysis, estimation', built: true },
      { id: 'kinematics', title: 'Kinematics', href: '/mechanics/kinematics', description: 'Projectile motion, velocity, acceleration', built: true },
      { id: 'forces', title: "Newton's Laws", href: '/mechanics/forces', description: 'Forces, mass, free body diagrams', built: true },
      { id: 'energy', title: 'Energy & Work', href: '/mechanics/energy', description: 'Conservation of energy, pendulum', built: true },
      { id: 'momentum', title: 'Momentum & Collisions', href: '/mechanics/momentum', description: 'Linear momentum, elastic & inelastic', built: true },
      { id: 'rotation', title: 'Rotational Motion', href: '/mechanics/rotation', description: 'Torque, angular momentum, moment of inertia', built: true },
      { id: 'gravitation', title: 'Gravitation', href: '/mechanics/gravitation', description: 'Orbital mechanics, escape velocity', built: true },
    ],
  },
  {
    id: 'waves',
    title: 'Waves & Oscillations',
    color: '#10b981',
    textColor: 'text-emerald-400',
    topics: [
      { id: 'oscillations', title: 'Simple Harmonic Motion', href: '/waves/oscillations', description: 'Springs, restoring forces, period', built: true },
      { id: 'wave-properties', title: 'Wave Properties', href: '/waves/wave-properties', description: 'Wavelength, frequency, speed, phase', built: true },
      { id: 'interference', title: 'Interference & Diffraction', href: '/waves/interference', description: 'Superposition, constructive & destructive', built: true },
      { id: 'sound', title: 'Sound', href: '/waves/sound', description: 'Doppler effect, resonance, decibels', built: true },
    ],
  },
  {
    id: 'thermodynamics',
    title: 'Thermodynamics',
    color: '#f97316',
    textColor: 'text-orange-400',
    topics: [
      { id: 'heat', title: 'Heat & Temperature', href: '/thermodynamics/heat', description: 'Thermal equilibrium, specific heat', built: true },
      { id: 'gas-laws', title: 'Ideal Gas Law', href: '/thermodynamics/gas-laws', description: 'PV = nRT, Boyle, Charles, Avogadro', built: true },
      { id: 'laws', title: 'Laws of Thermodynamics', href: '/thermodynamics/laws', description: 'Entropy, heat engines, Carnot cycle', built: true },
    ],
  },
  {
    id: 'electromagnetism',
    title: 'Electromagnetism',
    color: '#a855f7',
    textColor: 'text-purple-400',
    topics: [
      { id: 'fields', title: 'Electric Fields & Forces', href: '/electromagnetism/fields', description: "Coulomb's law, field lines", built: true },
      { id: 'circuits', title: 'DC Circuits', href: '/electromagnetism/circuits', description: "Ohm's law, Kirchhoff's rules", built: true },
      { id: 'magnetism', title: 'Magnetic Fields', href: '/electromagnetism/magnetism', description: 'Lorentz force, Biot-Savart', built: true },
      { id: 'induction', title: 'Electromagnetic Induction', href: '/electromagnetism/induction', description: "Faraday's law, Lenz's law", built: true },
    ],
  },
  {
    id: 'optics',
    title: 'Optics',
    color: '#eab308',
    textColor: 'text-yellow-400',
    topics: [
      { id: 'geometric', title: 'Geometric Optics', href: '/optics/geometric', description: 'Reflection, refraction, lenses, mirrors', built: true },
      { id: 'wave-optics', title: 'Wave Optics', href: '/optics/wave-optics', description: 'Diffraction, double-slit, thin films', built: true },
    ],
  },
  {
    id: 'modern',
    title: 'Modern Physics',
    color: '#ec4899',
    textColor: 'text-pink-400',
    topics: [
      { id: 'relativity', title: 'Special Relativity', href: '/modern/relativity', description: 'Time dilation, length contraction, E=mc²', built: true },
      { id: 'quantum', title: 'Quantum Mechanics', href: '/modern/quantum', description: 'Wave-particle duality, uncertainty principle', built: true },
      { id: 'atomic', title: 'Atomic Structure', href: '/modern/atomic', description: 'Bohr model, electron orbitals, spectra', built: true },
    ],
  },
  {
    id: 'math',
    title: 'Mathematics',
    color: '#06b6d4',
    textColor: 'text-cyan-400',
    topics: [
      { id: 'vectors', title: 'Vectors & Scalars', href: '/math/vectors', description: 'Dot product, cross product, components', built: true },
      { id: 'calculus', title: 'Calculus Essentials', href: '/math/calculus', description: 'Derivatives, integrals, chain rule', built: true },
      { id: 'differential-equations', title: 'Differential Equations', href: '/math/differential-equations', description: 'ODEs for physics models', built: true },
    ],
  },
  {
    id: 'mechanics-upper',
    title: 'Classical Mechanics · Upper Division',
    color: '#3b82f6',
    textColor: 'text-blue-400',
    topics: [
      { id: 'lagrangian', title: 'Lagrangian Mechanics', href: '/mechanics/lagrangian', description: 'Generalized coordinates, Euler-Lagrange, Noether\'s theorem', built: true },
      { id: 'hamiltonian', title: 'Hamiltonian Mechanics', href: '/mechanics/hamiltonian', description: 'Phase space, Liouville\'s theorem, Poisson brackets, action-angle', built: true },
      { id: 'chaos', title: 'Nonlinear Dynamics & Chaos', href: '/mechanics/chaos', description: 'Fixed points, bifurcations, Lyapunov exponents, Lorenz attractor', built: true },
    ],
  },
  {
    id: 'waves-upper',
    title: 'Waves & Oscillations · Upper Division',
    color: '#10b981',
    textColor: 'text-emerald-400',
    topics: [
      { id: 'fourier', title: 'Fourier Analysis', href: '/waves/fourier', description: 'Fourier series, transforms, Gibbs phenomenon, uncertainty', built: true },
      { id: 'wave-equation', title: 'The Wave Equation', href: '/waves/wave-equation', description: 'D\'Alembert, normal modes, dispersion, group velocity', built: true },
    ],
  },
  {
    id: 'thermo-upper',
    title: 'Thermodynamics · Upper Division',
    color: '#f97316',
    textColor: 'text-orange-400',
    topics: [
      { id: 'statistical', title: 'Statistical Mechanics', href: '/thermodynamics/statistical', description: 'Boltzmann entropy, partition function, quantum statistics', built: true },
      { id: 'phases', title: 'Phase Transitions', href: '/thermodynamics/phases', description: 'Clausius-Clapeyron, Landau theory, critical exponents', built: true },
    ],
  },
  {
    id: 'em-upper',
    title: 'Electromagnetism · Upper Division',
    color: '#a855f7',
    textColor: 'text-purple-400',
    topics: [
      { id: 'maxwell', title: 'Maxwell\'s Equations', href: '/electromagnetism/maxwell', description: 'Integral & differential forms, EM waves, Poynting vector', built: true },
      { id: 'em-waves', title: 'EM Wave Propagation', href: '/electromagnetism/em-waves', description: 'Polarization, radiation pressure, Fresnel, skin depth', built: true },
      { id: 'electrostatics', title: 'Electrostatics: Boundary Problems', href: '/electromagnetism/electrostatics', description: 'Laplace\'s equation, separation of variables, method of images', built: true },
    ],
  },
  {
    id: 'modern-upper',
    title: 'Modern Physics · Upper Division',
    color: '#ec4899',
    textColor: 'text-pink-400',
    topics: [
      { id: 'spin', title: 'Spin & Angular Momentum', href: '/modern/spin', description: 'Pauli matrices, Clebsch-Gordan, spin-orbit coupling, Bell\'s theorem', built: true },
      { id: 'perturbation', title: 'Perturbation Theory', href: '/modern/perturbation', description: 'Time-independent & -dependent, Fermi\'s Golden Rule, variational method', built: true },
    ],
  },
  {
    id: 'math-upper',
    title: 'Mathematics · Upper Division',
    color: '#06b6d4',
    textColor: 'text-cyan-400',
    topics: [
      { id: 'linear-algebra', title: 'Linear Algebra for Physics', href: '/math/linear-algebra', description: 'Hermitian operators, spectral theorem, SVD, commutators', built: true },
      { id: 'complex-analysis', title: 'Complex Analysis', href: '/math/complex-analysis', description: 'Residue theorem, contour integration, Kramers-Kronig', built: true },
    ],
  },
  {
    id: 'optics-upper',
    title: 'Optics · Upper Division',
    color: '#eab308',
    textColor: 'text-yellow-400',
    topics: [
      { id: 'lasers', title: 'Lasers & Coherent Light', href: '/optics/lasers', description: 'Einstein coefficients, population inversion, Gaussian beams', built: true },
      { id: 'nonlinear', title: 'Nonlinear Optics', href: '/optics/nonlinear', description: 'SHG, phase matching, OPA, solitons, frequency combs', built: true },
      { id: 'quantum-optics', title: 'Quantum Optics', href: '/optics/quantum-optics', description: 'Coherent states, squeezed light, cavity QED, Jaynes-Cummings, quantum communication', built: true },
      { id: 'photonics', title: 'Nanophotonics & Plasmonics', href: '/optics/photonics', description: 'Photonic crystals, plasmonics, metamaterials, integrated photonics', built: true },
    ],
  },
  {
    id: 'modern-upper2',
    title: 'Modern Physics · Advanced Topics',
    color: '#ec4899',
    textColor: 'text-pink-400',
    topics: [
      { id: 'nuclear', title: 'Nuclear Physics', href: '/modern/nuclear', description: 'Binding energy, radioactive decay, fission and fusion', built: true },
      { id: 'solid-state', title: 'Solid-State Physics', href: '/modern/solid-state', description: 'Band structure, semiconductors, superconductivity, QHE', built: true },
      { id: 'general-relativity', title: 'General Relativity', href: '/modern/general-relativity', description: 'Equivalence principle, Einstein equations, Schwarzschild, GW', built: true },
      { id: 'particle-physics', title: 'Particle Physics & Standard Model', href: '/modern/particle-physics', description: 'Quarks, leptons, gauge bosons, QCD, electroweak unification', built: true },
      { id: 'qft', title: 'Quantum Field Theory', href: '/modern/qft', description: 'Klein-Gordon, Dirac equation, Feynman diagrams, renormalization', built: true },
      { id: 'astrophysics', title: 'Astrophysics & Stellar Structure', href: '/modern/astrophysics', description: 'Hydrostatic equilibrium, nuclear burning, stellar endpoints, Hubble tension', built: true },
      { id: 'cosmology', title: 'Cosmology', href: '/modern/cosmology', description: 'FLRW, Friedmann equations, CMB, dark matter & dark energy, ΛCDM', built: true },
      { id: 'quantum-info', title: 'Quantum Information & Computation', href: '/modern/quantum-info', description: 'Qubits, entanglement, Shor & Grover algorithms, error correction', built: true },
      { id: 'topological', title: 'Topological Phases of Matter', href: '/modern/topological', description: 'Berry phase, Chern numbers, topological insulators, Majorana fermions', built: true },
      { id: 'atomic-physics', title: 'Atomic Physics & Spectroscopy', href: '/modern/atomic-physics', description: 'Fine structure, Hund\'s rules, Zeeman effect, laser cooling, atomic clocks', built: true },
      { id: 'scattering', title: 'Scattering Theory', href: '/modern/scattering', description: 'Born approximation, partial waves, optical theorem, S-matrix, resonances', built: true },
      { id: 'magnetism', title: 'Magnetism in Condensed Matter', href: '/modern/magnetism', description: 'Exchange interaction, ferromagnetism, spin waves, frustration, NMR/MRI', built: true },
      { id: 'biophysics', title: 'Biophysics', href: '/modern/biophysics', description: 'Molecular motors, protein folding, membrane physics, Hodgkin-Huxley', built: true },
      { id: 'string-theory', title: 'String Theory & Beyond the Standard Model', href: '/modern/string-theory', description: 'SUSY, strings, D-branes, AdS/CFT, landscape, LQG', built: true },
      { id: 'superconductivity', title: 'Superconductivity & BCS Theory', href: '/modern/superconductivity', description: 'Cooper pairs, BCS gap equation, Josephson effect, GL theory, vortices', built: true },
      { id: 'gravitational-waves', title: 'Gravitational Waves', href: '/modern/gravitational-waves', description: 'Linearized GR, quadrupole formula, LIGO, multi-messenger astronomy', built: true },
      { id: 'many-body', title: 'Many-Body Quantum Physics', href: '/modern/many-body', description: 'Second quantization, Hubbard model, Green\'s functions, RPA, FQHE', built: true },
      { id: 'curved-spacetime', title: 'QFT in Curved Spacetime', href: '/modern/curved-spacetime', description: 'Hawking radiation, Unruh effect, particle creation, information paradox', built: true },
      { id: 'high-energy-astrophysics', title: 'High-Energy Astrophysics', href: '/modern/high-energy-astrophysics', description: 'Neutron stars, pulsars, accretion, GRBs, cosmic rays, GZK cutoff', built: true },
      { id: 'neutrino-physics', title: 'Neutrino Physics', href: '/modern/neutrino-physics', description: 'Oscillations, MSW effect, seesaw mechanism, neutrinoless double beta decay', built: true },
    ],
  },
  {
    id: 'mechanics-upper2',
    title: 'Classical Mechanics · Advanced Topics',
    color: '#3b82f6',
    textColor: 'text-blue-400',
    topics: [
      { id: 'fluid-mechanics', title: 'Fluid Mechanics', href: '/mechanics/fluid-mechanics', description: 'Navier-Stokes, Bernoulli, vorticity, turbulence', built: true },
      { id: 'plasma', title: 'Plasma Physics', href: '/mechanics/plasma', description: 'Debye shielding, cyclotron motion, MHD, Alfvén waves, fusion', built: true },
      { id: 'elasticity', title: 'Continuum Mechanics & Elasticity', href: '/mechanics/elasticity', description: 'Stress/strain tensors, elastic waves, seismology, fracture mechanics', built: true },
      { id: 'computational', title: 'Computational Physics', href: '/mechanics/computational', description: 'Verlet/RK4, finite differences, Monte Carlo, molecular dynamics, FFT', built: true },
    ],
  },
  {
    id: 'thermo-upper2',
    title: 'Thermodynamics · Advanced Topics',
    color: '#f97316',
    textColor: 'text-orange-400',
    topics: [
      { id: 'irreversible', title: 'Irreversible Processes & Transport', href: '/thermodynamics/irreversible', description: 'Entropy production, Onsager relations, diffusion, FDT', built: true },
      { id: 'nonequilibrium', title: 'Nonequilibrium Statistical Mechanics', href: '/thermodynamics/nonequilibrium', description: 'Boltzmann equation, Fokker-Planck, Jarzynski equality, fluctuation theorems', built: true },
      { id: 'renormalization-group', title: 'The Renormalization Group', href: '/thermodynamics/renormalization-group', description: 'Fixed points, universality, ε-expansion, Wilson-Fisher, scaling laws', built: true },
      { id: 'complex-systems', title: 'Complex Systems & Emergence', href: '/thermodynamics/complex-systems', description: 'Power laws, SOC, networks, Kuramoto model, Landauer principle', built: true },
    ],
  },
  {
    id: 'math-upper2',
    title: 'Mathematics · Advanced Topics',
    color: '#06b6d4',
    textColor: 'text-cyan-400',
    topics: [
      { id: 'probability', title: 'Probability & Statistics for Physics', href: '/math/probability', description: 'Distributions, CLT, error propagation, Bayesian inference', built: true },
      { id: 'group-theory', title: 'Group Theory for Physics', href: '/math/group-theory', description: 'Representations, character tables, Lie groups, selection rules', built: true },
      { id: 'greens-functions', title: "Green's Functions", href: '/math/greens-functions', description: 'Impulse response, Poisson & Helmholtz, Born approximation, propagators', built: true },
      { id: 'tensor-calculus', title: 'Tensor Calculus & Differential Geometry', href: '/math/tensor-calculus', description: 'Covariant derivatives, Riemann tensor, differential forms, fiber bundles', built: true },
      { id: 'special-functions', title: 'Special Functions in Physics', href: '/math/special-functions', description: 'Gamma, Legendre, spherical harmonics, Bessel, Hermite, hypergeometric', built: true },
      { id: 'variational', title: 'Variational Methods', href: '/math/variational', description: 'Euler-Lagrange equation, Rayleigh-Ritz, functional derivatives, path integrals', built: true },
    ],
  },
];
