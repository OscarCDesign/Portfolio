Documento de Construcción

Introducción
1. Introducción y propósito
Este documento define la construcción estructural, visual e interactivamente del sitio, utilizando exclusivamente los códigos y sistemas definidos en el Documento de Reglas (Tipografía, Color, Grid, Motion, Navegación y Componentes).
Este documento no define contenido final, sino:
•	La estructura técnica del sitio.
•	La disposición espacial exacta en el grid.
•	La navegación entre estados.
•	El comportamiento responsive.
•	La asignación de interacciones y animaciones.
2. Relación con el Documento de Contenido
El flujo de trabajo es secuencial:
•	Fase 1 (Construcción): Crea el esqueleto (grids, frames, componentes, motion).
•	Fase 2 (Contenido): Inyecta textos, imágenes y videos finales sin alterar la estructura ni el layout.
3. Sistema de Identificación Única (IDs de Referencia)
•	Para permitir que el Documento de Contenido inyecte información de manera quirúrgica, cada componente instanciado en este documento debe poseer un código identificador único y referenciable.
•	Funcionamiento de los códigos:
•	Prefijo de Contexto: Una letra o sigla que identifica la sección o página (ej. H para Home).
•	Descriptor de Componente: Una sigla que identifica el tipo de pieza (ej. F para Frame, TT para Título/Texto).
•	Índice Numérico: Un valor secuencial para diferenciar piezas del mismo tipo dentro de un contexto.
•	Propósito: Estos códigos actúan como "anclas" o "variables" que el Documento de Contenido llamará para asignarles un recurso específico (un texto concreto o una imagen determinada).
4. Regla de Placeholders y Densidad
•	Placeholders Visuales: Todo Frame sin contenido asignado debe mostrar image_fill.png como referencia temporal.
•	Placeholders de Texto: La IA inyectará Lorem Ipsum ajustado al contexto. En casos de Extensión Indefinida, se utilizará un bloque de relleno que permita testear la adaptabilidad del grid y el empuje vertical de los elementos inferiores.
5. Regla de Ejecución Estricta y Prioridad de Fallo
•	Integridad del Layout: Ante cualquier conflicto físico entre coordenadas CxLy y dimensiones que rompa el grid o genere solapamientos no autorizados, la IA detendrá la construcción y notificará el error.
•	Prohibiciones: No inferir contenido real y no introducir estilos fuera de las Reglas-001.
•	Carga del sitio: Toda carga y recarga del sitio debe mostrar en primera instancia la página de Work (HP-WORK).

Menú de Navegación
El Menú es el componente de jerarquía máxima. Su apariencia se gestiona a través de tres variantes que se especifican según la sección del sitio.
1. MENU-HERO (Bienvenida)
Diseñado para el aterrizaje inicial, ocupando un lugar central en la composición.
•	MF1 (Componente: COMP-FRAME-BORDER)
o	Color: Borde COLOR-ORANGE-TERRACOTTA-01, Fondo COLOR-BLUE-PETROLEUM-01.
o	Dimensiones:
	Escritorio: 38 columnas x 13 líneas.
	Tableta: 31 columnas x 11 líneas.
	Móvil: 11 columnas x 14 líneas.
o	Motion: MOTION-FADE-BASIC (In) en entrada.
•	MDT1 (Componente: COMP-TEXT-BOX)
o	Tipografía: TYPO-DISPLAY-1, color COLOR-ORANGE-TERRACOTTA-01.
o	Posición: Alineado al centro, centrado verticalmente en el frame y a 1 línea de distancia del borde superior.
o	Motion: Entrada: MOTION-TEXT-STRETCH. Salida: MOTION-FADE-BASIC (Out) rápido.
•	MBT1 (Componente: COMP-TEXT-BOX)
o	Tipografía: TYPO-BODY-2. Parte 1.1: COLOR-ORANGE-TERRACOTTA-01. Parte 1.2: COLOR-OFFWHITE-ALABASTER-01.
o	Dimensiones (Ancho máx.): Escritorio: 26 col | Tableta: 19 col | Móvil: 11 col.
o	Posición: Inicio a 6 líneas del borde superior (Escritorio/Móvil) y 4 líneas (Tableta). Alineado al centro y centrado verticalmente con el frame.
o	Motion: Entrada: MOTION-FADE-MOVE (Up). Salida: MOTION-FADE-BASIC (Out) rápido.
o	Bandera Lógica: Si FLAG-RECURRING es false, se usa variante de contenido F, si es true, se usa variante de contenido T.
•	MBG (Grupo de Componentes: COMP-BUTTON)
o	Estado Normal: Borde COLOR-ORANGE-TERRACOTTA-01, Texto COLOR-ORANGE-TERRACOTTA-01.
o	Hover: Marcador en COLOR-OFFWHITE-ALABASTER-01.
o	Variante 2: Fondo COLOR-ORANGE-TERRACOTTA-01, Texto COLOR-BLUE-PETROLEUM-01 (Bold).
o	Dimensiones: Escritorio/Tableta: 6 col de ancho. Móvil: 4 col. Altura: 3 líneas.
o	Distribución:
	Escritorio/Tableta: Centro inferior del frame, alineados horizontalmente y coincidiendo con el borde inferior de MF1.
