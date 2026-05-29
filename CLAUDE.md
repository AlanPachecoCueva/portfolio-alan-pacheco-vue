# Portfolio Alan Pacheco — Vue 3

## Descripción
Portafolio personal de Alan Pacheco, Ing. de Software. SPA con secciones de presentación, sobre mí, habilidades, proyectos, contacto, galería fotográfica y logros. Objetivo: vitrina profesional con soporte bilingüe (ES/EN) y alternancia dark/light.

## Stack técnico
- **Framework:** Vue 3 (Options API con composables en `setup()`)
- **Build Tool:** Vite 5 (`npm run dev` / `npm run build`)
- **UI:** Vuetify 3 stable (3.12+) + `vite-plugin-vuetify`
- **Estado:** Composables Vue reactivos (sin Pinia)
- **Backend:** Firebase (Auth + Firestore + Storage)
- **Routing:** Vue Router 4 — rutas públicas + rutas admin (`/admin/**`) con navigation guard
- **i18n:** Vue i18n 9 (ES/EN) — diccionarios en `src/plugins/dictionaries/`
- **Email:** EmailJS (`@emailjs/browser`) — claves en `.env` (prefijo `VITE_`)
- **Alertas:** Vue SweetAlert2
- **Iconos:** Iconify + `@iconify/vue`
- **Tema:** composable `useTheme()` en `src/composables/useTheme.js`

## Estructura de carpetas
```
src/
├── assets/                    # Logos y recursos estáticos
├── components/
│   ├── Nav_Bar.vue
│   ├── admin/                 # Componentes exclusivos del panel admin
│   │   ├── Admin_Nav.vue      # Navbar del admin con timer de inactividad
│   │   ├── Image_Uploader.vue # Drag & drop multi-imagen con progreso
│   │   ├── Image_Picker.vue   # Modal selector de imágenes (single/multi)
│   │   └── Image_Selector.vue # Combinado: drop zone + "Elegir de biblioteca"
│   └── utils/                 # Componentes reutilizables (Card, Grid, Projects, etc.)
├── composables/
│   ├── useTheme.js            # Getters de colores del tema actual
│   ├── useAuth.js             # user, isAdmin, login(), logout()
│   ├── useImages.js           # images, galleryImages, upload(), remove(), toggleGallery()
│   ├── useAlbums.js           # albums (reactivo), create(), update(), remove()
│   ├── useProjects.js         # projects (publicados), allProjects (admin)
│   └── useAchievements.js     # achievements (publicados), allAchievements (admin)
├── firebase/
│   ├── index.js               # Inicialización Firebase (app, db, storage, auth)
│   ├── auth.js                # login(), logout(), onAuthStateChanged()
│   ├── images.js              # CRUD imágenes + Storage upload
│   ├── albums.js              # CRUD álbumes
│   ├── projects.js            # CRUD proyectos
│   └── achievements.js        # CRUD logros
├── plugins/
│   ├── vuetify.js             # Configuración de temas (paleta de colores custom)
│   ├── themeMixin.js          # DEPRECADO — reemplazado por useTheme composable
│   ├── dictionary.js          # Punto de entrada i18n (agrega todos los diccionarios)
│   └── dictionaries/          # Un archivo por sección (home, about, skills, nav-bar, etc.)
└── views/
    ├── General_View.vue        # Layout principal (todas las secciones)
    ├── Home_View.vue           # Hero con parallax
    ├── About_View.vue          # About + CV download (ES/EN PDF)
    ├── Skills_View.vue         # Skills y Tools con tabs animados
    ├── Contact_View.vue        # Formulario EmailJS
    ├── Gallery_View.vue        # Galería masonry — imágenes de Firestore/Storage
    ├── Achievements_View.vue   # Vista pública de logros desde Firestore
    └── admin/
        ├── Admin_Login.vue
        ├── Admin_Projects.vue
        ├── Admin_ProjectForm.vue
        ├── Admin_Achievements.vue
        ├── Admin_AchievementForm.vue
        ├── Admin_Images.vue
        └── Admin_Albums.vue
```

## Rutas
| Path | Componente | Descripción |
|------|-----------|-------------|
| `/` | General_View | Página principal (todas las secciones) |
| `/gallery` | Gallery_View | Galería fotográfica |
| `/achievements` | Achievements_View | Vista pública de logros |
| `/project/:id` | Project_Component | Detalle de proyecto (id = doc ID de Firestore) |
| `/admin/login` | Admin_Login | Login del panel admin |
| `/admin/projects` | Admin_Projects | Gestión de proyectos |
| `/admin/projects/new` | Admin_ProjectForm | Crear proyecto |
| `/admin/projects/:id/edit` | Admin_ProjectForm | Editar proyecto |
| `/admin/achievements` | Admin_Achievements | Gestión de logros |
| `/admin/achievements/new` | Admin_AchievementForm | Crear logro |
| `/admin/achievements/:id/edit` | Admin_AchievementForm | Editar logro |
| `/admin/images` | Admin_Images | Gestión de imágenes |
| `/admin/albums` | Admin_Albums | Gestión de álbumes |

