'use client';

import { useState } from 'react';
import Link from 'next/link';
import { constants, CATEGORY_LABELS, CATEGORY_COLORS, type ConstantCategory } from '@/lib/constants';

const ALL = 'all';
type Filter = ConstantCategory | typeof ALL;

const CATEGORY_ORDER: ConstantCategory[] = ['mechanics', 'em', 'quantum', 'atomic', 'thermo', 'cosmology'];

export default function ConstantsPage() {
  const [filter, setFilter] = useState<Filter>(ALL);

  const visible = filter === ALL ? constants : constants.filter(c => c.category === filter);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{ padding: '2rem 2rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.3rem' }}>
          Reference
        </div>
        <h1 style={{ margin: '0 0 0.4rem', fontSize: '1.7rem', fontWeight: 700, color: 'var(--text-heading)', fontFamily: 'Georgia, serif' }}>
          Physical Constants
        </h1>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', fontFamily: 'system-ui, sans-serif', maxWidth: '56ch', lineHeight: 1.5 }}>
          CODATA 2018 recommended values. Constants marked <em>exact</em> were fixed by the 2019 SI redefinition.
        </p>

        {/* Category filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1rem' }}>
          <FilterButton label="All" active={filter === ALL} color="#888" onClick={() => setFilter(ALL)} />
          {CATEGORY_ORDER.map(cat => (
            <FilterButton
              key={cat}
              label={CATEGORY_LABELS[cat]}
              active={filter === cat}
              color={CATEGORY_COLORS[cat]}
              onClick={() => setFilter(cat)}
            />
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: '1.5rem 1.75rem 3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
        {visible.map(c => (
          <ConstantCard key={c.symbol} constant={c} />
        ))}
      </div>
    </div>
  );
}

function FilterButton({ label, active, color, onClick }: { label: string; active: boolean; color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.3rem 0.75rem',
        borderRadius: '20px',
        border: `1px solid ${active ? color : 'var(--border)'}`,
        background: active ? `${color}22` : 'transparent',
        color: active ? color : 'var(--muted)',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '0.74rem',
        fontWeight: active ? 700 : 400,
        cursor: 'pointer',
        transition: 'all 0.12s',
        letterSpacing: '0.02em',
      }}
    >
      {label}
    </button>
  );
}

function ConstantCard({ constant: c }: { constant: (typeof constants)[0] }) {
  const color = CATEGORY_COLORS[c.category];
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderLeft: `3px solid ${color}`,
      borderRadius: '0 8px 8px 0',
      padding: '1.1rem 1.15rem 1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
    }}>
      {/* Category label */}
      <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color, marginBottom: '0.6rem' }}>
        {CATEGORY_LABELS[c.category]}
      </div>

      {/* Symbol + name */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem', marginBottom: '0.2rem' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.9rem', fontWeight: 700, color, lineHeight: 1 }}>
          {c.symbol}
        </span>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.95rem', color: 'var(--text-heading)', lineHeight: 1.3 }}>
          {c.name}
        </span>
      </div>

      {/* Value */}
      <div style={{ fontFamily: 'monospace', fontSize: '0.88rem', color: 'var(--text-strong)', marginBottom: '0.08rem', letterSpacing: '0.01em' }}>
        {c.value}
        {c.units !== 'dimensionless' && (
          <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.78rem', color: 'var(--muted)', marginLeft: '0.35rem' }}>
            {c.units}
          </span>
        )}
      </div>

      {/* Uncertainty */}
      <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.7rem', color: 'var(--muted)', marginBottom: '0.9rem' }}>
        uncertainty: {c.uncertainty}
      </div>

      {/* Story */}
      <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.84rem', color: 'var(--text)', lineHeight: 1.7, margin: 0, marginBottom: c.related && c.related.length > 0 ? '0.9rem' : 0 }}>
        {c.story}
      </p>

      {/* Related links */}
      {c.related && c.related.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: 'auto', paddingTop: '0.1rem' }}>
          {c.related.map(href => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '0.68rem',
                color,
                textDecoration: 'none',
                border: `1px solid ${color}44`,
                borderRadius: '4px',
                padding: '0.15rem 0.4rem',
                background: `${color}11`,
                transition: 'background 0.1s',
              }}
            >
              {labelForHref(href)} →
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function labelForHref(href: string): string {
  const parts = href.split('/').filter(Boolean);
  const last = parts[parts.length - 1] ?? '';
  return last.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}
