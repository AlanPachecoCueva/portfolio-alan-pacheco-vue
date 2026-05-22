# Checklist de Implementación — Admin Module + Firebase

> Marcar con `[x]` cuando la actividad esté completada.
> Referencia de arquitectura: `docs/admin-module-architecture.md`
> Última actualización: 2026-05-21

---

## FASE 1 — Configuración de Firebase

- [ ] **1.1 Crear proyecto en Firebase Console**
  Ir a console.firebase.google.com → "Add project" → nombrar el proyecto (ej: `portfolio-alan-pacheco`) → desactivar Google Analytics si no se necesita.

- [ ] **1.2 Activar Firebase Authentication**
  En el proyecto de Firebase: Authentication → Get Started → Sign-in method → habilitar "Email/Password".

- [ ] **1.3 Activar Cloud Firestore**
  Firestore Database → Create database → elegir modo "Production" (no test) → seleccionar región (us-central1 o la más cercana).

- [ ] **1.4 Activar Firebase Storage**
  Storage → Get Started → modo Production → misma región que Firestore.

- [ ] **1.5 Obtener credenciales del proyecto**
  Project Settings → General → "Your apps" → Add app → Web → registrar app → copiar el objeto `firebaseConfig` con todas las claves.

- [ ] **1.6 Crear usuario administrador en Firebase Auth**
  Authentication → Users → Add user → ingresar email y contraseña del admin (Alan).

- [ ] **1.7 Agregar variables de entorno al proyecto**
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

- [ ] **2.1 Instalar el SDK de Firebase**
  ```bash
  npm install firebase
  ```

- [ ] **2.2 Crear `src/firebase/index.js`**
  Inicializar Firebase con las variables de entorno. Exportar `app`, `db` (Firestore), `storage` y `auth`.

- [ ] **2.3 Crear `src/firebase/auth.js`**
  Funciones: `login(email, password)`, `logout()`, `onAuthStateChanged(callback)`.
  Incluir `setPersistence(browserLocalPersistence)` para que la sesión persista al recargar.

- [ ] **2.4 Crear `src/firebase/images.js`**
  Funciones: `uploadImage(file, metadata)`, `deleteImage(storagePath, imageId)`, `toggleShowInGallery(imageId, value)`, `getAllImages()`, `getGalleryImages()`.

- [ ] **2.5 Crear `src/firebase/albums.js`**
  Funciones: `getAlbums()`, `createAlbum(data)`, `updateAlbum(id, data)`, `deleteAlbum(id)`.

- [ ] **2.6 Crear `src/firebase/projects.js`**
  Funciones: `getPublishedProjects()`, `getAllProjects()`, `getProjectById(id)`, `createProject(data)`, `updateProject(id, data)`, `deleteProject(id)`.

- [ ] **2.7 Crear `src/firebase/achievements.js`**
  Funciones: `getPublishedAchievements()`, `getAllAchievements()`, `getAchievementById(id)`, `createAchievement(data)`, `updateAchievement(id, data)`, `deleteAchievement(id)`.

---

## FASE 3 — Composables (reemplazo de Pinia)

- [ ] **3.1 Crear `src/composables/useAuth.js`**
  Expone: `user` (ref reactivo), `isAdmin` (computed), `login()`, `logout()`.
  Escucha cambios de sesión con `onAuthStateChanged` al montar.

- [ ] **3.2 Crear `src/composables/useImages.js`**
  Expone: `images` (lista reactiva), `galleryImages` (filtrado por showInGallery), `upload()`, `remove()`, `toggleGallery()`.
  Usa `onSnapshot` de Firestore para actualizaciones en tiempo real.

- [ ] **3.3 Crear `src/composables/useAlbums.js`**
  Expone: `albums` (lista reactiva para los dropdowns), `create()`, `update()`, `remove()`.

