import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getSections } from '@/lib/content/editorial';
import IndiceScreen from '@/components/mateo/IndiceScreen';

export default async function IndicePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <IndiceScreen sections={getSections(lang)} />;
}
