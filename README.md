# Basileia

Plataforma de estudio del Evangelio de Mateo: texto bíblico, comentario capítulo a capítulo, análisis de griego, contexto histórico-cultural, mapa interactivo, personajes, glosario y notas personales. Disponible en español y portugués.

## Stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- [Tailwind CSS](https://tailwindcss.com) para utilidades puntuales (el grueso de los estilos es inline, ver `lib/theme.ts`)
- [Supabase](https://supabase.com) para autenticación, notas y progreso de lectura
- i18n propio (es/pt) vía segmento dinámico `app/[lang]`, ver `lib/i18n/`

> Nota: este proyecto usa una versión de Next.js con cambios de convención respecto a la que la mayoría conoce (por ejemplo, `proxy.ts` en vez de `middleware.ts`). Antes de tocar rutas, metadata o convenciones de archivos especiales, revisar `node_modules/next/dist/docs/` — ver `AGENTS.md`.

## Requisitos

- Node.js 20+
- Un proyecto de [Supabase](https://supabase.com)

## Variables de entorno

Crear un `.env` en la raíz (ver `.env.example` si existe, o copiar esta lista):

```
NEXT_PUBLIC_SUPABASE_URL=            # URL del proyecto de Supabase
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY= # clave pública (anon/publishable) de Supabase
NEXT_PUBLIC_SITE_URL=                 # origen público del sitio (usado por sitemap/robots/OG).
                                       # http://localhost:3000 en desarrollo; el dominio real en producción.
```

## Base de datos (Supabase)

El esquema completo (tablas `usuarios`, `notas`, `progreso`, RLS y triggers) está en `supabase/schema.sql`. Aplicarlo una vez por proyecto de Supabase, desde el SQL Editor del dashboard o con la CLI:

```bash
supabase db query < supabase/schema.sql
```

## Desarrollo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) — redirige automáticamente a `/es` o `/pt` según el idioma del navegador (o la cookie `NEXT_LOCALE` si ya se eligió uno).

## Scripts

| Script          | Qué hace                                   |
| --------------- | ------------------------------------------- |
| `npm run dev`   | Servidor de desarrollo                      |
| `npm run build` | Build de producción                         |
| `npm run start` | Sirve el build de producción                |
| `npm run lint`  | ESLint                                      |
| `npm test`      | Corre la suite de Vitest                    |

## Estructura

- `app/[lang]/` — rutas por pantalla (índice, capítulo, mapa, personajes, glosario, contexto, notas, buscar, legales)
- `app/data/` — contenido en JSON por idioma (texto bíblico, glosario, personajes, lugares, contexto)
- `lib/content/` — tipos, loader y metadatos editoriales (secciones, discursos, qué capítulos están completos)
- `lib/i18n/` — diccionarios es/pt y helpers de locale
- `lib/supabase/` — cliente, contexto de auth, notas y progreso de lectura
- `components/mateo/` — las pantallas y la navegación

## Contenido

El contenido teológico (texto, comentario, griego, contexto, personajes) se escribe directamente en los JSON de `app/data/`. `lib/content/editorial.ts` controla qué capítulos se consideran completos (`COMPLETED_RANGE`) — el índice, el buscador y el sitemap se actualizan solos a medida que ese rango crece.
