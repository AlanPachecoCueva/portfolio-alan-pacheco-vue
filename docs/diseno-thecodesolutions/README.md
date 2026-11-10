# Diseño TheCodeSolutions — Marca y maquetas

> Referencia visual para la migración del portafolio a la web de TheCodeSolutions (Fase 3).
> Última actualización: 2026-11-09

- **Lienzo interactivo (privado):** https://claude.ai/artifact/QQ1yRKMcRHbhj9WVzD7JyS
- **Propuesta y plan de migración:** https://claude.ai/artifact/S41YXPxRuFZQaY2LmAR9y1
- **Decisión registrada:** DA-010 en `.claude/memoria-tecnica/Decisiones_Arquitectura.md`

---

## Decisiones tomadas

| Elemento | Elegido | Descartado |
|---|---|---|
| Logo | **3 · Llaves con núcleo** `{ ◆ }` | 1 · Corchetes con check, 2 · C con cursor |
| Paleta | **C · Violeta moderno** | A · Naranja heredado, B · Azul confianza |
| Tipografía | Space Grotesk (títulos) · Inter (texto) · JetBrains Mono (código) | Roboto (actual) |
| Modo | Claro y oscuro, con selector (se mantiene) | — |

---

## Logo

**Idea:** las llaves de un bloque de código rodean un rombo: el problema del cliente en el centro.

Archivos en `logo/`:

| Archivo | Uso |
|---|---|
| `isotipo-claro.svg` | Símbolo sobre fondo claro |
| `isotipo-oscuro.svg` | Símbolo sobre fondo oscuro |
| `favicon.svg` | Favicon; trazo más grueso y cambia solo con `prefers-color-scheme` |
| `logo-horizontal-claro.svg` | Símbolo + "TheCode / SOLUTIONS" |

Reglas:
- Logotipo: **"TheCode"** en Space Grotesk 700 y debajo **"SOLUTIONS"** en Inter 600, espaciado 0.32–0.34 em, color de texto secundario.
- Las llaves van en el color de texto; el rombo, en el color de acento.
- En 32 px y 16 px el trazo sube a 6–7 y el rombo crece, para que se lea.
- **Pendiente:** el logotipo horizontal usa `<text>` con fuentes web. Antes de usarlo fuera del sitio (redes, PDF, OG image) hay que convertir el texto a trazos y generar PNG de 512 px y `favicon.ico`.

---

## Paleta C · Violeta moderno (tokens)

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `bg` | `#FFFFFF` | `#0E0D14` | Fondo de página |
| `surface` | `#F5F4FA` | `#17151F` | Secciones alternas, tarjetas, formularios |
| `text` | `#16141F` | `#F2F1F7` | Texto principal, llaves del logo |
| `muted` | `#5A5768` | `#A6A3B5` | Texto secundario |
| `border` | `#E3E1EC` | `#2A2736` | Bordes y separadores |
| `accent` | `#6D4AFF` | `#8F75FF` | Botones principales, rombo del logo |
| `onAccent` | `#FFFFFF` | `#0E0D14` | Texto sobre botones de acento |
| `accentText` | `#5B39E8` | `#AA97FF` | Enlaces y etiquetas en color de acento |
| `accentSoft` | `#ECE7FF` | `#231D3D` | Fondos de íconos y placeholders |
| `secondary` | `#0B7A7A` | `#3FD0C9` | Color de apoyo (código, detalles) |

**Contraste WCAG (calculado):**

| Combinación | Claro | Oscuro |
|---|---|---|
| Texto sobre fondo | 18.2:1 | 17.2:1 |
| Texto secundario sobre superficie | 6.4:1 | 7.3:1 |
| Texto de botón sobre acento | 5.2:1 | 5.7:1 |
| Enlaces sobre fondo | 6.6:1 | 7.9:1 |
| Enlaces sobre `accentSoft` | 5.5:1 | 6.5:1 |

Todas superan 4.5:1 (AA para texto normal).

