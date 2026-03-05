// hamburger menu toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidePanel = document.getElementById('sidePanel');
const sidePanelOverlay = document.getElementById('sidePanelOverlay');
const sidePanelClose = document.getElementById('sidePanelClose');

function openMenu() {
    sidePanel.classList.add('open');
    sidePanelOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    sidePanel.classList.remove('open');
    sidePanelOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', openMenu);
sidePanelOverlay.addEventListener('click', closeMenu);
sidePanelClose.addEventListener('click', closeMenu);

document.querySelectorAll('.side-panel-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});

/* SVG icon templates used by the domain cards */
const DOMAIN_ICONS = {
    ib: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="22" x2="21" y2="22"></line>
            <line x1="6" y1="18" x2="6" y2="11"></line>
            <line x1="10" y1="18" x2="10" y2="11"></line>
            <line x1="14" y1="18" x2="14" y2="11"></line>
            <line x1="18" y1="18" x2="18" y2="11"></line>
            <polygon points="12 2 20 7 4 7"></polygon></svg>`,
    cm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line></svg>`,
    am: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
    cf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
    re: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    ir: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`
};

const STATUS_ICONS = {
    completed: `<svg class="status-icon completed" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    'not-completed': `<svg class="status-icon not-completed" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle></svg>`,
    locked: `<svg class="status-icon locked-icon" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`
};

const ARROW_SVG = `<svg class="module-arrow" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline></svg>`;

const CHEVRON_SVG = `<svg class="domain-chevron" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline></svg>`;

const CLOCK_SVG = `<svg class="meta-icon" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline></svg>`;

/* JSON URL (hosted on GitHub) */
const JSON_URL = 'https://solomonres.github.io/csce242/projects/part7/json/modules.json';

/* Helper — group an array by a key */
function groupBy(arr, key) {
    return arr.reduce((acc, item) => {
        const k = item[key];
        if (!acc[k]) acc[k] = [];
        acc[k].push(item);
        return acc;
    }, {});
}

/* Build a single module-item element */
function buildModuleItem(mod) {
    const isLocked = mod.status === 'locked';
    const tag = isLocked ? 'div' : 'a';
    const classAttr = isLocked ? 'module-item locked' : 'module-item';
    const hrefAttr = isLocked ? '' : ' href="#"';

    let statusText = '';
    if (mod.status === 'completed') {
        statusText = '<span class="module-status-text completed-text">&bull; Completed</span>';
    } else if (mod.status === 'locked') {
        statusText = '<span class="module-status-text locked-text">&bull; Locked</span>';
    }

    return `
    <${tag} class="${classAttr}"${hrefAttr}>
        <div class="module-item-inner">
            <div class="module-thumbnail">
                <img src="../${mod.img_name}" alt="${mod.title}">
            </div>
            <div class="module-left">
                <div class="module-status">${STATUS_ICONS[mod.status]}</div>
                <div class="module-content">
                    <h4 class="module-title">${mod.title}</h4>
                    <p class="module-description">${mod.description}</p>
                    <div class="module-meta">
                        <span class="module-duration">${CLOCK_SVG} ${mod.duration} min</span>
                        ${statusText}
                    </div>
                </div>
            </div>
            ${isLocked ? '' : ARROW_SVG}
        </div>
    </${tag}>`;
}

/* Build a domain card */
function buildDomainCard(domainName, domainKey, modules, isFirst) {
    const completedCount = modules.filter(m => m.status === 'completed').length;
    const pct = Math.round((completedCount / modules.length) * 100);

    const modulesHTML = modules.map(m => buildModuleItem(m)).join('');

    return `
    <div class="domain-card" data-domain="${domainKey}">
        <button class="domain-header" aria-expanded="${isFirst ? 'true' : 'false'}">
            <div class="domain-header-left">
                <div class="domain-icon">${DOMAIN_ICONS[domainKey] || DOMAIN_ICONS.ib}</div>
                <div class="domain-info">
                    <h3 class="domain-title">${domainName}</h3>
                    <div class="domain-meta">
                        <span>${modules.length} module${modules.length !== 1 ? 's' : ''}</span>
                        <span class="meta-dot">&bull;</span>
                        <span>${pct}% complete</span>
                    </div>
                </div>
            </div>
            <div class="domain-header-right">
                <div class="domain-progress-bar">
                    <div class="domain-progress-fill" style="width: ${pct}%;"></div>
                </div>
                ${CHEVRON_SVG}
            </div>
        </button>
        <div class="domain-modules${isFirst ? ' open' : ''}">
            <div class="domain-modules-inner">
                ${modulesHTML}
            </div>
        </div>
    </div>`;
}

/* Update the hero progress stats */
function updateProgress(modules) {
    const total = modules.length;
    const done = modules.filter(m => m.status === 'completed').length;
    const pct = Math.round((done / total) * 100);

    const percentEl = document.getElementById('progressPercent');
    const barEl = document.getElementById('progressBar');
    const footerEl = document.querySelector('.progress-card-footer span');

    if (percentEl) percentEl.textContent = pct + '%';
    if (barEl) barEl.style.width = pct + '%';
    if (footerEl) footerEl.textContent = `${done} of ${total} modules completed`;
}

/* Attach accordion behaviour to freshly-built cards */
function attachAccordionListeners() {
    document.querySelectorAll('.domain-header').forEach(header => {
        header.addEventListener('click', () => {
            const card = header.closest('.domain-card');
            const modules = card.querySelector('.domain-modules');
            const isOpen = modules.classList.contains('open');

            // close all
            document.querySelectorAll('.domain-modules').forEach(m => m.classList.remove('open'));
            document.querySelectorAll('.domain-header').forEach(h => h.setAttribute('aria-expanded', 'false'));

            // toggle clicked
            if (!isOpen) {
                modules.classList.add('open');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/* Main — fetch JSON, render, wire up */
async function loadModules() {
    const container = document.getElementById('domainsContainer');
    const loader = document.getElementById('loadingIndicator');

    try {
        const res = await fetch(JSON_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const modules = await res.json();

        // group by domain, preserving order of first appearance
        const domainOrder = [];
        const grouped = {};
        modules.forEach(m => {
            if (!grouped[m.domain]) {
                grouped[m.domain] = { key: m.domain_key, items: [] };
                domainOrder.push(m.domain);
            }
            grouped[m.domain].items.push(m);
        });

        // build HTML
        const html = domainOrder.map((name, i) => {
            const { key, items } = grouped[name];
            return buildDomainCard(name, key, items, i === 0);
        }).join('');

        // inject
        if (loader) loader.remove();
        container.innerHTML = html;

        // update hero stats
        updateProgress(modules);

        // attach accordion
        attachAccordionListeners();

    } catch (err) {
        console.error('Failed to load modules:', err);
        if (loader) {
            loader.innerHTML = '<p>Failed to load modules. Please try again later.</p>';
        }
    }
}

// kick off
loadModules();