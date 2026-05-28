'use client';

import { useRef, useEffect, useState } from 'react';

const W = 680, H = 340;

interface State {
  mass: number;
  applied: number;
  mu: number;
  x: number;
  v: number;
  running: boolean;
  trail: number[];
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  dx: number, dy: number,
  color: string, label: string
) {
  if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + dx, y + dy);
  ctx.stroke();
  const angle = Math.atan2(dy, dx);
  ctx.beginPath();
  ctx.moveTo(x + dx, y + dy);
  ctx.lineTo(x + dx - 10 * Math.cos(angle - 0.4), y + dy - 10 * Math.sin(angle - 0.4));
  ctx.lineTo(x + dx - 10 * Math.cos(angle + 0.4), y + dy - 10 * Math.sin(angle + 0.4));
  ctx.closePath();
  ctx.fill();
  ctx.font = '12px system-ui';
  ctx.fillText(label, x + dx + 6, y + dy + 4);
}

function computeAccel(mass: number, applied: number, mu: number, v: number) {
  const g = 9.81;
  const normal = mass * g;
  let friction = 0;
  if (Math.abs(v) > 0.01) {
    friction = mu * normal * Math.sign(v) * -1;
  } else if (Math.abs(applied) > mu * normal) {
    friction = mu * normal * Math.sign(applied) * -1;
  } else {
    return 0;
  }
  return (applied + friction) / mass;
}

function drawScene(ctx: CanvasRenderingContext2D, s: State, a: number) {
  ctx.fillStyle = '#080c18';
  ctx.fillRect(0, 0, W, H);

  const g = 9.81;
  const groundY = H - 80;
  const blockW = 60 + s.mass * 8;
  const blockH = 40 + s.mass * 5;

  // Ground
  ctx.fillStyle = '#1e2d4a';
  ctx.fillRect(0, groundY, W, H - groundY);
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(W, groundY); ctx.stroke();
  // Hatch
  ctx.strokeStyle = '#1e2d4a88';
  ctx.lineWidth = 1;
  for (let hx = 0; hx < W; hx += 20) {
    ctx.beginPath(); ctx.moveTo(hx, groundY); ctx.lineTo(hx - 15, groundY + 20); ctx.stroke();
  }

  const blockX = Math.max(blockW / 2 + 10, Math.min(W - blockW / 2 - 10, W / 2 + s.x * 40));
  const blockY = groundY - blockH;

  // Trail
  ctx.fillStyle = '#3b82f620';
  for (let i = 0; i < s.trail.length; i++) {
    const tx = Math.max(blockW / 2 + 10, Math.min(W - blockW / 2 - 10, W / 2 + s.trail[i] * 40));
    ctx.fillRect(tx - blockW / 2, blockY, blockW, blockH);
  }

  // Block
  ctx.fillStyle = '#1e3a5f';
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(blockX - blockW / 2, blockY, blockW, blockH, 6);
  ctx.fill();
  ctx.stroke();

  // Mass label
  ctx.fillStyle = '#93c5fd';
  ctx.font = `bold 13px system-ui`;
  ctx.textAlign = 'center';
  ctx.fillText(`${s.mass} kg`, blockX, blockY + blockH / 2 + 5);
  ctx.textAlign = 'left';

  const cx = blockX, cy = blockY + blockH / 2;

  // Force arrows
  const scale = 3;
  // Applied force
  if (s.applied !== 0) {
    drawArrow(ctx, cx, cy, s.applied * scale, 0, '#f59e0b', `F=${s.applied}N`);
  }
  // Normal force
  drawArrow(ctx, cx, blockY, 0, -s.mass * g * scale * 0.3, '#10b981', `N=${(s.mass * g).toFixed(0)}N`);
  // Weight
  drawArrow(ctx, cx, cy, 0, s.mass * g * scale * 0.3, '#ef4444', `W=${(s.mass * g).toFixed(0)}N`);
  // Friction
  const normal = s.mass * g;
  const fric = s.mu * normal;
  if (Math.abs(s.v) > 0.01 || Math.abs(s.applied) > fric) {
    const frDir = Math.abs(s.v) > 0.01 ? Math.sign(s.v) : Math.sign(s.applied);
    drawArrow(ctx, cx, cy + 15, -frDir * fric * scale * 0.5, 0, '#a855f7', `f=${fric.toFixed(0)}N`);
  }

  // Net force / acceleration label
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '13px system-ui';
  ctx.fillText(`a = ${a.toFixed(2)} m/s²   v = ${s.v.toFixed(2)} m/s`, 20, 30);

  // Velocity bar
  const maxV = 20;
  const barW = 200;
  ctx.fillStyle = '#1e2d4a';
  ctx.fillRect(W - barW - 20, 20, barW, 12);
  const fillW = (Math.min(Math.abs(s.v), maxV) / maxV) * barW;
  ctx.fillStyle = s.v >= 0 ? '#3b82f6' : '#ef4444';
  ctx.fillRect(W - barW - 20 + (s.v < 0 ? barW / 2 - fillW : barW / 2), 20, fillW, 12);
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1;
  ctx.strokeRect(W - barW - 20, 20, barW, 12);
  ctx.fillStyle = '#64748b';
  ctx.font = '10px system-ui';
  ctx.fillText('←  velocity  →', W - barW - 20, 46);
}

