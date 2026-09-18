# TARC Tech

Landing page de marketing para **TARC Tech**, la marca freelance de Tomás Agustín Romero (desarrollador full stack, San Rafael, Mendoza, Argentina). Una sola página, bilingüe (es/en), pensada para que un dueño de PyME entienda en menos de 30 segundos qué le puede resolver y termine escribiendo por WhatsApp.

## ¿Qué es esto?

Un sitio Next.js de una sola página (App Router) con seis secciones — Hero, Servicios, Soluciones, Proceso, Proyectos y FAQ — más un CTA final, todas con contenido bilingüe (`/es` y `/en`) servido desde el mismo build. No hay backend ni base de datos: es contenido estático + interacción en el cliente (scroll, hover, tema claro/oscuro), y el único "envío de datos" real es abrir WhatsApp con un mensaje pre-armado.

## ¿Para qué sirve?

Es la vidriera pública de TARC Tech: muestra qué servicios ofrece (software a medida, sistemas y automatizaciones, apps mobile/desktop, productos SaaS), cómo es el proceso de trabajo paso a paso, y proyectos reales ya entregados (Modas Vanina, GatheringHR, KiosControl, Sistema Gastronómico). La métrica de éxito del sitio es una sola: **clicks a WhatsApp con mensaje pre-cargado** — todo el diseño existe para bajar la fricción hasta ese click.

## ¿Qué tecnologías usa?

- **[Next.js 15](https://nextjs.org/)** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** para estilos, con tokens de marca propios (`tokens.css` / `tokens.json`)
- **[Motion](https://motion.dev/)** (`motion/react`, la evolución de Framer Motion) para todas las animaciones: scroll-linked reveals, tilt 3D, parallax, crossfades
- **i18n propio** (sin librería externa): diccionarios `es.json` / `en.json` bajo `src/i18n`, rutas `/[locale]`
- Tema claro/oscuro con persistencia en `localStorage`, sin flash al cargar (script inline en `<head>`)
- ESLint 9 (`eslint-config-next`) como único linter/test gate del proyecto — no hay suite de tests automatizados

## ¿Cómo lo veo funcionando? (live demo)

Todavía no hay dominio propio asignado (`NEXT_PUBLIC_SITE_URL` queda vacío a propósito hasta que exista uno — ver `.env.local.example`). Mientras tanto, correlo localmente con los pasos de abajo, o pedile a Tomás el link de preview más reciente.

## ¿Cómo lo corro en mi máquina?

Requisitos: Node.js 20+ y npm.

```bash
git clone https://github.com/Tomas-Romero/tarc-tech.git
cd tarc-tech
npm install
cp .env.local.example .env.local   # completar las variables (ver abajo)
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) — redirige automáticamente a `/es` (locale por defecto).

**Variables de entorno** (`.env.local`, todas opcionales para levantar el sitio; las secciones que dependen de una quedan ocultas si no está seteada):

| Variable | Para qué |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_PHONE` | Número en formato internacional sin `+` (ej. `5492604xxxxxx`), usado por todos los CTAs de WhatsApp |
| `NEXT_PUBLIC_SITE_URL` | Dominio final, para metadata/OG/sitemap — vacío hasta que exista |
| `NEXT_PUBLIC_LINKEDIN_URL` / `NEXT_PUBLIC_GITHUB_URL` / `NEXT_PUBLIC_PORTFOLIO_URL` / `NEXT_PUBLIC_INSTAGRAM_URL` | Links del footer, se ocultan si no están seteados |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Mail de contacto mostrado en la sección final |

Otros comandos útiles:

```bash
npm run build   # build de producción
npm run start   # sirve el build de producción
npm run lint     # ESLint sobre todo el proyecto
```

## ¿Qué partes interesantes tiene?

- **Animaciones desktop "de autor" en Servicios y Proceso**: ambas secciones se fijan en pantalla (`sticky` + scroll extendido) mientras el scroll conduce la narrativa — en Servicios un spotlight naranja recorre cards de vidrio esmerilado sobre fondo oscuro; en Proceso, un slideshow cinematográfico a pantalla completa cruza-difumina una foto por paso. Mobile usa carruseles livianos en su lugar, sin forzar el pin.
- **Proyectos con tilt 3D + parallax + fondo ambiental**: cada card reacciona a la posición del mouse (spring físico, no CSS transition simple) y su imagen se desplaza al hacer scroll; al pasar el mouse por un proyecto, su propia foto aparece muy difuminada como fondo de toda la sección.
- **Contenido honesto por diseño**: `src/data/projects.ts` documenta explícitamente que no se inventan clientes, métricas ni features — los campos quedan vacíos (con un TODO) hasta que el dato real existe. Ver `PLAN-LANDING-TARC-TECH.md` para el porqué de esa regla.
- **`DESIGN.md` y `PRODUCT.md`** en la raíz documentan, respectivamente, el sistema de diseño (paleta, tipografía, principios — "aristas antes que blandura") y el contexto de producto (usuarios, posicionamiento, objetivo) que guiaron cada decisión visual del sitio.
- **Tema claro/oscuro como ciudadano de primera clase**: no es una variante "apagada" del claro — ambos usan la misma escala de grises y el mismo naranja como único acento, invirtiendo solo qué extremo de la escala hace de superficie.

## Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx              # "/" → redirect a /{defaultLocale}
│   ├── robots.ts, sitemap.ts # SEO
│   └── [locale]/
│       ├── layout.tsx        # Nav, Footer, WhatsApp FAB, tema
│       └── page.tsx          # Ensambla todas las secciones
├── components/
│   ├── sections/              # Hero, Services, Solutions, Process, Projects, Faq, FinalCta
│   ├── motion/                # Piezas animadas reutilizables (HeroBrand, PageGrid, FooterBrand...)
│   ├── layout/                # Nav, Footer, WhatsAppFab
│   └── ui/                    # Iconos y primitivas visuales
├── data/                      # Contenido estructurado (proyectos, servicios, proceso, FAQ)
├── i18n/                      # Diccionarios es/en + helpers de locale
└── lib/                       # Utilidades (fuentes, etc.)
```
