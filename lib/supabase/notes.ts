import { createClient } from './client';

export interface ChapterNote {
  id: string;
  capitulo: number;
  contenido: string;
}

export async function listChapterNotes(userId: string): Promise<ChapterNote[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('notas')
    .select('id, capitulo, contenido')
    .eq('usuario_id', userId)
    .is('versiculo', null);
  if (error) throw error;
  return data ?? [];
}

export async function saveChapterNote(userId: string, capitulo: number, contenido: string): Promise<void> {
  const supabase = createClient();
  const { data: existing, error: selectError } = await supabase
    .from('notas')
    .select('id')
    .eq('usuario_id', userId)
    .eq('capitulo', capitulo)
    .is('versiculo', null)
    .maybeSingle();
  if (selectError) throw selectError;

  if (existing) {
    const { error } = await supabase.from('notas').update({ contenido }).eq('id', existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('notas').insert({ usuario_id: userId, capitulo, contenido });
    if (error) throw error;
  }
}
