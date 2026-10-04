import { Component } from 'react'
import { CONTACT } from './lib/company'

/**
 * Filet de sécurité : sans lui, la moindre erreur JavaScript laisse une page
 * entièrement blanche, sans rien indiquer au visiteur.
 */
export default class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error, info) {
    console.error('[erreur]', error, info?.componentStack)
  }

  render() {
    if (!this.state.failed) return this.props.children

    return (
      <div className="crash">
        <div className="crash-card">
          <p className="crash-brand">SC-Couverture</p>
          <h1>Une erreur est survenue</h1>
          <p>
            La page n’a pas pu s’afficher correctement. Rechargez-la ; si le problème persiste,
            contactez-nous directement.
          </p>
          <div className="crash-actions">
            <button type="button" onClick={() => window.location.reload()}>Recharger la page</button>
            <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>
          </div>
        </div>
      </div>
    )
  }
}
