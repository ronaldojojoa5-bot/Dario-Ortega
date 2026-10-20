// Datos de contacto y textos generales del sitio
export const SITE = {
  name: 'Dario Ortega',
  brand: 'Dario Ortega Fotografía',
  city: 'Pasto, Nariño',
  instagram: 'dario_ortega',
  whatsapp: '573178384851',
  whatsappLabel: '+57 317 838 4851',
  years: '+10',
  works: '+2.000',
  designer: {
    name: 'howlds3',
    whatsapp: '573122774143',
    whatsappLabel: '312 277 4143',
  },
};

export const CATS = {
  todo: 'Todo',
  personas: 'Personas',
  moda: 'Moda',
  gastronomia: 'Gastronomía',
  cultura: 'Cultura',
};

// Fotos que pasan en el banner principal (índices de photos)
export const HERO_SLIDES = [1, 7, 57, 25, 2, 43, 72, 15, 62, 46, 28, 0, 18, 67];

export const SERVICES = [
  ['Quinceañeras', 'Sesión previa en locación y cobertura completa de la fiesta.'],
  ['Bodas', 'Preparativos, ceremonia, sesión de pareja y recepción.'],
  ['Cumpleaños y eventos', 'Cumpleaños, bautizos, grados y celebraciones familiares.'],
  ['Fotografía gastronómica', 'Platos y bebidas para carta, redes y apps de domicilios.'],
  ['Reels y video', 'Contenido vertical para Instagram y TikTok de tu marca o evento.'],
  ['Moda y retrato', 'Lookbooks, books de modelo, retrato personal y beauty.'],
  ['Reinados y carnaval', 'Candidatas, desfiles, comparsas y danza.'],
  ['Deporte y colegios', 'Equipos, deportistas, promociones y anuarios.'],
];

export const SESSION_TYPES = [
  'Quinceañera', 'Boda', 'Cumpleaños o evento familiar', 'Fotografía gastronómica',
  'Reels o video para redes', 'Moda, retrato o book', 'Reinado o carnaval', 'Deporte o colegio', 'Otra',
];

export const full = (f) => `f/${f}`;
export const thumb = (f) => `t/${f}`;
export const waLink = (num, text) => `https://wa.me/${num}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
