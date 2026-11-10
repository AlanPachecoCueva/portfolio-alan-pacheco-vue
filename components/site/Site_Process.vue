<template>
  <section id="proceso" class="tcs-container" aria-labelledby="proceso-titulo">
    <p class="tcs-eyebrow">{{ $t('site.process.eyebrow') }}</p>
    <h2 id="proceso-titulo" class="tcs-h2">{{ $t('site.process.title') }}</h2>
    <ol class="steps">
      <li v-for="(step, i) in steps" :key="i" class="step">
        <span class="step__n" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
        <h3 class="step__title">{{ step.title }}</h3>
        <p class="step__text">{{ step.text }}</p>
      </li>
    </ol>
  </section>
</template>

<script>
export default {
  name: 'Site_Process',
  computed: {
    // tm/rt: los pasos son un arreglo de mensajes en i18n/locales/*.json (site.process.steps)
    steps() {
      return this.$tm('site.process.steps').map((s) => ({ title: this.$rt(s.title), text: this.$rt(s.text) }))
    },
  },
}
</script>

<style scoped>
.steps {
  list-style: none;
  margin: 48px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 32px;
}

.step {
  border-top: 2px solid rgb(var(--v-theme-tcs-accent));
  padding-top: 20px;
}

.step__n {
  font-family: var(--tcs-font-mono);
  font-size: 14px;
  font-weight: 500;
  color: rgb(var(--v-theme-tcs-accent-text));
}

.step__title {
  margin: 8px 0;
  font-family: var(--tcs-font-display);
  font-size: 20px;
}

.step__text {
  margin: 0;
  font-size: 15px;
  color: rgb(var(--v-theme-tcs-muted));
}
</style>
