'use client';

import { useRef, useEffect, useState } from 'react';

const W = 680, H = 360;
const PIVOT_X = W / 2, PIVOT_Y = 60;

interface State {
  theta: number;   // radians
  omega: number;   // angular velocity
  length: number;  // meters
  damping: number;
  g: number;
  running: boolean;
  history: [number, number][]; // [theta, omega] for phase plot
  energyScale: number;
  t: number;
}

function rk4Step(theta: number, omega: number, g: number, L: number, b: number, dt: number) {
  function deriv(th: number, om: number) {
    return [om, -(g / L) * Math.sin(th) - b * om];
  }
  const [d1th, d1om] = deriv(theta, omega);
  const [d2th, d2om] = deriv(theta + 0.5 * dt * d1th, omega + 0.5 * dt * d1om);
  const [d3th, d3om] = deriv(theta + 0.5 * dt * d2th, omega + 0.5 * dt * d2om);
  const [d4th, d4om] = deriv(theta + dt * d3th, omega + dt * d3om);
  return [
    theta + (dt / 6) * (d1th + 2 * d2th + 2 * d3th + d4th),
    omega + (dt / 6) * (d1om + 2 * d2om + 2 * d3om + d4om),
  ];
}

function drawFrame(ctx: CanvasRenderingContext2D, s: State) {
  ctx.fillStyle = '#080c18';
  ctx.fillRect(0, 0, W, H);

  const pixPerMeter = Math.min(120, (H - PIVOT_Y - 28) / s.length);
  const bobX = PIVOT_X + Math.sin(s.theta) * s.length * pixPerMeter;
  const bobY = PIVOT_Y + Math.cos(s.theta) * s.length * pixPerMeter;

  // Ceiling
  ctx.fillStyle = '#1e2d4a';
  ctx.fillRect(PIVOT_X - 30, 40, 60, 20);

  // Rod
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(PIVOT_X, PIVOT_Y);
  ctx.lineTo(bobX, bobY);
  ctx.stroke();

  // Pivot
  ctx.beginPath();
  ctx.arc(PIVOT_X, PIVOT_Y, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#64748b';
  ctx.fill();

  // Energy bar (bottom left)
  const E_kin = 0.5 * (s.length * s.omega) ** 2;
  const E_pot = s.g * s.length * (1 - Math.cos(s.theta));
  const E_total = E_kin + E_pot;
  const maxE = Math.max(s.energyScale, E_total, 0.01);

  const bx = 20, by = H - 80, bw = 16, bh = 60;
  ctx.fillStyle = '#1e2d4a';
  ctx.fillRect(bx, by, bw, bh);
  ctx.fillRect(bx + bw + 8, by, bw, bh);

  ctx.fillStyle = '#3b82f6';
  const kinH = Math.min(bh, (E_kin / maxE) * bh);
  ctx.fillRect(bx, by + bh - kinH, bw, kinH);

  ctx.fillStyle = '#f59e0b';
  const potH = Math.min(bh, (E_pot / maxE) * bh);
  ctx.fillRect(bx + bw + 8, by + bh - potH, bw, potH);

  ctx.fillStyle = '#475569';
  ctx.font = '10px system-ui';
  ctx.fillText('KE', bx + 2, H - 18);
  ctx.fillText('PE', bx + bw + 10, H - 18);

  // Phase space plot (θ vs ω) — small, top right
  const px = W - 130, py = 20, pw = 110, ph = 90;
  ctx.strokeStyle = '#1e2d4a';
  ctx.lineWidth = 1;
  ctx.strokeRect(px, py, pw, ph);
  ctx.fillStyle = '#0a1020';
  ctx.fillRect(px, py, pw, ph);

  if (s.history.length > 2) {
    ctx.strokeStyle = '#10b98188';
    ctx.lineWidth = 1;
    ctx.beginPath();
    const tMax = Math.PI * 1.2;
    const omMax = Math.sqrt(2 * s.g / s.length) * 1.5;
    for (let i = 1; i < s.history.length; i++) {
      const [th, om] = s.history[i];
      const sx = px + pw / 2 + (th / tMax) * (pw / 2);
      const sy = py + ph / 2 - (om / omMax) * (ph / 2);
      if (i === 1) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
  }

  ctx.fillStyle = '#334155';
  ctx.font = '9px system-ui';
  ctx.fillText('phase space', px + 2, py + ph + 12);

  // Bob
  const r = 18;
  const grad = ctx.createRadialGradient(bobX - 4, bobY - 4, 2, bobX, bobY, r);
  grad.addColorStop(0, '#fbbf24');
  grad.addColorStop(1, '#b45309');
  ctx.beginPath();
  ctx.arc(bobX, bobY, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Period display
  const period = 2 * Math.PI * Math.sqrt(s.length / s.g);
  ctx.fillStyle = '#475569';
  ctx.font = '12px system-ui';
  ctx.fillText(`T ≈ ${period.toFixed(2)} s  (L=${s.length}m, g=${s.g})`, 20, 20);
}

export default function Pendulum() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const simRef = useRef<State>({
    theta: Math.PI / 4, omega: 0, length: 1.5, damping: 0.05, g: 9.81,
    running: false, history: [], energyScale: 9.81 * 1.5 * (1 - Math.cos(Math.PI / 4)), t: 0,
  });

  const [length, setLength] = useState(1.5);
  const [initAngle, setInitAngle] = useState(45);
  const [damping, setDamping] = useState(0.05);
  const [running, setRunning] = useState(false);

  function drawLoop() {
    const s = simRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !s.running) return;
    const ctx = canvas.getContext('2d')!;
    const dt = 1 / 120;
    const [newTheta, newOmega] = rk4Step(s.theta, s.omega, s.g, s.length, s.damping, dt);
    s.theta = newTheta;
    s.omega = newOmega;
    s.t += dt;
    if (s.t % (1 / 60) < dt) {
      s.history.push([s.theta, s.omega]);
      if (s.history.length > 300) s.history.shift();
    }
    drawFrame(ctx, s);
    rafRef.current = requestAnimationFrame(drawLoop);
  }

  useEffect(() => {
    const theta = (initAngle * Math.PI) / 180;
    simRef.current = {
      ...simRef.current,
      theta: simRef.current.running ? simRef.current.theta : theta,
      length,
      damping,
      energyScale: 9.81 * length * (1 - Math.cos(theta)),
    };
    const canvas = canvasRef.current;
    if (canvas && !simRef.current.running) {
      drawFrame(canvas.getContext('2d')!, simRef.current);
    }
  }, [length, damping, initAngle]);

  function start() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    simRef.current = {
      theta: (initAngle * Math.PI) / 180,
      omega: 0, length, damping, g: 9.81,
      running: true, history: [], energyScale: 9.81 * length * (1 - Math.cos((initAngle * Math.PI) / 180)), t: 0,
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
    simRef.current = {
      theta: (initAngle * Math.PI) / 180, omega: 0, length, damping, g: 9.81,
      running: false, history: [], energyScale: 9.81 * length * (1 - Math.cos((initAngle * Math.PI) / 180)), t: 0,
    };
    const canvas = canvasRef.current;
    if (canvas) drawFrame(canvas.getContext('2d')!, simRef.current);
  }

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} className="w-full" />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="space-y-4 rounded-xl border p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <Slider label="String length" value={length} min={0.3} max={3} step={0.1}
            display={`${length} m`} onChange={setLength} />
          <Slider label="Initial angle" value={initAngle} min={5} max={85} step={1}
            display={`${initAngle}°`} onChange={setInitAngle} />
          <Slider label="Damping (air resistance)" value={damping} min={0} max={0.4} step={0.01}
            display={damping.toFixed(2)} onChange={setDamping} />
          <div className="flex gap-2 pt-1">
            {!running
              ? <button onClick={start} className="flex-1 py-2 rounded-lg text-sm font-semibold" style={{ background: '#1e3a5f', color: '#60a5fa', border: '1px solid #3b82f6' }}>Start</button>
              : <button onClick={pause} className="flex-1 py-2 rounded-lg text-sm font-semibold" style={{ background: '#1e3a5f', color: '#60a5fa', border: '1px solid #3b82f6' }}>Pause</button>
            }
            <button onClick={reset} className="px-4 py-2 rounded-lg text-sm" style={{ background: 'var(--surface2)', color: '#64748b', border: '1px solid var(--border)' }}>Reset</button>
          </div>
        </div>
        <div className="rounded-xl border p-4 space-y-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Properties</div>
          <StatRow label="Period T" value={`${(2 * Math.PI * Math.sqrt(length / 9.81)).toFixed(3)} s`} />
          <StatRow label="Frequency f" value={`${(1 / (2 * Math.PI * Math.sqrt(length / 9.81))).toFixed(3)} Hz`} />
          <StatRow label="Length" value={`${length} m`} />
          <StatRow label="Initial angle" value={`${initAngle}°`} />
          <div className="pt-2 text-xs text-slate-500">
            The phase space plot (top right of canvas) traces θ vs θ̇. An undamped pendulum draws a closed ellipse; damping spirals it inward.
          </div>
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
        <span>{label}</span><span className="text-yellow-400 font-medium">{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(+e.target.value)} />
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-xs text-slate-500 font-mono">{label}</span>
      <span className="text-xs text-yellow-300 font-mono font-medium">{value}</span>
    </div>
  );
}
