<template>
  <router-link
    :to="routeName ? { name: routeName } : { name: 'Home', hash: url }"
    class="card-link"
  >
    <Icon class="card-icon" :icon="icon_name" />
    <h2 class="card-title">{{ title }}</h2>
    <Icon class="card-arrow" icon="ep:arrow-right-bold" />
  </router-link>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    url: {
      type: String,
      default: '',
    },
    routeName: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
    icon_name: {
      type: String,
      required: true,
      default: 'token-branded:moon',
    },
  },
}
</script>

<style scoped>
/* El router-link ES la card — toda el área es clickeable y animada */
.card-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px 24px;
  border-radius: 15px;
  box-sizing: border-box;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.22);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.card-link:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
}

.card-icon {
  flex-shrink: 0;
  width: 4em;
  height: 4em;
}

.card-title {
  font-size: 1em;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
}

.card-arrow {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  opacity: 0.4;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.card-link:hover .card-arrow {
  opacity: 0.9;
  transform: translateX(5px);
}

/* ── xs: < 600px ── */
@media (max-width: 599px) {
  .card-link {
    padding: 14px 18px;
    gap: 12px;
  }

  .card-icon {
    width: 3.2em;
    height: 3.2em;
  }
}
</style>
