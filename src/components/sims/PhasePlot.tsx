'use client';
import { useRef, useEffect, useState } from 'react';

const W = 700, H = 500;
const PAD = 60;

interface Params {
  system: 'pendulum' | 'harmonic' | 'duffing';
  energy: number;
  showFlow: boolean;
}

function hamiltonianRHS(system: string, q: number, p: number) {
  if (system === 'harmonic') {
    // H = p²/2 + q²/2 → dq/dt = p, dp/dt = -q
    return { dq: p, dp: -q };
  } else if (system === 'pendulum') {
    // H = p²/2 - cos(q) → dq/dt = p, dp/dt = -sin(q)
    return { dq: p, dp: -Math.sin(q) };
  } else {
    // Duffing: H = p²/2 - q²/2 + q⁴/4
    return { dq: p, dp: q - q * q * q };
  }
}

function drawPhasePortrait(ctx: CanvasRenderingContext2D, params: Params) {
  const { system, energy, showFlow } = params;
  ctx.clearRect(0, 0, W, H);

  // Background
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--surface') || '#1a1a2e';
  ctx.fillRect(0, 0, W, H);

  const qRange = system === 'pendulum' ? 4 : 3;
  const pRange = system === 'duffing' ? 2.5 : 2.5;

  function toCanvas(q: number, p: number): [number, number] {
    const x = PAD + ((q + qRange) / (2 * qRange)) * (W - 2 * PAD);
    const y = PAD + ((pRange - p) / (2 * pRange)) * (H - 2 * PAD);
    return [x, y];
  }

  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 8; i++) {
    const x = PAD + (i / 8) * (W - 2 * PAD);
    ctx.beginPath(); ctx.moveTo(x, PAD); ctx.lineTo(x, H - PAD); ctx.stroke();
    const y = PAD + (i / 8) * (H - 2 * PAD);
    ctx.beginPath(); ctx.moveTo(PAD, y); ctx.lineTo(W - PAD, y); ctx.stroke();
  }

  // Axes
  const [ax, ay] = toCanvas(0, 0);
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(PAD, ay); ctx.lineTo(W - PAD, ay); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ax, PAD); ctx.lineTo(ax, H - PAD); ctx.stroke();

  // Axis labels
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = '13px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('q (position)', W / 2, H - 12);
  ctx.save(); ctx.translate(16, H / 2); ctx.rotate(-Math.PI / 2);
  ctx.fillText('p (momentum)', 0, 0); ctx.restore();

  // Draw vector field (flow arrows)
  if (showFlow) {
    const step = 40;
    ctx.strokeStyle = 'rgba(100,200,255,0.25)';
    ctx.lineWidth = 1;
    for (let xi = PAD + step / 2; xi < W - PAD; xi += step) {
      for (let yi = PAD + step / 2; yi < H - PAD; yi += step) {
        const q = ((xi - PAD) / (W - 2 * PAD)) * 2 * qRange - qRange;
        const p = pRange - ((yi - PAD) / (H - 2 * PAD)) * 2 * pRange;
        const { dq, dp } = hamiltonianRHS(system, q, p);
        const mag = Math.sqrt(dq * dq + dp * dp);
        if (mag < 0.01) continue;
        const scale = 14 / mag;
        const dx = (dq / (2 * qRange)) * (W - 2 * PAD) * scale / (W - 2 * PAD);
        const dy = -(dp / (2 * pRange)) * (H - 2 * PAD) * scale / (H - 2 * PAD);
        ctx.beginPath();
        ctx.moveTo(xi - dx * 8, yi - dy * 8);
        ctx.lineTo(xi + dx * 8, yi + dy * 8);
        ctx.stroke();
      }
    }
  }

  // Draw energy contours
  const colors = ['#60a5fa', '#34d399', '#f472b6', '#fb923c', '#a78bfa', '#facc15'];
  const energyLevels = system === 'pendulum'
    ? [-0.9, -0.5, 0, 0.5, 1.0, 2.0]
    : system === 'duffing'
      ? [-0.24, -0.1, 0, 0.1, 0.3, 0.6]
      : [0.3, 0.6, 1.0, 1.5, 2.0, 2.8];

  function hamiltonian(q: number, p: number): number {
    if (system === 'harmonic') return 0.5 * p * p + 0.5 * q * q;
    if (system === 'pendulum') return 0.5 * p * p - Math.cos(q);
    return 0.5 * p * p - 0.5 * q * q + 0.25 * q * q * q * q;
  }

  // Draw selected energy level (thicker)
  const selectedE = energy;

  for (let ci = 0; ci < energyLevels.length; ci++) {
    const E = energyLevels[ci];
    const isSelected = Math.abs(E - selectedE) < 0.05;
    ctx.strokeStyle = isSelected ? colors[ci % colors.length] : colors[ci % colors.length].replace(')', ', 0.4)').replace('rgb', 'rgba');
    ctx.lineWidth = isSelected ? 2.5 : 1;

    // Trace the contour by marching
    const nx = 300, ny = 200;
    const vals: number[][] = [];
    for (let iy = 0; iy <= ny; iy++) {
      vals[iy] = [];
      for (let ix = 0; ix <= nx; ix++) {
        const q = ((ix / nx) * (W - 2 * PAD) + PAD - PAD) / (W - 2 * PAD) * 2 * qRange - qRange;
        const p = pRange - (iy / ny) * 2 * pRange;
        vals[iy][ix] = hamiltonian(q, p) - E;
      }
    }

    // Marching squares (simplified: just scan for sign changes)
    ctx.beginPath();
    let started = false;
    for (let iy = 0; iy < ny; iy++) {
      for (let ix = 0; ix < nx; ix++) {
        const v00 = vals[iy][ix], v10 = vals[iy][ix + 1];
        const v01 = vals[iy + 1][ix];
        const xc = PAD + (ix / nx) * (W - 2 * PAD);
        const yc = PAD + (iy / ny) * (H - 2 * PAD);
        const dx = (W - 2 * PAD) / nx;
        const dy = (H - 2 * PAD) / ny;

        const drawSeg = (x1: number, y1: number, x2: number, y2: number) => {
          if (!started) { ctx.moveTo(x1, y1); started = true; }
          ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
        };

        // Check each edge for sign change
        if (v00 * v10 < 0) {
          const t = v00 / (v00 - v10);
          drawSeg(xc + t * dx, yc, xc + t * dx, yc + dy * 0.5);
        }
        if (v00 * v01 < 0) {
          const t = v00 / (v00 - v01);
          drawSeg(xc, yc + t * dy, xc + dx * 0.5, yc + t * dy);
        }
      }
    }
    ctx.stroke();
  }

  // Highlight the selected energy level label
  ctx.font = 'bold 12px Georgia, serif';
  energyLevels.forEach((E, ci) => {
    const color = colors[ci % colors.length];
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    const labelX = W - PAD + 5;
    const labelY = PAD + 14 + ci * 18;
    if (labelX < W - 5) {
      ctx.fillText(`E=${E.toFixed(2)}`, labelX > W - 60 ? W - 55 : labelX, labelY);
    }
  });

  // System label
  const systemNames: Record<string, string> = {
    harmonic: 'Harmonic Oscillator: H = p²/2 + q²/2',
    pendulum: 'Pendulum: H = p²/2 − cos q',
    duffing: 'Double Well: H = p²/2 − q²/2 + q⁴/4',
  };
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = '12px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText(systemNames[system], W / 2, H - PAD + 30);
}

