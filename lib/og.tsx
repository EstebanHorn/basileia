// Imágenes para compartir (Open Graph / Twitter) con el estilo de diario de Basileia.
// Las usan app/[lang]/opengraph-image.tsx y app/[lang]/capitulo/[n]/opengraph-image.tsx.

import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Locale } from '@/lib/i18n/config';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const PAPER = '#EFE6D3';
const INK = '#1F1B16';
const ORANGE = '#E4572E';
const DOTS = ['#B8925E', '#8B1E2D', '#4A5A3A', '#E4572E', '#1F1B16'];

const TEXT = {
  es: { tagline: 'NOTICIAS DE UN REINO QUE NO ES DE ESTE MUNDO', mateo: 'MATEO', study: 'ESTUDIO DEL EVANGELIO DE MATEO' },
  pt: { tagline: 'NOTÍCIAS DE UM REINO QUE NÃO É DESTE MUNDO', mateo: 'MATEUS', study: 'ESTUDO DO EVANGELHO DE MATEUS' },
};

async function loadFonts() {
  const dir = join(process.cwd(), 'app', 'assets', 'fonts');
  const [anton, typewriter] = await Promise.all([readFile(join(dir, 'Anton-Regular.ttf')), readFile(join(dir, 'SpecialElite-Regular.ttf'))]);
  return [
    { name: 'Anton', data: anton, weight: 400 as const, style: 'normal' as const },
    { name: 'Elite', data: typewriter, weight: 400 as const, style: 'normal' as const },
  ];
}

function Crown({ width }: { width: number }) {
  return (
    <svg width={width} height={(width * 72) / 132} viewBox="505 58 132 72">
      <path d="M515.5,111.9 L515.5,84.6 L545.2,90.8 L570.5,73.4 L595.8,90.8 L625.5,84.6 L625.5,111.9Z" fill={ORANGE} />
      <rect x="515.5" y="115.6" width="110" height="12.4" fill={ORANGE} />
      <circle cx="515.5" cy="79.6" r="8.2" fill={ORANGE} />
      <circle cx="570.5" cy="68.5" r="8.2" fill={ORANGE} />
      <circle cx="625.5" cy="79.6" r="8.2" fill={ORANGE} />
    </svg>
  );
}

function Rules({ bottom }: { bottom?: boolean }) {
  const thick = <div style={{ height: 10, background: INK }} />;
  const thin = <div style={{ height: 4, background: INK }} />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      {bottom ? thin : thick}
      {bottom ? thick : thin}
    </div>
  );
}

function Dots() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {DOTS.map((c) => (
        <div key={c} style={{ width: 22, height: 22, borderRadius: 11, background: c }} />
      ))}
    </div>
  );
}

const frame = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as const,
  background: PAPER,
  color: INK,
  padding: '40px 56px 36px',
};

/** Portada: cabecera de diario con el nombre a todo el ancho. */
export async function homeOg(lang: Locale) {
  const t = TEXT[lang];
  return new ImageResponse(
    (
      <div style={frame}>
        <Rules />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
          <Crown width={110} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Anton', fontSize: 300, lineHeight: 0.95, marginTop: -4 }}>
          {'BASILEIA'.split('').map((ch, i) => (
            <span key={i}>{ch}</span>
          ))}
        </div>
        <div style={{ display: 'flex', marginTop: 'auto' }}>
          <Rules bottom />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, fontFamily: 'Elite', fontSize: 24 }}>
          <span>VOL. I</span>
          <span>{t.tagline}</span>
          <Dots />
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}

/** Capítulo: número enorme en naranja y el título como titular. */
export async function chapterOg(lang: Locale, chapter: number, title?: string) {
  const t = TEXT[lang];
  return new ImageResponse(
    (
      <div style={frame}>
        <Rules />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Crown width={64} />
            <span style={{ fontFamily: 'Anton', fontSize: 56, letterSpacing: 2 }}>BASILEIA</span>
          </div>
          <span style={{ fontFamily: 'Elite', fontSize: 24 }}>{t.study}</span>
        </div>
        <div style={{ display: 'flex', fontFamily: 'Anton', fontSize: 230, lineHeight: 0.95, color: ORANGE, marginTop: 14 }}>
          {`${t.mateo} ${chapter}`}
        </div>
        {title && (
          <div style={{ display: 'flex', fontFamily: 'Anton', fontSize: title.length > 48 ? 50 : 60, lineHeight: 1.12, marginTop: 10, maxWidth: 1060 }}>
            {title}
          </div>
        )}
        <div style={{ display: 'flex', marginTop: 'auto' }}>
          <Rules bottom />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, fontFamily: 'Elite', fontSize: 22 }}>
          <span>{t.tagline}</span>
          <Dots />
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}
