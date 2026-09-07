<!-- SEED -->

<!--
DESIGN.md — TARC Tech
Formato Google Stitch: seis secciones, en orden fijo, con nombres fijos y en inglés.
No agregar secciones de nivel superior (nada de "Layout", "Motion" o "Responsive"):
lo filosófico va en Overview, lo de cada componente va en Components.

ESTE ARCHIVO ES UN SEED. Fue escrito a mano antes de que existiera código,
a partir de decisiones de marca ya tomadas (paleta, tipografías, isotipo).
Lo que está acá es real y decidido. Lo que todavía no está implementado
está marcado como [SEED] y debe confirmarse regenerando el archivo con
/impeccable document (modo escaneo) una vez terminada la Fase 1 del plan.
No inventar tokens que el código no respalde.
-->

# DESIGN.md — TARC Tech

## Overview

**Creative North Star: "La forja facetada."**
Metal caliente sobre grafito frío. Software hecho a mano, con las facetas a la vista: aristas duras, superficies planas, un solo punto de calor. Preciso como una herramienta, no pulido como un folleto.

Alternativas de North Star a considerar al regenerar este archivo: *"El taller de precisión"* (más sobrio, foco en oficio) o *"Grafito y brasa"* (más atmosférico, foco en el contraste térmico).

Modo de la superficie principal (`/es` y `/en`): **Persuade**. Es una landing de marketing: el diseño es el producto y tiene que ganarse la atención. Tipografía con carácter, paleta comprometida, apertura conducida por imagen. No tratar esta página como una app.

Filosofía visual, en orden de importancia:

1. **Base fría, acento cálido.** La escala zinc sostiene toda la página. El naranja es un evento, no un ambiente.
2. **Aristas antes que blandura.** El isotipo es facetado y anguloso; el sistema lo acompaña con radios contenidos y bordes definidos. Nada de burbujas ni de sombras difusas por todos lados.
3. **Densidad baja, aire alto.** Secciones respiradas, texto corto, una idea por bloque. El visitante lee de pie, en un celular.
4. **El movimiento explica.** Reveals al entrar en viewport, feedback en hover, progreso al scrollear. Una sola excepción deliberada: el hero, donde el movimiento es la marca presentándose.
5. **Oscuro por defecto.** El modo oscuro es el diseño principal, no una variante. El modo claro debe verse igual de intencional, no como una versión "apagada".

## Colors

Paleta de marca decidida. **Estos valores son reales y no se negocian.**

**Acento — la brasa**

| Nombre descriptivo | Hex | Uso |
|---|---|---|
| Ember Orange (Naranja brasa) | `#F97316` | Acento principal: CTAs, links activos, líneas de acento, números de la timeline |
| Forge Orange (Naranja forja) | `#EA580C` | Hover y estado presionado. Texto naranja sobre fondos claros |
| Deep Ember (Brasa profunda) | `#C2410C` | Destellos, glow, sombras teñidas, texto naranja de máximo contraste sobre claro |
| Warm Ash Tint (Ceniza cálida) | `#FFEDD5` | Fondos suaves de acento, badges, resaltados en modo claro |

**Neutros — el grafito**

Escala **zinc** completa (`zinc-50` a `zinc-950`). Es la base de todo el sitio.

- Modo oscuro (por defecto): fondo `zinc-950`, superficies `zinc-900`, bordes `zinc-800`, texto principal `zinc-100`, texto secundario `zinc-400`.
- Modo claro: fondo `zinc-50`, superficies blanco, bordes `zinc-200`, texto principal `zinc-900`, texto secundario `zinc-600`.

**Acentos secundarios — la señal**

| Nombre descriptivo | Hex | Uso |
|---|---|---|
| Circuit Cyan (Cian técnico) | `#06B6D4` | Detalles técnicos: badges de stack, iconografía de sistema. Con mucha moderación |
| Signal Green (Verde señal) | `#10B981` | Estados positivos y disponibilidad. Casi nunca |

**Reglas de color**

- El naranja **nunca** es fondo de sección completa. Es acento y acción. Única excepción permitida: el bloque de CTA final.
- Cian y verde **nunca** son color de sección ni de titular. Son detalles del tamaño de un badge.
- **Nunca** gradientes violeta-a-azul, ni gradientes de dos colores de marca distintos. Si hay gradiente, es naranja a naranja o naranja a transparente.
- **Nunca** texto gris sobre fondo de color.
- Ningún color literal fuera de esta tabla y de la escala zinc entra al código. Todo pasa por tokens.
- Sobre fondos claros, el naranja para texto o elementos chicos es `#EA580C` o `#C2410C`, nunca `#F97316` (no llega a AA).

## Typography

Tres fuentes, con roles estrictos. No hay una cuarta.

| Fuente | Rol | Uso permitido |
|---|---|---|
| **Sansation** (Bernd Montag) | Logotipo | **Únicamente** el logotipo "TARC Tech" en nav y footer. Nada más |
| **Fira Sans** (Carrois Apostrophe) | Fuente principal | Todo: titulares, cuerpo, UI, botones, badges, navegación |
| **Fraunces** | Contraste editorial | Una o dos palabras clave dentro de un titular, en itálica. Nunca un titular completo, nunca cuerpo de texto |

**Reglas tipográficas**

- **Nunca Inter.** Es la marca registrada del template genérico y el sitio la evita a propósito.
- Fraunces aparece **como máximo una vez por sección**. Si aparece en cada título, deja de significar algo.
- Sansation **nunca** se usa para texto corrido, ni siquiera para un titular.
- Las tres fuentes se cargan self-hosted con `next/font`. Nada de `<link>` a Google Fonts.
- Cuerpo mínimo 16 px en mobile. Los titulares del hero pueden ser grandes y apretados (tracking negativo); el cuerpo nunca.
- Medida de línea máxima de ~70 caracteres en párrafos.
- [SEED] La escala tipográfica concreta se define al implementar y se documenta al regenerar este archivo.

