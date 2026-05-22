# Admin Module — Arquitectura y Decisiones de Diseño

> Documento de referencia para la implementación del módulo de administración.
> Última actualización: 2026-05-21

---

## Stack adicional

| Servicio | Uso |
|---|---|
| Firebase Authentication | Login del administrador |
| Cloud Firestore | Base de datos (proyectos, imágenes, logros) |
| Firebase Storage | Almacenamiento físico de imágenes |
| `firebase` npm package | SDK oficial |

Variables de entorno a agregar en `.env`:
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## Sistema de imágenes (decisión clave)

Todas las imágenes — ya sean de galería, de proyectos o de logros — viven en una **única colección `images`** en Firestore y en una **única carpeta raíz en Storage**.

Cada imagen tiene un flag `showInGallery` (boolean) que determina si aparece en la galería pública o no:

- `showInGallery: true` → aparece en `/gallery`
- `showInGallery: false` → imagen privada, solo ligada a proyectos/logros

### Flujo al crear un Proyecto o Logro

Al crear/editar un proyecto o logro, el administrador puede:

1. **Elegir imagen existente** de las ya subidas (se muestra un selector con todas las imágenes del sistema)
2. **Subir imagen nueva** (se sube, se registra en Firestore y Storage, y se ofrece decidir si `showInGallery`)

En ambos casos, el usuario puede activar/desactivar `showInGallery` en ese momento.

### Galería pública

La vista `/gallery` simplemente hace query a `images` donde `showInGallery == true`.
No hay colección separada de galería.

---

## Modelos de datos (Firestore)

### Colección `images`

```
images/{imageId}
├── url             (string)      — URL pública de Firebase Storage
├── storagePath     (string)      — path interno en Storage (para poder eliminar)
├── title           (string)
├── description     (string)
├── date            (Timestamp)
├── album           (string)      — agrupación para la galería ("KVMI Rewards", "Infomatrix 2023", etc.)
├── sizeFactor      (number)      — peso visual en el masonry layout (1–4)
├── showInGallery   (boolean)     — aparece en la galería pública
└── uploadedAt      (Timestamp)
```

> `album` es útil aunque `showInGallery` sea false (puede ser el album de un proyecto).

---

### Colección `projects`

```
projects/{projectId}
├── title               (string)
├── description_es      (string)
├── description_en      (string)
├── date                (Timestamp)
├── thumbnailImageId    (string)     — ref a images/{imageId}
├── thumbnailUrl        (string)     — cacheado para no hacer join en la vista pública
├── url                 (string?)    — OPCIONAL: link al proyecto desplegado
├── category            (string)     — "web" | "ai" | "mobile" | "other"
├── technology          (string)     — tecnología principal (para el badge)
├── relatedTechnologies (array<string>)
├── columns             (number)     — tamaño en el grid de "My Works"
├── rows                (number)
├── imageIds            (array<string>) — refs a images/{imageId} para el detalle
├── imageUrls           (array<object>) — cacheado: [{url, columns, rows, layout}]
├── published           (boolean)
├── order               (number?)    — OPCIONAL: null = al final, ordenado por createdAt
└── createdAt           (Timestamp)
```

**Regla de ordenación en la vista pública:**
```
1. Proyectos con order != null → ordenados por order ASC
2. Proyectos con order == null → ordenados por createdAt DESC (los más nuevos al final)
```

---

### Colección `achievements`

```
achievements/{achievementId}
├── title               (string)
├── description_es      (string)
├── description_en      (string)
├── date                (Timestamp)
├── type                (string)     — "award" | "certification" | "competition" | "academic" | "work"
├── issuer              (string)     — "UDLA", "Ingennials", "Infomatrix", "PwC", etc.
├── link                (string?)    — OPCIONAL: URL al certificado/badge digital
├── thumbnailImageId    (string)     — ref a images/{imageId}
├── thumbnailUrl        (string)     — cacheado
├── imageIds            (array<string>) — refs a images/{imageId} para el detalle
├── imageUrls           (array<string>) — cacheado
├── published           (boolean)
├── order               (number?)    — OPCIONAL: misma lógica que proyectos
└── createdAt           (Timestamp)
```

> Los `achievements` tienen fotos relacionadas (igual que los proyectos).
> Esas fotos pueden o no aparecer en la galería según `showInGallery`.

---

## Autenticación

- **Firebase Auth — Email/Password**
- Colección `admins/{uid}` en Firestore con los UIDs autorizados
- Al hacer login, verificar que `uid` existe en `admins`
- `setPersistence(browserLocalPersistence)` para no tener que re-loggearse constantemente
- Navigation guard en Vue Router: bloquea `/admin/**` si `auth.currentUser == null`

---

## Estructura de carpetas (adiciones al proyecto)

