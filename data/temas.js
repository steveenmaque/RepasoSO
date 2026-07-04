/* =====================================================================
   BANCO DE PREGUNTAS — Sistemas Operativos (UNMSM, Prof. Díaz Muñante)
   ---------------------------------------------------------------------
   Estructura de una pregunta:
   {
     id:        "t1-01",
     tema:      "t1",                 // id del tema
     tipo:      "opcion" | "multiple" | "vf" | "abierta",
     dificultad:"media" | "alta" | "trampa",
     enunciado: "texto (admite HTML)",
     recurso:   { tipo:"codigo|comando|tabla|gantt|imagen", cap:"...", contenido:"...", src:"..." }, // opcional
     opciones:  [ { t:"texto", ok:true|false } ],   // para opcion/multiple/vf
     modelo:    "respuesta modelo (abierta/vf)",     // opcional
     enfoque:   "ideal" | "real" | "mixto",          // para abiertas
     claves:    ["punto 1","punto 2"],               // puntos que el profe espera
     explica:   "por qué / la justificación técnica",
     fuente:    "Examen 2025 P.I-4 / Foro 2 / C6 ..."
   }
   Los archivos tema1..tema8 hacen BANCO.add(tema, [ ...preguntas... ]).
   ===================================================================== */

window.BANCO = {
  temas: [
    { id: "t1", nombre: "1 · Introducción a los SO",           desc: "Roles del SO, políticas vs mecanismos, modo usuario/kernel, criterios, Von Neumann." },
    { id: "t2", nombre: "2 · Administración de Procesos",       desc: "Programa/proceso/hilo, PCB, multiplexación, concurrente vs paralelo." },
    { id: "t3", nombre: "3 · Diagrama de Estados (5 y 7/UNIX)", desc: "Transiciones legales, suspendido, zombie, finalizar proceso bloqueado." },
    { id: "t4", nombre: "4 · Sincronización de Procesos",       desc: "Sección crítica, race conditions, semáforos, pseudocódigo P/V." },
    { id: "t5", nombre: "5 · Abrazo Mortal (Deadlock)",         desc: "Coffman, prevenir vs evitar, Banquero, detección." },
    { id: "t6", nombre: "6 · Planificación del CPU",            desc: "FCFS, SJF, SRTF, RR, quantum, cambios de contexto, métricas." },
    { id: "t7", nombre: "7 · Memoria Principal",                desc: "Jerarquía, caché, fragmentación, estrategias, MMU, multiprogramación." },
    { id: "t8", nombre: "8 · Foros (IoT · Linux · vCPU/HT)",    desc: "Seguridad IoT, diagnóstico de servidor Linux, hyperthreading y virtualización." }
  ],
  preguntas: [],
  material: {},   // material[temaId] = HTML extenso con diagramas (lo llenan materialN.js)
  add: function (temaId, arr) {
    arr.forEach(function (q) { q.tema = temaId; });
    this.preguntas = this.preguntas.concat(arr);
  },
  setMaterial: function (temaId, html) { this.material[temaId] = html; },
  getMaterial: function (temaId) { return this.material[temaId] || "<p>(Material en preparación para este tema.)</p>"; },
  porTema: function (temaId) { return this.preguntas.filter(function (q) { return q.tema === temaId; }); },
  nombreTema: function (temaId) {
    var t = this.temas.find(function (x) { return x.id === temaId; });
    return t ? t.nombre : temaId;
  }
};
