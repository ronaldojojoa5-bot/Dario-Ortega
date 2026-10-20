import { useCallback, useEffect, useRef, useState } from 'react';
import { projects } from '../data.js';
import { CATS, full, thumb } from '../config.js';
import { prefersReducedMotion } from '../hooks.jsx';

const P = Object.fromEntries(projects.map((p) => [p.k, p]));
const DUR = 4000;

export default function Lightbox({ list, start, onClose }) {
  const [pos, setPos] = useState(start);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const barRef = useRef(null);
  const thumbsRef = useRef(null);
  const closeRef = useRef(null);
  const touch = useRef(null);
  const reduce = prefersReducedMotion();

  const go = useCallback((d) => { setLoaded(false); setPos((p) => (p + d + list.length) % list.length); }, [list.length]);
  const jump = (k) => { setLoaded(false); setPos(k); };

  // Bloquea el scroll de fondo y devuelve el foco al cerrar
  useEffect(() => {
    const prev = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.body.style.overflow = ''; prev?.focus?.(); };
  }, []);

  // Teclado
  useEffect(() => {
    const on = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', on);
    return () => document.removeEventListener('keydown', on);
  }, [go, onClose]);

  // Presentación automática con barra de progreso
  useEffect(() => {
    if (!playing) { if (barRef.current) barRef.current.style.width = '0'; return undefined; }
    let raf; const t0 = performance.now();
    const step = (now) => {
      const r = Math.min(1, (now - t0) / DUR);
      if (barRef.current) barRef.current.style.width = `${r * 100}%`;
      if (r >= 1) go(1); else raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing, pos, go]);

  // Centra la miniatura activa y precarga las vecinas
  useEffect(() => {
    const rail = thumbsRef.current; const el = rail?.children[pos];
    if (rail && el) rail.scrollTo({ left: el.offsetLeft - rail.clientWidth / 2 + el.clientWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
    [1, -1].forEach((d) => { const n = list[(pos + d + list.length) % list.length]; new Image().src = full(n.f); });
  }, [pos, list, reduce]);

  const cur = list[pos];
  const proj = P[cur.p];

  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label="Visor de fotos"
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touch.current == null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <div className="lb-amb" key={cur.f} style={{ backgroundImage: `url(${thumb(cur.f)})` }} />
      <div className="lb-top glass">
        <div>
          <div className="t">{proj.n}</div>
          <div className="s">{pos + 1} / {list.length} · {CATS[proj.c]}</div>
        </div>
        <div className="lb-ctrls">
          <button type="button" className={`icon glass${playing ? ' active' : ''}`} aria-pressed={playing} aria-label={playing ? 'Pausar presentación' : 'Reproducir presentación'} onClick={() => setPlaying((v) => !v)}>
            {playing ? '❚❚' : '▶'}
          </button>
          <button type="button" className="icon glass" ref={closeRef} aria-label="Cerrar visor" onClick={onClose}>✕</button>
        </div>
      </div>

      <div className="lb-stage" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <button type="button" className="icon glass nav prev" aria-label="Foto anterior" onClick={() => go(-1)}>←</button>
        <img
          key={cur.f}
          className={`lb-img${loaded ? ' ready' : ''}`}
          src={full(cur.f)}
          alt={`${proj.n}, fotografía de Dario Ortega`}
          onLoad={() => setLoaded(true)}
        />
        {!loaded && <span className="spinner" aria-hidden="true" />}
        <button type="button" className="icon glass nav next" aria-label="Foto siguiente" onClick={() => go(1)}>→</button>
      </div>

      <div className="lb-bottom glass">
        <div className="lb-bar"><i ref={barRef} /></div>
        <div className="lb-thumbs" ref={thumbsRef}>
          {list.map((p, k) => (
            <button type="button" key={p.f} className={k === pos ? 'on' : ''} aria-label={`Ver foto ${k + 1}`} onClick={() => jump(k)}>
              <img src={thumb(p.f)} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
