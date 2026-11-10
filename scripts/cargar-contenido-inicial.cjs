// Script de un solo uso (2026-11-10): carga los 5 servicios y completa los 4 proyectos académicos.
// Fuente del contenido: docs/diseno-thecodesolutions/contenido-inicial.md
// Requisitos: gcloud con sesión del dueño del proyecto y .env con VITE_FIREBASE_PROJECT_ID.
// Hacer respaldo antes (ver Deploy_Historial.md). Es idempotente: no duplica servicios por slug.
// Uso, desde la raíz del repo:  node scripts/cargar-contenido-inicial.cjs .
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const repo = process.argv[2]
const env = fs.readFileSync(path.join(repo, '.env'), 'utf8')
const PID = env.match(/^VITE_FIREBASE_PROJECT_ID=(.*)$/m)[1].trim().replace(/"/g, '')
const TOKEN = execSync('gcloud auth print-access-token', { encoding: 'utf8' }).trim()
const BASE = `https://firestore.googleapis.com/v1/projects/${PID}/databases/(default)/documents`
const H = { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' }

const enc = (v) => {
  if (v === null) return { nullValue: null }
  if (v instanceof Date) return { timestampValue: v.toISOString() }
  if (Array.isArray(v)) return { arrayValue: { values: v.map(enc) } }
  if (typeof v === 'boolean') return { booleanValue: v }
  if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v }
  if (typeof v === 'object') return { mapValue: { fields: Object.fromEntries(Object.entries(v).map(([k, x]) => [k, enc(x)])) } }
  return { stringValue: String(v) }
}
const fields = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, enc(v)]))
const dec = (f) => Object.fromEntries(Object.entries(f || {}).map(([k, v]) => [k, v.stringValue ?? v.booleanValue ?? v.integerValue ?? v.timestampValue ?? null]))

async function api(method, url, body) {
  const r = await fetch(url, { method, headers: H, body: body ? JSON.stringify(body) : undefined })
  const j = await r.json()
  if (!r.ok) throw new Error(`${method} ${url.replace(PID, '<PID>')} → ${r.status} ${JSON.stringify(j).slice(0, 300)}`)
  return j
}

const faq = (q_es, a_es, q_en, a_en) => ({ q_es, a_es, q_en, a_en })

