# Simulador de Examen — Sistemas Operativos (UNMSM)

Herramienta de estudio para el examen parcial del curso de **Sistemas Operativos**, Prof. **Díaz Muñante Jorge Raúl**.
Generada a partir de los PDFs C1–C7, los 3 foros, las respuestas transcritas del profesor y sus exámenes reales (2013, 2022, 2024, 2025-2).

## Cómo abrirlo

Doble clic en **`index.html`** (se abre en cualquier navegador; no necesita internet ni instalar nada).
No muevas los archivos de su carpeta: `index.html` carga `estilo.css`, `app.js` y la carpeta `data/`.

## Dos modos

### 1) Estudiar por tema (para aprender, sin nota)
Cada tema tiene:
- **Material de estudio completo:** teoría + tablas + **diagramas de flujo (SVG)** claros, con flechas, transiciones y casos particulares (por ejemplo, el diagrama de 5 estados marca la excepción de finalizar un proceso bloqueado y el bucle infinito).
- **Práctica escrita:** las preguntas del tema se responden **escribiendo tu respuesta** en un cuadro de texto (no es tipo test). Luego pulsas *Mostrar respuesta modelo* y comparas con lo que el profesor espera. Aquí **no hay calificación**: es para estudiar.

### 2) Examen general (único modo de prueba, se califica)
Arma un examen mixto **cronometrado** (por defecto 80 min, como el real): Parte I (marcar) + Parte II (desarrollo).
Sin pistas hasta el final. Al terminar se **califica la Parte I** y se muestran las respuestas modelo. La **respuesta correcta no se resalta** en las opciones: se indica en el texto de la retroalimentación.

## Contenido

- **179 preguntas** en **8 temas**, todos con 20 o más: Introducción · Procesos · Estados (5 y 7/UNIX) · Sincronización · Deadlock · Planificación del CPU · Memoria · Foros (IoT / Linux / vCPU-HT).
- **28+ diagramas** propios (SVG), incluidas **animaciones** de los conceptos con "flujo": ciclo de vida de 5 estados (un proceso recorriendo los estados), swapping RAM↔disco, traducción de la MMU, cambio de contexto, exclusión mutua (sección crítica), Round Robin y espera circular del deadlock. También estáticos: Von Neumann, roles del SO, modo usuario/kernel, Coffman, grafo de recursos, jerarquía de memoria, fragmentación, hyperthreading, etc.
- Un **ejemplo resuelto** en cada uno de los 8 temas.
- **Imágenes** en preguntas y material: figuras reales del examen 2025-2, salidas de comandos (`free -h`, `ps`, `pidstat`), pseudocódigo y diagramas.
- Marcadas las "trampas" del profesor (SJF/SRTF → *ninguno*; finalizar proceso bloqueado → cambio del PC; prevenir ≠ evitar).

## Cómo agregar más (extensible)

- **Más preguntas de un tema:** edita `data/temaN_*.js` y añade objetos dentro de `BANCO.add("tN", [ ... ])`.
- **Ampliar el material de un tema:** edita `data/materialN_*.js` (es HTML; puedes pegar más texto, tablas o `<svg>`).
- **Tema nuevo:** agrégalo en `data/temas.js`, crea `data/temaN_*.js` (`BANCO.add`) y `data/materialN_*.js` (`BANCO.setMaterial`), y enlázalos con `<script src="...">` en `index.html`.

Formato de una pregunta:

```js
{
  id: "t6-25", tipo: "opcion",            // opcion | multiple | vf | abierta
  dificultad: "alta",                     // media | alta | trampa
  enunciado: "Texto (admite HTML).",
  recurso: { tipo: "grafico", cap: "...", contenido: "<svg>...</svg>" }, // opcional
  opciones: [ { t: "correcta", ok: true }, { t: "distractor", ok: false } ],
  // vf:      vf: true,
  // abierta: modelo: "...", enfoque: "ideal|real|mixto", claves: ["...","..."],
  explica: "Justificación técnica.",
  fuente: "C6 / Foro 3 / Examen 2025..."
}
```