•	MB1: Destino NAV-DIRECT-LINK → HP-WORK.
•	MB2: Destino NAV-DIRECT-LINK → HP-ABOUT.
•	MB3: Destino NAV-DIRECT-LINK → HP-CONTACT.
	Móvil: Un solo botón activo a la izquierda. A la derecha, un COMP-FRAME-BORDER (3x3 celdas) con ícono de tres líneas (5pt, COLOR-ORANGE-TERRACOTTA-01). Al activar, dispara MENU-BARRA (Desplegado).

2. MENU-BARRA (Exploración)
Versión compacta con propiedad sticky: top.
•	MF1: Ancho total de pantalla x 3 líneas de alto.
•	MDT2 (Componente: COMP-TEXT-BOX):
o	Tipografía: TYPO-DISPLAY-2, color COLOR-ORANGE-TERRACOTTA-01.
o	Posición: Alineado a la izquierda (margen 1 columna), centrado horizontalmente en el frame.
o	Motion: MOTION-SLIDE-PATH-IN desde C15 (Escritorio), C9 (Tableta), C5 (Móvil).
•	MBG:
o	Escritorio/Tableta: Alineados a la derecha de la pantalla (MB1-MB2-MB3).
o	Móvil (Cerrado): Botón + Frame ícono.
o	Móvil (Desplegado):
	Ícono cambia a "X" (COLOR-BLUE-PETROLEUM-01, 5pt) sobre fondo COLOR-ORANGE-TERRACOTTA-01.
	MF2 (Componente: COMP-FRAME): Fondo COLOR-ORANGE-TERRACOTTA-01 extendido bajo la barra.
	Contiene MB1-MB2-MB3 en stack vertical, color COLOR-BLUE-PETROLEUM-01, a 6 líneas del borde superior de MF2.

3. MENU-BLANCO (Proyecto)
Estructura de MENU-BARRA adaptada para fondos claros.
•	MF1: Borde COLOR-OFFWHITE-ALABASTER-01, Fondo COLOR-OFFWHITE-ALABASTER-01. Transición suave.
•	MDT2: Color COLOR-BLUE-PETROLEUM-01. Transición suave.
•	MBG: Todo cuadro de texto pasa a COLOR-BLUE-PETROLEUM-01. Todos los bordes pasan a COLOR-OFFWHITE-ALABASTER-01. Todo lo COLOR-BLUE-PETROLEUM-01 pasa a COLOR-OFFWHITE-ALABASTER-01.
•	Escritorio y Tableta: Ningún COMP-BUTTON del MBG se presenta con su variante alterna.
•	Móvil: Botón desaparece (no se muestra en pantalla), solo botón de ícono para desplegar menú. Tanto en su versión cerrada como desplegada, el botón que acompaña el ícono no aparece en esta versión.

 
Pie de Página
FOOTER
Este elemento actúa como el cierre estructural del sitio y posee un comportamiento de altura dinámica para adaptarse a futuras expansiones de contenido.
1. REGLAS DE POSICIONAMIENTO Y DIMENSIÓN
•	Punto de Inicio (Margen Superior):
o	Escritorio: 5 líneas (L) por debajo del último componente de la sección anterior.
o	Tableta / Móvil: 4 líneas (L) por debajo del último componente de la sección anterior.
•	Ancho: Extensión total del grid (Escritorio: C1-C42 | Tableta: C1-C25 | Móvil: C1-C13).
•	Altura: Variable. La altura total del contenedor será la necesaria para albergar sus componentes internos, sumando siempre un Margen Inferior de Seguridad:
o	Escritorio: 3 líneas (L) libres tras el último componente.
o	Tableta / Móvil: 2 líneas (L) libres tras el último componente.
2. COMPONENTES INTERNOS
Ambos componentes utilizan TYPO-BODY-2 y COLOR-ORANGE-TERRACOTTA-01.
•	FBT1 (COMP-TEXT-BOX)
o	Posición: Línea 1 del Footer.
o	Ubicación: Escritorio: C3 | Tableta: C2 | Móvil: C2.
o	Alineación: Izquierda. Centrado verticalmente respecto a su línea.
o	Bandera Lógica: Si FLAG-ZERO-P es false, se usa variante de contenido F, si es true, se usa variante de contenido T.
•	FBT2 (COMP-TEXT-BOX)
o	Posición: * Escritorio/Tableta: Línea 1 del Footer.
	Móvil: Línea 2 del Footer.
