import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { buildMetadata } from '@/lib/seo';
import { getSiteUrl } from '@/lib/site';
import { getChapter, getGlosario, getPersonajes, getLugares, getContextoById, getCitasATById, getParalelosById } from '@/lib/content/loader';
import { buildBlocks } from '@/lib/content/blocks';
import { MAX_CHAPTER, getChapterMeta, sectionFor } from '@/lib/content/editorial';
import CapituloScreen from '@/components/mateo/CapituloScreen';
import JsonLd from '@/components/mateo/JsonLd';

export async function generateStaticParams() {
  return Array.from({ length: MAX_CHAPTER }, (_, i) => ({ n: String(i + 1) }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; n: string }> }): Promise<Metadata> {
  const { lang, n } = await params;
  if (!hasLocale(lang)) return {};
  const chapter = parseInt(n, 10);
  if (!Number.isInteger(chapter) || chapter < 1 || chapter > MAX_CHAPTER) return {};

  const dict = await getDictionary(lang);
  const meta = getChapterMeta(lang, chapter);
  const title = meta ? `${dict.capitulo.mateoPrefix} ${chapter}: ${meta.title}` : `${dict.capitulo.mateoPrefix} ${chapter}`;
  const description = meta ? meta.intro.slice(0, 300) : dict.capitulo.pendingBody;

  return buildMetadata({ lang, path: `/capitulo/${chapter}`, title, description, siteName: dict.meta.title });
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
  const citasAtById = Object.fromEntries(getCitasATById(lang));
  const paralelosById = Object.fromEntries(getParalelosById(lang));

  const dict = await getDictionary(lang);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${lang}/capitulo/${currentChapter}`;

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: meta ? `${dict.capitulo.mateoPrefix} ${currentChapter}: ${meta.title}` : `${dict.capitulo.mateoPrefix} ${currentChapter}`,
          description: meta?.intro,
          inLanguage: lang,
          url: pageUrl,
          isPartOf: { '@type': 'Book', name: dict.meta.title },
          publisher: { '@type': 'Organization', name: dict.meta.title },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: dict.inicio.title, item: `${siteUrl}/${lang}` },
            { '@type': 'ListItem', position: 2, name: dict.indice.title, item: `${siteUrl}/${lang}/indice` },
            { '@type': 'ListItem', position: 3, name: `${dict.capitulo.mateoPrefix} ${currentChapter}`, item: pageUrl },
          ],
        }}
      />
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
        citasAtById={citasAtById}
        paralelosById={paralelosById}
      />
    </>
  );
}
