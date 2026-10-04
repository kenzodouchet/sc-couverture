import { COMPANY, CONTACT } from '../lib/company'
import PageHero from '../components/PageHero'

const or = (value, fallback = 'À compléter') => value || fallback

export default function Legal({ route }) {
  return (
    <>
      <PageHero breadcrumb={route.breadcrumb} title="Mentions légales" />
      <div className="article-layout single">
        <article className="article">
          <section>
            <h2>Éditeur du site</h2>
            <p>{COMPANY.name}{COMPANY.legalForm ? `, ${COMPANY.legalForm}` : ''}<br />Dirigeant et responsable de la publication : {or(COMPANY.owner)}<br />SIREN : {or(COMPANY.siren)}<br />Adresse : {CONTACT.address}<br />Téléphone : {CONTACT.phoneDisplay} · Email : {CONTACT.email}</p>
          </section>
          <section>
            <h2>Hébergement</h2>
            <p>Render Services, Inc., 525 Brannan Street, Suite 300, San Francisco, CA 94107, États-Unis — render.com</p>
          </section>
          <section>
            <h2>Données personnelles et cookies</h2>
            <p>Le site ne dépose aucun cookie et ne collecte aucune donnée personnelle par lui-même. La carte Google Maps intégrée peut charger des ressources de Google chez le visiteur. Les informations que vous nous transmettez par téléphone ou par email servent uniquement à répondre à votre demande de devis.</p>
          </section>
          <section>
            <h2>Propriété intellectuelle</h2>
            <p>Les textes, illustrations et le logo de {COMPANY.name} sont protégés. Toute reproduction sans autorisation est interdite.</p>
          </section>
        </article>
      </div>
    </>
  )
}
