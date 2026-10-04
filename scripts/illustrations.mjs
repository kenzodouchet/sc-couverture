// Génère les illustrations SVG du site SC-Couverture : images par défaut des
// emplacements photo, logo, favicon et aperçu de partage.
// Usage : node scripts/illustrations.mjs
// Écrit src/assets/photos/*.svg, src/assets/brand/logo.svg et public/favicon.svg,
// puis rasterise favicon PNG, icônes et aperçu de partage avec sharp.
import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const photosDir = join(root, 'src/assets/photos')
const brandDir = join(root, 'src/assets/brand')
const publicDir = join(root, 'public')
const tmpDir = join(root, 'node_modules/.illustrations')
for (const dir of [photosDir, brandDir, publicDir, tmpDir]) mkdirSync(dir, { recursive: true })

// Palette du site : bleu ardoise, cuivre, zinc.
const C = {
  slate: '#1E3A5F', slateDark: '#13283F', slateMid: '#2E5682', slateLight: '#6F8FB3',
  night: '#0F1C2B', copper: '#C8702E', copperDark: '#9E5520', copperLight: '#E59A5B',
  zinc: '#8A97A4', zincLight: '#B9C3CD', zincDark: '#5E6B78',
  tile: '#B9562F', tileDark: '#8E3F22', tileLight: '#D2744A',
  wall: '#F1EAE0', wallShade: '#DCD1C2', stone: '#E2D6C2',
  wood: '#B98552', woodDark: '#8A5E35', sky1: '#BFD3E8', sky2: '#EEF3F8',
  moss: '#6E8F45', mossDark: '#4F6B30', tarp: '#2F7FC1', grass: '#8FA97A', sun: '#F3C56B',
}

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>`

const sky = (w, h, id = 'sky', a = C.sky1, b = C.sky2) =>
  `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#${id})"/>`

const sun = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r * 1.7}" fill="${C.sun}" opacity=".2"/><circle cx="${x}" cy="${y}" r="${r}" fill="${C.sun}"/>`

const cloud = (x, y, s = 1, color = '#fff', o = .9) =>
  `<g fill="${color}" opacity="${o}"><ellipse cx="${x}" cy="${y}" rx="${70 * s}" ry="${26 * s}"/><ellipse cx="${x - 45 * s}" cy="${y + 6 * s}" rx="${45 * s}" ry="${20 * s}"/><ellipse cx="${x + 20 * s}" cy="${y - 16 * s}" rx="${42 * s}" ry="${28 * s}"/></g>`

const ground = (w, y, h, color = C.grass) => `<rect x="0" y="${y}" width="${w}" height="${h}" fill="${color}"/>`

/** Pin maritime en silhouette. */
const pine = (x, base, h, color = '#3F5A3A') => `
  <rect x="${x - h * .03}" y="${base - h * .6}" width="${h * .06}" height="${h * .6}" fill="${C.woodDark}"/>
  <ellipse cx="${x}" cy="${base - h * .66}" rx="${h * .22}" ry="${h * .12}" fill="${color}"/>
  <ellipse cx="${x - h * .12}" cy="${base - h * .76}" rx="${h * .15}" ry="${h * .1}" fill="${color}"/>
  <ellipse cx="${x + h * .13}" cy="${base - h * .8}" rx="${h * .16}" ry="${h * .11}" fill="${color}"/>`

