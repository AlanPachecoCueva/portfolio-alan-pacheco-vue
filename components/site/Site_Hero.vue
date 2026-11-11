<template>
  <section id="inicio" class="hero tcs-container">
    <div class="hero__text">
      <!-- El antetítulo va dentro del <h1>: "desarrollo de software a medida en Quito" es lo que se busca -->
      <h1 class="hero__heading">
        <span class="tcs-eyebrow hero__eyebrow">{{ $t('site.hero.eyebrow') }}</span>
        <span class="hero__title">{{ $t('site.hero.title') }}</span>
      </h1>
      <p class="hero__subtitle">{{ $t('site.hero.subtitle') }}</p>
      <div class="hero__actions">
        <NuxtLink :to="$localePath({ name: 'index', hash: '#contacto' })" class="tcs-btn tcs-btn--primary tcs-btn--lg">
          {{ $t('site.hero.cta') }}
        </NuxtLink>
        <NuxtLink :to="$localePath({ name: 'index', hash: '#proyectos' })" class="tcs-btn tcs-btn--ghost tcs-btn--lg">
          {{ $t('site.hero.secondary') }}
        </NuxtLink>
      </div>
    </div>

    <!-- Decorativo: un "pedido" escrito como código. Cada línea es un bloque (los saltos de
         línea entre etiquetas se pierden en algunos renderizadores). -->
    <div class="hero__code" aria-hidden="true">
      <div class="hero__code-bar">
        <span></span><span></span><span></span>
        <span class="hero__code-file">tu-proyecto.ts</span>
      </div>
      <div class="hero__code-body">
        <div class="c-muted">{{ $t('site.hero.code.comment1') }}</div>
        <div><span class="c-key">const</span> proyecto = {</div>
        <div>  servicio: <span class="c-str">'{{ $t('site.hero.code.service') }}'</span>,</div>
        <div>  idiomas: [<span class="c-str">'es'</span>, <span class="c-str">'en'</span>],</div>
        <div>  seo: <span class="c-key">true</span>,</div>
        <div>};</div>
        <div class="hero__code-gap"></div>
        <div class="c-muted">{{ $t('site.hero.code.comment2') }}</div>
        <div><span class="c-key">await</span> cotizar(proyecto);</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Site_Hero',
}
</script>

<style scoped>
.hero {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 48px;
  padding-top: 72px;
  padding-bottom: 72px;
}

.hero__text {
  flex: 1 1 520px;
  min-width: 0;
}

.hero__heading {
  margin: 0;
  font-weight: inherit;
}

.hero__eyebrow {
  display: block;
  font-family: var(--tcs-font-body);
  line-height: 1.4;
}

.hero__title {
  display: block;
  margin: 0;
  font-family: var(--tcs-font-display);
  font-size: clamp(36px, 5vw, 60px);
  line-height: 1.05;
  letter-spacing: -0.03em;
  font-weight: 700;
}

.hero__subtitle {
  margin: 24px 0 0;
  max-width: 560px;
  font-size: 19px;
  color: rgb(var(--v-theme-tcs-muted));
}

.hero__actions {
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero__code {
  flex: 1 1 380px;
  min-width: 0;
  border-radius: 16px;
  border: 1px solid rgb(var(--v-theme-tcs-border));
  background: rgb(var(--v-theme-tcs-surface));
  overflow: hidden;
}

.hero__code-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px;
  border-bottom: 1px solid rgb(var(--v-theme-tcs-border));
}

.hero__code-bar > span:not(.hero__code-file) {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: rgb(var(--v-theme-tcs-border));
}

.hero__code-file {
  margin-left: 8px;
  font-family: var(--tcs-font-mono);
  font-size: 12px;
  color: rgb(var(--v-theme-tcs-muted));
}

.hero__code-body {
  padding: 24px;
  font-family: var(--tcs-font-mono);
  font-size: 14px;
  line-height: 1.8;
  white-space: pre;
  overflow-x: auto;
}

.hero__code-gap {
  height: 1.8em;
}

.c-muted { color: rgb(var(--v-theme-tcs-muted)); }
.c-key { color: rgb(var(--v-theme-tcs-accent-text)); }
.c-str { color: rgb(var(--v-theme-tcs-secondary)); }
</style>
