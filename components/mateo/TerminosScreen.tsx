'use client';

import { Colors } from '@/lib/theme';

interface TerminosScreenProps {
  colors: Colors;
}

interface LegalSection {
  title: string;
  paragraphs: string[];
}

const SECTIONS: LegalSection[] = [
  {
    title: '1. Aceptación',
    paragraphs: [
      'Al usar Basileia aceptás estos términos. Si no estás de acuerdo con alguno de ellos, te pedimos que no utilices la plataforma.',
    ],
  },
  {
    title: '2. Qué es Basileia',
    paragraphs: [
      'Basileia es un recurso gratuito de estudio del Evangelio de Mateo: comentario capítulo a capítulo, análisis de términos griegos, contexto histórico-cultural, mapa interactivo, personajes, glosario y un espacio de notas personales para usuarios registrados.',
    ],
  },
  {
    title: '3. Cuentas de usuario',
    paragraphs: [
      'Para escribir y guardar notas necesitás crear una cuenta con tu correo electrónico. Sos responsable de mantener la confidencialidad de tu contraseña y de toda actividad que ocurra bajo tu cuenta. Podés cerrar sesión o solicitar la eliminación de tu cuenta en cualquier momento.',
    ],
  },
  {
    title: '4. Contenido de la plataforma',
    paragraphs: [
      'El comentario, las fichas de contexto y el resto del material teológico de Basileia son de autoría propia, basados en el estudio bíblico de la iglesia Reino en Movimiento, y se ofrecen con fines educativos y de estudio personal. Podés citarlo o compartirlo señalando la fuente; no está permitido reproducirlo comercialmente sin autorización.',
      'El texto bíblico citado pertenece a sus respectivas versiones y traducciones, cuyos derechos corresponden a sus editores u organizaciones responsables.',
    ],
  },
  {
    title: '5. Notas personales',
    paragraphs: [
      'Las notas que escribís son privadas: solo vos podés verlas y editarlas. No las revisamos ni las usamos con otro fin que mostrártelas cuando volvés a la plataforma.',
    ],
  },
  {
    title: '6. Uso responsable',
    paragraphs: [
      'Te pedimos que uses Basileia de buena fe: no intentes vulnerar la seguridad de la plataforma, acceder a cuentas ajenas ni utilizar el servicio con fines distintos al estudio bíblico personal.',
    ],
  },
  {
    title: '7. Disponibilidad',
    paragraphs: [
      'Basileia es un proyecto en desarrollo continuo. Es posible que haya interrupciones temporales, cambios de funcionalidad o ampliaciones de contenido sin aviso previo. Hacemos lo posible por mantener tus datos disponibles, pero no podemos garantizar disponibilidad ininterrumpida del servicio.',
    ],
  },
  {
    title: '8. Cambios en estos términos',
    paragraphs: [
      'Podemos actualizar estos términos a medida que la plataforma crezca. Los cambios relevantes se van a reflejar en esta misma página.',
    ],
  },
  {
    title: '9. Contacto',
    paragraphs: [
      'Para consultas sobre estos términos o tu cuenta, podés contactarnos a través de los medios de la iglesia Reino en Movimiento.',
    ],
  },
];

export default function TerminosScreen({ colors }: TerminosScreenProps) {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '56px 24px 80px' }}>
      <div style={{ height: 2, width: 56, background: colors.accent, marginBottom: 20 }} />
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 34, fontWeight: 600, margin: '0 0 8px' }}>
        Términos de uso
      </h1>
      <p style={{ fontSize: 13, color: colors.muted, margin: '0 0 36px' }}>Última actualización: julio de 2026.</p>

      {SECTIONS.map((section) => (
        <div key={section.title} style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 18, fontWeight: 600, margin: '0 0 10px' }}>
            {section.title}
          </h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 14.5, lineHeight: 1.7, color: colors.muted, margin: '0 0 10px' }}>
              {p}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
