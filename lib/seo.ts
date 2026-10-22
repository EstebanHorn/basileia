import type { Metadata } from 'next';
import { locales, type Locale } from '@/lib/i18n/config';

export const OG_LOCALE: Record<Locale, string> = { es: 'es_AR', pt: 'pt_BR' };

interface BuildMetadataArgs {
  lang: Locale;
  /** Path relative to the locale root, starting with "/" (e.g. "/indice"). Omit for the home page. */
  path?: string;
  title: string;
  description: string;
  siteName: string;
  noindex?: boolean;
}

/** Metadata consistente (canonical/hreflang/OG/Twitter) para una página dada su ruta dentro del locale. */
export function buildMetadata({ lang, path = '', title, description, siteName, noindex }: BuildMetadataArgs): Metadata {
  const canonicalPath = `/${lang}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: Object.fromEntries(locales.map((locale) => [locale, `/${locale}${path}`])),
    },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName,
      locale: OG_LOCALE[lang],
      images: ['/icon.png'],
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: ['/icon.png'],
    },
  };
}
