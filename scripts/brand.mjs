// Génère l'identité visuelle de SC-Couverture à partir du tampon rond
// (maquette « Badges artisan », modèle 1) : badge complet, logo compact,
// favicons, icônes et aperçu de partage.
// Usage : npm run brand
//
// Les textes sont convertis en tracés (police Barlow Condensed, licence OFL,
// dans scripts/fonts) : un SVG affiché en <img> ne charge pas de police web,
// et le rendu doit être identique partout.
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import opentype from 'opentype.js'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const brandDir = join(root, 'src/assets/brand')
const publicDir = join(root, 'public')
const tmpDir = join(root, 'node_modules/.brand')
for (const dir of [brandDir, publicDir, tmpDir]) mkdirSync(dir, { recursive: true })

const loadFont = (file) => {
  const buffer = readFileSync(join(root, 'scripts/fonts', file))
  return opentype.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength))
}
const extraBold = loadFont('BarlowCondensed-ExtraBold.ttf')
const bold = loadFont('BarlowCondensed-Bold.ttf')

// Couleurs du site. `ink` remplace le zinc de la maquette.
const C = { ink: '#1E3A5F', inkDark: '#13283F', copper: '#C8702E', copperLight: '#F0A868', cream: '#EFE8DA', white: '#FFFFFF' }

const svg = (w, h, body, viewBox = `0 0 ${w} ${h}`) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${w}" height="${h}">${body}</svg>`

const round = (n) => Math.round(n * 100) / 100

/** Texte droit, centré sur x, converti en tracé. */
function textPath(font, text, x, y, size, fill, letterSpacing = 0) {
  const glyphs = font.stringToGlyphs(text)
  const scale = size / font.unitsPerEm
  const width = glyphs.reduce((sum, g) => sum + g.advanceWidth * scale, 0) + letterSpacing * (glyphs.length - 1)
  let cursor = x - width / 2
  let d = ''
  for (const glyph of glyphs) {
    d += glyph.getPath(cursor, y, size).toPathData(2)
    cursor += glyph.advanceWidth * scale + letterSpacing
  }
  return `<path d="${d}" fill="${fill}"/>`
}

/**
 * Texte disposé sur un arc de cercle, centré en haut (`top`) ou en bas.
 * En haut, la ligne de base suit l'arc et les lettres pointent vers
 * l'extérieur ; en bas, elles pointent vers le centre et se lisent à l'endroit.
 */
function arcText(font, text, cx, cy, r, size, fill, letterSpacing, top) {
  const glyphs = font.stringToGlyphs(text)
  const scale = size / font.unitsPerEm
  const advances = glyphs.map((g) => g.advanceWidth * scale)
  const width = advances.reduce((a, b) => a + b, 0) + letterSpacing * (glyphs.length - 1)
  let s = -width / 2
  return glyphs.map((glyph, i) => {
    const mid = s + advances[i] / 2
    s += advances[i] + letterSpacing
    const angle = top ? -Math.PI / 2 + mid / r : Math.PI / 2 - mid / r
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    const rotate = (angle * 180) / Math.PI + (top ? 90 : -90)
    // Glyphe dessiné à l'origine puis décalé par transform : opentype.js
    // produit parfois « NaN » pour une petite abscisse négative.
    const d = glyph.getPath(0, 0, size).toPathData(2)
    return `<path transform="translate(${round(x)} ${round(y)}) rotate(${round(rotate)}) translate(${round(-advances[i] / 2)} 0)" d="${d}" fill="${fill}"/>`
  }).join('')
}

/** Tampon rond complet (viewBox 200×200). */
function badgeBody({ fill = C.ink } = {}) {
  return `
    <circle cx="100" cy="100" r="97" fill="${fill}"/>
    <circle cx="100" cy="100" r="90" fill="none" stroke="${C.cream}" stroke-width="1.5"/>
    <circle cx="100" cy="100" r="60" fill="none" stroke="${C.cream}" stroke-width="1.5"/>
    ${arcText(extraBold, 'SC-COUVERTURE', 100, 100, 70, 18, C.cream, 3, true)}
    ${arcText(bold, 'TOITURE · ZINGUERIE', 100, 100, 82, 13, C.cream, 3, false)}
    <circle cx="24" cy="100" r="3.5" fill="${C.copper}"/>
    <circle cx="176" cy="100" r="3.5" fill="${C.copper}"/>
    <polyline points="68,100 100,72 132,100" fill="none" stroke="${C.copper}" stroke-width="7" stroke-linecap="square"/>
    ${textPath(extraBold, 'SC', 100, 134, 38, C.white)}`
}

