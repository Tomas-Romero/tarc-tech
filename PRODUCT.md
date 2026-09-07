# TARC Tech

<!--
Contexto de producto para Impeccable (impeccable.style).
Escrito a mano antes de que exista código, a partir de la entrevista de planificación.
Los encabezados están en inglés a propósito: Impeccable los lee. El contenido va en español.
Si algo acá deja de ser cierto, actualizalo o corré /impeccable init de nuevo.
-->

## Platform

web

Sitio de marketing de una sola página, bilingüe (es / en), responsive. No es una app nativa.

## Users

**Primarios — dueños de PyMEs y comercios de San Rafael y Mendoza (Argentina).**
Kioscos, tiendas de indumentaria, rotiserías, distribuidoras, negocios de servicios. Perfil no técnico. No saben qué es un stack ni les importa. Llegan casi siempre **desde el celular**, por un link enviado por WhatsApp o desde Instagram, muchas veces mientras atienden. No leen textos largos. Su pregunta real es: *"¿este tipo entiende mi problema y es confiable?"*. Su miedo real es: *"pago, desaparece, y quedo con un sistema que nadie mantiene"*.

**Secundarios — empresas, startups o emprendedores con un producto en mente.**
Perfil más técnico, entran desde escritorio. Sí leen el detalle de los proyectos, sí miran las tecnologías, sí evalúan si el proceso de trabajo es serio.

**Terciarios — contactos internacionales y reclutadores (motivo de la versión en inglés).**
Llegan desde LinkedIn o desde el portfolio. Evalúan a Tomás como profesional, no al servicio.

## Product purpose

Que un dueño de negocio que no conoce a TARC Tech entienda en menos de 30 segundos qué le puede resolver, vea que ya se hizo para clientes reales, entienda cómo se trabaja, y **escriba por WhatsApp**.

El sitio tiene **una sola métrica de éxito: clicks a WhatsApp con mensaje pre-cargado.** Todo lo demás existe para bajar la fricción de ese click.

## Positioning

TARC Tech es la marca de **Tomás Agustín Romero**, desarrollador full stack freelance en San Rafael, Mendoza, estudiante avanzado de Ingeniería en Sistemas de Información en la UTN (FRSR), freelance desde 2023.

Lo que un competidor no puede copiar: **la combinación de software realmente a medida con trato directo y presencia local.** No es una agencia con cuenta de soporte; es la misma persona que releva tu negocio, lo construye, te lo entrega y te atiende el WhatsApp seis meses después. Contra las plataformas no-code y las plantillas: el sistema se construye alrededor de cómo trabaja el negocio, no al revés. Contra las agencias grandes: no hay intermediarios ni tickets.

Servicios: software a medida, sistemas y automatizaciones, apps mobile y de escritorio, productos SaaS, diseño e identidad.

## Operating context

Se ve en la calle, con una mano, en un celular de gama media, con datos móviles y a veces con sol sobre la pantalla. **Ese es el dispositivo de referencia, no el monitor del desarrollador.**

La sesión típica dura menos de un minuto. El visitante no vuelve: o escribe ahora o no escribe nunca.

El sitio también funciona como link que Tomás manda en una conversación de WhatsApp ya empezada ("mirá acá lo que hago"). En ese caso el visitante entra ya interesado y busca prueba, no persuasión.

## Capabilities and constraints

**Capacidades**
- Landing única con scroll y anclas. Sin rutas por proyecto.
- Bilingüe completo: español rioplatense e inglés, con selector visible.
- Modo oscuro por defecto con toggle a claro, persistido.
- Detalle de proyectos en modal, en la misma página.

**Restricciones duras**
- **Sin backend, sin base de datos, sin API keys, sin formularios.** Sitio estático.
- **Sin precios de ningún tipo**, en ninguna sección ni idioma. Ni "desde", ni rangos, ni cotizador.
- **Sin testimonios**: todavía no existen reales, y no se inventan.
- **Sin métricas inventadas**: nada de "+50 clientes" ni contadores de proyectos falsos.
- **Sin fotos de stock de personas.** Solo capturas reales de sistemas, logos reales de clientes y la foto animada de Tomás.
- El isotipo facetado se usa **exactamente** como está en el archivo original. Nunca se redibuja ni se aproxima.
- El dominio final todavía no existe: nada de URLs absolutas hardcodeadas.
- Stack fijo: Next.js 15 (App Router), TypeScript, Tailwind CSS, Motion, deploy en Vercel.