```
src/
├── firebase/
│   ├── index.js              # init Firebase con variables de entorno
│   ├── auth.js               # login(), logout(), onAuthStateChanged()
│   ├── images.js             # CRUD imágenes + upload a Storage
│   ├── projects.js           # CRUD proyectos en Firestore
│   └── achievements.js       # CRUD logros en Firestore
│
├── composables/
│   ├── useTheme.js           # (existente)
│   ├── useAuth.js            # estado de sesión reactivo (ref<User|null>)
│   ├── useImages.js          # lista de imágenes, upload, delete, toggle showInGallery
│   ├── useProjects.js        # reemplaza projectsStore.js — lee de Firestore
│   └── useAchievements.js    # logros desde Firestore
│
├── views/
│   ├── ... (vistas existentes sin cambios de estructura)
│   ├── Achievements_View.vue # nueva sección pública de logros
│   └── admin/
│       ├── Admin_Login.vue
│       ├── Admin_Projects.vue      # tabla: list / create / edit / delete
│       ├── Admin_Images.vue        # gestión central de imágenes (upload, showInGallery toggle)
│       └── Admin_Achievements.vue  # tabla: list / create / edit / delete
│
└── components/
    ├── ... (componentes existentes)
    └── admin/
        ├── ImageUploader.vue       # drag & drop, multi-upload, decide showInGallery al subir
        ├── ImagePicker.vue         # selector de imagen existente (modal con grid de imágenes)
        ├── ProjectForm.vue         # formulario completo de proyecto
        └── AchievementForm.vue     # formulario completo de logro
```

---

## Rutas del módulo admin

```
/admin                      → redirect a /admin/projects (si hay sesión activa) o al login
/admin/login                → Admin_Login.vue
/admin/projects             → lista de proyectos con acciones
/admin/projects/new         → ProjectForm.vue en modo creación
/admin/projects/:id/edit    → ProjectForm.vue en modo edición
/admin/achievements         → lista de logros con acciones
/admin/achievements/new     → AchievementForm.vue en modo creación
/admin/achievements/:id/edit→ AchievementForm.vue en modo edición
/admin/images               → Admin_Images.vue (biblioteca central de imágenes)
```

Navigation guard (en `router.js`):
```js
router.beforeEach(async (to) => {
  if (!to.path.startsWith('/admin')) return true
  if (to.name === 'AdminLogin') return true

  const user = auth.currentUser
  if (!user) return { name: 'AdminLogin' }

  // verificar que el uid está en la colección admins
  const adminDoc = await getDoc(doc(db, 'admins', user.uid))
  if (!adminDoc.exists()) return { name: 'AdminLogin' }

  return true
})
```

---

## Organización en Firebase Storage

```
storage/
├── images/
│   └── {imageId}_{filename}.jpg   # todas las imágenes en una sola carpeta raíz
```

> El `storagePath` guardado en Firestore permite hacer `deleteObject(ref(storage, storagePath))`
> para eliminar la imagen de Storage cuando se borre el documento.

---

## Actualizaciones al frontend público

| Vista | Cambio |
|---|---|
| `General_View.vue` | Agregar `<Achievements_View>` como nueva sección |
| `Projects_Component.vue` | Leer desde `useProjects()` en vez de store estático; activar filtro por `category` |
| `Gallery_View.vue` | Leer desde `useImages()` filtrando `showInGallery == true` |
| `Project_Component.vue` | Leer el proyecto desde Firestore por `id` |
| `Achievements_View.vue` | Nueva vista pública (misma estructura visual que proyectos) |

---

## Plan de migración (orden recomendado)

1. Crear proyecto en Firebase Console, activar Auth + Firestore + Storage
---

## Decisiones resueltas

### Contenido bilingüe en proyectos y logros
Ambos campos (`description_es` y `description_en`) son **obligatorios** en los formularios del admin. El admin ingresa el texto en los dos idiomas al crear o editar. Las etiquetas de UI (botones, títulos de sección, flags) siguen en los diccionarios de i18n como hasta ahora.

### Ruta de Achievements
Sección con **ruta propia `/achievements`**, igual que `/gallery`. No va dentro del scroll de `General_View`. La navegación del navbar incluirá un enlace a esta ruta.

### Campo `album` en imágenes
Es un **dropdown dinámico** alimentado desde la colección `albums` de Firestore. El admin tiene una pantalla `/admin/albums` con CRUD completo para agregar, editar y eliminar álbumes. El dropdown en el formulario de imágenes muestra los álbumes disponibles en tiempo real.

### Pinia y los archivos estáticos
Una vez migrado a Firestore, **se eliminan**:
- `src/plugins/stores/projectsStore.js`
- `src/plugins/stores/projects.js`

El store de Pinia manejaba dos cosas: la lista de proyectos (estática) y el proyecto seleccionado (persistido en localStorage para que la página de detalle no se rompa al recargar). Con Firestore, la lista viene de un query en tiempo real y la página de detalle hace su propio query por ID — localStorage ya no es necesario.

---

## Plan de migración (orden recomendado)

1. Crear proyecto en Firebase Console — activar Auth, Firestore y Storage
2. `npm install firebase`
3. Crear `src/firebase/index.js` con init usando variables de entorno
4. Crear usuario administrador en Firebase Auth Console
5. Crear documento en Firestore: `admins/{uid}` con el UID del admin
6. **Migración de álbumes**: crear los documentos base en la colección `albums` (KVMI Rewards, Infomatrix 2023, Graduación, etc.)
7. **Migración de galería**: subir las ~70 fotos de `public/images/` a Storage → crear docs en `images` con `showInGallery: true` y su `albumId`
8. **Migración de proyectos**: subir imágenes de `src/assets/projects/` a Storage → crear docs en `projects` con sus `imageIds`
9. Crear composables (`useProjects`, `useImages`, `useAlbums`, `useAchievements`)
10. Actualizar vistas públicas para leer de Firestore (`Projects_Component`, `Gallery_View`, `Project_Component`)
11. Eliminar `src/plugins/stores/projectsStore.js` y `src/plugins/stores/projects.js`
12. Construir módulo admin: login → álbumes → imágenes → proyectos → logros
13. Crear `Achievements_View.vue` pública y agregar la ruta `/achievements`
