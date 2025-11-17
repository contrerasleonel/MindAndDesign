// ====================================================================
// LOCAL-DETAIL.JS — PÁGINA DE DETALLE DE UN LOCAL
// ====================================================================

$(document).ready(function () {
  // ============================================================
  // 1. OBTENER ID DE LA URL
  // ============================================================
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  console.log("🔍 Buscando local con ID:", id);

  // ============================================================
  // 2. BUSCAR LOCAL EN localsData
  // ============================================================
  const local = localsData.find((l) => l.id === id);

  // ============================================================
  // 3. SI NO EXISTE O NO ESTÁ ACTIVO
  // ============================================================
  if (!local || !local.isActive) {
    $("#heroImage").attr("src", "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900");
    $("#heroTitle").text("Local no disponible");
    $("#heroCategory").text("Próximamente");
    $("#heroDescription").text("Este local estará disponible muy pronto. Te invitamos a explorar nuestros otros espacios.");

    $("#nameLabel").text("Local no disponible");
    $("#longDescription").text("Este espacio está siendo preparado para brindarte la mejor experiencia.");
    
    $("#hoursBlock").addClass("hidden");
    $("#phoneBlock").addClass("hidden");
    $("#emailBlock").addClass("hidden");
    $("#socialsBlock").addClass("hidden");
    $("#gallerySection").addClass("hidden");

    $("#visitButton").text("Ver todos los locales").attr("href", "locales.html").removeAttr("target");

    console.warn("Local no disponible o inactivo");
    lucide.createIcons();
    return;
  }

  // ============================================================
  // 4. LLENAR HERO
  // ============================================================
  $("#heroImage").attr("src", local.image).attr("alt", local.name);
  $("#heroTitle").text(local.name);
  $("#heroCategory").text(local.category);
  $("#heroDescription").text(local.description);

  // ============================================================
  // 5. LLENAR CONTENIDO PRINCIPAL
  // ============================================================
  $("#nameLabel").text(`Sobre ${local.name}`);
  $("#longDescription").text(local.longDescription || local.description);

  $("#locationLabel").text(local.location);
  $("#mapLocationTitle").text(local.location);
  $("#mapLocationSubtitle").text(`Piso ${local.floor} - Encuentra este local en nuestro mapa interactivo`);

  // ============================================================
  // 6. HORARIOS
  // ============================================================
  if (local.hours) {
    $("#hours").text(local.hours);
    $("#hoursBlock").removeClass("hidden");
  } else {
    $("#hoursBlock").addClass("hidden");
  }

  // ============================================================
  // 7. TELÉFONO
  // ============================================================
  if (local.contact?.phone) {
    $("#phone").text(local.contact.phone).attr("href", `tel:${local.contact.phone}`);
    $("#phoneBlock").removeClass("hidden");
  } else {
    $("#phoneBlock").addClass("hidden");
  }

  // ============================================================
  // 8. EMAIL
  // ============================================================
  if (local.contact?.email) {
    $("#email").text(local.contact.email).attr("href", `mailto:${local.contact.email}`);
    $("#emailBlock").removeClass("hidden");
  } else {
    $("#emailBlock").addClass("hidden");
  }

  // ============================================================
  // 9. REDES SOCIALES (MEJORADO COMO EN REACT)
  // ============================================================
  if (local.contact?.instagram || local.contact?.facebook) {
    const socialLinks = $("#socialLinks");
    socialLinks.empty();

    if (local.contact.instagram) {
      const igHandle = local.contact.instagram.replace('@', '');
      socialLinks.append(`
        <a href="https://instagram.com/${igHandle}" target="_blank" rel="noopener noreferrer"
           class="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-muted rounded-lg transition-colors">
          <i data-lucide="instagram" class="w-5 h-5"></i>
          <span class="text-sm">${local.contact.instagram}</span>
        </a>
      `);
    }

    if (local.contact.facebook) {
      socialLinks.append(`
        <a href="https://facebook.com/${local.contact.facebook}" target="_blank" rel="noopener noreferrer"
           class="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-muted rounded-lg transition-colors">
          <i data-lucide="facebook" class="w-5 h-5"></i>
          <span class="text-sm">${local.contact.facebook}</span>
        </a>
      `);
    }

    $("#socialsBlock").removeClass("hidden");
  } else {
    $("#socialsBlock").addClass("hidden");
  }

  // ============================================================
  // 10. GALERÍA DE IMÁGENES
  // ============================================================
  if (local.gallery && local.gallery.length > 0) {
    const galleryGrid = $("#galleryGrid");
    galleryGrid.empty();

    local.gallery.forEach((img) => {
      galleryGrid.append(`
        <div class="relative h-64 rounded-lg overflow-hidden group">
          <img src="${img}" alt="Galería ${local.name}" 
               class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
      `);
    });

    $("#gallerySection").removeClass("hidden");
  } else {
    $("#gallerySection").addClass("hidden");
  }

  // ============================================================
  // 11. BOTÓN PRINCIPAL (WEBSITE O VOLVER)
  // ============================================================
  if (local.website && local.website !== "#") {
    $("#visitButton")
      .text("Visitar Web")
      .attr("href", local.website)
      .attr("target", "_blank")
      .attr("rel", "noopener noreferrer");
  } else {
    $("#visitButton")
      .text("Ver todos los locales")
      .attr("href", "locales.html")
      .removeAttr("target");
  }

  // ============================================================
  // 12. LOCALES RELACIONADOS
  // ============================================================
  const relacionados = localsData
    .filter((l) => l.category === local.category && l.isActive && l.id !== local.id)
    .slice(0, 3);

  if (relacionados.length > 0) {
    const relatedGrid = $("#relatedGrid");
    relatedGrid.empty();

    relacionados.forEach((rel) => {
      relatedGrid.append(`
        <a href="local.html?id=${rel.id}" 
           class="relative group overflow-hidden rounded-lg shadow-md hover:shadow-float transition-all duration-300 cursor-pointer">
          <img src="${rel.image}" alt="${rel.name}" 
               class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
            <span class="inline-block w-fit chip bg-primary text-primary-foreground px-3 py-1 text-sm mb-2">
              ${rel.category}
            </span>
            <h3 class="text-xl font-medium">${rel.name}</h3>
            <p class="text-sm opacity-90 mt-1">${rel.description}</p>
          </div>
        </a>
      `);
    });

    $("#relatedSection").removeClass("hidden");
  } else {
    $("#relatedSection").addClass("hidden");
  }

  lucide.createIcons();
});