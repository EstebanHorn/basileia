import { createClient } from './client';

export async function listReadChapters(userId: string): Promise<number[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from('progreso').select('capitulo').eq('usuario_id', userId).eq('completado', true);
  if (error) throw error;
  return (data ?? []).map((row) => row.capitulo);
}

export async function setChapterRead(userId: string, capitulo: number, read: boolean): Promise<void> {
  const supabase = createClient();
  if (read) {
    const { error } = await supabase
      .from('progreso')
      .upsert({ usuario_id: userId, capitulo, completado: true }, { onConflict: 'usuario_id,capitulo' });
    if (error) throw error;
  } else {
    const { error } = await supabase.from('progreso').delete().eq('usuario_id', userId).eq('capitulo', capitulo);
    if (error) throw error;
  }
}
