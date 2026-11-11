import { onMounted } from 'vue'
import { fetchPublished, fetchWhereTrue, sortByOrder } from '~/utils/firestore-public.js'

// Datos extra del perfil de un miembro: logros publicados e imágenes de la galería.
// Igual que usePublicContent: en el prerender quedan en el HTML y el cliente los refresca.
export function usePublicProfile() {
  const projectId = useRuntimeConfig().public.firebaseProjectId

  const { data, refresh } = useAsyncData(
    'public-profile',
    async () => {
      const [achievements, images] = await Promise.all([
        fetchPublished(projectId, 'achievements'),
        fetchWhereTrue(projectId, 'images', 'showInGallery'),
      ])
      return {
        achievements: sortByOrder(achievements),
        // Más recientes primero (antes la galería se mezclaba al azar, lo que no sirve en HTML estático)
        images: images.sort((a, b) => (b.uploadedAt?.seconds ?? 0) - (a.uploadedAt?.seconds ?? 0)),
      }
    },
    { default: () => ({ achievements: [], images: [] }) }
  )

  if (import.meta.client) {
    onMounted(() => refresh())
  }

  return { profile: data }
}
