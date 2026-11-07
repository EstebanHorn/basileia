'use client';

import Link from 'next/link';
import { useApp } from '@/lib/app-context';
import { getNewspaper } from '@/lib/i18n/newspaper';
import styles from './screens.module.css';

const STAMP = { es: 'Extraviada', pt: 'Extraviada' };

export default function NotFoundScreen() {
  const { lang, dict } = useApp();
  const np = getNewspaper(lang);

  return (
    <div className={styles.lost}>
      <div className={styles.lostInner}>
        <div className="np-kicker">{np.kicker.notFound}</div>
        <div className={`${styles.lostNum} np-halftone`} aria-hidden>
          404
        </div>
        <div className={styles.lostStamp} aria-hidden>
          {STAMP[lang]}
        </div>
        <h1>{dict.errores.notFoundTitle}</h1>
        <p>{dict.errores.notFoundBody}</p>
        <Link href={`/${lang}`} className="np-btn">
          {dict.errores.volverInicio} →
        </Link>
      </div>
    </div>
  );
}
