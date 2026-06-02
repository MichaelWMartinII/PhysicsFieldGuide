'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { curriculum } from '@/lib/curriculum';
import { constants, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/constants';
import { equations } from '@/lib/equations';

type SearchEntry = {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  color: string;
  type: 'chapter' | 'constant' | 'equation';
  keywords: string;
};

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const chapter of curriculum) {
    for (const topic of chapter.topics) {
      if (!topic.built) continue;
      entries.push({
        title: topic.title,
        subtitle: chapter.title,
        description: topic.description ?? '',
        href: topic.href,
        color: chapter.color,
        type: 'chapter',
        keywords: `${topic.title} ${topic.description ?? ''} ${chapter.title}`.toLowerCase(),
      });
    }
  }

  for (const c of constants) {
    entries.push({
      title: c.name,
      subtitle: `${CATEGORY_LABELS[c.category]} · ${c.symbol} = ${c.value} ${c.units}`,
      description: c.story.slice(0, 140) + (c.story.length > 140 ? '…' : ''),
      href: '/constants',
      color: CATEGORY_COLORS[c.category],
      type: 'constant',
      keywords: `${c.name} ${c.symbol} ${c.story}`.toLowerCase(),
    });
  }

  for (const eq of equations) {
    entries.push({
      title: eq.name,
      subtitle: eq.section,
      description: eq.description,
      href: '/equations',
      color: eq.color,
      type: 'equation',
      keywords: `${eq.name} ${eq.description} ${(eq.tags ?? []).join(' ')} ${eq.section}`.toLowerCase(),
    });
  }

  return entries;
}

const INDEX = buildIndex();

const TYPE_LABELS: Record<SearchEntry['type'], string> = {
  chapter: 'Chapter',
  constant: 'Constant',
  equation: 'Equation',
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];
    return INDEX.filter(e => e.keywords.includes(q)).slice(0, 40);
  }, [query]);

  const grouped = useMemo(() => {
    const order: SearchEntry['type'][] = ['chapter', 'constant', 'equation'];
    return order.flatMap(type => {
      const items = results.filter(r => r.type === type);
      return items.length > 0 ? [{ type, items }] : [];
    });
  }, [results]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Header / search box */}
      <div style={{ padding: '2rem 2rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.5rem' }}>
          Search
        </div>
        <div style={{ position: 'relative', maxWidth: '560px' }}>
          <span style={{
            position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)',
            color: 'var(--muted)', fontFamily: 'system-ui', fontSize: '1rem', pointerEvents: 'none',
          }}>
            ⌕
          </span>
          <input
            ref={inputRef}
            type="search"
            placeholder="Search chapters, constants, equations…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: '100%',
              fontFamily: 'system-ui, sans-serif',
              fontSize: '1rem',
              padding: '0.7rem 0.9rem 0.7rem 2.25rem',
              borderRadius: '8px',
              border: '1px solid var(--border2)',
              background: 'var(--surface2)',
              color: 'var(--text)',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '0.85rem',
              }}
            >
              ✕
            </button>
          )}
        </div>
        {query.length > 0 && query.length < 2 && (
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.78rem', color: 'var(--muted)', margin: '0.5rem 0 0' }}>
            Type at least 2 characters to search.
          </p>
        )}
      </div>

      {/* Results */}
      <div style={{ flex: 1, padding: '1.25rem 2rem 3rem' }}>
        {query.length >= 2 && results.length === 0 && (
          <p style={{ fontFamily: 'Georgia, serif', color: 'var(--muted)', fontStyle: 'italic', marginTop: '1rem' }}>
            No results for &ldquo;{query}&rdquo;.
          </p>
        )}

        {grouped.map(({ type, items }) => (
          <section key={type} style={{ marginBottom: '1.75rem' }}>
            <div style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '0.64rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '0.5rem',
              paddingBottom: '0.3rem',
              borderBottom: '1px solid var(--border)',
            }}>
              {TYPE_LABELS[type]}s
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {items.map((item, i) => <SearchResult key={i} item={item} query={query} />)}
            </div>
          </section>
        ))}

        {query.length < 2 && (
          <div style={{ marginTop: '1rem' }}>
            <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
              Search across {INDEX.filter(e => e.type === 'chapter').length} chapters, {INDEX.filter(e => e.type === 'constant').length} physical constants, and {INDEX.filter(e => e.type === 'equation').length} equations.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Faraday', 'entropy', 'uncertainty', 'Boltzmann', 'relativity', 'quantum', 'momentum', 'Planck'].map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '0.78rem',
                    padding: '0.3rem 0.7rem',
                    borderRadius: '20px',
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    color: 'var(--text)',
                    cursor: 'pointer',
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: 'rgba(234,179,8,0.25)', color: 'inherit', borderRadius: '2px' }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function SearchResult({ item, query }: { item: SearchEntry; query: string }) {
  return (
    <Link
      href={item.href}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.85rem',
        padding: '0.6rem 0.8rem',
        borderRadius: '6px',
        textDecoration: 'none',
        border: '1px solid transparent',
        transition: 'background 0.1s, border-color 0.1s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = 'var(--surface)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = 'transparent';
        (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
      }}
    >
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color, marginTop: '0.45rem', flexShrink: 0 }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '0.1rem' }}>
          {highlight(item.title, query)}
        </div>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.73rem', color: item.color, marginBottom: '0.25rem' }}>
          {item.subtitle}
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.79rem', color: 'var(--muted)', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {highlight(item.description, query)}
        </div>
      </div>
    </Link>
  );
}
