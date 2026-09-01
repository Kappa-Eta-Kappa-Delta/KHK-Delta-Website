// ==========================================
// KHK DELTA CHAPTER - CUSTOM JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeColorMode();
    initializeScrollBehavior();
    initializeScrollToTopButton();
    initializeNavigationHighlight();
    initializeIntersectionObserver();
    initializeStatCounters();
});

// ==========================================
// COLOR MODE SYNC
// ==========================================

function initializeColorMode() {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyColorMode = event => {
        root.setAttribute('data-bs-theme', event.matches ? 'dark' : 'light');
    };

    applyColorMode(mediaQuery);

    if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', applyColorMode);
    } else if (typeof mediaQuery.addListener === 'function') {
        mediaQuery.addListener(applyColorMode);
    }
}

// ==========================================
// SMOOTH SCROLL BEHAVIOR
// ==========================================

function initializeScrollBehavior() {
    // Handle smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbar = new bootstrap.Collapse(navbarCollapse, {
                        toggle: true
                    });
                }
                
                // Scroll to target
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// HOME PAGE "RUSH!" CTA BUTTON
// (repurposed from a universal scroll-to-top button; only appears on the
// home page and jumps down to the "Interested in Joining?" sign-up form)
// ==========================================

function initializeScrollToTopButton() {
    // Home-page-only CTA (id="home" is unique to layouts/index.html's hero).
    if (!document.getElementById('home')) {
        return;
    }

    // Create the floating button
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top rush-jump-btn';
    scrollButton.textContent = 'Rush!';
    scrollButton.setAttribute('aria-label', 'Jump to the sign-up form');
    document.body.appendChild(scrollButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('show');
        } else {
            scrollButton.classList.remove('show');
        }
    });

    // Scroll to the sign-up form on click
    scrollButton.addEventListener('click', () => {
        const target = document.getElementById('join-interest');
        if (!target) return;
        window.scrollTo({
            top: target.offsetTop - 100,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// FORM HELPERS
// (used by js/join-form.js for the "Interested in Joining?" sign-up form)
// ==========================================

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification helper
function showNotification(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Insert at the top of the page
    const container = document.querySelector('.container');
    if (container) {
        container.parentElement.insertBefore(alertDiv, container);
    }
    
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => {
            alertDiv.remove();
        }, 150);
    }, 4000);
}

// ==========================================
// NAVIGATION HIGHLIGHT ON SCROLL
// ==========================================

function initializeNavigationHighlight() {
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active nav links
    document.querySelectorAll('.navbar-nav a[href^="#"]').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ==========================================

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0');
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and images
    document.querySelectorAll('.event-card, .gallery-item, .member-stat, .about-section img, .rush-section img, .alumni-section img').forEach(el => {
        el.classList.add('opacity-0'); // Start hidden
        observer.observe(el);
    });
}

// ==========================================
// STAT COUNT-UP ON SCROLL
// (the "Our Members" numbers on the home page)
// ==========================================

function initializeStatCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count-to]');
    if (!counters.length) {
        return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = 1500; // ms

    function animateCounter(el) {
        const target = el.getAttribute('data-count-to') || '';
        const match = target.match(/^([\d,]+)(.*)$/); // leading number + any suffix (e.g. "+")

        // No leading number to count up to (or the user prefers less motion) -
        // just show the final label as-is.
        if (!match || prefersReducedMotion) {
            el.textContent = target;
            return;
        }

        const endValue = parseInt(match[1].replace(/,/g, ''), 10);
        const suffix = match[2];
        let startTime = null;

        function step(timestamp) {
            if (startTime === null) {
                startTime = timestamp;
            }
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // easeOutExpo: fast climb that settles gently into the final number
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(eased * endValue);
            el.textContent = current.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target; // land on the exact original string
            }
        }

        requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    counters.forEach(el => observer.observe(el));
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Format phone number (if needed elsewhere)
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
}

// Copy to clipboard utility
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy to clipboard.', 'error');
    });
}

// ==========================================
// ENHANCE EXTERNAL LINKS
// ==========================================

document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================

// Add focus visible styles for keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================

function displayConsoleMessage() {
    console.log('%cWelcome to KHK Delta Chapter website!', 'color: #c41e3a; font-size: 16px; font-weight: bold;');
    console.log('%cIf you\'re hacking around in here... then you should totally join!', 'color: #ffc72c; font-size: 12px;');
}

var consoleMessageShown = 0;
displayConsoleMessage();
window.addEventListener('resize', () => {
    // Display the console message if the user opens the inspect window, but only do this once to avoid spamming
    if (!consoleMessageShown) {
        displayConsoleMessage();
        consoleMessageShown = 1;
    }
});