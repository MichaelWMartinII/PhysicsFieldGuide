'use client';

import { useRef, useEffect, useState } from 'react';

const W = 560, H = 300;

export default function InductionSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | undefined>(undefined);
  const tRef = useRef(0);
  const [speed, setSpeed] = useState(1);
  const [turns, setTurns] = useState(50);
  const paramsRef = useRef({ speed: 1, turns: 50 });

  useEffect(() => { paramsRef.current = { speed, turns }; }, [speed, turns]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    function draw() {
      const { speed, turns } = paramsRef.current;
      tRef.current += 0.02 * speed;
      const t = tRef.current;

      ctx.fillStyle = '#0f0f0f';
      ctx.fillRect(0, 0, W, H);

      // ── Magnet (left side) ──
      const magX = 80 + Math.sin(t) * 60;
      const magY = H / 2;
      const magW = 50, magH = 90;

      // N pole
      ctx.fillStyle = '#5b7fa8';
      ctx.fillRect(magX - magW / 2, magY - magH / 2, magW, magH / 2);
      ctx.fillStyle = '#e8e3d8'; ctx.font = 'bold 14px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('N', magX, magY - magH / 4 + 5);

      // S pole
      ctx.fillStyle = '#a85b5b';
      ctx.fillRect(magX - magW / 2, magY, magW, magH / 2);
      ctx.fillStyle = '#e8e3d8';
      ctx.fillText('S', magX, magY + magH / 4 + 5);

      // velocity arrow
      const vx = Math.cos(t) * speed * 60;
      if (Math.abs(vx) > 2) {
        const dir = vx > 0 ? 1 : -1;
        ctx.strokeStyle = '#9a7d2c'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(magX + dir * 32, magY); ctx.lineTo(magX + dir * 55, magY); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(magX + dir * 55, magY);
        ctx.lineTo(magX + dir * 48, magY - 5);
        ctx.lineTo(magX + dir * 48, magY + 5);
        ctx.closePath(); ctx.fillStyle = '#9a7d2c'; ctx.fill();
      }

      // ── Coil (right side) ──
      const coilX = 380, coilY = H / 2;
      const coilW = 80, coilH = 90;

      // Coil rectangle
      ctx.strokeStyle = '#3d7d5c'; ctx.lineWidth = 2;
      ctx.strokeRect(coilX - coilW / 2, coilY - coilH / 2, coilW, coilH);

      // Winding lines
      ctx.strokeStyle = '#3d7d5c'; ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const wx = coilX - coilW / 2 + (i + 0.5) * coilW / 8;
        ctx.beginPath(); ctx.moveTo(wx, coilY - coilH / 2); ctx.lineTo(wx, coilY + coilH / 2); ctx.stroke();
      }

      ctx.fillStyle = '#3d7d5c'; ctx.font = '10px system-ui'; ctx.textAlign = 'center';
      ctx.fillText(`N = ${turns} turns`, coilX, coilY - coilH / 2 - 8);

      // ── Flux and EMF ──
      const dist = coilX - magX;
      const dflux_dt = -turns * 1000 * 2 * dist / Math.max(dist * dist * 0.005, 1) ** 2
        * Math.cos(t) * speed * 0.01;
      const emf = -dflux_dt * 0.0001; // scale for display

      // Current direction indicator
      const emfSign = emf > 0.01 ? '→' : emf < -0.01 ? '←' : '·';
      ctx.fillStyle = emf > 0.01 ? '#5b7fa8' : emf < -0.01 ? '#e87d3e' : '#3a3a3a';
      ctx.font = '22px system-ui'; ctx.textAlign = 'center';
      ctx.fillText(emfSign, coilX, coilY + 6);

      // Wire leads
      ctx.strokeStyle = '#4a4a4a'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(coilX - coilW / 2, coilY - 20); ctx.lineTo(coilX - coilW / 2 - 20, coilY - 20);
      ctx.lineTo(coilX - coilW / 2 - 20, coilY + 80); ctx.lineTo(coilX + coilW / 2 + 20, coilY + 80);
      ctx.lineTo(coilX + coilW / 2 + 20, coilY - 20); ctx.lineTo(coilX + coilW / 2, coilY - 20); ctx.stroke();

      // Galvanometer
      ctx.beginPath(); ctx.arc(coilX, coilY + 80, 14, 0, Math.PI * 2);
      ctx.strokeStyle = '#4a4a4a'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#4a4a4a'; ctx.font = '9px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('G', coilX, coilY + 84);

      // Needle
      const needleAngle = -Math.PI / 2 + emf * 0.8;
      ctx.save(); ctx.translate(coilX, coilY + 80); ctx.rotate(needleAngle);
      ctx.strokeStyle = '#e87d3e'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -11); ctx.stroke();
      ctx.restore();

      // ── Stats panel ──
      ctx.fillStyle = '#5b7fa8'; ctx.font = '10px system-ui'; ctx.textAlign = 'left';
      ctx.fillText(`ε = −N dΦ/dt`, 15, 22);
      const emfDisplay = Math.abs(emf * 1000).toFixed(1);
      ctx.fillStyle = '#cdc8be';
      ctx.fillText(`ε ≈ ${emfDisplay} mV`, 15, 36);
      ctx.fillStyle = '#6b6660';
      ctx.fillText('Faster motion → larger EMF', 15, H - 12);

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
          { label: 'Magnet speed', value: speed, min: 0, max: 4, step: 0.5, display: `${speed}×`, set: setSpeed },
          { label: 'Number of turns N', value: turns, min: 10, max: 200, step: 10, display: `${turns}`, set: setTurns },
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
        The galvanometer deflects only while the flux is changing. A stationary magnet produces no EMF.
      </div>
    </div>
  );
}
