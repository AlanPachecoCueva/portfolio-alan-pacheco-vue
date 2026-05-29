# Checklist de Implementación — Admin Module + Firebase

> Marcar con `[x]` cuando la actividad esté completada.
> Referencia de arquitectura: `docs/admin-module-architecture.md`
> Última actualización: 2026-05-26

---

## FASE 1 — Configuración de Firebase

- [x] **1.1 Crear proyecto en Firebase Console**
  Ir a console.firebase.google.com → "Add project" → nombrar el proyecto (ej: `portfolio-alan-pacheco`) → desactivar Google Analytics si no se necesita.

- [x] **1.2 Activar Firebase Authentication**
  En el proyecto de Firebase: Authentication → Get Started → Sign-in method → habilitar "Email/Password".

- [x] **1.3 Activar Cloud Firestore**
  Firestore Database → Create database → elegir modo "Production" (no test) → seleccionar región (us-central1 o la más cercana).

- [x] **1.4 Activar Firebase Storage**
  Storage → Get Started → modo Production → misma región que Firestore.

- [x] **1.5 Obtener credenciales del proyecto**
  Project Settings → General → "Your apps" → Add app → Web → registrar app → copiar el objeto `firebaseConfig` con todas las claves.

- [x] **1.6 Crear usuario administrador en Firebase Auth**
  Authentication → Users → Add user → ingresar email y contraseña del admin (Alan).

- [x] **1.7 Agregar variables de entorno al proyecto**
  Agregar al archivo `.env` las 6 variables de Firebase:
  ```
  VITE_FIREBASE_API_KEY=
  VITE_FIREBASE_AUTH_DOMAIN=
  VITE_FIREBASE_PROJECT_ID=
  VITE_FIREBASE_STORAGE_BUCKET=
  VITE_FIREBASE_MESSAGING_SENDER_ID=
  VITE_FIREBASE_APP_ID=
  ```
  Verificar que `.env` está en `.gitignore` (ya debería estarlo).

---

## FASE 2 — Integración de Firebase en el proyecto Vue

- [x] **2.1 Instalar el SDK de Firebase**
  ```bash
  npm install firebase
  ```

- [x] **2.2 Crear `src/firebase/index.js`**
  Inicializar Firebase con las variables de entorno. Exportar `app`, `db` (Firestore), `storage` y `auth`.

- [x] **2.3 Crear `src/firebase/auth.js`**
  Funciones: `login(email, password)`, `logout()`, `onAuthStateChanged(callback)`.
  Incluir `setPersistence(browserLocalPersistence)` para que la sesión persista al recargar.

- [x] **2.4 Crear `src/firebase/images.js`**
  Funciones: `uploadImage(file, metadata)`, `deleteImage(storagePath, imageId)`, `toggleShowInGallery(imageId, value)`, `getAllImages()`, `getGalleryImages()`.

- [x] **2.5 Crear `src/firebase/albums.js`**
  Funciones: `getAlbums()`, `createAlbum(data)`, `updateAlbum(id, data)`, `deleteAlbum(id)`.

- [x] **2.6 Crear `src/firebase/projects.js`**
  Funciones: `getPublishedProjects()`, `getAllProjects()`, `getProjectById(id)`, `createProject(data)`, `updateProject(id, data)`, `deleteProject(id)`.

- [x] **2.7 Crear `src/firebase/achievements.js`**
  Funciones: `getPublishedAchievements()`, `getAllAchievements()`, `getAchievementById(id)`, `createAchievement(data)`, `updateAchievement(id, data)`, `deleteAchievement(id)`.

---

## FASE 3 — Composables (reemplazo de Pinia)

- [x] **3.1 Crear `src/composables/useAuth.js`**
  Expone: `user` (ref reactivo), `isAdmin` (computed), `login()`, `logout()`.
  Escucha cambios de sesión con `onAuthStateChanged` al montar.

- [x] **3.2 Crear `src/composables/useImages.js`**
  Expone: `images` (lista reactiva), `galleryImages` (filtrado por showInGallery), `upload()`, `remove()`, `toggleGallery()`.
  Usa `onSnapshot` de Firestore para actualizaciones en tiempo real.

- [x] **3.3 Crear `src/composables/useAlbums.js`**
  Expone: `albums` (lista reactiva para los dropdowns), `create()`, `update()`, `remove()`.

- [x] **3.4 Crear `src/composables/useProjects.js`**
  Expone: `projects` (lista reactiva de proyectos publicados, ordenados según regla de `order`), `allProjects` (todos, para el admin).
  Reemplaza `projectsStore.js` de Pinia.

- [x] **3.5 Crear `src/composables/useAchievements.js`**
  Expone: `achievements` (publicados, ordenados), `allAchievements` (para el admin), `getById(id)`.

---

