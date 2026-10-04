/* eslint-disable react/only-export-components -- point d'entrée du pré-rendu, pas un module de composants */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { renderHead } from './lib/seo'
import { ROUTES, NOT_FOUND } from './lib/routes'

export { ROUTES, NOT_FOUND }

/** Rendu d'une route pour le pré-rendu (scripts/prerender.mjs). */
export function render(route, site) {
  return {
    head: renderHead(route, site),
    html: renderToString(<StrictMode><App path={route.path} /></StrictMode>),
  }
}