o	Ubicación: * Escritorio: C40 (Alineado a la derecha).
	Tableta: C24 (Alineado a la derecha).
	Móvil: C2 (Alineado a la izquierda).
o	Alineación: Según ubicación (Derecha en Desk/Tab, Izquierda en Mob). Centrado verticalmente respecto a su línea.
 

Secciones/Páginas
Home 
Sección: Work
Código de sección: HP-WORK
Esta es la sección de aterrizaje y exhibición principal de proyectos. Se caracteriza por un flujo vertical infinito basado en columnas de componentes repetibles.

Instrucción de Referencia Visual: Para la ejecución de esta sección, es obligatorio consultar la carpeta Work_Page dentro de la carpeta de Referencias. Los archivos WP_Desk_1, WP_Tablet_1 y WP_Mobile_1 muestran la composición con el MENU-HERO. Los archivos WP_Desk_2, WP_Tablet_2 y WP_Mobile_2 muestran la versión con MENU-BARRA (incluyendo el despliegue de móvil en WP_Mobile_DM).
Navegación Interna: NAV-SCROLL-FREE
Nota de Renderizado: El grid visible en las maquetas es estrictamente para referencia de posicionamiento; el sitio final no debe visualizar ninguna línea de grid.
1. COMPONENTE GLOBAL: NAVEGACIÓN
•	Componente: MENU-HERO (Estado inicial).
•	Transición de Estado: Al realizar scroll, en el instante en que el borde superior de MBG interseca con el borde superior del viewport ($L = 0$), el componente conmuta inmediatamente a MENU-BARRA.
•	Ubicación Inicial:
o	Escritorio: C3L2 a C40L14.
o	Tableta: C2L2 a C24L12.
o	Móvil: C2L2 a C12L15.
•	Botón activo (Con variante 2 y visible en visualización móvil): MB1

2. ESTRUCTURA DE COLUMNAS (PROYECTOS)
La visualización de proyectos se organiza en columnas que contienen Conjuntos de Repetición (WFX, WTTX, WBTX).
Distribución por Dispositivo:
•	Escritorio (42 Columnas):
o	Columna 1 (C3 a C20): Contiene Repeticiones 2, 5 y 6. Inicio en L17.
o	Columna 2 (C23 a C40): Contiene Repeticiones 1, 3 y 4. Inicio en L17.
•	Tableta (25 Columnas):
o	Columna 1 (C2 a C12): Contiene Repeticiones 2, 5 y 6. Inicio en L14.
o	Columna 2 (C14 a C24): Contiene Repeticiones 1, 3 y 4. Inicio en L14.
•	Móvil (13 Columnas):
o	Columna Única (C2 a C12): Contiene Repeticiones 1, 2, 3, 4, 5 y 6 en orden ascendente. Inicio en L17.

