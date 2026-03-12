---
trigger: always_on
---

REGLA-COLOR-001 — Color

Propósito Definir el conjunto cerrado de colores permitidos en el sistema. Esta regla no define usos, jerarquías ni contextos. La aplicación específica de cada color se define únicamente en el Documento de Construcción.

A. Paleta base acordada
Solo se permiten estos tres colores. Se elimina cualquier referencia a negros o grises.

COLOR-ORANGE-TERRACOTTA-01

Hex: #C65A2E

Descripción: Naranja terroso cálido, orgánico y brutalista.

COLOR-BLUE-PETROLEUM-01

Hex: #233D4D

Descripción: Azul petróleo oscuro y profundo. Actúa como el valor más oscuro del sistema en ausencia de negro.

COLOR-OFFWHITE-ALABASTER-01

Hex: #F5F3EF

Descripción: Blanco cálido (hueso) para reducir fatiga visual.

B. Declaración obligatoria en CSS
CSS

:root {
  --color-orange-terracotta-01: #C65A2E;
  --color-blue-petroleum-01: #233D4D;
  --color-offwhite-alabaster-01: #F5F3EF;
}