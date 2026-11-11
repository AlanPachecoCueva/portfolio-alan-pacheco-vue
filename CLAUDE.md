# CLAUDE.md — Portfolio Alan Pacheco

Archivo cargado automáticamente por Claude Code en cada sesión. Es una guía de comportamiento operativo, no solo documentación técnica.

## Documentación adicional

| Documento | Cuándo consultar | Qué agregar ahí |
|---|---|---|
| [`.claude/memoria-tecnica/Overview_Tecnico.md`](.claude/memoria-tecnica/Overview_Tecnico.md) | Referencia técnica completa del sistema | Cambios de arquitectura, flujos detallados, schemas de Firestore |
| [`.claude/memoria-tecnica/Errores_Conocidos.md`](.claude/memoria-tecnica/Errores_Conocidos.md) | **Ante cualquier bug nuevo, revisar primero** | Bugs, errores de configuración, gotchas de deploy |
| [`.claude/memoria-tecnica/Decisiones_Arquitectura.md`](.claude/memoria-tecnica/Decisiones_Arquitectura.md) | Al evaluar cambios de diseño o arquitectura | Decisiones no obvias con alternativas descartadas |
| [`.claude/memoria-tecnica/Glosario.md`](.claude/memoria-tecnica/Glosario.md) | Ante términos del dominio desconocidos | Términos del proyecto, secciones, acrónimos |
| [`.claude/memoria-tecnica/Deploy_Historial.md`](.claude/memoria-tecnica/Deploy_Historial.md) | Al subir versiones o ejecutar acciones de distribución | Releases, deploys, cambios en Netlify, fechas clave |
| [`.claude/memoria-tecnica/Seguridad_Dependencias.md`](.claude/memoria-tecnica/Seguridad_Dependencias.md) | **Antes de añadir o actualizar cualquier dependencia** | Auditorías `npm audit` (AUD-XXX), procedimiento de verificación, dependencias descartadas |
| [`docs/diseno-thecodesolutions/README.md`](docs/diseno-thecodesolutions/README.md) | **Al construir o refactorizar cualquier pantalla pública** (marca, tokens, componentes, maquetas) | Cambios de marca, nuevas maquetas, contenido pendiente resuelto |

> **Regla permanente:** Ante cualquier bug nuevo, revisar `.claude/memoria-tecnica/Errores_Conocidos.md` antes de empezar el análisis.

---

## Reglas de documentación

1. **Proactividad:** Si el usuario menciona haber completado una acción manual (deploy a Netlify, configuración en Firebase Console, decisión de producto, etc.), proponer actualizar la documentación correspondiente sin esperar que lo pida.
2. **Deploys a producción: uno solo, al final de la migración.** Netlify cobra créditos por deploy. No proponer deploys intermedios ni activar Deploy Previews o branch deploys; solo `main` despliega. Excepción: hotfix crítico confirmado por el usuario. Ver "Política de deploys" en `Deploy_Historial.md`.
3. **Deploy:** Cualquier acción de distribución (nuevo deploy, cambio de dominio, configuración de env vars en Netlify) → actualizar `Deploy_Historial.md` inmediatamente.
4. **Sin duplicación:** Si un gotcha tiene su entrada completa en `Decisiones_Arquitectura.md`, el gotcha en este archivo debe ser solo una referencia breve.
5. **Fecha de actualización:** Al modificar cualquier archivo de memoria técnica, actualizar el campo `_Última actualización_` al inicio del archivo.
6. **El usuario se comunica en español.** Responder siempre en español en este proyecto.

---

## Principios permanentes de desarrollo

1. **Código seguro — dependencias:** Antes de instalar o actualizar cualquier librería, verificar que la versión exacta no tenga vulnerabilidades conocidas (GitHub Advisory / OSV / `npm audit`) siguiendo el procedimiento de `Seguridad_Dependencias.md`, y registrar el resultado ahí. Nunca `npm audit fix --force`. **Apetito de riesgo (DA-008):** se aceptan como máximo vulnerabilidades de severidad baja o media (documentadas); altas y críticas no se aceptan y bloquean merge y deploy (`npm audit --audit-level=high` debe pasar). Preferir no añadir dependencias si se resuelve con código propio o con lo que ya trae Nuxt/Vuetify.
2. **Código seguro — aplicación:** No usar `v-html` con datos de Firestore sin sanitizar; validar en `firestore.rules`/`storage.rules` (las reglas son la única defensa real); no exponer secretos más allá de la config pública de Firebase/EmailJS.
3. **SEO desde el código:** Toda página pública nueva o refactorizada debe salir con: `useSeoMeta` (title, description, OG, Twitter) por idioma, canonical, `hreflang`, un solo `<h1>` y jerarquía de headings correcta, `alt` en imágenes, `width`/`height` para evitar CLS, datos estructurados JSON-LD cuando aplique, y estar incluida en el prerender y en el sitemap. Se revisa antes de dar una tarea por terminada.

