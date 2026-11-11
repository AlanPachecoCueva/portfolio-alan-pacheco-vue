# Estudio de páginas informativas y roadmap SEO — TheCodeSolutions

_Fecha: 2026-11-10 · Estado: propuesta, sin implementar_

## 1. Objetivo

Que TheCodeSolutions aparezca cuando una empresa o emprendedor de Ecuador busca **contratar** desarrollo de software, no solo cuando busca la marca. Hoy el sitio compite con 1 home, 5 servicios, 4 proyectos y 1 perfil. Cada página nueva y útil es una entrada más desde Google.

**Límite de este estudio:** no hay una herramienta de volumen de búsquedas (Keyword Planner, Ahrefs). Las prioridades salen de la competencia, de los huecos de contenido y de las necesidades propias del mercado ecuatoriano. A las 4–6 semanas de publicar hay que validarlas con las consultas reales de Google Search Console (fase 4).

## 2. Hallazgos

### 2.1 Competencia en Quito
- Las empresas locales aparecen sobre todo en **directorios**: Clutch, GoodFirms, DesignRush, Elioplus, ConnectAmericas. Por ejemplo, PULPO, SaviaSoft, Wycro, Big Project, SimCodec (2–9 empleados, fundada en 2025) y Kruger.
  - Esos perfiles dan enlaces y confianza.
  - **TheCodeSolutions no está en ninguno** → oportunidad barata (fase 0).
- Los competidores se presentan casi igual: "software a medida, apps, CRM/ERP, Scrum". Casi ninguno publica contenido que responda dudas concretas del cliente ecuatoriano.

### 2.2 Las preguntas de precio no tienen buena respuesta local
- "¿Cuánto cuesta una página web en Ecuador?" se responde con blogs de hosting (Neolo, Hostinger) que hablan de plantillas de USD 65, o con cifras de otros países.
- Para apps móviles solo hay guías globales: de USD 30.000 a más de 500.000, y otras de USD 7.500–65.000. **No hay una fuente ecuatoriana seria.**
- Una guía honesta, con rangos reales de TheCodeSolutions y los factores que mueven el precio, sería de lo mejor que se encuentra para esas búsquedas. Además es exactamente la duda de quien está por contratar.

### 2.3 Necesidades técnicas propias de Ecuador (contenido que un competidor extranjero no cubre)
- **Facturación electrónica del SRI:** es obligatoria y se emite en XML firmado (XAdES-BES) y enviado por SOAP. Según proveedores del sector, el SRI pide transmisión en tiempo real desde 2026, y los comprobantes se guardan 7 años. Toda tienda o sistema de ventas a medida tiene que integrarla.
- **Pasarelas de pago locales:** Payphone (links de pago, 6 % al retirar según Primicias), Datafast (vía PagoMedios), Kushki, Paymentez y PlacetoPay. Quien quiere vender en línea en Ecuador necesita saber cuál integrar.
- **Ley Orgánica de Protección de Datos Personales (LOPDP):** exigible desde mayo de 2023, con reglamento desde noviembre de 2023.
  - El consentimiento es opt-in, es decir, la persona tiene que aceptarlo expresamente.
  - Existe la figura de delegado de protección de datos.
  - Hay una norma de transferencias de 2025 y otra de datos en sistemas de IA de febrero de 2026.
  - Todo sitio con formularios debe cumplirla, **incluido el nuestro** (ver fase 0).
- **WhatsApp:** es el canal de atención por defecto. La API de WhatsApp Business con chatbot es la opción para volumen alto, y encaja con el servicio "Soluciones con IA".

### 2.4 Lo que Google permite y lo que castiga
- Google castiga el "doorway abuse": páginas casi iguales hechas para posicionar en búsquedas parecidas, como "desarrollo web Quito", "desarrollo web Guayaquil" o "desarrollo web Cuenca" con el mismo texto cambiando la ciudad.
- **Conclusión:** nada de páginas por ciudad sin presencia real. Las páginas por sector o necesidad son válidas si tienen contenido propio: casos reales, preguntas reales, detalles locales.

### 2.5 Activos que ya tenemos y que casi nadie tiene
Hay casos reales que sirven de base para páginas de sector:
- **CowID:** gestión de ganado.
- **Mikhuna:** gastronomía.
- **KVMI Rewards:** fidelización.
- **Guru:** el sector está por definir.

Un caso real con capturas es justo lo que Google pide para distinguir una página útil de una página de relleno.

## 3. Páginas propuestas

