# Plan de desarrollo — Landing TARC Tech

> Documento de especificación para Claude Code.
> Autor del proyecto: Tomás Agustín Romero (TARC Tech) — San Rafael, Mendoza, Argentina.
> Estado: plan cerrado tras entrevista. Listo para ejecutar.

---

## 0. Cómo usar este documento (leer primero, Claude Code)

1. Este documento es la **fuente de verdad** del proyecto. Si algo no está acá, se pregunta antes de inventar.
2. **No inventes contenido**: ni proyectos, ni clientes, ni testimonios, ni métricas, ni cifras de facturación. Todo el contenido real está en la sección 7. Lo que falte se deja como `TODO:` visible en el código y se avisa a Tomás.
3. **No inventes imágenes**: no se usan fotos de stock de personas ni renders genéricos. Las imágenes son capturas reales de los sistemas y logos reales de clientes, provistas por Tomás (ver sección 9). Si falta una, se usa un placeholder marcado y se avisa.
4. **No publiques precios** de ningún tipo. Decisión tomada y cerrada (ver sección 3).
5. **Se construye por fases** (sección 13). Al terminar cada fase: mostrar el resultado, esperar feedback de Tomás y recién ahí seguir. El propio método de trabajo de TARC Tech es iterativo con feedback: el desarrollo de esta web tiene que funcionar igual.
6. **Impeccable manda en lo visual fino**. Este plan define estructura, contenido e intención de marca. Los tokens, escalas tipográficas, espaciados y el criterio estético final los define `DESIGN.md` generado por `/impeccable init`. No dupliques ni contradigas ese archivo.

---

## 1. Objetivo del proyecto

Construir la web oficial de **TARC Tech** (Tomas Agustin Romero Code), la empresa/marca personal de Tomás Romero, desarrollador full stack freelance.

**Objetivo de negocio:** que un dueño de negocio o empresa que no conoce a Tomás entienda en menos de 30 segundos qué le puede resolver, vea que ya lo hizo para clientes reales, entienda cómo se trabaja, y **le escriba por WhatsApp**.

**Métrica de éxito única:** clicks en WhatsApp con mensaje pre-cargado.

Todo lo demás en la página (proyectos, proceso, sobre mí) existe para reducir la fricción de ese click.

---

## 2. Audiencia

**Primaria:** dueños de PyMEs, comercios y emprendimientos de San Rafael y Mendoza (kioscos, tiendas de indumentaria, gastronómicos, servicios). Perfil poco técnico. Entran desde **el celular**, muchas veces desde un link enviado por WhatsApp o desde Instagram. No leen textos largos. Necesitan confianza y una vía de contacto inmediata.

**Secundaria:** empresas o startups que buscan un desarrollador para un producto a medida o un SaaS. Perfil más técnico, entran desde escritorio, sí leen el detalle de los proyectos y miran el stack.

**Terciaria (motiva la versión en inglés):** clientes o reclutadores del exterior, plataformas de freelance, contactos vía LinkedIn.

**Implicancias de diseño:** mobile-first real, no "responsive después". Peso y velocidad importan más que la cantidad de efectos. La versión desktop puede permitirse más despliegue visual.

---

## 3. Decisiones ya tomadas (cerradas — no volver a preguntar)

| # | Decisión | Valor |
|---|---|---|
| D1 | Acción de conversión | WhatsApp con mensaje pre-cargado contextual |
| D2 | Arquitectura | **Una sola landing larga con scroll** + anclas. Detalle de proyectos en modal, no en rutas separadas |
| D3 | Precios | **No se muestran precios de ningún tipo.** La sección de "presupuestos" se convierte en "Qué te puedo desarrollar" |
| D4 | Proyectos a mostrar | Clientes reales (Modas Vanina, GatheringHR, KiosControl en cliente) + productos propios (KiosControl, Sistema Gastronómico). Frakta, Portfolio y UTN Emprende quedan fuera de la v1 |
| D5 | Material visual | Capturas reales de los sistemas + logos de clientes, provistos por Tomás |
| D6 | Stack | Next.js 15 (App Router) + TypeScript + Tailwind CSS + Motion. Deploy en Vercel |
| D7 | Canales de contacto | WhatsApp (principal) + email visible. **Sin formulario, sin backend, sin API keys** |
| D8 | Animación | Base intermedia + **un momento de alto impacto en el hero** y un segundo momento fuerte en la sección Proceso |
| D9 | Tema | Modo oscuro por defecto + toggle a modo claro (persistido) |
| D10 | Idiomas | **Español (rioplatense) e inglés**, con selector visible |
| D11 | Sistema de diseño | Impeccable (`impeccable.style`) — ver sección 13 |
| D12 | Sección personal | "Sobre mí" con foto animada + links a LinkedIn, portfolio y WhatsApp |
| D13 | Dominio | Aún no comprado. Se usará el dominio incluido con el hosting que Tomás contrate. El código no debe depender del dominio final (usar rutas relativas y una variable `NEXT_PUBLIC_SITE_URL`) |

