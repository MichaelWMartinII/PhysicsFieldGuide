'use client';

import { useRef, useEffect, useState } from 'react';

const W = 560, H = 320;

const SERIES = [
  { name: 'Lyman', nf: 1, color: '#7b68ee', region: 'UV' },
  { name: 'Balmer', nf: 2, color: '#5b7fa8', region: 'Visible' },
  { name: 'Paschen', nf: 3, color: '#9a7d2c', region: 'IR' },
];

function wavelength(ni: number, nf: number): number {
  const Rh = 1.097e7;
  const inv = Rh * (1 / (nf * nf) - 1 / (ni * ni));
  return 1e9 / inv; // nm
}

function nmToRGB(nm: number): string {
  if (nm < 380) return `rgba(130,0,200,0.7)`;
  if (nm < 440) return `rgba(${Math.round(130 + (440-nm)/60*0)},0,${Math.round(200+(nm-380)/60*55)},0.9)`;
  if (nm < 490) return `rgba(0,${Math.round((nm-440)/50*200)},255,0.9)`;
  if (nm < 510) return `rgba(0,255,${Math.round(255-(nm-490)/20*255)},0.9)`;
  if (nm < 580) return `rgba(${Math.round((nm-510)/70*255)},255,0,0.9)`;
  if (nm < 645) return `rgba(255,${Math.round(255-(nm-580)/65*255)},0,0.9)`;
  if (nm <= 780) return `rgba(255,0,0,${0.4+0.6*(780-nm)/135})`;
  return `rgba(150,0,0,0.3)`;
}

