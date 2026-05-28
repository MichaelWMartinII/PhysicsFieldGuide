'use client';

import { useRef, useEffect, useState } from 'react';

const W = 680, H = 300;
const GROUND_Y = H - 60;
const SCALE = 30; // px per kg
const CENTER_X = W / 2;

interface Block {
  mass: number;
  v: number;
  x: number;
  color: string;
}

interface State {
  b1: Block;
  b2: Block;
  e: number;
  running: boolean;
  collided: boolean;
  trail1: number[];
  trail2: number[];
}

function blockW(mass: number) { return 30 + mass * 6; }
function blockH(mass: number) { return 24 + mass * 4; }

function drawScene(ctx: CanvasRenderingContext2D, s: State, before?: { p: number; ke: number }) {
  ctx.fillStyle = '#080c18';
  ctx.fillRect(0, 0, W, H);

  // Ground
  ctx.fillStyle = '#1e2d4a';
  ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, GROUND_Y); ctx.lineTo(W, GROUND_Y); ctx.stroke();
  for (let x = 0; x < W; x += 20) {
    ctx.beginPath(); ctx.moveTo(x, GROUND_Y); ctx.lineTo(x - 15, GROUND_Y + 18); ctx.strokeStyle = '#1e2d4a88'; ctx.lineWidth = 1; ctx.stroke();
  }

  const draw1Block = (b: Block, alpha = 1) => {
    const bx = CENTER_X + b.x * SCALE;
    const bw = blockW(b.mass);
    const bh = blockH(b.mass);
    const by = GROUND_Y - bh;

    ctx.globalAlpha = alpha;
    ctx.fillStyle = b.color + '33';
    ctx.strokeStyle = b.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(bx - bw / 2, by, bw, bh, 5);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = b.color;
    ctx.font = `bold ${Math.max(10, 11 + b.mass / 2)}px system-ui`;
    ctx.textAlign = 'center';
    ctx.fillText(`${b.mass}kg`, bx, by + bh / 2 + 5);

    // Velocity arrow
    if (Math.abs(b.v) > 0.05) {
      const arrowLen = b.v * SCALE * 0.8;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bx, by - 12);
      ctx.lineTo(bx + arrowLen, by - 12);
      ctx.stroke();
      const dir = Math.sign(arrowLen);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(bx + arrowLen, by - 12);
      ctx.lineTo(bx + arrowLen - dir * 8, by - 18);
      ctx.lineTo(bx + arrowLen - dir * 8, by - 6);
      ctx.closePath();
      ctx.fill();
      ctx.font = '10px system-ui';
      ctx.fillText(`${b.v.toFixed(1)}m/s`, bx + arrowLen / 2, by - 20);
    }
    ctx.globalAlpha = 1;
    ctx.textAlign = 'left';
    return bx;
  };

  draw1Block(s.b1);
  draw1Block(s.b2);

  // Momentum / KE
  const p = s.b1.mass * s.b1.v + s.b2.mass * s.b2.v;
  const ke = 0.5 * s.b1.mass * s.b1.v ** 2 + 0.5 * s.b2.mass * s.b2.v ** 2;

  ctx.fillStyle = '#475569';
  ctx.font = '11px system-ui';
  ctx.fillText(`p = ${p.toFixed(2)} kg·m/s   KE = ${ke.toFixed(2)} J`, 16, 22);

  if (before && s.collided) {
    ctx.fillStyle = '#64748b';
    ctx.font = '11px system-ui';
    ctx.fillText(`→ ΔKE = ${(ke - before.ke).toFixed(2)} J  (Δp = ${(p - before.p).toFixed(3)})`, 16, 38);
  }

  if (s.collided) {
    ctx.fillStyle = '#10b98166';
    ctx.font = '12px system-ui';
    ctx.fillText('✓ collided', W - 80, 22);
  }
}

function resolveCollision(b1: Block, b2: Block, e: number) {
  const v1 = ((b1.mass - e * b2.mass) * b1.v + (1 + e) * b2.mass * b2.v) / (b1.mass + b2.mass);
  const v2 = ((b2.mass - e * b1.mass) * b2.v + (1 + e) * b1.mass * b1.v) / (b1.mass + b2.mass);
  return [v1, v2];
}

