// Mobile side navigation toggle
function openSideNav() {
    const sideNav = document.getElementById('sideNav');
    if (sideNav) sideNav.classList.add('open');
}

function closeSideNav() {
    const sideNav = document.getElementById('sideNav');
    if (sideNav) sideNav.classList.remove('open');
}

function handleSimpleContact(event) {
    if (!event) return;
    event.preventDefault();
    const name = document.getElementById('name')?.value || 'Friend';
    alert(`Thank you, ${name}! Your message has been received (demo). Please also consider emailing or calling us directly for urgent needs.`);
}

function handleLoginPlaceholder(event) {
    if (!event) return;
    event.preventDefault();
    alert('This login form is a placeholder. In a full implementation this would connect to your membership/course platform.');
}

function initNav() {
    const openBtn = document.getElementById('openNav');
    const closeBtn = document.getElementById('closeNav');

    if (openBtn) openBtn.addEventListener('click', openSideNav);
    if (closeBtn) closeBtn.addEventListener('click', closeSideNav);
}

function initFooterYear() {
    const yearSpans = document.querySelectorAll('#year');
    const year = new Date().getFullYear();
    yearSpans.forEach(span => {
        span.textContent = String(year);
    });
}

function initTestimonials() {
    const sliders = document.querySelectorAll('.testimonial-slider');
    sliders.forEach(slider => {
        const items = slider.querySelectorAll('.testimonial');
        if (items.length <= 1) return;

        let index = 0;
        setInterval(() => {
            items[index].classList.remove('active');
            index = (index + 1) % items.length;
            items[index].classList.add('active');
        }, 8000);
    });
}

// Simple click ripple on buttons
function initButtonEffects() {
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target instanceof HTMLElement && target.classList.contains('btn')) {
            target.style.transform = 'scale(0.96)';
            setTimeout(() => {
                target.style.transform = '';
            }, 150);
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    initNav();
    initFooterYear();
    initTestimonials();
    initButtonEffects();
});