3. DEFINICIÓN DEL CONJUNTO DE COMPONENTES
Cada proyecto se construye mediante la suma de tres elementos con posicionamiento relativo (L+n).
A. Cuadro de Imagen (WFX: COMP-FRAME-BORDER)
•	Propiedad: Selección transfiere a la página de proyecto correspondiente (PP-XXXX).
•	Dimensiones (Alto por variante):
o	WF1: Desk: 4L | Tablet: 4L | Mob: 3L (→ PP-VIBEC).
o	WF2: Desk: 14L | Tablet: 10L | Mob: 9L (→ PP-SWALL).
o	WF3: Desk: 14L | Tablet: 10L | Mob: 9L (→ PP-MIITESO).
o	WF4: Desk: 14L | Tablet: 10L | Mob: 9L (→ PP-OKDJ).
o	WF5: Desk: 10L | Tablet: 7L | Mob: 7L (→ PP-NUTD).
o	WF6: Desk: 10L | Tablet: 7L | Mob: 7L (→ PP-NUTM).
B. Título de Proyecto (WTTX: COMP-TEXT-BOX)
•	Ubicación: Comienza a 1 Línea (L) de distancia del borde inferior de su WFX respectivo.
•	Estilo: TYPO-HEADLINE-1, COLOR-ORANGE-TERRACOTTA-01.
•	Alineación: Izquierda. Centrado horizontalmente en la columna.
•	Contenido: 1 línea esperada.
C. Descripción de Proyecto (WBTX: COMP-TEXT-BOX)
•	Ubicación: * Escritorio: Comienza a 1 Línea (L) de distancia de WTTX.
o	Tableta / Móvil: Comienza en la Línea inmediata siguiente de WTTX.
•	Estilo: TYPO-BODY-2, COLOR-OFFWHITE-ALABASTER-01.
•	Alineación: Izquierda. Centrado horizontalmente en la columna.
•	Contenido: 2 líneas esperadas.

4. RELACIÓN DE FLUJO VERTICAL (LÓGICA DE STACK)
Dentro de cada columna, el siguiente Conjunto de Repetición (WFX de la siguiente repetición) debe posicionarse automáticamente a 3 Líneas (L) de distancia del final del WBTX anterior, asegurando el ritmo visual brutalista en todo el recorrido vertical.


 
Sección: About
Código de sección: HP-ABOUT
Instrucción de Referencia Visual: Es mandatorio consultar los archivos de la carpeta About_Page correspondientes a esta sección: AP_Desk_1, AP_Tableta_1 y AP_Mobile_1. El grid visible en estas maquetas es la guía de posicionamiento, pero debe ser invisible en el renderizado final.
1. NAVEGACIÓN Y MENÚ
•	Tipo de Navegación: NAV-DIRECT-LINK con desplazamiento interno NAV-SCROLL-FREE.
•	Comportamiento del Menú:
o	Si el estado previo es MENU-DISPLAY, realiza una transición inmediata a MENU-BARRA.
o	En esta sección, el menú permanece fijo en MENU-BARRA.
o	Botón Activo: MB2 (Variante 2 activa y visible en todas las visualizaciones).

2. ESTRUCTURA DE COLUMNAS (CONTENEDORES DINÁMICOS)
Las columnas inician en una línea específica y se extienden indefinidamente hacia abajo según el volumen de sus componentes.
•	Regla de Motion: MOTION-FADE-MOVE (Entrada: Up | Salida: Down).
•	Escritorio:
o	Columna 1: C3 a C27 (Inicio L6).
o	Columna 2: C30 a C40 (Inicio L6).
•	Tableta:
o	Columna 1: C2 a C13 (Inicio L5).
o	Columna 2: C16 a C24 (Inicio L5).
•	Móvil:
o	Columna Única: C2 a C12 (Inicio L5).

