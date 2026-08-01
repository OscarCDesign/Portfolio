/**
 * logic.js — REGLA-LOGICA-001
 * Sistema de Narrativa Precognitiva via localStorage.
 * Clave maestra: PORTFOLIO_STATE
 *
 * Estrategia: CSS-attribute exclusivamente (sin destrucción de DOM).
 * - Establece data-logic-state="true|false" en el padre de cada par [data-flag].
 * - El CSS en utilities.css maneja la visibilidad de cada variante.
 * - Render es idempotente y reversible (compatible con debug panel).
 * - Fallback graceful: si localStorage no está disponible, todos los flags
 *   quedan en false → siempre se muestra la variante false por defecto.
 */

(function () {
    const STORAGE_KEY = 'PORTFOLIO_STATE';

    // ── Verificación de disponibilidad de localStorage ──────────────────────
    function isStorageAvailable() {
        try {
            const test = '__ls_test__';
            localStorage.setItem(test, '1');
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    const storageAvailable = isStorageAvailable();

    /**
     * Autodescubrimiento de proyectos vía metaetiqueta.
     */
    function discoverProjects() {
        const meta = document.querySelector('meta[name="portfolio-projects"]');
        if (!meta) return [];
        return meta.getAttribute('content').split(',').map(s => s.trim()).filter(Boolean);
    }

    /**
     * Motor de Estados Precognitivo
     */
    const Motor = {
        state: null,
        flags: null,
        projectIds: discoverProjects(),

        init() {
            this.state = this.loadState();
            this.state.countVisits = (this.state.countVisits || 0) + 1;

            this.trackCurrentProject();
            this.saveState();
            this.recompute();

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.render());
            } else {
                this.render();
            }
        },

        loadState() {
            if (!storageAvailable) {
                // Sin localStorage → estado vacío → todos los flags en false
                return { visitedProjects: [], countVisits: 0 };
            }
            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                if (raw) return JSON.parse(raw);
            } catch (e) {
                console.warn('Portfolio Logic: Error al leer estado.', e);
            }
            return { visitedProjects: [], countVisits: 0 };
        },

        saveState() {
            if (!storageAvailable) return;
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
            } catch (e) {
                console.warn('Portfolio Logic: No se pudo guardar el estado.', e);
            }
        },

        trackCurrentProject() {
            const path = window.location.pathname.toLowerCase();
            const projectId = this.projectIds.find(id => path.includes(id));
            if (projectId && !this.state.visitedProjects.includes(projectId)) {
                this.state.visitedProjects.push(projectId);
            }
        },

        recompute() {
            const visited = this.state.visitedProjects || [];
            const total = this.projectIds.length;

            this.flags = {
                FLAG_ZERO_P:    visited.length === 0,
                FLAG_FIRST_P:   visited.length === 1,
                FLAG_SOME_P:    visited.length > 0 && visited.length < total,
                FLAG_ALL_P:     total > 0 && visited.length >= total,
                FLAG_RECURRING: this.state.countVisits > 3,
                COUNT_VISITS:   this.state.countVisits
            };

            window.dispatchEvent(new CustomEvent('portfolio:logic-update', {
                detail: { flags: this.flags, state: this.state }
            }));
        },

        /**
         * Render — estrategia CSS-attribute exclusivamente.
         * Establece data-logic-state en el padre inmediato de cada [data-flag].
         * El CSS en utilities.css maneja el display de cada variante.
         * NO destruye nodos → render es idempotente y reversible.
         */
        render() {
            const logicElements = document.querySelectorAll('[data-flag]');

            logicElements.forEach(el => {
                const flagName = el.dataset.flag;
                const isTrue = !!this.flags[flagName];
                const parent = el.parentElement;
                if (parent) {
                    parent.setAttribute('data-logic-state', isTrue ? 'true' : 'false');
                }
            });
        },

        // ── Debug Panel helpers ──────────────────────────────────────────────
        setFlagValue(flagName, value) {
            if (flagName === 'FLAG_RECURRING') {
                this.state.countVisits = value ? 4 : 1;
            } else if (flagName.includes('_P')) {
                if (value) {
                    if (flagName === 'FLAG_ALL_P')
                        this.state.visitedProjects = [...this.projectIds];
                    else if (flagName === 'FLAG_FIRST_P' && this.projectIds.length > 0)
                        this.state.visitedProjects = [this.projectIds[0]];
                    else if (flagName === 'FLAG_ZERO_P')
                        this.state.visitedProjects = [];
                } else {
                    this.state.visitedProjects = [];
                }
            }
            this.saveState();
            this.recompute();
            this.render();
        },

        reset() {
            if (storageAvailable) localStorage.removeItem(STORAGE_KEY);
            window.location.reload();
        }
    };

    window.PortfolioState = Motor;
    Motor.init();

})();
