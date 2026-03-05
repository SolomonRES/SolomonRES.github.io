// hamburger menu
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
document.querySelectorAll('.side-panel-link').forEach(l => l.addEventListener('click', closeMenu));