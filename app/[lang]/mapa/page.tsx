import type { Metadata } from 'next';
import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { buildMetadata } from '@/lib/seo';
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

  return <MapaScreen lugares={getLugares(lang)} />;
}
