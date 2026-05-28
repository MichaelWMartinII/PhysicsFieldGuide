'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const H = 440;
const GRID = 80;

export default function WaveSurface3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animRef = useRef<number | undefined>(undefined);
  const paramsRef = useRef({ amplitude: 1.2, wavelength: 4, speed: 1, mode: 'traveling' as 'traveling' | 'standing' | 'circular' });

  const [amplitude, setAmplitude] = useState(1.2);
  const [wavelength, setWavelength] = useState(4);
  const [speed, setSpeed] = useState(1);
  const [mode, setMode] = useState<'traveling' | 'standing' | 'circular'>('traveling');

  useEffect(() => {
    paramsRef.current = { amplitude, wavelength, speed, mode };
  }, [amplitude, wavelength, speed, mode]);

  useEffect(() => {
    const mount = mountRef.current!;
    const W2 = mount.clientWidth || 700;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W2, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x070b14, 1);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W2 / H, 0.1, 500);
    camera.position.set(0, 18, 28);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0x334466, 1.5));
    const dirLight = new THREE.DirectionalLight(0xaaddff, 1.5);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    // Build mesh
    const size = 20;
    const geometry = new THREE.PlaneGeometry(size, size, GRID - 1, GRID - 1);
    geometry.rotateX(-Math.PI / 2);

    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const count = posAttr.count;
    const colors = new Float32Array(count * 3);
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.MeshPhongMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      wireframe: false,
      shininess: 60,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x1e3a5f, wireframe: true, transparent: true, opacity: 0.2 });
    scene.add(new THREE.Mesh(geometry, wireMat));

    // Camera controls
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let phi = 0.7, thetaCam = 0.2, radius = 34;
    function updateCam() {
      camera.position.set(
        radius * Math.sin(phi) * Math.cos(thetaCam),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(thetaCam),
      );
      camera.lookAt(0, 0, 0);
    }
    updateCam();
    const el = renderer.domElement;
    el.addEventListener('mousedown', (e) => { isDragging = true; lastX = e.clientX; lastY = e.clientY; });
    el.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      thetaCam += (e.clientX - lastX) * 0.012;
      phi = Math.max(0.15, Math.min(1.4, phi + (e.clientY - lastY) * 0.012));
      lastX = e.clientX; lastY = e.clientY;
      updateCam();
    });
    el.addEventListener('mouseup', () => { isDragging = false; });
    el.addEventListener('mouseleave', () => { isDragging = false; });
    el.addEventListener('wheel', (e) => {
      radius = Math.max(12, Math.min(60, radius + e.deltaY * 0.05));
      updateCam();
    });

    let t = 0;
    function animate() {
      animRef.current = requestAnimationFrame(animate);
      t += 0.03 * paramsRef.current.speed;

      const p = paramsRef.current;
      const A = p.amplitude;
      const k = (2 * Math.PI) / p.wavelength;
      const omega = 1.5;

      for (let i = 0; i < count; i++) {
        const xi = posAttr.getX(i);
        const zi = posAttr.getZ(i);
        let y = 0;

        if (p.mode === 'traveling') {
          y = A * Math.sin(k * xi - omega * t);
        } else if (p.mode === 'standing') {
          y = A * Math.sin(k * xi) * Math.cos(omega * t);
        } else {
          const r = Math.sqrt(xi * xi + zi * zi);
          y = A * Math.sin(k * r - omega * t) / (1 + r * 0.15);
        }

        posAttr.setY(i, y);

        // Color: blue-cyan-white gradient by height
        const norm = (y / A + 1) / 2; // 0..1
        const r2 = norm < 0.5 ? 0 : (norm - 0.5) * 2;
        const g = norm < 0.5 ? norm * 2 * 0.6 : 0.6 + (norm - 0.5) * 2 * 0.4;
        const b = norm < 0.5 ? 0.4 + norm * 2 * 0.6 : 1 - (norm - 0.5) * 2 * 0.3;
        colors[i * 3] = r2;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b;
      }

      posAttr.needsUpdate = true;
      (geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
      geometry.computeVertexNormals();

      updateCam();
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animRef.current!);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const MODES: { key: typeof mode; label: string }[] = [
    { key: 'traveling', label: 'Traveling' },
    { key: 'standing', label: 'Standing' },
    { key: 'circular', label: 'Circular' },
  ];

  return (
    <div>
      <div ref={mountRef} style={{ width: '100%', height: H, borderRadius: 8, overflow: 'hidden', cursor: 'grab' }} />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded border p-4 space-y-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          {[
            { label: 'Amplitude A', value: amplitude, min: 0.3, max: 3, step: 0.1, display: `${amplitude} m`, set: setAmplitude },
            { label: 'Wavelength λ', value: wavelength, min: 1, max: 10, step: 0.5, display: `${wavelength} m`, set: setWavelength },
            { label: 'Animation speed', value: speed, min: 0.1, max: 4, step: 0.1, display: `${speed}×`, set: setSpeed },
          ].map(({ label, value, min, max, step, display, set }) => (
            <div key={label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem', fontFamily: 'system-ui, sans-serif' }}>
                <span>{label}</span><span style={{ color: 'var(--text)' }}>{display}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(+e.target.value)} />
            </div>
          ))}
        </div>
        <div className="rounded border p-4 space-y-2" style={{ background: 'var(--surface)', borderColor: 'var(--border)', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.5rem' }}>Wave type</div>
          {MODES.map(({ key, label }) => (
            <button key={key} onClick={() => setMode(key)}
              style={{
                width: '100%', textAlign: 'left', padding: '0.45rem 0.75rem', borderRadius: '4px',
                background: mode === key ? 'var(--surface2)' : 'transparent',
                border: `1px solid ${mode === key ? 'var(--border2)' : 'var(--border)'}`,
                color: mode === key ? 'var(--text-heading)' : 'var(--muted)',
                cursor: 'pointer', fontSize: '0.82rem',
              }}
            >
              {label}
              <span style={{ fontSize: '0.72rem', display: 'block', fontStyle: 'italic', color: mode === key ? 'var(--text)' : 'var(--muted)', opacity: 0.7 }}>
                {key === 'traveling' ? 'y = A sin(kx − ωt)' : key === 'standing' ? 'y = A sin(kx) cos(ωt)' : 'y = A sin(kr − ωt) / r'}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '0.4rem', fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>Drag to rotate · Scroll to zoom · Color = height</div>
    </div>
  );
}