---

## 4. Identidad de marca

### Nombre
**TARC Tech** — de *Tomas Agustin Romero Code*.

### Paleta

| Rol | Hex |
|---|---|
| Naranja principal | `#F97316` |
| Naranja hover | `#EA580C` |
| Naranja fondo suave | `#FFEDD5` |
| Naranja glow | `#C2410C` |
| Neutros | Escala **zinc** completa (dark + light) |
| Acento técnico | Cyan `#06B6D4` |
| Acento éxito | Verde `#10B981` |

Regla de uso: el naranja es acento y acción (CTAs, highlights, líneas de acento), **no** fondo dominante. La base es zinc. Cyan y verde se usan con mucha moderación (estados, detalles técnicos, badges), nunca como color de sección.

### Tipografías

| Uso | Fuente |
|---|---|
| Logotipo "TARC Tech" | **Sansation** (Bernd Montag) |
| Fuente principal / UI / cuerpo | **Fira Sans** (Carrois Apostrophe) |
| Contraste y palabras clave | **Fraunces** (itálica o regular) |

Cargar con `next/font` (self-hosted) para evitar layout shift. Fraunces se usa con criterio: una o dos palabras destacadas dentro de titulares, no párrafos enteros.

### Isotipo
Diseño **facetado / low-poly**: una "T" formada por cintas angulares (barra superior tipo flecha con colas en diagonal, tallo dividido en dos tiras que convergen en punta abajo, cada cara facetada en naranja claro y rojo-naranja oscuro), flanqueada por corchetes angulares `< >` gruesos, también facetados.

**Regla crítica:** el isotipo debe preservarse **exactamente** como está en el PNG/SVG que provee Tomás. Se vectoriza o se traza el archivo original. **No se redibuja a mano ni se aproxima.** Si hace falta animarlo, se animan los paths del SVG original.

---

## 5. Stack y arquitectura técnica

```
Next.js 15 (App Router) + TypeScript
Tailwind CSS
Motion (ex Framer Motion) para animación
next/font  → Sansation, Fira Sans, Fraunces (self-hosted)
next/image → optimización de todas las capturas
next-themes o implementación propia → dark/light persistido
Deploy: Vercel
Sin backend. Sin base de datos. Sin variables secretas.
```

### Por qué este stack
- `next/image` resuelve solo el mayor riesgo del proyecto: muchas capturas pesadas.
- Metadata, sitemap, robots y Open Graph nativos → SEO local sin plugins.
- Es el mismo stack que Tomás ya usa en KiosControl: cero curva de aprendizaje.
- Deploy gratuito en la cuenta de Vercel que ya tiene.

### Estructura de rutas (i18n)

```
/            → redirige a /es
/es          → landing en español
/en          → landing en inglés
```

Implementación: segmento dinámico `app/[locale]/page.tsx` con `generateStaticParams` para `['es','en']`. **Todo el copy vive en diccionarios**, no hardcodeado en los componentes:

```
src/i18n/es.json
src/i18n/en.json
```

No instalar una librería de i18n pesada: con dos diccionarios tipados y un helper `getDictionary(locale)` alcanza y sobra para un sitio de una sola página. El toggle de idioma cambia la ruta (`/es` ↔ `/en`) preservando el ancla actual.

Agregar `hreflang` (`es`, `en`, `x-default`) en el `<head>`.

### Estructura de carpetas sugerida

```
src/
  app/
    [locale]/
      layout.tsx
      page.tsx
    globals.css
    sitemap.ts
    robots.ts
  components/
    layout/      → Nav, Footer, WhatsAppFab, ThemeToggle, LocaleToggle
    sections/    → Hero, Trust, Services, Solutions, Process, Projects, About, Faq, Contact
    ui/          → primitivos reutilizables (Button, Card, Modal, Badge, SectionHeader)
    motion/      → wrappers de animación (Reveal, Parallax, Counter)
  data/
    projects.ts  → datos de proyectos tipados (ver sección 7)
    services.ts
    process.ts
  i18n/
    es.json
    en.json
    index.ts
  lib/
    whatsapp.ts  → helper de deep links
public/
  brand/         → isotipo, logotipo, favicon, og-image
  projects/      → capturas por proyecto
  clients/       → logos de clientes
  about/         → foto animada de Tomás
```

---

## 6. Estructura de la landing, sección por sección

Orden final del scroll. Cada sección indica: propósito, contenido, animación y CTA.

### 6.1 Navbar (fija, con blur al scrollear)
- Izquierda: isotipo + logotipo "TARC Tech" (Sansation).
- Centro (desktop): anclas → Servicios · Proceso · Proyectos · Sobre mí · Contacto.
- Derecha: toggle idioma (ES/EN), toggle tema, botón CTA "Hablemos" → WhatsApp.
- Mobile: menú hamburguesa a pantalla completa con las mismas anclas y el CTA abajo, siempre visible.
- Comportamiento: transparente arriba del todo, con fondo blur + borde sutil al scrollear. Scroll suave a las anclas con offset por la altura del nav.

