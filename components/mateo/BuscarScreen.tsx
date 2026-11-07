'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/app-context';
import { filterResults, parseChapterReference, type SearchResult, type SearchResultType } from '@/lib/content/search';
import { getNewspaper } from '@/lib/i18n/newspaper';
import PageHead from './PageHead';
import styles from './screens.module.css';

interface BuscarScreenProps {
  index: SearchResult[];
  initialQuery?: string;
}

const TYPE_ORDER: SearchResultType[] = ['texto', 'comentario', 'griego', 'personajes', 'lugares', 'contexto'];
const MAX_PER_GROUP = 20;

// Resalta la búsqueda dentro del fragmento, como un marcador sobre el papel.
function highlight(text: string, query: string): ReactNode {
  if (!query) return text;
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
}

export default function BuscarScreen({ index, initialQuery = '' }: BuscarScreenProps) {
  const { lang, dict } = useApp();
  const np = getNewspaper(lang);
  const [query, setQuery] = useState(initialQuery);
  const trimmed = query.trim();

  // Sincroniza ?q= en la URL (sin navegar) para que una búsqueda sea un link compartible.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (trimmed) url.searchParams.set('q', trimmed);
    else url.searchParams.delete('q');
    window.history.replaceState(null, '', url.toString());
  }, [trimmed]);

  const chapterRef = useMemo(() => parseChapterReference(lang, query), [lang, query]);
  const results = useMemo(() => filterResults(index, query), [index, query]);

  const typeLabels: Record<SearchResultType, string> = {
    texto: dict.buscar.tipoTexto,
    comentario: dict.buscar.tipoComentario,
    griego: dict.buscar.tipoGriego,
    personajes: dict.buscar.tipoPersonajes,
    lugares: dict.buscar.tipoLugares,
    contexto: dict.buscar.tipoContexto,
  };

  const groups = TYPE_ORDER.map((type) => ({ type, items: results.filter((r) => r.type === type).slice(0, MAX_PER_GROUP) })).filter(
    (g) => g.items.length > 0
  );

  return (
    <div className={styles.page}>
      <PageHead kicker={np.kicker.buscar} title={dict.buscar.title} />

      <div className={`${styles.searchBox} ${styles.bigSearch}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
          <circle cx="11" cy="11" r="7"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input className="np-input" autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder={dict.buscar.placeholder} />
      </div>

      {!trimmed && <p className={styles.empty}>{dict.buscar.empiezaAEscribir}</p>}
      {trimmed && results.length > 0 && <div className={styles.resultCount}>{np.results(results.length)}</div>}

      {trimmed && chapterRef && (
        <Link href={chapterRef.href} className={`np-card ${styles.jump}`}>
          {dict.buscar.referenciaResultado(chapterRef.chapter)}
          <span aria-hidden>→</span>
        </Link>
      )}

      {trimmed && results.length === 0 && !chapterRef && <p className={styles.empty}>{dict.buscar.sinResultados}</p>}

      {groups.map((g) => (
        <section key={g.type}>
          <h2 className={styles.sectionTitle}>
            {typeLabels[g.type]} <small>{g.items.length}</small>
          </h2>
          <div className={styles.results}>
            {g.items.map((r) => (
              <Link key={r.id} href={r.href} className={styles.result}>
                <b>{r.label}</b>
                <span>{highlight(r.snippet, trimmed)}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
