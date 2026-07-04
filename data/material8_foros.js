/* MATERIAL DE ESTUDIO — TEMA 8: Los 3 Foros */
BANCO.setMaterial("t8", `
<h2>Tema 8 · Los 3 Foros (caen en el examen)</h2>
<p class="intro">Los 3 foros entran directo: <b>seguridad en IoT</b>, <b>diagnóstico de un servidor Linux</b> e <b>hyperthreading / virtualización de CPU</b>.</p>

<h3>Foro 1 · Sistemas Operativos IoT y redes</h3>
<p>Los SO IoT (FreeRTOS, RIOT, Zephyr, Contiki-NG) operan con <b>KB de RAM</b>, así que <b>no</b> pueden con la pila TCP/IP convencional. Usan protocolos ligeros: <b>MQTT</b> (publicación/suscripción con broker), <b>CoAP</b> (sobre UDP, sin costo de conexión) y <b>6LoWPAN</b> (IPv6 sobre radios de baja potencia). Tipos: <b>RTOS</b> (tiempo real, determinista) y <b>ligeros</b> (bajo consumo).</p>
<div class="diagrama">
<svg viewBox="0 0 640 180" role="img" aria-label="Seguridad IoT y punto unico de falla">
  <defs><marker id="ah8" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2c3e50"/></marker></defs>
  <rect x="20" y="30" width="90" height="30" rx="4" fill="#eef2f7" stroke="#2c3e50"/><text x="65" y="50" text-anchor="middle" font-size="10">Sensor 1</text>
  <rect x="20" y="75" width="90" height="30" rx="4" fill="#eef2f7" stroke="#2c3e50"/><text x="65" y="95" text-anchor="middle" font-size="10">Sensor 2</text>
  <rect x="20" y="120" width="90" height="30" rx="4" fill="#eef2f7" stroke="#2c3e50"/><text x="65" y="140" text-anchor="middle" font-size="10">Sensor 3</text>
  <rect x="250" y="70" width="120" height="44" rx="5" fill="#f8cecc" stroke="#c0392b" stroke-width="1.6"/><text x="310" y="90" text-anchor="middle" font-size="11" font-weight="bold">Gateway</text><text x="310" y="105" text-anchor="middle" font-size="9" fill="#8a2620">(cifrado aquí)</text>
  <rect x="490" y="72" width="120" height="40" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="550" y="96" text-anchor="middle" font-size="11">Nube / servidor</text>
  <line x1="110" y1="45" x2="248" y2="82" stroke="#2c3e50" stroke-width="1.4" marker-end="url(#ah8)"/>
  <line x1="110" y1="90" x2="248" y2="92" stroke="#2c3e50" stroke-width="1.4" marker-end="url(#ah8)"/>
  <line x1="110" y1="135" x2="248" y2="102" stroke="#2c3e50" stroke-width="1.4" marker-end="url(#ah8)"/>
  <line x1="370" y1="92" x2="486" y2="92" stroke="#2c3e50" stroke-width="1.4" marker-end="url(#ah8)"/>
  <text x="310" y="140" text-anchor="middle" font-size="10" fill="#c0392b">Si cae el gateway, caen todos los nodos</text>
  <text x="310" y="153" text-anchor="middle" font-size="10" fill="#c0392b">= punto único de falla</text>
</svg>
<div class="cap-fig">Figura 8.1 — Como muchos nodos no tienen MMU ni cifrado pesado, la seguridad se concentra en el gateway (punto único de falla). Tendencia: TLS/DTLS nativo por nodo (RIOT/Zephyr).</div>
</div>

<h3>Foro 2 · Diagnóstico de un servidor Linux</h3>
<p>Estrategia: de lo <b>general</b> a lo <b>específico</b>, y actuar de <b>menor a mayor impacto</b>.</p>
<div class="diagrama">
<svg viewBox="0 0 640 210" role="img" aria-label="Flujo de diagnostico Linux y escalado de senales">
  <defs><marker id="ah8b" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2c3e50"/></marker></defs>
  <rect x="15" y="30" width="140" height="46" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="85" y="50" text-anchor="middle" font-size="11" font-weight="bold">1. Identificar</text><text x="85" y="66" text-anchor="middle" font-size="9">top · ps aux</text>
  <rect x="175" y="30" width="140" height="46" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="245" y="50" text-anchor="middle" font-size="11" font-weight="bold">2. Analizar</text><text x="245" y="66" text-anchor="middle" font-size="9">uptime · free -h · iostat</text>
  <rect x="335" y="30" width="140" height="46" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="405" y="50" text-anchor="middle" font-size="11" font-weight="bold">3. Detectar</text><text x="405" y="66" text-anchor="middle" font-size="9">dmesg · journalctl</text>
  <rect x="495" y="30" width="130" height="46" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="560" y="50" text-anchor="middle" font-size="11" font-weight="bold">4. Corregir</text><text x="560" y="66" text-anchor="middle" font-size="9">escalonado</text>
  <line x1="155" y1="53" x2="171" y2="53" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ah8b)"/>
  <line x1="315" y1="53" x2="331" y2="53" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ah8b)"/>
  <line x1="475" y1="53" x2="491" y2="53" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ah8b)"/>
  <rect x="60" y="120" width="150" height="40" rx="5" fill="#d5e8d4" stroke="#2c7a4b"/><text x="135" y="140" text-anchor="middle" font-size="10">renice (bajar prioridad)</text><text x="135" y="153" text-anchor="middle" font-size="9">no lo mata</text>
  <rect x="245" y="120" width="150" height="40" rx="5" fill="#fff2cc" stroke="#b9770e"/><text x="320" y="140" text-anchor="middle" font-size="10">kill -15 (SIGTERM)</text><text x="320" y="153" text-anchor="middle" font-size="9">cierre ordenado</text>
  <rect x="430" y="120" width="170" height="40" rx="5" fill="#f8cecc" stroke="#c0392b"/><text x="515" y="140" text-anchor="middle" font-size="10">kill -9 (SIGKILL)</text><text x="515" y="153" text-anchor="middle" font-size="9">último recurso</text>
  <line x1="210" y1="140" x2="243" y2="140" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ah8b)"/>
  <line x1="395" y1="140" x2="428" y2="140" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ah8b)"/>
  <text x="330" y="192" text-anchor="middle" font-size="10" fill="#c0392b">Excepción: un proceso en estado "D" (Uninterruptible Sleep) ignora incluso SIGKILL → destrabar la E/S.</text>
</svg>
<div class="cap-fig">Figura 8.2 — <code>kill</code> no "elimina": envía señales. SIGTERM (cierre ordenado) siempre antes que SIGKILL (forzado).</div>
</div>

<h3>Foro 3 · Hyperthreading y virtualización de CPU</h3>
<p><b>Hyperthreading (HT)</b> = implementación de Intel de <b>SMT</b>: un núcleo físico duplica solo los registros de estado y se presenta como <b>2 procesadores lógicos</b>, pero <b>comparte</b> las unidades de ejecución y la caché.</p>
<div class="diagrama">
<svg viewBox="0 0 640 180" role="img" aria-label="Nucleo con hyperthreading">
  <rect x="180" y="20" width="280" height="145" rx="8" fill="#f4f6f9" stroke="#2c3e50" stroke-width="1.6"/><text x="320" y="40" text-anchor="middle" font-size="12" font-weight="bold">1 NÚCLEO FÍSICO</text>
  <rect x="200" y="52" width="110" height="36" rx="4" fill="#dae8fc" stroke="#2c3e50"/><text x="255" y="74" text-anchor="middle" font-size="11">Hilo lógico 1</text>
  <rect x="330" y="52" width="110" height="36" rx="4" fill="#d5e8d4" stroke="#2c3e50"/><text x="385" y="74" text-anchor="middle" font-size="11">Hilo lógico 2</text>
  <text x="320" y="104" text-anchor="middle" font-size="9">(cada uno con sus registros propios)</text>
  <rect x="200" y="115" width="240" height="36" rx="4" fill="#ffe6cc" stroke="#b9770e"/><text x="320" y="132" text-anchor="middle" font-size="11">COMPARTIDO: ALU/FPU + caché L1/L2</text><text x="320" y="146" text-anchor="middle" font-size="9" fill="#8a2620">(fuente de contención y de ataques de canal lateral)</text>
</svg>
<div class="cap-fig">Figura 8.3 — Ventaja: +15–30% de throughput sin más núcleos. Desventaja: contención Y ataques de canal lateral (PortSmash, Spectre) por compartir caché/puertos → OpenBSD lo deshabilita.</div>
</div>
<table>
<tr><th></th><th>CPU física</th><th>vCPU</th></tr>
<tr><td>Naturaleza</td><td>Hardware real</td><td>Abstracción del <b>hipervisor</b></td></tr>
<tr><td>Arquitectura</td><td>Acceso directo al HW</td><td>Capa de indirección (el hipervisor planifica)</td></tr>
<tr><td>Rendimiento</td><td>Predecible y constante</td><td>Variable (depende del overcommit)</td></tr>
</table>
<div class="callout"><b class="tag">Casos UNMSM:</b> Matrícula → <b>elasticidad</b> (autoscaling de vCPUs en picos); Exámenes en línea → <b>aislamiento</b> (vCPUs reservadas). Ojo: "vCPU exclusiva" ≠ "núcleo físico exclusivo" (para eso, CPU pinning). Vigilar el <b>CPU Ready Time</b> (&gt;5% = degradación) y el ratio vCPU:pCPU (3:1 a 5:1).</div>

<div class="callout ejemplo"><h4>Ejemplo</h4>
<b>(Foro 2)</b> Un servidor de la universidad va lentísimo. Diagnóstico paso a paso: <code>top</code> muestra un proceso al 99% de CPU → con <code>ps aux --sort=-%cpu | head</code> obtienes su PID → <code>uptime</code> y <code>free -h</code> confirman carga alta y swap creciendo → <code>dmesg | grep -i oom</code> revela que el OOM Killer ya mató algo. Actúas de menor a mayor impacto: <code>renice +10 -p PID</code>; si no basta, <code>kill -15 PID</code> (cierre ordenado) y, como último recurso, <code>kill -9 PID</code>. Si el proceso está en estado <b>D</b> (columna STAT), ni SIGKILL lo mata: primero hay que destrabar la E/S del disco.
</div>`);
