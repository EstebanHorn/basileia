'use client';

import { useApp } from '@/lib/app-context';
import { getNewspaper } from '@/lib/i18n/newspaper';
import PageHead from './PageHead';
import styles from './screens.module.css';

export default function PrivacidadScreen() {
  const { lang, dict } = useApp();
  const np = getNewspaper(lang);

  return (
    <div className={`${styles.page} ${styles.narrow}`}>
      <PageHead kicker={np.kicker.privacidad} title={dict.privacidad.title} />
      <p className={styles.updated}>{dict.privacidad.updated}</p>

      <div className={`${styles.prose} ${styles.legal}`}>
        {dict.privacidad.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
