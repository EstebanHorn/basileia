import type { Metadata } from 'next';
import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { buildMetadata } from '@/lib/seo';
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

  return <GlosarioScreen terminos={getGlosario(lang)} />;
}
