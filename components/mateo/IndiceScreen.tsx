'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/app-context';
import { useProgress } from '@/lib/supabase/use-progress';
import { COMPLETED_RANGE, MAX_CHAPTER, isCompleted, type Section } from '@/lib/content/editorial';
import { getNewspaper } from '@/lib/i18n/newspaper';
import Pressable from './Pressable';
import PageHead from './PageHead';
import styles from './screens.module.css';

interface IndiceScreenProps {
  sections: Section[];
  titles: Record<number, string>;
}

export default function IndiceScreen({ sections, titles }: IndiceScreenProps) {
  const { lang, dict } = useApp();
  const np = getNewspaper(lang);
  const { readChapters, toggleRead } = useProgress();
  const [indexFilter, setIndexFilter] = useState('all');

  const chips = [{ id: 'all', name: dict.indice.all }, ...sections];
  const activeSection = indexFilter === 'all' ? null : sections.find((s) => s.id === indexFilter);
  const completedCount = COMPLETED_RANGE[1] - COMPLETED_RANGE[0] + 1;
  const readCount = Object.values(readChapters).filter(Boolean).length;
  const sectionOf = (n: number) => sections.find((s) => n >= s.range[0] && n <= s.range[1]);

  return (
    <div className={styles.page}>
      <PageHead kicker={np.kicker.indice} title={dict.indice.title}>
        {dict.indice.stats(MAX_CHAPTER, completedCount, readCount)}
      </PageHead>

      <div className={styles.progressRow}>
        <span className="np-type">
          {readCount} / {MAX_CHAPTER}
        </span>
        <span className={styles.inkBar}>
          <span style={{ width: `${(readCount / MAX_CHAPTER) * 100}%` }} />
        </span>
      </div>

      <div className={styles.chips}>
        {chips.map((c) => (
          <Pressable key={c.id} onClick={() => setIndexFilter(c.id)} aria-pressed={indexFilter === c.id} className="np-chip">
            {c.name}
          </Pressable>
        ))}
      </div>

      <div className={`${styles.issueGrid} np-stagger`} key={indexFilter}>
        {Array.from({ length: MAX_CHAPTER }, (_, i) => i + 1)
          .filter((n) => !activeSection || (n >= activeSection.range[0] && n <= activeSection.range[1]))
          .map((n) => {
            const completed = isCompleted(n);
            const read = !!readChapters[n];
            return (
              <div key={n} className={styles.issueWrap}>
                <Link
                  href={`/${lang}/capitulo/${n}`}
                  className={`${styles.issue} ${completed ? 'np-card' : ''}`}
                  data-pending={completed ? undefined : ''}
                >
                  <span className={styles.issueTop}>
                    <span className="np-kicker">Nº {n}</span>
                    <span className={styles.issueSection}>{sectionOf(n)?.name}</span>
                  </span>
                  <span className={`${styles.issueNum} ${completed ? 'np-halftone' : ''}`}>{n}</span>
                  <span className={styles.issueTitle}>{completed ? titles[n] : np.printing}</span>
                </Link>
                <Pressable
                  onClick={() => toggleRead(n)}
                  aria-label={read ? dict.indice.markUnread : dict.indice.markRead}
                  aria-pressed={read}
                  title={read ? dict.indice.markUnread : dict.indice.markRead}
                  className={styles.readStamp}
                  data-read={read ? '' : undefined}
                >
                  {read ? np.read : '○'}
                </Pressable>
              </div>
            );
          })}
      </div>

      <div className={styles.legend}>
        <span>
          <i className={styles.legendCard} /> {dict.indice.legendCompleted}
        </span>
        <span>
          <i className={styles.legendPending} /> {dict.indice.legendPending}
        </span>
        <span>
          <i className={styles.legendRead} /> {dict.indice.legendRead}
        </span>
      </div>
    </div>
  );
}
