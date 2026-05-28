import type { Metadata } from 'next';
import 'katex/dist/katex.min.css';
import './globals.css';
import CurriculumNav from '@/components/CurriculumNav';
import AISidebar from '@/components/AISidebar';
import { ChapterFieldNote } from '@/components/textbook';

export const metadata: Metadata = {
  title: 'Physics: A Field Guide',
  description: 'An interactive physics textbook with simulations, worked examples, and field notes from the history of discovery.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full flex overflow-hidden" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <CurriculumNav />
        <main className="flex-1 overflow-y-auto min-w-0">
          {children}
          <ChapterFieldNote />
        </main>
        <AISidebar />
      </body>
    </html>
  );
}
