// ==========================================
// ABOUT PAGE - ALUMNI BELT SCROLLER
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    initializeAlumniBelt();
});

function initializeAlumniBelt() {
    const belt = document.getElementById('alumniBelt');
    const prevBtn = document.querySelector('.belt-control-prev');
    const nextBtn = document.querySelector('.belt-control-next');

    if (!belt || !prevBtn || !nextBtn) return;

    function scrollByCard(direction) {
        const card = belt.querySelector('.alumni-card');
        if (!card) return;

        const gap = parseFloat(getComputedStyle(belt).columnGap) || 0;
        const distance = card.getBoundingClientRect().width + gap;

        belt.scrollBy({ left: direction * distance, behavior: 'smooth' });
    }

    prevBtn.addEventListener('click', () => scrollByCard(-1));
    nextBtn.addEventListener('click', () => scrollByCard(1));
}
