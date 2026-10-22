import { describe, expect, it } from 'vitest';
import { buildBlocks } from './blocks';
import type { ChapterEntry } from './types';

function entry(versiculos: ChapterEntry['versiculos']): ChapterEntry {
  return { libro: 'Mateo', capitulo: 1, discurso_id: '', estado: 'completo', versiculos, contexto_ids: [], reflexion: [] };
}

describe('buildBlocks', () => {
  it('unionea cita_at_ids y paralelo_ids de los versículos agrupados en un mismo bloque', () => {
    const blocks = buildBlocks(
      entry([
        { numero: 22, texto: 'a', comentario: 'mismo comentario', griego_ids: [], personaje_ids: [], lugar_ids: [] },
        {
          numero: 23,
          texto: 'b',
          comentario: 'mismo comentario',
          griego_ids: [],
          personaje_ids: [],
          lugar_ids: [],
          cita_at_ids: ['cita-1-23'],
          paralelo_ids: ['par-1-23'],
        },
      ])
    );

    expect(blocks).toHaveLength(1);
    expect(blocks[0].citaAtIds).toEqual(['cita-1-23']);
    expect(blocks[0].paraleloIds).toEqual(['par-1-23']);
  });

  it('no falla cuando un versículo no tiene cita_at_ids ni paralelo_ids', () => {
    const blocks = buildBlocks(entry([{ numero: 1, texto: 'a', comentario: 'c', griego_ids: [], personaje_ids: [], lugar_ids: [] }]));

    expect(blocks[0].citaAtIds).toEqual([]);
    expect(blocks[0].paraleloIds).toEqual([]);
  });
});
