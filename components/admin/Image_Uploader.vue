<template>
  <div class="uploader">
    <!-- Zona de drop -->
    <div
      class="drop-zone"
      :class="{ 'drop-zone--over': isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
      @click="$refs.fileInput.click()"
    >
      <span class="drop-icon">⬆</span>
      <p>Arrastra imágenes aquí o <u>haz clic para seleccionar</u></p>
      <p class="drop-hint">JPG, PNG, WEBP — múltiples archivos permitidos</p>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        multiple
        hidden
        @change="onFileSelect"
      />
    </div>

    <!-- Lista de archivos pendientes -->
    <div v-if="queue.length" class="queue">
      <div v-for="(item, index) in queue" :key="index" class="queue-item">
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

          <!-- Barra de progreso -->
          <div v-if="item.status !== 'pending'" class="progress-bar-wrap">
            <div
              class="progress-bar"
              :class="`progress-bar--${item.status}`"
              :style="{ width: item.progress + '%' }"
            ></div>
          </div>
          <span v-if="item.status === 'done'" class="status-done">✓ Subida</span>
          <span v-if="item.status === 'error'" class="status-error">✗ Error al subir</span>
        </div>

        <button
          v-if="item.status === 'pending'"
          class="queue-remove"
          @click="removeFromQueue(index)"
          title="Quitar"
        >✕</button>
      </div>

      <div class="queue-actions">
        <button
          class="btn-upload"
          :disabled="uploading || allDone"
          @click="uploadAll"
        >
          {{ uploading ? 'Subiendo...' : allDone ? 'Todo subido' : 'Subir todas' }}
        </button>
        <button class="btn-clear" @click="clearDone">Limpiar subidas</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useAlbums } from '@/composables/useAlbums.js'
import { uploadImage } from '~/utils/firebase/images.js'

export default {
  name: 'Image_Uploader',
  emits: ['uploaded'],
  setup() {
    const { albums } = useAlbums()
    return { albums }
  },
  data() {
    return {
      isDragging: false,
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
      this.addToQueue(files)
    },
    onFileSelect(e) {
      const files = Array.from(e.target.files)
      this.addToQueue(files)
      e.target.value = ''
    },
    addToQueue(files) {
      files.forEach((file) => {
        const preview = URL.createObjectURL(file)
        this.queue.push({
          file,
          preview,
          title: file.name.replace(/\.[^.]+$/, ''),
          description: '',
          albumId: '',
          sizeFactor: 1,
          showInGallery: false,
          status: 'pending', // pending | uploading | done | error
          progress: 0,
        })
      })
    },
    removeFromQueue(index) {
      URL.revokeObjectURL(this.queue[index].preview)
      this.queue.splice(index, 1)
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
          await uploadImage(
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
          this.$emit('uploaded')
        } catch {
          item.status = 'error'
        }
      }
      this.uploading = false
    },
  },
  beforeUnmount() {
    this.queue.forEach((i) => URL.revokeObjectURL(i.preview))
  },
}
</script>

<style scoped>
.uploader {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── Drop zone ── */
.drop-zone {
  border: 2px dashed #444;
  border-radius: 12px;
  padding: 40px 24px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  color: #888;
}

.drop-zone:hover,
.drop-zone--over {
  border-color: #f39c12;
  background: #1e1a0f;
  color: #f39c12;
}

.drop-icon {
  font-size: 2em;
  display: block;
  margin-bottom: 10px;
}

.drop-hint {
  font-size: 0.78em;
  margin-top: 6px;
  color: #555;
}

/* ── Queue ── */
.queue {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.queue-item {
  display: flex;
  gap: 14px;
  background: #1e1e1e;
  border-radius: 10px;
  padding: 12px;
  align-items: flex-start;
}

.queue-thumb {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

.queue-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.meta-input {
  width: 100%;
  padding: 7px 10px;
  background: #2a2a2a;
  border: 1px solid #333;
  border-radius: 6px;
  color: #eee;
  font-size: 0.88em;
  box-sizing: border-box;
}

.meta-input:focus {
  outline: none;
  border-color: #f39c12;
}

.meta-row {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.meta-select {
  padding: 6px 8px;
  background: #2a2a2a;
  border: 1px solid #333;
  border-radius: 6px;
  color: #eee;
  font-size: 0.85em;
  flex: 1;
}

.meta-select--sm {
  flex: 0 0 auto;
}

.meta-toggle {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.85em;
  color: #aaa;
  cursor: pointer;
  white-space: nowrap;
}

/* ── Progress ── */
.progress-bar-wrap {
  height: 4px;
  background: #2a2a2a;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.2s;
}

.progress-bar--uploading { background: #f39c12; }
.progress-bar--done      { background: #4caf50; }
.progress-bar--error     { background: #e74c3c; }

.status-done  { font-size: 0.8em; color: #4caf50; }
.status-error { font-size: 0.8em; color: #e74c3c; }

/* ── Botón quitar ── */
.queue-remove {
  background: transparent;
  border: none;
  color: #555;
  cursor: pointer;
  font-size: 1em;
  padding: 4px;
  line-height: 1;
  transition: color 0.2s;
  flex-shrink: 0;
}

.queue-remove:hover { color: #e74c3c; }

/* ── Acciones ── */
.queue-actions {
  display: flex;
  gap: 10px;
  padding-top: 4px;
}

.btn-upload {
  padding: 9px 20px;
  background: #f39c12;
  color: #111;
  border: none;
  border-radius: 7px;
  font-weight: bold;
  font-size: 0.9em;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-upload:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-clear {
  padding: 9px 16px;
  background: transparent;
  border: 1px solid #333;
  border-radius: 7px;
  color: #888;
  font-size: 0.9em;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.btn-clear:hover {
  border-color: #aaa;
  color: #ccc;
}
</style>
