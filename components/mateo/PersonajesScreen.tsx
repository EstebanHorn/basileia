'use client';

import { useState, type CSSProperties } from 'react';
import { useApp } from '@/lib/app-context';
import { categoriaLabel, categoriaOrder } from '@/lib/content/editorial';
import { getNewspaper } from '@/lib/i18n/newspaper';
import type { Personaje } from '@/lib/content/types';
import Pressable from './Pressable';
import PageHead from './PageHead';
import PersonModal from './PersonModal';
import styles from './screens.module.css';

interface PersonajesScreenProps {
  personajes: Personaje[];
}

const TILTS = [-2.4, 1.8, -1.2, 2.6, -1.8, 1.2, -2.8, 2.2];

export default function PersonajesScreen({ personajes }: PersonajesScreenProps) {
  const { lang, dict } = useApp();
  const np = getNewspaper(lang);
  const [filter, setFilter] = useState('todos');
  const [openCharacter, setOpenCharacter] = useState<Personaje | null>(null);

  const categories = categoriaOrder().filter((c) => personajes.some((p) => p.categoria === c));
  const characters = personajes.filter((p) => filter === 'todos' || p.categoria === filter);

  return (
    <div className={styles.page}>
      <PageHead kicker={np.kicker.personajes} title={dict.personajes.title} />

      <div className={styles.chips}>
        {[{ id: 'todos', name: dict.personajes.categoriaTodos }, ...categories.map((c) => ({ id: c, name: categoriaLabel(lang, c) }))].map(
          ({ id, name }) => (
            <Pressable key={id} onClick={() => setFilter(id)} aria-pressed={filter === id} className="np-chip">
              {name}
            </Pressable>
          )
        )}
      </div>

      <div className={`${styles.clipGrid} np-stagger`} key={filter}>
        {characters.map((ch, i) => (
          <button
            key={ch.id}
            type="button"
            className={`np-clip ${styles.person}`}
            style={{ '--tilt': `${TILTS[i % TILTS.length]}deg` } as CSSProperties}
            onClick={() => setOpenCharacter(ch)}
          >
            <span className={styles.portrait} aria-hidden>
              {ch.nombre.charAt(0)}
            </span>
            <span className={styles.personName}>{ch.nombre}</span>
            <span className="np-kicker">{categoriaLabel(lang, ch.categoria)}</span>
            <span className={styles.personDesc}>{ch.descripcion}</span>
          </button>
        ))}
      </div>
      {openCharacter && (
        <PersonModal
          name={openCharacter.nombre}
          description={openCharacter.descripcion}
          closeLabel={dict.ui.cerrar}
          onClose={() => setOpenCharacter(null)}
        />
      )}
    </div>
  );
}
