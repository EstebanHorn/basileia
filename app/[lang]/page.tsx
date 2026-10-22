import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { getSiteUrl } from '@/lib/site';
import { getDiscourses } from '@/lib/content/editorial';
import InicioScreen from '@/components/mateo/InicioScreen';
import JsonLd from '@/components/mateo/JsonLd';

export default async function InicioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const siteUrl = getSiteUrl();

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: dict.meta.title,
          description: dict.meta.description,
          url: `${siteUrl}/${lang}`,
          inLanguage: lang,
          potentialAction: {
            '@type': 'SearchAction',
            target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/${lang}/buscar?q={search_term_string}` },
            'query-input': 'required name=search_term_string',
          },
        }}
      />
      <InicioScreen discourses={getDiscourses(lang)} />
    </>
  );
}
