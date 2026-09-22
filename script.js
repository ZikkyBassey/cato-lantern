// ==========================================
// CAT O'LANTERN - Script
// ==========================================

// Copy contract address to clipboard
function copyToClipboard() {
    const contract = 'GeNwBZWJcWQAkLDdty7geii9xSjtCuga1qE9DDzLpump';
    
    // Try using the modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(contract).then(() => {
            showCopyNotification();
        }).catch(() => {
            // Fallback if Clipboard API fails
            fallbackCopy(contract);
        });
    } else {
        // Fallback for older browsers
        fallbackCopy(contract);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showCopyNotification();
    } catch (err) {
        console.error('Failed to copy:', err);
        alert('Failed to copy. Please copy manually: ' + text);
    }
    
    document.body.removeChild(textarea);
}

function showCopyNotification() {
    const btn = document.querySelector('.copy-btn');
    const originalText = btn.textContent;
    
    btn.textContent = '✓ Copied!';
    btn.style.background = '#4CAF50';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

// Smooth scroll animation
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animations to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in effect
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Observe cards for stagger effect
    const cards = document.querySelectorAll('.about-card, .feature-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });

    // Active navigation link tracking
    const navLinks = document.querySelectorAll('.nav-links a:not(.cta-btn)');
    const sections_with_id = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections_with_id.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.style.color = 'var(--primary-orange)';
            } else {
                link.style.color = '';
            }
        });
    });

    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });
    }

    // Particle effect on scroll
    createParticleEffect();
});

// Create floating particle effect
function createParticleEffect() {
    const heroSection = document.querySelector('.hero');
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = Math.random() > 0.5 ? '#ff6b35' : '#00d9ff';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.7 + 0.3;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '0';
        particle.style.animation = `float ${Math.random() * 5 + 3}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        heroSection.appendChild(particle);
    }
}

// Enhanced hover effects
document.addEventListener('DOMContentLoaded', () => {
    const socialBtns = document.querySelectorAll('.social-btn');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animate numbers in tokenomics on scroll
    const chartBars = document.querySelectorAll('.chart-bar');
    let animated = false;

    window.addEventListener('scroll', () => {
        if (!animated) {
            const tokensSection = document.querySelector('.tokenomics');
            if (tokensSection.getBoundingClientRect().top < window.innerHeight) {
                chartBars.forEach(bar => {
                    bar.style.animation = 'expandBar 1.5s ease-out forwards';
                });
                animated = true;
            }
        }
    });
});

// Prevent default for social links that don't have href
document.addEventListener('click', (e) => {
    if (e.target.closest('.social-btn[href="#"]')) {
        e.preventDefault();
        console.log('Link placeholder - update with actual URL');
    }
});

// Log page load
console.log('%c🎃 Welcome to CAT O\'LANTERN 🎃', 
    'font-size: 20px; color: #ff6b35; font-weight: bold; text-shadow: 0 0 10px rgba(255, 107, 53, 0.5);');
console.log('%cThe King of Halloween has arrived.', 
    'font-size: 14px; color: #00d9ff; font-weight: bold;');
console.log('%c$CATO on Solana', 
    'font-size: 12px; color: #cccccc;');


// ==========================================
// Page Load Scary Animation
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Wait for images to load
    setTimeout(() => {
        const latestImage = document.querySelector('.showcase-img-secondary');
        const showcaseContainer = document.querySelector('.showcase-grid');
        
        if (latestImage && showcaseContainer) {
            // Get the actual position of the image
            const rect = latestImage.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Add scare flash effect
            document.body.classList.add('scare-flash');
            
            // Create explosion particles
            createExplosion(centerX, centerY);
            
            // Log scary message
            console.log('%c🎃 CAT O\'LANTERN HAS AWAKENED! 🎃', 'font-size: 20px; color: #ff6b35; font-weight: bold;');
        }
    }, 500);
});

function createExplosion(centerX, centerY) {
    const emojis = ['💀', '🔥', '👻', '🦇', '⚡', '🕷️', '🌙', '🎃'];
    
    for (let i = 0; i < 16; i++) {
        const particle = document.createElement('div');
        particle.className = 'explode-particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Random explosion direction
        const angle = (Math.PI * 2 * i) / 16;
        const velocity = 100 + Math.random() * 150;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.fontSize = (1.5 + Math.random()) + 'rem';
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}
