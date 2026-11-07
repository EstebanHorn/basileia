'use client';

import Link from 'next/link';
import { useApp } from '@/lib/app-context';
import { getNewspaper } from '@/lib/i18n/newspaper';
import type { CitaAT, Paralelo } from '@/lib/content/types';
import PageHead from './PageHead';
import styles from './screens.module.css';

interface ParalelosScreenProps {
  citas: CitaAT[];
  paralelos: Paralelo[];
}

export default function ParalelosScreen({ citas, paralelos }: ParalelosScreenProps) {
  const { lang, dict } = useApp();
  const np = getNewspaper(lang);

  const chapters = [...new Set([...citas.flatMap((c) => c.capitulos), ...paralelos.flatMap((p) => p.capitulos)])].sort((a, b) => a - b);

  return (
    <div className={`${styles.page} ${styles.narrow}`}>
      <PageHead kicker={np.kicker.paralelos} title={dict.paralelos.title}>
        {dict.paralelos.subtitle}
      </PageHead>

      {chapters.map((n) => {
        const chapterCitas = citas.filter((c) => c.capitulos.includes(n));
        const chapterParalelos = paralelos.filter((p) => p.capitulos.includes(n));

        return (
          <div key={n} className={styles.chapterRow}>
            <Link href={`/${lang}/capitulo/${n}`} className={styles.chapterBig}>
              <b className="np-halftone">{n}</b>
              <span>
                {dict.capitulo.mateoPrefix} {n} →
              </span>
            </Link>

            <div>
              {chapterCitas.length > 0 && (
                <>
                  <div className={`np-kicker ${styles.groupLabel}`}>{dict.paralelos.tipoCitaAT}</div>
                  {chapterCitas.map((c) => (
                    <div key={c.id} className={`np-card ${styles.quote}`}>
                      <div className={styles.quoteRef}>{c.referencia}</div>
                      <p>{c.nota}</p>
                    </div>
                  ))}
                </>
              )}

              {chapterParalelos.length > 0 && (
                <>
                  <div className={`np-kicker ${styles.groupLabel}`} style={{ color: 'var(--muted)', marginTop: chapterCitas.length ? 16 : 4 }}>
                    {dict.paralelos.tipoParalelo}
                  </div>
                  {chapterParalelos.map((p) => (
                    <div key={p.id} className={styles.parallel}>
                      <div className={styles.parallelRef}>{p.referencia}</div>
                      {p.nota && <p>{p.nota}</p>}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