## FASE 4 — Migración de datos existentes a Firestore

- [ ] **4.1 Crear los álbumes base en Firestore**
  Crear manualmente (o con script) los álbumes que ya existen en la galería actual:
  "KVMI Rewards", "Infomatrix 2023", "Ingennials", "Graduación UDLA", "Ayudantía de Cátedra", "Robomatrix", "Water's Life", "Eduware", "CowID", "Banco Internacional", "PwC".

- [x] **4.2 Crear documento `admins/{uid}` en Firestore**
  Tomar el UID del usuario creado en el paso 1.6 y crear el documento en la colección `admins`.

- [ ] **4.3 Migrar imágenes de galería a Firebase Storage**
  Subir las ~70 fotos de `public/images/` a Storage en la carpeta `images/`.
  Para cada imagen: crear documento en la colección `images` con sus metadatos actuales (`title`, `description`, `date`, `sizeFactor`, `albumId`, `showInGallery: true`).

- [x] **4.4 Migrar proyectos a Firestore**
  Proyectos creados y publicados desde el admin panel con imágenes en Storage.

- [ ] **4.5 Eliminar archivos estáticos reemplazados**
  Una vez verificado que los datos están correctamente en Firestore:
  - Eliminar `src/plugins/stores/projects.js`
  - Eliminar `src/plugins/stores/projectsStore.js`
  - Eliminar imágenes de `src/assets/projects/` (ya están en Storage)
  - Las fotos de `public/images/` pueden quedar temporalmente hasta verificar Storage

---

## FASE 5 — Actualización del frontend público

- [x] **5.1 Actualizar `Gallery_View.vue`**
  Reemplazado el array hardcodeado de ~70 fotos por `useGalleryImages()`.
  La galería muestra las imágenes donde `showInGallery == true`, con sus metadatos de Firestore.

- [x] **5.2 Actualizar `Projects_Component.vue`**
  Reemplazada la lectura del store de Pinia por `usePublishedProjects()`.
  Filtros ALL/WEB/IA/MOBILE implementados con `activeFilter` + computed `filteredItems`.

- [x] **5.3 Actualizar `Project_Component.vue` (vista de detalle)**
  Reemplazada la lectura de Pinia por `getProject(route.params.id)` desde Firestore.
  Descripción bilingüe (`description_es` / `description_en`) según idioma activo.

- [x] **5.4 Actualizar `router.js`**
  Agregadas todas las rutas del módulo admin (`/admin/**`) y la ruta pública `/achievements`.
  Navigation guard implementado con caché de auth para evitar redirects innecesarios.

---

## FASE 6 — Módulo Admin: Autenticación

- [x] **6.1 Crear `src/views/admin/Admin_Login.vue`**
  Formulario con campos email y password.
  Al hacer login exitoso → redirigir a `/admin/projects`.
  Muestra error si las credenciales son incorrectas o el usuario no está en `admins`.
  Muestra mensaje de sesión expirada si viene del timeout de inactividad.

- [x] **6.2 Crear layout/shell del admin (`Admin_Nav.vue`)**
  Navbar superior con links a: Proyectos, Logros, Imágenes, Álbumes.
  Botón de cerrar sesión. Email del usuario logueado.
  Timer de inactividad de 3 horas con aviso de 60 segundos antes de cerrar sesión.

---

## FASE 7 — Módulo Admin: Gestión de Álbumes

- [x] **7.1 Crear `src/views/admin/Admin_Albums.vue`**
  Lista de álbumes con creación, edición de nombre y eliminación inline.

- [x] **7.2 Validación al eliminar álbum**
  Antes de eliminar un álbum, verificar si hay imágenes que lo referencian.
  Si hay imágenes asociadas, mostrar aviso y no permitir eliminación (o preguntar qué hacer con ellas).

---

## FASE 8 — Módulo Admin: Gestión de Imágenes

- [x] **8.1 Crear `src/components/admin/Image_Uploader.vue`**
  Drag & drop y selector de archivo. Múltiples imágenes simultáneas.
  Formulario por imagen: `title`, `description`, `album`, `sizeFactor`, `showInGallery`.
  Barras de progreso de subida. Sube a Storage y crea documento en Firestore.

- [x] **8.2 Crear `src/components/admin/Image_Picker.vue`**
  Modal con grid de todas las imágenes. Filtro por álbum y búsqueda por título.
  Modo single (un clic → selección) y modo multi (checkboxes, selección múltiple).

- [x] **8.3 Crear `src/views/admin/Admin_Images.vue`**
  Grid de imágenes con filtro y búsqueda. Toggle `showInGallery` por tarjeta.
  Lightbox al hacer clic en imagen. Modal de edición (título, descripción, álbum, sizeFactor).
  Botón "Subir imágenes" que abre el uploader.

