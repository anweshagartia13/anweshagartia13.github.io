/**
 * Anwesha Gartia - Personal Portfolio Website Script
 * Interactive functionalities including theme toggling, scroll progress,
 * typing animations, viewport counters, and contact form operations.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. PRELOADER & PAGE INITIALIZATION
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    
    // Hide preloader after fully loading resources
    window.addEventListener('load', () => {
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600); // matches style.css transition time
        }
    });

    // Fallback: hide preloader if loading takes too long
    setTimeout(() => {
        if (preloader && preloader.style.display !== 'none') {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }
    }, 4000);

    /* ==========================================================================
       2. SCROLL PROGRESS INDICATOR & STICKY HEADER
       ========================================================================== */
    const scrollProgress = document.getElementById('scroll-progress');
    const header = document.querySelector('.main-header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Progress percentage calculation
        if (docHeight > 0) {
            const scrolledPercentage = (scrollTop / docHeight) * 100;
            if (scrollProgress) {
                scrollProgress.style.width = `${scrolledPercentage}%`;
            }
        }

        // Sticky Header Toggle
        if (header) {
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Back to Top visibility
        if (backToTopBtn) {
            if (scrollTop > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    // Back to top click handler
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================================================
       3. DARK / LIGHT THEME TOGGLE
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Retrieve saved theme preference, or fall back to system preferences
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    htmlElement.setAttribute('data-theme', initialTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    /* ==========================================================================
       4. MOBILE NAVIGATION DRAWER
       ========================================================================== */
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileNavToggle && navMenu) {
        // Toggle menu view
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
            document.body.classList.toggle('overflow-hidden');
        });

        // Close menu when clicking nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavToggle.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.classList.remove('overflow-hidden');
            });
        });

        // Close menu when clicking outside of navbar menu
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileNavToggle.contains(e.target) && navMenu.classList.contains('open')) {
                mobileNavToggle.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.classList.remove('overflow-hidden');
            }
        });
    }

    /* ==========================================================================
       5. HERO SECTION - ANIMATED TYPING EFFECT
       ========================================================================== */
    const typedTextSpan = document.getElementById('typed-text');
    const typedTextPrefixSpan = document.getElementById('typed-text-prefix');
    const phrases = ["Data Scientist", "Python Developer", "Machine Learning Enthusiast"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    // Prefix static update
    if (typedTextPrefixSpan) {
        typedTextPrefixSpan.textContent = "Aspiring ";
    }

    function type() {
        if (!typedTextSpan) return;

        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Delete characters
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster deletion
        } else {
            // Write characters
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Full phrase is typed, wait before starting deletion
            isDeleting = true;
            typingSpeed = 2000; // Delay at end of phrase
        } else if (isDeleting && charIndex === 0) {
            // Phrase deleted, transition to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Brief pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing loop
    if (typedTextSpan) {
        setTimeout(type, 1000);
    }

    /* ==========================================================================
       6. ACTIVE NAV LINK HIGHLIGHTING
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActiveHighlight() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // offset matches scrolled header height
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetLink.classList.add('active');
                } else {
                    targetLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollActiveHighlight);

    /* ==========================================================================
       7. ANIMATED VIEWPORT COUNTERS
       ========================================================================== */
    const counterNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function startCounters() {
        counterNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 200; // higher is slower
            const increment = target / speed;

            const updateCount = () => {
                const count = +counter.innerText;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCount();
        });
    }

    // IntersectionObserver to start counters when visible
    const statsSection = document.querySelector('.stats-counter-grid');
    if (statsSection && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    startCounters();
                    countersStarted = true;
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        statsObserver.observe(statsSection);
    } else {
        // Fallback if IntersectionObserver is not supported
        window.addEventListener('scroll', () => {
            if (!countersStarted && statsSection) {
                const rect = statsSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom >= 0) {
                    startCounters();
                    countersStarted = true;
                }
            }
        });
    }

    /* ==========================================================================
       8. SCROLL REVEAL (FADE-IN EFFECTS)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target); // trigger animation only once
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        const revealOnScroll = () => {
            revealElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 50) {
                    el.classList.add('active');
                }
            });
        };
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // run once on page load
    }

    /* ==========================================================================
       9. CONTACT FORM INTERACTIVE SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('portfolio-contact-form');
    const formSuccessCard = document.getElementById('form-success-card');
    const successResetBtn = document.getElementById('success-reset-btn');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm && formSuccessCard && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Client-side visual loading state
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

            // Collect values
            const nameVal = document.getElementById('name').value;
            const emailVal = document.getElementById('email').value;
            const msgVal = document.getElementById('message').value;

            // Log details locally for testing
            console.log(`[Form Submission Log]: Name: ${nameVal}, Email: ${emailVal}, Message: ${msgVal}`);

            // Simulate form transmission delays (1.5 seconds)
            setTimeout(() => {
                // Success trigger
                contactForm.classList.add('hidden');
                formSuccessCard.classList.remove('hidden');
                
                // Reset submit button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                
                // Clear fields
                contactForm.reset();
            }, 1500);
        });
    }

    // Reset Form Success Card to show inputs again
    if (successResetBtn && contactForm && formSuccessCard) {
        successResetBtn.addEventListener('click', () => {
            formSuccessCard.classList.add('hidden');
            contactForm.classList.remove('hidden');
        });
    }
});