const SERVICES = [
  {
    slug: 'desarrollo-web', icon: 'web', order: 1,
    title_es: 'Desarrollo web', title_en: 'Web development',
    summary_es: 'Sitios y aplicaciones web rápidos, accesibles y preparados para aparecer en Google, con un panel para que actualices tu contenido.',
    summary_en: 'Fast, accessible websites and web apps built to be found on Google, with an admin panel so you can update your own content.',
    body_es: 'Construimos desde sitios corporativos hasta aplicaciones web completas. Cada proyecto sale optimizado para buscadores, adaptado a móviles y en los idiomas que necesites. Si quieres actualizar textos, imágenes o productos sin depender de nadie, incluimos un panel de administración hecho a la medida de tu negocio.',
    body_en: 'We build everything from company websites to full web applications. Every project ships search-engine optimized, mobile-ready and in the languages you need. If you want to update text, images or products on your own, we include an admin panel tailored to your business.',
    includes_es: ['Diseño adaptado a móvil, tablet y escritorio', 'SEO técnico desde el código', 'Versión en español e inglés si la necesitas', 'Panel de administración para editar tu contenido', 'Formularios de contacto y botón de WhatsApp', 'Publicación, dominio y certificado HTTPS'],
    includes_en: ['Design for mobile, tablet and desktop', 'Technical SEO built in', 'Spanish and English versions if you need them', 'Admin panel to edit your content', 'Contact forms and WhatsApp button', 'Publishing, domain and HTTPS certificate'],
    technologies: ['Vue.js', 'Nuxt', 'JavaScript', 'TypeScript', 'Firebase'],
    faqs: [
      faq('¿Cuánto cuesta un sitio web?', 'Depende del alcance: número de páginas, funcionalidades y si necesitas panel de administración. Tras una conversación corta te enviamos una cotización detallada.', 'How much does a website cost?', 'It depends on the scope: number of pages, features and whether you need an admin panel. After a short call we send you a detailed quote.'),
      faq('¿Cuánto tarda?', 'Un sitio informativo suele tomar de 2 a 4 semanas y uno con panel de administración de 4 a 8. El plazo exacto va en la propuesta.', 'How long does it take?', 'An informational site usually takes 2 to 4 weeks, and one with an admin panel 4 to 8. The exact timeline is in the proposal.'),
      faq('¿Podré editar el contenido yo mismo?', 'Sí. Si lo necesitas, incluimos un panel para cambiar textos, imágenes y proyectos sin tocar código.', 'Can I edit the content myself?', 'Yes. If you need it, we include a panel to change text, images and projects without touching code.'),
      faq('¿Mi sitio aparecerá en Google?', 'Lo construimos con buenas prácticas de SEO técnico y lo registramos en Google Search Console. Nadie puede garantizar una posición concreta, pero sí que el sitio esté bien preparado para competir.', 'Will my site show up on Google?', 'We build it following technical SEO best practices and register it in Google Search Console. Nobody can guarantee a specific ranking, but we make sure the site is well prepared to compete.'),
    ],
  },
  {
    slug: 'apps-moviles', icon: 'mobile', order: 2,
    title_es: 'Apps móviles', title_en: 'Mobile apps',
    summary_es: 'Aplicaciones para Android e iOS conectadas a tus sistemas, pensadas para que tus clientes o tu equipo las usen todos los días.',
    summary_en: 'Android and iOS apps connected to your systems, designed for your customers or your team to use every day.',
    body_es: 'Diseñamos y desarrollamos apps móviles que resuelven una tarea concreta: registrar información en campo, atender clientes, gestionar pedidos o dar seguimiento a operaciones. Empezamos por una primera versión con lo esencial y la mejoramos con el uso real.',
    body_en: 'We design and build mobile apps that solve a specific job: capturing data in the field, serving customers, managing orders or tracking operations. We start with a first version focused on the essentials and improve it based on real use.',
    includes_es: ['Diseño de pantallas y prototipo', 'App para Android e iOS', 'Conexión con tu base de datos o sistema', 'Notificaciones', 'Publicación en Google Play y App Store', 'Soporte después del lanzamiento'],
    includes_en: ['Screen design and prototype', 'Android and iOS app', 'Connection to your database or system', 'Notifications', 'Publishing on Google Play and the App Store', 'Post-launch support'],
    technologies: ['Android', 'iOS', 'Firebase'],
    faqs: [
      faq('¿Cuánto tarda una app?', 'Una primera versión suele tomar de 8 a 12 semanas, según las pantallas y las integraciones.', 'How long does an app take?', 'A first version usually takes 8 to 12 weeks, depending on screens and integrations.'),
      faq('¿Necesito una app o me basta una web?', 'Si tus usuarios necesitan la cámara, notificaciones o trabajar sin conexión, una app tiene sentido. Si no, una web bien hecha suele ser más rápida y económica. Te lo decimos con honestidad en la primera conversación.', 'Do I need an app or is a website enough?', 'If your users need the camera, notifications or offline work, an app makes sense. If not, a well-built website is usually faster and cheaper. We will tell you honestly in the first call.'),
    ],
  },
  {
    slug: 'soluciones-con-ia', icon: 'ai', order: 3,
    title_es: 'Soluciones con IA', title_en: 'AI solutions',
    summary_es: 'Automatización y funciones con inteligencia artificial integradas en tus procesos: menos tareas repetitivas y respuestas más rápidas.',
    summary_en: 'Automation and AI-powered features built into your processes: fewer repetitive tasks and faster answers.',
    body_es: 'Integramos inteligencia artificial donde realmente aporta: generar contenidos, clasificar documentos, responder consultas frecuentes o resumir información. Partimos de un caso de uso concreto, medimos si funciona y recién entonces lo ampliamos.',
    body_en: 'We integrate artificial intelligence where it actually adds value: generating content, classifying documents, answering frequent questions or summarizing information. We start from a concrete use case, measure whether it works, and only then expand it.',
    includes_es: ['Análisis del proceso y del caso de uso', 'Prototipo para validar resultados', 'Integración con tus sistemas', 'Controles de calidad y privacidad de los datos', 'Capacitación a tu equipo'],
    includes_en: ['Process and use-case analysis', 'Prototype to validate results', 'Integration with your systems', 'Quality and data-privacy controls', 'Training for your team'],
    technologies: ['Python', 'Modelos de lenguaje (LLM)', 'Automatización'],
    faqs: [
      faq('¿Qué puede hacer la IA por mi negocio?', 'Depende del proceso. Los casos más comunes son atender consultas, generar borradores de contenido y ordenar información. En la primera conversación revisamos si tu caso es buen candidato.', 'What can AI do for my business?', 'It depends on the process. The most common cases are answering questions, drafting content and organizing information. In the first call we check whether your case is a good fit.'),
      faq('¿Mis datos están seguros?', 'Definimos qué datos se usan, dónde se procesan y quién accede a ellos antes de empezar, y evitamos enviar información sensible cuando no hace falta.', 'Is my data safe?', 'Before starting we define which data is used, where it is processed and who can access it, and we avoid sending sensitive information when it is not needed.'),
    ],
  },
  {
    slug: 'sistemas-a-medida', icon: 'systems', order: 4,
    title_es: 'Sistemas a medida', title_en: 'Custom software',
    summary_es: 'Software de gestión hecho para cómo trabaja tu empresa, no al revés: inventario, ventas, operaciones o lo que necesites ordenar.',
    summary_en: 'Management software built around how your company works, not the other way around: inventory, sales, operations or whatever you need to organize.',
    body_es: 'Cuando las hojas de cálculo o un software genérico ya no alcanzan, construimos un sistema que sigue tus procesos reales. Lo desarrollamos por etapas, con entregas que puedes probar desde el inicio, y lo dejamos documentado para que no dependas de una sola persona.',
    body_en: 'When spreadsheets or off-the-shelf software are no longer enough, we build a system that follows your real processes. We develop it in stages, with deliveries you can test from the start, and we document it so you do not depend on a single person.',
    includes_es: ['Levantamiento de procesos', 'Diseño de la base de datos', 'Usuarios y permisos por rol', 'Reportes', 'Migración de tus datos actuales', 'Documentación y soporte'],
    includes_en: ['Process mapping', 'Database design', 'Users and role-based permissions', 'Reports', 'Migration of your current data', 'Documentation and support'],
    technologies: ['C#', '.NET', 'Java', 'Python'],
    faqs: [
      faq('¿Cuánto tarda un sistema a medida?', 'Entre 8 y 16 semanas para una primera versión, según el número de módulos. Lo dividimos en etapas para que uses partes del sistema antes.', 'How long does custom software take?', 'Between 8 and 16 weeks for a first version, depending on the number of modules. We split it into stages so you can use parts of the system sooner.'),
      faq('¿El sistema será mío?', 'Sí. El código y los datos son tuyos y te entregamos la documentación.', 'Will I own the system?', 'Yes. The code and the data are yours, and we hand over the documentation.'),
    ],
  },
  {
    slug: 'consultoria', icon: 'consulting', order: 5,
    title_es: 'Consultoría', title_en: 'Tech consulting',
    summary_es: 'Te ayudamos a elegir tecnología, planificar el proyecto y reducir riesgos antes de invertir.',
    summary_en: 'We help you choose technology, plan your project and reduce risks before you invest.',
    body_es: 'Antes de contratar un desarrollo conviene tener claro qué construir, con qué tecnología y cuánto puede costar. Revisamos tu idea o tu sistema actual y te entregamos recomendaciones concretas, con prioridades y estimados.',
    body_en: 'Before hiring a development team it pays to be clear on what to build, with which technology and how much it may cost. We review your idea or your current system and deliver concrete recommendations, with priorities and estimates.',
    includes_es: ['Sesión de diagnóstico', 'Revisión de tu sistema o de tu idea', 'Recomendación de tecnología', 'Plan por etapas con estimados', 'Informe escrito'],
    includes_en: ['Diagnostic session', 'Review of your system or idea', 'Technology recommendation', 'Staged plan with estimates', 'Written report'],
    technologies: [],
    faqs: [
      faq('¿Cuánto dura una consultoría?', 'Normalmente de 1 a 2 semanas, desde la primera sesión hasta el informe.', 'How long does a consulting engagement take?', 'Usually 1 to 2 weeks, from the first session to the report.'),
      faq('¿Tengo que desarrollar con ustedes después?', 'No. El informe es tuyo y puedes usarlo con quien quieras.', 'Do I have to build with you afterwards?', 'No. The report is yours and you can use it with anyone.'),
    ],
  },
]

