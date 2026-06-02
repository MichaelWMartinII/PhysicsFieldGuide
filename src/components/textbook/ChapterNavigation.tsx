'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { curriculum } from '@/lib/curriculum';

const builtTopics = curriculum.flatMap((chapter) =>
  chapter.topics
    .filter((topic) => topic.built)
    .map((topic) => ({
      ...topic,
      chapterTitle: chapter.title,
      chapterColor: chapter.color,
    }))
);

export function ChapterNavigation() {
  const pathname = usePathname();
  const currentIndex = builtTopics.findIndex((topic) => topic.href === pathname);

  if (currentIndex < 0) {
    return null;
  }

  const previous = builtTopics[currentIndex - 1];
  const next = builtTopics[currentIndex + 1];

  return (
    <nav className="chapter-nav" aria-label="Chapter navigation">
      {previous ? (
        <Link href={previous.href} className="chapter-nav-link chapter-nav-prev">
          <span className="chapter-nav-direction">Previous</span>
          <span className="chapter-nav-title">{previous.title}</span>
          <span className="chapter-nav-track" style={{ color: previous.chapterColor }}>
            {previous.chapterTitle}
          </span>
        </Link>
      ) : (
        <div className="chapter-nav-spacer" />
      )}

      {next ? (
        <Link href={next.href} className="chapter-nav-link chapter-nav-next">
          <span className="chapter-nav-direction">Next</span>
          <span className="chapter-nav-title">{next.title}</span>
          <span className="chapter-nav-track" style={{ color: next.chapterColor }}>
            {next.chapterTitle}
          </span>
        </Link>
      ) : (
        <div className="chapter-nav-spacer" />
      )}
    </nav>
  );
}
