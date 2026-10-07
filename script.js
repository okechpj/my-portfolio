/**
 * Peter Okech - Portfolio Script
 * Modern, High-Performance Interactions & Accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. Mobile Navigation Toggle
    // --------------------------------------------------------------------------
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navToggleIcon = document.getElementById('nav-toggle-icon');
    const navLinks = document.querySelectorAll('.nav_link, .nav_cta-mobile a');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('show');
            navToggle.setAttribute('aria-expanded', isOpen);

            if (navToggleIcon) {
                if (isOpen) {
                    navToggleIcon.classList.remove('bx-menu');
                    navToggleIcon.classList.add('bx-x');
                } else {
                    navToggleIcon.classList.remove('bx-x');
                    navToggleIcon.classList.add('bx-menu');
                }
            }
        });

        // Close mobile menu when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    navToggle.setAttribute('aria-expanded', 'false');
                    if (navToggleIcon) {
                        navToggleIcon.classList.remove('bx-x');
                        navToggleIcon.classList.add('bx-menu');
                    }
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (event) => {
            if (navMenu.classList.contains('show') && !navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                navMenu.classList.remove('show');
                navToggle.setAttribute('aria-expanded', 'false');
                if (navToggleIcon) {
                    navToggleIcon.classList.remove('bx-x');
                    navToggleIcon.classList.add('bx-menu');
                }
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                navToggle.setAttribute('aria-expanded', 'false');
                if (navToggleIcon) {
                    navToggleIcon.classList.remove('bx-x');
                    navToggleIcon.classList.add('bx-menu');
                }
            }
        });
    }

    // --------------------------------------------------------------------------
    // 2. Header Blur & Shadow on Scroll
    // --------------------------------------------------------------------------
    const header = document.getElementById('header');
    const handleScrollHeader = () => {
        if (window.scrollY >= 40) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScrollHeader, { passive: true });
    handleScrollHeader();

    // --------------------------------------------------------------------------
    // 3. Scrollspy Navigation Indicator
    // --------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav_menu a[href^="#"]');

    const handleScrollSpy = () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', handleScrollSpy, { passive: true });

    // --------------------------------------------------------------------------
    // 4. Contact Form Handling & Interactive Feedback
    // --------------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit-btn');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && submitBtn && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name')?.value.trim();
            const email = document.getElementById('contact-email')?.value.trim();
            const subject = document.getElementById('contact-subject')?.value.trim();
            const message = document.getElementById('contact-message')?.value.trim();

            if (!name || !email || !message) {
                formFeedback.textContent = 'Please fill out all required fields.';
                formFeedback.className = 'form_feedback error';
                return;
            }

            // Button loading state
            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class='bx bx-loader-alt bx-spin'></i>`;

            // Simulate quick transmission & response
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Message Sent!</span> <i class='bx bx-check'></i>`;

                formFeedback.textContent = `Thanks, ${name}! Your message has been sent successfully. I'll get back to you shortly.`;
                formFeedback.className = 'form_feedback success';

                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnHTML;
                    formFeedback.textContent = '';
                    formFeedback.className = 'form_feedback';
                }, 5000);
            }, 800);
        });
    }

    // --------------------------------------------------------------------------
    // 5. Dynamic Footer Year
    // --------------------------------------------------------------------------
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // --------------------------------------------------------------------------
    // 6. Smooth Scroll Reveal (Native Intersection Observer)
    // --------------------------------------------------------------------------
    const revealElements = document.querySelectorAll(
        '.hero_content, .hero_visual, .about_grid, .timeline_item, .cert_card, .phase_card, .skill_category_card, .work_card, .contact_wrapper'
    );

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            revealObserver.observe(el);
        });
    }
});
