<template>
  <div class="tags-input">
    <span v-for="(tag, i) in modelValue" :key="i" class="tag">
      {{ tag }}
      <button type="button" :aria-label="`Quitar ${tag}`" @click="remove(i)">✕</button>
    </span>
    <input
      v-model="draft"
      :placeholder="placeholder"
      @keydown.enter.prevent="add"
      @keydown="onKeydown"
      @blur="add"
    />
  </div>
</template>

<script>
// Lista de etiquetas con v-model (array de strings). Enter o coma agregan.
export default {
  name: 'Tags_Input',
  props: {
    modelValue: { type: Array, default: () => [] },
    placeholder: { type: String, default: 'Escribe y presiona Enter' },
  },
  emits: ['update:modelValue'],
  data() {
    return { draft: '' }
  },
  methods: {
    onKeydown(e) {
      // @keydown.comma no existe en Vue 3 (ERR-010)
      if (e.key === ',') {
        e.preventDefault()
        this.add()
      }
    },
    add() {
      const val = this.draft.trim().replace(/,$/, '')
      if (val && !this.modelValue.includes(val)) {
        this.$emit('update:modelValue', [...this.modelValue, val])
      }
      this.draft = ''
    },
    remove(i) {
      const next = [...this.modelValue]
      next.splice(i, 1)
      this.$emit('update:modelValue', next)
    },
  },
}
</script>

<style scoped>
@import '~/assets/admin.css';
</style>
