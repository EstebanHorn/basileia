import type { Metadata } from 'next';
import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { buildMetadata } from '@/lib/seo';
import { getCitasAT, getParalelos } from '@/lib/content/loader';
import ParalelosScreen from '@/components/mateo/ParalelosScreen';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    path: '/paralelos',
    title: dict.seo.paralelos.title,
    description: dict.seo.paralelos.description,
    siteName: dict.meta.title,
  });
}

export default async function ParalelosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <ParalelosScreen citas={getCitasAT(lang)} paralelos={getParalelos(lang)} />;
}
