/* =====================================================================
   EXAMEN GENERAL — Banco de preguntas "tipo examen difícil".
   ---------------------------------------------------------------------
   Diseñadas con el estándar que exige el profesor y que pediste:
     · NINGUNA opción en negrita (el motor además las limpia en el examen).
     · La correcta NO va siempre primera (el examen baraja el orden).
     · Todas las opciones de una pregunta tienen (casi) el MISMO largo,
       para que no se delate ni por posición, ni por formato, ni por
       longitud. En cada pregunta hay al menos DOS distractores muy
       parecidos entre sí (difieren en un matiz decisivo).
     · Varias preguntas llevan IMAGEN / figura (fotos del examen 2025-2
       y diagramas SVG) como parte de la prueba.
     · Contenido tomado de las TRANSCRIPCIONES de clase y exámenes previos.
   Ids "exg-*" para no chocar con "t*" ni "tr*".
   ===================================================================== */

/* ---------- TEMA 1 · Introducción ---------- */
BANCO.add("t1", [
  {
    id: "exg-t1-01", tipo: "opcion", dificultad: "trampa",
    enunciado: `«Me detengo cuando veo la luz roja del semáforo». En la dupla política / mecanismo, esa frase es…`,
    opciones: [
      { t: "una política, pues expresa la regla de decisión, es decir el qué se hace.", ok: true },
      { t: "un mecanismo, pues expresa el método de bajo nivel, es decir el cómo actúa.", ok: false },
      { t: "un mecanismo, pues describe el pedal de freno que ejecuta al pie la orden.", ok: false },
      { t: "las dos a la vez, porque política y mecanismo son sinónimos dentro del SO.", ok: false }
    ],
    explica: `Detenerse ante la luz roja es la <b>regla</b> (política, el QUÉ). El <b>mecanismo</b> sería «el pedal de freno» (el CÓMO). Por eso las dos opciones de «mecanismo» son la trampa: describen el CÓMO, no la regla.`,
    fuente: "C1 · Políticas vs Mecanismos"
  },
  {
    id: "exg-t1-02", tipo: "opcion", dificultad: "alta",
    enunciado: `Un programa de usuario intenta formatear el disco. ¿Qué debe ocurrir para hacerlo sin romper la seguridad?`,
    opciones: [
      { t: "Pide una system call que dispara un TRAP a modo kernel y este valida y ejecuta.", ok: true },
      { t: "Pone él mismo el mode bit en cero y ejecuta la orden privilegiada sin permiso.", ok: false },
      { t: "Pone él mismo el mode bit en uno y ejecuta la orden privilegiada al instante.", ok: false },
      { t: "Manda la orden al compilador para que la inserte ya lista dentro del binario.", ok: false }
    ],
    explica: `El código de usuario NO toca el hardware: pide al SO mediante una <b>system call</b> que provoca un <b>TRAP</b> a kernel; ahí se validan permisos y recién se ejecuta. Las dos opciones del «mode bit» son la trampa: el proceso jamás lo cambia por su cuenta.`,
    fuente: "C1 · Modo usuario / kernel"
  }
]);

