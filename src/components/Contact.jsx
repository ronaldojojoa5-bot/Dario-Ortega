import { useState } from 'react';
import { SESSION_TYPES, SITE, waLink } from '../config.js';

export default function Contact() {
  const [form, setForm] = useState({ nombre: '', fecha: '', tipo: SESSION_TYPES[0], mensaje: '' });
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) { setError('Escribe tu nombre para armar el mensaje.'); return; }
    setError('');
    const fecha = form.fecha ? ` para el ${form.fecha.split('-').reverse().join('/')}` : '';
    setMsg(`Hola Dario, soy ${form.nombre.trim()}. Me interesa una sesión de ${form.tipo.toLowerCase()}${fecha}.${form.mensaje.trim() ? ` ${form.mensaje.trim()}` : ''}`);
  };

  return (
    <section id="contacto">
      <div className="wrap contact">
        <div>
          <p className="label">Contacto</p>
          <h2>Agenda tu sesión</h2>
          <p className="intro">
            Cuéntame qué vas a celebrar o qué necesita tu negocio, la fecha y el lugar, y te envío una cotización.
            Atiendo en Pasto y en municipios de Nariño. Las fechas de fin de semana se reservan con anticipación.
          </p>
          <div className="channels">
            <div className="channel glass">
              <div><span className="label">WhatsApp</span><a className="val" href={waLink(SITE.whatsapp)} target="_blank" rel="noopener noreferrer">{SITE.whatsappLabel}</a></div>
              <a className="mini" href={waLink(SITE.whatsapp)} target="_blank" rel="noopener noreferrer">Escribir</a>
            </div>
            <div className="channel glass">
              <div><span className="label">Instagram</span><a className="val" href={`https://www.instagram.com/${SITE.instagram}/`} target="_blank" rel="noopener noreferrer">@{SITE.instagram}</a></div>
              <a className="mini" href={`https://ig.me/m/${SITE.instagram}`} target="_blank" rel="noopener noreferrer">Enviar DM</a>
            </div>
            <div className="channel glass">
              <div><span className="label">Ciudad</span><div className="val">{SITE.city}, Colombia</div></div>
            </div>
          </div>
        </div>

        <form className="glass form" onSubmit={submit} noValidate>
          <span className="label">Solicita tu cotización</span>
          <div className="row2">
            <label htmlFor="nombre"><span>Nombre</span><input id="nombre" autoComplete="name" value={form.nombre} onChange={set('nombre')} /></label>
            <label htmlFor="fecha"><span>Fecha del evento o sesión</span><input id="fecha" type="date" value={form.fecha} onChange={set('fecha')} /></label>
          </div>
          <label htmlFor="tipo"><span>Tipo de servicio</span>
            <select id="tipo" value={form.tipo} onChange={set('tipo')}>{SESSION_TYPES.map((t) => <option key={t}>{t}</option>)}</select>
          </label>
          <label htmlFor="mensaje"><span>Mensaje</span>
            <textarea id="mensaje" value={form.mensaje} onChange={set('mensaje')} placeholder="Lugar, número de invitados, horas de cobertura, idea de la sesión…" />
          </label>
          <button className="btn primary" type="submit">Preparar mensaje</button>
          {error && <p className="note">{error}</p>}
          {msg && (
            <div className="ready">
              <p className="note">Tu mensaje está listo. Envíalo por WhatsApp:</p>
              <blockquote>{msg}</blockquote>
              <a className="btn primary" href={waLink(SITE.whatsapp, msg)} target="_blank" rel="noopener noreferrer">Enviar por WhatsApp</a>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
