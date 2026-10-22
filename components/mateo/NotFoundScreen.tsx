'use client';

import Link from 'next/link';
import { useApp } from '@/lib/app-context';

export default function NotFoundScreen() {
  const { colors, lang, dict } = useApp();

  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
      <div style={{ maxWidth: 440, textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-lora), serif', fontSize: 56, fontWeight: 600, color: colors.accent, margin: '0 0 6px' }}>
          404
        </div>
        <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 24, fontWeight: 600, margin: '0 0 10px', color: colors.text }}>
          {dict.errores.notFoundTitle}
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: colors.muted, margin: '0 0 28px' }}>{dict.errores.notFoundBody}</p>
        <Link
          href={`/${lang}`}
          style={{
            display: 'inline-block',
            fontSize: 14.5,
            fontWeight: 600,
            color: '#fff',
            background: colors.accent,
            padding: '11px 20px',
            borderRadius: 9,
          }}
        >
          {dict.errores.volverInicio}
        </Link>
      </div>
    </div>
  );
}
