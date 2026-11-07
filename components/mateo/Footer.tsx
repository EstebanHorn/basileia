'use client';

import Link from 'next/link';
import { useApp } from '@/lib/app-context';
import { usePersistedState } from '@/lib/persisted-state';
import styles from './Footer.module.css';

const NOTE = {
  es: (n: number) => `Seguí donde lo dejaste — Mateo ${n} ♡`,
  pt: (n: number) => `Continue de onde parou — Mateus ${n} ♡`,
};

const PRINTED = { es: 'Impreso con tinta y gracia', pt: 'Impresso com tinta e graça' };

export default function Footer() {
  const { lang, dict, theme } = useApp();
  const iconSrc = `/brand/icono-chico-${theme === 'dark' ? 'dark' : 'light'}.svg`;
  const { lastChapter } = usePersistedState();
  const year = new Date().getFullYear();

  const EXPLORAR: [string, string][] = [
    ['indice', dict.nav.indice],
    ['mapa', dict.nav.mapa],
    ['personajes', dict.nav.personajes],
    ['glosario', dict.nav.glosario],
    ['contexto', dict.nav.contexto],
    ['paralelos', dict.nav.paralelos],
  ];

  const PROYECTO: [string, string][] = [
    ['nosotros', dict.nav.nosotros],
    ['privacidad', dict.nav.privacidad],
    ['terminos', dict.nav.terminos],
  ];

  return (
    <footer className={styles.footer}>
      <div className="np-rule-double" />
      <div className={styles.grid}>
        <div className={styles.brandCol}>
          <Link href={`/${lang}`} className={styles.brand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={iconSrc} alt="" width={44} height={44} />
            BASILEIA
          </Link>
          <p className={styles.tagline}>{dict.footer.tagline}</p>
          <Link href={`/${lang}/capitulo/${lastChapter}`} className={styles.note}>
            {NOTE[lang](lastChapter)}
          </Link>
        </div>

        <div className={styles.col}>
          <div className="np-kicker">{dict.footer.explorar}</div>
          {EXPLORAR.map(([key, label]) => (
            <Link key={key} href={`/${lang}/${key}`} className={styles.link}>
              {label}
            </Link>
          ))}
        </div>

        <div className={styles.col}>
          <div className="np-kicker">{dict.footer.proyecto}</div>
          {PROYECTO.map(([key, label]) => (
            <Link key={key} href={`/${lang}/${key}`} className={styles.link}>
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <span>
          © {year} Basileia. {dict.footer.rights}
        </span>
        <span className={styles.printed}>✦ {PRINTED[lang]} ✦</span>
      </div>
    </footer>
  );
}
