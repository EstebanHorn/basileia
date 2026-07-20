'use client';

import { Colors } from '@/lib/theme';
import { CHARACTERS } from '@/lib/mateo-data';

const CATEGORIES = ['Todos', 'Discípulos', 'Familia de Jesús', 'Autoridades religiosas', 'Autoridades políticas', 'Otros'];

interface PersonajesScreenProps {
  colors: Colors;
  filter: string;
  onSetFilter: (val: string) => void;
  openCharacter: string | null;
  onSetOpenCharacter: (name: string | null) => void;
  onGoToChapter: (n: number) => void;
}

export default function PersonajesScreen({
  colors,
  filter,
  onSetFilter,
  openCharacter,
  onSetOpenCharacter,
  onGoToChapter,
}: PersonajesScreenProps) {
  const characters = CHARACTERS.filter((c) => filter === 'todos' || c.category === filter);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 32, fontWeight: 600, margin: '0 0 20px' }}>Personajes</h1>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {CATEGORIES.map((name) => {
          const val = name === 'Todos' ? 'todos' : name;
          const active = filter === val;
          return (
            <div
              key={name}
              onClick={() => onSetFilter(val)}
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
              {name}
            </div>
          );
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
        {characters.map((ch) => {
          const open = openCharacter === ch.name;
          return (
            <div
              key={ch.name}
              onClick={() => onSetOpenCharacter(open ? null : ch.name)}
              style={{ background: colors.panel, border: `1px solid ${colors.border}`, borderRadius: 10, padding: '16px 18px', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontFamily: 'var(--font-lora), serif', fontWeight: 600, fontSize: 16.5 }}>{ch.name}</div>
                <div style={{ fontSize: 11, color: colors.accent, fontWeight: 600 }}>{open ? 'Ocultar' : 'Ver más'}</div>
              </div>
              <div style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>{ch.category}</div>
              {open && (
                <>
                  <p style={{ fontSize: 14, lineHeight: 1.6, margin: '12px 0 0', color: colors.muted }}>{ch.blurb}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                    {ch.chapters.map((num) => (
                      <div
                        key={num}
                        onClick={(e) => {
                          e.stopPropagation();
                          onGoToChapter(num);
                        }}
                        style={{ fontSize: 12, fontWeight: 600, padding: '5px 10px', borderRadius: 14, background: colors.subtle, color: colors.accent }}
                      >
                        Mt {num}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
