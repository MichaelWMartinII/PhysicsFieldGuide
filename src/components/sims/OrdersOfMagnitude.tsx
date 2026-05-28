'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

const W = 700, H = 420;

// [log10(size in meters), label, sublabel]
const OBJECTS: [number, string, string][] = [
  [-35,  'Planck length',       '~1.6×10⁻³⁵ m — the smallest meaningful length'],
  [-18,  'Quark',               '< 10⁻¹⁸ m — no known substructure'],
  [-15,  'Proton',              '~10⁻¹⁵ m (1 fm)'],
  [-14,  'Atomic nucleus',      '~1–10 fm'],
  [-10,  'Hydrogen atom',       '~1 Å = 10⁻¹⁰ m'],
  [-9,   'DNA double helix',    '~2 nm diameter'],
  [-8,   'Cell membrane',       '~10 nm thick'],
  [-6,   'Bacterium',           '~1 μm'],
  [-5,   'Red blood cell',      '~8 μm'],
  [-4,   'Human hair',          '~100 μm diameter'],
  [-3,   'Ant',                 '~1 mm'],
  [-1,   'Human hand',          '~10 cm'],
  [0,    'Human body',          '~1–2 m'],
  [2,    'Football field',      '~100 m'],
  [3,    'Mountain',            '~1–10 km'],
  [4,    'City',                '~10–100 km across'],
  [7,    'Earth diameter',      '~1.3×10⁷ m'],
  [8,    'Moon–Earth distance', '~3.8×10⁸ m'],
  [11,   'Earth–Sun distance',  '1 AU = 1.5×10¹¹ m'],
  [13,   'Solar system radius', '~100 AU = 1.5×10¹³ m'],
  [16,   'Nearest star',        'α Centauri ~4 ly = 3.8×10¹⁶ m'],
  [20,   'Milky Way diameter',  '~10⁵ ly = 10²¹ m'],
  [22,   'Andromeda Galaxy',    '~2.5 Mly away'],
  [26,   'Observable universe', '~9.3×10²⁶ m = 93 billion ly'],
];

const LOG_MIN = -36, LOG_MAX = 27;

