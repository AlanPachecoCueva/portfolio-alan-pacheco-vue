<template>
  <span class="site-logo">
    <!-- Logo 3 "llaves con núcleo" (DA-010): llaves en color de texto, rombo en acento -->
    <svg :width="size" :height="size" viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M24 12 C16 12 18 22 18 26 C18 30 14 32 11 32 C14 32 18 34 18 38 C18 42 16 52 24 52 M40 12 C48 12 46 22 46 26 C46 30 50 32 53 32 C50 32 46 34 46 38 C46 42 48 52 40 52"
        fill="none"
        stroke="currentColor"
        stroke-width="5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M32 23 L41 32 L32 41 L23 32 Z" class="site-logo__core" />
    </svg>
    <span v-if="withText" class="site-logo__text">
      <span class="site-logo__name">TheCode</span>
      <span class="site-logo__tag">SOLUTIONS</span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'Site_Logo',
  props: {
    size: { type: Number, default: 36 },
    withText: { type: Boolean, default: true },
  },
}
</script>

<style scoped>
.site-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: rgb(var(--v-theme-tcs-text));
}

.site-logo__core {
  fill: rgb(var(--v-theme-tcs-accent));
}

.site-logo__text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.site-logo__name {
  font-family: var(--tcs-font-display);
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.site-logo__tag {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.32em;
  margin-top: 3px;
  color: rgb(var(--v-theme-tcs-muted));
}
</style>
