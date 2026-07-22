'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/app-context';
import type { Lugar } from '@/lib/content/types';
import mapaImg from '@/app/assets/mapa.png';

interface MapaScreenProps {
  lugares: Lugar[];
}

const SCALE = 1.6; // how much bigger the map layer is than the visible viewport
const DRAG_THRESHOLD = 6; // px of movement before a press counts as a drag, not a click

export default function MapaScreen({ lugares }: MapaScreenProps) {
  const { colors, lang, dict } = useApp();
  const [mapSelected, setMapSelected] = useState<Lugar | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef<{ startX: number; startY: number; posX: number; posY: number; moved: boolean } | null>(null);

  const clamp = (x: number, y: number) => {
    const el = containerRef.current;
    if (!el) return { x, y };
    const w = el.clientWidth;
    const h = el.clientHeight;
    const minX = w * (1 - SCALE);
    const minY = h * (1 - SCALE);
    return { x: Math.min(0, Math.max(minX, x)), y: Math.min(0, Math.max(minY, y)) };
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const center = clamp((el.clientWidth * (1 - SCALE)) / 2, (el.clientHeight * (1 - SCALE)) / 2);
    setPos(center);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startX: e.clientX, startY: e.clientY, posX: pos.x, posY: pos.y, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) drag.current.moved = true;
    setPos(clamp(drag.current.posX + dx, drag.current.posY + dy));
  };

  const endDrag = () => {
    drag.current = null;
  };

  const places = lugares.filter((l) => l.top !== null && l.left !== null);

  const pins = places.map((place) => {
    const selected = mapSelected?.id === place.id;
    return (
      <div
        key={place.id}
        className="map-pin"
        style={{ top: `${place.top}%`, left: `${place.left}%` }}
        onClick={() => {
          if (drag.current?.moved) return;
          setMapSelected(place);
        }}
      >
        <div
          className="map-pin-pulse"
          style={{ color: selected ? colors.accentDark : colors.accent, background: selected ? colors.accentDark : colors.accent }}
        />
        <div className="map-pin-dot" style={{ background: selected ? colors.accentDark : colors.accent }} />
        <div
          className="map-pin-label"
          style={{ background: colors.panel, color: colors.text, border: `1px solid ${colors.border}` }}
        >
          {place.nombre}
        </div>
      </div>
    );
  });

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      style={{
        position: 'relative',
        flex: 1,
        width: '100%',
        overflow: 'hidden',
        cursor: 'grab',
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${SCALE * 100}%`,
          height: `${SCALE * 100}%`,
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        <Image src={mapaImg} alt={dict.mapa.title} fill sizes="160vw" style={{ objectFit: 'cover' }} priority draggable={false} />
        {pins}
      </div>

      {mapSelected && (
        <div
          onClick={() => setMapSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.45)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: colors.panel,
              borderTop: `4px solid ${colors.accent}`,
              borderRadius: 12,
              padding: '26px 26px 22px',
              width: '100%',
              maxWidth: 380,
              boxShadow: '0 20px 50px rgba(0,0,0,.25)',
              animation: 'popIn .15s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 12 }}>
              <div onClick={() => setMapSelected(null)} style={{ cursor: 'pointer', color: colors.muted, fontSize: 20, lineHeight: 1 }}>
                ×
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-lora), serif', fontSize: 22, fontWeight: 600, marginBottom: 10 }}>
              {mapSelected.nombre}
            </div>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: colors.muted, margin: '0 0 16px' }}>{mapSelected.nota}</p>
            {mapSelected.capitulos.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {mapSelected.capitulos.map((num) => (
                  <a
                    key={num}
                    href={`/${lang}/capitulo/${num}`}
                    style={{
                      fontSize: 12.5,
                      fontWeight: 600,
                      padding: '6px 11px',
                      borderRadius: 16,
                      background: colors.subtle,
                      color: colors.accent,
                      cursor: 'pointer',
                    }}
                  >
                    {dict.capitulo.mateoPrefix} {num}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
