'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { curriculum } from '@/lib/curriculum';

interface Message { role: 'user' | 'assistant'; content: string; }

function getTopicContext(pathname: string): string {
  for (const chapter of curriculum) {
    for (const topic of chapter.topics) {
      if (pathname === topic.href) {
        return `${chapter.title} — ${topic.title}${topic.description ? ': ' + topic.description : ''}`;
      }
    }
  }
  return 'Physics curriculum overview';
}

export default function AISidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const topic = getTopicContext(pathname);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    const history = [...messages, userMsg];
    const assistantMsg: Message = { role: 'assistant', content: '' };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, topic }),
      });
      if (!res.body) throw new Error();
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of decoder.decode(value, { stream: true }).split('\n')) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;
          try {
            const delta = JSON.parse(data).message?.content ?? JSON.parse(data).choices?.[0]?.delta?.content ?? '';
            if (delta) {
              setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = { ...next[next.length - 1], content: next[next.length - 1].content + delta };
                return next;
              });
            }
          } catch {}
        }
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: 'assistant', content: 'Error reaching Ollama. Is it running?' };
        return next;
      });
    } finally {
      setLoading(false);
    }
  }

  const panelStyle: React.CSSProperties = isMobile
    ? {
        position: 'fixed', top: 0, right: 0, zIndex: 100,
        width: 'min(20rem, 100vw)', height: '100%',
        display: 'flex', flexDirection: 'column',
        borderLeft: '1px solid var(--border)', background: 'var(--surface)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 220ms ease',
      }
    : {
        width: '18rem', flexShrink: 0, height: '100%',
        display: 'flex', flexDirection: 'column',
        borderLeft: '1px solid var(--border)', background: 'var(--surface)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="AI Tutor"
        style={{
          position: 'fixed',
          bottom: '1.25rem',
          right: open && !isMobile ? 'calc(18rem + 1.25rem)' : '1.25rem',
          zIndex: 110,
          width: '2.25rem', height: '2.25rem', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', fontFamily: 'system-ui, sans-serif', fontWeight: 700,
          background: 'var(--surface2)', border: '1px solid var(--border2)', color: 'var(--muted)',
          cursor: 'pointer', letterSpacing: '0.04em',
          transition: 'right 220ms ease',
        }}
      >
        {open ? '✕' : 'AI'}
      </button>

      {/* Mobile backdrop */}
      {isMobile && open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(0,0,0,0.6)' }}
        />
      )}

      {/* Panel — always rendered on desktop so flex layout is stable; animated on mobile */}
      {(!isMobile ? open : true) && (
        <div style={panelStyle}>
          <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>AI Tutor</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{topic}</div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {messages.length === 0 && (
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)', textAlign: 'center', paddingTop: '2rem', lineHeight: 1.6 }}>
                Ask anything about the current topic.<br />
                The tutor knows what page you&apos;re on.
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem', color: msg.role === 'user' ? 'var(--def-accent)' : 'var(--ex-accent)' }}>
                  {msg.role === 'user' ? 'You' : 'Tutor'}
                </span>
                <div style={{ fontSize: '0.83rem', color: 'var(--text)', whiteSpace: 'pre-wrap', lineHeight: 1.65 }}>{msg.content}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div style={{ padding: '0.6rem 0.75rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.4rem' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask a question…"
              disabled={loading}
              style={{ flex: 1, fontSize: '0.82rem', padding: '0.35rem 0.6rem', background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: '3px', color: 'var(--text)', outline: 'none' }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.65rem', background: 'var(--surface3)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: '3px', cursor: 'pointer', opacity: loading || !input.trim() ? 0.4 : 1 }}
            >
              {loading ? '…' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
