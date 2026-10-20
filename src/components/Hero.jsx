import { useEffect, useRef, useState } from 'react';
import { photos, projects } from '../data.js';
import { HERO_SLIDES, SITE, full, thumb } from '../config.js';
import { CountUp, useInterval, prefersReducedMotion } from '../hooks.jsx';

const DURATION = 5000;
const P = Object.fromEntries(projects.map((p) => [p.k, p]));

export default function Hero({ onOpen, paused }) {
  const slides = HERO_SLIDES.map((i) => ({ ...photos[i], i }));
  const [idx, setIdx] = useState(0);
  const [cycle, setCycle] = useState(0); // reinicia la barra de progreso
  const reduce = prefersReducedMotion();
  const railRef = useRef(null);

  const go = (k) => { setIdx((k + slides.length) % slides.length); setCycle((c) => c + 1); };
  useInterval(() => go(idx + 1), paused ? null : DURATION);

  // Mantiene visible la miniatura activa dentro de la tira (sin mover la página)
  useEffect(() => {
    const rail = railRef.current; const el = rail?.children[idx];
    if (!rail || !el) return;
    rail.scrollTo({ left: el.offsetLeft - rail.clientWidth / 2 + el.clientWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
  }, [idx, reduce]);

  const cur = slides[idx];
  const proj = P[cur.p];

  return (
    <header className="hero" id="inicio">
      <div className="stage" aria-roledescription="carrusel" aria-label="Trabajos destacados">
        {slides.map((s, k) => (
          <div key={s.f} className={`slide${k === idx ? ' on' : ''}`} aria-hidden={k !== idx}>
            <div className="slide-bg" style={{ backgroundImage: `url(${thumb(s.f)})` }} />
            <img
              className="slide-img"
              src={full(s.f)}
              alt={`${P[s.p].n}, fotografía de Dario Ortega en Pasto`}
              loading={k < 2 ? 'eager' : 'lazy'}
              onClick={() => onOpen(photos, s.i)}
            />
          </div>
        ))}
        <div className="stage-shade" />

        <div className="hero-panel glass">
          <p className="label">Fotógrafo profesional en {SITE.city}</p>
          <h1>Dario <span className="o">Ortega</span></h1>
          <p className="tag">
            Más de 10 años fotografiando los momentos importantes de Pasto y Nariño: quinceañeras, bodas,
            cumpleaños, gastronomía y carnaval. <b>Fotografía y reels con dirección, luz cuidada y edición profesional.</b>
          </p>
          <div className="cta-row">
            <a className="btn primary" href="#contacto">Agendar sesión</a>
            <a className="btn ghost" href="#portafolio">Ver portafolio</a>
          </div>
          <div className="hero-stats">
            <div><b><CountUp value={SITE.years} /></b><span className="label">Años</span></div>
            <div><b><CountUp value={SITE.works} /></b><span className="label">Trabajos</span></div>
            <div><b><CountUp value="8" /></b><span className="label">Servicios</span></div>
          </div>
        </div>

        <div className="slide-chip glass" key={`chip-${idx}`}>
          <span className="dot" />
          <span className="chip-name">{proj.n}</span>
          <span className="chip-n">{String(idx + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
        </div>

        <div className="stage-arrows">
          <button type="button" className="icon glass" onClick={() => go(idx - 1)} aria-label="Foto anterior">←</button>
          <button type="button" className="icon glass" onClick={() => go(idx + 1)} aria-label="Foto siguiente">→</button>
        </div>

        <div className="stage-progress"><i key={cycle} style={{ animationDuration: `${DURATION}ms`, animationPlayState: paused ? 'paused' : 'running' }} /></div>
      </div>

      <div className="hero-thumbs wrap">
        <div className="thumbs-rail" ref={railRef}>
          {slides.map((s, k) => (
            <button
              type="button"
              key={s.f}
              className={`hthumb${k === idx ? ' on' : ''}`}
              onClick={() => go(k)}
              aria-label={`Ver ${P[s.p].n}`}
              aria-current={k === idx}
            >
              <img src={thumb(s.f)} alt="" loading="lazy" />
              <span>{P[s.p].n}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
