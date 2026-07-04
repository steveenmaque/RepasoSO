/* TEMA 3 — Diagrama de Estados (5 y 7 / UNIX) */
BANCO.add("t3", [
  {
    id: "t3-01", tipo: "abierta", dificultad: "trampa", enfoque: "real",
    enunciado: `<b>Figura (Administrador de tareas).</b> Considerando la imagen, explique los <b>pasos que realiza el SO</b> si el usuario decide «finalizar proceso» y ese proceso se encuentra en estado <b>BLOQUEADO</b>. (Examen 2025-2 P.II-2, 4 pts.)`,
    recurso: { tipo: "imagen", cap: "Figura 1 — Administrador de tareas (Examen 2025-2)", src: "img/examen2025_admin_tareas.jpeg" },
    modelo: `El proceso bloqueado <b>NO pasa directamente a «Terminado»</b>: sigue respetando el ciclo de vida del proceso. Lo que hace el SO es:<br>
    1) <b>Regresarlo a la cola de «Listos»</b> (Bloqueado → Listo).<br>
    2) <b>Cambiar el valor del Contador de Programa (PC)</b> para que apunte a la <b>última instrucción</b> (su rutina de salida/terminación).<br>
    Así, cuando el despachador le dé el CPU, el proceso ejecutará su <b>terminación ordenada</b> (liberar memoria, cerrar archivos) en lugar de <b>continuar</b> su trabajo normal —que es justo lo que NO se desea, porque se quiere finalizarlo.<br>
    <b>La clave es el cambio del apuntador (PC).</b>`,
    claves: [
      "NO salta directo a Terminado (respeta el ciclo de vida)",
      "Regresa a la cola de Listos",
      "Modifica el Contador de Programa a la última instrucción (rutina de salida)",
      "La clave es el cambio del apuntador (PC)"
    ],
    explica: `Es la <b>trampa favorita</b> del profesor: casi todos responden «pasa de frente a Terminado» (FALSO). Lo esencial es <b>el cambio del PC</b> para que ejecute su salida y no continúe.`,
    fuente: "Examen 2025-2 P.II-2 · Transcripción del profesor"
  },
  {
    id: "t3-02", tipo: "opcion", dificultad: "trampa",
    enunciado: `Cuando un proceso <b>bloqueado</b> es «finalizado» por el usuario, ¿a qué estado transita inmediatamente según el ciclo de vida?`,
    opciones: [
      { t: "A la cola de listos, pero con el PC apuntando ya a su última instrucción.", ok: true },
      { t: "Directo a terminado, saltándose por completo el resto del ciclo de vida.", ok: false },
      { t: "Directo a ejecución, para que el procesador lo mate de inmediato al toque.", ok: false },
      { t: "Se queda en bloqueado hasta que por fin llegue el evento de su lenta E/S.", ok: false }
    ],
    explica: `Respeta el ciclo de vida: va a <b>Listos</b> con el <b>Contador de Programa</b> apuntando a la rutina de salida. No salta a Terminado ni a Ejecución directamente.`,
    fuente: "Respuesta clave del profesor · C3"
  },
  {
    id: "t3-03", tipo: "opcion", dificultad: "media",
    enunciado: `En el diagrama de <b>5 estados</b>, cuando un proceso en <b>Espera (Bloqueado)</b> recibe el fin de su E/S, ¿a qué estado pasa?`,
    opciones: [
      { t: "A listo: vuelve a la cola y espera a que el despachador lo elija después.", ok: true },
      { t: "A ejecución: toma el procesador de inmediato saltándose la cola de listos.", ok: false },
      { t: "A nuevo: reinicia su ciclo de vida como si acabara de crearse otra vez ya.", ok: false },
      { t: "A terminado: el sistema lo cierra apenas termina su operación de E/S ya.", ok: false }
    ],
    explica: `Espera → <b>Listo</b> (nunca directo a Ejecución). Para volver a usar el CPU siempre hay que pasar por <b>Listo</b> y ser elegido por el despachador.`,
    fuente: "C3 · Transiciones 5 estados"
  },
  {
    id: "t3-04", tipo: "opcion", dificultad: "media",
    enunciado: `Observa el diagrama de 5 estados. ¿Cuál transición (flecha) ocurre cuando <b>se acaba el quantum</b> de un proceso en ejecución?`,
    recurso: {
      tipo: "grafico", cap: "Diagrama de 5 estados",
      contenido:
`<svg viewBox="0 0 560 170" role="img" aria-label="Diagrama de 5 estados">
  <defs><marker id="ahq" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2c3e50"/></marker></defs>
  <rect x="15" y="60" width="80" height="40" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="55" y="84" text-anchor="middle" font-size="12">Listo</text>
  <rect x="200" y="60" width="95" height="40" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="247" y="84" text-anchor="middle" font-size="12">Ejecución</text>
  <rect x="200" y="125" width="95" height="34" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="247" y="147" text-anchor="middle" font-size="11">Espera</text>
  <rect x="410" y="60" width="95" height="40" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="457" y="84" text-anchor="middle" font-size="12">Terminado</text>
  <line x1="95" y1="72" x2="197" y2="72" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ahq)"/><text x="146" y="65" text-anchor="middle" font-size="9">dispatch</text>
  <line x1="197" y1="90" x2="98" y2="90" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ahq)"/><text x="146" y="103" text-anchor="middle" font-size="9">fin de quantum</text>
  <line x1="247" y1="100" x2="247" y2="123" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ahq)"/><text x="300" y="118" text-anchor="middle" font-size="9">pide E/S</text>
  <line x1="295" y1="78" x2="407" y2="78" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ahq)"/><text x="351" y="71" text-anchor="middle" font-size="9">exit</text>
</svg>`
    },
    opciones: [
      { t: "Ejecución a listo, porque el fin de quantum le retira el uso del procesador.", ok: true },
      { t: "Ejecución a espera, porque el proceso pide una E/S y queda bloqueado a esperar.", ok: false },
      { t: "Ejecución a terminado, porque la instrucción exit lo saca del ciclo de vida.", ok: false },
      { t: "Listo a ejecución, porque el despachador acaba de entregarle el procesador.", ok: false }
    ],
    explica: `Fin de quantum = <b>interrupción</b>: el SO le quita el CPU y lo devuelve a <b>Listo</b>. (Ejecución → Espera es cuando pide E/S; Ejecución → Terminado es cuando hace <code>exit()</code>.)`,
    fuente: "C3 · Transiciones 5 estados"
  },
  {
    id: "t3-05", tipo: "opcion", dificultad: "alta",
    enunciado: `En el diagrama de <b>7 estados (UNIX)</b>, ¿qué transición implica que el SO le <b>quita memoria real (RAM)</b> al proceso?`,
    opciones: [
      { t: "Listo a listo-suspendido: el proceso baja al disco y así deja libre la RAM.", ok: true },
      { t: "Listo a ejecución: el proceso recibe el procesador y sigue ocupando la RAM.", ok: false },
      { t: "Bloqueado a listo: el proceso ya tiene su evento y sigue ocupando la RAM.", ok: false },
      { t: "Nuevo a listo: el proceso recién se admite y pasa a ocupar sitio en la RAM.", ok: false }
    ],
    explica: `Las transiciones hacia estados <b>suspendidos</b> (a disco) son las que <b>liberan RAM</b>. «Suspendido» = en disco, fuera de la memoria real.`,
    fuente: "Examen 2013 P.I-5 · C3"
  },
  {
    id: "t3-06", tipo: "abierta", dificultad: "alta", enfoque: "mixto",
    enunciado: `¿<b>Existe</b> la transición <b>Bloqueado → Bloqueado-suspendido</b>? Si existe, indica <b>ventajas y desventajas</b>. (Examen 2025-2 P.II-1.)`,
    modelo: `<b>Sí existe.</b> Es un <b>swap out</b> de un proceso bloqueado: el SO lo mueve de la RAM al disco mientras espera su evento (p. ej. una E/S larga).<br>
    <b>Ventajas:</b> libera <b>memoria real (RAM)</b> para otros procesos que sí pueden avanzar → mejora el <b>grado de multiprogramación</b>; evita tener RAM ocupada por procesos que de todos modos están esperando.<br>
    <b>Desventajas:</b> el <b>swapping</b> es lento (disco ≫ RAM en latencia); si el proceso se necesita pronto hay que traerlo de vuelta (<b>swap in</b>) → latencia; riesgo de <b>thrashing</b> si se abusa.`,
    claves: ["Sí existe: es un swap out del bloqueado", "Ventaja: libera RAM / mejora multiprogramación", "Desventaja: costo del swapping (disco lento) y riesgo de thrashing"],
    explica: `Suspender un proceso <b>bloqueado</b> tiene sentido: si de todos modos está esperando, mejor liberar su RAM. El costo es el swapping.`,
    fuente: "Examen 2025-2 P.II-1 · C3"
  },
  {
    id: "t3-07", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `La transición <b>Listo-suspendido → Bloqueado-suspendido</b> es legal en el diagrama de 7 estados.`,
    modelo: `Falso.`,
    explica: `<b>Falso (ilegal).</b> Un proceso «listo» (suspendido o no) <b>no espera ningún evento</b>, así que no tiene motivo para bloquearse. Solo un proceso en <b>ejecución</b> puede bloquearse al pedir E/S.`,
    fuente: "Examen 2013 P.II-2 · C3"
  },
  {
    id: "t3-08", tipo: "vf", dificultad: "alta", vf: true,
    enunciado: `La transición <b>Bloqueado-suspendido → Bloqueado</b> es legal (es un <i>swap in</i> del proceso que estaba en disco).`,
    modelo: `Verdadero.`,
    explica: `<b>Verdadero.</b> Es un <b>swap in</b>: el SO vuelve a traer a RAM un proceso que estaba bloqueado en disco (sigue esperando su evento). Lo prepara para cuando termine su E/S.`,
    fuente: "Examen 2013 P.II-2 · C3"
  },
  {
    id: "t3-09", tipo: "opcion", dificultad: "alta",
    enunciado: `¿Cuál de las siguientes transiciones del ciclo de vida es, en general, <b>ilegal</b>?`,
    opciones: [
      { t: "Nuevo a terminado, pues un proceso nuevo aún no se admitió ni se ejecutó.", ok: true },
      { t: "Nuevo a listo-suspendido, pues se admite pero va al disco por falta de RAM.", ok: false },
      { t: "Bloqueado a listo, pues su evento de E/S terminó y vuelve a la cola de listos.", ok: false },
      { t: "Ejecución a listo, pues el fin del quantum le retira el uso del procesador ya.", ok: false }
    ],
    explica: `<b>Nuevo → Terminado</b> es ilegal en el ciclo normal: un proceso nuevo debe pasar por Listo. (Nuevo → Listo-suspendido sí es legal: se admite pero se coloca en disco por falta de RAM.)`,
    fuente: "Examen 2013 P.II-2 · C3"
  },
  {
    id: "t3-10", tipo: "opcion", dificultad: "media",
    enunciado: `¿Qué caracteriza a un <b>proceso zombi</b>?`,
    opciones: [
      { t: "Ha terminado su ejecución, pero su entrada sigue aún en la tabla de procesos.", ok: true },
      { t: "Consume el CPU de forma excesiva sin llegar a realizar ninguna tarea útil ya.", ok: false },
      { t: "Está bloqueado a la espera de que se libere algún recurso del sistema en uso.", ok: false },
      { t: "Se ejecuta en segundo plano con una prioridad baja fijada por el usuario ya.", ok: false }
    ],
    explica: `Zombie = terminó pero su <b>entrada sigue en la tabla</b> (esperando que el padre lea su código de salida con <code>wait()</code>). No consume CPU.`,
    fuente: "Examen 2025 P.I-5 · C3"
  },
  {
    id: "t3-11", tipo: "abierta", dificultad: "alta", enfoque: "real",
    enunciado: `Explica <b>2 desventajas</b> del estado <b>zombie</b> usando la analogía de una <b>biblioteca con aforo limitado</b>. (Examen 2024 P.II-3.)`,
    modelo: `<b>1) Consumo de recursos del sistema:</b> cada zombie ocupa una entrada en la <b>tabla de procesos</b>; si se llenan, el SO se queda <b>sin espacio para crear nuevos procesos</b>. <i>Analogía:</i> usuarios que ya terminaron el libro pero siguen ocupando asiento → el aforo se llena y no entran nuevos.<br>
    <b>2) Dificultad en la gestión:</b> hay que <b>identificar</b> qué procesos ya terminaron para liberarlos (que el padre haga <code>wait()</code>). <i>Analogía:</i> alguien tendría que revisar quién ya acabó de leer para pedirle que se retire → carga de gestión.`,
    claves: ["Desventaja 1: agota la tabla de procesos → no se crean nuevos", "Desventaja 2: dificulta la gestión (hay que identificar y liberar)", "Usar la analogía de la biblioteca/aforo"],
    explica: `El zombie no gasta CPU; su daño es <b>ocupar la tabla de procesos</b> y <b>complicar la gestión</b>.`,
    fuente: "Examen 2024 P.II-3 · C3"
  },
  {
    id: "t3-12", tipo: "opcion", dificultad: "media",
    enunciado: `En el diagrama de 7 estados, «estar <b>suspendido</b>» significa que el proceso…`,
    opciones: [
      { t: "Fue movido de la RAM al disco con un swap out y quedó fuera de la memoria real.", ok: true },
      { t: "Está ejecutándose con la máxima prioridad y por eso ocupa la memoria real ya.", ok: false },
      { t: "Terminó su ejecución y solo espera que su proceso padre lo recoja de la tabla.", ok: false },
      { t: "Está esperando su turno en la cola de listos, todavía dentro de la memoria RAM.", ok: false }
    ],
    explica: `Suspendido = <b>en disco</b> (swap out). Para volver a ejecutarse necesita un <b>swap in</b> (regresar a RAM).`,
    fuente: "C3 · 7 estados"
  },
  {
    id: "t3-13", tipo: "vf", dificultad: "alta", vf: true,
    enunciado: `La transición <b>Nuevo → Listo-suspendido</b> es legal: el SO admite el proceso pero, por falta de RAM, lo coloca directamente suspendido en disco.`,
    modelo: `Verdadero.`,
    explica: `<b>Verdadero.</b> Permite controlar el <b>grado de multiprogramación</b> sin saturar la memoria: se admite el proceso pero se guarda en disco hasta que haya RAM.`,
    fuente: "Examen 2013 P.II-2 · C3"
  },
  {
    id: "t3-14", tipo: "opcion", dificultad: "alta",
    enunciado: `Un dispositivo de E/S queda «colgado» y <b>nunca</b> envía el fin de la operación. ¿Qué le ocurre al proceso que la esperaba?`,
    opciones: [
      { t: "Queda para siempre en espera; se sale con timeouts de E/S, señales o matándolo.", ok: true },
      { t: "Pasa de forma automática a la cola de listos después de esperar un solo segundo.", ok: false },
      { t: "Se convierte de inmediato en un proceso zombie que ocupa la tabla de procesos.", ok: false },
      { t: "El sistema operativo lo mueve directo a ejecución para poder desbloquearlo ya.", ok: false }
    ],
    explica: `Sin el evento de fin de E/S, el proceso queda <b>colgado en Bloqueado</b>. Mecanismos como <b>timeouts</b> (SIGALRM) o matar el proceso lo resuelven.`,
    fuente: "C3 · What-if"
  },
  {
    id: "t3-15", tipo: "opcion", dificultad: "media",
    enunciado: `¿Quién realiza la transición <b>Listo → Ejecución</b>?`,
    opciones: [
      { t: "El despachador, que asigna el uso del procesador al proceso que fue elegido.", ok: true },
      { t: "El propio proceso, que toma el procesador por su cuenta cuando así lo decide.", ok: false },
      { t: "El dispositivo de E/S, que le entrega el procesador al terminar su operación.", ok: false },
      { t: "El compilador, que asigna el procesador tras traducir el código del proceso.", ok: false }
    ],
    explica: `El <b>planificador</b> elige y el <b>despachador</b> ejecuta el cambio Listo→Ejecución (le da el CPU).`,
    fuente: "C3/C6 · Despachador"
  },
  {
    id: "t3-16", tipo: "vf", dificultad: "media", vf: false,
    enunciado: `Un proceso en estado <b>Espera/Bloqueado</b> puede ser seleccionado por el planificador para pasar a <b>Ejecución</b> directamente.`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> El planificador solo elige procesos en <b>Listo</b>. Primero debe ocurrir el evento que lo desbloquea (Espera → Listo) y recién ahí puede ser elegido.`,
    fuente: "C3 · Sí/No"
  },
  {
    id: "t3-17", tipo: "opcion", dificultad: "alta",
    enunciado: `Si el <b>despachador falla</b> por completo, ¿cuál es la consecuencia?`,
    opciones: [
      { t: "Nadie pasa de listo a ejecución y por eso el sistema entero se congela ya.", ok: true },
      { t: "Todos los procesos listos terminan de forma correcta sin necesitar el CPU.", ok: false },
      { t: "El sistema se acelera bastante al quitar el overhead del cambio de contexto.", ok: false },
      { t: "Los procesos bloqueados se desbloquean solos y toman el procesador por sí ya.", ok: false }
    ],
    explica: `Sin despachador, ningún proceso listo recibe el CPU → el sistema deja de avanzar (se congela).`,
    fuente: "C3 · What-if"
  },
  {
    id: "t3-18", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `Un proceso puede transitar de <b>Bloqueado</b> directamente a <b>Ejecución</b> cuando su E/S termina, para no perder tiempo.`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> Bloqueado → <b>Listo</b> → (despachador) → Ejecución. No existe Bloqueado → Ejecución directo: hay que pasar por la cola de listos.`,
    fuente: "C3 · Transiciones"
  },
  {
    id: "t3-19", tipo: "abierta", dificultad: "media", enfoque: "ideal",
    enunciado: `¿Por qué el SO <b>no puede</b> simplemente borrar de la tabla de procesos a un proceso bloqueado que se quiere finalizar, «en seco»? Relaciónalo con sus recursos y con el PC.`,
    modelo: `Porque el proceso tiene <b>recursos asignados</b> (memoria, archivos abiertos, locks) que deben liberarse <b>ordenadamente</b> siguiendo su <b>rutina de salida</b>. Borrarlo en seco dejaría recursos colgados: <b>locks tomados</b> → posible deadlock para otros; <b>archivos sin cerrar</b> → corrupción de datos.<br>
    Por eso el SO lo <b>devuelve a Listos</b> y <b>modifica su Contador de Programa</b> para que apunte a la <b>última instrucción (terminación)</b>. Así, al recibir el CPU, ejecuta su finalización <b>limpia</b> en vez de continuar su trabajo. La clave es el <b>cambio del apuntador (PC)</b>, no un salto mágico a «Terminado».`,
    claves: ["Tiene recursos que liberar ordenadamente (memoria, archivos, locks)", "Borrar en seco → locks/archivos colgados (deadlock/corrupción)", "Va a Listos + PC a la rutina de salida", "Clave: cambio del PC"],
    explica: `Conecta con la respuesta clave: la terminación limpia se logra ejecutando la rutina de salida, redirigiendo el PC.`,
    fuente: "C3 · Análisis (finalizar bloqueado)"
  },
  {
    id: "t3-20", tipo: "opcion", dificultad: "alta",
    enunciado: `¿Qué diferencia hay entre <b>Listo-suspendido</b> y <b>Bloqueado-suspendido</b>?`,
    opciones: [
      { t: "Los dos están en disco: el listo-suspendido solo espera RAM y el bloqueado además un evento.", ok: true },
      { t: "Los dos están en disco: el listo-suspendido espera un evento y el bloqueado solo la RAM.", ok: false },
      { t: "Los dos están en disco: consumen CPU por igual mientras aguardan volver a la RAM real.", ok: false },
      { t: "Los dos son el mismo estado con distinto nombre y no se diferencian en nada real ya.", ok: false }
    ],
    explica: `Los dos están <b>suspendidos (en disco)</b>. El <b>Listo-suspendido</b> solo necesita volver a RAM (swap in) para poder correr; el <b>Bloqueado-suspendido</b> además debe esperar su evento. Por eso Bloqueado-suspendido → Listo-suspendido ocurre cuando termina la E/S estando en disco.`,
    fuente: "C3 · 7 estados"
  },
  {
    id: "t3-21", tipo: "vf", dificultad: "alta", vf: true,
    enunciado: `Abusar del mecanismo de suspensión (swapping) puede provocar <b>thrashing</b>, donde el SO pasa más tiempo moviendo procesos entre RAM y disco que ejecutándolos.`,
    modelo: `Verdadero.`,
    explica: `<b>Verdadero.</b> Demasiado swapping = <b>thrashing</b>: el sistema se dedica a mover páginas/procesos RAM↔disco y avanza poco trabajo útil. Como el disco es ~100 000× más lento que la RAM, el rendimiento se desploma.`,
    fuente: "C3/C7 · Thrashing"
  },
  {
    id: "t3-22", tipo: "opcion", dificultad: "media",
    enunciado: `¿Quién provoca la transición <b>Ejecución → Espera (Bloqueado)</b>?`,
    opciones: [
      { t: "El propio proceso, al pedir una operación de E/S o al ponerse a esperar un evento.", ok: true },
      { t: "El fin del quantum, que retira el procesador y manda el proceso a la cola de listos.", ok: false },
      { t: "El despachador, que retira el procesador para cedérselo a otro proceso con prioridad.", ok: false },
      { t: "La instrucción exit, que saca el proceso del ciclo y lo lleva directo a terminado.", ok: false }
    ],
    explica: `El proceso se bloquea <b>a sí mismo</b> al pedir E/S o esperar un evento. El fin de quantum lleva a Listo; <code>exit()</code> lleva a Terminado.`,
    fuente: "C3 · Transiciones"
  }
]);
