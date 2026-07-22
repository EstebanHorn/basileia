import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getDiscourses } from '@/lib/content/editorial';
import InicioScreen from '@/components/mateo/InicioScreen';

export default async function InicioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <InicioScreen discourses={getDiscourses(lang)} />;
}
