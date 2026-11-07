'use client';

import { useApp } from '@/lib/app-context';

// Mientras carga: "prensa en marcha" con tres renglones de tinta.
export default function Loading() {
  const { dict, lang } = useApp();

  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px' }}>
      <div role="status" aria-label={dict.errores.cargando} style={{ width: 220, textAlign: 'center' }}>
        <div className="np-kicker" style={{ marginBottom: 14 }}>
          {lang === 'pt' ? 'Imprimindo…' : 'Imprimiendo…'}
        </div>
        <div className="np-press-lines" aria-hidden>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