/* ---------- TEMA 2 · Administración de Procesos ---------- */
BANCO.add("t2", [
  {
    id: "exg-t2-01", tipo: "opcion", dificultad: "alta",
    enunciado: `Observa la Parte II del examen 2025-2. ¿Qué describe mejor el <b>procesamiento concurrente</b> de un SO?`,
    recurso: { tipo: "imagen", cap: "Examen 2025-2 · Parte II (ítem de concurrencia)", src: "img/examen2025_parte2.jpeg" },
    opciones: [
      { t: "Manejar varios procesos que se superponen en el tiempo sin correr a la vez.", ok: true },
      { t: "Ejecutar varios procesos exactamente a la vez en procesadores distintos.", ok: false },
      { t: "Ejecutar varios procesos de forma secuencial en un único hilo de control.", ok: false },
      { t: "Ejecutar un solo proceso de manera exclusiva para evitar todo conflicto.", ok: false }
    ],
    explica: `<b>Concurrente</b> = varios procesos que se <b>superponen</b> en el tiempo aunque no corran simultáneamente (un solo núcleo alterna). Correr «a la vez en procesadores distintos» es <b>paralelo</b>, la trampa clásica.`,
    fuente: "Examen 2025-2 P.I-6 · C2"
  },
  {
    id: "exg-t2-02", tipo: "opcion", dificultad: "trampa",
    enunciado: `Cierras la terminal (proceso padre) mientras su script hijo sigue esperando un dato. ¿Qué le pasa al hijo?`,
    opciones: [
      { t: "El SO aplica muerte en cascada y elimina al hijo con todo su subárbol.", ok: true },
      { t: "El SO mantiene vivo al hijo y lo adopta init para que continúe él solo.", ok: false },
      { t: "El SO mantiene vivo al hijo y lo asciende a padre de la propia terminal.", ok: false },
      { t: "El SO deja al hijo como zombie fijo, ocupando la tabla para siempre ya.", ok: false }
    ],
    explica: `En Unix/Linux, matar el padre desata la <b>muerte en cascada</b>: cae todo el árbol de descendientes para garantizar su unidad. Las dos opciones de «mantiene vivo al hijo» son la trampa.`,
    fuente: "Transcripción Semana 5 · Tema 2/3"
  }
]);