---

## Propósito

Web comercial de **TheCodeSolutions** (antes, portafolio personal de **Alan Pacheco Cueva**, fundador). Ofrece servicios de software a medida, muestra proyectos como casos de éxito y presenta al equipo. Bilingüe (ES en `/`, EN en `/en/...`) con tema claro/oscuro. Migración en curso en la rama `feature/thecodesolutions`; el portafolio viejo está respaldado en `legacy/portfolio-personal`.

**Páginas públicas:** home (hero, servicios, proceso, proyectos, tecnologías, equipo, cotización), `/servicios/:slug`, `/proyectos/:slug`, `/equipo/:slug` (perfil con certificaciones y galería).

**Panel admin privado (`/admin/**`):** leads, servicios, proyectos, equipo, logros, imágenes y álbumes. Protegido por Firebase Auth + colección `admins`.

---

## Stack

| Tecnología | Versión | Notas |
|---|---|---|
| Vue | ^3.2.13 | Composition API + Options API mixto |
| Nuxt | ^4.6.4 | Meta-framework SSG (pre-render estático) |
| Vuetify | ^3.7.0 | UI Material Design 3, temas light/dark. `plugins/vuetify.ts` registra solo los componentes usados (hoy `VApp`); al usar uno nuevo, agregarlo ahí |
| @nuxtjs/i18n | ^10.6.0 | i18n bilingüe ES/EN — archivos en `i18n/locales/`. Trae su propio `vue-i18n` 11 (no instalarlo como dependencia directa) |
| Firebase | ^12.19.0 | Auth (email + Google), Firestore, Storage. `overrides` fuerza `@grpc/grpc-js` 1.14.6 (ver AUD-002 en `Seguridad_Dependencias.md`) |
| @emailjs/browser | ^4.4.1 | Aviso por correo de las cotizaciones (además se guardan en `leads`). Se carga solo al enviar. Ver ERR-019 |
| @iconify/vue | ^4.1.2 | Iconos vectoriales con `<Icon>` |
| vue-sweetalert2 | ^5.0.11 | Modales de alerta |
| ESLint | ^8.57.0 | Linting (`eslint-plugin-vue`) |

**Build:** `nuxt generate` (Nitro static preset) → output en `.output/public/`
**Deploy:** Netlify (SSG + SPA fallback para rutas dinámicas)
**URL:** https://thecodesolutions.com/

---

## Arquitectura

```
./                                 ← raíz del proyecto (Nuxt 4)
│
├── pages/                         ← Rutas file-based (Nuxt auto-router)
│   ├── index.vue                  ← / y /en (home de TheCodeSolutions, layout site)
│   ├── servicios/[slug].vue       ← /servicios/:slug (FAQ + JSON-LD Service/FAQPage)
│   ├── proyectos/[slug].vue       ← /proyectos/:slug (caso de éxito + galería)
│   ├── equipo/[slug].vue          ← /equipo/:slug (perfil: proyectos, certificaciones, galería)
│   ├── project/[id].vue           ← URL vieja: solo redirige a /proyectos/:slug
│   └── admin/                     ← leads, services, projects, team, achievements, images, albums, login (i18n: false)
│
├── components/
│   ├── site/                      ← Site_Header, Site_Footer, Site_Logo, Site_Language, Site_Hero, Site_Services, Site_Process, Site_Projects, Site_Team, Site_Quote, Site_Gallery
│   ├── admin/                     ← Admin_Nav, Image_Uploader, Image_Picker, Image_Selector, *_Form, Tags_Input
│   └── utils/                     ← Theme_Selector_Component
│
├── composables/                   ← usePublicContent, usePublicProfile (lectura pública para SSG), useAuth, useTheme, useImages, useAlbums, useProjects, useAchievements, useServices, useTeam, useLeads
├── layouts/
│   ├── site.vue                   ← Layout público (Site_Header, Site_Footer, fuentes, hreflang/canonical)
│   └── admin.vue                  ← Layout admin (solo <div> base — Admin_Nav va en cada página)
├── error.vue                      ← 404/errores con el layout site (noindex)
├── middleware/auth.ts             ← Guard Nuxt: protege /admin/** (verifica Firebase Auth + colección admins)
├── server/routes/sitemap.xml.js   ← Sitemap generado en el build (se pre-renderiza)
├── utils/
│   ├── firebase/                  ← SDK cliente: index, auth, images, albums, projects, achievements, services, team, leads
│   ├── firestore-public.js        ← Lectura pública por REST (prerender + cliente)
│   ├── founder.js, site-contact.js, localized.js, service-icons.js, slug.js, seo.js
│   ├── image-compress.js          ← redimensiona/comprime en el navegador antes de subir a Storage (ERR-021)
├── plugins/                       ← vuetify.ts (tokens tcs-* paleta C), iconify.ts, sweetalert.client.ts
├── i18n/locales/                  ← es.json / en.json (textos del sitio bajo la clave `site`)
├── assets/                        ← site.css (estilos de la marca), admin.css
├── public/                        ← favicon.svg/.ico, logo-tcs.svg, CVs (ES/EN PDF), images/alan-pacheco-*.png, robots.txt
├── docs/diseno-thecodesolutions/  ← marca, tokens, maquetas y contenido inicial
├── scripts/                       ← scripts de datos de un solo uso (los ejecuta el dueño con gcloud)
├── firestore.rules                ← fuente de verdad de las reglas (deploy manual en la consola)
├── nuxt.config.ts
└── netlify.toml                   ← redirecciones 301 de URLs viejas + SPA fallback a /200.html
```

