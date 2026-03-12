/**
 * logic-stress-test.js
 * Automatización de pruebas para REGLA-LOGICA-001.
 * Simula ciclos de vida del usuario y verifica integridad de FLAGS.
 */

(function () {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isLocal) return;

    window.runPortfolioStressTest = function () {
        if (!window.PortfolioState) {
            console.error('❌ Stress Test: PortfolioState no encontrado.');
            return;
        }

        console.group('🚀 PROTOCOLO DE VALIDACIÓN NARRATIVA: STRESS TEST');

        const originalState = JSON.stringify(window.PortfolioState.state);
        const engine = window.PortfolioState;

        const assert = (condition, msg) => {
            console.log(condition ? `✅ PASS: ${msg}` : `❌ FAIL: ${msg}`);
        };

        // Escenario 1: Usuario Nuevo
        console.group('Escenario 1: Usuario Nuevo');
        engine.state = { visitedProjects: [], countVisits: 1 };
        engine.recompute();
        assert(engine.flags.FLAG_ZERO_P === true, 'FLAG_ZERO_P debe ser TRUE');
        assert(engine.flags.FLAG_RECURRING === false, 'FLAG_RECURRING debe ser FALSE');
        console.groupEnd();

        // Escenario 2: Usuario Recurrente
        console.group('Escenario 2: Usuario Recurrente');
        engine.state.countVisits = 5;
        engine.recompute();
        assert(engine.flags.FLAG_RECURRING === true, 'FLAG_RECURRING debe ser TRUE (Visitas > 3)');
        console.groupEnd();

        // Escenario 3: Usuario ha visto un proyecto
        console.group('Escenario 3: Primer Proyecto');
        engine.state.visitedProjects = [engine.projectIds[0] || 'vibec'];
        engine.recompute();
        assert(engine.flags.FLAG_FIRST_P === true, 'FLAG_FIRST_P debe ser TRUE');
        assert(engine.flags.FLAG_ZERO_P === false, 'FLAG_ZERO_P debe ser FALSE');
        console.groupEnd();

        // Escenario 4: Usuario ha visto TODO
        console.group('Escenario 4: Final de Narrativa (All Projects)');
        engine.state.visitedProjects = [...engine.projectIds];
        engine.recompute();
        if (engine.projectIds.length > 0) {
            assert(engine.flags.FLAG_ALL_P === true, 'FLAG_ALL_P debe ser TRUE');
            assert(engine.flags.FLAG_SOME_P === false, 'FLAG_SOME_P debe ser FALSE');
        } else {
            console.log('⚠️ Saltando validación ALL_P (No se descubrieron proyectos vía meta)');
        }
        console.groupEnd();

        // Restaurar estado
        window.PortfolioState.state = JSON.parse(originalState);
        window.PortfolioState.recompute();

        console.log('✅ Stress Test Finalizado. Estado original restaurado.');
        console.groupEnd();
    };

    // Auto-ejecutar después de un pequeño delay para asegurar carga de todo
    setTimeout(() => {
        window.runPortfolioStressTest();
    }, 1000);
})();
