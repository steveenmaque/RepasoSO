/* TEMA 2 — Administración de Procesos (C2) */
BANCO.add("t2", [
  {
    id: "t2-01", tipo: "opcion", dificultad: "media",
    enunciado: `¿Cuál de las siguientes afirmaciones describe mejor a un <b>hilo (thread)</b> en un sistema operativo?`,
    opciones: [
      { t: "Es la unidad más pequeña de ejecución que corre instrucciones dentro de un proceso.", ok: true },
      { t: "Es un programa autónomo que se ejecuta sin compartir recursos con otros procesos.", ok: false },
      { t: "Es una técnica que sirve para guardar datos temporales en la memoria secundaria.", ok: false },
      { t: "Es un dispositivo físico que se encarga de gestionar las interrupciones del CPU.", ok: false }
    ],
    explica: `Un <b>hilo</b> es la unidad mínima de ejecución <b>dentro</b> de un proceso; comparte con los demás hilos el espacio de direcciones y los recursos del proceso.`,
    fuente: "Examen 2025 P.I-1 · C2"
  },
  {
    id: "t2-02", tipo: "opcion", dificultad: "trampa",
    enunciado: `Sobre la relación entre <b>programa</b>, <b>proceso</b> e <b>hilos</b>, ¿qué afirmación es correcta?`,
    opciones: [
      { t: "Un proceso puede incluir varios hilos que comparten su espacio de memoria.", ok: true },
      { t: "Un hilo puede incluir varios procesos que comparten su espacio de memoria.", ok: false },
      { t: "Un programa puede incluir varios procesos que se ejecutan siempre a solas.", ok: false },
      { t: "Un hilo puede incluir varios programas que comparten su espacio de memoria.", ok: false }
    ],
    explica: `La relación correcta es <b>proceso → varios hilos</b> (nunca al revés). Un hilo no contiene procesos ni programas.`,
    fuente: "Examen 2013 P.I-4 · C2"
  },
  {
    id: "t2-03", tipo: "multiple", dificultad: "media",
    enunciado: `Un <b>proceso</b> (instancia de un programa en ejecución) necesita ciertos recursos para existir. Marca los que corresponden.`,
    opciones: [
      { t: "CPU para poder ejecutar cada una de las instrucciones del proceso.", ok: true },
      { t: "Memoria como espacio de direcciones: code, data, heap y stack.", ok: true },
      { t: "Registros: contador de programa, puntero de pila y de propósito general.", ok: true },
      { t: "Información de E/S: los archivos abiertos y los dispositivos en uso.", ok: true },
      { t: "Un compilador residente en memoria durante toda la ejecución del proceso.", ok: false }
    ],
    explica: `Un proceso necesita <b>CPU, memoria (code/data/heap/stack), registros e info de E/S</b>. No necesita el compilador cargado: la compilación ocurrió antes, en disco.`,
    fuente: "C2 · Qué es un proceso"
  },
  {
    id: "t2-04", tipo: "vf", dificultad: "media", vf: true,
    enunciado: `Un <b>programa</b> es una entidad <b>pasiva</b> (instrucciones en disco), mientras que un <b>proceso</b> es una entidad <b>activa</b> (programa en ejecución, en RAM y usando el CPU).`,
    modelo: `Verdadero.`,
    explica: `<b>Verdadero.</b> Programa = pasivo (vive en almacenamiento). Proceso = activo (en RAM, ejecutándose). De un mismo programa pueden existir <b>muchos</b> procesos simultáneos.`,
    fuente: "C2 · Programa vs proceso"
  },
  {
    id: "t2-05", tipo: "opcion", dificultad: "alta",
    enunciado: `Observa la estructura del PCB en el kernel <b>Xv6</b>. Un proceso terminó su ejecución pero su entrada sigue en la tabla. ¿Qué valor del campo <code>state</code> lo representa?`,
    recurso: {
      tipo: "codigo", cap: "struct proc (Xv6) — extracto",
      contenido:
`enum procstate { UNUSED, EMBRYO, SLEEPING, RUNNABLE, RUNNING, ZOMBIE };

struct proc {
  uint sz;                 // tamaño de memoria del proceso
  pde_t* pgdir;            // tabla de páginas
  enum procstate state;    // estado del proceso
  int pid;                 // ID del proceso
  struct proc *parent;     // proceso padre
  struct context *context; // registros para el cambio de contexto
  int killed;              // si != 0, ha sido eliminado
  struct file *ofile[NOFILE]; // archivos abiertos
};`
    },
    opciones: [
      { t: "<code>ZOMBIE</code>", ok: true },
      { t: "<code>SLEEPING</code>", ok: false },
      { t: "<code>RUNNABLE</code>", ok: false },
      { t: "<code>UNUSED</code>", ok: false }
    ],
    explica: `<b>ZOMBIE</b>: el proceso terminó pero su entrada permanece en la tabla (esperando que el padre lea su código de salida con <code>wait()</code>). <code>SLEEPING</code> = bloqueado; <code>RUNNABLE</code> = listo; <code>UNUSED</code> = ranura libre.`,
    fuente: "C2 · PCB (struct proc)"
  },
  {
    id: "t2-06", tipo: "opcion", dificultad: "alta",
    enunciado: `¿Qué opción describe mejor el <b>procesamiento concurrente</b>?`,
    opciones: [
      { t: "Manejar varios procesos que se superponen en el tiempo aunque no corran a la vez.", ok: true },
      { t: "Ejecutar varios procesos exactamente a la vez sobre procesadores diferentes.", ok: false },
      { t: "Ejecutar varias tareas de forma secuencial dentro de un único hilo de control.", ok: false },
      { t: "Ejecutar un solo proceso de forma exclusiva para evitar todo conflicto de recursos.", ok: false }
    ],
    explica: `Concurrente = tareas que <b>progresan intercalándose</b> en el tiempo (pueden ser en 1 solo core). La opción «al mismo tiempo en procesadores diferentes» describe el <b>paralelismo</b>, que es un caso particular de concurrencia.`,
    fuente: "Examen 2025 P.I-6 · C2"
  },
  {
    id: "t2-07", tipo: "vf", dificultad: "alta", vf: true,
    enunciado: `Todo procesamiento <b>paralelo</b> es concurrente, pero no toda concurrencia es paralela.`,
    modelo: `Verdadero.`,
    explica: `<b>Verdadero.</b> El paralelismo (varias tareas <i>exactamente</i> a la vez en varios cores) es un <b>caso especial</b> de concurrencia. La concurrencia intercalada en 1 solo core no es paralela.`,
    fuente: "C2 · Concurrente vs paralelo"
  },
  {
    id: "t2-08", tipo: "opcion", dificultad: "alta",
    enunciado: `Un proceso transita muchísimas veces de «listo» a «ejecución» (ej. 100 000 veces) y también muchas veces de «bloqueado» a «listos» (ej. 100 000 veces). ¿Qué podemos afirmar de él?`,
    recurso: {
      tipo: "tabla", cap: "Comportamiento observado",
      contenido:
`<table><tr><th>Transición</th><th>Frecuencia</th></tr>
<tr><td>Listo → Ejecución</td><td>~100 000</td></tr>
<tr><td>Ejecución → Bloqueado</td><td>~100 000</td></tr>
<tr><td>Bloqueado → Listos</td><td>~100 000</td></tr></table>`
    },
    opciones: [
      { t: "Es un proceso con mucha E/S: hace ráfagas cortas y se bloquea seguido a esperar.", ok: true },
      { t: "Es un proceso con muchas operaciones aritméticas y lógicas, es decir CPU-bound.", ok: false },
      { t: "Es una tarea interna del sistema operativo que casi nunca cede su procesador.", ok: false },
      { t: "No se puede afirmar ningún comportamiento a partir de esas transiciones dadas.", ok: false }
    ],
    explica: `Bloquearse tantas veces indica que <b>constantemente pide E/S</b> → es <b>I/O-bound</b>. Un proceso CPU-bound casi no se bloquea (usa el CPU en ráfagas largas). El planificador debería <b>priorizarlo</b> cuando está listo, pues libera el CPU rápido.`,
    fuente: "Examen 2025 P.I-3 · C2"
  },
  {
    id: "t2-09", tipo: "abierta", dificultad: "trampa", enfoque: "real",
    enunciado: `¿Los programas con <b>múltiples hilos</b> son siempre más rápidos que los de un solo hilo? Justifica. (Estilo Examen 2022 P.II-2.)`,
    modelo: `<b>Depende</b> (no siempre).<br>
    <b>Sí mejoran</b> cuando la tarea es paralelizable y hay <b>varios núcleos</b>: los hilos avanzan en paralelo (concurrencia real).<br>
    <b>No mejoran (o van más lento)</b> cuando: (a) la tarea es intrínsecamente <b>secuencial</b>; (b) hay un <b>solo core</b> (los hilos se intercalan, no hay paralelismo real); (c) el <b>overhead</b> de crear hilos y <b>sincronizarlos</b> (locks, contención) supera la ganancia.<br>
    <b>Supuesto:</b> la respuesta óptima depende del tipo de carga y del hardware; hay que declararlo.`,
    claves: ["Responder DEPENDE, no 'sí siempre'", "Caso a favor: paralelizable + multicore", "Casos en contra: secuencial, 1 core, overhead de sincronización", "Declarar supuesto"],
    explica: `El profesor busca que NO caigas en el «siempre». La ganancia depende de paralelizabilidad, número de cores y overhead de sincronización.`,
    fuente: "Examen 2022 P.II-2 · C2"
  },
  {
    id: "t2-10", tipo: "vf", dificultad: "alta", vf: true,
    enunciado: `La <b>rutina de salida (terminación) de un hilo</b> suele ser más rápida que la de un proceso completo.`,
    modelo: `Verdadero.`,
    explica: `<b>Verdadero.</b> El hilo <b>comparte</b> el espacio de direcciones y los recursos del proceso, así que al terminar <b>no</b> hay que liberar toda la memoria ni hacer la limpieza exhaustiva que exige terminar un proceso. Por eso su salida es más ligera.`,
    fuente: "Examen 2024 P.II-2 · C2"
  },
  {
    id: "t2-11", tipo: "opcion", dificultad: "media",
    enunciado: `La <b>multiplexación en el ESPACIO</b> en el CPU se logra principalmente mediante…`,
    opciones: [
      { t: "Disponer de varios núcleos o procesadores que atienden procesos a la vez.", ok: true },
      { t: "Conmutar el contexto para dar diez milisegundos a cada proceso por turnos.", ok: false },
      { t: "Guardar en el disco los procesos inactivos mediante la técnica de swapping.", ok: false },
      { t: "Elevar la frecuencia del reloj del CPU para procesar más rápido cada tarea.", ok: false }
    ],
    explica: `Multiplexar en el <b>espacio</b> = repartir el recurso físico en pedazos usados <b>a la vez</b> (varios cores). Multiplexar en el <b>tiempo</b> = turnarse el mismo recurso (conmutación de contexto en CPU; swapping en RAM).`,
    fuente: "C2 · Multiplexación"
  },
  {
    id: "t2-12", tipo: "opcion", dificultad: "media",
    enunciado: `¿Qué es la <b>multiplexación en el TIEMPO</b> aplicada a la memoria RAM?`,
    opciones: [
      { t: "El swapping o memoria virtual: se manda un proceso al disco y se libera su RAM.", ok: true },
      { t: "Dividir la RAM en secciones fijas, una por proceso, usadas todas a la vez.", ok: false },
      { t: "Instalar más módulos de memoria física para ampliar la RAM disponible ya.", ok: false },
      { t: "Cifrar el contenido completo de la RAM para proteger los datos del usuario.", ok: false }
    ],
    explica: `En RAM, multiplexar en el <b>tiempo</b> = <b>swapping</b>: los procesos se turnan la memoria física (uno va a disco para que otro use la RAM). Dividir la RAM en secciones simultáneas es multiplexar en el <b>espacio</b>.`,
    fuente: "C2 · Multiplexación"
  },
  {
    id: "t2-13", tipo: "opcion", dificultad: "media",
    enunciado: `¿Cuál de estas es una operación de <b>administración de procesos</b> que puede realizar el SO?`,
    opciones: [
      { t: "Proveer sincronización y comunicación entre procesos y manejo de interbloqueos.", ok: true },
      { t: "Compilar el código fuente de los programas antes de ponerlos a ejecutarse ya.", ok: false },
      { t: "Diseñar la interfaz gráfica de cada una de las aplicaciones del usuario final.", ok: false },
      { t: "Fabricar los núcleos del procesador donde se ejecutarán luego los procesos.", ok: false }
    ],
    explica: `En administración de procesos el SO puede: crear/terminar procesos, suspender/reanudar, y proveer <b>sincronización, comunicación y manejo de interbloqueos</b>.`,
    fuente: "C2 · Administración de procesos"
  },
  {
    id: "t2-14", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `Dos procesos del <b>mismo programa</b> comparten automáticamente su espacio de direcciones (variables, heap, stack).`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> Cada <b>proceso</b> tiene su <b>propio</b> espacio de direcciones aislado (rol de referí). Lo que comparte memoria son los <b>hilos</b> de un mismo proceso, no dos procesos distintos aunque provengan del mismo programa.`,
    fuente: "C2 · Aislamiento de procesos"
  },
  {
    id: "t2-15", tipo: "opcion", dificultad: "alta",
    enunciado: `El <b>PCB</b> (Process Control Block) de Linux se implementa en la estructura…`,
    opciones: [
      { t: "<code>task_struct</code>, la estructura definida dentro del archivo linux/sched.h del kernel.", ok: true },
      { t: "<code>file_struct</code>, la estructura que describe la tabla de archivos abiertos del proceso.", ok: false },
      { t: "<code>page_table</code>, la estructura que guarda el mapeo de páginas de memoria del proceso.", ok: false },
      { t: "<code>inode</code>, la estructura que describe un archivo dentro del sistema de archivos ya.", ok: false }
    ],
    explica: `En Linux el PCB es <code>task_struct</code>; en Xv6 es <code>struct proc</code>. El conjunto de todos los PCB forma la <b>tabla de procesos</b>.`,
    fuente: "C2 · PCB"
  },
  {
    id: "t2-16", tipo: "abierta", dificultad: "alta", enfoque: "ideal",
    enunciado: `¿Qué contiene típicamente un <b>PCB</b> y por qué es imprescindible para el <b>cambio de contexto</b>?`,
    modelo: `El <b>PCB</b> guarda todo el estado de un proceso: <b>PID</b>, estado, prioridad, <b>contador de programa (PC)</b> y demás <b>registros del CPU</b>, información de contabilidad, punteros de memoria/tabla de páginas, lista de archivos abiertos e info de E/S.<br>
    Es imprescindible para el <b>cambio de contexto</b> porque, al quitarle el CPU a un proceso, el SO <b>guarda</b> sus registros y PC en su PCB; y al reanudarlo, los <b>restaura</b> desde ahí, de modo que continúe exactamente donde quedó. Sin PCB, el SO no podría reanudar el proceso.`,
    claves: ["Listar contenido: PID, estado, PC/registros, memoria, archivos", "Cambio de contexto = guardar y restaurar el estado desde el PCB", "Sin PCB el proceso no puede reanudarse"],
    fuente: "C2 · PCB / context switch"
  },
  {
    id: "t2-17", tipo: "opcion", dificultad: "alta",
    enunciado: `Si el <b>PCB</b> de un proceso se <b>corrompe</b>, la consecuencia más probable es…`,
    opciones: [
      { t: "El SO pierde el estado del proceso: no puede reanudarlo ni terminarlo bien.", ok: true },
      { t: "El proceso pasa a ejecutarse mucho más rápido al soltar parte de su estado.", ok: false },
      { t: "El SO libera de forma automática toda la memoria del sistema al detectarlo.", ok: false },
      { t: "No ocurre nada, porque el PCB es solo un dato informativo sin mayor efecto.", ok: false }
    ],
    explica: `El PCB es la <b>representación del proceso en el SO</b>. Si se corrompe, se pierde el estado/contexto y el SO no puede gestionarlo correctamente → inconsistencia grave o kernel panic.`,
    fuente: "C2 · What-if"
  },
  {
    id: "t2-18", tipo: "vf", dificultad: "media", vf: false,
    enunciado: `En el <b>procesamiento secuencial</b>, varias tareas progresan intercalándose en el tiempo dentro de un mismo CPU.`,
    modelo: `Falso: eso es concurrente.`,
    explica: `<b>Falso.</b> En <b>secuencial</b> una tarea <b>termina antes</b> de que empiece la siguiente. Lo que se intercala en el tiempo es la <b>concurrencia</b>.`,
    fuente: "C2 · Tipos de procesamiento"
  },
  {
    id: "t2-19", tipo: "abierta", dificultad: "alta", enfoque: "real",
    enunciado: `<b>Caso:</b> un laboratorio tiene 30 alumnos y solo 10 PCs; el resto espera turno. Explícalo usando <b>grado de multiprogramación</b> y <b>multiplexación en el tiempo</b>.`,
    modelo: `Las 10 PCs son el <b>recurso</b> (análogo a la RAM/CPU) y los 30 alumnos son los <b>procesos</b>. El <b>grado de multiprogramación</b> es cuántos pueden estar «cargados» y activos a la vez = <b>10</b>. Los otros 20 esperan en cola (estado <b>Listo</b>) y se van <b>turnando</b> las PCs: eso es <b>multiplexación en el tiempo</b>.<br>
    <b>Advertencia:</b> si se intenta rotar a demasiados alumnos muy rápido, se pierde tiempo en cada «cambio» (análogo al <b>thrashing</b>): más gestión que trabajo útil.`,
    claves: ["Mapear recurso=PCs, procesos=alumnos", "Grado de multiprogramación = cuántos activos a la vez", "Los que esperan = multiplexación en el tiempo (turnos)", "Riesgo de thrashing si se exagera"],
    fuente: "C2 · Caso (multiprogramación)"
  },
  {
    id: "t2-20", tipo: "opcion", dificultad: "media",
    enunciado: `Durante un <b>cambio de contexto</b>, ¿qué hace el SO?`,
    opciones: [
      { t: "Guarda el estado del proceso saliente en su PCB y carga el del proceso entrante.", ok: true },
      { t: "Elimina de la RAM al proceso saliente de forma permanente para liberar espacio.", ok: false },
      { t: "Recompila el código del proceso entrante antes de entregarle el uso del CPU.", ok: false },
      { t: "Duplica el proceso saliente para conservar una copia exacta de su estado ya.", ok: false }
    ],
    explica: `El cambio de contexto = <b>guardar</b> el contexto del proceso que sale y <b>restaurar</b> el del que entra, usando sus PCB. Tiene un costo (overhead) que hay que considerar en la planificación.`,
    fuente: "C2 · Cambio de contexto"
  },
  {
    id: "t2-21", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `Un proceso <b>zombie</b> sigue consumiendo tiempo de CPU mientras permanece en la tabla de procesos.`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> El zombie ya <b>terminó de ejecutarse</b>; NO consume CPU. Su único problema es ocupar una <b>entrada en la tabla de procesos</b> (un recurso limitado), no ciclos de CPU.`,
    fuente: "C2/C3 · Proceso zombie"
  }
]);