---

## Rutas principales

| Path | Página | Requiere auth |
|---|---|---|
| `/`, `/en` | `pages/index.vue` | No |
| `/servicios/:slug` (+ `/en/...`) | `pages/servicios/[slug].vue` | No |
| `/proyectos/:slug` (+ `/en/...`) | `pages/proyectos/[slug].vue` | No |
| `/equipo/:slug` (+ `/en/...`) | `pages/equipo/[slug].vue` | No |
| `/project/:id` | redirige a `/proyectos/:slug` | No |
| `/gallery`, `/achievements`, `/achievement/*` | 301 en `netlify.toml` → `/equipo/alan-pacheco#galeria` / `#certificaciones` | No |
| `/admin/login` | `pages/admin/login.vue` | No |
| `/admin/leads`, `/admin/services/**`, `/admin/projects/**`, `/admin/team/**`, `/admin/achievements/**`, `/admin/images`, `/admin/albums` | `pages/admin/...` | Sí |

**Auth guard (`middleware/auth.ts`):** Se ejecuta solo en cliente. Verifica Firebase Auth + que el `uid` exista en colección `admins`. Redirige a `/admin/login` si falla.

---

## Base de datos (Firestore)

| Colección | Schema |
|---|---|
| `images` | `{ url, storagePath, title, description, date, album (albumId), sizeFactor, showInGallery, uploadedAt }` |
| `albums` | `{ name, description, createdAt }` |
| `projects` | `{ title, description_es, description_en, date, url, category, technology, relatedTechnologies[], thumbnailImageId, thumbnailUrl, imageIds[], imageUrls[{url,columns,rows}], gridColumns, gridRows, order, published, createdAt` + TheCodeSolutions (opcionales): `slug, serviceIds[], teamMemberIds[], client, challenge_es/en, solution_es/en, result_es/en, featured }` |
| `achievements` | `{ title, description_es, description_en, date, type, issuer, link, thumbnailImageId, thumbnailUrl, imageIds[], imageUrls[{url}], order, published, createdAt` + `teamMemberId` (null = logro de la empresa), `slug }` |
| `services` | `{ slug, title_es, title_en, summary_es, summary_en, body_es, body_en, icon, includes_es[], includes_en[], technologies[], faqs[], order, published, createdAt }` |
| `team` | `{ slug, name, role_es, role_en, bio_es, bio_en, photoImageId, photoUrl, skills[], links{linkedin,github,web}, cvUrl_es, cvUrl_en, showGallery, order, published, createdAt }` |
| `leads` | `{ name, company, email, phone, service, budget, timeline, message, locale, status, createdAt }` — creación pública validada; lectura y gestión solo admin. `status`: nuevo · contactado · cotizado · ganado · perdido |
| `admins` | `{ uid }` — define qué usuarios son administradores |

**Reglas:** versionadas en `firestore.rules` (raíz). El deploy es manual: Firebase Console → Firestore → Reglas. Las consultas públicas a colecciones publicables deben incluir `where('published', '==', true)` o las reglas las rechazan.

---

## Variables de entorno

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

En Nuxt 3: acceso vía `useRuntimeConfig().public.*` (configurar en `nuxt.config.ts` bajo `runtimeConfig.public`). En utils/firebase: `import.meta.env.VITE_*` funciona directamente porque Vite lo resuelve en build time. **No usar `process.env`.**

---

## Comandos de desarrollo

```bash
npm run dev      # Servidor de desarrollo (localhost:3000)
npm run build    # Genera sitio estático en .output/public/ (nuxt generate)
npm run preview  # Preview del sitio generado
npm run lint     # Linting con ESLint
```

