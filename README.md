# SC-Couverture

Site vitrine de SC-Couverture, couvreur-zingueur basé à Bordeaux et
intervenant dans toute la Gironde : couverture et rénovation de toiture,
zinguerie, recherche de fuite, démoussage, charpente, fenêtres de toit.

React + Vite, **pré-rendu en HTML statique** : chaque page (accueil,
6 prestations, 37 communes, zones, mentions légales) est un vrai fichier HTML
avec son contenu, son titre, sa description et ses données structurées. Google
lit tout sans exécuter le JavaScript. Pas de serveur ni de base de données.

```bash
npm install
npm run dev        # développement sur http://localhost:5173
npm run build      # construit et pré-rend le site dans dist/
npm run preview    # sert dist/ pour vérifier le build
```

| Commande | Effet |
| --- | --- |
| `npm run dev` | Site en développement (rendu côté navigateur, sans les balises SEO) |
| `npm run build` | Build client + build SSR + pré-rendu de chaque page, sitemap, robots.txt |
| `npm run preview` | Sert `dist/` |
| `npm run lint` | Analyse statique (oxlint) |
| `npm run brand` | Régénère logo, favicons et aperçu de partage |

## Où modifier quoi

| Quoi | Où |
| --- | --- |
| Téléphone, email, adresse, horaires, SIREN, dirigeant | `src/lib/company.js` (un seul endroit, repris partout, JSON-LD compris) |
| Prestations (une page chacune) | `src/lib/services.js` |
| Communes (une page chacune) | `src/lib/cities.js` |
| Textes de l'accueil, FAQ | `src/lib/content.js` et `src/pages/Home.jsx` |
| Titres et descriptions des pages | `src/lib/routes.js` (accueil, zones) et `src/lib/services.js` |
| Données structurées (JSON-LD) | `src/lib/seo.js` |
| Photos | `src/lib/photos.js` (sources et licence : `PHOTOS.md`) |
| Couleurs, polices | `:root` en haut de `src/App.css` |
| Logo (tampon rond) | `scripts/brand.mjs`, puis `npm run brand` : badge, logo, favicons, aperçu de partage |

## Mettre en ligne

Le fichier [`render.yaml`](./render.yaml) décrit le déploiement : sur Render,
*New > Blueprint*, choisir ce dépôt. Chaque `git push` sur `main` redéploie.

Le jour où le nom de domaine est branché : changer `SITE_URL` dans
`render.yaml` (ou dans l'onglet *Environment* de Render), puis redéployer. Les
URL canoniques, le sitemap et le robots.txt suivent.

Le référencement (ce qui est fait, ce qui reste à faire) est détaillé dans
[`SEO.md`](./SEO.md).
