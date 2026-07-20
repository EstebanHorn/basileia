'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from './auth-context';
import { listChapterNotes, saveChapterNote } from './notes';

export function useNotes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Record<number, string>>({});
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    if (!user) return;
    listChapterNotes(user.id).then((rows) => {
      setNotes(Object.fromEntries(rows.map((r) => [r.capitulo, r.contenido])));
    });
  }, [user]);

  const saveNote = useCallback(
    (capitulo: number, contenido: string) => {
      setNotes((prev) => ({ ...prev, [capitulo]: contenido }));
      if (!user) return;
      clearTimeout(timers.current[capitulo]);
      timers.current[capitulo] = setTimeout(() => {
        saveChapterNote(user.id, capitulo, contenido).catch(() => {});
      }, 600);
    },
    [user]
  );

  return { notes: user ? notes : {}, saveNote, locked: !user };
}
