import type { Locale } from '@/lib/i18n/config';
import type { ChapterEntry, ContextoEntry, GlosarioTermino, Lugar, Personaje } from './types';

import mateoEs from '@/app/data/Mateo_es.json';
import mateoPt from '@/app/data/Mateo_pt.json';
import glosarioEs from '@/app/data/glosario_es.json';
import glosarioPt from '@/app/data/glosario_pt.json';
import personajesEs from '@/app/data/personajes_es.json';
import personajesPt from '@/app/data/personajes_pt.json';
import lugaresEs from '@/app/data/lugares_es.json';
import lugaresPt from '@/app/data/lugares_pt.json';
import contextoEs from '@/app/data/contexto_es.json';
import contextoPt from '@/app/data/contexto_pt.json';

type MateoJson = ChapterEntry[];

const MATEO: Record<Locale, MateoJson> = { es: mateoEs as MateoJson, pt: mateoPt as MateoJson };
const GLOSARIO: Record<Locale, GlosarioTermino[]> = { es: glosarioEs.terminos, pt: glosarioPt.terminos };
const PERSONAJES: Record<Locale, Personaje[]> = { es: personajesEs.personajes, pt: personajesPt.personajes };
const LUGARES: Record<Locale, Lugar[]> = { es: lugaresEs.lugares, pt: lugaresPt.lugares };
const CONTEXTO: Record<Locale, ContextoEntry[]> = { es: contextoEs.contexto, pt: contextoPt.contexto };

export function getMateo(lang: Locale): Record<number, ChapterEntry> {
  const byKey = MATEO[lang];
  const byChapter: Record<number, ChapterEntry> = {};
  for (const entry of Object.values(byKey)) {
    byChapter[entry.capitulo] = entry;
  }
  return byChapter;
}

export function getChapter(lang: Locale, n: number): ChapterEntry | undefined {
  return getMateo(lang)[n];
}

export function getGlosario(lang: Locale): GlosarioTermino[] {
  return GLOSARIO[lang];
}

export function getPersonajes(lang: Locale): Personaje[] {
  return PERSONAJES[lang];
}

export function getLugares(lang: Locale): Lugar[] {
  return LUGARES[lang];
}

export function getContexto(lang: Locale): ContextoEntry[] {
  return CONTEXTO[lang];
}

export function getGlosarioById(lang: Locale): Map<string, GlosarioTermino> {
  return new Map(getGlosario(lang).map((t) => [t.id, t]));
}

export function getPersonajesById(lang: Locale): Map<string, Personaje> {
  return new Map(getPersonajes(lang).map((p) => [p.id, p]));
}

export function getLugaresById(lang: Locale): Map<string, Lugar> {
  return new Map(getLugares(lang).map((l) => [l.id, l]));
}

export function getContextoById(lang: Locale): Map<string, ContextoEntry> {
  return new Map(getContexto(lang).map((c) => [c.id, c]));
}
