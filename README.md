# Dario Ortega Fotografía

Sitio web y portafolio de **Dario Ortega**, fotógrafo profesional en Pasto, Nariño (Colombia).
Hecho con **React + Vite**, con banner de trabajos que corre solo, galería por proyectos, visor a pantalla completa y efectos de vidrio (glassmorphism).

Diseño y desarrollo web: **howlds3** · WhatsApp 312 277 4143

---

## Requisitos

- [Node.js](https://nodejs.org) 18 o superior

## Trabajar en local

```bash
npm install
npm run dev
```

Abre la dirección que muestra la terminal (normalmente http://localhost:5173).

## Generar la versión final

```bash
npm run build
```

Se crea la carpeta `dist/`, lista para subir a cualquier hosting (Netlify, Vercel, Hostinger, cPanel, etc.).

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube este proyecto:

   ```bash
   git init
   git add .
   git commit -m "Sitio Dario Ortega Fotografía"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/dario-ortega-fotografia.git
   git push -u origin main
   ```

2. En GitHub entra a **Settings → Pages** y en **Source** elige **GitHub Actions**.
3. El flujo `.github/workflows/deploy.yml` construye y publica el sitio en cada `push` a `main`.
   La dirección queda así: `https://TU-USUARIO.github.io/dario-ortega-fotografia/`.

Para un dominio propio (ej. `darioortegafotografia.com`), agrégalo en **Settings → Pages → Custom domain**.

## Dónde cambiar cosas

| Qué | Archivo |
| --- | --- |
| Teléfono, Instagram, ciudad, años, crédito del diseñador | `src/config.js` |
| Servicios y tipos de sesión del formulario | `src/config.js` |
| Fotos del banner principal | `HERO_SLIDES` en `src/config.js` |
| Proyectos, descripciones y fotos de la galería | `src/data.js` |
| Textos del perfil | `src/components/Profile.jsx` |
| Colores, tipografías y efectos | `src/styles.css` |
| Título y descripción para Google (SEO) | `index.html` |

### Agregar fotos

1. Guarda la foto grande (máx. 1600 px) en `public/f/` y una miniatura (máx. 640 px) con el mismo nombre en `public/t/`.
2. Agrégala a `photos` en `src/data.js` con su proyecto (`p`) y el tamaño de la miniatura (`w`, `h`).

## Estructura

```
├── index.html            SEO, fuentes y ficha de negocio para Google
├── public/
│   ├── f/                fotos en tamaño grande
│   └── t/                miniaturas
└── src/
    ├── App.jsx           arma la página
    ├── config.js         datos de contacto y ajustes
    ├── data.js           proyectos y fotos
    ├── hooks.jsx         animaciones (contador, inclinación 3D, intervalos)
    ├── styles.css        estilos y glassmorphism
    └── components/
        ├── Nav.jsx       menú flotante de vidrio
        ├── Hero.jsx      banner de trabajos con miniaturas
        ├── Profile.jsx   perfil y servicios
        ├── Gallery.jsx   filtros, proyectos y mosaico
        ├── Lightbox.jsx  visor a pantalla completa con presentación
        ├── Contact.jsx   contacto y formulario a WhatsApp
        └── Footer.jsx    pie de página y créditos
```

---

© 2026 Dario Ortega Fotografía. Todos los derechos reservados. Las fotografías son propiedad de su autor.
