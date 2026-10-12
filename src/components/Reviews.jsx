import { useCallback, useEffect, useRef, useState } from 'react'
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

const AUTOPLAY_MS = 6000

/**
 * Carrousel d'avis : défilement natif (scroll-snap, donc glisser au doigt),
 * flèches, points, et défilement automatique mis en pause au survol, au
 * toucher, au focus clavier ou si le visiteur préfère moins d'animations.
 */
function useCarousel(count) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [lastIndex, setLastIndex] = useState(count - 1)

  // Largeur d'un pas (carte + espace) et dernière position atteignable.
  const measure = useCallback(() => {
    const track = trackRef.current
    const card = track?.firstElementChild
    if (!card) return { step: 1, last: 0 }
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const step = card.offsetWidth + gap
    const last = Math.max(0, Math.round((track.scrollWidth - track.clientWidth) / step))
    return { step, last }
  }, [])

  const goTo = useCallback((target) => {
    const track = trackRef.current
    if (!track) return
    const { step, last } = measure()
    const next = target > last ? 0 : target < 0 ? last : target
    track.scrollTo({ left: next * step, behavior: 'smooth' })
  }, [measure])

  // Suit la position réelle (flèches, doigt, molette) pour les points.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    let frame = 0
    const update = () => {
      frame = 0
      const { step, last } = measure()
      setLastIndex(last)
      setIndex(Math.min(last, Math.round(track.scrollLeft / step)))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    track.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      track.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [measure])

  useEffect(() => {
    if (paused || lastIndex === 0) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const id = setTimeout(() => goTo(index + 1), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [paused, index, lastIndex, goTo])

  const pause = { onMouseEnter: () => setPaused(true), onMouseLeave: () => setPaused(false), onTouchStart: () => setPaused(true), onFocus: () => setPaused(true), onBlur: () => setPaused(false) }
  return { trackRef, index, lastIndex, goTo, pause }
}

/** Section « Avis clients » : masquée tant qu'il n'y a rien à afficher. */
export default function Reviews() {
  const { trackRef, index, lastIndex, goTo, pause } = useCarousel(ITEMS.length)
  if (!ITEMS.length) return null
  const average = ITEMS.reduce((sum, item) => sum + item.rating, 0) / ITEMS.length

  return (
    <section className="reviews has-backdrop" id="avis" aria-labelledby="avis-title">
      <Backdrop variant="avis" />
      <p className="small-title center">Avis clients</p>
      <h2 className="center" id="avis-title">Ils nous ont confié leur toiture</h2>
      <div className="reviews-summary">
        <strong>{average.toFixed(1).replace('.', ',')}</strong>
        <div>
          <Stars rating={Math.round(average)} />
          <span>{ITEMS.length} avis</span>
        </div>
      </div>
      <div className="reviews-carousel" {...pause} aria-roledescription="carrousel" aria-label="Avis clients">
        <button type="button" className="reviews-arrow prev" onClick={() => goTo(index - 1)} aria-label="Avis précédents">‹</button>
        <div className="reviews-track" ref={trackRef} tabIndex={0}>
          {ITEMS.map((item, i) => (
            <figure className="review-card" key={`${item.name}-${item.date}`} aria-roledescription="avis" aria-label={`${i + 1} sur ${ITEMS.length}`}>
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
        <button type="button" className="reviews-arrow next" onClick={() => goTo(index + 1)} aria-label="Avis suivants">›</button>
      </div>
      {lastIndex > 0 && (
        <div className="reviews-dots">
          {Array.from({ length: lastIndex + 1 }, (_, i) => (
            <button type="button" key={i} className={i === index ? 'is-active' : ''} onClick={() => goTo(i)} aria-label={`Aller à l’avis ${i + 1}`} aria-current={i === index ? 'true' : undefined} />
          ))}
        </div>
      )}
    </section>
  )
}