### 6.2 Hero — **momento de alto impacto**
Propósito: identidad + promesa + acción, en una pantalla.

- **Titular (ES):** "Software a medida para tu empresa o negocio." — con "a medida" en Fraunces itálica.
- **Titular (EN):** "Custom software for your business."
- **Bajada (ES):** "Sistemas, apps y automatizaciones desarrollados desde cero para cómo trabaja tu negocio. Relevamos, proponemos, desarrollamos con tu feedback y te acompañamos después."
- **Bajada (EN):** "Systems, apps and automations built from scratch around how your business actually works. We scope it, propose it, build it with your feedback, and support it after launch."
- **CTA primario:** "Contame tu proyecto" → WhatsApp.
- **CTA secundario:** "Ver proyectos" → ancla `#proyectos`.
- Micro-línea de firma debajo: "Desarrollado por Tomás Romero · San Rafael, Mendoza".

**Animación de alto impacto:** el isotipo facetado se **arma pieza por pieza** al cargar — las cintas de la "T" entran desde sus diagonales y los corchetes `< >` cierran desde los costados, con un stagger de ~60 ms y un leve destello del naranja glow `#C2410C` al encajar. De fondo, una grilla técnica sutil sobre zinc con un gradiente naranja que reacciona a la posición del mouse (en mobile, reacciona a un movimiento lento automático, no al touch).

**Restricciones obligatorias:**
- La animación **no puede bloquear el LCP**: el titular se renderiza inmediatamente, la animación del isotipo corre en paralelo.
- Con `prefers-reduced-motion: reduce`, el isotipo aparece ya armado con un fade simple.
- En mobile, versión reducida: sin seguimiento de mouse, menos partículas, misma secuencia de armado.
- Ejecutar con `/impeccable shape` antes de construir y `/impeccable overdrive` para refinar el efecto.

### 6.3 Barra de confianza
Tira de logos de clientes reales en escala de grises, que pasan a color en hover, con marquee lento e infinito en mobile.
Encima, una línea breve: "Negocios que ya trabajan con software hecho a medida."

### 6.4 Servicios — "Qué hago"
Grid de tarjetas (2 columnas en desktop, 1 en mobile), cada una con ícono lineal en naranja, título y 2 líneas de descripción:

1. **Software a medida** — Sistemas hechos para tu forma de trabajar, no al revés.
2. **Sistemas y automatizaciones** — Eliminamos el trabajo repetitivo: planillas, cargas manuales, reportes.
3. **Apps mobile y de escritorio** — Aplicaciones que funcionan donde trabajás, incluso sin internet.
4. **Productos SaaS** — Plataformas multi-cliente pensadas para escalar y venderse por suscripción.
5. **Diseño e identidad** — Interfaces y marca cuidadas: logo, paleta, tipografía y experiencia.

Animación: reveal escalonado al entrar en viewport, elevación y borde naranja en hover.

### 6.5 Soluciones — "Qué te puedo desarrollar"
> Esta sección **reemplaza** a la de presupuestos. **Sin precios.**

Propósito: que el visitante se reconozca en un caso concreto y escriba.

Formato: acordeón o tarjetas expandibles. Cada ítem = un tipo de solución con un ejemplo real corto y un CTA propio a WhatsApp con mensaje pre-cargado específico.

- **Sistema de ventas y stock** — para kioscos, comercios y distribuidoras. *Ejemplo: KiosControl.*
- **Tienda online y catálogo digital** — con panel para cargar productos sin saber programar. *Ejemplo: Modas Vanina.*
- **Gestión gastronómica** — pedidos, cocina, mozos y caja conectados. *Ejemplo: Sistema Gastronómico.*
- **Web institucional o de servicios** — presencia profesional que genera contactos. *Ejemplo: GatheringHR.*
- **Automatizaciones a medida** — reportes, integraciones y tareas repetitivas resueltas solas.
- **¿Lo tuyo no está en la lista?** — tarjeta de cierre con CTA directo: "Contame qué necesitás".

Nota para Claude Code: cada CTA usa un `text` distinto en el deep link de WhatsApp (ver sección 8), para que Tomás sepa desde qué solución llegó la consulta.

### 6.6 Proceso — **segundo momento fuerte**
Propósito: mostrar que hay un método, no improvisación. Es el diferencial que Tomás quiere comunicar.

Cinco pasos, con timeline vertical en mobile y horizontal en desktop:

1. **Relevamiento** — Entiendo tu negocio y detecto qué te falta realmente.
2. **Propuesta** — Te presento una solución concreta con alcance claro.
3. **Desarrollo iterativo** — Vas viendo prototipos y me das feedback en el camino. Nada de sorpresas al final.
4. **Entrega** — Sistema funcionando, con la puesta en marcha acompañada.
5. **Soporte y mantenimiento** — Sigo disponible: mejoras, ajustes y respaldo.