/** Rangs de tuiles (ou d'ardoises) sur une surface rectangulaire. */
function tileRows(x, y, w, h, { color = C.tile, dark = C.tileDark, rows = 7, cols = 14, mossy = 0 } = {}) {
  const rh = h / rows
  const cw = w / cols
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>`
  for (let r = 0; r < rows; r++) {
    const yy = y + r * rh
    out += `<rect x="${x}" y="${yy + rh * .78}" width="${w}" height="${rh * .22}" fill="${dark}" opacity=".55"/>`
    for (let c = 0; c <= cols; c++) {
      const xx = x + c * cw + (r % 2 ? cw / 2 : 0)
      if (xx > x + w) continue
      out += `<path d="M${xx} ${yy} v${rh * .8}" stroke="${dark}" stroke-width="2" opacity=".5"/>`
    }
  }
  if (mossy) {
    const spots = [[.12, .5], [.3, .72], [.18, .85], [.42, .4], [.08, .25], [.36, .9], [.25, .3], [.46, .66]]
    out += `<g opacity=".95">` + spots.slice(0, Math.round(spots.length * mossy)).map(([fx, fy], i) =>
      `<ellipse cx="${x + fx * w}" cy="${y + fy * h}" rx="${w * (.05 + (i % 3) * .015)}" ry="${h * .06}" fill="${i % 2 ? C.moss : C.mossDark}"/>`).join('') + `</g>`
  }
  return out
}

/** Maison vue de face, toit à deux pans. */
function house(x, base, w, h, { roof = C.tile, roofDark = C.tileDark, slate = false, gutter = true, chimney = true, mossy = false } = {}) {
  const roofH = h * .62
  const eave = w * .07
  const ridge = x + w / 2
  const top = base - h - roofH
  const left = x - eave
  const right = x + w + eave
  const rows = 6
  const id = `clip${Math.round(x)}${Math.round(base)}`
  let tiles = ''
  for (let i = 1; i <= rows; i++) {
    const yy = top + roofH * i / (rows + 1)
    tiles += `<line x1="${left}" y1="${yy}" x2="${right}" y2="${yy}" stroke="${roofDark}" stroke-width="3" opacity=".55"/>`
  }
  for (let i = 0; i < 18; i++) {
    const xx = left + (right - left) * i / 17
    tiles += `<line x1="${xx}" y1="${top}" x2="${xx}" y2="${base - h}" stroke="${roofDark}" stroke-width="1.5" opacity="${slate ? .35 : .25}"/>`
  }
  const moss = mossy
    ? `<g fill="${C.moss}"><ellipse cx="${x + w * .2}" cy="${top + roofH * .7}" rx="${w * .09}" ry="${roofH * .09}"/><ellipse cx="${x + w * .34}" cy="${top + roofH * .5}" rx="${w * .07}" ry="${roofH * .08}"/><ellipse cx="${x + w * .08}" cy="${top + roofH * .88}" rx="${w * .08}" ry="${roofH * .07}"/></g>`
    : ''
  const windows = [.18, .58].map((f) => `<rect x="${x + w * f}" y="${base - h * .78}" width="${w * .2}" height="${h * .3}" rx="4" fill="${C.slateLight}"/><rect x="${x + w * f - 6}" y="${base - h * .8}" width="${w * .2 + 12}" height="8" fill="${C.wallShade}"/>`).join('')
  return `
  ${chimney ? `<rect x="${x + w * .66}" y="${top + roofH * .12}" width="${w * .09}" height="${roofH * .5}" fill="${C.stone}"/><rect x="${x + w * .65}" y="${top + roofH * .08}" width="${w * .11}" height="${roofH * .07}" fill="${C.zincDark}"/>` : ''}
  <rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${C.wall}"/>
  <rect x="${x + w * .64}" y="${base - h}" width="${w * .36}" height="${h}" fill="${C.wallShade}"/>
  <defs><clipPath id="${id}"><polygon points="${left},${base - h} ${ridge},${top} ${right},${base - h}"/></clipPath></defs>
  <polygon points="${left},${base - h} ${ridge},${top} ${right},${base - h}" fill="${roof}"/>
  <g clip-path="url(#${id})">${tiles}${moss}</g>
  <path d="M${left - 4} ${base - h + 2} L${ridge} ${top - 4} L${right + 4} ${base - h + 2}" fill="none" stroke="${roofDark}" stroke-width="7" stroke-linejoin="round"/>
  ${gutter ? `<rect x="${left - 8}" y="${base - h}" width="${right - left + 16}" height="12" rx="6" fill="${C.zinc}"/><rect x="${right - 4}" y="${base - h + 8}" width="10" height="${h - 8}" fill="${C.zinc}"/>` : ''}
  ${windows}
  <rect x="${x + w * .42}" y="${base - h * .42}" width="${w * .14}" height="${h * .42}" rx="4" fill="${C.slate}"/>`
}

/** Couvreur stylisé (casque, gilet cuivre). */
const roofer = (x, y, s = 1, flip = false) => `
  <g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
    <rect x="-9" y="10" width="18" height="34" rx="6" fill="${C.copper}"/>
    <rect x="-8" y="42" width="7" height="30" rx="3" fill="${C.slateDark}" transform="rotate(8 -4 42)"/>
    <rect x="1" y="42" width="7" height="30" rx="3" fill="${C.slateDark}" transform="rotate(-14 4 42)"/>
    <rect x="6" y="14" width="26" height="6" rx="3" fill="${C.copperDark}" transform="rotate(30 6 14)"/>
    <circle cx="0" cy="0" r="10" fill="#E8C4A0"/>
    <path d="M-12 -2 a12 12 0 0 1 24 0 z" fill="#F2C230"/>
    <rect x="-13" y="-3" width="26" height="4" rx="2" fill="#E0AE1E"/>
  </g>`

/** Échafaudage. */
function scaffold(x, base, w, h) {
  let out = ''
  const levels = 3
  for (let i = 0; i <= 2; i++) out += `<rect x="${x + i * w / 2 - 3}" y="${base - h}" width="6" height="${h}" fill="${C.zincDark}"/>`
  for (let l = 1; l <= levels; l++) {
    const yy = base - h * l / levels
    out += `<rect x="${x - 6}" y="${yy}" width="${w + 12}" height="10" fill="${C.wood}"/>`
    out += `<line x1="${x}" y1="${yy + h / levels}" x2="${x + w / 2}" y2="${yy + 10}" stroke="${C.zincDark}" stroke-width="3"/>`
  }
  return out
}

const write = (name, w, h, body) => writeFileSync(join(photosDir, `${name}.svg`), svg(w, h, body))

// --- Scènes ---------------------------------------------------------------

// Héros : rue de maisons girondines, couvreur au travail.
write('hero-couvreur-toiture-gironde', 1600, 900, `
  ${sky(1600, 900, 'sky', '#9DB9D8', '#E7EEF6')}
  ${sun(1280, 190, 60)}
  ${cloud(380, 160, 1.3)}${cloud(900, 110, .9)}
  ${pine(120, 760, 420)}${pine(1480, 760, 380)}
  ${ground(1600, 760, 140)}
  ${house(180, 760, 360, 230, { mossy: true })}
  ${house(640, 760, 420, 270, { roof: C.slateMid, roofDark: C.slateDark, slate: true })}
  ${house(1160, 760, 300, 210)}
  ${scaffold(600, 760, 160, 270)}
  ${roofer(760, 395, 1.6)}
  <rect x="0" y="760" width="1600" height="16" fill="#7A9468"/>
`)

// Couverture : pan de toiture en cours de réfection (liteaux + tuiles neuves).
write('couverture-refection-toiture', 1200, 800, `
  ${sky(1200, 800)}
  ${cloud(240, 120, 1)}${sun(1000, 130, 48)}
  <polygon points="80,700 600,230 1120,700" fill="${C.woodDark}"/>
  <defs><clipPath id="pan"><polygon points="80,700 600,230 1120,700"/></clipPath></defs>
  <g clip-path="url(#pan)">
    <rect x="0" y="200" width="600" height="520" fill="#D9E3EC"/>
    ${Array.from({ length: 12 }, (_, i) => `<rect x="0" y="${250 + i * 38}" width="600" height="10" fill="${C.wood}"/>`).join('')}
    ${Array.from({ length: 8 }, (_, i) => `<rect x="${60 + i * 70}" y="200" width="12" height="520" fill="${C.woodDark}" opacity=".7"/>`).join('')}
    ${tileRows(600, 200, 600, 520, { rows: 12, cols: 12 })}
  </g>
  <path d="M70 706 L600 222 L1130 706" fill="none" stroke="${C.tileDark}" stroke-width="16" stroke-linejoin="round"/>
  <rect x="40" y="700" width="1120" height="16" rx="8" fill="${C.zinc}"/>
  ${roofer(430, 420, 2, true)}
  <rect x="0" y="716" width="1200" height="84" fill="${C.wallShade}"/>
`)

// Zinguerie : gros plan sur une gouttière et une descente en zinc.
write('zinguerie-gouttiere-zinc', 1200, 800, `
  ${sky(1200, 800, 'sky', '#C9D8E8', '#F2F5F9')}
  <polygon points="0,0 1200,0 1200,300 0,420" fill="${C.tile}"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 150} ${400 - i * 13} L${i * 150 + 40} ${-20}" stroke="${C.tileDark}" stroke-width="4" opacity=".4"/>`).join('')}
  <polygon points="0,400 1200,280 1200,800 0,800" fill="${C.wall}"/>
  <polygon points="0,400 1200,280 1200,330 0,450" fill="${C.wallShade}"/>
  <path d="M-10 410 L1210 290 L1210 340 Q 1210 370 1180 372 L 20 492 Q -10 494 -10 464 Z" fill="${C.zinc}"/>
  <path d="M-10 410 L1210 290 L1210 304 L-10 424 Z" fill="${C.zincLight}"/>
  ${[180, 480, 780, 1080].map((x) => `<rect x="${x}" y="${470 - x * .1}" width="10" height="34" fill="${C.zincDark}"/>`).join('')}
  <rect x="860" y="420" width="64" height="380" fill="${C.zinc}"/>
  <rect x="860" y="420" width="18" height="380" fill="${C.zincLight}"/>
  ${[520, 650, 780].map((y) => `<rect x="850" y="${y}" width="84" height="16" rx="4" fill="${C.zincDark}"/>`).join('')}
  ${[[300, 560], [340, 620], [320, 690], [620, 540], [650, 610]].map(([x, y]) => `<path d="M${x} ${y} q 10 18 0 26 q -10 -8 0 -26 z" fill="#7FB3DB"/>`).join('')}
