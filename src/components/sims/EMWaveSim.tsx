'use client';
import { useRef, useEffect, useState } from 'react';

const W = 700, H = 400;

interface Params {
  polarization: 'linear' | 'circular' | 'elliptical';
  showB: boolean;
  showPoynting: boolean;
  t: number;
}

function draw(ctx: CanvasRenderingContext2D, params: Params) {
  const { polarization, showB, showPoynting, t } = params;
  ctx.clearRect(0, 0, W, H);

  ctx.fillStyle = '#0f0f1a';
  ctx.fillRect(0, 0, W, H);

  const cx = H / 2;
  const nArrows = 12;
  const xStart = 60, xEnd = W - 40;
  const amp = 80;

  // Draw propagation axis (z-axis)
  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(xStart - 10, cx);
  ctx.lineTo(xEnd + 10, cx);
  ctx.stroke();
  ctx.setLineDash([]);

  // Arrow helper
  function arrow(x1: number, y1: number, x2: number, y2: number, color: string, width = 2) {
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 2) return;
    const ux = dx / len, uy = dy / len;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    // Arrowhead
    const hLen = 8, hWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - hLen * ux + hWidth * uy, y2 - hLen * uy - hWidth * ux);
    ctx.lineTo(x2 - hLen * ux - hWidth * uy, y2 - hLen * uy + hWidth * ux);
    ctx.closePath();
    ctx.fill();
  }

  const k = 2 * Math.PI / (xEnd - xStart);

  // E field (continuous wave curve)
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let xi = xStart; xi <= xEnd; xi++) {
    const phase = k * (xi - xStart) - t;
    let ey = 0;
    if (polarization === 'linear') ey = amp * Math.sin(phase);
    else if (polarization === 'circular') ey = amp * Math.sin(phase);
    else ey = amp * 0.7 * Math.sin(phase);
    const y = cx - ey;
    if (xi === xStart) ctx.moveTo(xi, y);
    else ctx.lineTo(xi, y);
  }
  ctx.stroke();

  // B field curve (perpendicular — shown as dots/dashes in 3D projection)
  if (showB) {
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let xi = xStart; xi <= xEnd; xi++) {
      const phase = k * (xi - xStart) - t;
      let bz = 0;
      if (polarization === 'linear') bz = amp * 0.6 * Math.sin(phase);
      else if (polarization === 'circular') bz = amp * 0.6 * Math.cos(phase);
      else bz = amp * 0.4 * Math.cos(phase);
      // Project B (x-direction) into 2D: use oblique projection
      const projY = bz * 0.45;
      const projX = bz * 0.25;
      const y = cx - projY;
      const x = xi + projX;
      if (xi === xStart) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Discrete arrows for E at sample points
  for (let i = 0; i <= nArrows; i++) {
    const xi = xStart + (i / nArrows) * (xEnd - xStart);
    const phase = k * (xi - xStart) - t;

    let ey = 0;
    if (polarization === 'linear') ey = amp * Math.sin(phase);
    else if (polarization === 'circular') ey = amp * Math.sin(phase);
    else ey = amp * 0.7 * Math.sin(phase);

    if (Math.abs(ey) > 4) {
      arrow(xi, cx, xi, cx - ey, 'rgba(96,165,250,0.7)', 1.5);
    }

    if (showB) {
      let bz = 0;
      if (polarization === 'linear') bz = amp * 0.6 * Math.sin(phase);
      else if (polarization === 'circular') bz = amp * 0.6 * Math.cos(phase);
      else bz = amp * 0.4 * Math.cos(phase);
      if (Math.abs(bz) > 4) {
        const projY = bz * 0.45;
        const projX = bz * 0.25;
        arrow(xi, cx, xi + projX, cx - projY, 'rgba(52,211,153,0.7)', 1.5);
      }
    }
  }

  // Poynting vector arrows along the axis
  if (showPoynting) {
    for (let i = 1; i <= 4; i++) {
      const xi = xStart + (i / 5) * (xEnd - xStart);
      arrow(xi - 20, cx + 30, xi + 20, cx + 30, '#f472b6', 2.5);
    }
    ctx.fillStyle = '#f472b6';
    ctx.font = '13px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('S = E×B/μ₀', W / 2, cx + 55);
  }

  // Labels
  ctx.font = 'bold 13px Georgia, serif';
  ctx.fillStyle = '#60a5fa';
  ctx.textAlign = 'left';
  ctx.fillText('E', xEnd + 5, cx - 15);

  if (showB) {
    ctx.fillStyle = '#34d399';
    ctx.fillText('B', xEnd + 18, cx - 10);
  }

  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '12px Georgia, serif';
  ctx.textAlign = 'left';
  ctx.fillText('→ z (propagation)', xEnd - 80, cx - 12);

  // Polarization state in top-right (end-on view, small inset)
  const inX = W - 65, inY = 55, inR = 35;
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(inX, inY, inR, 0, 2 * Math.PI); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('end-on', inX, inY + inR + 12);

  const tip = Math.sin(t);
  if (polarization === 'linear') {
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(inX, inY + tip * inR * 0.9);
    ctx.lineTo(inX, inY - tip * inR * 0.9);
    ctx.stroke();
  } else if (polarization === 'circular') {
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let th = 0; th <= 2 * Math.PI; th += 0.05) {
      const ex = inR * 0.8 * Math.cos(th);
      const ey2 = inR * 0.8 * Math.sin(th);
      if (th === 0) ctx.moveTo(inX + ex, inY + ey2);
      else ctx.lineTo(inX + ex, inY + ey2);
    }
    ctx.stroke();
    // Current tip
    ctx.fillStyle = '#60a5fa';
    ctx.beginPath();
    ctx.arc(inX + inR * 0.8 * Math.cos(t), inY + inR * 0.8 * Math.sin(t), 4, 0, 2 * Math.PI);
    ctx.fill();
  } else {
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let th = 0; th <= 2 * Math.PI; th += 0.05) {
      const ex = inR * 0.8 * Math.cos(th);
      const ey2 = inR * 0.5 * Math.sin(th);
      if (th === 0) ctx.moveTo(inX + ex, inY + ey2);
      else ctx.lineTo(inX + ex, inY + ey2);
    }
    ctx.stroke();
    ctx.fillStyle = '#60a5fa';
    ctx.beginPath();
    ctx.arc(inX + inR * 0.8 * Math.cos(t), inY + inR * 0.5 * Math.sin(t), 4, 0, 2 * Math.PI);
    ctx.fill();
  }
}

