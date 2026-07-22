'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/app-context';
import { useNotes } from '@/lib/supabase/use-notes';
import { writePersistedState } from '@/lib/persisted-state';
import type { ChapterMeta, Section } from '@/lib/content/editorial';
import type { ChapterBlock, ContextoEntry, GlosarioTermino, Lugar, Personaje } from '@/lib/content/types';
import { MAX_CHAPTER } from '@/lib/content/editorial';

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
}: CapituloScreenProps) {
  const { colors, lang, dict, isMobile, openAuthModal } = useApp();
  const { notes, saveNote, locked: notesLocked } = useNotes();
  const [soloTexto, setSoloTexto] = useState(false);
  const [openTerm, setOpenTerm] = useState<string | null>(null);
  const [openContextId, setOpenContextId] = useState<string | null>(contextos[0]?.id ?? null);

  useEffect(() => {
    writePersistedState({ lastChapter: currentChapter });
  }, [currentChapter]);

  const chExists = blocks.length > 0 || !!meta;
  const showFullChapter = !soloTexto;
  const notesValue = notes[currentChapter] || '';

  const prevN = currentChapter - 1;
  const nextN = currentChapter + 1;

  const capGridColumns = isMobile ? '1fr' : 'minmax(0,1fr) 300px';
  const capMainOrder = isMobile ? 2 : 1;
  const capCtxOrder = isMobile ? 1 : 2;
  const capCtxPosition: 'static' | 'sticky' = isMobile ? 'static' : 'sticky';
  const capCtxTop = isMobile ? 'auto' : '88px';

  return (
    <div
      style={{
        maxWidth: 1080,
        margin: '0 auto',
        padding: '32px 24px 90px',
        display: 'grid',
        gridTemplateColumns: capGridColumns,
        gap: 32,
        alignItems: 'start',
      }}
    >
      <div style={{ order: capMainOrder, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12.5, color: colors.muted, textTransform: 'uppercase', letterSpacing: '.05em' }}>
            {section ? section.name : ''}
          </div>
          <div onClick={() => setSoloTexto((v) => !v)} style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', fontSize: 13, color: colors.muted }}>
            <div style={{ width: 32, height: 18, borderRadius: 10, background: soloTexto ? colors.accent : colors.border, position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  top: 2,
                  left: soloTexto ? 16 : 2,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: '#fff',
                  transition: 'left .15s',
                }}
              />
            </div>
            {dict.capitulo.soloTexto}
          </div>
        </div>

        <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 36, fontWeight: 600, margin: '0 0 4px' }}>
          {dict.capitulo.mateoPrefix} {currentChapter}
        </h1>
        <h2 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 19, fontWeight: 500, color: colors.accent, margin: '0 0 22px' }}>
          {meta ? meta.title : ''}
        </h2>

        {chExists && (
          <div>
            {showFullChapter && meta && (
              <p style={{ fontSize: 15.5, lineHeight: 1.7, color: colors.muted, margin: '0 0 32px', paddingBottom: 24, borderBottom: `1px solid ${colors.border}` }}>
                {meta.intro}
              </p>
            )}

            {blocks.map((block, i) => {
              const waText = `"${block.text}" — ${dict.capitulo.mateoPrefix} ${block.ref}\n\n${block.commentary.slice(0, 180)}...`;
              const waLink = 'https://wa.me/?text=' + encodeURIComponent(waText);
              const greekTerms = block.greekIds.map((id) => glosarioById[id]).filter(Boolean);
              const personajes = block.personajeIds.map((id) => personajesById[id]).filter(Boolean);
              const lugares = block.lugarIds.map((id) => lugaresById[id]).filter(Boolean);

              return (
                <div key={i} style={{ marginBottom: 34 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: colors.accent, letterSpacing: '.04em', marginBottom: 6 }}>
                    {dict.capitulo.mateoPrefix.toUpperCase()} {block.ref}
                  </div>
                  <blockquote
                    style={{
                      margin: '0 0 14px',
                      paddingLeft: 16,
                      borderLeft: `3px solid ${colors.accent}`,
                      fontFamily: 'var(--font-lora), serif',
                      fontStyle: 'italic',
                      fontSize: 19,
                      lineHeight: 1.6,
                    }}
                  >
                    {block.text}
                  </blockquote>

                  {showFullChapter && (
                    <div>
                      <p style={{ fontSize: 16, lineHeight: 1.7, margin: '0 0 14px' }}>{block.commentary}</p>

                      {(greekTerms.length > 0 || personajes.length > 0 || lugares.length > 0) && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                          {greekTerms.map((term) => {
                            const chipId = `${i}-griego-${term.id}`;
                            const open = openTerm === chipId;
                            return (
                              <div key={chipId} style={{ position: 'relative' }}>
                                <span
                                  onClick={() => setOpenTerm(open ? null : chipId)}
                                  style={{
                                    display: 'inline-block',
                                    fontSize: 12.5,
                                    fontWeight: 600,
                                    padding: '5px 10px',
                                    borderRadius: 14,
                                    background: colors.subtle,
                                    color: colors.accent,
                                    cursor: 'pointer',
                                  }}
                                >
                                  {term.griego} · {term.transliteracion}
                                </span>
                                {open && (
                                  <div
                                    style={{
                                      position: 'absolute',
                                      top: '100%',
                                      left: 0,
                                      zIndex: 10,
                                      marginTop: 6,
                                      padding: '12px 14px',
                                      background: colors.panel,
                                      border: `1px solid ${colors.border}`,
                                      borderRadius: 8,
                                      fontSize: 14,
                                      lineHeight: 1.5,
                                      width: 260,
                                      boxShadow: '0 8px 24px rgba(0,0,0,.15)',
                                    }}
                                  >
                                    <div style={{ marginBottom: 6 }}>
                                      <span style={{ fontFamily: 'var(--font-lora), serif', fontSize: 17, marginRight: 8 }}>{term.griego}</span>
                                      <span style={{ fontWeight: 700 }}>{term.transliteracion}</span> — {term.significado}
                                    </div>
                                    <div style={{ color: colors.muted, fontSize: 13 }}>{term.nota}</div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                          {personajes.map((p) => (
                            <Link
                              key={p.id}
                              href={`/${lang}/personajes`}
                              style={{
                                fontSize: 12.5,
                                fontWeight: 600,
                                padding: '5px 10px',
                                borderRadius: 14,
                                background: colors.subtle,
                                color: colors.text,
                              }}
                            >
                              {p.nombre}
                            </Link>
                          ))}
                          {lugares.map((l) => (
                            <Link
                              key={l.id}
                              href={`/${lang}/mapa`}
                              style={{
                                fontSize: 12.5,
                                fontWeight: 600,
                                padding: '5px 10px',
                                borderRadius: 14,
                                background: colors.subtle,
                                color: colors.text,
                              }}
                            >
                              {l.nombre}
                            </Link>
                          ))}
                        </div>
                      )}

                      <a href={waLink} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: colors.muted }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill={colors.muted}>
                          <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3C4 14.9 3.8 13.5 3.8 12 3.8 7.5 7.5 3.8 12 3.8S20.2 7.5 20.2 12 16.5 20.2 12 20.2z"></path>
                        </svg>
                        {dict.capitulo.compartirWhatsapp}
                      </a>
                    </div>
                  )}
                </div>
              );
            })}

            {showFullChapter && reflexion && reflexion.length > 0 && (
              <div>
                <div style={{ background: colors.subtle, borderRadius: 10, padding: '20px 22px', marginBottom: 28 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: colors.accent, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>
                    {dict.capitulo.paraReflexionar}
                  </div>
                  {reflexion.map((r, i) => (
                    <div
                      key={i}
                      style={{
                        fontFamily: 'var(--font-lora), serif',
                        fontSize: 17,
                        fontStyle: 'italic',
                        lineHeight: 1.5,
                        marginTop: i === 0 ? 0 : 10,
                      }}
                    >
                      {r}
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 36 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 8, color: colors.muted }}>{dict.capitulo.misNotas}</div>
                  {notesLocked ? (
                    <div
                      style={{
                        border: `1px dashed ${colors.border}`,
                        borderRadius: 8,
                        padding: '22px 18px',
                        textAlign: 'center',
                        background: colors.subtle,
                      }}
                    >
                      <div style={{ fontSize: 14, color: colors.muted, marginBottom: 14 }}>{dict.capitulo.loginPrompt}</div>
                      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                        <div
                          onClick={() => openAuthModal('login')}
                          style={{
                            cursor: 'pointer',
                            fontSize: 13.5,
                            fontWeight: 600,
                            color: colors.text,
                            border: `1px solid ${colors.border}`,
                            padding: '9px 16px',
                            borderRadius: 8,
                            background: colors.panel,
                          }}
                        >
                          {dict.capitulo.iniciarSesion}
                        </div>
                        <div
                          onClick={() => openAuthModal('register')}
                          style={{
                            cursor: 'pointer',
                            fontSize: 13.5,
                            fontWeight: 600,
                            color: '#fff',
                            background: colors.accent,
                            padding: '9px 16px',
                            borderRadius: 8,
                          }}
                        >
                          {dict.capitulo.crearCuenta}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <textarea
                      value={notesValue}
                      onChange={(e) => saveNote(currentChapter, e.target.value)}
                      placeholder={dict.capitulo.notaPlaceholder}
                      style={{
                        width: '100%',
                        minHeight: 90,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8,
                        padding: 12,
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 14.5,
                        background: colors.bg,
                        color: colors.text,
                        resize: 'vertical',
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {!chExists && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: colors.muted }}>
            <div style={{ fontSize: 15, marginBottom: 6 }}>{dict.capitulo.pendingTitle}</div>
            <div style={{ fontSize: 13 }}>{dict.capitulo.pendingBody}</div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, paddingTop: 20, borderTop: `1px solid ${colors.border}` }}>
          <Link
            href={`/${lang}/capitulo/${prevN}`}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: colors.text, visibility: prevN >= 1 ? 'visible' : 'hidden' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2.3}>
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>{' '}
            {dict.capitulo.mateoPrefix} {prevN}
          </Link>
          <Link
            href={`/${lang}/capitulo/${nextN}`}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: colors.text, visibility: nextN <= MAX_CHAPTER ? 'visible' : 'hidden' }}
          >
            {dict.capitulo.mateoPrefix} {nextN}{' '}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2.3}>
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
        </div>
      </div>

      {showFullChapter && (
        <div style={{ order: capCtxOrder, position: capCtxPosition, top: capCtxTop, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {contextos.length > 0 ? (
            contextos.map((ctx) => (
              <div key={ctx.id} style={{ border: `1px solid ${colors.border}`, borderRadius: 10, overflow: 'hidden', background: colors.panel }}>
                <div
                  onClick={() => setOpenContextId(openContextId === ctx.id ? null : ctx.id)}
                  style={{ padding: '14px 18px', background: colors.subtle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: 10 }}
                >
                  <span style={{ fontWeight: 600, fontSize: 14 }}>
                    {dict.capitulo.contexto}: {ctx.titulo}
                  </span>
                  <span style={{ color: colors.accent, fontWeight: 700, flexShrink: 0 }}>{openContextId === ctx.id ? '−' : '+'}</span>
                </div>
                {openContextId === ctx.id && (
                  <div style={{ padding: '16px 18px', fontSize: 14, lineHeight: 1.65, color: colors.muted }}>{ctx.texto}</div>
                )}
              </div>
            ))
          ) : (
            <div style={{ border: `1px solid ${colors.border}`, borderRadius: 10, padding: '16px 18px', fontSize: 13.5, color: colors.muted }}>
              {dict.capitulo.sinContexto}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