**Animación:** la línea de la timeline **se dibuja a medida que se scrollea** (`scrollYProgress` sobre un `path` SVG), y cada paso se activa con su número en naranja cuando la línea lo alcanza. En mobile, misma lógica en vertical. Respetar `prefers-reduced-motion`.

### 6.7 Proyectos
Propósito: prueba. Es la sección que más pesa en la decisión de escribir.

- Filtros simples: **Todos · Clientes · Productos propios**.
- Grid de tarjetas con: captura principal (mockup de navegador o celular según el proyecto), nombre, una línea de qué resuelve, badges de stack, y badge de estado cuando corresponde ("En desarrollo").
- Al hacer click: **modal en la misma página** (sin cambiar de ruta) con:
  - Galería de capturas reales (2 a 4).
  - El problema del cliente.
  - La solución construida.
  - Funcionalidades clave (lista corta).
  - Stack usado.
  - Link externo si el proyecto es público.
  - CTA: "Quiero algo parecido" → WhatsApp con mensaje pre-cargado que menciona el proyecto.
- Modal accesible: cierre con `Esc`, click en el backdrop, foco atrapado, scroll del body bloqueado, `aria-modal`.

Contenido real en la sección 7.

### 6.8 Sobre mí
Propósito: bajar la desconfianza de "¿quién está atrás de esto?". Clave para una marca personal.

- **Foto animada de Tomás** (la que ya usa en su portfolio) — a la izquierda en desktop, arriba en mobile. Con marco/acento naranja y una animación de entrada suave.
- Texto breve en primera persona (ES/EN): quién es, estudiante avanzado de Ingeniería en Sistemas de Información en la UTN (FRSR), desarrollador full stack freelance desde 2023, y por qué trabaja así (relevar antes de proponer, iterar con feedback, acompañar después).
- **Links directos:** LinkedIn · Portfolio · GitHub · WhatsApp. Como botones con ícono, todos con `target="_blank"` y `rel="noopener noreferrer"`.
- Opcional: una fila de "en qué trabajo" con los stacks principales (React, Next.js, TypeScript, Node, PostgreSQL, Supabase, Tailwind).

### 6.9 FAQ
Cuatro a seis preguntas reales, en acordeón. Suma SEO y responde objeciones antes de que aparezcan:

- ¿Trabajás con negocios de fuera de San Rafael? (sí, remoto)
- ¿Cuánto tarda un proyecto?
- ¿Cómo es el soporte después de la entrega?
- ¿Puedo pedir cambios mientras se desarrolla?
- ¿Qué pasa con mis datos y la seguridad?
- ¿Trabajás con proyectos ya empezados por otro?

Sin cifras de precios ni plazos garantizados: respuestas cualitativas.

### 6.10 CTA final + Contacto
Bloque de cierre a ancho completo con fondo de acento:

- Titular: "¿Tenés una idea o un problema para resolver?" / "Got an idea or a problem to solve?"
- Bajada: "Contame qué necesitás y te digo cómo lo resolvería. Sin compromiso."
- Botón grande a WhatsApp.
- Email visible (clickeable con `mailto:`).
- Ubicación: San Rafael, Mendoza, Argentina — trabajo remoto con todo el país.

### 6.11 Footer
Logotipo, anclas, redes, email, año dinámico, y la firma "TARC Tech — Tomas Agustin Romero Code".

### 6.12 Botón flotante de WhatsApp
Presente en toda la página, esquina inferior derecha, aparece después del hero. En mobile no debe tapar contenido crítico ni el final del scroll. Mensaje pre-cargado genérico.

---

## 7. Contenido real de proyectos

> Esta es la información verificada. **No agregar proyectos ni inventar métricas, cantidades de usuarios o resultados de negocio.**

```ts
// src/data/projects.ts — estructura sugerida
type Project = {
  id: string;
  name: string;
  type: 'cliente' | 'producto';
  status?: 'en-desarrollo';
  tagline: { es: string; en: string };
  problem: { es: string; en: string };
  solution: { es: string; en: string };
  features: { es: string[]; en: string[] };
  stack: string[];
  images: string[];
  externalUrl?: string;
};
```

### 7.1 Modas Vanina — *cliente*
- **Qué es:** ecommerce/catálogo digital de indumentaria, perfumería, cremas y productos varios.
- **Problema:** la tienda no tenía forma de mostrar su catálogo online ni de recibir consultas ordenadas; la dueña no tiene conocimientos técnicos.
- **Solución:** sitio tipo catálogo con detalle de producto en ventana emergente, lista de productos que arma la consulta directa por WhatsApp, sección de ubicación y contacto, y un panel de administración simple para que la dueña cargue, edite, oculte y destaque productos sin ayuda. Además, rebranding completo de la marca: logo, paleta y tipografía.
- **A destacar:** diseño y animaciones optimizados para mobile. Sin precios visibles, por decisión de la clienta.
- **Stack:** React, Node.js, Express, PostgreSQL.

