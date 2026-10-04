/**
 * Balises <head> de chaque page, générées au build (scripts/prerender.mjs) :
 * title, description, canonical, Open Graph, et données structurées
 * Schema.org (JSON-LD) lues par Google sans exécuter le JavaScript.
 *
 * Pas d'avis ni de note inventés dans le JSON-LD : un `aggregateRating` ne
 * doit refléter que de vrais avis clients (risque de pénalité Google et de
 * sanction DGCCRF). Voir SEO.md pour l'ajouter le jour venu.
 */
import { COMPANY, CONTACT } from './company'
import { SERVICES, serviceBySlug } from './services'
import { AREAS, CITIES, cityBySlug, atCity } from './cities'
import { HOME_FAQS } from './content'

const escape = (text) => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Retire les champs vides pour ne pas publier de valeurs creuses. */
const compact = (object) => Object.fromEntries(Object.entries(object).filter(([, value]) => value !== '' && value != null))

function business(site) {
  return compact({
    '@type': ['RoofingContractor', 'LocalBusiness'],
    '@id': `${site}/#entreprise`,
    name: COMPANY.name,
    legalName: COMPANY.owner ? `${COMPANY.name} – ${COMPANY.owner}` : '',
    description: 'Entreprise de couverture et de zinguerie en Gironde : rénovation et réparation de toiture, gouttières et chéneaux en zinc, recherche de fuite, démoussage, charpente et fenêtres de toit.',
    url: `${site}/`,
    logo: `${site}/icon-512.png`,
    image: `${site}/apercu.jpg`,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    identifier: COMPANY.siren ? { '@type': 'PropertyValue', propertyID: 'SIREN', value: COMPANY.siren.replace(/\s/g, '') } : '',
    address: compact({
      '@type': 'PostalAddress',
      streetAddress: CONTACT.street,
      postalCode: CONTACT.postalCode,
      addressLocality: CONTACT.locality,
      addressRegion: 'Nouvelle-Aquitaine',
      addressCountry: 'FR',
    }),
    geo: { '@type': 'GeoCoordinates', ...CONTACT.geo },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Gironde' },
      ...CITIES.map((city) => ({ '@type': 'City', name: city.name })),
    ],
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Chèque, Virement, Espèces',
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '12:00' },
    ],
    knowsAbout: ['Couverture', 'Zinguerie', 'Réfection de toiture', 'Gouttières zinc', 'Recherche de fuite', 'Démoussage de toiture', 'Charpente', 'Fenêtre de toit', 'Tuile canal', 'Ardoise'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Prestations de couverture et zinguerie',
      itemListElement: SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.name, url: `${site}/${service.slug}/` },
      })),
    },
  })
}

const faqPage = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(([question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
})

function graph(route, site) {
  const url = `${site}${route.path}`
  const nodes = [
    {
      '@type': 'WebSite',
      '@id': `${site}/#site`,
      url: `${site}/`,
      name: COMPANY.name,
      inLanguage: 'fr-FR',
      publisher: { '@id': `${site}/#entreprise` },
    },
    business(site),
    {
      '@type': 'WebPage',
      '@id': `${url}#page`,
      url,
      name: route.title,
      description: route.description,
      inLanguage: 'fr-FR',
      isPartOf: { '@id': `${site}/#site` },
      about: { '@id': `${site}/#entreprise` },
      primaryImageOfPage: `${site}/apercu.jpg`,
    },
  ]

  if (route.breadcrumb) {
    nodes.push({
      '@type': 'BreadcrumbList',
      itemListElement: route.breadcrumb.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${site}${crumb.path}`,
      })),
    })
  }

  if (route.page === 'home') nodes.push(faqPage(HOME_FAQS))

  if (route.page === 'service') {
    const service = serviceBySlug[route.slug]
    nodes.push({
      '@type': 'Service',
      name: service.name,
      serviceType: service.short,
      description: service.metaDescription,
      url,
      provider: { '@id': `${site}/#entreprise` },
      areaServed: { '@type': 'AdministrativeArea', name: 'Gironde' },
    })
    nodes.push(faqPage(service.faqs))
  }

  if (route.page === 'city') {
    const city = cityBySlug[route.slug]
    nodes.push({
      '@type': 'Service',
      name: `Couvreur-zingueur ${atCity(city.name)}`,
      serviceType: 'Couverture et zinguerie',
      url,
      provider: { '@id': `${site}/#entreprise` },
      areaServed: {
        '@type': 'City',
        name: city.name,
        address: { '@type': 'PostalAddress', postalCode: city.postalCode, addressLocality: city.name, addressRegion: AREAS[city.area].name, addressCountry: 'FR' },
      },
    })
  }

  return { '@context': 'https://schema.org', '@graph': nodes }
}

/** Code HTML à insérer dans <head> pour une route donnée. */
export function renderHead(route, site) {
  const url = `${site}${route.path === '/404.html' ? '/' : route.path}`
  const image = `${site}/apercu.jpg`
  const json = JSON.stringify(graph(route, site)).replace(/</g, '\\u003c')
  return [
    `<title>${escape(route.title)}</title>`,
    `<meta name="description" content="${escape(route.description)}" />`,
    route.noindex
      ? '<meta name="robots" content="noindex, follow" />'
      : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />\n    <link rel="canonical" href="${url}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escape(route.title)}" />`,
    `<meta property="og:description" content="${escape(route.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${escape(`${COMPANY.name}, couvreur-zingueur en Gironde`)}" />`,
    `<meta property="og:site_name" content="${COMPANY.name}" />`,
    '<meta property="og:locale" content="fr_FR" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<script type="application/ld+json">${json}</script>`,
  ].join('\n    ')
}
