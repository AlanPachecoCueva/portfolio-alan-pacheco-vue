// Sitemap generado en el build (se pre-renderiza: ver nitro.prerender.routes en nuxt.config.ts).
// Incluye cada página pública en español (/) y en inglés (/en/...) con sus alternativas hreflang.
// Si se publica contenido nuevo en el admin, aparece en el sitemap en el siguiente build.
import { fetchPublished } from '../../utils/firestore-public.js'
import { FOUNDER } from '../../utils/founder.js'

const BASE = 'https://thecodesolutions.com'

function entry(path, priority) {
  const es = `${BASE}${path || '/'}`
  const en = `${BASE}/en${path}`
  const alternates = [
    `    <xhtml:link rel="alternate" hreflang="es" href="${es}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${es}"/>`,
  ].join('\n')
  return [es, en]
    .map((loc) => `  <url>\n    <loc>${loc}</loc>\n    <priority>${priority}</priority>\n${alternates}\n  </url>`)
    .join('\n')
}

export default defineEventHandler(async (event) => {
  const projectId = useRuntimeConfig(event).public.firebaseProjectId
  const [services, projects, team] = await Promise.all([
    fetchPublished(projectId, 'services'),
    fetchPublished(projectId, 'projects'),
    fetchPublished(projectId, 'team'),
  ])

  const members = team.length ? team : [FOUNDER]
  const urls = [
    entry('', '1.0'),
    ...services.filter((s) => s.slug).map((s) => entry(`/servicios/${s.slug}`, '0.9')),
    ...projects.filter((p) => p.slug).map((p) => entry(`/proyectos/${p.slug}`, '0.8')),
    ...members.filter((m) => m.slug).map((m) => entry(`/equipo/${m.slug}`, '0.6')),
  ]

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
})
