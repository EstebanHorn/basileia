import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import TerminosScreen from '@/components/mateo/TerminosScreen';

export default async function TerminosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <TerminosScreen />;
}
