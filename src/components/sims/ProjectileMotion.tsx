'use client';

import { useRef, useEffect, useState } from 'react';

const W = 680, H = 380;
const SCALE = 8; // px per meter
const GX = 50, GY = H - 50; // origin on canvas

const GRAVITIES = [
  { label: 'Moon', g: 1.62 },
  { label: 'Mars', g: 3.72 },
  { label: 'Earth', g: 9.81 },
  { label: 'Jupiter', g: 24.8 },
];

interface SimState {
  angle: number;
  v0: number;
  gIdx: number;
  t: number;
  running: boolean;
  trail: [number, number][];
}

function drawScene(ctx: CanvasRenderingContext2D, s: SimState) {
  const g = GRAVITIES[s.gIdx].g;
  ctx.fillStyle = '#080c18';
  ctx.fillRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = '#1e2d4a';
  ctx.lineWidth = 1;
  for (let x = GX; x < W; x += SCALE * 10) {
    ctx.beginPath(); ctx.moveTo(x, 30); ctx.lineTo(x, GY); ctx.stroke();
  }
  for (let y = GY; y > 30; y -= SCALE * 10) {
    ctx.beginPath(); ctx.moveTo(GX, y); ctx.lineTo(W - 10, y); ctx.stroke();
  }

  // Axis labels
  ctx.fillStyle = '#334155';
  ctx.font = '11px system-ui';
  ctx.fillText('0', GX - 12, GY + 14);
  for (let m = 10; m <= 80; m += 10) {
    const px = GX + m * SCALE;
    if (px < W - 10) { ctx.fillText(m + 'm', px - 6, GY + 14); }
  }
  for (let m = 10; m <= 40; m += 10) {
    const py = GY - m * SCALE;
    if (py > 30) { ctx.fillText(m + 'm', GX - 28, py + 4); }
  }

  // Ground line
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(GX, GY); ctx.lineTo(W - 10, GY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(GX, 30); ctx.lineTo(GX, GY); ctx.stroke();

  const rad = (s.angle * Math.PI) / 180;
  const vx = s.v0 * Math.cos(rad);
  const vy = s.v0 * Math.sin(rad);

  // Trail
  if (s.trail.length > 1) {
    ctx.strokeStyle = '#60a5fa55';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < s.trail.length; i++) {
      const [px, py] = s.trail[i];
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  // Predicted trajectory (dashed)
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  const tFlight = (2 * vy) / g;
  for (let dt = 0; dt <= tFlight; dt += tFlight / 80) {
    const px = GX + vx * dt * SCALE;
    const py = GY - (vy * dt - 0.5 * g * dt * dt) * SCALE;
    if (dt === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  // Current ball
  const cx = GX + vx * s.t * SCALE;
  const cy = GY - (vy * s.t - 0.5 * g * s.t * s.t) * SCALE;
  if (s.running || s.t === 0) {
    // Velocity vector
    const cvx = vx * SCALE * 0.4;
    const cvy = -(vy - g * s.t) * SCALE * 0.4;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + cvx, cy + cvy); ctx.stroke();
    // Arrow head
    const angle = Math.atan2(cvy, cvx);
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(cx + cvx, cy + cvy);
    ctx.lineTo(cx + cvx - 8 * Math.cos(angle - 0.4), cy + cvy - 8 * Math.sin(angle - 0.4));
    ctx.lineTo(cx + cvx - 8 * Math.cos(angle + 0.4), cy + cvy - 8 * Math.sin(angle + 0.4));
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Launch angle indicator
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(GX, GY);
  ctx.lineTo(GX + 40 * Math.cos(rad), GY - 40 * Math.sin(rad));
  ctx.stroke();
}

export default function ProjectileMotion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const simRef = useRef<SimState>({
    angle: 45, v0: 20, gIdx: 2, t: 0, running: false, trail: [],
  });

  const [angle, setAngle] = useState(45);
  const [v0, setV0] = useState(20);
  const [gIdx, setGIdx] = useState(2);
  const [stats, setStats] = useState({ x: 0, y: 0, vx: 0, vy: 0, t: 0 });
  const [launched, setLaunched] = useState(false);

  function drawLoop() {
    const s = simRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const g = GRAVITIES[s.gIdx].g;
    const rad = (s.angle * Math.PI) / 180;
    const vx0 = s.v0 * Math.cos(rad);
    const vy0 = s.v0 * Math.sin(rad);
    const y = vy0 * s.t - 0.5 * g * s.t * s.t;

    if (s.running && s.t > 0.05 && y < 0) {
      s.running = false;
      setLaunched(false);
      drawScene(ctx, s);
      return;
    }

    const cx = GX + vx0 * s.t * SCALE;
    const cy = GY - y * SCALE;
    s.trail.push([cx, cy]);

    const vxNow = vx0;
    const vyNow = vy0 - g * s.t;
    setStats({
      x: Math.round(vx0 * s.t * 10) / 10,
      y: Math.round(Math.max(0, y) * 10) / 10,
      vx: Math.round(vxNow * 10) / 10,
      vy: Math.round(vyNow * 10) / 10,
      t: Math.round(s.t * 100) / 100,
    });

    drawScene(ctx, s);
    s.t += 1 / 60;
    if (s.running) rafRef.current = requestAnimationFrame(drawLoop);
  }

  // Draw static preview when params change
  useEffect(() => {
    simRef.current = { ...simRef.current, angle, v0, gIdx };
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawScene(canvas.getContext('2d')!, simRef.current);
  }, [angle, v0, gIdx]);

  function launch() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    simRef.current = { angle, v0, gIdx, t: 0, running: true, trail: [] };
    setLaunched(true);
    drawLoop();
  }

  function reset() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    simRef.current = { angle, v0, gIdx, t: 0, running: false, trail: [] };
    setLaunched(false);
    setStats({ x: 0, y: 0, vx: 0, vy: 0, t: 0 });
    const canvas = canvasRef.current;
    if (canvas) drawScene(canvas.getContext('2d')!, simRef.current);
  }

  const g = GRAVITIES[gIdx].g;
  const rad = (angle * Math.PI) / 180;
  const vy0 = v0 * Math.sin(rad);
  const range = Math.round((v0 * v0 * Math.sin(2 * rad)) / g * 10) / 10;
  const maxH = Math.round((vy0 * vy0) / (2 * g) * 10) / 10;
  const tFlight = Math.round((2 * vy0) / g * 100) / 100;

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} className="w-full" />

      <div className="mt-4 grid grid-cols-2 gap-4">
        {/* Controls */}
        <div className="space-y-4 rounded-xl border p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Launch angle</span><span className="text-blue-400 font-medium">{angle}°</span>
            </div>
            <input type="range" min={1} max={89} value={angle}
              onChange={(e) => { setAngle(+e.target.value); }} />
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Initial speed</span><span className="text-blue-400 font-medium">{v0} m/s</span>
            </div>
            <input type="range" min={5} max={50} value={v0}
              onChange={(e) => { setV0(+e.target.value); }} />
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-2">Gravity</div>
            <div className="flex gap-2 flex-wrap">
              {GRAVITIES.map((gr, i) => (
                <button
                  key={gr.label}
                  onClick={() => setGIdx(i)}
                  className="text-xs px-3 py-1 rounded-lg border transition-colors"
                  style={{
                    background: i === gIdx ? '#1e3a5f' : 'transparent',
                    borderColor: i === gIdx ? '#3b82f6' : 'var(--border)',
                    color: i === gIdx ? '#60a5fa' : '#64748b',
                  }}
                >
                  {gr.label} ({gr.g})
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={launch}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-colors"
              style={{ background: '#1e3a5f', color: '#60a5fa', border: '1px solid #3b82f6' }}
            >
              Launch
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 rounded-lg text-sm transition-colors"
              style={{ background: 'var(--surface2)', color: '#64748b', border: '1px solid var(--border)' }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-xl border p-4 space-y-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Predicted</div>
          <StatRow label="Range" value={`${range} m`} />
          <StatRow label="Max height" value={`${maxH} m`} />
          <StatRow label="Time of flight" value={`${tFlight} s`} />
          {launched && (
            <>
              <div className="border-t pt-3 mt-1" style={{ borderColor: 'var(--border)' }}>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Live</div>
                <StatRow label="x" value={`${stats.x} m`} />
                <StatRow label="y" value={`${stats.y} m`} />
                <StatRow label="vₓ" value={`${stats.vx} m/s`} />
                <StatRow label="vᵧ" value={`${stats.vy} m/s`} />
                <StatRow label="t" value={`${stats.t} s`} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs text-slate-500 font-mono">{label}</span>
      <span className="text-xs text-blue-300 font-mono font-medium">{value}</span>
    </div>
  );
}
