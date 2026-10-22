'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/app-context';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const { colors, lang, dict } = useApp();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
      <div style={{ maxWidth: 440, textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 26, fontWeight: 600, margin: '0 0 10px', color: colors.text }}>
          {dict.errores.errorTitle}
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: colors.muted, margin: '0 0 28px' }}>{dict.errores.errorBody}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-reset"
            onClick={() => unstable_retry()}
            style={{
              fontSize: 14.5,
              fontWeight: 600,
              color: '#fff',
              background: colors.accent,
              padding: '11px 20px',
              borderRadius: 9,
            }}
          >
            {dict.errores.reintentar}
          </button>
          <Link
            href={`/${lang}`}
            style={{
              fontSize: 14.5,
              fontWeight: 600,
              color: colors.text,
              border: `1px solid ${colors.border}`,
              padding: '11px 20px',
              borderRadius: 9,
            }}
          >
            {dict.errores.volverInicio}
          </Link>
        </div>
      </div>
    </div>
  );
}
