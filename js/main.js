/**
 * main.js — Lógica principal del sitio
 * - Transición MENU-HERO → MENU-BARRA al hacer scroll
 * - MOTION-TEXT-STRETCH para MDT1 (Acomodo por palabras)
 * - syncHeroLayout: Ajuste dinámico de filas del Hero (Frame Adaptativo)
 * - IntersectionObserver para animaciones de entrada (is-visible)
 */

(function () {
    const ROW_HEIGHT = 31.3; // px por línea (REGLA-GRID-001)

    // ============================================================
    // MOTION-TEXT-STRETCH — Dividir por palabras y caracteres
    // ============================================================
    function applyTextStretch(selector) {
        const el = document.querySelector(selector);
        if (!el) return;

        const text = (selector === '#mdt1') ? 'OSCAR CARREÑO' : el.textContent;
        el.textContent = '';
        el.classList.add('motion-text-stretch');

        const words = text.split(' ');
        let charGlobalIndex = 0;

        words.forEach((word, wIdx) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';

            Array.from(word).forEach((char) => {
                const charSpan = document.createElement('span');
                charSpan.className = 'char';
                charSpan.textContent = char;
                charSpan.style.transitionDelay = `${charGlobalIndex * 50}ms`;
                wordSpan.appendChild(charSpan);
                charGlobalIndex++;
            });

            el.appendChild(wordSpan);

            // Espacio entre palabras
            if (wIdx < words.length - 1) {
                const space = document.createElement('span');
                space.className = 'char-space';
                space.textContent = '\u00A0';
                space.style.display = 'inline-block';
                el.appendChild(space);
            }
        });

        requestAnimationFrame(() => {
            el.classList.add('is-visible');
        });
    }

    // ============================================================
    // SYNC HERO LAYOUT — Ajuste dinámico de filas (Frame Adaptativo)
    // ============================================================
    function syncHeroLayout() {
        const frame = document.getElementById('hero-frame');
        if (!frame) return;

        const mdt = document.getElementById('mdt1');
        const mbt1 = document.getElementById('mbt1-1');
        const mbt2 = document.getElementById('mbt1-2');
        const mbg = document.getElementById('mbg');

        const getRows = (el) => {
            if (!el) return 0;
            return Math.ceil(el.scrollHeight / ROW_HEIGHT);
        };

        const mdtRows = getRows(mdt);
        const mbt1Rows = getRows(mbt1);
        const mbt2Rows = getRows(mbt2);
        const mbgRows = 3; // Restaurado a 3 filas por petición del usuario

        // 1. Aplicar variables CSS para spans
        frame.style.setProperty('--mdt-rows', mdtRows);
        frame.style.setProperty('--mbt1-rows', mbt1Rows);
        frame.style.setProperty('--mbt2-rows', mbt2Rows);
        frame.style.setProperty('--mbg-rows', mbgRows);

        // 2. Posiciones explícitas dentro del frame-grid (CENTRADO VERTICAL)
        // Queremos que el MBG (3 filas) esté en el centro vertical del VIEWPORT.
        const viewportRows = Math.floor(window.innerHeight / ROW_HEIGHT);
        const idealMbgStart = Math.floor(viewportRows / 2) - 1;

        // Calculamos cuántas filas ocupan los elementos superiores con sus gaps
        // h_above = (mdtRows - 1) + (mbt1Rows + 1) + (mbt2Rows + 2)
        const rowsAboveMbg = (mdtRows - 1) + (mbt1Rows + 1) + (mbt2Rows + 2);

        let mdtStart = idealMbgStart - rowsAboveMbg;

        // Salvaguarda: No subir del margen superior (Línea 2)
        if (mdtStart < 2) {
            mdtStart = 2;
        }

        const mbt1Start = mdtStart + mdtRows - 1; // Restamos una row (Overlap)
        const mbt2Start = mbt1Start + mbt1Rows + 1; // A dos rows de distancia (Gap 1)
        const mbgStart = mbt2Start + mbt2Rows + 2; // A tres rows de distancia (Gap 2)

        if (mdt) {
            mdt.style.gridRow = `${mdtStart} / span ${mdtRows}`;
        }
        if (mbt1) {
            mbt1.style.gridRow = `${mbt1Start} / span ${mbt1Rows}`;
        }
        if (mbt2) {
            mbt2.style.gridRow = `${mbt2Start} / span ${mbt2Rows}`;
        }
        if (mbg) {
            mbg.style.gridRow = `${mbgStart} / span ${mbgRows}`;
        }

        // 3. Altura Total del Frame (en filas de la page-grid)
        // El frame es un item en la page-grid.
        // Si el contenido interno termina en la Línea X del frame-grid, 
        // el frame debe tener un span de (X - 1) filas.
        const frameEndLine = mbgStart + mbgRows;
        const totalRows = frameEndLine - 1;

        frame.style.setProperty('--hero-rows', totalRows);

        // Forzar que el frame no tenga padding extra que rompa el snap
        frame.style.paddingBottom = "0";
    }

    // ============================================================
    // INICIALIZACIÓN
    // ============================================================
    document.addEventListener('DOMContentLoaded', () => {
        const menuHero = document.getElementById('menu-hero');
        const menuBarra = document.getElementById('menu-barra');
        const mdt2 = document.getElementById('mdt2');
        const mdt1El = document.getElementById('mdt1');

        // 1. Aplicar efectos de texto
        applyTextStretch('#mdt1');

        // 2. Sincronizar layout (múltiples veces para asegurar tras animaciones)
        setTimeout(syncHeroLayout, 50);
        setTimeout(syncHeroLayout, 300);
        setTimeout(syncHeroLayout, 800);
        window.addEventListener('resize', syncHeroLayout);

        // 3. Observer para cambios dinámicos
        if (mdt1El) {
            new MutationObserver(syncHeroLayout).observe(mdt1El, { childList: true, subtree: true });
        }

        // 4. Animaciones de contenido al entrar al viewport (scroll-triggered, fade-up)
        // Sólo se aplica a elementos dentro del contenido principal (main).
        // Menú, footer y hero-nav quedan excluidos implícitamente al
        // no tener la clase motion-fade-move-up.
        // Stagger suave: cada batch de elementos visibles simultáneamente
        // recibe un delay incremental de 80ms vía --motion-delay.
        const SCROLL_ANIM_CLASS = '.motion-fade-move-up';
        const STAGGER_STEP = 80; // ms entre cada elemento del mismo batch

        const scrollObserver = new IntersectionObserver((entries) => {
            // Solo procesar elementos que intersectan en este tick
            const visible = entries.filter(e => e.isIntersecting);
            visible.forEach((entry, idx) => {
                const el = entry.target;
                // Stagger: delay acumulado para elementos que aparecen juntos
                el.style.setProperty('--motion-delay', `${idx * STAGGER_STEP}ms`);
                // Doble rAF: garantiza que el browser aplique el delay antes
                // de activar la transición (evita flash sin transición)
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        el.classList.add('is-visible');
                        scrollObserver.unobserve(el);
                    });
                });
            });
        }, {
            // Dispara 60px antes de que el elemento llegue al borde inferior del viewport
            rootMargin: '0px 0px -60px 0px',
            threshold: 0
        });

        document.querySelectorAll(SCROLL_ANIM_CLASS).forEach(el => {
            scrollObserver.observe(el);
        });

        // Observer secundario para motion-fade-basic y motion-slide-path-in
        // (sin stagger, disparo inmediato al intersectar)
        const simpleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    simpleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0, rootMargin: '0px 0px 0px 0px' });

        document.querySelectorAll('.motion-fade-basic, .motion-fade-move-down, .motion-slide-path-in').forEach(el => {
            simpleObserver.observe(el);
        });

        // 5. Transición MENU-HERO a BARRA
        if (menuHero && menuBarra) {
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        menuBarra.classList.remove('barra-hidden');
                        menuBarra.classList.add('barra-visible');
                        if (mdt2) mdt2.classList.add('is-visible');
                    } else {
                        menuBarra.classList.add('barra-hidden');
                        menuBarra.classList.remove('barra-visible');
                        if (mdt2) mdt2.classList.remove('is-visible');
                    }
                });
            }, { threshold: 0 });
            heroObserver.observe(menuHero);
        }

        // 6. Mobile Menu Trigger — Handled in components.js
    });

})();
