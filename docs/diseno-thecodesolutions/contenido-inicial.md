# Contenido inicial de TheCodeSolutions

> Borrador redactado el 2026-11-10 para revisión de Alan. Fuente para cargar en el admin (Servicios, Proyectos) y en `i18n/locales/*.json` (formulario y FAQ).
> Regla: nada de cifras, clientes o resultados inventados. Lo que no se sabe queda vacío y la página no lo muestra.

---

## 1. Rangos de presupuesto (formulario de cotización)

| Valor | Español | English |
|---|---|---|
| `lt-500` | Menos de $500 | Under $500 |
| `500-1000` | $500 a $1.000 | $500 to $1,000 |
| `1000-3000` | $1.000 a $3.000 | $1,000 to $3,000 |
| `3000-8000` | $3.000 a $8.000 | $3,000 to $8,000 |
| `gt-8000` | Más de $8.000 | Over $8,000 |
| `unknown` | Aún no lo sé | Not sure yet |

Montos en dólares estadounidenses (moneda de Ecuador).

## 2. Plazos estimados (FAQ)

Siempre se presentan como **estimados**: el plazo real se confirma en la propuesta.

| Tipo de proyecto | Español | English |
|---|---|---|
| Landing page o sitio informativo | 2 a 4 semanas | 2 to 4 weeks |
| Sitio o aplicación web con panel de administración | 4 a 8 semanas | 4 to 8 weeks |
| App móvil (primera versión) | 8 a 12 semanas | 8 to 12 weeks |
| Integración de IA en un proceso existente | 3 a 8 semanas | 3 to 8 weeks |
| Sistema a medida | 8 a 16 semanas | 8 to 16 weeks |
| Consultoría o auditoría técnica | 1 a 2 semanas | 1 to 2 weeks |

---

## 3. Servicios (colección `services`)

Cargar con **Publicado = No** hasta revisar. Orden sugerido: 1 a 5.

### 3.1 Desarrollo web — `desarrollo-web` · ícono: web · orden 1

- **Título:** Desarrollo web / Web development
- **Resumen ES:** Sitios y aplicaciones web rápidos, accesibles y preparados para aparecer en Google, con un panel para que actualices tu contenido.
- **Summary EN:** Fast, accessible websites and web apps built to be found on Google, with an admin panel so you can update your own content.
- **Descripción ES:** Construimos desde sitios corporativos hasta aplicaciones web completas. Cada proyecto sale optimizado para buscadores, adaptado a móviles y en los idiomas que necesites. Si quieres actualizar textos, imágenes o productos sin depender de nadie, incluimos un panel de administración hecho a la medida de tu negocio.
- **Description EN:** We build everything from company websites to full web applications. Every project ships search-engine optimized, mobile-ready and in the languages you need. If you want to update text, images or products on your own, we include an admin panel tailored to your business.
- **Qué incluye ES:** Diseño adaptado a móvil, tablet y escritorio · SEO técnico desde el código · Versión en español e inglés si la necesitas · Panel de administración para editar tu contenido · Formularios de contacto y botón de WhatsApp · Publicación, dominio y certificado HTTPS
- **What's included EN:** Design for mobile, tablet and desktop · Technical SEO built in · Spanish and English versions if you need them · Admin panel to edit your content · Contact forms and WhatsApp button · Publishing, domain and HTTPS certificate
- **Tecnologías:** Vue.js, Nuxt, JavaScript, TypeScript, Firebase
- **FAQ:**
  - ¿Cuánto cuesta un sitio web? / How much does a website cost? → Depende del alcance: número de páginas, funcionalidades y si necesitas panel de administración. Tras una conversación corta te enviamos una cotización detallada. / It depends on the scope: number of pages, features and whether you need an admin panel. After a short call we send you a detailed quote.
  - ¿Cuánto tarda? / How long does it take? → Un sitio informativo suele tomar de 2 a 4 semanas y uno con panel de administración de 4 a 8. El plazo exacto va en la propuesta. / An informational site usually takes 2 to 4 weeks, and one with an admin panel 4 to 8. The exact timeline is in the proposal.
  - ¿Podré editar el contenido yo mismo? / Can I edit the content myself? → Sí. Si lo necesitas, incluimos un panel para cambiar textos, imágenes y proyectos sin tocar código. / Yes. If you need it, we include a panel to change text, images and projects without touching code.
  - ¿Mi sitio aparecerá en Google? / Will my site show up on Google? → Lo construimos con buenas prácticas de SEO técnico y lo registramos en Google Search Console. Nadie puede garantizar una posición concreta, pero sí que el sitio esté bien preparado para competir. / We build it following technical SEO best practices and register it in Google Search Console. Nobody can guarantee a specific ranking, but we make sure the site is well prepared to compete.

