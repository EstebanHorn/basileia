'use client';

import { Colors } from '@/lib/theme';
import { DISCOURSES } from '@/lib/mateo-data';

interface InicioScreenProps {
  colors: Colors;
  lastChapter: number;
  onContinue: () => void;
  onGoToChapter: (n: number) => void;
  onGoMapa: () => void;
  onGoPersonajes: () => void;
  onGoGlosario: () => void;
  onGoContexto: () => void;
}

export default function InicioScreen({
  colors,
  lastChapter,
  onContinue,
  onGoToChapter,
  onGoMapa,
  onGoPersonajes,
  onGoGlosario,
  onGoContexto,
}: InicioScreenProps) {
  const discourseCards = DISCOURSES.map((d) => ({
    name: d.name,
    summary: d.summary,
    range: d.chapters.length > 1 ? `${d.chapters[0]}–${d.chapters[d.chapters.length - 1]}` : `${d.chapters[0]}`,
    onClick: () => onGoToChapter(d.chapters[0]),
  }));

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '56px 24px 80px' }}>
      <div style={{ height: 2, width: 56, background: colors.accent, marginBottom: 20 }} />
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 44, lineHeight: 1.15, margin: '0 0 14px', fontWeight: 600 }}>
        El Evangelio de Mateo
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.7, color: colors.muted, maxWidth: 600, margin: '0 0 28px' }}>
        Un recaudador de impuestos que vivió rechazado por su pueblo y por Roma, y que escribió el relato de un Rey que
        vino a cumplir la promesa. Análisis griego, contexto histórico y comentario capítulo a capítulo.
      </p>
      <div
        onClick={onContinue}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: colors.accent,
          color: '#fff',
          padding: '13px 22px',
          borderRadius: 9,
          fontWeight: 600,
          fontSize: 15,
          cursor: 'pointer',
        }}
      >
        Continuar en Mateo {lastChapter}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}>
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>

      <h2 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 22, fontWeight: 600, margin: '52px 0 6px' }}>
        Panorama en cinco discursos
      </h2>
      <p style={{ fontSize: 14, color: colors.muted, margin: '0 0 20px' }}>
        Mateo organiza las enseñanzas de Jesús en torno a cinco grandes bloques.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
        {discourseCards.map((d) => (
          <div
            key={d.name}
            onClick={d.onClick}
            style={{
              background: colors.panel,
              border: `1px solid ${colors.border}`,
              borderLeft: `3px solid ${colors.accent}`,
              borderRadius: 10,
              padding: 18,
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em', color: colors.accent, fontWeight: 700, marginBottom: 6 }}>
              Mateo {d.range}
            </div>
            <div style={{ fontFamily: 'var(--font-lora), serif', fontSize: 17, fontWeight: 600, marginBottom: 6 }}>{d.name}</div>
            <div style={{ fontSize: 13, color: colors.muted, lineHeight: 1.5 }}>{d.summary}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 22, fontWeight: 600, margin: '48px 0 16px' }}>
        Accesos directos
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 12 }}>
        <div
          onClick={onGoMapa}
          style={{ background: colors.subtle, borderRadius: 10, padding: '18px 14px', textAlign: 'center', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8, color: colors.accent }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M9 20l-5.4-1.8A1 1 0 0 1 3 17.2V4.8a1 1 0 0 1 1.3-1L9 5m0 15l6-2m-6 2V5m6 13l4.7 1.8A1 1 0 0 0 21 19V6.2a1 1 0 0 0-.6-1L15 3m0 15V3m0 2L9 5"></path>
            </svg>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Mapa</div>
        </div>
        <div
          onClick={onGoPersonajes}
          style={{ background: colors.subtle, borderRadius: 10, padding: '18px 14px', textAlign: 'center', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8, color: colors.accent }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <circle cx="9" cy="8" r="3.3"></circle>
              <path d="M2.5 19c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5"></path>
              <circle cx="17.5" cy="9" r="2.6"></circle>
              <path d="M15.5 13.7c2.9.4 4.9 2.4 5 5.3"></path>
            </svg>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Personajes</div>
        </div>
        <div
          onClick={onGoGlosario}
          style={{ background: colors.subtle, borderRadius: 10, padding: '18px 14px', textAlign: 'center', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8, color: colors.accent }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17z"></path>
              <path d="M20 19H6.5A2.5 2.5 0 0 0 4 21.5"></path>
            </svg>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Glosario</div>
        </div>
        <div
          onClick={onGoContexto}
          style={{ background: colors.subtle, borderRadius: 10, padding: '18px 14px', textAlign: 'center', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8, color: colors.accent }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <circle cx="12" cy="12" r="9.5"></circle>
              <line x1="12" y1="8" x2="12" y2="12.5"></line>
              <circle cx="12" cy="16" r="0.6" fill="currentColor"></circle>
            </svg>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Contexto</div>
        </div>
      </div>
    </div>
  );
}
