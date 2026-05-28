'use client';

import { useRef, useEffect, useState } from 'react';

const W = 560, H = 300;
const PAD = { l: 40, r: 15, t: 15, b: 35 };
const CW = W - PAD.l - PAD.r, CH = H - PAD.t - PAD.b;

type Preset = 'square' | 'sawtooth' | 'triangle' | 'custom';

export default function FourierSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nTerms, setNTerms] = useState(5);
  const [preset, setPreset] = useState<Preset>('square');
  const paramsRef = useRef({ nTerms: 5, preset: 'square' as Preset });

  useEffect(() => { paramsRef.current = { nTerms, preset }; }, [nTerms, preset]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    function getCoeff(n: number, preset: Preset): number {
      // Returns b_n for sine series
      if (preset === 'square')   return n % 2 === 1 ? 4 / (Math.PI * n) : 0;
      if (preset === 'sawtooth') return 2 / (Math.PI * n) * (n % 2 === 0 ? -1 : 1);
      if (preset === 'triangle') return n % 2 === 1 ? 8 / (Math.PI * Math.PI * n * n) * (n % 4 === 1 ? 1 : -1) : 0;
      // custom: emphasize harmonics 1,3,5 equally
      return [1,3,5].includes(n) ? 1/n : 0;
    }

    function exact(x: number, preset: Preset): number {
      const t = (x / CW) * 2 * Math.PI;
      if (preset === 'square')   return t % (2*Math.PI) < Math.PI ? 1 : -1;
      if (preset === 'sawtooth') return (t / Math.PI) % 2 - 1;
      if (preset === 'triangle') return 2 * Math.abs(((t/Math.PI + 0.5) % 2) - 1) - 1;
      return [1,3,5].reduce((s,n) => s + Math.sin(n*t)/n, 0) * 0.6;
    }

    function draw() {
      const { nTerms, preset } = paramsRef.current;
      ctx.fillStyle = '#0f0f0f';
      ctx.fillRect(0, 0, W, H);

      const midY = PAD.t + CH / 2;
      const amp = CH * 0.42;

      // Axes
      ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(PAD.l, PAD.t); ctx.lineTo(PAD.l, PAD.t + CH); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(PAD.l, midY); ctx.lineTo(PAD.l + CW, midY); ctx.stroke();

      // Target function (faint)
      ctx.strokeStyle = '#2a3a4a'; ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i <= CW; i++) {
        const y = midY - exact(i, preset) * amp;
        if (i === 0) ctx.moveTo(PAD.l + i, y);
        else ctx.lineTo(PAD.l + i, y);
      }
      ctx.stroke();

      // Fourier approximation
      const colors = ['#5b7fa8','#9a7d2c','#3d7d5c','#a85b5b','#7b68ee'];
      const N = 200;

      // Draw each harmonic as faint layer
      for (let k = 1; k <= nTerms; k++) {
        const bn = getCoeff(k, preset);
        if (Math.abs(bn) < 1e-6) continue;
        const hue = colors[(k - 1) % colors.length];
        ctx.strokeStyle = hue + '40'; ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i <= N; i++) {
          const x = (i / N) * CW;
          const t = (x / CW) * 2 * Math.PI;
          const y = midY - bn * Math.sin(k * t) * amp;
          if (i === 0) ctx.moveTo(PAD.l + x, y);
          else ctx.lineTo(PAD.l + x, y);
        }
        ctx.stroke();
      }

      // Sum
      ctx.strokeStyle = '#5b7fa8'; ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i <= N; i++) {
        const x = (i / N) * CW;
        const t = (x / CW) * 2 * Math.PI;
        let sum = 0;
        for (let k = 1; k <= nTerms; k++) {
          sum += getCoeff(k, preset) * Math.sin(k * t);
        }
        const y = midY - sum * amp;
        if (i === 0) ctx.moveTo(PAD.l + x, y);
        else ctx.lineTo(PAD.l + x, y);
      }
      ctx.stroke();

      // Harmonic bars at right
      const barX = PAD.l + CW + 5;
      ctx.fillStyle = '#4a4a4a'; ctx.font = '9px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('aₙ', barX + 2, PAD.t + 10);
      for (let k = 1; k <= Math.min(nTerms, 9); k++) {
        const bn = getCoeff(k, preset);
        const barH = Math.abs(bn) * 30;
        const by = midY - barH / 2;
        ctx.fillStyle = colors[(k - 1) % colors.length];
        ctx.fillRect(barX, by, 10, barH);
        ctx.fillStyle = '#4a4a4a'; ctx.font = '8px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(`${k}`, barX + 5, midY + barH / 2 + 10);
      }

      // Labels
      ctx.fillStyle = '#5b7fa8'; ctx.font = '10px system-ui'; ctx.textAlign = 'left';
      ctx.fillText(`Σ (n=1 to ${nTerms})  bₙ sin(nπx/L)`, PAD.l + 4, PAD.t + 13);
      ctx.fillStyle = '#2a3a4a';
      ctx.fillText('target f(x)', PAD.l + 4, PAD.t + 25);
      ctx.fillStyle = '#4a4a4a'; ctx.font = '9px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('x  (0 to 2π)', PAD.l + CW / 2, H - 6);

      // Gibbs annotation at discontinuity
      if ((preset === 'square' || preset === 'sawtooth') && nTerms > 3) {
        ctx.fillStyle = '#6b6660'; ctx.font = '8px system-ui'; ctx.textAlign = 'center';
        ctx.fillText('Gibbs phenomenon', PAD.l + 8, PAD.t + CH - 5);
      }
    }

    let id: number;
    function loop() { draw(); id = requestAnimationFrame(loop); }
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  const tabStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: 'system-ui', fontSize: '0.75rem', padding: '0.25rem 0.7rem',
    background: active ? 'var(--surface3)' : 'var(--surface)',
    border: '1px solid var(--border2)', borderRadius: 4,
    color: active ? 'var(--text)' : 'var(--muted)', cursor: 'pointer',
  });

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: 6, display: 'block' }} />
      <div className="mt-3" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {(['square','sawtooth','triangle'] as Preset[]).map(p => (
            <button key={p} style={tabStyle(preset === p)} onClick={() => setPreset(p)}>{p}</button>
          ))}
        </div>
        <div className="rounded border p-2" style={{ background: 'var(--surface)', borderColor: 'var(--border)', fontFamily: 'system-ui', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Terms: {nTerms}</span>
          <input type="range" min={1} max={25} step={1} value={nTerms} onChange={e => setNTerms(+e.target.value)} style={{ width: 120 }} />
        </div>
      </div>
      <div style={{ marginTop: '0.4rem', fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', fontFamily: 'system-ui' }}>
        Faint lines = individual harmonics. Blue = sum. Dim gray = target function. Watch Gibbs overshoot at discontinuities.
      </div>
    </div>
  );
}
