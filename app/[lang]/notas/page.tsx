import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import NotasScreen from '@/components/mateo/NotasScreen';

export default async function NotasPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <NotasScreen />;
}