- [ ] **3.4 Crear `src/composables/useProjects.js`**
  Expone: `projects` (lista reactiva de proyectos publicados, ordenados según regla de `order`), `allProjects` (todos, para el admin).
  Reemplaza `projectsStore.js` de Pinia.

- [ ] **3.5 Crear `src/composables/useAchievements.js`**
  Expone: `achievements` (publicados, ordenados), `allAchievements` (para el admin), `getById(id)`.

---

## FASE 4 — Migración de datos existentes a Firestore

- [ ] **4.1 Crear los álbumes base en Firestore**
  Crear manualmente (o con script) los álbumes que ya existen en la galería actual:
  "KVMI Rewards", "Infomatrix 2023", "Ingennials", "Graduación UDLA", "Ayudantía de Cátedra", "Robomatrix", "Water's Life", "Eduware", "CowID", "Banco Internacional", "PwC".

- [ ] **4.2 Crear documento `admins/{uid}` en Firestore**
  Tomar el UID del usuario creado en el paso 1.6 y crear el documento en la colección `admins`.

- [ ] **4.3 Migrar imágenes de galería a Firebase Storage**
  Subir las ~70 fotos de `public/images/` a Storage en la carpeta `images/`.
  Para cada imagen: crear documento en la colección `images` con sus metadatos actuales (`title`, `description`, `date`, `sizeFactor`, `albumId`, `showInGallery: true`).

- [ ] **4.4 Migrar proyectos a Firestore**
  Para cada uno de los 4 proyectos actuales (Mikhuna, KVMI, Guru, CowID):
  - Subir imagen thumbnail a Storage
  - Subir imágenes de detalle a Storage
  - Crear documento en `projects` con todos los campos del modelo
  - Agregar `description_es` y `description_en` (los textos están en los diccionarios de i18n)
  - Asignar `category` a cada proyecto: CowID → "mobile", KVMI → "web", Guru → "web", Mikhuna → "web"

- [ ] **4.5 Eliminar archivos estáticos reemplazados**
  Una vez verificado que los datos están correctamente en Firestore:
  - Eliminar `src/plugins/stores/projects.js`
  - Eliminar `src/plugins/stores/projectsStore.js`
  - Eliminar imágenes de `src/assets/projects/` (ya están en Storage)
  - Las fotos de `public/images/` pueden quedar temporalmente hasta verificar Storage

---

## FASE 5 — Actualización del frontend público

- [ ] **5.1 Actualizar `Gallery_View.vue`**
  Reemplazar el array hardcodeado de ~70 fotos por `useImages().galleryImages`.
  La galería muestra las imágenes donde `showInGallery == true`, con sus metadatos de Firestore.

- [ ] **5.2 Actualizar `Projects_Component.vue`**
  Reemplazar la lectura del store de Pinia por `useProjects().projects`.
  Implementar el filtro por `category` en los botones ALL/WEB/IA/MOBILE (actualmente sin funcionalidad).

- [ ] **5.3 Actualizar `Project_Component.vue` (vista de detalle)**
  Reemplazar la lectura de localStorage/Pinia por un query a Firestore usando `getProjectById(route.params.id)`.
  Manejar el caso de proyecto no encontrado (redirigir a home o mostrar 404).

- [ ] **5.4 Actualizar `router.js`**
  Agregar todas las rutas del módulo admin (`/admin/**`) y la ruta pública `/achievements`.
  Agregar el navigation guard que valida sesión y pertenencia a la colección `admins`.

---

## FASE 6 — Módulo Admin: Autenticación

- [ ] **6.1 Crear `src/views/admin/Admin_Login.vue`**
  Formulario con campos email y password.
  Al hacer login exitoso → redirigir a `/admin/projects`.
  Mostrar error si las credenciales son incorrectas o el usuario no está en `admins`.