export default function EMWaveSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const tRef = useRef<number>(0);
  const paramsRef = useRef<Params>({ polarization: 'linear', showB: true, showPoynting: false, t: 0 });
  const [polarization, setPolarization] = useState<'linear' | 'circular' | 'elliptical'>('linear');
  const [showB, setShowB] = useState(true);
  const [showPoynting, setShowPoynting] = useState(false);

  useEffect(() => {
    paramsRef.current = { polarization, showB, showPoynting, t: tRef.current };
  }, [polarization, showB, showPoynting]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let running = true;

    function loop() {
      if (!running) return;
      tRef.current += 0.025;
      paramsRef.current.t = tRef.current;
      draw(ctx!, paramsRef.current);
      animRef.current = requestAnimationFrame(loop);
    }
    loop();
    return () => { running = false; cancelAnimationFrame(animRef.current); };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <canvas ref={canvasRef} width={W} height={H}
        style={{ width: '100%', maxWidth: W, borderRadius: 8, border: '1px solid var(--border)' }} />
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {(['linear', 'circular', 'elliptical'] as const).map(p => (
          <button key={p} onClick={() => setPolarization(p)}
            style={{
              padding: '0.4rem 1rem', borderRadius: 6, fontSize: '0.85rem', cursor: 'pointer',
              background: polarization === p ? '#3b82f6' : 'var(--surface2)',
              color: 'var(--text)', border: '1px solid var(--border)',
            }}>
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
        <button onClick={() => setShowB(b => !b)}
          style={{
            padding: '0.4rem 1rem', borderRadius: 6, fontSize: '0.85rem', cursor: 'pointer',
            background: showB ? '#065f46' : 'var(--surface2)',
            color: 'var(--text)', border: '1px solid var(--border)',
          }}>
          B field {showB ? 'on' : 'off'}
        </button>
        <button onClick={() => setShowPoynting(s => !s)}
          style={{
            padding: '0.4rem 1rem', borderRadius: 6, fontSize: '0.85rem', cursor: 'pointer',
            background: showPoynting ? '#701a75' : 'var(--surface2)',
            color: 'var(--text)', border: '1px solid var(--border)',
          }}>
          Poynting S {showPoynting ? 'on' : 'off'}
        </button>
      </div>
    </div>
  );
}
