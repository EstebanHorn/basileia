import type { Metadata } from 'next';
import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { buildMetadata } from '@/lib/seo';
import { buildSearchIndex } from '@/lib/content/search';
import BuscarScreen from '@/components/mateo/BuscarScreen';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    path: '/buscar',
    title: dict.buscar.title,
    description: dict.buscar.empiezaAEscribir,
    siteName: dict.meta.title,
    noindex: true,
  });
}

export default async function BuscarPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { q } = await searchParams;

  return <BuscarScreen index={buildSearchIndex(lang)} initialQuery={q ?? ''} />;
}
