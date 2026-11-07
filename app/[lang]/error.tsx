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
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 16px' }}>
      <div style={{ maxWidth: 480, textAlign: 'center' }}>
        <div className="np-kicker">{lang === 'pt' ? 'Problema na impressão' : 'Problema en la imprenta'}</div>
        <h1 className="np-headline" style={{ fontSize: 34, margin: '10px 0 10px', color: colors.text }}>
          {dict.errores.errorTitle}
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: colors.muted, margin: '0 0 28px' }}>{dict.errores.errorBody}</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button type="button" className="np-btn" onClick={() => unstable_retry()}>
            {dict.errores.reintentar}
          </button>
          <Link href={`/${lang}`} className="np-chip" style={{ display: 'inline-flex', alignItems: 'center' }}>
            {dict.errores.volverInicio}
          </Link>
        </div>
      </div>
    </div>
  );
}
