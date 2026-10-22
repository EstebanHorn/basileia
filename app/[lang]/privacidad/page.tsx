import type { Metadata } from 'next';
import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { buildMetadata } from '@/lib/seo';
import PrivacidadScreen from '@/components/mateo/PrivacidadScreen';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    path: '/privacidad',
    title: dict.seo.privacidad.title,
    description: dict.seo.privacidad.description,
    siteName: dict.meta.title,
  });
}

export default async function PrivacidadPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <PrivacidadScreen />;
}
