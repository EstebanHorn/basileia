// Datos de la portada: cada capítulo publicado es una "edición" del diario.
// Solo se arma lo que la portada necesita, para no mandar los JSON completos al cliente.

import type { Locale } from '@/lib/i18n/config';
import { getGlosario, getMateo, getPersonajes } from './loader';
import { COMPLETED_RANGE, getChapterMeta, getDiscourses, sectionFor } from './editorial';

export interface EditionWord {
  id: string;
  greek: string;
  translit: string;
  word: string;
  meaning: string;
}

export interface Edition {
  n: number;
  title: string;
  intro: string;
  section: string;
  discourse: string | null;
  verseCount: number;
  wordCount: number;
  verses: { n: number; text: string }[];
  people: { id: string; name: string; description: string }[];
  words: EditionWord[];
}

export function buildEditions(lang: Locale): Edition[] {
  const mateo = getMateo(lang);
  const personajes = getPersonajes(lang);
  const glosario = getGlosario(lang);
  const discourses = getDiscourses(lang);

  const toWord = (g: (typeof glosario)[number]): EditionWord => ({
    id: g.id,
    greek: g.griego,
    translit: g.transliteracion,
    word: g.palabra,
    meaning: g.significado,
  });
  // Capítulos sin términos propios en el glosario muestran algunos generales.
  const fallbackWords = glosario.slice(0, 8).map(toWord);

  const editions: Edition[] = [];
  for (let n = COMPLETED_RANGE[0]; n <= COMPLETED_RANGE[1]; n++) {
    const meta = getChapterMeta(lang, n);
    const entry = mateo[n];
    if (!meta || !entry) continue;
    const words = glosario
      .filter((g) => g.capitulos.includes(n))
      .slice(0, 8)
      .map(toWord);
    editions.push({
      n,
      title: meta.title,
      intro: meta.intro,
      section: sectionFor(lang, n)?.name ?? '',
      discourse: discourses.find((d) => d.chapters.includes(n))?.name ?? null,
      verseCount: entry.versiculos.length,
      wordCount: words.length,
      verses: entry.versiculos
        .filter((v) => v.texto.length > 50 && v.texto.length < 190)
        .slice(0, 10)
        .map((v) => ({ n: v.numero, text: v.texto })),
      people: personajes
        .filter((p) => p.capitulos.includes(n))
        .slice(0, 6)
        .map((p) => ({ id: p.id, name: p.nombre, description: p.descripcion })),
      words: words.length ? words : fallbackWords,
    });
  }
  return editions;
}
