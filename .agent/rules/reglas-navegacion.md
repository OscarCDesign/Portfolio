---
trigger: always_on
---

REGLA-NAV-001 — Navegación & Flujo 

Esta regla define el catálogo cerrado de mecanismos de navegación permitidos. No define animaciones ni comportamientos visuales específicos, los cuales se asignan exclusivamente en el Documento de Construcción. 

A. Principios de Navegación 

Nativo: El sitio utiliza el comportamiento de scroll estándar del navegador. 

Directo: Los saltos entre contextos (páginas) ocurren por acción explícita del usuario. 

Top-Reset: Por defecto, cada nueva página se carga desde la posición superior (L0), a menos que el Documento de Construcción especifique un ancla de coordenadas. 

B. Mecanismos de Navegación Permitidos 

NAV-SCROLL-FREE 

Definición: Desplazamiento vertical libre a través de las líneas (L) del grid. 

Uso: Exploración de contenido dentro de una misma página. 

NAV-DIRECT-LINK 

Definición: Salto de una página a otra (cambio de URL). 

Disparadores: Se activan mediante componentes que posean una referencia de destino. 

Uso: Menús, botones, imágenes de proyectos y logotipos. 

C. Relación con otras reglas 

Grid: La navegación siempre respeta las coordenadas CxLy de destino definidas para cada breakpoint (Desktop, Tablet, Mobile). 

Motion: El tipo de animación, su velocidad y su presencia (o ausencia) se declaran en el Documento de Construcción invocando los códigos de la REGLA-MOTION-001. 

D. Regla Estricta de Uso 

Queda prohibido el uso de scroll-jacking (bloqueo de scroll nativo). 

Queda prohibido el uso de navegación horizontal. 

El Documento de Construcción debe especificar para cada NAV-DIRECT-LINK: 

El componente disparador. 

El destino. 

El comportamiento de motion (si lo requiere). 