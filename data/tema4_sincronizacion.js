/* TEMA 4 — Sincronización de Procesos (C3) */
BANCO.add("t4", [
  {
    id: "t4-01", tipo: "opcion", dificultad: "media",
    enunciado: `¿Cuál es el <b>principal objetivo</b> de la sincronización de procesos en un SO?`,
    opciones: [
      { t: "Evitar condiciones de carrera y ordenar el acceso a los recursos compartidos.", ok: true },
      { t: "Permitir que muchos procesos accedan a la vez a un recurso sin ningún control.", ok: false },
      { t: "Aumentar la velocidad del procesador mediante la ejecución en paralelo de todo.", ok: false },
      { t: "Reducir el tamaño de memoria que usan los procesos concurrentes del sistema.", ok: false }
    ],
    explica: `Sincronizar = coordinar el acceso concurrente a datos compartidos para <b>evitar race conditions</b> y garantizar consistencia. NO es dar acceso libre (eso causa el problema).`,
    fuente: "Examen 2025 P.I-2 · C3"
  },
  {
    id: "t4-02", tipo: "opcion", dificultad: "alta",
    enunciado: `Observa el intercalado sobre una cuenta bancaria (saldo inicial = 1000). ¿Qué problema ilustra y cuál sería el saldo <b>correcto</b>?`,
    recurso: {
      tipo: "codigo", cap: "Intercalado Depósito(+500) / Retiro(-200)",
      contenido:
`Saldo inicial = 1000
t1: Deposito  lee Saldo = 1000
t3: Retiro    lee Saldo = 1000      <- lee ANTES de que Deposito escriba
t2: Deposito  calcula 1000 + 500 = 1500
t4: Retiro    calcula 1000 - 200 = 800
t5: Retiro    escribe -> Saldo = 800
t6: Deposito  escribe -> Saldo = 1500   <- se perdio el retiro`
    },
    opciones: [
      { t: "Una condición de carrera (race condition); el saldo correcto sería de 1300.", ok: true },
      { t: "Un abrazo mortal entre los dos procesos; el saldo correcto sería de 800.", ok: false },
      { t: "Una fragmentación de la memoria RAM; el saldo correcto sería de 1500.", ok: false },
      { t: "Una inanición del proceso de retiro; el saldo correcto sería de 1000.", ok: false }
    ],
    explica: `Es una <b>race condition</b>: ambos leen 1000 antes de que el otro escriba. El correcto es 1000 + 500 − 200 = <b>1300</b>; el resultado erróneo (1500) «pierde» el retiro. Se soluciona haciendo <b>atómico</b> el bloque leer-modificar-escribir.`,
    fuente: "C3 · Ejemplo bancario"
  },
  {
    id: "t4-03", tipo: "abierta", dificultad: "alta", enfoque: "real",
    enunciado: `En el ejemplo bancario de retiro/depósito, ¿<b>bastaría</b> con ejecutar las operaciones «más rápido» para evitar la inconsistencia? Justifica.`,
    modelo: `<b>No.</b> Una de las condiciones de una solución correcta es que <b>no se puede asumir la velocidad relativa de los procesos</b>. Por más rápido que sea, siempre existe un <b>intercalado posible</b> donde dos procesos leen el mismo valor antes de escribir. La race condition es un problema de <b>atomicidad</b>, no de velocidad: se necesita que «leer-modificar-escribir» sea <b>indivisible</b> (exclusión mutua con semáforo/lock), no simplemente veloz.`,
    claves: ["Responder NO", "El problema es de atomicidad, no de velocidad", "Siempre hay un intercalado malo posible", "Solución: exclusión mutua (semáforo/lock), bloque indivisible"],
    explica: `El profesor desmonta la falacia de «hacerlo más rápido». La solución es <b>atomicidad</b>, no velocidad.`,
    fuente: "C3 · Análisis (atomicidad)"
  },
  {
    id: "t4-04", tipo: "opcion", dificultad: "media",
    enunciado: `Una <b>sección crítica</b> es…`,
    opciones: [
      { t: "La parte del código donde el proceso accede a un recurso que es compartido.", ok: true },
      { t: "La parte del código que se ejecuta al arrancar el sistema operativo entero.", ok: false },
      { t: "La parte del kernel que se encarga de gestionar y atender las interrupciones.", ok: false },
      { t: "La parte de la memoria RAM donde vive cargado el proceso mientras se ejecuta.", ok: false }
    ],
    explica: `Sección crítica = código que <b>accede a un recurso compartido</b>. Debe protegerse con protocolos de entrada/salida (ej. P/V) para lograr exclusión mutua.`,
    fuente: "C3 · Sección crítica"
  },
  {
    id: "t4-05", tipo: "multiple", dificultad: "alta",
    enunciado: `¿Cuáles son <b>condiciones obligatorias</b> que debe cumplir una solución al problema de la sección crítica? (Examen 2013 P.II-4.)`,
    opciones: [
      { t: "Exclusión mutua: si un proceso está en su sección crítica, ningún otro entra.", ok: true },
      { t: "No bloqueo externo: un proceso fuera de su sección crítica no bloquea a otros.", ok: true },
      { t: "Espera acotada: ningún proceso aguarda un tiempo arbitrariamente grande ya.", ok: true },
      { t: "Sin suponer velocidad: no se asume la rapidez relativa entre los procesos.", ok: true },
      { t: "Prioridad fija: siempre entra primero el proceso que tenga mayor prioridad.", ok: false }
    ],
    explica: `Las 4 condiciones son: exclusión mutua, no bloqueo externo, espera acotada y sin suposición de velocidad. La «prioridad fija» NO es una condición (incluso puede causar inanición).`,
    fuente: "Examen 2013 P.II-4 · C3"
  },
  {
    id: "t4-06", tipo: "opcion", dificultad: "alta",
    enunciado: `Analiza el pseudocódigo de las operaciones de un <b>semáforo</b>. ¿Qué hace <code>P(S)</code> cuando <code>S = 0</code>?`,
    recurso: {
      tipo: "codigo", cap: "Operaciones atómicas del semáforo",
      contenido:
`P(S):  // wait / pedir recurso        V(S):  // signal / liberar recurso
  if (S > 0) then                      if (alguien espera por S) then
     S := S - 1                            pasar ese proceso a "Listo"
  else                                 else
     bloquear el proceso                   S := S + 1
     (a la cola de espera)`
    },
    opciones: [
      { t: "Bloquea al proceso y lo coloca en la cola de espera del propio semáforo S.", ok: true },
      { t: "Incrementa el valor de S hasta uno y deja que el proceso siga su ejecución.", ok: false },
      { t: "Termina el proceso de inmediato y libera todos los recursos que tenía él.", ok: false },
      { t: "Ignora por completo la operación y deja que el proceso siga como si nada ya.", ok: false }
    ],
    explica: `Con <code>S = 0</code> no hay recurso disponible, así que <code>P(S)</code> <b>bloquea</b> al proceso (cola de espera). Cuando otro haga <code>V(S)</code>, lo despertará.`,
    fuente: "C3 · Semáforos"
  },
  {
    id: "t4-07", tipo: "opcion", dificultad: "media",
    enunciado: `Para lograr <b>exclusión mutua</b> (solo un proceso en la sección crítica), ¿qué tipo de semáforo y valor inicial usarías?`,
    opciones: [
      { t: "Un semáforo binario que se inicializa con el valor uno para el mutex ya.", ok: true },
      { t: "Un semáforo contador que se inicializa con el valor N igual a los recursos.", ok: false },
      { t: "Un semáforo sincronizador que se inicializa con el valor cero para el orden.", ok: false },
      { t: "Un semáforo binario que se inicializa con el valor cero para la exclusión.", ok: false }
    ],
    explica: `Exclusión mutua → <b>binario = 1</b>: el primero hace <code>P</code> (1→0, entra), los demás se bloquean hasta que él haga <code>V</code>. Si lo inicializas en 0, ¡nadie entraría nunca!`,
    fuente: "C3 · Tipos de semáforo"
  },
  {
    id: "t4-08", tipo: "opcion", dificultad: "alta",
    enunciado: `Hay <b>3 cintas de backup idénticas</b>. Con <code>cinta = 3</code>, tres procesos toman una cada uno y llega un cuarto proceso P4. ¿Qué ocurre?`,
    recurso: {
      tipo: "codigo", cap: "Semáforo contador",
      contenido:
`cinta = 3          // 3 recursos identicos
Proceso i:
   P(cinta)        // 3->2->1->0 ; si 0, se bloquea
   usa la cinta
   V(cinta)        // devuelve la cinta`
    },
    opciones: [
      { t: "P4 hace P(cinta) con cinta en cero y se bloquea; con un V se le da la cinta.", ok: true },
      { t: "P4 obtiene una cinta al instante porque el semáforo crea una nueva para él.", ok: false },
      { t: "El sistema entero cae en un deadlock permanente del que ya no puede salir.", ok: false },
      { t: "P4 expulsa a uno de los tres procesos que ya estaban usando su propia cinta.", ok: false }
    ],
    explica: `Con un <b>semáforo contador</b>, las 3 cintas bajan el valor a 0. P4 se <b>bloquea</b> en <code>P(cinta)</code>. Al liberar una (<code>V</code>), como P4 espera, se le otorga.`,
    fuente: "C3 · Semáforo contador"
  },
  {
    id: "t4-09", tipo: "abierta", dificultad: "alta", enfoque: "real",
    enunciado: `<b>Sistema informático de control de vacunación (MINSA).</b> a) ¿Por qué dos procesos deben <b>sincronizarse</b>? b) ¿Qué tipo de <b>semáforo</b> usarías y cuál sería el <b>pseudocódigo</b>? (Examen 2025-2 P.II-4.)`,
    modelo: `<b>a)</b> Procesos como <code>RegistrarVacuna</code> (resta una dosis del stock) y otro que también toca el stock/cupo acceden al <b>mismo dato compartido</b>. Si dos vacunatorios registran a la vez sobre un stock de <b>1 dosis</b>, sin sincronización <b>ambos leen «1 disponible»</b>, ambos restan y el stock queda en <b>−1</b> (se vacunó a 2 con 1 dosis): dato inconsistente / <b>race condition</b>. Por eso el acceso al stock debe ser una <b>sección crítica</b>.<br>
    <b>b)</b> Como solo uno debe modificar el stock a la vez → <b>semáforo binario</b> (exclusión mutua), inicializado en 1:
    <pre class="codigo">mutex = 1
Proceso_RegistrarVacuna:
   P(mutex)                       // entra a la seccion critica
   if (stock_dosis > 0) then
        stock_dosis = stock_dosis - 1
        registrar_vacunacion()
   V(mutex)                       // libera la seccion critica</pre>
    Si además hubiera <b>N puestos simultáneos</b>, usarías un <b>semáforo contador</b> inicializado en N.`,
    claves: ["a) Explicar la race condition sobre el stock (queda en -1)", "El stock es una sección crítica", "b) Semáforo binario (mutex=1) para exclusión mutua", "Pseudocódigo P(mutex) ... V(mutex) alrededor del descuento", "Mencionar contador=N si hay N puestos"],
    explica: `Debes: (1) justificar el riesgo real (doble descuento), (2) elegir binario y (3) escribir el pseudocódigo P/V correcto.`,
    fuente: "Examen 2025-2 P.II-4 · C3"
  },
  {
    id: "t4-10", tipo: "vf", dificultad: "media", vf: true,
    enunciado: `Un proceso se ejecuta de forma <b>asíncrona</b> respecto a los demás, porque sus ejecuciones son <b>independientes</b>; solo en ciertos instantes deben sincronizarse.`,
    modelo: `Verdadero.`,
    explica: `<b>Verdadero.</b> Los procesos avanzan independientes (asíncronos); el acceso concurrente a <b>datos compartidos</b> es lo que obliga a sincronizarlos en esos instantes.`,
    fuente: "Examen 2013 P.I-7 · C3"
  },
  {
    id: "t4-11", tipo: "opcion", dificultad: "alta",
    enunciado: `Para garantizar que la instrucción <code>S2</code> (de P2) se ejecute <b>después</b> de <code>S1</code> (de P1), ¿qué patrón de semáforo usarías?`,
    recurso: {
      tipo: "codigo", cap: "Patrón sincronizador (orden)",
      contenido:
`sync = 0
P1:                 P2:
  S1                  P(sync)   // espera a que P1 termine S1
  V(sync)             S2`
    },
    opciones: [
      { t: "Un semáforo sincronizador o de señal inicializado con el valor cero para el orden.", ok: true },
      { t: "Un semáforo binario de exclusión mutua inicializado con el valor uno para la SC.", ok: false },
      { t: "Un semáforo contador de recursos inicializado con el valor dos para dos procesos.", ok: false },
      { t: "No se puede forzar de ningún modo el orden entre instrucciones usando semáforos.", ok: false }
    ],
    explica: `El semáforo <b>sincronizador</b> (inicia en 0) fuerza el <b>orden</b>: P2 se bloquea en <code>P(sync)</code> hasta que P1 haga <code>V(sync)</code> tras <code>S1</code>. Así <code>S2</code> siempre corre después de <code>S1</code>.`,
    fuente: "C3 · Semáforo sincronizador"
  },
  {
    id: "t4-12", tipo: "vf", dificultad: "alta", vf: true,
    enunciado: `Si un proceso hace <code>P(mutex)</code>, entra a su sección crítica y <b>muere</b> (por ejemplo, recibe SIGKILL) <b>sin</b> hacer <code>V(mutex)</code>, los demás procesos que esperen ese mutex quedan bloqueados indefinidamente.`,
    modelo: `Verdadero.`,
    explica: `<b>Verdadero.</b> El mutex queda en 0 (tomado) para siempre → los que hagan <code>P</code> se bloquean (deadlock/inanición). Es el caso clásico del profesor: entra a la SC, lo matan, nunca libera. Por eso existen los <b>mutex robustos</b>.`,
    fuente: "C3 · What-if (muere en SC)"
  },
  {
    id: "t4-13", tipo: "opcion", dificultad: "alta",
    enunciado: `¿Qué ocurre si por un bug se ejecuta <code>V(S)</code> <b>sin</b> un <code>P(S)</code> previo, sobre un mutex de exclusión mutua?`,
    opciones: [
      { t: "El semáforo crece de más y entran más procesos de los debidos a la sección.", ok: true },
      { t: "No ocurre nada malo, porque un V sin un P previo es del todo inofensivo ya.", ok: false },
      { t: "El proceso que ejecuta ese V queda bloqueado en la cola de espera del semáforo.", ok: false },
      { t: "El semáforo se reinicia solo a su valor original y nadie más entra a la sección.", ok: false }
    ],
    explica: `Un <code>V</code> de más incrementa el semáforo por encima de lo debido: dos procesos podrían ver S&gt;0 y ambos entrar → <b>se rompe la exclusión mutua</b> (race condition).`,
    fuente: "C3 · What-if"
  },
  {
    id: "t4-14", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `Hacer <code>V(S)</code> cuando <b>nadie</b> está esperando el semáforo despierta a algún proceso que llegará en el futuro.`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> Si nadie espera, <code>V(S)</code> solo <b>incrementa S en 1</b>. El próximo <code>P(S)</code> encontrará S&gt;0 y pasará sin bloquearse; no «despierta» a nadie del futuro.`,
    fuente: "C3 · Sí/No"
  },
  {
    id: "t4-15", tipo: "opcion", dificultad: "media",
    enunciado: `Las primitivas de sincronización (locks, semáforos, monitores, Test&Set) se construyen finalmente sobre…`,
    opciones: [
      { t: "Operaciones atómicas indivisibles, casi siempre con apoyo del propio hardware.", ok: true },
      { t: "Bucles de espera activa infinitos que consumen el CPU hasta que se libera ya.", ok: false },
      { t: "El sistema de archivos, que guarda en disco el estado de cada primitiva usada.", ok: false },
      { t: "La tabla de páginas, que traduce las direcciones lógicas de cada primitiva ya.", ok: false }
    ],
    explica: `Toda la sincronización descansa en <b>operaciones atómicas</b> (Test&Set, Compare&Swap, deshabilitar interrupciones…). Sin atomicidad, las primitivas mismas tendrían race conditions.`,
    fuente: "C3 · Capas de primitivas"
  },
  {
    id: "t4-16", tipo: "abierta", dificultad: "alta", enfoque: "real",
    enunciado: `<b>Caso:</b> dos usuarios ven el <b>mismo asiento libre</b> en un sistema de reservas y ambos pulsan «reservar» al mismo tiempo. Explica el problema y propón una solución con pseudocódigo.`,
    modelo: `El «asiento» es un <b>recurso compartido</b>; «verificar si está libre y reservarlo» es la <b>sección crítica</b>. Sin sincronización ocurre una <b>race condition</b>: ambos leen «libre» y ambos reservan → <b>asiento duplicado</b> (dato inconsistente).<br>
    Solución: <b>semáforo binario</b> (<code>mutex = 1</code>) que proteja el bloque leer-verificar-reservar:
    <pre class="codigo">mutex = 1
Proceso_Reservar(asiento):
   P(mutex)
   if (asiento.libre) then
        asiento.libre = false
        registrar_reserva(usuario)
   V(mutex)</pre>
    <b>Supuesto:</b> hay una sola copia del registro del asiento. Si hubiera N cupos idénticos, usaría un <b>semáforo contador</b> inicializado en N.`,
    claves: ["Asiento = recurso compartido; verificar+reservar = sección crítica", "Sin sincronizar → race condition (asiento duplicado)", "Solución: semáforo binario mutex=1 con pseudocódigo", "Declarar supuesto (1 copia; si N cupos → contador)"],
    fuente: "C3 · Caso (reserva de butacas)"
  },
  {
    id: "t4-17", tipo: "vf", dificultad: "media", vf: false,
    enunciado: `Un único semáforo <b>binario</b> (0/1) puede gestionar por sí solo <b>N recursos idénticos</b>.`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> Un binario solo distingue 0/1. Para N recursos idénticos necesitas un <b>semáforo contador inicializado en N</b>. (Con varios binarios y lógica extra podrías emularlo, pero no con uno solo.)`,
    fuente: "C3 · Binario vs contador"
  },
  {
    id: "t4-18", tipo: "opcion", dificultad: "alta",
    enunciado: `¿Se puede lograr exclusión mutua <b>solo con software</b> (sin instrucciones atómicas de hardware)?`,
    opciones: [
      { t: "Depende: Peterson y Dekker sirven para pocos procesos, pero hoy exigen barreras.", ok: true },
      { t: "Sí, siempre y sin condición alguna, en cualquier procesador y con cualquier carga.", ok: false },
      { t: "No, resulta del todo imposible en términos matemáticos bajo cualquier circunstancia.", ok: false },
      { t: "Solo funciona cuando hay más de cien procesos compitiendo por la sección crítica.", ok: false }
    ],
    explica: `<b>Depende.</b> Peterson/Dekker lo logran en teoría, pero el reordenamiento de instrucciones y las cachés de los procesadores modernos exigen <b>barreras de memoria</b> (apoyo de HW/compilador) para que funcionen bien.`,
    fuente: "C3 · Sí/No/Depende"
  },
  {
    id: "t4-19", tipo: "opcion", dificultad: "media",
    enunciado: `Estructura típica de un proceso con sección crítica. ¿Qué va en el «protocolo de entrada»?`,
    recurso: {
      tipo: "codigo", cap: "Estructura",
      contenido:
`<protocolo de entrada>      // ???
   [ SECCION CRITICA ]      // accede al recurso compartido
<protocolo de salida>       // libera (ej. V(mutex))
   [ seccion restante ]`
    },
    opciones: [
      { t: "Pedir permiso para entrar a la sección crítica, por ejemplo con P(mutex) ya.", ok: true },
      { t: "Liberar el recurso al salir de la sección crítica, por ejemplo con V(mutex).", ok: false },
      { t: "Terminar el proceso por completo apenas sale de su sección crítica del todo.", ok: false },
      { t: "Guardar el PCB del proceso en el disco antes de entrar a la sección crítica.", ok: false }
    ],
    explica: `El protocolo de <b>entrada</b> pide permiso (<code>P(mutex)</code>); el de <b>salida</b> libera (<code>V(mutex)</code>). Entre ambos está la sección crítica.`,
    fuente: "C3 · Estructura de la SC"
  },
  {
    id: "t4-20", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `Tener exclusión mutua garantiza que <b>nunca</b> ocurra un deadlock.`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> La <b>exclusión mutua es una de las 4 condiciones necesarias del deadlock</b>. Tenerla no causa deadlock por sí sola, pero tampoco lo previene: puede combinarse con hold&wait, no apropiación y espera circular.`,
    fuente: "C3/C4 · Relación con deadlock"
  },
  {
    id: "t4-21", tipo: "opcion", dificultad: "media",
    enunciado: `El ejemplo clásico de «los dos hermanos que compran leche» (ambos ven «no hay leche» y ambos compran) ilustra…`,
    opciones: [
      { t: "Una condición de carrera por leer un estado viejo antes de que el otro lo cambie.", ok: true },
      { t: "Un abrazo mortal por espera circular entre los dos hermanos del mismo ejemplo.", ok: false },
      { t: "Una inanición del segundo hermano, que nunca llega a comprar la leche que falta.", ok: false },
      { t: "Una fragmentación de la memoria por comprar dos cartones de leche a la vez ya.", ok: false }
    ],
    explica: `Ambos leen «no hay leche» (estado compartido desactualizado) y actúan → <b>compran doble</b>. Es una <b>race condition</b>: falta sincronizar la verificación con la acción.`,
    fuente: "C3 · Ejemplo de la leche"
  },
  {
    id: "t4-22", tipo: "vf", dificultad: "media", vf: true,
    enunciado: `Si las operaciones <code>P</code> y <code>V</code> <b>no</b> fueran atómicas, dos procesos podrían ver <code>S &gt; 0</code> a la vez y ambos entrar a la sección crítica.`,
    modelo: `Verdadero.`,
    explica: `<b>Verdadero.</b> La atomicidad de <code>P</code>/<code>V</code> es esencial: si se pudieran intercalar, dos procesos leerían S&gt;0 simultáneamente y ambos entrarían → se rompe la exclusión mutua (la propia primitiva tendría una race condition).`,
    fuente: "C3 · What-if (atomicidad)"
  }
]);
