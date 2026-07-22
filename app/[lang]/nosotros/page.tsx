import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import SobreNosotrosScreen from '@/components/mateo/SobreNosotrosScreen';

export default async function NosotrosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <SobreNosotrosScreen />;
}
