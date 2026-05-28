'use client';

import { useRef, useEffect, useState } from 'react';

const W = 560, H = 340;
const CX = W / 2, CY = H / 2;

type Shape = 'disk' | 'ring' | 'rod' | 'sphere';

const MOMENTS: Record<Shape, { label: string; formula: string; factor: (R: number, M: number) => number }> = {
  disk:   { label: 'Solid Disk',    formula: 'I = ½MR²',   factor: (R, M) => 0.5 * M * R * R },
  ring:   { label: 'Ring / Hoop',   formula: 'I = MR²',    factor: (R, M) => M * R * R },
  rod:    { label: 'Rod (center)',   formula: 'I = ¹⁄₁₂ML²', factor: (R, M) => (1/12) * M * (2*R) * (2*R) },
  sphere: { label: 'Solid Sphere',  formula: 'I = ²⁄₅MR²', factor: (R, M) => 0.4 * M * R * R },
};

export default function RotatingBody() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | undefined>(undefined);
  const stateRef = useRef({ omega: 2, torque: 0, theta: 0, shape: 'disk' as Shape, mass: 2, radius: 80 });

  const [omega, setOmega] = useState(2);
  const [torque, setTorque] = useState(0);
  const [shape, setShape] = useState<Shape>('disk');
  useEffect(() => {
    const s = stateRef.current;
    s.omega = omega; s.torque = torque; s.shape = shape;
  }, [omega, torque, shape]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let last = performance.now();

    function draw(dt: number) {
      const s = stateRef.current;
      const I = MOMENTS[s.shape].factor(s.radius / 80, s.mass);
      const alpha = s.torque / I;
      s.omega = Math.max(-12, Math.min(12, s.omega + alpha * dt));
      s.theta += s.omega * dt;
      const ke = 0.5 * I * s.omega * s.omega * 6400; // scale for display

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0f0f0f';
      ctx.fillRect(0, 0, W, H);

      const R = s.radius;
      ctx.save();
      ctx.translate(CX, CY);

      if (s.shape === 'rod') {
        // Draw rotating rod
        const len = R;
        ctx.save();
        ctx.rotate(s.theta);
        ctx.strokeStyle = '#8a9bbc';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-len, 0);
        ctx.lineTo(len, 0);
        ctx.stroke();
        // Tick marks
        ctx.strokeStyle = '#4a5a7a';
        ctx.lineWidth = 2;
        for (let i = -4; i <= 4; i++) {
          if (i === 0) continue;
          ctx.beginPath();
          ctx.moveTo(i * (len/4), -6);
          ctx.lineTo(i * (len/4), 6);
          ctx.stroke();
        }
        ctx.restore();
        // Pivot point
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#c9c4b8';
        ctx.fill();
      } else if (s.shape === 'ring') {
        // Outer ring
        ctx.beginPath();
        ctx.arc(0, 0, R, 0, Math.PI * 2);
        ctx.strokeStyle = '#5b7fa8';
        ctx.lineWidth = 14;
        ctx.stroke();
        // Spokes rotating
        for (let i = 0; i < 6; i++) {
          const a = s.theta + i * Math.PI / 3;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(a) * (R - 7), Math.sin(a) * (R - 7));
          ctx.strokeStyle = '#2a3a5a';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        // Hub
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#5b7fa8';
        ctx.fill();
      } else {
        // Solid disk / sphere
        const grad = ctx.createRadialGradient(-R*0.3, -R*0.3, R*0.05, 0, 0, R);
        grad.addColorStop(0, '#7a9bbf');
        grad.addColorStop(1, '#1a2d4a');
        ctx.beginPath();
        ctx.arc(0, 0, R, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = '#3a5a80';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Rotation lines on disk
        ctx.save();
        ctx.rotate(s.theta);
        ctx.strokeStyle = 'rgba(100, 140, 200, 0.35)';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 8; i++) {
          const a = i * Math.PI / 4;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(a) * R, Math.sin(a) * R);
          ctx.stroke();
        }
        ctx.restore();

        // Hub
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#c9c4b8';
        ctx.fill();
      }

      // Angular velocity arrow (tangent at top of object)
      if (Math.abs(s.omega) > 0.05) {
        const arrowR = R + 22;
        const arcSpan = Math.min(Math.PI * 0.6, Math.abs(s.omega) * 0.25);
        const dir = Math.sign(s.omega);
        ctx.beginPath();
        ctx.arc(0, 0, arrowR, -Math.PI / 2 - arcSpan * dir, -Math.PI / 2, dir < 0);
        ctx.strokeStyle = '#9a7d2c';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Arrowhead
        const aEnd = dir > 0 ? -Math.PI / 2 : -Math.PI / 2 - arcSpan;
        const tx = Math.cos(aEnd) * arrowR;
        const ty = Math.sin(aEnd) * arrowR;
        const tang = dir > 0 ? aEnd + Math.PI / 2 : aEnd - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(tx + Math.cos(tang) * 8, ty + Math.sin(tang) * 8);
        ctx.lineTo(tx + Math.cos(tang + 2.4) * 5, ty + Math.sin(tang + 2.4) * 5);
        ctx.lineTo(tx + Math.cos(tang - 2.4) * 5, ty + Math.sin(tang - 2.4) * 5);
        ctx.closePath();
        ctx.fillStyle = '#9a7d2c';
        ctx.fill();

        // ω label
        ctx.font = 'italic 13px Georgia, serif';
        ctx.fillStyle = '#9a7d2c';
        ctx.fillText('ω', (arrowR + 14) * Math.cos(-Math.PI/2 - arcSpan*dir*0.5), (arrowR + 14) * Math.sin(-Math.PI/2 - arcSpan*dir*0.5) + 4);
      }

      ctx.restore();

      // HUD
      ctx.font = '12px system-ui, sans-serif';
      ctx.fillStyle = '#6b6660';
      ctx.fillText(`ω = ${s.omega.toFixed(2)} rad/s`, 14, 22);
      ctx.fillText(`KE = ${ke.toFixed(1)} J`, 14, 40);
      ctx.fillText(`θ = ${((s.theta % (2*Math.PI)) * 180 / Math.PI).toFixed(0)}°`, 14, 58);
      if (s.torque !== 0) {
        ctx.fillStyle = '#9a7d2c';
        ctx.fillText(`τ = ${s.torque.toFixed(1)} N·m`, 14, 76);
      }
    }

    function loop(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      draw(dt);
      animRef.current = requestAnimationFrame(loop);
    }
    animRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animRef.current!);
  }, []);

  const shapes: Shape[] = ['disk', 'ring', 'rod', 'sphere'];

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: 6, display: 'block' }} />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded border p-4 space-y-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)', fontFamily: 'system-ui, sans-serif' }}>
          {[
            { label: 'Angular velocity ω', value: omega, min: -10, max: 10, step: 0.5, display: `${omega} rad/s`, set: setOmega },
            { label: 'Applied torque τ', value: torque, min: -5, max: 5, step: 0.5, display: `${torque} N·m`, set: setTorque },
          ].map(({ label, value, min, max, step, display, set }) => (
            <div key={label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>
                <span>{label}</span><span style={{ color: 'var(--text)' }}>{display}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(+e.target.value)} />
            </div>
          ))}
        </div>
        <div className="rounded border p-4 space-y-1.5" style={{ background: 'var(--surface)', borderColor: 'var(--border)', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.5rem' }}>Body shape</div>
          {shapes.map((s) => (
            <button key={s} onClick={() => setShape(s)} style={{ width: '100%', textAlign: 'left', padding: '0.35rem 0.65rem', borderRadius: '4px', background: shape === s ? 'var(--surface2)' : 'transparent', border: `1px solid ${shape === s ? 'var(--border2)' : 'var(--border)'}`, color: shape === s ? 'var(--text-heading)' : 'var(--muted)', cursor: 'pointer', fontSize: '0.82rem' }}>
              {MOMENTS[s].label}
              <span style={{ display: 'block', fontSize: '0.7rem', fontStyle: 'italic', color: shape === s ? 'var(--text)' : 'var(--muted)', opacity: 0.7 }}>{MOMENTS[s].formula}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '0.4rem', fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
        Gold arrow = angular velocity direction · Torque accelerates or decelerates rotation
      </div>
    </div>
  );
}
