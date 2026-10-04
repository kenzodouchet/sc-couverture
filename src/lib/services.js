/**
 * Prestations : chacune a sa propre page (/<slug>/), pré-rendue au build avec
 * son titre, sa description et ses données structurées.
 *
 * Une page par métier, c'est une page par famille de recherche Google :
 * « couvreur Bordeaux », « zingueur Gironde », « recherche de fuite toiture »,
 * « démoussage toiture »… Le texte est rédigé pour être utile au lecteur
 * d'abord : Google écarte les pages creuses répétant des mots-clés.
 *
 * `metaTitle` : 60 caractères au plus, sinon Google le coupe.
 * `metaDescription` : 150 à 160 caractères, finit par l'appel à l'action.
 */
export const SERVICES = [
  {
    slug: 'couverture-toiture',
    photo: 'couverture',
    icon: 'roof',
    short: 'Couverture',
    name: 'Couverture & rénovation de toiture',
    h1: 'Couvreur en Gironde : rénovation et réfection de toiture',
    metaTitle: 'Couvreur Bordeaux & Gironde | Rénovation toiture',
    metaDescription: 'Couvreur à Bordeaux et dans toute la Gironde : réfection de toiture en tuiles ou ardoise, remplacement de tuiles, faîtage, rives. Devis gratuit sous 48 h.',
    tagline: 'Une toiture refaite dans les règles, pour trente ans.',
    excerpt: 'Réfection complète ou partielle, tuile canal, tuile mécanique, ardoise, faîtage et rives : on remet votre couverture à neuf.',
    points: ['Réfection complète de toiture', 'Remplacement de tuiles et ardoises', 'Faîtage, rives et closoirs', 'Écran sous-toiture et liteaux'],
    sections: [
      {
        title: 'Réfection de toiture : quand faut-il la refaire ?',
        text: [
          'Une couverture en tuiles dure en moyenne 30 à 50 ans, une couverture en ardoise naturelle bien plus. Les signes qui ne trompent pas : tuiles poreuses qui s’effritent, liteaux qui fléchissent, traces d’humidité dans les combles après chaque grosse pluie, mousse qui revient quelques mois seulement après un démoussage.',
          'Lors de la visite, nous montons sur le toit, photographions l’état réel de la couverture et vous expliquons ce qui peut être réparé et ce qui doit être remplacé. Une réparation ciblée suffit souvent : nous ne proposons une réfection complète que lorsqu’elle est vraiment nécessaire.',
        ],
      },
      {
        title: 'Tous les matériaux de la Gironde',
        text: [
          'Tuile canal sur les maisons girondines et les échoppes bordelaises, tuile mécanique et tuile romane sur les pavillons, ardoise naturelle sur les maisons de maître et les chartreuses, bac acier sur les dépendances et les bâtiments agricoles : nous travaillons chaque matériau avec les règles de pose qui lui sont propres (DTU de la série 40).',
          'Une réfection comprend la dépose de l’ancienne couverture, le contrôle de la charpente, la pose d’un écran sous-toiture respirant, un nouveau litelage, la couverture neuve, puis le faîtage, les rives et les raccords zinc. Les déchets sont triés et évacués.',
        ],
      },
      {
        title: 'Rénovation partielle et entretien',
        text: [
          'Tuiles cassées par la grêle ou une branche, faîtage descellé par le vent, rive qui se décroche : nous intervenons aussi pour des réparations ponctuelles. Un faîtage refait à sec avec des closoirs ventilés évite les fissures du mortier et laisse respirer la toiture.',
        ],
      },
    ],
    faqs: [
      ['Combien coûte une réfection de toiture en Gironde ?', 'Le prix dépend de la surface, de la pente, du matériau choisi et de l’état de la charpente. Après la visite, vous recevez un devis détaillé poste par poste (dépose, écran, liteaux, couverture, zinguerie, évacuation) : aucun forfait au mètre carré qui cacherait des suppléments.'],
      ['Faut-il une autorisation pour refaire sa toiture ?', 'À l’identique (même matériau, même couleur), une simple déclaration préalable suffit généralement, voire aucune démarche selon le PLU. Changer de matériau, ou intervenir près d’un monument historique comme dans le centre de Bordeaux, demande une déclaration et parfois l’avis de l’architecte des Bâtiments de France. Nous vous indiquons la démarche lors de la visite.'],
      ['Combien de temps durent les travaux ?', 'Comptez quelques jours pour une maison individuelle de taille courante. La toiture est bâchée chaque soir tant qu’elle n’est pas refermée : vous restez au sec pendant tout le chantier.'],
    ],
  },
  {
    slug: 'zinguerie',
    photo: 'zinguerie',
    icon: 'gutter',
    short: 'Zinguerie',
    name: 'Zinguerie : gouttières, chéneaux, noues',
    h1: 'Zinguerie en Gironde : gouttières, descentes et chéneaux en zinc',
    metaTitle: 'Zingueur Bordeaux & Gironde | Gouttières zinc',
    metaDescription: 'Zingueur à Bordeaux et en Gironde : gouttières zinc, descentes, chéneaux, noues, solins et habillages, pose et réparation. Devis gratuit sous 48 h.',
    tagline: 'L’eau va là où on l’a prévu, et nulle part ailleurs.',
    excerpt: 'Gouttières pendantes ou havraises, descentes, chéneaux, noues, solins de cheminée, habillages : la zinguerie qui protège vos murs.',
    points: ['Gouttières et descentes zinc', 'Chéneaux et noues', 'Solins et abergements', 'Habillage de rives et bandeaux'],
    sections: [
      {
        title: 'La zinguerie, ce qui protège vraiment les murs',
        text: [
          'Une gouttière qui déborde, une descente percée ou une noue mal raccordée envoient l’eau sur les façades et au pied des murs. Résultat : enduits qui cloquent, salpêtre, fissures dans les sols argileux de la Gironde. La zinguerie est la partie de la toiture qu’on regarde le moins et qui cause le plus de dégâts quand elle est négligée.',
          'Nous travaillons le zinc naturel et le zinc prépatiné (quartz, anthracite), façonné sur mesure à l’atelier ou sur le chantier, avec des soudures à l’étain réalisées dans les règles.',
        ],
      },
      {
        title: 'Gouttières, chéneaux et descentes',
        text: [
          'Gouttières pendantes demi-rondes, gouttières havraises (dites « nantaises ») en bas de pente, chéneaux encaissés des immeubles et échoppes bordelaises : chaque type a sa pente et ses dilatations à respecter. Nous dimensionnons le développé selon la surface de toiture collectée et posons des crochets tous les 50 cm environ, pour qu’elles ne fléchissent pas sous le poids des feuilles et de l’eau.',
        ],
      },
      {
        title: 'Noues, solins et abergements de cheminée',
        text: [
          'Les fuites viennent rarement de la tuile elle-même, mais presque toujours d’un point singulier : la noue entre deux pans, le solin d’un mur, le pied d’une cheminée ou d’une fenêtre de toit. Nous refaisons ces raccords en zinc façonné, avec bandes de solin engravées plutôt qu’un simple joint de mastic qui ne tient que quelques saisons.',
        ],
      },
    ],
    faqs: [
      ['Zinc, alu ou PVC : quelle gouttière choisir ?', 'Le zinc dure 50 ans et plus, se répare et se patine joliment : c’est le matériau de référence en Gironde. L’aluminium laqué sans soudure est une bonne alternative moderne. Le PVC coûte moins cher mais vieillit mal au soleil et se dilate beaucoup : nous le déconseillons sur les longues longueurs.'],
      ['Faut-il nettoyer ses gouttières ?', 'Au moins une fois par an, après la chute des feuilles, et deux fois sous les pins ou les chênes. Une gouttière bouchée déborde dès la première averse et l’eau stagnante finit par percer le zinc.'],
      ['Ma gouttière fuit à une jonction, faut-il tout changer ?', 'Pas forcément. Une soudure reprise ou un manchon remplacé suffit souvent. Si le zinc est percé à plusieurs endroits ou si la pente est mauvaise, le remplacement de la longueur concernée est plus durable.'],
    ],
  },
  {
    slug: 'recherche-fuite-toiture',
    photo: 'fuite',
    icon: 'drop',
    short: 'Fuites',
    name: 'Recherche de fuite & dépannage toiture',
    h1: 'Fuite de toiture en Gironde : recherche, réparation et bâchage d’urgence',
    metaTitle: 'Fuite toiture Bordeaux & Gironde | Dépannage rapide',
    metaDescription: 'Fuite de toit à Bordeaux ou en Gironde ? Recherche de fuite, réparation de toiture, bâchage d’urgence après tempête. Couvreur réactif, appelez-nous.',
    tagline: 'Trouver la vraie cause, pas seulement colmater.',
    excerpt: 'Tache au plafond, goutte dans les combles, tuiles envolées après un coup de vent : on localise la fuite et on met hors d’eau rapidement.',
    points: ['Recherche de fuite', 'Bâchage d’urgence', 'Réparation après tempête', 'Rapport pour l’assurance'],
    sections: [
      {
        title: 'Trouver l’origine de la fuite',
        text: [
          'Une tache au plafond apparaît rarement à l’aplomb de la fuite : l’eau court le long des chevrons, de l’écran ou de l’isolant avant de goutter. Nous inspectons la toiture par l’extérieur et les combles par l’intérieur, contrôlons les points sensibles (noues, solins, cheminée, fenêtres de toit, faîtage, tuiles fêlées) et, si besoin, procédons à un test à l’eau secteur par secteur.',
          'Vous recevez des photos de la cause identifiée et un devis de réparation. Nous ne remplaçons pas une toiture entière pour une fuite qu’un solin refait suffit à arrêter.',
        ],
      },
      {
        title: 'Urgence après une tempête',
        text: [
          'Tempête, grêle, branche tombée sur le toit : la priorité est de mettre la maison hors d’eau. Nous intervenons rapidement pour bâcher la toiture ou remettre provisoirement les tuiles en place, puis nous chiffrons la remise en état définitive.',
          'Pour votre assureur, nous fournissons un constat photo et un devis détaillé. Pensez à déclarer le sinistre dans les délais prévus par votre contrat (cinq jours ouvrés en général, dix jours après une catastrophe naturelle reconnue).',
        ],
      },
    ],
    faqs: [
      ['Intervenez-vous le week-end en cas d’urgence ?', `Appelez le numéro affiché sur le site : en cas d’infiltration importante ou de toiture arrachée, nous faisons notre possible pour sécuriser la maison au plus vite, y compris en dehors des horaires habituels.`],
      ['Mon assurance prend-elle en charge la réparation ?', 'Les dégâts causés par une tempête, la grêle ou la chute d’un arbre sont généralement couverts par la garantie « tempête, grêle, neige » de l’assurance habitation. Une fuite liée à l’usure ne l’est souvent pas. Le constat photo et le devis que nous fournissons servent de base à votre déclaration.'],
      ['Que faire en attendant le couvreur ?', 'Coupez l’électricité dans la pièce touchée si l’eau approche d’un plafonnier, placez une bassine, et si possible percez une petite ouverture au point bas d’une poche d’eau dans un plafond en plaque de plâtre pour éviter qu’il ne cède. Ne montez pas sur le toit mouillé.'],
    ],
  },
  {
    slug: 'demoussage-toiture',
    photo: 'demoussage',
    icon: 'spray',
    short: 'Démoussage',
    name: 'Démoussage & traitement de toiture',
    h1: 'Démoussage et traitement hydrofuge de toiture en Gironde',
    metaTitle: 'Démoussage toiture Bordeaux & Gironde | Hydrofuge',
    metaDescription: 'Démoussage de toiture à Bordeaux et en Gironde : nettoyage sans haute pression, anti-mousse, hydrofuge, gouttières vidées. Devis gratuit sous 48 h.',
    tagline: 'Une toiture propre et protégée dure dix ans de plus.',
    excerpt: 'Nettoyage sans abîmer les tuiles, traitement anti-mousse, hydrofuge incolore ou coloré, gouttières vidées : la toiture retrouve sa protection.',
    points: ['Démoussage manuel', 'Traitement anti-mousse', 'Hydrofuge', 'Nettoyage des gouttières'],
    sections: [
      {
        title: 'Pourquoi démousser sa toiture',
        text: [
          'La mousse retient l’humidité contre les tuiles. En hiver, l’eau gèle, gonfle et fait éclater la terre cuite : c’est le gel, bien plus que la mousse elle-même, qui ruine une couverture. La mousse soulève aussi les tuiles, bouche les gouttières et finit par provoquer des infiltrations.',
          'En Gironde, l’humidité océanique, la proximité de l’estuaire et du Bassin, et les pins qui ombragent beaucoup de maisons font pousser la mousse vite : un contrôle tous les cinq ans environ est raisonnable.',
        ],
      },
      {
        title: 'Notre méthode',
        text: [
          'Nous retirons la mousse à la brosse et à la raclette, puis rinçons à basse pression. Le nettoyage haute pression, proposé par certains démarcheurs, arrache l’émail des tuiles et accélère leur vieillissement : nous ne le pratiquons pas sur les tuiles en terre cuite.',
          'Un traitement anti-mousse est ensuite pulvérisé pour détruire les spores restantes, puis, si vous le souhaitez, un hydrofuge qui laisse respirer la tuile tout en faisant perler l’eau. Les tuiles cassées repérées pendant le nettoyage sont remplacées et les gouttières vidées.',
        ],
      },
      {
        title: 'Attention au démarchage',
        text: [
          'Le démoussage est l’un des secteurs les plus touchés par le démarchage abusif : passage « parce que nous sommes dans le quartier », photos de tuiles cassées qui ne sont pas les vôtres, prix gonflé à la signature. Un artisan sérieux vient sur rendez-vous, vous remet un devis écrit et vous laisse le temps de comparer.',
        ],
      },
    ],
    faqs: [
      ['À quelle fréquence démousser une toiture ?', 'Tous les 5 à 10 ans selon l’exposition. Sous les pins, au bord du Bassin d’Arcachon ou dans le Médoc, la mousse revient plus vite : un hydrofuge après démoussage espace nettement les interventions.'],
      ['Quelle saison pour démousser ?', 'Le printemps et l’automne, par temps sec et hors gel : le produit anti-mousse a besoin de quelques jours sans pluie pour agir.'],
      ['Le démoussage abîme-t-il les tuiles ?', 'Pas avec un nettoyage manuel et un rinçage basse pression. C’est le karcher haute pression qui les abîme, en retirant leur couche protectrice.'],
    ],
  },
  {
    slug: 'charpente',
    photo: 'charpente',
    icon: 'truss',
    short: 'Charpente',
    name: 'Charpente : traitement & réparation',
    h1: 'Charpente en Gironde : traitement, renforcement et réparation',
    metaTitle: 'Charpente Bordeaux & Gironde | Traitement, réparation',
    metaDescription: 'Charpente en Gironde : remplacement de chevrons, renforcement de pannes, traitement contre insectes, champignons et termites. Devis gratuit sous 48 h.',
    tagline: 'Une couverture n’est jamais plus solide que sa charpente.',
    excerpt: 'Chevrons fléchis, pannes attaquées, capricornes ou termites : on renforce, on remplace et on traite la charpente avant de couvrir.',
    points: ['Remplacement de chevrons', 'Renforcement de pannes', 'Traitement insecticide et fongicide', 'Contrôle avant réfection'],
    sections: [
      {
        title: 'Contrôler la charpente avant de toucher à la couverture',
        text: [
          'Chaque réfection de toiture commence par un contrôle de la charpente : une fois la couverture déposée, c’est le moment idéal pour remplacer un chevron fléchi, renforcer une panne ou traiter le bois. Refaire une couverture neuve sur une charpente fatiguée, c’est déplacer le problème de quelques années.',
        ],
      },
      {
        title: 'Insectes, champignons et termites',
        text: [
          'Une grande partie de la Gironde est classée en zone contaminée par les termites par arrêté préfectoral, et les capricornes et vrillettes attaquent les charpentes anciennes. Nous sondons les bois, identifions l’attaque et appliquons le traitement adapté, par pulvérisation ou par injection, avec des produits certifiés.',
          'Les bois remplacés sont traités avant pose. Pour les attaques de mérule ou de termites étendues, nous travaillons avec des entreprises spécialisées et coordonnons l’intervention avec la réfection de la toiture.',
        ],
      },
    ],
    faqs: [
      ['Comment savoir si ma charpente est attaquée ?', 'Petits trous ronds ou ovales dans le bois, sciure au sol des combles, bois qui sonne creux ou s’enfonce sous le tournevis : ce sont les signes d’une attaque d’insectes. Une bonne inspection des combles le confirme.'],
      ['Faut-il refaire toute la charpente ?', 'Très rarement. Dans la grande majorité des cas, quelques pièces sont remplacées ou doublées et l’ensemble est traité.'],
    ],
  },
  {
    slug: 'fenetre-de-toit',
    photo: 'velux',
    icon: 'window',
    short: 'Fenêtres de toit',
    name: 'Fenêtres de toit & isolation',
    h1: 'Pose et remplacement de fenêtres de toit en Gironde',
    metaTitle: 'Pose fenêtre de toit Bordeaux & Gironde | Velux',
    metaDescription: 'Pose et remplacement de fenêtres de toit (type Velux) à Bordeaux et en Gironde, raccords d’étanchéité, isolation de toiture. Devis gratuit sous 48 h.',
    tagline: 'De la lumière dans les combles, sans une goutte d’eau.',
    excerpt: 'Création ou remplacement de fenêtres de toit, raccords d’étanchéité, isolation sous toiture : des combles lumineux et bien isolés.',
    points: ['Création de fenêtre de toit', 'Remplacement à l’identique', 'Raccord d’étanchéité', 'Isolation de la toiture'],
    sections: [
      {
        title: 'Créer ou remplacer une fenêtre de toit',
        text: [
          'Aménager des combles, éclairer une salle de bain sous pente ou remplacer une fenêtre de toit de plus de vingt ans qui laisse passer l’air : la pose se fait depuis l’intérieur et l’extérieur en une journée dans la plupart des cas. Nous découpons la couverture, créons le chevêtre dans la charpente, posons la fenêtre avec son raccord d’étanchéité adapté au matériau (tuile, ardoise) et reprenons la couverture autour.',
          'Une fenêtre de toit qui fuit l’est presque toujours par son raccord ou par une pose sans pente suffisante : nous vérifions ces deux points lors de chaque remplacement.',
        ],
      },
      {
        title: 'Isolation de la toiture',
        text: [
          'Lors d’une réfection, la couverture déposée permet d’isoler par l’extérieur (sarking) sans toucher à l’aménagement intérieur des combles. C’est souvent le moment le plus économique pour améliorer l’isolation d’une maison. Les travaux d’isolation réalisés par une entreprise RGE peuvent ouvrir droit à des aides : renseignez-vous auprès de France Rénov’.',
        ],
      },
    ],
    faqs: [
      ['Faut-il une autorisation pour poser une fenêtre de toit ?', 'Oui : la création d’une fenêtre de toit modifie l’aspect extérieur et demande une déclaration préalable en mairie. Le remplacement à l’identique n’en demande généralement pas.'],
      ['Combien de temps dure la pose ?', 'Une journée pour une fenêtre de toit standard, finitions intérieures comprises si l’habillage est posé en même temps.'],
    ],
  },
]

export const serviceBySlug = Object.fromEntries(SERVICES.map((service) => [service.slug, service]))
