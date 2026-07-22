'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/app-context';
import { categoriaLabel, categoriaOrder } from '@/lib/content/editorial';
import type { Personaje } from '@/lib/content/types';

interface PersonajesScreenProps {
  personajes: Personaje[];
}

export default function PersonajesScreen({ personajes }: PersonajesScreenProps) {
  const { colors, lang, dict } = useApp();
  const [filter, setFilter] = useState('todos');
  const [openCharacter, setOpenCharacter] = useState<string | null>(null);

  const categories = categoriaOrder().filter((c) => personajes.some((p) => p.categoria === c));
  const characters = personajes.filter((p) => filter === 'todos' || p.categoria === filter);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 32, fontWeight: 600, margin: '0 0 20px' }}>{dict.personajes.title}</h1>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {[{ id: 'todos', name: dict.personajes.categoriaTodos }, ...categories.map((c) => ({ id: c, name: categoriaLabel(lang, c) }))].map(
          ({ id, name }) => {
            const active = filter === id;
            return (
              <div
                key={id}
                onClick={() => setFilter(id)}
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
          }
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
        {characters.map((ch) => {
          const open = openCharacter === ch.id;
          return (
            <div
              key={ch.id}
              onClick={() => setOpenCharacter(open ? null : ch.id)}
              style={{ background: colors.panel, border: `1px solid ${colors.border}`, borderRadius: 10, padding: '16px 18px', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontFamily: 'var(--font-lora), serif', fontWeight: 600, fontSize: 16.5 }}>{ch.nombre}</div>
                <div style={{ fontSize: 11, color: colors.accent, fontWeight: 600 }}>{open ? dict.personajes.ocultar : dict.personajes.verMas}</div>
              </div>
              <div style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>{categoriaLabel(lang, ch.categoria)}</div>
              {open && (
                <>
                  <p style={{ fontSize: 14, lineHeight: 1.6, margin: '12px 0 0', color: colors.muted }}>{ch.descripcion}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                    {ch.capitulos.map((num) => (
                      <Link
                        key={num}
                        href={`/${lang}/capitulo/${num}`}
                        onClick={(e) => e.stopPropagation()}
                        style={{ fontSize: 12, fontWeight: 600, padding: '5px 10px', borderRadius: 14, background: colors.subtle, color: colors.accent }}
                      >
                        {dict.capitulo.mateoPrefix} {num}
                      </Link>
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