Cada página lleva un `<h1>` con la búsqueda principal, un título de menos de 60 caracteres, una descripción de unos 155, FAQ con JSON-LD `FAQPage`, enlaces internos al servicio y al caso relacionados, y una llamada a cotizar. Va en ES; en EN solo cuando hay intención internacional (ver 3.6).

### 3.1 Guías de precio (prioridad alta: es la búsqueda de quien está por comprar)

| URL propuesta | Búsquedas objetivo | Contenido |
|---|---|---|
| `/guias/cuanto-cuesta-una-pagina-web-en-ecuador` | cuánto cuesta una página web en Ecuador, precio página web Quito | Tipos de sitio (landing, corporativo, tienda, aplicación web) con **rangos reales de TCS**. Qué sube o baja el precio: páginas, idiomas, panel admin, integraciones. Costos recurrentes: dominio .com/.ec, hosting, mantenimiento. Plantilla frente a desarrollo a medida. Un ejemplo de cotización. FAQ |
| `/guias/cuanto-cuesta-una-app-movil-en-ecuador` | cuánto cuesta una app en Ecuador, desarrollar app precio | MVP frente a app completa; nativa frente a multiplataforma; backend; publicación en tiendas (cuentas de Apple y Google); mantenimiento. Rangos de TCS. Caso CowID como referencia |
| `/guias/cuanto-cuesta-un-sistema-a-medida` | precio software a medida Ecuador, cuánto cuesta un sistema de inventario | Cómo se estima (módulos, usuarios, integraciones como el SRI); pago por fases; a medida frente a licencia mensual |

### 3.2 Soluciones por necesidad en Ecuador (prioridad alta: contenido local que nadie cubre)

| URL propuesta | Búsquedas objetivo | Contenido |
|---|---|---|
| `/soluciones/facturacion-electronica-sri` | integrar facturación electrónica SRI, sistema con facturación electrónica | Cuándo conviene integrarla en tu propio sistema y cuándo basta un facturador comercial. Requisitos: RUC, firma electrónica, ambiente de pruebas. Transmisión en tiempo real y contingencia. Cómo lo hacemos. **Se valida contra la ficha técnica oficial del SRI antes de publicar** |
| `/soluciones/tienda-en-linea-con-pagos-en-ecuador` | tienda online Ecuador, pasarela de pagos Ecuador, Payphone/Datafast/Kushki | Comparativa de pasarelas (requisitos, comisiones vigentes, tiempos de alta) y cómo encaja con la facturación del SRI. **Las comisiones se confirman con cada proveedor antes de publicar** |
| `/soluciones/chatbot-whatsapp-con-ia` | chatbot WhatsApp empresas Ecuador, automatizar WhatsApp | App gratuita frente a API de WhatsApp Business; qué se puede automatizar; costos de Meta por conversación; datos personales y LOPDP |
| `/soluciones/sistema-de-inventario-y-ventas` | sistema de inventario pymes Ecuador, software de ventas a medida | Cuándo conviene a medida y cuándo empaquetado (POS/ERP); integración con el SRI; funcionamiento sin internet; caso relacionado |

### 3.3 Sectores con caso real (prioridad media: solo donde hay proyecto que mostrar)

| URL propuesta | Caso base | Contenido |
|---|---|---|
| `/sectores/software-para-ganaderia` | CowID | Problemas del sector: registro de animales, trazabilidad, trabajo sin conexión en el campo. Qué construimos y qué se podría construir. FAQ |
| `/sectores/apps-para-restaurantes` | Mikhuna | Menú digital, pedidos, reservas, fidelización |
| `/sectores/programas-de-fidelizacion` | KVMI Rewards | Puntos, recompensas, registro, panel de la marca |

Se agrega un sector nuevo solo cuando haya un caso real para él. Evita el problema de 2.4.

### 3.4 Comparativas para decidir (prioridad media)
- `/guias/software-a-medida-vs-erp`: a medida frente a ERP o software empaquetado para pymes.
- `/guias/app-nativa-vs-multiplataforma-vs-web`: app nativa, multiplataforma o aplicación web.
- `/guias/wordpress-vs-desarrollo-a-medida`: WordPress o desarrollo a medida.

Las tres responden una duda real con una recomendación clara según el caso, y enlazan al servicio.

### 3.5 Cumplimiento y confianza

