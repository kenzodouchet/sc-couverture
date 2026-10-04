import { AREAS, CITIES, cityPath } from '../lib/cities'
import { COMPANY } from '../lib/company'
import { PHOTOS } from '../lib/photos'
import PageHero from '../components/PageHero'
import Contact from '../components/Contact'
import Backdrop from '../components/Backdrop'
import { Icon } from '../components/Icons'

export default function Zones({ route }) {
  return (
    <>
      <PageHero breadcrumb={route.breadcrumb} kicker="Gironde (33)" title="Couvreur en Gironde : nos zones d’intervention" image={PHOTOS.tuileCanal}>
        <p>Basés à {COMPANY.city}, nous intervenons dans {CITIES.length} communes et leurs alentours, de la métropole bordelaise au Bassin d’Arcachon, du Médoc au Libournais. Votre commune n’est pas listée ? Appelez-nous : nous couvrons tout le département.</p>
      </PageHero>

      <section className="zones has-backdrop" aria-label="Communes desservies par secteur">
        <Backdrop variant="zones" />
        {Object.entries(AREAS).map(([key, area]) => (
          <div className="zone-block" key={key} id={key}>
            <h2><Icon.Pin />{area.name}</h2>
            <p>{area.intro}</p>
            <div className="zone-cities">
              {CITIES.filter((city) => city.area === key).map((city) => (
                <a className="zone-city" key={city.slug} href={cityPath(city)}>
                  <strong>Couvreur {city.name}</strong>
                  <span>{city.postalCode}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      <Contact />
    </>
  )
}
