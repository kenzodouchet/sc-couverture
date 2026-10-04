/**
 * Identité et coordonnées de SC-Couverture, en un seul endroit.
 *
 * Tout le site en dépend : en-tête, pied de page, bloc Contact, données
 * structurées JSON-LD de chaque page (générées au build par
 * scripts/prerender.mjs), sitemap.xml et robots.txt. Modifier ici suffit.
 *
 * Les valeurs marquées « À COMPLÉTER » sont des emplacements : les remplacer
 * par les vraies informations avant d'annoncer le site (voir SEO.md).
 */
export const COMPANY = {
  name: 'SC-Couverture',
  // À COMPLÉTER : nom du dirigeant, forme juridique et SIREN (mentions légales).
  owner: '',
  legalForm: '',
  siren: '',
  city: 'Bordeaux',
  department: 'Gironde',
}

export const CONTACT = {
  // À COMPLÉTER. Format international sans espaces pour les liens tel:.
  phone: '+33600000000',
  phoneDisplay: '06 00 00 00 00',
  email: 'contact@sc-couverture.fr',
  street: '',
  postalCode: '33000',
  locality: 'Bordeaux',
  hours: 'Lun-Ven : 8h00 - 18h30 · Sam : 9h00 - 12h00',
  // Carte et itinéraire : l'adresse telle que Google Maps la comprend.
  mapsQuery: 'Bordeaux, Gironde',
  geo: { latitude: 44.8378, longitude: -0.5792 },
}

CONTACT.address = [CONTACT.street, `${CONTACT.postalCode} ${CONTACT.locality}`].filter(Boolean).join(', ')

export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(CONTACT.mapsQuery)}&hl=fr&z=9&output=embed`
export const MAPS_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.mapsQuery)}`

/**
 * Adresse publique du site, sans barre finale. Le build la lit dans la
 * variable d'environnement SITE_URL (voir render.yaml) : on la change le jour
 * où le nom de domaine est branché, sans toucher au code.
 */
export const DEFAULT_SITE_URL = 'https://sc-couverture.onrender.com'
