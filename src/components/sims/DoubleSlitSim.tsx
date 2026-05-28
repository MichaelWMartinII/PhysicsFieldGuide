'use client';

import { useRef, useEffect, useState } from 'react';

const W = 560, H = 340;

export default function DoubleSlitSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lambda, setLambda] = useState(550); // nm
  const [slitSep, setSlitSep] = useState(2000); // nm (d)
  const [slitWidth, setSlitWidth] = useState(400); // nm (a)
  const paramsRef = useRef({ lambda: 550, slitSep: 2000, slitWidth: 400 });

  useEffect(() => { paramsRef.current = { lambda, slitSep, slitWidth }; }, [lambda, slitSep, slitWidth]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    function wavelengthToRGB(nm: number): string {
      let r = 0, g = 0, b = 0;
      if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; g = 0; b = 1; }
      else if (nm < 490) { r = 0; g = (nm - 440) / 50; b = 1; }
      else if (nm < 510) { r = 0; g = 1; b = -(nm - 510) / 20; }
      else if (nm < 580) { r = (nm - 510) / 70; g = 1; b = 0; }
      else if (nm < 645) { r = 1; g = -(nm - 645) / 65; b = 0; }
      else if (nm <= 780) { r = 1; g = 0; b = 0; }
      const alpha = nm < 420 ? 0.3 + 0.7 * (nm - 380) / 40
        : nm > 700 ? 0.3 + 0.7 * (780 - nm) / 80 : 1;
      return `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)},${alpha})`;
    }

    function draw() {
      const { lambda, slitSep, slitWidth } = paramsRef.current;
      ctx.fillStyle = '#0f0f0f';
      ctx.fillRect(0, 0, W, H);

      const screenX = W - 60;
      const sourceX = 40;
      const cy = H / 2;
      const L = screenX - sourceX; // propagation distance in px

      // Scale: 1 px = 100 nm for slit geometry, but screen shows angular pattern
      // Use normalized coordinates: sin(theta) = y / sqrt(y^2 + L^2)

      // Draw slit barrier
      ctx.fillStyle = '#2a2a2a';
      ctx.fillRect(W / 2 - 4, 0, 8, cy - slitSep / 200 - slitWidth / 200);
      ctx.fillRect(W / 2 - 4, cy - slitSep / 200 + slitWidth / 200, 8, slitSep / 100 - slitWidth / 100);
      ctx.fillRect(W / 2 - 4, cy + slitSep / 200 + slitWidth / 200, 8, H - cy - slitSep / 200 - slitWidth / 200);

      // Slit labels
      ctx.fillStyle = '#4a4a4a'; ctx.font = '9px system-ui'; ctx.textAlign = 'center';
      ctx.fillText(`d=${(slitSep / 1000).toFixed(1)}μm`, W / 2, 14);
      ctx.fillText(`a=${(slitWidth / 1000).toFixed(2)}μm`, W / 2, H - 6);

      // Draw interference pattern on screen
      const color = wavelengthToRGB(lambda);
      const screenH = H;
      for (let py = 0; py < screenH; py++) {
        const y = (py - screenH / 2) * 0.5; // pixels → scaled angle
        const sinTheta = y / Math.sqrt(y * y + L * L * 0.01);

        // Double-slit: I = I0 * sinc²(β/2) * cos²(δ/2)
        // β = (2π/λ) * a * sinθ, δ = (2π/λ) * d * sinθ
        const beta = (Math.PI * slitWidth * sinTheta) / lambda;
        const delta = (Math.PI * slitSep * sinTheta) / lambda;
        const sinc = Math.abs(beta) < 1e-9 ? 1 : Math.sin(beta) / beta;
        const intensity = sinc * sinc * Math.cos(delta) * Math.cos(delta);

        ctx.globalAlpha = intensity * 0.9;
        ctx.fillStyle = color;
        ctx.fillRect(screenX, py, 40, 1);
      }
      ctx.globalAlpha = 1;

      // Screen label
      ctx.fillStyle = '#3a3a3a'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(screenX, 0); ctx.lineTo(screenX, H); ctx.stroke();
      ctx.fillStyle = '#4a4a4a'; ctx.font = '9px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('screen', screenX + 2, 12);

      // Incoming wave arrows
      ctx.strokeStyle = wavelengthToRGB(lambda); ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const ay = 40 + i * (H - 80) / 4;
        ctx.globalAlpha = 0.4;
        ctx.beginPath(); ctx.moveTo(sourceX, ay); ctx.lineTo(W / 2 - 8, ay); ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Fringe spacing annotation
      const fringePx = lambda / slitSep * L * 0.01 * 2;
      ctx.strokeStyle = '#6b6660'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(screenX + 2, cy); ctx.lineTo(screenX + 38, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(screenX + 2, cy - fringePx); ctx.lineTo(screenX + 38, cy - fringePx); ctx.stroke();
      ctx.setLineDash([]);

      // Stats
      ctx.fillStyle = '#cdc8be'; ctx.font = '10px system-ui'; ctx.textAlign = 'left';
      ctx.fillText(`λ = ${lambda} nm`, 10, 20);
      ctx.fillStyle = '#6b6660';
      ctx.fillText('y_m = mλL/d', 10, 34);

      // Central maxima label
      ctx.fillStyle = '#6b6660'; ctx.font = '9px system-ui'; ctx.textAlign = 'right';
      ctx.fillText('m=0', screenX - 3, cy + 4);
    }

    let id: number;
    function loop() { draw(); id = requestAnimationFrame(loop); }
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: 6, display: 'block' }} />
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { label: 'Wavelength λ', value: lambda, min: 380, max: 780, step: 10, display: `${lambda} nm`, set: setLambda },
          { label: 'Slit separation d', value: slitSep, min: 500, max: 8000, step: 100, display: `${(slitSep / 1000).toFixed(1)} μm`, set: setSlitSep },
          { label: 'Slit width a', value: slitWidth, min: 100, max: 2000, step: 100, display: `${(slitWidth / 1000).toFixed(2)} μm`, set: setSlitWidth },
        ].map(({ label, value, min, max, step, display, set }) => (
          <div key={label} className="rounded border p-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)', fontFamily: 'system-ui' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>
              <span>{label}</span><span style={{ color: 'var(--text)' }}>{display}</span>
            </div>
            <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(+e.target.value)} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: '0.4rem', fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', fontFamily: 'system-ui' }}>
        Closer slits → wider fringe spacing. Narrower slit width → broader single-slit envelope. Change λ to change fringe color.
      </div>
    </div>
  );
}
