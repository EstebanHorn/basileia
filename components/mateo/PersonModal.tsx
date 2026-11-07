'use client';

import { useEffect } from 'react';
import styles from './periodico/periodico.module.css';

interface PersonModalProps {
  name: string;
  description: string;
  closeLabel: string;
  onClose: () => void;
}

// Recorte ampliado de un personaje. Lo usan el inicio y /personajes.
export default function PersonModal({ name, description, closeLabel, onClose }: PersonModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal aria-label={name}>
      <div className={styles.overlayCard} onClick={(e) => e.stopPropagation()}>
        <span className={styles.tape} aria-hidden />
        <div className={styles.overlayHead}>
          <span className={styles.portrait} aria-hidden>
            {name.charAt(0)}
          </span>
          <h4>{name}</h4>
        </div>
        <p>{description}</p>
        <button type="button" className={styles.smallBtn} onClick={onClose}>
          {closeLabel} ✕
        </button>
      </div>
    </div>
  );
}
