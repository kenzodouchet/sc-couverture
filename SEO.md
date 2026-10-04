# Référencement — SC-Couverture

## Ce que le site fait déjà

**Architecture**
- **46 pages indexables pré-rendues en HTML** : accueil, 6 pages prestation,
  1 page zones, 37 pages commune (`/couvreur-merignac/`, `/couvreur-arcachon/`…).
  Une page par intention de recherche : « couvreur Mérignac », « zingueur
  Bordeaux », « fuite toiture Gironde », « démoussage toiture »…
- Chaque page commune a un **texte propre** (habitat local, contraintes du
  secteur, communes voisines) pour ne pas être vue comme une page satellite.
- **Maillage interne** dense : chaque prestation renvoie vers toutes les
  communes, chaque commune vers toutes les prestations et ses voisines, le pied
  de page vers les prestations et les principales communes.
- **Fil d'Ariane** visible sur les pages intérieures.

**Balises**
- Un seul `<h1>` par page, avec métier + lieu ; `<h2>`/`<h3>` hiérarchisés.
- `title` ≤ 60 caractères et `meta description` ≤ 160 caractères, uniques par page.
- `canonical`, Open Graph complet, image de partage 1200×630.
- `robots` : `index, follow, max-image-preview:large` ; mentions légales et 404
  en `noindex`.
- `sitemap.xml` et `robots.txt` générés au build avec toutes les pages.

**Données structurées (JSON-LD)**, sur chaque page :
- `RoofingContractor` / `LocalBusiness` : coordonnées, horaires, zone
  desservie (Gironde + 37 communes), catalogue de prestations.
- `WebSite`, `WebPage`, `BreadcrumbList`.
- `Service` sur les pages prestation et commune.
- `FAQPage` sur l'accueil et les pages prestation.

**Performance** (critère de classement)
- HTML statique servi directement, photos WebP de moins de 220 ko, image
  d'en-tête préchargée, cache
  d'un an sur les fichiers versionnés, pas de cookie.

## À faire avant d'annoncer le site (indispensable)

| Élément | Où | Pourquoi |
| --- | --- | --- |
| **Téléphone, email, adresse, SIREN, dirigeant** | `src/lib/company.js` | Les valeurs actuelles sont des emplacements (`06 00 00 00 00`). Google compare ces données avec la fiche Google Business : elles doivent être identiques, au caractère près. |
| **Nom de domaine** | `SITE_URL` dans `render.yaml` | Acheter `sc-couverture.fr` (ou équivalent), le brancher sur Render (*Settings > Custom Domains*), puis changer `SITE_URL`. |
| **Assurance décennale** | `src/lib/content.js`, `src/pages/City.jsx` | Le site l'annonce (obligatoire pour un couvreur) : vérifier qu'elle est bien en cours. |
| **Horaires** | `src/lib/company.js` + `openingHoursSpecification` dans `src/lib/seo.js` | Lun-Ven 8h-18h30, Sam 9h-12h par défaut. |

## À faire juste après la mise en ligne

1. **Google Search Console** : ajouter le domaine, soumettre
   `https://<domaine>/sitemap.xml`, demander l'indexation de l'accueil.
2. **Fiche Google Business Profile** « SC-Couverture », catégorie principale
   *Couvreur*, secondaires *Entreprise de zinguerie*, *Entrepreneur en
   gouttières* ; zone desservie : Gironde ; lien vers le site. C'est elle qui
   apparaît dans le « pack local » (la carte) : c'est le levier n°1.
3. **Avis clients** : demander un avis Google après chaque chantier, si
   possible avec la commune et le type de travaux dans le texte.
4. **Vraies photos** de chantier pour remplacer les photos Unsplash
   (`src/lib/photos.js` et la liste `ITEMS` de `src/components/Showcase.jsx`,
   sources dans `PHOTOS.md`),
   nommées avec mots-clés (`refection-toiture-tuile-canal-talence.webp`) et
   légendées avec la commune. Google Images et les visiteurs préfèrent le réel.
5. **Annuaires cohérents** : Pages Jaunes, annuaire CMA, Houzz, Habitatpresto…
   mêmes nom, adresse, téléphone que le site.

## Plus tard

- **Note client** : quand la fiche Google a de vrais avis, on peut ajouter un
  `aggregateRating` au JSON-LD (`src/lib/seo.js`). **Jamais de note inventée** :
  pénalité Google et sanction DGCCRF (pratique commerciale trompeuse).
- **Nouvelles communes** : ajouter une entrée dans `src/lib/cities.js` avec un
  vrai texte `habitat` / `climate` ; la page, le sitemap et les liens suivent.
- **Articles conseils** (blog) : « Prix d'une réfection de toiture en
  Gironde », « Zinc ou alu pour ses gouttières »… attirent des recherches
  informationnelles et renforcent l'autorité du site.
