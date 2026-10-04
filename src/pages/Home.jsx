import { useEffect, useRef, useState } from 'react'
import { COMPANY, CONTACT } from '../lib/company'
import { PHOTOS } from '../lib/photos'
import { AREAS, CITIES, cityPath } from '../lib/cities'
import { WHY_ITEMS, METHOD_STEPS, HOME_FAQS } from '../lib/content'
import { Icon } from '../components/Icons'
import Backdrop from '../components/Backdrop'
import Services from '../components/Services'
import Showcase from '../components/Showcase'
import Faq from '../components/Faq'
import Contact from '../components/Contact'

function Counter({ to, suffix }) {
  const [value, setValue] = useState(to)
  const ref = useRef(null)
  const started = useRef(false)

  // Le HTML pré-rendu affiche la valeur finale (lisible sans JavaScript et
  // par Google) ; l'animation repart de zéro quand le compteur devient visible.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1800
        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min(Math.max((now - start) / duration, 0), 1)
          setValue(Math.floor(progress * to))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [to])

  return <span ref={ref} className="counter-number">{value}{suffix}</span>
}

// Communes affichées par secteur sur l'accueil ; la liste complète est sur /zones-intervention/.
const ZONE_PREVIEW = 4

const citiesByArea = Object.keys(AREAS).map((key) => ({ key, ...AREAS[key], cities: CITIES.filter((city) => city.area === key) }))

