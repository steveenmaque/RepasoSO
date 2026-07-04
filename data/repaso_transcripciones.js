/* =====================================================================
   REPASO — Transcripciones de clase (Semanas 5-13) enfocadas al
   "Repaso Técnico de Sistemas Operativos" (PDF, Material adicional).
   ---------------------------------------------------------------------
   Estas preguntas capturan el ENFOQUE EN VIVO del profesor: sus
   correcciones a los alumnos, sus "trampas" y la justificación técnica
   exacta que espera en el examen. Se cargan en los temas ya existentes
   vía BANCO.add, con ids "tr*" para no chocar con los "t*" originales.
   ===================================================================== */

/* ---------- TEMA 3 · Diagrama de Estados (Semanas 5 y 7) ---------- */
BANCO.add("t3", [
  {
    id: "tr3-01", tipo: "opcion", dificultad: "trampa",
    enunciado: `Cuando un proceso pasa a <b>bloqueado</b> por una operación de E/S, entra a una cola de bloqueados. ¿Cómo se organiza esa cola y por qué?`,
    opciones: [
      { t: "Una cola por cada dispositivo, atendida por orden de llegada, pues los dispositivos de E/S son independientes.", ok: true },
      { t: "Una única cola global para todos los dispositivos, atendida por el orden de prioridad del proceso que espera.", ok: false },
      { t: "Una única cola FIFO común a todos los dispositivos, atendida por estricto orden de llegada de cada proceso ya.", ok: false },
      { t: "Una cola por el tamaño del proceso, atendida del más pequeño al más grande sin mirar el dispositivo usado.", ok: false }
    ],
    explica: `El profesor exige la <b>justificación técnica</b>: cada dispositivo tiene su propia cola porque las operaciones de E/S son <b>independientes</b> (trabajar con la impresora 1 no depende de la impresora 2) y son <b>difíciles de predecir</b>. Un dispositivo puede terminar antes que otro; por eso la atención dentro de cada cola es por orden de llegada.`,
    fuente: "Transcripción Semana 5 · Repaso PDF Tema 3"
  },
  {
    id: "tr3-02", tipo: "opcion", dificultad: "trampa",
    enunciado: `Abres el Administrador de tareas, eliges un proceso X y le das «Finalizar tarea». ¿En qué estado estaba ese proceso justo antes de matarlo?`,
    opciones: [
      { t: "Puede estar en cualquier estado, listo, bloqueado o en ejecución, pues el administrador es un inventario de la RAM.", ok: true },
      { t: "Siempre está en ejecución, pues para poder cerrarlo el proceso antes tiene que estar de todos modos corriendo.", ok: false },
      { t: "Siempre está en terminado, pues al darle finalizar tarea el proceso ya se cerró por completo antes de elegirlo.", ok: false },
      { t: "Siempre está en listo, pues se encuentra esperando su turno en la cola para tomar el procesador cuando le toque.", ok: false }
    ],
    explica: `Trampa típica: la mayoría responde «ejecución». Pero el Administrador de tareas es un <b>inventario de la memoria RAM</b>, donde conviven procesos listos, bloqueados y en ejecución. La respuesta correcta es <b>depende</b>: el proceso elegido puede estar en cualquiera de esos estados.`,
    fuente: "Transcripción Semana 5 · Repaso PDF Tema 3"
  },
  {
    id: "tr3-03", tipo: "vf", dificultad: "trampa", vf: false,
    enunciado: `Si matas un proceso que está en la cola de <b>bloqueados</b>, existe una transición directa de Bloqueado → Terminado.`,
    modelo: `Falso. No existe esa transición directa: para terminar, el proceso debe volver a ejecución.`,
    explica: `<b>Falso, jamás existe esa transición.</b> Para que un proceso termine hay que ejecutar la <b>instrucción de finalización</b>, y solo el <b>procesador</b> (estado de ejecución) puede hacerlo. Lo que hace el SO es cambiar el valor del <b>CP (Contador de Programa)</b> para que apunte al final; el proceso regresa a la cola de <b>listos</b> y, cuando llega a ejecución, el procesador lee el final y termina. Físicamente es imposible ir de bloqueado directo a terminado.`,
    fuente: "Transcripción Semana 5 · Repaso PDF Tema 3"
  },
  {
    id: "tr3-04", tipo: "opcion", dificultad: "alta",
    enunciado: `¿Es posible una transición directa de <b>Bloqueado → Ejecución</b> (saltándose la cola de listos)?`,
    opciones: [
      { t: "Es posible solo si el procesador está libre, pero se desaconseja: casi siempre está ocupado y consultarlo gasta recursos.", ok: true },
      { t: "Sí, es la ruta normal y hasta recomendada, pues saltarse la cola de listos acelera bastante la ejecución del proceso.", ok: false },
      { t: "No, es del todo imposible en cualquier circunstancia, pues jamás existe esa transición dentro del ciclo de vida ya.", ok: false },
      { t: "Sí, siempre que el proceso en cuestión tenga fijada una prioridad alta que le permita saltarse la cola de listos ya.", ok: false }
    ],
    explica: `La única forma sería que el procesador esté libre en ese instante. De ser así, sí es posible, pero <b>altamente desaconsejable</b>: casi siempre el procesador está ocupado, y gastar ciclos del SO consultándolo es inútil. Lo natural es que el proceso pase por la cola de <b>listos</b>.`,
    fuente: "Transcripción Semana 5 · Repaso PDF Tema 3"
  },
  {
    id: "tr3-05", tipo: "abierta", dificultad: "alta", enfoque: "real",
    enunciado: `En una terminal ejecutas un script en C que pide un número; no lo ingresas (queda en espera) y cierras la terminal. ¿Qué le pasa al script? Explica el concepto.`,
    modelo: `La terminal es el <b>proceso padre</b> y el script es un <b>proceso hijo</b>. Al matar el padre, el SO aplica la <b>muerte en cascada</b>: elimina todo el árbol de procesos descendientes para garantizar la unidad e integridad de ese árbol. Por lo tanto, el script también muere.`,
    claves: ["Terminología padre/hijo (típica de Unix/Linux)", "Muerte en cascada: matar el padre mata a todos los hijos", "Objetivo: garantizar la unidad del árbol de procesos"],
    explica: `El profesor destaca que en Unix/Linux, al matar un proceso del árbol, el SO mata todos los procesos descendientes: la <b>muerte en cascada</b>.`,
    fuente: "Transcripción Semana 5 · Repaso PDF Tema 3"
  },
  {
    id: "tr3-06", tipo: "abierta", dificultad: "trampa", enfoque: "mixto",
    enunciado: `Un proceso entra en un <b>bucle infinito</b>. (a) ¿Cómo lo detecta el SO? (b) ¿Qué debería hacer? Justifica por qué NO conviene cancelarlo por simple sospecha.`,
    modelo: `<b>(a) Detección:</b> con un contador (si la misma instrucción se repite, p. ej., 100 000 veces sin salir) o notando que el proceso consume por completo su quantum una y otra vez.<br>
    <b>(b) Acción:</b> primero bajarle la prioridad (paliativo, «esconder la basura bajo la alfombra»); NO reiniciarlo (deshacer todo su trabajo es muy riesgoso y costoso); una opción real es un utilitario que vea la memoria «en caliente» y un administrador cambie el valor de la variable para forzar que salte la instrucción y termine.<br>
    <b>Por qué no cancelar por sospecha:</b> el proceso podría legítimamente necesitar un millón de iteraciones. El SO es un <b>árbitro/controlador</b>, no debe tomar decisiones unilaterales extremas sin justificación técnica fuerte, o el usuario reclamaría con razón.`,
    claves: ["Detección: contador de repeticiones o quantum consumido siempre al 100%", "Bajar prioridad = paliativo, no solución", "Reiniciar es riesgoso (deshace trabajo hecho)", "No cancelar por sospecha: podría ser un loop legítimo; el SO es árbitro"],
    explica: `El profesor recalca que el SO no debe hacer trabajo productivo ni cancelar procesos sin justificación técnica: podría matar un cálculo válido de muchas iteraciones.`,
    fuente: "Transcripción Semana 5 · Repaso PDF Tema 3"
  },
  {
    id: "tr3-07", tipo: "opcion", dificultad: "alta",
    enunciado: `Unix, con su rutina <b>fork</b>, habilita una transición directa de <b>Nuevo → Listo Suspendido</b> cuando no hay memoria. En la analogía del profesor (Banco de Brasil = modelo clásico; Banco Itaú = Unix), ¿qué representa Unix?`,
    opciones: [
      { t: "El Banco Itaú: no rechaza, encola al proceso en disco y lo admite cuando hay RAM; su costo es gestionar el swapping.", ok: true },
      { t: "El Banco de Brasil: rechaza al proceso y le pide volver más tarde para así mantener simple su diseño interno ya.", ok: false },
      { t: "Ninguno de los dos: Unix en realidad rechaza los procesos igual que el modelo clásico cuando ya no le queda memoria.", ok: false },
      { t: "Los dos por igual, porque en el fondo no existe ninguna diferencia real de diseño entre el modelo clásico y Unix.", ok: false }
    ],
    explica: `Unix = Banco Itaú: <b>no rechaza</b>, encola al proceso en el disco (Listo Suspendido) y lo admite cuando haya memoria. Su fortaleza es no perder trabajos; su costo es gestionar el <b>swapping</b>, más complejo que la simplicidad del modelo clásico (Banco de Brasil), que sí rechaza para mantenerse simple.`,
    fuente: "Transcripción Semana 7 · Repaso PDF Tema 3"
  },
  {
    id: "tr3-08", tipo: "abierta", dificultad: "alta", enfoque: "real",
    enunciado: `Se critica que Unix, al suspender procesos al disco, <b>consume memoria secundaria y genera tráfico de E/S</b>. ¿Es esa debilidad significativa hoy?`,
    modelo: `<b>Depende.</b> Hace ~15 años sí era significativa (mandar datos de la RAM, en nanosegundos, al disco era lento). Hoy, con <b>discos sólidos (SSD)</b> y servidores modernos, esa demora es casi insignificante: el hardware contrarrestó la debilidad.<br>
    Pero <b>depende del sistema</b>: en un <b>SO de tiempo real</b> no hay disco duro para swapping; si mandaras un proceso al disco mientras operas a un paciente, «se te muere el paciente». Ahí la técnica de suspensión no aplica.`,
    claves: ["Responder «depende» (antes sí, hoy casi no por SSD)", "El hardware contrarrestó la debilidad del swapping", "En tiempo real NO hay disco: la crítica sí aplica"],
    explica: `Enfoque del profesor: una debilidad de diseño puede volverse irrelevante por el avance del hardware, pero hay contextos (tiempo real) donde sigue siendo crítica.`,
    fuente: "Transcripción Semana 7 · Repaso PDF Tema 3"
  },
  {
    id: "tr3-09", tipo: "opcion", dificultad: "alta",
    enunciado: `Unix tiene <b>dos estados de ejecución</b> (uno de usuario y uno de kernel), mientras Windows mantiene uno solo. ¿Cuál es la ventaja de separarlos en Unix?`,
    opciones: [
      { t: "Mayor seguridad, aislamiento y control de privilegios: el código de usuario no toca el hardware, pasa por el kernel.", ok: true },
      { t: "Mayor velocidad bruta de ejecución, porque separar los dos estados elimina por completo el costo del cambio de contexto.", ok: false },
      { t: "Menor consumo de memoria del sistema, porque usar un solo modo permite trabajar con una única tabla de estados ya.", ok: false },
      { t: "Ninguna ventaja real, porque separar la ejecución de usuario y la de kernel es solo una diferencia estética del diseño.", ok: false }
    ],
    explica: `Separar ejecución de usuario y de kernel mejora <b>seguridad, estabilidad, aislamiento y control de privilegios</b>. El costo es el <b>cambio de contexto</b> (un pequeño esfuerzo por las validaciones), que se compensa con la protección obtenida. Windows mantiene un solo estado por una mirada más de negocio que técnica.`,
    fuente: "Transcripción Semana 7 · Repaso PDF Tema 3"
  },
  {
    id: "tr3-10", tipo: "opcion", dificultad: "alta",
    enunciado: `Unix <b>eliminó</b> la transición de <b>Bloqueado Suspendido → Bloqueado</b> (no vuelve directo a la RAM). ¿Por qué es una ventaja?`,
    opciones: [
      { t: "Evita subir a la RAM un proceso que igual no podría ejecutarse; así optimiza la memoria para quien sí la necesita.", ok: true },
      { t: "Acelera de forma directa la ejecución de ese proceso concreto, porque al no bajar al disco se ahorra todo el swapping.", ok: false },
      { t: "Elimina por completo el uso del disco duro del sistema, porque ya ningún proceso necesita ir a memoria secundaria.", ok: false },
      { t: "Permite que dos procesos usen a la vez la misma dirección de memoria real para así aprovechar mejor la RAM libre ya.", ok: false }
    ],
    explica: `Analogía del profesor: es como alguien que llena un formulario afuera del banco; no tiene sentido hacerlo entrar a la agencia solo para seguir llenándolo (sigue bloqueado). El SO gana <b>optimizando la RAM</b> y evitando <b>tráfico innecesario</b> con el disco.`,
    fuente: "Transcripción Semana 7 · Repaso PDF Tema 3"
  },
  {
    id: "tr3-11", tipo: "vf", dificultad: "media", vf: true,
    enunciado: `En Unix, al estado «terminado» se le llama <b>Zombie</b>: el proceso ya terminó pero su información aún no ha sido recogida por su proceso padre.`,
    modelo: `Verdadero. El proceso terminó (como un «muerto viviente») y su entrada sigue hasta que el padre la recoja con wait().`,
    explica: `<b>Verdadero.</b> El <b>Zombie</b> es un «muerto viviente»: el proceso terminó pero su información permanece en la tabla hasta que el padre la recoge mediante <b>wait()</b>. Coincide con el estado ZOMBIE del <code>enum procstate</code> del PDF.`,
    fuente: "Transcripción Semana 7 · Repaso PDF Tema 3 (enum procstate)"
  }
]);