El router tiene un navigation guard en `/admin/**` que verifica si el usuario está en la colección `admins` de Firestore. El `document.title` se actualiza automáticamente en `router.afterEach`.

## Firebase — Colecciones Firestore
- **`images`**: `{ url, storagePath, title, description, date, album (albumId), sizeFactor, showInGallery, uploadedAt }`
- **`albums`**: `{ name, description, createdAt }`
- **`projects`**: `{ title, description_es, description_en, date, url, category, technology, relatedTechnologies[], thumbnailImageId, thumbnailUrl, imageIds[], imageUrls[{url,columns,rows}], gridColumns, gridRows, order, published, createdAt }`
- **`achievements`**: `{ title, description_es, description_en, date, type, issuer, link, thumbnailImageId, thumbnailUrl, imageIds[], imageUrls[{url}], order, published, createdAt }`
- **`admins`**: `{ uid }` — colección que define qué usuarios son administradores

## Composable useTheme
Todos los colores del tema se obtienen vía `useTheme()` de `src/composables/useTheme.js`.

```js
import { useTheme } from '@/composables/useTheme'

export default {
  setup() {
    return useTheme()  // expone getPrimaryColor(), getHeroColor(), etc.
  },
  methods: {
    someMethod() {
      const color = this.getPrimaryColor()  // disponible via this en Options API
    }
  }
}
```

**Getters disponibles:** `getPrimaryColor()`, `getSecondaryColor()`, `getHeaderColor()`, `getHeroColor()`, `getContrastColor()`, `getBackgroundColor()`, `getTextColor()`, `getTextAuxiliarColor()`, `getAuxiliarColor()`, `getAlternativeButtonColor()`

## Imágenes
Todas las imágenes de proyectos, logros y galería están en **Firebase Storage** y sus URLs se cachean en los documentos de Firestore. No se usa `import.meta.glob` para imágenes de proyectos/logros/galería.

Para iconos u otros assets estáticos del template: usar `src="..."` sin binding (Vite los resuelve automáticamente).

## Variables de entorno (.env)
```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```
En código: `import.meta.env.VITE_FIREBASE_API_KEY` (NO `process.env`).

## Convenciones de código
- **Naming:** PascalCase para componentes y archivos Vue (`Nav_Bar.vue`, `Card_Component.vue`)
- **Estilos:** CSS con scope en cada componente; variables de color via `useTheme` (no usar colores hardcodeados). El panel admin importa `@/assets/admin.css` para estilos comunes.
- **i18n:** Cualquier texto visible al usuario en vistas públicas debe ir en los diccionarios de `src/plugins/dictionaries/`
- **Imágenes estáticas en templates:** usar `src="..."` sin binding (Vite las resuelve automáticamente)
- **NO usar `require()`** — no es compatible con Vite

## Comandos de desarrollo
```bash
npm run dev      # Servidor de desarrollo (localhost:5173)
npm run build    # Build de producción
npm run preview  # Preview del build de producción
npm run lint     # Linting con ESLint
```

## Notas importantes
- **Cursor personalizado:** Implementado directamente en `App.vue` con JS puro (dos divs animados)
- **Navbar:** Se oculta/muestra via scroll en `App.vue`; estado de transparencia también depende del scroll
- **Galería:** Las fotos se mezclan aleatoriamente al cargar (`Gallery_View.vue`); datos desde Firestore con `showInGallery: true`
- **CV:** Existen dos versiones del CV (ES y EN) en `public/`; el botón de descarga en About cambia según el idioma activo
- **themeMixin.js:** El archivo sigue existiendo pero ya NO se registra globalmente en `main.js`. Usar el composable.
- **SEO:** Los meta tags estáticos están en el `index.html` raíz. El router actualiza `document.title` por ruta via `router.afterEach`.
- **Admin session:** Timer de inactividad de 3 horas con aviso 60s antes. Sesión persistente con `browserLocalPersistence`.
- **Queries Firestore:** Evitar combinar `where` + `orderBy` en la misma query sin crear el índice compuesto correspondiente en Firebase Console. Si aparece error de índice en consola, usar el link del error para crearlo.
