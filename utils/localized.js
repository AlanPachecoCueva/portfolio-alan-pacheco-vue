// Devuelve el campo en el idioma actual con respaldo al español.
// Sirve para los dos esquemas de Firestore:
//   services/team: title_es / title_en      projects/achievements: title / title_en
export function localized(obj, base, locale) {
  if (!obj) return ''
  if (locale === 'en' && obj[`${base}_en`]) return obj[`${base}_en`]
  return obj[`${base}_es`] || obj[base] || ''
}