/* ---------- TEMA 4 · Sincronización (Semanas 7, 8) ---------- */
BANCO.add("t4", [
  {
    id: "tr4-01", tipo: "opcion", dificultad: "media",
    enunciado: `El profesor usa el caso de dos hermanos que, sin avisarse, compran leche por separado. ¿Cuál de los <b>tres factores</b> de la sincronización falló?`,
    opciones: [
      { t: "La comunicación: sí coincidieron en el tiempo y en el recurso, pero no se avisaron nada entre ellos.", ok: true },
      { t: "El tiempo: los dos hermanos en realidad nunca llegaron a coincidir el mismo día para comprar.", ok: false },
      { t: "El recurso: cada hermano compró en el fondo una leche distinta y no un recurso común compartido.", ok: false },
      { t: "La prioridad: un hermano tenía más prioridad que el otro y por eso terminó comprando primero él.", ok: false }
    ],
    explica: `Los tres factores de la sincronización son <b>tiempo, recurso en común y comunicación</b>. En el caso de los hermanos coincidieron el tiempo (mismo día) y el recurso (la leche), pero faltó <b>comunicación</b>: un mensaje en la refrigeradora habría evitado la compra doble.`,
    fuente: "Transcripción Semanas 7-8 · Repaso PDF Tema 4"
  },
  {
    id: "tr4-02", tipo: "abierta", dificultad: "alta", enfoque: "ideal",
    enunciado: `Saldo inicial 5000. El proceso <b>Depósito</b> (+4500) lee 5000, calcula 9500 en su memoria y se pausa (fin de quantum). Entra <b>Retiro</b> (-500): lee 5000, guarda 4500. Luego Depósito retoma y guarda 9500. (a) ¿Cuál es el saldo final y qué está mal? (b) ¿Qué factor falló?`,
    modelo: `<b>(a)</b> El saldo final queda en <b>9500</b>, pero los <b>500 del retiro desaparecieron</b> del registro: hay una <b>inconsistencia de datos (race condition)</b>. Depósito retomó su cálculo basado en los 5000 iniciales e ignoró por completo el retiro intermedio.<br>
    <b>(b)</b> Falló la <b>comunicación</b>. El tiempo y el recurso compartido (el saldo) sí coincidieron; lo que faltó fue que Depósito avisara a Retiro que estaba modificando el dato. Por eso a este tema también se le llama <b>«comunicación de procesos»</b>.`,
    claves: ["Saldo final 9500; se pierden los 500 del retiro (inconsistencia)", "Es una race condition sobre un recurso compartido", "El factor que falló es la comunicación, no el tiempo ni el recurso"],
    explica: `El profesor insiste: el error no es de tiempo ni de recurso, es de <b>comunicación</b>. Depósito debió advertir a Retiro que el dato estaba siendo modificado.`,
    fuente: "Transcripción Semanas 7-8 · Repaso PDF Tema 4"
  },
  {
    id: "tr4-03", tipo: "multiple", dificultad: "alta",
    enunciado: `Selecciona las <b>condiciones obligatorias</b> que debe cumplir una buena solución al problema de la sección crítica (según el profesor).`,
    opciones: [
      { t: "Garantizar la exclusión mutua: solo un proceso dentro de su sección crítica a la vez, nunca dos juntos.", ok: true },
      { t: "Ningún proceso que esté fuera de su sección crítica puede llegar a bloquear a los demás procesos del sistema.", ok: true },
      { t: "Ningún proceso puede llegar a esperar un tiempo arbitrariamente grande para poder entrar a su sección crítica.", ok: true },
      { t: "La solución no puede asumir la velocidad relativa ni el número de procesadores que tenga la máquina real ya.", ok: true },
      { t: "Todos los procesos del sistema deben tener siempre exactamente la misma prioridad fija asignada por igual ya.", ok: false }
    ],
    explica: `Las cuatro condiciones son: <b>(1)</b> exclusión mutua garantizada; <b>(2)</b> nadie fuera de su sección crítica bloquea a otros; <b>(3)</b> nadie espera un tiempo arbitrariamente grande; <b>(4)</b> no asumir la velocidad/rapidez de los procesos. La igualdad de prioridades no es una condición.`,
    fuente: "Transcripción Semana 7 · Repaso PDF Tema 4"
  },
  {
    id: "tr4-04", tipo: "opcion", dificultad: "alta",
    enunciado: `En los <b>semáforos de Dijkstra</b> (S = variable entera no negativa), ¿qué hace la operación <b>P (wait)</b> sobre S?`,
    opciones: [
      { t: "Si S es mayor que cero resta uno y el proceso continúa; si no, lo manda a la cola de bloqueados del semáforo.", ok: true },
      { t: "Siempre suma uno al valor de S y de paso despierta a un proceso que estaba aguardando en la cola del semáforo.", ok: false },
      { t: "Reinicia el valor de S a su valor inicial y de una vez deja pasar a todos los procesos que estaban esperando ya.", ok: false },
      { t: "Bloquea siempre al proceso que la ejecuta, sin importar para nada cuál sea el valor actual de S en ese momento.", ok: false }
    ],
    explica: `<b>P (wait):</b> pregunta si S > 0. Si es cierto, decrementa (<b>S = S - 1</b>) y el proceso entra a su sección crítica. Si S = 0, el proceso se <b>bloquea</b> y va a la cola de espera del semáforo.`,
    fuente: "Transcripción Semanas 8-9 · Repaso PDF Tema 4"
  },
  {
    id: "tr4-05", tipo: "opcion", dificultad: "alta",
    enunciado: `¿Qué hace la operación <b>V (signal)</b> sobre un semáforo S?`,
    opciones: [
      { t: "Si hay un proceso esperando en la cola, lo despierta y lo pasa a listos; si la cola está vacía, suma uno a S.", ok: true },
      { t: "Siempre resta uno al valor de S, sin importar para nada si hay o no procesos esperando dentro de la cola ya.", ok: false },
      { t: "Bloquea al proceso que la ejecuta y de una vez lo manda a la cola de espera del propio semáforo a aguardar.", ok: false },
      { t: "Vacía de golpe toda la cola de bloqueados del semáforo y de paso reinicia su valor a cero otra vez desde el inicio.", ok: false }
    ],
    explica: `<b>V (signal):</b> revisa la cola del semáforo. Si hay un proceso esperando, lo <b>despierta</b> y lo pasa a Listos (le cede el recurso). Si la cola está vacía, incrementa el semáforo (<b>S = S + 1</b>).`,
    fuente: "Transcripción Semana 9 · Repaso PDF Tema 4"
  },
  {
    id: "tr4-06", tipo: "opcion", dificultad: "media",
    enunciado: `Hay 3 cintas idénticas, así que S = 3. Llegan y ejecutan P los procesos 3, 1 y 4 (toman una cinta cada uno). Llega el proceso 2 y ejecuta P. ¿Qué ocurre?`,
    opciones: [
      { t: "El proceso 2 se bloquea y va a la cola de espera, porque S ya vale cero y no queda ninguna cinta libre.", ok: true },
      { t: "El proceso 2 toma una cuarta cinta virtual que el propio semáforo crea para él en ese preciso momento.", ok: false },
      { t: "El valor de S se vuelve negativo hasta llegar a menos uno, pero el proceso 2 igual continúa su ejecución.", ok: false },
      { t: "El proceso 2 expulsa de su cinta al proceso 3 para poder tomar él esa misma cinta de inmediato al toque.", ok: false }
    ],
    explica: `Tras 3 operaciones P, S = 0. Cuando el proceso 2 ejecuta P y S no es mayor que 0, el sistema lo <b>bloquea</b>. Si luego el proceso 1 termina y ejecuta V, el SO despierta al proceso 2 y le cede la cinta liberada.`,
    fuente: "Transcripción Semana 9 · Repaso PDF Tema 4"
  }
]);

