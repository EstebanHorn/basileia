'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import { useAuth } from '@/lib/supabase/auth-context';
import { locales } from '@/lib/i18n/config';
import Pressable from './Pressable';

const LOCALE_NAMES: Record<string, string> = { es: 'Español', pt: 'Português' };

function setLocaleCookie(next: string) {
  document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000`;
}

export default function TopNav() {
  const { colors, theme, toggleTheme, lang, dict, openAuthModal } = useApp();
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeSegment = pathname.replace(new RegExp(`^/${lang}`), '').split('/').filter(Boolean)[0] ?? '';

  const navItems: [string, string][] = [
    ['indice', dict.nav.indice],
    ['mapa', dict.nav.mapa],
    ['personajes', dict.nav.personajes],
    ['glosario', dict.nav.glosario],
    ['contexto', dict.nav.contexto],
    ['paralelos', dict.nav.paralelos],
    ['notas', dict.nav.notas],
  ].map(([key, label]) => [key, label]);

  const userLabel = user ? user.user_metadata?.nombre || user.email || null : null;

  const switchLocale = (next: string) => {
    setLocaleCookie(next);
    const rest = pathname.replace(new RegExp(`^/${lang}`), '');
    router.push(`/${next}${rest}`);
  };

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
        <Link
          href={`/${lang}`}
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
        </Link>

        <div style={{ flex: 1 }} />

        <div className="topnav-desktop-only" style={{ gap: 16, alignItems: 'center', flexShrink: 0 }}>
          {navItems.map(([key, label]) => (
            <Link
              key={key}
              href={`/${lang}/${key}`}
              style={{
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: activeSegment === key ? 700 : 500,
                color: activeSegment === key ? colors.accent : colors.text,
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          href={`/${lang}/buscar`}
          aria-label={dict.buscar.navLabel}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            width: 34,
            height: 34,
            borderRadius: 8,
            border: `1px solid ${colors.border}`,
            color: activeSegment === 'buscar' ? colors.accent : colors.text,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
            <circle cx="11" cy="11" r="7"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </Link>

        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          {locales.map((l) => (
            <Pressable
              key={l}
              onClick={() => switchLocale(l)}
              aria-label={LOCALE_NAMES[l]}
              aria-current={l === lang ? 'true' : undefined}
              style={{
                fontSize: 12,
                fontWeight: 700,
                padding: '6px 8px',
                borderRadius: 6,
                color: l === lang ? '#fff' : colors.muted,
                background: l === lang ? colors.accent : 'transparent',
                textTransform: 'uppercase',
              }}
            >
              {l}
            </Pressable>
          ))}
        </div>

        <Pressable
          onClick={toggleTheme}
          aria-label={dict.topnav.cambiarTema}
          style={{
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
        </Pressable>

        <div className="topnav-desktop-only" style={{ gap: 16, alignItems: 'center', flexShrink: 0 }}>
          {userLabel ? (
            <>
              <div style={{ fontSize: 13.5, color: colors.muted, whiteSpace: 'nowrap' }}>{userLabel}</div>
              <Pressable onClick={signOut} style={{ fontSize: 14, fontWeight: 600, color: colors.text, whiteSpace: 'nowrap' }}>
                {dict.topnav.logout}
              </Pressable>
            </>
          ) : (
            <>
              <Pressable
                onClick={() => openAuthModal('login')}
                style={{ fontSize: 14, fontWeight: 600, color: colors.text, whiteSpace: 'nowrap' }}
              >
                {dict.topnav.login}
              </Pressable>
              <Pressable
                onClick={() => openAuthModal('register')}
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#fff',
                  background: colors.accent,
                  padding: '9px 16px',
                  borderRadius: 8,
                  whiteSpace: 'nowrap',
                }}
              >
                {dict.topnav.register}
              </Pressable>
            </>
          )}
        </div>

        <Pressable
          className="topnav-mobile-only"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label={mobileMenuOpen ? dict.topnav.cerrarMenu : dict.topnav.abrirMenu}
          aria-expanded={mobileMenuOpen}
          style={{
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
        </Pressable>
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
          <Link
            href={`/${lang}/buscar`}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              padding: '11px 4px',
              fontSize: 15,
              fontWeight: activeSegment === 'buscar' ? 700 : 500,
              color: activeSegment === 'buscar' ? colors.accent : colors.text,
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            {dict.buscar.navLabel}
          </Link>
          {navItems.map(([key, label]) => (
            <Link
              key={key}
              href={`/${lang}/${key}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                cursor: 'pointer',
                padding: '11px 4px',
                fontSize: 15,
                fontWeight: activeSegment === key ? 700 : 500,
                color: activeSegment === key ? colors.accent : colors.text,
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              {label}
            </Link>
          ))}
          {userLabel ? (
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 13.5, color: colors.muted, marginBottom: 10 }}>{userLabel}</div>
              <Pressable
                onClick={signOut}
                style={{
                  width: '100%',
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: 600,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  padding: 11,
                  borderRadius: 8,
                }}
              >
                {dict.topnav.logout}
              </Pressable>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <Pressable
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: 600,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  padding: 11,
                  borderRadius: 8,
                }}
              >
                {dict.topnav.login}
              </Pressable>
              <Pressable
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('register');
                }}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#fff',
                  background: colors.accent,
                  padding: 11,
                  borderRadius: 8,
                }}
              >
                {dict.topnav.register}
              </Pressable>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
