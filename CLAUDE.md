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

Portfolio personal de **Alan Pacheco Cueva**, Ingeniero de Software ecuatoriano. Web bilingüe (ES/EN) con modo dark/light que sirve como vitrina profesional para reclutadores, clientes freelance y colaboradores.

**Secciones públicas:** Hero, About + CV descargable, Skills, Portfolio de proyectos, Galería fotográfica, Logros/Certificaciones, Contacto.

**Panel admin privado (`/admin/**`):** CRUD de proyectos, logros, imágenes y álbumes. Protegido por Firebase Auth + colección `admins`.

---

## Stack

| Tecnología | Versión | Notas |
|---|---|---|
| Vue | ^3.2.13 | Composition API + Options API mixto |
| Nuxt | ^4.6.4 | Meta-framework SSG (pre-render estático) |
| Vuetify | ^3.7.0 | UI Material Design 3, temas light/dark. `plugins/vuetify.ts` registra solo los componentes usados (`VApp`, `VSelect`); al usar uno nuevo, agregarlo ahí |
| @nuxtjs/i18n | ^10.6.0 | i18n bilingüe ES/EN — archivos en `i18n/locales/`. Trae su propio `vue-i18n` 11 (no instalarlo como dependencia directa) |
| Firebase | ^12.19.0 | Auth (email + Google), Firestore, Storage. `overrides` fuerza `@grpc/grpc-js` 1.14.6 (ver AUD-002 en `Seguridad_Dependencias.md`) |
| @emailjs/browser | ^4.4.1 | Formulario de contacto sin backend propio |
| @iconify/vue | ^4.1.2 | Iconos vectoriales con `<Icon>` |
| vue-sweetalert2 | ^5.0.11 | Modales de alerta |
| ESLint | ^8.57.0 | Linting (`eslint-plugin-vue`) |

**Build:** `nuxt generate` (Nitro static preset) → output en `.output/public/`
**Deploy:** Netlify (SSG + SPA fallback para rutas dinámicas)
**URL:** https://thecodesolutions.com/

---

## Arquitectura

```
./                                 ← raíz del proyecto (Nuxt 3, NO src/)
│
├── pages/                         ← Rutas file-based (Nuxt auto-router)
│   ├── index.vue                  ← / (todas las secciones en una página)
│   ├── gallery.vue                ← /gallery
│   ├── achievements.vue           ← /achievements
│   ├── achievement/[id].vue       ← /achievement/:id
│   ├── project/[id].vue           ← /project/:id
│   └── admin/
│       ├── login.vue              ← /admin/login
│       ├── images.vue             ← /admin/images
│       ├── albums.vue             ← /admin/albums
│       ├── projects/index.vue     ← /admin/projects
│       ├── projects/new.vue       ← /admin/projects/new
│       ├── projects/[id]/edit.vue ← /admin/projects/:id/edit
│       ├── achievements/index.vue ← /admin/achievements
│       ├── achievements/new.vue   ← /admin/achievements/new
│       └── achievements/[id]/edit.vue
│
├── components/
│   ├── Nav_Bar.vue
│   ├── admin/                     ← Admin_Nav, Image_Uploader, Image_Picker, Image_Selector
│   └── utils/                     ← Card, Grid, Language_Selector, Project, Projects, Theme_Selector
│
├── composables/                   ← useAuth, useTheme, useImages/useGalleryImages, useAlbums, useProjects/usePublishedProjects, useAchievements/usePublishedAchievements, useServices/usePublishedServices, useTeam/usePublishedTeam, useLeads/useCreateLead
├── layouts/
│   ├── default.vue                ← Layout público (cursor + scroll logic + navbar + contenido)
│   └── admin.vue                  ← Layout admin (solo <div> base — Admin_Nav va en cada página)
├── middleware/
│   └── auth.ts                    ← Guard Nuxt: protege /admin/** (verifica Firebase Auth + colección admins)
├── utils/
│   └── firebase/                  ← index.js, auth.js, images.js, albums.js, projects.js, achievements.js
├── plugins/
│   ├── vuetify.ts                 ← Configuración de temas (paleta custom light/dark)
│   ├── iconify.ts
│   └── sweetalert.client.ts
├── i18n/
│   └── locales/
│       ├── es.json                ← Strings en español
│       └── en.json                ← Strings en inglés
├── assets/                        ← Imágenes estáticas, admin.css
├── public/                        ← favicon, CVs (ES/EN PDF), sitemap.xml, robots.txt
├── app/
│   └── router.options.ts
├── app.vue                        ← Root component (cursor personalizado aquí)
├── nuxt.config.ts
└── netlify.toml
```

---

## Rutas principales

