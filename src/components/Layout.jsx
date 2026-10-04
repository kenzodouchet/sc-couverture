import { useEffect, useRef, useState } from 'react'
import { COMPANY, CONTACT } from '../lib/company'
import { SERVICES } from '../lib/services'
import { CITIES, cityPath } from '../lib/cities'
import logo from '../assets/brand/logo.svg'
import { Icon } from './Icons'

/** Nom de marque : « SC » en cuivre. */
export const Brand = () => <span className="brand-name"><b>SC</b>-Couverture</span>

// Liens du menu. `section` : ancre de la page d'accueil, suivie au défilement.
// `pages` : types de page sur lesquels le lien est marqué actif.
const NAV_LINKS = [
  { section: 'services', label: 'Nos services', pages: ['service'] },
  { section: 'realisations', label: 'En images' },
  { href: '/zones-intervention/', section: 'zones', label: 'Zones d’intervention', pages: ['zones', 'city'] },
  { section: 'methode', label: 'Notre méthode' },
  { section: 'faq', label: 'FAQ' },
]

const linkHref = (link, isHome) => link.href ?? (isHome ? `#${link.section}` : `/#${link.section}`)

// Communes mises en avant dans le pied de page (maillage interne).
const FOOTER_CITIES = CITIES.slice(0, 12)
const YEAR = new Date().getFullYear()

function Header({ page }) {
  const isHome = page === 'home'
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [indicator, setIndicator] = useState(null)
  const navRef = useRef(null)

  // Accueil : la section active est la dernière dont le haut est passé sous
  // la ligne de bascule. Ailleurs : le lien correspondant au type de page.
  const pageSection = NAV_LINKS.find((link) => link.pages?.includes(page))?.section ?? null
  const active = isHome ? activeSection : pageSection

  useEffect(() => {
    if (!isHome) return
    const ids = NAV_LINKS.map((link) => link.section)
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.scrollY + window.innerHeight * 0.35
      let active = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= line) active = id
      }
      setActiveSection(active)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [isHome, page])

  // Indicateur glissant sous le lien actif.
  useEffect(() => {
    const nav = navRef.current
    const link = nav && active ? nav.querySelector(`a[data-section="${active}"]`) : null
    if (!link) return undefined
    const measure = () => setIndicator({ left: link.offsetLeft, top: link.offsetTop, width: link.offsetWidth, height: link.offsetHeight })
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  // L'en-tête se cache en descendant et réapparaît en remontant.
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const update = () => {
      const y = window.scrollY
      ticking = false
      if (y < 10) { setHidden(false); setScrolled(false); lastY = y; return }
      setScrolled(true)
      if (Math.abs(y - lastY) > 8) { setHidden(y > lastY); lastY = y }
    }
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true } }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`header-wrap${scrolled ? ' scrolled' : ''}${hidden && !menuOpen ? ' hidden' : ''}`}>
      <header>
        <button type="button" className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen}>
          <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
        </button>
        <a href="/" className="logo" aria-label={`${COMPANY.name}, retour à l’accueil`}>
          <img src={logo} alt="" width="48" height="48" />
          <Brand />
        </a>
        <nav className={menuOpen ? 'opened' : ''} aria-label="Navigation principale" ref={navRef}>
          {indicator && active && <span className="nav-indicator" aria-hidden="true" style={indicator} />}
          {NAV_LINKS.map((link) => (
            <a
              key={link.section}
              href={linkHref(link, isHome)}
              data-section={link.section}
              className={active === link.section ? 'is-active' : ''}
              aria-current={active === link.section ? 'true' : undefined}
              onClick={() => setMenuOpen(false)}
            >{link.label}</a>
          ))}
        </nav>
        <a className="top-contact" href={`tel:${CONTACT.phone}`}><span className="top-contact-inner"><span className="ring"><Icon.Phone /></span>{CONTACT.phoneDisplay}</span></a>
        <a className="header-phone" href={`tel:${CONTACT.phone}`} aria-label={`Appeler le ${CONTACT.phoneDisplay}`}><span className="ring"><Icon.Phone /></span></a>
      </header>
    </div>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="/" className="logo footer-logo" aria-label={`${COMPANY.name}, retour à l’accueil`}>
            <img src={logo} alt="" width="60" height="60" />
            <Brand />
          </a>
          <p>{COMPANY.name}, couvreur-zingueur basé à {COMPANY.city} : rénovation et réparation de toiture, gouttières et chéneaux en zinc, recherche de fuite, démoussage, charpente et fenêtres de toit dans toute la Gironde.</p>
          <div className="footer-contact">
            <div><Icon.Phone /><a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a></div>
            <div><Icon.Envelope /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
            <div><Icon.Clock /><span>{CONTACT.hours}</span></div>
          </div>
        </div>
        <div className="footer-col">
          <h2 className="footer-title">Nos prestations</h2>
          <ul>
            {SERVICES.map((service) => <li key={service.slug}><a href={`/${service.slug}/`}>{service.name}</a></li>)}
          </ul>
        </div>
        <div className="footer-col">
          <h2 className="footer-title">Couvreur en Gironde</h2>
          <ul className="footer-cities">
            {FOOTER_CITIES.map((city) => <li key={city.slug}><a href={cityPath(city)}>Couvreur {city.name}</a></li>)}
            <li><a href="/zones-intervention/"><b>Toutes les communes →</b></a></li>
          </ul>
        </div>
        <div className="footer-bottom">
          <span>© {YEAR} {COMPANY.name}{COMPANY.siren ? ` – SIREN ${COMPANY.siren}` : ''} – Couvreur-zingueur en Gironde</span>
          <a href="/mentions-legales/">Mentions légales</a>
        </div>
      </div>
    </footer>
  )
}

export default function Layout({ page, children }) {
  return (
    <div className="site">
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <Header page={page} />
      <main id="contenu">{children}</main>
      <Footer />
    </div>
  )
}
