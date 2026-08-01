---
trigger: always_on
---

REGLA-TYPO-001 — Tipografía (Versión Ejecutable)

Esta regla define el repertorio cerrado de estilos tipográficos permitidos y su implementación exacta en código mediante un sistema de escalas por dispositivo. El Documento de Construcción solo referencia estos códigos y define color, posición, alineación y contenido.

A. Tipografías base (recursos y variables)
Para la implementación, la IA debe incluir los siguientes recursos en el <head> y configurar las variables de familia:

Recurso Boska: <link href="https://api.fontshare.com/v2/css?f[]=boska@700&display=swap" rel="stylesheet">

Recurso Inter (Google Fonts): ```html <link rel="preconnect" href="https://fonts.googleapis.com"> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">

Variables:

CSS

:root {
  --font-display: 'Boska', serif;
  --font-ui: 'Inter', sans-serif;
}
B. Estilos tipográficos permitidos (Matriz Escalar)
La IA debe aplicar los valores de tamaño (font-size) y espaciado entre párrafos (line-height) priorizando siempre los puntos (pt) estipulados. Para los estilos que usan Inter, se debe incluir font-optical-sizing: auto;.

TYPO-DISPLAY-1

Propiedades: font-family: var(--font-display); font-weight: 700; margin: 0;

Escritorio: 160pt / 148pt

Tableta: 93pt / 80pt

Móvil: 69pt / 64pt

TYPO-DISPLAY-2

Propiedades: font-family: var(--font-display); font-weight: 700; margin: 0;

Escritorio: 81pt / 75pt

Tableta: 60pt / 51pt

Móvil: 33pt / 30pt

TYPO-HEADLINE-1

Propiedades: font-family: var(--font-ui); font-optical-sizing: auto; font-weight: 800; margin: 0;

Escritorio: 36pt / 38pt

Tableta: 28pt / 30pt

Móvil: 22pt / 23pt

TYPO-BODY-1

Propiedades: font-family: var(--font-ui); font-optical-sizing: auto; margin: 0; (Peso y estilo se deciden en construcción)

Escritorio: 24pt / 26pt

Tableta: 20pt / 20pt

Móvil: 18pt / 18pt

TYPO-BODY-2

Propiedades: font-family: var(--font-ui); font-optical-sizing: auto; margin: 0; (Peso y estilo se deciden en construcción)

Escritorio: 20pt / 24pt

Tableta: 18pt / 22pt

Móvil: 16pt / 18pt

C. Regla estricta de uso
Prioridad de Medida: El valor en pt es absoluto. No se permiten conversiones que alteren la jerarquía visual.

Implementación de Inter: Para cualquier variante de Inter, la IA debe usar la sintaxis de fuente variable, permitiendo que el font-weight oscile entre 100 y 900 según se indique en el Documento de Construcción.

Cero Márgenes: Todos los estilos deben tener margin: 0 para garantizar un comportamiento predecible dentro de las coordenadas del grid.

El Documento de Construcción: Invoca el código, define color, posición, alineación y el peso específico (font-weight) para los estilos BODY.