**Implementación:** estos tokens reemplazan los colores de `plugins/vuetify.ts` (temas `light` y `dark`). Los componentes siguen usando `useTheme()`; ningún color se escribe directamente en un componente.

Paletas descartadas (por si se reconsidera): ver `maquetas/Paletas.dc.html`.

---

## Componentes y comportamiento

- **Header (`Nav_Bar.vue`):** fijo arriba; **se oculta al bajar y reaparece al subir** (umbral 80 px), como en `layouts/default.vue` hoy. No se oculta con el menú móvil abierto. Desde 900 px hacia abajo, los enlaces, ES/EN y "Cotizar" pasan a un menú desplegable.
- **Enlace activo:** color `accentText` + subrayado de 2 px en `accent`, con `aria-current="page"`.
- **Botón flotante de WhatsApp:** abajo a la derecha, en todas las páginas, `wa.me/593962163336`.
- **Footer:** nombre, ciudad, año y enlaces principales.
- **Tarjetas:** radio 14–16 px, borde de 1 px, sin sombras (salvo el botón flotante).
- **Botones:** alto mínimo 44 px (táctil); el principal en `accent`, el secundario con borde.
- **Filtros (pills):** el seleccionado se invierte (fondo `text`, texto `bg`) y usa `aria-pressed`.

---

## Pantallas (`maquetas/`)

| Archivo | Ruta | Contenido |
|---|---|---|
| `Main.dc.html` | `/` | Hero, servicios, proceso, casos de éxito con filtro, tecnologías, equipo, cotización |
| `Proyectos.dc.html` | `/proyectos` | Listado con filtro por servicio y estado vacío |
| `Proyecto.dc.html` | `/proyectos/:slug` | Reto, solución, resultado, galería en mosaico con visor, ficha, otros proyectos |
| `Servicio.dc.html` | `/servicios/:slug` | Qué incluye, para quién, tecnologías, proyectos relacionados, FAQ, otros servicios |
| `Perfil.dc.html` | `/equipo/alan-pacheco` | Bio, CV ES/EN, tecnologías y pestañas Proyectos / Certificaciones / Galería |
| `Certificacion.dc.html` | `/certificaciones/:slug` | Detalle de logro con emisor, fecha y verificación |
| `Cotizar.dc.html` | `/cotizar` | Formulario completo y pantalla de "solicitud enviada" |
| `Header.dc.html`, `Footer.dc.html` | — | Componentes compartidos |
| `Logos.dc.html`, `Paletas.dc.html`, `Vista-*.dc.html` | — | Exploración de marca (histórico) |

Los `.dc.html` son el formato del lienzo de diseño: HTML con plantillas `{{ }}` y una clase JS. **No se compilan ni se sirven en el sitio**; son referencia para construir los componentes Vue. Para verlos interactivos, usar el lienzo. La foto de Alan apunta a un recurso del lienzo (`/_blob/...`) y no carga fuera de él.

### SEO ya aplicado en las maquetas

Un solo `<h1>` por página, jerarquía de títulos, breadcrumbs (`BreadcrumbList`), `alt` en imágenes, `width`/`height` en `<img>`, formularios con `<label>`, FAQ apta para `FAQPage`, URLs con slug.

### Contenido pendiente (marcado con `[CORCHETES]` en las maquetas)

- ~~Rangos de presupuesto~~ → definidos en `contenido-inicial.md` (2026-11-10).
- Por proyecto: reto y solución redactados en `contenido-inicial.md` (proyectos académicos, sin cliente ni resultado inventados). Faltan proyectos de clientes reales, imágenes y URLs.
- Datos reales de certificaciones (vienen de la colección `achievements`).
- ~~Plazo típico por tipo de proyecto~~ → estimados en `contenido-inicial.md`.
- ~~Contenido de los 5 servicios~~ → borrador ES/EN en `contenido-inicial.md`, pendiente de revisión de Alan.
- Optimizar `public/About-Image.webp` (7,2 MB → < 200 KB con `srcset`).
