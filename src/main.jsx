import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <ErrorBoundary>
      <App path={window.location.pathname} />
    </ErrorBoundary>
  </StrictMode>
)

// En production la page est pré-rendue : React reprend le HTML existant.
// En développement (vite), le conteneur est vide et React le remplit.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
