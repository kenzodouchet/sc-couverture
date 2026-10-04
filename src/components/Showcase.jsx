import { useCallback, useEffect, useRef, useState } from 'react'
import { PHOTOS } from '../lib/photos'
import Backdrop from './Backdrop'

const AUTOPLAY_MS = 5000

const CATEGORIES = {
  couverture: 'Couverture',
  zinguerie: 'Zinguerie',
  depannage: 'Dépannage',
  entretien: 'Entretien',
}

// Illustrations des chantiers types. À remplacer par de vraies photos de
// chantier dès que possible, avec la commune dans le titre et l'alt
// (« Réfection d'une toiture en tuile canal à Mérignac ») : c'est excellent
// pour le référencement local et Google Images.
const ITEMS = [
  { src: PHOTOS.couverture, category: 'couverture', title: 'Réfection d’un pan de toiture en tuiles', alt: 'Illustration : pan de toiture en cours de réfection, liteaux neufs et tuiles posées' },
  { src: PHOTOS.zinguerie, category: 'zinguerie', title: 'Gouttière et descente en zinc', alt: 'Illustration : gouttière pendante et descente en zinc sous un avant-toit en tuiles' },
  { src: PHOTOS.fuite, category: 'depannage', title: 'Bâchage d’urgence après une tempête', alt: 'Illustration : couvreur bâchant une toiture endommagée sous la pluie' },
  { src: PHOTOS.demoussage, category: 'entretien', title: 'Démoussage : avant / après', alt: 'Illustration : toiture moitié couverte de mousse, moitié nettoyée' },
  { src: PHOTOS.charpente, category: 'couverture', title: 'Contrôle et renforcement de charpente', alt: 'Illustration : fermes de charpente en bois contrôlées par un couvreur' },
  { src: PHOTOS.velux, category: 'couverture', title: 'Fenêtres de toit sur couverture ardoise', alt: 'Illustration : deux fenêtres de toit posées dans une couverture en ardoise' },
  { src: PHOTOS.expertise, category: 'zinguerie', title: 'Lucarne habillée de zinc', alt: 'Illustration : lucarne en zinc sur une toiture en ardoise' },
]

/** Visionneuse plein écran, ouverte au clic sur la photo centrale. */
function Lightbox({ items, index, onClose, onStep }) {
  const item = items[index]

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onStep(1)
      if (event.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose, onStep])

  return (
    <div className="lb" onClick={onClose} role="dialog" aria-modal="true" aria-label={item.title}>
      <button className="lb-close" onClick={onClose} aria-label="Fermer">✕</button>
      <button className="lb-nav lb-prev" onClick={(event) => { event.stopPropagation(); onStep(-1) }} aria-label="Photo précédente">‹</button>
      <figure className="lb-figure" onClick={(event) => event.stopPropagation()}>
        <img src={item.src} alt={item.alt} />
        <figcaption>
          <strong>{item.title}</strong>
          <span>{CATEGORIES[item.category]} · {index + 1} / {items.length}</span>
        </figcaption>
      </figure>
      <button className="lb-nav lb-next" onClick={(event) => { event.stopPropagation(); onStep(1) }} aria-label="Photo suivante">›</button>
    </div>
  )
}

/**
 * Éventail de photos en perspective : la photo courante au centre, les
 * voisines en retrait de chaque côté. Défilement automatique (mis en pause au
 * survol et quand l'onglet est caché), flèches, clavier, balayage au doigt,
 * et visionneuse au clic sur la photo centrale.
 */
export default function Showcase() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [open, setOpen] = useState(null)
  const [cycle, setCycle] = useState(0)
  const swipe = useRef(null)

  const items = ITEMS
  const count = items.length

  const step = useCallback((delta) => {
    setCurrent((value) => (value + delta + count) % count)
    setCycle((value) => value + 1)
  }, [count])

  const select = (index) => {
    setCurrent(index)
    setCycle((value) => value + 1)
  }

  // Défilement automatique : suspendu au survol, dans la visionneuse, ou si
  // l'onglet n'est pas visible. Le compteur `cycle` relance la barre de progression.
  const playing = !paused && open === null && count > 1
  useEffect(() => {
    if (!playing) return
    const id = setTimeout(() => step(1), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [playing, current, cycle, step])

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  // Balayage au doigt ou à la souris : un déplacement franc change de photo.
  const onPointerDown = (event) => { swipe.current = { x: event.clientX, t: Date.now() } }
  const onPointerUp = (event) => {
    if (!swipe.current) return
    const dx = event.clientX - swipe.current.x
    swipe.current = null
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1)
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') step(1)
    if (event.key === 'ArrowLeft') step(-1)
  }

  const item = items[current]

  return (
    <section className="realisations has-backdrop" id="realisations" aria-labelledby="realisations-title">
      <Backdrop variant="realisations" />
      <p className="small-title center">En images</p>
      <h2 className="center" id="realisations-title">Nos chantiers types, de la gouttière au faîtage</h2>

      <p className="center-copy">Couverture, zinguerie, dépannage, entretien : {count} interventions représentatives de notre quotidien en Gironde.</p>

      <div
        className="showcase"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { swipe.current = null }}
        onKeyDown={onKeyDown}
        tabIndex={0}
        aria-roledescription="carrousel"
      >
        <div className="showcase-stage">
          {items.map((photo, index) => {
            // Position relative à la photo courante, en boucle : -2, -1, 0, 1, 2.
            let offset = index - current
            if (offset > count / 2) offset -= count
            if (offset < -count / 2) offset += count
            const visible = Math.abs(offset) <= 2
            const isCurrent = offset === 0
            return (
              <button
                key={photo.src}
                type="button"
                className={`showcase-card${isCurrent ? ' is-current' : ''}`}
                style={{ '--o': offset, '--ao': Math.abs(offset), zIndex: 10 - Math.abs(offset), visibility: visible ? 'visible' : 'hidden' }}
                onClick={() => (isCurrent ? setOpen(index) : select(index))}
                aria-label={isCurrent ? `Agrandir : ${photo.title}` : `Afficher : ${photo.title}`}
                aria-hidden={!visible}
                tabIndex={visible ? 0 : -1}
              >
                <img src={photo.src} alt={photo.alt} loading={Math.abs(offset) <= 1 ? 'eager' : 'lazy'} decoding="async" draggable="false" />
                <span className="showcase-card-cat">{CATEGORIES[photo.category]}</span>
              </button>
            )
          })}
        </div>

        <button className="showcase-arrow showcase-prev" onClick={() => step(-1)} aria-label="Photo précédente">‹</button>
        <button className="showcase-arrow showcase-next" onClick={() => step(1)} aria-label="Photo suivante">›</button>
      </div>

      <div className="showcase-caption" key={current} aria-live="polite">
        <span className="showcase-counter">{String(current + 1).padStart(2, '0')} <i>/ {String(count).padStart(2, '0')}</i></span>
        <strong>{item.title}</strong>
        <span className="showcase-cat">{CATEGORIES[item.category]}</span>
        <span className="showcase-progress" aria-hidden="true">
          <span key={cycle} className={playing ? 'is-running' : ''} style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />
        </span>
      </div>

      {open !== null && (
        <Lightbox
          items={items}
          index={open}
          onClose={() => setOpen(null)}
          onStep={(delta) => setOpen((value) => (value + delta + count) % count)}
        />
      )}
    </section>
  )
}
