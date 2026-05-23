/* ==========================================================================
   WELLNESS RESOURCES LOGIC - MINDCARE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Search and Filtering Logic
    const searchInput = document.getElementById('search-input');
    const filterPills = document.querySelectorAll('.filter-pill');
    const articleCards = document.querySelectorAll('.article-card');

    function filterArticles() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const activePill = document.querySelector('.filter-pill.active');
        const activeCategory = activePill ? activePill.getAttribute('data-category') : 'all';

        articleCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            const category = card.getAttribute('data-category');

            const matchesSearch = title.includes(query) || desc.includes(query);
            const matchesCategory = (activeCategory === 'all' || category === activeCategory);

            if (matchesSearch && matchesCategory) {
                card.style.display = 'flex';
                // Trigger entry animation
                card.style.animation = 'scale-in 0.3s ease-out forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterArticles);
    }

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            filterArticles();
        });
    });

    // 2. Breathing Visualizer Logic
    const bubble = document.getElementById('breathing-bubble');
    const instruction = document.getElementById('breathing-instruction');
    const timerDisplay = document.getElementById('breathing-timer');
    const startBtn = document.getElementById('start-breathing-btn');

    let breathingActive = false;
    let cycleInterval = null;
    let countdownInterval = null;

    function startBreathing() {
        breathingActive = true;
        startBtn.textContent = 'Pause Session';
        startBtn.classList.remove('btn-primary');
        startBtn.classList.add('btn-secondary');
        
        runBreathingCycle();
    }

    function stopBreathing() {
        breathingActive = false;
        startBtn.textContent = 'Start Session';
        startBtn.classList.remove('btn-secondary');
        startBtn.classList.add('btn-primary');

        // Clear timers
        clearInterval(cycleInterval);
        clearInterval(countdownInterval);

        // Reset bubble and instruction
        if (bubble) {
            bubble.className = 'breathing-bubble';
            bubble.style.transform = 'scale(1)';
        }
        if (instruction) instruction.textContent = 'Ready when you are';
        if (timerDisplay) timerDisplay.textContent = 'Focus on your breath';
    }

    function runBreathingCycle() {
        let phase = 'inhale'; // inhale -> hold -> exhale
        let secondsLeft = 4;

        if (bubble) {
            bubble.className = 'breathing-bubble breathe-bubble-active inhale';
        }
        if (instruction) instruction.textContent = 'Inhale deeply...';
        if (timerDisplay) timerDisplay.textContent = '4 seconds';

        countdownInterval = setInterval(() => {
            secondsLeft--;
            if (timerDisplay) timerDisplay.textContent = secondsLeft + ' seconds';

            if (secondsLeft === 0) {
                // Shift phase
                if (phase === 'inhale') {
                    phase = 'hold';
                    secondsLeft = 4;
                    if (instruction) instruction.textContent = 'Hold your breath...';
                    if (bubble) {
                        bubble.className = 'breathing-bubble breathe-bubble-active hold';
                    }
                } else if (phase === 'hold') {
                    phase = 'exhale';
                    secondsLeft = 4;
                    if (instruction) instruction.textContent = 'Exhale slowly...';
                    if (bubble) {
                        bubble.className = 'breathing-bubble breathe-bubble-active exhale';
                    }
                } else if (phase === 'exhale') {
                    phase = 'inhale';
                    secondsLeft = 4;
                    if (instruction) instruction.textContent = 'Inhale deeply...';
                    if (bubble) {
                        bubble.className = 'breathing-bubble breathe-bubble-active inhale';
                    }
                }
            }
        }, 1000);
    }

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (breathingActive) {
                stopBreathing();
            } else {
                startBreathing();
            }
        });
    }
});