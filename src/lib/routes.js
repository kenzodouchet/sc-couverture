/**
 * Plan du site : chaque entrée devient un fichier HTML pré-rendu au build
 * (dist/<chemin>/index.html), avec son titre, sa description et son fil
 * d'Ariane. Le sitemap.xml est généré à partir de cette même liste.
 */
import { COMPANY } from './company'
import { SERVICES } from './services'
import { CITIES, cityPath, atCity } from './cities'

const HOME_CRUMB = { name: 'Accueil', path: '/' }
const ZONES_CRUMB = { name: 'Zones d’intervention', path: '/zones-intervention/' }

/** Coupe une description trop longue au dernier mot entier avant `max`. */
function clip(text, max = 160) {
  if (text.length <= max) return text
  return `${text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[,;:]$/, '')}…`
}

function cityTitle(city) {
  const long = `Couvreur ${city.name} (${city.postalCode}) | Toiture & zinguerie`
  return long.length <= 60 ? long : `Couvreur ${city.name} (${city.postalCode}) | ${COMPANY.name}`
}

export const ROUTES = [
  {
    path: '/',
    page: 'home',
    title: `Couvreur Zingueur Bordeaux & Gironde | ${COMPANY.name}`,
    description: 'Couvreur-zingueur à Bordeaux et dans toute la Gironde : rénovation de toiture, gouttières zinc, recherche de fuite, démoussage, charpente. Devis gratuit sous 48 h.',
    priority: '1.0',
  },
  ...SERVICES.map((service) => ({
    path: `/${service.slug}/`,
    page: 'service',
    slug: service.slug,
    title: service.metaTitle,
    description: service.metaDescription,
    breadcrumb: [HOME_CRUMB, { name: service.name, path: `/${service.slug}/` }],
    priority: '0.9',
  })),
  {
    path: '/zones-intervention/',
    page: 'zones',
    title: `Couvreur en Gironde : communes desservies | ${COMPANY.name}`,
    description: `Couvreur-zingueur dans toute la Gironde : Bordeaux Métropole, Bassin d’Arcachon, Médoc, Libournais, Sud-Gironde et Haute-Gironde. ${CITIES.length} communes, devis gratuit.`,
    breadcrumb: [HOME_CRUMB, ZONES_CRUMB],
    priority: '0.8',
  },
  ...CITIES.map((city) => ({
    path: cityPath(city),
    page: 'city',
    slug: city.slug,
    title: cityTitle(city),
    description: clip(`Couvreur-zingueur ${atCity(city.name)} (${city.postalCode}) : rénovation de toiture, gouttières zinc, recherche de fuite, démoussage, charpente. Devis gratuit sous 48 h.`),
    breadcrumb: [HOME_CRUMB, ZONES_CRUMB, { name: `Couvreur ${city.name}`, path: cityPath(city) }],
    priority: '0.7',
  })),
  {
    path: '/mentions-legales/',
    page: 'legal',
    title: `Mentions légales | ${COMPANY.name}`,
    description: `Mentions légales du site ${COMPANY.name} : éditeur, hébergeur, données personnelles.`,
    breadcrumb: [HOME_CRUMB, { name: 'Mentions légales', path: '/mentions-legales/' }],
    noindex: true,
  },
]

export const NOT_FOUND = {
  path: '/404.html',
  page: 'notfound',
  title: `Page introuvable | ${COMPANY.name}`,
  description: 'Cette page n’existe pas ou a été déplacée.',
  noindex: true,
}

/** Retrouve la route d'un chemin, avec ou sans barre finale. */
export function findRoute(pathname) {
  const path = pathname.endsWith('/') || pathname.endsWith('.html') ? pathname : `${pathname}/`
  return ROUTES.find((route) => route.path === path) ?? NOT_FOUND
}
