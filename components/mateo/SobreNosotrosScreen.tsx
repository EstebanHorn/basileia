'use client';

import { useApp } from '@/lib/app-context';

export default function SobreNosotrosScreen() {
  const { colors, dict } = useApp();
  const sections = dict.nosotros.sections;

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px 80px' }}>
      <div style={{ height: 2, width: 56, background: colors.accent, marginBottom: 20 }} />
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 36, fontWeight: 600, margin: '0 0 24px' }}>{dict.nosotros.title}</h1>

      <div style={{ background: colors.subtle, borderRadius: 12, padding: '28px 26px', marginBottom: 40 }}>
        <p style={{ fontSize: 16.5, lineHeight: 1.75, margin: 0, color: colors.text }}>{dict.nosotros.intro}</p>
      </div>

      {sections.slice(0, 2).map((section) => (
        <div key={section.title} style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 21, fontWeight: 600, margin: '0 0 14px' }}>{section.title}</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 15, lineHeight: 1.75, color: colors.muted, margin: i === 0 ? '0 0 12px' : 0 }}>
              {p}
            </p>
          ))}
        </div>
      ))}

      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 21, fontWeight: 600, margin: '0 0 14px' }}>{sections[2].title}</h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: colors.muted, margin: '0 0 18px' }}>{sections[2].paragraphs[0]}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 12 }}>
          {dict.nosotros.features.map((f) => (
            <div
              key={f.title}
              style={{
                background: colors.panel,
                border: `1px solid ${colors.border}`,
                borderLeft: `3px solid ${colors.accent}`,
                borderRadius: 10,
                padding: '16px 16px',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: colors.muted, lineHeight: 1.55 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 21, fontWeight: 600, margin: '0 0 14px' }}>{sections[3].title}</h2>
        {sections[3].paragraphs.map((p, i) => (
          <p key={i} style={{ fontSize: 15, lineHeight: 1.75, color: colors.muted, margin: i === 0 ? '0 0 12px' : 0 }}>
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