/* ---------- TEMA 5 · Abrazo Mortal / Deadlock (Semanas 9, 10) ---------- */
BANCO.add("t5", [
  {
    id: "tr5-01", tipo: "opcion", dificultad: "media",
    enunciado: `Según la definición que valida el profesor, ¿qué es un <b>abrazo mortal (deadlock)</b>?`,
    opciones: [
      { t: "Un estado donde dos o más procesos esperan un evento que jamás ocurrirá porque se retienen los recursos entre ellos.", ok: true },
      { t: "Un proceso que consume el cien por ciento del CPU porque quedó atrapado dentro de un bucle infinito de cálculo.", ok: false },
      { t: "Un proceso de baja prioridad que por culpa del planificador nunca llega a ejecutarse, es decir una inanición pura.", ok: false },
      { t: "Un proceso que el sistema movió al disco por falta de memoria y quedó suspendido esperando volver a la RAM ya.", ok: false }
    ],
    explica: `El <b>deadlock</b> es una espera circular de un evento que <b>nunca va a ocurrir</b>: cada proceso retiene un recurso que el otro necesita. Analogía del profesor: una intersección atascada donde cada chofer espera que el otro retroceda y nadie cede. No confundir con inanición (un proceso relegado sí podría avanzar si le suben la prioridad).`,
    fuente: "Transcripción Semanas 9-10 · Repaso PDF Tema 5"
  },
  {
    id: "tr5-02", tipo: "multiple", dificultad: "alta",
    enunciado: `Selecciona las <b>políticas/enfoques</b> para tratar el abrazo mortal mencionados en clase.`,
    opciones: [
      { t: "Prevenir, negando de antemano una de las cuatro condiciones que plantea Coffman para el bloqueo.", ok: true },
      { t: "Evitar, analizando en vivo el estado de los recursos, tal como lo hace el algoritmo del banquero.", ok: true },
      { t: "Detectar el ciclo con un grafo y luego recuperarse matando o expropiando alguno de los procesos.", ok: true },
      { t: "Ignorarlo por su baja probabilidad de ocurrir, lo que se conoce como el algoritmo del avestruz.", ok: true },
      { t: "Aumentar el quantum de todos los procesos del sistema para que así ninguno se llegue a bloquear ya.", ok: false }
    ],
    explica: `Las políticas son <b>prevenir, evitar, detectar/recuperar</b> y el <b>algoritmo del avestruz</b> (ignorar). Ojo con la trampa clásica: <b>prevenir ≠ evitar</b>. Prevenir ataca las condiciones de Coffman de antemano; evitar analiza en tiempo real si conceder un recurso deja el sistema en estado seguro (banquero).`,
    fuente: "Transcripción Semanas 9-10 · Repaso PDF Tema 5"
  },
  {
    id: "tr5-03", tipo: "abierta", dificultad: "alta", enfoque: "mixto",
    enunciado: `Explica el <b>algoritmo del avestruz</b> y por qué el profesor lo considera inaceptable para el software que ustedes desarrollarán.`,
    modelo: `El <b>algoritmo del avestruz</b> consiste en <b>ignorar</b> el deadlock: como estadísticamente ocurre muy pocas veces, sale más barato reiniciar el sistema o matar el proceso que gastar recursos en prevenirlo. Windows lo aplica en ciertos casos.<br>
    <b>Crítica del profesor:</b> los matemáticos se resignan por la baja probabilidad, pero en software crítico (un servidor de matrícula o de un banco) <b>no podemos permitir que se cuelgue</b>. Debemos apuntar a cero errores, aunque las soluciones de prevención consuman más recursos.`,
    claves: ["Avestruz = ignorar el problema por su baja probabilidad", "Es más barato reiniciar/matar que prevenir", "Inaceptable en sistemas críticos (banco, matrícula): apuntar a cero errores"],
    explica: `El enfoque del profesor: la decisión de ingeniería depende del contexto. En sistemas críticos, la prevención (aunque cara) se justifica.`,
    fuente: "Transcripción Semana 10 · Repaso PDF Tema 5"
  }
]);