export default function PhasePlot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [system, setSystem] = useState<'pendulum' | 'harmonic' | 'duffing'>('harmonic');
  const [showFlow, setShowFlow] = useState(true);
  const energy = 1.0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawPhasePortrait(ctx, { system, energy, showFlow });
  }, [system, energy, showFlow]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <canvas ref={canvasRef} width={W} height={H}
        style={{ width: '100%', maxWidth: W, borderRadius: 8, border: '1px solid var(--border)' }} />
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {(['harmonic', 'pendulum', 'duffing'] as const).map(s => (
          <button key={s} onClick={() => setSystem(s)}
            style={{
              padding: '0.4rem 1rem', borderRadius: 6, fontSize: '0.85rem', cursor: 'pointer',
              background: system === s ? 'var(--thm-accent, #3b82f6)' : 'var(--surface2)',
              color: 'var(--text)', border: '1px solid var(--border)',
            }}>
            {s === 'harmonic' ? 'Harmonic' : s === 'pendulum' ? 'Pendulum' : 'Double Well'}
          </button>
        ))}
        <button onClick={() => setShowFlow(f => !f)}
          style={{
            padding: '0.4rem 1rem', borderRadius: 6, fontSize: '0.85rem', cursor: 'pointer',
            background: showFlow ? 'var(--surface3)' : 'var(--surface2)',
            color: 'var(--text)', border: '1px solid var(--border)',
          }}>
          Flow {showFlow ? 'on' : 'off'}
        </button>
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--muted)', textAlign: 'center', maxWidth: 500 }}>
        Phase portrait: each curve is a constant-energy trajectory. The harmonic oscillator gives closed ellipses; the pendulum shows separatrices (bold curves) dividing libration from rotation; the double-well has two stable fixed points.
      </p>
    </div>
  );
}
