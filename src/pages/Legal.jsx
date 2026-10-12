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
          <section id="confidentialite">
            <h2>Politique de confidentialité</h2>
            <p>Le site ne comporte ni formulaire, ni compte, ni outil de mesure d’audience : il ne collecte aucune donnée personnelle par lui-même. Les informations que vous nous transmettez par téléphone ou par email (nom, coordonnées, adresse du chantier) servent uniquement à établir votre devis et à réaliser les travaux. Elles sont conservées le temps de la relation commerciale puis le temps imposé par les obligations comptables, et ne sont jamais vendues ni cédées.</p>
            <p>Vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant à {CONTACT.email}. En cas de difficulté, vous pouvez saisir la CNIL (cnil.fr).</p>
          </section>
          <section id="cookies">
            <h2>Gestion des cookies</h2>
            <p>Le site ne dépose aucun cookie publicitaire ni de mesure d’audience. Votre choix de consentement est mémorisé dans votre navigateur (stockage local) pendant 6 mois.</p>
            <p>La carte Google Maps du bloc Contact est fournie par Google LLC, qui peut déposer des cookies et collecter des données de navigation. Elle n’est chargée qu’avec votre accord. Vous pouvez modifier votre choix à tout moment avec le lien « Gérer les cookies » en bas de chaque page.</p>
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
