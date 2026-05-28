'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { curriculum } from '@/lib/curriculum';

export default function CurriculumNav() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  function toggle(id: string) {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <nav style={{ width: '13.5rem', flexShrink: 0, height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border)', background: 'var(--surface)', fontFamily: 'system-ui, -apple-system, sans-serif', paddingTop: '1rem', paddingBottom: '1rem' }}>
      <Link href="/" style={{ padding: '0 1rem 1rem', borderBottom: '1px solid var(--border)', marginBottom: '0.75rem', display: 'block', textDecoration: 'none' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-0.01em' }}>Physics: A Field Guide</div>
        <div style={{ fontSize: '0.68rem', color: 'var(--muted)', marginTop: '0.15rem', letterSpacing: '0.04em' }}>Interactive Textbook</div>
      </Link>

      <div style={{ padding: '0 0.5rem', marginBottom: '0.5rem' }}>
        <Link
          href="/roadmap"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.4rem 0.6rem', borderRadius: '4px', textDecoration: 'none',
            fontSize: '0.78rem', fontWeight: 500,
            color: pathname === '/roadmap' ? 'var(--text-heading)' : 'var(--muted)',
            background: pathname === '/roadmap' ? 'var(--surface2)' : 'transparent',
            border: '1px solid var(--border)',
          }}
        >
          Full Roadmap
          <span style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>HS→PhD</span>
        </Link>
      </div>

      <div style={{ padding: '0 0.5rem' }}>
        {curriculum.map((chapter) => {
          const isOpen = !collapsed[chapter.id];
          const chapterActive = chapter.topics.some((t) => pathname === t.href);

          return (
            <div key={chapter.id} style={{ marginBottom: '0.125rem' }}>
              <button
                onClick={() => toggle(chapter.id)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.45rem 0.6rem', borderRadius: '4px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: chapterActive ? 'var(--text-strong)' : 'var(--muted)' }}>
                  {chapter.title}
                </span>
                <span style={{ color: 'var(--muted)', fontSize: '0.6rem' }}>{isOpen ? '▾' : '▸'}</span>
              </button>

              {isOpen && (
                <div style={{ marginLeft: '0.25rem', marginBottom: '0.25rem' }}>
                  {chapter.topics.map((topic) => {
                    const active = pathname === topic.href;
                    return (
                      <Link
                        key={topic.id}
                        href={topic.built ? topic.href : '#'}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '0.3rem 0.6rem', borderRadius: '4px', textDecoration: 'none',
                          fontSize: '0.8rem',
                          color: active ? 'var(--text-heading)' : topic.built ? 'var(--text)' : 'var(--muted)',
                          background: active ? 'var(--surface2)' : 'transparent',
                          cursor: topic.built ? 'pointer' : 'not-allowed',
                          borderLeft: active ? `2px solid var(--def-accent)` : '2px solid transparent',
                          marginLeft: '0.125rem',
                        }}
                      >
                        {topic.title}
                        {!topic.built && (
                          <span style={{ fontSize: '0.6rem', color: 'var(--border2)' }}>soon</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
