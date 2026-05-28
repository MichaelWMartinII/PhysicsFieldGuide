'use client';

import { useRef, useEffect, useState } from 'react';

const W = 560, H = 360;

type Config = 'refraction' | 'lens' | 'mirror';

export default function RayOptics() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [config, setConfig] = useState<Config>('refraction');
  const [n2, setN2] = useState(1.5);
  const [angle, setAngle] = useState(40);
  const [focalLen, setFocalLen] = useState(80);
  const paramsRef = useRef({ config: 'refraction' as Config, n2: 1.5, angle: 40, focalLen: 80 });

  useEffect(() => { paramsRef.current = { config, n2, angle, focalLen }; }, [config, n2, angle, focalLen]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    function drawArrowLine(x1: number, y1: number, x2: number, y2: number, color: string, alpha = 1) {
      ctx.save(); ctx.globalAlpha = alpha;
      ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      const angle = Math.atan2(y2 - y1, x2 - x1);
      ctx.translate(x2, y2); ctx.rotate(angle);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-9, -4); ctx.lineTo(-9, 4); ctx.closePath(); ctx.fill();
      ctx.restore();
    }

    function drawRefraction(n2: number, incDeg: number) {
      const cx = W / 2, cy = H / 2;
      // Interface
      ctx.fillStyle = 'rgba(91,127,168,0.07)';
      ctx.fillRect(cx, 0, W - cx, H);
      ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 1; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
      ctx.setLineDash([]);

      // Labels
      ctx.fillStyle = '#5b7fa8'; ctx.font = '11px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('n₁ = 1.00 (air)', cx / 2, 25);
      ctx.fillText(`n₂ = ${n2.toFixed(2)} (medium)`, cx + (W - cx) / 2, 25);

      // Normal line
      ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(cx, cy - 120); ctx.lineTo(cx, cy + 120); ctx.stroke();
      ctx.setLineDash([]);

      const theta1 = incDeg * Math.PI / 180;
      const sinT2 = Math.sin(theta1) / n2;
      const totalInternal = sinT2 > 1;
      const theta2 = totalInternal ? 0 : Math.asin(sinT2);

      // Incident ray
      const incLen = 150;
      drawArrowLine(cx - incLen * Math.sin(theta1), cy - incLen * Math.cos(theta1), cx, cy, '#e87d3e');

      // Reflected ray
      drawArrowLine(cx, cy, cx - incLen * Math.sin(theta1), cy + incLen * Math.cos(theta1), '#9a7d2c', 0.5);

      // Refracted ray (or TIR label)
      if (!totalInternal) {
        const refLen = 150;
        drawArrowLine(cx, cy, cx + refLen * Math.sin(theta2), cy + refLen * Math.cos(theta2), '#5b7fa8');
      } else {
        ctx.fillStyle = '#a85b5b'; ctx.font = '11px system-ui'; ctx.textAlign = 'center';
        ctx.fillText('Total internal reflection', cx + 90, cy + 40);
      }

      // Angle labels
      ctx.fillStyle = '#e87d3e'; ctx.font = '10px system-ui'; ctx.textAlign = 'left';
      ctx.fillText(`θ₁ = ${incDeg}°`, cx - 130, cy - 50);
      if (!totalInternal) {
        ctx.fillStyle = '#5b7fa8';
        ctx.fillText(`θ₂ = ${(theta2 * 180 / Math.PI).toFixed(1)}°`, cx + 15, cy + 60);
      }

      // Snell's law
      ctx.fillStyle = '#6b6660'; ctx.font = '10px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('n₁ sin θ₁ = n₂ sin θ₂  (Snell\'s Law)', W / 2, H - 12);
    }

    function drawLens(f: number) {
      const cx = W / 2, cy = H / 2;

      // Optical axis
      ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(20, cy); ctx.lineTo(W - 20, cy); ctx.stroke();
      ctx.setLineDash([]);

      const converging = f > 0;

      // Lens symbol
      const lh = 110;
      ctx.strokeStyle = '#9a7d2c'; ctx.lineWidth = 2;
      if (converging) {
        ctx.beginPath();
        ctx.moveTo(cx - 3, cy - lh / 2);
        ctx.bezierCurveTo(cx + 20, cy - lh / 4, cx + 20, cy + lh / 4, cx - 3, cy + lh / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + 3, cy - lh / 2);
        ctx.bezierCurveTo(cx - 20, cy - lh / 4, cx - 20, cy + lh / 4, cx + 3, cy + lh / 2);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(cx - 3, cy - lh / 2);
        ctx.bezierCurveTo(cx - 20, cy - lh / 4, cx - 20, cy + lh / 4, cx - 3, cy + lh / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + 3, cy - lh / 2);
        ctx.bezierCurveTo(cx + 20, cy - lh / 4, cx + 20, cy + lh / 4, cx + 3, cy + lh / 2);
        ctx.stroke();
      }
      // Lens cap lines
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx - 3, cy - lh / 2); ctx.lineTo(cx + 3, cy - lh / 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - 3, cy + lh / 2); ctx.lineTo(cx + 3, cy + lh / 2); ctx.stroke();

      // Focal points
      const fp = cx + f, fm = cx - f;
      [fp, fm].forEach(fx => {
        ctx.beginPath(); ctx.arc(fx, cy, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#9a7d2c'; ctx.fill();
        ctx.fillStyle = '#9a7d2c'; ctx.font = '10px system-ui'; ctx.textAlign = 'center';
        ctx.fillText('F', fx, cy + 16);
      });
      ctx.fillStyle = '#6b6660'; ctx.font = '10px system-ui'; ctx.textAlign = 'left';
      ctx.fillText(`f = ${f > 0 ? '+' : ''}${f} px  (${f > 0 ? 'converging' : 'diverging'})`, 20, 22);

      // Object at 2x focal length
      const objX = cx - Math.abs(f) * 2;
      const objH = 60;
      drawArrowLine(objX, cy, objX, cy - objH, '#5b7fa8');
      ctx.fillStyle = '#5b7fa8'; ctx.font = '10px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('object', objX, cy - objH - 8);

      // Image via thin lens: 1/v = 1/f - 1/u  (sign convention: u negative if left)
      const u = objX - cx; // negative
      const v = 1 / (1 / f - 1 / u);
      const imgX = cx + v;
      const mag = -v / u;
      const imgH = objH * mag;

      if (imgX > 20 && imgX < W - 20) {
        const imgColor = v > 0 ? '#e87d3e' : '#a85b5b';
        drawArrowLine(imgX, cy, imgX, cy - imgH, imgColor);
        ctx.fillStyle = imgColor; ctx.font = '10px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(`image (m=${mag.toFixed(1)}×)`, imgX, cy - imgH - 8 * Math.sign(imgH) - 4);
      }

      // Principal rays
      // Ray 1: parallel to axis → through focal point
      ctx.strokeStyle = '#e87d3e'; ctx.lineWidth = 1.2; ctx.globalAlpha = 0.7;
      ctx.beginPath(); ctx.moveTo(objX, cy - objH); ctx.lineTo(cx, cy - objH);
      if (v > 0 && imgX > cx) {
        ctx.lineTo(imgX, cy - imgH);
      } else {
        ctx.lineTo(W - 20, cy - objH - (W - 20 - cx) * objH / f);
      }
      ctx.stroke();

      // Ray 2: through center → undeviated
      ctx.strokeStyle = '#3d7d5c';
      ctx.beginPath(); ctx.moveTo(objX, cy - objH); ctx.lineTo(W - 20, cy - objH * (W - 20 - objX) / (cx - objX) * (-1)); ctx.stroke();

      ctx.globalAlpha = 1;
    }

    function drawMirror(f: number) {
      const cx = 400, cy = H / 2;

      // Optical axis
      ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(20, cy); ctx.lineTo(cx + 20, cy); ctx.stroke();
      ctx.setLineDash([]);

      // Concave mirror
      ctx.strokeStyle = '#9a7d2c'; ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx + f * 2, cy, f * 2, Math.PI * 0.75, Math.PI * 1.25);
      ctx.stroke();

      // Center and focal point
      const fc = cx - f;
      ctx.beginPath(); ctx.arc(fc, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#9a7d2c'; ctx.fill();
      ctx.fillStyle = '#9a7d2c'; ctx.font = '10px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('F', fc, cy + 16);

      // Object
      const objX = cx - Math.abs(f) * 1.5;
      const objH = 55;
      drawArrowLine(objX, cy, objX, cy - objH, '#5b7fa8');
      ctx.fillStyle = '#5b7fa8'; ctx.font = '10px system-ui';
      ctx.fillText('object', objX, cy - objH - 8);

      // Mirror equation: 1/v + 1/u = 1/f  (all positive for concave, object left)
      const u = cx - objX;
      const v = 1 / (1 / f - 1 / u);
      const mag = -v / u;
      const imgX = cx - v;
      const imgH = objH * mag;

      if (imgX > 20 && imgX < cx) {
        drawArrowLine(imgX, cy, imgX, cy - imgH, '#e87d3e');
        ctx.fillStyle = '#e87d3e'; ctx.font = '10px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(`image (m=${mag.toFixed(1)}×)`, imgX, cy - imgH - 8);
      }

      ctx.fillStyle = '#6b6660'; ctx.font = '10px system-ui'; ctx.textAlign = 'left';
      ctx.fillText(`f = ${f} px  (concave mirror)`, 20, 22);
      ctx.fillText('1/do + 1/di = 1/f', 20, 38);
    }

    function draw() {
      const { config, n2, angle, focalLen } = paramsRef.current;
      ctx.fillStyle = '#0f0f0f'; ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;

      if (config === 'refraction') drawRefraction(n2, angle);
      else if (config === 'lens') drawLens(focalLen);
      else drawMirror(focalLen);
    }

    function loop() {
      draw();
      requestAnimationFrame(loop);
    }
    const id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  const tabStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: 'system-ui, sans-serif', fontSize: '0.78rem', padding: '0.3rem 0.8rem',
    background: active ? 'var(--surface3)' : 'var(--surface)',
    border: '1px solid var(--border2)', borderRadius: 4,
    color: active ? 'var(--text)' : 'var(--muted)', cursor: 'pointer',
  });

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: 6, display: 'block' }} />
      <div className="mt-3" style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <button style={tabStyle(config === 'refraction')} onClick={() => setConfig('refraction')}>Refraction</button>
        <button style={tabStyle(config === 'lens')} onClick={() => setConfig('lens')}>Thin lens</button>
        <button style={tabStyle(config === 'mirror')} onClick={() => setConfig('mirror')}>Mirror</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {config === 'refraction' && (
          <>
            <div className="rounded border p-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)', fontFamily: 'system-ui' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>
                <span>Incident angle θ₁</span><span style={{ color: 'var(--text)' }}>{angle}°</span>
              </div>
              <input type="range" min={5} max={85} step={1} value={angle} onChange={e => setAngle(+e.target.value)} />
            </div>
            <div className="rounded border p-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)', fontFamily: 'system-ui' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>
                <span>Index n₂</span><span style={{ color: 'var(--text)' }}>{n2.toFixed(2)}</span>
              </div>
              <input type="range" min={1.0} max={2.5} step={0.05} value={n2} onChange={e => setN2(+e.target.value)} />
            </div>
          </>
        )}
        {(config === 'lens' || config === 'mirror') && (
          <div className="rounded border p-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)', fontFamily: 'system-ui' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>
              <span>Focal length f</span><span style={{ color: 'var(--text)' }}>{focalLen > 0 ? '+' : ''}{focalLen} px</span>
            </div>
            <input type="range" min={40} max={150} step={10} value={focalLen} onChange={e => setFocalLen(+e.target.value)} />
          </div>
        )}
      </div>
      <div style={{ marginTop: '0.4rem', fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', fontFamily: 'system-ui' }}>
        {config === 'refraction' && 'Increase θ₁ past the critical angle to see total internal reflection. Increase n₂ to bend the ray more.'}
        {config === 'lens' && 'Object at 2f produces real, inverted, equal-size image at 2f on the other side.'}
        {config === 'mirror' && '1/do + 1/di = 1/f — move object inside F to get virtual, upright image behind mirror.'}
      </div>
    </div>
  );
}
