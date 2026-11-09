import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Basileia - Estudio del Evangelio de Mateo',
    short_name: 'Basileia',
    description: 'Estudio del Evangelio de Mateo: análisis griego, contexto histórico-cultural y comentario capítulo a capítulo.',
    start_url: '/',
    display: 'standalone',
    background_color: '#EFE6D3',
    theme_color: '#EFE6D3',
    lang: 'es',
    categories: ['education', 'books', 'religion'],
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
