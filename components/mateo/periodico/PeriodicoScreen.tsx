'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { useApp } from '@/lib/app-context';
import { usePersistedState } from '@/lib/persisted-state';
import type { Edition } from '@/lib/content/editions';
import PersonModal from '../PersonModal';
import styles from './periodico.module.css';

interface PeriodicoScreenProps {
  editions: Edition[];
  totalChapters: number;
  discourses: { name: string; summary: string; chapters: number[] }[];
}

const STRINGS = {
  es: {
    kicker: 'El Evangelio según Mateo · Edición de estudio',
    tagline: 'Noticias de un Reino que no es de este mundo',
    dateline: 'Galilea, año 30 d.C.',
    vol: 'Vol. I',
    price: 'Gratis, por gracia',
    choose: 'Elegí la edición',
    hint: 'Usá ← → para pasar de página',
    printing: 'En imprenta',
    section: 'Sección',
    discourse: 'Discurso',
    inThis: 'En esta edición',
    verses: 'versículos',
    people: 'personajes',
    words: 'palabras griegas',
    readFull: 'Leer el capítulo',
    featured: 'Versículo destacado',
    another: 'Otro versículo',
    greek: 'Del griego',
    flip: 'Tocá la tarjeta para darla vuelta',
    anotherWord: 'Otra palabra',
    noWords: 'Sin palabras griegas en esta edición.',
    clippings: 'Recortes',
    clippingsSub: 'Quiénes aparecen en esta edición',
    discoursesTitle: 'Los cinco grandes discursos',
    discoursesSub: 'Mateo ordena la enseñanza de Jesús en cinco bloques. Tocá uno para abrir su edición.',
    read: 'Leído',
    progress: 'Tu tirada',
    of: 'de',
    back: '← Volver al diseño actual',
    note: 'Seguí donde lo dejaste',
    close: 'Cerrar',
    printed: 'Impreso con tinta y gracia',
    extra: 'Extra',
  },
  pt: {
    kicker: 'O Evangelho segundo Mateus · Edição de estudo',
    tagline: 'Notícias de um Reino que não é deste mundo',
    dateline: 'Galileia, ano 30 d.C.',
    vol: 'Vol. I',
    price: 'Grátis, pela graça',
    choose: 'Escolha a edição',
    hint: 'Use ← → para virar a página',
    printing: 'Na gráfica',
    section: 'Seção',
    discourse: 'Discurso',
    inThis: 'Nesta edição',
    verses: 'versículos',
    people: 'personagens',
    words: 'palavras gregas',
    readFull: 'Ler o capítulo',
    featured: 'Versículo em destaque',
    another: 'Outro versículo',
    greek: 'Do grego',
    flip: 'Toque no cartão para virá-lo',
    anotherWord: 'Outra palavra',
    noWords: 'Sem palavras gregas nesta edição.',
    clippings: 'Recortes',
    clippingsSub: 'Quem aparece nesta edição',
    discoursesTitle: 'Os cinco grandes discursos',
    discoursesSub: 'Mateus organiza o ensino de Jesus em cinco blocos. Toque em um para abrir sua edição.',
    read: 'Lido',
    progress: 'Sua tiragem',
    of: 'de',
    back: '← Voltar ao design atual',
    note: 'Continue de onde parou',
    close: 'Fechar',
    printed: 'Impresso com tinta e graça',
    extra: 'Extra',
  },
};

const TILTS = [-3, 2.2, -1.4, 3, -2.2, 1.6];

