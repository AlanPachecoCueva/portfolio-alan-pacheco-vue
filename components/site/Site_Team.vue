<template>
  <section id="equipo" class="tcs-container team" aria-labelledby="equipo-titulo">
    <div class="team__intro">
      <p class="tcs-eyebrow">{{ $t('site.team.eyebrow') }}</p>
      <h2 id="equipo-titulo" class="tcs-h2">{{ $t('site.team.title') }}</h2>
      <p class="tcs-lead">{{ $t('site.team.text') }}</p>
    </div>

    <ul class="team__list">
      <li v-for="member in people" :key="member.id" class="member">
        <img
          :src="member.photoUrl"
          :srcset="member.photoSrcset"
          :alt="$t('site.team.photoAlt', { name: member.name })"
          width="480"
          height="480"
          loading="lazy"
          decoding="async"
          class="member__photo"
        />
        <div class="member__body">
          <h3 class="member__name">{{ member.name }}</h3>
          <p class="member__role">{{ member.role }}</p>
          <p class="member__bio">{{ member.bio }}</p>
          <p v-if="member.links.length" class="member__links">
            <a v-for="l in member.links" :key="l.href" :href="l.href" target="_blank" rel="noopener noreferrer" class="tcs-link">{{ l.label }}</a>
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { localized } from '~/utils/localized.js'

export default {
  name: 'Site_Team',
  props: {
    team: { type: Array, default: () => [] },
  },
  computed: {
    // Mientras no exista el perfil en Equipo (admin), se muestra al fundador con sus datos públicos
    people() {
      if (this.team.length) {
        return this.team.map((m) => ({
          id: m.id,
          name: m.name,
          role: localized(m, 'role', this.$i18n.locale),
          bio: localized(m, 'bio', this.$i18n.locale),
          photoUrl: m.photoUrl || '/images/alan-pacheco-480.png',
          photoSrcset: m.photoUrl ? undefined : '/images/alan-pacheco-480.png 1x, /images/alan-pacheco-960.png 2x',
          links: [
            m.links?.linkedin && { href: m.links.linkedin, label: 'LinkedIn' },
            m.links?.github && { href: m.links.github, label: 'GitHub' },
            m.links?.web && { href: m.links.web, label: 'Web' },
          ].filter(Boolean),
        }))
      }
      return [{
        id: 'founder',
        name: 'Alan Pacheco Cueva',
        role: this.$t('site.team.founderRole'),
        bio: this.$t('site.team.founderBio'),
        photoUrl: '/images/alan-pacheco-480.png',
        photoSrcset: '/images/alan-pacheco-480.png 1x, /images/alan-pacheco-960.png 2x',
        links: [
          { href: 'https://ec.linkedin.com/in/alan-pacheco-cueva-b7b3a9223', label: 'LinkedIn' },
          { href: 'https://github.com/AlanPachecoCueva', label: 'GitHub' },
        ],
      }]
    },
  },
}
</script>

<style scoped>
.team {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 48px;
}

.team__intro {
  flex: 1 1 380px;
  min-width: 0;
}

.team__list {
  flex: 0 1 360px;
  min-width: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 24px;
}

.member {
  border-radius: 16px;
  overflow: hidden;
  background: rgb(var(--v-theme-tcs-surface));
  border: 1px solid rgb(var(--v-theme-tcs-border));
}

.member__photo {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
  background: rgb(var(--v-theme-tcs-accent-soft));
}

.member__body {
  padding: 24px;
}

.member__name {
  margin: 0;
  font-family: var(--tcs-font-display);
  font-size: 22px;
}

.member__role {
  margin: 4px 0 0;
  font-size: 15px;
  font-weight: 600;
  color: rgb(var(--v-theme-tcs-accent-text));
}

.member__bio {
  margin: 12px 0 0;
  font-size: 15px;
  color: rgb(var(--v-theme-tcs-muted));
}

.member__links {
  margin: 16px 0 0;
  display: flex;
  gap: 16px;
}
</style>
