// Tipos que reflejan la forma de los JSON en app/data/

export interface Versiculo {
  numero: number;
  texto: string;
  comentario: string;
  griego_ids: string[];
  personaje_ids: string[];
  lugar_ids: string[];
}

export interface ChapterEntry {
  libro: string;
  capitulo: number;
  discurso_id: string;
  estado: string;
  versiculos: Versiculo[];
  contexto_ids: string[];
  reflexion: string[];
}

export interface GlosarioTermino {
  id: string;
  griego: string;
  transliteracion: string;
  significado: string;
  palabra: string;
  nota: string;
  capitulos: number[];
}

export interface Personaje {
  id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  capitulos: number[];
}

export interface Lugar {
  id: string;
  nombre: string;
  top: number | null;
  left: number | null;
  nota: string;
  capitulos: number[];
}

export interface ContextoEntry {
  id: string;
  titulo: string;
  tema: string;
  texto: string;
}

export interface ChapterBlock {
  from: number;
  to: number;
  ref: string;
  text: string;
  commentary: string;
  greekIds: string[];
  personajeIds: string[];
  lugarIds: string[];
}
