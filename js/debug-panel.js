/**
 * debug-panel.js
 * Inyecta un panel flotante para monitorear y forzar banderas lógicas.
 * Solo se activa en localhost / 127.0.0.1
 */

(function () {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isLocal) return;

    function createPanel() {
        const panel = document.createElement('div');
        panel.id = 'portfolio-debug-panel';
        panel.setAttribute('style', `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 280px;
            background: #233D4D;
            border: 2px solid #C65A2E;
            color: #F5F3EF;
            padding: 15px;
            font-family: 'Inter', sans-serif;
            font-size: 11px;
            z-index: 99999;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            border-radius: 4px;
        `);

        panel.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid rgba(198,90,46,0.3); padding-bottom:5px;">
                <strong style="color:#C65A2E; letter-spacing:1px; text-transform:uppercase;">Debug Engine v1.0</strong>
                <button id="debug-close" style="background:none; border:none; color:#C65A2E; cursor:pointer;">✕</button>
            </div>
            <div id="debug-flags-list" style="margin-bottom:15px;"></div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:5px;">
                <button id="btn-reset" style="grid-column: span 2; background:#C65A2E; color:#233D4D; border:none; padding:8px; font-weight:bold; cursor:pointer; margin-bottom:5px;">RESET LOCALSTORAGE</button>
                <button id="btn-force-recurring" class="force-btn" data-flag="FLAG_RECURRING" style="background:rgba(245,243,239,0.1); color:#F5F3EF; border:1px solid #F5F3EF; padding:5px; cursor:pointer;">Forzar REC</button>
                <button id="btn-force-all" class="force-btn" data-flag="FLAG_ALL_P" style="background:rgba(245,243,239,0.1); color:#F5F3EF; border:1px solid #F5F3EF; padding:5px; cursor:pointer;">Forzar ALL</button>
            </div>
            <div style="font-size:9px; margin-top:10px; opacity:0.5; text-align:center;">REGLA-LOGICA-001 | Solo en Localhost</div>
        `;

        document.body.appendChild(panel);

        // Update function
        const updateList = () => {
            const list = document.getElementById('debug-flags-list');
            if (!list || !window.PortfolioState) return;

            const flags = window.PortfolioState.flags;
            const state = window.PortfolioState.state;

            list.innerHTML = `
                <div style="margin-bottom:8px;"><strong>Visits:</strong> ${state.countVisits} | <strong>Projects:</strong> ${state.visitedProjects.length}</div>
                ${Object.keys(flags).map(f => `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3px; padding:2px 0;">
                        <span>${f}:</span>
                        <span style="color:${flags[f] ? '#C65A2E' : '#999'}; font-weight:${flags[f] ? 'bold' : 'normal'}">${flags[f] ? 'TRUE' : 'FALSE'}</span>
                    </div>
                `).join('')}
            `;
        };

        // Events
        panel.querySelector('#debug-close').onclick = () => panel.remove();
        panel.querySelector('#btn-reset').onclick = () => window.PortfolioState.reset();

        panel.querySelectorAll('.force-btn').forEach(btn => {
            btn.onclick = () => {
                const flag = btn.dataset.flag;
                const isCurrentlyTrue = window.PortfolioState.flags[flag];
                window.PortfolioState.setFlagValue(flag, !isCurrentlyTrue);
                updateList();
            };
        });

        // Listen for internal updates
        window.addEventListener('portfolio:logic-update', updateList);

        // Initial render
        updateList();
    }

    // Esperar a que PortfolioState esté listo
    if (window.PortfolioState) {
        createPanel();
    } else {
        window.addEventListener('load', createPanel);
    }
})();