| Página | Por qué |
|---|---|
| `/privacidad` (**obligatoria**) | El formulario de cotización guarda nombre, correo y teléfono en Firestore. La LOPDP exige informar el tratamiento. Hoy solo hay una casilla de consentimiento, sin política enlazada. Hay que redactarla con un abogado o validarla con uno |
| `/guias/tu-sitio-web-y-la-lopdp` | Qué necesita un sitio ecuatoriano: política, consentimiento opt-in, formularios, cookies, delegado. Contenido útil que además demuestra que sabemos hacerlo bien. Se revisa con un abogado antes de publicar |
| Casos con resultados | Completar `result_es/en` de cada proyecto con datos reales (usuarios, tiempos, ahorro). Hoy están vacíos a propósito: no se inventan |

### 3.6 Versión en inglés
Solo para la búsqueda internacional de nearshore ("software development company Ecuador", "nearshore developers Ecuador"). Wycro, por ejemplo, ya se posiciona como equipo en Quito con horario de EE. UU.
- Una sola página `/en/nearshore-software-development-ecuador` con zona horaria, idioma, costos y forma de trabajo.
- Las guías de precio y del SRI son solo para Ecuador: no se traducen.

## 4. Infraestructura necesaria (una sola vez)

**Recomendación:** colección `articles` en Firestore, editable desde el admin, con el mismo patrón que `services`:
- **Esquema:** `slug, type (guia|solucion|sector), title_es, summary_es, body_es (Markdown), faqs[], relatedServiceIds[], relatedProjectIds[], published, publishedAt, updatedAt`.
- **Páginas:** `pages/guias/[slug].vue`, `pages/soluciones/[slug].vue` y `pages/sectores/[slug].vue`, con una plantilla compartida, breadcrumbs y JSON-LD `Article` + `FAQPage`.
- **Prerender y sitemap:** las páginas entran al prerender porque el crawler las encuentra desde un índice `/guias`. El sitemap lee `articles` publicados.
- **Markdown seguro:** no se usa `v-html` con datos de Firestore sin sanitizar (principio 2 de CLAUDE.md).
  - Opciones: un renderizador mínimo propio que solo acepte títulos, párrafos, listas, enlaces y negritas; o una librería, con auditoría de dependencias previa (AUD-XXX).
  - La primera opción evita añadir dependencias.
- **Por qué Firestore y no archivos en el repo:** se redacta y corrige desde el admin.
  - Igual que hoy con los servicios, lo publicado después del último build se sirve por el SPA fallback, que Google renderiza aunque con menos fuerza.
  - Por eso se agrupan las publicaciones y se hace **un deploy por tanda**, por ejemplo mensual (política de créditos de Netlify).

## 5. Roadmap

| Fase | Cuándo | Qué | Quién |
|---|---|---|---|
| **0. Base** | Esta semana | Enviar sitemap y pedir indexación en Search Console · Perfil de Empresa en Google (Quito) · Página de empresa en LinkedIn · Perfiles en Clutch, GoodFirms y DesignRush con enlace al sitio · Mismo nombre, teléfono y dirección en todos | Usuario |
| | | Página `/privacidad` y enlace desde el formulario y el pie de página. **Texto validado por un abogado** | Claude (código y borrador) + usuario (validación) |
| **1. Infraestructura + precios** | Semanas 2–4 | Colección `articles`, admin, plantillas, índice `/guias`, sitemap y JSON-LD · Las 3 guías de precio (3.1) | Claude · Usuario: **rangos de precio reales** |
| | | Deploy 1 de la tanda | Usuario |
| **2. Soluciones Ecuador** | Mes 2 | Las 4 páginas de 3.2 (SRI, pagos, WhatsApp con IA, inventario) | Claude redacta · Usuario valida datos técnicos y tarifas |
| | | Deploy 2 | Usuario |
| **3. Sectores y casos** | Mes 3 | 3 páginas de sector (3.3) · Resultados reales en los casos · Testimonios si los hay | Usuario aporta datos y capturas · Claude redacta |
| | | Deploy 3 | Usuario |
| **4. Medir e iterar** | Desde el mes 3 | Revisar en Search Console las consultas con impresiones y pocos clics: mejorar títulos y descripciones, y crear páginas para las consultas sin cubrir · Comparativas (3.4) · Página LOPDP (3.5) · Página nearshore EN (3.6) | Ambos |

### Indicadores (Search Console, mensual)
- Impresiones y clics fuera de la marca (consultas que no contienen "code solutions").
- Posición media de las 5 búsquedas de servicio y de las 3 de precio.
- Cotizaciones en el admin → Leads por mes y desde qué página llegan. Esto requiere guardar la página de origen en el lead: es un cambio pequeño para la fase 1.

