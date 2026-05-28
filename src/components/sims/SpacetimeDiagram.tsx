'use client';

import { useRef, useEffect, useState } from 'react';

const W = 560, H = 360;
const OX = W / 2, OY = H - 40;

export default function SpacetimeDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [beta, setBeta] = useState(0.6); // v/c of moving frame S'
  const paramsRef = useRef({ beta: 0.6 });

  useEffect(() => { paramsRef.current = { beta }; }, [beta]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const SCALE = 55; // pixels per light-second

    function toCanvas(x: number, ct: number): [number, number] {
      return [OX + x * SCALE, OY - ct * SCALE];
    }

    function drawAxes() {
      // Grid
      ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 1;
      for (let i = -5; i <= 5; i++) {
        const [gx] = toCanvas(i, 0);
        ctx.beginPath(); ctx.moveTo(gx, PAD_TOP); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let j = 0; j <= 7; j++) {
        const [, gy] = toCanvas(0, j);
        if (gy < PAD_TOP) break;
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      // Main axes (S frame)
      ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(OX, H); ctx.lineTo(OX, PAD_TOP); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, OY); ctx.lineTo(W, OY); ctx.stroke();
      ctx.fillStyle = '#4a4a4a'; ctx.font = '10px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('x', W - 18, OY + 14);
      ctx.fillText('ct', OX + 12, PAD_TOP + 10);
    }

    const PAD_TOP = 25;

    function draw() {
      const { beta } = paramsRef.current;
      ctx.fillStyle = '#0f0f0f';
      ctx.fillRect(0, 0, W, H);

      drawAxes();

      const gamma = 1 / Math.sqrt(1 - beta * beta);

      // Light cone (c = 1 in natural units)
      ctx.strokeStyle = '#9a7d2c'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
      // Future light cone
      ctx.beginPath();
      ctx.moveTo(...toCanvas(0, 0)); ctx.lineTo(...toCanvas(4, 4)); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(...toCanvas(0, 0)); ctx.lineTo(...toCanvas(-4, 4)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#9a7d2c'; ctx.font = '9px system-ui'; ctx.textAlign = 'center';
      const [lcx, lcy] = toCanvas(3.2, 3.2);
      ctx.fillText('light cone', lcx - 10, lcy - 8);

      // S' worldline (t'-axis) — slope = 1/β in ct-x plane
      ctx.strokeStyle = '#5b7fa8'; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(...toCanvas(0, 0));
      ctx.lineTo(...toCanvas(beta * 5, 5));
      ctx.stroke();

      // S' x'-axis — slope = β (simultaneity plane tilts in same direction)
      ctx.strokeStyle = '#a85b5b'; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(...toCanvas(-4, -4 * beta));
      ctx.lineTo(...toCanvas(4, 4 * beta));
      ctx.stroke();

      // Labels for S' axes
      ctx.fillStyle = '#5b7fa8'; ctx.font = '10px system-ui'; ctx.textAlign = 'left';
      const [t1x, t1y] = toCanvas(beta * 3.5, 3.5);
      ctx.fillText("ct'", t1x + 4, t1y - 4);
      ctx.fillStyle = '#a85b5b';
      const [x1x, x1y] = toCanvas(3.5, 3.5 * beta);
      ctx.fillText("x'", x1x + 4, x1y + 12);

      // Tick marks on S' ct'-axis (proper time)
      for (let tau = 1; tau <= 4; tau++) {
        const tauX = beta * tau * gamma;
        const tauCT = tau * gamma;
        if (tauCT * SCALE > OY - PAD_TOP) break;
        const [px, py] = toCanvas(tauX, tauCT);
        ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#5b7fa8'; ctx.fill();
        ctx.fillStyle = '#5b7fa8'; ctx.font = '9px system-ui'; ctx.textAlign = 'left';
        ctx.fillText(`τ=${tau}`, px + 5, py + 3);
      }

      // Tick marks on S ct-axis (coordinate time)
      for (let t = 1; t <= 4; t++) {
        const [px, py] = toCanvas(0, t);
        if (py < PAD_TOP) break;
        ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#4a4a4a'; ctx.fill();
      }

      // Example event
      const evX = 2, evCT = 2.5;
      const [epx, epy] = toCanvas(evX, evCT);
      ctx.beginPath(); ctx.arc(epx, epy, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#3d7d5c'; ctx.fill();
      ctx.fillStyle = '#3d7d5c'; ctx.font = '10px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('event P', epx + 7, epy);

      // Lorentz-transformed coordinates of P
      const xPrime = gamma * (evX - beta * evCT);
      const ctPrime = gamma * (evCT - beta * evX);
      ctx.fillStyle = '#6b6660'; ctx.font = '10px system-ui';
      ctx.fillText(`S: (x=${evX}, ct=${evCT})`, epx + 7, epy + 14);
      ctx.fillText(`S': (x'=${xPrime.toFixed(2)}, ct'=${ctPrime.toFixed(2)})`, epx + 7, epy + 26);

      // Info panel
      ctx.fillStyle = '#5b7fa8'; ctx.font = '10px system-ui'; ctx.textAlign = 'left';
      ctx.fillText(`v = ${beta}c   γ = ${gamma.toFixed(3)}`, 12, 18);
      ctx.fillStyle = '#6b6660';
      ctx.fillText('S axes: gray  |  S\' time: blue  |  S\' space: red', 12, H - 10);
    }

    let id: number;
    function loop() { draw(); id = requestAnimationFrame(loop); }
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: 6, display: 'block' }} />
      <div className="mt-4" style={{ fontFamily: 'system-ui' }}>
        <div className="rounded border p-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>
            <span>Frame velocity β = v/c</span><span style={{ color: 'var(--text)' }}>{beta}c</span>
          </div>
          <input type="range" min={0} max={0.95} step={0.05} value={beta} onChange={e => setBeta(+e.target.value)} />
        </div>
      </div>
      <div style={{ marginTop: '0.4rem', fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', fontFamily: 'system-ui' }}>
        As β → 1, the S&apos; axes scissor toward the light cone. The proper-time ticks on the blue axis space out — time dilation.
      </div>
    </div>
  );
}
