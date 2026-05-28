import Link from 'next/link';
import { roadmap, LEVELS, type Level, type RoadmapTopic } from '@/lib/roadmap';

const LEVEL_ORDER: Level[] = ['hs', 'intro', 'upper', 'grad', 'research'];

function TopicCard({ topic, trackColor }: { topic: RoadmapTopic; trackColor: string }) {
  const levelInfo = LEVELS.find((l) => l.id === topic.level)!;

  const card = (
    <div
      className="rounded-lg border p-2.5 text-left w-full transition-colors"
      style={{
        background: topic.built ? `${trackColor}10` : 'var(--surface)',
        borderColor: topic.built ? trackColor : 'var(--border2)',
        opacity: topic.built ? 1 : 0.7,
      }}
    >
      <div className="flex items-start gap-1.5">
        <div className="flex-1 min-w-0">
          <div
            className="text-xs font-semibold leading-tight"
            style={{ color: topic.built ? trackColor : 'var(--text)' }}
          >
            {topic.title}
            {topic.built && (
              <span className="ml-1.5 text-xs" style={{ color: '#34d399' }}>✓</span>
            )}
          </div>
          <div className="text-xs mt-0.5 leading-tight" style={{ color: '#64748b' }}>
            {topic.description}
          </div>
        </div>
      </div>
      <div className="mt-1.5 flex items-center gap-1.5">
        <span
          className="text-xs px-1.5 py-0.5 rounded"
          style={{ background: `${levelInfo.color}18`, color: levelInfo.color, fontSize: '0.6rem', fontWeight: 600 }}
        >
          {levelInfo.label}
        </span>
        {topic.prereqs && topic.prereqs.length > 0 && (
          <span className="text-xs" style={{ color: '#334155', fontSize: '0.6rem' }}>
            ↳ {topic.prereqs.length} prereq{topic.prereqs.length > 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );

  if (topic.href && topic.built) {
    return (
      <Link href={topic.href} className="block hover:scale-[1.02] transition-transform">
        {card}
      </Link>
    );
  }
  return card;
}

export default function RoadmapPage() {
  const totalTopics = roadmap.reduce((s, t) => s + t.topics.length, 0);
  const builtTopics = roadmap.reduce((s, t) => s + t.topics.filter((x) => x.built).length, 0);

  return (
    <div className="chapter">
      <div className="chapter-label" style={{ color: '#2a7a8a' }}>Physics Curriculum</div>
      <h1>Complete Learning Roadmap</h1>
      <p className="subtitle">
        From high school foundations to PhD-level research — every major topic in physics and supporting mathematics,
        organized by level and prerequisite chain.
      </p>

      {/* Progress bar */}
      <div className="mb-8 p-4 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span className="font-semibold">Curriculum progress</span>
          <span style={{ color: '#34d399' }}>{builtTopics} / {totalTopics} topics built</span>
        </div>
        <div className="w-full rounded-full h-2" style={{ background: 'var(--border2)' }}>
          <div
            className="h-2 rounded-full transition-all"
            style={{ width: `${(builtTopics / totalTopics) * 100}%`, background: '#10b981' }}
          />
        </div>
        <div className="mt-2 text-xs" style={{ color: '#475569' }}>
          ✓ Built &amp; interactive &nbsp;·&nbsp; Outlined = content planned &nbsp;·&nbsp; Greyed = not yet started
        </div>
      </div>

      {/* Level legend */}
      <div className="mb-8 flex flex-wrap gap-2">
        {LEVELS.map((l) => (
          <div key={l.id} className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border"
            style={{ background: `${l.color}12`, borderColor: `${l.color}40`, color: l.color }}>
            <span className="font-semibold">{l.label}</span>
            <span style={{ color: `${l.color}99` }}>— {l.sublabel}</span>
          </div>
        ))}
      </div>

      {/* Grid: columns = levels, rows = tracks */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate" style={{ borderSpacing: '6px' }}>
          <thead>
            <tr>
              <th className="text-left text-xs font-semibold py-1 px-2 w-32" style={{ color: '#475569' }}>Track</th>
              {LEVELS.map((l) => (
                <th key={l.id} className="text-xs font-semibold px-1 py-1 text-center" style={{ color: l.color, minWidth: 160 }}>
                  {l.label}
                  <div className="font-normal" style={{ color: '#475569', fontSize: '0.65rem' }}>{l.sublabel}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roadmap.map((track) => (
              <tr key={track.id}>
                <td className="py-1 align-top">
                  <div className="flex items-center gap-1.5 text-xs font-bold py-2" style={{ color: track.color }}>
                    <span>{track.icon}</span>
                    <span className="leading-tight">{track.title}</span>
                  </div>
                </td>
                {LEVEL_ORDER.map((level) => {
                  const cellTopics = track.topics.filter((t) => t.level === level);
                  return (
                    <td key={level} className="align-top py-1">
                      <div className="space-y-1.5">
                        {cellTopics.length === 0 ? (
                          <div className="h-8 rounded-lg border border-dashed" style={{ borderColor: '#1e293b' }} />
                        ) : (
                          cellTopics.map((topic) => (
                            <TopicCard key={topic.id} topic={topic} trackColor={track.color} />
                          ))
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Prereq note */}
      <div className="mt-8 p-4 rounded border text-sm" style={{ background: 'var(--surface)', borderColor: 'var(--border2)', borderLeft: '3px solid var(--eq-accent)' }}>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--eq-accent)', marginBottom: '0.6rem' }}>How to use this roadmap</div>
        <ul style={{ color: 'var(--text)', fontSize: '0.88rem', paddingLeft: '1.25rem', lineHeight: 1.7 }}>
          <li>Read left to right within each row — topics progress from high school to cutting-edge research.</li>
          <li>Read down any column for all topics at a given level across all tracks.</li>
          <li>Highlighted cards with a check mark are fully built chapters with simulations and exercises.</li>
          <li>Click any built card to jump directly to that chapter.</li>
        </ul>
      </div>
    </div>
  );
}
