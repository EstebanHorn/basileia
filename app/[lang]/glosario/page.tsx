import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getGlosario } from '@/lib/content/loader';
import GlosarioScreen from '@/components/mateo/GlosarioScreen';

export default async function GlosarioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <GlosarioScreen terminos={getGlosario(lang)} />;
}
