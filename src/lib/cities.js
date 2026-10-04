/**
 * Communes desservies : chacune a sa page /couvreur-<slug>/, qui vise les
 * recherches « couvreur + ville », « zingueur + ville », « fuite toiture +
 * ville ».
 *
 * Pour que Google ne les prenne pas pour des pages satellites (pénalisées),
 * chaque commune a un texte propre : l'habitat local, ce qui use les toitures
 * à cet endroit, les communes voisines. En ajouter une : copier une entrée,
 * écrire un vrai `habitat` et un vrai `climate`, choisir le secteur.
 */
export const AREAS = {
  metropole: {
    name: 'Bordeaux Métropole',
    intro: 'Échoppes en pierre, maisons de ville, pavillons et immeubles : le cœur de notre activité.',
  },
  bassin: {
    name: 'Bassin d’Arcachon & Val de l’Eyre',
    intro: 'Villas sous les pins, embruns et vent d’ouest : des toitures et des zingueries très sollicitées.',
  },
  medoc: {
    name: 'Médoc',
    intro: 'Châteaux, chais, longères et maisons de bourg, du vignoble jusqu’à la côte atlantique.',
  },
  libournais: {
    name: 'Libournais & Entre-deux-Mers',
    intro: 'Tuile canal, pierre de taille et bâtiments viticoles, de Libourne à Créon.',
  },
  sud: {
    name: 'Sud-Gironde & Graves',
    intro: 'Des Graves au Langonnais : maisons landaises, échoppes et bâtiments agricoles.',
  },
  nord: {
    name: 'Haute-Gironde & Cubzaguais',
    intro: 'Du Cubzaguais au Blayais, le long de l’estuaire : vent, humidité et maisons de pierre.',
  },
}

