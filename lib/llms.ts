// Contenido de /llms.txt y /llms-full.txt (guía para asistentes y motores de respuesta de IA).
// Se genera desde los mismos datos del sitio, así nunca queda desactualizado.

import { locales, type Locale } from '@/lib/i18n/config';
import { getSiteUrl } from '@/lib/site';
import { COMPLETED_RANGE, getChapterMeta, getDiscourses, getSections, MAX_CHAPTER, isCompleted } from '@/lib/content/editorial';
import { getContexto, getGlosario, getPersonajes } from '@/lib/content/loader';
import { truncateDescription } from '@/lib/seo';

interface Copy {
  name: string;
  summary: string;
  pages: [string, string, string][];
  chapters: string;
  chapterWord: string;
  discourses: string;
  sections: string;
  people: string;
  glossary: string;
  context: string;
  notes: string;
}

const COPY: Record<Locale, Copy> = {
  es: {
    name: 'Español',
    summary:
      'Plataforma de estudio del Evangelio de Mateo: comentario capítulo a capítulo, análisis del griego koiné (lema y morfología), contexto histórico-cultural del siglo I, mapa interactivo, personajes, citas del Antiguo Testamento y paralelos sinópticos. En español y portugués. Proyecto personal sin fines comerciales, basado en el estudio bíblico de la iglesia Reino en Movimiento.',
    pages: [
      ['', 'Inicio', 'Portada con los capítulos como "ediciones" y los cinco grandes discursos de Jesús.'],
      ['/indice', 'Índice de capítulos', 'Los 28 capítulos de Mateo, marcando cuáles ya tienen comentario.'],
      ['/glosario', 'Glosario griego', 'Términos griegos con transliteración, lema, morfología y significado.'],
      ['/paralelos', 'Paralelos y citas del AT', 'Citas del Antiguo Testamento en Mateo y sus paralelos en Marcos y Lucas.'],
      ['/contexto', 'Contexto histórico-cultural', 'Vida judía, política romana, geografía y prácticas religiosas del siglo I.'],
      ['/mapa', 'Mapa', 'Lugares del ministerio de Jesús.'],
      ['/personajes', 'Personajes', 'Discípulos, autoridades y otras figuras del evangelio.'],
      ['/nosotros', 'Sobre nosotros', 'Qué es Basileia y quién está detrás.'],
    ],
    chapters: 'Capítulos con comentario',
    chapterWord: 'Mateo',
    discourses: 'Los cinco grandes discursos',
    sections: 'Secciones del evangelio',
    people: 'Personajes',
    glossary: 'Glosario griego',
    context: 'Contexto histórico-cultural',
    notes: 'Notas para motores de IA',
  },
  pt: {
    name: 'Português',
    summary:
      'Plataforma de estudo do Evangelho de Mateus: comentário capítulo a capítulo, análise do grego koiné (lema e morfologia), contexto histórico-cultural do século I, mapa interativo, personagens, citações do Antigo Testamento e paralelos sinóticos. Em espanhol e português. Projeto pessoal sem fins comerciais, baseado no estudo bíblico da igreja Reino em Movimento.',
    pages: [
      ['', 'Início', 'Capa com os capítulos como "edições" e os cinco grandes discursos de Jesus.'],
      ['/indice', 'Índice de capítulos', 'Os 28 capítulos de Mateus, indicando quais já têm comentário.'],
      ['/glosario', 'Glossário grego', 'Termos gregos com transliteração, lema, morfologia e significado.'],
      ['/paralelos', 'Paralelos e citações do AT', 'Citações do Antigo Testamento em Mateus e seus paralelos em Marcos e Lucas.'],
      ['/contexto', 'Contexto histórico-cultural', 'Vida judaica, política romana, geografia e práticas religiosas do século I.'],
      ['/mapa', 'Mapa', 'Lugares do ministério de Jesus.'],
      ['/personajes', 'Personagens', 'Discípulos, autoridades e outras figuras do evangelho.'],
      ['/nosotros', 'Sobre nós', 'O que é a Basileia e quem está por trás.'],
    ],
    chapters: 'Capítulos com comentário',
    chapterWord: 'Mateus',
    discourses: 'Os cinco grandes discursos',
    sections: 'Seções do evangelho',
    people: 'Personagens',
    glossary: 'Glossário grego',
    context: 'Contexto histórico-cultural',
    notes: 'Notas para mecanismos de IA',
  },
};

