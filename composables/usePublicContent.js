import { onMounted } from 'vue'
import { fetchPublished, sortByOrder } from '~/utils/firestore-public.js'

// Contenido público de TheCodeSolutions (servicios, proyectos y equipo publicados).
// - En el prerender se lee por REST y queda en el HTML (SEO).
// - En el cliente se vuelve a pedir al montar, así lo que se publique en el admin
//   aparece sin esperar a un nuevo deploy.
export function usePublicContent() {
  const projectId = useRuntimeConfig().public.firebaseProjectId

  const { data, pending, refresh } = useAsyncData(
    'public-content',
    async () => {
      const [services, projects, team] = await Promise.all([
        fetchPublished(projectId, 'services'),
        fetchPublished(projectId, 'projects'),
        fetchPublished(projectId, 'team'),
      ])
      return {
        services: sortByOrder(services),
        projects: sortByOrder(projects),
        team: sortByOrder(team, false),
      }
    },
    { default: () => ({ services: [], projects: [], team: [] }) }
  )

  if (import.meta.client) {
    onMounted(() => refresh())
  }

  return { content: data, pending }
}
