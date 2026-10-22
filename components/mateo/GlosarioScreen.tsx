'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/app-context';
import type { GlosarioTermino } from '@/lib/content/types';
import Pressable from './Pressable';

interface GlosarioScreenProps {
  terminos: GlosarioTermino[];
}

type Categoria = 'verbo' | 'sustantivo' | 'adjetivo' | 'otro';

function categoriaDe(morfologia: string): Categoria {
  const m = morfologia.toLowerCase();
  if (m.startsWith('verbo')) return 'verbo';
  if (m.startsWith('sustantivo') || m.startsWith('substantivo')) return 'sustantivo';
  if (m.startsWith('adjetivo')) return 'adjetivo';
  return 'otro';
}

export default function GlosarioScreen({ terminos }: GlosarioScreenProps) {
  const { colors, lang, dict } = useApp();
  const [query, setQuery] = useState('');
  const [categoria, setCategoria] = useState<Categoria | 'todos'>('todos');

  const categoriaLabels: Record<Categoria, string> = {
    verbo: dict.glosario.categoriaVerbo,
    sustantivo: dict.glosario.categoriaSustantivo,
    adjetivo: dict.glosario.categoriaAdjetivo,
    otro: dict.glosario.categoriaOtro,
  };

  const sorted = [...terminos].sort((a, b) => a.transliteracion.localeCompare(b.transliteracion));
  const gq = query.trim().toLowerCase();
  const items = sorted.filter((t) => {
    if (categoria !== 'todos' && categoriaDe(t.morfologia) !== categoria) return false;
    if (!gq) return true;
    return (
      t.transliteracion.toLowerCase().includes(gq) ||
      t.significado.toLowerCase().includes(gq) ||
      t.griego.toLowerCase().includes(gq) ||
      t.lema.toLowerCase().includes(gq)
    );
  });

  const chips: { id: Categoria | 'todos'; name: string }[] = [
    { id: 'todos', name: dict.glosario.categoriaTodos },
    { id: 'verbo', name: categoriaLabels.verbo },
    { id: 'sustantivo', name: categoriaLabels.sustantivo },
    { id: 'adjetivo', name: categoriaLabels.adjetivo },
    { id: 'otro', name: categoriaLabels.otro },
  ];

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
          marginBottom: 14,
        }}
      />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {chips.map((c) => {
          const active = categoria === c.id;
          return (
            <Pressable
              key={c.id}
              onClick={() => setCategoria(c.id)}
              aria-pressed={active}
              style={{
                padding: '7px 13px',
                borderRadius: 20,
                fontSize: 12.5,
                fontWeight: 600,
                border: `1px solid ${active ? colors.accent : colors.border}`,
                background: active ? colors.accent : colors.panel,
                color: active ? '#fff' : colors.text,
              }}
            >
              {c.name}
            </Pressable>
          );
        })}
      </div>
      {items.map((g) => (
        <div key={g.id} style={{ padding: '16px 0', borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-lora), serif', fontSize: 20 }}>{g.griego}</span>
            <span style={{ fontWeight: 700, fontSize: 15, color: colors.accent }}>{g.transliteracion}</span>
          </div>
          {g.lema !== g.griego && (
            <p style={{ fontSize: 12.5, color: colors.muted, margin: '4px 0 0' }}>
              {dict.capitulo.lemaLabel}: <span style={{ fontFamily: 'var(--font-lora), serif' }}>{g.lema}</span>
            </p>
          )}
          <p style={{ fontSize: 12, fontWeight: 600, color: colors.accent, margin: '4px 0 6px' }}>{g.morfologia}</p>
          <p style={{ fontSize: 14.5, lineHeight: 1.55, margin: '0 0 4px', color: colors.muted }}>{g.significado}</p>
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