### 3.2 Apps móviles — `apps-moviles` · ícono: mobile · orden 2

- **Título:** Apps móviles / Mobile apps
- **Resumen ES:** Aplicaciones para Android e iOS conectadas a tus sistemas, pensadas para que tus clientes o tu equipo las usen todos los días.
- **Summary EN:** Android and iOS apps connected to your systems, designed for your customers or your team to use every day.
- **Descripción ES:** Diseñamos y desarrollamos apps móviles que resuelven una tarea concreta: registrar información en campo, atender clientes, gestionar pedidos o dar seguimiento a operaciones. Empezamos por una primera versión con lo esencial y la mejoramos con el uso real.
- **Description EN:** We design and build mobile apps that solve a specific job: capturing data in the field, serving customers, managing orders or tracking operations. We start with a first version focused on the essentials and improve it based on real use.
- **Qué incluye ES:** Diseño de pantallas y prototipo · App para Android e iOS · Conexión con tu base de datos o sistema · Notificaciones · Publicación en Google Play y App Store · Soporte después del lanzamiento
- **What's included EN:** Screen design and prototype · Android and iOS app · Connection to your database or system · Notifications · Publishing on Google Play and the App Store · Post-launch support
- **Tecnologías:** Android, iOS, Firebase
- **FAQ:**
  - ¿Cuánto tarda una app? / How long does an app take? → Una primera versión suele tomar de 8 a 12 semanas, según las pantallas y las integraciones. / A first version usually takes 8 to 12 weeks, depending on screens and integrations.
  - ¿Necesito una app o me basta una web? / Do I need an app or is a website enough? → Si tus usuarios necesitan la cámara, notificaciones o trabajar sin conexión, una app tiene sentido. Si no, una web bien hecha suele ser más rápida y económica. Te lo decimos con honestidad en la primera conversación. / If your users need the camera, notifications or offline work, an app makes sense. If not, a well-built website is usually faster and cheaper. We will tell you honestly in the first call.

### 3.3 Soluciones con IA — `soluciones-con-ia` · ícono: ai · orden 3

- **Título:** Soluciones con IA / AI solutions
- **Resumen ES:** Automatización y funciones con inteligencia artificial integradas en tus procesos: menos tareas repetitivas y respuestas más rápidas.
- **Summary EN:** Automation and AI-powered features built into your processes: fewer repetitive tasks and faster answers.
- **Descripción ES:** Integramos inteligencia artificial donde realmente aporta: generar contenidos, clasificar documentos, responder consultas frecuentes o resumir información. Partimos de un caso de uso concreto, medimos si funciona y recién entonces lo ampliamos.
- **Description EN:** We integrate artificial intelligence where it actually adds value: generating content, classifying documents, answering frequent questions or summarizing information. We start from a concrete use case, measure whether it works, and only then expand it.
- **Qué incluye ES:** Análisis del proceso y del caso de uso · Prototipo para validar resultados · Integración con tus sistemas · Controles de calidad y privacidad de los datos · Capacitación a tu equipo
- **What's included EN:** Process and use-case analysis · Prototype to validate results · Integration with your systems · Quality and data-privacy controls · Training for your team
- **Tecnologías:** Python, Modelos de lenguaje (LLM), Automatización
- **FAQ:**
  - ¿Qué puede hacer la IA por mi negocio? / What can AI do for my business? → Depende del proceso. Los casos más comunes son atender consultas, generar borradores de contenido y ordenar información. En la primera conversación revisamos si tu caso es buen candidato. / It depends on the process. The most common cases are answering questions, drafting content and organizing information. In the first call we check whether your case is a good fit.
  - ¿Mis datos están seguros? / Is my data safe? → Definimos qué datos se usan, dónde se procesan y quién accede a ellos antes de empezar, y evitamos enviar información sensible cuando no hace falta. / Before starting we define which data is used, where it is processed and who can access it, and we avoid sending sensitive information when it is not needed.

### 3.4 Sistemas a medida — `sistemas-a-medida` · ícono: systems · orden 4

