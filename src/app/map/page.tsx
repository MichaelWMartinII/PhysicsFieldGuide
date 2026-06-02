'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { roadmap, type RoadmapTrack } from '@/lib/roadmap';

type SimNode = {
  id: string;
  label: string;
  track: string;
  color: string;
  href?: string;
  built: boolean;
  description: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type SimEdge = { from: string; to: string };

const SECTION_CENTERS: Record<string, { x: number; y: number }> = {
  math:      { x: 175, y: 430 },
  mechanics: { x: 460, y: 200 },
  waves:     { x: 760, y: 200 },
  em:        { x: 390, y: 660 },
  thermo:    { x: 720, y: 660 },
  optics:    { x: 1050, y: 490 },
  modern:    { x: 1060, y: 250 },
};

function seededRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = Math.imul(1664525, s) + 1013904223 >>> 0;
    return s / 0x100000000;
  };
}

function computeLayout(tracks: RoadmapTrack[]): { nodes: SimNode[]; edges: SimEdge[] } {
  const rng = seededRng(7);
  const nodes: SimNode[] = [];
  const edges: SimEdge[] = [];
  const nodeSet = new Set<string>();

  for (const track of tracks) {
    const center = SECTION_CENTERS[track.id] ?? { x: 600, y: 430 };
    for (const topic of track.topics) {
      nodes.push({
        id: topic.id,
        label: topic.title,
        track: track.id,
        color: track.color,
        href: topic.href,
        built: topic.built ?? false,
        description: topic.description,
        x: center.x + (rng() - 0.5) * 130,
        y: center.y + (rng() - 0.5) * 130,
        vx: 0,
        vy: 0,
      });
      nodeSet.add(topic.id);
    }
    for (const topic of track.topics) {
      for (const prereq of topic.prereqs ?? []) {
        if (nodeSet.has(prereq)) {
          edges.push({ from: prereq, to: topic.id });
        }
      }
    }
  }

  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

  for (let iter = 0; iter < 280; iter++) {
    const alpha = 1 - iter / 280;

    // Repulsion
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        const na = nodes[a], nb = nodes[b];
        const dx = nb.x - na.x || 0.01;
        const dy = nb.y - na.y || 0.01;
        const d2 = dx * dx + dy * dy + 1;
        const rep = 3200 / d2;
        const d = Math.sqrt(d2);
        na.vx -= rep * dx / d;
        na.vy -= rep * dy / d;
        nb.vx += rep * dx / d;
        nb.vy += rep * dy / d;
      }
    }

    // Spring edges (target 85px)
    for (const e of edges) {
      const na = nodeMap[e.from], nb = nodeMap[e.to];
      if (!na || !nb) continue;
      const dx = nb.x - na.x;
      const dy = nb.y - na.y;
      const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
      const spring = (d - 85) * 0.009;
      na.vx += spring * dx / d;
      na.vy += spring * dy / d;
      nb.vx -= spring * dx / d;
      nb.vy -= spring * dy / d;
    }

    // Cluster gravity
    for (const n of nodes) {
      const c = SECTION_CENTERS[n.track] ?? { x: 600, y: 430 };
      n.vx += (c.x - n.x) * 0.065;
      n.vy += (c.y - n.y) * 0.065;
    }

    // Integrate + damp
    for (const n of nodes) {
      n.x = Math.max(30, Math.min(1270, n.x + n.vx * alpha));
      n.y = Math.max(30, Math.min(870, n.y + n.vy * alpha));
      n.vx *= 0.84;
      n.vy *= 0.84;
    }
  }

  return { nodes, edges };
}

function cubicPath(ax: number, ay: number, bx: number, by: number): string {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const dx = bx - ax, dy = by - ay;
  const px = -dy * 0.18, py = dx * 0.18;
  return `M${ax},${ay} Q${mx + px},${my + py} ${bx},${by}`;
}

