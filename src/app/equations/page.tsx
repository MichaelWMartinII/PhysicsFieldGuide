'use client';

import { useState, useMemo } from 'react';
import { equations, SECTION_ORDER, type PhysicsEquation } from '@/lib/equations';
import { InlineMath } from '@/components/textbook/Equation';

const SECTION_LABELS: Record<string, string> = {
  math:      'Mathematics',
  mechanics: 'Classical Mechanics',
  waves:     'Waves & Oscillations',
  thermo:    'Thermodynamics',
  em:        'Electromagnetism',
  optics:    'Optics',
  modern:    'Modern Physics',
};

const SECTION_COLORS: Record<string, string> = {
  math:      '#06b6d4',
  mechanics: '#3b82f6',
  waves:     '#10b981',
  thermo:    '#f97316',
  em:        '#a855f7',
  optics:    '#eab308',
  modern:    '#ec4899',
};

export default function EquationsPage() {
  const [query, setQuery] = useState('');
  const [sectionFilter, setSectionFilter] = useState<string>('all');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return equations.filter(eq => {
      const matchesSection = sectionFilter === 'all' || eq.sectionId === sectionFilter;
      if (!matchesSection) return false;
      if (!q) return true;
      return (
        eq.name.toLowerCase().includes(q) ||
        eq.description.toLowerCase().includes(q) ||
        (eq.tags ?? []).some(t => t.includes(q))
      );
    });
  }, [query, sectionFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, PhysicsEquation[]>();
    for (const eq of results) {
      if (!map.has(eq.sectionId)) map.set(eq.sectionId, []);
      map.get(eq.sectionId)!.push(eq);
    }
    return SECTION_ORDER.flatMap(id => {
      const eqs = map.get(id);
      return eqs ? [{ id, eqs }] : [];
    });
  }, [results]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{ padding: '2rem 2rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.3rem' }}>
          Reference
        </div>
        <h1 style={{ margin: '0 0 0.4rem', fontSize: '1.7rem', fontWeight: 700, color: 'var(--text-heading)', fontFamily: 'Georgia, serif' }}>
          Equation Sheet
        </h1>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', fontFamily: 'system-ui, sans-serif' }}>
          Key equations from every chapter — searchable and grouped by subject.
        </p>

        {/* Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginTop: '1rem', alignItems: 'center' }}>
          <input
            type="search"
            placeholder="Search equations…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '0.85rem',
              padding: '0.45rem 0.8rem',
              borderRadius: '6px',
              border: '1px solid var(--border2)',
              background: 'var(--surface2)',
              color: 'var(--text)',
              outline: 'none',
              width: '220px',
            }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            <SectionChip id="all" label="All" active={sectionFilter === 'all'} color="#888" onClick={() => setSectionFilter('all')} />
            {SECTION_ORDER.map(id => (
              <SectionChip
                key={id}
                id={id}
                label={SECTION_LABELS[id]}
                active={sectionFilter === id}
                color={SECTION_COLORS[id]}
                onClick={() => setSectionFilter(id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Equation list */}
      <div style={{ padding: '1.5rem 2rem 3rem' }}>
        {grouped.length === 0 && (
          <p style={{ fontFamily: 'Georgia, serif', color: 'var(--muted)', fontStyle: 'italic', marginTop: '2rem' }}>
            No equations match your search.
          </p>
        )}
        {grouped.map(({ id, eqs }) => (
          <section key={id} style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: SECTION_COLORS[id],
              marginBottom: '0.75rem',
              paddingBottom: '0.4rem',
              borderBottom: `1px solid ${SECTION_COLORS[id]}33`,
            }}>
              {SECTION_LABELS[id]}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '0.65rem' }}>
              {eqs.map(eq => <EquationCard key={eq.id} eq={eq} />)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function EquationCard({ eq }: { eq: PhysicsEquation }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '6px',
      padding: '0.85rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    }}>
      <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-heading)' }}>
        {eq.name}
      </div>
      <div style={{
        background: 'var(--surface2)',
        borderRadius: '4px',
        padding: '0.6rem 0.75rem',
        textAlign: 'center',
        overflowX: 'auto',
      }}>
        <InlineMath latex={eq.latex} />
      </div>
      <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.79rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        {eq.description}
      </div>
    </div>
  );
}

function SectionChip({ id, label, active, color, onClick }: { id: string; label: string; active: boolean; color: string; onClick: () => void }) {
  void id;
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.25rem 0.65rem',
        borderRadius: '20px',
        border: `1px solid ${active ? color : 'var(--border)'}`,
        background: active ? `${color}22` : 'transparent',
        color: active ? color : 'var(--muted)',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '0.72rem',
        fontWeight: active ? 700 : 400,
        cursor: 'pointer',
        transition: 'all 0.12s',
      }}
    >
      {label}
    </button>
  );
}
