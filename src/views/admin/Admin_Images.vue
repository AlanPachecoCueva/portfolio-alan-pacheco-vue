<template>
  <div class="admin-page">
    <AdminNav />
    <div class="admin-content">
      <div class="page-header">
        <h1>Imágenes</h1>
        <button class="btn-primary" @click="showUploader = !showUploader">
          {{ showUploader ? '✕ Cerrar uploader' : '+ Subir imágenes' }}
        </button>
      </div>

      <!-- Uploader -->
      <div v-if="showUploader" class="uploader-panel">
        <ImageUploader @uploaded="showUploader = false" />
      </div>

      <!-- Filtros -->
      <div class="toolbar">
        <select v-model="filterAlbum" class="toolbar-select">
          <option value="">Todos los álbumes</option>
          <option v-for="album in albums" :key="album.id" :value="album.id">
            {{ album.name }}
          </option>
        </select>
        <input
          v-model="search"
          placeholder="Buscar por título..."
          class="toolbar-search"
        />
        <span class="toolbar-count">{{ filtered.length }} imágenes</span>
      </div>

      <!-- Grid -->
      <div v-if="loading" class="state-msg">Cargando...</div>
      <div v-else-if="filtered.length === 0" class="state-msg">
        No hay imágenes que coincidan.
      </div>
      <div v-else class="images-grid">
        <div v-for="img in filtered" :key="img.id" class="image-card">
          <div class="image-card-thumb" @click="openLightbox(img)">
            <img :src="img.url" :alt="img.title" />
            <!-- Overlay con botones -->
            <div class="image-card-overlay">
              <button class="btn-overlay btn-overlay--view" @click.stop="openLightbox(img)">⤢ Ver</button>
              <button class="btn-overlay btn-overlay--edit" @click.stop="openEdit(img)">✎ Editar</button>
            </div>
          </div>
          <div class="image-card-info">
            <div class="image-card-title">{{ img.title }}</div>
            <div class="image-card-album">{{ getAlbumName(img.album) }}</div>
          </div>
          <div class="image-card-actions">
            <label class="toggle-gallery" :title="img.showInGallery ? 'Quitar de galería' : 'Agregar a galería'">
              <input
                type="checkbox"
                :checked="img.showInGallery"
                @change="handleToggle(img, $event.target.checked)"
              />
              <span>{{ img.showInGallery ? '★ Galería' : '☆ Galería' }}</span>
            </label>
            <button class="btn-delete-img" @click="handleDelete(img)">✕</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Lightbox ────────────────────────────────────────────────── -->
    <div v-if="lightboxImg" class="lightbox" @click="lightboxImg = null">
      <button class="lightbox-close" @click="lightboxImg = null">✕</button>
      <img :src="lightboxImg.url" :alt="lightboxImg.title" @click.stop />
      <div class="lightbox-caption" @click.stop>{{ lightboxImg.title }}</div>
    </div>

    <!-- ── Modal de edición ─────────────────────────────────────────── -->
    <div v-if="editingImg" class="modal-backdrop" @click.self="closeEdit">
      <div class="modal">
        <div class="modal-header">
          <h2>Editar imagen</h2>
          <button class="modal-close" @click="closeEdit">✕</button>
        </div>

        <div class="modal-body">
          <!-- Preview -->
          <img :src="editingImg.url" class="modal-preview" :alt="editForm.title" />

          <div class="field">
            <label>Título</label>
            <input v-model="editForm.title" placeholder="Título de la imagen" />
          </div>

          <div class="field">
            <label>Descripción</label>
            <textarea v-model="editForm.description" rows="3" placeholder="Descripción (opcional)" />
          </div>

          <div class="field">
            <label>Álbum</label>
            <select v-model="editForm.album">
              <option value="">Sin álbum</option>
              <option v-for="album in albums" :key="album.id" :value="album.id">
                {{ album.name }}
              </option>
            </select>
          </div>

          <div class="field">
            <label>Factor de tamaño</label>
            <select v-model="editForm.sizeFactor">
              <option :value="1">1 — Normal</option>
              <option :value="2">2 — Mediano</option>
              <option :value="3">3 — Grande</option>
              <option :value="4">4 — Muy grande</option>
            </select>
          </div>

          <label class="toggle-field">
            <input type="checkbox" v-model="editForm.showInGallery" />
            <span>Mostrar en galería pública</span>
          </label>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel-modal" @click="closeEdit">Cancelar</button>
          <button class="btn-primary" :disabled="saving" @click="handleSaveEdit">
            {{ saving ? 'Guardando...' : 'Guardar cambios' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from '@/components/admin/Admin_Nav.vue'
import ImageUploader from '@/components/admin/Image_Uploader.vue'
import { useImages } from '@/composables/useImages.js'
import { useAlbums } from '@/composables/useAlbums.js'

export default {
  name: 'Admin_Images',
  components: { AdminNav, ImageUploader },
  setup() {
    const { images, loading, toggleShowInGallery, updateImage, deleteImage } = useImages()
    const { albums } = useAlbums()
    return { images, loading, toggleShowInGallery, updateImage, deleteImage, albums }
  },
  data() {
    return {
      showUploader: false,
      filterAlbum: '',
      search: '',
      editingImg: null,
      editForm: {},
      saving: false,
      lightboxImg: null,
    }
  },
  computed: {
    filtered() {
      return this.images.filter((img) => {
        const matchAlbum = !this.filterAlbum || img.album === this.filterAlbum
        const matchSearch =
          !this.search ||
          img.title.toLowerCase().includes(this.search.toLowerCase())
        return matchAlbum && matchSearch
      })
    },
  },
  methods: {
    getAlbumName(albumId) {
      if (!albumId) return '—'
      const album = this.albums.find((a) => a.id === albumId)
      return album ? album.name : '—'
    },
    openLightbox(img) {
      this.lightboxImg = img
    },
    openEdit(img) {
      this.editingImg = img
      this.editForm = {
        title: img.title || '',
        description: img.description || '',
        album: img.album || '',
        sizeFactor: img.sizeFactor ?? 1,
        showInGallery: img.showInGallery ?? false,
      }
    },
    closeEdit() {
      this.editingImg = null
      this.editForm = {}
    },
    async handleSaveEdit() {
      this.saving = true
      try {
        await this.updateImage(this.editingImg.id, { ...this.editForm })
        this.closeEdit()
        this.$swal.fire({ icon: 'success', title: '¡Guardado!', timer: 1500, showConfirmButton: false })
      } catch (err) {
        this.$swal.fire({ icon: 'error', title: 'Error al guardar', text: err.message })
      } finally {
        this.saving = false
      }
    },
    async handleToggle(img, value) {
      try {
        await this.toggleShowInGallery(img.id, value)
      } catch (err) {
        this.$swal.fire({ icon: 'error', title: 'Error', text: err.message })
      }
    },
    async handleDelete(img) {
      const { isConfirmed } = await this.$swal.fire({
        icon: 'warning',
        title: '¿Eliminar imagen?',
        text: `Se eliminará "${img.title}" de Storage y Firestore. Esta acción no se puede deshacer.`,
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#e74c3c',
      })
      if (!isConfirmed) return
      try {
        await this.deleteImage(img.id, img.storagePath)
        this.$swal.fire({ icon: 'success', title: 'Eliminada', timer: 1500, showConfirmButton: false })
      } catch (err) {
        this.$swal.fire({ icon: 'error', title: 'Error al eliminar', text: err.message })
      }
    },
  },
}
</script>

<style scoped>
@import '@/assets/admin.css';

.uploader-panel {
  background: #161616;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 28px;
}

.toolbar {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.toolbar-select,
.toolbar-search {
  padding: 8px 12px;
  background: #1e1e1e;
  border: 1px solid #2a2a2a;
  border-radius: 7px;
  color: #eee;
  font-size: 0.88em;
}

.toolbar-select { width: 200px; }
.toolbar-search { flex: 1; min-width: 160px; }

.toolbar-select:focus,
.toolbar-search:focus {
  outline: none;
  border-color: #f39c12;
}

.toolbar-count {
  font-size: 0.82em;
  color: #666;
  white-space: nowrap;
}

/* ── Grid ── */
.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
}

.image-card {
  background: #1e1e1e;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2a2a2a;
  transition: border-color 0.2s;
}

.image-card:hover { border-color: #444; }

.image-card-thumb {
  aspect-ratio: 1;
  overflow: hidden;
  position: relative;
}

.image-card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
}

.image-card:hover .image-card-thumb img { transform: scale(1.05); }

/* Overlay botones */
.image-card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.52);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s;
  cursor: zoom-in;
}

