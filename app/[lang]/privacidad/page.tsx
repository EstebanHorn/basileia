import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import PrivacidadScreen from '@/components/mateo/PrivacidadScreen';

export default async function PrivacidadPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <PrivacidadScreen />;
}
