import type { MetadataRoute } from 'next';
import { defaultLocale, locales } from '@/lib/i18n/config';
import { getSiteUrl } from '@/lib/site';
import { isCompleted, MAX_CHAPTER } from '@/lib/content/editorial';

const STATIC_PATHS = [
  '',
  '/indice',
  '/mapa',
  '/personajes',
  '/glosario',
  '/contexto',
  '/paralelos',
  '/nosotros',
  '/privacidad',
  '/terminos',
];

const CHAPTER_PATHS = Array.from({ length: MAX_CHAPTER }, (_, i) => i + 1)
  .filter(isCompleted)
  .map((n) => `/capitulo/${n}`);

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const paths = [...STATIC_PATHS, ...CHAPTER_PATHS];

  return paths.map((path) => ({
    url: `${siteUrl}/${defaultLocale}${path}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(locales.map((locale) => [locale, `${siteUrl}/${locale}${path}`])),
    },
  }));
}