export default function OrdersOfMagnitude() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [logPos, setLogPos] = useState(-1.0); // current log10 position
  const isDragging = useRef(false);
  const lastY = useRef(0);

  const draw = useCallback((log: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0f0f0f';
    ctx.fillRect(0, 0, W, H);

    // Visible window: ±4 decades around logPos
    const span = 8;
    const logLo = log - span / 2;
    const logHi = log + span / 2;

    function toX(l: number) { return ((l - logLo) / (logHi - logLo)) * W; }

    // Decade ticks
    for (let l = Math.floor(logLo) - 1; l <= Math.ceil(logHi) + 1; l++) {
      const x = toX(l);
      if (x < -20 || x > W + 20) continue;

      // Subtle sub-decade markers
      for (let s = 1; s < 10; s++) {
        const xs = toX(l + Math.log10(s));
        if (xs < 0 || xs > W) continue;
        ctx.beginPath(); ctx.moveTo(xs, H * 0.55); ctx.lineTo(xs, H * 0.62);
        ctx.strokeStyle = '#222'; ctx.lineWidth = 1; ctx.stroke();
      }

      // Decade line
      ctx.beginPath(); ctx.moveTo(x, H * 0.45); ctx.lineTo(x, H * 0.72);
      ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 1.5; ctx.stroke();

      // Label
      if (x >= -10 && x <= W + 10) {
        ctx.font = '11px system-ui, sans-serif';
        ctx.fillStyle = '#3a3a3a';
        ctx.textAlign = 'center';
        const exp = l;
        if (exp === 0) ctx.fillText('1 m', x, H * 0.72 + 16);
        else ctx.fillText(`10${exp < 0 ? exp : '+' + exp}`, x, H * 0.72 + 16);
      }
    }

    // Central axis line
    ctx.beginPath(); ctx.moveTo(0, H * 0.585); ctx.lineTo(W, H * 0.585);
    ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 1; ctx.stroke();

    // Object markers
    for (const [l, name, desc] of OBJECTS) {
      if (l < logLo - 0.5 || l > logHi + 0.5) continue;
      const x = toX(l);
      const prominence = 1 - Math.abs(l - log) / (span / 2);
      if (prominence < 0) continue;
      const alpha = Math.min(1, prominence * 2);

      // Dot
      const r = 4 + prominence * 6;
      ctx.beginPath(); ctx.arc(x, H * 0.585, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(91, 127, 168, ${alpha})`;
      ctx.fill();

      // Name above
      ctx.font = `${Math.round(11 + prominence * 3)}px system-ui, sans-serif`;
      ctx.fillStyle = `rgba(200, 195, 188, ${alpha})`;
      ctx.textAlign = 'center';
      const nameY = H * 0.585 - r - 12 - prominence * 8;
      ctx.fillText(name, x, nameY);

      // Description below (only when close)
      if (prominence > 0.6) {
        ctx.font = `10px system-ui, sans-serif`;
        ctx.fillStyle = `rgba(107, 102, 96, ${(prominence - 0.6) * 2.5})`;
        ctx.fillText(desc, x, H * 0.585 + r + 18);
      }
    }

    // Center reticle
    ctx.beginPath(); ctx.moveTo(W / 2, H * 0.4); ctx.lineTo(W / 2, H * 0.77);
    ctx.strokeStyle = 'rgba(154, 125, 44, 0.5)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]); ctx.stroke();
    ctx.setLineDash([]);

    // Current position readout
    const curLog = log;
    let unitStr: string;
    if (curLog >= 3) unitStr = `10${Math.round(curLog - 3) !== 0 ? (Math.round(curLog) - 3) : ''} km`;
    else if (curLog >= 0) unitStr = `${(10 ** curLog).toFixed(curLog < 1 ? 1 : 0)} m`;
    else if (curLog >= -2) unitStr = `${(10 ** (curLog + 2)).toFixed(1)} cm`;
    else if (curLog >= -3) unitStr = `${(10 ** (curLog + 3)).toFixed(1)} mm`;
    else if (curLog >= -6) unitStr = `${(10 ** (curLog + 6)).toFixed(curLog < -5 ? 2 : 1)} μm`;
    else if (curLog >= -9) unitStr = `${(10 ** (curLog + 9)).toFixed(1)} nm`;
    else if (curLog >= -12) unitStr = `${(10 ** (curLog + 12)).toFixed(1)} pm`;
    else if (curLog >= -15) unitStr = `${(10 ** (curLog + 15)).toFixed(1)} fm`;
    else unitStr = `10^${curLog.toFixed(1)} m`;

    ctx.font = '13px system-ui, sans-serif';
    ctx.fillStyle = '#9a7d2c';
    ctx.textAlign = 'center';
    ctx.fillText(`▸ ${unitStr}`, W / 2, H * 0.77 + 20);

    ctx.font = '11px system-ui, sans-serif';
    ctx.fillStyle = '#2a2a2a';
    ctx.textAlign = 'left';
    ctx.fillText('← drag left/right to travel through scales →', 12, H - 10);
    ctx.textAlign = 'left';
  }, []);

  useEffect(() => { draw(logPos); }, [logPos, draw]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    function onMouseDown(e: MouseEvent) { isDragging.current = true; lastY.current = e.clientX; }
    function onMouseMove(e: MouseEvent) {
      if (!isDragging.current) return;
      const dx = e.clientX - lastY.current;
      lastY.current = e.clientX;
      setLogPos(p => Math.max(LOG_MIN + 4, Math.min(LOG_MAX - 4, p - dx * 0.04)));
    }
    function onMouseUp() { isDragging.current = false; }
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      setLogPos(p => Math.max(LOG_MIN + 4, Math.min(LOG_MAX - 4, p + e.deltaY * 0.005)));
    }
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: 6, display: 'block', cursor: 'ew-resize' }} />
      <div style={{ marginTop: '0.5rem' }}>
        <input type="range" min={LOG_MIN + 4} max={LOG_MAX - 4} step={0.1} value={logPos}
          onChange={e => setLogPos(+e.target.value)} style={{ width: '100%' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'system-ui, sans-serif', fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
          <span>10⁻³² m (near Planck)</span>
          <span>10²³ m (near universe scale)</span>
        </div>
      </div>
    </div>
  );
}
