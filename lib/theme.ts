export interface Colors {
  bg: string;
  panel: string;
  subtle: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
  accentDark: string;
}

export const LIGHT: Colors = {
  bg: '#FAFAFA',
  panel: '#FFFFFF',
  subtle: '#FDF0F0',
  text: '#262322',
  muted: '#6b6663',
  border: '#ECE6E4',
  accent: '#B22222',
  accentDark: '#8f1b2c',
};

export const DARK: Colors = {
  bg: '#1C1917',
  panel: '#262220',
  subtle: '#2B1E1F',
  text: '#F5F1EF',
  muted: '#B8B0AC',
  border: '#3A3532',
  accent: '#E0524B',
  accentDark: '#C43F3F',
};

export type Theme = 'light' | 'dark';
export type Screen =
  | 'inicio'
  | 'indice'
  | 'capitulo'
  | 'mapa'
  | 'personajes'
  | 'glosario'
  | 'contexto'
  | 'notas'
  | 'nosotros'
  | 'privacidad'
  | 'terminos';

export const NAV_LABELS: [Screen, string][] = [
  ['indice', 'Índice'],
  ['mapa', 'Mapa'],
  ['personajes', 'Personajes'],
  ['glosario', 'Glosario'],
  ['contexto', 'Contexto'],
  ['notas', 'Notas'],
  ['nosotros', 'Sobre nosotros'],
];
