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

    /**
     * Initializes the language switcher functionality. It listens for clicks on the
     * language flags, fetches the corresponding JSON file, and updates the text
     * content of elements with 'data-section' attributes.
     */
    const initLanguageSwitcher = () => {
        const LANGUAGE_STORAGE_KEY = 'portfolio_lang';
        const DEFAULT_LANGUAGE = 'es';

        // 1. Localizar los elementos del interruptor de idiomas en el DOM
        const flagsElement = document.getElementById("flags");
        const textsToChange = document.querySelectorAll("[data-section]");

        if (!flagsElement || textsToChange.length === 0) return;

        // 2. Función asíncrona para cargar el JSON y cambiar los textos
        const changeLanguage = async (language) => {
            try {
                // Hacemos una petición (fetch) al archivo JSON correspondiente
                const requestJson = await fetch(`./languages/${language}.json`);
                const texts = await requestJson.json();

                // Actualizar el atributo lang del HTML para accesibilidad
                document.documentElement.lang = language;

                // Recorremos todos los elementos etiquetados en el HTML
                for (const textToChange of textsToChange) {
                    const section = textToChange.dataset.section;
                    const value = textToChange.dataset.value;

                    // Asegurarnos de que la clave existe antes de intentar asignarla
                    if (!texts[section] || !texts[section][value]) {
                        continue;
                    }

                    // Si el elemento es un input o textarea, cambiamos el placeholder
                    if (textToChange.tagName === "INPUT" || textToChange.tagName === "TEXTAREA") {
                        textToChange.placeholder = texts[section][value];
                    } else {
                        textToChange.innerHTML = texts[section][value];
                    }
                }
            } catch (error) {
                console.error("Error al cargar el archivo de idioma:", error);
            }
        };

        const setActiveFlag = (language) => {
            flagsElement.querySelector(".flags__item--active")?.classList.remove("flags__item--active");
            flagsElement.querySelector(`[data-language="${language}"]`)?.classList.add("flags__item--active");
        };

        // 3. Escuchar el clic en el contenedor de idiomas
        flagsElement.addEventListener("click", (e) => {
            // Obtenemos el idioma del elemento clickeado
            const newLanguage = e.target.dataset.language;

            // Si efectivamente se clickeó un idioma (y no la barra "/")
            if (newLanguage) {
                // A. Ejecutamos la traducción
                changeLanguage(newLanguage);

                // B. Lógica visual
                setActiveFlag(newLanguage);

                // C. Guardamos la preferencia en localStorage
                localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
            }
        });

        // 4. Al cargar la página, comprobar si hay un idioma guardado
        const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        const initialLanguage = savedLanguage || DEFAULT_LANGUAGE;

        // Aplicamos el idioma inicial
        changeLanguage(initialLanguage);
        setActiveFlag(initialLanguage);
    };

    // Initialize all functionalities
    initDirectionalScroll();
    initMobileMenu();
    initScrollReveal();
    initLanguageSwitcher();
});
