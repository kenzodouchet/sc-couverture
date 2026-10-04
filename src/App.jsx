// Polices hébergées avec le site (sous-ensemble latin, graisses utilisées
// seulement) : pas de feuille Google Fonts qui bloque l'affichage.
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import '@fontsource/outfit/latin-500.css'
import '@fontsource/outfit/latin-600.css'
import '@fontsource/outfit/latin-700.css'
import '@fontsource/barlow-condensed/latin-600.css'
import '@fontsource/barlow-condensed/latin-700.css'
import '@fontsource/barlow-condensed/latin-800.css'
import './App.css'
import { findRoute } from './lib/routes'
import Layout from './components/Layout'
import Home from './pages/Home'
import Service from './pages/Service'
import City from './pages/City'
import Zones from './pages/Zones'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

const PAGES = { home: Home, service: Service, city: City, zones: Zones, legal: Legal, notfound: NotFound }

/**
 * Le site est multi-pages : chaque URL est un fichier HTML pré-rendu au build
 * et les liens sont de vrais liens (rechargement de page). Le composant ne
 * fait que choisir la page correspondant au chemin.
 */
export default function App({ path }) {
  const route = findRoute(path)
  const Page = PAGES[route.page]
  return (
    <Layout page={route.page}>
      <Page route={route} />
    </Layout>
  )
}
