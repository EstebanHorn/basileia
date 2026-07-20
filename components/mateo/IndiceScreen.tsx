'use client';

import { Colors } from '@/lib/theme';
import { COMPLETED_RANGE, isCompleted, SECTIONS } from '@/lib/mateo-data';

interface IndiceScreenProps {
  colors: Colors;
  indexFilter: string;
  onSetIndexFilter: (id: string) => void;
  onGoToChapter: (n: number) => void;
}

export default function IndiceScreen({ colors, indexFilter, onSetIndexFilter, onGoToChapter }: IndiceScreenProps) {
  const chips = [{ id: 'all', name: 'Todos' }, ...SECTIONS];
  const activeSection = indexFilter === 'all' ? null : SECTIONS.find((s) => s.id === indexFilter);
  const completedCount = COMPLETED_RANGE[1] - COMPLETED_RANGE[0] + 1;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 32, fontWeight: 600, margin: '0 0 6px' }}>
        Índice de capítulos
      </h1>
      <p style={{ fontSize: 14, color: colors.muted, margin: '0 0 20px' }}>
        28 capítulos · {completedCount} disponibles para estudio
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
          const inFilter = !activeSection || (n >= activeSection.range[0] && n <= activeSection.range[1]);
          return (
            <div
              key={n}
              onClick={() => onGoToChapter(n)}
              style={{
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
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 20, marginTop: 20, fontSize: 12.5, color: colors.muted }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 11, height: 11, borderRadius: 3, background: colors.accent }} />
          Completado
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 11, height: 11, borderRadius: 3, border: `1px solid ${colors.border}` }} />
          Pendiente
        </div>
      </div>
    </div>
  );
}
