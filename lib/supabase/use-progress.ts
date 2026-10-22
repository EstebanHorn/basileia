'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from './auth-context';
import { listReadChapters, setChapterRead } from './progress';
import { usePersistedState, writePersistedState } from '@/lib/persisted-state';

interface RemoteProgress {
  userId: string;
  read: Record<number, boolean>;
}

export function useProgress() {
  const { user } = useAuth();
  const { readChapters: localRead } = usePersistedState();
  const [remote, setRemote] = useState<RemoteProgress | null>(null);
  const mergingFor = useRef<string | null>(null);

  useEffect(() => {
    if (!user) {
      mergingFor.current = null;
      return;
    }
    if (mergingFor.current === user.id) return;
    mergingFor.current = user.id;

    (async () => {
      const remoteChapters = await listReadChapters(user.id);
      const remoteSet = new Set(remoteChapters);
      const localOnly = Object.entries(localRead)
        .filter(([, read]) => read)
        .map(([n]) => Number(n))
        .filter((n) => !remoteSet.has(n));

      await Promise.all(localOnly.map((n) => setChapterRead(user.id, n, true).catch(() => {})));

      const merged: Record<number, boolean> = {};
      for (const n of [...remoteChapters, ...localOnly]) merged[n] = true;
      setRemote({ userId: user.id, read: merged });
    })();
    // localRead solo se usa para el merge inicial al loguearse; no debe re-dispararlo en cada cambio.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const readChapters = !user ? localRead : remote && remote.userId === user.id ? remote.read : {};

  const toggleRead = useCallback(
    (n: number) => {
      if (!user) {
        writePersistedState({ readChapters: { ...localRead, [n]: !localRead[n] } });
        return;
      }
      const userId = user.id;
      setRemote((prev) => {
        const base = prev && prev.userId === userId ? prev.read : {};
        const next = !base[n];
        setChapterRead(userId, n, next).catch(() => {
          setRemote((p) => (p && p.userId === userId ? { userId, read: { ...p.read, [n]: !next } } : p));
        });
        return { userId, read: { ...base, [n]: next } };
      });
    },
    [user, localRead]
  );

  return { readChapters, toggleRead };
}
