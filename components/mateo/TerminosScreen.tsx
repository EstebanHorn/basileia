'use client';

import { useApp } from '@/lib/app-context';
import { getNewspaper } from '@/lib/i18n/newspaper';
import PageHead from './PageHead';
import styles from './screens.module.css';

export default function TerminosScreen() {
  const { lang, dict } = useApp();
  const np = getNewspaper(lang);

  return (
    <div className={`${styles.page} ${styles.narrow}`}>
      <PageHead kicker={np.kicker.terminos} title={dict.terminos.title} />
      <p className={styles.updated}>{dict.terminos.updated}</p>

      <div className={`${styles.prose} ${styles.legal}`}>
        {dict.terminos.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
