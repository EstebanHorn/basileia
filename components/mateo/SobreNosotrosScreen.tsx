'use client';

import { useApp } from '@/lib/app-context';
import { getNewspaper } from '@/lib/i18n/newspaper';
import PageHead from './PageHead';
import styles from './screens.module.css';

export default function SobreNosotrosScreen() {
  const { lang, dict } = useApp();
  const np = getNewspaper(lang);
  const sections = dict.nosotros.sections;

  return (
    <div className={`${styles.page} ${styles.narrow}`}>
      <PageHead kicker={np.kicker.nosotros} title={dict.nosotros.title} />

      <p className={`np-card ${styles.editorial}`}>{dict.nosotros.intro}</p>

      <div className={styles.prose}>
        {sections.slice(0, 2).map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        ))}

        <section>
          <h2>{sections[2].title}</h2>
          <p>{sections[2].paragraphs[0]}</p>
          <div className={styles.featurePanel}>
            <ol className={styles.featureList}>
              {dict.nosotros.features.map((f) => (
                <li key={f.title}>
                  <div>
                    <b>{f.title}</b>
                    <span>{f.desc}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section>
          <h2>{sections[3].title}</h2>
          {sections[3].paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      </div>
    </div>
  );
}
