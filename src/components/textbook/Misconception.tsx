import type { ReactNode } from 'react';

type MisconceptionProps = {
  wrong: string;
  children: ReactNode;
};

export function Misconception({ wrong, children }: MisconceptionProps) {
  return (
    <aside className="misconception">
      <div className="misconception-kicker">Common Misconception</div>
      <div className="misconception-wrong">&ldquo;{wrong}&rdquo;</div>
      <div className="misconception-body">{children}</div>
    </aside>
  );
}
