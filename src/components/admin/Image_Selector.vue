<template>
  <div class="img-selector">

    <!-- ── Vista previa actual (thumbnail) ── -->
    <div v-if="single && currentUrl" class="current-preview">
      <img :src="currentUrl" alt="preview" />
      <button type="button" class="btn-remove" @click="$emit('remove')">✕ Quitar</button>
    </div>

    <!-- ── Acciones principales ── -->
    <div class="selector-actions">
      <!-- Drop zone -->
      <div
        class="drop-zone"
        :class="{ 'drop-zone--over': isDragging }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onDrop"
        @click="$refs.fileInput.click()"
      >
        <span class="drop-icon">⬆</span>
        <p>Arrastra {{ single ? 'una imagen' : 'imágenes' }} aquí<br /><u>o haz clic para seleccionar</u></p>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          :multiple="!single"
          hidden
          @change="onFileSelect"
        />
      </div>

      <div class="separator">o</div>

      <!-- Elegir existente -->
      <button type="button" class="btn-pick-existing" @click="showPicker = true">
        Elegir de biblioteca
      </button>
    </div>

    <!-- ── Cola de archivos pendientes de subir ── -->
    <div v-if="queue.length" class="queue">
      <div v-for="(item, i) in queue" :key="i" class="queue-item">
        <img :src="item.preview" class="queue-thumb" alt="preview" />

        <div class="queue-meta">
          <input v-model="item.title" placeholder="Título" class="meta-input" />
          <input v-model="item.description" placeholder="Descripción (opcional)" class="meta-input" />

          <div class="meta-row">
            <select v-model="item.albumId" class="meta-select">
              <option value="">Sin álbum</option>
              <option v-for="album in albums" :key="album.id" :value="album.id">
                {{ album.name }}
              </option>
            </select>

            <select v-model="item.sizeFactor" class="meta-select meta-select--sm">
              <option :value="1">Tamaño 1</option>
              <option :value="2">Tamaño 2</option>
              <option :value="3">Tamaño 3</option>
              <option :value="4">Tamaño 4</option>
            </select>

            <label class="meta-toggle">
              <input type="checkbox" v-model="item.showInGallery" />
              Galería
            </label>
          </div>

          <!-- Progreso -->
          <div v-if="item.status !== 'pending'" class="progress-bar-wrap">
            <div
              class="progress-bar"
              :class="`progress-bar--${item.status}`"
              :style="{ width: item.progress + '%' }"
            ></div>
          </div>
          <span v-if="item.status === 'done'" class="status-done">✓ Subida</span>
          <span v-if="item.status === 'error'" class="status-error">✗ Error</span>
        </div>

        <button
          v-if="item.status === 'pending'"
          type="button"
          class="queue-remove"
          @click="removeFromQueue(i)"
        >✕</button>
      </div>

      <div class="queue-actions">
        <button
          type="button"
          class="btn-upload-queue"
          :disabled="uploading || allDone"
          @click="uploadAll"
        >
          {{ uploading ? 'Subiendo...' : allDone ? '✓ Todo subido' : 'Subir y usar' }}
        </button>
        <button type="button" class="btn-clear-done" @click="clearDone">
          Limpiar subidas
        </button>
      </div>
    </div>

    <!-- ── ImagePicker modal ── -->
    <ImagePicker
      v-if="showPicker"
      :multi="!single"
      @select="onPicked"
      @close="showPicker = false"
    />
  </div>
</template>

<script>
import ImagePicker from '@/components/admin/Image_Picker.vue'
import { useAlbums } from '@/composables/useAlbums.js'
import { uploadImage } from '@/firebase/images.js'

