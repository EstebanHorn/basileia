import { describe, expect, it } from 'vitest';
import { COMPLETED_RANGE, MAX_CHAPTER, isCompleted, sectionFor, getChapterMeta } from './editorial';

describe('isCompleted', () => {
  it('es verdadero dentro del rango completado', () => {
    expect(isCompleted(COMPLETED_RANGE[0])).toBe(true);
    expect(isCompleted(COMPLETED_RANGE[1])).toBe(true);
  });

  it('es falso fuera del rango completado', () => {
    expect(isCompleted(COMPLETED_RANGE[1] + 1)).toBe(false);
    expect(isCompleted(MAX_CHAPTER)).toBe(false);
  });
});

describe('sectionFor', () => {
  it('encuentra la sección que contiene un capítulo', () => {
    const section = sectionFor('es', 6);
    expect(section?.range[0]).toBeLessThanOrEqual(6);
    expect(section?.range[1]).toBeGreaterThanOrEqual(6);
  });

  it('devuelve undefined para un capítulo fuera de todas las secciones', () => {
    expect(sectionFor('es', 999)).toBeUndefined();
  });
});

describe('getChapterMeta', () => {
  it('devuelve metadata para un capítulo completado', () => {
    expect(getChapterMeta('es', 1)).toBeDefined();
  });

  it('devuelve undefined para un capítulo sin metadata', () => {
    expect(getChapterMeta('es', 999)).toBeUndefined();
  });
});