export const CITIES = [
  // --- Bordeaux Métropole -------------------------------------------------
  {
    slug: 'bordeaux', name: 'Bordeaux', postalCode: '33000', area: 'metropole',
    habitat: 'Échoppes et maisons de ville en pierre blonde, toitures en tuile canal à faible pente, chéneaux encaissés en zinc derrière les corniches, immeubles en ardoise et zinc dans le centre classé : à Bordeaux, la zinguerie compte autant que la tuile.',
    climate: 'Dans le périmètre UNESCO et les secteurs sauvegardés, les travaux visibles depuis la rue passent par l’avis de l’architecte des Bâtiments de France : nous préparons avec vous le dossier de déclaration préalable.',
    nearby: ['le-bouscat', 'talence', 'begles', 'merignac', 'lormont', 'cenon', 'floirac', 'bruges'],
  },
  {
    slug: 'merignac', name: 'Mérignac', postalCode: '33700', area: 'metropole',
    habitat: 'Pavillons des années 1960 à 1990 en tuile mécanique ou romane, échoppes du côté d’Arlac et de Capeyron, maisons récentes à Beutre et au Burck.',
    climate: 'Beaucoup de toitures de pavillons atteignent l’âge d’une première réfection : liteaux fatigués, absence d’écran sous-toiture, faîtages scellés au mortier qui se fissurent.',
    nearby: ['bordeaux', 'pessac', 'le-haillan', 'eysines', 'saint-medard-en-jalles', 'martignas-sur-jalle'],
  },
  {
    slug: 'pessac', name: 'Pessac', postalCode: '33600', area: 'metropole',
    habitat: 'Maisons de quartier en tuile romane, cité Frugès aux toits-terrasses, pavillons de l’Alouette et de Saige, propriétés sous les pins du côté de Cap de Bos.',
    climate: 'Les pins des quartiers ouest remplissent vite gouttières et noues d’aiguilles : nettoyage de zinguerie et démoussage y sont plus fréquents qu’ailleurs dans la métropole.',
    nearby: ['talence', 'merignac', 'gradignan', 'canejan', 'cestas', 'bordeaux'],
  },
  {
    slug: 'talence', name: 'Talence', postalCode: '33400', area: 'metropole',
    habitat: 'Échoppes doubles et simples, chartreuses, maisons bourgeoises autour du parc Peixotto et pavillons du côté de Thouars : tuile canal, ardoise et beaucoup de zinc.',
    climate: 'Sur les échoppes mitoyennes, la toiture et les chéneaux se partagent souvent avec les voisins : nous traitons les raccords en limite de propriété avec soin et prévenons le voisinage avant le chantier.',
    nearby: ['bordeaux', 'pessac', 'gradignan', 'villenave-d-ornon', 'begles'],
  },
  {
    slug: 'begles', name: 'Bègles', postalCode: '33130', area: 'metropole',
    habitat: 'Échoppes ouvrières, maisons de bord de Garonne et anciens ateliers reconvertis, avec leurs toitures en tuile canal et leurs verrières.',
    climate: 'La proximité de la Garonne et des berges humides favorise la mousse sur les versants nord : un démoussage suivi d’un hydrofuge prolonge la vie des tuiles.',
    nearby: ['bordeaux', 'talence', 'villenave-d-ornon', 'floirac'],
  },
  {
    slug: 'villenave-d-ornon', name: 'Villenave-d’Ornon', postalCode: '33140', area: 'metropole',
    habitat: 'Lotissements pavillonnaires, maisons girondines et quelques domaines viticoles des Graves.',
    climate: 'Des toitures de pavillons des années 1970-1980 à rénover et des gouttières à remplacer, souvent encore en PVC d’origine.',
    nearby: ['begles', 'talence', 'gradignan', 'cadaujac', 'leognan'],
  },
  {
    slug: 'gradignan', name: 'Gradignan', postalCode: '33170', area: 'metropole',
    habitat: 'Maisons individuelles sous les arbres, propriétés anciennes du bourg et résidences des années 1970.',
    climate: 'Commune très boisée : feuilles et aiguilles bouchent les gouttières chaque automne, la mousse s’installe sur les pans ombragés.',
    nearby: ['talence', 'pessac', 'villenave-d-ornon', 'canejan', 'leognan', 'cestas'],
  },
  {
    slug: 'le-bouscat', name: 'Le Bouscat', postalCode: '33110', area: 'metropole',
    habitat: 'Maisons bourgeoises, chartreuses et échoppes : ardoise, tuile canal, lucarnes et zinguerie ouvragée.',
    climate: 'Beaucoup de toitures anciennes à forte valeur patrimoniale, où l’on privilégie la réparation et la reprise à l’identique.',
    nearby: ['bordeaux', 'bruges', 'eysines', 'le-haillan', 'merignac'],
  },
  {
    slug: 'bruges', name: 'Bruges', postalCode: '33520', area: 'metropole',
    habitat: 'Pavillons, maisons récentes et petits collectifs entre la rocade et les marais.',
    climate: 'L’humidité des marais de Bruges favorise mousses et lichens sur les toitures orientées au nord.',
    nearby: ['le-bouscat', 'bordeaux', 'eysines', 'blanquefort'],
  },
  {
    slug: 'eysines', name: 'Eysines', postalCode: '33320', area: 'metropole',
    habitat: 'Maisons de maraîchers, pavillons et lotissements récents, en tuile mécanique pour la plupart.',
    climate: 'Rénovation de toitures de pavillons, remplacement de gouttières et pose de fenêtres de toit pour l’aménagement des combles.',
    nearby: ['le-haillan', 'le-bouscat', 'bruges', 'blanquefort', 'saint-medard-en-jalles', 'merignac'],
  },
  {
    slug: 'le-haillan', name: 'Le Haillan', postalCode: '33185', area: 'metropole',
    habitat: 'Quartiers pavillonnaires et maisons individuelles, à deux pas de la zone aéronautique.',
    climate: 'Remplacement de tuiles, réfection de faîtages et zinguerie sur des toitures de 30 à 50 ans.',
    nearby: ['eysines', 'merignac', 'saint-medard-en-jalles', 'le-bouscat'],
  },
  {
    slug: 'saint-medard-en-jalles', name: 'Saint-Médard-en-Jalles', postalCode: '33160', area: 'metropole',
    habitat: 'Grande commune entre forêt et Jalle : villas sous les pins, maisons de bourg, quartiers résidentiels.',
    climate: 'Les pins maritimes très présents imposent un entretien régulier des gouttières et un démoussage plus fréquent.',
    nearby: ['le-haillan', 'eysines', 'martignas-sur-jalle', 'blanquefort', 'merignac'],
  },
  {
    slug: 'blanquefort', name: 'Blanquefort', postalCode: '33290', area: 'metropole',
    habitat: 'Porte du Médoc : maisons de bourg, propriétés viticoles et pavillons.',
    climate: 'Entre la Jalle et les marais, l’humidité met les toitures à l’épreuve ; les chais et dépendances demandent aussi des couvertures de grande surface.',
    nearby: ['bruges', 'eysines', 'saint-medard-en-jalles', 'le-bouscat'],
  },
  {
    slug: 'lormont', name: 'Lormont', postalCode: '33310', area: 'metropole',
    habitat: 'Maisons du vieux bourg accrochées au coteau, pavillons et résidences de la rive droite.',
    climate: 'Sur le coteau exposé, le vent d’ouest soulève tuiles et faîtages : faîtage ventilé fixé mécaniquement et tuiles crochetées sont recommandés.',
    nearby: ['cenon', 'bordeaux', 'floirac', 'ambares-et-lagrave'],
  },
  {
    slug: 'cenon', name: 'Cenon', postalCode: '33150', area: 'metropole',
    habitat: 'Échoppes du bas Cenon, maisons du coteau et pavillons des hauts de Garonne.',
    climate: 'Des toitures exposées au vent sur les hauteurs, des échoppes à chéneaux zinc dans le bas de la commune.',
    nearby: ['lormont', 'floirac', 'bordeaux'],
  },
  {
    slug: 'floirac', name: 'Floirac', postalCode: '33270', area: 'metropole',
    habitat: 'Maisons des coteaux, échoppes de la plaine et quartiers neufs des bords de Garonne.',
    climate: 'Réparations de toitures en tuile canal, zinguerie et démoussage sur les pans ombragés des coteaux.',
    nearby: ['cenon', 'bordeaux', 'begles', 'lormont'],
  },
  {
    slug: 'ambares-et-lagrave', name: 'Ambarès-et-Lagrave', postalCode: '33440', area: 'metropole',
    habitat: 'Maisons de bourg, longères et lotissements entre la Dordogne et la Garonne.',
    climate: 'La presqu’île est humide et ventée : contrôles de faîtage et démoussage réguliers.',
    nearby: ['lormont', 'saint-andre-de-cubzac'],
  },
  {
    slug: 'martignas-sur-jalle', name: 'Martignas-sur-Jalle', postalCode: '33127', area: 'metropole',
    habitat: 'Commune résidentielle en lisière de forêt, maisons individuelles en tuile.',
    climate: 'Aiguilles de pins dans les gouttières et mousse sur les versants nord, à surveiller chaque année.',
    nearby: ['saint-medard-en-jalles', 'merignac'],
  },
  // --- Graves & Sud --------------------------------------------------------
  {
    slug: 'cestas', name: 'Cestas', postalCode: '33610', area: 'sud',
    habitat: 'Grandes parcelles boisées, villas et maisons individuelles réparties dans plusieurs hameaux.',
    climate: 'Maisons sous les pins et les chênes : nettoyage de gouttières, démoussage et réparation de tuiles après les coups de vent.',
    nearby: ['pessac', 'canejan', 'gradignan', 'merignac'],
  },
  {
    slug: 'canejan', name: 'Canéjan', postalCode: '33610', area: 'sud',
    habitat: 'Maisons individuelles et lotissements boisés entre Pessac et Cestas.',
    climate: 'Feuillage abondant : les noues et les gouttières se bouchent vite, la mousse s’installe.',
    nearby: ['cestas', 'gradignan', 'pessac'],
  },
  {
    slug: 'leognan', name: 'Léognan', postalCode: '33850', area: 'sud',
    habitat: 'Châteaux et chais des Pessac-Léognan, maisons de bourg en pierre et villas récentes.',
    climate: 'Couvertures de chais et de dépendances viticoles, toitures en tuile canal à restaurer à l’identique.',
    nearby: ['gradignan', 'villenave-d-ornon', 'cadaujac', 'canejan'],
  },
  {
    slug: 'cadaujac', name: 'Cadaujac', postalCode: '33140', area: 'sud',
    habitat: 'Bourg des Graves au bord de la Garonne : maisons anciennes, pavillons et propriétés viticoles.',
    climate: 'Humidité du fleuve et des palus : démoussage et contrôle de la zinguerie à prévoir régulièrement.',
    nearby: ['villenave-d-ornon', 'leognan', 'begles'],
  },
  {
    slug: 'langon', name: 'Langon', postalCode: '33210', area: 'sud',
    habitat: 'Maisons de ville en pierre, échoppes et propriétés du Sauternais et des Graves.',
    climate: 'Toitures en tuile canal sur des bâtis anciens : reprise de faîtages, rives et solins à la chaux.',
    nearby: ['cadaujac'],
  },
  // --- Bassin d'Arcachon -----------------------------------------------------
  {
    slug: 'arcachon', name: 'Arcachon', postalCode: '33120', area: 'bassin',
    habitat: 'Villas de la Ville d’Hiver aux toitures ouvragées, maisons de la Ville d’Été, résidences du front de mer.',
    climate: 'Les embruns corrodent les fixations et la zinguerie : crochets inox, zinc prépatiné et contrôle annuel des faîtages sont indispensables face aux tempêtes d’ouest.',
    nearby: ['la-teste-de-buch', 'gujan-mestras'],
  },
  {
    slug: 'la-teste-de-buch', name: 'La Teste-de-Buch', postalCode: '33260', area: 'bassin',
    habitat: 'Villas sous les pins de Pyla et de Cazaux, maisons du centre et pavillons.',
    climate: 'Aiguilles de pins, sable et embruns : gouttières à nettoyer, démoussage et tuiles à refixer après les coups de vent.',
    nearby: ['arcachon', 'gujan-mestras'],
  },
  {
    slug: 'gujan-mestras', name: 'Gujan-Mestras', postalCode: '33470', area: 'bassin',
    habitat: 'Maisons ostréicoles, cabanes des ports et villas résidentielles.',
    climate: 'Air salin et humidité permanente du Bassin : zinguerie et fixations à surveiller de près.',
    nearby: ['la-teste-de-buch', 'arcachon', 'biganos'],
  },
  {
    slug: 'biganos', name: 'Biganos', postalCode: '33380', area: 'bassin',
    habitat: 'Pavillons et maisons récentes au fond du Bassin, entre la Leyre et la forêt.',
    climate: 'Humidité du delta de la Leyre et pins à proximité : mousse et gouttières bouchées sont fréquentes.',
    nearby: ['gujan-mestras', 'andernos-les-bains'],
  },
  {
    slug: 'andernos-les-bains', name: 'Andernos-les-Bains', postalCode: '33510', area: 'bassin',
    habitat: 'Villas balnéaires anciennes, maisons de vacances et résidences principales sous les pins.',
    climate: 'Embruns, vent et aiguilles : fixations inox, zinc adapté au milieu marin et entretien annuel recommandés.',
    nearby: ['lege-cap-ferret', 'biganos'],
  },
  {
    slug: 'lege-cap-ferret', name: 'Lège-Cap-Ferret', postalCode: '33950', area: 'bassin',
    habitat: 'Villas et cabanes de la presqu’île, souvent en bois, avec des toitures en tuile canal ou en ardoise.',
    climate: 'Exposition maximale au vent et au sel, accès parfois difficiles : nous organisons la logistique du chantier en conséquence.',
    nearby: ['andernos-les-bains'],
  },
  // --- Médoc ---------------------------------------------------------------
  {
    slug: 'castelnau-de-medoc', name: 'Castelnau-de-Médoc', postalCode: '33480', area: 'medoc',
    habitat: 'Maisons de bourg, longères médocaines et propriétés viticoles.',
    climate: 'Chais et dépendances de grande surface, toitures en tuile canal sous les pins et les chênes.',
    nearby: ['blanquefort', 'lesparre-medoc'],
  },
  {
    slug: 'lesparre-medoc', name: 'Lesparre-Médoc', postalCode: '33340', area: 'medoc',
    habitat: 'Capitale du Médoc : maisons de ville en pierre, fermes et châteaux viticoles.',
    climate: 'Entre l’estuaire et l’océan, humidité et vent usent les toitures : démoussage et reprise des faîtages réguliers.',
    nearby: ['castelnau-de-medoc', 'soulac-sur-mer'],
  },
  {
    slug: 'soulac-sur-mer', name: 'Soulac-sur-Mer', postalCode: '33780', area: 'medoc',
    habitat: 'Villas balnéaires « soulacaises » en brique et pierre, aux toitures et zingueries décoratives.',
    climate: 'Air marin très corrosif : zinguerie et fixations à choisir pour résister au sel, rénovation fidèle des villas protégées.',
    nearby: ['lesparre-medoc'],
  },
  // --- Libournais & Entre-deux-Mers -------------------------------------------
  {
    slug: 'libourne', name: 'Libourne', postalCode: '33500', area: 'libournais',
    habitat: 'Bastide aux maisons de pierre et tuile canal, châteaux du Pomerol et du Saint-Émilion, pavillons en périphérie.',
    climate: 'Confluence de l’Isle et de la Dordogne : l’humidité favorise mousse et lichens, la tuile canal ancienne demande des réparations soignées.',
    nearby: ['saint-emilion', 'creon'],
  },
  {
    slug: 'saint-emilion', name: 'Saint-Émilion', postalCode: '33330', area: 'libournais',
    habitat: 'Cité médiévale classée, maisons en pierre calcaire et chais des grands crus.',
    climate: 'Secteur protégé : tuile canal ancienne de récupération, rives et faîtages à l’identique, déclaration soumise à l’architecte des Bâtiments de France.',
    nearby: ['libourne'],
  },
  {
    slug: 'creon', name: 'Créon', postalCode: '33670', area: 'libournais',
    habitat: 'Bastide de l’Entre-deux-Mers, maisons de bourg et fermes viticoles.',
    climate: 'Toitures anciennes en tuile canal sur des charpentes à contrôler, dépendances agricoles à recouvrir.',
    nearby: ['libourne', 'floirac'],
  },
  // --- Haute-Gironde -------------------------------------------------------
  {
    slug: 'saint-andre-de-cubzac', name: 'Saint-André-de-Cubzac', postalCode: '33240', area: 'nord',
    habitat: 'Maisons de bourg, lotissements récents et propriétés du Cubzaguais.',
    climate: 'Plateau exposé au vent d’ouest : fixation des tuiles et faîtages ventilés pour les toitures neuves comme anciennes.',
    nearby: ['ambares-et-lagrave', 'blaye'],
  },
  {
    slug: 'blaye', name: 'Blaye', postalCode: '33390', area: 'nord',
    habitat: 'Maisons de ville en pierre au pied de la citadelle Vauban, propriétés viticoles des Côtes de Blaye.',
    climate: 'Face à l’estuaire, le vent et l’humidité éprouvent les toitures ; abords de la citadelle classée soumis à l’avis de l’ABF.',
    nearby: ['saint-andre-de-cubzac'],
  },
]

export const cityBySlug = Object.fromEntries(CITIES.map((city) => [city.slug, city]))

/** Chemin de la page d'une commune. */
export const cityPath = (city) => `/couvreur-${city.slug}/`

/** « de Bordeaux », « d’Arcachon », « du Bouscat » : la préposition correcte devant une commune. */
export function ofCity(name) {
  if (name.startsWith('Le ')) return `du ${name.slice(3)}`
  if (/^[AEÉÈIOUYH]/i.test(name)) return `d’${name}`
  return `de ${name}`
}

/** « à Bordeaux », « au Bouscat ». */
export const atCity = (name) => (name.startsWith('Le ') ? `au ${name.slice(3)}` : `à ${name}`)
