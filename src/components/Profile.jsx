import { SERVICES } from '../config.js';
import { useTilt } from '../hooks.jsx';

function Service({ title, text, n }) {
  const tilt = useTilt(6);
  return (
    <div className="service glass" {...tilt}>
      <span className="sn">{String(n).padStart(2, '0')}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default function Profile() {
  return (
    <section id="perfil">
      <div className="wrap perfil">
        <div className="perfil-fotos">
          <img src="t/03.jpg" alt="Quinceañera con vestido azul en escalinata frente al lago, Nariño" loading="lazy" />
          <img src="t/44.jpg" alt="Chef con molcajete de tacos, fotografía gastronómica en Pasto" loading="lazy" />
        </div>
        <div className="bio">
          <p className="label">Perfil</p>
          <h2>Fotógrafo profesional en Pasto</h2>
          <p className="lead">
            Soy Dario Ortega. Llevo <em>más de 10 años</em> haciendo fotografía profesional en Pasto y Nariño, con más de
            2.000 trabajos entre eventos sociales, marcas y restaurantes.
          </p>
          <p>
            Planeo cada sesión como una producción. Elegimos juntos la locación, el vestuario y la luz, ya sea un atardecer
            en la montaña, el centro histórico de noche o el estudio con humo de color. En el evento me ocupo de que no se
            pierda ningún momento y de que todos se vean bien en cada foto.
          </p>
          <p>
            Para restaurantes y negocios hago fotografía gastronómica y reels pensados para vender: platos que se ven
            apetitosos en la carta, en Instagram y en las apps de domicilios.
          </p>
          <div className="brands">
            <span className="label">Marcas con las que ha trabajado</span>
            <b>Comidas Big Dog</b><b>Astral 1·77</b><b>Runa Kuyay</b>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="services">
          {SERVICES.map(([t, d], k) => <Service key={t} title={t} text={d} n={k + 1} />)}
        </div>
      </div>
    </section>
  );
}
