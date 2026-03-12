---
trigger: always_on
---

REGLA-MOTION-001 — Motion & Transiciones (Vibe Coding Edition)

Esta regla define el repertorio cerrado de animaciones. En este sistema, el motion asume un rol tanto funcional como decorativo para aportar fluidez y sofisticación al diseño minimalista.

A. Principios de Motion

Fluidez Absoluta: Las animaciones deben ser suaves y naturales, sin saltos de frames ni cortes abruptos.

Prioridad de Curva: Se utiliza una aceleración agresiva al inicio y una desaceleración muy suave al final para un look "premium".

Uso de Hardware: Es obligatorio el uso de will-change: transform, opacity para asegurar 60fps constantes.

B. Variables de Tiempo y Curva (Tokens)

--motion-duration-main: 650ms (Para desplazamientos y cambios de página).

--motion-duration-text: 450ms (Para animaciones de caracteres).

--motion-ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1); (Rápido al inicio, lento al final).

--motion-ease-in-out-smooth: cubic-bezier(0.42, 0, 0.58, 1); (Para transiciones de color de fondo).

C. Animaciones de Transición y Estado

MOTION-FADE-BASIC

Descripción: Fade in / Fade out simple.

Uso: Aparición de elementos estándar y base para la transición suave entre páginas de distinto color (oscuro/claro).

Comportamiento: Transición de opacidad de 0 a 1 (o viceversa) usando --motion-duration-main.

MOTION-FADE-MOVE

Descripción: Combinación de Fade y desplazamiento vertical (Up/Down).

Uso: Bloques de contenido y elementos narrativos secundarios.

Trayectoria: 20px de desplazamiento.

D. Animaciones Decorativas (Impacto Visual)

MOTION-TEXT-STRETCH (Decorativa)

Descripción: Animación por carácter individual (letter-by-letter).

Comportamiento: Cada letra realiza un Fade In simultáneo a un "Stretch In".

Efecto: La letra nace supercondensada (scale-x: 0.1) pegada a la izquierda y se expande hasta su forma natural (scale-x: 1) hacia la derecha.

Timing: Cada letra tiene un delay progresivo de 30ms.

MOTION-SLIDE-PATH-IN (Decorativa)

Descripción: Desplazamiento horizontal desde el exterior hacia la posición final.

Comportamiento: El elemento nace en una columna de origen (definida en Construcción) y se desplaza hacia la izquierda hasta su coordenada final.

Efecto: Combinado con Fade In. Empieza rápido y termina lento usando --motion-ease-out-expo.

MOTION-SLIDE-PATH-OUT (Decorativa)

Descripción: Desplazamiento horizontal de salida.

Comportamiento: El elemento parte de su posición actual y se desplaza hacia la izquierda hasta la columna de fuga descrita.

Efecto: Combinado con Fade Out.

E. Regla Especial: Transición de Interfaz (Ambiente)

Para mitigar el estrés visual entre el fondo oscuro (Home) y claro (Proyectos), la IA debe aplicar el token MOTION-FADE-BASIC directamente sobre el contenedor de fondo (background-color).

El ritmo debe ser constante (--motion-ease-in-out-smooth) para que los colores se mezclen delicadamente sin frenar la carga de la nueva página.

F. Regla Estricta de Uso

Solo estos códigos pueden aplicarse.

Está prohibido crear nuevas trayectorias o curvas fuera de las definidas aquí.

El Documento de Construcción debe especificar para cada componente: el código de motion, el disparador (trigger) y, en el caso de los SLIDE-PATH, las columnas de inicio o fuga.