'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/app-context';
import type { GlosarioTermino } from '@/lib/content/types';

interface GlosarioScreenProps {
  terminos: GlosarioTermino[];
}

export default function GlosarioScreen({ terminos }: GlosarioScreenProps) {
  const { colors, lang, dict } = useApp();
  const [query, setQuery] = useState('');

  const sorted = [...terminos].sort((a, b) => a.transliteracion.localeCompare(b.transliteracion));
  const gq = query.trim().toLowerCase();
  const items = sorted.filter(
    (t) =>
      !gq ||
      t.transliteracion.toLowerCase().includes(gq) ||
      t.significado.toLowerCase().includes(gq) ||
      t.griego.toLowerCase().includes(gq)
  );

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 32, fontWeight: 600, margin: '0 0 6px' }}>{dict.glosario.title}</h1>
      <p style={{ fontSize: 14, color: colors.muted, margin: '0 0 20px' }}>{dict.glosario.statLine(terminos.length)}</p>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={dict.glosario.searchPlaceholder}
        style={{
          width: '100%',
          padding: '11px 14px',
          borderRadius: 9,
          border: `1px solid ${colors.border}`,
          background: colors.panel,
          color: colors.text,
          fontSize: 14.5,
          marginBottom: 20,
        }}
      />
      {items.map((g) => (
        <div key={g.id} style={{ padding: '16px 0', borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-lora), serif', fontSize: 20 }}>{g.griego}</span>
            <span style={{ fontWeight: 700, fontSize: 15, color: colors.accent }}>{g.transliteracion}</span>
          </div>
          <p style={{ fontSize: 14.5, lineHeight: 1.55, margin: '6px 0 4px', color: colors.muted }}>{g.significado}</p>
          {g.nota && <p style={{ fontSize: 13.5, lineHeight: 1.55, margin: '0 0 8px', color: colors.muted }}>{g.nota}</p>}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {g.capitulos.map((n) => (
              <Link
                key={n}
                href={`/${lang}/capitulo/${n}`}
                style={{ fontSize: 12.5, fontWeight: 600, color: colors.accent, cursor: 'pointer' }}
              >
                {dict.glosario.verEnMateo(String(n))}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