- [ ] **6.2 Crear layout/shell del admin**
  Navbar lateral o superior con links a: Proyectos, Logros, Imágenes, Álbumes.
  Botón de cerrar sesión.
  Mostrar el email del usuario logueado.
  Aplicar en todas las vistas `/admin/**` (excepto login).

---

## FASE 7 — Módulo Admin: Gestión de Álbumes

- [ ] **7.1 Crear `src/views/admin/Admin_Albums.vue`**
  Tabla con lista de álbumes (nombre, orden, fecha de creación, acciones).
  Botón "Nuevo álbum".
  Acciones por fila: editar nombre/orden, eliminar (con confirmación).

- [ ] **7.2 Validación al eliminar álbum**
  Antes de eliminar un álbum, verificar si hay imágenes que lo referencian.
  Si hay imágenes asociadas, mostrar aviso y no permitir eliminación (o preguntar qué hacer con ellas).

---

## FASE 8 — Módulo Admin: Gestión de Imágenes

- [ ] **8.1 Crear `src/components/admin/ImageUploader.vue`**
  Componente reutilizable de carga de imágenes.
  Soporte drag & drop y selector de archivo.
  Permite subir múltiples imágenes a la vez.
  Al subir cada imagen, muestra formulario para: `title`, `description`, `date`, `album` (dropdown de `useAlbums()`), `sizeFactor`, toggle `showInGallery`.
  Sube a Firebase Storage y crea documento en Firestore.

- [ ] **8.2 Crear `src/components/admin/ImagePicker.vue`**
  Modal/panel con grid de todas las imágenes subidas al sistema.
  Permite buscar/filtrar por álbum.
  Al seleccionar una imagen, emite evento con el `imageId` y `url`.
  Usado en los formularios de proyectos y logros.

- [ ] **8.3 Crear `src/views/admin/Admin_Images.vue`**
  Grid de todas las imágenes del sistema.
  Filtro por álbum.
  Cada imagen muestra: thumbnail, título, álbum, toggle de `showInGallery`, botón eliminar.
  Botón "Subir imágenes" que abre el `ImageUploader`.
  Al eliminar: borrar de Storage y de Firestore.

---

## FASE 9 — Módulo Admin: Gestión de Proyectos

- [ ] **9.1 Crear `src/views/admin/Admin_Projects.vue`**
  Tabla con lista de todos los proyectos (publicados y borradores).
  Columnas: título, categoría, tecnología, orden, estado (publicado/borrador), acciones.
  Botón "Nuevo proyecto".
  Acciones: editar, eliminar (con confirmación), toggle publicado/borrador.

- [ ] **9.2 Crear `src/components/admin/ProjectForm.vue`**
  Formulario completo para crear y editar proyectos. Campos:
  - `title`
  - `description_es` (textarea)
  - `description_en` (textarea)
  - `date`
  - `url` (opcional)
  - `category` (select: web / ai / mobile / other)
  - `technology` (texto libre)
  - `relatedTechnologies` (chips/tags editables)
  - `columns` y `rows` (número para el grid)
  - `order` (número, opcional)
  - `published` (toggle)
  - **Thumbnail**: botón "Elegir imagen existente" (abre `ImagePicker`) o "Subir nueva imagen" (abre `ImageUploader`). Muestra preview.
  - **Imágenes de detalle**: lista de imágenes seleccionadas con `ImagePicker` o subidas. Cada imagen tiene campos `columns`, `rows`, `layout`. Permite reordenar y eliminar.

- [ ] **9.3 Lógica de guardado de proyecto**
  Al guardar, cachear `thumbnailUrl` desde el documento de imagen seleccionado.
  Cachear `imageUrls` (array de objetos con url, columns, rows, layout) para evitar joins en la vista pública.

---

## FASE 10 — Módulo Admin: Gestión de Logros

- [ ] **10.1 Crear `src/views/admin/Admin_Achievements.vue`**
  Tabla con lista de todos los logros (publicados y borradores).
  Columnas: título, tipo, emisor, orden, estado, acciones.
  Botón "Nuevo logro".
  Acciones: editar, eliminar, toggle publicado/borrador.

