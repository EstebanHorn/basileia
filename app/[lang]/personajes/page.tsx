import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getPersonajes } from '@/lib/content/loader';
import PersonajesScreen from '@/components/mateo/PersonajesScreen';

export default async function PersonajesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <PersonajesScreen personajes={getPersonajes(lang)} />;
}
