import { hasLocale, defaultLocale } from '@/lib/i18n/config';
import { getChapterMeta, MAX_CHAPTER } from '@/lib/content/editorial';
import { chapterOg, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og';

export const alt = 'Basileia - Capítulo de Mateo';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  return Array.from({ length: MAX_CHAPTER }, (_, i) => ({ n: String(i + 1) }));
}

export default async function Image({ params }: { params: Promise<{ lang: string; n: string }> }) {
  const { lang, n } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const chapter = Math.min(Math.max(parseInt(n, 10) || 1, 1), MAX_CHAPTER);
  return chapterOg(locale, chapter, getChapterMeta(locale, chapter)?.title);
}
