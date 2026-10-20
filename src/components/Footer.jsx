import { SITE, waLink } from '../config.js';

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <div>
          <a className="brand" href="#inicio">Dario <span>Ortega</span></a>
          <p>Fotógrafo profesional en Pasto, Nariño, Colombia. Quinceañeras, bodas, cumpleaños, gastronomía, reels y eventos.</p>
        </div>
        <nav aria-label="Pie de página" className="foot-links">
          <a href="#perfil">Perfil</a>
          <a href="#portafolio">Portafolio</a>
          <a href="#contacto">Contacto</a>
          <a href={`https://www.instagram.com/${SITE.instagram}/`} target="_blank" rel="noopener noreferrer">Instagram</a>
        </nav>
      </div>
      <div className="wrap legal">
        <span>© 2026 {SITE.brand}. Todos los derechos reservados.</span>
        <span className="credit glass">
          Diseño y desarrollo web por <b>{SITE.designer.name}</b> ·{' '}
          <a href={waLink(SITE.designer.whatsapp)} target="_blank" rel="noopener noreferrer">{SITE.designer.whatsappLabel}</a>
        </span>
      </div>
    </footer>
  );
}