3. DESGLOSE DE COMPONENTES (ESCRITORIO / TABLETA)
COLUMNA 1
1.	ATT1: COMP-TEXT-BOX, TYPO-HEADLINE-1, COLOR-ORANGE-TERRACOTTA-01. Inicio L5, centrado horizontalmente en línea, alineado a la izquierda. (1L de alto).
2.	ABT1: COMP-TEXT-BOX, TYPO-BODY-2, COLOR-OFFWHITE-ALABASTER-01. Inicio a L+2 de ATT1. Justificación izquierda. Altura indefinida.
a.	Propiedad PROP-LOGIC: Si FLAG-ZERO-P es TRUE -> Variante T. Si es FALSE -> Variante F.
3.	ATT2: COMP-TEXT-BOX, TYPO-HEADLINE-1, COLOR-ORANGE-TERRACOTTA-01. Inicio a L+3 de ABT1. (1L de alto).
4.	ABT2: COMP-TEXT-BOX, TYPO-BODY-1, COLOR-ORANGE-TERRACOTTA-01. Inicio a L+2 de ATT2. (1L de alto).
5.	ABT3: COMP-TEXT-BOX, TYPO-BODY-2, COLOR-OFFWHITE-ALABASTER-01. Inicio a L+2 de ABT2. Altura indefinida.
6.	ABT4: COMP-TEXT-BOX, TYPO-BODY-1, COLOR-ORANGE-TERRACOTTA-01. Inicio a L+3 de ABT3. (1L de alto).
7.	ABT5: COMP-TEXT-BOX, TYPO-BODY-2, COLOR-OFFWHITE-ALABASTER-01. Inicio a L+2 de ABT4. Altura indefinida.
8.	ABT6: COMP-TEXT-BOX, TYPO-BODY-1, COLOR-ORANGE-TERRACOTTA-01. Inicio a L+3 de ABT5. (1L de alto).
9.	ABT7: COMP-TEXT-BOX, TYPO-BODY-2, COLOR-OFFWHITE-ALABASTER-01. Inicio a L+2 de ABT6. Altura indefinida.
10.	AML1: Línea de 5pt, COLOR-ORANGE-TERRACOTTA-01. Inicio a L+2 de ABT7.
11.	ATT3: COMP-TEXT-BOX, TYPO-HEADLINE-1, COLOR-ORANGE-TERRACOTTA-01. Inicio a L+3 de AML1. (1L de alto).
12.	ABT8: COMP-TEXT-BOX, TYPO-BODY-1, COLOR-ORANGE-TERRACOTTA-01. Inicio a L+2 de ATT3. (1L de alto).
13.	ABT9: COMP-TEXT-BOX, TYPO-BODY-2, COLOR-OFFWHITE-ALABASTER-01. Inicio a L+2 de ABT8. Altura indefinida.
COLUMNA 2
1.	AF0: COMP-FRAME-BORDER. Contenedor dinámico. Padding interno: 1L superior/inferior, 1C izquierda/derecha.
a.	AF1: COMP-FRAME. Altura: 11L. Inicio en L-1 de AF0.
b.	AB1: COMP-BUTTON. Altura: 3L. Inicio a L+2 de AF1. Borde: COLOR-ORANGE-TERRACOTTA-01. Marcador: COLOR-OFFWHITE-ALABASTER-01. Texto (ABBT1): COLOR-ORANGE-TERRACOTTA-01.
c.	Acción: OPEN_NEW_TAB + DOWNLOAD de "CV_OscarC.pdf".
2.	ATT4: COMP-TEXT-BOX, TYPO-HEADLINE-1, COLOR-ORANGE-TERRACOTTA-01. Inicio a L+3 de AF0.
3.	ABT10: COMP-TEXT-BOX, TYPO-BODY-2, COLOR-OFFWHITE-ALABASTER-01. Inicio a L+2 de ATT4. Altura indefinida.
4.	ATT5: COMP-TEXT-BOX, TYPO-HEADLINE-1, COLOR-ORANGE-TERRACOTTA-01. Inicio a L+3 de ABT10.
5.	ABT11: COMP-TEXT-BOX, TYPO-BODY-2, COLOR-OFFWHITE-ALABASTER-01. Inicio a L+2 de ATT5. Altura indefinida.

4. ADAPTACIÓN MÓVIL
Orden de apilamiento vertical (C2 a C12): AF0 (2.1) -> ATT1 (1.1) -> ABT1 (1.2) -> ATT2 (1.3) -> ABT2 (1.4) -> ABT3 (1.5) -> ABT4 (1.6) -> ABT5 (1.7) -> ABT6 (1.8) -> ABT7 (1.9) -> AML1 (1.10) -> ATT3 (1.11) -> ABT8 (1.12) -> ABT9 (1.13) -> ATT4 (2.2) -> ABT10 (2.3) -> ATT5 (2.4) -> ABT11 (2.5).

 
Sección: Contact
Código de sección: HP_CONTACT
Instrucción de Referencia Visual: Es obligatorio consultar los archivos de la carpeta Contact_Page dentro de Referencias: CP_Desk_1, CP_Tablet_1 y CP_Mobile_1. El grid es referencial y no debe ser visible en el resultado final.
1. NAVEGACIÓN Y MENÚ
•	Tipo de Navegación: NAV-DIRECT-LINK con desplazamiento interno NAV-SCROLL-FREE.
•	Comportamiento del Menú:
o	Transición inmediata a MENU-BARRA si el estado previo era MENU-DISPLAY.
o	Botón Activo: MB3 (Variante 2 activa y visible en todas las visualizaciones).

