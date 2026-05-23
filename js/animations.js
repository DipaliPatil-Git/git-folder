/* ==========================================================================
   SCROLL REVEAL & INTERACTION ANIMATIONS - MINDCARE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15, // trigger when 15% of element is visible
            rootMargin: '0px 0px -50px 0px' // offset triggering slightly before entering view
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => {
            el.classList.add('active');
        });
    }

    // 2. Micro-interactions: Hover Scales for widgets
    const hoverCards = document.querySelectorAll('.glass-card, .btn');
    hoverCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
        });
    });
});
