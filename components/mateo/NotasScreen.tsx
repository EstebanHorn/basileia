'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/app-context';
import { useProgress } from '@/lib/supabase/use-progress';
import { useNotes } from '@/lib/supabase/use-notes';
import { MAX_CHAPTER } from '@/lib/content/editorial';
import { getNewspaper } from '@/lib/i18n/newspaper';
import Pressable from './Pressable';
import PageHead from './PageHead';
import styles from './screens.module.css';

const TILTS = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.8];

export default function NotasScreen() {
  const { lang, dict } = useApp();
  const np = getNewspaper(lang);
  const { readChapters, toggleRead } = useProgress();
  const { notes } = useNotes();

  const readCount = Object.values(readChapters).filter(Boolean).length;
  const notesEntries = Object.entries(notes).filter(([, text]) => text && text.trim());

  return (
    <div className={styles.page}>
      <PageHead kicker={np.kicker.notas} title={dict.notas.title}>
        {dict.notas.stats(readCount, MAX_CHAPTER)}
      </PageHead>

      <div className={styles.progressRow}>
        <span className="np-type">
          {readCount} / {MAX_CHAPTER}
        </span>
        <span className={styles.inkBar}>
          <span style={{ width: `${(readCount / MAX_CHAPTER) * 100}%` }} />
        </span>
      </div>

      <div className={styles.ticketGrid}>
        {Array.from({ length: MAX_CHAPTER }, (_, i) => i + 1).map((n) => {
          const checked = !!readChapters[n];
          return (
            <Pressable key={n} onClick={() => toggleRead(n)} aria-pressed={checked} className={styles.ticket}>
              <span>
                {dict.capitulo.mateoPrefix} {n}
              </span>
              <span className={styles.ticketMark} aria-hidden>
                {checked ? '✓' : ''}
              </span>
            </Pressable>
          );
        })}
      </div>

      {notesEntries.length > 0 && (
        <section>
          <h2 className={styles.sectionTitle}>
            {dict.notas.notasGuardadas} <small>{notesEntries.length}</small>
          </h2>
          <div className={`${styles.noteGrid} np-stagger`}>
            {notesEntries.map(([num, text], i) => (
              <Link
                key={num}
                href={`/${lang}/capitulo/${num}`}
                className={`np-clip ${styles.noteCard}`}
                style={{ '--tilt': `${TILTS[i % TILTS.length]}deg` } as CSSProperties}
              >
                <span className="np-kicker">
                  {dict.capitulo.mateoPrefix} {num}
                </span>
                <div className={styles.noteText}>{text}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
