// =====================================================
// VINTAGE LUXURY PORTFOLIO - JAVASCRIPT
// ===================================================== 

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
});

// ===== Scroll Animations =====
const scrollElements = document.querySelectorAll('.portfolio-item, .skill-category, .about-content');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop > (window.innerHeight || document.documentElement.clientHeight);
};

const displayScrollElements = () => {
    scrollElements.forEach((element) => {
        if (elementInView(element, 1.25)) {
            element.classList.add('scroll-fade-in');
            element.classList.add('visible');
        } else if (elementOutofView(element)) {
            element.classList.remove('visible');
        }
    });
};

window.addEventListener('scroll', () => {
    displayScrollElements();
});

// Initial check on page load
displayScrollElements();

// ===== Smooth Parallax Effect =====
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    
    // Parallax for hero decoration
    const decoration = document.querySelector('.hero-decoration');
    if (decoration) {
        decoration.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    // Parallax untuk background elements
    const heroBg = document.querySelector('.hero::before');
    if (heroBg) {
        const parallaxIntensity = scrolled * 0.3;
    }

    ticking = false;
}

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, false);

// ===== Navbar Sticky Effect & Shadow =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(42, 38, 34, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== Scroll to Top Button (Optional) =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== Portfolio Item Hover Effects =====
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ===== Skill Bar Animation =====
const skillBars = document.querySelectorAll('.skill-fill');
let skillsAnimated = false;

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

const skillsSection = document.querySelector('.skills');
window.addEventListener('scroll', () => {
    if (!skillsAnimated && skillsSection) {
        const skillsSectionTop = skillsSection.getBoundingClientRect().top;
        if (skillsSectionTop < window.innerHeight) {
            animateSkillBars();
            skillsAnimated = true;
        }
    }
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Simple validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Mohon isi semua field dengan lengkap.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Mohon masukkan email yang valid.');
            return;
        }

        // Simulate form submission
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Pesan Terkirim ✓';
        submitButton.style.backgroundColor = '#d4af37';
        submitButton.style.color = '#1a1816';

        // Reset form
        this.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '';
            submitButton.style.color = '';
        }, 3000);
    });
}

// ===== Stagger Animation for Section Elements =====
function staggerElements(container, elementSelector) {
    const elements = container.querySelectorAll(elementSelector);
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
    });
}

// Apply stagger animation to skill categories
const skillContainer = document.querySelector('.skills-grid');
if (skillContainer) {
    staggerElements(skillContainer, '.skill-category');
}

// ===== Active Navigation Link Highlight =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '#2a2622';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#d4af37';
            link.style.textDecoration = 'underline';
            link.style.textDecorationColor = '#d4af37';
            link.style.textDecorationThickness = '2px';
            link.style.textUnderlineOffset = '5px';
        }
    });
});

// ===== Image Placeholder Animation =====
const imagePlaceholders = document.querySelectorAll('.image-placeholder-large svg');

imagePlaceholders.forEach(svg => {
    svg.style.opacity = '0.5';
    svg.style.transition = 'opacity 0.4s ease';
    
    svg.parentElement.addEventListener('mouseenter', () => {
        svg.style.opacity = '0.8';
    });
    
    svg.parentElement.addEventListener('mouseleave', () => {
        svg.style.opacity = '0.5';
    });
});

// ===== Smooth Scroll Offset for Fixed Navbar =====
const smoothScrollOffset = () => {
    const navHeight = document.querySelector('.navbar').offsetHeight;
    const offset = navHeight + 20;
    document.documentElement.style.scrollPaddingTop = offset + 'px';
};

smoothScrollOffset();
window.addEventListener('resize', smoothScrollOffset);

// ===== Typing Animation untuk Hero Title (Optional Enhancement) =====
function createTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.minHeight = 'auto';

    let index = 0;
    const speed = 80;

    function type() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    // Start typing after a slight delay
    setTimeout(type, 300);
}

// Initialize typing animation when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createTypingAnimation);
} else {
    createTypingAnimation();
}

// ===== Mouse Tracking Gradient Effect (Subtle) =====
const sections = document.querySelectorAll('section');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
});

// ===== Page Transition Smooth Load =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.animation = 'fadeInUp 0.8s ease';
});

// Ensure body starts with opacity 0 in CSS (if needed)
if (document.readyState === 'loading') {
    document.body.style.opacity = '0';
}

// ===== Console Easter Egg =====
console.log('%c🎨 Vintage Luxury Portfolio', 'font-size: 20px; font-weight: bold; color: #d4af37; text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);');
console.log('%cDesigned with elegance and premium aesthetic', 'font-size: 14px; color: #8b7355;');
console.log('%cMade with ❤️ for creative professionals', 'font-size: 12px; color: #2a2622; font-style: italic;');

// ===== Prevent Mobile Touchscreen Hover Issues =====
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {
        // Remove hover effects on touch devices
    }, { passive: true });
}

// ===== Scroll Performance Optimization =====
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    document.body.style.pointerEvents = 'none';
    
    scrollTimeout = setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
    }, 150);
}, { passive: true });

// ===== Add CSS Animations Dynamically =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes glow {
        0%, 100% {
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
        }
        50% {
            box-shadow: 0 0 30px rgba(212, 175, 55, 0.8);
        }
    }
`;
document.head.appendChild(style);

// ===== Responsive Check =====
function isResponsive() {
    return window.innerWidth < 1024;
}

// Disable some animations on mobile for better performance
if (isResponsive()) {
    document.querySelectorAll('[class*="scroll-"]').forEach(el => {
        el.style.animation = 'none';
    });
}

// ===== Log Performance Metrics =====
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page Load Time: ${pageLoadTime}ms`);
    });
}
