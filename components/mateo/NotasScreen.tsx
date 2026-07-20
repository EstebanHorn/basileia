'use client';

import { Colors } from '@/lib/theme';

interface NotasScreenProps {
  colors: Colors;
  readChapters: Record<number, boolean>;
  onToggleRead: (n: number) => void;
  notes: Record<number, string>;
  onGoToChapter: (n: number) => void;
}

export default function NotasScreen({ colors, readChapters, onToggleRead, notes, onGoToChapter }: NotasScreenProps) {
  const readCount = Object.values(readChapters).filter(Boolean).length;
  const notesEntries = Object.entries(notes).filter(([, text]) => text && text.trim());

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 32, fontWeight: 600, margin: '0 0 6px' }}>
        Mis notas y progreso
      </h1>
      <p style={{ fontSize: 14, color: colors.muted, margin: '0 0 24px' }}>
        {readCount} de 28 capítulos marcados como leídos.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 8, marginBottom: 36 }}>
        {Array.from({ length: 28 }, (_, i) => i + 1).map((n) => {
          const checked = !!readChapters[n];
          return (
            <div
              key={n}
              onClick={() => onToggleRead(n)}
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
              <span style={{ fontSize: 13.5 }}>Mateo {n}</span>
            </div>
          );
        })}
      </div>
      {notesEntries.length > 0 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: colors.muted, marginBottom: 12 }}>
            Notas guardadas en esta sesión
          </div>
          {notesEntries.map(([num, text]) => (
            <div
              key={num}
              onClick={() => onGoToChapter(parseInt(num, 10))}
              style={{ background: colors.subtle, borderRadius: 10, padding: '14px 18px', marginBottom: 10, cursor: 'pointer' }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: colors.accent, marginBottom: 4 }}>MATEO {num}</div>
              <div style={{ fontSize: 14, lineHeight: 1.5 }}>{text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
