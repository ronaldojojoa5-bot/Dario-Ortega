import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

// Genera las miniaturas (public/t) a partir de las fotos grandes (public/f)
// cuando faltan, así el repositorio solo necesita la carpeta public/f.
function thumbnails() {
  let done = false;
  return {
    name: 'generar-miniaturas',
    async buildStart() {
      if (done) return;
      done = true;
      const src = path.resolve('public/f');
      const out = path.resolve('public/t');
      if (!fs.existsSync(src)) return;
      fs.mkdirSync(out, { recursive: true });
      const { default: sharp } = await import('sharp');
      const files = fs.readdirSync(src).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
      let made = 0;
      for (const f of files) {
        const dest = path.join(out, f);
        if (fs.existsSync(dest)) continue;
        await sharp(path.join(src, f))
          .resize({ width: 640, height: 960, fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 72, progressive: true, mozjpeg: true })
          .toFile(dest);
        made += 1;
      }
      if (made) console.log(`Miniaturas generadas: ${made}`);
    },
  };
}

// base './' permite publicar en Vercel, GitHub Pages o cualquier hosting sin cambiar rutas
export default defineConfig({
  plugins: [thumbnails(), react()],
  base: './',
});
