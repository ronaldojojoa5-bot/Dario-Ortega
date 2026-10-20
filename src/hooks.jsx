import { useEffect, useRef, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Ejecuta un callback cada `delay` ms; null lo pausa
export function useInterval(cb, delay) {
  const saved = useRef(cb);
  useEffect(() => { saved.current = cb; }, [cb]);
  useEffect(() => {
    if (delay == null) return undefined;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

// Contador animado: cuenta desde 0 hasta el número dentro del texto (ej. "+2.000")
export function CountUp({ value, duration = 1400 }) {
  const target = parseInt(String(value).replace(/\D/g, ''), 10) || 0;
  const prefix = String(value).startsWith('+') ? '+' : '';
  const [n, setN] = useState(prefersReducedMotion() ? target : 0);
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let raf; const t0 = performance.now();
    const step = (now) => {
      const r = Math.min(1, (now - t0) / duration);
      setN(Math.round(target * (1 - Math.pow(1 - r, 3))));
      if (r < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return <>{prefix}{n.toLocaleString('es-CO')}</>;
}

// Inclinación 3D que sigue al cursor
export function useTilt(max = 8) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateY(-4px)`;
    el.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
    el.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ''; };
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

// Devuelve true cuando la página bajó más de `y` px
export function useScrolled(y = 40) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const on = () => setS(window.scrollY > y);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [y]);
  return s;
}
