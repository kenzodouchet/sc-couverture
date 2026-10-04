import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Site statique : aucun serveur à relayer, Vite sert tout en développement
// et produit dist/ pour la mise en ligne.
export default defineConfig({
  plugins: [react()],
})
