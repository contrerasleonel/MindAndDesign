/* =========================================================================
   SITE.JS — Versión jQuery
   Funcionalidad global compartida por TODO Mind & Design
   ========================================================================= */

$(document).ready(function () {

    /* ============================================================
       1) Inicializar iconos Lucide
       ============================================================ */
    if (window.lucide) {
        lucide.createIcons();
    }

    /* ============================================================
       2) Menú Mobile (jQuery)
       ============================================================ */
    const $toggle = $('#menuToggle');
    const $menu = $('#mobileMenu');

    if ($toggle.length && $menu.length) {
        let open = false;

        $toggle.on('click', function () {
            open = !open;

            $menu.toggleClass('hidden', !open);
            $toggle.attr('aria-expanded', open);

            $toggle.html(
                open
                    ? '<i data-lucide="x"></i>'
                    : '<i data-lucide="menu"></i>'
            );

            if (window.lucide) lucide.createIcons();
        });
    }

    /* ============================================================
       3) Activar link correcto del nav
       ============================================================ */
    const current = window.location.pathname.split("/").pop() || "index.html";

    $(".nav-item, .mobile-item").each(function () {
        const $link = $(this);
        const href = $link.attr("href");

        /* EXCEPCIÓN PARA local.html */
        if (current.startsWith("local")) {
            if (href === "locales.html") {
                $link.addClass("bg-primary text-primary-foreground");
                return; // cortar ejecución para este link
            }
        }

        /* Comportamiento normal */
        if (href === current) {
            $link.addClass("bg-primary text-primary-foreground");
        } else {
            $link.addClass(
                "hover:bg-secondary hover:text-foreground transition-colors duration-200"
            );
        }
    });

});
