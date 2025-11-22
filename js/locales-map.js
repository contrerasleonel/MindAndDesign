// ====================================================================
// LOCALES-MAP.JS — MAPA INTERACTIVO CON TOOLTIP Y BOTTOM SHEET
// Versión mejorada con accesibilidad WCAG 2.1 AA y Heurísticas de Nielsen
// ====================================================================
let activeTouchLocalId = null;

// ====================================================================
// CONFIGURACIÓN: Íconos por categoría
// ====================================================================
const categoryIcons = {
  Moda: "shirt",
  Iluminación: "lightbulb",
  Decoración: "sofa",
  Próximamente: "clock",
};

// ====================================================================
// 1. COLORES POR CATEGORÍA
// Mantiene la identidad visual del proyecto
// ====================================================================
function getCategoryColor(category, active) {
  if (!active) return "#B0B0B0"; // gris si está inactivo

  switch (category) {
    case "Moda":
      return "#7A8061"; // PRIMARIO
    case "Iluminación":
      return "#A89976";
    case "Decoración":
      return "#AFC1A1";
    default:
      return "#7A8061";
  }
}

// ====================================================================
// 2. DIBUJAR LOCALES EN SVG
// Renderiza los locales manteniendo semántica y accesibilidad
// ====================================================================
function drawLocals(floor = 1) {
  const layer = document.getElementById("localsLayer");
  if (!layer) {
    console.warn("No se encontró #localsLayer");
    return;
  }

  let svgContent = "";

  localsData
    .filter((l) => l.floor === floor)
    .forEach((local) => {
      const color = getCategoryColor(local.category, local.isActive);
      const ariaLabel = `Local ${local.name}, categoría ${local.category}${
        local.isActive
          ? ", haz clic para ver más información"
          : ", próximamente"
      }`;

      svgContent += `
        <g 
          class="local-item" 
          data-id="${local.id}" 
          tabindex="0" 
          role="button"
          aria-label="${ariaLabel}"
          style="cursor: ${
            local.isActive ? "pointer" : "default"
          }; outline: none;"
        >
          <rect
            class="local-rect"
            x="${local.mapPosition.x}"
            y="${local.mapPosition.y}"
            width="12"
            height="12"
            rx="1"
            fill="#FFFFFF"
            stroke="${color}"
            stroke-width="0.5"
            opacity="${local.isActive ? 1 : 0.6}"
            style="transition: all 0.2s ease;"
          ></rect>

          <text
            x="${local.mapPosition.x + 6}"
            y="${local.mapPosition.y + 7}"
            text-anchor="middle"
            font-size="3"
            fill="${color}"
            pointer-events="none"
          >
            ${local.id}
          </text>
        </g>
      `;
    });

  layer.innerHTML = svgContent;
}

// ====================================================================
// 3. DETECTAR DISPOSITIVO
// Determina si estamos en mobile/tablet (táctil) o desktop
// ====================================================================
function isMobile() {
  // Mobile y tablets (hasta 1024px) usan bottom sheet
  return window.innerWidth < 1024;
}

