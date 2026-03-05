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

// close menu when a nav link is clicked
document.querySelectorAll('.side-panel-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});

/* ──────────────────────────────────────────────
   Contact form — async submit via Web3Forms
   ────────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const contactEmail = document.getElementById('contactEmail');
const hiddenReplyTo = document.getElementById('hiddenReplyTo');

// Sync reply-to with email input
if (contactEmail && hiddenReplyTo) {
    contactEmail.addEventListener('input', () => {
        hiddenReplyTo.value = contactEmail.value;
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('contactSubmit');
        const successMsg = document.getElementById('formSuccess');
        const errorMsg = document.getElementById('formError');

        // reset messages
        successMsg.style.display = 'none';
        errorMsg.style.display = 'none';

        // disable button while sending
        submitBtn.disabled = true;
        submitBtn.querySelector('.submit-text').textContent = 'Sending...';

        try {
            const formData = new FormData(contactForm);
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();

            if (data.success) {
                successMsg.style.display = 'flex';
                contactForm.reset();
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (err) {
            console.error('Contact form error:', err);
            errorMsg.style.display = 'flex';
        } finally {
            submitBtn.disabled = false;
            submitBtn.querySelector('.submit-text').textContent = 'Send Message';
        }
    });
}