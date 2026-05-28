import Link from 'next/link';
import { curriculum } from '@/lib/curriculum';

const BUILT_COUNT = curriculum.reduce((s, c) => s + c.topics.filter(t => t.built).length, 0);
const TOTAL_COUNT = curriculum.reduce((s, c) => s + c.topics.length, 0);

export default function Home() {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '3rem 2.5rem 5rem', fontFamily: 'Georgia, "Times New Roman", serif', lineHeight: 1.85 }}>

      {/* Preface */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2.5rem', marginBottom: '3rem' }}>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.75rem' }}>
          Preface
        </div>
        <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '2.4rem', fontWeight: 700, color: 'var(--text-heading)', margin: '0 0 0.5rem', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
          Physics: A Field Guide
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--muted)', fontStyle: 'italic', marginBottom: '2rem' }}>
          An interactive textbook about matter, motion, energy, light, and the people who figured out how to read them.
        </p>

        <p style={{ color: 'var(--text)', fontSize: '0.97rem', marginBottom: '1.1rem' }}>
          This is a full physics curriculum, structured as a field guide and technical textbook, designed to carry a student
          with no prior exposure through the same material covered in a research-level graduate physics education.
          It is not a summary or a survey. The chapters are meant to be read carefully, worked through, tested, and understood.
        </p>

        <p style={{ color: 'var(--text)', fontSize: '0.97rem', marginBottom: '1.1rem' }}>
          The curriculum is organized into seven tracks: <strong style={{ color: 'var(--text-strong)' }}>Classical Mechanics</strong>,{' '}
          <strong style={{ color: 'var(--text-strong)' }}>Waves &amp; Oscillations</strong>,{' '}
          <strong style={{ color: 'var(--text-strong)' }}>Thermodynamics</strong>,{' '}
          <strong style={{ color: 'var(--text-strong)' }}>Electromagnetism</strong>,{' '}
          <strong style={{ color: 'var(--text-strong)' }}>Optics</strong>,{' '}
          <strong style={{ color: 'var(--text-strong)' }}>Modern Physics</strong>, and{' '}
          <strong style={{ color: 'var(--text-strong)' }}>Mathematics for Physics</strong>. Each track spans five
          levels of depth — from a high school introduction through graduate coursework and frontier research topics.
          The full scope is laid out in the{' '}
          <Link href="/roadmap" style={{ color: 'var(--def-accent)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>curriculum roadmap</Link>.
        </p>

        <p style={{ color: 'var(--text)', fontSize: '0.97rem', marginBottom: '1.1rem' }}>
          What makes physics different from other sciences is that it seeks the smallest possible number
          of fundamental principles from which everything else follows by logical necessity. Newton&apos;s
          three laws govern the motion of every object from a falling apple to a deep-space probe.
          Maxwell&apos;s four equations describe every electromagnetic phenomenon ever observed. The
          Schrödinger equation dictates the behavior of every atom. The ambition of this curriculum is not
          merely to transmit these results — it is to show you <em>how physicists think</em>: how to
          construct a model of a physical system, how to extract predictions from it mathematically, and
          how to confront those predictions against experiment.
        </p>

        <p style={{ color: 'var(--text)', fontSize: '0.97rem', marginBottom: '1.75rem' }}>
          Each chapter contains formal definitions, theorems, worked examples, and short field notes about
          how the ideas were discovered. Where a concept benefits from visualization, a live interactive
          simulation is embedded directly in the text. Practice exercises include numeric answer checking
          with progressive hints. An AI tutor, running locally, knows what chapter you are reading and can
          answer questions or work through problems with you.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/mechanics/measurement" style={{
            display: 'inline-block', padding: '0.55rem 1.4rem', borderRadius: '4px',
            background: 'var(--surface2)', border: '1px solid var(--border2)',
            color: 'var(--text-heading)', textDecoration: 'none',
            fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem', fontWeight: 600,
          }}>
            Begin with Chapter 1 →
          </Link>
          <Link href="/roadmap" style={{
            display: 'inline-block', padding: '0.55rem 1.4rem', borderRadius: '4px',
            background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--muted)', textDecoration: 'none',
            fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem',
          }}>
            View full roadmap
          </Link>
        </div>
      </div>

      {/* Contents */}
      <div>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1.5rem' }}>
          Table of Contents &nbsp;·&nbsp;
          <span style={{ color: 'var(--ex-accent)', fontWeight: 500 }}>{BUILT_COUNT} of {TOTAL_COUNT} chapters complete</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {curriculum.map((track, ti) => (
            <div key={track.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', paddingBottom: '0.4rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 3, height: 18, borderRadius: 2, background: track.color, flexShrink: 0 }} />
                <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  {track.title}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                {track.topics.map((topic, i) => (
                  <div key={topic.id} style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                    <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.75rem', color: 'var(--border2)', minWidth: '1.5rem', textAlign: 'right', flexShrink: 0 }}>
                      {ti === 0 && i === 0 ? '1.' : ''}
                    </span>
                    {topic.built ? (
                      <Link href={topic.href} className="toc-link" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '0.95rem', flex: 1, padding: '0.2rem 0' }}>
                        {topic.title}
                        {topic.description && (
                          <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.75rem', color: 'var(--muted)', marginLeft: '0.75rem' }}>
                            {topic.description}
                          </span>
                        )}
                      </Link>
                    ) : (
                      <span style={{ color: 'var(--muted)', fontSize: '0.95rem', flex: 1, padding: '0.2rem 0', opacity: 0.5 }}>
                        {topic.title}
                        {topic.description && (
                          <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.75rem', marginLeft: '0.75rem' }}>
                            {topic.description}
                          </span>
                        )}
                      </span>
                    )}
                    {!topic.built && (
                      <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.65rem', color: 'var(--border2)', flexShrink: 0 }}>in progress</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', fontFamily: 'system-ui, sans-serif', fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          Each chapter includes simulations, worked examples, interactive exercises, and an AI tutor running locally via Ollama.
          Use the sidebar button (bottom-right) to open the tutor at any time.
        </div>
      </div>
    </div>
  );
}
