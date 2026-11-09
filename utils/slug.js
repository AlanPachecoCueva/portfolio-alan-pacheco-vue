// Convierte un texto en un slug para URLs: "Desarrollo Web Ágil" → "desarrollo-web-agil".
// Se usa en los formularios del admin para services, team, projects y achievements.
export function slugify(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

// Un slug válido: minúsculas, números y guiones simples, sin guion al inicio ni al final.
export function isValidSlug(slug) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 80
}
