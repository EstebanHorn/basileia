'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from './auth-context';
import { listChapterNotes, saveChapterNote } from './notes';

export type NoteSaveStatus = 'idle' | 'saving' | 'saved' | 'error';

const SAVE_DELAY = 600;
const RETRY_DELAY = 1500;

export function useNotes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [status, setStatus] = useState<Record<number, NoteSaveStatus>>({});
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});
  const pending = useRef<Record<number, string>>({});
  const retryCount = useRef<Record<number, number>>({});
  const flushRef = useRef<(capitulo: number) => void>(() => {});

  useEffect(() => {
    if (!user) return;
    listChapterNotes(user.id).then((rows) => {
      setNotes(Object.fromEntries(rows.map((r) => [r.capitulo, r.contenido])));
    });
  }, [user]);

  const flush = useCallback(
    (capitulo: number) => {
      const contenido = pending.current[capitulo];
      if (contenido === undefined || !user) return;
      clearTimeout(timers.current[capitulo]);

      setStatus((prev) => ({ ...prev, [capitulo]: 'saving' }));
      saveChapterNote(user.id, capitulo, contenido)
        .then(() => {
          retryCount.current[capitulo] = 0;
          // Si llegó una edición más nueva mientras esta guardaba, pending.current ya cambió:
          // no la pisamos acá, su propio timer la va a guardar.
          if (pending.current[capitulo] === contenido) {
            delete pending.current[capitulo];
            setStatus((prev) => ({ ...prev, [capitulo]: 'saved' }));
          }
        })
        .catch(() => {
          const attempts = (retryCount.current[capitulo] ?? 0) + 1;
          retryCount.current[capitulo] = attempts;
          if (attempts === 1) {
            timers.current[capitulo] = setTimeout(() => flushRef.current(capitulo), RETRY_DELAY);
          } else {
            setStatus((prev) => ({ ...prev, [capitulo]: 'error' }));
          }
        });
    },
    [user]
  );

  useEffect(() => {
    flushRef.current = flush;
  }, [flush]);

  useEffect(() => {
    const flushAllPending = () => {
      Object.keys(pending.current).forEach((key) => flush(Number(key)));
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') flushAllPending();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('beforeunload', flushAllPending);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('beforeunload', flushAllPending);
    };
  }, [flush]);

  const saveNote = useCallback(
    (capitulo: number, contenido: string) => {
      setNotes((prev) => ({ ...prev, [capitulo]: contenido }));
      if (!user) return;
      pending.current[capitulo] = contenido;
      retryCount.current[capitulo] = 0;
      setStatus((prev) => ({ ...prev, [capitulo]: 'idle' }));
      clearTimeout(timers.current[capitulo]);
      timers.current[capitulo] = setTimeout(() => flush(capitulo), SAVE_DELAY);
    },
    [user, flush]
  );

  const retry = useCallback(
    (capitulo: number) => {
      retryCount.current[capitulo] = 0;
      flush(capitulo);
    },
    [flush]
  );

  return { notes: user ? notes : {}, saveNote, locked: !user, status, retry };
}