/* ---------- TEMA 6 · Planificación de CPU (Semanas 9, 10) ---------- */
BANCO.add("t6", [
  {
    id: "tr6-01", tipo: "opcion", dificultad: "trampa",
    enunciado: `Sobre el <b>manejo de memoria con hilos (threads)</b> frente a un proceso monolítico, ¿qué afirmación es correcta?`,
    opciones: [
      { t: "El beneficio real es la agilidad de carga y liberación, pero sincronizar su memoria compartida es más complejo.", ok: true },
      { t: "Los hilos simplifican del todo el manejo de la memoria justamente porque entre ellos no comparten nada de ella.", ok: false },
      { t: "Los hilos siempre se ejecutan más rápido que cualquier proceso monolítico, sin ninguna excepción posible ya.", ok: false },
      { t: "Un proceso monolítico va liberando su memoria RAM instrucción por instrucción a medida que avanza su ejecución.", ok: false }
    ],
    explica: `Trampa: se suele decir que los hilos «facilitan» la memoria. En realidad, como comparten la dirección de memoria del proceso, <b>sincronizarlos es más complejo</b>. El beneficio real es la <b>agilidad de carga/liberación</b>: se cargan bloques pequeños y cada hilo libera su RAM al terminar; el proceso monolítico no libera nada hasta acabar todo el bloque.`,
    fuente: "Transcripción Semanas 9-10 · Repaso PDF Tema 6"
  },
  {
    id: "tr6-02", tipo: "opcion", dificultad: "media",
    enunciado: `¿Cuál es la principal <b>desventaja</b> de usar hilos?`,
    opciones: [
      { t: "La sincronización: si un archivo se parte en hilos y uno falla, el resultado sale corrupto y hay que afinar la lógica.", ok: true },
      { t: "Que en realidad no llegan a ejecutarse en paralelo sobre varios núcleos, ni siquiera cuando el hardware lo permite.", ok: false },
      { t: "Que consumen bastante más memoria RAM que la que gastaría un proceso monolítico del todo equivalente en su tarea.", ok: false },
      { t: "Que entre ellos no pueden compartir ninguna clase de memoria, así que deben comunicarse siempre por mensajes ya.", ok: false }
    ],
    explica: `La desventaja clave es la <b>sincronización</b>. Ejemplo del profesor: un utilitario descarga un archivo de 4 GB dividido en 3 hilos; si el hilo 3 falla, el archivo queda <b>corrupto</b>. Hay que coordinar bien la unión final de los hilos.`,
    fuente: "Transcripción Semanas 9-10 · Repaso PDF Tema 6"
  },
  {
    id: "tr6-03", tipo: "opcion", dificultad: "alta",
    enunciado: `Para el planificador, «ser justo» significa…`,
    opciones: [
      { t: "Equidad, dar a cada quien lo suyo, no igualdad; contra la inanición se usa el envejecimiento o aging del proceso.", ok: true },
      { t: "Igualdad, dar exactamente el mismo tiempo de CPU a todos los procesos por igual sin mirar su clase ni su prioridad.", ok: false },
      { t: "Ejecutar siempre primero al proceso que llegó justo al último a la cola, en vez de respetar el orden de llegada real.", ok: false },
      { t: "Dar todo el CPU al proceso de mayor prioridad hasta que él termine del todo, sin ninguna clase de excepción posible.", ok: false }
    ],
    explica: `Justicia es <b>equidad</b>, no igualdad: «dar a cada quien lo que le corresponda». Si una cola por prioridad deja congelado a un proceso de baja prioridad (<b>inanición</b>), el mecanismo de <b>envejecimiento (aging)</b> le incrementa gradualmente la prioridad hasta que consiga el procesador.`,
    fuente: "Transcripción Semana 9 · Repaso PDF Tema 6"
  },
  {
    id: "tr6-04", tipo: "opcion", dificultad: "trampa",
    enunciado: `Respecto al <b>porcentaje de uso del CPU</b>: ¿se busca maximizarlo o minimizarlo, y cuál es el argumento correcto?`,
    opciones: [
      { t: "Maximizarlo, pues el CPU no debe estar ocioso si hay trabajo; pero ojo, un uso alto no implica alta productividad.", ok: true },
      { t: "Maximizarlo, pues un uso alto del CPU siempre significa que se terminan más procesos, o sea siempre más productividad.", ok: false },
      { t: "Minimizarlo siempre que se pueda, para que de ese modo el procesador llegue a consumir bastantes menos recursos ya.", ok: false },
      { t: "Es del todo indistinto, pues el uso del CPU no guarda ninguna relación real con el desempeño final del sistema ya.", ok: false }
    ],
    explica: `La meta es <b>maximizar</b> (la ventanilla del banco debe atender si hay clientes). Trampa en el argumento: NO hay relación directa entre uso de CPU y cantidad de procesos terminados; un único proceso en <b>bucle infinito</b> satura el CPU al 100% sin producir nada. Además, un CPU constantemente por encima del <b>75%</b> es señal de alerta (virus, loop o hardware obsoleto).`,
    fuente: "Transcripción Semanas 9-10 · Repaso PDF Tema 6"
  },
  {
    id: "tr6-05", tipo: "opcion", dificultad: "media",
    enunciado: `El profesor separa el <b>Planificador de CPU</b> del <b>Despachador</b>. ¿Cómo se corresponden con «política» y «mecanismo»?`,
    opciones: [
      { t: "El planificador define la política, qué proceso pasa a ejecución; el despachador ejecuta el mecanismo, el cambio real.", ok: true },
      { t: "El planificador es el mecanismo de bajo nivel y el despachador es la política que decide a qué proceso le toca ya.", ok: false },
      { t: "Los dos son en realidad mecanismos de bajo nivel idénticos que hacen exactamente la misma tarea dentro del núcleo.", ok: false },
      { t: "El despachador decide la prioridad de cada proceso y el planificador solo guarda y restaura los registros del CPU.", ok: false }
    ],
    explica: `<b>Planificador = política (QUÉ)</b>: decide, según el algoritmo elegido (FCFS, RR…), qué proceso pasa de Listos a Ejecución. <b>Despachador = mecanismo (CÓMO)</b>: realiza el cambio de contexto (guardar/restaurar registros) para entregarle el CPU. Es la misma separación política/mecanismo del Tema 1.`,
    fuente: "Transcripción Semanas 9-10 · Repaso PDF Tema 6"
  },
  {
    id: "tr6-06", tipo: "abierta", dificultad: "alta", enfoque: "ideal",
    enunciado: `Distingue <b>tiempo de espera</b>, <b>tiempo de respuesta</b> y <b>tiempo de retorno</b>, y di por qué se busca minimizar cada uno.`,
    modelo: `<b>Tiempo de espera:</b> lo que el proceso pasa en la cola de Listos. Minimizarlo hace que la cola rote y no se sature la RAM (se evita recurrir a la memoria virtual).<br>
    <b>Tiempo de respuesta:</b> lo que demora en ser atendido por <b>primera vez</b>. Minimizarlo mejora la experiencia de usuario y da sensación de fluidez/concurrencia.<br>
    <b>Tiempo de retorno:</b> desde que el proceso llega hasta que se va por completo (llegada → salida del «banco»). Minimizarlo libera recursos del CPU y está ligado a maximizar la productividad; si los procesos no retornan, se acumulan y el sistema colapsa.`,
    claves: ["Espera = tiempo en la cola de Listos (evita saturar RAM / memoria virtual)", "Respuesta = primera atención (experiencia de usuario)", "Retorno = llegada hasta salida total (ligado a la productividad)"],
    explica: `El profesor usa la analogía del banco: respuesta = que te reciban por primera vez; retorno = todo tu paso por el banco hasta salir.`,
    fuente: "Transcripción Semana 10 · Repaso PDF Tema 6"
  }
]);