- [ ] **10.2 Crear `src/components/admin/AchievementForm.vue`**
  Formulario completo para crear y editar logros. Campos:
  - `title`
  - `description_es` (textarea)
  - `description_en` (textarea)
  - `date`
  - `type` (select: award / certification / competition / academic / work)
  - `issuer` (texto libre: "UDLA", "Ingennials", etc.)
  - `link` (URL opcional al certificado)
  - `order` (número, opcional)
  - `published` (toggle)
  - **Thumbnail**: igual que en proyectos (ImagePicker o ImageUploader)
  - **Imágenes relacionadas**: lista de imágenes del logro (misma lógica que detalle de proyectos)

---

## FASE 11 — Vista pública de Logros

- [ ] **11.1 Crear `src/views/Achievements_View.vue`**
  Vista pública accesible en `/achievements`.
  Estructura visual similar a la sección "My Works" (grid de cards).
  Cada card muestra: imagen, título, tipo, emisor, fecha.
  Al hacer clic → vista de detalle del logro (similar a `Project_Component.vue`).
  Soporte bilingüe: mostrar `title`, `description_es` o `description_en` según el idioma activo (`$i18n.locale`).

- [ ] **11.2 Agregar ruta `/achievements` en `router.js`**
  ```js
  { path: '/achievements', name: 'Achievements', component: Achievements_View }
  ```
  Actualizar el `afterEach` del router para el `document.title`.

- [ ] **11.3 Agregar enlace a Achievements en `Nav_Bar.vue`**
  Agregar "Achievements" (o "Logros" según idioma) en el menú de navegación junto a Gallery.
  Agregar las traducciones correspondientes en los diccionarios de i18n.

---

## FASE 12 — Firebase Security Rules

- [ ] **12.1 Escribir Security Rules de Firestore**
  Reglas que permiten:
  - Lectura pública de proyectos publicados (`published == true`)
  - Lectura pública de imágenes de galería (`showInGallery == true`)
  - Lectura pública de logros publicados
  - Lectura pública de álbumes
  - Escritura solo para admins autenticados (verificando existencia en colección `admins`)
  - Colección `admins` inaccesible desde el cliente

- [ ] **12.2 Escribir Security Rules de Storage**
  - Lectura pública de todas las imágenes en `images/`
  - Escritura (upload/delete) solo para admins autenticados

- [ ] **12.3 Testear las Security Rules**
  Verificar en Firebase Console → Rules Playground:
  - Usuario no autenticado NO puede escribir proyectos
  - Usuario autenticado no admin NO puede escribir proyectos
  - Admin autenticado SÍ puede escribir
  - Proyecto con `published: false` NO es legible por usuarios anónimos

---

## FASE 13 — Limpieza y verificación final

- [ ] **13.1 Eliminar código de Pinia**
  Confirmar que `projectsStore.js` y `projects.js` están eliminados y que ningún componente los importa.

- [ ] **13.2 Eliminar imágenes estáticas migradas**
  Limpiar `src/assets/projects/` y `public/images/` una vez confirmado que Storage funciona correctamente.

- [ ] **13.3 Verificar responsive del admin**
  Revisar que las vistas del admin se ven correctamente en pantallas pequeñas (el admin se usa principalmente en desktop, pero no debe romperse en tablet).

- [ ] **13.4 Verificar soporte bilingüe en vistas públicas**
  Confirmar que al cambiar idioma (ES↔EN), los proyectos y logros muestran el campo correcto (`description_es` o `description_en`).

- [ ] **13.5 Verificar el filtro de categorías en "My Works"**
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

- [ ] **13.8 Revisar y actualizar `CLAUDE.md`**
  Actualizar la documentación del proyecto para reflejar el nuevo stack (Firebase, composables, rutas admin).