/* ---------- TEMA 3 · Diagrama de Estados ---------- */
BANCO.add("t3", [
  {
    id: "exg-t3-01", tipo: "opcion", dificultad: "trampa",
    enunciado: `Observa el Administrador de tareas. Eliges un proceso y pulsas «Finalizar tarea». ¿En qué estado estaba ese proceso justo en ese instante?`,
    recurso: { tipo: "imagen", cap: "Figura — Administrador de tareas (Examen 2025-2)", src: "img/examen2025_admin_tareas.jpeg" },
    opciones: [
      { t: "Puede estar en listo, bloqueado o en ejecución: es un inventario de la RAM.", ok: true },
      { t: "Siempre está en ejecución, pues para cerrarlo antes debe estar corriendo ya.", ok: false },
      { t: "Siempre está en listo, pues aguarda su turno para tomar el procesador libre.", ok: false },
      { t: "Siempre está en bloqueado, pues espera que el usuario lo mande a cerrarse ya.", ok: false }
    ],
    explica: `Trampa típica: casi todos responden «ejecución». El Administrador es un <b>inventario de la RAM</b> donde conviven procesos listos, bloqueados y en ejecución, así que la respuesta correcta es <b>depende</b>. Los tres «Siempre está…» son distractores gemelos.`,
    fuente: "Transcripción Semana 5 · Tema 3"
  },
  {
    id: "exg-t3-02", tipo: "opcion", dificultad: "alta",
    enunciado: `Matas un proceso que está en la cola de <b>bloqueados</b>. ¿Cómo llega técnicamente a «terminado»?`,
    opciones: [
      { t: "Vuelve a la cola de listos y el SO apunta su PC a la rutina de salida.", ok: true },
      { t: "Pasa directo de bloqueado a terminado apenas pulsas el «finalizar tarea».", ok: false },
      { t: "Pasa directo de bloqueado a ejecución y el procesador lo cierra al toque.", ok: false },
      { t: "Sigue en bloqueado hasta que por fin llegue el evento de su lenta E/S.", ok: false }
    ],
    explica: `NO existe la transición Bloqueado → Terminado. Solo el <b>procesador</b> ejecuta la instrucción de fin, así que el SO regresa el proceso a <b>listos</b> y cambia el <b>PC</b> a su rutina de salida. Las dos opciones «Pasa directo…» son la trampa.`,
    fuente: "Transcripción Semana 5 · Tema 3"
  },
  {
    id: "exg-t3-03", tipo: "opcion", dificultad: "alta",
    enunciado: `Analogía del profesor: Unix (con <code>fork</code>) es el «Banco Itaú». Cuando no hay memoria para un proceso nuevo, Unix…`,
    opciones: [
      { t: "lo encola en disco como listo-suspendido y lo admite en cuanto haya RAM.", ok: true },
      { t: "lo rechaza y le pide volver más tarde para no complicarse su diseño interno.", ok: false },
      { t: "lo rechaza y lo borra del sistema para no cargar con el costo del swapping.", ok: false },
      { t: "lo ejecuta de inmediato saltándose por completo el paso por la cola de listos.", ok: false }
    ],
    explica: `Unix = Banco Itaú: <b>no rechaza</b>, encola al proceso en disco (Nuevo → Listo-suspendido) y lo admite al liberarse RAM. Su costo es gestionar el <b>swapping</b>. Las dos opciones «lo rechaza…» son la trampa del modelo clásico.`,
    fuente: "Transcripción Semana 7 · Tema 3"
  },
  {
    id: "exg-t3-04", tipo: "opcion", dificultad: "media",
    enunciado: `En el diagrama de 5 estados, ¿qué transición ocurre cuando el proceso en ejecución <b>pide una E/S</b>?`,
    recurso: {
      tipo: "grafico", cap: "Diagrama de 5 estados",
      contenido:
`<svg viewBox="0 0 560 170" role="img" aria-label="Diagrama de 5 estados">
  <defs><marker id="ahx" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2c3e50"/></marker></defs>
  <rect x="15" y="60" width="80" height="40" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="55" y="84" text-anchor="middle" font-size="12">Listo</text>
  <rect x="200" y="60" width="95" height="40" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="247" y="84" text-anchor="middle" font-size="12">Ejecución</text>
  <rect x="200" y="125" width="95" height="34" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="247" y="147" text-anchor="middle" font-size="11">Espera</text>
  <rect x="410" y="60" width="95" height="40" rx="5" fill="#eef2f7" stroke="#2c3e50"/><text x="457" y="84" text-anchor="middle" font-size="12">Terminado</text>
  <line x1="95" y1="72" x2="197" y2="72" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ahx)"/><text x="146" y="65" text-anchor="middle" font-size="9">dispatch</text>
  <line x1="197" y1="90" x2="98" y2="90" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ahx)"/><text x="146" y="103" text-anchor="middle" font-size="9">fin de quantum</text>
  <line x1="247" y1="100" x2="247" y2="123" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ahx)"/><text x="300" y="118" text-anchor="middle" font-size="9">pide E/S</text>
  <line x1="295" y1="78" x2="407" y2="78" stroke="#2c3e50" stroke-width="1.5" marker-end="url(#ahx)"/><text x="351" y="71" text-anchor="middle" font-size="9">exit</text>
</svg>`
    },
    opciones: [
      { t: "Ejecución a espera (bloqueado), pues aguarda que su operación de E/S acabe.", ok: true },
      { t: "Ejecución a listo, pues el fin de quantum le retira el uso del procesador ya.", ok: false },
      { t: "Ejecución a terminado, pues la instrucción exit lo saca por entero del ciclo.", ok: false },
      { t: "Listo a ejecución, pues el despachador recién le entrega el uso del procesador.", ok: false }
    ],
    explica: `Pedir E/S bloquea al proceso: <b>Ejecución → Espera</b>. «Ejecución → Listo» es el fin de quantum y «Ejecución → Terminado» es <code>exit()</code>: por eso los tres «Ejecución a…» se parecen y hay que leer el motivo.`,
    fuente: "C3 · Transiciones 5 estados"
  },
  {
    id: "exg-t3-05", tipo: "vf", dificultad: "trampa", vf: false,
    enunciado: `Si matas un proceso que está en la cola de <b>bloqueados</b>, existe una transición directa de Bloqueado → Terminado.`,
    modelo: `Falso. No existe esa transición: el proceso debe volver a listos y ejecutar su rutina de salida.`,
    explica: `<b>Falso.</b> Solo el <b>procesador</b> (estado de ejecución) puede leer la instrucción de fin. El SO cambia el <b>PC</b> y devuelve el proceso a <b>listos</b>; jamás salta de bloqueado directo a terminado.`,
    fuente: "Transcripción Semana 5 · Tema 3"
  }
]);

