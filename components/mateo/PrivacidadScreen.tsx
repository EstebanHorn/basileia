'use client';

import { Colors } from '@/lib/theme';

interface PrivacidadScreenProps {
  colors: Colors;
}

interface LegalSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

const SECTIONS: LegalSection[] = [
  {
    title: '1. Quiénes somos',
    paragraphs: [
      'Basileia es un proyecto personal de estudio bíblico, sin fines comerciales, desarrollado a partir del estudio del Evangelio de Mateo en el marco de la iglesia Reino en Movimiento. No es una empresa ni recopila datos con fines publicitarios.',
    ],
  },
  {
    title: '2. Qué datos recopilamos',
    paragraphs: ['Según cómo uses la plataforma, guardamos distintos tipos de información:'],
    bullets: [
      'Si creás una cuenta: correo electrónico y, si lo indicás, tu nombre. La contraseña la gestiona Supabase y nunca queda almacenada ni es visible en texto plano.',
      'Si escribís notas: el contenido de las notas que guardás por capítulo, asociado a tu cuenta.',
      'Progreso de lectura: qué capítulos marcaste como leídos.',
      'Preferencias locales: tema claro/oscuro, último capítulo visitado y capítulos leídos se guardan en el almacenamiento local de tu navegador, incluso sin haber iniciado sesión. Esta información no sale de tu dispositivo salvo que inicies sesión.',
    ],
  },
  {
    title: '3. Para qué usamos tus datos',
    paragraphs: [
      'Usamos tus datos exclusivamente para brindarte la funcionalidad de la plataforma: identificarte al iniciar sesión, guardar y mostrarte tus notas y tu progreso de lectura. No usamos tus datos con fines publicitarios, no los vendemos y no los compartimos con terceros ajenos al funcionamiento del servicio.',
    ],
  },
  {
    title: '4. Dónde se almacenan',
    paragraphs: [
      'Los datos de cuenta, notas y progreso se almacenan en Supabase, nuestro proveedor de base de datos y autenticación, con reglas de acceso (RLS) que garantizan que cada usuario solo puede ver y modificar su propia información. No utilizamos servicios de analítica ni publicidad de terceros en la plataforma.',
    ],
  },
  {
    title: '5. Tus derechos',
    paragraphs: [
      'Podés acceder, corregir o eliminar tus datos en cualquier momento. Si querés eliminar tu cuenta y toda la información asociada (notas y progreso incluidos), escribinos a través de los medios de contacto de la iglesia Reino en Movimiento y lo gestionamos a la brevedad.',
    ],
  },
  {
    title: '6. Cambios en esta política',
    paragraphs: [
      'Esta política puede actualizarse a medida que la plataforma evolucione. Si hay cambios importantes en cómo tratamos tus datos, lo vamos a reflejar en esta misma página.',
    ],
  },
];

export default function PrivacidadScreen({ colors }: PrivacidadScreenProps) {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '56px 24px 80px' }}>
      <div style={{ height: 2, width: 56, background: colors.accent, marginBottom: 20 }} />
      <h1 style={{ fontFamily: 'var(--font-lora), serif', fontSize: 34, fontWeight: 600, margin: '0 0 8px' }}>
        Política de privacidad
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
          {section.bullets && (
            <ul style={{ margin: '10px 0 0', paddingLeft: 20 }}>
              {section.bullets.map((b, i) => (
                <li key={i} style={{ fontSize: 14.5, lineHeight: 1.7, color: colors.muted, marginBottom: 6 }}>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
