'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const W = 700, H = 440;

function buildOrbitPoints(a: number, e: number, inclDeg: number, N = 300): THREE.Vector3[] {
  const b = a * Math.sqrt(1 - e * e);
  const incl = (inclDeg * Math.PI) / 180;
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= N; i++) {
    const theta = (i / N) * 2 * Math.PI;
    const x = a * Math.cos(theta) - a * e;
    const z = b * Math.sin(theta);
    const y = z * Math.sin(incl);
    const zr = z * Math.cos(incl);
    pts.push(new THREE.Vector3(x, y, zr));
  }
  return pts;
}

// Kepler true anomaly -> r
function rAtTheta(theta: number, a: number, e: number) {
  return (a * (1 - e * e)) / (1 + e * Math.cos(theta));
}

export default function Orbit3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animRef = useRef<number | undefined>(undefined);

  const [eccentricity, setEccentricity] = useState(0.5);
  const [inclination, setInclination] = useState(25);
  const [speed, setSpeed] = useState(1);
  const paramsRef = useRef({ eccentricity: 0.5, inclination: 25, speed: 1, theta: 0 });

  useEffect(() => {
    const mount = mountRef.current!;
    const W2 = mount.clientWidth || W;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W2, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x070b14, 1);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, W2 / H, 0.1, 1000);
    camera.position.set(14, 10, 18);
    camera.lookAt(0, 0, 0);

    // Mouse-drag orbit controls (simple)
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let phi = 0.6, thetaCam = 0.7, radius = 24;
    function updateCamera() {
      camera.position.set(
        radius * Math.sin(phi) * Math.cos(thetaCam),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(thetaCam),
      );
      camera.lookAt(0, 0, 0);
    }
    updateCamera();
    const el = renderer.domElement;
    el.addEventListener('mousedown', (e) => { isDragging = true; lastX = e.clientX; lastY = e.clientY; });
    el.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      thetaCam += (e.clientX - lastX) * 0.01;
      phi = Math.max(0.1, Math.min(Math.PI - 0.1, phi + (e.clientY - lastY) * 0.01));
      lastX = e.clientX; lastY = e.clientY;
      updateCamera();
    });
    el.addEventListener('mouseup', () => { isDragging = false; });
    el.addEventListener('mouseleave', () => { isDragging = false; });
    el.addEventListener('wheel', (e) => {
      radius = Math.max(8, Math.min(60, radius + e.deltaY * 0.05));
      updateCamera();
    });

    // Stars background
    const starGeo = new THREE.BufferGeometry();
    const starPos: number[] = [];
    for (let i = 0; i < 2000; i++) {
      starPos.push((Math.random() - 0.5) * 600, (Math.random() - 0.5) * 600, (Math.random() - 0.5) * 600);
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.4, transparent: true, opacity: 0.6 })));

    // Sun
    const sunGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const sunMat = new THREE.MeshStandardMaterial({ color: 0xffd060, emissive: 0xff8800, emissiveIntensity: 1.5 });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    const sunLight = new THREE.PointLight(0xfff0cc, 2.5, 80);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0x101820, 0.5));

    // Orbit path
    let orbitLine: THREE.Line | null = null;
    let planetMesh: THREE.Mesh | null = null;
    let velocityArrow: THREE.ArrowHelper | null = null;

    function rebuildOrbit() {
      const p = paramsRef.current;
      if (orbitLine) scene.remove(orbitLine);
      if (planetMesh) scene.remove(planetMesh);
      if (velocityArrow) scene.remove(velocityArrow);

      const pts = buildOrbitPoints(8, p.eccentricity, p.inclination);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(pts);
      orbitLine = new THREE.Line(orbitGeo, new THREE.LineBasicMaterial({ color: 0x1e3a5f, linewidth: 1 }));
      scene.add(orbitLine);

      planetMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x1e3a5f, emissiveIntensity: 0.4 })
      );
      scene.add(planetMesh);

      velocityArrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 2, 0xfbbf24, 0.5, 0.3);
      scene.add(velocityArrow);
    }

    rebuildOrbit();

    // Grid plane (ecliptic)
    const gridHelper = new THREE.GridHelper(24, 12, 0x1e2d4a, 0x111827);
    scene.add(gridHelper);

    let t = 0;
    function animate() {
      animRef.current = requestAnimationFrame(animate);
      const p = paramsRef.current;
      const a = 8, e = p.eccentricity;
      const b = a * Math.sqrt(1 - e * e);
      const incl = (p.inclination * Math.PI) / 180;

      // Kepler's equation (approximate: use eccentric anomaly)
      t += 0.008 * p.speed;
      const M = t % (2 * Math.PI); // mean anomaly
      // Solve E ≈ M + e·sin(E) iteratively
      let E = M;
      for (let i = 0; i < 5; i++) E = M + e * Math.sin(E);
      const trueTheta = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2));

      const xOrb = a * (Math.cos(trueTheta) - e);
      const zOrb = b * Math.sin(trueTheta);
      const px = xOrb;
      const py = zOrb * Math.sin(incl);
      const pz = zOrb * Math.cos(incl);

      if (planetMesh) {
        planetMesh.position.set(px, py, pz);
        planetMesh.rotation.y += 0.02;
      }

      // Velocity direction (tangent to orbit)
      const dxOrb = -a * Math.sin(trueTheta);
      const dzOrb = b * Math.cos(trueTheta);
      const vLen = Math.sqrt(dxOrb * dxOrb + dzOrb * dzOrb);
      const vx = dxOrb / vLen;
      const vz = dzOrb / vLen;
      const vy = vz * Math.sin(incl);
      const vzr = vz * Math.cos(incl);

      if (velocityArrow) {
        velocityArrow.position.set(px, py, pz);
        velocityArrow.setDirection(new THREE.Vector3(vx, vy, vzr).normalize());
        const r = rAtTheta(trueTheta, a, e);
        const arrowLen = 1 + 3 / r;
        velocityArrow.setLength(arrowLen, 0.5, 0.3);
      }

      updateCamera();
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animRef.current!);
      el.removeEventListener('mousedown', () => {});
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    paramsRef.current = { ...paramsRef.current, eccentricity, inclination, speed };
  }, [eccentricity, inclination, speed]);

  return (
    <div>
      <div ref={mountRef} style={{ width: '100%', height: H, borderRadius: 8, overflow: 'hidden', cursor: 'grab' }} />
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { label: 'Eccentricity', value: eccentricity, min: 0, max: 0.95, step: 0.05,
            display: eccentricity === 0 ? 'Circle' : eccentricity < 0.3 ? 'Nearly circular' : eccentricity < 0.7 ? 'Elliptical' : 'Highly elliptical',
            onChange: setEccentricity },
          { label: 'Inclination', value: inclination, min: 0, max: 80, step: 5,
            display: `${inclination}°`, onChange: setInclination },
          { label: 'Speed', value: speed, min: 0.1, max: 5, step: 0.1,
            display: `${speed}×`, onChange: setSpeed },
        ].map(({ label, value, min, max, step, display, onChange }) => (
          <div key={label} className="rounded border p-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)', fontFamily: 'system-ui, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.4rem' }}>
              <span>{label}</span>
              <span style={{ color: 'var(--text)' }}>{display}</span>
            </div>
            <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: '0.4rem', fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>Drag to rotate · Scroll to zoom</div>
    </div>
  );
}
