'use client';

import { Colors } from '@/lib/theme';
import { CONTEXT_TOPICS } from '@/lib/mateo-data';

interface ContextoScreenProps {
  colors: Colors;
}

export default function ContextoScreen({ colors }: ContextoScreenProps) {
  const themes = [...new Set(CONTEXT_TOPICS.map((t) => t.theme))];
  const groups = themes.map((theme) => ({ theme, topics: CONTEXT_TOPICS.filter((t) => t.theme === theme) }));

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 32, fontWeight: 600, margin: '0 0 24px' }}>
        Contexto histórico-cultural
      </h1>
      {groups.map((grp) => (
        <div key={grp.theme} style={{ marginBottom: 30 }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: colors.accent, marginBottom: 10 }}>
            {grp.theme}
          </div>
          {grp.topics.map((t) => (
            <div key={t.id} style={{ background: colors.subtle, borderRadius: 10, padding: '18px 20px', marginBottom: 12 }}>
              <div style={{ fontFamily: 'var(--font-lora), serif', fontWeight: 600, fontSize: 16.5, marginBottom: 8 }}>{t.title}</div>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, margin: 0, color: colors.muted }}>{t.body}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
