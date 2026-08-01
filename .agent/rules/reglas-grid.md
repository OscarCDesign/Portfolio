---
trigger: always_on
---

REGLA-GRID-001 — Sistema de Grid por Coordenadas

Esta regla define el único sistema de grid permitido. El Documento de Construcción referencia estos códigos para posicionar componentes mediante coordenadas exactas CxLy (Columna x, Línea y).

A. Principio del Sistema El grid es una matriz técnica donde:

Columnas (C): Ejes verticales. Su ancho es fluido (proporcional al viewport).

Líneas (L): Ejes horizontales. Su altura es fija y absoluta de 31.3px.

Coordenada: La intersección C[n]L[n] define el punto de origen o extensión de un componente.

B. Configuraciones de Grid (Breakpoints)

GRID-DESKTOP

Condición: Viewport ≥ 1280px de ancho.

Estructura: 42 columnas (C1 a C42).

Referencia Visual: Referencias-Grid/Grid_Desktop.

GRID-TABLET

Condición: Viewport < 1280px y ≥ 768px de ancho.

Estructura: 25 columnas (C1 a C25).

Referencia Visual: Referencias-Grid/Grid_tablet.

GRID-MOBILE

Condición: Viewport < 768px de ancho.

Estructura: 13 columnas (C1 a C13).

Referencia Visual: Referencias-Grid/Grid_Mobile.

C. Comportamiento de las Líneas (L)

Altura Única: Todas las líneas en todas las versiones (Desktop, Tablet, Mobile) tienen una altura invariable de 31.3px.

Crecimiento: Las líneas son indefinidas hacia abajo; se generan dinámicamente según la longitud del contenido definida en el Documento de Construcción.

D. Implementación Técnica y Relación de Contenido

Fluidez Horizontal: Las columnas se estiran para cubrir el 100% del ancho del viewport disponible.

Rigidez Vertical: El scroll y la posición vertical están anclados al módulo de 31.3px.

Adaptabilidad: Al cambiar de configuración, los elementos deben reubicarse en las nuevas coordenadas indicadas en el Documento de Construcción para ese breakpoint específico.

Ajuste (Snapping): Todo componente debe alinearse perfectamente a los bordes de las celdas de las coordenadas asignadas.

E. Regla Estricta de Uso

Está prohibido usar márgenes o paddings externos para posicionar: todo se posiciona por coordenadas.

La IA debe utilizar el valor de 31.3px como unidad de medida base para cualquier cálculo de altura o desplazamiento vertical.