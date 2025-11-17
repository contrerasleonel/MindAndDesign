// ====================================================================
// LOCALES-MAP.JS — MAPA INTERACTIVO CON TOOLTIP Y CAMBIO DE PISO
// ====================================================================

// ====================================================================
const categoryIcons = {
  Moda: "shirt",
  Iluminación: "lightbulb",
  Decoración: "sofa",
  Próximamente: "clock",
};
// ====================================================================
// 1. COLORES POR CATEGORÍA
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
// ====================================================================
function drawLocals(floor = 1) {
  const layer = document.getElementById("localsLayer");
  if (!layer) {
    console.warn("⚠️ No se encontró #localsLayer");
    return;
  }

  let svgContent = "";

  localsData
    .filter((l) => l.floor === floor)
    .forEach((local) => {
      const color = getCategoryColor(local.category, local.isActive);

      svgContent += `
        <g class="local-item" data-id="${local.id}" tabindex="0" aria-label="Local ${local.name}, categoría ${local.category}">
          <rect
            x="${local.mapPosition.x}"
            y="${local.mapPosition.y}"
            width="12"
            height="12"
            rx="1"
            fill="#FFFFFF"
            stroke="${color}"
            stroke-width="0.5"
            opacity="${local.isActive ? 1 : 0.6}"
          ></rect>

          <text
            x="${local.mapPosition.x + 6}"
            y="${local.mapPosition.y + 7}"
            text-anchor="middle"
            font-size="3"
            fill="${color}"
          >
            ${local.id}
          </text>
        </g>
      `;
    });

  layer.innerHTML = svgContent;
}

// ====================================================================
// 3. TOOLTIP PROFESIONAL
// ====================================================================
function activateTooltip() {
  const tooltip = $("#mapTooltip");
  let lastTouchedId = null; // para mobile

  // HOVER (desktop)
  $("#localsLayer").on("mouseenter", "g", function () {
    const id = Number($(this).data("id"));
    const local = localsData.find((l) => l.id === id);
    if (!local) return;

    const color = getCategoryColor(local.category, local.isActive);

    $(this).find("rect").attr("fill", color);
    $(this).find("text").attr("fill", "#FFFFFF");

    tooltip.removeClass("hidden");

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

     ${local.isActive
        ? `<button class="w-full h-10 rounded-[10px] bg-primary text-primary-foreground shadow-soft hover:bg-accent transition font-medium text-sm">
             Ver Local →
           </button>`
        : `<span class="w-full h-10 rounded-[10px] bg-secondary text-muted grid place-content-center text-sm">
             En preparación
           </span>`
      }
   </div>
    `);

    lucide.createIcons();
  });

  $("#localsLayer").on("mousemove", "g", function (e) {
    tooltip.css({
      position: "fixed",
      left: e.clientX + 20 + "px",
      top: e.clientY - 20 + "px",
    });
  });

  $("#localsLayer").on("mouseleave", "g", function () {
    const id = Number($(this).data("id"));
    const local = localsData.find((l) => l.id === id);

    const color = getCategoryColor(local.category, local.isActive);

    $(this).find("rect").attr("fill", "#FFFFFF");
    $(this).find("text").attr("fill", color);

    tooltip.addClass("hidden");
  });

  // CLICK COMPLETO
  $("#localsLayer").on("click", "g", function () {
    const id = Number($(this).data("id"));
    const local = localsData.find((l) => l.id === id);
    if (!local || !local.isActive) return;

    window.location.href = `local.html?id=${id}`;
  });

  // MOBILE (primer toque muestra tooltip, segundo toque navega)
  $("#localsLayer").on("touchstart", "g", function (e) {
    e.preventDefault();
    const id = Number($(this).data("id"));
    const local = localsData.find((l) => l.id === id);
    if (!local) return;

    if (lastTouchedId === id && local.isActive) {
      window.location.href = `local.html?id=${id}`;
      return;
    }

    lastTouchedId = id;

    $(this).trigger("mouseenter");

    setTimeout(() => {
      lastTouchedId = null;
    }, 1500);
  });
}

// ====================================================================
// 4. CAMBIAR PISO
// ====================================================================
function setupFloorButtons() {
  $(".floor-btn").on("click", function () {
    const floor = Number($(this).data("floor"));

    $(".floor-btn")
      .removeClass("bg-primary text-primary-foreground shadow-soft")
      .addClass("bg-secondary text-foreground border border-border");

    $(this)
      .addClass("bg-primary text-primary-foreground shadow-soft")
      .removeClass("bg-secondary");

    $("#floorLabel").text(floor === 1 ? "PRIMER PISO" : "SEGUNDO PISO");

    drawLocals(floor);
  });
}

// ====================================================================
// 5. INIT
// ====================================================================
$(document).ready(function () {
  console.log("✅ Iniciando mapa interactivo...");
  drawLocals(1);
  activateTooltip();
  setupFloorButtons();
});
