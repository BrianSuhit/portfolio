# SPEC.md - Brian Suhit Portfolio

## 1. Visión del Producto
Portfolio minimalista para estudiante enfocado en Ingeniería en IA.
**Estética:** "Dark Matte & Silent" (Terminal de Lujo).
**Referencia:** Estilo Vercel/X.ai. Layout tipo "Cockpit" (marco fijo, contenido scrolleable).
**Filosofía:** "System over decoration".

## 2. Tech Stack
- **Core:** HTML5 Semántico, CSS3 (Variables, Flexbox, Grid, Scroll Snap), JS Vanilla.
- **Fuente:** `Geist Mono` (Google Fonts). Pesos: Regular (400) y Bold (700).
- **Iconos:** FontAwesome (CDN).
- **Deploy:** Netlify / GitHub Pages.

## 3. Design System (Tokens)

### Paleta de Colores "Matte"
- `--bg-body`: `#080808` (Gris carbón profundo, mate).
- `--bg-panel`: `#111111` (Para tarjetas o separaciones sutiles).
- `--text-main`: `#EDEDED` (Blanco hueso/Gris perla - NO blanco puro).
- `--text-muted`: `#666666` (Gris técnico).
- `--accent-glow`: `rgba(255, 255, 255, 0.08)` (Resplandor muy tenue).
- `--border-subtle`: `#222222` (Líneas divisorias).

### Tipografía
- **Familia:** 'Geist Mono', monospace.
- **H1 (Nombre):** Weight 400 (Regular), Tracking -2px (Compacto), Size 4rem+.
- **Label (Etiquetas):** Size 0.75rem, Tracking 4px (Muy separado), Uppercase, Color Muted.

### Layout (The Frame)
- **Elementos Fijos (`z-index: 100`):**
  - **Top Right:** Nav (Links: About, Projects, Contact). Hover: Subrayado animado.
  - **Bottom Left:** Social Icons (GitHub, LinkedIn). Hover: Glow sutil.
  - **Bottom Right:** Indicador "SCROLL" vertical.

## 4. Componentes y Secciones

### A. Hero Section
- Centrado absoluto (Flexbox/Grid).
- **Contenido:**
  - H1: "BRIAN SUHIT"
  - Label: "AI ENGINEERING STUDENT"
- **Animación:** Fade-in suave al cargar (opacity 0 a 1).

### B. Projects Section (The Carousel)
- **Estructura Desktop:**
  - Grid de 3 columnas visuales (Previo - ACTIVO - Siguiente).
  - El proyecto activo es más grande/brillante. Los laterales tienen opacidad reducida (0.3).
  - Al pasar el mouse sobre el activo: Aparece título y descripción breve.
- **Estructura Mobile:**
  - **Horizontal Snap:** Contenedor con `overflow-x: scroll` y `scroll-snap-type: x mandatory`.
  - Las tarjetas ocupan el 85% del ancho y se centran al scrollear.

### C. Contact Section
- **Diseño:** Minimalista extremo.
- **Formulario:**
  - Inputs sin fondo (`background: transparent`).
  - Sin bordes laterales ni superiores. Solo `border-bottom: 1px solid #333`.
  - **Focus State:** La línea inferior se vuelve blanca (`--text-main`) y brilla suavemente.
- **Fondo:** Un degradado radial muy sutil (`radial-gradient`) detrás del formulario para darle profundidad "Spotlight".

## 5. Plan de Implementación (Fases)

### Fase 1: Andamiaje & Configuración
- Crear archivos (`index.html`, `style.css`, `app.js`).
- Importar **Geist Mono** de Google Fonts.
- Configurar Variables CSS (Paleta Matte).
- Crear el "Marco Fijo" (Nav, Social, Scroll).

### Fase 2: Hero Section
- Maquetar el Hero centrado.
- Ajustar tipografía (Tracking negativo para el H1).

### Fase 3: Projects (Estructura & Estilos)
- Crear el HTML de las tarjetas de proyecto (Mock data).
- Implementar CSS Grid para Desktop y Scroll Snap para Mobile.

### Fase 4: Contacto & Footer
- Maquetar formulario estilo "Línea".
- Agregar efecto Spotlight.

### Fase 5: Interactividad (JS Refinement)
- Smooth Scroll.
- (Opcional) Lógica de carrusel rotativo en Desktop si es necesario.