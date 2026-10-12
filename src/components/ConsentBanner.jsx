import { useEffect, useState } from 'react'
import { COMPANY } from '../lib/company'
import { OPEN_EVENT, readConsent, saveConsent, useConsent } from '../lib/consent'
import logo from '../assets/brand/logo.svg'

/**
 * Fenêtre « Gérer le consentement ». Refuser est aussi simple qu'accepter et
 * la croix vaut refus (lignes directrices CNIL). Affichée tant qu'aucun choix
 * valide n'est enregistré, et rouvrable depuis le pied de page.
 */
export default function ConsentBanner() {
  const consent = useConsent()
  const [reopened, setReopened] = useState(false)
  const [details, setDetails] = useState(false)
  const [maps, setMaps] = useState(false)

  // Les préférences s'ouvrent sur le choix déjà enregistré.
  const showDetails = () => {
    setMaps(Boolean(readConsent()?.maps))
    setDetails(true)
  }

  useEffect(() => {
    const open = () => { setReopened(true); showDetails() }
    window.addEventListener(OPEN_EVENT, open)
    return () => window.removeEventListener(OPEN_EVENT, open)
  }, [])

  const visible = consent === null || reopened
  if (consent === undefined || !visible) return null

  const decide = (choices) => {
    saveConsent(choices)
    setReopened(false)
    setDetails(false)
  }

  return (
    <div className="consent-backdrop">
      <div className="consent" role="dialog" aria-modal="false" aria-labelledby="consent-title">
        <div className="consent-head">
          <span className="consent-brand"><img src={logo} alt="" width="40" height="40" />{COMPANY.name}</span>
          <h2 id="consent-title">Gérer le consentement</h2>
          <button type="button" className="consent-close" onClick={() => decide({ maps: false })} aria-label="Fermer et refuser">✕</button>
        </div>
        <p>
          Ce site ne dépose aucun cookie publicitaire ni de mesure d’audience. Seule la carte Google Maps du bloc Contact,
          fournie par Google, peut déposer des cookies et collecter des données de navigation : elle n’est chargée qu’avec
          votre accord. Refuser n’empêche pas d’utiliser le site.
        </p>
        {details && (
          <div className="consent-details">
            <label className="consent-row">
              <span><strong>Fonctionnement du site</strong><small>Mémorisation de votre choix. Toujours actif.</small></span>
              <input type="checkbox" checked disabled />
            </label>
            <label className="consent-row">
              <span><strong>Carte Google Maps</strong><small>Affiche notre zone d’intervention. Service de Google LLC.</small></span>
              <input type="checkbox" checked={maps} onChange={(event) => setMaps(event.target.checked)} />
            </label>
          </div>
        )}
        <div className="consent-actions">
          <button type="button" className="consent-btn accept" onClick={() => decide({ maps: true })}>Accepter</button>
          <button type="button" className="consent-btn" onClick={() => decide({ maps: false })}>Refuser</button>
          {details
            ? <button type="button" className="consent-btn" onClick={() => decide({ maps })}>Enregistrer mes choix</button>
            : <button type="button" className="consent-btn" onClick={showDetails}>Voir les préférences</button>}
        </div>
        <div className="consent-links">
          <a href="/mentions-legales/#cookies">Gestion des cookies</a>
          <a href="/mentions-legales/#confidentialite">Politique de confidentialité</a>
          <a href="/mentions-legales/">Mentions légales</a>
        </div>
      </div>
    </div>
  )
}
