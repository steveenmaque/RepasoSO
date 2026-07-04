/* MATERIAL DE ESTUDIO — TEMA 3: Diagrama de Estados (5 y 7 / UNIX) */
BANCO.setMaterial("t3", `
<h2>Tema 3 · Diagrama de Estados de un Proceso</h2>
<p class="intro">Todo proceso recorre un <b>ciclo de vida</b>. Para volver a ejecutarse, siempre debe pasar por <b>Listo</b>. Entender las <b>transiciones válidas</b> (y las excepciones) es lo más preguntado del tema.</p>

<h3>3.1 Diagrama de 5 estados</h3>
<div class="diagrama">
<svg viewBox="0 0 680 380" role="img" aria-label="Diagrama de 5 estados con transiciones y excepciones">
  <defs>
    <marker id="ah3" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2c3e50"/></marker>
    <marker id="ah3r" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#c0392b"/></marker>
  </defs>
  <!-- boxes -->
  <rect x="20" y="110" width="95" height="44" rx="6" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.5"/><text x="67" y="137" text-anchor="middle" font-size="13" font-weight="bold">Nuevo</text>
  <rect x="200" y="110" width="95" height="44" rx="6" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.5"/><text x="247" y="137" text-anchor="middle" font-size="13" font-weight="bold">Listo</text>
  <rect x="390" y="110" width="110" height="44" rx="6" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.5"/><text x="445" y="137" text-anchor="middle" font-size="13" font-weight="bold">Ejecución</text>
  <rect x="575" y="110" width="95" height="44" rx="6" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.5"/><text x="622" y="137" text-anchor="middle" font-size="13" font-weight="bold">Terminado</text>
  <rect x="390" y="270" width="110" height="44" rx="6" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.5"/><text x="445" y="292" text-anchor="middle" font-size="12" font-weight="bold">Espera</text><text x="445" y="306" text-anchor="middle" font-size="10">(Bloqueado)</text>
  <!-- transiciones normales -->
  <line x1="115" y1="132" x2="196" y2="132" stroke="#2c3e50" stroke-width="1.6" marker-end="url(#ah3)"/><text x="155" y="124" text-anchor="middle" font-size="10">Admisión</text>
  <line x1="298" y1="122" x2="386" y2="122" stroke="#2c3e50" stroke-width="1.6" marker-end="url(#ah3)"/><text x="342" y="114" text-anchor="middle" font-size="10">Dispatch</text>
  <line x1="386" y1="144" x2="298" y2="144" stroke="#2c3e50" stroke-width="1.6" marker-end="url(#ah3)"/><text x="342" y="158" text-anchor="middle" font-size="10">fin de quantum</text>
  <line x1="445" y1="154" x2="445" y2="266" stroke="#2c3e50" stroke-width="1.6" marker-end="url(#ah3)"/><text x="452" y="215" font-size="10">pide E/S</text>
  <path d="M388,285 C300,270 250,210 247,156" fill="none" stroke="#2c3e50" stroke-width="1.6" marker-end="url(#ah3)"/><text x="300" y="235" text-anchor="middle" font-size="10">fin de E/S</text>
  <line x1="500" y1="132" x2="571" y2="132" stroke="#2c3e50" stroke-width="1.6" marker-end="url(#ah3)"/><text x="535" y="124" text-anchor="middle" font-size="10">exit</text>
  <!-- EXCEPCION 1: bucle infinito (self-loop rojo sobre Ejecución) -->
  <path d="M415,110 C405,68 485,68 476,110" fill="none" stroke="#c0392b" stroke-width="1.6" stroke-dasharray="5,4" marker-end="url(#ah3r)"/>
  <text x="445" y="60" text-anchor="middle" font-size="10" fill="#c0392b">bucle infinito: no cede el CPU</text>
  <text x="445" y="72" text-anchor="middle" font-size="9" fill="#c0392b">(el SO lo expulsa por fin de quantum)</text>
  <!-- EXCEPCION 2: finalizar proceso bloqueado (rojo, arco inferior hacia Listo) -->
  <path d="M420,314 C300,378 120,300 202,150" fill="none" stroke="#c0392b" stroke-width="1.6" stroke-dasharray="5,4" marker-end="url(#ah3r)"/>
  <text x="270" y="360" text-anchor="middle" font-size="10" fill="#c0392b">finalizar proceso bloqueado: vuelve a Listos y CAMBIA el PC</text>
  <text x="270" y="372" text-anchor="middle" font-size="9" fill="#c0392b">(no salta directo a Terminado)</text>
</svg>
<div class="cap-fig">Figura 3.1 — Transiciones normales (negras) y dos casos particulares en rojo: el bucle infinito (el proceso no cede el CPU y el SO lo expulsa) y la finalización de un proceso bloqueado.</div>
<p class="leyenda"><span><span class="linea-normal"></span> transición normal</span><span><span class="linea-excep"></span> caso particular / excepción</span></p>
</div>

<div class="diagrama">
<div class="anim-tag">Animación</div>
<svg viewBox="0 0 660 330" role="img" aria-label="Animacion del ciclo de vida de un proceso">
  <defs><marker id="ah3a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9aa7b4"/></marker></defs>
  <rect x="30" y="120" width="95" height="44" rx="6" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.4"/><text x="77" y="147" text-anchor="middle" font-size="12" font-weight="bold">Nuevo</text>
  <rect x="195" y="120" width="95" height="44" rx="6" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.4"/><text x="242" y="147" text-anchor="middle" font-size="12" font-weight="bold">Listo</text>
  <rect x="360" y="120" width="110" height="44" rx="6" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.4"/><text x="415" y="147" text-anchor="middle" font-size="12" font-weight="bold">Ejecución</text>
  <rect x="540" y="120" width="100" height="44" rx="6" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.4"/><text x="590" y="147" text-anchor="middle" font-size="12" font-weight="bold">Terminado</text>
  <rect x="360" y="240" width="110" height="44" rx="6" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.4"/><text x="415" y="266" text-anchor="middle" font-size="11" font-weight="bold">Espera</text>
  <line x1="125" y1="142" x2="192" y2="142" stroke="#9aa7b4" stroke-width="1.3" marker-end="url(#ah3a)"/>
  <line x1="290" y1="136" x2="357" y2="136" stroke="#9aa7b4" stroke-width="1.3" marker-end="url(#ah3a)"/>
  <line x1="415" y1="164" x2="415" y2="237" stroke="#9aa7b4" stroke-width="1.3" marker-end="url(#ah3a)"/>
  <path d="M360,255 C280,240 245,200 243,166" fill="none" stroke="#9aa7b4" stroke-width="1.3" marker-end="url(#ah3a)"/>
  <line x1="470" y1="142" x2="537" y2="142" stroke="#9aa7b4" stroke-width="1.3" marker-end="url(#ah3a)"/>
  <g>
    <circle r="11" fill="#c0392b"/><text y="4" text-anchor="middle" font-size="11" fill="#fff" font-weight="bold">P</text>
    <animateMotion dur="13s" repeatCount="indefinite" rotate="0" path="M77,142 L242,142 L415,142 L415,262 L242,142 L415,142 L590,142"/>
  </g>
  <rect x="230" y="294" width="200" height="26" rx="5" fill="#fff" stroke="#2c3e50"/>
  <text x="330" y="311" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2d3d" opacity="0">Nuevo (admisión)<animate attributeName="opacity" dur="13s" repeatCount="indefinite" keyTimes="0;0.14;0.16;1" values="1;1;0;0"/></text>
  <text x="330" y="311" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2d3d" opacity="0">Listo (espera CPU)<animate attributeName="opacity" dur="13s" repeatCount="indefinite" keyTimes="0;0.16;0.18;0.31;0.33;1" values="0;0;1;1;0;0"/></text>
  <text x="330" y="311" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2d3d" opacity="0">Ejecución (usa CPU)<animate attributeName="opacity" dur="13s" repeatCount="indefinite" keyTimes="0;0.33;0.35;0.44;0.45;1" values="0;0;1;1;0;0"/></text>
  <text x="330" y="311" text-anchor="middle" font-size="12" font-weight="bold" fill="#c0392b" opacity="0">Espera: pide E/S (bloqueado)<animate attributeName="opacity" dur="13s" repeatCount="indefinite" keyTimes="0;0.45;0.47;0.64;0.66;1" values="0;0;1;1;0;0"/></text>
  <text x="330" y="311" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2d3d" opacity="0">Fin de E/S: vuelve a Listo<animate attributeName="opacity" dur="13s" repeatCount="indefinite" keyTimes="0;0.65;0.67;0.81;0.83;1" values="0;0;1;1;0;0"/></text>
  <text x="330" y="311" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2d3d" opacity="0">Ejecución (otra ráfaga)<animate attributeName="opacity" dur="13s" repeatCount="indefinite" keyTimes="0;0.82;0.84;0.94;0.95;1" values="0;0;1;1;0;0"/></text>
  <text x="330" y="311" text-anchor="middle" font-size="12" font-weight="bold" fill="#2c7a4b" opacity="0">Terminado (exit)<animate attributeName="opacity" dur="13s" repeatCount="indefinite" keyTimes="0;0.95;0.97;1" values="0;0;1;1"/></text>
</svg>
<div class="cap-fig">Figura 3.1b (animada) — El punto rojo <b>P</b> es el proceso recorriendo su ciclo de vida. Observa que tras la E/S vuelve a <b>Listo</b> (nunca directo a Ejecución) y que solo desde Ejecución llega a Terminado.</div>
</div>

<div class="callout ejemplo"><h4>Ejemplo</h4>
Abres un editor de texto y le pides <b>guardar</b> un archivo. Traza sus estados: el proceso está en <b>Ejecución</b> → al escribir en disco pide E/S y pasa a <b>Espera</b> (el disco es lento) → cuando el disco confirma, el evento lo lleva a <b>Listo</b> → el despachador le da el CPU (<b>Ejecución</b>) y muestra "Guardado". Si mientras esperaba el disco tú lo "finalizas", <b>no</b> salta a Terminado: vuelve a <b>Listos</b> con el <b>PC apuntando a su rutina de salida</b>, y al recibir el CPU cierra archivos y termina ordenadamente.
</div>

<div class="callout trampa"><b class="tag">TRAMPA del profesor:</b> al <b>finalizar un proceso bloqueado</b>, muchos dicen "pasa directo a Terminado" — <b>FALSO</b>. El SO lo devuelve a la cola de <b>Listos</b> y <b>cambia el Contador de Programa (PC)</b> para que apunte a la <b>última instrucción</b> (rutina de salida). Así, al recibir el CPU, ejecuta su terminación ordenada en vez de continuar. <b>La clave es el cambio del apuntador (PC).</b></div>

<table>
<tr><th>Transición</th><th>Disparador</th></tr>
<tr><td>Nuevo → Listo</td><td>Admisión</td></tr>
<tr><td>Listo → Ejecución</td><td>Despachador (dispatch)</td></tr>
<tr><td>Ejecución → Listo</td><td>Interrupción (fin de quantum)</td></tr>
<tr><td>Ejecución → Espera</td><td>El proceso pide E/S o espera un evento</td></tr>
<tr><td>Espera → Listo</td><td>Fin de E/S (nunca directo a Ejecución)</td></tr>
<tr><td>Ejecución → Terminado</td><td>exit()</td></tr>
</table>

<h3>3.2 Diagrama de 7 estados (UNIX): estados suspendidos</h3>
<p>Agrega dos estados <b>suspendidos</b> = procesos que el SO sacó de la RAM al <b>disco</b> (<b>swapping</b>). Toda flecha <b>hacia</b> un estado suspendido <b>libera RAM</b> (swap out); toda flecha que <b>sale</b> de él la vuelve a ocupar (swap in).</p>
<div class="diagrama">
<svg viewBox="0 0 680 380" role="img" aria-label="Diagrama de 7 estados UNIX con zonas RAM y disco">
  <defs>
    <marker id="ah7" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2c3e50"/></marker>
    <marker id="ah7b" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#b9770e"/></marker>
  </defs>
  <rect x="8" y="20" width="664" height="185" rx="6" fill="#f4faf6" stroke="#2c7a4b" stroke-dasharray="4,3"/><text x="20" y="38" font-size="12" font-weight="bold" fill="#1c5c38">RAM (memoria real)</text>
  <rect x="8" y="225" width="664" height="140" rx="6" fill="#fbf4e6" stroke="#b9770e" stroke-dasharray="4,3"/><text x="20" y="243" font-size="12" font-weight="bold" fill="#8a5a08">DISCO (procesos suspendidos)</text>
  <!-- RAM boxes -->
  <rect x="30" y="95" width="90" height="42" rx="6" fill="#eef2f7" stroke="#2c3e50"/><text x="75" y="121" text-anchor="middle" font-size="12" font-weight="bold">Nuevo</text>
  <rect x="180" y="95" width="90" height="42" rx="6" fill="#eef2f7" stroke="#2c3e50"/><text x="225" y="121" text-anchor="middle" font-size="12" font-weight="bold">Listo</text>
  <rect x="345" y="95" width="105" height="42" rx="6" fill="#eef2f7" stroke="#2c3e50"/><text x="397" y="121" text-anchor="middle" font-size="12" font-weight="bold">Ejecución</text>
  <rect x="525" y="95" width="120" height="42" rx="6" fill="#eef2f7" stroke="#2c3e50"/><text x="585" y="121" text-anchor="middle" font-size="12" font-weight="bold">Bloqueado</text>
  <rect x="345" y="40" width="105" height="34" rx="6" fill="#eef2f7" stroke="#2c3e50"/><text x="397" y="61" text-anchor="middle" font-size="11" font-weight="bold">Terminado</text>
  <!-- DISCO boxes -->
  <rect x="180" y="280" width="120" height="42" rx="6" fill="#fff5e0" stroke="#b9770e"/><text x="240" y="300" text-anchor="middle" font-size="11" font-weight="bold">Listo-</text><text x="240" y="314" text-anchor="middle" font-size="11" font-weight="bold">suspendido</text>
  <rect x="510" y="280" width="135" height="42" rx="6" fill="#fff5e0" stroke="#b9770e"/><text x="577" y="300" text-anchor="middle" font-size="11" font-weight="bold">Bloqueado-</text><text x="577" y="314" text-anchor="middle" font-size="11" font-weight="bold">suspendido</text>
  <!-- transiciones RAM -->
  <line x1="120" y1="116" x2="176" y2="116" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ah7)"/><text x="148" y="109" text-anchor="middle" font-size="9">admisión</text>
  <line x1="270" y1="108" x2="343" y2="108" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ah7)"/><text x="306" y="101" text-anchor="middle" font-size="9">dispatch</text>
  <line x1="343" y1="126" x2="272" y2="126" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ah7)"/><text x="306" y="138" text-anchor="middle" font-size="9">quantum</text>
  <line x1="450" y1="112" x2="523" y2="112" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ah7)"/><text x="487" y="105" text-anchor="middle" font-size="9">E/S</text>
  <path d="M525,128 C420,165 300,150 272,132" fill="none" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ah7)"/><text x="410" y="160" text-anchor="middle" font-size="9">fin de E/S</text>
  <line x1="397" y1="95" x2="397" y2="76" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ah7)"/><text x="418" y="88" font-size="9">exit</text>
  <!-- swap (naranja) -->
  <line x1="235" y1="137" x2="235" y2="278" stroke="#b9770e" stroke-width="1.6" marker-end="url(#ah7b)"/><text x="242" y="200" font-size="9" fill="#8a5a08">swap out (libera RAM)</text>
  <line x1="215" y1="278" x2="215" y2="137" stroke="#b9770e" stroke-width="1.6" marker-end="url(#ah7b)"/><text x="150" y="210" font-size="9" fill="#8a5a08">swap in</text>
  <line x1="590" y1="137" x2="590" y2="278" stroke="#b9770e" stroke-width="1.6" marker-end="url(#ah7b)"/><text x="597" y="200" font-size="9" fill="#8a5a08">swap out</text>
  <line x1="565" y1="278" x2="565" y2="137" stroke="#b9770e" stroke-width="1.6" marker-end="url(#ah7b)"/><text x="500" y="210" font-size="9" fill="#8a5a08">swap in</text>
  <line x1="510" y1="301" x2="302" y2="301" stroke="#b9770e" stroke-width="1.6" marker-end="url(#ah7b)"/><text x="405" y="294" text-anchor="middle" font-size="9" fill="#8a5a08">fin de E/S (sigue en disco)</text>
</svg>
<div class="cap-fig">Figura 3.2 — En naranja, el swapping RAM↔disco. La transición Bloqueado → Bloqueado-suspendido (swap out) es la que pregunta el examen: libera RAM mientras el proceso espera su evento.</div>
</div>

<div class="callout"><b class="tag">Transiciones ILEGALES típicas:</b> <b>Nuevo → Terminado</b> (aún no se admitió) y <b>Listo-suspendido → Bloqueado-suspendido</b> (un proceso "listo" no espera ningún evento, no puede bloquearse).</div>

<h3>3.3 Estado ZOMBIE</h3>
<p>Proceso que <b>ya terminó su ejecución</b> pero cuya <b>entrada sigue en la tabla de procesos</b> (esperando que el padre lea su código de salida con <code>wait()</code>). <b>No consume CPU.</b></p>
<div class="callout whatif"><b class="tag">Desventajas (analogía biblioteca):</b> (1) <b>Consumen recursos</b>: si la tabla de procesos se llena de zombies, no se pueden crear nuevos procesos (aforo lleno). (2) <b>Dificultan la gestión</b>: hay que identificar quién ya terminó para liberarlo.</div>

<h3>3.4 Casos "what-if"</h3>
<table>
<tr><th>Escenario</th><th>Consecuencia</th></tr>
<tr><td>La E/S nunca termina (dispositivo colgado)</td><td>El proceso queda permanentemente en Espera → timeouts, señales o matarlo.</td></tr>
<tr><td>Falla el despachador</td><td>Nadie pasa de Listo → Ejecución: el sistema se congela.</td></tr>
<tr><td>Abuso de suspensión (swapping)</td><td>Thrashing: más tiempo moviendo páginas que ejecutando.</td></tr>
</table>
`);