// ====================================================================
// 4. TOOLTIP DESKTOP
// Tooltip que sigue al cursor con clamping para no salir de pantalla
// ====================================================================
function initDesktopTooltip() {
  const tooltip = $("#mapTooltip");
  let currentLocalId = null;

  // HOVER: Mostrar tooltip
  $("#localsLayer").on("mouseenter", "g", function () {
    if (isMobile()) return; // Solo en desktop

    const id = Number($(this).data("id"));
    const local = localsData.find((l) => l.id === id);
    if (!local) return;

    currentLocalId = id;
    const color = getCategoryColor(local.category, local.isActive);

    // Efecto hover SUTIL: solo añadir borde más grueso y sombra suave
    $(this).find("rect").css({
      "stroke-width": "1.5",
      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
      transition: "all 0.2s ease",
    });
    $(this).find("rect").attr("fill", color);
    $(this).find("text").attr("fill", "#FFFFFF");

    // Generar contenido del tooltip
    tooltip.html(`
      <div class="border border-border rounded-[12px] bg-card shadow-xl p-4 w-full">
        <div class="flex items-center gap-3 mb-2">
          <i 
            data-lucide="${categoryIcons[local.category] || "store"}" 
            class="w-5 h-5"
            style="color:${color}"
          ></i>
          <h4 class="text-lg font-medium m-0">${local.name}</h4>
        </div>

        <p class="text-sm font-medium mb-1" style="color:${color}">${local.category}</p>

        <p class="text-sm text-muted-foreground leading-5 mb-2">
          ${local.description}
        </p>

        <p class="text-xs text-muted mb-3">${local.location}</p>

        ${
          local.isActive
            ? ` <p class="text-xs text-muted-foreground mt-2 hidden md:block">
                (Hacé clic para ver más de este local)</p>`
            : ` <div class="mt-2 hidden md:block text-xs text-muted-foreground bg-secondary/60 px-3 py-2 rounded-lg">
        Este local está en preparación.
                </div>`
        }
      </div>
    `);

    // Re-inicializar iconos de Lucide
    lucide.createIcons();

    // Mostrar tooltip
    tooltip.removeClass("hidden");
  });

  // MOVIMIENTO: Tooltip sigue al cursor con clamping
  $("#localsLayer").on("mousemove", "g", function (e) {
    if (isMobile()) return;

    const tooltipWidth = tooltip.outerWidth();
    const tooltipHeight = tooltip.outerHeight();
    const padding = 20;

    // Posición inicial
    let left = e.clientX + padding;
    let top = e.clientY - padding;

    // Clamping horizontal
    if (left + tooltipWidth > window.innerWidth) {
      left = e.clientX - tooltipWidth - padding;
    }

    // Clamping vertical
    if (top + tooltipHeight > window.innerHeight) {
      top = window.innerHeight - tooltipHeight - padding;
    }
    if (top < padding) {
      top = padding;
    }

    tooltip.css({
      position: "fixed",
      left: left + "px",
      top: top + "px",
    });
  });

  // SALIR: Restaurar estado original
  $("#localsLayer").on("mouseleave", "g", function () {
    if (isMobile()) return;

    const id = Number($(this).data("id"));
    const local = localsData.find((l) => l.id === id);
    if (!local) return;

    // 🔥 RECALCULAR color ORIGINAL
    const color = getCategoryColor(local.category, local.isActive);

    // Restaurar rect
    $(this).find("rect").css({
      "stroke-width": "0.5",
      filter: "none",
      transition: "all 0.2s ease",
    });
    $(this).find("rect").attr("fill", "#FFFFFF");

    // Restaurar color del número
    $(this).find("text").attr("fill", color);

    // Ocultar tooltip
    tooltip.addClass("hidden");
  });
  // CLICK: Navegar al local (solo si está activo)
  $("#localsLayer").on("click", "g", function () {
    if (isMobile()) return;

    const id = Number($(this).data("id"));
    const local = localsData.find((l) => l.id === id);
    if (!local || !local.isActive) return;

    window.location.href = `local.html?id=${id}`;
  });

  // TECLADO: Enter para navegar
  $("#localsLayer").on("keydown", "g", function (e) {
    if (isMobile()) return;
    if (e.key !== "Enter" && e.key !== " ") return;

    e.preventDefault();
    const id = Number($(this).data("id"));
    const local = localsData.find((l) => l.id === id);
    if (!local || !local.isActive) return;

    window.location.href = `local.html?id=${id}`;
  });
}