export default function HydrogenSpectrum() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [series, setSeries] = useState(1); // 0=Lyman,1=Balmer,2=Paschen
  const [transition, setTransition] = useState<{ ni: number; nf: number } | null>(null);
  const paramsRef = useRef({ series: 1, transition: null as { ni: number; nf: number } | null });

  useEffect(() => { paramsRef.current = { series, transition }; }, [series, transition]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    function draw() {
      const { series: serIdx, transition } = paramsRef.current;
      ctx.fillStyle = '#0f0f0f';
      ctx.fillRect(0, 0, W, H);

      const ser = SERIES[serIdx];
      const nf = ser.nf;

      // Energy level diagram (left side)
      const levW = 200, levH = 220, levX = 20, levY = 50;
      const maxN = 7;
      const E1 = -13.6;

      function levelY(n: number): number {
        const E = E1 / (n * n);
        const Emin = E1;
        const Emax = 0;
        return levY + levH - ((E - Emin) / (Emax - Emin)) * levH;
      }

      // Draw levels
      for (let n = 1; n <= maxN; n++) {
        const ly = levelY(n);
        const isNf = n === nf;
        const isNi = transition && n === transition.ni;
        ctx.strokeStyle = isNf ? ser.color : isNi ? '#3d7d5c' : '#2a2a2a';
        ctx.lineWidth = isNf || isNi ? 2 : 1;
        ctx.beginPath(); ctx.moveTo(levX, ly); ctx.lineTo(levX + levW, ly); ctx.stroke();
        ctx.fillStyle = isNf ? ser.color : '#4a4a4a';
        ctx.font = `${isNf ? 'bold ' : ''}9px system-ui`; ctx.textAlign = 'right';
        ctx.fillText(`n=${n}  ${(E1/(n*n)).toFixed(2)}eV`, levX - 3, ly + 3);
      }

      // Continuum
      ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 1; ctx.setLineDash([2, 4]);
      ctx.beginPath(); ctx.moveTo(levX, levY); ctx.lineTo(levX + levW, levY); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#3a3a3a'; ctx.font = '9px system-ui'; ctx.textAlign = 'right';
      ctx.fillText('∞  0 eV', levX - 3, levY + 3);

      // Draw transition arrows for this series
      for (let ni = nf + 1; ni <= maxN; ni++) {
        const ly1 = levelY(nf);
        const ly2 = levelY(ni);
        const midX = levX + levW / 2 + (ni - nf - 1) * 14;
        const isActive = transition && transition.ni === ni;

        ctx.strokeStyle = isActive ? ser.color : '#2a4a6a';
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(midX, ly2); ctx.lineTo(midX, ly1 + 4); ctx.stroke();
        // Arrow head
        ctx.beginPath();
        ctx.moveTo(midX, ly1 + 4);
        ctx.lineTo(midX - 4, ly1 + 12); ctx.lineTo(midX + 4, ly1 + 12);
        ctx.closePath();
        ctx.fillStyle = isActive ? ser.color : '#2a4a6a'; ctx.fill();
      }

      // Title
      ctx.fillStyle = ser.color; ctx.font = 'bold 11px system-ui'; ctx.textAlign = 'left';
      ctx.fillText(`${ser.name} Series (n → ${nf})  [${ser.region}]`, levX, 18);

      // Spectrum bar (right side)
      const specX = levX + levW + 25;
      const specW = W - specX - 15;
      const specY = 50;
      const specH = 60;

      // Wavelength range
      const lambdaMin = 80, lambdaMax = 1000;

      // Draw spectrum background
      ctx.fillStyle = '#111'; ctx.fillRect(specX, specY, specW, specH);

      // Color gradient for visible range
      const grad = ctx.createLinearGradient(specX + (380-lambdaMin)/(lambdaMax-lambdaMin)*specW, 0,
        specX + (780-lambdaMin)/(lambdaMax-lambdaMin)*specW, 0);
      const visColors = [[380,'#7b00ff'],[440,'#0000ff'],[490,'#00aaff'],[510,'#00ff00'],[580,'#ffff00'],[645,'#ff4400'],[780,'#ff0000']];
      visColors.forEach(([nm, col]) => {
        grad.addColorStop((+nm-380)/(780-380), col as string);
      });
      ctx.fillStyle = grad;
      ctx.fillRect(specX + (380-lambdaMin)/(lambdaMax-lambdaMin)*specW, specY,
        (780-380)/(lambdaMax-lambdaMin)*specW, specH);

      // Region labels
      ctx.fillStyle = '#333'; ctx.font = '8px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('UV', specX + (150-lambdaMin)/(lambdaMax-lambdaMin)*specW, specY + specH/2 + 4);
      ctx.fillText('Visible', specX + (580-lambdaMin)/(lambdaMax-lambdaMin)*specW, specY + specH/2 + 4);
      ctx.fillText('IR', specX + (900-lambdaMin)/(lambdaMax-lambdaMin)*specW, specY + specH/2 + 4);

      // Spectral lines
      for (let ni = nf + 1; ni <= 15; ni++) {
        const lam = wavelength(ni, nf);
        if (lam < lambdaMin || lam > lambdaMax) continue;
        const sx = specX + (lam - lambdaMin) / (lambdaMax - lambdaMin) * specW;
        const isActive = transition && transition.ni === ni;

        ctx.strokeStyle = nmToRGB(lam);
        ctx.lineWidth = isActive ? 3 : 1.5;
        ctx.globalAlpha = isActive ? 1 : 0.8;
        ctx.beginPath(); ctx.moveTo(sx, specY); ctx.lineTo(sx, specY + specH); ctx.stroke();
        ctx.globalAlpha = 1;

        if (ni <= nf + 6 || isActive) {
          ctx.fillStyle = isActive ? '#e8e3d8' : '#6b6660';
          ctx.font = `${isActive ? 'bold ' : ''}8px system-ui`; ctx.textAlign = 'center';
          ctx.fillText(`${ni}→${nf}`, sx, specY + specH + 12);
          ctx.fillText(`${Math.round(lam)}nm`, sx, specY + specH + 22);
        }
      }

      // Axis ticks
      for (const nm of [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]) {
        if (nm < lambdaMin || nm > lambdaMax) continue;
        const sx = specX + (nm - lambdaMin) / (lambdaMax - lambdaMin) * specW;
        ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(sx, specY - 5); ctx.lineTo(sx, specY); ctx.stroke();
        ctx.fillStyle = '#4a4a4a'; ctx.font = '8px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(`${nm}`, sx, specY - 7);
      }
      ctx.fillStyle = '#4a4a4a'; ctx.font = '9px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('Wavelength (nm)', specX + specW / 2, specY - 18);
    }

    let id: number;
    function loop() { draw(); id = requestAnimationFrame(loop); }
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  const tabStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: 'system-ui', fontSize: '0.78rem', padding: '0.3rem 0.8rem',
    background: active ? 'var(--surface3)' : 'var(--surface)',
    border: '1px solid var(--border2)', borderRadius: 4,
    color: active ? 'var(--text)' : 'var(--muted)', cursor: 'pointer',
  });

  const nf = SERIES[series].nf;
  const transitions = Array.from({ length: 6 }, (_, i) => nf + 1 + i);

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: 6, display: 'block' }} />
      <div className="mt-3" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {SERIES.map((s, i) => (
            <button key={s.name} style={tabStyle(series === i)} onClick={() => { setSeries(i); setTransition(null); }}>{s.name}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontFamily: 'system-ui', fontSize: '0.8rem', color: 'var(--muted)' }}>
          <span>highlight:</span>
          {transitions.map(ni => (
            <button key={ni} style={tabStyle(transition?.ni === ni)} onClick={() => setTransition(t => t?.ni === ni ? null : { ni, nf })}>{ni}→{nf}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
