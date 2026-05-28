'use client';

import { usePathname } from 'next/navigation';
import { fieldNotes } from '@/lib/fieldNotes';
import { HistoryNote } from './HistoryNote';

export function ChapterFieldNote() {
  const pathname = usePathname();
  const note = fieldNotes[pathname];

  if (!note) {
    return null;
  }

  return (
    <div className="chapter-field-note">
      <HistoryNote title={note.title} year={note.year}>
        {note.body}
      </HistoryNote>
    </div>
  );
}