/* ---------- TEMA 4 · Sincronización ---------- */
BANCO.add("t4", [
  {
    id: "exg-t4-01", tipo: "opcion", dificultad: "alta",
    enunciado: `En los semáforos de Dijkstra (S entero no negativo), la operación <b>P (wait)</b> sobre S hace lo siguiente:`,
    opciones: [
      { t: "si S es mayor que cero resta uno y sigue; si no, va a la cola de bloqueados.", ok: true },
      { t: "si S es mayor que cero suma uno y sigue; si no, va a la cola de bloqueados.", ok: false },
      { t: "siempre suma uno al valor de S y despierta a un proceso que estaba en cola.", ok: false },
      { t: "siempre reinicia el valor de S al inicial y deja pasar a todos los procesos.", ok: false }
    ],
    explica: `<b>P (wait):</b> si S &gt; 0 <b>decrementa</b> (S = S − 1) y el proceso entra a su sección crítica; si S = 0 se <b>bloquea</b>. Las dos primeras opciones son gemelas: la trampa es «suma» en vez de «resta».`,
    fuente: "Transcripción Semanas 8-9 · Tema 4"
  },
  {
    id: "exg-t4-02", tipo: "opcion", dificultad: "alta",
    enunciado: `¿Qué hace la operación <b>V (signal)</b> sobre un semáforo S?`,
    opciones: [
      { t: "si hay uno esperando lo despierta y lo pasa a listos; si no, suma uno a S.", ok: true },
      { t: "si hay uno esperando lo bloquea otra vez; si no, resta uno al valor de S.", ok: false },
      { t: "siempre resta uno al valor de S y bloquea al proceso que la acaba de usar.", ok: false },
      { t: "siempre vacía de golpe la cola del semáforo y reinicia el valor de S a cero.", ok: false }
    ],
    explica: `<b>V (signal):</b> si hay un proceso esperando lo <b>despierta</b> (lo pasa a listos); si la cola está vacía <b>incrementa</b> (S = S + 1). Las dos primeras son gemelas: la trampa es «lo bloquea / resta».`,
    fuente: "Transcripción Semana 9 · Tema 4"
  },
  {
    id: "exg-t4-03", tipo: "opcion", dificultad: "alta",
    enunciado: `Saldo 5000. Depósito (+4500) lee 5000, calcula 9500 y se pausa; entra Retiro (−500), lee 5000 y guarda 4500; luego Depósito guarda 9500. ¿Qué <b>factor</b> de la sincronización falló?`,
    recurso: {
      tipo: "codigo", cap: "Entrelazado de los dos procesos sobre el saldo",
      contenido:
`saldo = 5000
Deposito:  lee 5000 -> calcula 5000+4500 = 9500   [se pausa: fin de quantum]
Retiro:    lee 5000 -> calcula 5000- 500 = 4500 -> guarda  saldo = 4500
Deposito:  [retoma] -> guarda  saldo = 9500     (¡ignoró el retiro!)
saldo final = 9500   (se perdieron los 500 del retiro)`
    },
    opciones: [
      { t: "La comunicación: Depósito no avisó a Retiro que estaba tocando el saldo.", ok: true },
      { t: "El tiempo: los dos procesos nunca coincidieron sobre el mismo instante.", ok: false },
      { t: "El recurso: los dos procesos usaron un saldo distinto y no compartido.", ok: false },
      { t: "La prioridad: Retiro superó a Depósito y lo sacó del CPU a la fuerza.", ok: false }
    ],
    explica: `Es una <b>race condition</b>: el tiempo y el recurso (el saldo) sí coincidieron; lo que faltó fue la <b>comunicación</b> (Depósito debió avisar que modificaba el dato). Por eso el tema también se llama «comunicación de procesos».`,
    fuente: "Transcripción Semanas 7-8 · Tema 4"
  }
]);

