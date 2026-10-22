import type { Metadata } from 'next';
import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { buildMetadata } from '@/lib/seo';
import { getContexto } from '@/lib/content/loader';
import ContextoScreen from '@/components/mateo/ContextoScreen';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    path: '/contexto',
    title: dict.seo.contexto.title,
    description: dict.seo.contexto.description,
    siteName: dict.meta.title,
  });
}

export default async function ContextoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <ContextoScreen contexto={getContexto(lang)} />;
}
