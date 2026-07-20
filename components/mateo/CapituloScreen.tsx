'use client';

import { Colors } from '@/lib/theme';
import { CHAPTER_CONTENT, GreekTerm, sectionFor } from '@/lib/mateo-data';

interface Segment {
  plain: boolean;
  text: string;
  term?: GreekTerm & { id: string; isOpen: boolean };
}

interface CapituloScreenProps {
  colors: Colors;
  currentChapter: number;
  onGoToChapter: (n: number) => void;
  isMobile: boolean;
  soloTexto: boolean;
  onToggleSoloTexto: () => void;
  openTerm: string | null;
  onSetOpenTerm: (id: string | null) => void;
  contextOpen: boolean;
  onToggleContext: () => void;
  notes: string;
  onNotesChange: (value: string) => void;
  notesLocked: boolean;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

export default function CapituloScreen({
  colors,
  currentChapter,
  onGoToChapter,
  isMobile,
  soloTexto,
  onToggleSoloTexto,
  openTerm,
  onSetOpenTerm,
  contextOpen,
  onToggleContext,
  notes,
  onNotesChange,
  notesLocked,
  onOpenLogin,
  onOpenRegister,
}: CapituloScreenProps) {
  const chData = CHAPTER_CONTENT[currentChapter];
  const chExists = !!chData;
  const sec = sectionFor(currentChapter);
  const showFullChapter = !soloTexto;

  const chBlocks = chExists
    ? chData.blocks.map((b, i) => {
        const lower = b.text.toLowerCase();
        const matches = (b.greek || [])
          .map((t) => {
            const idx = lower.indexOf(t.word.toLowerCase());
            return idx >= 0 ? { start: idx, end: idx + t.word.length, term: t } : null;
          })
          .filter((m): m is { start: number; end: number; term: GreekTerm } => m !== null)
          .sort((a, c) => a.start - c.start);

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
          if (m.start > pos) segments.push({ plain: true, text: b.text.slice(pos, m.start) });
          const id = currentChapter + '-' + i + '-' + m.term.word;
          segments.push({
            plain: false,
            text: b.text.slice(m.start, m.end),
            term: { ...m.term, id, isOpen: openTerm === id },
          });
          pos = m.end;
        }
        if (pos < b.text.length) segments.push({ plain: true, text: b.text.slice(pos) });

        const waText = `"${b.text}" — Mateo ${currentChapter}:${b.ref}\n\n${b.commentary.slice(0, 180)}...`;
        return { ref: b.ref, commentary: b.commentary, segments, waLink: 'https://wa.me/?text=' + encodeURIComponent(waText) };
      })
    : [];

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
            {sec ? sec.name : ''}
          </div>
          <div onClick={onToggleSoloTexto} style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', fontSize: 13, color: colors.muted }}>
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
            Solo texto
          </div>
        </div>