2. CUADRO INVITACIÓN (SISTEMA DINÁMICO)
•	Regla de Motion: MOTION-FADE-MOVE (Entrada: Up | Salida: Down).
2.1. CF1 (COMP-FRAME-BORDER)
•	Color de Borde: COLOR-ORANGE-TERRACOTTA-01.
•	Posicionamiento:
o	Escritorio: C3L6 - C40L20.
o	Tableta: C2L5 - C24L17.
o	Móvil: C2L5 - C12L24.
•	Padding Interno: 1C (Lateral) y 1L (Vertical).
2.1.1. CF2 (COMP-FRAME)
•	Fondo: COLOR-ORANGE-TERRACOTTA-01. Ocupa el área interna total definida por el padding de CF1.
•	Contenido Interno (Color de texto/iconos: COLOR-BLUE-NAVY-01):
o	CTT1 (COMP-TEXT-BOX / TYPO-HEADLINE-1): * Posición: L+3 (Tableta) o L+4 (Escritorio/Móvil) desde el borde de CF2.
	Propiedad PROP-LOGIC: Si FLAG-RECURRING es TRUE -> Variante T. Si es FALSE -> Variante F.
o	CBT1 (COMP-TEXT-BOX / TYPO-BODY-2): A L+1 de CTT1.
o	CI1 (ÍCONO MAIL): Referencia "ícono_mail".
	Tamaño: Desk/Tab: 2C x 2L | Mob: 3C x 2L.
	Posición: Desk: C17L14-C18L15 | Tab: C9L12-C10L13 | Mob: C6L14-C8L15.
o	CBT2 (COMP-TEXT-BOX / TYPO-BODY-2): A L+1 de CI1. Centrado vertical en CI1.
o	CI2 (ÍCONO PHONE): Referencia "ícono_phone".
	Tamaño: Desk/Tab: 2C x 2L | Mob: 3C x 2L.
	Posición: Desk: C25L14-C26L15 | Tab: C16L12-C17L13 | Mob: C6L18-C8L19.
o	CBT3 (COMP-TEXT-BOX / TYPO-BODY-2): A L+1 de CI2. Centrado vertical en CI2.

3. INTRODUCCIÓN A COMENTARIOS
•	3.1. CTT2 (COMP-TEXT-BOX / TYPO-HEADLINE-1): A L+2 de CF1. COLOR-ORANGE-TERRACOTTA-01.
•	3.2. CBT4 (COMP-TEXT-BOX / TYPO-BODY-2): A L+1 de CTT2. COLOR-ORANGE-TERRACOTTA-01.

4. SECCIÓN DE COMENTARIOS
Esta sección se compone de una serie de frames con bordes que agrupan cuadros de texto y botones. Las repeticiones se agrupan horizontalmente desde la izquierda en Escritorio y Tableta, y verticalmente desde arriba en Móvil, iniciando a 2 líneas por debajo de CBT4.
4.1. CONJUNTO CF3
•	CF3: COMP-FRAME-BORDER. Borde: COLOR-ORANGE-TERRACOTTA-01.
o	Tamaño: Escritorio: 12C x 11L | Tableta: 7C x 14L | Móvil: 11C x 11L.
o	Contenido:
	CBT5: COMP-TEXT-BOX. TYPO-BODY-1 (Bold). Color: COLOR-ORANGE-TERRACOTTA-01. 1 línea de alto. Ubicado a 2 líneas debajo del borde superior interno de CF3. Centrado horizontalmente en su línea y alineado al centro vertical del frame. Límite de ancho: Escritorio 12C, Tableta 7C, Móvil 11C.
	CBT6: COMP-TEXT-BOX. TYPO-BODY-2. Color: COLOR-ORANGE-TERRACOTTA-01. 1 línea de alto. Ubicado a 1 línea debajo de CBT5. Centrado horizontalmente en su línea y alineado al centro vertical del frame. Límite de ancho: Escritorio 10C, Tableta 5C, Móvil 9C.
	CBT7: COMP-TEXT-BOX. TYPO-BODY-2. Color: COLOR-OFFWHITE-ALABASTER-01. Extensión de líneas indefinida. Ubicado a 2 líneas debajo de CBT6, desde el borde superior de la línea de inicio. Alineado al centro vertical del frame. Límite de ancho: Escritorio 10C, Tableta 5C, Móvil 9C.
	CB1: COMP-BUTTON. Borde y cuadro de texto (CBBT1): COLOR-ORANGE-TERRACOTTA-01. Marcador: COLOR-OFFWHITE-ALABASTER-01. Ubicado a 2 líneas por arriba del borde inferior interno de CF3.