| Path | Página | Requiere auth |
|---|---|---|
| `/` | `pages/index.vue` | No |
| `/gallery` | `pages/gallery.vue` | No |
| `/achievements` | `pages/achievements.vue` | No |
| `/achievement/:id` | `pages/achievement/[id].vue` | No |
| `/project/:id` | `pages/project/[id].vue` | No |
| `/admin/login` | `pages/admin/login.vue` | No |
| `/admin/projects` | `pages/admin/projects/index.vue` | Sí |
| `/admin/projects/new` | `pages/admin/projects/new.vue` | Sí |
| `/admin/projects/:id/edit` | `pages/admin/projects/[id]/edit.vue` | Sí |
| `/admin/achievements` | `pages/admin/achievements/index.vue` | Sí |
| `/admin/achievements/new` | `pages/admin/achievements/new.vue` | Sí |
| `/admin/achievements/:id/edit` | `pages/admin/achievements/[id]/edit.vue` | Sí |
| `/admin/images` | `pages/admin/images.vue` | Sí |
| `/admin/albums` | `pages/admin/albums.vue` | Sí |

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

- **Naming:** PascalCase para componentes (`Nav_Bar.vue`, `Card_Component.vue`)
- **Estilos:** CSS scoped en cada componente. Colores siempre vía `useTheme()`, nunca hardcodeados
- **Admin styles:** Las páginas admin importan `@/assets/admin.css` para estilos comunes
- **i18n:** Todo texto visible al usuario en páginas públicas debe ir en `i18n/locales/es.json` y `en.json`
- **Imágenes estáticas en templates:** `src="..."` sin binding (Nuxt/Vite las resuelve en build)
- **NO usar `require()`** — no compatible con Vite
- **themeMixin.js:** Archivo legacy que ya NO se registra globalmente. Usar `useTheme()` composable

---

## Gotchas técnicos

1. **`src/views/` no está vacío:** Aunque DA-001 indicaba que `src/` quedó como legacy vacío, en realidad `src/views/` contiene las vistas de secciones del portfolio (Home_View, About_View, Skills_View, Contact_View) que siguen siendo importadas desde `pages/index.vue`. Las vistas admin en `src/views/admin/` sí son legacy y no se usan.
2. **Hidratación SSG + Firebase Auth:** El middleware `auth.ts` solo se ejecuta en cliente. No usar `useAuth()` en el lado servidor — puede causar hydration mismatch.
3. **Rutas dinámicas en SSG:** `/project/:id` y `/achievement/:id` no se pre-renderizan (requeriría conocer todos los IDs en build time). Se sirven vía SPA fallback de Netlify (`/* → /index.html`).
4. **`nuxt generate` vs `nuxt build`:** Este proyecto usa `nuxt generate` (SSG). `nuxt build` generaría un servidor Node.js, que Netlify podría detectar y activar SSR — error conocido (ver Errores_Conocidos.md).
5. **Índices Firestore:** Evitar `where` + `orderBy` en la misma query sin crear el índice compuesto en Firebase Console. Si aparece error de índice en consola del navegador, el error incluye un link directo para crearlo.
6. **Admin session timeout:** Timer de inactividad de 3 horas con aviso 60 segundos antes. Implementado en `Admin_Nav.vue`. Sesión persistente con `browserLocalPersistence`.
7. **Cursor personalizado:** Implementado en `layouts/default.vue` (NO en `app.vue`). `app.vue` es solo `<NuxtLayout><NuxtPage /></NuxtLayout>`. El cursor y la lógica de scroll/hide del navbar están en `DefaultLayout`. No modificar sin revisar el efecto en mobile (cursor no visible en touch).
8. **Galería aleatoria:** Las imágenes se mezclan aleatoriamente al cargar la página. Es comportamiento intencional — no un bug.
9. **CVs descargables:** Hay dos versiones (`CV-Alan Pacheco-ESP.pdf` y `CV-Alan Pacheco-ENG.pdf`) en `public/`. El botón en la sección About cambia según `$i18n.locale`.
10. **`npm run serve` no existe:** El README.md raíz está desactualizado (era de Vue CLI). Usar `npm run dev`.
11. **Options API + `<script setup>` no se mezclan:** un `<script setup>` sobrescribe el `setup()` de opciones del mismo SFC. En páginas con Options API, `definePageMeta(...)` va en el `<script>` normal (ver ERR-013).
12. **Formularios del admin:** clase `.admin-form` y estilos compartidos en `assets/admin.css` (ERR-014). Formularios compartidos entre "nuevo" y "editar" en `components/admin/*_Form.vue`: emiten solo los campos del esquema (nunca `updateDoc` con `...this.form`, ver ERR-015). URLs que se pintan como `href` público se validan (`https://` o `http(s)://`).
13. **URLs por idioma (DA-011):** español en `/`, inglés en `/en/...`. Códigos de locale en minúsculas (`$i18n.locale === 'en'`). Enlaces públicos siempre con `$localePath(...)` (las rutas se llaman `index___es`/`index___en`). Las páginas del admin llevan `i18n: false` en `definePageMeta`. Una página pública nueva va al prerender y a `public/sitemap.xml` en ambos idiomas.
