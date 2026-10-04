import { AREAS, CITIES, cityBySlug, cityPath, ofCity, atCity } from '../lib/cities'
import { SERVICES } from '../lib/services'
import { PHOTOS } from '../lib/photos'
import { COMPANY } from '../lib/company'
import PageHero from '../components/PageHero'
import Faq from '../components/Faq'
import Contact from '../components/Contact'
import Backdrop from '../components/Backdrop'
import { Icon } from '../components/Icons'

export default function City({ route }) {
  const city = cityBySlug[route.slug]
  const area = AREAS[city.area]
  const nearby = city.nearby.map((slug) => cityBySlug[slug]).filter(Boolean)
  const sameArea = CITIES.filter((other) => other.area === city.area && other.slug !== city.slug && !city.nearby.includes(other.slug))

  const faqs = [
    [`Intervenez-vous rapidement ${atCity(city.name)} ?`, `Oui. ${city.name} fait partie de notre secteur ${area.name} : nous y passons régulièrement. Pour une fuite ou des tuiles arrachées, appelez-nous, nous mettons la toiture hors d’eau au plus vite.`],
    [`Le devis est-il gratuit ${atCity(city.name)} ?`, `Oui, la visite et le devis sont gratuits et sans engagement ${atCity(city.name)} (${city.postalCode}) comme dans toute la Gironde. Vous recevez un chiffrage détaillé sous 48 h.`],
    [`Quels travaux réalisez-vous ${atCity(city.name)} ?`, `Réfection et réparation de toiture, remplacement de tuiles et d’ardoises, gouttières et chéneaux en zinc, recherche de fuite, démoussage et traitement hydrofuge, réparation de charpente et pose de fenêtres de toit.`],
  ]

  return (
    <>
      <PageHero breadcrumb={route.breadcrumb} kicker={`${area.name} · ${city.postalCode}`} title={`Couvreur zingueur ${atCity(city.name)}`} image={PHOTOS.hero}>
        <p>Rénovation de toiture, zinguerie, recherche de fuite et démoussage {atCity(city.name)} et dans les communes voisines. Devis gratuit sous 48 h.</p>
      </PageHero>

      <div className="article-layout has-backdrop">
        <Backdrop variant="page" />
        <article className="article">
          <section>
            <h2>Les toitures {ofCity(city.name)}</h2>
            <p>{city.habitat}</p>
            <p>{city.climate}</p>
          </section>
          <section>
            <h2>Nos prestations de couverture {atCity(city.name)}</h2>
            <div className="service-cards">
              {SERVICES.map((service) => (
                <a className="service-card" key={service.slug} href={`/${service.slug}/`}>
                  <h3>{service.name}</h3>
                  <p>{service.excerpt}</p>
                  <span className="service-card-more">En savoir plus <Icon.Arrow /></span>
                </a>
              ))}
            </div>
          </section>
          <section>
            <h2>Un couvreur de la Gironde, pas un démarcheur</h2>
            <p>{COMPANY.name} vient sur rendez-vous, inspecte votre toiture avec vous, et vous remet un devis écrit que vous avez le temps de comparer. Méfiez-vous des démarcheurs qui « passent dans le quartier » et repèrent soudain des tuiles cassées : un artisan sérieux ne vous fera jamais signer dans l’heure.</p>
          </section>
        </article>

        <aside className="article-aside">
          <div className="aside-card aside-primary">
            <h2>Couvreur {atCity(city.name)}</h2>
            <ul className="check-list">
              <li><Icon.Check />Visite et devis gratuits</li>
              <li><Icon.Check />Réponse sous 48 h</li>
              <li><Icon.Check />Intervention d’urgence</li>
              <li><Icon.Check />Garantie décennale</li>
            </ul>
            <a className="btn btn-accent" href="#contact">Demander un devis</a>
          </div>
          {nearby.length > 0 && (
            <div className="aside-card">
              <h2>Communes voisines</h2>
              <ul className="link-list">
                {nearby.map((other) => <li key={other.slug}><a href={cityPath(other)}><Icon.Pin />Couvreur {other.name}</a></li>)}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <section className="faq" id="faq" aria-labelledby="faq-title">
        <p className="small-title center">Questions fréquentes</p>
        <h2 className="center" id="faq-title">Couvreur {atCity(city.name)} : vos questions</h2>
        <Faq items={faqs} />
      </section>

      {sameArea.length > 0 && (
        <section className="city-links" aria-labelledby="area-title">
          <h2 id="area-title" className="center">Nous intervenons aussi dans le secteur {area.name}</h2>
          <ul className="chip-list">
            {sameArea.map((other) => <li key={other.slug}><a href={cityPath(other)}>Couvreur {other.name}</a></li>)}
          </ul>
        </section>
      )}

      <Contact title={`Un couvreur ${atCity(city.name)} ?`} lead={`Fuite, tuiles à remplacer, gouttière à refaire ou toiture à rénover ${atCity(city.name)} ? Appelez-nous ou écrivez-nous : visite sur place et devis gratuit sous 48 h.`} />
    </>
  )
}
