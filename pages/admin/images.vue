<script setup>
definePageMeta({ middleware: 'auth', layout: false })
</script>

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

      <div v-if="showUploader" class="uploader-panel">
        <ImageUploader @uploaded="showUploader = false" />
      </div>

      <div class="toolbar">
        <select v-model="filterAlbum" class="toolbar-select">
          <option value="">Todos los álbumes</option>
          <option v-for="album in albums" :key="album.id" :value="album.id">{{ album.name }}</option>
        </select>
        <input v-model="search" placeholder="Buscar por título..." class="toolbar-search" />
        <span class="toolbar-count">{{ filtered.length }} imágenes</span>
      </div>

      <div v-if="loading" class="state-msg">Cargando...</div>
      <div v-else-if="filtered.length === 0" class="state-msg">No hay imágenes que coincidan.</div>
      <div v-else class="images-grid">
        <div v-for="img in filtered" :key="img.id" class="image-card">
          <div class="image-card-thumb" @click="openLightbox(img)">
            <img :src="img.url" :alt="img.title" />
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
              <input type="checkbox" :checked="img.showInGallery" @change="handleToggle(img, $event.target.checked)" />
              <span>{{ img.showInGallery ? '★ Galería' : '☆ Galería' }}</span>
            </label>
            <button class="btn-delete-img" @click="handleDelete(img)">✕</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="lightboxImg" class="lightbox" @click="lightboxImg = null">
      <button class="lightbox-close" @click="lightboxImg = null">✕</button>
      <img :src="lightboxImg.url" :alt="lightboxImg.title" @click.stop />
      <div class="lightbox-caption" @click.stop>{{ lightboxImg.title }}</div>
    </div>

    <div v-if="editingImg" class="modal-backdrop" @click.self="closeEdit">
      <div class="modal">
        <div class="modal-header">
          <h2>Editar imagen</h2>
          <button class="modal-close" @click="closeEdit">✕</button>
        </div>
        <div class="modal-body">
          <img :src="editingImg.url" class="modal-preview" :alt="editForm.title" />
          <div class="field"><label>Título</label><input v-model="editForm.title" /></div>
          <div class="field"><label>Descripción</label><textarea v-model="editForm.description" rows="3" /></div>
          <div class="field">
            <label>Álbum</label>
            <select v-model="editForm.album">
              <option value="">Sin álbum</option>
              <option v-for="album in albums" :key="album.id" :value="album.id">{{ album.name }}</option>
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
          <button class="btn-primary" :disabled="saving" @click="handleSaveEdit">{{ saving ? 'Guardando...' : 'Guardar cambios' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from '~/components/admin/Admin_Nav.vue'
import ImageUploader from '~/components/admin/Image_Uploader.vue'
import { useImages } from '~/composables/useImages.js'
import { useAlbums } from '~/composables/useAlbums.js'

export default {
  name: 'Admin_Images',
  components: { AdminNav, ImageUploader },
  setup() {
    const { images, loading, toggleShowInGallery, updateImage, deleteImage } = useImages()
    const { albums } = useAlbums()
    return { images, loading, toggleShowInGallery, updateImage, deleteImage, albums }
  },
  data() {
    return { showUploader: false, filterAlbum: '', search: '', editingImg: null, editForm: {}, saving: false, lightboxImg: null }
  },
  computed: {
    filtered() {
      return this.images.filter((img) => {
        const matchAlbum = !this.filterAlbum || img.album === this.filterAlbum
        const matchSearch = !this.search || img.title.toLowerCase().includes(this.search.toLowerCase())
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
    openLightbox(img) { this.lightboxImg = img },
    openEdit(img) {
      this.editingImg = img
      this.editForm = { title: img.title || '', description: img.description || '', album: img.album || '', sizeFactor: img.sizeFactor ?? 1, showInGallery: img.showInGallery ?? false }
    },
    closeEdit() { this.editingImg = null; this.editForm = {} },
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
      try { await this.toggleShowInGallery(img.id, value) }
      catch (err) { this.$swal.fire({ icon: 'error', title: 'Error', text: err.message }) }
    },
    async handleDelete(img) {
      const { isConfirmed } = await this.$swal.fire({
        icon: 'warning', title: '¿Eliminar imagen?',
        text: `Se eliminará "${img.title}" de Storage y Firestore. Esta acción no se puede deshacer.`,
        showCancelButton: true, confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar', confirmButtonColor: '#e74c3c',
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
@import '~/assets/admin.css';
</style>
