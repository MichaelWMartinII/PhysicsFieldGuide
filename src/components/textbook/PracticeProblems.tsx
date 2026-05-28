'use client';

import { useState } from 'react';
import { AutoMath } from './AutoMath';

export function PracticeProblems({ section, children }: {
  section?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="tb-practice">
      <div className="tb-practice-header">
        Exercises{section ? ` — ${section}` : ''}
      </div>
      {children}
    </div>
  );
}

const DIFF_LABEL: Record<string, string> = {
  easy: 'Straightforward',
  medium: 'Intermediate',
  hard: 'Challenging',
  grad: 'Graduate level',
};

export function Problem({ n, difficulty = 'easy', solution, children }: {
  n: number;
  difficulty?: 'easy' | 'medium' | 'hard' | 'grad';
  solution: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="tb-problem">
      <div>
        <span className="tb-problem-num">{n}.</span>
        <AutoMath>{children}</AutoMath>
      </div>
      <div style={{ marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.72rem', color: 'var(--muted)' }}>
          {DIFF_LABEL[difficulty]}
        </span>
        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: '0.75rem',
            color: open ? 'var(--ex-accent)' : 'var(--muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontWeight: 500,
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          }}
        >
          {open ? 'Hide solution' : 'Solution'}
        </button>
      </div>
      {open && <div className="tb-solution"><AutoMath>{solution}</AutoMath></div>}
    </div>
  );
}
