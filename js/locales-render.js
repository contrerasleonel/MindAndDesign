$(document).ready(function () {
  const grid = $("#localesGrid");

  function renderCards() {
    grid.empty();

    localsData.forEach((local) => {
      const isInactive = !local.isActive;

      grid.append(`
        <div 
          data-category="${local.category}" 
          data-name="${local.name}"
          class="local-card group border border-border rounded-[10px] bg-card shadow-soft overflow-hidden transition-all duration-300 ${isInactive ? "opacity-60" : ""}"
        >
          <div class="overflow-hidden">
            <img src="${local.image}" 
                 alt="${local.name}"
                 class="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>

          <div class="p-5">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-lg font-medium">${local.name}</h3>
              <span class="chip bg-secondary px-3 py-1 text-sm">${local.category}</span>
            </div>

            ${
              local.isActive
                ? `<a href="local.html?id=${local.id}" 
                     class="text-primary text-sm font-medium hover:underline"
                     aria-label="Ver más información del local ${local.name}">
                     Ver más →
                   </a>`
                : `<button class="w-full chip bg-secondary text-muted py-2 text-sm font-medium" aria-disabled="true">
                    Próximamente
                   </button>`
            }
          </div>
        </div>
      `);
    });
  }

  renderCards();
});
