'use client';

import { useRef, useEffect, useState } from 'react';

const W = 560, H = 300;

export default function DopplerWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | undefined>(undefined);
  const tRef = useRef(0);
  const [sourceSpeed, setSourceSpeed] = useState(0);
  const [frequency, setFrequency] = useState(440);
  const paramsRef = useRef({ sourceSpeed: 0, frequency: 440 });

  useEffect(() => { paramsRef.current = { sourceSpeed, frequency }; }, [sourceSpeed, frequency]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const vs = 343; // speed of sound m/s

    // Store emitted wavefronts
    const wavefronts: { x: number; r: number; t: number }[] = [];
    let lastEmit = 0;

    function draw() {
      const { sourceSpeed, frequency } = paramsRef.current;
      tRef.current += 0.016;
      const t = tRef.current;

      ctx.fillStyle = '#0f0f0f'; ctx.fillRect(0, 0, W, H);

      const scale = 0.5; // px per m
      const srcX = W / 2 + sourceSpeed * t * scale * 20 % W - W / 2;
      const clampedSrcX = ((srcX % W) + W) % W;
      const cy = H / 2;

      // Emit wavefront every period
      const period = 1 / frequency;
      if (t - lastEmit >= period * 0.3) {
        wavefronts.push({ x: clampedSrcX, r: 0, t });
        lastEmit = t;
        if (wavefronts.length > 40) wavefronts.shift();
      }

      // Draw wavefronts
      wavefronts.forEach(wf => {
        const age = t - wf.t;
        const r = age * vs * scale * 0.3;
        const alpha = Math.max(0, 1 - r / (W * 0.6));
        if (alpha < 0.02) return;
        ctx.beginPath();
        ctx.arc(wf.x, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(91,127,168,${alpha * 0.7})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Source
      ctx.beginPath(); ctx.arc(clampedSrcX, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#e87d3e'; ctx.fill();

      // Direction arrow for moving source
      if (Math.abs(sourceSpeed) > 0) {
        const dir = sourceSpeed > 0 ? 1 : -1;
        ctx.strokeStyle = '#e87d3e'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(clampedSrcX + 10, cy);
        ctx.lineTo(clampedSrcX + 10 + dir * 30, cy); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(clampedSrcX + 10 + dir * 30, cy);
        ctx.lineTo(clampedSrcX + 10 + dir * 22, cy - 5);
        ctx.lineTo(clampedSrcX + 10 + dir * 22, cy + 5);
        ctx.closePath(); ctx.fillStyle = '#e87d3e'; ctx.fill();
      }

      // Observer on the right
      const obsX = W - 50, obsY = cy;
      ctx.beginPath(); ctx.arc(obsX, obsY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#3d7d5c'; ctx.fill();
      ctx.fillStyle = '#3d7d5c'; ctx.font = '10px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('observer', obsX, obsY + 18);

      // Doppler shifted frequency
      const mach = sourceSpeed / vs;
      let fObs: number;
      if (Math.abs(mach) < 1) {
        fObs = frequency * vs / (vs - sourceSpeed * Math.sign(obsX - clampedSrcX));
      } else {
        fObs = NaN;
      }

      // Stats
      ctx.fillStyle = '#5b7fa8'; ctx.font = '11px system-ui'; ctx.textAlign = 'left';
      ctx.fillText(`Source: f₀ = ${frequency} Hz`, 15, 22);
      ctx.fillStyle = '#3d7d5c';
      ctx.fillText(`Observed: f = ${isNaN(fObs) ? 'SHOCK WAVE' : fObs.toFixed(0) + ' Hz'}`, 15, 38);
      ctx.fillStyle = '#6b6660';
      ctx.fillText(`vs = ${vs} m/s  |  source speed = ${sourceSpeed} m/s`, 15, H - 12);

      if (Math.abs(mach) >= 0.5 && Math.abs(mach) < 1) {
        ctx.fillStyle = '#9a7d2c'; ctx.font = '10px system-ui';
        ctx.fillText(`Mach ${Math.abs(mach).toFixed(2)} — wavefronts bunching up`, 15, 54);
      } else if (Math.abs(mach) >= 1) {
        ctx.fillStyle = '#a85b5b'; ctx.font = '10px system-ui';
        ctx.fillText(`Supersonic — Mach cone forming`, 15, 54);
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current !== undefined) cancelAnimationFrame(animRef.current); };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: 6, display: 'block' }} />
      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          { label: 'Source speed', value: sourceSpeed, min: -300, max: 300, step: 10, display: `${sourceSpeed} m/s`, set: setSourceSpeed },
          { label: 'Source frequency', value: frequency, min: 100, max: 1200, step: 50, display: `${frequency} Hz`, set: setFrequency },
        ].map(({ label, value, min, max, step, display, set }) => (
          <div key={label} className="rounded border p-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)', fontFamily: 'system-ui' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>
              <span>{label}</span><span style={{ color: 'var(--text)' }}>{display}</span>
            </div>
            <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(+e.target.value)} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: '0.4rem', fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', fontFamily: 'system-ui' }}>
        Move source toward the observer to compress wavefronts (higher pitch). Approach Mach 1 to see shock wave formation.
      </div>
    </div>
  );
}
