/* TEMA 7 — Memoria Principal (C7) */
BANCO.add("t7", [
  {
    id: "t7-01", tipo: "opcion", dificultad: "media",
    enunciado: `¿Por qué un proceso <b>debe estar en la memoria real (RAM)</b> para ejecutarse?`,
    opciones: [
      { t: "Porque el CPU solo ejecuta instrucciones que están en la memoria principal ya.", ok: true },
      { t: "Porque la memoria RAM cifra de forma automática el código de todo proceso ya.", ok: false },
      { t: "Porque el disco duro no es capaz de almacenar los programas del usuario final.", ok: false },
      { t: "Porque la memoria RAM resulta bastante más barata que el disco duro del equipo.", ok: false }
    ],
    explica: `La CPU accede a instrucciones/datos en la <b>memoria principal</b>. Si hay más procesos que RAM, el SO gestiona quién está cargado (swapping). La memoria es un <b>recurso escaso</b>.`,
    fuente: "C7 · Por qué importa la memoria"
  },
  {
    id: "t7-02", tipo: "opcion", dificultad: "alta",
    enunciado: `Se ejecuta <code>free -h</code> en un servidor lento. Analiza la salida. ¿Qué indica principalmente?`,
    recurso: {
      tipo: "comando", cap: "$ free -h",
      contenido:
`              total   usada   libre   compartido   buff/cache   disponible
Mem:           7.7Gi   7.3Gi   120Mi        60Mi       300Mi        140Mi
Swap:          2.0Gi   1.9Gi   100Mi`
    },
    opciones: [
      { t: "Fuerte presión de memoria: la RAM y el swap casi llenos arrastran al sistema.", ok: true },
      { t: "El sistema tiene memoria de sobra y por eso no hay ningún problema de rendimiento.", ok: false },
      { t: "El disco duro del servidor está fallando físicamente y por eso todo va muy lento.", ok: false },
      { t: "Hay un deadlock entre varios procesos que se quedaron esperando en forma circular.", ok: false }
    ],
    explica: `RAM disponible = 140Mi (muy poca) y <b>swap</b> usado 1.9/2.0Gi → el SO está haciendo <b>swapping</b> intenso. Como el disco es ~100 000× más lento que la RAM, todo se arrastra. <code>free -h</code> (o <code>cat /proc/meminfo</code>, <code>vmstat</code>) es el comando para <b>verificar la disponibilidad de RAM</b> (¡cayó como teórica!).`,
    fuente: "Foro 2 · C7 (verificar RAM)"
  },
  {
    id: "t7-03", tipo: "opcion", dificultad: "media",
    enunciado: `Ordena de <b>más rápido a más lento</b> la jerarquía de memoria.`,
    recurso: {
      tipo: "tabla", cap: "Latencias aproximadas",
      contenido:
`<table><tr><th>Nivel</th><th>Velocidad</th><th>Tamaño</th></tr>
<tr><td>Registros</td><td>0.3 ns</td><td>~100 B</td></tr>
<tr><td>Caché L1/L2/L3</td><td>1–30 ns</td><td>KB–MB</td></tr>
<tr><td>RAM (DRAM)</td><td>100 ns</td><td>GB</td></tr>
<tr><td>SSD</td><td>0.1 ms</td><td>100 GB</td></tr>
<tr><td>HDD</td><td>10 ms</td><td>TB</td></tr></table>`
    },
    opciones: [
      { t: "Registros → Caché → RAM → SSD → HDD.", ok: true },
      { t: "HDD → SSD → RAM → Caché → Registros.", ok: false },
      { t: "RAM → Registros → Caché → HDD → SSD.", ok: false },
      { t: "Caché → Registros → RAM → HDD → SSD.", ok: false }
    ],
    explica: `Pirámide: arriba (registros, caché) rapidísimo pero diminuto y caro; abajo (RAM, SSD, HDD) enorme y barato pero lento. De RAM (100 ns) a HDD (10 ms) hay un salto de ~100 000×.`,
    fuente: "C7 · Jerarquía de memoria"
  },
  {
    id: "t7-04", tipo: "opcion", dificultad: "alta",
    enunciado: `La <b>caché</b> solo mejora el rendimiento si se cumple cierto principio. ¿Cuál?`,
    opciones: [
      { t: "El principio de localidad de referencia: existen datos de acceso muy frecuente.", ok: true },
      { t: "Que el disco de respaldo del equipo sea un SSD moderno y no un HDD ya viejo ya.", ok: false },
      { t: "Que el proceso que la usa tenga fijada una prioridad alta dentro del sistema ya.", ok: false },
      { t: "Que se deshabilite por completo el swapping entre la memoria RAM y el disco ya.", ok: false }
    ],
    explica: `La caché copia datos <b>frecuentes</b> para acelerarlos («hacer que los casos frecuentes sean rápidos»). Sin <b>localidad</b> (acceso aleatorio total), habría muchos <b>miss</b> y el overhead podría empeorar el rendimiento.`,
    fuente: "C7 · Memoria caché"
  },
  {
    id: "t7-05", tipo: "vf", dificultad: "media", vf: true,
    enunciado: `La <b>brecha de rendimiento Procesador–Memoria</b> crece con el tiempo porque el CPU mejora mucho más rápido (Ley de Moore) que la DRAM; la caché existe para compensar esa diferencia.`,
    modelo: `Verdadero.`,
    explica: `<b>Verdadero.</b> El CPU mejora ~60%/año y la DRAM ~9%/año; la brecha crece ~50%/año. La <b>caché</b> es el puente que compensa esa diferencia de velocidad.`,
    fuente: "C7 · Brecha procesador-memoria"
  },
  {
    id: "t7-06", tipo: "opcion", dificultad: "media",
    enunciado: `El concepto de <b>grado de multiprogramación</b> se relaciona con…`,
    opciones: [
      { t: "Tener varios procesos almacenados a la vez dentro de la memoria real del equipo.", ok: true },
      { t: "La velocidad del reloj del procesador medida en los ciclos que hace por segundo.", ok: false },
      { t: "El número de núcleos físicos que trae el procesador del equipo para trabajar ya.", ok: false },
      { t: "La cantidad de archivos que el proceso mantiene abiertos mientras se ejecuta ya.", ok: false }
    ],
    explica: `Grado de multiprogramación = cuántos procesos caben y están activos <b>en RAM</b> a la vez. Más grado = mejor uso del CPU… hasta que la RAM se satura y aparece el <b>thrashing</b>.`,
    fuente: "Examen 2013 P.I-3 · C7"
  },
  {
    id: "t7-07", tipo: "opcion", dificultad: "alta",
    enunciado: `Un estacionamiento tiene 5 espacios libres <b>en total</b>, pero ninguno junto, y no entra un bus que necesita 3 seguidos. ¿Qué concepto de memoria ilustra?`,
    opciones: [
      { t: "Fragmentación externa: hay espacio libre total pero disperso en huecos separados.", ok: true },
      { t: "Fragmentación interna: se dio de más al bloque y sobra espacio dentro de él ya.", ok: false },
      { t: "Un caso claro de thrashing por mover demasiadas páginas entre la RAM y el disco.", ok: false },
      { t: "Un deadlock entre procesos que esperan de forma circular los mismos espacios ya.", ok: false }
    ],
    explica: `<b>Fragmentación externa</b>: memoria libre <b>dispersa</b> en huecos no contiguos, ninguno suficiente para un proceso grande (típica de asignación <b>continua</b>). Solución: asignación <b>no continua</b> (dividir el bus en autos) o <b>compactación</b>.`,
    fuente: "C7 · Fragmentación"
  },
  {
    id: "t7-08", tipo: "opcion", dificultad: "alta",
    enunciado: `Se asigna a un proceso <b>más memoria</b> de la que necesita, y el sobrante <b>dentro</b> del bloque queda desperdiciado. ¿Qué tipo de fragmentación es?`,
    opciones: [
      { t: "Es una fragmentación interna, pues el sobrante queda dentro del bloque asignado.", ok: true },
      { t: "Es una fragmentación externa, pues el sobrante queda entre los bloques ya usados.", ok: false },
      { t: "Es un claro caso de thrashing por el swapping intenso entre la RAM y el disco ya.", ok: false },
      { t: "Es la localidad de referencia, que hace que la caché acelere los datos frecuentes.", ok: false }
    ],
    explica: `<b>Interna</b>: el desperdicio ocurre <b>dentro</b> del bloque asignado (se dio de más). La <b>externa</b> es el desperdicio <b>entre</b> bloques (huecos dispersos).`,
    fuente: "C7 · Fragmentación"
  },
  {
    id: "t7-09", tipo: "vf", dificultad: "media", vf: false,
    enunciado: `Que haya <b>fragmentación</b> significa que <b>no queda memoria libre</b> en el sistema.`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> Hay memoria libre <b>en total</b>, pero <b>dispersa</b> en bloques no contiguos que no se pueden aprovechar (analogía: sillas libres regadas por el salón; no puede sentarse un grupo junto).`,
    fuente: "C7 · Fragmentación / Sí-No"
  },
  {
    id: "t7-10", tipo: "opcion", dificultad: "alta",
    enunciado: `Las <b>3 estrategias de administración de memoria</b> responden, en orden, a tres preguntas. ¿Cuáles?`,
    recurso: {
      tipo: "codigo", cap: "Estrategias",
      contenido:
`OBTENCION  -> ¿ ??? ?
COLOCACION -> ¿ ??? ?
REEMPLAZO  -> ¿ ??? ?`
    },
    opciones: [
      { t: "Obtención es cuándo traer, colocación es dónde ubicar y reemplazo es cuál sacar.", ok: true },
      { t: "Obtención es dónde ubicar, colocación es cuándo traer y reemplazo es a quién sacar.", ok: false },
      { t: "Las tres estrategias responden siempre a la misma pregunta de cuánto cuesta cada una.", ok: false },
      { t: "Obtención es cuál sacar, colocación es cuánto traer y reemplazo es dónde ubicar ya.", ok: false }
    ],
    explica: `<b>C-D-C</b>: <b>Cuándo</b> traer (obtención: por demanda / anticipada), <b>Dónde</b> ubicar (colocación: primer/mejor/peor ajuste), <b>Cuál</b> sacar cuando no hay espacio (reemplazo: LRU, FIFO, óptimo).`,
    fuente: "C7 · Estrategias"
  },
  {
    id: "t7-11", tipo: "opcion", dificultad: "media",
    enunciado: `En la estrategia de <b>obtención (fetch)</b>, la opción «anticipada o previa» consiste en…`,
    opciones: [
      { t: "Traer los datos a la memoria antes de que el proceso llegue a necesitarlos ya.", ok: true },
      { t: "Traer los datos a la memoria solo cuando el proceso los pide, es decir por demanda.", ok: false },
      { t: "Elegir cuál de las páginas del proceso se saca de la memoria cuando ya no cabe.", ok: false },
      { t: "Decidir en cuál de los huecos libres se coloca el proceso al cargarlo a memoria.", ok: false }
    ],
    explica: `<b>Anticipada</b> = adelantarse (ej. traer los 700k de golpe). <b>Por demanda</b> = traer lo que se va necesitando (200k, luego +400k…). Anticipar acierta si se predice bien el acceso.`,
    fuente: "C7 · Obtención"
  },
  {
    id: "t7-12", tipo: "opcion", dificultad: "alta",
    enunciado: `¿Qué hace la <b>MMU (Memory Management Unit)</b>?`,
    opciones: [
      { t: "Traduce direcciones lógicas a físicas y aísla la memoria entre los procesos.", ok: true },
      { t: "Gestiona la cola de listos del planificador y decide a quién le toca el CPU ya.", ok: false },
      { t: "Controla la velocidad del ventilador del CPU según la temperatura que mida ya.", ok: false },
      { t: "Cifra el contenido del disco duro para proteger los datos del usuario del equipo.", ok: false }
    ],
    explica: `La <b>MMU</b> (hardware) recibe una dirección virtual, verifica si es legal y la traduce a física; si no es legal → <i>fault handler</i> (al kernel). Su ausencia en microcontroladores IoT <b>dificulta el aislamiento</b> (Foro 1).`,
    fuente: "C7 · MMU / traducción de direcciones"
  },
  {
    id: "t7-13", tipo: "opcion", dificultad: "alta",
    enunciado: `Al compartir la RAM entre procesos, «controlar el <b>traslape</b>» significa…`,
    opciones: [
      { t: "Garantizar que dos procesos no coincidan en la misma porción de memoria física.", ok: true },
      { t: "Permitir que dos procesos usen la misma dirección física para así ahorrar RAM ya.", ok: false },
      { t: "Traducir cada dirección virtual del proceso a su dirección física correspondiente.", ok: false },
      { t: "Comprimir la memoria de los procesos inactivos para ganar un poco de espacio ya.", ok: false }
    ],
    explica: `Controlar el traslape = evitar que dos procesos ocupen el <b>mismo pedazo físico</b> (aislamiento). Es distinto de la <b>traducción</b> (MMU) y de la <b>protección</b> (no leer memoria ajena).`,
    fuente: "C7 · Aspectos del uso de memoria"
  },
  {
    id: "t7-14", tipo: "abierta", dificultad: "trampa", enfoque: "real",
    enunciado: `El profesor menciona que <b>alojar un proceso en el disco</b> hoy tiene «ventaja mínima». Explica esa afirmación y en qué contexto <b>sí</b> sería una gran ventaja (declara supuestos).`,
    modelo: `Cuando se decide <b>alojar un proceso en disco</b> (swapping/suspensión), la ventaja es <b>liberar RAM</b>. Pero hoy es una <b>ventaja mínima</b> porque el <b>disco es muy grande/amplio</b>: el viejo argumento de que «se agotaba la memoria virtual y generaba problemas» <b>ya no es una desventaja relevante</b> en un PC/servidor moderno (supuesto: RAM y disco amplios).<br>
    <b>Sí sería una gran ventaja</b> en sistemas con <b>poca RAM y mucha demanda concurrente</b>: dispositivos <b>IoT/embebidos</b> (KB de RAM), servidores con sobreventa de memoria, o sistemas que ejecutan más procesos de los que caben en RAM. Ahí el swapping a disco/flash es <b>decisivo</b> para mantener el grado de multiprogramación. Es un caso «<b>depende</b>».`,
    claves: ["Ventaja = liberar RAM, pero mínima hoy (disco amplio)", "El viejo argumento ya no es desventaja relevante", "Sí es decisiva con poca RAM: IoT, sobreventa, más procesos que RAM", "Declarar supuesto (PC moderno vs embebido)"],
    explica: `El profesor premia declarar el <b>supuesto</b> (hardware moderno) y reconocer que es un caso «depende».`,
    fuente: "4 · Transcripción del profesor · C7"
  },
  {
    id: "t7-15", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `La memoria secundaria (SSD/HDD) puede <b>reemplazar</b> a la RAM como memoria de ejecución sin penalización notable.`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> El disco es 1 000–100 000× más lento que la RAM. El proceso <b>debe estar en RAM</b> para ejecutarse; el disco solo sirve de respaldo (swap). Usarlo como RAM masivamente = <b>thrashing</b>.`,
    fuente: "C7 · Sí/No"
  },
  {
    id: "t7-16", tipo: "opcion", dificultad: "alta",
    enunciado: `Un navegador con 50 pestañas hace que la laptop «se arrastre», aunque el CPU no está al 100%. ¿Qué está ocurriendo?`,
    opciones: [
      { t: "Thrashing: la RAM se agotó y el SO mueve páginas RAM y disco más que ejecutar.", ok: true },
      { t: "Un deadlock entre las pestañas, que esperan de forma circular los mismos recursos.", ok: false },
      { t: "Una inanición del navegador, que nunca llega a recibir el uso del procesador ya.", ok: false },
      { t: "Una fragmentación interna del CPU por dar de más memoria a cada una de las pestañas.", ok: false }
    ],
    explica: `Cada pestaña necesita RAM. Al agotarse, el SO hace <b>swapping</b>; con demasiados procesos activos, entra en <b>thrashing</b> (mucho movimiento de páginas, poco trabajo útil). Como el CPU espera al disco, no está al 100%. Solución: cerrar pestañas (bajar el grado de multiprogramación) o más RAM.`,
    fuente: "C7 · Caso (thrashing)"
  },
  {
    id: "t7-17", tipo: "opcion", dificultad: "media",
    enunciado: `Cuando la RAM se agota por completo y no hay swap suficiente, en Linux puede actuar el…`,
    opciones: [
      { t: "El OOM Killer, que mata procesos para liberar memoria y puede matar el equivocado.", ok: true },
      { t: "El despachador de corto plazo, que asigna el procesador al proceso que esté listo.", ok: false },
      { t: "El algoritmo del banquero, que concede recursos solo si el estado sigue siendo seguro.", ok: false },
      { t: "La MMU, que cifra el contenido de la RAM para proteger los datos del usuario ya.", ok: false }
    ],
    explica: `El <b>OOM Killer</b> es el mecanismo de Linux que, al agotarse la memoria, <b>termina procesos</b> para evitar el colapso. Se detecta con <code>dmesg | grep -i oom</code>.`,
    fuente: "C7 · What-if / Foro 2"
  },
  {
    id: "t7-18", tipo: "opcion", dificultad: "media",
    enunciado: `Un proceso intenta leer/escribir en la memoria de <b>otro</b> proceso. ¿Qué ocurre normalmente?`,
    opciones: [
      { t: "El SO detecta la violación, lanza un segmentation fault y termina ese proceso.", ok: true },
      { t: "El otro proceso comparte de forma automática su memoria con el que la solicita.", ok: false },
      { t: "El SO copia los datos de un proceso a otro sin ninguna clase de restricción ya.", ok: false },
      { t: "El sistema operativo entero se reinicia y se pierde el trabajo de todos los procesos.", ok: false }
    ],
    explica: `La <b>protección</b> de memoria (MMU + kernel) impide el acceso a memoria ajena. Un acceso ilegal genera un <b>segmentation fault</b> y el SO termina el proceso infractor (rol de referí).`,
    fuente: "C7 · Protección / What-if"
  },
  {
    id: "t7-19", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `Aumentar el <b>grado de multiprogramación</b> siempre mejora el uso del CPU.`,
    modelo: `Falso (depende).`,
    explica: `<b>Falso.</b> Hasta cierto punto sí (más procesos = más probabilidad de tener uno listo). Pero pasado el límite de RAM, provoca <b>thrashing</b> y el rendimiento <b>se desploma</b>. Es un caso «depende».`,
    fuente: "C7 · Sí/No/Depende"
  },
  {
    id: "t7-20", tipo: "opcion", dificultad: "media",
    enunciado: `Diferencia entre asignación <b>continua</b> y <b>no continua</b> de memoria.`,
    opciones: [
      { t: "Continua ocupa un bloque contiguo y es simple; no continua reparte en huecos separados.", ok: true },
      { t: "Continua ocupa el disco duro del equipo; no continua ocupa la memoria RAM del equipo.", ok: false },
      { t: "Continua sirve solo para los hilos de un proceso; no continua sirve para los procesos.", ok: false },
      { t: "No existe ninguna diferencia real entre las dos formas de asignar memoria al proceso.", ok: false }
    ],
    explica: `<b>Continua</b>: un bloque seguido → traducción simple pero <b>fragmentación externa</b>. <b>No continua</b>: bloques dispersos (paginación/segmentación) → aprovecha huecos pero requiere <b>tablas de páginas/segmentos</b> y traducción de direcciones.`,
    fuente: "C7 · Organización"
  },
  {
    id: "t7-21", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `La <b>caché</b> siempre mejora el rendimiento, sin importar el patrón de acceso a memoria.`,
    modelo: `Falso (depende de la localidad).`,
    explica: `<b>Falso.</b> Solo mejora si hay <b>localidad de referencia</b>. Con acceso totalmente aleatorio, los <b>miss</b> constantes y el overhead de gestión pueden incluso <b>empeorar</b> el rendimiento.`,
    fuente: "C7 · Sí/No/Depende"
  },
  {
    id: "t7-22", tipo: "opcion", dificultad: "alta",
    enunciado: `En un sistema <b>multicore</b>, un core lee un dato de caché que ya fue modificado por otro core y no se actualizó. ¿Qué problema es?`,
    opciones: [
      { t: "Coherencia de caché: el core lee un dato obsoleto y produce resultados incorrectos.", ok: true },
      { t: "Una fragmentación externa por dejar huecos libres dispersos en la memoria caché ya.", ok: false },
      { t: "Un efecto convoy porque los cores cortos esperan detrás del core largo que va primero.", ok: false },
      { t: "Una inanición del core, que nunca llega a leer el dato actualizado por el otro core.", ok: false }
    ],
    explica: `Es un problema de <b>coherencia de caché</b>: cada core tiene su caché y, sin protocolos de coherencia, uno puede leer un valor <b>viejo</b> tras la modificación de otro → datos incorrectos.`,
    fuente: "C7 · What-if (coherencia)"
  }
]);