### Lo que el usuario tiene que aportar
- Rangos de precio reales por tipo de proyecto (fase 1). **Bloquea las guías de precio.**
- Resultados reales de los proyectos y, si existen, testimonios (fase 3).
- Validación legal de la política de privacidad y de la guía LOPDP.
- Acceso a la cuenta de cada proveedor de pagos o tarifas vigentes, si se quiere publicar una comparativa con cifras.

## 6. Fuentes consultadas
- Competencia y directorios:
  - [Clutch: SimCodec](https://clutch.co/profile/simcodec)
  - [Clutch: desarrolladores de apps en Ecuador](https://clutch.co/ec/app-developers)
  - [Elioplus: PULPO](https://elioplus.com/profiles/channel-partners/136697/pulpo)
  - [GoodFirms: Wycro](https://www.goodfirms.co/company/wycro-software-developers)
  - [ConnectAmericas: SaviaSoft](https://connectamericas.com/pt/company/saviasoft-somos-software)
  - [Nearshore Americas: Quito](https://nearshoreamericas.com/quitos-small-software-developers-growing/)
  - [DesignRush Ecuador](https://www.designrush.com/agency/website-design-development/ec)
- Precios:
  - [Neolo: cuánto cuesta una página web en Ecuador 2026](https://www.neolo.com/blog/?p=16672)
  - [Hostinger: precio de una página web 2026](https://www.hostinger.com/co/tutoriales/?p=9005)
  - [Innowise: coste de apps 2026](https://innowise.com/es/blog/mobile-development-cost/)
  - [AppMaster: costo de una app](https://appmaster.io/es/blog/costo-de-desarrollar-una-aplicacion)
  - [GlobalCostData: salario de desarrollador móvil en Ecuador](https://globalcostdata.com/es/salary/ecuador/mobile-developer/)
- SRI:
  - [Siigo: facturador electrónico SRI](https://www.siigo.com/ec/blog/contabilidad-y-finanzas/facturador-electronico-sri/)
  - [Edicom: factura electrónica en Ecuador](https://edicomgroup.com/es/blog/como-es-la-factura-electronica-en-ecuador)
  - [Repositorio ESPE: facturación electrónica](https://repositorio.espe.edu.ec/bitstreams/d55eb1fa-ac84-4b74-bab9-6d68b96a9d09/download)
- Pagos:
  - [Primicias: botones de pago para emprendedores](https://www.primicias.ec/noticias/economia/botones-pago-digital-emprendedores-ecuador)
  - [Kushki: historia de las pasarelas de pago](https://kushkipagos.com/en/blog/de-2006-hasta-hoy-la-historia-y-desarrollo-de-las-pasarelas-de-pago)
- LOPDP:
  - [NMS Law: delegado de protección de datos](https://nmslaw.com.ec/blog/2025/12/15/recordatorio-plazo-delegado-proteccion-datos-personales-ecuador/)
  - [LexLatin: transferencias de datos](https://lexlatin.com/entrevistas/ecuador-regula-transferencias-datos-personales-riesgo-fuga-datos)
  - [Allende: datos personales e IA (2026)](https://allende.com/privacidad-y-ciberseguridad/ecuador-nuevas-pautas-para-la-proteccion-de-datos-personales-en-el-desarrollo-y-operacion-de-ia-03-20-2026/)
  - [Texto de la ley (UTPL)](https://procuraduria.utpl.edu.ec/sitios/documentos/NormativasPublicas/Ley%20de%20Org%C3%A1nica%20de%20Protecci%C3%B3n%20de%20Datos.pdf)
- WhatsApp:
  - [HubSpot: API de WhatsApp](https://blog.hubspot.es/marketing/que-es-api-whatsapp)
  - [SendPulse: apps para WhatsApp empresarial](https://sendpulse.com/latam/blog/mejores-aplicaciones-para-whatsapp-empresarial)
- Inventario:
  - [Siigo: POS con inventario en Ecuador 2026](https://www.siigo.com/ec/blog/tecnologia-e-innovacion/sistema-pos-con-inventario-ecuador/)
- Políticas de Google:
  - [Google: políticas de spam](https://developers.google.com/search/docs/advanced/guidelines/malicious-behavior)
  - [BrightLocal: páginas locales](https://www.brightlocal.com/learn/local-seo/local-search-optimization/local-landing-pages)
  - [Search Engine Journal: cambio a "doorway abuse"](https://www.searchenginejournal.com/google-updates-their-spam-policy-documentation)

> Varias fuentes son blogs de proveedores. Las cifras de tarifas, comisiones y normas se vuelven a confirmar en la fuente oficial (SRI, SPDP, cada pasarela) al redactar cada página.
