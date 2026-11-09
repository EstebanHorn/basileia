import type { Metadata } from 'next';
import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { buildMetadata } from '@/lib/seo';
import { getSiteUrl } from '@/lib/site';
import JsonLd from '@/components/mateo/JsonLd';
import PageLd from '@/components/mateo/PageLd';
import { getGlosario } from '@/lib/content/loader';
import GlosarioScreen from '@/components/mateo/GlosarioScreen';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    path: '/glosario',
    title: dict.seo.glosario.title,
    description: dict.seo.glosario.description,
    siteName: dict.meta.title,
  });
}

export default async function GlosarioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const terminos = getGlosario(lang);
  const siteUrl = getSiteUrl();
  const dict = await getDictionary(lang);
  return (
    <>
      <PageLd lang={lang} path="/glosario" seoKey="glosario" />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'DefinedTermSet',
          '@id': `${siteUrl}/${lang}/glosario#terms`,
          name: dict.seo.glosario.title,
          description: dict.seo.glosario.description,
          inLanguage: lang,
          url: `${siteUrl}/${lang}/glosario`,
          hasDefinedTerm: terminos.map((t) => ({
            '@type': 'DefinedTerm',
            name: t.griego,
            alternateName: t.transliteracion,
            description: t.significado,
            inDefinedTermSet: `${siteUrl}/${lang}/glosario#terms`,
          })),
        }}
      />
      <GlosarioScreen terminos={terminos} />
    </>
  );
}