## Brand commitments

**Personalidad: preciso, cercano, con oficio.**

- **Preciso.** Se dice qué se hace y qué no. Sin "soluciones 360" ni "transformación digital".
- **Cercano.** Voz en primera persona, tuteo rioplatense ("vos"). El visitante habla con Tomás, no con un departamento. Nunca "nuestro equipo de expertos".
- **Con oficio.** Se muestra el trabajo hecho, no adjetivos sobre el trabajo hecho.

**Voz.** Español rioplatense, directo, sin jerga técnica hacia el visitante no técnico (el stack aparece solo en las tarjetas de proyecto, donde sí corresponde). La versión en inglés se escribe natural, no traducida literal del español.

**Anti-referencias — a esto NO se puede parecer:**

1. **La plantilla de agencia SaaS genérica**: Inter para todo, gradiente violeta a azul, tarjetas dentro de tarjetas, el ícono en cuadradito redondeado arriba de cada título, texto gris sobre fondo de color.
2. **El portfolio de dev con disfraz**: terminal falsa escribiendo `console.log('hello world')`, efecto de tipeo, lluvia de código estilo Matrix.
3. **La web de agencia con stock**: gente sonriendo en una reunión señalando una pantalla, handshakes, oficinas que no existen.
4. **El hype de IA**: "revolucionamos tu negocio", partículas neuronales azules, promesas sin sustancia.
5. **La landing con números inventados**: "+500 clientes felices", "99% de satisfacción", contadores que nadie puede verificar.

**Referencias de actitud (no de estética a copiar):** sitios de estudios de producto pequeños donde la obra se muestra grande y el texto es corto y seguro; documentación técnica bien tipografiada; la sobriedad industrial del zinc con un solo acento cálido.

## Evidence

Lo que existe de verdad y se puede mostrar:

- **Clientes reales:** Modas Vanina (ecommerce/catálogo + panel de administración + rebranding completo de marca) y GatheringHR (sitio de reclutamiento y RRHH).
- **Producto propio en producción con cliente real:** KiosControl, sistema de punto de venta modular para kioscos y comercios (offline, impresión térmica, multi-tenant).
- **Producto propio en desarrollo:** Sistema Gastronómico (menú, admin, POS, panel de mozos, pantalla de cocina). Se muestra marcado "En desarrollo" o no se muestra.
- **Assets:** capturas reales de los sistemas, logos de los clientes, isotipo y logotipo de TARC Tech, foto animada de Tomás.

Lo que **no** existe y por lo tanto no se muestra: testimonios, casos con resultados medidos, cifras de facturación, cantidad de clientes, premios, certificaciones.

Advertencia permanente: las capturas pueden contener datos reales de clientes finales (nombres, teléfonos, montos, direcciones). Se revisan y se difuminan antes de publicarse.

## Design principles

1. **La prueba antes que la promesa.** Una captura real de un sistema funcionando convence más que tres párrafos de adjetivos. Si una sección no puede mostrar algo real, se acorta.
2. **Un solo camino a la acción.** Todo empuja a WhatsApp. No hay un segundo objetivo compitiendo por el mismo espacio.
3. **Naranja es acción; zinc es todo lo demás.** El acento se gana, no se reparte. Si todo brilla, nada guía.
4. **El movimiento explica, salvo una vez.** La animación comunica estado, jerarquía y progreso. La única excepción deliberada es el hero, donde el movimiento *es* la marca presentándose.
5. **El celular de gama media es el juez.** Si ahí se siente lento o cuesta leer, está mal, por más que en el monitor se vea impecable.

## Accessibility

Objetivo: **WCAG 2.1 nivel AA**.

- Contraste AA mínimo en ambos temas. Punto de riesgo conocido: naranja `#F97316` sobre fondos claros — para texto y elementos chicos se usa `#EA580C` o `#C2410C`.
- `prefers-reduced-motion: reduce` respetado sin excepciones: todo el movimiento se reduce a fades cortos o desaparece, incluida la animación del hero y la foto animada.
- Navegación completa por teclado con foco visible: nav, acordeones, filtros, modal y toggles.
- Modal con foco atrapado, cierre con `Esc` y retorno del foco al disparador.
- `alt` reales y descriptivos en todas las capturas. Un solo `<h1>` por página y jerarquía correcta de encabezados.
- `lang` correcto según el idioma activo.
- Objetivos táctiles de 44 px como mínimo. El botón flotante de WhatsApp no puede tapar contenido ni acciones.
