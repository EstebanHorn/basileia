import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { organizationLd, websiteLd } from '@/lib/jsonld';
import { getDiscourses, MAX_CHAPTER } from '@/lib/content/editorial';
import { buildEditions } from '@/lib/content/editions';
import PeriodicoScreen from '@/components/mateo/periodico/PeriodicoScreen';
import JsonLd from '@/components/mateo/JsonLd';

const HOME_TITLE = {
  es: 'Basileia - Estudio del Evangelio de Mateo: griego, contexto y comentario',
  pt: 'Basileia - Estudo do Evangelho de Mateus: grego, contexto e comentário',
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const meta = buildMetadata({ lang, title: HOME_TITLE[lang], description: dict.meta.description, siteName: dict.meta.title });
  // En la portada el título va completo, sin el sufijo " - Basileia" de la plantilla.
  return { ...meta, title: { absolute: HOME_TITLE[lang] } };
}

export default async function InicioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <JsonLd data={organizationLd(dict.meta.title, dict.meta.description)} />
      <JsonLd data={websiteLd(lang, dict.meta.title, dict.meta.description)} />
      <PeriodicoScreen
        editions={buildEditions(lang)}
        totalChapters={MAX_CHAPTER}
        discourses={getDiscourses(lang).map((d) => ({ name: d.name, summary: d.summary, chapters: d.chapters }))}
      />
    </>
  );
}
