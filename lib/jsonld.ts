// Constructores de datos estructurados (schema.org). Devuelven objetos listos para <JsonLd data={...} />.

import type { Locale } from '@/lib/i18n/config';
import { GOSPEL_REFERENCE, SITE_PUBLISHED, SITE_UPDATED, getSiteUrl } from '@/lib/site';

type Json = Record<string, unknown>;

export function organizationId(): string {
  return `${getSiteUrl()}/#organization`;
}

export function organizationLd(name: string, description: string): Json {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId(),
    name,
    description,
    url: siteUrl,
    logo: { '@type': 'ImageObject', url: `${siteUrl}/icon.png`, width: 512, height: 512 },
    image: `${siteUrl}/icon.png`,
  };
}

export function websiteLd(lang: Locale, name: string, description: string): Json {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name,
    description,
    url: `${siteUrl}/${lang}`,
    inLanguage: lang,
    publisher: { '@id': organizationId() },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/${lang}/buscar?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export interface Crumb {
  name: string;
  /** Ruta relativa al origen, p. ej. "/es/indice". */
  path: string;
}

export function breadcrumbLd(crumbs: Crumb[]): Json {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${siteUrl}${c.path}` })),
  };
}

interface CollectionArgs {
  lang: Locale;
  path: string;
  name: string;
  description: string;
  items?: { name: string; path?: string; description?: string }[];
}

/** Página de colección (glosario, personajes, índice...) con lista opcional de elementos. */
export function collectionLd({ lang, path, name, description, items }: CollectionArgs): Json {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/${lang}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#page`,
    name,
    description,
    url,
    inLanguage: lang,
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@type': 'Book', name: GOSPEL_REFERENCE[lang].name, sameAs: GOSPEL_REFERENCE[lang].url },
    dateModified: SITE_UPDATED,
    ...(items && items.length
      ? {
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: items.length,
            itemListElement: items.map((it, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: it.name,
              ...(it.path ? { url: `${siteUrl}${it.path}` } : {}),
              ...(it.description ? { description: it.description } : {}),
            })),
          },
        }
      : {}),
  };
}

interface ArticleArgs {
  lang: Locale;
  chapter: number;
  headline: string;
  description?: string;
  /** Cantidad aproximada de palabras del capítulo. */
  wordCount?: number;
  siteName: string;
}

/** Capítulo como artículo, con autoría/editor, fechas, imagen social y la obra de la que forma parte. */
export function articleLd({ lang, chapter, headline, description, wordCount, siteName }: ArticleArgs): Json {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/${lang}/capitulo/${chapter}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline,
    ...(description ? { description } : {}),
    inLanguage: lang,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    datePublished: SITE_PUBLISHED,
    dateModified: SITE_UPDATED,
    ...(wordCount ? { wordCount } : {}),
    author: { '@id': organizationId() },
    publisher: { '@id': organizationId() },
    isPartOf: { '@type': 'Book', name: siteName, url: `${siteUrl}/${lang}` },
    about: { '@type': 'Book', name: GOSPEL_REFERENCE[lang].name, sameAs: GOSPEL_REFERENCE[lang].url },
  };
}
