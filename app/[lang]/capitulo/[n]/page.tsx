import { notFound } from 'next/navigation';
import { hasLocale } from '@/lib/i18n/config';
import { getChapter, getGlosario, getPersonajes, getLugares, getContextoById } from '@/lib/content/loader';
import { buildBlocks } from '@/lib/content/blocks';
import { MAX_CHAPTER, getChapterMeta, sectionFor } from '@/lib/content/editorial';
import CapituloScreen from '@/components/mateo/CapituloScreen';

export async function generateStaticParams() {
  return Array.from({ length: MAX_CHAPTER }, (_, i) => ({ n: String(i + 1) }));
}

export default async function CapituloPage({ params }: { params: Promise<{ lang: string; n: string }> }) {
  const { lang, n } = await params;
  if (!hasLocale(lang)) notFound();

  const currentChapter = parseInt(n, 10);
  if (!Number.isInteger(currentChapter) || currentChapter < 1 || currentChapter > MAX_CHAPTER) notFound();

  const entry = getChapter(lang, currentChapter);
  const blocks = entry ? buildBlocks(entry) : [];
  const meta = getChapterMeta(lang, currentChapter);
  const section = sectionFor(lang, currentChapter);

  const contextoById = getContextoById(lang);
  const contextos = (entry?.contexto_ids ?? []).map((id) => contextoById.get(id)).filter((c) => !!c);

  const glosarioById = Object.fromEntries(getGlosario(lang).map((t) => [t.id, t]));
  const personajesById = Object.fromEntries(getPersonajes(lang).map((p) => [p.id, p]));
  const lugaresById = Object.fromEntries(getLugares(lang).map((l) => [l.id, l]));

  return (
    <CapituloScreen
      currentChapter={currentChapter}
      blocks={blocks}
      meta={meta}
      reflexion={entry?.reflexion}
      section={section}
      contextos={contextos}
      glosarioById={glosarioById}
      personajesById={personajesById}
      lugaresById={lugaresById}
    />
  );
}