`)

// Fuite : toiture bâchée sous la pluie.
write('recherche-fuite-bachage-toiture', 1200, 800, `
  ${sky(1200, 800, 'sky', '#7D8FA3', '#C9D3DD')}
  ${cloud(260, 120, 1.6, '#5E6E80', 1)}${cloud(700, 90, 1.8, '#6B7B8D', 1)}${cloud(1060, 140, 1.3, '#5E6E80', 1)}
  ${Array.from({ length: 70 }, (_, i) => { const x = (i * 97) % 1200; const y = 170 + (i * 53) % 520; return `<line x1="${x}" y1="${y}" x2="${x - 10}" y2="${y + 30}" stroke="#E4ECF4" stroke-width="3" opacity=".7"/>` }).join('')}
  ${ground(1200, 700, 100, '#6F8A5E')}
  ${house(250, 700, 700, 280)}
  <path d="M430 360 L620 290 L760 420 L520 470 Z" fill="${C.tarp}" opacity=".95"/>
  <path d="M430 360 L620 290 L760 420 L520 470 Z" fill="none" stroke="#1F5E93" stroke-width="5"/>
  ${[[450, 368], [612, 300], [742, 416], [528, 462]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${C.copper}"/>`).join('')}
  ${roofer(820, 390, 1.6, true)}
`)

// Démoussage : toiture moitié moussue, moitié nettoyée.
write('demoussage-nettoyage-toiture', 1200, 800, `
  ${sky(1200, 800)}
  ${sun(1050, 120, 46)}${cloud(260, 110, 1)}
  ${pine(70, 780, 520)}
  <defs><clipPath id="roofd"><polygon points="120,700 600,220 1080,700"/></clipPath></defs>
  <g clip-path="url(#roofd)">
    ${tileRows(100, 200, 520, 520, { rows: 11, cols: 9, color: '#8E5A3E', dark: '#5F3A27', mossy: 1 })}
    ${tileRows(600, 200, 520, 520, { rows: 11, cols: 9 })}
    ${[[200, 520], [300, 610], [420, 460], [250, 400], [480, 640], [380, 560]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="48" ry="22" fill="${C.mossDark}"/>`).join('')}
  </g>
  <path d="M110 706 L600 212 L1090 706" fill="none" stroke="${C.tileDark}" stroke-width="16" stroke-linejoin="round"/>
  <line x1="600" y1="212" x2="600" y2="700" stroke="#fff" stroke-width="6" stroke-dasharray="14 12" opacity=".85"/>
  <rect x="80" y="700" width="1040" height="16" rx="8" fill="${C.zinc}"/>
  <g transform="translate(640 520) rotate(-30)"><rect x="-8" y="-120" width="16" height="140" rx="6" fill="${C.wood}"/><rect x="-46" y="16" width="92" height="26" rx="8" fill="${C.copper}"/>${Array.from({ length: 9 }, (_, i) => `<rect x="${-42 + i * 10}" y="40" width="4" height="22" fill="${C.copperDark}"/>`).join('')}</g>
  <rect x="0" y="716" width="1200" height="84" fill="${C.wallShade}"/>
`)

// Charpente : fermes et pannes.
write('charpente-traitement-reparation', 1200, 800, `
  ${sky(1200, 800, 'sky', '#D6E1EC', '#F4F7FA')}
  ${cloud(1000, 120, 1)}
  ${[0, 1, 2].map((i) => {
    const dx = i * 46
    const op = 1 - i * .25
    return `<g opacity="${op}" transform="translate(${dx} ${-dx * .4})">
      <path d="M160 640 L600 250 L1040 640 Z" fill="none" stroke="${C.woodDark}" stroke-width="30" stroke-linejoin="round"/>
      <line x1="600" y1="250" x2="600" y2="640" stroke="${C.wood}" stroke-width="24"/>
      <line x1="600" y1="560" x2="360" y2="470" stroke="${C.wood}" stroke-width="18"/>
      <line x1="600" y1="560" x2="840" y2="470" stroke="${C.wood}" stroke-width="18"/>
    </g>`
  }).reverse().join('')}
  <rect x="100" y="640" width="1000" height="40" fill="${C.stone}"/>
  <rect x="0" y="680" width="1200" height="120" fill="${C.wall}"/>
  ${roofer(460, 470, 1.7)}
`)

// Fenêtres de toit.
write('fenetre-de-toit-velux', 1200, 800, `
  ${sky(1200, 800)}
  ${tileRows(0, 120, 1200, 600, { rows: 13, cols: 16, color: C.slateMid, dark: C.slateDark })}
  ${[[260, 280], [720, 280]].map(([x, y]) => `
    <rect x="${x - 14}" y="${y - 14}" width="248" height="308" rx="8" fill="${C.zincDark}"/>
    <rect x="${x}" y="${y}" width="220" height="280" rx="4" fill="#9CC3E6"/>
    <path d="M${x} ${y + 280} L${x + 220} ${y}" stroke="#fff" stroke-width="10" opacity=".35"/>
    <rect x="${x - 14}" y="${y + 266}" width="248" height="26" fill="${C.zinc}"/>`).join('')}
  <rect x="0" y="720" width="1200" height="80" fill="${C.zinc}"/>
  <rect x="0" y="716" width="1200" height="10" fill="${C.zincLight}"/>
`)

// Mission : maison et ses zingueries, vue d'ensemble.
write('maison-toiture-zinguerie', 1000, 800, `
  ${sky(1000, 800, 'sky', '#AFC6DE', '#EEF3F8')}
  ${cloud(200, 120, 1)}${sun(820, 140, 44)}
  ${ground(1000, 660, 140)}
  ${pine(900, 660, 400)}
  ${house(160, 660, 620, 300, { roof: C.slateMid, roofDark: C.slateDark, slate: true })}
`)

// Méthode : utilitaire d'artisan et échelle au pied d'une maison.
write('methode-chantier-couvreur', 1200, 800, `
  ${sky(1200, 800)}
  ${cloud(300, 120, 1.2)}${sun(1060, 120, 44)}
  ${ground(1200, 640, 160, '#A9B4BF')}
  ${house(560, 640, 520, 280)}
  <line x1="600" y1="640" x2="700" y2="250" stroke="${C.zincDark}" stroke-width="10"/>
  <line x1="650" y1="640" x2="750" y2="250" stroke="${C.zincDark}" stroke-width="10"/>
  ${Array.from({ length: 12 }, (_, i) => `<line x1="${604 + i * 8}" y1="${625 - i * 31}" x2="${654 + i * 8}" y2="${625 - i * 31}" stroke="${C.zincDark}" stroke-width="6"/>`).join('')}
  <g transform="translate(60 470)">
    <rect x="0" y="40" width="420" height="140" rx="16" fill="#fff"/>
    <path d="M300 40 h80 l60 70 v70 h-140 z" fill="#F4F6F8"/>
    <path d="M320 54 h52 l44 52 h-96 z" fill="#9CC3E6"/>
    <rect x="0" y="120" width="440" height="24" fill="${C.slate}"/>
    <rect x="0" y="144" width="440" height="10" fill="${C.copper}"/>
    <circle cx="90" cy="180" r="34" fill="#2A2F36"/><circle cx="90" cy="180" r="14" fill="${C.zinc}"/>
    <circle cx="360" cy="180" r="34" fill="#2A2F36"/><circle cx="360" cy="180" r="14" fill="${C.zinc}"/>
    <rect x="20" y="0" width="260" height="14" rx="6" fill="${C.zincDark}"/>
    <rect x="20" y="20" width="260" height="10" rx="5" fill="${C.zincDark}"/>
  </g>
  ${roofer(760, 330, 1.5, true)}
`)

// Expertise : toiture en ardoise avec lucarne zinc.
write('expertise-ardoise-lucarne', 1000, 800, `
  ${sky(1000, 800, 'sky', '#C3D4E6', '#F1F5F9')}
  ${tileRows(0, 140, 1000, 600, { rows: 14, cols: 14, color: '#3B4C60', dark: '#24313F' })}
  <polygon points="380,330 500,230 620,330" fill="${C.zinc}"/>
  <polygon points="380,330 500,230 620,330" fill="none" stroke="${C.zincLight}" stroke-width="6"/>
  <rect x="400" y="330" width="200" height="200" fill="${C.wall}"/>
  <rect x="440" y="360" width="120" height="150" rx="60" fill="#9CC3E6"/>
  <rect x="490" y="360" width="20" height="150" fill="${C.wall}" opacity=".6"/>
  <rect x="380" y="520" width="240" height="20" fill="${C.zincDark}"/>
  <path d="M500 220 v-20" stroke="${C.copper}" stroke-width="8"/><circle cx="500" cy="196" r="10" fill="${C.copper}"/>
  <rect x="0" y="740" width="1000" height="60" fill="${C.zinc}"/>
`)

// --- Marque ---------------------------------------------------------------

/**
 * Emblème SC-Couverture : un toit à deux pans (chevron) avec son épi de
 * faîtage cuivre et sa cheminée, deux rangs d'ardoises, et la gouttière zinc
 * qui recueille une goutte. `fg` colore le trait principal, `bg` un fond
 * arrondi optionnel (favicon).
 */
function emblemBody({ fg = '#fff', accent = C.copper } = {}) {
  return `
    <path d="M70 268 L256 104 L442 268" fill="none" stroke="${fg}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="256" cy="104" r="26" fill="${accent}"/>
    <path d="M148 262 L256 168 L364 262" fill="none" stroke="${fg}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>
    <rect x="336" y="126" width="40" height="78" rx="8" fill="${accent}"/>
    <path d="M126 312 H386" stroke="${fg}" stroke-width="22" stroke-linecap="round" opacity=".8"/>
    <path d="M126 356 H386" stroke="${fg}" stroke-width="22" stroke-linecap="round" opacity=".55"/>
    <path d="M70 408 H420 a22 22 0 0 0 22 -22" fill="none" stroke="${accent}" stroke-width="30" stroke-linecap="round"/>
    <path d="M442 386 V440" stroke="${accent}" stroke-width="30" stroke-linecap="round"/>
    <path d="M442 462 q 16 22 0 34 q -16 -12 0 -34 z" fill="${accent}"/>`
}

function emblem({ bg = null, pad = 0, ...colors } = {}) {
  const s = 512
  const back = bg ? `<rect width="${s}" height="${s}" rx="${s * .22}" fill="${bg}"/>` : ''
  const t = pad ? ` transform="translate(${pad} ${pad}) scale(${(s - 2 * pad) / s})"` : ''
  return svg(s, s, `${back}<g${t}>${emblemBody(colors)}</g>`)
}

writeFileSync(join(brandDir, 'logo.svg'), emblem())
writeFileSync(join(brandDir, 'logo-couleur.svg'), emblem({ fg: C.slate }))
writeFileSync(join(publicDir, 'favicon.svg'), emblem({ bg: C.slate, pad: 40 }))
writeFileSync(join(tmpDir, 'icon.svg'), emblem({ bg: C.slate, pad: 56 }))

// Aperçu de partage 1200×630 (Facebook, WhatsApp, LinkedIn).
const og = svg(1200, 630, `
  <rect width="1200" height="630" fill="${C.slate}"/>
  <rect x="0" y="560" width="1200" height="70" fill="${C.slateDark}"/>
  <rect x="0" y="556" width="1200" height="8" fill="${C.copper}"/>
  <g transform="translate(70 130) scale(.62)">${emblemBody()}</g>
  <text x="430" y="280" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="84" fill="#fff">SC-Couverture</text>
  <text x="432" y="350" font-family="Helvetica, Arial, sans-serif" font-size="38" fill="${C.copperLight}">Couvreur-zingueur en Gironde</text>
  <text x="432" y="410" font-family="Helvetica, Arial, sans-serif" font-size="27" fill="#C9D7E6">Toiture · Zinguerie · Fuites · Démoussage · Charpente</text>
  <text x="70" y="606" font-family="Helvetica, Arial, sans-serif" font-size="25" fill="#C9D7E6">Bordeaux · Bassin d’Arcachon · Médoc · Libournais · Sud-Gironde · Devis gratuit</text>
`)
writeFileSync(join(tmpDir, 'og.svg'), og)

// Rasterisation avec sharp (moteur librsvg, fidèle au rendu navigateur).
const sharp = (await import('sharp')).default
const png = (src, size, out) => sharp(src, { density: 300 }).resize(size, size).png().toFile(out)
await png(join(tmpDir, 'icon.svg'), 180, join(publicDir, 'apple-touch-icon.png'))
await png(join(tmpDir, 'icon.svg'), 512, join(publicDir, 'icon-512.png'))
await png(join(tmpDir, 'icon.svg'), 192, join(publicDir, 'icon-192.png'))
await png(join(publicDir, 'favicon.svg'), 32, join(publicDir, 'favicon-32.png'))
await sharp(join(tmpDir, 'og.svg'), { density: 96 }).resize(1200, 630).jpeg({ quality: 86 }).toFile(join(publicDir, 'apercu.jpg'))
console.log('Illustrations générées.')
