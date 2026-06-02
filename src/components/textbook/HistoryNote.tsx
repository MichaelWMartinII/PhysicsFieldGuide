import type { ReactNode } from 'react';

type FurtherReadingLink = { label: string; url: string };

type HistoryNoteProps = {
  title: string;
  year?: string;
  trigger?: ReactNode;
  source?: string;
  sourceUrl?: string;
  furtherReading?: FurtherReadingLink[];
  children: ReactNode;
};

function FurtherReadingLine({ links }: { links?: FurtherReadingLink[] }) {
  if (!links || links.length === 0) return null;
  return (
    <span className="history-further-reading">
      Further reading:{' '}
      {links.map((link, i) => (
        <span key={i}>
          {i > 0 && ' · '}
          <a href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
        </span>
      ))}
    </span>
  );
}

function SourceLine({ source, sourceUrl }: Pick<HistoryNoteProps, 'source' | 'sourceUrl'>) {
  if (!source) {
    return null;
  }

  return (
    <span className="history-source">
      Source:{' '}
      {sourceUrl ? (
        <a href={sourceUrl} target="_blank" rel="noreferrer">
          {source}
        </a>
      ) : (
        source
      )}
    </span>
  );
}

export function HistoryNote({ title, year, trigger, source, sourceUrl, furtherReading, children }: HistoryNoteProps) {
  const heading = year ? `${year} · ${title}` : title;

  if (trigger) {
    return (
      <span className="history-hover" tabIndex={0}>
        {trigger}
        <span className="history-popover" role="note">
          <span className="history-popover-title">{heading}</span>
          <span className="history-popover-body">{children}</span>
          <SourceLine source={source} sourceUrl={sourceUrl} />
          <FurtherReadingLine links={furtherReading} />
        </span>
      </span>
    );
  }

  return (
    <aside className="history-note">
      <div className="history-note-kicker">Field Note</div>
      <div className="history-note-title">{heading}</div>
      <div className="history-note-body">{children}</div>
      <SourceLine source={source} sourceUrl={sourceUrl} />
      <FurtherReadingLine links={furtherReading} />
    </aside>
  );
}
