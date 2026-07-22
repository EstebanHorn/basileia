'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/app-context';
import type { Lugar } from '@/lib/content/types';
import mapaImg from '@/app/assets/mapa.png';

interface MapaScreenProps {
  lugares: Lugar[];
}

const MAP_RATIO = mapaImg.width / mapaImg.height;
const DESKTOP_MAX_WIDTH = 1170; // 900 * 1.3
const MOBILE_CONTENT_WIDTH = 1300; // rendered larger than the viewport so it can be panned

export default function MapaScreen({ lugares }: MapaScreenProps) {
  const { colors, isMobile, lang, dict } = useApp();
  const [mapSelected, setMapSelected] = useState<Lugar | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    el.scrollTop = (el.scrollHeight - el.clientHeight) / 2.6;
  }, [isMobile]);

  const places = lugares.filter((l) => l.top !== null && l.left !== null);

  const pins = places.map((place) => {
    const selected = mapSelected?.id === place.id;
    return (
      <div
        key={place.id}
        className="map-pin"
        style={{ top: `${place.top}%`, left: `${place.left}%` }}
        onClick={() => setMapSelected(place)}
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
    <div style={{ maxWidth: DESKTOP_MAX_WIDTH, margin: '0 auto', padding: isMobile ? '24px 24px 60px' : '40px 24px 80px' }}>
      <div style={{ height: 2, width: 56, background: colors.accent, marginBottom: 20 }} />
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: isMobile ? 26 : 32, fontWeight: 600, margin: '0 0 6px' }}>
        {dict.mapa.title}
      </h1>
      <p style={{ fontSize: 14, color: colors.muted, margin: isMobile ? '0 0 16px' : '0 0 28px' }}>
        {isMobile ? dict.mapa.subtitleMobile : dict.mapa.subtitleDesktop}
      </p>

      {isMobile ? (
        <div
          ref={scrollRef}
          style={{
            marginLeft: -24,
            marginRight: -24,
            width: 'calc(100% + 48px)',
            height: 'min(74vh, 600px)',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            background: colors.subtle,
            touchAction: 'pan-x pan-y',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: MOBILE_CONTENT_WIDTH,
              height: MOBILE_CONTENT_WIDTH / MAP_RATIO,
            }}
          >
            <Image
              src={mapaImg}
              alt={dict.mapa.title}
              fill
              sizes={`${MOBILE_CONTENT_WIDTH}px`}
              style={{ objectFit: 'cover' }}
              priority
            />
            {pins}
          </div>
        </div>
      ) : (
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: `${mapaImg.width} / ${mapaImg.height}`,
            borderRadius: 14,
            overflow: 'hidden',
            border: `1px solid ${colors.border}`,
            boxShadow: '0 12px 36px rgba(0,0,0,.18)',
          }}
        >
          <Image
            src={mapaImg}
            alt={dict.mapa.title}
            fill
            sizes={`${DESKTOP_MAX_WIDTH}px`}
            style={{ objectFit: 'cover' }}
            priority
          />
          {pins}
        </div>
      )}

      <p style={{ fontSize: 12, color: colors.muted, textAlign: 'center', margin: '14px 0 0' }}>{dict.mapa.disclaimer}</p>

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