- [x] **8.4 Crear `src/components/admin/Image_Selector.vue`** *(extra)*
  Componente combinado (drop zone + "Elegir de biblioteca") para usar en formularios de proyectos y logros.

---

## FASE 9 — Módulo Admin: Gestión de Proyectos

- [x] **9.1 Crear `src/views/admin/Admin_Projects.vue`**
  Tabla con todos los proyectos. Toggle publicado/borrador. Editar y eliminar.

- [x] **9.2 Crear `src/views/admin/Admin_ProjectForm.vue`**
  Formulario completo: título, descripción ES/EN, fecha, URL, categoría, tecnologías (tags), thumbnail (Image_Selector), imágenes de detalle (Image_Selector multi), grid columns/rows, orden, publicado.

- [x] **9.3 Lógica de guardado de proyecto**
  Cachea `thumbnailUrl` e `imageUrls` (con columns/rows por imagen) en el documento de Firestore.

---

## FASE 10 — Módulo Admin: Gestión de Logros

- [x] **10.1 Crear `src/views/admin/Admin_Achievements.vue`**
  Tabla con todos los logros. Toggle publicado/borrador. Editar y eliminar.

- [x] **10.2 Crear `src/views/admin/Admin_AchievementForm.vue`**
  Formulario completo: título, descripción ES/EN, fecha, tipo, emisor, link, thumbnail (Image_Selector), imágenes relacionadas (Image_Selector multi), orden, publicado.

---

## FASE 11 — Vista pública de Logros

- [x] **11.1 Crear `src/views/Achievements_View.vue`**
  Vista pública en `/achievements` con grid de logros publicados desde Firestore.

- [x] **11.2 Agregar ruta `/achievements` en `router.js`**
  Ruta agregada y document.title actualizado en el afterEach del router.

- [x] **11.3 Agregar enlace a Achievements en `Nav_Bar.vue`**
  Agregar "Achievements" (o "Logros" según idioma) en el menú de navegación junto a Gallery.
  Agregar las traducciones correspondientes en los diccionarios de i18n.
  ⚠️ Pendiente: el Card de Achievements en el home también apunta a `url=""`.

---

## FASE 12 — Firebase Security Rules

- [x] **12.1 Escribir Security Rules de Firestore**
  Reglas configuradas: lectura pública de colecciones, escritura solo para admins autenticados verificados en colección `admins`.

- [x] **12.2 Escribir Security Rules de Storage**
  Lectura pública de `images/`. Escritura solo para autenticados.
  CORS configurado con `gsutil` para `localhost:5173` y `localhost:4173`.

- [ ] **12.3 Testear las Security Rules**
  Verificar en Firebase Console → Rules Playground:
  - Usuario no autenticado NO puede escribir proyectos
  - Usuario autenticado no admin NO puede escribir proyectos
  - Admin autenticado SÍ puede escribir
  - Proyecto con `published: false` NO es legible por usuarios anónimos

---

## FASE 13 — Limpieza y verificación final

- [x] **13.1 Eliminar código de Pinia**
  Confirmar que `projectsStore.js` y `projects.js` están eliminados y que ningún componente los importa.

- [ ] **13.2 Eliminar imágenes estáticas migradas**
  Limpiar `src/assets/projects/` y `public/images/` una vez confirmado que Storage funciona correctamente.

- [ ] **13.3 Verificar responsive del admin**
  Revisar que las vistas del admin se ven correctamente en pantallas pequeñas (el admin se usa principalmente en desktop, pero no debe romperse en tablet).

- [ ] **13.4 Verificar soporte bilingüe en vistas públicas**
  Confirmar que al cambiar idioma (ES↔EN), los proyectos y logros muestran el campo correcto (`description_es` o `description_en`).

- [x] **13.5 Verificar el filtro de categorías en "My Works"**
  Confirmar que los botones ALL / WEB / IA / MOBILE filtran correctamente los proyectos por el campo `category`.

- [ ] **13.6 Test de flujo completo del admin**
  - Subir una imagen nueva → verificar que aparece en la biblioteca
  - Activar `showInGallery` → verificar que aparece en `/gallery`
  - Crear proyecto con esa imagen → verificar que aparece en "My Works"
  - Despublicar proyecto → verificar que desaparece del frontend público
  - Crear logro → verificar que aparece en `/achievements`
  - Eliminar imagen → verificar que se borra de Storage y Firestore

- [ ] **13.7 Configurar reglas de índices en Firestore**
  Si Firestore lanza errores de "missing index" en las queries compuestas (ej: `published == true` + `order ASC`), crear los índices desde el link que provee el error en consola.

- [x] **13.8 Revisar y actualizar `CLAUDE.md`**
  Actualizar la documentación del proyecto para reflejar el nuevo stack (Firebase, composables, rutas admin).
