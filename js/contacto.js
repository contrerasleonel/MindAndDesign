$(document).ready(function () {
  const $form = $("form");

  // Regex
  const soloLetras = /^[A-Za-zÁÉÍÓÚÜáéíóúñÑ ]+$/;
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Función general de error
  function mostrarError($input, mensaje) {
    const campo = $input.data("campo");
    const $error = $(`[data-error="${campo}"]`);

    $input.addClass("border-red-500");
    $error.text(mensaje).removeClass("hidden");
  }

  function limpiarError($input) {
    const campo = $input.data("campo");
    const $error = $(`[data-error="${campo}"]`);

    $input.removeClass("border-red-500");
    $error.addClass("hidden");
  }

  // Validación en tiempo real
  $form.find("input, textarea").each(function () {
    const $input = $(this);

    // Nombre → no permitir números
    if ($input.data("campo") === "nombre") {
      $input.on("input", function () {
        let val = $input.val();

        if (!soloLetras.test(val)) {
          mostrarError($input, "El nombre solo puede contener letras.");
        } else {
          limpiarError($input);
        }

        // Eliminar números automáticamente
        $input.val(val.replace(/[^A-Za-zÁÉÍÓÚÜáéíóúñÑ ]/g, ""));
      });
    }

    // Email
    if ($input.data("campo") === "email") {
      $input.on("input", function () {
        let val = $input.val();

        if (!emailValido.test(val)) {
          mostrarError($input, "Ingresa un email válido.");
        } else {
          limpiarError($input);
        }
      });
    }

    // Asunto y mensaje → solo obligatorio
    if (
      $input.data("campo") === "asunto" ||
      $input.data("campo") === "mensaje"
    ) {
      $input.on("input", function () {
        if ($input.val().trim() === "") {
          mostrarError($input, "Este campo es obligatorio.");
        } else {
          limpiarError($input);
        }
      });
    }
  });

  // Submit final (con loading + alert)
  $form.on("submit", function (e) {
    e.preventDefault();

    let valido = true;

    // Validaciones finales
    $form.find("[data-campo]").each(function () {
      const $input = $(this);
      const val = $input.val().trim();
      const campo = $input.data("campo");

      if (campo === "nombre" && (!val || !soloLetras.test(val))) {
        mostrarError($input, "Ingresa un nombre válido.");
        valido = false;
      }

      if (campo === "email" && !emailValido.test(val)) {
        mostrarError($input, "Ingresa un email válido.");
        valido = false;
      }

      if ((campo === "asunto" || campo === "mensaje") && val === "") {
        mostrarError($input, "Este campo es obligatorio.");
        valido = false;
      }
    });

    if (!valido) return;

    // BOTÓN → LOADING
    const $btn = $form.find("button[type='submit']");
    $btn.prop("disabled", true).addClass("opacity-80");
    const originalText = $btn.text();
    $btn.html(`<span class="flex items-center justify-center gap-2">
        <svg class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10"
                stroke="white" stroke-width="4" fill="none"></circle>
            <path class="opacity-75" fill="white"
                d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 100 16v4l3.5-3.5L12 20v4a8 8 0 01-8-8z"/>
        </svg>
        Enviando...
    </span>`);

    // Simulación de envío
    setTimeout(() => {
      // Mostrar alert estético
      showAlert("¡Mensaje enviado con éxito! Gracias por contactarnos.", true);

      // Resetear form
      $form.trigger("reset");
      $form.find("[data-campo]").each(function () {
        limpiarError($(this));
      });

      // Restaurar botón
      $btn.prop("disabled", false).removeClass("opacity-80").text(originalText);
    }, 1500);
  });

  // ALERTA ESTÉTICA
  function showAlert(texto, success = true) {
    const $alert = $("#alertBox");

    // Resetear clases
    $alert
      .removeClass(
        "hidden opacity-0 -translate-y-4 bg-primary bg-red-500 text-white text-primary-foreground"
      )
      .addClass(
        success ? "bg-primary text-primary-foreground" : "bg-red-500 text-white"
      );

    // Texto
    $alert.text(texto);

    // Mostrar alert con animación
    setTimeout(() => {
      $alert.addClass("opacity-100 translate-y-0");
    }, 10);

    // Ocultar después de 4s
    setTimeout(() => {
      $alert.removeClass("opacity-100 translate-y-0");
      setTimeout(() => $alert.addClass("hidden"), 300);
    }, 4000);
  }
});
