/* =====================================================================
   Lógica del simulador. Vanilla JS, sin dependencias.
   Modos:
     (1) Estudiar por tema  -> material de estudio completo (con diagramas)
                               + práctica ESCRITA (escribes tu respuesta y la
                               comparas con la respuesta modelo). Sin nota.
     (2) Examen general      -> ÚNICO modo de prueba: cronometrado, se califica.
   ===================================================================== */
(function () {
  "use strict";
  var app = document.getElementById("app");
  var session = null;
  var timerId = null;

  /* ---------- utilidades ---------- */
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  // Quita TODO resaltado (negritas / color) de un HTML de contenido.
  // Se usa en la práctica por tema: alternativas, pista y respuesta de apoyo
  // no deben tener nada resaltado (ninguna alternativa marcada, todo del mismo tamaño).
  function sinResaltado(html) {
    if (html == null) return "";
    return String(html)
      .replace(/<\/?(?:b|strong)\b[^>]*>/gi, "")        // elimina <b>/<strong>
      .replace(/font-weight\s*:\s*[^;"']*;?/gi, "")      // elimina font-weight inline
      .replace(/(?:^|;)\s*color\s*:\s*[^;"']*;?/gi, ";"); // elimina color de texto inline
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function tipoTexto(tipo) {
    var m = { opcion: "Opción única", multiple: "Opción múltiple", vf: "Verdadero / Falso", abierta: "Desarrollo" };
    return m[tipo] || tipo;
  }

  /* ---------- render de recurso (imagen / código / comando / tabla / gráfico) ---------- */
  function renderRecurso(r) {
    if (!r) return "";
    var cap = r.cap ? '<div class="cap">' + esc(r.cap) + "</div>" : "";
    var cuerpo = "";
    if (r.tipo === "imagen") {
      cuerpo = '<img src="' + r.src + '" alt="' + esc(r.cap || "figura") + '">';
    } else if (r.tipo === "codigo") {
      cuerpo = '<pre class="codigo">' + esc(r.contenido) + "</pre>";
    } else if (r.tipo === "comando") {
      cuerpo = '<pre class="comando">' + esc(r.contenido) + "</pre>";
    } else { // tabla / gantt / grafico(svg): HTML ya confeccionado por el autor
      cuerpo = r.contenido;
    }
    return '<div class="recurso">' + cap + cuerpo + "</div>";
  }

  /* ---------- respuesta modelo / correcta a partir de una pregunta ---------- */
  function textoCorrectas(q) {
    if (q.tipo === "vf") return q.vf ? "Verdadero" : "Falso";
    if (q.opciones) {
      return q.opciones.filter(function (o) { return o.ok; })
        .map(function (o) { return "«" + o.t + "»"; }).join("  ·  ");
    }
    return "";
  }
  function respuestaModelo(q) {
    var out = "";
    if (q.tipo === "abierta") {
      out += "<div>" + q.modelo + "</div>";
      if (q.claves && q.claves.length) {
        out += "<p class='muted' style='margin:8px 0 2px'>Puntos que el profesor espera:</p><ul class='claves'>";
        q.claves.forEach(function (c) { out += "<li>" + c + "</li>"; });
        out += "</ul>";
      }
    } else if (q.tipo === "vf") {
      out += "<p>La afirmación es <b>" + (q.vf ? "VERDADERA" : "FALSA") + "</b>.</p>";
    } else {
      out += "<p>Respuesta correcta: <b>" + textoCorrectas(q) + "</b></p>";
    }
    if (q.explica) out += "<div>" + q.explica + "</div>";
    return out;
  }

  /* ---------- estado por pregunta (usado en examen) ---------- */
  function estadoDe(q) {
    if (!session.estado[q.id]) {
      var e = { seleccion: null, sel: [], contestada: false, correcta: null, texto: "", modeloVisto: false, altVisto: false, pistaVisto: false };
      if (q.opciones) e.ops = q.opciones.slice(); // sin barajar el orden de opciones (más limpio)
      session.estado[q.id] = e;
    }
    return session.estado[q.id];
  }

  /* =====================================================================
     PANTALLA DE INICIO
     ===================================================================== */
  function renderHome() {
    detenerTimer();
    var total = BANCO.preguntas.length;
    var html = '<div class="card">' +
      "<h2>Elige una opción</h2>" +
      '<p class="muted">Curso de Sistemas Operativos. Material de estudio por tema (con diagramas) y un examen general cronometrado. ' +
      "Banco actual: " + total + " preguntas en " + BANCO.temas.length + " temas.</p>" +
      '<button onclick="App.menuTemas()">Estudiar por tema</button>' +
      '<button onclick="App.configExamen()">Examen general</button>' +
      "</div>";
    html += '<div class="card"><h2>Cómo se usa</h2><ul>' +
      "<li><b>Estudiar por tema:</b> lees el <b>material de estudio completo</b> (teoría + diagramas de flujo) y luego practicas <b>escribiendo tu respuesta</b> y comparándola con la respuesta modelo. Aquí no hay nota: es para aprender.</li>" +
      "<li><b>Examen general:</b> es el <b>único modo de prueba</b>. Arma un examen mixto cronometrado (como el real, 80 min): Parte I (marcar) + Parte II (desarrollo). Al final se califica la Parte I y se muestran las respuestas modelo.</li>" +
      "</ul></div>";
    app.innerHTML = html;
  }

  /* =====================================================================
     MENÚ DE TEMAS
     ===================================================================== */
  function menuTemas() {
    detenerTimer();
    var html = '<div class="barra"><button class="sec small" onclick="App.home()">Inicio</button></div>';
    html += '<div class="card"><h2>Estudiar por tema</h2>' +
      '<p class="muted">Elige un tema para leer su material de estudio y practicar escribiendo tus respuestas.</p></div>';
    BANCO.temas.forEach(function (t) {
      var n = BANCO.porTema(t.id).length;
      html += '<div class="tema-item"><div class="info"><b>' + esc(t.nombre) +
        '</b><span class="muted">' + esc(t.desc) + "</span></div>" +
        '<div><span class="badge">' + n + " preguntas</span> " +
        '<button class="small" onclick="App.estudiar(\'' + t.id + '\')">Abrir</button></div></div>';
    });
    app.innerHTML = html;
  }

  /* =====================================================================
     ESTUDIAR: MATERIAL DE ESTUDIO
     ===================================================================== */
  function estudiar(temaId) {
    detenerTimer();
    var nombre = BANCO.nombreTema(temaId);
    var n = BANCO.porTema(temaId).length;
    var html = '<div class="barra"><button class="sec small" onclick="App.menuTemas()">Temas</button>' +
      '<button class="small" onclick="App.practicarTema(\'' + temaId + '\')">Ir a la práctica escrita (' + n + ')</button></div>';
    html += '<div class="material">' + BANCO.getMaterial(temaId) + "</div>";
    html += '<div class="barra" style="margin-top:16px">' +
      '<button class="sec small" onclick="App.menuTemas()">Temas</button>' +
      '<button onclick="App.practicarTema(\'' + temaId + '\')">Practicar este tema (escribir respuestas) →</button></div>';
    app.innerHTML = html;
    window.scrollTo(0, 0);
    kickAnimations(); // asegura que las animaciones SVG (SMIL) arranquen tras insertar el material
  }

  // Reinicia la línea de tiempo de las animaciones SVG insertadas dinámicamente.
  function kickAnimations() {
    if (!app.querySelectorAll) return;
    var svgs = app.querySelectorAll("svg");
    for (var i = 0; i < svgs.length; i++) {
      try { if (svgs[i].setCurrentTime) svgs[i].setCurrentTime(0); } catch (e) {}
    }
  }

  /* =====================================================================
     PRÁCTICA ESCRITA (por tema) — sin nota, comparas con el modelo
     ===================================================================== */
  function practicarTema(temaId) {
    var qs = shuffle(BANCO.porTema(temaId));
    session = { modo: "practica", temaId: temaId, preguntas: qs, idx: 0, estado: {} };
    renderPractica();
  }

  // Pista de ayuda: orienta SIN entregar la respuesta. Combina una guía por tipo
  // de pregunta con los "puntos clave" que el profesor espera (si existen).
  function pistaDe(q) {
    var guia = {
      opcion: "Solo una alternativa es correcta: descarta las que tengan un error conceptual.",
      multiple: "Puede haber más de una alternativa correcta; evalúa cada una por separado.",
      vf: "Si cualquier parte de la afirmación falla, la respuesta es Falsa.",
      abierta: "Estructura tu respuesta: concreto + justificación técnica + declara tus supuestos."
    };
    var out = "<p style='margin:0 0 6px'>" + esc(guia[q.tipo] || "Piensa en el concepto central del tema.") + "</p>";
    if (q.claves && q.claves.length) {
      out += "<p class='muted' style='margin:6px 0 2px'>Enfócate en:</p><ul class='claves'>";
      q.claves.forEach(function (c) { out += "<li>" + sinResaltado(c) + "</li>"; });
      out += "</ul>";
    }
    out += "<p class='muted' style='margin:6px 0 0'>Repasa el material de: " + esc(BANCO.nombreTema(q.tema)) + ".</p>";
    return out;
  }

  function renderPractica() {
    var q = session.preguntas[session.idx];
    var e = estadoDe(q);
    var total = session.preguntas.length;
    var hayAlt = !!(q.opciones && q.opciones.length);

    var html = '<div class="barra">' +
      '<button class="sec small" onclick="App.estudiar(\'' + session.temaId + '\')">Volver al material</button>' +
      '<span class="progreso">Práctica ' + (session.idx + 1) + " / " + total + " · " + esc(BANCO.nombreTema(q.tema)) + "</span>" +
      '<button class="sec small" onclick="App.menuTemas()">Temas</button></div>';

    html += '<div class="card">';
    html += '<div class="pregunta-num">Pregunta de práctica · ' + tipoTexto(q.tipo) + "</div>";
    html += '<div class="enunciado">' + q.enunciado + "</div>";
    html += renderRecurso(q.recurso);
    html += '<p class="muted" style="margin-top:10px">Escribe tu respuesta (concreta, con justificación técnica y declarando supuestos):</p>';
    html += '<textarea id="respPractica" oninput="App.guardarTexto(this.value)" placeholder="Tu respuesta...">' + esc(e.texto || "") + "</textarea>";

    // --- Botones de apoyo: nada se ve hasta pulsarlos ---
    html += '<div class="apoyo-btns">';
    if (hayAlt) {
      html += '<button class="sec small" onclick="App.verAlternativas()">' +
        (e.altVisto ? "Ocultar alternativas" : "Ver alternativas") + "</button>";
    }
    html += '<button class="sec small" onclick="App.verPista()">' +
      (e.pistaVisto ? "Ocultar ayuda" : "Pedir ayuda") + "</button>";
    html += '<button onclick="App.verModelo()">' +
      (e.modeloVisto ? "Ocultar respuesta" : "Ver respuesta de apoyo") + "</button>";
    html += "</div>";

    // Alternativas: solo de referencia, ninguna resaltada, todas del mismo tamaño.
    if (hayAlt && e.altVisto) {
      html += '<ul class="alt-lista">';
      q.opciones.forEach(function (o) { html += "<li>" + sinResaltado(o.t) + "</li>"; });
      html += "</ul>";
    }
    // Ayuda (pista): orienta sin dar la respuesta.
    if (e.pistaVisto) {
      html += '<div class="pista"><h4>Ayuda</h4>' + pistaDe(q) + "</div>";
    }
    // Respuesta de apoyo: la respuesta modelo, sin resaltado.
    if (e.modeloVisto) {
      html += '<div class="modelo"><h4>Respuesta de apoyo</h4>' + sinResaltado(respuestaModelo(q)) + "</div>";
      if (q.fuente) html += '<div class="fuente">Fuente: ' + esc(q.fuente) + "</div>";
    }
    html += "</div>";

    html += '<div class="barra">' +
      '<button class="sec" onclick="App.nav(-1)" ' + (session.idx === 0 ? "disabled" : "") + ">Anterior</button>" +
      '<button onclick="App.nav(1)" ' + (session.idx === total - 1 ? "disabled" : "") + ">Siguiente</button></div>";
    app.innerHTML = html;
    window.scrollTo(0, 0);
  }

  function guardarTexto(v) { estadoDe(session.preguntas[session.idx]).texto = v; }
  // Toggles de apoyo en la práctica (y respuesta modelo también en el examen).
  function verModelo() {
    var e = estadoDe(session.preguntas[session.idx]);
    e.modeloVisto = session.modo === "practica" ? !e.modeloVisto : true;
    (session.modo === "practica" ? renderPractica : renderSesion)();
  }
  function verAlternativas() { var e = estadoDe(session.preguntas[session.idx]); e.altVisto = !e.altVisto; renderPractica(); }
  function verPista() { var e = estadoDe(session.preguntas[session.idx]); e.pistaVisto = !e.pistaVisto; renderPractica(); }

  /* =====================================================================
     CONFIGURACIÓN DEL EXAMEN GENERAL (único modo de prueba)
     ===================================================================== */
  function configExamen() {
    detenerTimer();
    var nObj = BANCO.preguntas.filter(function (q) { return q.tipo !== "abierta"; }).length;
    var nAb = BANCO.preguntas.filter(function (q) { return q.tipo === "abierta"; }).length;
    var checks = BANCO.temas.map(function (t) {
      return '<label style="font-weight:400"><input type="checkbox" class="tsel" value="' + t.id + '" checked> ' + esc(t.nombre) + "</label>";
    }).join("");
    var html = '<div class="barra"><button class="sec small" onclick="App.home()">Inicio</button></div>';
    html += '<div class="card"><h2>Armar examen general</h2>' +
      '<p class="muted">Simula el parcial: Parte I (marcar) + Parte II (desarrollo). Es el único modo que se califica. Disponibles: ' + nObj + " objetivas y " + nAb + " de desarrollo.</p>" +
      '<div class="config-row"><label>Preguntas objetivas (opción múltiple / V-F): </label>' +
      '<input id="cfgObj" type="number" min="0" max="' + nObj + '" value="12" style="width:70px"></div>' +
      '<div class="config-row"><label>Preguntas de desarrollo: </label>' +
      '<input id="cfgAb" type="number" min="0" max="' + nAb + '" value="4" style="width:70px"></div>' +
      '<div class="config-row"><label>Tiempo (minutos, 0 = sin límite): </label>' +
      '<input id="cfgMin" type="number" min="0" max="240" value="80" style="width:70px"></div>' +
      '<div class="config-row"><label>Temas incluidos:</label><br>' + checks + "</div>" +
      '<button onclick="App.iniciarExamen()">Comenzar examen</button>' +
      "</div>";
    app.innerHTML = html;
  }

  function iniciarExamen() {
    var nObj = parseInt(document.getElementById("cfgObj").value, 10) || 0;
    var nAb = parseInt(document.getElementById("cfgAb").value, 10) || 0;
    var min = parseInt(document.getElementById("cfgMin").value, 10) || 0;
    var temas = Array.prototype.map.call(document.querySelectorAll(".tsel:checked"), function (c) { return c.value; });
    if (temas.length === 0) { alert("Selecciona al menos un tema."); return; }
    if (nObj + nAb === 0) { alert("Elige al menos una pregunta."); return; }

    var pool = BANCO.preguntas.filter(function (q) { return temas.indexOf(q.tema) >= 0; });
    var obj = shuffle(pool.filter(function (q) { return q.tipo !== "abierta"; })).slice(0, nObj);
    var ab = shuffle(pool.filter(function (q) { return q.tipo === "abierta"; })).slice(0, nAb);
    var preguntas = obj.concat(ab); // Parte I luego Parte II

    session = {
      modo: "examen", preguntas: preguntas, idx: 0, estado: {},
      tiempoFin: min > 0 ? Date.now() + min * 60000 : null, minutos: min,
      nObj: obj.length, nAb: ab.length, finalizado: false
    };
    if (min > 0) iniciarTimer();
    renderSesion();
  }

  /* ---------- Temporizador ---------- */
  function iniciarTimer() {
    detenerTimer();
    timerId = setInterval(function () {
      if (!session || session.finalizado) { detenerTimer(); return; }
      var el = document.getElementById("reloj");
      var rest = session.tiempoFin - Date.now();
      if (rest <= 0) { detenerTimer(); finalizarExamen(true); return; }
      if (el) {
        var m = Math.floor(rest / 60000), s = Math.floor((rest % 60000) / 1000);
        el.textContent = "Tiempo: " + m + ":" + (s < 10 ? "0" : "") + s;
        el.className = "reloj" + (rest < 5 * 60000 ? " alerta" : "");
      }
    }, 500);
  }
  function detenerTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }

  /* =====================================================================
     RENDER DE UNA PREGUNTA (EXAMEN)
     ===================================================================== */
  function renderSesion() {
    var q = session.preguntas[session.idx];
    var e = estadoDe(q);
    var total = session.preguntas.length;

    var reloj = session.tiempoFin ? '<span id="reloj" class="reloj"></span>' : "";
    var parte = session.idx < session.nObj ? "Parte I · Marcar" : "Parte II · Desarrollo";
    var html = '<div class="barra">' +
      '<button class="sec small" onclick="App.confirmarSalir()">Abandonar</button>' +
      '<span class="progreso">Pregunta ' + (session.idx + 1) + " / " + total + " · <b>" + parte + "</b></span>" +
      reloj + "</div>";

    html += '<div class="card">';
    html += '<div class="pregunta-num">' + esc(BANCO.nombreTema(q.tema)) + " · " + tipoTexto(q.tipo) + "</div>";
    html += '<div class="enunciado">' + q.enunciado + "</div>";
    html += renderRecurso(q.recurso);
    html += renderControl(q, e);
    if (session.finalizado) html += renderFeedbackExamen(q, e);
    html += "</div>";

    html += '<div class="barra">';
    html += '<button class="sec" onclick="App.nav(-1)" ' + (session.idx === 0 ? "disabled" : "") + ">Anterior</button>";
    var esUltima = session.idx === total - 1;
    if (!session.finalizado && esUltima) {
      html += '<button onclick="App.finExamen()">Finalizar examen</button>';
    } else {
      html += '<button onclick="App.nav(1)" ' + (esUltima ? "disabled" : "") + ">Siguiente</button>";
    }
    html += "</div>";
    html += navegadorRapido();
    app.innerHTML = html;
  }

  function renderControl(q, e) {
    var bloqueado = session.finalizado; // en examen solo se bloquea al terminar
    if (q.tipo === "abierta") {
      return '<textarea id="respAbierta" placeholder="Escribe tu respuesta: concreta, con justificación técnica y declarando supuestos..." ' +
        (bloqueado ? "disabled" : "") + ' oninput="App.guardarTexto(this.value)">' + esc(e.texto || "") + "</textarea>";
    }
    if (q.tipo === "vf") {
      var opt = function (label, val) {
        return '<label class="' + (e.seleccion === val ? "marcada" : "") + '">' +
          '<input type="radio" name="vf" ' + (e.seleccion === val ? "checked" : "") + " " + (bloqueado ? "disabled" : "") +
          ' onclick="App.selVF(' + val + ')"> ' + label + "</label>";
      };
      return '<div class="opciones">' + opt("Verdadero", true) + opt("Falso", false) + "</div>";
    }
    var multi = q.tipo === "multiple";
    var out = '<div class="opciones">';
    if (multi) out += '<p class="muted">Marca <b>todas</b> las correctas.</p>';
    e.ops.forEach(function (o, i) {
      var marcada = multi ? (e.sel.indexOf(i) >= 0) : (e.seleccion === i);
      var input = multi
        ? '<input type="checkbox" ' + (marcada ? "checked" : "") + " " + (bloqueado ? "disabled" : "") + ' onclick="App.selMulti(' + i + ')">'
        : '<input type="radio" name="op" ' + (marcada ? "checked" : "") + " " + (bloqueado ? "disabled" : "") + ' onclick="App.selOp(' + i + ')">';
      out += '<label class="' + (marcada ? "marcada" : "") + '">' + input + " " + o.t + "</label>";
    });
    out += "</div>";
    return out;
  }

  function respuestaUsuario(q, e) {
    if (q.tipo === "vf") return e.seleccion === true ? "Verdadero" : e.seleccion === false ? "Falso" : "(sin responder)";
    if (q.tipo === "multiple") return e.sel.length ? e.sel.map(function (i) { return "«" + e.ops[i].t + "»"; }).join("  ·  ") : "(sin responder)";
    if (q.tipo === "opcion") return e.seleccion !== null ? "«" + e.ops[e.seleccion].t + "»" : "(sin responder)";
    return "";
  }

  function renderFeedbackExamen(q, e) {
    var out = "";
    if (q.tipo === "abierta") {
      out += '<div class="modelo"><h4>Respuesta modelo</h4>' + respuestaModelo(q) + "</div>";
    } else {
      out += '<div class="feedback"><b>' + (e.correcta ? "Correcto." : "Incorrecto.") + "</b> " +
        "Tu respuesta: " + respuestaUsuario(q, e) + ". Respuesta correcta: <b>" + textoCorrectas(q) + "</b>." +
        (q.explica ? "<div style='margin-top:6px'>" + q.explica + "</div>" : "") + "</div>";
    }
    if (q.fuente) out += '<div class="fuente">Fuente: ' + esc(q.fuente) + "</div>";
    return out;
  }

  /* ---------- navegador rápido (examen) ---------- */
  function navegadorRapido() {
    var out = '<div class="card"><p class="muted" style="margin:0 0 6px">Navegación (en negrita = respondida):</p>';
    session.preguntas.forEach(function (q, i) {
      var e = session.estado[q.id];
      var hecha = e && (e.seleccion !== null && e.seleccion !== undefined || (e.sel && e.sel.length) || (e.texto && e.texto.trim()));
      var cur = i === session.idx ? 'style="outline:2px solid #2c3e50"' : "";
      out += '<button class="small sec nav-q ' + (hecha ? "hecha" : "") + '" ' + cur + ' onclick="App.ir(' + i + ')">' + (i + 1) + "</button>";
    });
    out += "</div>";
    return out;
  }

  /* =====================================================================
     INTERACCIONES (examen)
     ===================================================================== */
  function cur() { return session.preguntas[session.idx]; }
  function selOp(i) { var e = estadoDe(cur()); if (session.finalizado) return; e.seleccion = i; renderSesion(); }
  function selMulti(i) {
    var e = estadoDe(cur()); if (session.finalizado) return;
    var p = e.sel.indexOf(i); if (p >= 0) e.sel.splice(p, 1); else e.sel.push(i);
    renderSesion();
  }
  function selVF(v) { var e = estadoDe(cur()); if (session.finalizado) return; e.seleccion = v; renderSesion(); }

  function nav(d) {
    var n = session.idx + d;
    if (n < 0 || n >= session.preguntas.length) return;
    session.idx = n;
    (session.modo === "practica" ? renderPractica : renderSesion)();
  }
  function ir(i) { session.idx = i; (session.modo === "practica" ? renderPractica : renderSesion)(); }

  function confirmarSalir() {
    if (confirm("¿Abandonar el examen? Se perderá el progreso.")) { detenerTimer(); renderHome(); }
  }
  function finExamen() {
    var pend = session.preguntas.filter(function (q) {
      var e = session.estado[q.id];
      return !(e && (e.seleccion !== null && e.seleccion !== undefined || (e.sel && e.sel.length) || (e.texto && e.texto.trim())));
    }).length;
    var msg = pend > 0 ? "Tienes " + pend + " pregunta(s) sin responder. ¿Finalizar de todas formas?" : "¿Finalizar y calificar el examen?";
    if (confirm(msg)) finalizarExamen(false);
  }

  /* =====================================================================
     CALIFICACIÓN DEL EXAMEN
     ===================================================================== */
  function finalizarExamen(porTiempo) {
    detenerTimer();
    session.finalizado = true;
    session.preguntas.forEach(function (q) {
      var e = estadoDe(q);
      if (q.tipo === "opcion") { e.correcta = (e.seleccion !== null && e.ops[e.seleccion] && e.ops[e.seleccion].ok) || false; }
      else if (q.tipo === "multiple") {
        var correctas = e.ops.map(function (o, i) { return o.ok ? i : -1; }).filter(function (i) { return i >= 0; });
        e.correcta = e.sel.length > 0 && correctas.length === e.sel.length && correctas.every(function (i) { return e.sel.indexOf(i) >= 0; });
      }
      else if (q.tipo === "vf") { e.correcta = (e.seleccion !== null && e.seleccion === q.vf); }
    });
    renderResultado(porTiempo);
  }

  function renderResultado(porTiempo) {
    var objs = session.preguntas.filter(function (q) { return q.tipo !== "abierta"; });
    var abs = session.preguntas.filter(function (q) { return q.tipo === "abierta"; });
    var aciertos = objs.filter(function (q) { return session.estado[q.id].correcta; }).length;
    var pObj = objs.length;

    var html = '<div class="barra"><button class="sec small" onclick="App.home()">Inicio</button></div>';
    html += '<div class="card"><h2>Resultado del examen</h2>';
    if (porTiempo) html += '<p class="feedback">Se acabó el tiempo. Se calificó lo respondido.</p>';
    html += '<p>Parte I (objetivas): <span class="score">' + aciertos + " / " + pObj + "</span>";
    if (pObj) html += " (" + Math.round((aciertos / pObj) * 100) + "%)";
    html += "</p>";
    if (abs.length) html += '<p class="muted">Parte II (desarrollo): ' + abs.length +
      " pregunta(s). No se autocalifican: revísalas abajo y compáralas con la respuesta modelo.</p>";
    html += '<button onclick="App.revisar()">Revisar pregunta por pregunta</button>';
    html += '<button class="sec" onclick="App.configExamen()">Otro examen</button>';
    html += "</div>";

    html += '<div class="card"><h2>Resumen</h2>';
    session.preguntas.forEach(function (q, i) {
      var e = session.estado[q.id];
      var estado = q.tipo === "abierta" ? '<span class="pill pend">desarrollo</span>'
        : (e.correcta ? '<span class="pill ok">correcta</span>' : '<span class="pill mal">incorrecta</span>');
      html += '<div class="resumen-item"><a href="#" onclick="App.revisarEn(' + i + ');return false;">' +
        (i + 1) + ". " + textoCorto(q.enunciado) + "</a> " + estado + "</div>";
    });
    html += "</div>";
    app.innerHTML = html;
    window.scrollTo(0, 0);
  }
  function textoCorto(h) {
    var d = document.createElement("div"); d.innerHTML = h;
    var t = d.textContent || ""; return t.length > 90 ? t.slice(0, 90) + "…" : t;
  }
  function revisar() { session.idx = 0; renderSesion(); }
  function revisarEn(i) { session.idx = i; renderSesion(); }

  /* =====================================================================
     API PÚBLICA
     ===================================================================== */
  window.App = {
    home: renderHome, menuTemas: menuTemas, estudiar: estudiar, practicarTema: practicarTema,
    configExamen: configExamen, iniciarExamen: iniciarExamen,
    selOp: selOp, selMulti: selMulti, selVF: selVF, guardarTexto: guardarTexto, verModelo: verModelo,
    verAlternativas: verAlternativas, verPista: verPista,
    nav: nav, ir: ir, confirmarSalir: confirmarSalir, finExamen: finExamen,
    revisar: revisar, revisarEn: revisarEn
  };

  if (!window.BANCO || !BANCO.preguntas.length) {
    app.innerHTML = '<div class="card"><h2>Error</h2><p>No se cargó el banco de preguntas. Abre <b>index.html</b> con doble clic (no muevas los archivos de la carpeta <code>data/</code>).</p></div>';
  } else {
    renderHome();
  }
})();