        <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 36, fontWeight: 600, margin: '0 0 4px' }}>
          Mateo {currentChapter}
        </h1>
        <h2 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 19, fontWeight: 500, color: colors.accent, margin: '0 0 22px' }}>
          {chExists ? chData.title : ''}
        </h2>

        {chExists && (
          <div>
            {showFullChapter && (
              <p style={{ fontSize: 15.5, lineHeight: 1.7, color: colors.muted, margin: '0 0 32px', paddingBottom: 24, borderBottom: `1px solid ${colors.border}` }}>
                {chData.intro}
              </p>
            )}

            {chBlocks.map((block, i) => (
              <div key={i} style={{ marginBottom: 34 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: colors.accent, letterSpacing: '.04em', marginBottom: 6 }}>
                  MATEO {block.ref}
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
                  {block.segments.map((seg, si) =>
                    seg.term ? (
                      <span key={si} style={{ position: 'relative', display: 'inline-block' }}>
                        <span
                          onClick={() => onSetOpenTerm(openTerm === seg.term!.id ? null : seg.term!.id)}
                          style={{ color: colors.accent, borderBottom: `2px solid ${colors.accent}`, cursor: 'pointer', fontStyle: 'normal', fontWeight: 600 }}
                        >
                          {seg.text}
                        </span>
                        {seg.term.isOpen && (
                          <span
                            style={{
                              position: 'absolute',
                              top: '100%',
                              left: 0,
                              zIndex: 10,
                              marginTop: 6,
                              padding: '12px 14px',
                              background: colors.subtle,
                              borderRadius: 8,
                              fontSize: 14,
                              fontStyle: 'normal',
                              lineHeight: 1.5,
                              width: 260,
                              display: 'block',
                              boxShadow: '0 8px 24px rgba(0,0,0,.15)',
                            }}
                          >
                            <span style={{ fontFamily: 'var(--font-lora), serif', fontSize: 17, marginRight: 8 }}>{seg.term.greek}</span>
                            <span style={{ fontWeight: 700 }}>{seg.term.translit}</span> — {seg.term.gloss}
                          </span>
                        )}
                      </span>
                    ) : (
                      <span key={si}>{seg.text}</span>
                    )
                  )}
                </blockquote>

                {showFullChapter && (
                  <div>
                    <p style={{ fontSize: 16, lineHeight: 1.7, margin: '0 0 14px' }}>{block.commentary}</p>
                    <a href={block.waLink} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: colors.muted }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill={colors.muted}>
                        <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3C4 14.9 3.8 13.5 3.8 12 3.8 7.5 7.5 3.8 12 3.8S20.2 7.5 20.2 12 16.5 20.2 12 20.2z"></path>
                      </svg>
                      Compartir por WhatsApp
                    </a>
                  </div>
                )}
              </div>
            ))}

            {showFullChapter && (
              <div>
                <div style={{ background: colors.subtle, borderRadius: 10, padding: '20px 22px', marginBottom: 28 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: colors.accent, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>
                    Para reflexionar
                  </div>
                  <div style={{ fontFamily: 'var(--font-lora), serif', fontSize: 17, fontStyle: 'italic', lineHeight: 1.5 }}>
                    {chData.reflection}
                  </div>
                </div>

                <div style={{ marginBottom: 36 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 8, color: colors.muted }}>Tus notas sobre este capítulo</div>
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
                      <div style={{ fontSize: 14, color: colors.muted, marginBottom: 14 }}>
                        Iniciá sesión o creá una cuenta para escribir y guardar tus notas de este capítulo.
                      </div>
                      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                        <div
                          onClick={onOpenLogin}
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
                          Iniciar sesión
                        </div>
                        <div
                          onClick={onOpenRegister}
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
                          Crear cuenta
                        </div>
                      </div>
                    </div>
                  ) : (
                    <textarea
                      value={notes}
                      onChange={(e) => onNotesChange(e.target.value)}
                      placeholder="Escribe lo que este capítulo te dice a ti..."
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
            <div style={{ fontSize: 15, marginBottom: 6 }}>Este capítulo todavía está pendiente de desarrollo.</div>
            <div style={{ fontSize: 13 }}>El comentario, análisis griego y contexto se agregarán próximamente.</div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, paddingTop: 20, borderTop: `1px solid ${colors.border}` }}>
          <div
            onClick={() => prevN >= 1 && onGoToChapter(prevN)}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: colors.text, visibility: prevN >= 1 ? 'visible' : 'hidden' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2.3}>
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>{' '}
            Mateo {prevN}
          </div>
          <div
            onClick={() => nextN <= 28 && onGoToChapter(nextN)}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: colors.text, visibility: nextN <= 28 ? 'visible' : 'hidden' }}
          >
            Mateo {nextN}{' '}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2.3}>
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
      </div>

      {showFullChapter && (
        <div style={{ order: capCtxOrder, position: capCtxPosition, top: capCtxTop }}>
          {chExists && chData.context ? (
            <div style={{ border: `1px solid ${colors.border}`, borderRadius: 10, overflow: 'hidden', background: colors.panel }}>
              <div
                onClick={onToggleContext}
                style={{ padding: '14px 18px', background: colors.subtle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: 10 }}
              >
                <span style={{ fontWeight: 600, fontSize: 14 }}>Contexto: {chData.context.title}</span>
                <span style={{ color: colors.accent, fontWeight: 700, flexShrink: 0 }}>{contextOpen ? '−' : '+'}</span>
              </div>
              {contextOpen && (
                <div style={{ padding: '16px 18px', fontSize: 14, lineHeight: 1.65, color: colors.muted }}>{chData.context.body}</div>
              )}
            </div>
          ) : (
            <div style={{ border: `1px solid ${colors.border}`, borderRadius: 10, padding: '16px 18px', fontSize: 13.5, color: colors.muted }}>
              Sin nota de contexto adicional para este capítulo.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