- **Título:** Sistemas a medida / Custom software
- **Resumen ES:** Software de gestión hecho para cómo trabaja tu empresa, no al revés: inventario, ventas, operaciones o lo que necesites ordenar.
- **Summary EN:** Management software built around how your company works, not the other way around: inventory, sales, operations or whatever you need to organize.
- **Descripción ES:** Cuando las hojas de cálculo o un software genérico ya no alcanzan, construimos un sistema que sigue tus procesos reales. Lo desarrollamos por etapas, con entregas que puedes probar desde el inicio, y lo dejamos documentado para que no dependas de una sola persona.
- **Description EN:** When spreadsheets or off-the-shelf software are no longer enough, we build a system that follows your real processes. We develop it in stages, with deliveries you can test from the start, and we document it so you do not depend on a single person.
- **Qué incluye ES:** Levantamiento de procesos · Diseño de la base de datos · Usuarios y permisos por rol · Reportes · Migración de tus datos actuales · Documentación y soporte
- **What's included EN:** Process mapping · Database design · Users and role-based permissions · Reports · Migration of your current data · Documentation and support
- **Tecnologías:** C#, .NET, Java, Python
- **FAQ:**
  - ¿Cuánto tarda un sistema a medida? / How long does custom software take? → Entre 8 y 16 semanas para una primera versión, según el número de módulos. Lo dividimos en etapas para que uses partes del sistema antes. / Between 8 and 16 weeks for a first version, depending on the number of modules. We split it into stages so you can use parts of the system sooner.
  - ¿El sistema será mío? / Will I own the system? → Sí. El código y los datos son tuyos y te entregamos la documentación. / Yes. The code and the data are yours, and we hand over the documentation.

### 3.5 Consultoría — `consultoria` · ícono: consulting · orden 5

- **Título:** Consultoría / Tech consulting
- **Resumen ES:** Te ayudamos a elegir tecnología, planificar el proyecto y reducir riesgos antes de invertir.
- **Summary EN:** We help you choose technology, plan your project and reduce risks before you invest.
- **Descripción ES:** Antes de contratar un desarrollo conviene tener claro qué construir, con qué tecnología y cuánto puede costar. Revisamos tu idea o tu sistema actual y te entregamos recomendaciones concretas, con prioridades y estimados.
- **Description EN:** Before hiring a development team it pays to be clear on what to build, with which technology and how much it may cost. We review your idea or your current system and deliver concrete recommendations, with priorities and estimates.
- **Qué incluye ES:** Sesión de diagnóstico · Revisión de tu sistema o de tu idea · Recomendación de tecnología · Plan por etapas con estimados · Informe escrito
- **What's included EN:** Diagnostic session · Review of your system or idea · Technology recommendation · Staged plan with estimates · Written report
- **Tecnologías:** (ninguna específica)
- **FAQ:**
  - ¿Cuánto dura una consultoría? / How long does a consulting engagement take? → Normalmente de 1 a 2 semanas, desde la primera sesión hasta el informe. / Usually 1 to 2 weeks, from the first session to the report.
  - ¿Tengo que desarrollar con ustedes después? / Do I have to build with you afterwards? → No. El informe es tuyo y puedes usarlo con quien quieras. / No. The report is yours and you can use it with anyone.

---

## 4. Proyectos (colección `projects`)

Proyectos universitarios, a reemplazar por proyectos de clientes. **Sin clientes ni resultados inventados:** cliente "Proyecto académico" y resultado vacío (la página no muestra los campos vacíos).

| Proyecto | Slug | Servicios | Reto (ES) | Solución (ES) |
|---|---|---|---|---|
| KVMI Rewards | `kvmi-rewards` | Soluciones con IA, Desarrollo web | Una marca de chocolate necesitaba fidelizar a sus clientes y producir piezas publicitarias sin depender de un equipo de diseño para cada campaña. | Plataforma de recompensas con inteligencia artificial que genera afiches, banners y eslóganes, y un sistema para gestionar campañas y premios. |
| Mikhuna Ecuador | `mikhuna-ecuador` | Desarrollo web | Las recetas caseras estaban dispersas y no había un lugar donde compartirlas, valorarlas y seguir a otros cocineros. | Comunidad web para publicar y descubrir recetas, con calificaciones, comentarios y seguimiento de favoritos. |
| CowID | `cowid` | Apps móviles | Llevar el control del ganado en papel dificulta seguir la salud de cada animal y los gastos de alimentación. | App móvil para registrar cada animal, dar seguimiento a enfermedades y controlar los gastos de alimentación. |
| Guru Project | `guru-project` | Desarrollo web, Sistemas a medida | Coordinar tareas y plazos de un equipo por chat y hojas de cálculo hace que se pierda el seguimiento del avance. | Plataforma de gestión de proyectos para planificar, asignar tareas y seguir el progreso y el desempeño del equipo. |

Versión EN de reto y solución: se traduce al cargar.
CowID: corregir su categoría a "Mobile" en el admin (hoy figura como "web").
