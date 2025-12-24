document.addEventListener('DOMContentLoaded', () => {
    
    /**
     * Initializes an IntersectionObserver to show or hide top and bottom 
     * decorative lines based on the currently visible section.
     */
    const initDirectionalScroll = () => {
        const lineTop = document.querySelector('.line-top');
        const lineBottom = document.querySelector('.line-bottom');
        
        const heroSection = document.querySelector('#inicio');
        const projectsSection = document.querySelector('#proyectos');
        const contactSection = document.querySelector('#contacto');

        if (!lineTop || !lineBottom || !heroSection || !projectsSection || !contactSection) return;

        // Default state: At the top
        lineTop.classList.add('line-hidden');

        const sections = [heroSection, projectsSection, contactSection];

        const observerOptions = {
            root: document.querySelector('.app-container'),
            rootMargin: '0px',
            threshold: 0.5 
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetId = entry.target.id;
                    
                    if (targetId === 'inicio') {
                        lineTop.classList.add('line-hidden');
                        lineBottom.classList.remove('line-hidden');
                    } else if (targetId === 'proyectos') {
                        lineTop.classList.remove('line-hidden');
                        lineBottom.classList.remove('line-hidden');
                    } else if (targetId === 'contacto') {
                        lineTop.classList.remove('line-hidden');
                        lineBottom.classList.add('line-hidden');
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(section => observer.observe(section));
    };

    /**
     * Sets up event listeners for the mobile navigation, handling the
     * opening and closing of the navigation overlay.
     */
    const initMobileMenu = () => {
        const navToggle = document.querySelector('.nav__toggle');
        const navClose = document.querySelector('.nav__close');
        const navOverlay = document.querySelector('.nav__overlay');
        const navLinks = document.querySelectorAll('.nav__overlay .nav__link');

        if (!navToggle || !navOverlay || !navClose) return;

        const openMenu = () => {
            navOverlay.classList.add('nav__overlay--active');
            navToggle.style.opacity = '0';
            navToggle.style.pointerEvents = 'none';
        };

        const closeMenu = () => {
            navOverlay.classList.remove('nav__overlay--active');
            navToggle.style.opacity = '1';
            navToggle.style.pointerEvents = 'all';
        };

        navToggle.addEventListener('click', openMenu);
        navClose.addEventListener('click', closeMenu);
        navLinks.forEach(link => link.addEventListener('click', closeMenu));
    };

    /**
     * Initializes an IntersectionObserver to trigger fade-in animations 
     * for elements with the .fade-in class as they enter the viewport.
     */
    const initScrollReveal = () => {
        const faders = document.querySelectorAll('.fade-in');
        const scrollContainer = document.querySelector('.app-container');

        if (!scrollContainer || faders.length === 0) return;

        const appearOptions = {
            root: scrollContainer,
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, appearOptions);

        faders.forEach(fader => appearOnScroll.observe(fader));
    };

    // Initialize all functionalities
    initDirectionalScroll();
    initMobileMenu();
    initScrollReveal();
});
