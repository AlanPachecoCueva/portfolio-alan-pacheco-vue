<template>
  <div class="picker-backdrop" @click.self="$emit('close')">
    <div class="picker-modal">
      <div class="picker-header">
        <h2>Seleccionar imagen</h2>
        <button class="picker-close" @click="$emit('close')">✕</button>
      </div>

      <!-- Filtro por álbum -->
      <div class="picker-toolbar">
        <select v-model="filterAlbum" class="picker-select">
          <option value="">Todos los álbumes</option>
          <option v-for="album in albums" :key="album.id" :value="album.id">
            {{ album.name }}
          </option>
        </select>
        <input
          v-model="search"
          placeholder="Buscar por título..."
          class="picker-search"
        />
      </div>

      <!-- Grid de imágenes -->
      <div v-if="loading" class="picker-state">Cargando imágenes...</div>
      <div v-else-if="filtered.length === 0" class="picker-state">
        No hay imágenes que coincidan.
      </div>
      <div v-else class="picker-grid">
        <div
          v-for="img in filtered"
          :key="img.id"
          class="picker-item"
          :class="{ 'picker-item--selected': isSelected(img) }"
          @click="toggleSelect(img)"
          @dblclick="!multi && confirm()"
        >
          <img :src="img.url" :alt="img.title" class="picker-img" />
          <div v-if="multi && isSelected(img)" class="picker-item-check">✓</div>
          <div class="picker-item-label">{{ img.title }}</div>
        </div>
      </div>

      <div class="picker-footer">
        <span class="picker-hint">
          {{ multi ? `${selectedMulti.length} seleccionada(s)` : 'Doble clic para seleccionar directamente' }}
        </span>
        <div class="picker-footer-actions">
          <button class="btn-cancel" @click="$emit('close')">Cancelar</button>
          <button class="btn-confirm" :disabled="multi ? selectedMulti.length === 0 : !selected" @click="confirm">
            {{ multi ? `Usar ${selectedMulti.length || ''} imagen${selectedMulti.length !== 1 ? 'es' : ''}` : 'Usar imagen' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useImages } from '@/composables/useImages.js'
import { useAlbums } from '@/composables/useAlbums.js'

export default {
  name: 'Image_Picker',
  props: {
    multi: { type: Boolean, default: false },
  },
  emits: ['select', 'close'],
  setup() {
    const { images, loading } = useImages()
    const { albums } = useAlbums()
    return { images, loading, albums }
  },
  data() {
    return {
      selected: null,
      selectedMulti: [],
      filterAlbum: '',
      search: '',
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
    isSelected(img) {
      if (this.multi) return this.selectedMulti.some((s) => s.id === img.id)
      return this.selected && this.selected.id === img.id
    },
    toggleSelect(img) {
      if (!this.multi) {
        this.selected = img
        return
      }
      const idx = this.selectedMulti.findIndex((s) => s.id === img.id)
      if (idx === -1) this.selectedMulti.push(img)
      else this.selectedMulti.splice(idx, 1)
    },
    confirm() {
      if (this.multi) {
        if (this.selectedMulti.length === 0) return
        this.$emit('select', this.selectedMulti.map((s) => ({ id: s.id, url: s.url })))
      } else {
        if (!this.selected) return
        this.$emit('select', { id: this.selected.id, url: this.selected.url })
      }
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
.picker-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.picker-modal {
  background: #1a1a1a;
  border-radius: 14px;
  width: 100%;
  max-width: 860px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
}

.picker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid #2a2a2a;
}

.picker-header h2 {
  font-size: 1.1em;
  color: #fff;
}

.picker-close {
  background: transparent;
  border: none;
  color: #888;
  font-size: 1.1em;
  cursor: pointer;
  padding: 4px 8px;
  transition: color 0.2s;
}

.picker-close:hover { color: #fff; }

/* ── Toolbar ── */
.picker-toolbar {
  display: flex;
  gap: 10px;
  padding: 14px 24px;
  border-bottom: 1px solid #222;
}

.picker-select,
.picker-search {
  padding: 8px 12px;
  background: #2a2a2a;
  border: 1px solid #333;
  border-radius: 7px;
  color: #eee;
  font-size: 0.88em;
}

.picker-select { width: 200px; }
.picker-search { flex: 1; }

.picker-select:focus,
.picker-search:focus {
  outline: none;
  border-color: #f39c12;
}

/* ── Grid ── */
.picker-state {
  padding: 40px;
  text-align: center;
  color: #666;
}

.picker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-auto-rows: 210px;
  gap: 12px;
  padding: 16px 24px;
  overflow-y: auto;
  max-height: calc(85vh - 180px);
}

.picker-item {
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s, transform 0.15s;
  background: #222;
  position: relative;
  display: flex;
  flex-direction: column;
}

.picker-item:hover {
  border-color: #555;
  transform: scale(1.02);
}

.picker-item--selected {
  border-color: #f39c12;
}

.picker-item-check {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #f39c12;
  color: #111;
  font-size: 0.75em;
  font-weight: bold;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.picker-img {
  width: 100%;
  flex: 1;
  min-height: 0;
  object-fit: cover;
  display: block;
}

.picker-item-label {
  padding: 5px 7px;
  font-size: 0.72em;
  color: #aaa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
}

/* ── Footer ── */
.picker-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  border-top: 1px solid #2a2a2a;
  gap: 12px;
}

.picker-hint {
  font-size: 0.78em;
  color: #555;
}

.picker-footer-actions {
  display: flex;
  gap: 10px;
}

.btn-cancel {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #333;
  border-radius: 7px;
  color: #888;
  font-size: 0.88em;
  cursor: pointer;
}

.btn-confirm {
  padding: 8px 18px;
  background: #f39c12;
  border: none;
  border-radius: 7px;
  color: #111;
  font-weight: bold;
  font-size: 0.88em;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-confirm:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
