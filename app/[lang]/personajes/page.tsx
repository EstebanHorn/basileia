import type { Metadata } from 'next';
import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { buildMetadata } from '@/lib/seo';
import { getPersonajes } from '@/lib/content/loader';
import PersonajesScreen from '@/components/mateo/PersonajesScreen';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    path: '/personajes',
    title: dict.seo.personajes.title,
    description: dict.seo.personajes.description,
    siteName: dict.meta.title,
  });
}

export default async function PersonajesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <PersonajesScreen personajes={getPersonajes(lang)} />;
}
