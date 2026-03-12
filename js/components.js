/**
 * components.js — Comportamiento de componentes UI
 * Hamburger toggle, overlay con nueva estructura, button markers, page transitions.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // MOBILE MENU OVERLAY
    // Estructura: overlay > .overlay-header (logo + X) + .overlay-buttons
    // Disparadores: #hamburger-btn (Barra), #hero-hamburger (Hero)
    // Cierre: .hamburger-frame.in-overlay (X)
    // ==========================================================
    const overlay = document.getElementById('mobile-menu-overlay');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const heroHamburger = document.getElementById('hero-hamburger');
    const mbgMobileTrigger = document.getElementById('mobile-menu-trigger');

    // Todos los elementos que abren/cierran el menú
    const triggers = [hamburgerBtn, heroHamburger, mbgMobileTrigger].filter(el => el);

    // Elementos dentro del overlay que cierran
    const closeBtn = overlay ? overlay.querySelector('.hamburger-trigger.in-overlay') : null;

    function toggleMenu() {
        if (!overlay) return;
        const isOpen = overlay.classList.contains('is-open');

        if (isOpen) {
            overlay.classList.remove('is-open');
            document.body.style.overflow = '';
            overlay.setAttribute('aria-hidden', 'true');
            // Reset hamburger states
            document.querySelectorAll('.hamburger-trigger').forEach(el => el.classList.remove('is-open'));
        } else {
            overlay.classList.add('is-open');
            document.body.style.overflow = 'hidden';
            overlay.setAttribute('aria-hidden', 'false');
            // Set hamburger states
            document.querySelectorAll('.hamburger-trigger').forEach(el => el.classList.add('is-open'));
        }
    }

    // Attach listeners
    triggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    /* Cerrar al hacer clic en un link del overlay */
    if (overlay) {
        overlay.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                if (overlay.classList.contains('is-open')) toggleMenu();
            });
        });
    }

    /* Tecla ESC */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay && overlay.classList.contains('is-open')) {
            toggleMenu();
        }
    });

    // ==========================================================
    // BUTTON HOVER MARKER — calibrar al ancho exacto del texto
    // Aplica a .barra-btn, .mbg-btn, .mobile-menu-btn y botones fuera de .active
    // ==========================================================
    function calibrateMarkers() {
        document.querySelectorAll('.barra-btn:not(.active), .mbg-btn:not(.active), .mobile-menu-btn').forEach((btn) => {
            const textNode = Array.from(btn.childNodes).find((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
            if (!textNode) {
                btn.style.setProperty('--marker-width', btn.offsetWidth * 0.6 + 'px');
                return;
            }
            const range = document.createRange();
            range.selectNodeContents(textNode);
            const rect = range.getBoundingClientRect();
            btn.style.setProperty('--marker-width', Math.ceil(rect.width) + 'px');
        });
    }

    calibrateMarkers();
    window.addEventListener('resize', calibrateMarkers);

    // ==========================================================
    // PAGE TRANSITION — fade out antes de navegar
    // ==========================================================
    const pageOverlay = document.getElementById('page-transition-overlay');

    function navigateTo(href) {
        if (!pageOverlay) { window.location.href = href; return; }
        pageOverlay.classList.add('is-active');
        /* Esperar exactamente el tiempo de la transición CSS (350ms)
           para navegar cuando el overlay esté completamente opaco */
        setTimeout(() => { window.location.href = href; }, 350);
    }

    /* Fade in al cargar (quita el overlay si quedó activo de la navegación anterior) */
    if (pageOverlay) {
        /* Pequeño delay para permitir que el CSS transición esté listo */
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                pageOverlay.classList.remove('is-active');
            });
        });
    }

    /* ── TAP FLASH en botones del overlay móvil ──────────────
       Al tocar un mobile-menu-btn:
       1. Agrega .is-tapping → fondo azul 30% opacity (CSS transition 300ms)
       2. Espera 300ms a que la animación complete
       3. Navega con la misma lógica de page-transition
    ─────────────────────────────────────────────────────── */
    document.querySelectorAll('.mobile-menu-btn[data-transition]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const href = btn.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
            e.preventDefault();
            e.stopPropagation(); /* Evita que el listener genérico de abajo lo tome dos veces */
            btn.classList.add('is-tapping');
            setTimeout(() => {
                navigateTo(href);
            }, 300);
        });
    });

    /* Enganchar todos los enlaces internos con data-transition */
    document.querySelectorAll('a[data-transition]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            /* No interceptar links externos o anclas hash */
            if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
            e.preventDefault();
            navigateTo(href);
        });
    });

    /* Exportar por si se necesita desde inline scripts */
    window.navigateTo = navigateTo;

});
