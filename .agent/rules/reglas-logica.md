---
trigger: always_on
---

REGLA-LOGICA-001: SISTEMA DE NARRATIVA PRECOGNITIVA
Esta regla define el sistema de inteligencia local que permite al sitio "recordar" el comportamiento del usuario para desplegar una narrativa personalizada y adaptativa.

1. Propósito y Filosofía
El objetivo es transformar el sitio en una entidad con "personalidad" que reconoce el progreso del usuario. El sistema debe operar de forma no intrusiva, utilizando la información para mejorar la experiencia (UX) y la narrativa, sin generar una sensación de vigilancia invasiva.

2. Metodología Técnica (El Motor)
Para garantizar la persistencia sin necesidad de bases de datos externas (Backend), el sitio utilizará la API de LocalStorage del navegador:

Almacenamiento Local: Los datos se guardan exclusivamente en el dispositivo del usuario bajo la llave maestra PORTFOLIO_STATE.

Privacidad: La información es privada, individual por dispositivo y no se comparte entre usuarios ni se envía a servidores externos.

Ciclo de Ejecución:

Sincronización: Al cargar cualquier página, el sitio lee el estado guardado. Si no existe, lo inicializa.

Rastreo (Tracking): El sistema detecta automáticamente si la página actual es un proyecto (Páginas con códigos que empiezan con P) y lo registra en el historial.

Persistencia: Cualquier cambio en las variables se guarda instantáneamente para estar disponible en la siguiente interacción.

3. Variables de Estado (Banderas Lógicas)
El sistema procesa en segundo plano las siguientes variables, que actúan como interruptores (Flags) para el contenido:

FLAG-FIRST-P: TRUE cuando el usuario carga su primer proyecto de la historia.

FLAG-ALL-P: TRUE cuando el usuario ha visitado la totalidad de los proyectos disponibles.

FLAG-SOME-P: TRUE cuando el usuario ha visto al menos uno, pero no todos los proyectos.

FLAG-ZERO-P: TRUE mientras el historial de proyectos visitados sea igual a cero.

COUNT-VISITS: Contador numérico de sesiones (cargas totales del sitio).

FLAG-RECURRING: TRUE cuando el contador de visitas es superior a 3.

4. Aplicación de Contenido (Propiedad PROP-LOGIC)
Los componentes (especialmente COMP-TEXT-BOX) pueden ser marcados en el Documento de Construcción con la propiedad PROP-LOGIC. Esta propiedad permite que el Documento de Contenido asigne dos variantes de información:

Variante False (Default): Contenido estándar que se muestra si la condición lógica es FALSE.

Variante True (Precognitiva): Contenido alternativo que se activa cuando la condición lógica asociada es TRUE.

5. Regla de Renderizado
Para evitar el parpadeo de contenido (Layout Shift), el sistema debe evaluar las variables lógicas antes de que el componente sea visible en el viewport, asegurando que la variante correcta (A o B) sea la única que el usuario perciba desde el primer instante.