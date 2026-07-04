/* MATERIAL DE ESTUDIO — TEMA 6: Planificación del CPU */
BANCO.setMaterial("t6", `
<h2>Tema 6 · Planificación del CPU</h2>
<p class="intro">El <b>planificador (scheduler)</b> decide qué proceso de la cola de <b>Listos</b> pasa a <b>Ejecución</b>; el <b>despachador (dispatcher)</b> ejecuta el cambio. La planificación puede ser <b>no apropiativa</b> (no se arrebata el CPU) o <b>apropiativa</b> (sí se arrebata; cuesta un cambio de contexto).</p>

<h3>6.1 La respuesta CLAVE: SJF vs SRTF</h3>
<table>
<tr><th></th><th>SJF (Shortest Job First)</th><th>SRTF (Shortest Remaining Time First)</th></tr>
<tr><td>Apropiativo</td><td><b>NO</b></td><td><b>SÍ</b> (expulsa si llega uno más corto)</td></tr>
<tr><td>Efecto convoy</td><td>Lo sufre</td><td>Lo impide</td></tr>
<tr><td>Inanición</td><td>Sí (favorece "ser corto")</td><td>Sí</td></tr>
</table>
<div class="callout trampa"><b class="tag">TRAMPA (la "pregunta cantadísima"):</b> ¿cuál recomiendas para un SO real? → <b>NINGUNO</b>. Ambos requieren <b>conocer la duración futura</b> del proceso (imposible) y son <b>fáciles de burlar</b> (el usuario miente diciendo que durará poco). Son ideales/teóricos. En la práctica se usan aproximaciones: <b>Round Robin</b> o <b>colas multinivel realimentadas</b> que estiman el comportamiento.</div>

<h3>6.2 FCFS y el efecto convoy</h3>
<p><b>FCFS</b> (First-Come First-Served) es no apropiativo y sin inanición, pero un proceso largo adelante atasca a los cortos: <b>efecto convoy</b>.</p>
<div class="diagrama">
<svg viewBox="0 0 640 150" role="img" aria-label="Efecto convoy en FCFS">
  <text x="20" y="24" font-size="12" font-weight="bold">FCFS: P1(24), P2(3), P3(3) — llegan en t=0</text>
  <rect x="20" y="34" width="360" height="30" fill="#f0d9c9" stroke="#333"/><text x="200" y="54" text-anchor="middle" font-size="11">P1 (24)</text>
  <rect x="380" y="34" width="45" height="30" fill="#cdd0f0" stroke="#333"/><text x="402" y="54" text-anchor="middle" font-size="10">P2</text>
  <rect x="425" y="34" width="45" height="30" fill="#c9e6cf" stroke="#333"/><text x="447" y="54" text-anchor="middle" font-size="10">P3</text>
  <text x="20" y="82" font-size="9">0</text><text x="372" y="82" font-size="9">24</text><text x="418" y="82" font-size="9">27</text><text x="462" y="82" font-size="9">30</text>
  <text x="20" y="110" font-size="11">Tiempo de espera promedio = (0 + 24 + 27)/3 = <b>17</b>. Si los cortos fueran primero, bajaría a 3.</text>
</svg>
<div class="cap-fig">Figura 6.1 — Los procesos cortos P2 y P3 esperan al larguísimo P1: eso es el efecto convoy.</div>
</div>

<h3>6.3 Round Robin (RR)</h3>
<p>Cada proceso ejecuta un <b>quantum</b> y pasa al siguiente. Es apropiativo, no sufre convoy y da buen <b>tiempo de respuesta</b>. Su costo: sumar el cambio de contexto.</p>
<div class="diagrama">
<svg viewBox="0 0 640 120" role="img" aria-label="Round Robin con quantum">
  <text x="20" y="22" font-size="12" font-weight="bold">RR con quantum = 20 (P1=53, P2=8, P3=68, P4=24)</text>
  <rect x="20" y="30" width="90" height="28" fill="#cdd0f0" stroke="#333"/><text x="65" y="49" text-anchor="middle" font-size="10">P1 (20)</text>
  <rect x="110" y="30" width="40" height="28" fill="#c9e6cf" stroke="#333"/><text x="130" y="49" text-anchor="middle" font-size="9">P2(8)</text>
  <rect x="150" y="30" width="90" height="28" fill="#f0d9c9" stroke="#333"/><text x="195" y="49" text-anchor="middle" font-size="10">P3 (20)</text>
  <rect x="240" y="30" width="90" height="28" fill="#e6d3f0" stroke="#333"/><text x="285" y="49" text-anchor="middle" font-size="10">P4 (20)</text>
  <rect x="330" y="30" width="90" height="28" fill="#cdd0f0" stroke="#333"/><text x="375" y="49" text-anchor="middle" font-size="10">P1 (20)</text>
  <rect x="420" y="30" width="90" height="28" fill="#f0d9c9" stroke="#333"/><text x="465" y="49" text-anchor="middle" font-size="10">P3 (20)</text>
  <rect x="510" y="30" width="30" height="28" fill="#e6d3f0" stroke="#333"/><text x="525" y="49" text-anchor="middle" font-size="8">P4</text>
  <text x="20" y="82" font-size="11">Quantum muy chico → mucho cambio de contexto. Quantum muy grande → se comporta como FCFS.</text>
</svg>
<div class="cap-fig">Figura 6.2 — Cada proceso recibe pronto un turno (buena interactividad); el quantum es la palanca a calibrar.</div>
</div>

<div class="diagrama">
<div class="anim-tag">Animación</div>
<svg viewBox="0 0 600 170" role="img" aria-label="Animacion de Round Robin: el CPU rota por quantum">
  <text x="300" y="24" text-anchor="middle" font-size="12" font-weight="bold">El CPU rota entre procesos, un quantum cada uno</text>
  <rect x="40" y="55" width="100" height="52" rx="6" fill="#dae8fc" stroke="#2c3e50"/><text x="90" y="86" text-anchor="middle" font-size="13" font-weight="bold">P1</text>
  <rect x="180" y="55" width="100" height="52" rx="6" fill="#d5e8d4" stroke="#2c3e50"/><text x="230" y="86" text-anchor="middle" font-size="13" font-weight="bold">P2</text>
  <rect x="320" y="55" width="100" height="52" rx="6" fill="#f0d9c9" stroke="#2c3e50"/><text x="370" y="86" text-anchor="middle" font-size="13" font-weight="bold">P3</text>
  <rect x="460" y="55" width="100" height="52" rx="6" fill="#e6d3f0" stroke="#2c3e50"/><text x="510" y="86" text-anchor="middle" font-size="13" font-weight="bold">P4</text>
  <rect x="40" y="55" width="100" height="52" rx="6" fill="none" stroke="#f39c12" stroke-width="4"><animate attributeName="x" dur="6s" repeatCount="indefinite" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="40;180;320;460;40"/></rect>
  <text x="300" y="138" text-anchor="middle" font-size="12" fill="#b9770e" font-weight="bold" opacity="0">Ejecutando P1 (1 quantum)<animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.01;0.24;0.25;1" values="1;1;1;0;0"/></text>
  <text x="300" y="138" text-anchor="middle" font-size="12" fill="#b9770e" font-weight="bold" opacity="0">Ejecutando P2 (1 quantum)<animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.25;0.26;0.49;0.5;1" values="0;0;1;1;0;0"/></text>
  <text x="300" y="138" text-anchor="middle" font-size="12" fill="#b9770e" font-weight="bold" opacity="0">Ejecutando P3 (1 quantum)<animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.5;0.51;0.74;0.75;1" values="0;0;1;1;0;0"/></text>
  <text x="300" y="138" text-anchor="middle" font-size="12" fill="#b9770e" font-weight="bold" opacity="0">Ejecutando P4 (1 quantum)<animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.75;0.76;0.99;1" values="0;0;1;1;0"/></text>
</svg>
<div class="cap-fig">Figura 6.3 (animada) — Al agotarse el quantum, el CPU pasa al siguiente y el que no terminó vuelve al final de la cola. Quantum muy chico = demasiados saltos (overhead); muy grande = se vuelve FCFS.</div>
</div>

<h3>6.4 Colas multinivel realimentadas (cómo se aproxima a SJF)</h3>
<p>Los procesos <b>cambian de cola/prioridad</b> según su comportamiento: quien consume mucho CPU <b>baja</b>; quien espera mucho <b>sube</b> por <b>envejecimiento (aging)</b>. Así se imita a SJF sin preguntar la duración.</p>
<div class="diagrama">
<svg viewBox="0 0 620 230" role="img" aria-label="Colas multinivel realimentadas">
  <defs>
    <marker id="ah6" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2c3e50"/></marker>
    <marker id="ah6g" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2c7a4b"/></marker>
  </defs>
  <rect x="120" y="20" width="300" height="34" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="270" y="42" text-anchor="middle" font-size="12">Tiempo real (prioridad +)</text>
  <rect x="120" y="70" width="300" height="34" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="270" y="92" text-anchor="middle" font-size="12">Quantum = 10</text>
  <rect x="120" y="120" width="300" height="34" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="270" y="142" text-anchor="middle" font-size="12">Quantum = 20</text>
  <rect x="120" y="170" width="300" height="34" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="270" y="192" text-anchor="middle" font-size="12">FCFS (prioridad −)</text>
  <line x1="430" y1="37" x2="430" y2="185" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ah6)"/><text x="500" y="115" text-anchor="middle" font-size="10">baja si consume<tspan x="500" dy="12">mucho CPU</tspan></text>
  <line x1="105" y1="187" x2="105" y2="40" stroke="#2c7a4b" stroke-width="1.5" marker-end="url(#ah6g)"/><text x="55" y="115" text-anchor="middle" font-size="10" fill="#1c5c38">aging:<tspan x="55" dy="12">sube el</tspan><tspan x="55" dy="12">que espera</tspan></text>
</svg>
<div class="cap-fig">Figura 6.3 — El sistema "aprende" el comportamiento real en lugar de confiar en lo que declara el usuario.</div>
</div>

<h3>6.5 Métricas y cambios de contexto</h3>
<table>
<tr><th>Métrica</th><th>Qué mide</th></tr>
<tr><td>Tiempo de retorno (turnaround)</td><td>Desde que se lanza hasta que termina (espera + ejecución + E/S). Siempre ≥ tiempo de espera.</td></tr>
<tr><td>Tiempo de espera</td><td>Tiempo en la cola de listos sin ejecutar</td></tr>
<tr><td>Tiempo de respuesta</td><td>Desde la petición hasta la primera ejecución</td></tr>
</table>
<table>
<tr><th>Indicador (pidstat -wt)</th><th>Significado</th><th>Si es muy alto</th></tr>
<tr><td><code>cswch</code> (voluntario)</td><td>El proceso cede el CPU (ej. espera E/S)</td><td>Proceso I/O-bound → SSD, E/S asíncrona</td></tr>
<tr><td><code>nvcswch</code> (involuntario)</td><td>El SO le arrebata el CPU (fin de quantum)</td><td>Competencia por CPU / quantum corto → renice, subir quantum</td></tr>
</table>

<div class="callout"><b class="tag">Quantum igual vs variable:</b> igual = simple pero no se adapta; variable = se adapta a interactivos pero más complejo. Recomendación típica: <b>variable</b> (declara el supuesto: priorizar interactividad).</div>

<div class="callout ejemplo"><h4>Ejemplo</h4>
Una cola de impresión recibe 3 trabajos que llegan juntos: P1 de 24 páginas, P2 de 3 y P3 de 3. Con <b>FCFS</b> (orden de llegada) el tiempo de espera promedio es (0+24+27)/3 = <b>17</b>: los cortos "sufren" al larguísimo P1 (efecto convoy). Si en cambio usáramos <b>Round Robin</b> con un quantum pequeño, P2 y P3 recibirían turno enseguida y su tiempo de respuesta bajaría muchísimo, a costa de más cambios de contexto. ¿Y SJF (cortos primero)? Bajaría la espera a 3, pero en un SO real <b>no es implementable</b>: nadie conoce de antemano cuántas páginas traerá cada trabajo.
</div>
`);
