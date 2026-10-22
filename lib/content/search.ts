import type { Locale } from '@/lib/i18n/config';
import { isCompleted } from './editorial';
import { getContexto, getGlosario, getLugares, getMateo, getPersonajes } from './loader';

export type SearchResultType = 'texto' | 'comentario' | 'griego' | 'personajes' | 'lugares' | 'contexto';

export interface SearchResult {
  type: SearchResultType;
  id: string;
  label: string;
  snippet: string;
  href: string;
}

const REFERENCE_RE = /^(?:mt|mateo)?\s*(\d{1,2})(?::\d{1,3})?$/i;

/** Construye el índice plano de búsqueda para un idioma. Pensado para llamarse una vez, server-side. */
export function buildSearchIndex(lang: Locale): SearchResult[] {
  const results: SearchResult[] = [];
  const mateo = getMateo(lang);

  for (const entry of Object.values(mateo)) {
    if (!isCompleted(entry.capitulo)) continue;
    const href = `/${lang}/capitulo/${entry.capitulo}`;
    for (const v of entry.versiculos) {
      results.push({
        type: 'texto',
        id: `texto-${entry.capitulo}-${v.numero}`,
        label: `Mateo ${entry.capitulo}:${v.numero}`,
        snippet: v.texto,
        href,
      });
      if (v.comentario) {
        results.push({
          type: 'comentario',
          id: `comentario-${entry.capitulo}-${v.numero}`,
          label: `Mateo ${entry.capitulo}:${v.numero}`,
          snippet: v.comentario,
          href,
        });
      }
    }
  }

  for (const g of getGlosario(lang)) {
    results.push({
      type: 'griego',
      id: `griego-${g.id}`,
      label: `${g.griego} — ${g.transliteracion}`,
      snippet: g.significado,
      href: g.capitulos.length > 0 ? `/${lang}/capitulo/${g.capitulos[0]}` : `/${lang}/glosario`,
    });
  }

  for (const p of getPersonajes(lang)) {
    results.push({
      type: 'personajes',
      id: `personaje-${p.id}`,
      label: p.nombre,
      snippet: p.descripcion,
      href: `/${lang}/personajes`,
    });
  }

  for (const l of getLugares(lang)) {
    results.push({
      type: 'lugares',
      id: `lugar-${l.id}`,
      label: l.nombre,
      snippet: l.nota,
      href: `/${lang}/mapa`,
    });
  }

  for (const c of getContexto(lang)) {
    results.push({
      type: 'contexto',
      id: `contexto-${c.id}`,
      label: c.titulo,
      snippet: c.texto,
      href: `/${lang}/contexto`,
    });
  }

  return results;
}

/** Si la búsqueda es una referencia de capítulo completo (ej. "Mt 6:9", "mateo 6", "6"), resuelve a dónde ir. */
export function parseChapterReference(lang: Locale, query: string): { chapter: number; href: string } | null {
  const match = query.trim().match(REFERENCE_RE);
  if (!match) return null;
  const chapter = Number(match[1]);
  if (!isCompleted(chapter)) return null;
  return { chapter, href: `/${lang}/capitulo/${chapter}` };
}

function snippetAround(text: string, query: string, radius = 70): string {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return text.slice(0, radius * 2);
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + query.length + radius);
  return `${start > 0 ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`;
}

/** Filtra un índice ya construido por substring (case-insensitive) sobre label/snippet. Barato: se puede llamar en cada tecla. */
export function filterResults(index: SearchResult[], query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return index
    .filter((r) => r.label.toLowerCase().includes(q) || r.snippet.toLowerCase().includes(q))
    .map((r) => ({ ...r, snippet: snippetAround(r.snippet, query.trim()) }));
}
