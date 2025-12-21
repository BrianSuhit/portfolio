document.addEventListener('DOMContentLoaded', () => {
    const lineTop = document.querySelector('.line-top');
    const lineBottom = document.querySelector('.line-bottom');
    
    const heroSection = document.querySelector('#inicio');
    const projectsSection = document.querySelector('#proyectos');
    const contactSection = document.querySelector('#contacto');

    // Default state: At the top
    if (lineTop) {
        lineTop.classList.add('line-hidden');
    }

    const sections = [heroSection, projectsSection, contactSection];

    const observerOptions = {
        root: document.querySelector('.app-container'), // Observe inside the scrollable container
        rootMargin: '0px',
        threshold: 0.5 
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                
                if (!lineTop || !lineBottom) return;

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

    sections.forEach(section => {
        if (section) {
            observer.observe(section);
        }
    });

    // Mobile Navigation
    const navToggle = document.querySelector('.nav__toggle');
    const navClose = document.querySelector('.nav__close');
    const navOverlay = document.querySelector('.nav__overlay');
    const navLinks = document.querySelectorAll('.nav__overlay .nav__link');

    if (navToggle && navOverlay && navClose) {
        navToggle.addEventListener('click', () => {
            navOverlay.classList.add('nav__overlay--active');
        });

        navClose.addEventListener('click', () => {
            navOverlay.classList.remove('nav__overlay--active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navOverlay.classList.remove('nav__overlay--active');
            });
        });
    }
});
