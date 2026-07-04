/* TEMA 6 — Planificación del CPU (C5, C6) */
BANCO.add("t6", [
  {
    id: "t6-01", tipo: "abierta", dificultad: "trampa", enfoque: "real",
    enunciado: `Se te da un contexto y dos algoritmos: <b>SJF (Shortest Job First)</b> y <b>SRTF (Shortest Remaining Time First)</b>. Explica sus diferencias, ventajas y <b>cuál recomendarías</b> para un SO real. (¡La «pregunta cantadísima» del profesor!)`,
    modelo: `<b>Diferencia sustancial:</b> ambos se basan en el <b>tiempo de ejecución</b> del proceso; <b>SJF es NO apropiativo</b> (aunque llegue uno más corto, no expulsa al actual) y <b>SRTF es apropiativo</b> (si llega uno con menor tiempo restante, le quita el CPU al actual). SRTF además impide el efecto convoy; SJF no.<br>
    <b>¿Cuál recomiendo? → NINGUNO de los dos.</b> Ambos son <b>algoritmos teóricos/ideales</b>: requieren <b>conocer de antemano la duración</b> del proceso (un dato del <b>futuro</b>, imposible). Además es <b>fácil de burlar</b>: como en un banco, si dices que harás «una sola operación» te atienden primero, y luego haces 15 → el usuario miente sobre la duración. Sirven como <b>referencia óptima</b> (la matemática los modela), pero <b>no se pueden implementar</b> en un SO real.<br>
    En la práctica se usan <b>aproximaciones</b>: Round Robin o <b>colas multinivel realimentadas</b> que <b>estiman</b> el comportamiento sin depender de que el usuario declare la duración.`,
    claves: [
      "Diferencia: SJF no apropiativo, SRTF apropiativo",
      "Recomendar NINGUNO (trampa clave)",
      "Motivo: requieren conocer la duración futura (imposible y falsificable)",
      "Son ideales/teóricos; en la práctica se aproxima con RR o colas multinivel"
    ],
    explica: `Aquí falla casi todo el mundo respondiendo «SJF» o «SRTF». La respuesta que el profesor espera es <b>NINGUNO</b>: son teóricos porque dependen de saber el futuro y son fáciles de burlar.`,
    fuente: "1 · Transcripción del profesor · C5/C6"
  },
  {
    id: "t6-02", tipo: "opcion", dificultad: "trampa",
    enunciado: `¿Cuál es la <b>diferencia esencial</b> entre SJF y SRTF?`,
    opciones: [
      { t: "SJF es no apropiativo y SRTF es apropiativo: expulsa al actual si llega uno menor.", ok: true },
      { t: "SJF usa un quantum fijo por turno y SRTF trabaja del todo sin ningún quantum ya.", ok: false },
      { t: "SJF sirve para la memoria RAM y SRTF sirve solo para planificar el uso del CPU.", ok: false },
      { t: "SJF y SRTF no tienen ninguna diferencia real: son en verdad el mismo algoritmo.", ok: false }
    ],
    explica: `Ambos se basan en el tiempo de ejecución; la diferencia es la <b>apropiación</b>: SJF no interrumpe, SRTF sí (es la versión apropiativa de SJF).`,
    fuente: "C6 · SJF vs SRTF"
  },
  {
    id: "t6-03", tipo: "vf", dificultad: "trampa", vf: false,
    enunciado: `Para un SO real, lo mejor es implementar <b>SJF</b> porque garantiza el menor tiempo de espera promedio.`,
    modelo: `Falso: no se recomienda ninguno (SJF ni SRTF).`,
    explica: `<b>Falso.</b> Aunque SJF minimiza el tiempo de espera promedio en teoría, <b>no se puede implementar</b> en un SO real (requiere conocer la duración futura y es falsificable). La respuesta correcta es <b>NINGUNO</b>.`,
    fuente: "1 · C6"
  },
  {
    id: "t6-04", tipo: "opcion", dificultad: "alta",
    enunciado: `Tres procesos llegan en <b>t=0</b> con FCFS en el orden P1(24), P2(3), P3(3). Observa el Gantt. ¿Cuál es el <b>tiempo de espera promedio</b>?`,
    recurso: {
      tipo: "gantt", cap: "FCFS — orden de llegada P1, P2, P3",
      contenido:
`<div class="gantt">
<div class="blk" style="flex:24">P1 · 0–24</div>
<div class="blk" style="flex:3">P2 · 24–27</div>
<div class="blk" style="flex:3">P3 · 27–30</div></div>`
    },
    opciones: [
      { t: "El promedio de las esperas 0, 24 y 27, dividido entre tres, da un total de 17.", ok: true },
      { t: "El promedio de los finales 24, 27 y 30, dividido entre tres, da un total de 27.", ok: false },
      { t: "El promedio de los valores 0, 3 y 6, dividido entre tres, da un total de solo 3.", ok: false },
      { t: "El total de treinta unidades, dividido entre los tres procesos, da un total de 10.", ok: false }
    ],
    explica: `Tiempo de espera = instante en que empieza cada proceso: P1=0, P2=24, P3=27 → promedio = <b>17</b>. (Lo de 27 es el <b>turnaround</b> promedio.) Nota el <b>efecto convoy</b>: los cortos esperan al largo.`,
    fuente: "C6 · FCFS"
  },
  {
    id: "t6-05", tipo: "opcion", dificultad: "media",
    enunciado: `El <b>efecto convoy</b> consiste en…`,
    opciones: [
      { t: "Procesos cortos que se atascan detrás de un proceso largo que llegó primero ya.", ok: true },
      { t: "Muchos procesos que entran a la vez a la misma sección crítica y la corrompen.", ok: false },
      { t: "Un proceso que nunca llega a recibir el procesador y sufre de pura inanición ya.", ok: false },
      { t: "El intercambio excesivo de páginas entre la memoria RAM y el disco duro lento.", ok: false }
    ],
    explica: `Efecto convoy = un trabajo largo adelante hace esperar a todos los cortos → tiempo medio de espera enorme. FCFS y SJF (por ser no apropiativos) lo sufren; RR y SRTF lo impiden.`,
    fuente: "C6 · FCFS / SJF"
  },
  {
    id: "t6-06", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `FCFS puede provocar <b>inanición (starvation)</b> de algún proceso.`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> FCFS es justo por <b>orden de llegada</b>: todos ejecutan eventualmente. Su problema es el <b>efecto convoy</b> (espera alta), no la inanición. Quien sí causa inanición es SJF/SRTF y las prioridades sin aging.`,
    fuente: "C6 · FCFS"
  },
  {
    id: "t6-07", tipo: "vf", dificultad: "alta", vf: true,
    enunciado: `SJF puede causar <b>inanición</b>: un proceso largo podría no ejecutarse nunca si siguen llegando procesos cortos.`,
    modelo: `Verdadero.`,
    explica: `<b>Verdadero.</b> Cualquier política que <b>siempre favorezca una propiedad fija</b> (aquí, ser corto) conduce a inanición del que no la tiene (el largo). Se mitiga con <b>aging</b>.`,
    fuente: "C6 · SJF"
  },
  {
    id: "t6-08", tipo: "opcion", dificultad: "media",
    enunciado: `En planificación <b>apropiativa</b> vs <b>no apropiativa</b>, ¿qué caracteriza a la apropiativa?`,
    opciones: [
      { t: "El SO puede arrebatar el CPU a un proceso; su costo es el cambio de contexto.", ok: true },
      { t: "El CPU no se le quita nunca a un proceso una vez que ya le fue asignado a él.", ok: false },
      { t: "Solo puede funcionar con un único proceso a la vez dentro de todo el sistema.", ok: false },
      { t: "Elimina por completo la necesidad de que exista el despachador en el sistema.", ok: false }
    ],
    explica: `<b>Apropiativa</b> = el SO puede expulsar (preempt) al proceso. Ideal para tiempo compartido y buenos tiempos de respuesta, pero cada expulsión cuesta un <b>context switch</b>. SJF es no apropiativo; SRTF y RR son apropiativos.`,
    fuente: "C6 · Apropiativa vs no apropiativa"
  },
  {
    id: "t6-09", tipo: "abierta", dificultad: "alta", enfoque: "real",
    enunciado: `El SO puede usar <b>quantum igual</b> para todos los procesos o <b>quantum diferente</b> (ej. unos Q=200, otros Q=50). Da ventaja/desventaja de cada uno y di cuál recomiendas. (Examen 2024 P.II-2.)`,
    modelo: `<b>Quantum igual:</b> ventaja → fácil de implementar, menos overhead y menor complejidad del planificador. Desventaja → no considera la naturaleza de los procesos; los cortos/interactivos esperan tanto como los largos → uso ineficiente y mayor latencia.<br>
    <b>Quantum variable:</b> ventaja → se adapta (más quantum a procesos importantes/largos, menos a interactivos que necesitan respuesta rápida). Desventaja → más complejo: requiere criterios y mecanismos para decidir el quantum → más overhead de gestión.<br>
    <b>Recomendación:</b> <b>quantum variable</b>, porque se adapta mejor a cargas diversas y mejora los tiempos de respuesta en sistemas interactivos (móviles/PC). <b>Supuesto declarado:</b> priorizamos la interactividad.`,
    claves: ["Igual: simple, bajo overhead / no se adapta", "Variable: se adapta / más complejo y overhead", "Recomendar variable para interactividad", "Declarar el supuesto (priorizar interactividad)"],
    explica: `El profesor evalúa que compares ambos y <b>declares el supuesto</b> que sostiene tu recomendación.`,
    fuente: "Examen 2024 P.II-2 · C6"
  },
  {
    id: "t6-10", tipo: "opcion", dificultad: "alta",
    enunciado: `El visor <code>pidstat -wt 1</code> muestra un <b>nvcswch/s</b> muy alto para varios procesos. ¿Qué significa y qué diagnóstico es válido?`,
    recurso: {
      tipo: "comando", cap: "$ pidstat -wt 1  (extracto)",
      contenido:
`UID   TGID   TID   cswch/s   nvcswch/s   Command
1000  2011   -        3.00      512.00     app_a
1000  2044   -        1.00      498.00     app_b
1000  2101   -        0.00      530.00     app_c`
    },
    opciones: [
      { t: "Son cambios no voluntarios: hay demasiados procesos o el quantum es muy corto.", ok: true },
      { t: "Son cambios voluntarios por esperar E/S y se deben a que el disco está muy lento.", ok: false },
      { t: "Indican una fuerte fragmentación de la memoria por asignar bloques no contiguos.", ok: false },
      { t: "Indican que varios de esos procesos ya cayeron juntos en un deadlock permanente.", ok: false }
    ],
    explica: `<b>nvcswch</b> = cambios de contexto <b>involuntarios</b> (el SO expulsa al proceso, ej. por fin de quantum). Muy alto → competencia por CPU o quantum corto. Soluciones: <code>renice</code>, colas de prioridad, o aumentar el quantum. (Los <b>voluntarios</b> son <code>cswch</code>, típicos de I/O-bound.)`,
    fuente: "Examen 2022/2024 · C6"
  },
  {
    id: "t6-11", tipo: "opcion", dificultad: "alta",
    enunciado: `Un proceso muestra <b>cswch/s</b> (voluntarios) muy alto. ¿Cuál es el diagnóstico y solución más probable?`,
    opciones: [
      { t: "Espera mucho por E/S y cede el CPU; se ayuda con SSD y con E/S asíncrona ya.", ok: true },
      { t: "El quantum es demasiado corto y la solución es reducir todavía más el quantum.", ok: false },
      { t: "Hay demasiados procesos compitiendo a la vez por el uso del mismo procesador.", ok: false },
      { t: "El proceso está atrapado en un bucle infinito de puro cálculo que satura el CPU.", ok: false }
    ],
    explica: `<b>cswch</b> (voluntarios) alto → el proceso <b>cede</b> el CPU seguido para esperar disco/red (I/O-bound). Solución: acelerar la E/S (SSD, E/S asíncrona). Un bucle de cálculo daría <b>nvcswch</b> alto, no cswch.`,
    fuente: "Examen 2022/2024 · C6"
  },
  {
    id: "t6-12", tipo: "opcion", dificultad: "media",
    enunciado: `Con Round-Robin y quantum = 20, para P1=53, P2=8, P3=68, P4=24, ¿qué ventaja principal aporta RR frente a FCFS?`,
    opciones: [
      { t: "Da un tiempo de respuesta acotado y no sufre el efecto convoy como sí lo hace FCFS.", ok: true },
      { t: "Minimiza siempre el tiempo de finalización promedio de todos los procesos del sistema.", ok: false },
      { t: "Elimina por completo el cambio de contexto entre los procesos que se van turnando.", ok: false },
      { t: "Garantiza conocer de antemano la duración exacta de cada uno de los procesos ya.", ok: false }
    ],
    explica: `RR da <b>respuesta acotada</b> (cada proceso recibe pronto un turno) y evita el convoy. Su costo: hay que sumar el <b>cambio de contexto</b> y puede alargar los trabajos largos.`,
    fuente: "C6 · Round Robin"
  },
  {
    id: "t6-13", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `Un <b>quantum muy grande</b> en Round-Robin siempre mejora el sistema.`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> Un quantum muy grande reduce el overhead pero <b>degrada RR a FCFS</b> (pierde la ventaja del tiempo compartido y la interactividad). Uno muy pequeño causa demasiados cambios de contexto (overhead). Hay que <b>balancear</b>.`,
    fuente: "C6 · Round Robin / What-if"
  },
  {
    id: "t6-14", tipo: "opcion", dificultad: "media",
    enunciado: `¿Cuál de estos <b>NO</b> es un mecanismo del <b>despachador (dispatcher)</b>?`,
    opciones: [
      { t: "Inicializar el valor del quantum con un número mayor que cero antes de arrancar.", ok: true },
      { t: "Asignar el procesador al proceso que está primero en la cola de listos del SO.", ok: false },
      { t: "Interrumpir a un proceso en ejecución justo cuando su quantum llega a valer cero.", ok: false },
      { t: "Mantener activo el procesador mientras siga habiendo procesos en la cola de listos.", ok: false }
    ],
    explica: `Fijar el valor del quantum es <b>política</b> del planificador, no un <b>mecanismo</b> del despachador. El despachador ejecuta: asignar CPU, interrumpir por fin de quantum y mantener el CPU ocupado.`,
    fuente: "Examen 2013 P.I-6 · C6"
  },
  {
    id: "t6-15", tipo: "opcion", dificultad: "media",
    enunciado: `El <b>planificador de corto plazo (CPU scheduler)</b> recibe ese nombre porque…`,
    opciones: [
      { t: "Maneja la transición de listo a ejecución muy seguido y debe ser bien rápido.", ok: true },
      { t: "Planifica solamente aquellos trabajos que llegan a durar unos pocos segundos.", ok: false },
      { t: "Decide qué procesos entran a la memoria RAM desde el disco duro por swapping.", ok: false },
      { t: "Solo se ejecuta una vez, justo en el momento de arrancar el sistema operativo.", ok: false }
    ],
    explica: `«Corto plazo» = decide con mucha frecuencia y debe ser veloz (baja latencia). El de <b>largo plazo</b> controla la admisión (qué procesos entran al sistema); el de <b>mediano plazo</b> hace swapping.`,
    fuente: "Examen 2013 P.I-8 · C6"
  },
  {
    id: "t6-16", tipo: "opcion", dificultad: "alta",
    enunciado: `Dado el cronograma de un proceso <code>a b c d e f</code> (rojo = espera, verde = ejecución), ¿cómo se calcula el <b>tiempo de retorno (turnaround)</b>?`,
    recurso: {
      tipo: "codigo", cap: "Tramos del proceso",
      contenido:
`a  b  c  d  e  f
(a,c,e = espera ; b,d,f = ejecucion)`
    },
    opciones: [
      { t: "La suma de todos los tramos a, b, c, d, e y f, del lanzamiento hasta el fin.", ok: true },
      { t: "Solamente el primer tramo a, que es la primera espera antes de la ejecución.", ok: false },
      { t: "Solamente los tramos b, d y f, que son los tramos de ejecución del proceso.", ok: false },
      { t: "Solamente los tramos a, c y e, que son los tramos de espera del proceso ya.", ok: false }
    ],
    explica: `<b>Retorno = espera + ejecución (+ bloqueado)</b> = todos los tramos. Tiempo de <b>respuesta</b> = a (primera espera hasta la primera ejecución); tiempo de <b>espera</b> = a + c + e; tiempo de <b>ejecución</b> = b + d + f.`,
    fuente: "C6 · Métricas"
  },
  {
    id: "t6-17", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `El <b>tiempo de retorno (turnaround)</b> de un proceso puede ser <b>menor</b> que su tiempo de espera.`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> Retorno = espera + ejecución (+ E/S). Como la ejecución es ≥ 0, siempre <b>retorno ≥ espera</b>.`,
    fuente: "C6 · Métricas / Sí-No"
  },
  {
    id: "t6-18", tipo: "opcion", dificultad: "alta",
    enunciado: `Las <b>colas multinivel realimentadas</b> ajustan la prioridad de un proceso según su comportamiento. ¿Cómo aproximan a SJF sin conocer la duración?`,
    recurso: {
      tipo: "codigo", cap: "Jerarquía de colas",
      contenido:
`[ Tiempo real (prioridad +) ]
        | baja si consume mucho CPU
[ Quantum = 10 ]
        | baja
[ Quantum = 20 ]
        | baja
[ FCFS (prioridad -) ]
   ^ aging: sube el que espera mucho`
    },
    opciones: [
      { t: "Asumen que es corto y lo degradan si gasta mucho CPU; con aging suben al que espera.", ok: true },
      { t: "Le preguntan al usuario cuánto va a durar su proceso y así lo ordenan por duración.", ok: false },
      { t: "Ejecutan siempre en un estricto orden de llegada sin fijarse en el comportamiento.", ok: false },
      { t: "Asignan la prioridad de cada proceso de forma puramente aleatoria en cada turno.", ok: false }
    ],
    explica: `Miden el <b>comportamiento real</b>: quien consume mucho CPU <b>baja</b> de cola (menos prioridad/quantum), quien espera mucho <b>sube</b> por <b>aging</b>. Así logran algo <i>parecido</i> a SJF sin depender de lo que declare el usuario.`,
    fuente: "C6 · Colas multinivel realimentadas"
  },
  {
    id: "t6-19", tipo: "opcion", dificultad: "media",
    enunciado: `La <b>inanición (starvation)</b> con prioridades estáticas se combate con…`,
    opciones: [
      { t: "El envejecimiento o aging: sube la prioridad según lo que el proceso lleva esperando.", ok: true },
      { t: "Reducir la memoria RAM disponible para que compitan menos procesos por el CPU ya.", ok: false },
      { t: "Deshabilitar por completo el despachador para que ninguno tome ventaja sobre otro.", ok: false },
      { t: "Bajar la prioridad de aquellos procesos que ya llevan mucho tiempo esperando turno.", ok: false }
    ],
    explica: `El <b>aging</b> incrementa gradualmente la prioridad del que espera, garantizando que tarde o temprano ejecute. Sin aging, un proceso de baja prioridad puede esperar para siempre.`,
    fuente: "C6 · Prioridades / aging"
  },
  {
    id: "t6-20", tipo: "vf", dificultad: "media", vf: true,
    enunciado: `Las <b>prioridades dinámicas</b> evitan la inanición <b>solo si</b> implementan una política de envejecimiento (aging).`,
    modelo: `Verdadero (depende del aging).`,
    explica: `<b>Verdadero.</b> Ser «dinámicas» no basta: si no suben la prioridad del que espera (aging), un proceso de baja prioridad aún podría no ejecutarse nunca.`,
    fuente: "C6 · Sí/No/Depende"
  },
  {
    id: "t6-21", tipo: "opcion", dificultad: "media",
    enunciado: `La planificación por <b>lotería</b> se caracteriza por…`,
    opciones: [
      { t: "Reparte billetes entre los procesos y sortea uno al azar; los importantes reciben más.", ok: true },
      { t: "Ejecuta siempre primero el proceso más corto cuya duración ya se conoce de antemano.", ok: false },
      { t: "Reparte el uso del procesador por un estricto orden de llegada de cada proceso ya.", ok: false },
      { t: "No interrumpe jamás a un proceso que ya se encuentra en ejecución sobre el CPU ya.", ok: false }
    ],
    explica: `Lotería = <b>aleatoria</b>: cada proceso tiene billetes; se sortea uno. Más billetes = más probabilidad. Procesos cooperantes pueden cederse billetes (un cliente al servidor).`,
    fuente: "C6 · Lotería"
  },
  {
    id: "t6-22", tipo: "abierta", dificultad: "alta", enfoque: "mixto",
    enunciado: `El profesor dice que SJF/SRTF «no se pueden implementar», pero los libros los enseñan y hay sistemas que «estiman» la ráfaga. ¿Cómo reconcilias ambas cosas? ¿Qué hace un SO real en lugar de SJF puro?`,
    modelo: `No hay contradicción. SJF/SRTF <b>puros</b> son inalcanzables porque requieren el dato <b>exacto del futuro</b>. Los SO reales <b>aproximan</b> la ráfaga con una <b>media exponencial del historial</b> (τₙ₊₁ = α·tₙ + (1−α)·τₙ): predicen la próxima ráfaga según las anteriores. Pero eso es una <b>estimación</b>, no el valor real.<br>
    Además, para evitar inanición y el «mentir», usan <b>colas multinivel realimentadas</b>: asumen que el proceso es corto (alta prioridad) y lo <b>degradan</b> si consume mucho. Así obtienen un comportamiento <i>parecido</i> a SJF sin pedirle al usuario que declare la duración. La afirmación del profesor apunta a que <b>no puedes implementar el algoritmo tal cual</b>; las aproximaciones sí existen.`,
    claves: ["SJF puro requiere el futuro exacto → inalcanzable", "SO reales estiman con media exponencial del historial", "Es estimación, no valor real", "Colas multinivel realimentadas aproximan sin preguntar al usuario"],
    explica: `Se distingue el algoritmo <b>ideal</b> (teórico) de la <b>aproximación</b> real (estimación por historial).`,
    fuente: "C6 · Análisis (SJF real vs ideal)"
  },
  {
    id: "t6-23", tipo: "opcion", dificultad: "media",
    enunciado: `<b>Caso:</b> un servidor web recibe miles de peticiones simultáneas y los usuarios necesitan respuesta rápida. ¿Qué algoritmo conviene y qué cuidado con el quantum?`,
    opciones: [
      { t: "Round-Robin con buen quantum: da respuesta acotada; cuidar que no sea chico ni grande.", ok: true },
      { t: "FCFS, porque es el más justo al atender por estricto orden de llegada de cada uno.", ok: false },
      { t: "SJF, porque conocemos de antemano y con exactitud cuánto va a durar cada petición.", ok: false },
      { t: "Un solo proceso a la vez sobre el CPU para evitar todo conflicto entre peticiones.", ok: false }
    ],
    explica: `Para interactividad masiva, <b>RR</b> garantiza tiempo de respuesta acotado. El quantum es la palanca: muy chico = mucho context switch; muy grande = se vuelve FCFS.`,
    fuente: "C6 · Caso (servidor web)"
  },
  {
    id: "t6-24", tipo: "vf", dificultad: "media", vf: true,
    enunciado: `Un cambio de contexto <b>voluntario</b> (cswch) típico ocurre cuando el proceso pasa de <b>ejecución a bloqueado</b> por E/S; uno <b>involuntario</b> (nvcswch), cuando el SO lo pasa de <b>ejecución a listo</b> al agotarse el quantum.`,
    modelo: `Verdadero.`,
    explica: `<b>Verdadero.</b> Voluntario = el proceso cede el CPU por sí mismo (espera E/S, termina). Involuntario = el SO se lo arrebata (fin de quantum, llega uno de mayor prioridad).`,
    fuente: "C6 · cswch / nvcswch"
  }
]);
