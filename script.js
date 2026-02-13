/* ===================================
   Mia C. Personal Website
   JavaScript - Interactions & Animations
   =================================== */

document.addEventListener('DOMContentLoaded', function () {

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll + Back to Top button
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('back-to-top');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        // Navbar shadow
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(45, 35, 30, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Back to top button visibility
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        lastScrollY = window.scrollY;
    });

    // Back to top click handler
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Unified Intersection Observer for Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fade In Logic
                if (entry.target.classList.contains('fade-in-section')) {
                    entry.target.classList.add('is-visible');
                }

                // Rolling Counter Logic (if applicable)
                if (entry.target.classList.contains('counter-value')) {
                    animateValue(entry.target, 0, parseInt(entry.target.innerText), 2000);
                    observer.unobserve(entry.target); // Run once
                } else {
                    // For fade-ins, we also only want to animate once usually
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe Sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    // Observe Cards (staggered effect would be nice, but simple fade for now)
    document.querySelectorAll('.expertise-card, .project-spotlight').forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });

    // Number Rolling Animation Function
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Parallax effect for hero accent
    const heroAccent = document.querySelector('.hero-image-accent');
    if (heroAccent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                heroAccent.style.transform = `translateY(${scrolled * 0.1}px) rotate(${scrolled * 0.02}deg)`;
            }
        });
    }

    // Typing effect for hero title (optional - subtle)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 0.8s ease';
            heroTitle.style.opacity = '1';
        }, 600);
    }

    // Magnetic Button Effect (excluding contact-link to avoid conflicts)
    const magneticButtons = document.querySelectorAll('.btn, .nav-cta'); // Targets

    magneticButtons.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;

            // Intensity of the magnet
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px) scale(1.05)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px) scale(1)';
            setTimeout(() => {
                btn.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
            }, 100);
        });

        // Reset transition after mouse enter to allow smooth movement
        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'transform 0.1s linear';
        });
    });



    // Console greeting for developers
    console.log('%c👋 Hello! Welcome to Mia\'s website.', 'font-size: 16px; color: #C4917B; font-weight: bold;');
    console.log('%cBuilt with love and purpose.', 'font-size: 12px; color: #7D7269;');

});

// Preloader (optional - can be enabled)
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

// Project Modal Functions
function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});
