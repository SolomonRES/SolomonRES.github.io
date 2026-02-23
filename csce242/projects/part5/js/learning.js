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

// domain accordion toggle
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