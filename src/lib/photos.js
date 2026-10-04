import hero from '../assets/photos/couvreur-toiture-tuiles-gironde.webp'
import couverture from '../assets/photos/pose-tuiles-refection-toiture.webp'
import zinguerie from '../assets/photos/descente-gouttiere-zinc.webp'
import fuite from '../assets/photos/reparation-toiture-couvreurs.webp'
import demoussage from '../assets/photos/mousse-tuiles-demoussage-toiture.webp'
import charpente from '../assets/photos/charpente-bois-sous-toiture.webp'
import velux from '../assets/photos/fenetre-de-toit-tuiles.webp'
import lucarne from '../assets/photos/lucarne-zinc-toiture-tuiles.webp'
import ardoise from '../assets/photos/toiture-ardoise-lucarnes.webp'
import village from '../assets/photos/toits-tuiles-village-gironde.webp'
import tuileAncienne from '../assets/photos/couvreur-tuile-canal-ancienne.webp'
import tuileCanal from '../assets/photos/tuile-canal-terre-cuite.webp'

/**
 * Images du site, un emplacement par clé.
 *
 * Photos Unsplash (licence Unsplash : usage commercial libre, sans
 * attribution obligatoire ; sources dans PHOTOS.md). Ce ne sont pas des
 * chantiers de SC-Couverture : les remplacer par de vraies photos dès que
 * possible. Déposer le fichier (WebP, 300 ko au plus, nom avec mots-clés,
 * ex. « refection-toiture-tuile-merignac.webp ») dans src/assets/photos/ et
 * changer l'import correspondant.
 */
export const PHOTOS = {
  hero,
  couverture,
  zinguerie,
  fuite,
  demoussage,
  charpente,
  velux,
  lucarne,
  ardoise,
  village,
  tuileAncienne,
  tuileCanal,
  mission: village,
  methode: tuileAncienne,
  expertise: ardoise,
}