export default function Home() {
  return (
    <>
      <section id="accueil" className="hero-wrap" aria-labelledby="hero-title">
        <div className="hero">
          <div className="hero-bg" style={{ backgroundImage: `url(${PHOTOS.hero})` }}></div>
          <div className="hero-content">
            <p className="hero-kicker">Couvreur-zingueur · Bordeaux & Gironde</p>
            <h1 id="hero-title">Couvreur zingueur à Bordeaux et dans toute la Gironde</h1>
            <p>Rénovation et réparation de toiture, gouttières et chéneaux en zinc, recherche de fuite, démoussage, charpente et fenêtres de toit. {COMPANY.name} intervient chez les particuliers, les syndics et les professionnels, de Bordeaux au Bassin d’Arcachon, du Médoc au Libournais.</p>
            <div className="cta-row">
              <a className="btn btn-accent" href={`tel:${CONTACT.phone}`}><Icon.Phone className="btn-icon" />Devis gratuit : {CONTACT.phoneDisplay}</a>
              <a className="btn btn-glass" href="#services">Nos prestations</a>
            </div>
          </div>
        </div>
        <div className="hero-stats">
          <div><Counter to={48} suffix=" h" /><span>pour recevoir votre devis</span></div>
          <div><Counter to={CITIES.length} suffix="+" /><span>communes desservies en Gironde</span></div>
          <div><Counter to={10} suffix=" ans" /><span>de garantie décennale sur nos travaux</span></div>
        </div>
      </section>

      <section className="mission has-backdrop" id="mission" aria-labelledby="mission-title">
        <Backdrop variant="mission" />
        <div className="mission-text">
          <p className="small-title">Couvreur & zingueur</p>
          <h2 id="mission-title">Votre toiture entre de bonnes mains, du faîtage à la gouttière.</h2>
          <p className="body-copy">Une toiture, c’est un ensemble : la charpente qui la porte, la couverture qui la ferme, la zinguerie qui évacue l’eau. Quand l’un des trois faiblit, ce sont les deux autres qui trinquent. {COMPANY.name} prend en charge l’ensemble, sans sous-traiter la zinguerie à une autre entreprise.</p>
          <p className="body-copy">Tuile canal des échoppes bordelaises, ardoise des maisons de maître, zinc des immeubles du centre, tuile mécanique des pavillons : nous connaissons les toitures de la Gironde et les contraintes de chaque secteur, des embruns du Bassin à l’humidité de l’estuaire.</p>
        </div>
        <div className="mission-side">
          <div className="mission-block block-primary"><Icon.Roof className="mission-icon" /><p>Couverture, zinguerie, charpente.<br />Un seul interlocuteur.<br />Partout en Gironde.</p></div>
          <div className="mission-photo" style={{ backgroundImage: `url(${PHOTOS.mission})` }} role="img" aria-label="Illustration : maison girondine avec toiture en ardoise et gouttières zinc"></div>
          <div className="mission-block block-dark2"><Icon.Home className="mission-icon" /><p>Nous intervenons pour les <b>particuliers</b>, les <b>propriétaires bailleurs</b>, les <b>syndics de copropriété</b>, les <b>agences immobilières</b> et les <b>propriétés viticoles</b>, sur une échoppe comme sur un chai.</p></div>
          <a className="mission-cta" href="#contact">
            <span className="mission-cta-text"><span>Une fuite, un doute ?<br />Devis sous 48 h.</span><Icon.ArrowUp className="mission-cta-arrow" /></span>
            <span className="mission-cta-label">Nous contacter</span>
          </a>
        </div>
      </section>

      <section className="services-section has-backdrop" id="services" aria-labelledby="services-title">
        <Backdrop variant="services" />
        <p className="small-title center">Nos services</p>
        <h2 className="center" id="services-title">Couverture, zinguerie et dépannage de toiture en Gironde</h2>
        <p className="center-copy">Chaque intervention est chiffrée après une visite : état de la couverture, accès, matériaux, zinguerie. Le devis est détaillé poste par poste, sans surprise sur la facture.</p>
        <Services />
      </section>

      <Showcase />

      <section className="why has-backdrop" aria-labelledby="why-title">
        <Backdrop variant="why" />
        <h2 id="why-title">Pourquoi choisir {COMPANY.name} ?</h2>
        <p>Une entreprise de couverture à taille humaine : vous parlez à ceux qui montent sur votre toit.</p>
        <ul>
          {WHY_ITEMS.map(([title, text]) => (
            <li key={title}><span className="why-icon"><Icon.Check /></span><span><strong>{title}</strong>{text}</span></li>
          ))}
        </ul>
      </section>

      <section className="zones has-backdrop" id="zones" aria-labelledby="zones-title">
        <Backdrop variant="zones" />
        <p className="small-title center">Zones d’intervention</p>
        <h2 className="center" id="zones-title">Votre couvreur dans toute la Gironde</h2>
        <p className="center-copy">Basés à {COMPANY.city}, nous intervenons dans tout le département. Choisissez votre commune pour voir ce que nous y faisons le plus souvent.</p>
        <div className="zones-grid">
          {citiesByArea.map((area) => (
            <article className="zone-card" key={area.key}>
              <h3><Icon.Pin />{area.name}</h3>
              <p>{area.intro}</p>
              <ul>
                {area.cities.slice(0, ZONE_PREVIEW).map((city) => <li key={city.slug}><a href={cityPath(city)}>{city.name}</a></li>)}
              </ul>
              {area.cities.length > ZONE_PREVIEW && (
                <a className="zone-card-more" href={`/zones-intervention/#${area.key}`}>+ {area.cities.length - ZONE_PREVIEW} {area.cities.length - ZONE_PREVIEW > 1 ? 'autres communes' : 'autre commune'}</a>
              )}
            </article>
          ))}
        </div>
        <div className="center zones-more"><a className="btn btn-primary" href="/zones-intervention/">Toutes nos zones d’intervention</a></div>
      </section>

      <section className="method-section has-backdrop" id="methode" aria-labelledby="methode-title">
        <Backdrop variant="methode" />
        <p className="small-title center">Notre méthode</p>
        <h2 className="center" id="methode-title">Du premier appel à la toiture réceptionnée</h2>
        <div className="method-body">
          <div className="method-photo" style={{ backgroundImage: `url(${PHOTOS.methode})` }} role="img" aria-label="Illustration : utilitaire d’artisan couvreur et échelle au pied d’une maison"></div>
          <div className="method-panel">
            {METHOD_STEPS.map(([title, text], index) => (
              <div className="method-step" key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>
            ))}
            <a className="btn btn-accent" href="#contact">Demander un devis gratuit</a>
          </div>
        </div>
      </section>

      <section className="expertise has-backdrop" id="expertise" aria-labelledby="expertise-title">
        <Backdrop variant="expertise" />
        <div>
          <p className="small-title">Notre expertise</p>
          <h2 id="expertise-title">Le zinc, la tuile, l’ardoise : chaque matériau a ses règles.</h2>
          <p className="body-copy">Une gouttière zinc posée sans dilatation finit par se fendre. Une tuile canal sans crochets se déplace au premier coup de vent d’ouest. Une ardoise mal recouverte laisse passer l’eau par capillarité. Les règles de l’art (DTU de la série 40) ne sont pas une formalité : ce sont elles qui font qu’une toiture tient trente ans.</p>
          <p className="body-copy">Nous les appliquons sur chaque chantier, et nous vous expliquons ce que nous faisons et pourquoi.</p>
          <a className="btn btn-primary" href="/couverture-toiture/">Découvrir nos travaux de couverture</a>
        </div>
        <div className="expertise-photo" style={{ backgroundImage: `url(${PHOTOS.expertise})` }} role="img" aria-label="Illustration : lucarne habillée de zinc sur une toiture en ardoise"></div>
      </section>

      <section className="faq has-backdrop" id="faq" aria-labelledby="faq-title">
        <Backdrop variant="faq" />
        <p className="small-title center">FAQ</p>
        <h2 className="center" id="faq-title">Questions fréquentes sur vos travaux de toiture</h2>
        <Faq items={HOME_FAQS} />
      </section>

      <Contact />
    </>
  )
}