### 7.2 GatheringHR — *cliente*
- **Qué es:** sitio web para una consultora de reclutamiento y recursos humanos.
- **Solución:** presencia web profesional para captar contactos.
- **Stack:** JavaScript, SCSS, Tailwind CSS.
- `TODO:` Tomás debe completar el problema concreto del cliente y la lista de funcionalidades.

### 7.3 KiosControl — *producto propio, con cliente real en producción*
- **Qué es:** sistema de punto de venta modular para kioscos y comercios.
- **Problema:** los comercios chicos llevan ventas y stock a mano o con planillas, pierden control y no tienen datos para decidir.
- **Solución:** POS modular con gestión de ventas y stock, modo offline para seguir vendiendo sin internet, impresión térmica de tickets y arquitectura multi-tenant.
- **Stack:** Next.js, TypeScript, Tailwind CSS, Supabase/PostgreSQL.
- **Mascota:** Kio (puede aparecer como detalle simpático en la tarjeta o el modal).
- ⚠️ **No publicar**: precios, condiciones comerciales, cantidad de clientes, ni detalles de infraestructura o hosting.

### 7.4 Sistema Gastronómico — *producto propio, en desarrollo*
- **Qué es:** sistema integral de gestión para rotiserías y restaurantes.
- **Solución:** módulos de menú/catálogo para el cliente final, panel de administración, POS de caja, panel de mozos y pantalla de cocina (KDS), pensado como SaaS multi-tenant, offline-first, con impresión térmica y roles/permisos.
- **Badge obligatorio:** "En desarrollo". No mostrar capturas que no existan: si todavía no hay capturas reales, usar un visual de marca y decirlo con honestidad ("En construcción — pedime un adelanto").
- **Stack:** `TODO:` confirmar cuando esté definido.

---

## 8. WhatsApp: implementación

Helper único en `src/lib/whatsapp.ts`:

```ts
const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE!; // formato 549XXXXXXXXXX, sin + ni espacios

export function waLink(message: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}
```

Los mensajes viven en los diccionarios de i18n, uno por contexto. Ejemplos:

| Origen | Mensaje ES | Mensaje EN |
|---|---|---|
| Nav / FAB | "Hola Tomás, vi la web de TARC Tech y quiero consultarte algo." | "Hi Tomás, I saw the TARC Tech site and I'd like to ask you something." |
| Hero | "Hola Tomás, quiero contarte un proyecto que tengo en mente." | "Hi Tomás, I'd like to tell you about a project I have in mind." |
| Solución: sistema de ventas | "Hola Tomás, necesito un sistema de ventas y stock para mi negocio." | "Hi Tomás, I need a sales and inventory system for my business." |
| Solución: tienda online | "Hola Tomás, quiero una tienda online / catálogo digital." | "Hi Tomás, I'm looking for an online store / digital catalog." |
| Solución: gastronómico | "Hola Tomás, tengo un negocio gastronómico y quiero un sistema de gestión." | "Hi Tomás, I run a food business and I need a management system." |
| Solución: web | "Hola Tomás, necesito una web para mi empresa." | "Hi Tomás, I need a website for my company." |
| Solución: automatización | "Hola Tomás, quiero automatizar tareas repetitivas en mi negocio." | "Hi Tomás, I'd like to automate repetitive tasks in my business." |
| Modal de proyecto | "Hola Tomás, vi {proyecto} en tu web y quiero algo parecido." | "Hi Tomás, I saw {project} on your site and I'd like something similar." |
| CTA final | "Hola Tomás, quiero contarte qué necesito y ver cómo lo resolverías." | "Hi Tomás, I'd like to tell you what I need and see how you'd solve it." |

Todos los links: `target="_blank"`, `rel="noopener noreferrer"`.

---

## 9. Assets: estructura y requisitos

```
public/
  brand/
    isotipo.svg          ← vectorizado EXACTO del PNG original
    logotipo.svg
    favicon.ico / icon.png / apple-icon.png
    og-image.jpg         ← 1200×630
  clients/
    modas-vanina.svg|png
    gatheringhr.svg|png
  projects/
    modas-vanina/01.webp 02.webp ...
    kioscontrol/01.webp ...
    gatheringhr/01.webp ...
    gastronomico/01.webp ...
  about/
    tomas.(gif|webm|webp)  ← foto animada del portfolio
```

**Requisitos de imágenes (críticos para la performance):**
- Todas las capturas convertidas a **WebP** (o AVIF), ancho máximo 1600 px.
- Usar siempre `next/image` con `sizes` correcto y `alt` descriptivo real.
- `priority` **solo** en el visual del hero. Todo lo demás, lazy.
- Las capturas se muestran dentro de **mockups** (marco de navegador para sistemas web, marco de celular para vistas mobile) — el mockup se hace por CSS/SVG, no como imagen.
- La foto animada de Tomás: si es GIF, convertirla a **video WebM/MP4 con `autoplay muted loop playsinline`** (un GIF puede pesar 10× más). Debe pausarse con `prefers-reduced-motion`.
- Ninguna imagen sin optimizar entra al repo: peso objetivo < 200 KB por captura.

