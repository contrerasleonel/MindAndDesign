$(document).ready(function () {
  const grid = $("#localesGrid");
  const searchInput = $("#searchInput");
  const chips = $("[data-filter]");
  const counter = $("#localesCounter");
  const emptyState = $("#emptyState");

  let activeCategory = "Todos";

  // ======== GENERAR TODAS LAS CARDS =========
  function renderCards() {
    grid.empty();

    localsData.forEach((local) => {
      const isInactive = !local.isActive;

      const card = `
        <div 
          data-category="${local.category}" 
          data-name="${local.name}"
          class="local-card group border border-border rounded-[10px] bg-card shadow-soft overflow-hidden transition-all duration-300 ${isInactive ? "opacity-60" : ""}"
        >
          <div class="overflow-hidden">
            <img src="${local.image}" class="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>

          <div class="p-5">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-lg font-medium">${local.name}</h3>
              <span class="chip bg-secondary px-3 py-1 text-sm">${local.category}</span>
            </div>

            ${
              local.isActive
                ? `<a href="locales/local.html?id=${local.id}" class="text-primary text-sm font-medium hover:underline">
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
  }

  // Render inicial
  renderCards();
});
