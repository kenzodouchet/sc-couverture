/**
 * Consentement aux services tiers, conservé dans le navigateur du visiteur.
 *
 * Le site ne pose aucun cookie lui-même : seule la carte Google Maps du bloc
 * Contact charge des ressources de Google, qui peut en déposer. Elle n'est
 * donc affichée qu'après accord. Le choix est gardé 6 mois, puis redemandé
 * (recommandation CNIL).
 */
import { useEffect, useState } from 'react'

const KEY = 'sc-consent'
const MAX_AGE = 1000 * 60 * 60 * 24 * 182
const EVENT = 'sc-consent-change'
export const OPEN_EVENT = 'sc-consent-open'

/** Choix enregistré : { maps: bool, date } ou null si aucun ou expiré. */
export function readConsent() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY))
    if (value && Date.now() - value.date < MAX_AGE) return value
  } catch {
    // Stockage indisponible (navigation privée stricte) : comme sans choix.
  }
  return null
}

export function saveConsent(choices) {
  const value = { ...choices, date: Date.now() }
  try { localStorage.setItem(KEY, JSON.stringify(value)) } catch { /* sans stockage, le choix vaut pour la page */ }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }))
}

/** Rouvre la fenêtre de consentement (lien « Gérer les cookies »). */
export const openConsent = () => window.dispatchEvent(new Event(OPEN_EVENT))

/**
 * Choix courant, suivi en direct. `undefined` tant que la page n'est pas
 * montée : le HTML pré-rendu ne présume d'aucun choix.
 */
export function useConsent() {
  const [consent, setConsent] = useState(undefined)
  useEffect(() => {
    // Lecture différée d'une image : le premier rendu client doit rester
    // identique au HTML pré-rendu.
    const id = requestAnimationFrame(() => setConsent(readConsent()))
    const onChange = (event) => setConsent(event.detail)
    window.addEventListener(EVENT, onChange)
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener(EVENT, onChange)
    }
  }, [])
  return consent
}
