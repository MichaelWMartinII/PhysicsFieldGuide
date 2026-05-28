'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const H = 440;

export default function Projectile3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animRef = useRef<number | undefined>(undefined);

  const [speed, setSpeed] = useState(20);
  const [angleDeg, setAngleDeg] = useState(45);
  const [crosswindDeg, setCrosswindDeg] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [running, setRunning] = useState(false);

  const paramsRef = useRef({ speed: 20, angleDeg: 45, crosswindDeg: 0, windSpeed: 0 });
  const runningRef = useRef(false);

  useEffect(() => {
    paramsRef.current = { speed, angleDeg, crosswindDeg, windSpeed };
  }, [speed, angleDeg, crosswindDeg, windSpeed]);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  // Scene refs that need to persist
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const ballRef = useRef<THREE.Mesh | null>(null);
  const trailPointsRef = useRef<THREE.Vector3[]>([]);
  const trailLineRef = useRef<THREE.Line | null>(null);
  const shadowDotRef = useRef<THREE.Mesh | null>(null);
  const tRef = useRef(0);
  const stateRef = useRef({ x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 });

  useEffect(() => {
    const mount = mountRef.current!;
    const W = mount.clientWidth || 700;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x070b14, 1);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 500);
    camera.position.set(30, 20, 40);
    camera.lookAt(15, 0, 0);
    cameraRef.current = camera;

    scene.add(new THREE.AmbientLight(0x334466, 1.2));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(20, 40, 20);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Ground grid
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(120, 80),
      new THREE.MeshStandardMaterial({ color: 0x0a1628, roughness: 0.9 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(30, 0, 0);
    ground.receiveShadow = true;
    scene.add(ground);
    scene.add(new THREE.GridHelper(120, 24, 0x1e3a5f, 0x111827));
    (scene.children[scene.children.length - 1] as THREE.Object3D).position.set(30, 0.01, 0);

    // Coordinate axes
    const axisLen = 8;
    const axes = [
      { dir: [1, 0, 0], color: 0xef4444, label: 'x' },
      { dir: [0, 1, 0], color: 0x22c55e, label: 'y' },
      { dir: [0, 0, 1], color: 0x3b82f6, label: 'z (wind)' },
    ];
    axes.forEach(({ dir, color }) => {
      const arrow = new THREE.ArrowHelper(
        new THREE.Vector3(...dir as [number,number,number]),
        new THREE.Vector3(0, 0.05, 0),
        axisLen, color, 0.8, 0.4
      );
      scene.add(arrow);
    });

    // Ball
    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0x78350f, emissiveIntensity: 0.4 })
    );
    ball.castShadow = true;
    scene.add(ball);
    ballRef.current = ball;

    // Ground shadow dot
    const shadowDot = new THREE.Mesh(
      new THREE.CircleGeometry(0.4, 16),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.3 })
    );
    shadowDot.rotation.x = -Math.PI / 2;
    shadowDot.position.y = 0.02;
    scene.add(shadowDot);
    shadowDotRef.current = shadowDot;

    // Camera orbit
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let phi = 0.55, thetaCam = 0.8, radius = 55;
    function updateCam() {
      camera.position.set(
        15 + radius * Math.sin(phi) * Math.cos(thetaCam),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(thetaCam),
      );
      camera.lookAt(15, 5, 0);
    }
    updateCam();
    const el = renderer.domElement;
    el.addEventListener('mousedown', (e) => { isDragging = true; lastX = e.clientX; lastY = e.clientY; });
    el.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      thetaCam += (e.clientX - lastX) * 0.012;
      phi = Math.max(0.1, Math.min(1.5, phi + (e.clientY - lastY) * 0.012));
      lastX = e.clientX; lastY = e.clientY;
      updateCam();
    });
    el.addEventListener('mouseup', () => { isDragging = false; });
    el.addEventListener('mouseleave', () => { isDragging = false; });
    el.addEventListener('wheel', (e) => {
      radius = Math.max(15, Math.min(120, radius + e.deltaY * 0.08));
      updateCam();
    });

    function render() {
      animRef.current = requestAnimationFrame(render);
      updateCam();
      renderer.render(scene, camera);
    }
    render();

    return () => {
      cancelAnimationFrame(animRef.current!);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  function resetBall() {
    if (ballRef.current) ballRef.current.position.set(0, 0, 0);
    if (shadowDotRef.current) shadowDotRef.current.position.set(0, 0.02, 0);
    if (trailLineRef.current && sceneRef.current) {
      sceneRef.current.remove(trailLineRef.current);
      trailLineRef.current = null;
    }
    trailPointsRef.current = [];
    tRef.current = 0;
    stateRef.current = { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 };
  }

  function launch() {
    resetBall();
    const p = paramsRef.current;
    const thetaLaunch = (p.angleDeg * Math.PI) / 180;
    const windRad = (p.crosswindDeg * Math.PI) / 180;
    const ax = p.windSpeed * Math.cos(windRad); // wind accel in x
    const az = p.windSpeed * Math.sin(windRad); // wind accel in z
    stateRef.current = {
      x: 0, y: 0, z: 0,
      vx: p.speed * Math.cos(thetaLaunch),
      vy: p.speed * Math.sin(thetaLaunch),
      vz: 0,
    };
    setRunning(true);
    runningRef.current = true;

    const dt = 0.016;
    function step() {
      if (!runningRef.current) return;
      const s = stateRef.current;
      s.vx += ax * dt;
      s.vz += az * dt;
      s.vy -= 9.8 * dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.z += s.vz * dt;

      if (s.y < 0) {
        s.y = 0;
        setRunning(false);
        runningRef.current = false;
      }

      if (ballRef.current) ballRef.current.position.set(s.x, s.y, s.z);
      if (shadowDotRef.current) shadowDotRef.current.position.set(s.x, 0.02, s.z);

      const pt = new THREE.Vector3(s.x, s.y, s.z);
      trailPointsRef.current.push(pt);
      if (sceneRef.current) {
        if (trailLineRef.current) sceneRef.current.remove(trailLineRef.current);
        const geo = new THREE.BufferGeometry().setFromPoints(trailPointsRef.current);
        trailLineRef.current = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0xfbbf24, opacity: 0.7, transparent: true }));
        sceneRef.current.add(trailLineRef.current);
      }

      if (runningRef.current) setTimeout(step, dt * 1000);
    }
    step();
  }

  return (
    <div>
      <div ref={mountRef} style={{ width: '100%', height: H, borderRadius: 8, overflow: 'hidden', cursor: 'grab' }} />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-xl border p-4 space-y-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          {[
            { label: 'Launch speed', value: speed, min: 5, max: 50, step: 1, display: `${speed} m/s`, set: setSpeed },
            { label: 'Launch angle', value: angleDeg, min: 5, max: 85, step: 1, display: `${angleDeg}°`, set: setAngleDeg },
          ].map(({ label, value, min, max, step, display, set }) => (
            <div key={label}>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>{label}</span><span className="font-medium" style={{ color: '#fbbf24' }}>{display}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(+e.target.value)} />
            </div>
          ))}
        </div>
        <div className="rounded-xl border p-4 space-y-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Crosswind (z-axis)</div>
          {[
            { label: 'Wind speed', value: windSpeed, min: 0, max: 15, step: 0.5, display: `${windSpeed} m/s²`, set: setWindSpeed },
            { label: 'Wind direction', value: crosswindDeg, min: -90, max: 90, step: 5, display: `${crosswindDeg}°`, set: setCrosswindDeg },
          ].map(({ label, value, min, max, step, display, set }) => (
            <div key={label}>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>{label}</span><span className="font-medium" style={{ color: '#3b82f6' }}>{display}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(+e.target.value)} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex gap-3 items-center justify-center">
        <button
          onClick={launch}
          className="px-6 py-2 rounded-lg text-sm font-semibold"
          style={{ background: '#1e3a5f', color: '#fbbf24', border: '1px solid #fbbf24' }}
        >
          🚀 Launch
        </button>
        <button
          onClick={() => { setRunning(false); runningRef.current = false; resetBall(); }}
          className="px-4 py-2 rounded-lg text-sm"
          style={{ background: 'none', color: '#64748b', border: '1px solid var(--border)' }}
        >
          Reset
        </button>
        {windSpeed > 0 && (
          <span className="text-xs" style={{ color: '#3b82f6' }}>
            Wind deflects trajectory into z-axis — no longer a flat parabola!
          </span>
        )}
      </div>
      <div className="mt-2 text-xs text-slate-600 text-center">
        x = range · y = height · z = crosswind deflection · Yellow dot = ground shadow · Drag to rotate · Scroll to zoom
      </div>
    </div>
  );
}
