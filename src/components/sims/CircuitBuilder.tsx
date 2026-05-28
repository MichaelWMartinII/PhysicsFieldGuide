'use client';

import { useRef, useEffect, useState } from 'react';

const W = 560, H = 340;

type Mode = 'series' | 'parallel';

export default function CircuitBuilder() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>('series');
  const [voltage, setVoltage] = useState(12);
  const [r1, setR1] = useState(4);
  const [r2, setR2] = useState(6);
  const [r3, setR3] = useState(3);
  const animRef = useRef<number | undefined>(undefined);
  const phaseRef = useRef(0);
  const paramsRef = useRef({ mode: 'series' as Mode, voltage: 12, r1: 4, r2: 6, r3: 3 });

  useEffect(() => { paramsRef.current = { mode, voltage, r1, r2, r3 }; }, [mode, voltage, r1, r2, r3]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    function drawResistor(x: number, y: number, label: string, R: number, I: number, color: string) {
      const w = 60, h = 22;
      ctx.fillStyle = '#1a1a1a';
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.rect(x - w / 2, y - h / 2, w, h);
      ctx.fill(); ctx.stroke();

      // Zigzag symbol inside
      ctx.beginPath();
      ctx.strokeStyle = color; ctx.lineWidth = 1.2;
      const zx = x - 22, step = 44 / 7;
      ctx.moveTo(zx, y);
      for (let i = 0; i <= 7; i++) {
        ctx.lineTo(zx + i * step, y + (i % 2 === 0 ? 0 : (i % 4 === 1 ? -7 : 7)));
      }
      ctx.stroke();

      ctx.fillStyle = color; ctx.font = '10px system-ui'; ctx.textAlign = 'center';
      ctx.fillText(`${label} = ${R}Ω`, x, y - h / 2 - 5);
      ctx.fillStyle = '#6b6660';
      ctx.fillText(`${I.toFixed(2)} A`, x, y + h / 2 + 12);
    }

    function drawWire(x1: number, y1: number, x2: number, y2: number, color: string, width = 2) {
      ctx.beginPath();
      ctx.strokeStyle = color; ctx.lineWidth = width;
      ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    function drawBattery(cx: number, cy: number, V: number) {
      const h = 50;
      drawWire(cx, cy - h / 2, cx, cy - 10, '#5b7fa8', 2);
      drawWire(cx, cy + 10, cx, cy + h / 2, '#5b7fa8', 2);
      // Battery plates
      ctx.strokeStyle = '#5b7fa8'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(cx - 14, cy - 10); ctx.lineTo(cx + 14, cy - 10); ctx.stroke();
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(cx - 9, cy + 10); ctx.lineTo(cx + 9, cy + 10); ctx.stroke();
      ctx.fillStyle = '#5b7fa8'; ctx.font = '10px system-ui'; ctx.textAlign = 'center';
      ctx.fillText(`${V}V`, cx, cy - h / 2 - 5);
      ctx.fillStyle = '#4a7fbd'; ctx.font = '8px system-ui';
      ctx.fillText('+', cx + 18, cy - 8);
      ctx.fillText('−', cx + 18, cy + 14);
    }

    function drawDot(x: number, y: number, progress: number, path: [number, number][], color: string) {
      const total = path.length - 1;
      const idx = Math.floor(progress * total);
      const frac = (progress * total) % 1;
      if (idx >= total) return;
      const [x1, y1] = path[idx];
      const [x2, y2] = path[idx + 1];
      const px = x1 + (x2 - x1) * frac;
      const py = y1 + (y2 - y1) * frac;
      ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.fill();
    }

    function draw() {
      const { mode, voltage, r1, r2, r3 } = paramsRef.current;
      ctx.fillStyle = '#0f0f0f';
      ctx.fillRect(0, 0, W, H);

      if (mode === 'series') {
        const R_total = r1 + r2 + r3;
        const I = voltage / R_total;
        const V1 = I * r1, V2 = I * r2, V3 = I * r3;

        // Layout: battery left, 3 resistors across top, wire back
        const batX = 60, batY = 170;
        const topY = 80, botY = 260;
        const r1X = 190, r2X = 310, r3X = 430;

        // Wires
        drawWire(batX, batY - 25, batX, topY, '#5b7fa8');
        drawWire(batX, topY, r1X - 40, topY, '#5b7fa8');
        drawWire(r1X + 40, topY, r2X - 40, topY, '#5b7fa8');
        drawWire(r2X + 40, topY, r3X - 40, topY, '#5b7fa8');
        drawWire(r3X + 40, topY, 520, topY, '#5b7fa8');
        drawWire(520, topY, 520, botY, '#5b7fa8');
        drawWire(520, botY, batX, botY, '#5b7fa8');
        drawWire(batX, botY, batX, batY + 25, '#5b7fa8');

        drawBattery(batX, batY, voltage);
        drawResistor(r1X, topY, 'R₁', r1, I, '#5b7fa8');
        drawResistor(r2X, topY, 'R₂', r2, I, '#9a7d2c');
        drawResistor(r3X, topY, 'R₃', r3, I, '#3d7d5c');

        // Stats
        ctx.fillStyle = '#cdc8be'; ctx.font = '11px system-ui'; ctx.textAlign = 'left';
        ctx.fillText(`R_total = ${R_total} Ω`, 80, 290);
        ctx.fillText(`I = V/R = ${I.toFixed(3)} A`, 80, 307);
        ctx.fillStyle = '#5b7fa8';
        ctx.fillText(`V₁=${V1.toFixed(1)}V  V₂=${V2.toFixed(1)}V  V₃=${V3.toFixed(1)}V`, 80, 324);

        // Animated charge dot
        phaseRef.current = (phaseRef.current + 0.003 * (I / 3)) % 1;
        const path: [number, number][] = [
          [batX, batY - 25], [batX, topY], [r1X - 40, topY], [r1X + 40, topY],
          [r2X - 40, topY], [r2X + 40, topY], [r3X - 40, topY], [r3X + 40, topY],
          [520, topY], [520, botY], [batX, botY], [batX, batY + 25],
        ];
        drawDot(0, 0, phaseRef.current, path, '#e8e3d8');

      } else {
        // Parallel: R1, R2, R3 in parallel
        const inv = 1 / r1 + 1 / r2 + 1 / r3;
        const R_eq = 1 / inv;
        const I_total = voltage / R_eq;
        const I1 = voltage / r1, I2 = voltage / r2, I3 = voltage / r3;

        const batX = 60, batY = 170;
        const leftX = 120, rightX = 460;
        const ys = [100, 170, 240];
        const colors = ['#5b7fa8', '#9a7d2c', '#3d7d5c'];
        const labels = ['R₁', 'R₂', 'R₃'];
        const Rs = [r1, r2, r3];
        const Is = [I1, I2, I3];

        // Main rails
        drawWire(batX, batY - 25, batX, 80, '#5b7fa8');
        drawWire(batX, 80, leftX, 80, '#5b7fa8');
        drawWire(leftX, 80, leftX, 260, '#5b7fa8');
        drawWire(batX, batY + 25, batX, 260, '#5b7fa8');
        drawWire(batX, 260, leftX, 260, '#5b7fa8');

        drawWire(rightX, 80, 520, 80, '#5b7fa8');
        drawWire(520, 80, 520, 260, '#5b7fa8');
        drawWire(rightX, 260, 520, 260, '#5b7fa8');
        drawWire(520, 260, 520, 260, '#5b7fa8');
        drawWire(520, 260, 520, batY + 0, '#5b7fa8');

        // Branch wires and resistors
        for (let i = 0; i < 3; i++) {
          drawWire(leftX, ys[i], 250, ys[i], colors[i]);
          drawWire(370, ys[i], rightX, ys[i], colors[i]);
          drawResistor(310, ys[i], labels[i], Rs[i], Is[i], colors[i]);
        }
        // Junction dots
        for (const y of ys) {
          ctx.beginPath(); ctx.arc(leftX, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#5b7fa8'; ctx.fill();
          ctx.beginPath(); ctx.arc(rightX, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#5b7fa8'; ctx.fill();
        }

        drawBattery(batX, batY, voltage);

        ctx.fillStyle = '#cdc8be'; ctx.font = '11px system-ui'; ctx.textAlign = 'left';
        ctx.fillText(`R_eq = 1/(1/R₁+1/R₂+1/R₃) = ${R_eq.toFixed(2)} Ω`, 140, 295);
        ctx.fillText(`I_total = ${I_total.toFixed(3)} A`, 140, 312);
        ctx.fillStyle = '#5b7fa8';
        ctx.fillText(`I₁=${I1.toFixed(2)}A  I₂=${I2.toFixed(2)}A  I₃=${I3.toFixed(2)}A`, 140, 329);

        // Animated dots on each branch
        const speeds = [I1, I2, I3];
        for (let i = 0; i < 3; i++) {
          const ph = (phaseRef.current * (speeds[i] / I_total) * 3 + i / 3) % 1;
          const path: [number, number][] = [
            [leftX, ys[i]], [250, ys[i]], [370, ys[i]], [rightX, ys[i]],
          ];
          drawDot(0, 0, ph, path, colors[i]);
        }
        phaseRef.current = (phaseRef.current + 0.003) % 1;
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current !== undefined) cancelAnimationFrame(animRef.current); };
  }, []);

  const tabStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: 'system-ui, sans-serif', fontSize: '0.8rem', padding: '0.3rem 1rem',
    background: active ? 'var(--surface3)' : 'var(--surface)',
    border: '1px solid var(--border2)', borderRadius: 4, color: active ? 'var(--text)' : 'var(--muted)',
    cursor: 'pointer',
  });

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: 6, display: 'block' }} />
      <div className="mt-4" style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <button style={tabStyle(mode === 'series')} onClick={() => setMode('series')}>Series</button>
        <button style={tabStyle(mode === 'parallel')} onClick={() => setMode('parallel')}>Parallel</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Battery voltage', value: voltage, min: 1, max: 24, step: 1, display: `${voltage} V`, set: setVoltage },
          { label: 'R₁', value: r1, min: 1, max: 20, step: 1, display: `${r1} Ω`, set: setR1 },
          { label: 'R₂', value: r2, min: 1, max: 20, step: 1, display: `${r2} Ω`, set: setR2 },
          { label: 'R₃', value: r3, min: 1, max: 20, step: 1, display: `${r3} Ω`, set: setR3 },
        ].map(({ label, value, min, max, step, display, set }) => (
          <div key={label} className="rounded border p-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)', fontFamily: 'system-ui, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>
              <span>{label}</span><span style={{ color: 'var(--text)' }}>{display}</span>
            </div>
            <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(+e.target.value)} />
          </div>
        ))}
      </div>
    </div>
  );
}
