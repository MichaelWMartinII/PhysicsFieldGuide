'use client';

import { useRef, useEffect, useState } from 'react';

const W = 680, H = 380;

interface State {
  lambda: number;
  amp: number;
  phase: number;
  sourceSpacing: number;
  t: number;
  running: boolean;
}

function renderFrame(ctx: CanvasRenderingContext2D, s: State) {
  const imageData = ctx.createImageData(W, H);
  const data = imageData.data;

  const s1x = W / 2 - (s.sourceSpacing * 15);
  const s1y = H / 2;
  const s2x = W / 2 + (s.sourceSpacing * 15);
  const s2y = H / 2;
  const k = (2 * Math.PI) / s.lambda;
  const omega = 2 * Math.PI * 0.5;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const r1 = Math.sqrt((x - s1x) ** 2 + (y - s1y) ** 2);
      const r2 = Math.sqrt((x - s2x) ** 2 + (y - s2y) ** 2);

      const att1 = Math.max(0.1, 1 / (1 + r1 * 0.02));
      const att2 = Math.max(0.1, 1 / (1 + r2 * 0.02));

      const w1 = s.amp * att1 * Math.sin(k * r1 - omega * s.t);
      const w2 = s.amp * att2 * Math.sin(k * r2 - omega * s.t + s.phase);
      const total = (w1 + w2) / (2 * s.amp);

      const i = (y * W + x) * 4;
      if (total > 0) {
        data[i] = 0;
        data[i + 1] = Math.floor(total * 180);
        data[i + 2] = Math.floor(total * 255);
      } else {
        data[i] = Math.floor(-total * 220);
        data[i + 1] = 0;
        data[i + 2] = Math.floor(-total * 100);
      }
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // Source dots
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(s1x, s1y, 5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(s2x, s2y, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fffd';
  ctx.font = '11px system-ui';
  ctx.fillText('S₁', s1x - 14, s1y - 10);
  ctx.fillText('S₂', s2x + 7, s2y - 10);

  // Labels
  ctx.fillStyle = '#ffffff88';
  ctx.font = '11px system-ui';
  ctx.fillText(`λ = ${s.lambda.toFixed(0)}px  phase Δ = ${((s.phase / Math.PI) * 180).toFixed(0)}°  spacing = ${s.sourceSpacing}`, 10, H - 10);
}

export default function WaveInterference() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const simRef = useRef<State>({ lambda: 60, amp: 1, phase: 0, sourceSpacing: 5, t: 0, running: false });

  const [lambda, setLambda] = useState(60);
  const [phase, setPhase] = useState(0);
  const [spacing, setSpacing] = useState(5);
  const [running, setRunning] = useState(false);

  function drawLoop() {
    const s = simRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !s.running) return;
    const ctx = canvas.getContext('2d')!;
    s.t += 0.05;
    renderFrame(ctx, s);
    rafRef.current = requestAnimationFrame(drawLoop);
  }

  // Static preview on param change
  useEffect(() => {
    simRef.current = { ...simRef.current, lambda, phase, sourceSpacing: spacing };
    const canvas = canvasRef.current;
    if (canvas) renderFrame(canvas.getContext('2d')!, simRef.current);
  }, [lambda, phase, spacing]);

  function start() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    simRef.current = { lambda, amp: 1, phase, sourceSpacing: spacing, t: 0, running: true };
    setRunning(true);
    drawLoop();
  }

  function pause() {
    simRef.current.running = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setRunning(false);
  }

  const phaseDeg = Math.round((phase / Math.PI) * 180);
  const conditionLabel =
    phaseDeg === 0 || phaseDeg === 360 ? 'Constructive (Δφ = 0)' :
    phaseDeg === 180 ? 'Destructive (Δφ = π)' :
    `Partial interference (Δφ = ${phaseDeg}°)`;

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} className="w-full" />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="space-y-4 rounded-xl border p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <Slider label="Wavelength λ" value={lambda} min={20} max={120} step={5}
            display={`${lambda} px`} onChange={setLambda} />
          <Slider label="Source spacing" value={spacing} min={1} max={10} step={0.5}
            display={`${spacing} × λ`} onChange={setSpacing} />
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Phase difference Δφ</span>
              <span className="text-emerald-400 font-medium">{phaseDeg}°</span>
            </div>
            <input type="range" min={0} max={2 * Math.PI} step={0.05} value={phase}
              onChange={(e) => setPhase(+e.target.value)} />
          </div>
          <div className="flex gap-2 pt-1">
            {!running
              ? <button onClick={start} className="flex-1 py-2 rounded-lg text-sm font-semibold" style={{ background: '#0a2e1a', color: '#34d399', border: '1px solid #10b981' }}>Animate</button>
              : <button onClick={pause} className="flex-1 py-2 rounded-lg text-sm font-semibold" style={{ background: '#0a2e1a', color: '#34d399', border: '1px solid #10b981' }}>Pause</button>
            }
          </div>
        </div>

        <div className="rounded-xl border p-4 space-y-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Interference condition</div>
          <div className="text-sm font-medium" style={{ color: phaseDeg === 0 ? '#34d399' : phaseDeg === 180 ? '#f87171' : '#fbbf24' }}>
            {conditionLabel}
          </div>
          <div className="text-xs text-slate-500 pt-2 space-y-2">
            <p><span className="text-blue-300">Constructive</span> — waves in phase (Δφ = 0, 2π, …) → bright bands</p>
            <p><span className="text-red-400">Destructive</span> — waves out of phase (Δφ = π, 3π, …) → dark bands</p>
            <p>Blue = positive amplitude, Red = negative amplitude.</p>
            <p>The pattern is the 2D superposition: y = y₁ + y₂</p>
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
        <span>{label}</span><span className="text-emerald-400 font-medium">{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} />
    </div>
  );
}
