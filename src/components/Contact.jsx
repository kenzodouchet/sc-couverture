import { COMPANY, CONTACT, MAPS_EMBED_URL, MAPS_LINK_URL } from '../lib/company'
import { Icon } from './Icons'
import Backdrop from './Backdrop'

/** Bloc Contact commun à toutes les pages : coordonnées, appel, carte. */
export default function Contact({ title = 'Nous contacter', lead }) {
  return (
    <section className="contact has-backdrop" id="contact" aria-labelledby="contact-title">
      <Backdrop variant="contact" />
      <div className="contact-inner">
        <div className="contact-info">
          <h2 id="contact-title">{title}</h2>
          <p>{lead ?? 'Une fuite, des tuiles à remplacer, une gouttière qui déborde, une toiture à refaire ? Un appel ou un email suffit : visite sur place et devis gratuit sous 48 h.'}</p>
          <address className="contact-list">
            <div><span className="ci-icon"><Icon.Phone /></span><div><strong>Nous appeler</strong><a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a></div></div>
            <div><span className="ci-icon"><Icon.Envelope /></span><div><strong>Nous écrire</strong><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div></div>
            <div><span className="ci-icon"><Icon.Pin /></span><div><strong>Secteur</strong><span>Basés à {COMPANY.city}, intervention dans toute la Gironde (33)</span></div></div>
            <div><span className="ci-icon"><Icon.Clock /></span><div><strong>Horaires</strong><span>{CONTACT.hours}</span></div></div>
          </address>
          <div className="cta-row">
            <a className="btn btn-accent" href={`tel:${CONTACT.phone}`}><Icon.Phone className="btn-icon" />Appeler</a>
            <a className="btn btn-white" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Demande de devis toiture')}`}><Icon.Envelope className="btn-icon" />Demander un devis</a>
            <a className="btn btn-ghost" href={MAPS_LINK_URL} target="_blank" rel="noreferrer"><Icon.Route className="btn-icon" />Itinéraire</a>
          </div>
        </div>
        <div className="contact-map">
          <iframe src={MAPS_EMBED_URL} title={`Carte : ${COMPANY.name}, couvreur en Gironde`} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  )
}
