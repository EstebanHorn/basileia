'use client';

import { Colors } from '@/lib/theme';
import { COMPLETED_RANGE, isCompleted, SECTIONS } from '@/lib/mateo-data';

interface IndiceScreenProps {
  colors: Colors;
  indexFilter: string;
  onSetIndexFilter: (id: string) => void;
  onGoToChapter: (n: number) => void;
  readChapters: Record<number, boolean>;
  onToggleRead: (n: number) => void;
}

export default function IndiceScreen({
  colors,
  indexFilter,
  onSetIndexFilter,
  onGoToChapter,
  readChapters,
  onToggleRead,
}: IndiceScreenProps) {
  const chips = [{ id: 'all', name: 'Todos' }, ...SECTIONS];
  const activeSection = indexFilter === 'all' ? null : SECTIONS.find((s) => s.id === indexFilter);
  const completedCount = COMPLETED_RANGE[1] - COMPLETED_RANGE[0] + 1;
  const readCount = Object.values(readChapters).filter(Boolean).length;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 32, fontWeight: 600, margin: '0 0 6px' }}>
        Índice de capítulos
      </h1>
      <p style={{ fontSize: 14, color: colors.muted, margin: '0 0 20px' }}>
        28 capítulos · {completedCount} disponibles para estudio · {readCount} marcados como leídos
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {chips.map((c) => {
          const active = indexFilter === c.id;
          return (
            <div
              key={c.id}
              onClick={() => onSetIndexFilter(c.id)}
              style={{
                padding: '7px 13px',
                borderRadius: 20,
                fontSize: 12.5,
                fontWeight: 600,
                cursor: 'pointer',
                border: `1px solid ${active ? colors.accent : colors.border}`,
                background: active ? colors.accent : colors.panel,
                color: active ? '#fff' : colors.text,
              }}
            >
              {c.name}
            </div>
          );
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 10 }}>
        {Array.from({ length: 28 }, (_, i) => i + 1).map((n) => {
          const completed = isCompleted(n);
          const read = !!readChapters[n];
          const inFilter = !activeSection || (n >= activeSection.range[0] && n <= activeSection.range[1]);
          return (
            <div
              key={n}
              onClick={() => onGoToChapter(n)}
              style={{
                position: 'relative',
                aspectRatio: '1',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                opacity: inFilter ? 1 : 0.3,
                background: completed ? colors.accent : colors.panel,
                color: completed ? '#fff' : colors.muted,
                border: `1px solid ${completed ? colors.accent : colors.border}`,
              }}
            >
              {n}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleRead(n);
                }}
                title={read ? 'Marcado como leído' : 'Marcar como leído'}
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  background: read ? colors.text : colors.panel,
                  border: `1.5px solid ${read ? colors.text : colors.border}`,
                }}
              >
                {read && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={colors.bg} strokeWidth={3.5}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 20, marginTop: 24, fontSize: 12.5, color: colors.muted, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 11, height: 11, borderRadius: 3, background: colors.accent }} />
          Completado (disponible para estudio)
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 11, height: 11, borderRadius: 3, border: `1px solid ${colors.border}` }} />
          Pendiente
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: colors.text }} />
          Leído — tocá el círculo del capítulo para marcarlo
        </div>
      </div>
    </div>
  );
}
