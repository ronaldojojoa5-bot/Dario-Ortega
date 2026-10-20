import { useMemo, useRef, useState } from 'react';
import { photos, projects } from '../data.js';
import { CATS, thumb } from '../config.js';
import { useTilt, prefersReducedMotion } from '../hooks.jsx';

const P = Object.fromEntries(projects.map((p) => [p.k, p]));
const ALL = photos.map((p, i) => ({ ...p, i }));

function ProjectCard({ p, count, active, dim, onClick }) {
  const tilt = useTilt(7);
  return (
    <button
      type="button"
      className={`proj${active ? ' active' : ''}${dim ? ' dim' : ''}`}
      aria-pressed={active}
      onClick={onClick}
      {...tilt}
    >
      <div className="cv">
        <img src={thumb(photos[p.cover].f)} alt="" loading="lazy" />
        <span className="glass badge">{count} fotos</span>
      </div>
      <div className="tx">
        <h3>{p.n}</h3>
        <span className="label">{CATS[p.c]}</span>
      </div>
      <span className="shine" />
    </button>
  );
}

export default function Gallery({ onOpen }) {
  const [cat, setCat] = useState('todo');
  const [proj, setProj] = useState(null);
  const [round, setRound] = useState(0); // fuerza la animación de entrada al filtrar
  const railRef = useRef(null);
  const reduce = prefersReducedMotion();

  const view = useMemo(() => (
    proj ? ALL.filter((p) => p.p === proj)
      : cat === 'todo' ? ALL : ALL.filter((p) => P[p.p].c === cat)
  ), [cat, proj]);

  const pickCat = (k) => { setCat(k); setProj(null); setRound((r) => r + 1); };
  const pickProj = (k) => {
    if (proj === k) setProj(null); else { setProj(k); setCat(P[k].c); }
    setRound((r) => r + 1);
  };

  const title = proj ? P[proj].n : cat === 'todo' ? 'Todo el portafolio' : CATS[cat];
  const desc = proj ? P[proj].d
    : cat === 'todo' ? `Una muestra de ${ALL.length} fotos entre más de 2.000 trabajos realizados en Pasto y Nariño. Toca cualquier foto para verla en grande.`
      : `Proyectos de ${CATS[cat].toLowerCase()}. Toca un proyecto para ver solo ese.`;

  return (
    <section id="portafolio">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="label">Una selección entre más de 2.000 trabajos</p>
            <h2>Portafolio</h2>
          </div>
          <div className="cats glass" role="group" aria-label="Filtrar por categoría">
            {Object.entries(CATS).map(([k, v]) => {
              const n = k === 'todo' ? ALL.length : ALL.filter((p) => P[p.p].c === k).length;
              const on = cat === k && !proj;
              return (
                <button type="button" key={k} aria-pressed={on} className={on ? 'on' : ''} onClick={() => pickCat(k)}>
                  {v}<span className="n">{n}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rail-head">
          <span className="label">Proyectos</span>
          <div className="rail-btns">
            <button type="button" className="icon glass" aria-label="Proyectos anteriores" onClick={() => railRef.current.scrollBy({ left: -480, behavior: 'smooth' })}>←</button>
            <button type="button" className="icon glass" aria-label="Más proyectos" onClick={() => railRef.current.scrollBy({ left: 480, behavior: 'smooth' })}>→</button>
          </div>
        </div>
        <div className="rail" ref={railRef}>
          {projects.map((p) => (
            <ProjectCard
              key={p.k}
              p={p}
              count={ALL.filter((x) => x.p === p.k).length}
              active={proj === p.k}
              dim={(proj && proj !== p.k) || (!proj && cat !== 'todo' && p.c !== cat)}
              onClick={() => pickProj(p.k)}
            />
          ))}
        </div>

        <div className="now" aria-live="polite" key={`now-${round}`}>
          <div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
          <div className="count"><b>{view.length}</b>fotografías</div>
        </div>

        <div className="masonry" key={`grid-${round}`}>
          {view.map((p, k) => (
            <button
              type="button"
              key={p.f}
              className={`tile${reduce ? '' : ' in'}`}
              style={{ '--i': Math.min(k, 24) }}
              onClick={() => onOpen(view, p.i)}
            >
              <img src={thumb(p.f)} alt={`${P[p.p].n} en Pasto, fotografía de Dario Ortega ${k + 1}`} loading="lazy" width={p.w} height={p.h} />
              <span className="cap glass">
                <b>{P[p.p].n}</b>
                <span>Ver ↗</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
