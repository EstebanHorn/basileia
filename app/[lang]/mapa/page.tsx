import type { Metadata } from 'next';
import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { buildMetadata } from '@/lib/seo';
import PageLd from '@/components/mateo/PageLd';
import { getLugares } from '@/lib/content/loader';
import MapaScreen from '@/components/mateo/MapaScreen';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return buildMetadata({ lang, path: '/mapa', title: dict.seo.mapa.title, description: dict.seo.mapa.description, siteName: dict.meta.title });
}

export default async function MapaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const lugares = getLugares(lang);
  return (
    <>
      <PageLd lang={lang} path="/mapa" seoKey="mapa" items={lugares.map((l) => ({ name: l.nombre, description: l.nota }))} />
      <MapaScreen lugares={lugares} />
    </>
  );
}
