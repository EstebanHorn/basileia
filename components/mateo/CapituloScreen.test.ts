import { describe, expect, it } from 'vitest';
import { segmentText } from './CapituloScreen';
import type { GlosarioTermino } from '@/lib/content/types';

const term: GlosarioTermino = {
  id: 'g1',
  griego: 'μακάριος',
  lema: 'μακάριος',
  morfologia: 'adjetivo, nominativo singular masculino',
  transliteracion: 'makarios',
  significado: 'dichoso',
  palabra: 'dichosos',
  nota: '',
  capitulos: [5],
};

describe('segmentText', () => {
  it('devuelve un solo segmento plano cuando no hay términos', () => {
    const segments = segmentText('Dichosos los pobres en espíritu', []);
    expect(segments).toEqual([{ plain: true, text: 'Dichosos los pobres en espíritu' }]);
  });

  it('separa el término coincidente del resto del texto', () => {
    const segments = segmentText('Dichosos los pobres en espíritu', [term]);
    expect(segments.some((s) => !s.plain && s.term === term)).toBe(true);
    expect(segments.map((s) => s.text).join('')).toBe('Dichosos los pobres en espíritu');
  });

  it('no rompe si el término no aparece en el texto', () => {
    const segments = segmentText('otro texto sin coincidencia', [term]);
    expect(segments).toEqual([{ plain: true, text: 'otro texto sin coincidencia' }]);
  });
});