export default function ForceDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const simRef = useRef<State>({ mass: 5, applied: 15, mu: 0.3, x: 0, v: 0, running: false, trail: [] });

  const [mass, setMass] = useState(5);
  const [applied, setApplied] = useState(15);
  const [mu, setMu] = useState(0.3);
  const [running, setRunning] = useState(false);

  const getAccel = (s: State) => computeAccel(s.mass, s.applied, s.mu, s.v);

  function drawLoop() {
    const s = simRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !s.running) return;
    const ctx = canvas.getContext('2d')!;
    const dt = 1 / 60;
    const a = computeAccel(s.mass, s.applied, s.mu, s.v);
    s.v += a * dt;
    s.x += s.v * dt;
    if (Math.abs(s.x) > 8) { s.v *= -0.5; s.x = Math.sign(s.x) * 8; }
    if (s.trail.length === 0 || Math.abs(s.x - s.trail[s.trail.length - 1]) > 0.05) {
      s.trail.push(s.x);
      if (s.trail.length > 20) s.trail.shift();
    }
    drawScene(ctx, s, a);
    rafRef.current = requestAnimationFrame(drawLoop);
  }

  useEffect(() => {
    simRef.current = { ...simRef.current, mass, applied, mu };
    const canvas = canvasRef.current;
    if (canvas && !simRef.current.running) {
      drawScene(canvas.getContext('2d')!, simRef.current, getAccel(simRef.current));
    }
  }, [mass, applied, mu]);

  function start() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    simRef.current = { mass, applied, mu, x: 0, v: 0, running: true, trail: [] };
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
    simRef.current = { mass, applied, mu, x: 0, v: 0, running: false, trail: [] };
    const canvas = canvasRef.current;
    if (canvas) drawScene(canvas.getContext('2d')!, simRef.current, 0);
  }

  const a = computeAccel(mass, applied, mu, 0.01);

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} className="w-full" />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="space-y-4 rounded-xl border p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <Slider label="Mass" value={mass} min={1} max={15} step={0.5} display={`${mass} kg`} color="#3b82f6" onChange={setMass} />
          <Slider label="Applied Force" value={applied} min={-40} max={40} step={1} display={`${applied} N`} color="#f59e0b" onChange={setApplied} />
          <Slider label="Friction coefficient μ" value={mu} min={0} max={0.9} step={0.05} display={mu.toFixed(2)} color="#a855f7" onChange={setMu} />
          <div className="flex gap-2 pt-1">
            {!running
              ? <button onClick={start} className="flex-1 py-2 rounded-lg text-sm font-semibold" style={{ background: '#1e3a5f', color: '#60a5fa', border: '1px solid #3b82f6' }}>Apply Forces</button>
              : <button onClick={pause} className="flex-1 py-2 rounded-lg text-sm font-semibold" style={{ background: '#1e3a5f', color: '#60a5fa', border: '1px solid #3b82f6' }}>Pause</button>
            }
            <button onClick={reset} className="px-4 py-2 rounded-lg text-sm" style={{ background: 'var(--surface2)', color: '#64748b', border: '1px solid var(--border)' }}>Reset</button>
          </div>
        </div>
        <div className="rounded-xl border p-4 space-y-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Force breakdown</div>
          <StatRow label="Applied (F)" value={`${applied} N`} color="#f59e0b" />
          <StatRow label="Weight (W = mg)" value={`${(mass * 9.81).toFixed(1)} N ↓`} color="#ef4444" />
          <StatRow label="Normal (N = mg)" value={`${(mass * 9.81).toFixed(1)} N ↑`} color="#10b981" />
          <StatRow label="Max static friction" value={`${(mu * mass * 9.81).toFixed(1)} N`} color="#a855f7" />
          <StatRow label="Net acceleration" value={`${a.toFixed(2)} m/s²`} color="#60a5fa" />
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step, display, color, onChange }: {
  label: string; value: number; min: number; max: number; step: number; display: string; color: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs text-slate-400 mb-1">
        <span>{label}</span><span className="font-medium" style={{ color }}>{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} />
    </div>
  );
}

function StatRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-xs text-slate-500 font-mono">{label}</span>
      <span className="text-xs font-mono font-medium" style={{ color }}>{value}</span>
    </div>
  );
}
