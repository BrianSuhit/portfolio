# SPEC.md - Brian Suhit Portfolio

## 1. Identidad del Sistema (Vision)
**Tipo de Aplicación:** Single Page Application (SPA) estática.
**Arquitectura de UI:** "Viewport Frame Layout".
- **Comportamiento:** El usuario percibe una aplicación de escritorio fija.
- **Frame (Marco):** Elementos de navegación y estado fijos en el viewport (`position: fixed`). Nunca hacen scroll.
- **Content (Contenido):** Único elemento con capacidad de scroll (`overflow-y: auto`).
**Restricción de Diseño:** "Dark Mode Only" (Sin toggle).

## 2. Tech Stack & Restricciones
**Core:**
- **HTML:** HTML5 Semántico Estricto. Prohibido usar `div` para elementos de navegación o botones.
- **CSS:** CSS3 Nativo.
  - **Metodología:** Variables CSS (`:root`) para todos los tokens de diseño.
  - **Layout Engine:** Flexbox para componentes unidimensionales, Grid para layouts bidimensionales.
  - **Prohibido:** Frameworks (Tailwind, Bootstrap) y Preprocesadores (Sass/SCSS).
- **JavaScript:** Vanilla JS (ES6+).
  - **Manejo de DOM:** `querySelector`, `addEventListener`.
  - **Prohibido:** jQuery o librerías reactivas.

**Assets & Dependencias Externas (Hardcoded):**
- **Tipografía:** `Geist Mono` (Google Fonts).
  - **Import URL:** `https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap`
- **Iconografía:** FontAwesome Free 6.4.0 (CDN).
  - **Import URL:** `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`

## 3. Configuración Global (Tokens Inmutables)
Estas variables deben definirse en `:root` antes de cualquier estilo.

**Color Palette (Hex Codes Exactos):**
- `--bg-core`: `#181a1e` (Gunmetal - Fondo Principal).
- `--bg-glass`: `rgba(24, 26, 30, 0.8)` (Para efectos de superposición).
- `--text-primary`: `#dddddd` (Gris Alto Contraste - Títulos/Cuerpo).
- `--text-secondary`: `#888888` (Gris Medio - Metadatos/Líneas).
- `--accent-light`: `rgba(255, 255, 255, 0.08)` (Glow/Bordes sutiles).

**Typography System:**
- `--font-stack`: 'Geist Mono', monospace.
- `--weight-regular`: 400.
- `--weight-medium`: 500 (Para Títulos Hero).
- `--weight-bold`: 700.

## 4. Estructura de UI & Layout (BEM Methodology)

### 4.1. Configuración Global del Viewport
Para lograr el efecto "Cockpit", el scroll no ocurre en el `body`, sino en un contenedor interno.
- **Selector:** `body`
  - `overflow: hidden;` (Deshabilita scroll nativo global).
  - `height: 100vh;`
  - `background-color: var(--bg-core);`
- **Selector:** `.app-container` (Elemento `<main>`)
  - `height: 100vh;`
  - `overflow-y: scroll;` (El scroll ocurre aquí).
  - `scroll-behavior: smooth;`
  - **Scrollbar Hiding:** Debe aplicarse `scrollbar-width: none;` (Firefox) y `display: none` en pseudo-elemento `::-webkit-scrollbar` (Chrome/Safari) para invisibilidad total.

### 4.2. Componente: Navegación Principal (Top-Right)
- **Bloque:** `.nav`
- **Tag HTML:** `<header class="nav">`
- **Posición:** `fixed`, `top: 3rem`, `right: 4rem`, `z-index: 100`.
- **Elementos:**
  - **Lista:** `.nav__list` (`<ul>`) -> `display: flex`, `flex-direction: row` (Horizontal), `gap: 5rem` (Separación amplia), `list-style: none`.
  - **Items:** `.nav__item` (`<li>`).
  - **Links:** `.nav__link` (`<a>`).
    - Texto: "SOBRE MÍ", "PROYECTOS", "CONTACTO".
    - Tipografía: Size `0.8rem`, Weight `400`, Uppercase, `letter-spacing: 0.1em`.
    - Color: `var(--text-secondary)`.
    - Estado `:hover`: Color `var(--text-primary)`, `text-decoration: none`.

### 4.3. Componente: Redes Sociales (Bottom-Left)
- **Bloque:** `.social`
- **Tag HTML:** `<aside class="social">`
- **Posición:** `fixed`, `bottom: 3rem`, `left: 4rem`, `z-index: 100`.
- **Elementos:**
  - **Lista:** `.social__list` (`<ul>`) -> `display: flex`, `flex-direction: column` (Vertical estricto), `gap: 2rem`.
  - **Links:** `.social__link` (`<a>`).
    - Contenido: Iconos de FontAwesome (`<i class="fab fa-github"></i>`, `<i class="fab fa-linkedin-in"></i>`).
    - Tamaño Icono: `1.4rem`.
    - Color: `var(--text-secondary)`.
    - Estado `:hover`: Color `var(--text-primary)`, Transform `scale(1.1)`.

