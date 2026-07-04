/* MATERIAL DE ESTUDIO — TEMA 5: Abrazo Mortal (Deadlock) */
BANCO.setMaterial("t5", `
<h2>Tema 5 · Abrazo Mortal (Deadlock)</h2>
<p class="intro">Un <b>deadlock</b> ocurre cuando un conjunto de procesos (al menos 2) queda tal que <b>cada uno espera un recurso que solo otro del conjunto puede liberar</b>. En general se produce con recursos <b>no apropiables</b> (impresora, cinta), que no se pueden quitar sin causar daño.</p>

<div class="callout def"><b class="tag">Analogía:</b> cruce de 4 autos: A espera a B, B a C, C a D, D a A. Nadie avanza ni retrocede → congelados (espera circular).</div>

<h3>5.1 Las 4 condiciones de Coffman (necesarias y simultáneas)</h3>
<p>Deben cumplirse <b>las 4 a la vez</b>. Si falta una, no hay deadlock. Por eso, para <b>prevenir</b>, basta <b>negar una</b>.</p>
<div class="diagrama">
<svg viewBox="0 0 640 250" role="img" aria-label="Cuatro condiciones de Coffman convergen en deadlock">
  <defs><marker id="ah5" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2c3e50"/></marker></defs>
  <rect x="20" y="20" width="230" height="40" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="135" y="45" text-anchor="middle" font-size="12">1 · Exclusión mutua (no compartible)</text>
  <rect x="20" y="80" width="230" height="40" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="135" y="105" text-anchor="middle" font-size="12">2 · Retención y espera (hold &amp; wait)</text>
  <rect x="20" y="140" width="230" height="40" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="135" y="165" text-anchor="middle" font-size="12">3 · Sin apropiación</text>
  <rect x="20" y="200" width="230" height="40" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="135" y="225" text-anchor="middle" font-size="12">4 · Espera circular</text>
  <rect x="420" y="100" width="190" height="60" rx="8" fill="#c0392b" stroke="#7d2620"/><text x="515" y="128" text-anchor="middle" font-size="15" fill="#fff" font-weight="bold">DEADLOCK</text><text x="515" y="146" text-anchor="middle" font-size="10" fill="#f6d6d0">(las 4 a la vez)</text>
  <line x1="250" y1="40" x2="418" y2="115" stroke="#2c3e50" stroke-width="1.4" marker-end="url(#ah5)"/>
  <line x1="250" y1="100" x2="418" y2="122" stroke="#2c3e50" stroke-width="1.4" marker-end="url(#ah5)"/>
  <line x1="250" y1="160" x2="418" y2="138" stroke="#2c3e50" stroke-width="1.4" marker-end="url(#ah5)"/>
  <line x1="250" y1="220" x2="418" y2="145" stroke="#2c3e50" stroke-width="1.4" marker-end="url(#ah5)"/>
</svg>
<div class="cap-fig">Figura 5.1 — La condición que <b>NO se puede negar</b> es la exclusión mutua (algunos recursos son intrínsecamente no compartibles). Solo se pueden negar 3.</div>
</div>

<h3>5.2 Grafo de asignación de recursos (modelo de Holt)</h3>
<p>El SO puede <b>detectar</b> un deadlock construyendo este grafo y <b>buscando ciclos</b>. Flecha <b>proceso → recurso</b> = "lo solicita"; flecha <b>recurso → proceso</b> = "está asignado a".</p>
<div class="diagrama">
<svg viewBox="0 0 640 220" role="img" aria-label="Grafo de asignacion de recursos con ciclo">
  <defs><marker id="ah5b" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#c0392b"/></marker></defs>
  <circle cx="120" cy="110" r="34" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.5"/><text x="120" y="115" text-anchor="middle" font-size="14" font-weight="bold">P1</text>
  <circle cx="440" cy="110" r="34" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.5"/><text x="440" y="115" text-anchor="middle" font-size="14" font-weight="bold">P2</text>
  <rect x="255" y="30" width="50" height="50" fill="#fff5e0" stroke="#b9770e" stroke-width="1.5"/><text x="280" y="60" text-anchor="middle" font-size="13" font-weight="bold">R1</text>
  <rect x="255" y="140" width="50" height="50" fill="#fff5e0" stroke="#b9770e" stroke-width="1.5"/><text x="280" y="170" text-anchor="middle" font-size="13" font-weight="bold">R2</text>
  <!-- R1 asignado a P1 -->
  <line x1="255" y1="55" x2="150" y2="100" stroke="#c0392b" stroke-width="1.7" marker-end="url(#ah5b)"/><text x="195" y="66" text-anchor="middle" font-size="9">R1→P1 (asignado)</text>
  <!-- P1 solicita R2 -->
  <line x1="140" y1="135" x2="253" y2="165" stroke="#c0392b" stroke-width="1.7" marker-end="url(#ah5b)"/><text x="185" y="165" text-anchor="middle" font-size="9">P1→R2 (pide)</text>
  <!-- R2 asignado a P2 -->
  <line x1="305" y1="165" x2="410" y2="128" stroke="#c0392b" stroke-width="1.7" marker-end="url(#ah5b)"/><text x="365" y="168" text-anchor="middle" font-size="9">R2→P2 (asignado)</text>
  <!-- P2 solicita R1 -->
  <line x1="425" y1="80" x2="305" y2="58" stroke="#c0392b" stroke-width="1.7" marker-end="url(#ah5b)"/><text x="375" y="62" text-anchor="middle" font-size="9">P2→R1 (pide)</text>
</svg>
<div class="cap-fig">Figura 5.2 — Hay un <b>ciclo</b> P1→R2→P2→R1→P1: con recursos de instancia única, ciclo = <b>deadlock</b>. P1 retiene R1 y pide R2; P2 retiene R2 y pide R1.</div>
</div>

<div class="diagrama">
<div class="anim-tag">Animación</div>
<svg viewBox="0 0 400 270" role="img" aria-label="Animacion de la espera circular">
  <defs><marker id="ah5c" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#c0392b"/></marker></defs>
  <circle cx="200" cy="45" r="26" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.5"/><text x="200" y="50" text-anchor="middle" font-size="13" font-weight="bold">P1</text>
  <circle cx="330" cy="140" r="26" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.5"/><text x="330" y="145" text-anchor="middle" font-size="13" font-weight="bold">P2</text>
  <circle cx="200" cy="230" r="26" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.5"/><text x="200" y="235" text-anchor="middle" font-size="13" font-weight="bold">P3</text>
  <circle cx="70" cy="140" r="26" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.5"/><text x="70" y="145" text-anchor="middle" font-size="13" font-weight="bold">P4</text>
  <line x1="220" y1="60" x2="309" y2="124" stroke="#c0392b" stroke-width="2.2" stroke-dasharray="7,5" marker-end="url(#ah5c)"><animate attributeName="stroke-dashoffset" from="24" to="0" dur="0.7s" repeatCount="indefinite"/></line>
  <line x1="309" y1="155" x2="221" y2="215" stroke="#c0392b" stroke-width="2.2" stroke-dasharray="7,5" marker-end="url(#ah5c)"><animate attributeName="stroke-dashoffset" from="24" to="0" dur="0.7s" repeatCount="indefinite"/></line>
  <line x1="179" y1="215" x2="91" y2="155" stroke="#c0392b" stroke-width="2.2" stroke-dasharray="7,5" marker-end="url(#ah5c)"><animate attributeName="stroke-dashoffset" from="24" to="0" dur="0.7s" repeatCount="indefinite"/></line>
  <line x1="91" y1="124" x2="179" y2="60" stroke="#c0392b" stroke-width="2.2" stroke-dasharray="7,5" marker-end="url(#ah5c)"><animate attributeName="stroke-dashoffset" from="24" to="0" dur="0.7s" repeatCount="indefinite"/></line>
  <text x="200" y="135" text-anchor="middle" font-size="12" font-weight="bold" fill="#c0392b">ESPERA</text>
  <text x="200" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#c0392b">CIRCULAR</text>
</svg>
<div class="cap-fig">Figura 5.2b (animada) — Cada proceso espera un recurso que tiene el siguiente (P1→P2→P3→P4→P1). Las flechas "fluyen" pero nadie avanza: eso es el abrazo mortal. Basta <b>romper una flecha</b> (negar una condición) para deshacerlo.</div>
</div>

<h3>5.3 Enfoques para manejar el deadlock</h3>
<table>
<tr><th>Enfoque</th><th>Idea</th><th>Quién lo usa</th></tr>
<tr><td>Ignorar (avestruz)</td><td>Asumir que es raro; si pasa, reiniciar</td><td>Windows, Linux (casos cotidianos)</td></tr>
<tr><td>Prevención</td><td>Diseñar para que sea imposible cumplir una condición</td><td>Sistemas críticos</td></tr>
<tr><td>Evitación</td><td>Evaluar cada petición (estado seguro)</td><td>Sistemas medianos</td></tr>
<tr><td>Detección y recuperación</td><td>Dejar que ocurra, detectar el ciclo y actuar</td><td>Bases de datos, clústeres</td></tr>
</table>

<h3>5.4 PREVENIR vs EVITAR (¡lo más importante!)</h3>
<table>
<tr><th></th><th>PREVENIR</th><th>EVITAR</th></tr>
<tr><td>Idea</td><td>Que <b>nunca pueda ocurrir</b> (a priori, por diseño)</td><td>Decidir en tiempo real si conceder es seguro</td></tr>
<tr><td>Cómo</td><td><b>Negar</b> una condición de Coffman (solo 3; la exclusión mutua no)</td><td><b>Algoritmo del Banquero</b> (estado seguro)</td></tr>
<tr><td>Ejemplo (matrícula/pago)</td><td>Imponer orden fijo: "primero pagar, luego matricular" → niega la espera circular</td><td>Conceder el recurso solo si el estado resultante es seguro</td></tr>
</table>
<div class="callout trampa"><b class="tag">TRAMPA:</b> el profesor distingue <b>prevenir</b> de <b>evitar</b>. Si piden "prevenir", responde negando una condición (no el Banquero). Y recuerda: la <b>exclusión mutua no se puede negar</b>.</div>

<div class="callout ejemplo"><h4>Ejemplo</h4>
Matrícula en línea: el proceso de Ana retiene el recurso "matrícula" y espera "pago"; el de Beto retiene "pago" y espera "matrícula". Se cumplen las 4 condiciones → deadlock (como en la animación). Para <b>prevenir</b>, la universidad impone un <b>orden fijo</b>: todos deben <b>pagar primero y matricularse después</b>. Con ese orden, la flecha del ciclo nunca se cierra (se niega la espera circular) y el abrazo mortal es imposible. Esto es <b>prevenir</b>, no <b>evitar</b> (que sería usar el Banquero en cada solicitud).
</div>

<h3>5.5 Algoritmo del Banquero (evitar)</h3>
<p>Mantiene el sistema en <b>estado seguro</b> (existe al menos una secuencia en que todos terminan). Estructuras: Existentes <code>E</code>, Posesión <code>P</code>, Disponibles <code>D = E − ΣP</code>, Máximo, <b>Faltante = Máximo − Posesión</b>.</p>
<pre>1. Buscar un proceso F con  Faltante[F] ≤ D   (puede terminar)
2. Si no existe -> posible interbloqueo (inseguro)
3. Simular que F termina:  D := D + Posesión[F]   (libera lo suyo)
4. Repetir hasta marcar todos (seguro) o no poder avanzar (inseguro)</pre>
<div class="callout"><b class="tag">Estado inseguro ≠ deadlock:</b> inseguro significa que <b>puede</b> caer en deadlock, no que sea inevitable. El Banquero simplemente nunca cruza esa línea.</div>
`);