// Proyectos académicos: sin cliente ni resultado inventados (resultado vacío)
const PROJECTS = {
  'KVMI Rewards': {
    slug: 'kvmi-rewards', services: ['soluciones-con-ia', 'desarrollo-web'],
    challenge_es: 'Una marca de chocolate necesitaba fidelizar a sus clientes y producir piezas publicitarias sin depender de un equipo de diseño para cada campaña.',
    challenge_en: 'A chocolate brand needed to build customer loyalty and produce advertising pieces without relying on a design team for every campaign.',
    solution_es: 'Plataforma de recompensas con inteligencia artificial que genera afiches, banners y eslóganes, y un sistema para gestionar campañas y premios.',
    solution_en: 'An AI-powered rewards platform that generates posters, banners and slogans, plus a system to manage campaigns and prizes.',
  },
  'Mikhuna Ecuador': {
    slug: 'mikhuna-ecuador', services: ['desarrollo-web'],
    challenge_es: 'Las recetas caseras estaban dispersas y no había un lugar donde compartirlas, valorarlas y seguir a otros cocineros.',
    challenge_en: 'Home recipes were scattered and there was no place to share them, rate them and follow other cooks.',
    solution_es: 'Comunidad web para publicar y descubrir recetas, con calificaciones, comentarios y seguimiento de favoritos.',
    solution_en: 'A web community to publish and discover recipes, with ratings, comments and favorites.',
  },
  CowID: {
    slug: 'cowid', services: ['apps-moviles'], category: 'mobile',
    challenge_es: 'Llevar el control del ganado en papel dificulta seguir la salud de cada animal y los gastos de alimentación.',
    challenge_en: 'Tracking cattle on paper makes it hard to follow each animal’s health and feeding costs.',
    solution_es: 'App móvil para registrar cada animal, dar seguimiento a enfermedades y controlar los gastos de alimentación.',
    solution_en: 'A mobile app to register each animal, track illnesses and control feeding costs.',
  },
  'Guru Project': {
    slug: 'guru-project', services: ['desarrollo-web', 'sistemas-a-medida'],
    challenge_es: 'Coordinar tareas y plazos de un equipo por chat y hojas de cálculo hace que se pierda el seguimiento del avance.',
    challenge_en: 'Coordinating a team’s tasks and deadlines over chat and spreadsheets makes it easy to lose track of progress.',
    solution_es: 'Plataforma de gestión de proyectos para planificar, asignar tareas y seguir el progreso y el desempeño del equipo.',
    solution_en: 'A project management platform to plan, assign tasks and track the team’s progress and performance.',
  },
}