/* ---------- TEMA 5 · Abrazo Mortal (Deadlock) ---------- */
BANCO.add("t5", [
  {
    id: "exg-t5-01", tipo: "opcion", dificultad: "trampa",
    enunciado: `El profesor insiste en no confundir <b>prevenir</b> con <b>evitar</b> el deadlock. ¿Cuál enunciado es el correcto?`,
    opciones: [
      { t: "Prevenir niega una condición de Coffman; evitar mira si el estado es seguro.", ok: true },
      { t: "Prevenir mira si el estado es seguro; evitar niega una condición de Coffman.", ok: false },
      { t: "Prevenir y evitar niegan por igual las cuatro condiciones que da Coffman ya.", ok: false },
      { t: "Prevenir mata el proceso al detectarlo; evitar solamente ignora el problema.", ok: false }
    ],
    explica: `<b>Prevenir</b> ataca de antemano una condición de Coffman; <b>evitar</b> analiza en tiempo real si conceder deja el sistema en estado seguro (banquero). Las dos primeras opciones son gemelas con los roles <b>invertidos</b>: esa es la trampa.`,
    fuente: "Transcripción Semanas 9-10 · Tema 5"
  },
  {
    id: "exg-t5-02", tipo: "opcion", dificultad: "alta",
    enunciado: `El «algoritmo del avestruz» frente al abrazo mortal consiste en…`,
    opciones: [
      { t: "ignorarlo por su baja probabilidad: reiniciar sale más barato que prevenir.", ok: true },
      { t: "negar de antemano una condición de Coffman para que el bloqueo no aparezca.", ok: false },
      { t: "analizar en vivo si conceder el recurso deja el sistema en un estado seguro.", ok: false },
      { t: "analizar en vivo si negar el recurso deja el sistema en un estado inseguro.", ok: false }
    ],
    explica: `<b>Avestruz</b> = ignorar el problema porque estadísticamente ocurre poco (reiniciar/matar sale más barato). El profesor lo considera inaceptable en software crítico. Las dos últimas opciones son gemelas (describen «evitar», no avestruz).`,
    fuente: "Transcripción Semana 10 · Tema 5"
  },
  {
    id: "exg-t5-03", tipo: "multiple", dificultad: "alta",
    enunciado: `Marca <b>todas</b> las políticas válidas para tratar el abrazo mortal que se vieron en clase.`,
    opciones: [
      { t: "Prevenir, negando de antemano una de las condiciones de Coffman.", ok: true },
      { t: "Evitar, concediendo solo si el estado del sistema sigue siendo seguro.", ok: true },
      { t: "Detectar con un grafo y recuperarse expropiando o matando procesos.", ok: true },
      { t: "Ignorarlo por su baja probabilidad: el llamado algoritmo del avestruz.", ok: true },
      { t: "Subir el quantum de todos los procesos para que ninguno se bloquee ya.", ok: false }
    ],
    explica: `Las políticas son <b>prevenir, evitar, detectar/recuperar</b> e <b>ignorar (avestruz)</b>. Subir el quantum no tiene nada que ver con el deadlock: es el distractor.`,
    fuente: "Transcripción Semanas 9-10 · Tema 5"
  }
]);

