'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

const W = 560, H = 380;
const K = 8000; // scaled Coulomb constant

interface Charge { x: number; y: number; q: number; }

const INITIAL_CHARGES: Charge[] = [
  { x: W * 0.35, y: H / 2, q: 1 },
  { x: W * 0.65, y: H / 2, q: -1 },
];

function fieldAt(charges: Charge[], x: number, y: number): [number, number] {
  let fx = 0, fy = 0;
  for (const c of charges) {
    const dx = x - c.x, dy = y - c.y;
    const r2 = dx * dx + dy * dy;
    if (r2 < 100) continue;
    const r = Math.sqrt(r2);
    const F = K * c.q / r2;
    fx += F * dx / r;
    fy += F * dy / r;
  }
  return [fx, fy];
}

function drawFieldLines(ctx: CanvasRenderingContext2D, charges: Charge[]) {
  const positives = charges.filter(c => c.q > 0);
  const numLines = 16;

  for (const src of positives) {
    for (let i = 0; i < numLines; i++) {
      const angle = (i / numLines) * 2 * Math.PI;
      let x = src.x + Math.cos(angle) * 12;
      let y = src.y + Math.sin(angle) * 12;

      ctx.beginPath();
      ctx.moveTo(x, y);

      for (let step = 0; step < 300; step++) {
        const [fx, fy] = fieldAt(charges, x, y);
        const mag = Math.sqrt(fx * fx + fy * fy);
        if (mag < 0.1) break;
        const ds = 3;
        x += (fx / mag) * ds;
        y += (fy / mag) * ds;
        if (x < 0 || x > W || y < 0 || y > H) break;

        // Stop near negative charge
        let near = false;
        for (const c of charges) {
          if (c.q < 0) {
            const d = Math.sqrt((x - c.x)**2 + (y - c.y)**2);
            if (d < 14) { near = true; break; }
          }
        }
        if (near) break;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = 'rgba(100, 140, 200, 0.55)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
}

export default function ElectricField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chargesRef = useRef<Charge[]>(INITIAL_CHARGES);
  const [charges, setCharges] = useState<Charge[]>(INITIAL_CHARGES);
  const [nextQ, setNextQ] = useState<1 | -1>(1);
  const draggingRef = useRef<number | null>(null);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#0f0f0f';
    ctx.fillRect(0, 0, W, H);

    // Background grid
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y <= H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    const cs = chargesRef.current;
    if (cs.length > 0) drawFieldLines(ctx, cs);

    for (const c of cs) {
      const grad = ctx.createRadialGradient(c.x - 3, c.y - 3, 1, c.x, c.y, 14);
      if (c.q > 0) {
        grad.addColorStop(0, '#9ab5d8'); grad.addColorStop(1, '#2a4a7a');
      } else {
        grad.addColorStop(0, '#d89a9a'); grad.addColorStop(1, '#7a2a2a');
      }
      ctx.beginPath();
      ctx.arc(c.x, c.y, 13, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = c.q > 0 ? '#5b7fa8' : '#a85b5b';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = 'bold 14px system-ui, sans-serif';
      ctx.fillStyle = '#e8e3d8';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(c.q > 0 ? '+' : '−', c.x, c.y);
    }
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';

    // Labels
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillStyle = '#4a5a6a';
    ctx.fillText('Click empty space to add charge · Drag charges to move', 8, H - 8);
  }, []);

  useEffect(() => {
    redraw();
  }, [charges, redraw]);

  useEffect(() => {
    const canvas = canvasRef.current!;

    function getCharge(x: number, y: number): number {
      const rect = canvas.getBoundingClientRect();
      const cx = (x - rect.left) * (W / rect.width);
      const cy = (y - rect.top) * (H / rect.height);
      return chargesRef.current.findIndex(c => Math.sqrt((c.x-cx)**2+(c.y-cy)**2) < 18);
    }

    function onMouseDown(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const cx = (e.clientX - rect.left) * (W / rect.width);
      const cy = (e.clientY - rect.top) * (H / rect.height);
      const idx = getCharge(e.clientX, e.clientY);
      if (idx >= 0) { draggingRef.current = idx; return; }
      if (chargesRef.current.length < 6) {
        chargesRef.current = [...chargesRef.current, { x: cx, y: cy, q: nextQ }];
        setCharges([...chargesRef.current]);
      }
    }

    function onMouseMove(e: MouseEvent) {
      if (draggingRef.current === null) return;
      const rect = canvas.getBoundingClientRect();
      const cx = (e.clientX - rect.left) * (W / rect.width);
      const cy = (e.clientY - rect.top) * (H / rect.height);
      chargesRef.current = chargesRef.current.map((c, i) => i === draggingRef.current ? { ...c, x: cx, y: cy } : c);
      setCharges([...chargesRef.current]);
    }

    function onMouseUp() { draggingRef.current = null; }

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);
    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);
    };
  }, [nextQ]);

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: 6, display: 'block', cursor: 'crosshair' }} />
      <div className="mt-3 flex items-center gap-3 flex-wrap" style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.82rem' }}>
        <span style={{ color: 'var(--muted)' }}>Next charge to place:</span>
        <button onClick={() => setNextQ(1)} style={{ padding: '0.25rem 0.75rem', borderRadius: 4, background: nextQ === 1 ? 'var(--surface2)' : 'transparent', border: `1px solid ${nextQ === 1 ? 'var(--def-accent)' : 'var(--border)'}`, color: nextQ === 1 ? 'var(--text)' : 'var(--muted)', cursor: 'pointer' }}>+ Positive</button>
        <button onClick={() => setNextQ(-1)} style={{ padding: '0.25rem 0.75rem', borderRadius: 4, background: nextQ === -1 ? 'var(--surface2)' : 'transparent', border: `1px solid ${nextQ === -1 ? '#a85b5b' : 'var(--border)'}`, color: nextQ === -1 ? 'var(--text)' : 'var(--muted)', cursor: 'pointer' }}>− Negative</button>
        <button onClick={() => { chargesRef.current = []; setCharges([]); }} style={{ padding: '0.25rem 0.75rem', borderRadius: 4, background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer', marginLeft: 'auto' }}>Clear all</button>
      </div>
    </div>
  );
}