•	Acción: Abrir en nueva pestaña y descargar archivo "Carta_Fernando.pdf".
4.2. CONJUNTO CF4
•	CF4: COMP-FRAME-BORDER. Borde: COLOR-ORANGE-TERRACOTTA-01.
o	Tamaño: Escritorio: 12C x 11L | Tableta: 7C x 14L | Móvil: 11C x 11L.
o	Contenido:
	CBT8: COMP-TEXT-BOX. TYPO-BODY-1 (Bold). Color: COLOR-ORANGE-TERRACOTTA-01. 1 línea de alto. Ubicado a 2 líneas debajo del borde superior interno de CF4. Centrado horizontalmente en su línea y alineado al centro vertical del frame. Límite de ancho: Escritorio 12C, Tableta 7C, Móvil 11C.
	CBT9: COMP-TEXT-BOX. TYPO-BODY-2. Color: COLOR-ORANGE-TERRACOTTA-01. 1 línea de alto. Ubicado a 1 línea debajo de CBT8. Centrado horizontalmente en su línea y alineado al centro vertical del frame. Límite de ancho: Escritorio 10C, Tableta 5C, Móvil 9C.
	CBT10: COMP-TEXT-BOX. TYPO-BODY-2. Color: COLOR-OFFWHITE-ALABASTER-01. Extensión de líneas indefinida. Ubicado a 2 líneas debajo de CBT9, desde el borde superior de la línea de inicio. Alineado al centro vertical del frame. Límite de ancho: Escritorio 10C, Tableta 5C, Móvil 9C.
	CB2: COMP-BUTTON. Borde y cuadro de texto (CBBT2): COLOR-ORANGE-TERRACOTTA-01. Marcador: COLOR-OFFWHITE-ALABASTER-01. Ubicado a 2 líneas por arriba del borde inferior interno de CF4.
•	Acción: Abrir en nueva pestaña y descargar archivo "Carta_Norma.pdf".
4.3. CONJUNTO CF5
•	CF5: COMP-FRAME-BORDER. Borde: COLOR-ORANGE-TERRACOTTA-01.
o	Tamaño: Escritorio: 12C x 11L | Tableta: 7C x 14L | Móvil: 11C x 11L.
o	Contenido:
	CBT11: COMP-TEXT-BOX. TYPO-BODY-1 (Bold). Color: COLOR-ORANGE-TERRACOTTA-01. 1 línea de alto. Ubicado a 2 líneas debajo del borde superior interno de CF5. Centrado horizontalmente en su línea y alineado al centro vertical del frame. Límite de ancho: Escritorio 12C, Tableta 7C, Móvil 11C.
	CBT12: COMP-TEXT-BOX. TYPO-BODY-2. Color: COLOR-ORANGE-TERRACOTTA-01. 1 línea de alto. Ubicado a 1 línea debajo de CBT11. Centrado horizontalmente en su línea y alineado al centro vertical del frame. Límite de ancho: Escritorio 10C, Tableta 5C, Móvil 9C.
	CBT13: COMP-TEXT-BOX. TYPO-BODY-2. Color: COLOR-OFFWHITE-ALABASTER-01. Extensión de líneas indefinida. Ubicado a 2 líneas debajo de CBT12, desde el borde superior de la línea de inicio. Alineado al centro vertical del frame. Límite de ancho: Escritorio 10C, Tableta 5C, Móvil 9C.
	CB3: COMP-BUTTON. Borde y cuadro de texto (CBBT3): COLOR-ORANGE-TERRACOTTA-01. Marcador: COLOR-OFFWHITE-ALABASTER-01. Ubicado a 2 líneas por arriba del borde inferior interno de CF5.
•	Acción: Abrir en nueva pestaña y descargar archivo "Carta_Delia.pdf".

