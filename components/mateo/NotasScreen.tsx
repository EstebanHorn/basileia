'use client';

import Link from 'next/link';
import { useApp } from '@/lib/app-context';
import { usePersistedState, writePersistedState } from '@/lib/persisted-state';
import { useNotes } from '@/lib/supabase/use-notes';
import { MAX_CHAPTER } from '@/lib/content/editorial';

export default function NotasScreen() {
  const { colors, lang, dict } = useApp();
  const { readChapters } = usePersistedState();
  const { notes } = useNotes();

  const readCount = Object.values(readChapters).filter(Boolean).length;
  const notesEntries = Object.entries(notes).filter(([, text]) => text && text.trim());

  const toggleRead = (n: number) => {
    writePersistedState({ readChapters: { ...readChapters, [n]: !readChapters[n] } });
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 32, fontWeight: 600, margin: '0 0 6px' }}>{dict.notas.title}</h1>
      <p style={{ fontSize: 14, color: colors.muted, margin: '0 0 24px' }}>{dict.notas.stats(readCount, MAX_CHAPTER)}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 8, marginBottom: 36 }}>
        {Array.from({ length: MAX_CHAPTER }, (_, i) => i + 1).map((n) => {
          const checked = !!readChapters[n];
          return (
            <div
              key={n}
              onClick={() => toggleRead(n)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 10px',
                borderRadius: 8,
                cursor: 'pointer',
                background: colors.panel,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 5,
                  background: checked ? colors.accent : colors.border,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {checked && (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.5}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
              <span style={{ fontSize: 13.5 }}>
                {dict.capitulo.mateoPrefix} {n}
              </span>
            </div>
          );
        })}
      </div>
      {notesEntries.length > 0 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: colors.muted, marginBottom: 12 }}>
            {dict.notas.notasGuardadas}
          </div>
          {notesEntries.map(([num, text]) => (
            <Link
              key={num}
              href={`/${lang}/capitulo/${num}`}
              style={{ display: 'block', background: colors.subtle, borderRadius: 10, padding: '14px 18px', marginBottom: 10, cursor: 'pointer' }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: colors.accent, marginBottom: 4 }}>
                {dict.capitulo.mateoPrefix.toUpperCase()} {num}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: colors.text }}>{text}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
