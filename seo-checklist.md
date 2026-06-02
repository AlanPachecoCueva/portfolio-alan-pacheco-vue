# SEO Checklist — Portfolio Alan Pacheco

Auditoría realizada el 2026-06-01. Items ordenados por prioridad de impacto.

---

## Críticos

- [x] **`twitter:image` apunta a `preview.jpg` (no existe)** → corregido a `About-Image.webp`
- [x] **`lang="en"` incorrecto** → cambiado a `lang="es"`
- [x] **`og:description` y `meta description` inconsistentes** → unificados
- [x] **Sin `<link rel="canonical">`** → añadido apuntando a `https://thecodesolutions.com/`
- [x] **Sin JSON-LD (Schema Person)** → añadido en `index.html`
- [x] **Sin `robots.txt`** → creado en `public/robots.txt` con `Disallow: /admin/`
- [x] **Sin `sitemap.xml`** → creado en `public/sitemap.xml` con rutas estáticas

## Pendiente de acción manual (requiere herramienta de diseño)

- [ ] **Imagen OG demasiado grande y con dimensiones incorrectas**
  - Crear una imagen `public/og-preview.jpg` de exactamente **1200×630 px** y **< 500 KB**
  - Puede ser un banner con nombre, rol y foto
  - Actualizar `og:image` y `twitter:image` en `index.html` para apuntar a esta imagen
  - La `About-Image.webp` actual pesa 7.2 MB y es retrato vertical — no sirve como OG image

## Largo plazo (cambio arquitectónico)

- [ ] **SPA sin prerenderizado** — mayor limitante de SEO
  - Google ejecuta JS en segunda pasada (puede tardar días/semanas)
  - El crawler ve `<div id="app"></div>` en el primer renderizado
  - Opciones: migrar a **Nuxt.js** (SSR/SSG) o añadir plugin de prerenderizado (`vite-plugin-ssr`)
  - Sin esto, el portfolio no indexará el contenido de proyectos, habilidades ni descripción personal

---

## Palabras clave objetivo

### Primarias
- `Alan Pacheco Cueva`
- `Alan Pacheco desarrollador software`
- `portafolio desarrollador web Ecuador`

### Secundarias
- `desarrollador full stack Quito`
- `software engineer Ecuador`
- `Vue.js developer Ecuador`

### Long-tail
- `desarrollador web freelance Quito Ecuador`
- `ingeniero software C# Vue.js portafolio`
- `portfolio desarrollador .NET Vue Ecuador`

---

## Recursos útiles
- Google Search Console: https://search.google.com/search-console
- Test OG tags: https://developers.facebook.com/tools/debug/
- Test Twitter Card: https://cards-dev.twitter.com/validator
- Rich Results Test (JSON-LD): https://search.google.com/test/rich-results
- PageSpeed Insights: https://pagespeed.web.dev/