.image-card:hover .image-card-overlay { opacity: 1; }

.btn-overlay {
  padding: 6px 12px;
  border: none;
  border-radius: 7px;
  font-size: 0.8em;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-overlay--view {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.3);
  backdrop-filter: blur(4px);
}

.btn-overlay--edit {
  background: #f39c12;
  color: #111;
}

.btn-overlay:hover { opacity: 0.85; }

/* ── Lightbox ── */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: zoom-out;
}

.lightbox img {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 6px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.6);
  cursor: default;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 24px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  font-size: 1.1em;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.lightbox-close:hover { background: rgba(255,255,255,0.2); }

.lightbox-caption {
  margin-top: 14px;
  color: #aaa;
  font-size: 0.88em;
  cursor: default;
}

.image-card-info {
  padding: 8px 10px 4px;
}

.image-card-title {
  font-size: 0.83em;
  color: #ddd;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-card-album {
  font-size: 0.75em;
  color: #666;
  margin-top: 2px;
}

.image-card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px 10px;
  gap: 8px;
}

.toggle-gallery {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.78em;
  cursor: pointer;
  color: #888;
  user-select: none;
}

.toggle-gallery input { display: none; }
.toggle-gallery:has(input:checked) span { color: #f39c12; }

.btn-delete-img {
  background: transparent;
  border: none;
  color: #555;
  cursor: pointer;
  font-size: 0.85em;
  padding: 2px 6px;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
}

.btn-delete-img:hover {
  color: #e74c3c;
  background: #2a1010;
}

/* ── Modal ── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal {
  background: #1a1a1a;
  border-radius: 14px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid #2a2a2a;
}

.modal-header h2 {
  font-size: 1.05em;
  color: #fff;
}

.modal-close {
  background: transparent;
  border: none;
  color: #888;
  font-size: 1.1em;
  cursor: pointer;
  transition: color 0.2s;
}

.modal-close:hover { color: #fff; }

.modal-body {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
  max-height: 65vh;
}

.modal-preview {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 4px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.field label {
  font-size: 0.8em;
  color: #888;
}

.field input,
.field select,
.field textarea {
  padding: 9px 12px;
  background: #242424;
  border: 1px solid #333;
  border-radius: 7px;
  color: #eee;
  font-size: 0.9em;
  font-family: inherit;
  resize: vertical;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: #f39c12;
}

.toggle-field {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.88em;
  color: #ccc;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px;
  border-top: 1px solid #2a2a2a;
}

.btn-cancel-modal {
  padding: 9px 18px;
  background: transparent;
  border: 1px solid #333;
  border-radius: 7px;
  color: #888;
  font-size: 0.9em;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.btn-cancel-modal:hover {
  border-color: #aaa;
  color: #ccc;
}
</style>