### 4.4. Componente: Indicador Scroll (Bottom-Right)
- **Bloque:** `.scroll-indicator`
- **Tag HTML:** `<aside class="scroll-indicator">`
- **Posición:** `fixed`, `bottom: 3rem`, `right: 4rem`, `z-index: 100`.
- **Estilo:**
  - `writing-mode: vertical-rl;` (Texto vertical rotado).
  - `text-orientation: mixed;`
  - Texto: "SCROLL".
  - Tipografía: Size `0.7rem`, `letter-spacing: 0.3em`, Color `var(--text-secondary)`, Opacity `0.5`.

  ## 5. Especificación de Componentes de Contenido (BEM)

Todas las secciones deben residir dentro de `.app-container`.

### 5.1. Sección Hero (Inicio)
- **Bloque:** `.hero`
- **Tag HTML:** `<section id="inicio" class="hero">`
- **Dimensiones:** `min-height: 100vh;`
- **Layout:** `display: flex; flex-direction: column; justify-content: center; align-items: center;`
- **Elementos:**
  - **Título:** `.hero__title` (`<h1>`)
    - Texto: "BRIAN"
    - Tipografía: Size `10rem` (Responsive: bajar en móvil), Weight `500` (Medium), Color `var(--text-primary)`.
    - Ajuste óptico: `line-height: 1; letter-spacing: -0.05em;`
  - **Subtítulo:** `.hero__subtitle` (`<h2>`)
    - Texto: "ESTUDIANTE DE INGENIERÍA EN IA"
    - Tipografía: Size `0.9rem`, Weight `400`, Uppercase, `letter-spacing: 0.4em`.
    - Color: `var(--text-secondary)`.
    - Margen: `margin-top: 2rem;`

### 5.2. Sección Proyectos (Grid System)
- **Bloque:** `.projects`
- **Tag HTML:** `<section id="proyectos" class="projects">`
- **Spacing:** `padding: 10rem 4rem;`
- **Layout:**
  - Contenedor `.projects__grid`: `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4rem;`
- **Componente Card:** `.card` (`<article>`)
  - **Estilo Base:** `background: transparent;` (Sin fondo sólido inicial).
  - **Imagen:** `.card__image-container` (Aspect Ratio 16:9).
    - `background-color: #111;` (Placeholder mientras carga).
    - `border: 1px solid var(--accent-light);`
  - **Info:** `.card__info` (Debajo de la imagen).
    - Título `.card__title`: Color `var(--text-primary)`, Size `1.2rem`.
    - Tags `.card__tags`: Color `var(--text-secondary)`, Size `0.8rem`.
  - **Interacción:** Hover en la card -> `border-color: var(--text-primary)` en la imagen.

### 5.3. Sección Contacto (The Card Look)
- **Bloque:** `.contact`
- **Tag HTML:** `<section id="contacto" class="contact">`
- **Layout:** `min-height: 80vh; display: flex; justify-content: center; align-items: center;`
- **Componente Tarjeta:** `.contact__card`
  - **Background:** `background-color: rgba(255, 255, 255, 0.02);` (Casi invisible).
  - **Borde:** `border: 1px solid var(--accent-light);`
  - **Dimensiones:** `width: 100%; max-width: 500px; padding: 4rem;`
  - **Efecto:** `box-shadow: 0 0 50px rgba(0,0,0,0.5);`
- **Formulario:** `.form`
  - **Inputs:** `.form__input`
    - `width: 100%; background: transparent; border: none;`
    - `border-bottom: 1px solid var(--accent-light);`
    - `color: var(--text-primary); padding: 1rem 0;`
    - Focus: `border-bottom-color: var(--text-primary); outline: none;`
  - **Botón:** `.form__submit`
    - `background: transparent; border: 1px solid var(--text-secondary);`
    - `color: var(--text-primary); padding: 1rem 2rem; width: 100%; margin-top: 2rem;`
    - Hover: `background: var(--text-primary); color: var(--bg-core);`

## 6. Plan de Implementación (Fases Atómicas)

1.  **Fase 1: Infraestructura & Frame:** Crear archivos, configurar variables CSS (Gunmetal), reset CSS, ocultar scrollbar nativo y construir el Marco Fijo (Nav/Social/Scroll).
2.  **Fase 2: Hero Section:** Implementar la tipografía grande y centrada.
3.  **Fase 3: Estructura de Proyectos:** Crear el Grid y el componente Card básico.
4.  **Fase 4: Contacto:** Crear la tarjeta de formulario con estilos de línea.
5.  **Fase 5: Polish & JS:** Smooth scroll, validaciones.