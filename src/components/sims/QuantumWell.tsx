'use client';

import { useRef, useEffect, useState } from 'react';

const W = 560, H = 340;
const PAD = { l: 55, r: 20, t: 20, b: 40 };
const CW = W - PAD.l - PAD.r, CH = H - PAD.t - PAD.b;

export default function QuantumWell() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | undefined>(undefined);
  const tRef = useRef(0);
  const [n, setN] = useState(1);
  const [showProb, setShowProb] = useState(false);
  const paramsRef = useRef({ n: 1, showProb: false });

  useEffect(() => { paramsRef.current = { n, showProb }; }, [n, showProb]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    // Energy levels in units of E1
    function getE(n: number) { return n * n; }

    function draw() {
      const { n, showProb } = paramsRef.current;
      tRef.current += 0.04;
      const t = tRef.current;

      ctx.fillStyle = '#0f0f0f';
      ctx.fillRect(0, 0, W, H);

      const Nlevels = 5;
      const E1 = 40; // px per E1 unit for display
      const wellBottom = PAD.t + CH;
      const wellLeft = PAD.l;
      const wellRight = PAD.l + CW;

      // Draw infinite well walls
      ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(wellLeft, PAD.t); ctx.lineTo(wellLeft, wellBottom); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(wellRight, PAD.t); ctx.lineTo(wellRight, wellBottom); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(wellLeft, wellBottom); ctx.lineTo(wellRight, wellBottom); ctx.stroke();

      // Hatching on walls
      ctx.strokeStyle = '#252525'; ctx.lineWidth = 1;
      for (let y = PAD.t; y < wellBottom; y += 12) {
        ctx.beginPath(); ctx.moveTo(wellLeft - 14, y); ctx.lineTo(wellLeft, y + 14); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(wellRight, y); ctx.lineTo(wellRight + 14, y + 14); ctx.stroke();
      }

      // Draw energy levels and wavefunctions
      for (let lv = 1; lv <= Nlevels; lv++) {
        const E = getE(lv);
        const levelY = wellBottom - E * E1;
        if (levelY < PAD.t) break;

        const isActive = lv === n;
        const levelColor = isActive ? '#5b7fa8' : '#2a3a4a';

        // Energy level line
        ctx.strokeStyle = levelColor; ctx.lineWidth = isActive ? 1.5 : 0.8;
        ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(wellLeft, levelY); ctx.lineTo(wellRight, levelY);
        ctx.stroke(); ctx.setLineDash([]);

        // Level label
        ctx.fillStyle = isActive ? '#5b7fa8' : '#3a4a5a';
        ctx.font = `${isActive ? 'bold ' : ''}10px system-ui`;
        ctx.textAlign = 'right';
        ctx.fillText(`n=${lv}  E=${lv*lv}E₁`, wellLeft - 5, levelY + 3);

        if (!isActive) continue;

        // Wavefunction amplitude (scaled to fit between levels)
        const nextE = getE(lv + 1);
        const nextY = wellBottom - nextE * E1;
        const amplitude = Math.min((levelY - Math.max(nextY, PAD.t)) * 0.38, 45);

        const N = 200;
        const phase = t * 2; // time-dependent phase for animation

        if (showProb) {
          // |ψ|² probability density — no time dependence for stationary state
          ctx.beginPath();
          for (let i = 0; i <= N; i++) {
            const x = wellLeft + (i / N) * CW;
            const xi = i / N; // 0 to 1
            const psi = Math.sqrt(2) * Math.sin(lv * Math.PI * xi);
            const prob = psi * psi;
            const py = levelY - prob * amplitude * 1.4;
            if (i === 0) ctx.moveTo(x, py);
            else ctx.lineTo(x, py);
          }
          // Fill under curve
          ctx.lineTo(wellRight, levelY); ctx.lineTo(wellLeft, levelY);
          ctx.closePath();
          ctx.fillStyle = 'rgba(91,127,168,0.18)'; ctx.fill();
          ctx.strokeStyle = '#5b7fa8'; ctx.lineWidth = 1.5;
          ctx.beginPath();
          for (let i = 0; i <= N; i++) {
            const x = wellLeft + (i / N) * CW;
            const xi = i / N;
            const psi = Math.sqrt(2) * Math.sin(lv * Math.PI * xi);
            const prob = psi * psi;
            const py = levelY - prob * amplitude * 1.4;
            if (i === 0) ctx.moveTo(x, py);
            else ctx.lineTo(x, py);
          }
          ctx.stroke();
        } else {
          // ψ(x) wavefunction with time-phase animation
          ctx.beginPath();
          for (let i = 0; i <= N; i++) {
            const x = wellLeft + (i / N) * CW;
            const xi = i / N;
            const psi = Math.sqrt(2) * Math.sin(lv * Math.PI * xi) * Math.cos(phase);
            const py = levelY - psi * amplitude;
            if (i === 0) ctx.moveTo(x, py);
            else ctx.lineTo(x, py);
          }
          ctx.strokeStyle = '#5b7fa8'; ctx.lineWidth = 2; ctx.stroke();

          // Nodes label
          if (lv > 1) {
            ctx.fillStyle = '#9a7d2c'; ctx.font = '9px system-ui'; ctx.textAlign = 'center';
            ctx.fillText(`${lv - 1} node${lv > 2 ? 's' : ''}`, (wellLeft + wellRight) / 2, levelY + 14);
          }
        }
      }

      // Axis label
      ctx.fillStyle = '#4a4a4a'; ctx.font = '10px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('x  (0 to L)', (wellLeft + wellRight) / 2, H - 8);
      ctx.save(); ctx.translate(12, PAD.t + CH / 2); ctx.rotate(-Math.PI / 2);
      ctx.fillText('Energy', 0, 0); ctx.restore();

      // Title
      ctx.fillStyle = showProb ? '#9a7d2c' : '#5b7fa8';
      ctx.font = '10px system-ui'; ctx.textAlign = 'left';
      ctx.fillText(showProb ? '|ψ|² probability density' : 'ψ(x) wavefunction (animated)', PAD.l, 14);

      // E formula
      ctx.fillStyle = '#6b6660'; ctx.font = '10px system-ui'; ctx.textAlign = 'right';
      ctx.fillText(`E_n = n²π²ℏ²/2mL²   |   E${n} = ${n*n}E₁`, W - 10, 14);

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current !== undefined) cancelAnimationFrame(animRef.current); };
  }, []);

  const btnStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: 'system-ui, sans-serif', fontSize: '0.78rem', padding: '0.3rem 0.9rem',
    background: active ? 'var(--surface3)' : 'var(--surface)',
    border: '1px solid var(--border2)', borderRadius: 4,
    color: active ? 'var(--text)' : 'var(--muted)', cursor: 'pointer',
  });

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: 6, display: 'block' }} />
      <div className="mt-3" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontFamily: 'system-ui', fontSize: '0.8rem', color: 'var(--muted)' }}>
          <span>n =</span>
          {[1, 2, 3, 4].map(lv => (
            <button key={lv} style={btnStyle(n === lv)} onClick={() => setN(lv)}>{lv}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button style={btnStyle(!showProb)} onClick={() => setShowProb(false)}>ψ(x)</button>
          <button style={btnStyle(showProb)} onClick={() => setShowProb(true)}>|ψ|²</button>
        </div>
      </div>
      <div style={{ marginTop: '0.4rem', fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', fontFamily: 'system-ui' }}>
        Higher n → more nodes, higher energy. |ψ|² shows where the particle is most likely to be found.
      </div>
    </div>
  );
}
