import type { ReactNode } from 'react';

type HistoryNoteProps = {
  title: string;
  year?: string;
  trigger?: ReactNode;
  children: ReactNode;
};

export function HistoryNote({ title, year, trigger, children }: HistoryNoteProps) {
  const heading = year ? `${year} · ${title}` : title;

  if (trigger) {
    return (
      <span className="history-hover" tabIndex={0}>
        {trigger}
        <span className="history-popover" role="note">
          <span className="history-popover-title">{heading}</span>
          <span className="history-popover-body">{children}</span>
        </span>
      </span>
    );
  }

  return (
    <aside className="history-note">
      <div className="history-note-kicker">Field Note</div>
      <div className="history-note-title">{heading}</div>
      <div className="history-note-body">{children}</div>
    </aside>
  );
}
