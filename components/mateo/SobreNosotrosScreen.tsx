'use client';

import { Colors } from '@/lib/theme';

interface SobreNosotrosScreenProps {
  colors: Colors;
}

interface Section {
  title: string;
  paragraphs: string[];
}

const SECTIONS: Section[] = [
  {
    title: '¿Por qué "Basileia"?',
    paragraphs: [
      'Basileia (βασιλεία) es la palabra griega que Mateo usa una y otra vez a lo largo de su evangelio para hablar del "reino de los cielos". No es un lugar lejano ni una promesa solo para después de la muerte: es el gobierno de Dios irrumpiendo ya, en medio de la historia, a través de la vida, la enseñanza, la muerte y la resurrección de Jesús.',
      'Elegimos ese nombre porque resume de qué se trata todo el evangelio: un Rey que cumple la promesa hecha a Abraham y a David, y un Reino que no se impone por la fuerza sino que se revela en parábolas, se vive en comunidad y se anuncia hasta los confines de la tierra.',
    ],
  },
  {
    title: 'De dónde nace este estudio',
    paragraphs: [
      'Basileia surge del estudio bíblico personal de capítulo a capítulo del Evangelio de Mateo, desarrollado en el marco de la iglesia Reino en Movimiento. Lo que empezó como notas de estudio —comentario versículo por versículo, apuntes de griego, fichas de contexto histórico— fue tomando forma hasta convertirse en esta plataforma, con la idea de ponerlo a disposición de cualquiera que quiera recorrer el evangelio con método y profundidad.',
      'No es un proyecto institucional ni una editorial: es un recurso hecho por una persona que estudia la Biblia en comunidad y quiso compartir ese trabajo de una manera más accesible e intuitiva que un cuaderno de notas.',
    ],
  },
  {
    title: 'Qué vas a encontrar en la plataforma',
    paragraphs: [
      'Basileia organiza el estudio de Mateo en varias capas que se complementan entre sí:',
    ],
  },
  {
    title: 'Cómo estudiamos',
    paragraphs: [
      'El enfoque es teológico pero accesible: cada pasaje se lee primero en su contexto —histórico, cultural, literario— antes de preguntarse qué significa para nosotros hoy. Evitamos leer un versículo aislado de su párrafo, y un párrafo aislado del resto del evangelio.',
      'Mateo escribe para una comunidad judía que necesitaba entender que Jesús era el cumplimiento de la Ley y los Profetas, no su abolición. Esa clave de lectura atraviesa todo el comentario: menos "versículo del día" y más el relato completo de un Rey y su Reino.',
    ],
  },
];

const FEATURES = [
  { title: 'Comentario capítulo a capítulo', desc: 'Cada capítulo dividido en bloques de texto con comentario propio, versículo por versículo.' },
  { title: 'Análisis de griego', desc: 'Palabras clave en su idioma original, con transliteración y explicación de matices que se pierden en la traducción.' },
  { title: 'Contexto histórico-cultural', desc: 'Fichas sobre vida judía, política romana, geografía y prácticas religiosas del siglo I.' },
  { title: 'Mapa interactivo', desc: 'Los lugares del ministerio de Jesús, ubicados y conectados con los capítulos donde aparecen.' },
  { title: 'Personajes', desc: 'Galería de las figuras del evangelio, con su rol y su arco dentro del relato.' },
  { title: 'Notas personales', desc: 'Espacio privado para anotar tus propias reflexiones capítulo por capítulo, disponible al iniciar sesión.' },
];

export default function SobreNosotrosScreen({ colors }: SobreNosotrosScreenProps) {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px 80px' }}>
      <div style={{ height: 2, width: 56, background: colors.accent, marginBottom: 20 }} />
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 36, fontWeight: 600, margin: '0 0 24px' }}>
        Sobre nosotros
      </h1>

      <div style={{ background: colors.subtle, borderRadius: 12, padding: '28px 26px', marginBottom: 40 }}>
        <p style={{ fontSize: 16.5, lineHeight: 1.75, margin: 0, color: colors.text }}>
          La idea de Basileia es mostrar y enseñar el Evangelio de Mateo y la vida de Jesús de una manera diferente
          y más intuitiva, con un tono teológico. Está basada en el estudio bíblico de la iglesia{' '}
          <strong>Reino en Movimiento</strong>.
        </p>
      </div>

      {SECTIONS.slice(0, 2).map((section) => (
        <div key={section.title} style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 21, fontWeight: 600, margin: '0 0 14px' }}>
            {section.title}
          </h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 15, lineHeight: 1.75, color: colors.muted, margin: i === 0 ? '0 0 12px' : 0 }}>
              {p}
            </p>
          ))}
        </div>
      ))}

      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 21, fontWeight: 600, margin: '0 0 14px' }}>
          {SECTIONS[2].title}
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: colors.muted, margin: '0 0 18px' }}>
          {SECTIONS[2].paragraphs[0]}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 12 }}>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                background: colors.panel,
                border: `1px solid ${colors.border}`,
                borderLeft: `3px solid ${colors.accent}`,
                borderRadius: 10,
                padding: '16px 16px',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: colors.muted, lineHeight: 1.55 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 21, fontWeight: 600, margin: '0 0 14px' }}>
          {SECTIONS[3].title}
        </h2>
        {SECTIONS[3].paragraphs.map((p, i) => (
          <p key={i} style={{ fontSize: 15, lineHeight: 1.75, color: colors.muted, margin: i === 0 ? '0 0 12px' : 0 }}>
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
