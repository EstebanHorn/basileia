import type { Metadata } from 'next';
import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { buildMetadata } from '@/lib/seo';
import { getSections } from '@/lib/content/editorial';
import IndiceScreen from '@/components/mateo/IndiceScreen';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return buildMetadata({ lang, path: '/indice', title: dict.seo.indice.title, description: dict.seo.indice.description, siteName: dict.meta.title });
}

export default async function IndicePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <IndiceScreen sections={getSections(lang)} />;
}
