// ====================================================================
// LOCALES.JS — RENDERIZADO DINÁMICO + FILTROS + BUSCADOR
// ====================================================================

$(document).ready(function () {
  const grid = $("#localesGrid");
  const searchInput = $("#searchInput");
  const chips = $("[data-filter]");
  const counter = $("#localesCounter");
  const emptyState = $("#emptyState");

  let activeCategory = "Todos";

  // ============================================================
  // 1. RENDERIZAR TODAS LAS CARDS DESDE localsData
  // ============================================================
  function renderCards() {
    grid.empty();

    localsData.forEach((local) => {
      const isInactive = !local.isActive;

      const card = `
        <div 
          data-category="${local.category}" 
          data-name="${local.name}"
          class="local-card group border border-border rounded-[10px] bg-card shadow-soft overflow-hidden transition-all duration-300 ${
            isInactive ? "opacity-60" : ""
          }"
        >
          <div class="overflow-hidden">
            <img 
              src="${local.image}" 
              alt="${local.name}"
              class="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          </div>

          <div class="p-5">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-lg font-medium">${local.name}</h3>
              <span class="chip bg-secondary px-3 py-1 text-sm">${local.category}</span>
            </div>

            ${
              local.isActive
                ? `<a href="local.html?id=${local.id}" class="text-primary text-sm font-medium hover:underline">
                     Ver Local →
                   </a>`
                : `<button class="w-full chip bg-secondary text-muted py-2 text-sm font-medium">
                    Próximamente
                   </button>`
            }
          </div>
        </div>
      `;

      grid.append(card);
    });

    console.log("✅ Cards renderizadas:", localsData.length);
  }

  // ============================================================
  // 2. FUNCIÓN DE FILTRADO
  // ============================================================
  function filtrar() {
    const searchText = searchInput.val().toLowerCase();
    const cards = $(".local-card");
    let visibles = 0;

    cards.each(function () {
      const card = $(this);
      const name = card.data("name").toLowerCase();
      const category = card.data("category");

      const matchCategory =
        activeCategory === "Todos" ||
        activeCategory.toLowerCase() === category.toLowerCase();

      const matchSearch = name.includes(searchText);

      if (matchCategory && matchSearch) {
        mostrarCard(card);
        visibles++;
      } else {
        ocultarCard(card);
      }
    });

    actualizarContador(visibles);
    actualizarEmptyState(visibles);
  }

  // ============================================================
  // 3. MOSTRAR / OCULTAR CARDS
  // ============================================================
  function mostrarCard(card) {
    card
      .css({ display: "block", opacity: 0, transform: "scale(0.98)" })
      .animate({ opacity: 1, transform: "scale(1)" }, 120);
  }

  function ocultarCard(card) {
    card.css("display", "none");
  }

  // ============================================================
  // 4. EMPTY STATE
  // ============================================================
  function actualizarEmptyState(visibles) {
    if (visibles === 0) {
      emptyState.removeClass("hidden");
    } else {
      emptyState.addClass("hidden");
    }
  }

  // ============================================================
  // 5. CONTADOR GLOBAL
  // ============================================================
  function actualizarContador(visibles) {
    const total = localsData.length;
    counter.text(`Mostrando ${visibles} locales de ${total}`);
  }

  // ============================================================
  // 6. CONTADOR DE CADA CHIP
  // ============================================================
  function actualizarConteoChips() {
    const conteo = {
      Todos: localsData.length,
      Moda: 0,
      Iluminación: 0,
      Decoración: 0,
    };

    localsData.forEach((local) => {
      conteo[local.category] += 1;
    });

    chips.each(function () {
      const chip = $(this);
      const cat = chip.data("filter");
      chip.find(".chip-count").text(`(${conteo[cat] || 0})`);
    });
  }

  // ============================================================
  // 7. EVENTOS DE FILTROS
  // ============================================================
  chips.on("click", function () {
    chips
      .removeClass("bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2")
      .addClass("bg-secondary text-foreground hover:bg-secondary/80");

    $(this)
      .removeClass("bg-secondary text-foreground hover:bg-secondary/80")
      .addClass("bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2");

    activeCategory = $(this).data("filter");
    filtrar();
  });

  // ============================================================
  // 8. EVENTO DE BÚSQUEDA
  // ============================================================
  searchInput.on("input", function () {
    filtrar();
  });

  // ============================================================
  // 9. INICIALIZAR
  // ============================================================
  renderCards();
  actualizarConteoChips();
  filtrar();
});