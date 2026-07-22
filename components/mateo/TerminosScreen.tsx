'use client';

import { useApp } from '@/lib/app-context';

export default function TerminosScreen() {
  const { colors, dict } = useApp();

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '56px 24px 80px' }}>
      <div style={{ height: 2, width: 56, background: colors.accent, marginBottom: 20 }} />
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 34, fontWeight: 600, margin: '0 0 8px' }}>{dict.terminos.title}</h1>
      <p style={{ fontSize: 13, color: colors.muted, margin: '0 0 36px' }}>{dict.terminos.updated}</p>

      {dict.terminos.sections.map((section) => (
        <div key={section.title} style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 18, fontWeight: 600, margin: '0 0 10px' }}>{section.title}</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 14.5, lineHeight: 1.7, color: colors.muted, margin: '0 0 10px' }}>
              {p}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
