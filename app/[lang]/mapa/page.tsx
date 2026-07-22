import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getLugares } from '@/lib/content/loader';
import MapaScreen from '@/components/mateo/MapaScreen';

export default async function MapaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <MapaScreen lugares={getLugares(lang)} />;
}
