'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/app-context';
import { getNewspaper } from '@/lib/i18n/newspaper';
import type { GlosarioTermino } from '@/lib/content/types';
import Pressable from './Pressable';
import PageHead from './PageHead';
import styles from './screens.module.css';

interface GlosarioScreenProps {
  terminos: GlosarioTermino[];
}

type Categoria = 'verbo' | 'sustantivo' | 'adjetivo' | 'otro';

function categoriaDe(morfologia: string): Categoria {
  const m = morfologia.toLowerCase();
  if (m.startsWith('verbo')) return 'verbo';
  if (m.startsWith('sustantivo') || m.startsWith('substantivo')) return 'sustantivo';
  if (m.startsWith('adjetivo')) return 'adjetivo';
  return 'otro';
}

export default function GlosarioScreen({ terminos }: GlosarioScreenProps) {
  const { lang, dict } = useApp();
  const np = getNewspaper(lang);
  const [query, setQuery] = useState('');
  const [categoria, setCategoria] = useState<Categoria | 'todos'>('todos');

  const categoriaLabels: Record<Categoria, string> = {
    verbo: dict.glosario.categoriaVerbo,
    sustantivo: dict.glosario.categoriaSustantivo,
    adjetivo: dict.glosario.categoriaAdjetivo,
    otro: dict.glosario.categoriaOtro,
  };

  const sorted = [...terminos].sort((a, b) => a.transliteracion.localeCompare(b.transliteracion));
  const gq = query.trim().toLowerCase();
  const items = sorted.filter((t) => {
    if (categoria !== 'todos' && categoriaDe(t.morfologia) !== categoria) return false;
    if (!gq) return true;
    return (
      t.transliteracion.toLowerCase().includes(gq) ||
      t.significado.toLowerCase().includes(gq) ||
      t.griego.toLowerCase().includes(gq) ||
      t.lema.toLowerCase().includes(gq)
    );
  });

  const chips: { id: Categoria | 'todos'; name: string }[] = [
    { id: 'todos', name: dict.glosario.categoriaTodos },
    { id: 'verbo', name: categoriaLabels.verbo },
    { id: 'sustantivo', name: categoriaLabels.sustantivo },
    { id: 'adjetivo', name: categoriaLabels.adjetivo },
    { id: 'otro', name: categoriaLabels.otro },
  ];

  return (
    <div className={styles.page}>
      <PageHead kicker={np.kicker.glosario} title={dict.glosario.title}>
        {dict.glosario.statLine(terminos.length)}
      </PageHead>

      <div className={styles.searchBox}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
          <circle cx="11" cy="11" r="7"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input className="np-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={dict.glosario.searchPlaceholder} />
      </div>

      <div className={styles.chips}>
        {chips.map((c) => (
          <Pressable key={c.id} onClick={() => setCategoria(c.id)} aria-pressed={categoria === c.id} className="np-chip">
            {c.name}
          </Pressable>
        ))}
      </div>

      <div className={styles.resultCount}>{np.results(items.length)}</div>

      {items.length === 0 ? (
        <p className={styles.empty}>—</p>
      ) : (
        <div className={styles.dictionary}>
          {items.map((g) => (
            <article key={g.id} className={styles.entry}>
              <div className={styles.entryHead}>
                <span className={styles.greek}>{g.griego}</span>
                <span className={styles.translit}>{g.transliteracion}</span>
              </div>
              {g.lema !== g.griego && (
                <p className={styles.morph}>
                  {dict.capitulo.lemaLabel}: <span style={{ fontStyle: 'normal' }}>{g.lema}</span>
                </p>
              )}
              <p className={styles.morph}>{g.morfologia}</p>
              <p className={styles.meaning}>{g.significado}</p>
              {g.nota && <p className={styles.note}>{g.nota}</p>}
              <div className={styles.refs}>
                {g.capitulos.map((n) => (
                  <Link key={n} href={`/${lang}/capitulo/${n}`} className={styles.ref}>
                    {dict.glosario.verEnMateo(String(n))}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
