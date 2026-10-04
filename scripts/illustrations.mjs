// Génère l'identité visuelle de SC-Couverture : logo, favicons, icônes et
// aperçu de partage (les photos du site sont dans src/assets/photos).
// Usage : node scripts/illustrations.mjs
// Écrit src/assets/brand/logo.svg et public/favicon.svg,
// puis rasterise favicon PNG, icônes et aperçu de partage avec sharp.
import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const brandDir = join(root, 'src/assets/brand')
const publicDir = join(root, 'public')
const tmpDir = join(root, 'node_modules/.illustrations')
for (const dir of [brandDir, publicDir, tmpDir]) mkdirSync(dir, { recursive: true })

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
