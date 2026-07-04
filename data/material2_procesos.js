/* MATERIAL DE ESTUDIO — TEMA 2: Administración de Procesos */
BANCO.setMaterial("t2", `
<h2>Tema 2 · Administración de Procesos</h2>
<p class="intro">Un <b>proceso</b> es un <b>programa en ejecución</b>. En administración de procesos el SO puede <b>crear/terminar</b> procesos, <b>suspender/reanudar</b>, y proveer <b>sincronización, comunicación</b> y manejo de <b>interbloqueos</b>.</p>

<h3>2.1 Programa vs Proceso vs Hilo</h3>
<table>
<tr><th></th><th>Programa</th><th>Proceso</th><th>Hilo (thread)</th></tr>
<tr><td>Naturaleza</td><td>Pasivo (instrucciones)</td><td>Activo (en ejecución)</td><td>Unidad de ejecución dentro del proceso</td></tr>
<tr><td>Dónde vive</td><td>Disco</td><td>RAM + usa el CPU</td><td>Dentro del proceso</td></tr>
<tr><td>Recursos</td><td>No consume CPU/RAM</td><td>Espacio de direcciones propio</td><td><b>Comparte</b> memoria con otros hilos del proceso</td></tr>
</table>
<div class="callout"><b class="tag">Relación correcta:</b> un <b>proceso puede incluir varios hilos</b> (nunca al revés). <b>Hilo</b> = la unidad más pequeña de procesamiento que ejecuta instrucciones dentro de un proceso.</div>

<div class="diagrama">
<svg viewBox="0 0 640 250" role="img" aria-label="Espacio de direcciones de un proceso y sus hilos">
  <rect x="40" y="30" width="230" height="190" rx="6" fill="#f4f6f9" stroke="#2c3e50" stroke-width="1.5"/>
  <text x="155" y="50" text-anchor="middle" font-size="13" font-weight="bold">PROCESO (espacio propio)</text>
  <rect x="70" y="65" width="170" height="30" fill="#eef2f7" stroke="#2c3e50"/><text x="155" y="85" text-anchor="middle" font-size="12">Code (texto)</text>
  <rect x="70" y="98" width="170" height="30" fill="#eef2f7" stroke="#2c3e50"/><text x="155" y="118" text-anchor="middle" font-size="12">Data (globales)</text>
  <rect x="70" y="131" width="170" height="30" fill="#eef2f7" stroke="#2c3e50"/><text x="155" y="151" text-anchor="middle" font-size="12">Heap (dinámica)</text>
  <rect x="70" y="164" width="170" height="30" fill="#eef2f7" stroke="#2c3e50"/><text x="155" y="184" text-anchor="middle" font-size="12">Stack (pila)</text>
  <rect x="330" y="55" width="270" height="150" rx="6" fill="#eef8f1" stroke="#2c7a4b" stroke-width="1.4"/>
  <text x="465" y="75" text-anchor="middle" font-size="12" font-weight="bold" fill="#1c5c38">Hilos del proceso (comparten Code/Data/Heap)</text>
  <rect x="350" y="90" width="70" height="95" rx="4" fill="#fff" stroke="#2c7a4b"/><text x="385" y="140" text-anchor="middle" font-size="11">Hilo 1</text><text x="385" y="156" text-anchor="middle" font-size="9">PC+stack</text>
  <rect x="430" y="90" width="70" height="95" rx="4" fill="#fff" stroke="#2c7a4b"/><text x="465" y="140" text-anchor="middle" font-size="11">Hilo 2</text><text x="465" y="156" text-anchor="middle" font-size="9">PC+stack</text>
  <rect x="510" y="90" width="70" height="95" rx="4" fill="#fff" stroke="#2c7a4b"/><text x="545" y="140" text-anchor="middle" font-size="11">Hilo 3</text><text x="545" y="156" text-anchor="middle" font-size="9">PC+stack</text>
</svg>
<div class="cap-fig">Figura 2.1 — Cada proceso tiene su espacio aislado; los hilos comparten Code/Data/Heap pero cada uno tiene su propio PC y stack. Por eso terminar un hilo es más barato que terminar un proceso.</div>
</div>

<p>Un proceso necesita: <b>CPU</b>, <b>memoria</b> (Code, Data, Heap, Stack), <b>registros</b> (contador de programa PC, puntero de pila, generales) e <b>información de E/S</b> (archivos abiertos).</p>

<h3>2.2 Secuencial vs Concurrente vs Paralelo</h3>
<div class="diagrama">
<svg viewBox="0 0 640 260" role="img" aria-label="Secuencial, concurrente y paralelo en el tiempo">
  <text x="20" y="24" font-size="12" font-weight="bold">Secuencial (1 CPU): una termina y recién empieza otra</text>
  <rect x="20" y="32" width="120" height="22" fill="#cdd0f0" stroke="#333"/><text x="80" y="48" text-anchor="middle" font-size="11">A</text>
  <rect x="140" y="32" width="120" height="22" fill="#c9e6cf" stroke="#333"/><text x="200" y="48" text-anchor="middle" font-size="11">B</text>
  <rect x="260" y="32" width="120" height="22" fill="#f0d9c9" stroke="#333"/><text x="320" y="48" text-anchor="middle" font-size="11">C</text>

  <text x="20" y="104" font-size="12" font-weight="bold">Concurrente (1 CPU): se intercalan (parece a la vez, pero no lo están)</text>
  <rect x="20" y="112" width="45" height="22" fill="#cdd0f0" stroke="#333"/><rect x="65" y="112" width="45" height="22" fill="#c9e6cf" stroke="#333"/><rect x="110" y="112" width="45" height="22" fill="#f0d9c9" stroke="#333"/>
  <rect x="155" y="112" width="45" height="22" fill="#cdd0f0" stroke="#333"/><rect x="200" y="112" width="45" height="22" fill="#c9e6cf" stroke="#333"/><rect x="245" y="112" width="45" height="22" fill="#f0d9c9" stroke="#333"/>
  <text x="410" y="128" font-size="11">A, B, C por turnos</text>

  <text x="20" y="184" font-size="12" font-weight="bold">Paralelo (varios cores): exactamente al mismo tiempo</text>
  <rect x="20" y="192" width="180" height="20" fill="#cdd0f0" stroke="#333"/><text x="110" y="207" text-anchor="middle" font-size="11">A (core 1)</text>
  <rect x="20" y="214" width="180" height="20" fill="#c9e6cf" stroke="#333"/><text x="110" y="229" text-anchor="middle" font-size="11">B (core 2)</text>
  <rect x="20" y="236" width="180" height="20" fill="#f0d9c9" stroke="#333"/><text x="110" y="251" text-anchor="middle" font-size="11">C (core 3)</text>
</svg>
<div class="cap-fig">Figura 2.2 — Concurrente = se superponen en el tiempo (aunque no simultáneos). Paralelo = simultáneos en varios cores. Todo paralelo es concurrente, pero no al revés.</div>
</div>

<h3>2.3 Multiplexación (cómo el SO reparte el HW)</h3>
<table>
<tr><th></th><th>En el ESPACIO (a la vez)</th><th>En el TIEMPO (por turnos)</th></tr>
<tr><td>CPU</td><td>Varios núcleos (cores)</td><td>Conmutación de contexto (10 ms a A, luego a B…)</td></tr>
<tr><td>RAM</td><td>Dividir la RAM en secciones</td><td>Swapping / memoria virtual (un proceso va a disco)</td></tr>
</table>

<div class="diagrama">
<div class="anim-tag">Animación</div>
<svg viewBox="0 0 560 185" role="img" aria-label="Animacion de cambio de contexto entre dos procesos">
  <defs><marker id="ah2c" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9aa7b4"/></marker></defs>
  <rect x="30" y="50" width="120" height="60" rx="6" fill="#dae8fc" stroke="#2c3e50"/><text x="90" y="85" text-anchor="middle" font-size="14" font-weight="bold">P1</text>
  <rect x="220" y="45" width="120" height="70" rx="6" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.6"/><text x="280" y="85" text-anchor="middle" font-size="14" font-weight="bold">CPU</text>
  <rect x="410" y="50" width="120" height="60" rx="6" fill="#d5e8d4" stroke="#2c3e50"/><text x="470" y="85" text-anchor="middle" font-size="14" font-weight="bold">P2</text>
  <line x1="150" y1="80" x2="217" y2="80" stroke="#9aa7b4" stroke-width="1.3" marker-end="url(#ah2c)"/>
  <line x1="343" y1="80" x2="407" y2="80" stroke="#9aa7b4" stroke-width="1.3" marker-end="url(#ah2c)"/>
  <rect x="30" y="50" width="120" height="60" rx="6" fill="none" stroke="#f39c12" stroke-width="4" opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.02;0.4;0.42;1" values="1;1;1;0;0"/></rect>
  <rect x="410" y="50" width="120" height="60" rx="6" fill="none" stroke="#f39c12" stroke-width="4" opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.5;0.52;0.9;0.92;1" values="0;0;1;1;0;0"/></rect>
  <text x="280" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#2c3e50" opacity="0">Ejecutando P1<animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.02;0.4;0.42;1" values="1;1;1;0;0"/></text>
  <text x="280" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#2c3e50" opacity="0">Ejecutando P2<animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.5;0.52;0.9;0.92;1" values="0;0;1;1;0;0"/></text>
  <text x="280" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#c0392b" opacity="0">Cambio de contexto: guarda PCB de P1, carga PCB de P2<animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.4;0.42;0.5;0.52;1" values="0;0;1;1;0;0"/></text>
  <text x="280" y="168" text-anchor="middle" font-size="12" font-weight="bold" fill="#c0392b" opacity="0">Cambio de contexto: guarda PCB de P2, carga PCB de P1<animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.9;0.92;0.99;1" values="0;0;1;1;0"/></text>
</svg>
<div class="cap-fig">Figura 2.3 (animada) — El CPU se turna entre P1 y P2 (multiplexación en el tiempo). En cada cambio, el SO <b>guarda</b> el estado del que sale en su PCB y <b>carga</b> el del que entra. Ese guardado/cargado es el <b>cambio de contexto</b> (tiene un costo).</div>
</div>

<h3>2.4 PCB (Process Control Block)</h3>
<p>Ficha que el SO mantiene por cada proceso (en Linux: <code>task_struct</code>; en Xv6: <code>struct proc</code>). Guarda: PID, estado, prioridad, <b>contador de programa (PC)</b> y registros, punteros de memoria, archivos abiertos, info de E/S. Todos los PCB forman la <b>tabla de procesos</b>.</p>
<pre>enum procstate { UNUSED, EMBRYO, SLEEPING, RUNNABLE, RUNNING, ZOMBIE };
struct proc {
  uint sz;              // tamaño de memoria
  enum procstate state; // estado
  int pid;             // ID
  struct proc *parent; // padre
  struct context *context; // registros para el cambio de contexto
  struct file *ofile[NOFILE]; // archivos abiertos
};</pre>
<div class="callout"><b class="tag">Cambio de contexto:</b> al quitar el CPU a un proceso, el SO <b>guarda</b> sus registros/PC en su PCB; al reanudarlo, los <b>restaura</b>. Sin PCB no se puede reanudar.</div>

<h3>2.5 Casos "what-if"</h3>
<table>
<tr><th>Escenario</th><th>Consecuencia</th></tr>
<tr><td>Se corrompe el PCB</td><td>El SO pierde el estado del proceso → no puede reanudarlo/terminarlo bien (posible kernel panic).</td></tr>
<tr><td>Falla el cambio de contexto</td><td>Un proceso usa registros de otro → corrupción o crash.</td></tr>
<tr><td>Se alcanza el máximo de procesos</td><td><code>fork()</code> falla; no se crean nuevos.</td></tr>
</table>

<div class="callout ejemplo"><h4>Ejemplo</h4>
En Chrome, <b>cada pestaña</b> suele ser un <b>proceso</b> distinto (espacios de memoria aislados): si una pestaña se cuelga, solo esa muere y las demás siguen (rol de referí). Dentro de una misma pestaña hay varios <b>hilos</b> (renderizado, red, autocompletado) que <b>comparten</b> la memoria de ese proceso para cooperar rápido. Por eso cerrar un hilo es más barato que cerrar el proceso: el hilo no libera todo el espacio de direcciones, solo su stack.
</div>
`);
