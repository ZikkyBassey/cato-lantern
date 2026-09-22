// ==========================================
// Falling Treats Animation
// ==========================================

const treats = ['🎃', '🦇', '🍬', '👻', '💀', '🕷️', '🍭', '🌙'];
const treatEmojis = {
    '🎃': 'treat-pumpkin',
    '🦇': 'treat-bat',
    '🍬': 'treat-candy',
    '👻': 'treat-ghost',
    '💀': 'treat-skull',
    '🕷️': 'treat-spider',
    '🍭': 'treat-candy-corn',
    '🌙': 'treat-moon'
};

function createFallingTreat() {
    const treatContainer = document.getElementById('falling-treats');
    if (!treatContainer) return;

    const treat = document.createElement('div');
    const emoji = treats[Math.floor(Math.random() * treats.length)];
    
    treat.textContent = emoji;
    treat.className = `treat ${treatEmojis[emoji]}`;
    treat.style.left = Math.random() * 100 + '%';
    treat.style.setProperty('--duration', (Math.random() * 5 + 7) + 's');
    treat.style.animationDelay = Math.random() * 2 + 's';
    treat.style.fontSize = (Math.random() * 1 + 1.5) + 'rem';
    
    treatContainer.appendChild(treat);

    // Remove treat after animation completes
    setTimeout(() => {
        treat.remove();
    }, 15000);
}

// Start falling treats on page load
document.addEventListener('DOMContentLoaded', () => {
    // Create treats every 300ms
    setInterval(createFallingTreat, 300);
    
    // Create initial batch
    for (let i = 0; i < 5; i++) {
        setTimeout(createFallingTreat, i * 200);
    }
});

// Optional: Add interactivity - click treats for effects
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('treat')) {
        e.target.style.animation = 'none';
        e.target.style.opacity = '0';
        setTimeout(() => e.target.remove(), 100);
        
        // Create explosion effect
        const x = e.clientX;
        const y = e.clientY;
        
        for (let i = 0; i < 3; i++) {
            const burst = document.createElement('div');
            burst.textContent = e.target.textContent;
            burst.className = 'treat';
            burst.style.position = 'fixed';
            burst.style.left = x + 'px';
            burst.style.top = y + 'px';
            burst.style.pointerEvents = 'none';
            burst.style.animation = 'none';
            burst.style.fontSize = e.target.style.fontSize;
            
            document.getElementById('falling-treats').appendChild(burst);
            
            const angle = (Math.PI * 2 * i) / 3;
            const velocity = 5;
            const duration = 0.5;
            
            burst.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${Math.cos(angle) * 100}px, ${Math.sin(angle) * 100}px) scale(0)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'ease-out'
            });
            
            setTimeout(() => burst.remove(), duration * 1000);
        }
    }
});