**Antes de publicar:** confirmar con Tomás que tiene autorización de Modas Vanina y GatheringHR para usar su nombre, logo y capturas. Marcado como riesgo R3.

---

## 10. Animación: especificación general

| Dónde | Qué |
|---|---|
| Global | Reveals al entrar en viewport (fade + translate Y de 16–24 px), stagger de 60–80 ms entre hermanos |
| Hero | Momento de **alto impacto**: armado del isotipo + fondo reactivo (sección 6.2) |
| Proceso | Línea de timeline que se dibuja con el scroll (sección 6.6) |
| Servicios / Soluciones | Elevación y borde de acento en hover; expansión suave del acordeón (altura animada, no `display`) |
| Proyectos | Escala sutil de la imagen en hover; transición de apertura del modal (fade + scale desde 0.96) |
| Métricas/contadores | Solo si hay números reales que mostrar. **Si no hay, no se inventan y la animación no se usa** |
| Parallax | Suave y solo en fondos decorativos. Nunca sobre texto |

**Reglas duras:**
- `prefers-reduced-motion: reduce` → todas las animaciones se reducen a fades cortos o se eliminan. Sin excepciones.
- Animar solo `transform` y `opacity`. Nada de animar `width`, `height`, `top` o `left`.
- Ninguna animación puede retrasar el contenido legible: el texto se lee aunque el JS falle.
- En mobile, versiones aligeradas de los efectos pesados.
- Usar `/impeccable animate` para el pase general y `/impeccable overdrive` solo en el hero.

---

## 11. SEO y metadatos

- `metadata` por locale en `app/[locale]/layout.tsx`: title, description, Open Graph, Twitter card.
- **Title ES:** "TARC Tech — Software a medida, sistemas y automatizaciones | San Rafael, Mendoza"
- **Title EN:** "TARC Tech — Custom software, systems and automation | Argentina"
- `hreflang` para `es`, `en` y `x-default`.
- `sitemap.ts` y `robots.ts` nativos de Next.
- **JSON-LD**: `ProfessionalService` / `LocalBusiness` con nombre, área servida (San Rafael, Mendoza, Argentina), tipo de servicio y URL. Sumar `Person` para Tomás con `sameAs` a LinkedIn, GitHub y portfolio.
- Keywords objetivo (naturales dentro del copy, sin relleno): desarrollo de software a medida San Rafael, sistemas de gestión Mendoza, programador freelance San Rafael, software para comercios.
- Todas las imágenes con `alt` real y descriptivo.
- Un solo `<h1>` en la página (el titular del hero); jerarquía correcta de `h2`/`h3` por sección.
- `NEXT_PUBLIC_SITE_URL` en variable de entorno, porque el dominio se define recién al contratar el hosting (D13).

---

## 12. Accesibilidad y performance (objetivos medibles)

- **Lighthouse mobile:** Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100.
- **LCP < 2.5 s** en 4G simulado.
- **CLS < 0.1** — reservar dimensiones de todas las imágenes y usar `next/font`.
- Contraste **AA mínimo** en ambos temas. Atención especial: naranja `#F97316` sobre zinc claro es el punto de riesgo — verificar y ajustar con `#EA580C` o `#C2410C` donde haga falta.
- Navegación completa por teclado: nav, acordeones, filtros, modal, toggles.
- Foco visible siempre (anillo naranja).
- Modal con foco atrapado, `Esc` para cerrar y retorno del foco al disparador.
- `lang` correcto en `<html>` según locale.
- Todo el sitio legible y usable con JavaScript desactivado en su contenido esencial (Server Components por defecto; `'use client'` solo donde hace falta).

---

## 13. Flujo de trabajo con Impeccable

### Setup inicial (Fase 0)
```bash
npx impeccable install     # desde la raíz del proyecto, luego recargar el agente
/impeccable init           # genera PRODUCT.md y DESIGN.md
```

Al correr `/impeccable init`, cargar en el contexto:
- **PRODUCT.md**: qué es TARC Tech, a quién le vende (sección 2), el objetivo de conversión (WhatsApp) y el tono (profesional, directo, cercano, sin jerga técnica para el visitante no técnico).
- **DESIGN.md**: la identidad de la sección 4 — paleta completa, las tres tipografías con su rol, el isotipo y su regla de intangibilidad, y la intención estética (base zinc oscura, naranja como acento de acción, técnico pero cálido, con carácter).

> A partir de acá, **`DESIGN.md` es la autoridad sobre tokens, escalas y espaciados.** Este plan no los define.

### Comandos por fase

