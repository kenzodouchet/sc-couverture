import { serviceBySlug, SERVICES } from '../lib/services'
import { cityBySlug, cityPath } from '../lib/cities'

// Grandes communes mises en avant ; les autres sont sur /zones-intervention/.
const MAIN_CITIES = ['bordeaux', 'merignac', 'pessac', 'talence', 'begles', 'villenave-d-ornon', 'saint-medard-en-jalles', 'arcachon', 'la-teste-de-buch', 'libourne', 'lesparre-medoc', 'langon']
import { PHOTOS } from '../lib/photos'
import { COMPANY } from '../lib/company'
import PageHero from '../components/PageHero'
import Faq from '../components/Faq'
import Contact from '../components/Contact'
import Backdrop from '../components/Backdrop'
import { Icon } from '../components/Icons'

export default function Service({ route }) {
  const service = serviceBySlug[route.slug]
  const others = SERVICES.filter((item) => item.slug !== service.slug)

  return (
    <>
      <PageHero breadcrumb={route.breadcrumb} kicker={service.tagline} title={service.h1} image={PHOTOS[service.photo]}>
        <p>{service.excerpt} {COMPANY.name} intervient à Bordeaux et dans toute la Gironde, devis gratuit sous 48 h.</p>
      </PageHero>

      <div className="article-layout has-backdrop">
        <Backdrop variant="page" />
        <article className="article">
          {service.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.text.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
            </section>
          ))}
          <figure className="article-figure">
            <img src={PHOTOS[service.photo]} alt={`Illustration : ${service.name.toLowerCase()}`} width="1200" height="800" loading="lazy" decoding="async" />
          </figure>
        </article>

        <aside className="article-aside">
          <div className="aside-card aside-primary">
            <h2>Ce que comprend la prestation</h2>
            <ul className="check-list">
              {service.points.map((point) => <li key={point}><Icon.Check />{point}</li>)}
            </ul>
            <a className="btn btn-accent" href="#contact">Devis gratuit sous 48 h</a>
          </div>
          <div className="aside-card">
            <h2>Nos autres prestations</h2>
            <ul className="link-list">
              {others.map((item) => <li key={item.slug}><a href={`/${item.slug}/`}><Icon.Arrow />{item.name}</a></li>)}
            </ul>
          </div>
        </aside>
      </div>

      <section className="faq" id="faq" aria-labelledby="faq-title">
        <p className="small-title center">Questions fréquentes</p>
        <h2 className="center" id="faq-title">{service.name} : vos questions</h2>
        <Faq items={service.faqs} />
      </section>

      <section className="city-links" aria-labelledby="cities-title">
        <h2 id="cities-title" className="center">{service.short} : nous intervenons près de chez vous</h2>
        <ul className="chip-list">
          {MAIN_CITIES.map((slug) => cityBySlug[slug]).map((city) => <li key={city.slug}><a href={cityPath(city)}>{service.short} {city.name}</a></li>)}
          <li><a className="chip-more" href="/zones-intervention/">Toutes les communes →</a></li>
        </ul>
      </section>

      <Contact lead={`${service.name} à Bordeaux ou ailleurs en Gironde ? Appelez-nous ou écrivez-nous : visite sur place et devis gratuit sous 48 h.`} />
    </>
  )
}
