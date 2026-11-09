"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/app-context";
import { useNotes } from "@/lib/supabase/use-notes";
import { writePersistedState } from "@/lib/persisted-state";
import type { ChapterMeta, Section } from "@/lib/content/editorial";
import type {
  ChapterBlock,
  CitaAT,
  ContextoEntry,
  GlosarioTermino,
  Lugar,
  Paralelo,
  Personaje,
  ReferenciaBiblica,
} from "@/lib/content/types";
import { MAX_CHAPTER } from "@/lib/content/editorial";
import { useProgress } from "@/lib/supabase/use-progress";
import { getNewspaper } from "@/lib/i18n/newspaper";
import { getSiteUrl } from "@/lib/site";
import Pressable from "./Pressable";
import styles from "./capitulo.module.css";

interface CapituloScreenProps {
  currentChapter: number;
  blocks: ChapterBlock[];
  meta?: ChapterMeta;
  reflexion?: string[];
  section?: Section;
  contextos: ContextoEntry[];
  glosarioById: Record<string, GlosarioTermino>;
  personajesById: Record<string, Personaje>;
  lugaresById: Record<string, Lugar>;
  citasAtById: Record<string, CitaAT>;
  paralelosById: Record<string, Paralelo>;
  referenciasById: Record<string, ReferenciaBiblica>;
}

interface Segment {
  plain: boolean;
  text: string;
  term?: GlosarioTermino;
}

export function segmentText(text: string, terms: GlosarioTermino[]): Segment[] {
  const lower = text.toLowerCase();
  const matches = terms
    .filter((t) => t.palabra)
    .map((t) => {
      const idx = lower.indexOf(t.palabra.toLowerCase());
      return idx >= 0
        ? { start: idx, end: idx + t.palabra.length, term: t }
        : null;
    })
    .filter(
      (m): m is { start: number; end: number; term: GlosarioTermino } =>
        m !== null,
    )
    .sort((a, b) => a.start - b.start);

  const filtered: typeof matches = [];
  let lastEnd = 0;
  for (const m of matches) {
    if (m.start >= lastEnd) {
      filtered.push(m);
      lastEnd = m.end;
    }
  }

  const segments: Segment[] = [];
  let pos = 0;
  for (const m of filtered) {
    if (m.start > pos)
      segments.push({ plain: true, text: text.slice(pos, m.start) });
    segments.push({
      plain: false,
      text: text.slice(m.start, m.end),
      term: m.term,
    });
    pos = m.end;
  }
  if (pos < text.length) segments.push({ plain: true, text: text.slice(pos) });
  return segments;
}