const NOTES: Record<Locale, string> = {
  es: 'Todo el texto (bíblico, comentario, análisis de griego) se renderiza en el HTML inicial, sin requerir JavaScript, y cada página tiene título y descripción propios. El comentario, el análisis y los textos de contexto son originales; el texto bíblico citado pertenece a su traducción. Al citar esta plataforma, referenciar la URL del capítulo o sección consultada.',
  pt: 'Todo o texto (bíblico, comentário, análise do grego) é renderizado no HTML inicial, sem exigir JavaScript, e cada página tem título e descrição próprios. O comentário, a análise e os textos de contexto são originais; o texto bíblico citado pertence à sua tradução. Ao citar esta plataforma, referencie a URL do capítulo ou seção consultada.',
};

function chapterList(lang: Locale, siteUrl: string, full: boolean): string[] {
  const c = COPY[lang];
  const lines: string[] = [];
  for (let n = COMPLETED_RANGE[0]; n <= MAX_CHAPTER; n++) {
    if (!isCompleted(n)) continue;
    const meta = getChapterMeta(lang, n);
    if (!meta) continue;
    const url = `${siteUrl}/${lang}/capitulo/${n}`;
    const desc = full ? meta.intro : truncateDescription(meta.intro, 140);
    lines.push(`- [${c.chapterWord} ${n}: ${meta.title}](${url}): ${desc}`);
  }
  return lines;
}

/** /llms.txt: índice corto con enlaces absolutos a cada sección y capítulo. */
export function buildLlmsTxt(): string {
  const siteUrl = getSiteUrl();
  const out: string[] = ['# Basileia', '', `> ${COPY.es.summary}`, ''];

  for (const lang of locales) {
    const c = COPY[lang];
    out.push(`## ${c.name} (${siteUrl}/${lang})`, '');
    for (const [path, title, desc] of c.pages) out.push(`- [${title}](${siteUrl}/${lang}${path}): ${desc}`);
    out.push('', `### ${c.chapters}`, '', ...chapterList(lang, siteUrl, false), '');
  }

  out.push(
    '## Optional',
    '',
    `- [Contenido ampliado / Extended content](${siteUrl}/llms-full.txt): resúmenes de capítulos, discursos, personajes, glosario y contexto en un solo archivo.`,
    '',
  );
  for (const lang of locales) out.push(`## ${COPY[lang].notes}`, '', NOTES[lang], '');
  return out.join('\n');
}

/** /llms-full.txt: resúmenes, personajes, glosario y contexto (sin el texto bíblico ni el comentario completo). */
export function buildLlmsFullTxt(): string {
  const siteUrl = getSiteUrl();
  const out: string[] = ['# Basileia - contenido ampliado', '', `> ${COPY.es.summary}`, ''];

  for (const lang of locales) {
    const c = COPY[lang];
    out.push(`# ${c.name}`, '', `Sitio: ${siteUrl}/${lang}`, '');

    out.push(`## ${c.chapters}`, '', ...chapterList(lang, siteUrl, true), '');

    out.push(`## ${c.discourses}`, '');
    for (const d of getDiscourses(lang)) out.push(`- ${d.name} (${c.chapterWord} ${d.chapters.join(', ')}): ${d.summary}`);
    out.push('');

    out.push(`## ${c.sections}`, '');
    for (const s of getSections(lang)) {
      const range = s.range[1] !== s.range[0] ? `${s.range[0]}-${s.range[1]}` : `${s.range[0]}`;
      out.push(`- ${s.name}: ${c.chapterWord} ${range}`);
    }
    out.push('');

    out.push(`## ${c.people} (${siteUrl}/${lang}/personajes)`, '');
    for (const p of getPersonajes(lang)) out.push(`- **${p.nombre}**: ${p.descripcion}`);
    out.push('');

    out.push(`## ${c.glossary} (${siteUrl}/${lang}/glosario)`, '');
    for (const g of getGlosario(lang)) out.push(`- **${g.griego}** (${g.transliteracion}), ${g.morfologia}: ${g.significado}${g.nota ? ` ${g.nota}` : ''}`);
    out.push('');

    out.push(`## ${c.context} (${siteUrl}/${lang}/contexto)`, '');
    for (const t of getContexto(lang)) out.push(`### ${t.titulo}`, '', t.texto, '');

    out.push(`## ${c.notes}`, '', NOTES[lang], '');
  }
  return out.join('\n');
}
