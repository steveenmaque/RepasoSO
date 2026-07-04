/* MATERIAL DE ESTUDIO — TEMA 4: Sincronización de Procesos */
BANCO.setMaterial("t4", `
<h2>Tema 4 · Sincronización de Procesos</h2>
<p class="intro">Los procesos se ejecutan de forma <b>asíncrona</b> (independientes), pero cuando acceden a <b>datos compartidos</b> deben <b>sincronizarse</b>. El objetivo: <b>evitar condiciones de carrera (race conditions)</b> y garantizar el acceso ordenado a los recursos compartidos.</p>

<h3>4.1 El problema: condición de carrera</h3>
<p>Ejemplo bancario: un <b>Depósito(+500)</b> y un <b>Retiro(−200)</b> sobre el mismo saldo (inicial 1000). Si se intercalan mal, se pierde una operación.</p>
<div class="diagrama">
<svg viewBox="0 0 660 240" role="img" aria-label="Linea de tiempo de una condicion de carrera">
  <defs><marker id="ah4" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2c3e50"/></marker></defs>
  <line x1="40" y1="40" x2="40" y2="210" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ah4)"/><text x="26" y="130" font-size="10" transform="rotate(-90 26,130)">tiempo</text>
  <text x="150" y="30" text-anchor="middle" font-size="12" font-weight="bold">Depósito (+500)</text>
  <text x="440" y="30" text-anchor="middle" font-size="12" font-weight="bold">Retiro (−200)</text>
  <rect x="80" y="45" width="150" height="22" fill="#cdd0f0" stroke="#333"/><text x="155" y="61" text-anchor="middle" font-size="10">t1: lee saldo = 1000</text>
  <rect x="360" y="70" width="160" height="22" fill="#f0d9c9" stroke="#333"/><text x="440" y="86" text-anchor="middle" font-size="10">t2: lee saldo = 1000</text>
  <rect x="80" y="95" width="150" height="22" fill="#cdd0f0" stroke="#333"/><text x="155" y="111" text-anchor="middle" font-size="10">t3: 1000+500 = 1500</text>
  <rect x="360" y="120" width="160" height="22" fill="#f0d9c9" stroke="#333"/><text x="440" y="136" text-anchor="middle" font-size="10">t4: 1000−200 = 800</text>
  <rect x="360" y="150" width="160" height="22" fill="#f0d9c9" stroke="#333"/><text x="440" y="166" text-anchor="middle" font-size="10">t5: escribe saldo = 800</text>
  <rect x="80" y="180" width="150" height="22" fill="#cdd0f0" stroke="#333"/><text x="155" y="196" text-anchor="middle" font-size="10">t6: escribe saldo = 1500</text>
  <text x="545" y="196" font-size="11" fill="#c0392b" font-weight="bold">¡el retiro se perdió!</text>
</svg>
<div class="cap-fig">Figura 4.1 — Saldo correcto = 1000+500−200 = 1300, pero queda 1500. El problema es de <b>atomicidad</b>, no de velocidad: por más rápido que se ejecute, existe un intercalado malo.</div>
</div>

<h3>4.2 Sección crítica y exclusión mutua</h3>
<p><b>Sección crítica</b> = porción de código que accede a un recurso compartido. Debe protegerse para que <b>solo un proceso a la vez</b> esté dentro (exclusión mutua).</p>
<div class="diagrama">
<svg viewBox="0 0 640 170" role="img" aria-label="Exclusion mutua en el tiempo">
  <line x1="30" y1="140" x2="620" y2="140" stroke="#2c3e50" stroke-width="1.4"/><text x="600" y="158" font-size="10">tiempo</text>
  <text x="30" y="40" font-size="11" font-weight="bold">Proceso A</text>
  <rect x="90" y="28" width="180" height="24" fill="#c9e6cf" stroke="#2c7a4b"/><text x="180" y="45" text-anchor="middle" font-size="10">A dentro de la sección crítica</text>
  <text x="30" y="90" font-size="11" font-weight="bold">Proceso B</text>
  <rect x="90" y="78" width="180" height="24" fill="#f7d6d6" stroke="#c0392b"/><text x="180" y="95" text-anchor="middle" font-size="10">B intenta entrar: BLOQUEADO</text>
  <rect x="290" y="78" width="180" height="24" fill="#c9e6cf" stroke="#2c7a4b"/><text x="380" y="95" text-anchor="middle" font-size="10">B entra (A ya salió)</text>
  <line x1="270" y1="20" x2="270" y2="130" stroke="#888" stroke-dasharray="3,3"/><text x="270" y="16" text-anchor="middle" font-size="9">A libera</text>
</svg>
<div class="cap-fig">Figura 4.2 — Nunca hay dos procesos dentro de la sección crítica a la vez. B espera hasta que A libera.</div>
</div>

<div class="diagrama">
<div class="anim-tag">Animación</div>
<svg viewBox="0 0 600 175" role="img" aria-label="Animacion de exclusion mutua en el tiempo">
  <text x="35" y="28" font-size="11" font-weight="bold">Proceso A</text>
  <text x="35" y="78" font-size="11" font-weight="bold">Proceso B</text>
  <line x1="120" y1="18" x2="120" y2="150" stroke="#2c3e50" stroke-width="1.2"/>
  <line x1="120" y1="150" x2="575" y2="150" stroke="#2c3e50" stroke-width="1.2"/>
  <text x="575" y="167" font-size="10" text-anchor="end">tiempo</text>
  <rect x="130" y="14" width="200" height="26" rx="3" fill="#c9e6cf" stroke="#2c7a4b" opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.02;0.48;0.5;1" values="0;1;1;0;0"/></rect>
  <text x="230" y="31" text-anchor="middle" font-size="10" opacity="0">A en su sección crítica<animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.02;0.48;0.5;1" values="0;1;1;0;0"/></text>
  <rect x="130" y="64" width="200" height="26" rx="3" fill="#f7d6d6" stroke="#c0392b" opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.02;0.48;0.5;1" values="0;1;1;0;0"/></rect>
  <text x="230" y="81" text-anchor="middle" font-size="10" fill="#8a2620" opacity="0">B intenta entrar: BLOQUEADO<animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.02;0.48;0.5;1" values="0;1;1;0;0"/></text>
  <rect x="335" y="64" width="200" height="26" rx="3" fill="#c9e6cf" stroke="#2c7a4b" opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.5;0.52;0.98;1" values="0;0;1;1;0"/></rect>
  <text x="435" y="81" text-anchor="middle" font-size="10" opacity="0">B entra (A ya hizo V)<animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.5;0.52;0.98;1" values="0;0;1;1;0"/></text>
  <line x1="330" y1="8" x2="330" y2="145" stroke="#888" stroke-dasharray="3,3"/><text x="330" y="6" text-anchor="middle" font-size="9">A libera (V)</text>
  <line x1="120" y1="10" x2="120" y2="145" stroke="#c0392b" stroke-width="1.6"><animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" values="0 0; 455 0" keyTimes="0;1"/></line>
</svg>
<div class="cap-fig">Figura 4.2b (animada) — La línea roja es el tiempo. Mientras A está dentro, B se queda bloqueado; recién cuando A hace <code>V(mutex)</code>, B entra. Nunca coinciden.</div>
</div>

<p><b>Las 4 condiciones de una solución correcta:</b> (1) <b>exclusión mutua</b>; (2) <b>no bloqueo externo</b> (un proceso fuera de su SC no bloquea a otros); (3) <b>espera acotada</b> (nadie espera un tiempo arbitrariamente grande); (4) <b>sin suposición de velocidad</b> de los procesos.</p>

<h3>4.3 Semáforos (operaciones atómicas P y V)</h3>
<p>Un <b>semáforo</b> es una variable entera no negativa con dos operaciones atómicas: <code>P(S)</code> (wait, pedir) y <code>V(S)</code> (signal, liberar).</p>
<div class="diagrama">
<svg viewBox="0 0 660 210" role="img" aria-label="Flujo de las operaciones P y V del semaforo">
  <defs><marker id="ah4b" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2c3e50"/></marker></defs>
  <text x="150" y="24" text-anchor="middle" font-size="12" font-weight="bold">P(S) — pedir</text>
  <polygon points="150,40 220,70 150,100 80,70" fill="#eef2f7" stroke="#2c3e50"/><text x="150" y="74" text-anchor="middle" font-size="10">¿S &gt; 0?</text>
  <rect x="60" y="130" width="120" height="34" rx="4" fill="#c9e6cf" stroke="#2c7a4b"/><text x="120" y="151" text-anchor="middle" font-size="10">S := S − 1 (entra)</text>
  <rect x="210" y="130" width="140" height="34" rx="4" fill="#f7d6d6" stroke="#c0392b"/><text x="280" y="151" text-anchor="middle" font-size="10">bloquear (a la cola)</text>
  <line x1="120" y1="100" x2="120" y2="128" stroke="#2c3e50" stroke-width="1.4" marker-end="url(#ah4b)"/><text x="100" y="118" font-size="9">sí</text>
  <line x1="200" y1="85" x2="260" y2="128" stroke="#2c3e50" stroke-width="1.4" marker-end="url(#ah4b)"/><text x="245" y="112" font-size="9">no</text>
  <text x="500" y="24" text-anchor="middle" font-size="12" font-weight="bold">V(S) — liberar</text>
  <polygon points="500,40 580,70 500,100 420,70" fill="#eef2f7" stroke="#2c3e50"/><text x="500" y="70" text-anchor="middle" font-size="9">¿alguien espera?</text>
  <rect x="410" y="130" width="150" height="34" rx="4" fill="#c9e6cf" stroke="#2c7a4b"/><text x="485" y="151" text-anchor="middle" font-size="10">despierta 1 proceso</text>
  <rect x="575" y="130" width="80" height="34" rx="4" fill="#eef2f7" stroke="#2c3e50"/><text x="615" y="151" text-anchor="middle" font-size="10">S := S+1</text>
  <line x1="470" y1="100" x2="470" y2="128" stroke="#2c3e50" stroke-width="1.4" marker-end="url(#ah4b)"/><text x="452" y="118" font-size="9">sí</text>
  <line x1="560" y1="85" x2="605" y2="128" stroke="#2c3e50" stroke-width="1.4" marker-end="url(#ah4b)"/><text x="590" y="112" font-size="9">no</text>
</svg>
<div class="cap-fig">Figura 4.3 — Si S = 0, <code>P(S)</code> bloquea al proceso. <code>V(S)</code> despierta a alguien que espera o incrementa S.</div>
</div>

<table>
<tr><th>Tipo de semáforo</th><th>Uso</th><th>Valor inicial</th></tr>
<tr><td>Binario (mutex)</td><td>Exclusión mutua</td><td><b>1</b></td></tr>
<tr><td>Contador / general</td><td>N recursos idénticos</td><td><b>N</b></td></tr>
<tr><td>Sincronizador / señalización</td><td>Forzar un orden (S1 antes que S2)</td><td><b>0</b></td></tr>
</table>
<pre>mutex = 1                 sync = 0
Proceso:                  P1:            P2:
  P(mutex)                  S1             P(sync)  // espera a P1
  [ sección crítica ]       V(sync)        S2
  V(mutex)</pre>

<div class="callout ejemplo"><h4>Ejemplo</h4>
Un esposo y una esposa retiran de la <b>misma cuenta</b> (saldo S/ 1000) desde dos cajeros a la vez. Sin sincronizar: ambos leen "1000", el esposo retira 800 (queda 200) y la esposa retira 900 (queda 100), pero una escritura pisa a la otra y el banco pierde dinero. Con un <b>semáforo binario</b> alrededor de "leer saldo → verificar → descontar → escribir", solo un cajero entra a la vez: el segundo espera y ve el saldo ya actualizado. No basta con "hacerlo más rápido": el bloque debe ser <b>atómico</b>.
</div>

<div class="callout trampa"><b class="tag">Casos que caen:</b> si un proceso hace <code>P</code> y <b>muere dentro</b> de la SC sin <code>V</code>, el mutex queda tomado para siempre (deadlock). Un <code>V</code> de más rompe la exclusión mutua. Y <b>hacerlo "más rápido" no resuelve</b> una race condition: hace falta <b>atomicidad</b>.</div>
`);
