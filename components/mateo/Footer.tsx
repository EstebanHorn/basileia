'use client';

import Image from 'next/image';
import { Colors, Screen, Theme } from '@/lib/theme';

interface FooterProps {
  colors: Colors;
  theme: Theme;
  isMobile: boolean;
  onNavigate: (s: Screen) => void;
}

const EXPLORAR: [Screen, string][] = [
  ['indice', 'Índice'],
  ['mapa', 'Mapa'],
  ['personajes', 'Personajes'],
  ['glosario', 'Glosario'],
  ['contexto', 'Contexto'],
];

const PROYECTO: [Screen, string][] = [
  ['nosotros', 'Sobre nosotros'],
  ['privacidad', 'Privacidad'],
  ['terminos', 'Términos de uso'],
];

export default function Footer({ colors, theme, isMobile, onNavigate }: FooterProps) {
  const year = new Date().getFullYear();

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
          <div
            onClick={() => onNavigate('inicio')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 10 }}
          >
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
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.65, color: colors.muted, margin: 0, maxWidth: 320 }}>
            Estudio del Evangelio de Mateo — análisis griego, contexto histórico y comentario capítulo a capítulo,
            basado en el estudio bíblico de la iglesia Reino en Movimiento.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 48, flex: '2 1 400px' }}>
          <div>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em', color: colors.text, fontWeight: 700, marginBottom: 10 }}>
              Explorar
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {EXPLORAR.map(([key, label]) => (
                <div key={key} onClick={() => onNavigate(key)} style={linkStyle}>
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em', color: colors.text, fontWeight: 700, marginBottom: 10 }}>
              Proyecto
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {PROYECTO.map(([key, label]) => (
                <div key={key} onClick={() => onNavigate(key)} style={linkStyle}>
                  {label}
                </div>
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
            © {year} Basileia. Todos los derechos reservados.
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div onClick={() => onNavigate('privacidad')} style={{ fontSize: 12, color: colors.muted, cursor: 'pointer' }}>
              Privacidad
            </div>
            <div onClick={() => onNavigate('terminos')} style={{ fontSize: 12, color: colors.muted, cursor: 'pointer' }}>
              Términos de uso
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
