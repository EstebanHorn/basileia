import { beforeEach, describe, expect, it } from 'vitest';
import { writePersistedState } from './persisted-state';

describe('writePersistedState', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('persiste y relee el estado en localStorage', () => {
    writePersistedState({ theme: 'dark', lastChapter: 7 });

    const raw = window.localStorage.getItem('estudio-mateo:v1');
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!);
    expect(parsed.theme).toBe('dark');
    expect(parsed.lastChapter).toBe(7);
  });

  it('mergea con el estado previo en vez de reemplazarlo', () => {
    writePersistedState({ lastChapter: 3 });
    writePersistedState({ readChapters: { 3: true } });

    const raw = JSON.parse(window.localStorage.getItem('estudio-mateo:v1')!);
    expect(raw.lastChapter).toBe(3);
    expect(raw.readChapters).toEqual({ 3: true });
  });
});
