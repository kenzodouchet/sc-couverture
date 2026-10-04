import { SERVICES } from '../lib/services'
import PageHero from '../components/PageHero'

export default function NotFound() {
  return (
    <>
      <PageHero title="Page introuvable">
        <p>Cette page n’existe pas ou a été déplacée. Retrouvez nos prestations ci-dessous ou revenez à l’<a href="/">accueil</a>.</p>
      </PageHero>
      <section className="city-links">
        <ul className="chip-list">
          {SERVICES.map((service) => <li key={service.slug}><a href={`/${service.slug}/`}>{service.name}</a></li>)}
        </ul>
      </section>
    </>
  )
}
