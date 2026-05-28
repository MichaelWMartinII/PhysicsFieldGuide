'use client';

import { useState, useRef, useEffect } from 'react';
import { AutoMath } from './AutoMath';

interface Message { role: 'user' | 'assistant'; content: string; }

const DIFF_LABEL: Record<string, string> = {
  easy: 'Straightforward',
  medium: 'Intermediate',
  hard: 'Challenging',
  grad: 'Graduate level',
};

interface Props {
  n: number;
  difficulty?: 'easy' | 'medium' | 'hard' | 'grad';
  answer: number;
  tolerance?: number;
  unit: string;
  hints: string[];
  solution: React.ReactNode;
  children: React.ReactNode;
  problemText: string;
}

export function InteractiveProblem({
  n, difficulty = 'medium', answer, tolerance = 0.03,
  unit, hints, solution, children, problemText,
}: Props) {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong' | 'revealed'>('idle');
  const [attempts, setAttempts] = useState(0);
  const [hintIdx, setHintIdx] = useState(-1);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  function check() {
    const val = parseFloat(input);
    if (isNaN(val)) return;
    const err = Math.abs((val - answer) / answer);
    setAttempts((a) => a + 1);
    if (err <= tolerance) {
      setStatus('correct');
      setSolutionOpen(true);
    } else {
      setStatus('wrong');
      if (attempts >= 2 && hintIdx < hints.length - 1) {
        setHintIdx((i) => i + 1);
      }
    }
  }

  async function sendChat(msg?: string) {
    const text = (msg ?? chatInput).trim();
    if (!text || chatLoading) return;
    setChatInput('');
    const userMsg: Message = { role: 'user', content: text };
    setChatMessages((p) => [...p, userMsg]);
    setChatLoading(true);
    const assistantMsg: Message = { role: 'assistant', content: '' };
    setChatMessages((p) => [...p, assistantMsg]);

    try {
      const res = await fetch('https://elwinransom.michaelwmartinjr.com/api/demo/physics-hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem: problemText,
          attempt: input || null,
          unit,
          messages: [...chatMessages, userMsg],
        }),
      });
      if (!res.body) throw new Error();
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      outer: while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of decoder.decode(value, { stream: true }).split('\n')) {
          if (!line.startsWith('data: ')) continue;
          try {
            const msg = JSON.parse(line.slice(6).trim());
            if (msg.type === 'done') break outer;
            if (msg.type === 'token' && msg.content) {
              setChatMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = { ...next[next.length - 1], content: next[next.length - 1].content + msg.content };
                return next;
              });
            }
            if (msg.type === 'error') throw new Error(msg.content);
          } catch {}
        }
      }
    } catch {
      setChatMessages((p) => {
        const n2 = [...p];
        n2[n2.length - 1] = { role: 'assistant', content: 'Could not reach the AI tutor.' };
        return n2;
      });
    } finally {
      setChatLoading(false);
    }
  }

  return (
    <div className="tb-problem" style={{ borderLeft: '3px solid var(--border2)' }}>
      {/* Problem text */}
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        <span className="tb-problem-num">{n}.</span>
        <div style={{ flex: 1 }}>
          <AutoMath>{children}</AutoMath>
          {status === 'correct' && (
            <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: 'var(--ex-accent)', fontFamily: 'system-ui, sans-serif' }}>
              — correct ({attempts === 1 ? '1 attempt' : `${attempts} attempts`})
            </span>
          )}
        </div>
      </div>

      {/* Answer row */}
      {status !== 'correct' && status !== 'revealed' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.65rem', fontFamily: 'system-ui, sans-serif' }}>
          <input
            type="number"
            value={input}
            onChange={(e) => { setInput(e.target.value); setStatus('idle'); }}
            onKeyDown={(e) => e.key === 'Enter' && check()}
            placeholder="Answer"
            style={{
              width: '8rem',
              fontSize: '0.875rem',
              padding: '0.3rem 0.6rem',
              background: 'var(--surface2)',
              border: `1px solid ${status === 'wrong' ? '#7a4040' : 'var(--border2)'}`,
              borderRadius: '4px',
              color: 'var(--text)',
              outline: 'none',
            }}
          />
          <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{unit}</span>
          <button
            onClick={check}
            disabled={!input}
            style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              padding: '0.3rem 0.8rem',
              background: 'var(--surface3)',
              color: 'var(--text)',
              border: '1px solid var(--border2)',
              borderRadius: '4px',
              cursor: input ? 'pointer' : 'not-allowed',
              opacity: input ? 1 : 0.4,
            }}
          >
            Check
          </button>
        </div>
      )}

      {/* Feedback */}
      {status === 'wrong' && (
        <div style={{ marginTop: '0.4rem', fontSize: '0.82rem', color: '#a06060', fontFamily: 'system-ui, sans-serif', fontStyle: 'italic' }}>
          {parseFloat(input) > answer ? 'Too large — try a smaller value.' : 'Too small — try a larger value.'}
          {attempts > 1 && <span style={{ marginLeft: '0.4rem', color: 'var(--muted)' }}>({attempts} attempts)</span>}
        </div>
      )}

      {/* Hint */}
      {hintIdx >= 0 && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--muted)', fontStyle: 'italic', paddingLeft: '0.75rem', borderLeft: '2px solid var(--border2)', fontFamily: 'system-ui, sans-serif' }}>
          <span style={{ fontStyle: 'normal', fontWeight: 600, color: 'var(--def-accent)', marginRight: '0.35rem' }}>Hint:</span>
          <AutoMath>{hints[hintIdx]}</AutoMath>
        </div>
      )}

      {/* Action links */}
      <div style={{ marginTop: '0.6rem', display: 'flex', gap: '1.25rem', fontFamily: 'system-ui, sans-serif', fontSize: '0.75rem' }}>
        {hintIdx < hints.length - 1 && status !== 'correct' && (
          <button
            onClick={() => setHintIdx((i) => Math.min(i + 1, hints.length - 1))}
            style={{ color: 'var(--def-accent)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: '2px' }}
          >
            {hintIdx < 0 ? 'Get hint' : 'Next hint'}
          </button>
        )}
        <button
          onClick={() => { setChatOpen((v) => !v); if (!chatMessages.length) sendChat('I need help with this problem. Can you give me a starting point?'); }}
          style={{ color: chatOpen ? 'var(--ex-accent)' : 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: '2px' }}
        >
          {chatOpen ? 'Close AI tutor' : 'Ask AI tutor'}
        </button>
        {!solutionOpen && (
          <button
            onClick={() => { setSolutionOpen(true); setStatus('revealed'); }}
            style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: '2px' }}
          >
            Solution
          </button>
        )}
        <span style={{ color: 'var(--muted)', opacity: 0.6 }}>{DIFF_LABEL[difficulty]}</span>
      </div>

      {/* Solution */}
      {solutionOpen && <div className="tb-solution"><AutoMath>{solution}</AutoMath></div>}

      {/* AI chat */}
      {chatOpen && (
        <div style={{ marginTop: '0.75rem', border: '1px solid var(--border2)', borderRadius: '4px', overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ padding: '0.4rem 0.75rem', background: 'var(--surface2)', borderBottom: '1px solid var(--border)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            AI Tutor — Exercise {n}
          </div>
          <div style={{ padding: '0.75rem', maxHeight: '200px', overflowY: 'auto', fontSize: '0.83rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {chatMessages.map((m, i) => (
              <div key={i}>
                <span style={{ fontWeight: 600, display: 'block', marginBottom: '0.15rem', color: m.role === 'user' ? 'var(--def-accent)' : 'var(--ex-accent)' }}>
                  {m.role === 'user' ? 'You' : 'Tutor'}
                </span>
                <div style={{ color: 'var(--text)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{m.content}</div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem', borderTop: '1px solid var(--border)' }}>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendChat()}
              placeholder="Ask a follow-up…"
              style={{ flex: 1, fontSize: '0.82rem', padding: '0.3rem 0.6rem', background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: '3px', color: 'var(--text)', outline: 'none' }}
            />
            <button
              onClick={() => sendChat()}
              disabled={chatLoading || !chatInput.trim()}
              style={{ fontSize: '0.82rem', padding: '0.3rem 0.7rem', background: 'var(--surface3)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: '3px', cursor: 'pointer', opacity: chatLoading || !chatInput.trim() ? 0.4 : 1 }}
            >
              {chatLoading ? '…' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
