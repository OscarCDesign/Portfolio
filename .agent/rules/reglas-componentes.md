---
trigger: always_on
---

REGLA-COMPONENTES-001 — Componentes UI 

Esta regla define el repertorio cerrado de componentes visuales permitidos. El Documento de Construcción referencia estos códigos para posicionarlos en el Grid y asignarles estilo, motion y navegación. 

A. Principios Normativos 

Contenedores Puros: Los componentes no tienen contenido intrínseco; son "cascarones" que se rellenan mediante el Documento de Contenido. 

Ajuste Automático: Todo contenido visual (imagen/video) se centra y escala automáticamente para cubrir el componente (Object-fit: cover), actuando el componente como máscara de recorte. 

Unidad de Medida: Los bordes y marcadores se definen en puntos (pt) o píxeles (px) según la especificación técnica. 

B. Componentes Permitidos 

COMP-FRAME 

Definición: Contenedor para medios visuales (Imagen, Video, GIF) y agrupación de cuadros de texto e íconos. 

Comportamiento: El contenido se centra automáticamente y llena el frame por completo. Cualquier excedente se recorta (máscara). 

Parámetros en Construcción: Coordenadas CxLy, dimensiones y recurso visual asignado. 

COMP-FRAME-BORDER 

Definición: Variante de Frame que incluye un contorno perimetral. 

Especificación Técnica: Borde de 3pt de grosor. 

Parámetros en Construcción: Color del borde (REGLA-COLOR-001) y contenido visual. 

COMP-FRAME-PORTADA 

Definición: Frame interactivo con cambio de estado por proximidad (Hover). 

Comportamiento (Desktop/Tablet): Al situar el cursor encima, el contenido visual A se reemplaza por el contenido visual B. 

Transición: El cambio entre contenidos es casi inmediato para mantener la agilidad de navegación. 

Adaptación Mobile (GRID-MOBILE): El componente anula el comportamiento de hover y se renderiza en un estado de Hover Eterno, mostrando exclusivamente el Contenido B de forma permanente. 

Parámetros en Construcción: Recursos A y B (definidos en Documento de Contenido). 

COMP-TEXT-BOX 

Definición: Contenedor delimitado para texto. 

Comportamiento: El cuadro sirve de referencia para posicionar el texto internamente (centro, izquierda, arriba, etc.). 

Parámetros en Construcción: Código tipográfico (REGLA-TYPO-001), justificación, color, motion y posición en grid. 

COMP-BUTTON 

Definición: Elemento interactivo de navegación o acción. 

Estructura Base: Un COMP-FRAME-BORDER que encierra un texto TYPO-BODY-1 centrado. 

Estado Hover: Aparece un "marcador" (línea horizontal de 5pt de grosor) situado 15px por debajo del texto, con una longitud exacta al ancho del texto. 

Variante Alterna (Sin Hover): El frame tiene un color de fondo sólido (igual al color del borde). 

Parámetros en Construcción: Colores de borde/fondo/texto, variante visual seleccionada y destino de navegación. 

C. Regla Estricta de Uso 

Solo estos 5 componentes están permitidos en el sistema. 

No se permite la creación de nuevos componentes ni la modificación de sus comportamientos base (ej: cambiar el grosor del marcador del botón). 

El Documento de Construcción es el único encargado de definir la estética final (colores y tipos) y la ubicación dentro de la retícula de 31.3px.