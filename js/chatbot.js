$(document).ready(function () {
  const $openBtn = $("button[aria-label='Chatbot']");
  const $chatWindow = $("#chatbot-window");
  const $closeBtn = $("#chatbot-close");

  const $messagesBox = $("#chatbot-messages");
  const $input = $("#chatbot-input");
  const $sendBtn = $("#chatbot-send");

  // ======================================================
  // 1. ABRIR / CERRAR VENTANA + MENSAJE INICIAL AL ABRIR
  // ======================================================

  // ======================================================
// 1. ABRIR / CERRAR VENTANA + MENSAJE INICIAL AL ABRIR
// ======================================================

$openBtn.on("click", function () {
  const isClosed = $chatWindow.hasClass("opacity-0");
  hideTyping();

  if (isClosed) {
    // Abrir chat
    $chatWindow.removeClass("opacity-0 pointer-events-none scale-95");

    // Solo mostrar mensaje inicial la PRIMER vez
    if (!$chatWindow.data("opened")) {
      $chatWindow.data("opened", true);

      // Esperar un poco antes de empezar a escribir (más natural)
      setTimeout(() => {
        showTyping();

        // Duración del "escribiendo"
        setTimeout(() => {
          hideTyping();

          addMessage(
            "¡Hola! Soy el asistente virtual de Mind & Design. ¿En qué puedo ayudarte hoy?",
            "bot"
          );

          setTimeout(() => {
            addMessage("Aquí tienes algunas opciones rápidas:", "bot");
            addMessage(faqMenu(), "bot");
          }, 300);

        }, 1200); // <── tiempo de typing REALISTA

      }, 400); // <── delay antes de empezar a escribir

    }

  } else {
    // Cerrar chat
    $chatWindow.addClass("opacity-0 pointer-events-none scale-95");
  }
});


  // Botón interno de cierre
  $closeBtn.on("click", function () {
    $chatWindow.addClass("opacity-0 pointer-events-none scale-95");
  });

  // ======================================================
  // 2. ENVÍO DE MENSAJES
  // ======================================================

  $sendBtn.on("click", sendMessage);

  $input.on("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  function sendMessage() {
    const text = $input.val().trim();
    if (text === "") return;

    addMessage(text, "user");
    $input.val("");

    showTyping();

    setTimeout(() => {
      hideTyping();
      addMessage(getBotResponse(text), "bot");
    }, 1200);
  }

  // ======================================================
  // 3. RENDER DE MENSAJES
  // ======================================================

  function addMessage(text, sender) {
    const bubble = `
      <div class="flex ${sender === "user" ? "justify-end" : "justify-start"}">
        <div class="max-w-[80%] p-3 rounded-lg text-sm
          ${sender === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"}">
          ${text}
        </div>
      </div>
    `;

    $messagesBox.append(bubble);
    $messagesBox.scrollTop($messagesBox[0].scrollHeight);
  }

  // ======================================================
  // 4. MENÚ DE FAQ (BOTONES LINDOS)
  // ======================================================

  function faqMenu() {
    return `
      <div class="flex flex-col gap-3 mt-3 faq-container">

        <button class="faq-btn flex items-center gap-3 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-3 rounded-[10px] border border-border transition-all" data-action="locales">
          <span class="font-semibold text-primary">1.</span> 🛍️ <span>Ver locales</span>
        </button>

        <button class="faq-btn flex items-center gap-3 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-3 rounded-[10px] border border-border transition-all" data-action="gastronomia">
          <span class="font-semibold text-primary">2.</span> 🍽️ <span>Gastronomía</span>
        </button>

        <button class="faq-btn flex items-center gap-3 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-3 rounded-[10px] border border-border transition-all" data-action="servicios">
          <span class="font-semibold text-primary">3.</span> ⚙️ <span>Servicios</span>
        </button>

        <button class="faq-btn flex items-center gap-3 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-3 rounded-[10px] border border-border transition-all" data-action="entretenimientos">
          <span class="font-semibold text-primary">4.</span> 🎉 <span>Entretenimientos</span>
        </button>

        <button class="faq-btn flex items-center gap-3 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-3 rounded-[10px] border border-border transition-all" data-action="contacto">
          <span class="font-semibold text-primary">5.</span> 💬 <span>Contacto</span>
        </button>

        <button class="faq-btn flex items-center gap-3 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-3 rounded-[10px] border border-border transition-all" data-action="horarios">
          <span class="font-semibold text-primary">6.</span> 🕒 <span>Horarios de atención</span>
        </button>

        <button class="faq-btn flex items-center gap-3 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-3 rounded-[10px] border border-border transition-all" data-action="ubicacion">
          <span class="font-semibold text-primary">7.</span> 📍 <span>Ubicación</span>
        </button>

      </div>
    `;
  }

  // ======================================================
  // 5. ACCIONES DE FAQ
  // ======================================================

  $(document).on("click", ".faq-btn", function () {
    const action = $(this).data("action");
    const label = $(this).text().trim();

    addMessage(`Quiero saber sobre ${label.toLowerCase()}.`, "user");

    setTimeout(() => {
      switch (action) {
        case "locales":
          addMessage("Perfecto. Te muestro la sección de Locales.", "bot");
          setTimeout(() => (window.location.href = "locales.html"), 800);
          break;

        case "gastronomia":
          addMessage("Claro, te llevo a Gastronomía.", "bot");
          setTimeout(() => (window.location.href = "gastronomia.html"), 800);
          break;

        case "servicios":
          addMessage("Aquí puedes ver los servicios que ofrecemos.", "bot");
          setTimeout(() => (window.location.href = "servicios.html"), 800);
          break;

        case "entretenimientos":
          addMessage("Tenemos actividades y espacios recreativos para toda la familia.", "bot");
          setTimeout(() => (window.location.href = "entretenimientos.html"), 800);
          break;

        case "contacto":
          addMessage("Puedes comunicarte con nosotros desde la sección Contacto.", "bot");
          setTimeout(() => (window.location.href = "contacto.html"), 800);
          break;

        case "horarios":
          addMessage("Nuestro horario es de 10:00 a 22:00 todos los días.", "bot");
          break;

        case "ubicacion":
          addMessage("Nos encontramos en Av. Diseño 1234, frente al parque central.", "bot");
          break;
      }
    }, 600);
  });

  // ======================================================
  // 6. IA SIMPLE (RESPUESTAS AUTOMÁTICAS)
  // ======================================================

  function getBotResponse(msg) {
    const m = msg.toLowerCase();

    if (m.includes("hora") || m.includes("horario")) {
      return "Estamos abiertos de 10:00 a 22:00 todos los días.";
    }

    if (m.includes("ubic")) {
      return "Nos encontramos en Av. Diseño 1234.";
    }

    if (m.includes("servic")) {
      return "Puedes ver todos los servicios en la sección Servicios.";
    }

    if (m.includes("gastronom") || m.includes("comer")) {
      return "Tenemos una excelente selección gastronómica.";
    }

    if (m.includes("entreten")) {
      return "En Entretenimientos encontrarás actividades únicas.";
    }

    if (m.includes("local") || m.includes("tienda")) {
      return "Puedes visitar la sección Locales para ver todas las tiendas.";
    }

    if (m.includes("contact")) {
      return "Puedes escribirnos desde la sección Contacto.";
    }

    return "Entiendo. ¿Querés ver algunas opciones rápidas?" + faqMenu();
  }

  // ======================================================
  // 7. TYPING INDICATOR
  // ======================================================

  function showTyping() {
    $("#typing-indicator").removeClass("hidden");
    $messagesBox.scrollTop($messagesBox[0].scrollHeight);
  }

  function hideTyping() {
    $("#typing-indicator").addClass("hidden");
  }
});
