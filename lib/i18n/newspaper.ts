// Textos cortos del estilo "periódico" (antetítulos de sección, etiquetas de imprenta).
// Viven aparte de los diccionarios porque son decorativos y no afectan SEO ni flujos.

import type { Locale } from './config';

const NEWSPAPER = {
  es: {
    kicker: {
      indice: 'Archivo de ediciones',
      glosario: 'Diccionario de la redacción',
      personajes: 'Galería de protagonistas',
      contexto: 'Trasfondo histórico',
      paralelos: 'Ecos y correspondencias',
      notas: 'Libreta del lector',
      buscar: 'Hemeroteca',
      nosotros: 'La redacción',
      privacidad: 'Letra chica',
      terminos: 'Letra chica',
      mapa: 'Corresponsalía',
      notFound: 'Fe de erratas',
    },
    printing: 'En imprenta',
    available: 'Disponible',
    read: 'Leído',
    results: (n: number) => `${n} ${n === 1 ? 'resultado' : 'resultados'}`,
  },
  pt: {
    kicker: {
      indice: 'Arquivo de edições',
      glosario: 'Dicionário da redação',
      personajes: 'Galeria de protagonistas',
      contexto: 'Pano de fundo histórico',
      paralelos: 'Ecos e correspondências',
      notas: 'Caderno do leitor',
      buscar: 'Hemeroteca',
      nosotros: 'A redação',
      privacidad: 'Letras miúdas',
      terminos: 'Letras miúdas',
      mapa: 'Correspondente',
      notFound: 'Errata',
    },
    printing: 'Na gráfica',
    available: 'Disponível',
    read: 'Lido',
    results: (n: number) => `${n} ${n === 1 ? 'resultado' : 'resultados'}`,
  },
};

export function getNewspaper(lang: Locale) {
  return NEWSPAPER[lang];
}
