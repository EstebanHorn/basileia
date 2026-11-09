/** Dominio canónico de producción (con www). */
export const PRODUCTION_URL = 'https://www.basileia.mov';

/**
 * Origen público del sitio (sin barra final). Se usa para canonical, sitemap, OG y JSON-LD.
 * Desarrollo: NEXT_PUBLIC_SITE_URL o localhost. Producción: PRODUCTION_URL, salvo que
 * NEXT_PUBLIC_SITE_URL apunte a un dominio real (un localhost heredado del .env se ignora).
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const isProd = process.env.NODE_ENV === 'production';
  const explicitIsLocal = !!explicit && /localhost|127\.0\.0\.1/.test(explicit);
  const url = isProd ? (explicit && !explicitIsLocal ? explicit : PRODUCTION_URL) : explicit || 'http://localhost:3000';
  return url.replace(/\/+$/, '');
}

/** Fechas del contenido para sitemap y datos estructurados. Subir SITE_UPDATED al publicar contenido nuevo. */
export const SITE_PUBLISHED = '2025-10-28';
export const SITE_UPDATED = '2026-11-08';

/** Páginas de referencia que identifican el tema del sitio (ayudan a motores y asistentes de IA). */
export const GOSPEL_REFERENCE: Record<'es' | 'pt', { name: string; url: string }> = {
  es: { name: 'Evangelio según Mateo', url: 'https://es.wikipedia.org/wiki/Evangelio_seg%C3%BAn_Mateo' },
  pt: { name: 'Evangelho segundo Mateus', url: 'https://pt.wikipedia.org/wiki/Evangelho_segundo_Mateus' },
};
