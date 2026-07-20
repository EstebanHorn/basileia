'use client';

import { Colors } from '@/lib/theme';
import { CHAPTER_CONTENT } from '@/lib/mateo-data';

interface GlosarioScreenProps {
  colors: Colors;
  query: string;
  onQueryChange: (value: string) => void;
  onGoToChapter: (n: number) => void;
}

export default function GlosarioScreen({ colors, query, onQueryChange, onGoToChapter }: GlosarioScreenProps) {
  const allTerms = Object.entries(CHAPTER_CONTENT).flatMap(([num, chapter]) =>
    chapter.blocks.flatMap((b) =>
      b.greek.map((g) => ({
        ...g,
        ref: `${num}:${b.ref.split('-')[0].replace(/\D/g, '') || b.ref}`,
        num: parseInt(num, 10),
      }))
    )
  );
  allTerms.sort((a, b) => a.translit.localeCompare(b.translit));

  const gq = query.trim().toLowerCase();
  const items = allTerms.filter(
    (t) => !gq || t.translit.toLowerCase().includes(gq) || t.gloss.toLowerCase().includes(gq) || t.word.toLowerCase().includes(gq)
  );

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 32, fontWeight: 600, margin: '0 0 6px' }}>
        Glosario griego
      </h1>
      <p style={{ fontSize: 14, color: colors.muted, margin: '0 0 20px' }}>
        {allTerms.length} términos acumulados de los capítulos estudiados.
      </p>
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Buscar término..."
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
      {items.map((g, i) => (
        <div key={i} style={{ padding: '16px 0', borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-lora), serif', fontSize: 20 }}>{g.greek}</span>
            <span style={{ fontWeight: 700, fontSize: 15, color: colors.accent }}>{g.translit}</span>
          </div>
          <p style={{ fontSize: 14.5, lineHeight: 1.55, margin: '6px 0 8px', color: colors.muted }}>{g.gloss}</p>
          <div onClick={() => onGoToChapter(g.num)} style={{ fontSize: 12.5, fontWeight: 600, color: colors.accent, cursor: 'pointer', display: 'inline-block' }}>
            Ver en Mateo {g.ref} →
          </div>
        </div>
      ))}
    </div>
  );
}
