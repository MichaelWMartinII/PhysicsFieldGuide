'use client';

import { useRef, useEffect, useState } from 'react';

const W = 560, H = 360;
const PAD = { l: 60, r: 20, t: 20, b: 50 };
const CW = W - PAD.l - PAD.r, CH = H - PAD.t - PAD.b;

// Carnot cycle in normalized units: V1=1, V2=3, T_h, T_c
// p = nRT/V (ideal gas, n=1, R=1 for display)
function carnot(Th: number, Tc: number) {
  const g = 1.4; // adiabatic index
  const V1 = 1, V2 = 3;
  const V3 = V2 * Math.pow(Th / Tc, 1 / (g - 1));
  const V4 = V1 * Math.pow(Th / Tc, 1 / (g - 1));

  // P at corners
  const P1 = Th / V1, P2 = Th / V2;
  const P3 = Tc / V3, P4 = Tc / V4;

  return { V1, V2, V3, V4, P1, P2, P3, P4, Th, Tc };
}

export default function PVDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | undefined>(undefined);
  const phaseRef = useRef(0);
  const [Th, setTh] = useState(600);
  const [Tc, setTc] = useState(300);
  const [running, setRunning] = useState(true);
  const paramsRef = useRef({ Th: 600, Tc: 300, running: true });

  useEffect(() => { paramsRef.current = { Th, Tc, running }; }, [Th, Tc, running]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    function toCanvas(V: number, P: number, Vmin: number, Vmax: number, Pmin: number, Pmax: number): [number, number] {
      const x = PAD.l + ((V - Vmin) / (Vmax - Vmin)) * CW;
      const y = PAD.t + CH - ((P - Pmin) / (Pmax - Pmin)) * CH;
      return [x, y];
    }

    function draw() {
      const { Th, Tc, running } = paramsRef.current;
      const c = carnot(Th, Tc);
      const Vmin = 0.6, Vmax = c.V3 * 1.15;
      const Pmin = 0, Pmax = c.P1 * 1.18;

      ctx.fillStyle = '#0f0f0f';
      ctx.fillRect(0, 0, W, H);

      // Axes
      ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(PAD.l, PAD.t); ctx.lineTo(PAD.l, PAD.t + CH); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(PAD.l, PAD.t + CH); ctx.lineTo(PAD.l + CW, PAD.t + CH); ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#4a4a4a'; ctx.font = '11px system-ui, sans-serif';
      ctx.textAlign = 'center'; ctx.fillText('Volume V', PAD.l + CW / 2, H - 8);
      ctx.save(); ctx.translate(14, PAD.t + CH / 2); ctx.rotate(-Math.PI / 2);
      ctx.fillText('Pressure P', 0, 0); ctx.restore();

      // Build path segments
      const N = 80;
      const segments = [
        { name: 'Isothermal\nexpansion', color: '#5b7fa8', V: (t: number) => c.V1 + (c.V2 - c.V1) * t, P: (t: number) => Th / (c.V1 + (c.V2 - c.V1) * t) },
        { name: 'Adiabatic\nexpansion', color: '#9a7d2c', V: (t: number) => c.V2 + (c.V3 - c.V2) * t, P: (t: number) => c.P2 * Math.pow(c.V2 / (c.V2 + (c.V3 - c.V2) * t), 1.4) },
        { name: 'Isothermal\ncompression', color: '#a85b5b', V: (t: number) => c.V3 + (c.V4 - c.V3) * t, P: (t: number) => Tc / (c.V3 + (c.V4 - c.V3) * t) },
        { name: 'Adiabatic\ncompression', color: '#3d7d5c', V: (t: number) => c.V4 + (c.V1 - c.V4) * t, P: (t: number) => c.P4 * Math.pow(c.V4 / (c.V4 + (c.V1 - c.V4) * t), 1.4) },
      ];

      // Shaded area (work done)
      ctx.beginPath();
      for (let s = 0; s < 4; s++) {
        const seg = segments[s];
        for (let i = 0; i <= N; i++) {
          const t = i / N;
          const [x, y] = toCanvas(seg.V(t), seg.P(t), Vmin, Vmax, Pmin, Pmax);
          if (s === 0 && i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(91, 127, 168, 0.08)';
      ctx.fill();

      // Draw each segment
      segments.forEach((seg) => {
        ctx.beginPath();
        for (let i = 0; i <= N; i++) {
          const [x, y] = toCanvas(seg.V(i / N), seg.P(i / N), Vmin, Vmax, Pmin, Pmax);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = seg.color; ctx.lineWidth = 2; ctx.stroke();
      });

      // Animated dot
      if (running) {
        phaseRef.current = (phaseRef.current + 0.004) % 1;
      }
      const ph = phaseRef.current;
      const segIdx = Math.floor(ph * 4);
      const segT = (ph * 4) % 1;
      const seg = segments[segIdx];
      const [dx, dy] = toCanvas(seg.V(segT), seg.P(segT), Vmin, Vmax, Pmin, Pmax);
      ctx.beginPath(); ctx.arc(dx, dy, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#e8e3d8'; ctx.fill();

      // Corner labels
      const corners = [
        { V: c.V1, P: c.P1, label: '1' }, { V: c.V2, P: c.P2, label: '2' },
        { V: c.V3, P: c.P3, label: '3' }, { V: c.V4, P: c.P4, label: '4' },
      ];
      corners.forEach(({ V, P, label }) => {
        const [x, y] = toCanvas(V, P, Vmin, Vmax, Pmin, Pmax);
        ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#6b6660'; ctx.fill();
        ctx.fillStyle = '#6b6660'; ctx.font = '11px system-ui'; ctx.textAlign = 'left';
        ctx.fillText(label, x + 5, y - 5);
      });

      // Stats
      const eff = ((Th - Tc) / Th * 100).toFixed(1);
      ctx.font = '11px system-ui, sans-serif'; ctx.textAlign = 'left'; ctx.fillStyle = '#5b7fa8';
      ctx.fillText(`η = 1 − Tc/Th = ${eff}%`, PAD.l + 8, PAD.t + 16);
      ctx.fillStyle = '#6b6660';
      ctx.fillText(`Th = ${Th} K  Tc = ${Tc} K`, PAD.l + 8, PAD.t + 30);

      // Segment labels at midpoints
      const midLabels = [
        { idx: 0, label: 'Q_h in', color: '#5b7fa8' },
        { idx: 1, label: 'Adiabatic', color: '#9a7d2c' },
        { idx: 2, label: 'Q_c out', color: '#a85b5b' },
        { idx: 3, label: 'Adiabatic', color: '#3d7d5c' },
      ];
      midLabels.forEach(({ idx, label, color }) => {
        const seg = segments[idx];
        const [x, y] = toCanvas(seg.V(0.5), seg.P(0.5), Vmin, Vmax, Pmin, Pmax);
        ctx.fillStyle = color; ctx.font = '10px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(label, x, y - 8);
      });
    }

    function loop() {
      animRef.current = requestAnimationFrame(loop);
      draw();
    }
    loop();
    return () => cancelAnimationFrame(animRef.current!);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: 6, display: 'block' }} />
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { label: 'Hot reservoir Th', value: Th, min: 400, max: 1200, step: 50, display: `${Th} K`, set: setTh },
          { label: 'Cold reservoir Tc', value: Tc, min: 100, max: 500, step: 50, display: `${Tc} K`, set: setTc },
        ].map(({ label, value, min, max, step, display, set }) => (
          <div key={label} className="col-span-1 rounded border p-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)', fontFamily: 'system-ui, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>
              <span>{label}</span><span style={{ color: 'var(--text)' }}>{display}</span>
            </div>
            <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(+e.target.value)} />
          </div>
        ))}
        <div className="rounded border p-3 flex items-center justify-center" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <button onClick={() => setRunning(r => !r)} style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.82rem', padding: '0.3rem 0.9rem', background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 4, color: 'var(--text)', cursor: 'pointer' }}>
            {running ? '⏸ Pause' : '▶ Play'}
          </button>
        </div>
      </div>
      <div style={{ marginTop: '0.4rem', fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
        Shaded area = net work output per cycle · Efficiency increases as Th rises or Tc falls
      </div>
    </div>
  );
}
