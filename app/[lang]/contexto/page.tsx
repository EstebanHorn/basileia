import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getContexto } from '@/lib/content/loader';
import ContextoScreen from '@/components/mateo/ContextoScreen';

export default async function ContextoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <ContextoScreen contexto={getContexto(lang)} />;
}
