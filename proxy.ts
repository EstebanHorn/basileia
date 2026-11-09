import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { defaultLocale, hasLocale, locales } from '@/lib/i18n/config';

const LOCALE_COOKIE = 'NEXT_LOCALE';

// Rutas válidas dentro de un idioma. Todo lo demás responde 404 de verdad: con loading.tsx la
// respuesta se transmite en streaming y notFound() solo podría marcarla con noindex y status 200.
// Se mantiene acá (y no importando el contenido) para que el proxy sea liviano.
// El 28 es MAX_CHAPTER (lib/content/editorial.ts).
const VALID_PATH =
  /^(?:\/(?:indice|mapa|personajes|glosario|contexto|paralelos|notas|nosotros|privacidad|terminos|buscar|capitulo\/(?:[1-9]|1\d|2[0-8])))?\/?$/;
// Imágenes sociales generadas por Next (opengraph-image) para la portada y para cada capítulo.
const VALID_IMAGE_PATH = /^(?:\/capitulo\/(?:[1-9]|1\d|2[0-8]))?\/opengraph-image(?:-[\w-]+)?$/;

function detectLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && hasLocale(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get('accept-language');
  const primaryTag = acceptLanguage?.split(',')[0]?.split('-')[0]?.trim().toLowerCase();
  if (primaryTag === 'pt') return 'pt';

  return defaultLocale;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));

  if (!pathnameHasLocale) {
    const locale = detectLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  const locale = pathname.split('/')[1];
  const rest = pathname.slice(locale.length + 1);
  if (!VALID_PATH.test(rest) && !VALID_IMAGE_PATH.test(rest)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/404`;
    url.search = '';
    return NextResponse.rewrite(url, { status: 404 });
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|llms-full.txt|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