| Momento | Comando |
|---|---|
| Antes de construir el hero | `/impeccable shape` |
| Efecto de alto impacto del hero | `/impeccable overdrive` |
| Movimiento del resto del sitio | `/impeccable animate` |
| Al cerrar cada sección | `/impeccable critique` → `/impeccable polish` |
| Pase de responsive | `/impeccable adapt` |
| Antes del deploy | `/impeccable audit` → `/impeccable harden` → `/impeccable optimize` |
| Ajustes finos en el navegador | `/impeccable live` |

`/impeccable optimize` es **obligatorio** antes del deploy: es la defensa contra el riesgo principal del proyecto (peso de imágenes + animaciones).

### Fases de construcción

| Fase | Entregable | Depende de |
|---|---|---|
| **0. Setup** | Repo, Next.js + TS + Tailwind + Motion, fuentes con `next/font`, estructura de carpetas, Impeccable instalado, PRODUCT.md y DESIGN.md, scaffolding i18n con `/es` y `/en` | — |
| **1. Esqueleto** | Layout, Nav, Footer, toggles de tema e idioma, FAB de WhatsApp, helper `waLink`, scroll suave a anclas | 0 |
| **2. Hero** | Hero completo con el momento de alto impacto | 1 |
| **3. Confianza + Servicios** | Tira de logos + grid de servicios | 1 |
| **4. Soluciones** | Acordeón "Qué te puedo desarrollar" con CTAs contextuales | 1 |
| **5. Proceso** | Timeline animada por scroll | 1 |
| **6. Proyectos** | `projects.ts`, grid, filtros y modal accesible | 1 + assets reales |
| **7. Sobre mí** | Foto animada + bio + links | 1 + asset de la foto |
| **8. FAQ + CTA final + contacto** | Cierre de página | 1 |
| **9. Inglés** | Diccionario `en.json` completo y revisado (traducción natural, no literal), `hreflang`, metadata EN | 2–8 |
| **10. SEO** | Metadata, OG image, sitemap, robots, JSON-LD | 2–9 |
| **11. Pulido** | `critique` → `polish` → `audit` → `harden` → `adapt` → `optimize` | 2–10 |
| **12. Deploy** | Build, deploy en Vercel, verificación Lighthouse, apuntar el dominio del hosting a Vercel vía DNS | 11 |

**Regla entre fases:** al terminar cada una, mostrar el resultado a Tomás y esperar su OK antes de seguir. Es su propio método de trabajo aplicado al proyecto.

---

## 14. Criterios de calidad (definition of done)

El proyecto está terminado cuando **todo** esto se cumple:

**Funcional**
- [ ] Todos los CTAs abren WhatsApp con el mensaje pre-cargado correcto y distinto según su origen.
- [ ] El toggle ES/EN cambia el 100% del contenido visible. Cero texto sin traducir.
- [ ] El toggle de tema funciona y persiste entre recargas, sin parpadeo de tema al cargar.
- [ ] El modal de proyectos abre, cierra con `Esc`, backdrop y botón, y devuelve el foco.
- [ ] Todas las anclas del nav navegan con el offset correcto, en mobile y desktop.
- [ ] Los links externos (LinkedIn, portfolio, GitHub, email) funcionan y abren en pestaña nueva.

**Visual**
- [ ] El isotipo se ve idéntico al original en ambos temas y en todos los tamaños.
- [ ] Las tres tipografías se usan según su rol definido.
- [ ] No hay desbordes horizontales en ningún breakpoint (probar 320, 375, 768, 1024, 1440, 1920).
- [ ] Las capturas se ven nítidas dentro de sus mockups, sin deformarse.
- [ ] El hero impacta en la primera pantalla sin scrollear, también en un celular chico.

**Técnico**
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO 100.
- [ ] Con `prefers-reduced-motion` activado, el sitio es totalmente usable y sin movimiento gratuito.
- [ ] Navegación completa por teclado, con foco visible.
- [ ] Cero errores y cero warnings en consola.
- [ ] Build de producción sin errores de TypeScript ni de lint.
- [ ] Ninguna imagen sin optimizar en `public/`.

**Contenido**
- [ ] Ningún precio publicado, en ninguna sección ni idioma.
- [ ] Ningún dato inventado: proyectos, clientes, testimonios ni métricas.
- [ ] Ningún `TODO:` ni texto placeholder visible en producción.

### Cómo probarlo
1. `npm run build && npm start` — verificar que no haya errores de build ni de hidratación.
2. Lighthouse en modo mobile con throttling, sobre el build de producción (no en dev).
3. DevTools → Rendering → activar `prefers-reduced-motion: reduce` y recorrer toda la página.
4. Navegar la página completa **solo con Tab, Enter y Esc**.
5. Recorrer `/es` y `/en` línea por línea buscando texto sin traducir.
6. Abrir todos los links de WhatsApp y verificar que el mensaje pre-cargado corresponda a la sección.
7. Probar en un celular real de gama media, no solo en el emulador.

---

## 15. Riesgos y casos límite

