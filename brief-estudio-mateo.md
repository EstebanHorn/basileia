# Brief: Web de Estudio de Mateo

## 1. Objetivo del proyecto

Crear una web/app que sirva como plataforma de estudio del Evangelio de Mateo, aprovechando el trabajo ya desarrollado (análisis griego, contexto histórico-cultural del siglo I, comentario capítulo a capítulo de Mateo 5–15) y dándole un formato interactivo que facilite tanto la lectura individual como el uso en grupo.

## 2. Estructura de pantallas

1. **Inicio**
   - Panorama general de Mateo, organizado en torno a los 5 grandes discursos.
   - Botón "continuar donde quedaste".
   - Accesos directos a Mapa, Personajes, Glosario y Contexto.

2. **Índice de capítulos**
   - Grid del 1 al 28, marcando visualmente capítulos completados (5–15) vs. pendientes.
   - Filtro opcional por sección temática (Sermón del Monte, Parábolas del Reino, Semana de Pasión, etc.).

3. **Página de capítulo** (núcleo del estudio)
   - Texto bíblico completo, limpio.
   - Comentario en prosa, versículo a versículo o por bloques.
   - Términos griegos marcados junto a la palabra → popover con transliteración, carácter griego y explicación breve.
   - Panel colapsable de contexto histórico-cultural.
   - Pregunta(s) de reflexión al cierre.
   - Campo de notas personales.
   - Navegación anterior/siguiente.
   - Vista "solo texto" (oculta anotaciones).

4. **Mapa interactivo**
   - Lugares clave: Belén, Nazaret, Cafarnaún, Jerusalén, el Jordán, Mar de Galilea, desierto de la tentación, Getsemaní.
   - Al tocar un lugar: nombre, nota de contexto, capítulos relacionados con enlace directo.
   - Capa de recorrido general del ministerio (Galilea → camino a Jerusalén → Jerusalén).

5. **Personajes**
   - Ficha por personaje: quién es, trasfondo breve, capítulos donde aparece.
   - Categorías: discípulos, familia de Jesús, autoridades religiosas, autoridades políticas, otros.
   - Mismo formato de panel/popover que el griego, para consistencia visual.

6. **Glosario griego**
   - Términos acumulados, buscable.
   - Cada entrada enlaza de vuelta al versículo donde aparece.

7. **Contexto histórico-cultural**
   - Notas organizadas por tema (vida judía, geografía, política romana, prácticas religiosas), consultables de forma independiente.

8. **Mis notas / progreso**
   - Notas guardadas por capítulo/versículo (almacenamiento local).
   - Checklist visual de avance de lectura.

## 3. Features transversales

- Buscador (palabra clave, término griego, o referencia tipo "Mt 6:9").
- Modo oscuro/claro.
- Botón de compartir a WhatsApp (versículo + reflexión listos para pegar).
- Consistencia visual entre elementos interactivos (griego, personajes, mapa).

## 4. Línea de diseño

**Paleta**
- Blanco / casi blanco (#FAFAFA) como base dominante (70–80% de la interfaz).
- Rojo profundo (#C41E3A o #B22222) como color de acento: títulos clave, botones, marcas de progreso, elementos interactivos. Se evita el rojo puro por resultar más agresivo.
- Gris oscuro casi negro para el texto de cuerpo (más suave que negro puro en lectura larga).
- Rojo muy pálido (#FDF0F0) opcional como fondo sutil para paneles destacados (contexto, notas).

**Tipografía**
- Serif clásica para el texto bíblico — le da peso y carácter distintivo.
- Sans-serif limpia (tipo Inter o similar) para comentario, UI, botones y navegación.
- Cuerpo de texto 16–18px, interlineado 1.6–1.7.
- Jerarquía marcada en títulos de capítulo (grandes, en rojo o negro con buen peso).

**Layout**
- Mucho espacio en blanco, para que el rojo funcione como acento y no sature.
- Línea o borde rojo fino como separador/marca de sección, sin bloques grandes de color.
- Iconografía de línea fina, coherente con el estilo boceto ya usado en las diapositivas.
- Tratamiento visual uniforme para todo elemento clicable.

**Punto a definir**
La identidad actual de las diapositivas (beige, verde menta, boceto) convive con esta nueva paleta rojo/blanco. Definir si el rojo/blanco es exclusivo de la plataforma web o si implica un rebranding general del material, para mantener coherencia entre lo que se ve en las reuniones y lo que se ve en la web.

## 5. Orden de construcción sugerido

1. Página de capítulo (texto + comentario + griego + contexto + reflexión)
2. Índice de capítulos
3. Buscador
4. Mapa + Personajes
5. Glosario y Contexto como secciones independientes
6. Notas/progreso y features transversales (compartir, modo oscuro)
