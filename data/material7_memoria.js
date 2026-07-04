/* MATERIAL DE ESTUDIO — TEMA 7: Memoria Principal */
BANCO.setMaterial("t7", `
<h2>Tema 7 · Memoria Principal</h2>
<p class="intro">La memoria es un <b>recurso escaso</b>. Para ejecutarse, <b>un proceso debe estar en la memoria real (RAM)</b>; el disco es respaldo. El <b>grado de multiprogramación</b> es cuántos procesos caben activos en RAM a la vez.</p>
<div class="callout"><b class="tag">Verificar RAM (cayó como teórica):</b> <code>free -h</code> muestra RAM y swap. Si la RAM libre es baja y el swap crece, hay presión de memoria. Alternativas: <code>cat /proc/meminfo</code>, <code>vmstat</code>.</div>

<h3>7.1 Jerarquía de memoria</h3>
<div class="diagrama">
<svg viewBox="0 0 640 260" role="img" aria-label="Piramide de la jerarquia de memoria">
  <polygon points="270,20 370,20 400,60 240,60" fill="#d5e8d4" stroke="#2c3e50"/><text x="320" y="46" text-anchor="middle" font-size="11">Registros · 0.3 ns · ~100 B</text>
  <polygon points="240,62 400,62 430,102 210,102" fill="#dae8fc" stroke="#2c3e50"/><text x="320" y="88" text-anchor="middle" font-size="11">Caché L1/L2/L3 · 1–30 ns · KB–MB</text>
  <polygon points="210,104 430,104 460,144 180,144" fill="#ffe6cc" stroke="#2c3e50"/><text x="320" y="130" text-anchor="middle" font-size="11">RAM (DRAM) · 100 ns · GB</text>
  <polygon points="180,146 460,146 490,186 150,186" fill="#fff2cc" stroke="#2c3e50"/><text x="320" y="172" text-anchor="middle" font-size="11">SSD · 0.1 ms · 100 GB</text>
  <polygon points="150,188 490,188 520,228 120,228" fill="#f8cecc" stroke="#2c3e50"/><text x="320" y="214" text-anchor="middle" font-size="11">HDD · 10 ms · TB</text>
  <text x="80" y="60" font-size="10">rápido,</text><text x="80" y="74" font-size="10">caro, pequeño</text>
  <text x="540" y="214" font-size="10">lento,</text><text x="540" y="228" font-size="10">barato, grande</text>
</svg>
<div class="cap-fig">Figura 7.1 — De RAM (100 ns) a HDD (10 ms) hay un salto de ~100 000×. Por eso existe la caché (localidad de referencia) y por eso el swapping ralentiza tanto.</div>
</div>

<div class="diagrama">
<div class="anim-tag">Animación</div>
<svg viewBox="0 0 620 300" role="img" aria-label="Animacion de swapping RAM y disco">
  <rect x="20" y="30" width="580" height="110" rx="6" fill="#f4faf6" stroke="#2c7a4b" stroke-dasharray="4,3"/><text x="32" y="48" font-size="12" font-weight="bold" fill="#1c5c38">RAM (memoria real)</text>
  <rect x="20" y="170" width="580" height="110" rx="6" fill="#fbf4e6" stroke="#b9770e" stroke-dasharray="4,3"/><text x="32" y="188" font-size="12" font-weight="bold" fill="#8a5a08">DISCO</text>
  <rect x="60" y="65" width="110" height="42" rx="5" fill="#dae8fc" stroke="#2c3e50"/><text x="115" y="91" text-anchor="middle" font-size="12" font-weight="bold">P1</text>
  <rect x="190" y="65" width="110" height="42" rx="5" fill="#d5e8d4" stroke="#2c3e50"/><text x="245" y="91" text-anchor="middle" font-size="12" font-weight="bold">P2</text>
  <rect x="340" y="65" width="110" height="42" rx="5" fill="#eee" stroke="#888" stroke-dasharray="4,3" opacity="0"><animate attributeName="opacity" dur="8s" repeatCount="indefinite" keyTimes="0;0.3;0.32;0.83;0.85;1" values="0;0;1;1;0;0"/></rect>
  <text x="395" y="91" text-anchor="middle" font-size="10" fill="#777" opacity="0">RAM libre<animate attributeName="opacity" dur="8s" repeatCount="indefinite" keyTimes="0;0.3;0.32;0.83;0.85;1" values="0;0;1;1;0;0"/></text>
  <g>
    <rect x="340" y="65" width="110" height="42" rx="5" fill="#ffe6cc" stroke="#b9770e"/>
    <text x="395" y="91" text-anchor="middle" font-size="12" font-weight="bold">P3</text>
    <animateTransform attributeName="transform" type="translate" dur="8s" repeatCount="indefinite" keyTimes="0;0.3;0.55;0.85;1" values="0 0; 0 150; 0 150; 0 0; 0 0"/>
  </g>
  <text x="500" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#b9770e" opacity="0">swap out (libera RAM)<animate attributeName="opacity" dur="8s" repeatCount="indefinite" keyTimes="0;0.02;0.3;0.32;1" values="0;1;1;0;0"/></text>
  <text x="500" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#2c7a4b" opacity="0">swap in (vuelve a RAM)<animate attributeName="opacity" dur="8s" repeatCount="indefinite" keyTimes="0;0.55;0.57;0.85;0.87;1" values="0;0;1;1;0;0"/></text>
</svg>
<div class="cap-fig">Figura 7.1b (animada) — Cuando falta RAM, el SO manda P3 al disco (swap out) y libera su espacio; al necesitarlo, lo trae de vuelta (swap in). Abusar de esto = <b>thrashing</b>.</div>
</div>

<div class="callout ejemplo"><h4>Ejemplo</h4>
Tienes 8 GB de RAM y abres muchos programas hasta ocupar 7.9 GB. Al abrir uno más, el SO hace <b>swap out</b> de un proceso inactivo al disco para hacer espacio (como en la animación). Si sigues abriendo y el SO tiene que mover procesos RAM↔disco constantemente, entra en <b>thrashing</b>: el CPU no está al 100% pero todo va lentísimo porque espera al disco. Se ve con <code>free -h</code> (swap creciendo) y se soluciona cerrando programas o poniendo más RAM.
</div>

<h3>7.2 Traducción de direcciones (MMU) y protección</h3>
<p>La <b>MMU</b> (hardware) traduce la dirección <b>virtual/lógica</b> que ve el programa a la <b>física/real</b> en RAM, y aísla la memoria entre procesos. Si el acceso es ilegal → <i>fault</i> al kernel.</p>
<div class="diagrama">
<svg viewBox="0 0 640 180" role="img" aria-label="Traduccion de direcciones por la MMU">
  <defs>
    <marker id="ah7m" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2c3e50"/></marker>
    <marker id="ah7r" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#c0392b"/></marker>
  </defs>
  <rect x="30" y="70" width="100" height="44" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="80" y="90" text-anchor="middle" font-size="12" font-weight="bold">CPU</text><text x="80" y="106" text-anchor="middle" font-size="9">dir. virtual</text>
  <rect x="250" y="60" width="120" height="64" rx="5" fill="#fff5e0" stroke="#b9770e" stroke-width="1.5"/><text x="310" y="86" text-anchor="middle" font-size="12" font-weight="bold">MMU</text><text x="310" y="104" text-anchor="middle" font-size="9">¿es legal?</text>
  <rect x="490" y="70" width="120" height="44" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="550" y="90" text-anchor="middle" font-size="12" font-weight="bold">RAM</text><text x="550" y="106" text-anchor="middle" font-size="9">dir. física</text>
  <line x1="130" y1="92" x2="246" y2="92" stroke="#2c3e50" stroke-width="1.6" marker-end="url(#ah7m)"/><text x="188" y="84" text-anchor="middle" font-size="9">0x30408</text>
  <line x1="370" y1="92" x2="486" y2="92" stroke="#2c3e50" stroke-width="1.6" marker-end="url(#ah7m)"/><text x="428" y="84" text-anchor="middle" font-size="9">0x92408 (sí)</text>
  <line x1="310" y1="124" x2="310" y2="165" stroke="#c0392b" stroke-width="1.6" stroke-dasharray="5,4" marker-end="url(#ah7r)"/><text x="410" y="150" text-anchor="middle" font-size="10" fill="#c0392b">acceso ilegal → fault (segmentation fault)</text>
</svg>
<div class="cap-fig">Figura 7.2 — Muchos microcontroladores IoT no tienen MMU, lo que dificulta aislar procesos (ver Foro 1).</div>
</div>

<div class="diagrama">
<div class="anim-tag">Animación</div>
<svg viewBox="0 0 560 160" role="img" aria-label="Animacion de traduccion de direccion en la MMU">
  <defs><marker id="ah7ma" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9aa7b4"/></marker></defs>
  <rect x="20" y="55" width="90" height="44" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="65" y="82" text-anchor="middle" font-size="12" font-weight="bold">CPU</text>
  <rect x="225" y="45" width="110" height="64" rx="5" fill="#fff5e0" stroke="#b9770e" stroke-width="1.5"/><text x="280" y="72" text-anchor="middle" font-size="12" font-weight="bold">MMU</text><text x="280" y="90" text-anchor="middle" font-size="9">traduce</text>
  <rect x="450" y="55" width="90" height="44" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="495" y="82" text-anchor="middle" font-size="12" font-weight="bold">RAM</text>
  <line x1="110" y1="77" x2="222" y2="77" stroke="#9aa7b4" stroke-width="1.3" marker-end="url(#ah7ma)"/>
  <line x1="335" y1="77" x2="447" y2="77" stroke="#9aa7b4" stroke-width="1.3" marker-end="url(#ah7ma)"/>
  <text x="166" y="112" text-anchor="middle" font-size="10" fill="#1565c0">dir. virtual 0x30408</text>
  <text x="392" y="112" text-anchor="middle" font-size="10" fill="#2c7a4b">dir. física 0x92408</text>
  <g>
    <circle r="9" fill="#1565c0"><animate attributeName="fill" dur="4s" repeatCount="indefinite" calcMode="discrete" keyTimes="0;0.5;1" values="#1565c0;#2c7a4b;#2c7a4b"/></circle>
    <animateMotion dur="4s" repeatCount="indefinite" path="M110,77 L280,77 L450,77"/>
  </g>
</svg>
<div class="cap-fig">Figura 7.2b (animada) — El CPU emite una dirección <b>virtual</b> (azul); la MMU la traduce a <b>física</b> (verde) y recién ahí se accede a la RAM. Si la dirección fuera ilegal, la MMU dispara un fault.</div>
</div>

<h3>7.3 Fragmentación</h3>
<p><b>Externa:</b> hay memoria libre en total pero <b>dispersa</b> en huecos no contiguos → no cabe un proceso grande (típica de asignación continua). <b>Interna:</b> se asigna más de lo necesario y el sobrante dentro del bloque se desperdicia.</p>
<div class="diagrama">
<svg viewBox="0 0 640 150" role="img" aria-label="Fragmentacion externa">
  <text x="20" y="22" font-size="12" font-weight="bold">Memoria (asignación continua) — fragmentación externa</text>
  <rect x="20" y="34" width="80" height="40" fill="#dae8fc" stroke="#333"/><text x="60" y="59" text-anchor="middle" font-size="10">Proc A</text>
  <rect x="100" y="34" width="50" height="40" fill="#eee" stroke="#333" stroke-dasharray="3,3"/><text x="125" y="59" text-anchor="middle" font-size="9">libre</text>
  <rect x="150" y="34" width="90" height="40" fill="#ffe6cc" stroke="#333"/><text x="195" y="59" text-anchor="middle" font-size="10">Proc B</text>
  <rect x="240" y="34" width="45" height="40" fill="#eee" stroke="#333" stroke-dasharray="3,3"/><text x="262" y="59" text-anchor="middle" font-size="9">libre</text>
  <rect x="285" y="34" width="100" height="40" fill="#d5e8d4" stroke="#333"/><text x="335" y="59" text-anchor="middle" font-size="10">Proc C</text>
  <rect x="385" y="34" width="55" height="40" fill="#eee" stroke="#333" stroke-dasharray="3,3"/><text x="412" y="59" text-anchor="middle" font-size="9">libre</text>
  <text x="20" y="104" font-size="11" fill="#c0392b">Hay 3 huecos libres, pero un proceso que necesita un bloque grande contiguo NO entra.</text>
  <text x="20" y="126" font-size="11">Solución: asignación no continua (paginación) o compactación.</text>
</svg>
<div class="cap-fig">Figura 7.3 — Analogía: sillas libres regadas por el salón; hay asientos en total, pero no juntos.</div>
</div>

<h3>7.4 Estrategias de administración (C-D-C)</h3>
<table>
<tr><th>Estrategia</th><th>Pregunta</th><th>Opciones</th></tr>
<tr><td>Obtención (fetch)</td><td>¿<b>Cuándo</b> traer?</td><td>Por demanda / anticipada</td></tr>
<tr><td>Colocación (placement)</td><td>¿<b>Dónde</b> ubicar?</td><td>Primer / mejor / peor ajuste</td></tr>
<tr><td>Reemplazo (replacement)</td><td>¿<b>Cuál</b> sacar?</td><td>LRU, FIFO, óptimo</td></tr>
</table>

<h3>7.5 Casos "what-if"</h3>
<table>
<tr><th>Escenario</th><th>Consecuencia</th></tr>
<tr><td>RAM llena, muchos procesos activos</td><td><b>Thrashing</b>: más tiempo en swapping que ejecutando; el sistema se arrastra.</td></tr>
<tr><td>RAM se agota sin swap</td><td>Actúa el <b>OOM Killer</b> de Linux (mata procesos; puede matar el equivocado).</td></tr>
<tr><td>Un proceso accede a memoria de otro</td><td>El SO lo detecta → <b>segmentation fault</b> → proceso terminado.</td></tr>
<tr><td>Caché sin localidad de referencia</td><td>Muchos miss; el overhead puede empeorar el rendimiento.</td></tr>
</table>
<div class="callout"><b class="tag">Trampa del disco:</b> alojar un proceso en disco hoy tiene "ventaja mínima" porque el disco es amplio. Pero SÍ es decisivo en sistemas con poca RAM (IoT, sobreventa). Declara el supuesto (PC moderno vs embebido): es un caso "depende".</div>
`);