| # | Riesgo | Mitigación |
|---|---|---|
| R1 | **Peso de las imágenes.** Muchas capturas reales pueden destruir el LCP en mobile | WebP + `next/image` + lazy + `priority` solo en el hero + `/impeccable optimize` obligatorio |
| R2 | **La animación del hero traba el celular** | Versión reducida en mobile, animar solo transform/opacity, `prefers-reduced-motion`, medir FPS en dispositivo real |
| R3 | **Permiso de clientes** para usar nombre, logo y capturas de Modas Vanina y GatheringHR | Confirmar por escrito antes del deploy. Si no hay permiso: mostrar el proyecto sin marca ("Ecommerce de indumentaria") |
| R4 | **Datos sensibles en capturas** (nombres de clientes finales, teléfonos, montos, direcciones) | Revisar y difuminar cada captura antes de subirla. Nunca subir una captura sin revisar |
| R5 | **Sistema Gastronómico sin capturas reales** | Badge "En desarrollo" + visual de marca, o excluirlo de la v1. Nunca mockups falsos presentados como reales |
| R6 | **Traducción al inglés floja** o mezclada | Revisar `en.json` completo al final; el inglés se escribe natural, no traducido literal del español |
| R7 | **El dominio todavía no existe** | Nada de URLs hardcodeadas: usar `NEXT_PUBLIC_SITE_URL`. Deploy inicial en el subdominio de Vercel y apuntar el DNS después |
| R8 | **Contradicción entre este plan y DESIGN.md** | Manda `DESIGN.md` en lo visual; manda este plan en contenido, estructura y reglas de negocio. Ante duda, preguntar |
| R9 | **Scope creep**: agregar blog, formulario, CMS o analytics sobre la marcha | Todo eso está fuera de alcance (sección 17). Se anota para v2 y no se construye ahora |
| R10 | **Nombre "TARC Tech" desconocido** — nadie lo busca en Google | El SEO apunta a la necesidad ("desarrollo de software San Rafael"), no a la marca. La web es sobre todo un destino para links compartidos |

---

## 16. Datos que Tomás debe completar antes de la Fase 1

- [ ] Número de WhatsApp en formato internacional sin `+` (ej. `5492604xxxxxx`) → `NEXT_PUBLIC_WHATSAPP_PHONE`
- [ ] Email de contacto público
- [ ] URL del portfolio
- [ ] URL de LinkedIn
- [ ] URL de GitHub (`https://github.com/Tomas-Romero`)
- [ ] Instagram / redes de TARC Tech, si van
- [ ] Isotipo y logotipo en su mejor formato disponible (PNG de alta resolución o SVG)
- [ ] Foto animada de Tomás (la del portfolio)
- [ ] Capturas de cada proyecto, ya revisadas para que no expongan datos sensibles
- [ ] Logos de Modas Vanina y GatheringHR + confirmación de permiso de uso
- [ ] Problema y funcionalidades de GatheringHR (falta ese contenido)
- [ ] Definir si el Sistema Gastronómico entra en la v1 o se suma después
- [ ] Dominio final, una vez contratado el hosting

---

## 17. Fuera de alcance (v1)

No construir, aunque parezca una buena idea sobre la marcha:

- Formulario de contacto y cualquier backend o API key.
- Blog o CMS.
- Panel de administración de contenido.
- Calendly o agendamiento.
- Analytics o píxeles de terceros.
- Chatbot o asistente con IA.
- Cualquier precio, cotizador o simulador de presupuestos.
- Testimonios (no hay reales todavía).
- Páginas individuales por proyecto (decisión D2: modal, no ruta).

---

## 18. Roadmap posterior (v2, no ahora)

1. Testimonios reales de clientes, cuando existan.
2. Casos de estudio en profundidad con página propia (migrando desde los modales).
3. Analytics respetuoso de la privacidad (Plausible o Vercel Analytics) para medir clicks a WhatsApp.
4. Blog técnico corto para SEO local.
5. Sección de producto propia para KiosControl, si crece como SaaS.

---

## Anexo — Resumen ejecutivo del proceso (para referencia rápida)

**Objetivo:** web institucional de TARC Tech que convierta visitantes en consultas por WhatsApp.
**Usuario:** dueños de PyMEs de San Rafael/Mendoza (mobile), empresas y contactos internacionales (desktop, inglés).
**Flujo:** landing única → hero de impacto → confianza → servicios → soluciones → proceso → proyectos → sobre mí → FAQ → CTA.
**Inputs:** assets reales de Tomás + datos de la sección 16.
**Output:** sitio Next.js estático bilingüe desplegado en Vercel.
**Reglas principales:** sin precios, sin contenido inventado, sin backend, imágenes optimizadas, accesible, Impeccable como autoridad visual.
**Calidad:** checklist de la sección 14 completo.
**Pendientes:** permisos de clientes, contenido de GatheringHR, dominio, decisión sobre el Sistema Gastronómico.
**Siguiente acción:** completar la sección 16, crear el repo y ejecutar la Fase 0.
