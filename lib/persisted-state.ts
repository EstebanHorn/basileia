import { useSyncExternalStore } from 'react';
import { Theme } from './theme';

export interface PersistedState {
  theme: Theme;
  lastChapter: number;
  readChapters: Record<number, boolean>;
}

const STORAGE_KEY = 'estudio-mateo:v1';

const DEFAULT_READ: Record<number, boolean> = {};

const DEFAULT_STATE: PersistedState = {
  theme: 'light',
  lastChapter: 1,
  readChapters: DEFAULT_READ,
};

const listeners = new Set<() => void>();
let cache: PersistedState | null = null;

function readStorage(): PersistedState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      theme: parsed.theme === 'dark' ? 'dark' : 'light',
      lastChapter: typeof parsed.lastChapter === 'number' ? parsed.lastChapter : DEFAULT_STATE.lastChapter,
      readChapters: parsed.readChapters && typeof parsed.readChapters === 'object' ? parsed.readChapters : DEFAULT_READ,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): PersistedState {
  if (cache === null) cache = readStorage();
  return cache;
}

function getServerSnapshot(): PersistedState {
  return DEFAULT_STATE;
}

export function writePersistedState(patch: Partial<PersistedState>): void {
  cache = { ...getSnapshot(), ...patch };
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  }
  listeners.forEach((listener) => listener());
}

export function usePersistedState(): PersistedState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