/* ---------- TEMA 7 · Memoria Principal (Semanas 11, 12, 13) ---------- */
BANCO.add("t7", [
  {
    id: "tr7-01", tipo: "multiple", dificultad: "alta",
    enunciado: `¿Por qué la <b>administración de la memoria principal</b> es un problema crítico para el SO? (Marca las dos razones del profesor.)`,
    opciones: [
      { t: "Es un recurso de poca capacidad que se agota rápido a medida que se instala más software y más versiones.", ok: true },
      { t: "De nada sirve el procesador si no hay espacio en memoria: los dos recursos van fuertemente amarrados para ejecutar.", ok: true },
      { t: "Porque la memoria principal es no volátil y por eso guarda todos los datos del proceso al apagar el equipo ya.", ok: false },
      { t: "Porque la memoria principal llega a reemplazar por completo al procesador dentro del sistema cuando se satura.", ok: false }
    ],
    explica: `Dos razones: <b>(1)</b> es un recurso <b>escaso</b> que se agota con el tiempo (más software instalado, menor desempeño); <b>(2)</b> un proceso necesita <b>a la vez</b> procesador y espacio en RAM para ejecutarse; tener uno sin el otro no sirve. Por eso el SO debe repartir la RAM de la forma más inteligente posible.`,
    fuente: "Transcripción Semana 12 · Repaso PDF Tema 7"
  },
  {
    id: "tr7-02", tipo: "opcion", dificultad: "trampa",
    enunciado: `¿Cuál es la definición correcta de <b>fragmentación de memoria</b>?`,
    opciones: [
      { t: "Espacios libres y habilitados que no se pueden usar porque se exige una asignación contigua del bloque entero.", ok: true },
      { t: "Los pasillos o las separaciones que van quedando justo entre las unidades de asignación que están ocupadas ya.", ok: false },
      { t: "Cualquier espacio de la memoria que en este preciso momento esté ocupado por algún proceso que se ejecuta ya.", ok: false },
      { t: "La memoria que quedó dañada o malograda de forma física y que por eso el sistema operativo ya no puede asignar.", ok: false }
    ],
    explica: `Trampa de definición. La fragmentación son <b>espacios libres y habilitados</b> que no se pueden usar por la exigencia de un bloque <b>continuo</b>. Analogía del salón: un salón vacío NO está fragmentado; se fragmenta cuando un grupo de 5 necesita asientos <b>contiguos</b> pero los libres están <b>dispersos</b>. Solo se evalúan los espacios libres, no los ocupados ni los dañados.`,
    fuente: "Transcripción Semanas 11-13 · Repaso PDF Tema 7"
  },
  {
    id: "tr7-03", tipo: "vf", dificultad: "trampa", vf: false,
    enunciado: `Un proceso alojado de forma <b>no continua</b> (disperso) se ejecuta más lento que uno continuo, porque saltar entre sus bloques dispersos toma más tiempo.`,
    modelo: `Falso. El acceso a la RAM es uniforme; la lentitud viene de la tabla de particiones, no de la dispersión.`,
    explica: `<b>Falso.</b> El <b>acceso a la RAM es uniforme</b>: llegar a la primera celda toma lo mismo que a la última. La dispersión NO afecta la velocidad de ejecución. La lentitud real proviene de la <b>Tabla de Particiones</b>: en la asignación continua tiene 1 entrada por proceso; en la no continua, si el proceso se dividió en 80 bloques, tiene 80 entradas. Esa tabla gigante vive en el <b>kernel</b>, consume memoria y es más lenta de recorrer.`,
    fuente: "Transcripción Semanas 11-13 · Repaso PDF Tema 7"
  },
  {
    id: "tr7-04", tipo: "opcion", dificultad: "alta",
    enunciado: `¿Cuál es una desventaja real de la asignación <b>continua</b> frente a la no continua?`,
    opciones: [
      { t: "El crecimiento rígido: si debe crecer y no hay espacio al lado, hay que mudarlo y recalcular todas sus direcciones.", ok: true },
      { t: "Que necesita de todos modos una enorme tabla de particiones con miles y miles de entradas, una por cada bloque.", ok: false },
      { t: "Que hace bastante más lenta la ejecución del proceso, porque saltar entre sus bloques dispersos toma más tiempo.", ok: false },
      { t: "Que impide del todo usar cualquier clase de multiprogramación, así que solo cabe un proceso a la vez en la RAM.", ok: false }
    ],
    explica: `La continua es <b>simple de gestionar</b> (1 pregunta a la tabla: «¿hay 900 KB seguidos?»), pero su <b>crecimiento es rígido</b>: mudar un proceso implica recalcular todas sus <b>referencias de memoria</b>, un gran esfuerzo. La no continua eleva la multiprogramación pero paga con una tabla de particiones enorme.`,
    fuente: "Transcripción Semanas 11-13 · Repaso PDF Tema 7"
  },
  {
    id: "tr7-05", tipo: "multiple", dificultad: "alta",
    enunciado: `La técnica <b>no continua</b> es la reina en servidores, pero su tabla de particiones gigante es un problema. ¿Qué estructuras/soluciones de software propone el profesor para mitigarlo?`,
    opciones: [
      { t: "Índices multinivel, como los hasta tres niveles que llega a usar el sistema Linux.", ok: true },
      { t: "Tablas hash o bien tablas de páginas invertidas para poder ubicar los marcos ya.", ok: true },
      { t: "Mapas de bits donde un cero marca la zona libre y un uno marca la zona ocupada.", ok: true },
      { t: "Listas enlazadas que van encadenando los bloques libres junto con los ocupados.", ok: true },
      { t: "Eliminar por completo la tabla de particiones para poder ahorrarse toda esa memoria.", ok: false }
    ],
    explica: `«Divide y vencerás»: se usan <b>índices multinivel</b> (Linux hasta 3 niveles), <b>tablas hash / invertidas</b>, <b>mapas de bits</b> (0 libre, 1 ocupado) y <b>listas enlazadas</b>. La estructura de datos elegida determina la agilidad del SO. Lo que no se puede es eliminar la tabla.`,
    fuente: "Transcripción Semana 11 · Repaso PDF Tema 7"
  },
  {
    id: "tr7-06", tipo: "opcion", dificultad: "alta",
    enunciado: `En un <b>sistema híbrido</b> de asignación de memoria, ¿cómo se decide qué técnica usar por proceso?`,
    opciones: [
      { t: "Los residentes y predecibles, como el antivirus, van contiguos; los que crecen mucho, como Word, van no contiguos.", ok: true },
      { t: "Todos y cada uno de los procesos van siempre en no contiguo, sin ninguna excepción, para darle más agilidad al SO.", ok: false },
      { t: "Se elige la técnica de cada proceso por completo al azar, para de ese modo equilibrar mejor la carga entre las dos.", ok: false },
      { t: "Los procesos más grandes van siempre en contiguo y los más pequeños van siempre en no contiguo dentro de la RAM.", ok: false }
    ],
    explica: `Los procesos cuyo comportamiento se conoce y no varía (<b>residentes</b>: antivirus, impresión) reciben un espacio <b>Continuo</b> y estricto; los procesos <b>aleatorios</b> que pueden crecer de 1 a 1000 páginas (Word) usan <b>No Continua</b>. Con la llegada de la NVRAM, la técnica Continua volverá a ganar terreno.`,
    fuente: "Transcripción Semana 11 · Repaso PDF Tema 7"
  },
  {
    id: "tr7-07", tipo: "abierta", dificultad: "alta", enfoque: "mixto",
    enunciado: `El profesor plantea la llegada de la <b>NVRAM</b> (memoria principal grande y no volátil). ¿Qué rutinas del SO desaparecerían y qué nuevos retos aparecen?`,
    modelo: `<b>Qué desaparece:</b> como el File System viviría dentro de esa memoria enorme y rápida, se elimina la <b>memoria virtual</b> (ya no hay que simular más memoria), los <b>algoritmos de frecuencia de uso</b> y las <b>estrategias de reemplazo</b>. El SO se «desinfla»: menos funcionalidades y más barato de desarrollar. Un proceso podría ni cerrarse (retomas tu sesión de inmediato).<br>
    <b>Nuevos retos:</b> en computación <b>forense</b>, la huella ya no se borra al apagar (antes la RAM se limpiaba); y el <b>malware</b> podría persistir sin dejar rastro, lo que obliga a cifrado total de memoria en hardware y a aislar las llaves criptográficas en zonas volátiles reales.`,
    claves: ["Desaparece la memoria virtual y los algoritmos de reemplazo/frecuencia", "El SO se simplifica ('se desinfla')", "Retos: forense (la huella queda) y malware persistente (mitigado con cifrado de memoria)"],
    explica: `Enfoque what-if del profesor: un cambio de hardware (NVRAM) reescribe la lógica del SO y crea nuevos problemas de seguridad.`,
    fuente: "Transcripción Semana 11 · Repaso PDF Tema 7"
  }
]);
