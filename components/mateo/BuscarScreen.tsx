'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/app-context';
import { filterResults, parseChapterReference, type SearchResult, type SearchResultType } from '@/lib/content/search';

interface BuscarScreenProps {
  index: SearchResult[];
  initialQuery?: string;
}

const TYPE_ORDER: SearchResultType[] = ['texto', 'comentario', 'griego', 'personajes', 'lugares', 'contexto'];
const MAX_PER_GROUP = 20;

export default function BuscarScreen({ index, initialQuery = '' }: BuscarScreenProps) {
  const { colors, lang, dict } = useApp();
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
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 32, fontWeight: 600, margin: '0 0 20px' }}>{dict.buscar.title}</h1>
      <input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={dict.buscar.placeholder}
        style={{
          width: '100%',
          padding: '11px 14px',
          borderRadius: 9,
          border: `1px solid ${colors.border}`,
          background: colors.panel,
          color: colors.text,
          fontSize: 14.5,
          marginBottom: 24,
        }}
      />

      {!trimmed && <p style={{ fontSize: 14, color: colors.muted }}>{dict.buscar.empiezaAEscribir}</p>}

      {trimmed && chapterRef && (
        <Link
          href={chapterRef.href}
          style={{
            display: 'block',
            background: colors.subtle,
            border: `1px solid ${colors.accent}`,
            borderRadius: 10,
            padding: '14px 18px',
            marginBottom: 20,
            fontWeight: 600,
            color: colors.accent,
          }}
        >
          {dict.buscar.referenciaResultado(chapterRef.chapter)} →
        </Link>
      )}

      {trimmed && results.length === 0 && !chapterRef && <p style={{ fontSize: 14, color: colors.muted }}>{dict.buscar.sinResultados}</p>}

      {groups.map((g) => (
        <div key={g.type} style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: colors.accent, marginBottom: 10 }}>
            {typeLabels[g.type]}
          </div>
          {g.items.map((r) => (
            <Link
              key={r.id}
              href={r.href}
              style={{ display: 'block', padding: '12px 0', borderBottom: `1px solid ${colors.border}` }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, color: colors.text, marginBottom: 2 }}>{r.label}</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.5, color: colors.muted }}>{r.snippet}</div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