/** Cœur du tampon, lisible en petit (viewBox 64×64) : toit cuivre et SC. */
function markBody({ fill = C.ink, ring = true } = {}) {
  return ring
    ? `<circle cx="32" cy="32" r="32" fill="${fill}"/>
    <circle cx="32" cy="32" r="28" fill="none" stroke="${C.cream}" stroke-width="1.2"/>
    <polyline points="17,30 32,17 47,30" fill="none" stroke="${C.copper}" stroke-width="5" stroke-linecap="square"/>
    ${textPath(extraBold, 'SC', 32, 51, 22, C.white)}`
    : `<circle cx="32" cy="32" r="32" fill="${fill}"/>
    <polyline points="15,30 32,15 49,30" fill="none" stroke="${C.copper}" stroke-width="7" stroke-linecap="square"/>
    ${textPath(extraBold, 'SC', 32, 54, 26, C.white)}`
}

const badge = (size, options) => svg(size, size, badgeBody(options), '0 0 200 200')
const mark = (size, options) => svg(size, size, markBody(options), '0 0 64 64')

// Site : badge complet (pied de page) et logo compact (en-tête). Sur les
// fonds bleus du site, la pastille prend un bleu plus profond pour ressortir.
writeFileSync(join(brandDir, 'badge.svg'), badge(200, { fill: C.inkDark }))
writeFileSync(join(brandDir, 'logo.svg'), mark(64, { fill: C.inkDark }))
// Onglet du navigateur : version sans filet intérieur, lisible à 16 px.
writeFileSync(join(publicDir, 'favicon.svg'), mark(64, { ring: false }))
// Fichiers de marque à part (camion, devis, réseaux sociaux).
writeFileSync(join(brandDir, 'badge-bleu.svg'), badge(200))

// Aperçu de partage 1200×630 (Facebook, WhatsApp, LinkedIn).
const og = svg(1200, 630, `
  <rect width="1200" height="630" fill="${C.ink}"/>
  <rect x="0" y="560" width="1200" height="70" fill="${C.inkDark}"/>
  <rect x="0" y="556" width="1200" height="8" fill="${C.copper}"/>
  <g transform="translate(80 90) scale(1.9)">${badgeBody({ fill: C.inkDark })}</g>
  ${textPath(extraBold, 'SC-COUVERTURE', 790, 270, 104, C.white, 4)}
  ${textPath(bold, 'COUVREUR · ZINGUEUR EN GIRONDE', 790, 340, 40, C.copperLight, 3)}
  <text x="790" y="410" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#C9D7E6">Toiture · Zinguerie · Fuites · Démoussage · Charpente</text>
  <text x="600" y="606" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="25" fill="#C9D7E6">Bordeaux · Bassin d’Arcachon · Médoc · Libournais · Sud-Gironde · Devis gratuit</text>
`)
writeFileSync(join(tmpDir, 'og.svg'), og)

// Rasterisation (moteur librsvg, fidèle au rendu navigateur).
const png = (svgText, size, out) => sharp(Buffer.from(svgText), { density: 300 }).resize(size, size).png().toFile(out)
await png(badge(512), 180, join(publicDir, 'apple-touch-icon.png'))
await png(badge(512), 192, join(publicDir, 'icon-192.png'))
await png(badge(512), 512, join(publicDir, 'icon-512.png'))
await png(mark(64, { ring: false }), 32, join(publicDir, 'favicon-32.png'))
await sharp(Buffer.from(og), { density: 96 }).resize(1200, 630).jpeg({ quality: 86 }).toFile(join(publicDir, 'apercu.jpg'))
console.log('Marque générée.')
