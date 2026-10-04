/**
 * Décors de fond, un par section, qui traversent la page de bout en bout
 * derrière le contenu. Purement décoratifs (aria-hidden), en traits fins et
 * à faible opacité.
 *
 * Des icônes du thème de la section (toit, maison, appareil photo, épingle,
 * point d'interrogation…) disséminées sur toute la largeur, grandes et
 * flottantes, une seule famille par section.
 *
 * Les icônes sont dessinées dans un carré de 100 unités centré en 0, au trait
 * (stroke), puis mises à l'échelle : le trait reste homogène partout.
 */

import { useEffect, useRef, useState } from 'react'

/** Vrai sur les écrans étroits (téléphone, petite tablette), suivi en direct. */
function useNarrow() {
  const query = '(max-width: 900px)'
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setNarrow(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return narrow
}

const STROKE = { fill: 'none', stroke: 'currentColor', strokeWidth: 6, strokeLinecap: 'round', strokeLinejoin: 'round' }

const ICONS = {
  home: () => (
    <g {...STROKE}>
      <path d="M-46 4 L0 -40 L46 4" />
      <path d="M-32 -8 V40 H32 V-8" />
      <path d="M-8 40 V14 H8 V40" />
    </g>
  ),
  roof: () => (
    <g {...STROKE}>
      <path d="M-46 6 L0 -34 L46 6" />
      <path d="M-30 -8 C -22 -18, -14 -18, -6 -8 C 2 -18, 10 -18, 18 -8 C 26 -18, 34 -18, 38 -12" strokeWidth="5" />
      <path d="M-40 14 C -30 4, -20 4, -10 14 C 0 4, 10 4, 20 14 C 30 4, 40 4, 44 8" strokeWidth="5" />
      <path d="M-36 30 H36" />
    </g>
  ),
  camera: () => (
    <g {...STROKE}>
      <rect x="-46" y="-26" width="92" height="64" rx="10" />
      <path d="M-22 -26 L-14 -40 H14 L22 -26" />
      <circle cx="4" cy="6" r="18" />
      <circle cx="30" cy="-12" r="3" fill="currentColor" stroke="none" />
    </g>
  ),
  picture: () => (
    <g {...STROKE}>
      <rect x="-44" y="-36" width="88" height="72" rx="8" />
      <path d="M-44 20 L-16 -8 L4 12 L16 0 L44 28" />
      <circle cx="22" cy="-16" r="6" />
    </g>
  ),
  question: () => (
    <g {...STROKE}>
      <path d="M-22 -18 C -22 -38, 22 -38, 22 -18 C 22 -4, 0 -4, 0 14" />
      <circle cx="0" cy="34" r="4" fill="currentColor" stroke="none" />
    </g>
  ),
  bubble: () => (
    <g {...STROKE}>
      <path d="M-44 -30 a12 12 0 0 1 12 -12 h64 a12 12 0 0 1 12 12 v40 a12 12 0 0 1 -12 12 h-38 l-22 20 v-20 h-4 a12 12 0 0 1 -12 -12 z" />
      <path d="M-20 -10 H20 M-20 6 H4" strokeWidth="5" />
    </g>
  ),
  phone: () => (
    <g {...STROKE}>
      <rect x="-26" y="-48" width="52" height="96" rx="10" />
      <path d="M-8 -36 H8" strokeWidth="5" />
      <circle cx="0" cy="34" r="4" fill="currentColor" stroke="none" />
    </g>
  ),
  envelope: () => (
    <g {...STROKE}>
      <rect x="-46" y="-30" width="92" height="60" rx="8" />
      <path d="M-46 -22 L0 10 L46 -22" />
    </g>
  ),
  clipboard: () => (
    <g {...STROKE}>
      <rect x="-34" y="-36" width="68" height="84" rx="8" />
      <path d="M-14 -36 V-46 H14 V-36" />
      <path d="M-18 -4 L-8 6 L12 -14" />
      <path d="M-18 24 H18" strokeWidth="5" />
    </g>
  ),
  calendar: () => (
    <g {...STROKE}>
      <rect x="-40" y="-32" width="80" height="72" rx="8" />
      <path d="M-40 -12 H40 M-22 -46 V-20 M22 -46 V-20" />
      <path d="M-24 4 H-14 M-6 4 H6 M14 4 H24 M-24 22 H-14 M-6 22 H6" strokeWidth="5" />
    </g>
  ),
  shield: () => (
    <g {...STROKE}>
      <path d="M0 -46 L38 -32 V4 C 38 26, 20 40, 0 48 C -20 40, -38 26, -38 4 V-32 Z" />
      <path d="M-16 2 L-4 14 L18 -10" />
    </g>
  ),
  clock: () => (
    <g {...STROKE}>
      <circle cx="0" cy="0" r="42" />
      <path d="M0 -24 V2 L18 12" />
    </g>
  ),
  pin: () => (
    <g {...STROKE}>
      <path d="M0 46 C -26 14, -34 -2, -34 -14 A34 34 0 1 1 34 -14 C 34 -2, 26 14, 0 46 Z" />
      <circle cx="0" cy="-14" r="10" />
    </g>
  ),
}

/** Dimensions d'un élément, suivies en direct. */
function useSize(ref) {
  const [size, setSize] = useState({ w: 0, h: 0 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ w: width, h: height })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
  return size
}

// Emplacements en fraction de la largeur et de la hauteur de la section :
// bords, centre, haut et bas. Chaque entrée : fx, fy, taille, rotation.
const SPOTS = [
  [.07, .2, 1.7, -12], [.27, .13, 1.1, 8], [.48, .22, 1.4, -6], [.7, .12, 1.0, 14], [.92, .22, 1.6, -10],
  [.16, .53, 1.0, 18], [.5, .55, .9, -16], [.83, .52, 1.1, 6],
  [.06, .83, 1.2, 10], [.29, .87, 1.5, -8], [.63, .83, 1.1, 12], [.93, .82, 1.3, -14],
]
// Écran étroit : les icônes s'étagent le long des deux bords.
const SPOTS_NARROW = [
  [.12, .08, 1.0, -12], [.86, .18, .85, 10], [.1, .3, .9, 8], [.88, .42, 1.05, -8],
  [.13, .55, .85, 14], [.85, .67, 1.0, -10], [.11, .8, 1.05, 6], [.87, .92, .85, -14],
]

/**
 * Icônes du thème disséminées dans la section : quelques-unes, grandes, de
 * tailles variées, qui flottent doucement. Une seule famille par section.
 * La taille des icônes est fixe en pixels : elle ne dépend pas de la hauteur
 * de la section, qui peut changer (FAQ dépliée, contenu chargé).
 */
function Scatter({ icon, count = 12, sizeFactor = 1 }) {
  const narrow = useNarrow()
  const ref = useRef(null)
  const { w, h } = useSize(ref)
  const Icon = ICONS[icon]
  if (!Icon) return null
  const spots = narrow ? SPOTS_NARROW : SPOTS.slice(0, count)
  const unit = (narrow ? .55 : .9) * sizeFactor
  return (
    <svg ref={ref} className="backdrop backdrop-scene" aria-hidden="true" focusable="false">
      {w > 0 && spots.map(([fx, fy, s, a], i) => (
        <g key={i} className="backdrop-float" style={{ animationDelay: `${(i % 6) * -1.1}s`, animationDuration: `${6 + (i % 4)}s` }}>
          <g className="backdrop-spot" style={{ transform: `translate(${Math.round(fx * w)}px, ${Math.round(fy * h)}px) rotate(${a}deg) scale(${s * unit})` }}><Icon /></g>
        </g>
      ))}
    </svg>
  )
}

// Une famille d'icône par section.
const THEMES = {
  mission: { icon: 'roof' },
  services: { icon: 'home' },
  realisations: { icon: 'camera' },
  why: { icon: 'roof', count: 10 },
  methode: { icon: 'clipboard' },
  expertise: { icon: 'shield', count: 10 },
  faq: { icon: 'question', sizeFactor: 1.15 },
  contact: { icon: 'phone' },
  zones: { icon: 'pin', sizeFactor: 1.1 },
  page: { icon: 'roof', count: 8 },
}

export default function Backdrop({ variant }) {
  const theme = THEMES[variant]
  if (!theme) return null
  return <Scatter {...theme} />
}
