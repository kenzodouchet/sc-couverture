import { AVIS } from '../lib/avis'
import { AVIS_EXEMPLES } from '../lib/avis-exemples'
import Backdrop from './Backdrop'

// Les avis d'exemple ne servent qu'à juger la mise en page en local
// (npm run dev) : aucun build, donc aucune version en ligne, ne les contient.
const ITEMS = AVIS.length ? AVIS : import.meta.env.DEV ? AVIS_EXEMPLES : []

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
const formatDate = (value) => {
  const [year, month] = value.split('-').map(Number)
  return `${MONTHS[month - 1]} ${year}`
}

function Stars({ rating }) {
  return (
    <span className="stars" role="img" aria-label={`${rating} sur 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 24 24" className={n <= rating ? 'on' : ''} aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" /></svg>
      ))}
    </span>
  )
}

/** Section « Avis clients » : masquée tant qu'il n'y a rien à afficher. */
export default function Reviews() {
  if (!ITEMS.length) return null
  const average = ITEMS.reduce((sum, item) => sum + item.rating, 0) / ITEMS.length

  return (
    <section className="reviews has-backdrop" id="avis" aria-labelledby="avis-title">
      <Backdrop variant="faq" />
      <p className="small-title center">Avis clients</p>
      <h2 className="center" id="avis-title">Ils nous ont confié leur toiture</h2>
      <div className="reviews-summary">
        <strong>{average.toFixed(1).replace('.', ',')}</strong>
        <div>
          <Stars rating={Math.round(average)} />
          <span>{ITEMS.length} avis</span>
        </div>
      </div>
      <div className="reviews-grid">
        {ITEMS.map((item) => (
          <figure className="review-card" key={`${item.name}-${item.date}`}>
            <Stars rating={item.rating} />
            <blockquote>{item.text}</blockquote>
            <figcaption>
              <span className="review-avatar" aria-hidden="true">{item.name.charAt(0)}</span>
              <span>
                <strong>{item.name}</strong>
                <span>{item.city} · {item.work} · {formatDate(item.date)}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