---

## Convenciones de código

- **Naming:** componentes con guion bajo y mayúsculas (`Site_Header.vue`, `Service_Form.vue`)
- **Estilos:** CSS scoped en cada componente. Colores del sitio siempre con los tokens `rgb(var(--v-theme-tcs-*))` (o `useTheme().getBrandColor()`), nunca hardcodeados. Estilos compartidos en `assets/site.css`
- **Admin styles:** Las páginas admin importan `@/assets/admin.css` para estilos comunes
- **i18n:** Todo texto visible al usuario en páginas públicas debe ir en `i18n/locales/es.json` y `en.json`
- **Imágenes estáticas en templates:** `src="..."` sin binding (Nuxt/Vite las resuelve en build)
- **NO usar `require()`** — no compatible con Vite

---

## Gotchas técnicos

1. **Sin `src/`:** el código legacy del portafolio (`src/views`, `Nav_Bar`, `layouts/default.vue`) se eliminó en la Fase 3. Está en la rama `legacy/portfolio-personal`.
2. **Hidratación SSG + Firebase Auth:** El middleware `auth.ts` solo se ejecuta en cliente. No usar `useAuth()` en el lado servidor — puede causar hydration mismatch.
3. **Rutas dinámicas en SSG:** servicios, proyectos y perfiles publicados se pre-renderizan (el crawler sigue los enlaces de la home). Lo publicado después del último build se sirve por el SPA fallback (`/200.html`) y se completa en el cliente.
4. **`nuxt generate` vs `nuxt build`:** Este proyecto usa `nuxt generate` (SSG). `nuxt build` generaría un servidor Node.js, que Netlify podría detectar y activar SSR — error conocido (ver Errores_Conocidos.md).
5. **Índices Firestore:** Evitar `where` + `orderBy` en la misma query sin crear el índice compuesto en Firebase Console. Si aparece error de índice en consola del navegador, el error incluye un link directo para crearlo.
6. **Admin session timeout:** Timer de inactividad de 3 horas con aviso 60 segundos antes. Implementado en `Admin_Nav.vue`. Sesión persistente con `browserLocalPersistence`.
7. **Sin cursor personalizado:** se fue con `layouts/default.vue`. El header que se oculta al bajar vive en `Site_Header.vue`.
8. **Galería:** está en el perfil (`/equipo/alan-pacheco#galeria`), ordenada por fecha de subida. Ya no se mezcla al azar: en HTML estático el orden aleatorio causaría desajustes de hidratación.
9. **CVs descargables:** `CV-Alan Pacheco-ESP.pdf` y `CV-Alan Pacheco-ENG.pdf` en `public/`. Se enlazan desde el perfil (`cvUrl_es`/`cvUrl_en` del miembro o `utils/founder.js`), con la URL codificada por los espacios.
10. **`npm run serve` no existe:** El README.md raíz está desactualizado (era de Vue CLI). Usar `npm run dev`.
11. **Options API + `<script setup>` no se mezclan:** un `<script setup>` sobrescribe el `setup()` de opciones del mismo SFC. En páginas con Options API, `definePageMeta(...)` va en el `<script>` normal (ver ERR-013).
12. **Formularios del admin:** clase `.admin-form` y estilos compartidos en `assets/admin.css` (ERR-014). Formularios compartidos entre "nuevo" y "editar" en `components/admin/*_Form.vue`: emiten solo los campos del esquema (nunca `updateDoc` con `...this.form`, ver ERR-015). URLs que se pintan como `href` público se validan (`https://` o `http(s)://`). Las imágenes se suben redimensionadas (máx. 1920 px, JPEG 82 o WebP si tienen transparencia) desde `uploadImage` (ERR-021).
13. **URLs por idioma (DA-011):** español en `/`, inglés en `/en/...`. Códigos de locale en minúsculas (`$i18n.locale === 'en'`). Enlaces públicos siempre con `$localePath(...)` (las rutas se llaman `index___es`/`index___en`). Las páginas del admin llevan `i18n: false` en `definePageMeta`. Una página pública nueva va al prerender y a `public/sitemap.xml` en ambos idiomas.
14. **Contenido público y SEO:** `usePublicContent()` lee servicios, proyectos y equipo publicados por la API REST de Firestore (`utils/firestore-public.js`) en el prerender, así quedan en el HTML; en el cliente se vuelve a pedir al montar. Las páginas de TheCodeSolutions usan `definePageMeta({ layout: 'site' })`, `useSeoMeta` con textos de `site.*` en i18n y los estilos de `assets/site.css` (tokens `tcs-*`).
