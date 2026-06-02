import type { ReactNode } from 'react';

type ApplicationNoteProps = {
  title: string;
  children: ReactNode;
};

export function ApplicationNote({ title, children }: ApplicationNoteProps) {
  return (
    <aside className="app-note">
      <div className="app-note-kicker">Where You&apos;ve Seen This</div>
      <div className="app-note-title">{title}</div>
      <div className="app-note-body">{children}</div>
    </aside>
  );
}
