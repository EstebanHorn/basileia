import type { MetadataRoute } from 'next';
import { defaultLocale, locales } from '@/lib/i18n/config';
import { SITE_UPDATED, getSiteUrl } from '@/lib/site';
import { isCompleted, MAX_CHAPTER } from '@/lib/content/editorial';

// Solo páginas indexables. /buscar y /notas son noindex; los capítulos sin comentario tampoco se listan.
const STATIC_PATHS: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/indice', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/glosario', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/personajes', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contexto', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/paralelos', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/mapa', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/nosotros', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/privacidad', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terminos', priority: 0.2, changeFrequency: 'yearly' },
];

const CHAPTER_PATHS = Array.from({ length: MAX_CHAPTER }, (_, i) => i + 1)
  .filter(isCompleted)
  .map((n) => ({ path: `/capitulo/${n}`, priority: 0.9, changeFrequency: 'monthly' as const }));

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  // Fecha fija del último cambio de contenido (no "ahora"): una fecha que cambia en cada build
  // le quita valor a lastmod y Google termina ignorándolo.
  const lastModified = new Date(SITE_UPDATED);

  // Una entrada por idioma, cada una con sus alternates (hreflang) y x-default.
  return [...STATIC_PATHS, ...CHAPTER_PATHS].flatMap(({ path, priority, changeFrequency }) => {
    const languages = {
      ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`])),
      'x-default': `${siteUrl}/${defaultLocale}${path}`,
    };
    return locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