/* ---------- TEMA 6 · Planificación del CPU ---------- */
BANCO.add("t6", [
  {
    id: "exg-t6-01", tipo: "opcion", dificultad: "alta",
    enunciado: `¿Cómo se relacionan el <b>Planificador</b> y el <b>Despachador</b> con la dupla política / mecanismo?`,
    opciones: [
      { t: "Planificador es la política (qué proceso entra); Despachador el mecanismo.", ok: true },
      { t: "Planificador es el mecanismo (cómo se cambia); Despachador es la política.", ok: false },
      { t: "Los dos son mecanismos de bajo nivel que guardan y restauran registros ya.", ok: false },
      { t: "Los dos son políticas de alto nivel que solo ordenan la cola de los listos.", ok: false }
    ],
    explica: `<b>Planificador = política</b> (decide QUÉ proceso pasa a ejecución); <b>Despachador = mecanismo</b> (hace el cambio de contexto, el CÓMO). La opción 2 invierte los roles y las dos «Los dos son…» son gemelas: distractores.`,
    fuente: "Transcripción Semanas 9-10 · Tema 6"
  },
  {
    id: "exg-t6-02", tipo: "opcion", dificultad: "trampa",
    enunciado: `Sobre el <b>porcentaje de uso del CPU</b>, ¿cuál afirmación es la correcta?`,
    opciones: [
      { t: "Se maximiza, pero un uso alto no implica productividad: un bucle lo satura.", ok: true },
      { t: "Se maximiza, pues un uso alto siempre implica más procesos terminados ya.", ok: false },
      { t: "Se minimiza, pues así el procesador gasta menos energía y dura mucho más.", ok: false },
      { t: "Es indistinto, pues el uso del CPU no guarda relación con el rendimiento.", ok: false }
    ],
    explica: `Se busca <b>maximizar</b> (el CPU no debe estar ocioso si hay trabajo), pero <b>alto uso ≠ productividad</b>: un solo bucle infinito lo satura al 100% sin producir nada. Las dos «Se maximiza…» son gemelas: la trampa está en el argumento.`,
    fuente: "Transcripción Semanas 9-10 · Tema 6"
  },
  {
    id: "exg-t6-03", tipo: "opcion", dificultad: "trampa",
    enunciado: `Comparando <b>hilos</b> con un proceso monolítico, ¿qué afirmación es la correcta?`,
    opciones: [
      { t: "Su ventaja es cargar y liberar RAM ágilmente; sincronizarlos es más difícil.", ok: true },
      { t: "Su ventaja es que no comparten memoria, por eso sincronizarlos es sencillo.", ok: false },
      { t: "Su ventaja es que siempre corren más rápido que cualquier proceso monolítico.", ok: false },
      { t: "Su ventaja es liberar la RAM instrucción por instrucción como el monolítico.", ok: false }
    ],
    explica: `El beneficio real es la <b>agilidad de carga/liberación</b> (bloques pequeños, cada hilo libera su RAM al terminar); pero como comparten memoria, <b>sincronizarlos es más complejo</b>. Las cuatro empiezan igual: hay que leer el final.`,
    fuente: "Transcripción Semanas 9-10 · Tema 6"
  },
  {
    id: "exg-t6-05", tipo: "vf", dificultad: "media", vf: true,
    enunciado: `Un CPU que se mantiene constantemente por encima del <b>75%</b> de uso es una señal de alerta (posible virus, bucle o hardware obsoleto).`,
    modelo: `Verdadero. Un uso sostenido muy alto es un síntoma que hay que investigar.`,
    explica: `<b>Verdadero.</b> Se busca <b>maximizar</b> el uso del CPU, pero un valor sostenido por encima del <b>75%</b> es una alerta: puede indicar un <b>bucle infinito</b>, malware o hardware que ya no da abasto.`,
    fuente: "Transcripción Semanas 9-10 · Tema 6"
  }
]);

