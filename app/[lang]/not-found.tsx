import Link from 'next/link';
import { LIGHT } from '@/lib/theme';
import { defaultLocale } from '@/lib/i18n/config';

// Server Component a propósito (sin 'use client' ni hooks): este archivo solo entra en juego
// cuando el propio locale es inválido (notFound() se dispara en app/[lang]/layout.tsx, antes
// de que exista <AppProvider>), así que no puede depender de useApp() ni de un lang conocido.
// El 404 para rutas normales dentro de un locale válido lo maneja la pantalla de la ruta
// catch-all (app/[lang]/[...rest]/page.tsx), que sí tiene contexto completo.
export default function NotFound() {
  const colors = LIGHT;

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
      <div style={{ maxWidth: 440, textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ fontSize: 56, fontWeight: 600, color: colors.accent, margin: '0 0 6px' }}>404</div>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 20px', color: colors.text }}>Página no encontrada / Página não encontrada</h1>
        <Link
          href={`/${defaultLocale}`}
          style={{
            display: 'inline-block',
            fontSize: 14.5,
            fontWeight: 600,
            color: '#fff',
            background: colors.accent,
            padding: '11px 20px',
            borderRadius: 9,
            textDecoration: 'none',
          }}
        >
          Ir al inicio / Ir ao início
        </Link>
      </div>
    </div>
  );
}