Acciones de Botones:
1.	CB1 (en CF3): OPEN_NEW_TAB + DOWNLOAD de "Carta_Fernando".
2.	CB2 (en CF4): OPEN_NEW_TAB + DOWNLOAD de "Carta_Norma".
3.	CB3 (en CF5): OPEN_NEW_TAB + DOWNLOAD de "Carta_Delia".

 
Páginas de Proyecto
Sección: Páginas de Proyecto
Código de sección: PP-X
Instrucción de Referencia Visual: Es obligatorio consultar los archivos de la carpeta Project_Page dentro de Referencias: PP_Desk_1, PP_Tablet_1 y PP_Mobile_1. El fondo de estas páginas es COLOR-OFFWHITE-ALABASTER-01. El grid es referencial y no debe ser visible en el resultado final.
ESTRUCTURA DE INSTANCIAS: PÁGINAS DE PROYECTO (PP)
1. CONCEPTO DE MATRIZ ÚNICA
A diferencia de las secciones de la Home, las PP no son una sola página, sino un sistema de seis instancias individuales independientes. Todas comparten una Matriz de Construcción Base, lo que garantiza consistencia visual y funcional, pero permiten la edición de contenido, imágenes y metadatos de forma aislada para cada proyecto.
2. IDENTIFICACIÓN POR VARIABLE (X)
Para facilitar la lectura técnica, se utiliza la variable "X" en los códigos de los componentes. Al momento de la construcción de cada página, esta X debe ser reemplazada por el identificador único asignado:
•	PP-VIBEC: Identificador V (Ejemplo: PVF1, PVDT1).
•	PP-SWALL: Identificador S (Ejemplo: PSF1, PSDT1).
•	PP-MIITESO: Identificador M (Ejemplo: PMF1, PMDT1).
•	PP-OKDJ: Identificador O (Ejemplo: POF1, PODT1).
•	PP-NUTD: Identificador ND (Ejemplo: PNDF1, PNDDT1).
•	PP-NUTM: Identificador NM (Ejemplo: PNMF1, PNMDT1).
3. TRANSICIÓN ATMOSFÉRICA (INTERACCIÓN DE COLOR)
De acuerdo con nuestras reglas de navegación entre estados, el paso de HP (Oscuro) a PP (Claro) debe ejecutar la regla:
•	Comportamiento: MOTION-FADE-BACKGROUND.
•	Efecto: Una transición suave de la luminancia del fondo hasta alcanzar el COLOR-OFFWHITE-ALABASTER-01.
•	Tipo de Salto: NAV-DIRECT-LINK.

MATRIZ TÉCNICA DE CONSTRUCCIÓN (PP-X)
Referencia Visual Obligatoria: Consultar la carpeta Project_Page (PP_Desk_1, PP_Tablet_1, PP_Mobile_1).
1. MENÚ Y ENTORNO
•	Componente: MENU-BLANCO.
•	Fondo de Página: COLOR-OFFWHITE-ALABASTER-01.
•	Navegación Interna: NAV-SCROLL-FREE.
2. PRESENTACIÓN SCROLL (STACK VERTICAL DINÁMICO)
Todos los componentes de texto en esta sección utilizan el color COLOR-BLUE-NAVY-01.
•	PXDT1 (TYPO-DISPLAY-2):
o	Ubicación: L6 (Escritorio/Tableta) | L5 (Móvil).
o	Ancho: C11-C32 (Escritorio), C5-C21 (Tableta), C2-C12 (Móvil).
o	Alineación: Centro (horizontal y respecto al bloque).
•	PXBT1 (TYPO-BODY-2):
o	Relación: L+2 debajo de PXDT1. Alineado a la izquierda.
o	Lógica: Si FLAG-ALL-P es TRUE -> Variante T | FALSE -> Variante F.
•	PXBT2 (TYPO-BODY-2):
o	Relación: L+2 debajo de PXBT1. Alineado a la izquierda.
o	Lógica: Si FLAG-FIRST-P es TRUE -> Variante T | FALSE -> Variante F.
•	PXBT3 (TYPO-BODY-2):
o	Relación: L+2 debajo de PXBT2. 1 línea de alto esperada.
•	PXF1 (COMP-FRAME):
o	Relación: L+2 debajo de PXBT3.
o	Tamaño: 31C x 18L (Desk), 26C x 12L (Tab), 11C x 6L (Mob).
•	PXBT4 (TYPO-BODY-2):
o	Relación: L+3 (Desk/Tab) | L+2 (Mob) debajo de PXF1.
•	PXF2 (COMP-FRAME):
o	Relación: L+3 (Desk/Tab) | L+2 (Mob) debajo de PXBT4.
o	Tamaño: 31C x 18L (Desk), 26C x 12L (Tab), 11C x 6L (Mob).
•	PXF3 y PXF4 (COMP-FRAME):
o	Relación: Cada uno a L+1 del anterior.
•	PXBT5 (TYPO-BODY-2):
o	Relación: L+3 (Desk/Tab) | L+2 (Mob) debajo de PXF4.
•	PXF5 al PXF9 (COMP-FRAME):
o	Relación Inicial: PXF5 a L+3 (Desk/Tab) | L+2 (Mob) debajo de PXBT5.
o	Relación Consecutiva: PXF6, PXF7, PXF8 y PXF9 se apilan a L+1 de su predecesor.



