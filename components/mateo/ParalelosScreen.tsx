'use client';

import Link from 'next/link';
import { useApp } from '@/lib/app-context';
import type { CitaAT, Paralelo } from '@/lib/content/types';

interface ParalelosScreenProps {
  citas: CitaAT[];
  paralelos: Paralelo[];
}

export default function ParalelosScreen({ citas, paralelos }: ParalelosScreenProps) {
  const { colors, lang, dict } = useApp();

  const chapters = [...new Set([...citas.flatMap((c) => c.capitulos), ...paralelos.flatMap((p) => p.capitulos)])].sort((a, b) => a - b);

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 32, fontWeight: 600, margin: '0 0 6px' }}>{dict.paralelos.title}</h1>
      <p style={{ fontSize: 14, color: colors.muted, margin: '0 0 24px' }}>{dict.paralelos.subtitle}</p>

      {chapters.map((n) => {
        const chapterCitas = citas.filter((c) => c.capitulos.includes(n));
        const chapterParalelos = paralelos.filter((p) => p.capitulos.includes(n));

        return (
          <div key={n} style={{ marginBottom: 32 }}>
            <Link
              href={`/${lang}/capitulo/${n}`}
              style={{
                display: 'inline-flex',
                alignItems: 'baseline',
                gap: 6,
                fontFamily: 'var(--font-lora), serif',
                fontSize: 19,
                fontWeight: 600,
                color: colors.text,
                marginBottom: 12,
              }}
            >
              {dict.capitulo.mateoPrefix} {n} →
            </Link>

            {chapterCitas.length > 0 && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: colors.accent, marginBottom: 8 }}>
                  {dict.paralelos.tipoCitaAT}
                </div>
                {chapterCitas.map((c) => (
                  <div key={c.id} style={{ background: colors.subtle, borderRadius: 10, padding: '14px 16px', marginBottom: 8 }}>
                    <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 4 }}>{c.referencia}</div>
                    <p style={{ fontSize: 13.5, lineHeight: 1.55, margin: 0, color: colors.muted }}>{c.nota}</p>
                  </div>
                ))}
              </div>
            )}

            {chapterParalelos.length > 0 && (
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: colors.muted, marginBottom: 8 }}>
                  {dict.paralelos.tipoParalelo}
                </div>
                {chapterParalelos.map((p) => (
                  <div key={p.id} style={{ border: `1px solid ${colors.border}`, borderRadius: 10, padding: '14px 16px', marginBottom: 8 }}>
                    <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: p.nota ? 4 : 0 }}>{p.referencia}</div>
                    {p.nota && <p style={{ fontSize: 13.5, lineHeight: 1.55, margin: 0, color: colors.muted }}>{p.nota}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
