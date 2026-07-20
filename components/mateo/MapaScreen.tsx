'use client';

import { Colors } from '@/lib/theme';
import { MAP_PLACES, MapPlace } from '@/lib/mateo-data';

interface MapaScreenProps {
  colors: Colors;
  mapSelected: MapPlace | null;
  onSelect: (place: MapPlace) => void;
  onGoToChapter: (n: number) => void;
}

export default function MapaScreen({ colors, mapSelected, onSelect, onGoToChapter }: MapaScreenProps) {
  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 32, fontWeight: 600, margin: '0 0 6px' }}>
        Mapa interactivo
      </h1>
      <p style={{ fontSize: 14, color: colors.muted, margin: '0 0 24px' }}>
        Toca un lugar para ver su contexto y los capítulos relacionados.
      </p>
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
        <svg viewBox="0 0 100 88" width={440} height={387} style={{ background: colors.subtle, borderRadius: 14, flexShrink: 0 }}>
          <path
            d="M30 8 C55 4, 85 10, 88 20 C90 34, 78 40, 76 52 C74 66, 58 70, 48 82 C40 86, 32 80, 34 68 C28 56, 20 48, 22 34 C18 20, 22 10, 30 8 Z"
            fill={colors.bg}
            stroke={colors.border}
            strokeWidth={0.6}
          />
          <path
            d="M50 26 L 73 19 L 71 43.5 L 61.7 62.2 L 42.8 66.6 L 43.6 65.4 L 42.7 69.3"
            fill="none"
            stroke={colors.accent}
            strokeWidth={0.6}
            strokeDasharray="2 2"
            opacity={0.5}
          />
          {MAP_PLACES.map((p) => {
            const selected = mapSelected?.name === p.name;
            return (
              <g key={p.name} onClick={() => onSelect(p)} style={{ cursor: 'pointer' }}>
                <circle cx={p.x} cy={p.y} r={selected ? 2.6 : 1.9} fill={selected ? colors.accentDark : colors.accent} stroke="#fff" strokeWidth={0.8} />
                <text x={p.x + 2.6} y={p.y} fontSize={3.4} fill={colors.text} fontFamily="var(--font-inter), sans-serif" fontWeight={600} dominantBaseline="middle">
                  {p.name}
                </text>
              </g>
            );
          })}
        </svg>
        <div style={{ flex: 1, minWidth: 240 }}>
          {mapSelected ? (
            <div style={{ background: colors.panel, border: `1px solid ${colors.border}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em', color: colors.accent, fontWeight: 700, marginBottom: 6 }}>
                {mapSelected.region}
              </div>
              <div style={{ fontFamily: 'var(--font-lora), serif', fontSize: 22, fontWeight: 600, marginBottom: 10 }}>{mapSelected.name}</div>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: colors.muted, margin: '0 0 14px' }}>{mapSelected.note}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {mapSelected.chapters.map((num) => (
                  <div
                    key={num}
                    onClick={() => onGoToChapter(num)}
                    style={{ fontSize: 12.5, fontWeight: 600, padding: '6px 11px', borderRadius: 16, background: colors.subtle, color: colors.accent, cursor: 'pointer' }}
                  >
                    Mateo {num}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ color: colors.muted, fontSize: 14, padding: 20 }}>Selecciona un lugar en el mapa para ver su contexto.</div>
          )}
        </div>
      </div>
    </div>
  );
}
