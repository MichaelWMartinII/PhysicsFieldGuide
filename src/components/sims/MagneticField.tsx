'use client';

import { useRef, useEffect, useState } from 'react';

const W = 560, H = 360;

type Config = 'wire' | 'solenoid' | 'lorentz';

export default function MagneticField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | undefined>(undefined);
  const phaseRef = useRef(0);
  const [config, setConfig] = useState<Config>('wire');
  const [current, setCurrent] = useState(5);
  const [charge, setCharge] = useState(1);
  const paramsRef = useRef({ config: 'wire' as Config, current: 5, charge: 1 });

  useEffect(() => { paramsRef.current = { config, current, charge }; }, [config, current, charge]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    function drawArrow(x: number, y: number, angle: number, length: number, color: string, alpha = 1) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 1.2;
      ctx.translate(x, y); ctx.rotate(angle);
      ctx.beginPath(); ctx.moveTo(-length / 2, 0); ctx.lineTo(length / 2, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(length / 2, 0); ctx.lineTo(length / 2 - 6, -3); ctx.lineTo(length / 2 - 6, 3); ctx.closePath(); ctx.fill();
      ctx.restore();
    }

    function drawDotX(x: number, y: number, outward: boolean, color: string, alpha = 1) {
      ctx.save(); ctx.globalAlpha = alpha;
      ctx.strokeStyle = color; ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.lineWidth = 1.2; ctx.stroke();
      if (outward) {
        ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(x - 4, y - 4); ctx.lineTo(x + 4, y + 4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x + 4, y - 4); ctx.lineTo(x - 4, y + 4); ctx.stroke();
      }
      ctx.restore();
    }

    function drawWireConfig(I: number) {
      const cx = W / 2, cy = H / 2;
      // Wire cross-section at center
      drawDotX(cx, cy, I > 0, '#5b7fa8');
      ctx.fillStyle = '#5b7fa8'; ctx.font = '11px system-ui'; ctx.textAlign = 'center';
      ctx.fillText(`I = ${I} A ${I > 0 ? '(out)' : '(in)'}`, cx, cy + 25);

      // Concentric field circles
      const radii = [30, 60, 90, 120, 150];
      radii.forEach((r, ri) => {
        const alpha = 0.7 - ri * 0.1;
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = '#9a7d2c';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;

        // Arrows tangent to circle
        const nArrows = 4 + ri * 2;
        for (let j = 0; j < nArrows; j++) {
          const angle = (j / nArrows) * Math.PI * 2;
          const ax = cx + r * Math.cos(angle);
          const ay = cy + r * Math.sin(angle);
          const dir = I > 0 ? angle + Math.PI / 2 : angle - Math.PI / 2;
          drawArrow(ax, ay, dir, 14, '#9a7d2c', alpha);
        }
      });

      // B magnitude label
      const B0 = (4e-7 * Math.PI * I) / (2 * Math.PI * 0.05); // at 5cm
      ctx.fillStyle = '#9a7d2c'; ctx.font = '10px system-ui'; ctx.textAlign = 'left';
      ctx.fillText(`B (at 5 cm) = ${(B0 * 1e6).toFixed(1)} μT`, 20, 25);
      ctx.fillStyle = '#6b6660'; ctx.fillText('B = μ₀I / 2πr', 20, 40);
    }

    function drawSolenoidConfig(I: number) {
      // Solenoid field lines: uniform field inside
      const sx = 80, ex = 480, topY = 120, botY = 240, midY = (topY + botY) / 2;

      // Solenoid coils
      const nCoils = 14;
      ctx.strokeStyle = '#3d7d5c'; ctx.lineWidth = 1.5;
      for (let i = 0; i <= nCoils; i++) {
        const x = sx + (ex - sx) * i / nCoils;
        ctx.beginPath();
        ctx.ellipse(x, midY, 4, (botY - topY) / 2, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      // Top/bottom rails
      drawArrow(300, topY, 0, ex - sx, '#3d7d5c');
      ctx.strokeStyle = '#3d7d5c'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(sx, botY); ctx.lineTo(ex, botY); ctx.stroke();

      // Uniform field arrows inside
      const fieldColor = '#5b7fa8';
      const dir = I > 0 ? 0 : Math.PI;
      for (let row = 0; row < 3; row++) {
        const fy = topY + (row + 0.5) * (botY - topY) / 3;
        for (let col = 0; col < 5; col++) {
          const fx = sx + 30 + col * (ex - sx - 60) / 4;
          drawArrow(fx, fy, dir, 30, fieldColor, 0.85);
        }
      }

      // Field lines outside (fringe) - simplified
      for (let i = 0; i < 5; i++) {
        const t = i / 4;
        const fy = topY + t * (botY - topY);
        const fringe = 30 + i * 10;
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = fieldColor; ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.moveTo(ex, fy);
        ctx.bezierCurveTo(ex + fringe, fy, ex + fringe, H - 30, W / 2, H - 30);
        ctx.bezierCurveTo(sx - fringe, H - 30, sx - fringe, fy, sx, fy);
        ctx.stroke();
        ctx.setLineDash([]); ctx.globalAlpha = 1;
      }

      const n = 14 / ((ex - sx) / 1000); // turns/m
      const B = 4e-7 * Math.PI * n * I;
      ctx.fillStyle = '#3d7d5c'; ctx.font = '10px system-ui'; ctx.textAlign = 'left';
      ctx.fillText(`B = μ₀nI ≈ ${(B * 1000).toFixed(2)} mT`, 20, 25);
      ctx.fillStyle = '#6b6660'; ctx.fillText(`n ≈ ${n.toFixed(0)} turns/m`, 20, 40);
    }

    function drawLorentzConfig(q: number, I: number) {
      // Uniform B field into page, positive charge moving right
      const cx = W / 2, cy = H / 2;

      // B field dots (into page)
      ctx.fillStyle = '#3d4d6b';
      for (let ix = 50; ix < W; ix += 50) {
        for (let iy = 40; iy < H; iy += 50) {
          drawDotX(ix, iy, false, '#2a3a55', 0.5);
        }
      }
      ctx.fillStyle = '#5b7fa8'; ctx.font = '10px system-ui'; ctx.textAlign = 'right';
      ctx.fillText('B (into page)', W - 15, 20);

      // Circular path of charge
      const r = 80;
      ctx.strokeStyle = q > 0 ? '#e87d3e' : '#a85b5b';
      ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);

      // Animated charge particle
      const speed = Math.abs(I) * 0.02;
      phaseRef.current = (phaseRef.current + speed) % (Math.PI * 2);
      const ph = phaseRef.current * (q > 0 ? 1 : -1);
      const px = cx + r * Math.cos(ph);
      const py = cy + r * Math.sin(ph);

      // Velocity vector (tangent)
      const vangle = ph + Math.PI / 2 * (q > 0 ? 1 : -1);
      drawArrow(px, py, vangle, 40, '#e8e3d8');

      // Magnetic force vector (radially inward = centripetal)
      const fangle = Math.atan2(cy - py, cx - px);
      drawArrow(px, py, fangle, 30, '#9a7d2c');

      // Charge dot
      ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fillStyle = q > 0 ? '#e87d3e' : '#a85b5b'; ctx.fill();
      ctx.fillStyle = '#0f0f0f'; ctx.font = 'bold 9px system-ui'; ctx.textAlign = 'center';
      ctx.fillText(q > 0 ? '+' : '−', px, py + 3);

      // Labels
      ctx.fillStyle = '#e8e3d8'; ctx.font = '10px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('v', px + 22, py - 15);
      ctx.fillStyle = '#9a7d2c';
      ctx.fillText('F = qv×B', cx - 70, cy - r - 12);
      ctx.fillStyle = '#6b6660';
      ctx.fillText(`Cyclotron radius r = mv/|q|B`, 15, H - 15);
    }

    function draw() {
      const { config, current, charge } = paramsRef.current;
      ctx.fillStyle = '#0f0f0f'; ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;

      if (config === 'wire') drawWireConfig(current);
      else if (config === 'solenoid') drawSolenoidConfig(current);
      else drawLorentzConfig(charge, current);

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current !== undefined) cancelAnimationFrame(animRef.current); };
  }, []);

  const tabStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: 'system-ui, sans-serif', fontSize: '0.78rem', padding: '0.3rem 0.8rem',
    background: active ? 'var(--surface3)' : 'var(--surface)',
    border: '1px solid var(--border2)', borderRadius: 4,
    color: active ? 'var(--text)' : 'var(--muted)', cursor: 'pointer',
  });

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: 6, display: 'block' }} />
      <div className="mt-3" style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <button style={tabStyle(config === 'wire')} onClick={() => setConfig('wire')}>Infinite wire</button>
        <button style={tabStyle(config === 'solenoid')} onClick={() => setConfig('solenoid')}>Solenoid</button>
        <button style={tabStyle(config === 'lorentz')} onClick={() => setConfig('lorentz')}>Lorentz force</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {config !== 'lorentz' && (
          <div className="rounded border p-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)', fontFamily: 'system-ui, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>
              <span>Current I</span><span style={{ color: 'var(--text)' }}>{current} A</span>
            </div>
            <input type="range" min={1} max={20} step={1} value={current} onChange={e => setCurrent(+e.target.value)} />
          </div>
        )}
        {config === 'lorentz' && (
          <div className="rounded border p-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)', fontFamily: 'system-ui, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>
              <span>Charge sign</span><span style={{ color: 'var(--text)' }}>{charge > 0 ? '+q' : '−q'}</span>
            </div>
            <input type="range" min={-1} max={1} step={2} value={charge} onChange={e => setCharge(+e.target.value)} />
          </div>
        )}
      </div>
    </div>
  );
}
