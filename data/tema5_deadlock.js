/* TEMA 5 — Abrazo Mortal / Deadlock (C4) */
BANCO.add("t5", [
  {
    id: "t5-01", tipo: "opcion", dificultad: "media",
    enunciado: `¿Cuándo se produce un <b>abrazo mortal (deadlock)</b>?`,
    opciones: [
      { t: "Cuando <b>dos o más procesos esperan indefinidamente</b> recursos que están retenidos por otros procesos.", ok: true },
      { t: "Cuando un proceso entra en un bucle infinito sin liberar el procesador.", ok: false },
      { t: "Cuando un proceso es terminado abruptamente por el SO.", ok: false },
      { t: "Cuando un proceso libera todos sus recursos antes de finalizar.", ok: false }
    ],
    explica: `Deadlock = conjunto de procesos (al menos 2) donde <b>cada uno espera un evento/recurso que solo otro del conjunto puede liberar</b>. El bucle infinito sin liberar CPU es otro problema (starvation/monopolio), no deadlock.`,
    fuente: "Examen 2025 P.I-4 · C4"
  },
  {
    id: "t5-02", tipo: "multiple", dificultad: "alta",
    enunciado: `Marca las <b>4 condiciones de Coffman</b> que deben cumplirse <b>simultáneamente</b> para que haya deadlock.`,
    opciones: [
      { t: "<b>Exclusión mutua</b> (al menos un recurso no compartible).", ok: true },
      { t: "<b>Retención y espera</b> (hold &amp; wait): retiene un recurso mientras espera otro.", ok: true },
      { t: "<b>Sin apropiación</b> (no preemption): el recurso solo se libera voluntariamente.", ok: true },
      { t: "<b>Espera circular</b>: cadena P1→P2→…→Pn→P1.", ok: true },
      { t: "<b>Inanición</b> de al menos un proceso de baja prioridad.", ok: false }
    ],
    explica: `Las 4 condiciones son exclusión mutua, hold&wait, sin apropiación y espera circular. Deben darse <b>las 4 a la vez</b>: si falta una, no hay deadlock. La inanición es un problema distinto.`,
    fuente: "C4 · Condiciones de Coffman"
  },
  {
    id: "t5-03", tipo: "abierta", dificultad: "trampa", enfoque: "real",
    enunciado: `<b>Caso matrícula + pago en línea.</b> Un proceso retiene «matrícula» y espera «pago»; otro retiene «pago» y espera «matrícula». Explica una estrategia para <b>PREVENIR</b> el abrazo mortal (no confundir con evitar).`,
    modelo: `Se cumplen las 4 condiciones de Coffman (recursos no compartibles, hold&wait, no apropiación, <b>espera circular</b>) → deadlock.<br>
    Para <b>PREVENIR</b> (garantizar que nunca ocurra, por diseño) impongo un <b>orden global fijo</b> de adquisición de recursos: <b>todos primero pagan y luego se matriculan</b> (nunca al revés), o numero los recursos y exijo pedirlos en orden creciente. Esto <b>niega la espera circular</b> → el deadlock se vuelve imposible.<br>
    <b>Aclaración clave:</b> esto es <b>prevenir</b> (negar una condición de Coffman), NO <b>evitar</b> (que sería usar el Algoritmo del Banquero para conceder recursos solo si el estado resultante es seguro).`,
    claves: ["Identificar que se cumplen las 4 condiciones", "PREVENIR = negar una condición (aquí: espera circular)", "Solución: orden global fijo (primero pagar, luego matricular)", "Distinguir explícitamente prevenir de evitar (Banquero)"],
    explica: `Trampa del profesor: muchos responden «evitar» (Banquero) cuando piden «prevenir». Prevenir = negar una condición; el orden fijo niega la espera circular.`,
    fuente: "Respuesta clave del profesor · C4"
  },
  {
    id: "t5-04", tipo: "opcion", dificultad: "trampa",
    enunciado: `De las 4 condiciones de Coffman, ¿cuál <b>NO se puede negar</b> para prevenir el deadlock?`,
    opciones: [
      { t: "La <b>exclusión mutua</b> (algunos recursos son intrínsecamente no compartibles).", ok: true },
      { t: "La retención y espera (hold &amp; wait).", ok: false },
      { t: "La ausencia de apropiación.", ok: false },
      { t: "La espera circular.", ok: false }
    ],
    explica: `Solo se pueden negar <b>3</b>. La <b>exclusión mutua no</b>: si la anulas, todos entrarían a la sección crítica a la vez (datos corruptos). Recursos como una impresora son no compartibles por naturaleza.`,
    fuente: "Respuesta clave del profesor · C4"
  },
  {
    id: "t5-05", tipo: "abierta", dificultad: "alta", enfoque: "ideal",
    enunciado: `Explica la diferencia entre <b>PREVENIR</b> y <b>EVITAR</b> un deadlock, indicando la técnica de cada uno.`,
    modelo: `<b>PREVENIR (prevention):</b> garantizar por <b>diseño (a priori)</b> que el deadlock <b>nunca pueda ocurrir</b>, <b>negando</b> alguna de las 4 condiciones de Coffman (solo se pueden negar 3; la exclusión mutua no). Ej.: pedir todos los recursos al inicio (niega hold&wait), o un <b>orden lineal</b> de recursos (Havender, niega espera circular).<br>
    <b>EVITAR (avoidance):</b> decidir <b>dinámicamente (en cada petición)</b> si conceder un recurso deja el sistema en <b>estado seguro</b>; si no, se niega o se hace esperar. La técnica es el <b>Algoritmo del Banquero</b> (Dijkstra).<br>
    Diferencia esencial: prevenir es <b>estructural/estático</b>; evitar es <b>dinámico</b> y requiere conocer las <b>necesidades máximas</b>.`,
    claves: ["Prevenir = negar una condición de Coffman (a priori, diseño)", "Evitar = Banquero, decisión dinámica de estado seguro", "Prevenir estático vs evitar dinámico", "Solo se niegan 3 condiciones"],
    explica: `Prevenir ≠ evitar. Prevenir ataca las condiciones; evitar analiza cada petición con el Banquero.`,
    fuente: "3 · C4"
  },
  {
    id: "t5-06", tipo: "opcion", dificultad: "alta",
    enunciado: `Sistema de <b>un solo recurso</b> con 2 unidades disponibles. Analiza la tabla. ¿Cuál es una <b>secuencia segura</b>?`,
    recurso: {
      tipo: "tabla", cap: "Estado actual (disponibles = 2)",
      contenido:
`<table><tr><th>Proceso</th><th>Préstamo actual</th><th>Necesidad máxima</th><th>Faltante</th></tr>
<tr><td>P1</td><td>1</td><td>4</td><td>3</td></tr>
<tr><td>P2</td><td>4</td><td>6</td><td>2</td></tr>
<tr><td>P3</td><td>5</td><td>8</td><td>3</td></tr></table>`
    },
    opciones: [
      { t: "<b>P2 → P1 → P3</b>", ok: true },
      { t: "P3 → P2 → P1", ok: false },
      { t: "P1 → P3 → P2", ok: false },
      { t: "No existe ninguna secuencia segura.", ok: false }
    ],
    explica: `Con 2 libres, solo <b>P2</b> (faltante 2) puede terminar → libera 6, quedan 8. Ahora <b>P1</b> (faltante 3) termina → libera 4, quedan 12. Luego <b>P3</b> (faltante 3) termina. Secuencia segura: <b>P2 → P1 → P3</b>.`,
    fuente: "C4 · Algoritmo del Banquero"
  },
  {
    id: "t5-07", tipo: "opcion", dificultad: "alta",
    enunciado: `Estado con <b>1 unidad disponible</b>: P1 tiene 8/10 (faltan 2), P2 tiene 2/5 (faltan 3), P3 tiene 1/3 (faltan 2). ¿El estado es seguro?`,
    opciones: [
      { t: "No: ningún proceso alcanza su faltante mínimo con solo 1 libre → <b>estado inseguro</b> (deadlock inminente).", ok: true },
      { t: "Sí, la secuencia segura es P1 → P2 → P3.", ok: false },
      { t: "Sí, cualquier orden funciona.", ok: false },
      { t: "No se puede determinar sin más datos.", ok: false }
    ],
    explica: `Con solo <b>1</b> disponible, nadie llega a su faltante (2, 3, 2). No se puede completar a nadie para liberar más → <b>inseguro</b>. Ojo: inseguro no es deadlock aún, pero puede desembocar en él.`,
    fuente: "C4 · Estado inseguro"
  },
  {
    id: "t5-08", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `Un <b>estado inseguro</b> implica necesariamente que ocurrirá un deadlock.`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> Inseguro = el sistema <b>puede</b> caer en deadlock según cómo evolucione, no que sea inevitable. Si los procesos liberan recursos antes de llegar a su máximo, podría no ocurrir. El Banquero simplemente <b>no arriesga</b>: nunca entra a un estado inseguro.`,
    fuente: "C4 · Sí/No"
  },
  {
    id: "t5-09", tipo: "opcion", dificultad: "media",
    enunciado: `Observa el grafo de asignación de recursos. ¿Puede el SO <b>DETECTAR</b> un deadlock con una estructura como esta? ¿Cómo?`,
    recurso: {
      tipo: "grafico", cap: "Grafo de asignación (Holt): P1↔R1, P2↔R2",
      contenido:
`<svg viewBox="0 0 520 170" role="img" aria-label="Grafo de asignacion con ciclo">
  <defs><marker id="ahd" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#c0392b"/></marker></defs>
  <circle cx="90" cy="85" r="28" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.5"/><text x="90" y="90" text-anchor="middle" font-size="13" font-weight="bold">P1</text>
  <circle cx="360" cy="85" r="28" fill="#eef2f7" stroke="#2c3e50" stroke-width="1.5"/><text x="360" y="90" text-anchor="middle" font-size="13" font-weight="bold">P2</text>
  <rect x="205" y="18" width="42" height="42" fill="#fff5e0" stroke="#b9770e" stroke-width="1.5"/><text x="226" y="44" text-anchor="middle" font-size="12" font-weight="bold">R1</text>
  <rect x="205" y="110" width="42" height="42" fill="#fff5e0" stroke="#b9770e" stroke-width="1.5"/><text x="226" y="136" text-anchor="middle" font-size="12" font-weight="bold">R2</text>
  <line x1="205" y1="40" x2="112" y2="76" stroke="#c0392b" stroke-width="1.6" marker-end="url(#ahd)"/><text x="150" y="48" text-anchor="middle" font-size="8">R1→P1</text>
  <line x1="105" y1="108" x2="203" y2="131" stroke="#c0392b" stroke-width="1.6" marker-end="url(#ahd)"/><text x="150" y="132" text-anchor="middle" font-size="8">P1→R2</text>
  <line x1="247" y1="131" x2="340" y2="100" stroke="#c0392b" stroke-width="1.6" marker-end="url(#ahd)"/><text x="300" y="134" text-anchor="middle" font-size="8">R2→P2</text>
  <line x1="345" y1="62" x2="248" y2="42" stroke="#c0392b" stroke-width="1.6" marker-end="url(#ahd)"/><text x="300" y="40" text-anchor="middle" font-size="8">P2→R1</text>
</svg>`
    },
    opciones: [
      { t: "Sí: construye un <b>grafo de asignación de recursos (modelo de Holt)</b> y <b>busca ciclos</b>.", ok: true },
      { t: "No: una vez ocurrido el deadlock es indetectable.", ok: false },
      { t: "Sí, pero solo reiniciando toda la máquina.", ok: false },
      { t: "Sí, midiendo la temperatura del CPU.", ok: false }
    ],
    explica: `<b>Sí.</b> Con el <b>grafo de Holt</b> (procesos y recursos como nodos; aristas «asignado a» / «solicita»): si hay un <b>ciclo</b> (con recursos de instancia única) → hay deadlock. Luego se recupera matando procesos o apropiando recursos.`,
    fuente: "Examen 2013 P.II-5 · C4"
  },
  {
    id: "t5-10", tipo: "opcion", dificultad: "media",
    enunciado: `El enfoque llamado «algoritmo del <b>avestruz</b>» consiste en…`,
    opciones: [
      { t: "<b>Ignorar</b> el deadlock por asumirlo tan raro que no vale la pena prevenirlo; si ocurre, se reinicia.", ok: true },
      { t: "Detectar el ciclo y matar procesos automáticamente.", ok: false },
      { t: "Usar el Algoritmo del Banquero en cada petición.", ok: false },
      { t: "Negar la exclusión mutua de todos los recursos.", ok: false }
    ],
    explica: `El <b>avestruz</b> = «meter la cabeza en la tierra»: ignorar el problema. Lo usan la mayoría de SO comerciales (Windows, Linux) en casos cotidianos, porque el deadlock es raro y prevenirlo cuesta rendimiento.`,
    fuente: "C4 · Enfoques"
  },
  {
    id: "t5-11", tipo: "opcion", dificultad: "alta",
    enunciado: `¿Cuál es la <b>ventaja</b> de negar la condición de <b>espera circular</b> mediante un <b>ordenamiento lineal (Havender)</b> de los recursos?`,
    opciones: [
      { t: "Impide formar el ciclo P1→P2→…→P1, porque cada proceso solo puede pedir recursos de número mayor al que ya tiene.", ok: true },
      { t: "Permite que todos los procesos entren a la sección crítica a la vez.", ok: false },
      { t: "Elimina la necesidad de exclusión mutua.", ok: false },
      { t: "Duplica la memoria disponible.", ok: false }
    ],
    explica: `Numerar los recursos y exigir pedirlos en orden <b>creciente</b> impide que se cierre un ciclo → sin espera circular no hay deadlock. Es una técnica de <b>prevención</b>.`,
    fuente: "C4 · Prevención (Havender)"
  },
  {
    id: "t5-12", tipo: "opcion", dificultad: "media",
    enunciado: `Los deadlocks se producen «en general» con recursos <b>no apropiables</b>. ¿Por qué?`,
    opciones: [
      { t: "Porque el SO <b>no puede quitárselos</b> al proceso sin causar daño; deben liberarse voluntariamente (ej. impresora).", ok: true },
      { t: "Porque son recursos que se comparten libremente.", ok: false },
      { t: "Porque siempre hay infinitas copias disponibles.", ok: false },
      { t: "Porque el CPU los gestiona por hardware.", ok: false }
    ],
    explica: `Un recurso <b>no apropiable</b> (impresora, cinta) no se puede arrebatar sin dañar el trabajo → favorece hold&wait y la espera circular. La RAM, en cambio, es <b>apropiable</b> (se puede quitar vía swapping).`,
    fuente: "C4 · Apropiable vs no apropiable"
  },
  {
    id: "t5-13", tipo: "abierta", dificultad: "alta", enfoque: "real",
    enunciado: `<b>Sistema de reservas de pasajes (aerolínea).</b> a) ¿Qué debe ocurrir para que <code>AsignarAsiento</code> y <code>PagarReserva</code> se abracen mortalmente? b) Propón un enfoque para <b>prevenir</b>. (Examen 2022 P.II-4.)`,
    modelo: `<b>a)</b> Usuario 1 está en «elegir asiento» (retiene el recurso <b>asiento</b>) y necesita pasar a <b>pago</b>; Usuario 2 está en «pago» (retiene <b>pago</b>) y quiere el <b>asiento</b> que tiene el Usuario 1. Cada uno retiene lo que el otro necesita y espera → se cumplen las <b>4 condiciones de Coffman</b> (exclusión mutua sobre el asiento, hold&wait, no apropiación, <b>espera circular</b>) → deadlock.<br>
    <b>b) Prevenir:</b> imponer un <b>orden fijo</b> de adquisición de recursos/interfaces, p. ej. <b>siempre primero pagar y luego elegir asiento</b>, o numerar los recursos y pedirlos en orden creciente. Esto <b>niega la espera circular</b> → imposible el deadlock. (Es prevenir, no evitar.)`,
    claves: ["a) Describir el cruce asiento↔pago y las 4 condiciones", "b) Orden fijo de recursos (niega espera circular)", "Aclarar que es prevenir, no evitar"],
    fuente: "Examen 2022 P.II-4 · C4"
  },
  {
    id: "t5-14", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `<b>Prevenir</b> y <b>evitar</b> el deadlock son sinónimos: ambos usan el Algoritmo del Banquero.`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> Solo <b>evitar</b> usa el Banquero (decisión dinámica). <b>Prevenir</b> niega una condición de Coffman por diseño (a priori). Son estrategias distintas.`,
    fuente: "3 · C4"
  },
  {
    id: "t5-15", tipo: "opcion", dificultad: "alta",
    enunciado: `<b>Transferencia bancaria:</b> el proceso A bloquea la cuenta 1 y pide la 2; el proceso B bloquea la 2 y pide la 1. ¿Cómo prevenir el deadlock?`,
    opciones: [
      { t: "Bloquear siempre las cuentas en <b>orden de número de cuenta</b> (primero la menor), sin importar la dirección de la transferencia.", ok: true },
      { t: "Hacer las transferencias más rápido para que no coincidan.", ok: false },
      { t: "Permitir que ambos procesos entren a la sección crítica a la vez.", ok: false },
      { t: "Aumentar el saldo de ambas cuentas.", ok: false }
    ],
    explica: `Es deadlock por <b>lock ordering cruzado</b>. Prevención: <b>orden fijo de bloqueo</b> (siempre la cuenta de menor número primero) → no se forma ciclo → se niega la espera circular. Hacerlo «más rápido» no elimina el intercalado malo.`,
    fuente: "C4 · Caso (transferencia)"
  },
  {
    id: "t5-16", tipo: "vf", dificultad: "alta", vf: true,
    enunciado: `Si un proceso <b>miente</b> su «necesidad máxima» al Algoritmo del Banquero, este puede creer que un estado es seguro cuando no lo es, provocando un deadlock real.`,
    modelo: `Verdadero.`,
    explica: `<b>Verdadero.</b> El Banquero <b>confía</b> en la necesidad máxima declarada. Si es falsa, calcula mal el estado seguro → deadlock. Es el <b>mismo problema que SJF</b>: confiar en datos declarados por el usuario.`,
    fuente: "C4 · What-if"
  },
  {
    id: "t5-17", tipo: "opcion", dificultad: "media",
    enunciado: `En el enfoque de <b>detección y recuperación</b>, una vez detectado el ciclo, ¿qué acción es válida para recuperar?`,
    opciones: [
      { t: "Matar uno de los procesos del ciclo o <b>apropiar (quitar)</b> un recurso a uno de ellos.", ok: true },
      { t: "Aumentar la frecuencia del CPU.", ok: false },
      { t: "Convertir todos los recursos en compartibles.", ok: false },
      { t: "Reducir el quantum del planificador.", ok: false }
    ],
    explica: `Recuperación: <b>terminar</b> uno o más procesos del ciclo, o <b>apropiar</b> recursos (quitárselos y dárselos a otro). Se rompe el ciclo aunque se pierda algo de trabajo.`,
    fuente: "C4 · Detección y recuperación"
  },
  {
    id: "t5-18", tipo: "opcion", dificultad: "alta",
    enunciado: `En el Algoritmo del Banquero, ¿qué representa la matriz <b>Faltante</b>?`,
    recurso: {
      tipo: "codigo", cap: "Estructuras del Banquero",
      contenido:
`E[m]           // Existentes (total)
P[n][m]        // Posesion actual de cada proceso
D[m]           // Disponibles = E - suma(P)
Maximo[n][m]   // Necesidad maxima declarada
Faltante[n][m] // = ???`
    },
    opciones: [
      { t: "<b>Máximo − Posesión</b>: lo que aún le puede llegar a pedir cada proceso.", ok: true },
      { t: "Existentes − Disponibles.", ok: false },
      { t: "Posesión + Disponibles.", ok: false },
      { t: "Máximo + Posesión.", ok: false }
    ],
    explica: `<b>Faltante = Máximo − Posesión</b>. Un proceso puede terminar si su <code>Faltante ≤ Disponibles</code>; al terminar libera su Posesión (<code>D := D + P</code>).`,
    fuente: "C4 · Banquero (estructuras)"
  },
  {
    id: "t5-19", tipo: "vf", dificultad: "media", vf: false,
    enunciado: `Si un proceso <b>muere sin liberar</b> sus recursos, esos recursos se recuperan automáticamente y no afectan a nadie.`,
    modelo: `Falso.`,
    explica: `<b>Falso.</b> Si un proceso muere sin liberar (o queda colgado), sus recursos quedan <b>bloqueados</b> para los que los esperan → deadlock/inanición. Por eso importa la liberación ordenada (rutina de salida).`,
    fuente: "C4 · What-if"
  },
  {
    id: "t5-20", tipo: "opcion", dificultad: "alta",
    enunciado: `¿Por qué muchos SO comerciales (como Linux) prefieren <b>ignorar</b> el deadlock en vez de usar el Banquero en cada petición?`,
    opciones: [
      { t: "Porque el Banquero tiene <b>overhead alto</b> y el deadlock es raro; prevenirlo/evitarlo penaliza el rendimiento general.", ok: true },
      { t: "Porque el Banquero es ilegal en software libre.", ok: false },
      { t: "Porque Linux no tiene procesos concurrentes.", ok: false },
      { t: "Porque el Banquero requiere hardware especial inexistente.", ok: false }
    ],
    explica: `Evaluar el estado seguro en cada petición cuesta <b>tiempo</b> y exige conocer las necesidades máximas. Como el deadlock es infrecuente, muchos SO apuestan al <b>avestruz</b> (ignorar) por rendimiento.`,
    fuente: "C4 · What-if / avestruz"
  },
  {
    id: "t5-21", tipo: "abierta", dificultad: "alta", enfoque: "mixto",
    enunciado: `<b>Análisis:</b> ¿por qué el problema de «confiar en lo que declara el usuario» aparece <b>tanto</b> en SJF como en el Algoritmo del Banquero? ¿Es un patrón general?`,
    modelo: `Sí, es un <b>patrón</b>. <b>SJF</b> confía en la <b>duración declarada</b>; el <b>Banquero</b> confía en la <b>necesidad máxima declarada</b>. En ambos, si el dato es falso o desconocido, el algoritmo toma decisiones inseguras (planificación injusta / estado falsamente «seguro» → deadlock real).<br>
    El patrón: los algoritmos que dependen de <b>información del futuro</b> o de la <b>honestidad del usuario</b> son frágiles en la práctica. Por eso los SO reales prefieren mecanismos <b>reactivos</b> (medir el comportamiento real) sobre los <b>declarativos</b> (creer lo prometido). Es la misma lógica detrás de «ignorar el deadlock» en Linux.`,
    claves: ["SJF confía en duración; Banquero en necesidad máxima", "Ambos frágiles si el dato es falso", "Patrón: depender de info futura/honestidad del usuario es frágil", "SO reales prefieren mecanismos reactivos"],
    explica: `Conecta 3 temas: SJF, Banquero y la filosofía de «no confiar en lo declarado» de los SO reales.`,
    fuente: "C4/C6 · Análisis transversal"
  },
  {
    id: "t5-22", tipo: "vf", dificultad: "alta", vf: false,
    enunciado: `Basta con negar <b>las 4</b> condiciones de Coffman a la vez para prevenir un deadlock.`,
    modelo: `Falso (basta con negar UNA, y además la exclusión mutua no se puede negar).`,
    explica: `<b>Falso por dos motivos.</b> (1) Basta negar <b>una sola</b> condición para que el deadlock sea imposible (las 4 son necesarias en conjunto). (2) No se pueden negar las 4: la <b>exclusión mutua</b> no se puede negar en general.`,
    fuente: "C4 · Prevención"
  }
]);
