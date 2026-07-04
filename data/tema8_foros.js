/* TEMA 8 — Los 3 Foros (IoT · Diagnóstico Linux · Hyperthreading/vCPU) */
BANCO.add("t8", [
  /* ---- FORO 1: IoT y redes ---- */
  {
    id: "t8-01", tipo: "opcion", dificultad: "alta",
    enunciado: `<b>(Foro 1)</b> ¿Por qué un SO IoT como FreeRTOS (con 2–10 KB de RAM) <b>no puede</b> usar la pila TCP/IP convencional y qué usa en su lugar?`,
    opciones: [
      { t: "La pila TCP/IP es demasiado pesada para KB de RAM; usa <b>protocolos ligeros</b>: CoAP (sobre UDP), 6LoWPAN, MQTT.", ok: true },
      { t: "TCP/IP está prohibido en dispositivos IoT por ley.", ok: false },
      { t: "El SO IoT no necesita red en absoluto.", ok: false },
      { t: "TCP/IP solo funciona en Windows.", ok: false }
    ],
    explica: `Con memoria en <b>KB</b>, la pila TCP/IP no cabe. Se usan protocolos ligeros: <b>CoAP</b> (sobre UDP, evita el costo de conexión de TCP), <b>6LoWPAN</b> (IPv6 sobre radios de baja potencia 802.15.4) y <b>MQTT</b> (publicación/suscripción con broker).`,
    fuente: "Foro 1 · IoT"
  },
  {
    id: "t8-02", tipo: "abierta", dificultad: "alta", enfoque: "real",
    enunciado: `<b>(Foro 1 · Seguridad IoT — cayó como teórica)</b> ¿Por qué delegar el cifrado a un <b>gateway</b> crea un «punto único de falla» y cómo lo resuelven los SO IoT modernos?`,
    modelo: `Muchos microcontroladores <b>no tienen MMU</b> ni capacidad para cifrado pesado, así que la seguridad se concentra en el <b>gateway</b>. Si un atacante compromete ese gateway, <b>todos los nodos detrás quedan expuestos</b> → <b>single point of failure</b>.<br>
    <b>Solución/tendencia actual:</b> SO como <b>RIOT</b> o <b>Zephyr</b> integran <b>TLS/DTLS nativo</b> en <b>cada nodo</b>, distribuyendo la seguridad en lugar de concentrarla en un solo punto. Así, comprometer un nodo no expone a los demás.`,
    claves: ["Muchos IoT no tienen MMU ni cifrado pesado → seguridad en el gateway", "Si cae el gateway, caen todos los nodos = punto único de falla", "Solución: TLS/DTLS nativo por nodo (RIOT/Zephyr) = seguridad distribuida"],
    explica: `Punto clave que cayó en el examen: <b>gateway = single point of failure</b>; la tendencia es <b>seguridad distribuida</b> por nodo.`,
    fuente: "Foro 1 · Seguridad IoT (teórica del examen)"
  },
  {
    id: "t8-03", tipo: "opcion", dificultad: "media",
    enunciado: `<b>(Foro 1)</b> ¿Por qué muchos microcontroladores IoT <b>dificultan el aislamiento</b> de procesos en memoria?`,
    opciones: [
      { t: "Porque carecen de <b>MMU</b> (unidad de gestión de memoria), que es la que aísla y traduce direcciones.", ok: true },
      { t: "Porque tienen demasiada RAM.", ok: false },
      { t: "Porque usan exclusivamente TCP/IP.", ok: false },
      { t: "Porque su CPU es de 64 bits.", ok: false }
    ],
    explica: `Sin <b>MMU</b> no hay traducción virtual→física ni protección entre procesos → aislamiento débil. Es una limitación estructural de muchos microcontroladores IoT.`,
    fuente: "Foro 1 · IoT / MMU"
  },
  {
    id: "t8-04", tipo: "opcion", dificultad: "media",
    enunciado: `<b>(Foro 1)</b> En <b>e-Health</b> (salud conectada), ¿qué combinación garantiza baja latencia para datos vitales?`,
    opciones: [
      { t: "SO de <b>tiempo real (RTOS)</b> + red con <b>QoS</b> y, en 5G, <b>Network Slicing</b> (segmento con latencia reservada).", ok: true },
      { t: "Un SO de lotes + red best-effort.", ok: false },
      { t: "Deshabilitar toda la seguridad para ganar velocidad.", ok: false },
      { t: "Usar HDD en lugar de SSD en los sensores.", ok: false }
    ],
    explica: `Los signos vitales exigen respuesta <b>determinista</b> → <b>RTOS</b>. La red prioriza con <b>QoS</b> y, en 5G, aísla el tráfico con <b>Network Slicing</b> (ancho de banda y latencia reservados).`,
    fuente: "Foro 1 · e-Health"
  },
  {
    id: "t8-05", tipo: "vf", dificultad: "media", vf: true,
    enunciado: `<b>(Foro 1)</b> El planificador del SO IoT gobierna el <b>duty cycle</b> (apaga componentes para ahorrar energía), lo que obliga a la red a tolerar nodos que «duermen» gran parte del tiempo.`,
    modelo: `Verdadero.`,
    explica: `<b>Verdadero.</b> El <b>duty cycle</b> (ciclo de sueño/actividad) lo decide el planificador del SO. Un nodo que duerme el 90% del tiempo no puede ser enrutador convencional → se usan protocolos tolerantes a la intermitencia (ej. RPL).`,
    fuente: "Foro 1 · Gestión de energía"
  },
  /* ---- FORO 2: diagnóstico Linux ---- */
  {
    id: "t8-06", tipo: "opcion", dificultad: "alta",
    enunciado: `<b>(Foro 2)</b> ¿Cuál es la estrategia correcta para diagnosticar un servidor Linux lento por un proceso sospechoso?`,
    opciones: [
      { t: "Ir de lo <b>general</b> (estado del sistema) a lo <b>específico</b> (el proceso) y actuar de <b>menor a mayor impacto</b>.", ok: true },
      { t: "Ejecutar <code>kill -9</code> a todos los procesos de inmediato.", ok: false },
      { t: "Reiniciar el servidor antes de diagnosticar.", ok: false },
      { t: "Vaciar la caché con <code>echo 3 &gt; /proc/sys/vm/drop_caches</code> primero.", ok: false }
    ],
    explica: `Primero observar (top/ps), luego medir (uptime/free/iostat), luego detectar errores (dmesg/journalctl) y por último corregir de <b>menor a mayor impacto</b> (renice → SIGTERM → SIGKILL). Matar a ciegas o vaciar la caché a la fuerza puede empeorar todo.`,
    fuente: "Foro 2 · Diagnóstico Linux"
  },
  {
    id: "t8-07", tipo: "opcion", dificultad: "alta",
    enunciado: `<b>(Foro 2)</b> Observa la salida de <code>ps</code>. El proceso <b>PID 2210</b> está en estado <b>D</b> y no muere con <code>kill -9</code>. ¿Por qué?`,
    recurso: {
      tipo: "comando", cap: "$ ps -eo pid,stat,%cpu,comm --sort=-%cpu | head",
      contenido:
`  PID STAT  %CPU COMMAND
 2210 D     0.0  backup_job     <- Uninterruptible Sleep
 1980 R    23.5  analitica
 1755 S     1.2  nginx`
    },
    opciones: [
      { t: "El estado <b>D (Uninterruptible Sleep)</b> espera una E/S de disco que el kernel no interrumpe: <b>ignora todas las señales, incluida SIGKILL</b>.", ok: true },
      { t: "Porque <code>kill -9</code> requiere permisos de root que no tenemos.", ok: false },
      { t: "Porque el proceso es un zombie y ya está muerto.", ok: false },
      { t: "Porque el PID es incorrecto.", ok: false }
    ],
    explica: `En estado <b>D</b> el proceso espera E/S de disco y el kernel <b>no lo interrumpe</b>: ignora incluso SIGKILL. Insistir es inútil; la causa raíz es el <b>disco saturado</b>. Solución: destrabar la E/S (<code>ionice</code>), esperar, o en último extremo reiniciar. Revisa <b>STAT</b> en <code>ps</code> antes de matar.`,
    fuente: "Foro 2 · Estado D"
  },
  {
    id: "t8-08", tipo: "abierta", dificultad: "alta", enfoque: "real",
    enunciado: `<b>(Foro 2)</b> ¿Por qué se envía <b>SIGTERM (15)</b> antes que <b>SIGKILL (9)</b>? ¿Qué diferencia hay y qué pasa si el proceso está en estado «D»?`,
    modelo: `<b>SIGTERM (15)</b> pide un <b>cierre ordenado</b>: el proceso recibe la señal, guarda datos, cierra archivos y termina limpio → evita corrupción. Por eso se intenta <b>siempre primero</b>.<br>
    <b>SIGKILL (9)</b> lo mata de inmediato a nivel del kernel, sin darle oportunidad de limpiar → es el <b>último recurso</b> (puede dejar datos a medias).<br>
    Detalle importante: <code>kill</code> no «elimina» procesos, <b>envía señales</b>. Y si el proceso está en <b>estado D (Uninterruptible Sleep)</b> esperando E/S de disco, <b>ignora incluso SIGKILL</b>; insistir es inútil. La solución real es <b>destrabar la E/S subyacente</b> (o usar <code>ionice</code>), no matar repetidamente.`,
    claves: ["SIGTERM = cierre ordenado (guarda y cierra) → primero", "SIGKILL = forzado por el kernel, sin limpieza → último recurso", "kill envía señales, no elimina directamente", "Estado D ignora incluso SIGKILL → destrabar la E/S"],
    explica: `Conecta con la finalización ordenada: primero pedir cierre limpio (SIGTERM), forzar solo si falla (SIGKILL); y el estado D es la excepción.`,
    fuente: "Foro 2 · Señales"
  },
  {
    id: "t8-09", tipo: "opcion", dificultad: "media",
    enunciado: `<b>(Foro 2 · cayó como teórica)</b> ¿Qué comando usas para <b>verificar la disponibilidad de RAM</b> y cómo lo interpretas?`,
    opciones: [
      { t: "<code>free -h</code>: muestra total/usada/libre de RAM y swap; si la RAM libre es baja y el swap crece, hay presión de memoria.", ok: true },
      { t: "<code>ls -l /ram</code>.", ok: false },
      { t: "<code>ping localhost</code>.", ok: false },
      { t: "<code>chmod 777 /mem</code>.", ok: false }
    ],
    explica: `<code>free -h</code> (<i>human-readable</i>) es la forma directa. Alternativas: <code>cat /proc/meminfo</code>, <code>vmstat</code>, <code>top</code>. Swap creciente = disco usado como memoria = lentitud.`,
    fuente: "Foro 2 · verificar RAM (teórica)"
  },
  {
    id: "t8-10", tipo: "vf", dificultad: "media", vf: true,
    enunciado: `<b>(Foro 2)</b> El comando <code>netstat</code> se considera obsoleto en las distribuciones modernas; su reemplazo recomendado es <code>ss</code> (más rápido, lee del kernel).`,
    modelo: `Verdadero.`,
    explica: `<b>Verdadero.</b> <code>ss -tulpn</code> reemplaza a <code>netstat -tulpn</code>. En un servidor ya lento conviene <code>ss</code> por su rapidez. (De forma análoga, <code>tail -f /var/log/syslog</code> → <code>journalctl -f</code> en systemd.)`,
    fuente: "Foro 2 · Réplicas"
  },
  {
    id: "t8-11", tipo: "opcion", dificultad: "media",
    enunciado: `<b>(Foro 2)</b> Si el proceso es <b>legítimo</b> pero consume demasiada CPU y quieres bajarle prioridad <b>sin matarlo</b>, usas…`,
    opciones: [
      { t: "<code>renice +10 -p &lt;PID&gt;</code> (baja su prioridad de CPU).", ok: true },
      { t: "<code>kill -9 &lt;PID&gt;</code>.", ok: false },
      { t: "<code>rm -rf &lt;PID&gt;</code>.", ok: false },
      { t: "<code>shutdown now</code>.", ok: false }
    ],
    explica: `<code>renice</code> reduce la prioridad sin detener el proceso (le cede CPU a los demás). Ojo: solo surte efecto si <b>hay competencia</b> por el CPU. Para limitar E/S: <code>ionice</code>; para limitar CPU estricto: <code>cpulimit -l 30 -p &lt;PID&gt;</code>.`,
    fuente: "Foro 2 · Acción correctiva"
  },
  {
    id: "t8-12", tipo: "opcion", dificultad: "media",
    enunciado: `<b>(Foro 2)</b> ¿Cómo verificas si el <b>OOM Killer</b> ya terminó procesos por falta de memoria?`,
    opciones: [
      { t: "<code>dmesg | grep -i oom</code> (o <code>journalctl -k | grep -i oom</code>).", ok: true },
      { t: "<code>free -m --oom</code>.", ok: false },
      { t: "<code>top -oom</code>.", ok: false },
      { t: "<code>cat /oom</code>.", ok: false }
    ],
    explica: `El <b>OOM Killer</b> deja rastro en el log del kernel; <code>dmesg | grep -i oom</code> muestra mensajes como «Out of memory: Kill process…». Si aparece, la situación de memoria ya fue crítica.`,
    fuente: "Foro 2 · Detección de errores"
  },
  /* ---- FORO 3: hyperthreading / vCPU ---- */
  {
    id: "t8-13", tipo: "opcion", dificultad: "alta",
    enunciado: `<b>(Foro 3)</b> ¿Qué es el <b>Hyperthreading</b> y cómo funciona?`,
    opciones: [
      { t: "Implementación de Intel de <b>SMT</b>: un núcleo físico duplica solo los registros de estado y se presenta como <b>2 procesadores lógicos</b>, compartiendo unidades de ejecución y caché; aprovecha ciclos ociosos de un hilo para avanzar el otro.", ok: true },
      { t: "Agregar físicamente el doble de núcleos al procesador.", ok: false },
      { t: "Aumentar la frecuencia del reloj del CPU al doble.", ok: false },
      { t: "Una técnica de compresión de memoria RAM.", ok: false }
    ],
    explica: `HT = <b>SMT (Simultaneous Multithreading)</b>: duplica registros/estado (no las unidades de ejecución), presenta 2 hilos lógicos por núcleo y usa los <b>ciclos ociosos</b> (cuando un hilo espera memoria) para avanzar el otro. No equivale a más núcleos físicos.`,
    fuente: "Foro 3 · Hyperthreading"
  },
  {
    id: "t8-14", tipo: "abierta", dificultad: "alta", enfoque: "mixto",
    enunciado: `<b>(Foro 3)</b> Define hyperthreading, una <b>ventaja</b> y una <b>desventaja</b> (incluye el ángulo de seguridad).`,
    modelo: `<b>HT</b> = implementación de Intel de <b>SMT</b>: un núcleo físico duplica solo los registros de estado y se presenta como 2 procesadores lógicos, compartiendo unidades de ejecución y caché; aprovecha ciclos ociosos de un hilo para avanzar el otro.<br>
    <b>Ventaja:</b> mayor throughput (<b>+15–30%</b> en multitarea) <b>sin fabricar más núcleos físicos</b>.<br>
    <b>Desventaja:</b> <b>contención de recursos</b> (si ambos hilos piden la misma unidad, hay cuello de botella) <b>y</b>, sobre todo, al compartir caché/puertos abre <b>ataques de canal lateral</b> (PortSmash, Spectre, TLBleed): un proceso puede medir tiempos de contención para inferir qué hace el otro hilo → por eso <b>OpenBSD deshabilita HT por defecto</b>.`,
    claves: ["Definir HT = SMT (registros duplicados, unidades compartidas)", "Ventaja: +15–30% throughput sin más núcleos", "Desventaja: contención Y canal lateral (PortSmash/Spectre)", "OpenBSD lo deshabilita por seguridad"],
    explica: `El punto que suma: la desventaja no es solo rendimiento, sino <b>seguridad</b> (canal lateral por compartir caché/puertos).`,
    fuente: "Foro 3 · HT ventaja/desventaja"
  },
  {
    id: "t8-15", tipo: "opcion", dificultad: "alta",
    enunciado: `<b>(Foro 3)</b> ¿Por qué OpenBSD y entornos de alta seguridad <b>deshabilitan</b> el hyperthreading pese a su ganancia de rendimiento?`,
    opciones: [
      { t: "Porque los 2 hilos lógicos comparten caché y puertos de ejecución → habilitan <b>ataques de canal lateral</b> (PortSmash, Spectre) que fugan datos del otro hilo.", ok: true },
      { t: "Porque el HT consume demasiada energía.", ok: false },
      { t: "Porque el HT reduce el número de núcleos físicos.", ok: false },
      { t: "Porque el HT solo funciona con Windows.", ok: false }
    ],
    explica: `Al compartir físicamente recursos, un proceso malicioso puede <b>medir contención</b> para inferir qué hace el otro hilo del mismo núcleo → fuga de datos sin acceso privilegiado. En sistemas con datos sensibles, el riesgo supera la ganancia de throughput.`,
    fuente: "Foro 3 · Seguridad HT"
  },
  {
    id: "t8-16", tipo: "abierta", dificultad: "alta", enfoque: "mixto",
    enunciado: `<b>(Foro 3)</b> Diferencia entre <b>CPU física</b> y <b>vCPU</b> en <b>arquitectura</b> y <b>rendimiento</b>.`,
    modelo: `<b>Arquitectura:</b> la <b>CPU física</b> es hardware real (silicio, caché propia) que opera <b>directamente</b> sobre el hardware. La <b>vCPU</b> es una <b>abstracción de software</b> creada por el <b>hipervisor</b>, que añade una <b>capa de indirección</b>: el hipervisor decide cuándo y en qué núcleo físico ejecuta cada vCPU.<br>
    <b>Rendimiento:</b> la física es <b>predecible y constante</b> (limitada solo por el HW instalado). La vCPU es <b>variable</b>: depende de cuántas vCPUs compitan por el mismo núcleo físico (<b>overcommit</b>).<br>
    En esencia: la CPU física <b>es</b> el recurso; la vCPU es una <b>promesa de acceso</b> a él, mediada por la planificación del hipervisor (análogo a cómo el SO reparte el CPU entre procesos).`,
    claves: ["Física = HW real, acceso directo / vCPU = abstracción del hipervisor (indirección)", "Física predecible / vCPU variable por overcommit", "Física ES el recurso; vCPU es promesa de acceso"],
    explica: `La clave: la vCPU no es un núcleo dedicado, sino una <b>porción de tiempo</b> planificada por el hipervisor.`,
    fuente: "Foro 3 · CPU física vs vCPU"
  },
  {
    id: "t8-17", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `<b>(Foro 3)</b> Asignar una «vCPU exclusiva» a una máquina virtual garantiza que tendrá un <b>núcleo físico exclusivo</b>.`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> Si el hipervisor asigna esa vCPU al mismo núcleo físico que otra VM (con HT activo), comparten superficie de contención y riesgo de canal lateral. Para exclusividad física real se necesita <b>CPU pinning</b> (afinidad) y, en datos sensibles, <b>deshabilitar HT</b> en esos núcleos. «vCPU exclusiva» ≠ «núcleo físico exclusivo».`,
    fuente: "Foro 3 · Réplicas (CPU pinning)"
  },
  {
    id: "t8-18", tipo: "opcion", dificultad: "alta",
    enunciado: `<b>(Foro 3)</b> Al hacer <b>autoscaling de vCPUs</b> en el Sistema de Matrícula, ¿qué métrica evita degradar el rendimiento por sobreasignación?`,
    opciones: [
      { t: "El <b>CPU Ready Time</b> (tiempo que una vCPU espera en cola por un núcleo físico); si supera ~5%, hay que dejar de añadir vCPUs.", ok: true },
      { t: "La temperatura del gabinete del servidor.", ok: false },
      { t: "El número de pestañas abiertas en el navegador.", ok: false },
      { t: "El tamaño del disco duro.", ok: false }
    ],
    explica: `Escalar solo por %CPU es engañoso: si creas más vCPUs que núcleos físicos, el hipervisor gasta ciclos <b>intercambiando</b> hilos (thrashing de CPU). El <b>CPU Ready Time</b> mide la espera real por un núcleo; sobre ~5% el rendimiento cae. Ratio recomendado vCPU:pCPU ≈ 3:1 a 5:1.`,
    fuente: "Foro 3 · Réplicas (Ready Time / overcommit)"
  },
  {
    id: "t8-19", tipo: "abierta", dificultad: "alta", enfoque: "real",
    enunciado: `<b>(Foro 3)</b> Propón <b>2 casos</b> de virtualización de CPU en sistemas de la UNMSM y justifica si cada uno necesita <b>elasticidad</b> o <b>aislamiento</b>.`,
    modelo: `<b>Caso 1 — Sistema de Matrícula → ELASTICIDAD.</b> Tiene picos enormes en días de matrícula (×10) e inactividad el resto. Con <b>autoscaling de vCPUs</b>, el hipervisor añade vCPUs cuando el uso supera un umbral y las libera después → no se sobredimensiona hardware todo el año.<br>
    <b>Caso 2 — Plataforma de Exámenes en línea → AISLAMIENTO.</b> Durante un examen, cualquier lentitud invalida la evaluación. Se asignan <b>vCPUs reservadas/exclusivas</b> durante la ventana del examen para que ningún otro sistema le «robe» ciclos.<br>
    <b>Principio común:</b> la virtualización <b>desacopla la capacidad asignada de la capacidad física instalada</b>, repartiendo el hardware según la demanda (elasticidad) o protegiendo un mínimo garantizado (aislamiento).`,
    claves: ["Caso elasticidad (Matrícula): autoscaling por picos", "Caso aislamiento (Exámenes): vCPUs reservadas", "Principio: desacoplar capacidad asignada de la física", "Justificar por qué cada uno necesita elasticidad o aislamiento"],
    explica: `Lo que el profesor busca: distinguir <b>elasticidad</b> (escalar según demanda) de <b>aislamiento</b> (garantizar recursos), con casos concretos de la universidad.`,
    fuente: "Foro 3 · Casos UNMSM"
  },
  {
    id: "t8-20", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `<b>(Foro 3)</b> Una misma vCPU puede ejecutarse <b>dividida entre dos servidores físicos</b> distintos al mismo tiempo para sumar su potencia.`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> Una vCPU se ejecuta en la CPU física de <b>un solo nodo</b> a la vez. Lo que existe es la <b>migración en vivo (vMotion)</b>: mover una VM en ejecución de un servidor a otro sin apagarla; pero no se «parte» una vCPU entre dos hosts simultáneamente. Repartir carga entre nodos requiere un clúster (ej. vCenter/DRS).`,
    fuente: "Foro 3 · Réplicas (migración en vivo)"
  },
  {
    id: "t8-21", tipo: "opcion", dificultad: "media",
    enunciado: `<b>(Foro 3)</b> La ventaja de rendimiento típica del hyperthreading en cargas multitarea es de aproximadamente…`,
    opciones: [
      { t: "15–30% de throughput adicional (no escala linealmente como núcleos reales).", ok: true },
      { t: "100% (duplica el rendimiento como si fueran 2 núcleos físicos).", ok: false },
      { t: "0% (nunca aporta nada).", ok: false },
      { t: "300% en cualquier carga.", ok: false }
    ],
    explica: `HT aporta ~<b>15–30%</b> aprovechando ciclos ociosos, pero <b>no</b> duplica el rendimiento: comparte las unidades de ejecución reales, por eso no escala como núcleos físicos.`,
    fuente: "Foro 3 · HT rendimiento"
  },
  {
    id: "t8-22", tipo: "vf", dificultad: "media", vf: false,
    enunciado: `<b>(Foro 1)</b> Los dispositivos IoT restringidos pueden ejecutar sin problema la pila TCP/IP convencional y cifrado pesado en cada nodo.`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> Con memoria en KB y CPU limitada, no pueden con TCP/IP convencional ni cifrado pesado. Por eso usan protocolos ligeros (CoAP/UDP, 6LoWPAN, MQTT) y, para seguridad, SO como RIOT/Zephyr con TLS/DTLS optimizado.`,
    fuente: "Foro 1 · IoT / Sí-No"
  },
  {
    id: "t8-23", tipo: "opcion", dificultad: "alta",
    enunciado: `<b>(Foro 2)</b> En un servidor lento, ¿por qué NO conviene ejecutar <code>strace -p &lt;PID&gt;</code> directamente ni vaciar la caché con <code>echo 3 &gt; /proc/sys/vm/drop_caches</code>?`,
    opciones: [
      { t: "<code>strace</code> directo añade sobrecarga (mejor <code>strace -c</code>), y vaciar la caché fuerza releer todo desde disco → empeora la E/S en un sistema ya saturado.", ok: true },
      { t: "Porque ambos comandos borran archivos del usuario.", ok: false },
      { t: "Porque requieren reiniciar el sistema.", ok: false },
      { t: "Porque solo funcionan en Windows.", ok: false }
    ],
    explica: `<code>strace -p</code> interrumpe el proceso en cada syscall → mucha sobrecarga (usa <code>strace -c</code> para resumen). Vaciar la caché elimina el <b>page cache</b> útil y obliga a releer del disco → un pico de E/S que puede colgar un servidor ya saturado. La caché no es «el problema»; es un mecanismo de aceleración.`,
    fuente: "Foro 2 · Réplicas avanzadas"
  },
  {
    id: "t8-24", tipo: "abierta", dificultad: "alta", enfoque: "real",
    enunciado: `<b>(Foro 2)</b> <b>Figura del examen (Parte II).</b> Un servidor Linux está lento por sospecha de un proceso de usuario. Escribe una <b>secuencia lógica de comandos</b> (identificar → analizar → detectar → corregir), justificando cada uno.`,
    recurso: { tipo: "imagen", cap: "Parte II del examen 2025-2 (referencia de estilo)", src: "img/examen2025_parte2.jpeg" },
    modelo: `<b>1) Identificar:</b> <code>top</code>/<code>htop</code> (vista en vivo) → <code>ps aux --sort=-%cpu | head</code> (foto fija, da el <b>PID</b>, usuario y comando).<br>
    <b>2) Analizar:</b> <code>uptime</code> + <code>nproc</code> (¿load average &gt; núcleos? = saturado); <code>free -h</code> (¿swap alto?); <code>iostat -xz 1 3</code> (¿disco saturado, %util/await altos?).<br>
    <b>3) Detectar errores:</b> <code>dmesg | grep -i oom</code> (¿actuó el OOM Killer?); <code>journalctl -p 3 -xb</code> (errores críticos).<br>
    <b>4) Corregir (escalonado):</b> <code>renice +10 -p &lt;PID&gt;</code> (bajar prioridad) → <code>kill -15 &lt;PID&gt;</code> (SIGTERM, cierre ordenado) → si no responde <code>kill -9 &lt;PID&gt;</code> (SIGKILL, último recurso).<br>
    <b>Justificación global:</b> ir de lo <b>general a lo específico</b> y actuar de <b>menor a mayor impacto</b>. Revisar la columna <b>STAT</b> antes de matar: si está en <b>D</b>, ni SIGKILL lo mata (destrabar la E/S).`,
    claves: ["Identificar con top/ps (obtener PID)", "Analizar carga/memoria/disco (uptime, free, iostat)", "Detectar OOM/errores (dmesg, journalctl)", "Corregir escalonado: renice → SIGTERM → SIGKILL", "Justificar general→específico y menor→mayor impacto"],
    explica: `Es una pregunta de foro que cae textual. La clave es la <b>secuencia justificada</b> y el orden de menor a mayor impacto.`,
    fuente: "Foro 2 · Examen 2025-2 Parte II"
  }
]);
