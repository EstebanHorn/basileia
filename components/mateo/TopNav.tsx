'use client';

import Image from 'next/image';
import { Colors, NAV_LABELS, Screen, Theme } from '@/lib/theme';

interface TopNavProps {
  colors: Colors;
  screen: Screen;
  onNavigate: (s: Screen) => void;
  onGoInicio: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  userLabel: string | null;
  onLogout: () => void;
}

export default function TopNav({
  colors,
  screen,
  onNavigate,
  onGoInicio,
  theme,
  onToggleTheme,
  mobileMenuOpen,
  onToggleMobileMenu,
  onOpenLogin,
  onOpenRegister,
  userLabel,
  onLogout,
}: TopNavProps) {
  const navItems = NAV_LABELS.map(([key, label]) => ({
    key,
    label,
    color: screen === key ? colors.accent : colors.text,
    weight: screen === key ? 700 : 500,
  }));

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: colors.panel,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '12px 24px' }}>
        <div
          onClick={onGoInicio}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <Image
            src={theme === 'dark' ? '/darkmode.png' : '/iconosinfondo.png'}
            alt=""
            width={26}
            height={26}
            style={{ display: 'block' }}
            priority
          />
          <div
            style={{
              fontFamily: 'var(--font-lora), serif',
              fontWeight: 600,
              fontSize: 22,
              color: colors.accent,
              whiteSpace: 'nowrap',
            }}
          >
            Basileia
          </div>
        </div>

        <div style={{ flex: 1 }} />

        <div className="topnav-desktop-only" style={{ gap: 16, alignItems: 'center', flexShrink: 0 }}>
          {navItems.map((item) => (
            <div
              key={item.key}
              onClick={() => onNavigate(item.key)}
              style={{
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: item.weight,
                color: item.color,
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </div>
          ))}
        </div>

        <div
          onClick={onToggleTheme}
          style={{
            cursor: 'pointer',
            flexShrink: 0,
            width: 34,
            height: 34,
            borderRadius: 8,
            border: `1px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
            <circle cx="12" cy="12" r="4"></circle>
            <line x1="12" y1="2" x2="12" y2="4"></line>
            <line x1="12" y1="20" x2="12" y2="22"></line>
            <line x1="4.9" y1="4.9" x2="6.3" y2="6.3"></line>
            <line x1="17.7" y1="17.7" x2="19.1" y2="19.1"></line>
            <line x1="2" y1="12" x2="4" y2="12"></line>
            <line x1="20" y1="12" x2="22" y2="12"></line>
            <line x1="4.9" y1="19.1" x2="6.3" y2="17.7"></line>
            <line x1="17.7" y1="6.3" x2="19.1" y2="4.9"></line>
          </svg>
        </div>

        <div className="topnav-desktop-only" style={{ gap: 16, alignItems: 'center', flexShrink: 0 }}>
          {userLabel ? (
            <>
              <div style={{ fontSize: 13.5, color: colors.muted, whiteSpace: 'nowrap' }}>{userLabel}</div>
              <div
                onClick={onLogout}
                style={{ cursor: 'pointer', fontSize: 14, fontWeight: 600, color: colors.text, whiteSpace: 'nowrap' }}
              >
                Cerrar sesión
              </div>
            </>
          ) : (
            <>
              <div
                onClick={onOpenLogin}
                style={{ cursor: 'pointer', fontSize: 14, fontWeight: 600, color: colors.text, whiteSpace: 'nowrap' }}
              >
                Iniciar sesión
              </div>
              <div
                onClick={onOpenRegister}
                style={{
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#fff',
                  background: colors.accent,
                  padding: '9px 16px',
                  borderRadius: 8,
                  whiteSpace: 'nowrap',
                }}
              >
                Registrarse
              </div>
            </>
          )}
        </div>

        <div
          className="topnav-mobile-only"
          onClick={onToggleMobileMenu}
          style={{
            cursor: 'pointer',
            flexShrink: 0,
            width: 34,
            height: 34,
            borderRadius: 8,
            border: `1px solid ${colors.border}`,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          style={{
            borderTop: `1px solid ${colors.border}`,
            padding: '8px 24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {navItems.map((item) => (
            <div
              key={item.key}
              onClick={() => onNavigate(item.key)}
              style={{
                cursor: 'pointer',
                padding: '11px 4px',
                fontSize: 15,
                fontWeight: item.weight,
                color: item.color,
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              {item.label}
            </div>
          ))}
          {userLabel ? (
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 13.5, color: colors.muted, marginBottom: 10 }}>{userLabel}</div>
              <div
                onClick={onLogout}
                style={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  padding: 11,
                  borderRadius: 8,
                }}
              >
                Cerrar sesión
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <div
                onClick={onOpenLogin}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  padding: 11,
                  borderRadius: 8,
                }}
              >
                Iniciar sesión
              </div>
              <div
                onClick={onOpenRegister}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#fff',
                  background: colors.accent,
                  padding: 11,
                  borderRadius: 8,
                }}
              >
                Registrarse
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
