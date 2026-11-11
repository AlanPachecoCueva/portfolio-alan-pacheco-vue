// Meta description para buscadores: Google muestra ~155-160 caracteres y corta el resto.
// Recorta en el último espacio antes del límite y añade "…". El texto completo sigue en la página.
export function metaDescription(text, max = 155) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:]+$/, '')}…`
}