export default function CapituloScreen({
  currentChapter,
  blocks,
  meta,
  reflexion,
  section,
  contextos,
  glosarioById,
  personajesById,
  lugaresById,
  citasAtById,
  paralelosById,
  referenciasById,
}: CapituloScreenProps) {
  const { lang, dict, isMobile, openAuthModal } = useApp();
  const np = getNewspaper(lang);
  const {
    notes,
    saveNote,
    locked: notesLocked,
    status: noteStatusByChapter,
    retry: retryNote,
  } = useNotes();
  const noteStatus = noteStatusByChapter[currentChapter] ?? "idle";
  const [soloTexto, setSoloTexto] = useState(false);
  const [openTerm, setOpenTerm] = useState<string | null>(null);
  const [openRef, setOpenRef] = useState<string | null>(null);
  const [openContextId, setOpenContextId] = useState<string | null>(
    contextos[0]?.id ?? null,
  );

  const { readChapters, toggleRead } = useProgress();
  const isRead = !!readChapters[currentChapter];
  const readBarRef = useRef<HTMLDivElement>(null);

  // Barra de progreso de lectura. Se actualiza directo en el DOM para no
  // re-renderizar todo el capítulo en cada scroll.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (readBarRef.current) readBarRef.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function TermSpan({
    id,
    term,
    children,
  }: {
    id: string;
    term: GlosarioTermino;
    children: string;
  }) {
    const open = openTerm === id;
    const popupRef = useRef<HTMLSpanElement>(null);
    const [shiftX, setShiftX] = useState(0);

    useLayoutEffect(() => {
      if (!open) return;
      const el = popupRef.current;
      if (!el) return;
      const margin = 12;
      const recalc = () => {
        el.style.transform = "";
        const rect = el.getBoundingClientRect();
        const overflowRight = rect.right - (window.innerWidth - margin);
        const overflowLeft = margin - rect.left;
        if (overflowRight > 0) setShiftX(-overflowRight);
        else if (overflowLeft > 0) setShiftX(overflowLeft);
        else setShiftX(0);
      };
      recalc();
      window.addEventListener("resize", recalc);
      return () => window.removeEventListener("resize", recalc);
    }, [open]);

    return (
      <span className={styles.termWrap}>
        <span
          role="button"
          tabIndex={0}
          aria-expanded={open}
          className={styles.term}
          data-open={open ? "" : undefined}
          onClick={() => setOpenTerm(open ? null : id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpenTerm(open ? null : id);
            }
            if (e.key === "Escape") setOpenTerm(null);
          }}
          onMouseEnter={() => !isMobile && setOpenTerm(id)}
          onMouseLeave={() =>
            !isMobile && setOpenTerm((cur) => (cur === id ? null : cur))
          }
        >
          {children}
        </span>
        {open && (
          <span
            ref={popupRef}
            className={styles.termPopup}
            style={{ transform: shiftX ? `translateX(${shiftX}px)` : undefined }}
          >
            <span className={styles.termHead}>
              <span className={styles.termGreek}>{term.griego}</span>
              <span className={styles.termTranslit}>{term.transliteracion}</span>
            </span>
            {term.lema !== term.griego && (
              <span className={styles.termMorph}>
                {dict.capitulo.lemaLabel}: {term.lema}
              </span>
            )}
            <span className={styles.termMorph}>{term.morfologia}</span>
            <span className={styles.termMeaning}>{term.significado}</span>
            {term.nota && <span className={styles.termNote}>{term.nota}</span>}
          </span>
        )}
      </span>
    );
  }

  useEffect(() => {
    writePersistedState({ lastChapter: currentChapter });
  }, [currentChapter]);

  // Enlaces compartidos (#v13): el navegador no baja solo porque el contenido monta después de cargar.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!/^v\d+$/.test(id)) return;
    const go = () => document.getElementById(id)?.scrollIntoView({ block: "start" });
    go();
    // Segundo intento cuando las fuentes terminan de cargar y cambia la altura del texto.
    const timer = window.setTimeout(go, 400);
    return () => window.clearTimeout(timer);
  }, [currentChapter]);

  const chExists = blocks.length > 0 || !!meta;
  const showFullChapter = !soloTexto;
  const notesValue = notes[currentChapter] || "";

  const prevN = currentChapter - 1;
  const nextN = currentChapter + 1;

  const renderSegments = (segments: Segment[], keyPrefix: string) =>
    segments.map((seg, si) =>
      seg.term ? (
        <TermSpan key={si} id={`${keyPrefix}-${seg.term.id}`} term={seg.term}>
          {seg.text}
        </TermSpan>
      ) : (
        <span key={si}>{seg.text}</span>
      ),
    );

  return (
    <>
      <div
        className={styles.readBar}
        ref={readBarRef}
        aria-hidden
      />

      <div className={styles.layout} data-solo={soloTexto ? "" : undefined}>
        <div className={styles.main}>
          <div className={styles.topRow}>
            <div className="np-kicker">{section ? section.name : ""}</div>
            <Pressable
              onClick={() => setSoloTexto((v) => !v)}
              aria-pressed={soloTexto}
              className={styles.soloToggle}
            >
              <span className={styles.switch} data-on={soloTexto ? "" : undefined}>
                <span />
              </span>
              {dict.capitulo.soloTexto}
            </Pressable>
          </div>

          <header className={styles.head}>
            <h1 className={styles.bigNumber}>
              <span className="np-halftone">{dict.capitulo.mateoPrefix}</span>{" "}
              <span className="np-halftone">{currentChapter}</span>
            </h1>
            {meta && <h2 className={styles.title}>{meta.title}</h2>}
            {isRead && (
              <div className={styles.headStamp} aria-hidden>
                {np.read}
              </div>
            )}
          </header>

          {chExists && (
            <div>
              {showFullChapter && meta && (
                <p className={styles.intro}>{meta.intro}</p>
              )}

              {blocks.map((block, i) => {
                const firstVerse = /:(\d+)/.exec(block.ref)?.[1];
                const verseHash = firstVerse ? `#v${firstVerse}` : "";
                const shareUrl = `${getSiteUrl()}/${lang}/capitulo/${currentChapter}${verseHash}`;
                const waText = `"${block.text}" - ${dict.capitulo.mateoPrefix} ${block.ref}\n\n${block.commentary.slice(0, 180)}...\n\n${shareUrl}`;
                const waLink =
                  "https://wa.me/?text=" + encodeURIComponent(waText);
                const greekTerms = block.greekIds
                  .map((id) => glosarioById[id])
                  .filter(Boolean);
                const personajes = block.personajeIds
                  .map((id) => personajesById[id])
                  .filter(Boolean);
                const lugares = block.lugarIds
                  .map((id) => lugaresById[id])
                  .filter(Boolean);
                const citas = block.citaAtIds
                  .map((id) => citasAtById[id])
                  .filter(Boolean);
                const paralelos = block.paraleloIds
                  .map((id) => paralelosById[id])
                  .filter(Boolean);
                const referencias = block.referenciaIds
                  .map((id) => referenciasById[id])
                  .filter(Boolean);
                const textSegments = segmentText(block.text, greekTerms);
                const commentaryParagraphs = block.commentary
                  .split("\n\n")
                  .map((p) => p.trim())
                  .filter(Boolean)
                  .map((p) => segmentText(p, greekTerms));
                const openNote =
                  citas.find((c) => c.id === openRef)?.nota ??
                  paralelos.find((p) => p.id === openRef)?.nota ??
                  referencias.find((r) => r.id === openRef)?.nota;

                return (
                  <section key={i} id={firstVerse ? `v${firstVerse}` : undefined} className={styles.block}>
                    <div className={styles.verseRef}>
                      <span className={styles.verseBadge}>{block.ref.split(":")[1] ?? block.ref}</span>
                      {dict.capitulo.mateoPrefix} {block.ref}
                    </div>
                    <blockquote className={styles.verse}>
                      {renderSegments(textSegments, `${i}-text`)}
                    </blockquote>

                    {showFullChapter && (
                      <div className={styles.commentary}>
                        {commentaryParagraphs.map((segments, pi) => (
                          <p key={pi}>
                            {renderSegments(segments, `${i}-commentary-${pi}`)}
                          </p>
                        ))}

                        {(personajes.length > 0 || lugares.length > 0) && (
                          <div className={styles.tags}>
                            {personajes.map((p) => (
                              <Link key={p.id} href={`/${lang}/personajes`} className={styles.tag}>
                                <span aria-hidden>☺</span> {p.nombre}
                              </Link>
                            ))}
                            {lugares.map((l) => (
                              <Link key={l.id} href={`/${lang}/mapa`} className={styles.tag}>
                                <span aria-hidden>⌖</span> {l.nombre}
                              </Link>
                            ))}
                          </div>
                        )}

                        {(citas.length > 0 ||
                          paralelos.length > 0 ||
                          referencias.length > 0) && (
                          <div className={styles.refsBox}>
                            <div className={styles.tags}>
                              {citas.map((c) => {
                                const open = openRef === c.id;
                                return (
                                  <Pressable
                                    key={c.id}
                                    onClick={() => setOpenRef(open ? null : c.id)}
                                    aria-expanded={open}
                                    className={styles.refChip}
                                    data-kind="cita"
                                    data-open={open ? "" : undefined}
                                  >
                                    {dict.capitulo.citaAtChip(c.referencia)}
                                  </Pressable>
                                );
                              })}
                              {paralelos.map((p) => {
                                const open = openRef === p.id;
                                return (
                                  <Pressable
                                    key={p.id}
                                    onClick={() => setOpenRef(open ? null : p.id)}
                                    aria-expanded={open}
                                    className={styles.refChip}
                                    data-kind="paralelo"
                                    data-open={open ? "" : undefined}
                                  >
                                    {dict.capitulo.paraleloChip(p.referencia)}
                                  </Pressable>
                                );
                              })}
                              {referencias.map((r) => {
                                const open = openRef === r.id;
                                return (
                                  <Pressable
                                    key={r.id}
                                    onClick={() => setOpenRef(open ? null : r.id)}
                                    aria-expanded={open}
                                    className={styles.refChip}
                                    data-kind="ref"
                                    data-open={open ? "" : undefined}
                                  >
                                    {dict.capitulo.referenciaChip(r.referencia)}
                                  </Pressable>
                                );
                              })}
                            </div>
                            {openNote && <p className={styles.refNote}>{openNote}</p>}
                          </div>
                        )}

                        <a href={waLink} target="_blank" rel="noreferrer" className={styles.share}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3C4 14.9 3.8 13.5 3.8 12 3.8 7.5 7.5 3.8 12 3.8S20.2 7.5 20.2 12 16.5 20.2 12 20.2z"></path>
                          </svg>
                          {dict.capitulo.compartirWhatsapp}
                        </a>
                      </div>
                    )}
                  </section>
                );
              })}

              {showFullChapter && reflexion && reflexion.length > 0 && (
                <div>
                  <div className={styles.reflexion}>
                    <div className={styles.reflexionLabel}>
                      {dict.capitulo.paraReflexionar}
                    </div>
                    <ol>
                      {reflexion.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ol>
                  </div>

                  <div className={styles.notes}>
                    <div className={styles.notesLabel}>{dict.capitulo.misNotas}</div>
                    {notesLocked ? (
                      <div className={styles.notesLocked}>
                        <p>{dict.capitulo.loginPrompt}</p>
                        <div className={styles.notesActions}>
                          <Pressable onClick={() => openAuthModal("login")} className="np-chip">
                            {dict.capitulo.iniciarSesion}
                          </Pressable>
                          <Pressable onClick={() => openAuthModal("register")} className="np-btn">
                            {dict.capitulo.crearCuenta}
                          </Pressable>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <textarea
                          value={notesValue}
                          onChange={(e) => saveNote(currentChapter, e.target.value)}
                          placeholder={dict.capitulo.notaPlaceholder}
                          className={styles.notepad}
                        />
                        <div className={styles.noteStatus}>
                          {noteStatus === "saving" && dict.capitulo.guardando}
                          {noteStatus === "saved" && dict.capitulo.guardado}
                          {noteStatus === "error" && (
                            <>
                              <span style={{ color: "var(--accent)" }}>
                                {dict.capitulo.errorGuardado}
                              </span>
                              <Pressable
                                onClick={() => retryNote(currentChapter)}
                                style={{ color: "var(--accent)", textDecoration: "underline" }}
                              >
                                {dict.capitulo.reintentarGuardado}
                              </Pressable>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Sello de "Leído" al terminar el capítulo */}
              <div className={styles.finish}>
                <Pressable
                  onClick={() => toggleRead(currentChapter)}
                  aria-pressed={isRead}
                  className={styles.finishStamp}
                  data-read={isRead ? "" : undefined}
                >
                  {isRead ? `✓ ${np.read}` : dict.indice.markRead}
                </Pressable>
              </div>
            </div>
          )}

          {!chExists && (
            <div className={styles.pending}>
              <div className={styles.pendingStamp}>{np.printing}</div>
              <div className={styles.pendingTitle}>{dict.capitulo.pendingTitle}</div>
              <div>{dict.capitulo.pendingBody}</div>
            </div>
          )}

          <nav className={styles.pager}>
            <Link
              href={`/${lang}/capitulo/${prevN}`}
              className={styles.pagerLink}
              style={{ visibility: prevN >= 1 ? "visible" : "hidden" }}
            >
              <span className="np-kicker">←</span>
              <b>
                {dict.capitulo.mateoPrefix} {prevN}
              </b>
            </Link>
            <Link
              href={`/${lang}/capitulo/${nextN}`}
              className={styles.pagerLink}
              data-next=""
              style={{ visibility: nextN <= MAX_CHAPTER ? "visible" : "hidden" }}
            >
              <span className="np-kicker">→</span>
              <b>
                {dict.capitulo.mateoPrefix} {nextN}
              </b>
            </Link>
          </nav>
        </div>

        {showFullChapter && (
          <aside className={styles.side}>
            <div className={styles.sideLabel}>{dict.capitulo.contexto}</div>
            {contextos.length > 0 ? (
              contextos.map((ctx) => {
                const open = openContextId === ctx.id;
                return (
                  <div key={ctx.id} className={styles.ctxCard} data-open={open ? "" : undefined}>
                    <Pressable
                      onClick={() => setOpenContextId(open ? null : ctx.id)}
                      aria-expanded={open}
                      className={styles.ctxHead}
                    >
                      <span>{ctx.titulo}</span>
                      <span className={styles.ctxIcon} aria-hidden>
                        +
                      </span>
                    </Pressable>
                    {open && <div className={styles.ctxBody}>{ctx.texto}</div>}
                  </div>
                );
              })
            ) : (
              <div className={styles.ctxEmpty}>{dict.capitulo.sinContexto}</div>
            )}
          </aside>
        )}
      </div>
    </>
  );
}
