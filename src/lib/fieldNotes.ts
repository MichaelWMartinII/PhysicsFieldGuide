export type FieldNote = {
  year?: string;
  title: string;
  body: string;
  source?: string;
  sourceUrl?: string;
};

const source = (sourceText: string, sourceUrl?: string) => ({ source: sourceText, sourceUrl });

export const fieldNotes: Record<string, FieldNote> = {
  '/mechanics/measurement': {
    year: '1945',
    title: "Fermi's paper scraps",
    body: 'Enrico Fermi estimated the Trinity blast yield by dropping paper as the shock wave passed. It was not precision instrumentation; it was physical intuition made quantitative.',
    ...source('Richard Rhodes, The Making of the Atomic Bomb; Los Alamos historical accounts of the Trinity test.'),
  },
  '/mechanics/kinematics': {
    year: '1638',
    title: "Galileo's ramps",
    body: 'Galileo studied falling motion by slowing it down on inclined planes. The move was decisive: make nature measurable, then ask what mathematical pattern remains.',
    ...source('Galileo Galilei, Dialogues Concerning Two New Sciences.'),
  },
  '/mechanics/forces': {
    year: '1687',
    title: "Newton's Principia",
    body: 'Newton unified falling objects and planetary motion under one mechanics. The radical claim was that Earth and sky obey the same rules.',
    ...source('Isaac Newton, Philosophiæ Naturalis Principia Mathematica.'),
  },
  '/mechanics/energy': {
    year: '1840s',
    title: 'Joule and conservation',
    body: 'James Prescott Joule connected mechanical work and heat with careful experiments. Energy conservation grew from the stubborn observation that nature keeps the books.',
    ...source('James Prescott Joule, papers on the mechanical equivalent of heat; Royal Society biographical records.'),
  },
  '/mechanics/momentum': {
    year: '1600s',
    title: 'Descartes, Huygens, and impact',
    body: 'Early collision studies forced physicists to separate momentum from kinetic energy. Huygens got elastic impacts right before Newtonian notation made them familiar.',
    ...source('Christiaan Huygens, De Motu Corporum ex Percussione; René Descartes, Principles of Philosophy.'),
  },
  '/mechanics/rotation': {
    year: '1750s',
    title: "Euler's rigid bodies",
    body: 'Leonhard Euler gave rotating bodies their own equations of motion. Torque and angular momentum became more than analogies to force and momentum.',
    ...source('Leonhard Euler, Theoria Motus Corporum Solidorum seu Rigidorum.'),
  },
  '/mechanics/gravitation': {
    year: '1609',
    title: "Kepler's patient astronomy",
    body: 'Kepler extracted elliptical orbits from Tycho Brahe’s precise Mars data. Newton later explained those ellipses with universal gravitation.',
    ...source('Johannes Kepler, Astronomia Nova; Tycho Brahe observational records.'),
  },
  '/waves/oscillations': {
    year: '1656',
    title: "Huygens' pendulum clock",
    body: 'Christiaan Huygens turned the pendulum into a timekeeping machine. The same simple oscillator now appears in clocks, atoms, circuits, and quantum fields.',
    ...source('Christiaan Huygens, Horologium Oscillatorium.'),
  },
  '/waves/wave-properties': {
    year: '1700s',
    title: "d'Alembert's wave equation",
    body: "Jean le Rond d'Alembert wrote one of the first general equations for waves on a string, showing that left- and right-moving disturbances could pass through each other.",
    ...source("Jean le Rond d'Alembert, Recherches sur la courbe que forme une corde tendue mise en vibration."),
  },
  '/waves/interference': {
    year: '1801',
    title: "Young's double slit",
    body: 'Thomas Young used interference fringes to argue that light behaves like a wave. The same experiment later became a centerpiece of quantum weirdness.',
    ...source('Thomas Young, Bakerian Lectures on light and colors, Royal Society.'),
  },
  '/waves/sound': {
    year: '1842',
    title: "Doppler's moving source",
    body: 'Christian Doppler predicted that motion changes observed frequency. The idea now measures storms, galaxies, blood flow, and speeding cars.',
    ...source('Christian Doppler, Über das farbige Licht der Doppelsterne.'),
  },
  '/thermodynamics/heat': {
    year: '1798',
    title: "Rumford's cannon boring",
    body: 'Count Rumford noticed that boring cannon barrels could generate apparently endless heat. That helped undermine the old caloric-fluid picture.',
    ...source('Benjamin Thompson, Count Rumford, "An Experimental Enquiry Concerning the Source of the Heat..."'),
  },
  '/thermodynamics/gas-laws': {
    year: '1662-1811',
    title: 'The gas-law relay',
    body: 'Boyle, Charles, Gay-Lussac, and Avogadro each found part of the pattern. The ideal gas law is a compact summary of centuries of careful measurement.',
    ...source('Robert Boyle, New Experiments Physico-Mechanical; Avogadro, 1811 molecular hypothesis paper.'),
  },
  '/thermodynamics/laws': {
    year: '1824',
    title: "Carnot's engine limit",
    body: 'Sadi Carnot studied steam engines and found that efficiency has a theoretical ceiling. Industrial engineering helped reveal one of nature’s deepest laws.',
    ...source('Sadi Carnot, Reflections on the Motive Power of Fire.'),
  },
  '/electromagnetism/fields': {
    year: '1830s',
    title: "Faraday's lines of force",
    body: 'Faraday pictured electric and magnetic influence as fields filling space. Maxwell later turned those pictures into equations.',
    ...source('Michael Faraday, Experimental Researches in Electricity.'),
  },
  '/electromagnetism/circuits': {
    year: '1827',
    title: "Ohm's stubborn law",
    body: 'Georg Ohm’s relation between voltage, current, and resistance was not immediately celebrated. It became indispensable once electrical engineering caught up.',
    ...source('Georg Simon Ohm, Die galvanische Kette, mathematisch bearbeitet.'),
  },
  '/electromagnetism/magnetism': {
    year: '1820',
    title: "Oersted's compass needle",
    body: 'Hans Christian Oersted noticed that an electric current deflected a compass needle. Electricity and magnetism stopped being separate subjects.',
    ...source('Hans Christian Oersted, Experiments on the Effect of a Current of Electricity on the Magnetic Needle.'),
  },
  '/electromagnetism/induction': {
    year: '1831',
    title: "Faraday's induction ring",
    body: 'Faraday showed that a changing current could induce another current. Generators, transformers, and much of modern power infrastructure trace back to that insight.',
    ...source('Michael Faraday, Experimental Researches in Electricity, first series on electromagnetic induction.'),
  },
  '/optics/geometric': {
    year: '1020s',
    title: "Ibn al-Haytham's optics",
    body: 'Ibn al-Haytham argued that vision comes from light entering the eye, not rays emitted by it. His experiments helped make optics an empirical science.',
    ...source('Ibn al-Haytham, Kitab al-Manazir (Book of Optics).'),
  },
  '/optics/wave-optics': {
    year: '1818',
    title: "Fresnel's bright spot",
    body: 'Fresnel’s wave theory predicted a bright spot at the center of a circular shadow. The surprising confirmation helped defeat the purely corpuscular view of light.',
    ...source('Augustin-Jean Fresnel, diffraction memoirs; French Academy of Sciences Poisson spot episode.'),
  },
  '/modern/relativity': {
    year: '1905',
    title: "Einstein's clock problem",
    body: 'Special relativity grew from taking Maxwell’s equations and synchronized clocks seriously. Space and time had to bend to keep light speed fixed.',
    ...source('Albert Einstein, "On the Electrodynamics of Moving Bodies."'),
  },
  '/modern/quantum': {
    year: '1900',
    title: "Planck's desperate constant",
    body: 'Planck introduced energy quanta to fit blackbody radiation. What began as a mathematical fix became the opening move of quantum theory.',
    ...source('Max Planck, papers on blackbody radiation and the quantum hypothesis.'),
  },
  '/modern/atomic': {
    year: '1913',
    title: "Bohr's atom",
    body: 'Bohr combined Rutherford’s nucleus with Planck’s quantization to explain hydrogen spectra. The model was wrong in detail but right enough to open the door.',
    ...source('Niels Bohr, "On the Constitution of Atoms and Molecules."'),
  },
  '/math/vectors': {
    year: '1800s',
    title: 'Gibbs and vector notation',
    body: 'Josiah Willard Gibbs helped popularize the compact vector notation used in physics today. Before that, many calculations were buried in quaternion language.',
    ...source('J. Willard Gibbs and E. B. Wilson, Vector Analysis.'),
  },
  '/math/calculus': {
    year: '1660s',
    title: 'Newton and Leibniz',
    body: 'Calculus was invented to describe changing quantities. Physics gave it a purpose: motion, force, fields, and accumulation all needed a new language.',
    ...source('Newton, Method of Fluxions; Leibniz, Nova Methodus pro Maximis et Minimis.'),
  },
  '/math/differential-equations': {
    year: '1700s',
    title: 'Equations of change',
    body: 'Differential equations became the grammar of physics because laws usually describe local rates of change, not finished answers.',
    ...source('History of the Euler, Bernoulli, and d’Alembert development of differential equations in mechanics.'),
  },
  '/mechanics/lagrangian': {
    year: '1788',
    title: "Lagrange's analytic mechanics",
    body: 'Lagrange rewrote mechanics without drawing every force. The principle of stationary action became one of the most durable ideas in theoretical physics.',
  },
  '/mechanics/hamiltonian': {
    year: '1830s',
    title: "Hamilton's phase space",
    body: 'Hamilton recast mechanics in terms of coordinates and momenta. That framework later became the natural bridge to statistical mechanics and quantum theory.',
  },
  '/mechanics/chaos': {
    year: '1890',
    title: "Poincare's three-body surprise",
    body: 'Henri Poincare found that deterministic equations can still produce motion too sensitive to predict long-term. Chaos was hiding inside classical mechanics.',
  },
  '/waves/fourier': {
    year: '1822',
    title: "Fourier's heat analysis",
    body: 'Fourier claimed complicated functions could be built from sine and cosine waves. The idea looked suspicious at first and then became everywhere.',
  },
  '/waves/wave-equation': {
    year: '1740s',
    title: 'Strings and equations',
    body: "The vibrating string problem pushed Euler, d'Alembert, and Bernoulli toward partial differential equations. Music helped invent modern mathematical physics.",
  },
  '/thermodynamics/statistical': {
    year: '1870s',
    title: "Boltzmann's counting",
    body: 'Boltzmann connected entropy to the number of microscopic arrangements. The formula on his tombstone says that disorder can be counted.',
  },
  '/thermodynamics/phases': {
    year: '1870s',
    title: "Gibbs' phase rule",
    body: 'Gibbs showed how equilibrium phases obey mathematical constraints. His work made chemistry and thermodynamics speak the same language.',
  },
  '/electromagnetism/maxwell': {
    year: '1865',
    title: "Maxwell's synthesis",
    body: 'Maxwell added the displacement current and found electromagnetic waves moving at light speed. Light became an electromagnetic phenomenon.',
  },
  '/electromagnetism/em-waves': {
    year: '1887',
    title: "Hertz makes radio waves",
    body: 'Heinrich Hertz generated and detected electromagnetic waves in the lab, confirming Maxwell’s prediction and opening the road to radio.',
  },
  '/electromagnetism/electrostatics': {
    year: '1840s',
    title: 'Kelvin and images',
    body: 'The method of images turns conductors into clever mirror charges. William Thomson, later Lord Kelvin, helped develop these electrostatic techniques.',
  },
  '/modern/spin': {
    year: '1925',
    title: 'Spin appears',
    body: 'Uhlenbeck and Goudsmit proposed electron spin to explain spectral structure. It sounded literal at first, but quantum spin is stranger than a tiny rotating ball.',
  },
  '/modern/perturbation': {
    year: '1800s',
    title: 'Small corrections, big power',
    body: 'Perturbation theory grew from celestial mechanics: planets mostly follow simple orbits, with small tugs from the others. Quantum physicists inherited the trick.',
  },
  '/math/linear-algebra': {
    year: '1920s',
    title: 'Matrices meet quantum mechanics',
    body: 'Heisenberg’s early quantum mechanics used arrays of transition amplitudes. Matrix algebra turned out to be the right machinery for observables.',
  },
  '/math/complex-analysis': {
    year: '1800s',
    title: 'Cauchy and contours',
    body: 'Complex analysis made impossible real integrals tractable by walking through the complex plane. Physics uses that detour constantly.',
  },
  '/optics/lasers': {
    year: '1960',
    title: 'The first laser',
    body: 'Theodore Maiman built the first working laser using a ruby crystal. The device was once called a solution looking for a problem; now it is everywhere.',
  },
  '/optics/nonlinear': {
    year: '1961',
    title: 'Second-harmonic generation',
    body: 'Soon after the laser appeared, researchers saw crystals convert red light into ultraviolet. Nonlinear optics began when light became intense enough to change matter’s response.',
  },
  '/optics/quantum-optics': {
    year: '1963',
    title: 'Glauber counts photons',
    body: 'Roy Glauber built a quantum theory of optical coherence. It explained what lasers do that ordinary lamps do not.',
  },
  '/optics/photonics': {
    year: '1987',
    title: 'Photonic crystals',
    body: 'Eli Yablonovitch and Sajeev John showed that periodic materials could control light the way crystals control electrons.',
  },
  '/modern/nuclear': {
    year: '1896',
    title: "Becquerel's fogged plates",
    body: 'Henri Becquerel found that uranium salts could expose photographic plates without sunlight. Radioactivity announced that atoms had hidden interiors.',
  },
  '/modern/solid-state': {
    year: '1928',
    title: 'Bloch waves',
    body: 'Felix Bloch showed how electrons move through periodic crystals as waves. Band theory made conductors, insulators, and semiconductors understandable.',
  },
  '/modern/general-relativity': {
    year: '1915',
    title: "Einstein's field equations",
    body: 'General relativity replaced gravitational force with spacetime geometry. The theory first proved itself by explaining Mercury’s stubborn orbit.',
  },
  '/modern/particle-physics': {
    year: '1960s-1970s',
    title: 'The Standard Model takes shape',
    body: 'Quarks, leptons, and gauge fields were assembled into a theory that predicted new particles before experiments found them.',
  },
  '/modern/qft': {
    year: '1940s',
    title: 'Renormalization',
    body: 'Feynman, Schwinger, Tomonaga, and Dyson tamed infinities in quantum electrodynamics. The result was one of the most precise theories ever tested.',
  },
  '/modern/astrophysics': {
    year: '1920s',
    title: "Cecilia Payne's stars",
    body: 'Cecilia Payne-Gaposchkin showed that stars are mostly hydrogen and helium. A thesis result rewrote what the universe is made of.',
  },
  '/modern/cosmology': {
    year: '1929',
    title: "Hubble's expanding universe",
    body: 'Edwin Hubble found that distant galaxies recede faster. The universe stopped looking static and started having a history.',
  },
  '/modern/quantum-info': {
    year: '1980s-1990s',
    title: 'Information becomes physical',
    body: 'Bennett, Deutsch, Shor, and others showed that quantum mechanics changes what computation and communication can mean.',
  },
  '/modern/topological': {
    year: '1980',
    title: 'Topology enters the lab',
    body: 'The quantum Hall effect revealed electrical conductance locked to topological integers. Geometry became measurable with a voltmeter.',
  },
  '/modern/atomic-physics': {
    year: '1985',
    title: 'Laser cooling',
    body: 'Chu, Cohen-Tannoudji, and Phillips helped turn light into a tool for slowing atoms. Cold atoms made quantum behavior visible on human scales.',
  },
  '/modern/scattering': {
    year: '1911',
    title: "Rutherford's gold foil",
    body: 'Alpha particles bouncing backward from thin gold foil revealed the atomic nucleus. Scattering became a microscope for things too small to see.',
  },
  '/modern/magnetism': {
    year: '1907',
    title: "Weiss' magnetic domains",
    body: 'Pierre Weiss proposed that ferromagnets contain microscopic domains. Magnetism became a collective phenomenon, not just a property of isolated atoms.',
  },
  '/modern/biophysics': {
    year: '1952',
    title: 'Hodgkin and Huxley',
    body: 'Hodgkin and Huxley modeled nerve impulses with electrical circuits and ion channels. Biology became quantitative without becoming less alive.',
  },
  '/modern/string-theory': {
    year: '1968',
    title: 'A formula becomes strings',
    body: 'The Veneziano amplitude was first a scattering formula. Physicists later realized it behaved as if tiny strings, not point particles, were vibrating.',
  },
  '/modern/superconductivity': {
    year: '1911',
    title: 'Kamerlingh Onnes and zero resistance',
    body: 'Heike Kamerlingh Onnes cooled mercury near absolute zero and saw resistance vanish. The explanation had to wait for quantum many-body theory.',
  },
  '/modern/gravitational-waves': {
    year: '2015',
    title: 'LIGO hears spacetime',
    body: 'A century after Einstein predicted gravitational waves, LIGO detected the chirp of merging black holes. The signal was tiny; the implication was enormous.',
  },
  '/modern/many-body': {
    year: '1950s-1960s',
    title: 'Collective behavior',
    body: 'Many-body physics explains why simple microscopic rules can produce phases, quasiparticles, and emergent laws that no single particle contains.',
  },
  '/modern/curved-spacetime': {
    year: '1974',
    title: "Hawking's black-hole radiation",
    body: 'Hawking combined quantum fields with curved spacetime and found that black holes should glow faintly. Gravity, quantum theory, and thermodynamics collided.',
  },
  '/modern/high-energy-astrophysics': {
    year: '1967',
    title: "Bell Burnell's pulsars",
    body: 'Jocelyn Bell Burnell found a strange regular radio signal that turned out to be a spinning neutron star. Precision in the noise mattered.',
  },
  '/modern/neutrino-physics': {
    year: '1956',
    title: 'The neutrino is caught',
    body: 'Cowan and Reines detected neutrinos from a reactor decades after Pauli proposed the particle to save energy conservation.',
  },
  '/mechanics/fluid-mechanics': {
    year: '1738',
    title: "Bernoulli's flowing energy",
    body: 'Daniel Bernoulli connected pressure, speed, and height in moving fluids. His equation is energy conservation wearing a fluid-mechanics disguise.',
  },
  '/mechanics/plasma': {
    year: '1928',
    title: 'Langmuir names plasma',
    body: 'Irving Langmuir borrowed the word plasma for ionized gases because they carried charged particles through a collective medium.',
  },
  '/mechanics/elasticity': {
    year: '1678',
    title: "Hooke's spring law",
    body: "Robert Hooke's ut tensio, sic vis captured the proportionality of force and extension. Linear elasticity begins with that humble spring.",
  },
  '/mechanics/computational': {
    year: '1940s',
    title: 'Physics meets computation',
    body: 'Early electronic computers were built partly to solve physics problems too hard for pencil and paper. Simulation became a third way, beside theory and experiment.',
  },
  '/thermodynamics/irreversible': {
    year: '1931',
    title: "Onsager's reciprocity",
    body: 'Lars Onsager found symmetry relations for coupled irreversible processes. Even systems out of equilibrium keep traces of microscopic reversibility.',
  },
  '/thermodynamics/nonequilibrium': {
    year: '1872',
    title: "Boltzmann's H-theorem",
    body: 'Boltzmann tried to explain why gases approach equilibrium. The argument exposed deep questions about probability, time, and what irreversibility means.',
  },
  '/thermodynamics/renormalization-group': {
    year: '1971',
    title: "Wilson's scale microscope",
    body: 'Kenneth Wilson explained critical phenomena by watching how physics changes with scale. The renormalization group became a language for universality.',
  },
  '/thermodynamics/complex-systems': {
    year: '1980s',
    title: 'Emergence gets quantitative',
    body: 'Complex systems research asks how many simple parts produce collective behavior. The surprise is that patterns can be universal even when details differ.',
  },
  '/math/probability': {
    year: '1700s',
    title: 'From games to gases',
    body: 'Probability began in gambling problems and became essential for thermodynamics, measurement, quantum theory, and inference from noisy data.',
  },
  '/math/group-theory': {
    year: '1830s',
    title: "Galois' symmetry",
    body: 'Evariste Galois connected algebraic solvability to symmetry groups. Physics later found that symmetry organizes particles, fields, and conservation laws.',
  },
  '/math/greens-functions': {
    year: '1828',
    title: "George Green's essay",
    body: 'George Green self-published work that became central to potential theory. Green’s functions now solve everything from electrostatics to quantum scattering.',
  },
  '/math/tensor-calculus': {
    year: '1900s',
    title: 'The math Einstein needed',
    body: 'Ricci and Levi-Civita developed tensor calculus before general relativity. Einstein needed that language to make gravity geometric.',
  },
  '/math/special-functions': {
    year: '1800s',
    title: 'Named functions from real problems',
    body: 'Bessel, Legendre, Hermite, and others appear because common symmetries keep producing the same differential equations.',
  },
  '/math/variational': {
    year: '1744',
    title: "Maupertuis' least action",
    body: 'The principle of least action suggested that nature follows paths selected by an extremum. Later physics made that idea astonishingly precise.',
  },
};