export default function MapPage() {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; node: SimNode } | null>(null);

  const { nodes, edges } = useMemo(() => computeLayout(roadmap), []);
  const nodeMap = useMemo(() => Object.fromEntries(nodes.map(n => [n.id, n])), [nodes]);

  const { prereqIds, dependentIds } = useMemo(() => {
    if (!hoveredId) return { prereqIds: new Set<string>(), dependentIds: new Set<string>() };
    const prereqIds = new Set<string>();
    const dependentIds = new Set<string>();
    for (const e of edges) {
      if (e.to === hoveredId) prereqIds.add(e.from);
      if (e.from === hoveredId) dependentIds.add(e.to);
    }
    return { prereqIds, dependentIds };
  }, [hoveredId, edges]);

  function edgeColor(e: SimEdge): string {
    if (!hoveredId) return 'rgba(80,80,80,0.35)';
    if ((e.to === hoveredId && prereqIds.has(e.from)) || (e.from === hoveredId && dependentIds.has(e.to))) {
      return e.to === hoveredId ? '#b86f4b' : '#3d7a6b';
    }
    return 'rgba(60,60,60,0.15)';
  }

  function edgeWidth(e: SimEdge): number {
    if (!hoveredId) return 1;
    if (e.to === hoveredId || e.from === hoveredId) return 1.8;
    return 0.6;
  }

  function nodeOpacity(n: SimNode): number {
    if (!hoveredId) return n.built ? 1 : 0.35;
    if (n.id === hoveredId) return 1;
    if (prereqIds.has(n.id) || dependentIds.has(n.id)) return 1;
    return 0.2;
  }

  function nodeRadius(n: SimNode): number {
    if (n.id === hoveredId) return 10;
    if (prereqIds.has(n.id) || dependentIds.has(n.id)) return 8;
    return n.built ? 6.5 : 5;
  }

  const LABELS: Record<string, string> = {
    math: 'Mathematics', mechanics: 'Mechanics', waves: 'Waves & Oscillations',
    em: 'Electromagnetism', thermo: 'Thermodynamics & Stat Mech',
    optics: 'Optics & Photonics', modern: 'Modern Physics',
  };

  const trackColors = Object.fromEntries(roadmap.map(t => [t.id, t.color]));

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1.5rem 2rem 0.75rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.3rem' }}>
          PhysicsLab
        </div>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-heading)', fontFamily: 'Georgia, serif' }}>
          Physics Concept Map
        </h1>
        <p style={{ margin: '0.3rem 0 0', fontSize: '0.82rem', color: 'var(--muted)', fontFamily: 'system-ui, sans-serif' }}>
          Hover a node to see prerequisites <span style={{ color: '#b86f4b' }}>●</span> and dependents <span style={{ color: '#3d7a6b' }}>●</span> &nbsp;·&nbsp; Click to open chapter &nbsp;·&nbsp; Dimmed nodes are planned but not yet built
        </p>
      </div>

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <svg
          viewBox="0 0 1300 900"
          style={{ width: '100%', height: 'calc(100vh - 90px)', display: 'block' }}
          onMouseLeave={() => { setHoveredId(null); setTooltip(null); }}
        >
          {/* Section labels */}
          {Object.entries(SECTION_CENTERS).map(([id, c]) => (
            <text
              key={id}
              x={c.x}
              y={c.y}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fill: trackColors[id] ?? '#888',
                opacity: 0.25,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {LABELS[id]}
            </text>
          ))}

          {/* Edges */}
          {edges.map((e, i) => {
            const na = nodeMap[e.from], nb = nodeMap[e.to];
            if (!na || !nb) return null;
            return (
              <path
                key={i}
                d={cubicPath(na.x, na.y, nb.x, nb.y)}
                fill="none"
                stroke={edgeColor(e)}
                strokeWidth={edgeWidth(e)}
                strokeLinecap="round"
                style={{ transition: 'stroke 0.15s, stroke-width 0.15s' }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map(n => (
            <g
              key={n.id}
              transform={`translate(${n.x},${n.y})`}
              style={{ cursor: n.href ? 'pointer' : 'default', opacity: nodeOpacity(n), transition: 'opacity 0.15s' }}
              onMouseEnter={(ev) => {
                setHoveredId(n.id);
                const rect = (ev.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                const svgW = 1300, svgH = 900;
                const scaleX = rect.width / svgW;
                const scaleY = rect.height / svgH;
                setTooltip({
                  x: rect.left + n.x * scaleX,
                  y: rect.top + n.y * scaleY,
                  node: n,
                });
              }}
              onMouseLeave={() => { setHoveredId(null); setTooltip(null); }}
              onClick={() => { if (n.href) router.push(n.href); }}
            >
              <circle
                r={nodeRadius(n)}
                fill={n.color}
                stroke={n.id === hoveredId ? 'white' : 'transparent'}
                strokeWidth={1.5}
                style={{ transition: 'r 0.12s' }}
              />
              {n.built && (
                <text
                  x={9}
                  y={0}
                  dominantBaseline="middle"
                  style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: n.id === hoveredId ? 11 : 9,
                    fill: n.id === hoveredId ? 'var(--text-heading)' : 'var(--text)',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    transition: 'font-size 0.12s',
                  }}
                >
                  {n.label}
                </text>
              )}
            </g>
          ))}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            style={{
              position: 'fixed',
              left: tooltip.x + 14,
              top: tooltip.y - 12,
              background: 'var(--surface2)',
              border: '1px solid var(--border2)',
              borderLeft: `3px solid ${tooltip.node.color}`,
              borderRadius: '0 6px 6px 0',
              padding: '0.55rem 0.8rem',
              maxWidth: 240,
              pointerEvents: 'none',
              zIndex: 50,
              boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
            }}
          >
            <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: tooltip.node.color, marginBottom: '0.2rem' }}>
              {tooltip.node.label}
            </div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.79rem', color: 'var(--text)', lineHeight: 1.5 }}>
              {tooltip.node.description}
            </div>
            {!tooltip.node.built && (
              <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.68rem', color: 'var(--muted)', marginTop: '0.35rem' }}>
                Chapter not yet built
              </div>
            )}
            {tooltip.node.built && tooltip.node.href && (
              <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.68rem', color: 'var(--muted)', marginTop: '0.35rem' }}>
                Click to open →
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
