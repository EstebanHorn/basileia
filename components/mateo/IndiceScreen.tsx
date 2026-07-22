'use client';

import { useState } from 'react';
import { useApp } from '@/lib/app-context';
import { usePersistedState, writePersistedState } from '@/lib/persisted-state';
import { COMPLETED_RANGE, MAX_CHAPTER, isCompleted, type Section } from '@/lib/content/editorial';

interface IndiceScreenProps {
  sections: Section[];
}

export default function IndiceScreen({ sections }: IndiceScreenProps) {
  const { colors, lang, dict } = useApp();
  const { readChapters } = usePersistedState();
  const [indexFilter, setIndexFilter] = useState('all');

  const chips = [{ id: 'all', name: dict.indice.all }, ...sections];
  const activeSection = indexFilter === 'all' ? null : sections.find((s) => s.id === indexFilter);
  const completedCount = COMPLETED_RANGE[1] - COMPLETED_RANGE[0] + 1;
  const readCount = Object.values(readChapters).filter(Boolean).length;

  const toggleRead = (n: number) => {
    writePersistedState({ readChapters: { ...readChapters, [n]: !readChapters[n] } });
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 32, fontWeight: 600, margin: '0 0 6px' }}>
        {dict.indice.title}
      </h1>
      <p style={{ fontSize: 14, color: colors.muted, margin: '0 0 20px' }}>
        {dict.indice.stats(MAX_CHAPTER, completedCount, readCount)}
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {chips.map((c) => {
          const active = indexFilter === c.id;
          return (
            <div
              key={c.id}
              onClick={() => setIndexFilter(c.id)}
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
        {Array.from({ length: MAX_CHAPTER }, (_, i) => i + 1).map((n) => {
          const completed = isCompleted(n);
          const read = !!readChapters[n];
          const inFilter = !activeSection || (n >= activeSection.range[0] && n <= activeSection.range[1]);
          return (
            <a
              key={n}
              href={`/${lang}/capitulo/${n}`}
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
                  e.preventDefault();
                  e.stopPropagation();
                  toggleRead(n);
                }}
                title={read ? dict.indice.markUnread : dict.indice.markRead}
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
            </a>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 20, marginTop: 24, fontSize: 12.5, color: colors.muted, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 11, height: 11, borderRadius: 3, background: colors.accent }} />
          {dict.indice.legendCompleted}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 11, height: 11, borderRadius: 3, border: `1px solid ${colors.border}` }} />
          {dict.indice.legendPending}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: colors.text }} />
          {dict.indice.legendRead}
        </div>
      </div>
    </div>
  );
}
