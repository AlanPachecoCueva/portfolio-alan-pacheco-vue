<template>
  <div class="admin-page">
    <AdminNav />
    <div class="admin-content">
      <div class="page-header">
        <h1>Álbumes</h1>
        <button class="btn-primary" @click="showForm = true">+ Nuevo álbum</button>
      </div>

      <!-- Formulario inline -->
      <div v-if="showForm" class="inline-form">
        <input v-model="formName" placeholder="Nombre del álbum" />
        <input v-model="formDescription" placeholder="Descripción (opcional)" />
        <div class="inline-form-actions">
          <button class="btn-primary" @click="handleSave">Guardar</button>
          <button class="btn-cancel" @click="cancelForm">Cancelar</button>
        </div>
      </div>

      <div v-if="loading" class="state-msg">Cargando...</div>
      <div v-else-if="albums.length === 0" class="state-msg">No hay álbumes aún.</div>
      <table v-else class="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="album in albums" :key="album.id">
            <td>{{ album.name }}</td>
            <td>{{ album.description || '—' }}</td>
            <td class="actions">
              <button class="btn-edit" @click="startEdit(album)">Editar</button>
              <button class="btn-delete" @click="handleDelete(album)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AdminNav from '@/components/admin/Admin_Nav.vue'
import { useAlbums } from '@/composables/useAlbums.js'
import { countImagesByAlbum } from '@/firebase/images.js'

export default {
  name: 'Admin_Albums',
  components: { AdminNav },
  setup() {
    return useAlbums()
  },
  data() {
    return {
      showForm: false,
      editingId: null,
      formName: '',
      formDescription: '',
    }
  },
  methods: {
    startEdit(album) {
      this.editingId = album.id
      this.formName = album.name
      this.formDescription = album.description || ''
      this.showForm = true
    },
    cancelForm() {
      this.showForm = false
      this.editingId = null
      this.formName = ''
      this.formDescription = ''
    },
    async handleSave() {
      if (!this.formName.trim()) return
      const data = { name: this.formName.trim(), description: this.formDescription.trim() }
      try {
        if (this.editingId) {
          await this.updateAlbum(this.editingId, data)
        } else {
          await this.createAlbum(data)
        }
        this.cancelForm()
        this.$swal.fire({ icon: 'success', title: '¡Listo!', text: 'Álbum guardado correctamente.', timer: 2000, showConfirmButton: false })
      } catch (err) {
        this.$swal.fire({ icon: 'error', title: 'Error al guardar', text: err.message })
      }
    },
    async handleDelete(album) {
      try {
        const count = await countImagesByAlbum(album.id)
        if (count > 0) {
          this.$swal.fire({
            icon: 'warning',
            title: 'Álbum con imágenes',
            text: `No se puede eliminar "${album.name}" porque tiene ${count} imagen${count === 1 ? '' : 'es'} asociada${count === 1 ? '' : 's'}. Reasigna o elimina esas imágenes primero.`,
          })
          return
        }
        const { isConfirmed } = await this.$swal.fire({
          icon: 'warning',
          title: '¿Eliminar álbum?',
          text: `Se eliminará "${album.name}" permanentemente.`,
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#e74c3c',
        })
        if (!isConfirmed) return
        await this.deleteAlbum(album.id)
        this.$swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
      } catch (err) {
        this.$swal.fire({ icon: 'error', title: 'Error al eliminar', text: err.message })
      }
    },
  },
}
</script>

<style scoped>
@import '@/assets/admin.css';

.inline-form {
  background: #1e1e1e;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 480px;
}

.inline-form input {
  padding: 10px 14px;
  background: #2a2a2a;
  border: 1px solid #333;
  border-radius: 8px;
  color: #fff;
  font-size: 0.95em;
}

.inline-form input:focus {
  outline: none;
  border-color: #f39c12;
}

.inline-form-actions {
  display: flex;
  gap: 10px;
}

.btn-cancel {
  padding: 8px 16px;
  border-radius: 6px;
  background: #333;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
