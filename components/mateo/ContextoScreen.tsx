'use client';

import { useApp } from '@/lib/app-context';
import { temaLabel } from '@/lib/content/editorial';
import { getNewspaper } from '@/lib/i18n/newspaper';
import type { ContextoEntry } from '@/lib/content/types';
import PageHead from './PageHead';
import styles from './screens.module.css';

interface ContextoScreenProps {
  contexto: ContextoEntry[];
}

export default function ContextoScreen({ contexto }: ContextoScreenProps) {
  const { lang, dict } = useApp();
  const np = getNewspaper(lang);
  const themes = [...new Set(contexto.map((t) => t.tema))];
  const groups = themes.map((tema) => ({ tema, topics: contexto.filter((t) => t.tema === tema) }));

  return (
    <div className={styles.page}>
      <PageHead kicker={np.kicker.contexto} title={dict.contexto.title} />

      {/* Índice de secciones: salta a cada tema */}
      <nav className={`${styles.chips} ${styles.themeNav}`}>
        {groups.map((grp) => (
          <a key={grp.tema} href={`#tema-${grp.tema}`} className="np-chip">
            {temaLabel(lang, grp.tema)}
          </a>
        ))}
      </nav>

      {groups.map((grp) => (
        <section key={grp.tema} id={`tema-${grp.tema}`} className={styles.themeBlock}>
          <h2 className={styles.sectionTitle}>
            {temaLabel(lang, grp.tema)} <small>{grp.topics.length}</small>
          </h2>
          <div className={`${styles.articles} np-stagger`}>
            {grp.topics.map((t) => (
              <article key={t.id} className={styles.article}>
                <h3>{t.titulo}</h3>
                <p>{t.texto}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
