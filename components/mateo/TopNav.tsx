'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import { useAuth } from '@/lib/supabase/auth-context';
import { locales } from '@/lib/i18n/config';
import Pressable from './Pressable';
import styles from './TopNav.module.css';

const LOCALE_NAMES: Record<string, string> = { es: 'Español', pt: 'Português' };

const STRINGS = {
  es: { vol: 'Vol. I', dateline: 'Vol. I · Galilea, año 30 d.C.', kicker: 'El Evangelio según Mateo · Edición de estudio', price: 'Gratis, por gracia', tagline: 'Noticias de un Reino que no es de este mundo', night: 'Edición nocturna', day: 'Edición matutina' },
  pt: { vol: 'Vol. I', dateline: 'Vol. I · Galileia, ano 30 d.C.', kicker: 'O Evangelho segundo Mateus · Edição de estudo', price: 'Grátis, pela graça', tagline: 'Notícias de um Reino que não é deste mundo', night: 'Edição noturna', day: 'Edição matutina' },
};

function setLocaleCookie(next: string) {
  document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000`;
}

export default function TopNav({ variant = 'page' }: { variant?: 'home' | 'page' | 'compact' }) {
  const compact = variant === 'compact';
  const isHome = variant === 'home';
  const { theme, toggleTheme, lang, dict, openAuthModal } = useApp();
  const iconSrc = `/brand/icono-chico-${theme === 'dark' ? 'dark' : 'light'}.svg`;
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mastHidden, setMastHidden] = useState(compact);
  const mastRef = useRef<HTMLElement>(null);
  const t = STRINGS[lang];

  const activeSegment = pathname.replace(new RegExp(`^/${lang}`), '').split('/').filter(Boolean)[0] ?? '';

  // La marca chica de la barra fija aparece cuando la cabecera grande sale de pantalla.
  useEffect(() => {
    const el = mastRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setMastHidden(!entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [compact]);

  const navItems: [string, string][] = [
    ['indice', dict.nav.indice],
    ['mapa', dict.nav.mapa],
    ['personajes', dict.nav.personajes],
    ['glosario', dict.nav.glosario],
    ['contexto', dict.nav.contexto],
    ['paralelos', dict.nav.paralelos],
    ['notas', dict.nav.notas],
  ];

  const userLabel = user ? user.user_metadata?.nombre || user.email || null : null;

  const switchLocale = (next: string) => {
    setLocaleCookie(next);
    const rest = pathname.replace(new RegExp(`^/${lang}`), '');
    router.push(`/${next}${rest}`);
  };

  const showMiniBrand = compact || mastHidden;

  // "Tinta corrida": la sombra de color de la cabecera sigue al mouse.
  const onMastheadMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', (((e.clientX - r.left) / r.width - 0.5) * 8).toFixed(2));
    e.currentTarget.style.setProperty('--my', (((e.clientY - r.top) / r.height - 0.5) * 6).toFixed(2));
  };
  const onMastheadLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty('--mx', '2');
    e.currentTarget.style.setProperty('--my', '1');
  };

  return (
    <>
      {/* Franja superior: fecha, idioma, tema y cuenta */}
      <div className={styles.strip} data-home={isHome ? '' : undefined}>
        <div className={styles.dots} aria-hidden>
          <span style={{ background: 'var(--ink)' }} />
          <span style={{ background: 'var(--orange)' }} />
          <span style={{ background: 'var(--olive)' }} />
          <span style={{ background: 'var(--maroon)' }} />
          <span style={{ background: 'var(--tan)' }} />
        </div>
        <span className={styles.dateline}>{t.dateline}</span>

        <div className={styles.stripRight}>
          <div className={styles.langs}>
            {locales.map((l, i) => (
              <span key={l} style={{ display: 'contents' }}>
                {i > 0 && <span aria-hidden>/</span>}
                <Pressable
                  onClick={() => switchLocale(l)}
                  aria-label={LOCALE_NAMES[l]}
                  aria-current={l === lang ? 'true' : undefined}
                  className={styles.langBtn}
                >
                  {l.toUpperCase()}
                </Pressable>
              </span>
            ))}
          </div>

          <Pressable onClick={toggleTheme} aria-label={dict.topnav.cambiarTema} className={styles.themeBtn} title={dict.topnav.cambiarTema}>
            <span className={styles.themeIcon} data-dark={theme === 'dark' ? '' : undefined} aria-hidden>
              {theme === 'dark' ? '☾' : '☀'}
            </span>
            <span className={styles.themeLabel}>{theme === 'dark' ? t.day : t.night}</span>
          </Pressable>

          <div className={styles.account}>
            {userLabel ? (
              <>
                <span className={styles.user}>{userLabel}</span>
                <Pressable onClick={signOut} className={styles.textBtn}>
                  {dict.topnav.logout}
                </Pressable>
              </>
            ) : (
              <>
                <Pressable onClick={() => openAuthModal('login')} className={styles.textBtn}>
                  {dict.topnav.login}
                </Pressable>
                <Pressable onClick={() => openAuthModal('register')} className={styles.registerBtn}>
                  {dict.topnav.register}
                </Pressable>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Cabecera de diario: reglas dobles, corona, nombre a todo el ancho y pie con lema.
          Grande en la portada, más chica en el resto, ausente en el mapa. */}
      {!compact && (
        <header
          ref={mastRef}
          className={styles.masthead}
          data-home={isHome ? '' : undefined}
          onMouseMove={onMastheadMove}
          onMouseLeave={onMastheadLeave}
        >
          <div className={styles.mastInner}>
            <div className={styles.rules} aria-hidden />
            <svg className={styles.crown} viewBox="505 58 132 72" aria-hidden>
              <path d="M515.5,111.9 L515.5,84.6 L545.2,90.8 L570.5,73.4 L595.8,90.8 L625.5,84.6 L625.5,111.9Z" />
              <rect x="515.5" y="115.6" width="110" height="12.4" />
              <circle cx="515.5" cy="79.6" r="8.2" />
              <circle cx="570.5" cy="68.5" r="8.2" />
              <circle cx="625.5" cy="79.6" r="8.2" />
            </svg>
            <Link href={`/${lang}`} className={styles.mastLink} aria-label="Basileia">
              {'BASILEIA'.split('').map((ch, i) => (
                <span key={i} style={{ '--i': i } as CSSProperties} aria-hidden>
                  {ch}
                </span>
              ))}
            </Link>
            <div className={styles.rules} data-bottom aria-hidden />
            <div className={styles.foot}>
              <span className={styles.vol}>{t.vol}</span>
              {isHome ? <h1 className={styles.tagline}>{t.tagline}</h1> : <div className={styles.tagline}>{t.tagline}</div>}
              <span className={styles.footDots} aria-hidden>
                <i style={{ background: 'var(--tan)' }} />
                <i style={{ background: 'var(--maroon)' }} />
                <i style={{ background: 'var(--olive)' }} />
                <i style={{ background: 'var(--orange)' }} />
                <i style={{ background: 'var(--ink)' }} />
              </span>
            </div>
          </div>
        </header>
      )}

      {/* Barra de secciones, fija al hacer scroll */}
      <nav className={styles.bar} data-compact={compact ? '' : undefined}>
        <div className={styles.barInner}>
          <Link href={`/${lang}`} className={styles.miniBrand} data-show={showMiniBrand ? '' : undefined} tabIndex={showMiniBrand ? 0 : -1}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={iconSrc} alt="" width={26} height={26} />
            BASILEIA
          </Link>

          <div className={styles.links}>
            {navItems.map(([key, label]) => (
              <Link key={key} href={`/${lang}/${key}`} className={styles.link} data-active={activeSegment === key ? '' : undefined}>
                {label}
              </Link>
            ))}
          </div>

          <Link
            href={`/${lang}/buscar`}
            aria-label={dict.buscar.navLabel}
            className={styles.search}
            data-active={activeSegment === 'buscar' ? '' : undefined}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </Link>

          <Pressable
            className={styles.burger}
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? dict.topnav.cerrarMenu : dict.topnav.abrirMenu}
            aria-expanded={mobileMenuOpen}
          >
            <span data-open={mobileMenuOpen ? '' : undefined} />
          </Pressable>
        </div>

        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <Link href={`/${lang}/buscar`} onClick={() => setMobileMenuOpen(false)} data-active={activeSegment === 'buscar' ? '' : undefined}>
              {dict.buscar.navLabel}
            </Link>
            {navItems.map(([key, label]) => (
              <Link key={key} href={`/${lang}/${key}`} onClick={() => setMobileMenuOpen(false)} data-active={activeSegment === key ? '' : undefined}>
                {label}
              </Link>
            ))}
            <div className={styles.mobileAccount}>
              {userLabel ? (
                <>
                  <span className={styles.user}>{userLabel}</span>
                  <Pressable onClick={signOut} className="np-chip">
                    {dict.topnav.logout}
                  </Pressable>
                </>
              ) : (
                <>
                  <Pressable
                    className="np-chip"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('login');
                    }}
                  >
                    {dict.topnav.login}
                  </Pressable>
                  <Pressable
                    className="np-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('register');
                    }}
                  >
                    {dict.topnav.register}
                  </Pressable>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
