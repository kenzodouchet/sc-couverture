import { CONTACT } from '../lib/company'
import Breadcrumb from './Breadcrumb'
import { Icon } from './Icons'

/** En-tête des pages intérieures : fil d'Ariane, titre unique (h1), accroche. */
export default function PageHero({ breadcrumb, kicker, title, children, image }) {
  return (
    <section className="page-hero-wrap" aria-labelledby="page-title">
      <div className="page-hero">
        {image && <div className="hero-bg" style={{ backgroundImage: `url(${image})` }}></div>}
        <div className="page-hero-content">
          {breadcrumb && <Breadcrumb items={breadcrumb} />}
          {kicker && <p className="hero-kicker">{kicker}</p>}
          <h1 id="page-title">{title}</h1>
          <div className="page-hero-lead">{children}</div>
          <div className="cta-row">
            <a className="btn btn-accent" href={`tel:${CONTACT.phone}`}><Icon.Phone className="btn-icon" />{CONTACT.phoneDisplay}</a>
            <a className="btn btn-glass" href="#contact">Demander un devis gratuit</a>
          </div>
        </div>
      </div>
    </section>
  )
}