export default function PeriodicoScreen({ editions, totalChapters, discourses }: PeriodicoScreenProps) {
  const { lang } = useApp();
  const t = STRINGS[lang];
  const { lastChapter, readChapters } = usePersistedState();
  const rootRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);

  const published = new Set(editions.map((e) => e.n));
  const [picked, setPicked] = useState<number | null>(null);
  const current = picked ?? (published.has(lastChapter) ? lastChapter : editions[0]?.n ?? 1);
  const edition = editions.find((e) => e.n === current) ?? editions[0];

  const [verseIdx, setVerseIdx] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [openPerson, setOpenPerson] = useState<Edition['people'][number] | null>(null);

  const goTo = useCallback((n: number) => {
    setPicked(n);
    setVerseIdx(0);
    setWordIdx(0);
    setFlipped(false);
  }, []);

  // Flechas del teclado para pasar de edición.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openPerson) {
        if (e.key === 'Escape') setOpenPerson(null);
        return;
      }
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;
      const ns = editions.map((ed) => ed.n);
      const i = ns.indexOf(current);
      if (e.key === 'ArrowRight' && i < ns.length - 1) goTo(ns[i + 1]);
      if (e.key === 'ArrowLeft' && i > 0) goTo(ns[i - 1]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, editions, goTo, openPerson]);

  // Aparición de secciones al hacer scroll.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-shown', '');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  if (!edition) return null;

  const readCount = Object.values(readChapters).filter(Boolean).length;
  const verse = edition.verses.length ? edition.verses[verseIdx % edition.verses.length] : null;
  const word = edition.words.length ? edition.words[wordIdx % edition.words.length] : null;
  const isRead = Boolean(readChapters[edition.n]);

  const openDiscourse = (chapters: number[]) => {
    const first = chapters.find((c) => published.has(c));
    if (!first) return;
    goTo(first);
    leadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={rootRef} className={styles.root}>
      {/* Teletipo */}
      <div className={styles.ticker} aria-hidden>
        <div className={styles.tickerTrack}>
          {[0, 1].map((copy) => (
            <div key={copy} className={styles.tickerGroup}>
              {editions.map((e) => (
                <button key={`${copy}-${e.n}`} type="button" tabIndex={-1} onClick={() => goTo(e.n)}>
                  <b>
                    {t.extra} · Mt {e.n}
                  </b>
                  {e.title}
                  <i>✦</i>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Selector de edición */}
      <nav className={styles.editions} aria-label={t.choose}>
        <div className={styles.editionsHead}>
          <span className={styles.label}>{t.choose}</span>
          <span className={styles.hint}>{t.hint}</span>
          <span className={styles.progress}>
            {t.progress}: <b>{readCount}</b> {t.of} {totalChapters}
            <span className={styles.progressBar}>
              <span style={{ width: `${(readCount / totalChapters) * 100}%` }} />
            </span>
          </span>
        </div>
        <div className={styles.editionGrid}>
          {Array.from({ length: totalChapters }, (_, i) => i + 1).map((n) => {
            const available = published.has(n);
            return (
              <button
                key={n}
                type="button"
                disabled={!available}
                title={available ? editions.find((e) => e.n === n)?.title : t.printing}
                className={styles.editionBtn}
                data-active={n === current ? '' : undefined}
                data-read={readChapters[n] ? '' : undefined}
                onClick={() => goTo(n)}
              >
                {n}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Portada */}
      <section ref={leadRef} className={styles.lead}>
        <aside className={styles.leftCol} key={`l-${edition.n}`}>
          <div className={styles.press}>
            <div className={styles.label}>{t.section}</div>
            <div className={styles.sectionName}>{edition.section}</div>
            {edition.discourse && (
              <div className={styles.discourseTag}>
                <span>{t.discourse}</span>
                {edition.discourse}
              </div>
            )}
            <div className={styles.rule} />
            <div className={styles.label}>{t.inThis}</div>
            <ul className={styles.stats}>
              <li>
                <b>{edition.verseCount}</b> {t.verses}
              </li>
              <li>
                <b>{edition.people.length}</b> {t.people}
              </li>
              <li>
                <b>{edition.wordCount}</b> {t.words}
              </li>
            </ul>
          </div>
        </aside>

        <article className={styles.centerCol} key={`c-${edition.n}`}>
          <div className={styles.bigNumber} aria-hidden>
            <span className={styles.halftone}>MATEO</span>
            <span className={styles.halftone}>{edition.n}</span>
          </div>
          <h2 className={styles.headline}>{edition.title}</h2>
          {isRead && (
            <div className={styles.stamp} aria-label={t.read}>
              {t.read}
            </div>
          )}
          <p className={styles.intro}>
            <span className={styles.dropCap} aria-hidden>
              {edition.intro.charAt(0)}
            </span>
            <span className="sr-only">{edition.intro.charAt(0)}</span>
            {edition.intro.slice(1)}
          </p>
          <Link href={`/${lang}/capitulo/${edition.n}`} className={styles.cta}>
            {t.readFull} <span aria-hidden>→</span>
          </Link>
        </article>

        <aside className={styles.rightCol} key={`r-${edition.n}`}>
          <div className={styles.press}>
            {verse && (
              <div className={styles.verseBox}>
                <div className={styles.label}>{t.featured}</div>
                <Typewriter key={`${edition.n}-${verse.n}`} text={verse.text} />
                <div className={styles.verseRef}>
                  Mateo {edition.n}:{verse.n}
                </div>
                {edition.verses.length > 1 && (
                  <button type="button" className={styles.smallBtn} onClick={() => setVerseIdx((i) => i + 1)}>
                    {t.another} ↻
                  </button>
                )}
              </div>
            )}

            <div className={styles.label} style={{ marginTop: 22 }}>
              {t.greek}
            </div>
            {word ? (
              <>
                <button
                  type="button"
                  className={styles.flipCard}
                  data-flipped={flipped ? '' : undefined}
                  onClick={() => setFlipped((f) => !f)}
                  aria-label={t.flip}
                >
                  <span className={styles.flipInner}>
                    <span className={styles.flipFront}>
                      <span className={styles.greekWord}>{word.greek}</span>
                      <span className={styles.translit}>{word.translit}</span>
                      <span className={styles.flipHint}>{t.flip}</span>
                    </span>
                    <span className={styles.flipBack}>
                      <span className={styles.backWord}>«{word.word}»</span>
                      <span className={styles.backMeaning}>{word.meaning}</span>
                    </span>
                  </span>
                </button>
                {edition.words.length > 1 && (
                  <button
                    type="button"
                    className={styles.smallBtn}
                    onClick={() => {
                      setFlipped(false);
                      setWordIdx((i) => i + 1);
                    }}
                  >
                    {t.anotherWord} ↻
                  </button>
                )}
              </>
            ) : (
              <p className={styles.muted}>{t.noWords}</p>
            )}
          </div>
        </aside>
      </section>

      {/* Recortes de personajes */}
      {edition.people.length > 0 && (
        <section className={styles.clippings} data-reveal>
          <div className={styles.sectionHead}>
            <h3>{t.clippings}</h3>
            <span>{t.clippingsSub}</span>
          </div>
          <div className={styles.clipGrid} key={`p-${edition.n}`}>
            {edition.people.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={styles.clip}
                style={{ '--tilt': `${TILTS[i % TILTS.length]}deg`, '--d': `${i * 70}ms` } as CSSProperties}
                onClick={() => setOpenPerson(p)}
              >
                <span className={styles.tape} aria-hidden />
                <span className={styles.portrait} aria-hidden>
                  {p.name.charAt(0)}
                </span>
                <span className={styles.clipName}>{p.name}</span>
                <span className={styles.clipDesc}>{p.description}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Discursos */}
      <section className={styles.discourses} data-reveal>
        <div className={styles.discoursesInner}>
          <div>
            <h3 className={styles.discoursesTitle}>{t.discoursesTitle}</h3>
            <p className={styles.discoursesSub}>{t.discoursesSub}</p>
          </div>
          <ol className={styles.discourseList}>
            {discourses.map((d, i) => {
              const available = d.chapters.some((c) => published.has(c));
              const range =
                d.chapters.length > 1 ? `${d.chapters[0]}–${d.chapters[d.chapters.length - 1]}` : `${d.chapters[0]}`;
              return (
                <li key={d.name}>
                  <button type="button" disabled={!available} onClick={() => openDiscourse(d.chapters)}>
                    <span className={styles.discNum}>{i + 1}</span>
                    <span>
                      <span className={styles.discName}>
                        {d.name} <em>Mt {range}</em>
                      </span>
                      <span className={styles.discSummary}>{available ? d.summary : t.printing}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Recorte ampliado */}
      {openPerson && (
        <PersonModal
          name={openPerson.name}
          description={openPerson.description}
          closeLabel={t.close}
          onClose={() => setOpenPerson(null)}
        />
      )}
    </div>
  );
}

function Typewriter({ text }: { text: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Con movimiento reducido se escribe todo de una vez.
    const step = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? text.length : 1;
    let i = 0;
    const id = window.setInterval(() => {
      i += step;
      setCount(i);
      if (i >= text.length) window.clearInterval(id);
    }, 28);
    return () => window.clearInterval(id);
  }, [text]);

  return (
    <p className={styles.typewriter}>
      <span className={styles.typeGhost} aria-hidden>
        “{text}”
      </span>
      <span className={styles.typeLive}>
        “{text.slice(0, count)}
        {count >= text.length ? '”' : <span className={styles.caret} />}
      </span>
    </p>
  );
}