export default function Collision1D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const simRef = useRef<State>({
    b1: { mass: 3, v: 4, x: -5, color: '#3b82f6' },
    b2: { mass: 2, v: -1, x: 4, color: '#f97316' },
    e: 1,
    running: false, collided: false, trail1: [], trail2: [],
  });
  const beforeRef = useRef<{ p: number; ke: number } | undefined>(undefined);

  const [m1, setM1] = useState(3);
  const [v1, setV1] = useState(4);
  const [m2, setM2] = useState(2);
  const [v2, setV2] = useState(-1);
  const [e, setE] = useState(1);
  const [running, setRunning] = useState(false);

  function drawLoop() {
    const s = simRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !s.running) return;
    const ctx = canvas.getContext('2d')!;
    const dt = 1 / 60;

    s.b1.x += s.b1.v * dt;
    s.b2.x += s.b2.v * dt;

    // Collision detection
    if (!s.collided) {
      const gap = Math.abs(s.b2.x - s.b1.x) * SCALE - (blockW(s.b1.mass) + blockW(s.b2.mass)) / 2;
      if (gap <= 0 && ((s.b2.x > s.b1.x && s.b1.v > s.b2.v) || (s.b1.x > s.b2.x && s.b2.v > s.b1.v))) {
        beforeRef.current = {
          p: s.b1.mass * s.b1.v + s.b2.mass * s.b2.v,
          ke: 0.5 * s.b1.mass * s.b1.v ** 2 + 0.5 * s.b2.mass * s.b2.v ** 2,
        };
        const [nv1, nv2] = resolveCollision(s.b1, s.b2, s.e);
        s.b1.v = nv1;
        s.b2.v = nv2;
        s.collided = true;
      }
    }

    // Wall bounces
    if (Math.abs(s.b1.x) > 9) { s.b1.v *= -s.e; s.b1.x = Math.sign(s.b1.x) * 9; }
    if (Math.abs(s.b2.x) > 9) { s.b2.v *= -s.e; s.b2.x = Math.sign(s.b2.x) * 9; }

    drawScene(ctx, s, beforeRef.current);
    rafRef.current = requestAnimationFrame(drawLoop);
  }

  useEffect(() => {
    const s = simRef.current;
    s.b1 = { ...s.b1, mass: m1 };
    s.b2 = { ...s.b2, mass: m2 };
    s.e = e;
    if (!s.running) {
      const canvas = canvasRef.current;
      if (canvas) drawScene(canvas.getContext('2d')!, s);
    }
  }, [m1, m2, e]);

  function start() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    beforeRef.current = undefined;
    simRef.current = {
      b1: { mass: m1, v: v1, x: -5, color: '#3b82f6' },
      b2: { mass: m2, v: v2, x: 4, color: '#f97316' },
      e, running: true, collided: false, trail1: [], trail2: [],
    };
    setRunning(true);
    drawLoop();
  }

  function pause() {
    simRef.current.running = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setRunning(false);
  }

  function reset() {
    pause();
    beforeRef.current = undefined;
    simRef.current = {
      b1: { mass: m1, v: v1, x: -5, color: '#3b82f6' },
      b2: { mass: m2, v: v2, x: 4, color: '#f97316' },
      e, running: false, collided: false, trail1: [], trail2: [],
    };
    const canvas = canvasRef.current;
    if (canvas) drawScene(canvas.getContext('2d')!, simRef.current);
  }

  const p0 = m1 * v1 + m2 * v2;
  const ke0 = 0.5 * m1 * v1 ** 2 + 0.5 * m2 * v2 ** 2;
  const [pv1, pv2] = resolveCollision({ mass: m1, v: v1, x: 0, color: '' }, { mass: m2, v: v2, x: 1, color: '' }, e);
  const ke1 = 0.5 * m1 * pv1 ** 2 + 0.5 * m2 * pv2 ** 2;

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} className="w-full" />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="space-y-3 rounded-xl border p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Block 1 (blue)</div>
          <Slider label="Mass" value={m1} min={0.5} max={10} step={0.5} display={`${m1} kg`} onChange={setM1} />
          <Slider label="Initial velocity" value={v1} min={-8} max={8} step={0.5} display={`${v1} m/s`} onChange={setV1} />
          <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider pt-2">Block 2 (orange)</div>
          <Slider label="Mass" value={m2} min={0.5} max={10} step={0.5} display={`${m2} kg`} onChange={setM2} />
          <Slider label="Initial velocity" value={v2} min={-8} max={8} step={0.5} display={`${v2} m/s`} onChange={setV2} />
          <div className="border-t pt-3" style={{ borderColor: 'var(--border)' }}>
            <Slider label="Coefficient of restitution (e)" value={e} min={0} max={1} step={0.05}
              display={e === 0 ? 'Perfectly inelastic' : e === 1 ? 'Elastic' : e.toFixed(2)} onChange={setE} />
          </div>
          <div className="flex gap-2 pt-1">
            {!running
              ? <button onClick={start} className="flex-1 py-2 rounded-lg text-sm font-semibold" style={{ background: '#1e3a5f', color: '#60a5fa', border: '1px solid #3b82f6' }}>Run</button>
              : <button onClick={pause} className="flex-1 py-2 rounded-lg text-sm font-semibold" style={{ background: '#1e3a5f', color: '#60a5fa', border: '1px solid #3b82f6' }}>Pause</button>
            }
            <button onClick={reset} className="px-4 py-2 rounded-lg text-sm" style={{ background: 'var(--surface2)', color: '#64748b', border: '1px solid var(--border)' }}>Reset</button>
          </div>
        </div>

        <div className="rounded-xl border p-4 space-y-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Predicted outcome</div>
          <StatRow label="Before: p" value={`${p0.toFixed(2)} kg·m/s`} />
          <StatRow label="Before: KE" value={`${ke0.toFixed(2)} J`} />
          <div className="border-t my-1" style={{ borderColor: 'var(--border)' }} />
          <StatRow label="v₁ after" value={`${pv1.toFixed(2)} m/s`} />
          <StatRow label="v₂ after" value={`${pv2.toFixed(2)} m/s`} />
          <StatRow label="After: p" value={`${(m1 * pv1 + m2 * pv2).toFixed(2)} kg·m/s ✓`} />
          <StatRow label="After: KE" value={`${ke1.toFixed(2)} J`} />
          <StatRow label="KE lost" value={`${(ke0 - ke1).toFixed(2)} J (${((ke0 - ke1) / ke0 * 100).toFixed(0)}%)`} />
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step, display, onChange }: {
  label: string; value: number; min: number; max: number; step: number; display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs text-slate-400 mb-1">
        <span>{label}</span><span className="text-slate-200 font-medium">{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} />
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-xs text-slate-500 font-mono">{label}</span>
      <span className="text-xs text-green-300 font-mono font-medium">{value}</span>
    </div>
  );
}
