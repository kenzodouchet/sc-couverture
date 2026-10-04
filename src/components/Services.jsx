import { useState } from 'react'
import { PHOTOS } from '../lib/photos'
import { SERVICES } from '../lib/services'

/**
 * Prestations en panneaux côte à côte : le panneau survolé (ou touché)
 * s'ouvre et révèle son détail, avec un lien vers la page de la prestation.
 * Sur mobile les panneaux s'empilent.
 */
export default function Services() {
  const [active, setActive] = useState(0)

  return (
    <div className="services-panels" role="list">
      {SERVICES.map((service, index) => {
        const isActive = index === active
        return (
          <div
            key={service.slug}
            role="listitem"
            className={`service-panel${isActive ? ' is-active' : ''}`}
            style={{ backgroundImage: `url(${PHOTOS[service.photo]})` }}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            <button
              type="button"
              className="service-panel-hit"
              onClick={() => setActive(index)}
              aria-expanded={isActive}
              aria-label={`${service.name}${isActive ? '' : ' : voir le détail'}`}
            />
            <span className="service-panel-index" aria-hidden="true">0{index + 1}</span>
            <span className="service-panel-short" aria-hidden="true">{service.short}</span>
            <div className="service-panel-body">
              <h3>{service.name}</h3>
              <p className="service-panel-tagline">{service.tagline}</p>
              <p className="service-panel-text">{service.excerpt}</p>
              <ul>
                {service.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <a className="btn btn-accent" href={`/${service.slug}/`}>{service.short} : en savoir plus</a>
            </div>
          </div>
        )
      })}
    </div>
  )
}
