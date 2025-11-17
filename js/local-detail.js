// ====================================================================
// LOCAL-DETAIL.JS — PÁGINA DE DETALLE DE UN LOCAL
// ====================================================================

$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  const local = localsData.find((l) => l.id === id);

  // --------------------- LOCAL NO DISPONIBLE ---------------------
  if (!local || !local.isActive) {
    $("#heroImage")
      .attr("src", "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900")
      .attr("alt", "Local no disponible");

    $("#heroTitle").text("Local no disponible");
    $("#heroCategory").text("Próximamente");
    $("#heroDescription").text("Este local estará disponible muy pronto.");

    $("#nameLabel").text("Local no disponible");
    $("#longDescription").text("Este espacio está en preparación.");

    $("#hoursBlock, #phoneBlock, #emailBlock, #socialsBlock, #gallerySection").addClass("hidden");

    $("#visitButton")
      .text("Ver todos los locales")
      .attr("href", "locales.html")
      .attr("aria-label", "Volver al listado de locales")
      .removeAttr("target");

    return;
  }

  // --------------------- HERO ---------------------
  $("#heroImage").attr("src", local.image).attr("alt", `Imagen principal de ${local.name}`);
  $("#heroTitle").text(local.name);
  $("#heroCategory").text(local.category);
  $("#heroDescription").text(local.description);

  // --------------------- DESCRIPCIÓN ---------------------
  $("#nameLabel").text(`Sobre ${local.name}`);
  $("#longDescription").text(local.longDescription || local.description);

  $("#locationLabel").text(local.location);
  $("#mapLocationTitle").text(local.location);
  $("#mapLocationSubtitle").text(`Piso ${local.floor} — Disponible en el mapa interactivo.`);

  // --------------------- HORARIOS ---------------------
  if (local.hours) {
    $("#hours").text(local.hours);
    $("#hoursBlock").removeClass("hidden");
  }

  // --------------------- TELÉFONO ---------------------
  if (local.contact?.phone) {
    $("#phone")
      .text(local.contact.phone)
      .attr("href", `tel:${local.contact.phone}`)
      .attr("aria-label", `Llamar a ${local.name}`);
    $("#phoneBlock").removeClass("hidden");
  }

  // --------------------- EMAIL ---------------------
  if (local.contact?.email) {
    $("#email")
      .text(local.contact.email)
      .attr("href", `mailto:${local.contact.email}`)
      .attr("aria-label", `Enviar correo a ${local.name}`);
    $("#emailBlock").removeClass("hidden");
  }

  // --------------------- REDES SOCIALES ---------------------
  if (local.contact?.instagram || local.contact?.facebook) {
    const socialLinks = $("#socialLinks").empty();

    if (local.contact.instagram) {
      const ig = local.contact.instagram.replace("@", "");
      socialLinks.append(`
        <a href="https://instagram.com/${ig}" target="_blank" rel="noopener noreferrer"
          class="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-muted rounded-lg transition-colors"
          aria-label="Instagram de ${local.name}">
          <i data-lucide="instagram" class="w-5 h-5"></i>
          <span class="text-sm">${local.contact.instagram}</span>
        </a>
      `);
    }

    if (local.contact.facebook) {
      socialLinks.append(`
        <a href="https://facebook.com/${local.contact.facebook}" target="_blank"
           rel="noopener noreferrer"
           class="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-muted rounded-lg transition-colors"
           aria-label="Facebook de ${local.name}">
          <i data-lucide="facebook" class="w-5 h-5"></i>
          <span class="text-sm">${local.contact.facebook}</span>
        </a>
      `);
    }

    $("#socialsBlock").removeClass("hidden");
  }

  // --------------------- GALERÍA ---------------------
  if (local.gallery?.length > 0) {
    const grid = $("#galleryGrid").empty();

    local.gallery.forEach((img) => {
      grid.append(`
        <div class="relative h-64 rounded-lg overflow-hidden group">
          <img src="${img}" 
               alt="Imagen de la galería del local ${local.name}"
               class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
      `);
    });

    $("#gallerySection").removeClass("hidden");
  }

  // --------------------- BOTÓN PRINCIPAL ---------------------
  if (local.website && local.website !== "#") {
    $("#visitButton")
      .text("Visitar sitio web")
      .attr("href", local.website)
      .attr("aria-label", `Visitar sitio web de ${local.name}`)
      .attr("target", "_blank");
  } else {
    $("#visitButton")
      .text("Ver todos los locales")
      .attr("href", "locales.html")
      .attr("aria-label", "Volver al listado de locales")
      .removeAttr("target");
  }

  // --------------------- LOCALES RELACIONADOS ---------------------
  const rels = localsData
    .filter((l) => l.category === local.category && l.isActive && l.id !== local.id)
    .slice(0, 3);

  if (rels.length > 0) {
    const grid = $("#relatedGrid").empty();

    rels.forEach((rel) => {
      grid.append(`
        <a href="local.html?id=${rel.id}" 
           aria-label="Ver detalle del local ${rel.name}"
           class="relative group overflow-hidden rounded-lg shadow-md hover:shadow-float transition-all duration-300">
          <img src="${rel.image}" alt="${rel.name}" 
               class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white flex flex-col justify-end">
            <span class="chip bg-primary text-primary-foreground px-3 py-1 text-sm mb-2">${rel.category}</span>
            <h3 class="text-xl font-medium">${rel.name}</h3>
            <p class="text-sm opacity-90 mt-1">${rel.description}</p>
          </div>
        </a>
      `);
    });

    $("#relatedSection").removeClass("hidden");
  }

  lucide.createIcons();
});
