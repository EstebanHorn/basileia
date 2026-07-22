'use client';

import { useApp } from '@/lib/app-context';

export default function PrivacidadScreen() {
  const { colors, dict } = useApp();

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '56px 24px 80px' }}>
      <div style={{ height: 2, width: 56, background: colors.accent, marginBottom: 20 }} />
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 34, fontWeight: 600, margin: '0 0 8px' }}>{dict.privacidad.title}</h1>
      <p style={{ fontSize: 13, color: colors.muted, margin: '0 0 36px' }}>{dict.privacidad.updated}</p>

      {dict.privacidad.sections.map((section) => (
        <div key={section.title} style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 18, fontWeight: 600, margin: '0 0 10px' }}>{section.title}</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 14.5, lineHeight: 1.7, color: colors.muted, margin: '0 0 10px' }}>
              {p}
            </p>
          ))}
          {section.bullets && (
            <ul style={{ margin: '10px 0 0', paddingLeft: 20 }}>
              {section.bullets.map((b, i) => (
                <li key={i} style={{ fontSize: 14.5, lineHeight: 1.7, color: colors.muted, marginBottom: 6 }}>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