/* ---------- TEMA 7 · Memoria Principal ---------- */
BANCO.add("t7", [
  {
    id: "exg-t7-01", tipo: "opcion", dificultad: "trampa",
    enunciado: `¿Cuál es la definición correcta de <b>fragmentación</b> de memoria?`,
    opciones: [
      { t: "Espacios libres y habilitados que no se usan por exigir asignación contigua.", ok: true },
      { t: "Espacios ocupados por procesos que no se usan por exigir asignación contigua.", ok: false },
      { t: "Los pasillos o separaciones que quedan entre las unidades ya ocupadas de RAM.", ok: false },
      { t: "La memoria que quedó dañada físicamente y por eso el SO ya no la puede asignar.", ok: false }
    ],
    explica: `Fragmentación = <b>espacios libres</b> y habilitados que no se pueden usar por exigirse un bloque <b>contiguo</b>. Solo cuentan los libres: la opción «ocupados» es la gemela-trampa (cambia «libres» por «ocupados»).`,
    fuente: "Transcripción Semanas 11-13 · Tema 7"
  },
  {
    id: "exg-t7-02", tipo: "opcion", dificultad: "alta",
    enunciado: `Un proceso alojado de forma <b>no contigua</b> (disperso), ¿se ejecuta más lento? ¿Por qué?`,
    opciones: [
      { t: "No: la RAM se accede uniforme; lo costoso es su enorme tabla de particiones.", ok: true },
      { t: "Sí: saltar entre sus bloques dispersos le añade una demora en cada acceso ya.", ok: false },
      { t: "Sí: la RAM se accede más lenta en las celdas finales que en las iniciales ya.", ok: false },
      { t: "No: la tabla de particiones desaparece y por eso el acceso resulta más veloz.", ok: false }
    ],
    explica: `El <b>acceso a la RAM es uniforme</b>: la dispersión NO afecta la velocidad. El costo real es la <b>Tabla de Particiones</b> (muchas entradas por proceso), que vive en el kernel. Las dos opciones «Sí…» son gemelas: la trampa.`,
    fuente: "Transcripción Semanas 11-13 · Tema 7"
  },
  {
    id: "exg-t7-03", tipo: "opcion", dificultad: "alta",
    enunciado: `En un esquema <b>híbrido</b> de memoria, ¿cómo se decide qué técnica usar por proceso?`,
    opciones: [
      { t: "Residentes y predecibles van contiguos; los que crecen mucho, no contiguos.", ok: true },
      { t: "Residentes y predecibles van no contiguos; los que crecen mucho, contiguos.", ok: false },
      { t: "Todos los procesos van siempre no contiguos, sin excepción, por dar agilidad.", ok: false },
      { t: "Los procesos grandes van contiguos y los pequeños van siempre no contiguos.", ok: false }
    ],
    explica: `Los procesos <b>residentes y predecibles</b> (antivirus, impresión) reciben espacio <b>contiguo</b>; los <b>aleatorios</b> que crecen mucho (Word) van <b>no contiguo</b>. Las dos primeras opciones son gemelas con los roles invertidos.`,
    fuente: "Transcripción Semana 11 · Tema 7"
  },
  {
    id: "exg-t7-04", tipo: "multiple", dificultad: "alta",
    enunciado: `¿Qué estructuras de software mitigan la <b>enorme tabla de particiones</b> de la asignación no contigua?`,
    opciones: [
      { t: "Índices multinivel, como los hasta tres niveles que emplea Linux.", ok: true },
      { t: "Tablas hash o tablas de páginas invertidas para ubicar los marcos.", ok: true },
      { t: "Mapas de bits, donde 0 marca libre y 1 marca la zona ya ocupada.", ok: true },
      { t: "Listas enlazadas que encadenan los bloques libres y los ocupados.", ok: true },
      { t: "Eliminar del todo la tabla de particiones para ahorrarse memoria.", ok: false }
    ],
    explica: `«Divide y vencerás»: <b>índices multinivel</b> (Linux hasta 3), <b>tablas hash / invertidas</b>, <b>mapas de bits</b> (0 libre, 1 ocupado) y <b>listas enlazadas</b>. Lo que NO se puede es eliminar la tabla: ese es el distractor.`,
    fuente: "Transcripción Semana 11 · Tema 7"
  }
]);
