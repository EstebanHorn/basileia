import { hasLocale, defaultLocale, locales } from '@/lib/i18n/config';
import { homeOg, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og';

export const alt = 'Basileia - Estudio del Evangelio de Mateo';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return homeOg(hasLocale(lang) ? lang : defaultLocale);
}