## Elevation

**Plano por defecto. La profundidad se gana con borde y superficie, no con sombra.**

- El modo oscuro separa capas con **luminosidad de superficie + borde de 1 px** (`zinc-800`), no con sombras negras difusas: sobre `zinc-950`, una sombra negra no existe.
- El modo claro usa sombras muy contenidas, de radio corto y opacidad baja, solo en elementos flotantes (modal, menú mobile, botón flotante).
- El **glow naranja** (`#C2410C` con baja opacidad) es el único efecto luminoso permitido, y solo en: hover del CTA primario, el destello del isotipo al armarse, y el foco de los pasos activos de la timeline.
- **Nunca** tarjetas dentro de tarjetas. Si algo necesita anidarse, se separa con espacio o con una línea, no con otra superficie elevada.
- El nav gana un fondo con blur y un borde inferior al scrollear; arriba del todo es transparente.
- [SEED] Los niveles concretos de elevación se fijan al implementar. Se espera un sistema de 3 niveles como mucho: base, superficie, flotante.

## Components

[SEED] Ninguno de estos componentes está implementado todavía. Acá se define **el carácter esperado**, no tokens que el código pueda desmentir. Regenerar esta sección con `/impeccable document` cuando existan.

**Button — primary.** El único elemento sólidamente naranja de la página. Radio contenido (no pill, no cuadrado). Peso de fuente alto. En hover: `#EA580C` más un glow sutil. Se usa exclusivamente para acciones que llevan a WhatsApp.

**Button — secondary.** Contorno de 1 px sobre transparente, texto neutro, borde que se tiñe de naranja en hover. Nunca compite visualmente con el primario.

**Card — service.** Superficie sobre la base, borde de 1 px, ícono lineal naranja (nunca dentro de un cuadradito redondeado con fondo tintado: esa es la marca del template genérico). En hover: elevación mínima y borde de acento.

**Card — project.** Conducida por la imagen: la captura real ocupa la parte superior dentro de un mockup, y el texto queda debajo. Badges de stack en estilo contorno, chicos, neutros con toque cian. Badge de estado ("En desarrollo") diferenciado y honesto.

**Mockup frame.** Marco de navegador o de celular construido en CSS/SVG, nunca como imagen. Sobrio: barra superior mínima, sin botoncitos de colores estilo macOS decorativos. Existe para dar contexto a la captura, no para adornar.

**Accordion.** Para la sección de soluciones y para el FAQ. Altura animada, ícono que rota, un solo panel abierto por vez. Cada panel cierra con su propio CTA a WhatsApp.

**Modal — project detail.** Aparece con fade y escala desde 0.96. Fondo con blur, superficie elevada, cierre con `Esc`, click en el backdrop y botón visible. Foco atrapado, scroll del body bloqueado. Nunca cambia la URL.

**Timeline — process.** Línea que se dibuja con el progreso del scroll. Números de paso en naranja, que se encienden cuando la línea los alcanza. Vertical en mobile, horizontal en desktop.

**Nav.** Transparente arriba, con blur y borde al scrollear. Contiene toggle de idioma (ES/EN), toggle de tema y CTA primario. En mobile, menú a pantalla completa con el CTA siempre visible al pie.

**WhatsApp FAB.** Flotante abajo a la derecha, aparece después del hero. Verde de WhatsApp permitido acá y solo acá, o versión naranja de marca. Nunca tapa contenido ni el final del scroll.

**Reveal wrapper.** Fade más translación de 16–24 px al entrar en viewport, con stagger de 60–80 ms entre hermanos. Se anima solo `transform` y `opacity`. Se desactiva por completo con `prefers-reduced-motion`.

## Do's and Don'ts

**Do**

- Usá el naranja para lo que se puede clickear y para lo que importa. Nada más.
- Mostrá capturas reales de sistemas reales, grandes, dentro de mockups sobrios.
- Dejá que el isotipo facetado sea el gesto de marca más fuerte de la página.
- Escribí corto. Una idea por bloque. El visitante está de pie y con una mano ocupada.
- Diseñá primero el modo oscuro y validá el claro con el mismo rigor.
- Animá `transform` y `opacity`. Nada más.
- Verificá cada decisión de color en ambos temas antes de darla por buena.

**Don't**

- **Nunca** uses Inter, ni gradientes violeta-a-azul, ni tarjetas anidadas, ni el ícono en cuadradito redondeado arriba de cada título. Son las cuatro marcas del template genérico y este proyecto existe para no parecerse a eso.
- **Nunca** redibujes ni "mejores" el isotipo. Se traza exacto del archivo original.
- **Nunca** pongas un precio, un rango de precios ni un cotizador. En ningún idioma.
- **Nunca** inventes testimonios, métricas, contadores de clientes ni logos que no existan.
- **Nunca** uses fotos de stock de personas, terminales falsas tipeando código, ni efecto Matrix.
- **Nunca** uses Fraunces para cuerpo de texto ni Sansation fuera del logotipo.
- **Nunca** pongas texto gris sobre fondo de color.
- **Nunca** animes `width`, `height`, `top` o `left`.
- **Nunca** dejes que una animación retrase el texto legible: si el JS falla, el contenido se lee igual.
- **Nunca** agregues una sección de nivel superior a este archivo. Son seis, en este orden.