export default {
  name: 'Image_Selector',
  components: { ImagePicker },
  props: {
    // true → selector de imagen única (thumbnail)
    // false → selector múltiple (imágenes de detalle)
    single: { type: Boolean, default: false },
    // URL actual (solo usada en modo single para mostrar preview)
    currentUrl: { type: String, default: '' },
  },
  emits: ['pick', 'remove'],
  setup() {
    const { albums } = useAlbums()
    return { albums }
  },
  data() {
    return {
      isDragging: false,
      showPicker: false,
      queue: [],
      uploading: false,
    }
  },
  computed: {
    allDone() {
      return this.queue.length > 0 && this.queue.every((i) => i.status === 'done')
    },
  },
  methods: {
    onDrop(e) {
      this.isDragging = false
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith('image/')
      )
      this.addToQueue(this.single ? files.slice(0, 1) : files)
    },
    onFileSelect(e) {
      const files = Array.from(e.target.files)
      this.addToQueue(this.single ? files.slice(0, 1) : files)
      e.target.value = ''
    },
    addToQueue(files) {
      // En modo single, limpiar la cola antes de agregar
      if (this.single) this.queue = []
      files.forEach((file) => {
        this.queue.push({
          file,
          preview: URL.createObjectURL(file),
          title: file.name.replace(/\.[^.]+$/, ''),
          description: '',
          albumId: '',
          sizeFactor: 1,
          showInGallery: false,
          status: 'pending',
          progress: 0,
        })
      })
    },
    removeFromQueue(i) {
      URL.revokeObjectURL(this.queue[i].preview)
      this.queue.splice(i, 1)
    },
    clearDone() {
      this.queue = this.queue.filter((i) => i.status !== 'done')
    },
    async uploadAll() {
      this.uploading = true
      const pending = this.queue.filter((i) => i.status === 'pending')
      for (const item of pending) {
        item.status = 'uploading'
        item.progress = 0
        try {
          const { id, url } = await uploadImage(
            item.file,
            {
              title: item.title,
              description: item.description,
              album: item.albumId,
              sizeFactor: item.sizeFactor,
              showInGallery: item.showInGallery,
            },
            (pct) => { item.progress = pct }
          )
          item.progress = 100
          item.status = 'done'
          this.$emit('pick', { id, url })
        } catch {
          item.status = 'error'
        }
      }
      this.uploading = false
    },
    onPicked(result) {
      if (Array.isArray(result)) {
        result.forEach(({ id, url }) => this.$emit('pick', { id, url }))
      } else {
        this.$emit('pick', { id: result.id, url: result.url })
      }
      this.showPicker = false
    },
  },
  beforeUnmount() {
    this.queue.forEach((i) => URL.revokeObjectURL(i.preview))
  },
}
</script>

<style scoped>
.img-selector {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* ── Preview actual ── */
.current-preview {
  display: flex;
  align-items: center;
  gap: 12px;
}

.current-preview img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #333;
}

.btn-remove {
  background: transparent;
  border: none;
  color: #e74c3c;
  font-size: 0.82em;
  cursor: pointer;
}

/* ── Acciones ── */
.selector-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.drop-zone {
  flex: 1;
  min-width: 180px;
  border: 2px dashed #333;
  border-radius: 10px;
  padding: 18px 16px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  color: #666;
  font-size: 0.85em;
  line-height: 1.5;
}

.drop-zone:hover,
.drop-zone--over {
  border-color: #f39c12;
  background: #1e1a0f;
  color: #f39c12;
}

.drop-icon {
  display: block;
  font-size: 1.4em;
  margin-bottom: 6px;
}

.separator {
  color: #444;
  font-size: 0.82em;
  flex-shrink: 0;
}

.btn-pick-existing {
  padding: 10px 16px;
  background: #2a2a2a;
  border: 1px solid #333;
  border-radius: 8px;
  color: #ccc;
  font-size: 0.85em;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.2s, color 0.2s;
}

.btn-pick-existing:hover {
  border-color: #f39c12;
  color: #f39c12;
}

/* ── Cola ── */
.queue {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.queue-item {
  display: flex;
  gap: 12px;
  background: #1a1a1a;
  border-radius: 9px;
  padding: 10px;
  align-items: flex-start;
}

.queue-thumb {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

.queue-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.meta-input {
  width: 100%;
  padding: 6px 10px;
  background: #242424;
  border: 1px solid #333;
  border-radius: 6px;
  color: #eee;
  font-size: 0.85em;
  box-sizing: border-box;
}

.meta-input:focus {
  outline: none;
  border-color: #f39c12;
}

.meta-row {
  display: flex;
  gap: 7px;
  align-items: center;
  flex-wrap: wrap;
}

.meta-select {
  padding: 5px 8px;
  background: #242424;
  border: 1px solid #333;
  border-radius: 6px;
  color: #eee;
  font-size: 0.82em;
  flex: 1;
}

.meta-select--sm { flex: 0 0 auto; }

.meta-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.82em;
  color: #aaa;
  cursor: pointer;
  white-space: nowrap;
}

.progress-bar-wrap {
  height: 3px;
  background: #2a2a2a;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar { height: 100%; border-radius: 4px; transition: width 0.2s; }
.progress-bar--uploading { background: #f39c12; }
.progress-bar--done      { background: #4caf50; }
.progress-bar--error     { background: #e74c3c; }

.status-done  { font-size: 0.78em; color: #4caf50; }
.status-error { font-size: 0.78em; color: #e74c3c; }

.queue-remove {
  background: transparent;
  border: none;
  color: #555;
  cursor: pointer;
  font-size: 0.9em;
  padding: 2px;
  flex-shrink: 0;
}

.queue-remove:hover { color: #e74c3c; }

.queue-actions {
  display: flex;
  gap: 10px;
}

.btn-upload-queue {
  padding: 8px 16px;
  background: #f39c12;
  border: none;
  border-radius: 7px;
  color: #111;
  font-weight: bold;
  font-size: 0.85em;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-upload-queue:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-clear-done {
  padding: 8px 14px;
  background: transparent;
  border: 1px solid #333;
  border-radius: 7px;
  color: #888;
  font-size: 0.85em;
  cursor: pointer;
}

.btn-clear-done:hover { border-color: #aaa; color: #ccc; }
</style>
