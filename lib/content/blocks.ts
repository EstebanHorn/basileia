import type { ChapterBlock, ChapterEntry } from './types';

function union(existing: string[], extra: string[]): string[] {
  const out = existing.slice();
  for (const id of extra) if (!out.includes(id)) out.push(id);
  return out;
}

// Consecutive versículos que comparten el mismo comentario forman un mismo bloque
// (así se reconstruye la agrupación editorial original a partir de los datos por versículo).
export function buildBlocks(entry: ChapterEntry): ChapterBlock[] {
  const blocks: ChapterBlock[] = [];

  for (const v of entry.versiculos) {
    const last = blocks[blocks.length - 1];
    if (last && last.commentary === v.comentario) {
      last.to = v.numero;
      last.ref = `${entry.capitulo}:${last.from}-${last.to}`;
      last.text = `${last.text} ${v.texto}`;
      last.greekIds = union(last.greekIds, v.griego_ids);
      last.personajeIds = union(last.personajeIds, v.personaje_ids);
      last.lugarIds = union(last.lugarIds, v.lugar_ids);
      continue;
    }

    blocks.push({
      from: v.numero,
      to: v.numero,
      ref: `${entry.capitulo}:${v.numero}`,
      text: v.texto,
      commentary: v.comentario,
      greekIds: [...v.griego_ids],
      personajeIds: [...v.personaje_ids],
      lugarIds: [...v.lugar_ids],
    });
  }

  return blocks;
}
