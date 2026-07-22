import type { Locale } from './config';
import type { Dictionary } from './dictionary-type';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import('./dictionaries/es').then((m) => m.default),
  pt: () => import('./dictionaries/pt').then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
