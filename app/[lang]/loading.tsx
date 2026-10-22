'use client';

import { useApp } from '@/lib/app-context';

export default function Loading() {
  const { colors, dict } = useApp();

  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px' }}>
      <div
        className="spinner"
        style={{ borderColor: colors.border, borderTopColor: colors.accent }}
        role="status"
        aria-label={dict.errores.cargando}
      />
    </div>
  );
}