// ====================================================================
// 5. BOTTOM SHEET MOBILE
// Modal inferior para dispositivos táctiles
// ====================================================================
function initMobileBottomSheet() {
  const sheet = $("#mapBottomSheet");
  let lastTouchedId = null;
  let touchStartTime = 0;

  // TOUCH START: Preparar interacción
  $("#localsLayer").on("touchstart", "g", function () {
    if (!isMobile()) return;

    const id = Number($(this).data("id"));
    const local = localsData.find((l) => l.id === id);
    if (!local) return;

    const color = getCategoryColor(local.category, local.isActive);

    // 🔥 DESMARCAR EL ANTERIOR
    if (activeTouchLocalId !== null && activeTouchLocalId !== id) {
      const prev = $(`g[data-id="${activeTouchLocalId}"]`);
      const prevLocal = localsData.find((l) => l.id === activeTouchLocalId);
      const prevColor = getCategoryColor(
        prevLocal.category,
        prevLocal.isActive
      );

      prev.find("rect").css({
        "stroke-width": "0.5",
        filter: "none",
      });
      prev.find("rect").attr("fill", "#FFFFFF");
      prev.find("text").attr("fill", prevColor);
    }

    // 🔥 MARCAR EL NUEVO LOCAL SELECCIONADO
    activeTouchLocalId = id;

    $(this).find("rect").css({
      "stroke-width": "1.5",
      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
      transition: "all 0.2s ease",
    });

    $(this).find("rect").attr("fill", color);
    $(this).find("text").attr("fill", "#FFFFFF");

    // Abrir bottom sheet
    openBottomSheet(local);
  });

  // 🔥 DESMARCAR EL LOCAL ACTIVO AL CERRAR
  // 🔥 DESMARCAR EL LOCAL ACTIVO AL TOCAR "X"
  if (activeTouchLocalId !== null) {
    const g = $(`g[data-id="${activeTouchLocalId}"]`);
    const local = localsData.find((l) => l.id === activeTouchLocalId);
    const color = getCategoryColor(local.category, local.isActive);

    g.find("rect").css({
      "stroke-width": "0.5",
      filter: "none",
    });

    g.find("rect").attr("fill", "#FFFFFF");
    g.find("text").attr("fill", color);

    activeTouchLocalId = null;
  }

  // Función para abrir el bottom sheet
  function openBottomSheet(local) {
    const color = getCategoryColor(local.category, local.isActive);

    sheet.html(`
      <div class="flex justify-between items-start mb-4">
        <div class="flex items-center gap-3">
          <i 
            data-lucide="${categoryIcons[local.category] || "store"}" 
            class="w-6 h-6"
            style="color:${color}"
          ></i>
          <h4 class="text-xl font-medium m-0">${local.name}</h4>
        </div>
        <button 
          id="closeBottomSheet" 
          class="p-2 hover:bg-secondary rounded-lg transition-colors"
          aria-label="Cerrar información del local"
        >
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <p class="text-base font-medium mb-2" style="color:${color}">${
      local.category
    }</p>

      <p class="text-base text-muted-foreground leading-6 mb-3">
        ${local.description}
      </p>

      <p class="text-sm text-muted mb-4">
        <i data-lucide="map-pin" class="w-4 h-4 inline mr-1"></i>
        ${local.location}
      </p>

      ${
        local.isActive
          ? `<a 
              href="local.html?id=${local.id}" 
              class="w-full h-12 rounded-[10px] bg-primary text-primary-foreground shadow-soft hover:bg-accent transition font-medium text-base flex items-center justify-center"
              aria-label="Ver más información del local ${local.name}"
            >
              Ver Local →
            </a>`
          : `<div class="w-full h-12 rounded-[10px] bg-secondary text-muted grid place-content-center text-base">
              En preparación
            </div>`
      }
    `);

    // Re-inicializar iconos
    lucide.createIcons();

    // Mostrar con animación
    sheet
      .removeClass("hidden")
      .attr("aria-modal", "true")
      .attr("role", "dialog")
      .attr("aria-labelledby", "bottomSheetTitle");

    setTimeout(() => {
      sheet.css("transform", "translateY(0)");
    }, 10);

    // Foco inicial en el botón cerrar
    $("#closeBottomSheet").focus();

    // Cerrar con botón
    $("#closeBottomSheet").on("click", closeBottomSheet);

    // Cerrar tocando fuera
    sheet.on("click", function (e) {
      if (e.target === this) {
        closeBottomSheet();
      }
    });
  }

  // Función para cerrar el bottom sheet
  function closeBottomSheet() {
    sheet.css("transform", "translateY(100%)");
    setTimeout(() => {
      sheet.addClass("hidden").removeAttr("aria-modal").removeAttr("role");

      // 🔥 DESMARCAR EL LOCAL ACTIVO AL TOCAR "X"
      if (activeTouchLocalId !== null) {
        const g = $(`g[data-id="${activeTouchLocalId}"]`);
        const local = localsData.find((l) => l.id === activeTouchLocalId);
        const color = getCategoryColor(local.category, local.isActive);

        g.find("rect").css({
          "stroke-width": "0.5",
          filter: "none",
        });

        g.find("rect").attr("fill", "#FFFFFF");
        g.find("text").attr("fill", color);

        activeTouchLocalId = null;
      }
    }, 100);
  }
}

