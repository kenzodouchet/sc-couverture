// Pré-rendu statique : après `vite build` (client) et `vite build --ssr`,
// écrit un fichier HTML complet par page, puis sitemap.xml, robots.txt et
// site.webmanifest. Google reçoit ainsi tout le contenu et les balises de
// chaque page sans avoir à exécuter le JavaScript.
//
// L'adresse du site vient de la variable SITE_URL (voir render.yaml).
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { DEFAULT_SITE_URL, COMPANY } from '../src/lib/company.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const site = (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '')

const { render, ROUTES, NOT_FOUND } = await import(pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href)
const template = readFileSync(join(dist, 'index.html'), 'utf8')

// Le <title> générique du modèle ne sert qu'en développement.
const page = (head, html) => template
  .replace(/\s*<title>[^<]*<\/title>/, '')
  .replace(/\s*<!--\n[\s\S]*?-->/, '')
  .replace('<!--app-head-->', head)
  .replace('<!--app-html-->', html)

for (const route of [...ROUTES, NOT_FOUND]) {
  const { head, html } = render(route, site)
  const file = route.path.endsWith('.html') ? join(dist, route.path) : join(dist, route.path, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page(head, html))
}

const today = new Date().toISOString().slice(0, 10)
const urls = ROUTES.filter((route) => !route.noindex).map((route) =>
  `  <url>\n    <loc>${site}${route.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${route.priority ?? '0.5'}</priority>\n  </url>`)
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`)

writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)

writeFileSync(join(dist, 'site.webmanifest'), JSON.stringify({
  name: `${COMPANY.name} – Couvreur zingueur en Gironde`,
  short_name: COMPANY.name,
  start_url: '/',
  display: 'browser',
  background_color: '#ffffff',
  theme_color: '#1E3A5F',
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
  ],
}, null, 2))

rmSync(join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`Pré-rendu : ${ROUTES.length} pages + 404 pour ${site}`)
