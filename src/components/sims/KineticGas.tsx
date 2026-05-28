'use client';

import { useRef, useEffect, useState } from 'react';

const W = 560, H = 340;
const N = 80;

interface Particle { x: number; y: number; vx: number; vy: number; r: number; }

function initParticles(boxW: number, boxH: number, temp: number): Particle[] {
  const speed = Math.sqrt(temp) * 1.2;
  return Array.from({ length: N }, () => {
    const angle = Math.random() * 2 * Math.PI;
    const s = speed * (0.5 + Math.random());
    return { x: 20 + Math.random() * (boxW - 40), y: 20 + Math.random() * (boxH - 40), vx: Math.cos(angle) * s, vy: Math.sin(angle) * s, r: 4 };
  });
}

export default function KineticGas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const paramsRef = useRef({ temp: 300, volume: 1.0 });
  const collisionCountRef = useRef(0);
  const frameCountRef = useRef(0);

  const [temp, setTemp] = useState(300);
  const [volume, setVolume] = useState(1.0);
  const [pressure, setPressure] = useState(0);
  const [avgKE, setAvgKE] = useState(0);

  useEffect(() => {
    paramsRef.current = { temp, volume };
    // Rescale velocities when temperature changes
    const p = paramsRef.current;
    const targetSpeed = Math.sqrt(p.temp) * 1.2;
    particlesRef.current.forEach(part => {
      const curSpeed = Math.sqrt(part.vx**2 + part.vy**2);
      if (curSpeed > 0) {
        const scale = targetSpeed * (0.7 + Math.random() * 0.6) / curSpeed;
        part.vx *= scale; part.vy *= scale;
      }
    });
  }, [temp, volume]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const boxW = W * 0.72, boxH = H * 0.86;
    const by = (H - boxH) / 2;

    particlesRef.current = initParticles(boxW, boxH, 300);

    let last = performance.now();

    function loop(now: number) {
      animRef.current = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;
      frameCountRef.current++;

      const p = paramsRef.current;
      const vScale = p.volume;
      const actualBoxW = boxW * vScale;
      const actualBoxH = boxH;
      const abx = (W - actualBoxW) / 2;

      const parts = particlesRef.current;
      let wallHits = 0;
      let totalKE = 0;

      for (const part of parts) {
        part.x += part.vx * dt * 60;
        part.y += part.vy * dt * 60;

        if (part.x - part.r < abx) { part.x = abx + part.r; part.vx = Math.abs(part.vx); wallHits++; }
        if (part.x + part.r > abx + actualBoxW) { part.x = abx + actualBoxW - part.r; part.vx = -Math.abs(part.vx); wallHits++; }
        if (part.y - part.r < by) { part.y = by + part.r; part.vy = Math.abs(part.vy); wallHits++; }
        if (part.y + part.r > by + actualBoxH) { part.y = by + actualBoxH - part.r; part.vy = -Math.abs(part.vy); wallHits++; }

        totalKE += 0.5 * (part.vx**2 + part.vy**2);
      }

      collisionCountRef.current += wallHits;

      if (frameCountRef.current % 20 === 0) {
        const p_val = (collisionCountRef.current / 20) * 0.15;
        setPressure(+p_val.toFixed(2));
        setAvgKE(+(totalKE / parts.length).toFixed(0));
        collisionCountRef.current = 0;
      }

      // Draw
      ctx.fillStyle = '#0f0f0f';
      ctx.fillRect(0, 0, W, H);

      // Box
      ctx.strokeStyle = '#3a4a6a';
      ctx.lineWidth = 2;
      ctx.strokeRect(abx, by, actualBoxW, actualBoxH);

      // Piston indicator (right wall, moves with volume)
      ctx.fillStyle = '#1a2d4a';
      ctx.fillRect(abx + actualBoxW, by, 8, actualBoxH);

      // Particles
      for (const part of parts) {
        const speed = Math.sqrt(part.vx**2 + part.vy**2);
        const maxSpeed = Math.sqrt(p.temp) * 2.5;
        const t = Math.min(speed / maxSpeed, 1);
        const r = Math.round(40 + t * 80);
        const g = Math.round(60 + t * 40);
        const b = Math.round(120 + (1 - t) * 80);
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill();
      }

      // Labels
      ctx.font = '11px system-ui, sans-serif';
      ctx.fillStyle = '#4a5a7a';
      ctx.fillText(`N = ${N} particles`, abx, by - 6);
      ctx.fillStyle = '#6b6660';
      ctx.fillText(`V × ${vScale.toFixed(1)}`, abx + actualBoxW - 30, by + actualBoxH + 14);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current!);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: 6, display: 'block' }} />
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded border p-3 col-span-2 space-y-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)', fontFamily: 'system-ui, sans-serif' }}>
          {[
            { label: 'Temperature T', value: temp, min: 50, max: 1200, step: 50, display: `${temp} K`, set: setTemp },
            { label: 'Volume V (piston)', value: volume, min: 0.4, max: 1.6, step: 0.1, display: `${volume.toFixed(1)}×`, set: setVolume },
          ].map(({ label, value, min, max, step, display, set }) => (
            <div key={label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>
                <span>{label}</span><span style={{ color: 'var(--text)' }}>{display}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(+e.target.value)} />
            </div>
          ))}
        </div>
        <div className="rounded border p-3 space-y-2" style={{ background: 'var(--surface)', borderColor: 'var(--border)', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>Live readout</div>
          <div style={{ fontSize: '0.82rem' }}>
            <div style={{ color: 'var(--muted)', marginBottom: '0.2rem' }}>Pressure</div>
            <div style={{ color: 'var(--text)', fontWeight: 600, fontSize: '1rem' }}>{pressure}</div>
          </div>
          <div style={{ fontSize: '0.82rem' }}>
            <div style={{ color: 'var(--muted)', marginBottom: '0.2rem' }}>Avg KE</div>
            <div style={{ color: 'var(--text)', fontWeight: 600, fontSize: '1rem' }}>{avgKE}</div>
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.5rem', lineHeight: 1.5 }}>
            Color = speed<br />blue=slow, red=fast
          </div>
        </div>
      </div>
      <div style={{ marginTop: '0.4rem', fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
        Increase T to speed up particles · Decrease V to raise pressure (Boyle's law)
      </div>
    </div>
  );
}
