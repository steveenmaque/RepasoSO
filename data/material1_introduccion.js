/* MATERIAL DE ESTUDIO — TEMA 1: Introducción a los Sistemas Operativos */
BANCO.setMaterial("t1", `
<h2>Tema 1 · Introducción a los Sistemas Operativos</h2>
<p class="intro">Un <b>Sistema Operativo (SO)</b> es un conjunto de componentes interconectados que <b>gestiona el hardware</b> y ofrece <b>servicios</b> a los programas. Está en todos lados: laptop, smartwatch, un auto Tesla, una bombilla inteligente… lo que tienen en común es que <b>todos tienen un SO</b>. Un SO moderno es <b>multiusuario</b>, de <b>tiempo compartido</b> y <b>multiprogramado</b>.</p>

<div class="callout def"><b class="tag">Analogía base:</b> el SO es como un <b>sistema de bancos</b>: atiende a muchos clientes (procesos) con recursos limitados, sin que nadie corrompa los datos de otro.</div>

<p><b>Ley de Bell:</b> cada ~10 años aparece una nueva clase de dispositivos, cada una con su SO (mainframe → mini → PC → móvil → IoT). No confundir con la <b>Ley de Moore</b> (transistores/rendimiento del CPU).</p>

<h3>1.1 Arquitectura de Von Neumann</h3>
<p>Todo SO administra una máquina con esta estructura: la <b>CPU</b> (con la <b>ALU</b> — aritmético-lógica — y la <b>UC</b> — unidad de control), la <b>memoria (RAM)</b> y los dispositivos de <b>E/S</b>, conectados por tres buses.</p>
<div class="diagrama">
<svg viewBox="0 0 640 300" role="img" aria-label="Arquitectura de Von Neumann">
  <defs><marker id="ah-vn" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2c3e50"/></marker></defs>
  <rect x="30" y="40" width="150" height="110" rx="6" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.5"/>
  <text x="105" y="62" text-anchor="middle" font-size="14" font-weight="bold">CPU</text>
  <rect x="45" y="75" width="55" height="55" rx="4" fill="#fff" stroke="#2c3e50"/>
  <text x="72" y="107" text-anchor="middle" font-size="12">ALU</text>
  <rect x="110" y="75" width="55" height="55" rx="4" fill="#fff" stroke="#2c3e50"/>
  <text x="137" y="107" text-anchor="middle" font-size="12">UC</text>
  <rect x="460" y="40" width="150" height="50" rx="6" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.5"/>
  <text x="535" y="70" text-anchor="middle" font-size="13" font-weight="bold">Memoria (RAM)</text>
  <rect x="460" y="200" width="150" height="50" rx="6" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.5"/>
  <text x="535" y="230" text-anchor="middle" font-size="13" font-weight="bold">Dispositivos E/S</text>
  <!-- buses -->
  <line x1="180" y1="65" x2="460" y2="65" stroke="#2c3e50" stroke-width="1.6" marker-end="url(#ah-vn)"/>
  <text x="320" y="58" text-anchor="middle" font-size="11">bus de datos</text>
  <line x1="180" y1="95" x2="455" y2="95" stroke="#2c3e50" stroke-width="1.6" marker-end="url(#ah-vn)"/>
  <text x="320" y="90" text-anchor="middle" font-size="11">bus de direcciones</text>
  <line x1="180" y1="125" x2="455" y2="205" stroke="#2c3e50" stroke-width="1.6" marker-end="url(#ah-vn)"/>
  <text x="300" y="150" text-anchor="middle" font-size="11">bus de control</text>
</svg>
<div class="cap-fig">Figura 1.1 — CPU (ALU + UC), memoria y E/S unidos por los buses de datos, direcciones y control.</div>
</div>

<h3>1.2 Los tres roles del SO (muy preguntado)</h3>
<p>El SO cumple <b>tres roles a la vez</b>:</p>
<div class="diagrama">
<svg viewBox="0 0 640 230" role="img" aria-label="Tres roles del SO">
  <defs><marker id="ah-rol" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2c3e50"/></marker></defs>
  <circle cx="120" cy="115" r="52" fill="#2c3e50"/>
  <text x="120" y="112" text-anchor="middle" font-size="15" fill="#fff" font-weight="bold">SO</text>
  <text x="120" y="130" text-anchor="middle" font-size="10" fill="#dfe6ee">3 roles</text>
  <rect x="330" y="20" width="290" height="52" rx="6" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.4"/>
  <text x="345" y="40" font-size="13" font-weight="bold">Ilusionista</text>
  <text x="345" y="58" font-size="11">CPU y memoria "privadas"; abstrae el hardware</text>
  <rect x="330" y="90" width="290" height="52" rx="6" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.4"/>
  <text x="345" y="110" font-size="13" font-weight="bold">Referí</text>
  <text x="345" y="128" font-size="11">gestiona/asigna recursos, aísla procesos, protege</text>
  <rect x="330" y="160" width="290" height="52" rx="6" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.4"/>
  <text x="345" y="180" font-size="13" font-weight="bold">Pegamento (glue)</text>
  <text x="345" y="198" font-size="11">servicios comunes: E/S, UI, bibliotecas</text>
  <line x1="172" y1="100" x2="330" y2="46" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ah-rol)"/>
  <line x1="172" y1="115" x2="330" y2="116" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ah-rol)"/>
  <line x1="172" y1="130" x2="330" y2="186" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ah-rol)"/>
</svg>
<div class="cap-fig">Figura 1.2 — El SO es ilusionista, referí y pegamento simultáneamente.</div>
</div>

<h3>1.3 Criterios de evaluación de un SO</h3>
<table>
<tr><th>Criterio</th><th>Significado</th></tr>
<tr><td>Performance</td><td>Implementar la abstracción con bajo <i>overhead</i>, equidad, buen tiempo de respuesta y throughput.</td></tr>
<tr><td>Seguridad</td><td>Minimizar la vulnerabilidad a ataques (integridad y privacidad).</td></tr>
<tr><td>Portabilidad</td><td>La abstracción no cambia aunque cambie el hardware.</td></tr>
<tr><td>Fiabilidad</td><td>El sistema hace lo que se supone que debe hacer.</td></tr>
<tr><td>Disponibilidad</td><td>Tiempo medio hasta la falla (MTTF) + tiempo medio de reparación (MTTR).</td></tr>
</table>

<h3>1.4 Políticas vs Mecanismos</h3>
<p>Distinción clásica del profesor. La <b>política</b> es la <b>regla de decisión</b> (el <b>QUÉ</b>); el <b>mecanismo</b> es el <b>método de bajo nivel</b> que la implementa (el <b>CÓMO</b>).</p>
<table>
<tr><th></th><th>Política (QUÉ)</th><th>Mecanismo (CÓMO)</th></tr>
<tr><td>Analogía</td><td>"Me detengo con la luz roja"</td><td>"El pedal de freno"</td></tr>
<tr><td>Drivers (ej. examen)</td><td>Política: compatibilidad con el SO</td><td>Mec.: reconocer compatibilidad + asignar recursos para instalar</td></tr>
</table>
<div class="callout"><b class="tag">Clave:</b> una misma política puede implementarse con distintos mecanismos.</div>

<h3>1.5 Modo Usuario vs Modo Kernel</h3>
<p>El núcleo <b>limita los derechos</b> del código de usuario para <b>mantener la funcionalidad, preservar el control y el desempeño</b>. El código de usuario es <b>no confiable</b> (operaciones peligrosas deshabilitadas); el del kernel es <b>confiable</b> (derechos ilimitados). La única puerta entre ambos es la <b>system call</b>, que dispara un <b>TRAP</b>.</p>
<div class="diagrama">
<svg viewBox="0 0 640 250" role="img" aria-label="Flujo modo usuario a kernel">
  <defs>
    <marker id="ah-mk" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2c3e50"/></marker>
    <marker id="ah-mk2" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2c7a4b"/></marker>
  </defs>
  <rect x="30" y="30" width="250" height="190" rx="6" fill="#f4f6f9" stroke="#2c3e50" stroke-dasharray="4,3"/>
  <text x="45" y="50" font-size="12" font-weight="bold">MODO USUARIO (mode bit = 1)</text>
  <rect x="60" y="70" width="190" height="45" rx="5" fill="#eef2f7" stroke="#2c3e50"/>
  <text x="155" y="97" text-anchor="middle" font-size="12">Proceso ejecuta código normal</text>
  <rect x="60" y="150" width="190" height="45" rx="5" fill="#eef2f7" stroke="#2c3e50"/>
  <text x="155" y="177" text-anchor="middle" font-size="12">continúa tras el retorno</text>
  <rect x="360" y="30" width="250" height="190" rx="6" fill="#eef8f1" stroke="#2c7a4b" stroke-dasharray="4,3"/>
  <text x="375" y="50" font-size="12" font-weight="bold" fill="#1c5c38">MODO KERNEL (mode bit = 0)</text>
  <rect x="390" y="95" width="190" height="60" rx="5" fill="#fff" stroke="#2c7a4b"/>
  <text x="485" y="120" text-anchor="middle" font-size="11">Ejecuta la operación</text>
  <text x="485" y="138" text-anchor="middle" font-size="11">privilegiada (E/S, HW)</text>
  <path d="M250,92 L390,110" fill="none" stroke="#2c3e50" stroke-width="1.7" marker-end="url(#ah-mk)"/>
  <text x="320" y="88" text-anchor="middle" font-size="11" font-weight="bold">system call → TRAP</text>
  <text x="320" y="102" text-anchor="middle" font-size="10">(mode bit := 0)</text>
  <path d="M390,140 L250,172" fill="none" stroke="#2c7a4b" stroke-width="1.7" marker-end="url(#ah-mk2)"/>
  <text x="320" y="168" text-anchor="middle" font-size="11" font-weight="bold" fill="#1c5c38">return (mode bit := 1)</text>
</svg>
<div class="cap-fig">Figura 1.3 — El proceso NO ejecuta instrucciones privilegiadas: las pide vía system call (TRAP) y el kernel las hace por él.</div>
</div>

<h3>1.6 Interrupciones</h3>
<p>Una <b>interrupción</b> detiene temporalmente la ejecución normal del CPU para atender un evento (se guarda el contexto y se salta a una rutina de servicio, ISR).</p>
<ul>
<li><b>Hardware (externa / asíncrona):</b> la genera un dispositivo (teclado, disco, reloj). Puede ocurrir en cualquier momento.</li>
<li><b>Software (interna / síncrona) = excepción/trap:</b> la genera el propio proceso al ejecutar una instrucción (ej. <b>división por 0</b>, system call, fallo de página). Está ligada a la instrucción.</li>
</ul>

<h3>1.7 SO de tiempo real vs SO de red</h3>
<table>
<tr><th></th><th>SO de tiempo real</th><th>SO de red</th></tr>
<tr><td>Objetivo</td><td>Cumplir un <b>plazo (deadline) estricto y predecible</b></td><td>Compartir recursos (archivos, impresoras) entre máquinas</td></tr>
<tr><td>Determinismo</td><td>Predecible, latencia acotada (hard/soft)</td><td>Latencia variable de la red</td></tr>
</table>

<h3>1.8 Casos "what-if"</h3>
<table>
<tr><th>Escenario</th><th>Consecuencia</th></tr>
<tr><td>No existe el modo kernel</td><td>Cualquier programa tocaría el HW y memoria ajena → sistema inseguro e inestable.</td></tr>
<tr><td>Falla un proceso en modo usuario</td><td>Solo ese proceso muere; el SO lo aísla (referí).</td></tr>
<tr><td>Falla código en modo kernel</td><td>Kernel panic / BSOD: afecta a todo el sistema.</td></tr>
<tr><td>Falla el "ilusionista"</td><td>Los programas tendrían que conocer el HW exacto → se pierde la portabilidad.</td></tr>
</table>

<div class="callout ejemplo"><h4>Ejemplo</h4>
Un videojuego quiere <b>guardar tu partida</b> en el disco. El juego corre en <b>modo usuario</b>, así que <b>no</b> puede escribir en el disco por su cuenta: llama a una <b>system call</b> (ej. <code>write()</code>), que dispara un <b>TRAP</b> a <b>modo kernel</b>. El SO valida permisos y realiza la escritura por él; luego retorna a modo usuario y el juego sigue. Así, aunque el juego tenga un bug, no puede dañar el disco ni tocar la memoria de otros programas.
</div>
`);
