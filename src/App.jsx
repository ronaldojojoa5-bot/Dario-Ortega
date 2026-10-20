import { useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Profile from './components/Profile.jsx';
import Gallery from './components/Gallery.jsx';
import Lightbox from './components/Lightbox.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { SITE, waLink } from './config.js';

export default function App() {
  const [box, setBox] = useState(null); // { list, start }

  const open = (list, i) => setBox({ list, start: Math.max(0, list.findIndex((p) => (p.i ?? list.indexOf(p)) === i)) });

  return (
    <>
      <div className="ambient" aria-hidden="true"><span /><span /><span /></div>
      <Nav />
      <main>
        <Hero onOpen={(list, i) => setBox({ list: list.map((p, k) => ({ ...p, i: k })), start: i })} paused={!!box} />
        <Profile />
        <Gallery onOpen={open} />
        <Contact />
      </main>
      <Footer />
      <a className="wa-float glass" href={waLink(SITE.whatsapp)} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z"/></svg>
        <span>Cotizar</span>
      </a>
      {box && <Lightbox list={box.list} start={box.start} onClose={() => setBox(null)} />}
    </>
  );
}
