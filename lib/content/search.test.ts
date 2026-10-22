import { describe, expect, it } from 'vitest';
import { buildSearchIndex, filterResults, parseChapterReference } from './search';
import { COMPLETED_RANGE } from './editorial';

describe('parseChapterReference', () => {
  it('reconoce "Mt 6:9"', () => {
    const ref = parseChapterReference('es', 'Mt 6:9');
    expect(ref).toEqual({ chapter: 6, href: '/es/capitulo/6' });
  });

  it('reconoce "mateo 6" sin número de versículo', () => {
    const ref = parseChapterReference('es', 'mateo 6');
    expect(ref?.chapter).toBe(6);
  });

  it('reconoce un número de capítulo solo', () => {
    const ref = parseChapterReference('es', '6');
    expect(ref?.chapter).toBe(6);
  });

  it('devuelve null para un capítulo no completado', () => {
    expect(parseChapterReference('es', String(COMPLETED_RANGE[1] + 1))).toBeNull();
  });

  it('devuelve null para texto que no es una referencia', () => {
    expect(parseChapterReference('es', 'reino de los cielos')).toBeNull();
  });
});

describe('filterResults', () => {
  const index = buildSearchIndex('es');

  it('devuelve resultados vacíos para una búsqueda vacía', () => {
    expect(filterResults(index, '   ')).toEqual([]);
  });

  it('encuentra términos de glosario por transliteración', () => {
    const results = filterResults(index, 'makarios');
    expect(results.some((r) => r.type === 'griego')).toBe(true);
  });

  it('la búsqueda no distingue mayúsculas/minúsculas', () => {
    const lower = filterResults(index, 'reino');
    const upper = filterResults(index, 'REINO');
    expect(upper.length).toBe(lower.length);
    expect(upper.length).toBeGreaterThan(0);
  });
});
