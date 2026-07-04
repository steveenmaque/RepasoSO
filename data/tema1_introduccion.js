/* TEMA 1 — Introducción a los Sistemas Operativos (C1) */
BANCO.add("t1", [
  {
    id: "t1-01", tipo: "opcion", dificultad: "media",
    enunciado: `¿Qué tienen en común una laptop, un smartwatch, un auto Tesla y una bombilla inteligente, que justifica estudiarlos juntos en este curso?`,
    opciones: [
      { t: "Todos ejecutan un sistema operativo que gestiona su hardware y da servicios.", ok: true },
      { t: "Todos usan la misma arquitectura de procesador x86 en su hardware interno.", ok: false },
      { t: "Todos se conectan de forma obligatoria a Internet mediante su hardware.", ok: false },
      { t: "Todos integran una pantalla y un teclado físicos dentro de su hardware.", ok: false }
    ],
    explica: `El hilo conductor es que <b>todos tienen un SO</b> (de escritorio, embebido o de tiempo real). La <b>Ley de Bell</b> describe cómo cada ~10 años aparece una nueva clase de dispositivos, cada una con su propio SO.`,
    fuente: "C1 · Introducción"
  },
  {
    id: "t1-02", tipo: "multiple", dificultad: "alta",
    enunciado: `Un SO desempeña <b>tres roles simultáneos</b>. Selecciona las afirmaciones que describen correctamente uno de esos roles.`,
    opciones: [
      { t: "Ilusionista: da a cada proceso la ilusión de tener su CPU y su memoria.", ok: true },
      { t: "Referí: gestiona y asigna recursos, aísla procesos y protege al propio SO.", ok: true },
      { t: "Pegamento: provee servicios comunes de E/S, interfaz y bibliotecas a las apps.", ok: true },
      { t: "Compilador: traduce el código fuente de los programas a lenguaje de máquina.", ok: false }
    ],
    explica: `Los tres roles son <b>ilusionista</b>, <b>referí</b> y <b>pegamento</b>, y se ejercen a la vez. Compilar no es rol del SO (lo hace el compilador, una herramienta aparte).`,
    fuente: "C1 · Roles del SO"
  },
  {
    id: "t1-03", tipo: "abierta", dificultad: "alta", enfoque: "ideal",
    enunciado: `Considerando que el SO administra los <b>drivers</b> del sistema, defina <b>2 políticas</b> y para cada una <b>2 mecanismos</b> que las implementen. (Pregunta estilo Examen 2022 P.II-1.)`,
    modelo: `Una <b>política</b> es la regla de decisión (el <i>QUÉ</i> se hace); un <b>mecanismo</b> es el método de bajo nivel que la implementa (el <i>CÓMO</i>).<br>
    <b>Política 1 — Compatibilidad con el SO:</b> mecanismo (a) reconocer si el driver es compatible y asignar recursos para su instalación; mecanismo (b) reconocer y asignar los recursos necesarios para ejecutarlo.<br>
    <b>Política 2 — Actualización de drivers:</b> mecanismo (a) buscar automáticamente actualizaciones; mecanismo (b) verificar la compatibilidad de la actualización antes de aplicarla.`,
    claves: [
      "Distinguir claramente política (QUÉ/regla) de mecanismo (CÓMO/método).",
      "Cada política debe traer exactamente 2 mecanismos concretos.",
      "Analogía válida: política = 'frenar en luz roja'; mecanismo = 'el pedal de freno'."
    ],
    explica: `El profesor evalúa que NO confundas política con mecanismo. Una misma política puede implementarse con distintos mecanismos.`,
    fuente: "Examen 2022 P.II-1 · C1"
  },
  {
    id: "t1-04", tipo: "opcion", dificultad: "trampa",
    enunciado: `En la separación <b>política / mecanismo</b>, la frase «me detengo cuando veo la luz <b>roja</b> del semáforo» corresponde a…`,
    opciones: [
      { t: "Una política, porque es la regla de decisión, es decir el qué se hace.", ok: true },
      { t: "Un mecanismo, porque es el método de bajo nivel, es decir el cómo se hace.", ok: false },
      { t: "Las dos a la vez, porque política y mecanismo son en realidad sinónimos.", ok: false },
      { t: "Ninguna, porque es un asunto del hardware y no del sistema operativo.", ok: false }
    ],
    explica: `«Detenerme ante la luz roja» es la <b>regla</b> (política, el QUÉ). El <b>mecanismo</b> sería «el pedal de freno» (el CÓMO). Es la analogía exacta del profesor.`,
    fuente: "C1 · Políticas vs Mecanismos"
  },
  {
    id: "t1-05", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `Un proceso en <b>modo usuario</b> puede ejecutar directamente instrucciones privilegiadas (como acceder al disco o reprogramar el hardware) sin intervención del kernel.`,
    modelo: `Falso. El código de usuario es <b>no confiable</b> y tiene las operaciones peligrosas <b>deshabilitadas</b>.`,
    explica: `<b>Falso.</b> En modo usuario (mode bit = 1) las operaciones peligrosas están deshabilitadas. Para algo privilegiado, el proceso invoca una <b>system call</b> que dispara un <b>TRAP</b> (mode bit := 0 → kernel); el SO ejecuta la operación y retorna (mode bit := 1). Esa puerta controlada es lo que hace seguro al sistema.`,
    fuente: "C1 · Modo usuario / kernel"
  },
  {
    id: "t1-06", tipo: "opcion", dificultad: "alta",
    enunciado: `Un proceso de usuario necesita leer un archivo del disco. Observa la traza. ¿Qué mecanismo permite pasar del código de usuario al del kernel de forma segura?`,
    recurso: {
      tipo: "codigo", cap: "Secuencia de transición",
      contenido:
`Proceso usuario  (mode bit = 1, NO confiable)
   |  ejecuta operaciones normales
   |  necesita leer disco  -> NO puede hacerlo él mismo
   v
   read()  ==> system call  ==>  [ TRAP ]  (mode bit := 0)
                                    |
                                Kernel (confiable) ejecuta la E/S privilegiada
                                    |
                                 return  (mode bit := 1)
   v
Proceso usuario continúa`
    },
    opciones: [
      { t: "El TRAP de la system call, que pone el mode bit en 0 y al volver lo restaura.", ok: true },
      { t: "Una interrupción de hardware que el teclado genera y pone el mode bit en 0.", ok: false },
      { t: "El propio proceso, que pone el mode bit en 0 por su cuenta cuando lo necesita.", ok: false },
      { t: "El compilador, que inserta las instrucciones privilegiadas dentro del binario.", ok: false }
    ],
    explica: `La única puerta usuario→kernel es la <b>system call</b>, que provoca un <b>TRAP</b> (interrupción software). El proceso NO puede cambiar el mode bit por su cuenta: si pudiera, no habría seguridad.`,
    fuente: "C1 · System calls / TRAP"
  },
  {
    id: "t1-07", tipo: "multiple", dificultad: "media",
    enunciado: `Señala los <b>criterios de evaluación de un SO</b> vistos en el curso.`,
    opciones: [
      { t: "Performance: bajo overhead, equidad, tiempo de respuesta y throughput.", ok: true },
      { t: "Seguridad: reducir al mínimo la vulnerabilidad frente a los ataques.", ok: true },
      { t: "Portabilidad: la abstracción no cambia aunque cambie el hardware debajo.", ok: true },
      { t: "Fiabilidad y disponibilidad del sistema a lo largo del tiempo de uso.", ok: true },
      { t: "Cantidad de líneas de código que tiene el kernel del sistema operativo.", ok: false }
    ],
    explica: `Los criterios son <b>performance, seguridad, portabilidad, fiabilidad y disponibilidad</b>. El tamaño del código no es un criterio de calidad en sí.`,
    fuente: "C1 · Criterios de evaluación"
  },
  {
    id: "t1-08", tipo: "opcion", dificultad: "media",
    enunciado: `Según la máquina de <b>Von Neumann</b>, ¿cuáles son los tres buses que conectan CPU, memoria y E/S?`,
    opciones: [
      { t: "Bus de datos, bus de direcciones y bus de control entre CPU, RAM y E/S.", ok: true },
      { t: "Bus de entrada, bus de salida y bus de reloj entre la CPU, RAM y E/S.", ok: false },
      { t: "Bus PCI, bus USB y bus SATA que conectan la CPU, la RAM y la E/S.", ok: false },
      { t: "Bus de la ALU, bus de la CU y bus de la RAM que unen CPU, RAM y E/S.", ok: false }
    ],
    explica: `La arquitectura de Von Neumann conecta CPU (ALU + Unidad de Control), RAM y E/S mediante los buses de <b>datos, direcciones y control</b>.`,
    fuente: "C1 · Von Neumann"
  },
  {
    id: "t1-09", tipo: "vf", dificultad: "media", vf: true,
    enunciado: `Se dice que un SO moderno es <b>multiusuario, de tiempo compartido y multiprogramado</b>.`,
    modelo: `Verdadero: son características típicas de un SO moderno.`,
    explica: `<b>Verdadero.</b> Multiusuario (varios usuarios), tiempo compartido (reparte el CPU por turnos/quantum) y multiprogramado (varios procesos en memoria a la vez).`,
    fuente: "C1 · Características del SO"
  },
  {
    id: "t1-10", tipo: "opcion", dificultad: "alta",
    enunciado: `El SO que <b>introdujo el uso del quantum</b> para repartir el procesador entre procesos se conoce como sistema de…`,
    opciones: [
      { t: "Tiempo compartido, que reparte el CPU dando un quantum a cada proceso.", ok: true },
      { t: "Tiempo real, que reparte el CPU dando un plazo estricto a cada proceso.", ok: false },
      { t: "Por lotes, que reparte el CPU agrupando los procesos en tandas grandes.", ok: false },
      { t: "Monoprogramado, que da todo el CPU a un único proceso hasta que termina.", ok: false }
    ],
    explica: `El <b>tiempo compartido</b> reparte el CPU asignando un <b>quantum</b> a cada proceso y conmutando entre ellos, dando la ilusión de simultaneidad.`,
    fuente: "Examen 2013 P.I-2 · C1"
  },
  {
    id: "t1-11", tipo: "abierta", dificultad: "alta", enfoque: "mixto",
    enunciado: `¿Qué caracteriza a un <b>SO de tiempo real</b> y en qué se diferencia de un <b>SO de red</b>? Da al menos 2 diferencias. (Estilo Examen 2013 P.II-1.)`,
    modelo: `<b>SO de tiempo real:</b> garantiza una respuesta dentro de un <b>plazo (deadline) estricto y predecible</b>, con planificación <b>determinista</b>. Se usa en control industrial, médico y automotriz. Puede ser <i>hard</i> (deadline inviolable) o <i>soft</i> (tolera retrasos ocasionales).<br>
    <b>2 diferencias con el SO de red:</b><br>
    1) <b>Objetivo:</b> el de tiempo real prioriza el <b>cumplimiento de plazos</b>; el de red prioriza <b>compartir recursos</b> (archivos, impresoras) entre máquinas conectadas.<br>
    2) <b>Determinismo:</b> el de tiempo real es <b>predecible</b> (latencia acotada); el de red está sujeto a la <b>latencia variable</b> de la red.`,
    claves: ["Deadline/plazo estricto y determinismo", "Distinguir objetivo: plazos vs compartir recursos", "Mencionar hard vs soft real-time suma"],
    explica: `La clave es el <b>determinismo y el plazo</b>: en tiempo real, llegar tarde es un fallo aunque el resultado sea correcto.`,
    fuente: "Examen 2013 P.II-1 · C1"
  },
  {
    id: "t1-12", tipo: "opcion", dificultad: "alta",
    enunciado: `Un proceso ejecuta una instrucción que produce una <b>división entre 0</b>. ¿Qué ocurre?`,
    opciones: [
      { t: "Se genera una excepción (trap) y el sistema operativo finaliza el proceso.", ok: true },
      { t: "Se genera una interrupción de hardware del teclado y el proceso continúa.", ok: false },
      { t: "El CPU ignora la operación y sigue con la instrucción siguiente del proceso.", ok: false },
      { t: "Se reinicia por completo el sistema operativo y se pierden todos los datos.", ok: false }
    ],
    explica: `La división por cero es una <b>excepción (interrupción software / síncrona)</b> generada por el propio proceso. El SO la <b>atrapa</b> y termina el proceso. Es distinta de una interrupción de hardware (asíncrona, externa).`,
    fuente: "Examen 2013 P.I-1 · C1"
  },
  {
    id: "t1-13", tipo: "abierta", dificultad: "media", enfoque: "ideal",
    enunciado: `¿Qué es una <b>interrupción</b> y cuáles son sus 2 tipos principales? (Estilo Examen 2013 P.II-3.)`,
    modelo: `<b>Interrupción:</b> señal que detiene temporalmente la ejecución normal del CPU para atender un evento; se guarda el contexto y se salta a una rutina de servicio (ISR).<br>
    <b>Tipos:</b><br>
    1) <b>Hardware (externa/asíncrona):</b> generada por un dispositivo externo (teclado, disco, reloj). Puede ocurrir en cualquier momento.<br>
    2) <b>Software (interna/síncrona) o excepción/trap:</b> generada por el propio proceso al ejecutar una instrucción (división por 0, system call, fallo de página). Está ligada a la instrucción.`,
    claves: ["Definir interrupción (detener + guardar contexto + ISR)", "Hardware = asíncrona/externa", "Software = síncrona/interna (trap/excepción)"],
    fuente: "Examen 2013 P.II-3 · C1"
  },
  {
    id: "t1-14", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `Si falla un programa en <b>modo usuario</b>, todo el sistema operativo colapsa (kernel panic).`,
    modelo: `Falso: el SO aísla al proceso; solo ese proceso muere.`,
    explica: `<b>Falso.</b> El SO (rol de <b>referí</b>) aísla los procesos: si falla uno en modo usuario, solo ese muere. El colapso total (kernel panic / BSOD) ocurre si falla código en <b>modo kernel</b>.`,
    fuente: "C1 · What-if"
  },
  {
    id: "t1-15", tipo: "opcion", dificultad: "alta",
    enunciado: `¿Por qué el núcleo (kernel) <b>limita los derechos</b> del código de usuario?`,
    opciones: [
      { t: "Para mantener la funcionalidad, preservar el control y el buen desempeño.", ok: true },
      { t: "Para reducir el consumo eléctrico del CPU y alargar la vida de la batería.", ok: false },
      { t: "Porque el hardware no admite ejecutar más de un proceso al mismo tiempo.", ok: false },
      { t: "Para ahorrar espacio en el disco duro y guardar más archivos del usuario.", ok: false }
    ],
    explica: `El kernel restringe al usuario para <b>mantener la funcionalidad, preservar el control y el desempeño</b>: evita que un programa monopolice el CPU, dañe el HW o lea memoria ajena.`,
    fuente: "C1 · Modo kernel"
  },
  {
    id: "t1-16", tipo: "vf", dificultad: "media", vf: true,
    enunciado: `La <b>disponibilidad</b> de un SO se relaciona con el tiempo medio hasta la falla más el tiempo medio hasta la reparación.`,
    modelo: `Verdadero.`,
    explica: `<b>Verdadero.</b> Disponibilidad ≈ MTTF (tiempo medio hasta la falla) + MTTR (tiempo medio hasta la reparación): mide cuánto tiempo el sistema está operativo y disponible.`,
    fuente: "C1 · Criterios"
  },
  {
    id: "t1-17", tipo: "opcion", dificultad: "media",
    enunciado: `La <b>Ley de Bell</b> afirma que…`,
    opciones: [
      { t: "Surge una nueva clase de computadoras, con su SO, casi cada diez años.", ok: true },
      { t: "La velocidad del CPU se duplica más o menos cada dieciocho meses de avance.", ok: false },
      { t: "El costo de la memoria se reduce a la mitad más o menos cada año que pasa.", ok: false },
      { t: "El número de usuarios de un SO crece de forma exponencial con los años.", ok: false }
    ],
    explica: `Ley de <b>Bell</b>: cada ~10 años surge una nueva clase de dispositivos (mainframe → mini → PC → móvil → IoT…), cada una con su SO. (No confundir con la <b>Ley de Moore</b>, que trata del número de transistores/rendimiento del CPU.)`,
    fuente: "C1 · Ley de Bell"
  },
  {
    id: "t1-18", tipo: "abierta", dificultad: "alta", enfoque: "real",
    enunciado: `<b>Caso:</b> un programa de usuario intenta <b>formatear el disco</b> directamente. Explica técnicamente qué debe ocurrir para que la operación se realice sin comprometer la seguridad del sistema.`,
    modelo: `Un programa corre en <b>modo usuario</b> y NO puede tocar el hardware directamente. Para formatear <b>debe pedírselo al SO</b> mediante una <b>system call</b>, que dispara un <b>TRAP</b> a <b>modo kernel</b>. Ahí el SO valida permisos (¿el usuario tiene privilegios?) y solo entonces ejecuta la operación privilegiada. Así se evita que cualquier aplicación dañe el hardware o afecte a otros procesos sin control.`,
    claves: ["Modo usuario no puede tocar HW directamente", "System call → TRAP → modo kernel", "El SO valida permisos antes de ejecutar (rol de referí)"],
    explica: `El punto que el profesor busca: la operación privilegiada pasa por la <b>puerta controlada</b> de la syscall, con validación de permisos en el kernel.`,
    fuente: "C1 · Modo usuario/kernel (caso)"
  },
  {
    id: "t1-19", tipo: "opcion", dificultad: "alta",
    enunciado: `Un SO como <b>ilusionista</b> hace creer a cada proceso que tiene la máquina para él solo. Si este rol <b>fallara</b>, ¿qué consecuencia directa habría?`,
    opciones: [
      { t: "Los programas tendrían que conocer el hardware exacto y no serían portables.", ok: true },
      { t: "La velocidad de ejecución de cada proceso se duplicaría de forma automática.", ok: false },
      { t: "El disco duro se llenaría poco a poco de procesos zombie sin recogerse nunca.", ok: false },
      { t: "Todos los procesos entrarían a la vez a la misma sección crítica compartida.", ok: false }
    ],
    explica: `El ilusionista <b>abstrae el hardware</b>. Sin esa abstracción, cada programa tendría que programarse para el HW específico → se pierde la <b>portabilidad</b>. (La entrada simultánea a la sección crítica es un problema de sincronización, no de este rol.)`,
    fuente: "C1 · What-if roles"
  },
  {
    id: "t1-20", tipo: "vf", dificultad: "trampa", vf: false,
    enunciado: `El SO es un único programa monolítico; no tiene sentido hablar de «componentes» ni de «servicios» por separado.`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> El SO se descompone conceptualmente en <b>componentes</b> (lo que administra: procesos, memoria, E/S, archivos, red, seguridad) y <b>servicios</b> (de sistema y de usuario). Que su implementación sea monolítica o por microkernel es otra discusión; conceptualmente sí se separa.`,
    fuente: "C1/C2 · Descomposición del SO"
  },
  {
    id: "t1-21", tipo: "opcion", dificultad: "media",
    enunciado: `La analogía base del curso compara al SO con un <b>sistema de bancos</b>. ¿Qué idea central transmite esa analogía?`,
    opciones: [
      { t: "Atiende a muchos procesos con recursos limitados sin corromper sus datos.", ok: true },
      { t: "Cobra una comisión en dinero por cada operación que ejecuta el usuario.", ok: false },
      { t: "Obliga a los procesos a hacer una fila física para poder usar el CPU.", ok: false },
      { t: "Guarda todos los archivos del usuario dentro de una bóveda bien cifrada.", ok: false }
    ],
    explica: `Como un banco, el SO <b>gestiona recursos limitados</b> para <b>muchos clientes (procesos)</b> a la vez, manteniendo la <b>integridad</b> de los datos (nadie ve ni corrompe la cuenta de otro). Refuerza los roles de referí e ilusionista.`,
    fuente: "C1 · Analogía del banco"
  },
  {
    id: "t1-22", tipo: "abierta", dificultad: "alta", enfoque: "mixto",
    enunciado: `Explica la diferencia entre <b>performance</b> y <b>fiabilidad</b> como criterios de un SO, y da un ejemplo donde <b>mejorar uno perjudique al otro</b>.`,
    modelo: `<b>Performance</b> = eficiencia de la abstracción (bajo overhead, buen throughput, buenos tiempos de respuesta). <b>Fiabilidad</b> = el sistema hace lo que se supone que debe hacer, de forma consistente.<br>
    <b>Trade-off (ejemplo):</b> añadir verificaciones de integridad, journaling del sistema de archivos o chequeos de seguridad <b>mejora la fiabilidad</b> pero <b>reduce la performance</b> (cada operación cuesta más). A la inversa, desactivar esas comprobaciones acelera el sistema pero lo hace más frágil ante fallos.<br>
    <b>Supuesto declarado:</b> asumo un servidor donde la integridad de datos importa más que la latencia mínima.`,
    claves: ["Definir cada criterio correctamente", "Mostrar un trade-off real (verificaciones vs velocidad)", "Declarar el supuesto explícitamente"],
    explica: `El profesor premia que reconozcas <b>trade-offs</b> y declares supuestos. No hay respuesta única: depende del contexto.`,
    fuente: "C1 · Criterios (análisis)"
  }
]);
