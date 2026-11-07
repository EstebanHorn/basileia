// Paleta "periódico vintage". Los mismos valores existen como variables CSS
// (--paper, --ink, --orange...) en app/globals.css, bajo .np-light / .np-dark.

export interface Colors {
  bg: string;
  panel: string;
  subtle: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
  accentDark: string;
  /** Texto sobre fondos de acento (botones, sellos). */
  onAccent: string;
  orange: string;
  olive: string;
  ink: string;
}

export const LIGHT: Colors = {
  bg: '#EFE6D3',
  panel: '#F7F0DF',
  subtle: '#E6D9BD',
  text: '#1F1B16',
  muted: '#6E6150',
  border: '#C9B996',
  accent: '#A8321E',
  accentDark: '#7E2416',
  onAccent: '#F7F0DF',
  orange: '#E4572E',
  olive: '#4A5A3A',
  ink: '#1F1B16',
};

export const DARK: Colors = {
  bg: '#1A1712',
  panel: '#231F19',
  subtle: '#2E271E',
  text: '#EDE4D0',
  muted: '#A3957D',
  border: '#433A2D',
  accent: '#E8673E',
  accentDark: '#C8501F',
  onAccent: '#1A1712',
  orange: '#E8673E',
  olive: '#7C8E60',
  ink: '#EDE4D0',
};

export type Theme = 'light' | 'dark';
