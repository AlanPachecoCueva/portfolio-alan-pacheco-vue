// Datos públicos del fundador. Se usan como respaldo mientras no exista su ficha en
// la colección `team` (admin → Equipo). Rol y bio salen de i18n (site.team.founder*).
export const FOUNDER = {
  id: 'founder',
  slug: 'alan-pacheco',
  name: 'Alan Pacheco Cueva',
  photoUrl: '/images/alan-pacheco-480.png',
  photoSrcset: '/images/alan-pacheco-480.png 1x, /images/alan-pacheco-960.png 2x',
  links: {
    linkedin: 'https://ec.linkedin.com/in/alan-pacheco-cueva-b7b3a9223',
    github: 'https://github.com/AlanPachecoCueva',
    web: '',
  },
  cvUrl_es: '/CV-Alan Pacheco-ESP.pdf',
  cvUrl_en: '/CV-Alan Pacheco-ENG.pdf',
  skills: ['Vue.js', 'Nuxt', 'JavaScript', 'TypeScript', 'C#', '.NET', 'Java', 'Python', 'Firebase'],
  showGallery: true,
}
