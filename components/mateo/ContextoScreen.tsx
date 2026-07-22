'use client';

import { useApp } from '@/lib/app-context';
import { temaLabel } from '@/lib/content/editorial';
import type { ContextoEntry } from '@/lib/content/types';

interface ContextoScreenProps {
  contexto: ContextoEntry[];
}

export default function ContextoScreen({ contexto }: ContextoScreenProps) {
  const { colors, lang, dict } = useApp();
  const themes = [...new Set(contexto.map((t) => t.tema))];
  const groups = themes.map((tema) => ({ tema, topics: contexto.filter((t) => t.tema === tema) }));

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 32, fontWeight: 600, margin: '0 0 24px' }}>{dict.contexto.title}</h1>
      {groups.map((grp) => (
        <div key={grp.tema} style={{ marginBottom: 30 }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: colors.accent, marginBottom: 10 }}>
            {temaLabel(lang, grp.tema)}
          </div>
          {grp.topics.map((t) => (
            <div key={t.id} style={{ background: colors.subtle, borderRadius: 10, padding: '18px 20px', marginBottom: 12 }}>
              <div style={{ fontFamily: 'var(--font-lora), serif', fontWeight: 600, fontSize: 16.5, marginBottom: 8 }}>{t.titulo}</div>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, margin: 0, color: colors.muted }}>{t.texto}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