// ====================================================================
// 6. CAMBIAR PISO
// Gestiona la navegación entre pisos
// ====================================================================
function setupFloorButtons() {
  $(".floor-btn").on("click", function () {
    const floor = Number($(this).data("floor"));

    // Actualizar estado visual de los botones
    $(".floor-btn")
      .removeClass("bg-primary text-primary-foreground shadow-soft")
      .addClass("bg-secondary text-foreground border border-border")
      .attr("aria-pressed", "false");

    $(this)
      .addClass("bg-primary text-primary-foreground shadow-soft")
      .removeClass("bg-secondary border border-border")
      .attr("aria-pressed", "true");

    // Actualizar etiqueta del piso
    $("#floorLabel").text(floor === 1 ? "PRIMER PISO" : "SEGUNDO PISO");

    // Re-renderizar locales del nuevo piso
    drawLocals(floor);

    // Anunciar cambio para lectores de pantalla
    const announcement = `Mostrando locales del ${
      floor === 1 ? "primer" : "segundo"
    } piso`;
    announceToScreenReader(announcement);
  });

  // Navegación por teclado entre botones
  $(".floor-btn").on("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const $buttons = $(".floor-btn");
      const currentIndex = $buttons.index(this);
      const nextIndex =
        e.key === "ArrowRight"
          ? (currentIndex + 1) % $buttons.length
          : (currentIndex - 1 + $buttons.length) % $buttons.length;
      $buttons.eq(nextIndex).focus().click();
    }
  });
}

// ====================================================================
// 7. UTILIDADES DE ACCESIBILIDAD
// ====================================================================

// Anunciar mensajes a lectores de pantalla
function announceToScreenReader(message) {
  const $announcer = $("#sr-announcer");
  if ($announcer.length === 0) {
    $("body").append(
      '<div id="sr-announcer" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></div>'
    );
  }
  $("#sr-announcer").text(message);
}

// ====================================================================
// 8. MANEJO DE RESIZE
// Adapta la interfaz cuando cambia el tamaño de ventana
// ====================================================================
function handleResize() {
  const tooltip = $("#mapTooltip");
  const sheet = $("#mapBottomSheet");

  // Si cambiamos a mobile, cerrar tooltip
  if (isMobile()) {
    tooltip.addClass("hidden");
  }
  // Si cambiamos a desktop, cerrar bottom sheet
  else {
    sheet.css("transform", "translateY(100%)");
    setTimeout(() => {
      sheet.addClass("hidden");
    }, 300);
  }
}

// Debounce para resize
let resizeTimer;
$(window).on("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(handleResize, 250);
});

// ====================================================================
// 9. INICIALIZACIÓN
// Punto de entrada principal
// ====================================================================
$(document).ready(function () {
  console.log("✅ Iniciando mapa interactivo mejorado...");

  // Renderizar primer piso por defecto
  drawLocals(1);

  // Inicializar tooltips desktop
  initDesktopTooltip();

  // Inicializar bottom sheet mobile
  initMobileBottomSheet();

  // Configurar botones de piso
  setupFloorButtons();

  // Inicializar iconos de Lucide
  lucide.createIcons();

  console.log("✅ Mapa interactivo cargado correctamente");
});
