import { useScrolled } from '../hooks.jsx';

export default function Nav() {
  const scrolled = useScrolled(30);
  return (
    <nav className={`top glass${scrolled ? ' compact' : ''}`} aria-label="Principal">
      <div className="wrap">
        <a className="brand" href="#inicio">Dario <span>Ortega</span></a>
        <ul>
          <li><a href="#perfil">Perfil</a></li>
          <li><a href="#portafolio">Portafolio</a></li>
          <li><a className="nav-cta" href="#contacto">Agendar</a></li>
        </ul>
      </div>
    </nav>
  );
}
