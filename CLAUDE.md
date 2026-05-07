# Portfolio Alan Pacheco — Vue 3

## Descripción
Portafolio personal de Alan Pacheco, Ing. de Software. SPA con secciones de presentación, sobre mí, habilidades, proyectos, contacto y galería fotográfica. Objetivo: vitrina profesional con soporte bilingüe (ES/EN) y alternancia dark/light.

## Stack técnico
- **Framework:** Vue 3 (Options API con composables en `setup()`)
- **Build Tool:** Vite 5 (`npm run dev` / `npm run build`)
- **UI:** Vuetify 3 stable (3.12+) + `vite-plugin-vuetify`
- **Estado:** Pinia (store de proyectos con persistencia en localStorage)
- **Routing:** Vue Router 4 (4 rutas + ruta dinámica `/project/:id`)
- **i18n:** Vue i18n 9 (ES/EN) — diccionarios en `src/plugins/dictionaries/`
- **Email:** EmailJS (`@emailjs/browser`) — claves en `.env` (prefijo `VITE_`)
- **Alertas:** Vue SweetAlert2
- **Iconos:** Iconify + `@iconify/vue`
- **Tema:** composable `useTheme()` en `src/composables/useTheme.js`

## Estructura de carpetas
```
src/
├── assets/                   # Imágenes, logos, screenshots de proyectos
│   └── projects/             # Imágenes por proyecto (CowID, Guru, Kvmi, Mikhuna)
├── components/
│   ├── Nav_Bar.vue
│   └── utils/                # Componentes reutilizables (Card, Grid, Projects, etc.)
├── composables/
│   └── useTheme.js           # Composable con getters de colores del tema actual
├── plugins/
│   ├── vuetify.js            # Configuración de temas (paleta de colores custom)
│   ├── themeMixin.js         # DEPRECADO — reemplazado por useTheme composable
│   ├── dictionary.js         # Punto de entrada i18n (agrega todos los diccionarios)
│   ├── dictionaries/         # Un archivo por sección (home, about, skills, etc.)
│   └── stores/
│       ├── projectsStore.js   # Pinia store (project, allProjects)
│       └── projects.js        # Datos estáticos de proyectos
└── views/
    ├── General_View.vue       # Layout principal (agrega todas las secciones)
    ├── Home_View.vue          # Hero con parallax
    ├── About_View.vue         # About + CV download (ES/EN PDF)
    ├── Skills_View.vue        # Skills y Tools con tabs animados
    ├── Contact_View.vue       # Formulario EmailJS
    └── Gallery_View.vue       # Galería masonry (~60 fotos)
```

## Rutas
| Path | Componente | Descripción |
|------|-----------|-------------|
| `/` | General_View | Página principal (todas las secciones) |
| `/about` | About_View | Sección about standalone |
| `/gallery` | Gallery_View | Galería fotográfica |
| `/project/:id` | Project_Component | Detalle de proyecto |

El router actualiza `document.title` automáticamente por ruta (SEO).

## Composable useTheme
Todos los colores del tema se obtienen vía `useTheme()` de `src/composables/useTheme.js`.

```js
// En cualquier componente Vue:
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

## Imágenes dinámicas de proyectos
Las imágenes de proyectos están en `src/assets/projects/` y se cargan con `import.meta.glob`:

```js
const projectImages = import.meta.glob('/src/assets/projects/**', { eager: true, import: 'default' })

methods: {
  getProjectImage(imagePath) {
    const img = projectImages[`/src/assets/${imagePath}`]
    return img?.default || img
  }
}
```
El campo `image` en `projects.js` usa paths relativos a `src/assets/` (ej: `"projects/Kvmi/Rewards - Registro.jpeg"`).

## Variables de entorno (.env)
```
VITE_EMAILJS_SERVICE_ID=service_nxvebz4
VITE_EMAILJS_TEMPLATE_ID=contact_form
VITE_EMAILJS_PUBLIC_KEY=d1_C1Va1lFFO3oWRV
```
En código: `import.meta.env.VITE_EMAILJS_SERVICE_ID` (NO `process.env`).

## Convenciones de código
- **Naming:** PascalCase para componentes y archivos Vue (`Nav_Bar.vue`, `Card_Component.vue`)
- **Estilos:** CSS con scope en cada componente; variables de color via `useTheme` (no usar colores hardcodeados)
- **i18n:** Cualquier texto visible al usuario debe ir en los diccionarios de `src/plugins/dictionaries/`
- **Imágenes estáticas en templates:** usar `src="..."` sin binding (Vite las resuelve automáticamente)
- **Imágenes dinámicas:** usar `import.meta.glob` + método `getProjectImage(path)`
- **NO usar `require()`** — no es compatible con Vite

## Datos de proyectos
Los proyectos están definidos como array estático en `src/plugins/stores/projects.js`. Cada proyecto tiene:
- `title`, `description`, `date`, `image` (thumbnail), `url`
- `columns`, `rows` (tamaño en el CSS grid de la vista de portafolio)
- `technology`, `relatedTechnologies[]`
- `images[]` (screenshots con `cols` y `rows` para el grid interno)

## Comandos de desarrollo
```bash
npm run dev      # Servidor de desarrollo (localhost:5173) — arranque ~700ms
npm run build    # Build de producción
npm run preview  # Preview del build de producción
npm run lint     # Linting con ESLint
```

## Notas importantes
- **Cursor personalizado:** Implementado directamente en `App.vue` con JS puro (dos divs animados)
- **Navbar:** Se oculta/muestra via scroll en `App.vue`; estado de transparencia también depende del scroll
- **Galería:** Las fotos se mezclan aleatoriamente al cargar (`Gallery_View.vue`)
- **CV:** Existen dos versiones del CV (ES y EN) en `public/`; el botón de descarga en About cambia según el idioma activo
- **themeMixin.js:** El archivo sigue existiendo pero ya NO se registra globalmente en `main.js`. Usar el composable.
- **SEO:** Los meta tags estáticos están en el `index.html` raíz. El router actualiza `document.title` por ruta via `router.afterEach`.
