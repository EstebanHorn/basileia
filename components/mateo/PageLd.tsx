import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { breadcrumbLd, collectionLd } from '@/lib/jsonld';
import JsonLd from './JsonLd';

interface PageLdProps {
  lang: Locale;
  /** Ruta dentro del idioma, p. ej. "/glosario". */
  path: string;
  /** Clave de dict.seo con el título y la descripción de la página. */
  seoKey: 'indice' | 'mapa' | 'personajes' | 'glosario' | 'contexto' | 'paralelos' | 'nosotros' | 'privacidad' | 'terminos';
  /** Tipo schema.org de la página. */
  type?: 'CollectionPage' | 'AboutPage' | 'WebPage';
  /** Elementos para la lista (ItemList) de la colección. */
  items?: { name: string; path?: string; description?: string }[];
}

/** Migas de pan + descripción estructurada de la página (colección, acerca de...). */
export default async function PageLd({ lang, path, seoKey, type = 'CollectionPage', items }: PageLdProps) {
  const dict = await getDictionary(lang);
  const seo = dict.seo[seoKey];

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: dict.meta.title, path: `/${lang}` },
          { name: seo.title, path: `/${lang}${path}` },
        ])}
      />
      <JsonLd data={{ ...collectionLd({ lang, path, name: seo.title, description: seo.description, items }), '@type': type }} />
    </>
  );
}
