// Lectura pública de Firestore por la API REST (sin el SDK de Firebase).
// Funciona en el prerender (servidor) y en el cliente, así el contenido publicado
// queda dentro del HTML estático (SEO). Las reglas permiten leer sin sesión
// solo documentos con published == true, por eso la consulta siempre filtra por eso.

const FIRESTORE_URL = 'https://firestore.googleapis.com/v1'

// Convierte un Value de la API REST a JS plano. Los Timestamp quedan como { seconds }
// para que se comporten como los del SDK en los ordenamientos (createdAt?.seconds).
function decodeValue(value) {
  if (!value) return null
  if ('stringValue' in value) return value.stringValue
  if ('booleanValue' in value) return value.booleanValue
  if ('integerValue' in value) return Number(value.integerValue)
  if ('doubleValue' in value) return value.doubleValue
  if ('nullValue' in value) return null
  if ('timestampValue' in value) return { seconds: Math.floor(Date.parse(value.timestampValue) / 1000) }
  if ('arrayValue' in value) return (value.arrayValue.values || []).map(decodeValue)
  if ('mapValue' in value) return decodeFields(value.mapValue.fields)
  return null
}

function decodeFields(fields = {}) {
  return Object.fromEntries(Object.entries(fields).map(([key, v]) => [key, decodeValue(v)]))
}

// Mismo criterio que utils/firebase/*.js: primero los que tienen `order` (ASC),
// luego el resto por fecha de creación.
export function sortByOrder(items, newestFirst = true) {
  const withOrder = items.filter((i) => i.order != null).sort((a, b) => a.order - b.order)
  const withoutOrder = items
    .filter((i) => i.order == null)
    .sort((a, b) => {
      const ta = a.createdAt?.seconds ?? 0
      const tb = b.createdAt?.seconds ?? 0
      return newestFirst ? tb - ta : ta - tb
    })
  return [...withOrder, ...withoutOrder]
}

// Documentos publicados de una colección. Si falla (sin red, CI con config de relleno),
// devuelve [] para que el build no se rompa: la página se completa en el cliente.
export async function fetchPublished(projectId, collectionId) {
  if (!projectId || projectId.startsWith('ci-')) return []
  const url = `${FIRESTORE_URL}/projects/${projectId}/databases/(default)/documents:runQuery`
  const body = {
    structuredQuery: {
      from: [{ collectionId }],
      where: {
        fieldFilter: {
          field: { fieldPath: 'published' },
          op: 'EQUAL',
          value: { booleanValue: true },
        },
      },
    },
  }
  try {
    const rows = await $fetch(url, { method: 'POST', body })
    return (rows || [])
      .filter((row) => row.document)
      .map((row) => ({ id: row.document.name.split('/').pop(), ...decodeFields(row.document.fields) }))
  } catch (err) {
    console.warn(`[fetchPublished] ${collectionId}:`, err?.message || err)
    return []
  }
}
