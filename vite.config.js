import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Site statique pré-rendu : `vite build` produit le client, `vite build --ssr`
// le rendu serveur utilisé par scripts/prerender.mjs.
export default defineConfig({
  plugins: [react()],
  build: {
    // Les illustrations restent des fichiers séparés (mis en cache, et jamais
    // injectées en data: URI dans un url() CSS où leurs parenthèses casseraient).
    assetsInlineLimit: 0,
  },
})
