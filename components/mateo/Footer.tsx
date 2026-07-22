'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/app-context';

export default function Footer() {
  const { colors, theme, isMobile, lang, dict } = useApp();
  const year = new Date().getFullYear();

  const EXPLORAR: [string, string][] = [
    ['indice', dict.nav.indice],
    ['mapa', dict.nav.mapa],
    ['personajes', dict.nav.personajes],
    ['glosario', dict.nav.glosario],
    ['contexto', dict.nav.contexto],
  ];

  const PROYECTO: [string, string][] = [
    ['nosotros', dict.nav.nosotros],
    ['privacidad', dict.nav.privacidad],
    ['terminos', dict.nav.terminos],
  ];

  const linkStyle: React.CSSProperties = {
    cursor: 'pointer',
    fontSize: 13.5,
    color: colors.muted,
    lineHeight: 1.9,
  };

  return (
    <footer
      style={{
        borderTop: `1px solid ${colors.border}`,
        background: colors.panel,
        marginTop: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1170,
          margin: '0 auto',
          padding: isMobile ? '36px 24px 20px' : '48px 24px 24px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 28 : 48,
        }}
      >
        <div style={{ flex: '1 1 260px', minWidth: 200 }}>
          <Link href={`/${lang}`} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 10 }}>
            <Image
              src={theme === 'dark' ? '/darkmode.png' : '/iconosinfondo.png'}
              alt=""
              width={22}
              height={22}
              style={{ display: 'block' }}
            />
            <div style={{ fontFamily: 'var(--font-lora), serif', fontWeight: 600, fontSize: 18, color: colors.accent }}>
              Basileia
            </div>
          </Link>
          <p style={{ fontSize: 13.5, lineHeight: 1.65, color: colors.muted, margin: 0, maxWidth: 320 }}>{dict.footer.tagline}</p>
        </div>

        <div style={{ display: 'flex', gap: 48, flex: '2 1 400px' }}>
          <div>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em', color: colors.text, fontWeight: 700, marginBottom: 10 }}>
              {dict.footer.explorar}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {EXPLORAR.map(([key, label]) => (
                <Link key={key} href={`/${lang}/${key}`} style={linkStyle}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em', color: colors.text, fontWeight: 700, marginBottom: 10 }}>
              {dict.footer.proyecto}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {PROYECTO.map(([key, label]) => (
                <Link key={key} href={`/${lang}/${key}`} style={linkStyle}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: `1px solid ${colors.border}`,
          padding: '16px 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1170,
            margin: '0 auto',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: 8,
          }}
        >
          <div style={{ fontSize: 12, color: colors.muted }}>
            © {year} Basileia. {dict.footer.rights}
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href={`/${lang}/privacidad`} style={{ fontSize: 12, color: colors.muted, cursor: 'pointer' }}>
              {dict.nav.privacidad}
            </Link>
            <Link href={`/${lang}/terminos`} style={{ fontSize: 12, color: colors.muted, cursor: 'pointer' }}>
              {dict.nav.terminos}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