;(async () => {
  // 1. Servicios (idempotente: no duplica slugs existentes)
  const existing = (await api('GET', `${BASE}/services?pageSize=100`)).documents || []
  const bySlug = Object.fromEntries(existing.map((d) => [dec(d.fields).slug, d.name.split('/').pop()]))
  for (const s of SERVICES) {
    if (bySlug[s.slug]) { console.log(`servicio ya existe, se omite: ${s.slug}`); continue }
    const doc = await api('POST', `${BASE}/services`, { fields: fields({ ...s, published: true, createdAt: new Date() }) })
    bySlug[s.slug] = doc.name.split('/').pop()
    console.log(`servicio creado: ${s.slug}`)
  }

  // 2. Proyectos existentes: solo se actualizan los campos indicados (updateMask)
  const projects = (await api('GET', `${BASE}/projects?pageSize=100`)).documents || []
  for (const p of projects) {
    const f = dec(p.fields)
    const data = PROJECTS[f.title]
    if (!data) { console.log(`proyecto sin datos nuevos, se omite: ${f.title}`); continue }
    const upd = {
      slug: data.slug,
      client: 'Proyecto académico',
      serviceIds: data.services.map((s) => bySlug[s]),
      challenge_es: data.challenge_es, challenge_en: data.challenge_en,
      solution_es: data.solution_es, solution_en: data.solution_en,
    }
    if (data.category) upd.category = data.category
    const mask = Object.keys(upd).map((k) => `updateMask.fieldPaths=${k}`).join('&')
    // p.name es la ruta completa: projects/<PID>/databases/(default)/documents/projects/<id>
    await api('PATCH', `https://firestore.googleapis.com/v1/${p.name}?${mask}`, { fields: fields(upd) })
    console.log(`proyecto actualizado: ${f.title} (${Object.keys(upd).join(', ')})`)
  }
})().catch((e) => { console.error('ERROR:', e.message); process.exit(1) })
