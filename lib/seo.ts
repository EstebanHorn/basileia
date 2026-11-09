import type { Metadata } from 'next';
import { locales, defaultLocale, type Locale } from '@/lib/i18n/config';

export const OG_LOCALE: Record<Locale, string> = { es: 'es_AR', pt: 'pt_BR' };

interface BuildMetadataArgs {
  lang: Locale;
  /** Path relative to the locale root, starting with "/" (e.g. "/indice"). Omit for the home page. */
  path?: string;
  title: string;
  description: string;
  siteName: string;
  noindex?: boolean;
  /** "article" para capítulos; "website" para el resto. */
  type?: 'website' | 'article';
  /** Ruta de la imagen social. Por defecto, la de la portada del idioma. */
  image?: string;
}

/** Recorta a ~155 caracteres en un límite de palabra, que es lo que Google suele mostrar de la descripción. */
export function truncateDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-–—]+$/, '')}…`;
}

/** Alternates con hreflang para cada idioma más x-default (el idioma por defecto). */
export function buildAlternates(lang: Locale, path = '') {
  return {
    canonical: `/${lang}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((locale) => [locale, `/${locale}${path}`])),
      'x-default': `/${defaultLocale}${path}`,
    },
  };
}

/**
 * Metadata consistente (canonical/hreflang/OG/Twitter) para una página dada su ruta dentro del locale.
 * La imagen se declara explícita porque un `openGraph` propio de la página no hereda la imagen
 * generada por el archivo opengraph-image del layout.
 */
export function buildMetadata({ lang, path = '', title, description, siteName, noindex, type = 'website', image }: BuildMetadataArgs): Metadata {
  const canonicalPath = `/${lang}${path}`;
  const desc = truncateDescription(description);
  const images = [{ url: image ?? `/${lang}/opengraph-image`, width: 1200, height: 630, alt: title }];

  return {
    title,
    description: desc,
    alternates: buildAlternates(lang, path),
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    openGraph: {
      title,
      description: desc,
      url: canonicalPath,
      siteName,
      locale: OG_LOCALE[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      type,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images,
    },
  };
}
