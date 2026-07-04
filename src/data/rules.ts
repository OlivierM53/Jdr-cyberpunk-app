// Contenu éditable directement ici par le MJ — non modifiable depuis l'interface.

export type RuleAccent = "accent" | "accent2";

export interface RuleItemNote {
  // Terme en gras (ex. "Excellente qualité") — si absent, la note est un simple paragraphe.
  term?: string;
  description: string;
}

export interface RuleItemStat {
  label: string;
  value: string;
}

export interface RuleItem {
  name: string;
  // Sous-titre (type d'arme, ex. "Fusil à pompe") — absent pour le cyberware.
  subtitle?: string;
  price?: string;
  // Ligne de stats compactes (DÉG, Att, Chargeur, Main, Diss) — uniquement pour les armes.
  stats?: RuleItemStat[];
  // Table de portée (SD par tranche de distance) — uniquement pour les armes à feu.
  rangeTable?: { headers: string[]; row: string[] };
  // Coût en Humanité (ex. "1d6", "2d6") — uniquement pour le cyberware.
  humanityCost?: string;
  notes?: RuleItemNote[];
}

export type RuleBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "formula"; lines: string[] }
  | { kind: "list"; items: string[] }
  | { kind: "definitions"; entries: { term: string; description: string }[] }
  | { kind: "table"; headers: string[]; rows: string[][] }
  | { kind: "items"; items: RuleItem[] }
  // Séparateur visuel entre deux groupes de blocs au sein d'un même onglet.
  | { kind: "divider" };

export interface RuleTab {
  id: string;
  label: string;
  accent: RuleAccent;
  blocks: RuleBlock[];
}

const RANGE_HEADERS = [
  "0-6",
  "7-12",
  "13-25",
  "25-50",
  "51-100",
  "101-200",
  "201-400",
  "401-800",
];

// Tables de portée standard par catégorie d'arme (SD par tranche de distance en mètres).
const RANGE_SNIPER = ["30", "25", "25", "20", "15", "16", "17", "20"];
const RANGE_SHOTGUN = ["13", "15", "20", "25", "30", "35", "-", "-"];
const RANGE_HEAVY_PISTOL = ["13", "15", "20", "25", "30", "30", "-", "-"];
const RANGE_SMG = ["15", "13", "15", "20", "25", "25", "30", "-"];
const RANGE_RIFLE = ["17", "16", "15", "13", "15", "20", "25", "30"];

export const RULE_TABS: RuleTab[] = [
  {
    id: "jets",
    label: "Jets de compétence",
    accent: "accent",
    blocks: [
      {
        kind: "formula",
        lines: [
          "CARAC + compétence + 1D10 (attaquant)",
          "contre",
          "CARAC + compétence + 1D10 (défenseur)",
          "ou",
          "Seuil de Difficulté (SD) de la tâche",
        ],
      },
      {
        kind: "table",
        headers: ["Difficulté", "SD"],
        rows: [
          ["Simple", "9"],
          ["Facile", "13"],
          ["Moyen", "15"],
          ["Difficile", "17"],
          ["Assez difficile", "21"],
          ["Professionnel", "24"],
          ["Presque impossible", "29"],
        ],
      },
      { kind: "heading", text: "Règles spéciales sur les dés" },
      {
        kind: "definitions",
        entries: [
          {
            term: "Dé explosif",
            description:
              "Si votre D10 fait 10, relancez 1D10 et ajoutez le résultat à votre premier jet. Si vous refaites 10, le dé n'explose pas une seconde fois.",
          },
          {
            term: "Dé implosif",
            description:
              "Si votre D10 fait 1, relancez 1D10 et soustrayez le résultat de votre jet (CARAC + compétence + 1er jet). Si vous refaites 1, le dé n'implose pas une seconde fois.",
          },
          {
            term: "Nouvel essai",
            description:
              "Si vous ratez un jet de compétence, vous ne pouvez pas retenter la même action, sauf si vos chances de réussite ont changé.",
          },
          {
            term: "Jet de compétence complémentaire",
            description:
              "Avec l'accord du MJ, vous pouvez faire un unique jet complémentaire pour obtenir un bonus de +1 sur le jet principal.",
          },
          {
            term: "Temps supplémentaire",
            description:
              "En prenant 4 fois plus de temps que nécessaire pour une action, vous obtenez un bonus de +1.",
          },
          {
            term: "Compter sur la Chance",
            description:
              "Chaque point de Chance dépensé donne +1 au jet de compétence.",
          },
        ],
      },
    ],
  },
  {
    id: "tour",
    label: "Tour de jeu",
    accent: "accent2",
    blocks: [
      { kind: "heading", text: "Initiative" },
      {
        kind: "paragraph",
        text: "Au début d'un combat, tout le monde fait un jet d'initiative.",
      },
      { kind: "formula", lines: ["RÉF + 1D10"] },
      { kind: "heading", text: "À votre tour" },
      {
        kind: "paragraph",
        text: "Votre tour = 1 action de mouvement + 1 autre action.",
      },
      { kind: "heading", text: "Mouvement" },
      {
        kind: "list",
        items: [
          "Vous pouvez parcourir autant de mètres que votre MOUV × 2, ou autant de cases que votre MOUV",
          "Vous pouvez diviser votre mouvement pour intercaler d'autres actions (ex : mouvement → tir → mouvement)",
          "Mouvements spéciaux (escalade, saut, nage...) : MOUV / 2",
        ],
      },
      { kind: "heading", text: "Actions possibles lors d'un tour" },
      {
        kind: "table",
        headers: ["Action", "Effet"],
        rows: [
          [
            "Action de mouvement",
            "Se déplacer d'autant de mètres que MOUV × 2 (ou de cases que MOUV), maximum par tour",
          ],
          [
            "Agripper",
            "Agripper un adversaire pour le retenir, ou s'emparer d'un objet qu'il tient",
          ],
          ["Attaquer", "Attaquer avec une arme à distance ou de mêlée"],
          [
            "Bouclier humain",
            "Équiper un opposant agrippé comme bouclier humain",
          ],
          ["Courir", "Effectuer une action de mouvement supplémentaire"],
          [
            "Démarrer un véhicule",
            "Démarrer un véhicule pour acquérir son MOUV et passer en tête de la file d'initiative",
          ],
          ["Équiper / Lâcher un bouclier", "Prend une action"],
        ],
      },
    ],
  },
  {
    id: "combat",
    label: "Combat",
    accent: "accent",
    blocks: [
      { kind: "heading", text: "Attaque à distance" },
      {
        kind: "formula",
        lines: [
          "RÉF + compétence d'arme appropriée + 1D10 (attaquant)",
          "contre",
          "SD du défenseur, calculé selon la portée de l'arme et de la cible",
        ],
      },
      {
        kind: "paragraph",
        text: "Si le défenseur a DEX ≥ 8, il peut tenter un jet d'esquive :",
      },
      {
        kind: "formula",
        lines: ["DEX + compétence Esquive + 1D10 (défenseur)"],
      },
      { kind: "heading", text: "Arme cinétique" },
      {
        kind: "paragraph",
        text:
          "Les points de dégâts des blessures critiques infligés par les armes cinétiques augmentent de 5. L'utilisateur peut faire ricocher les tirs avec un malus de -4.",
      },
      { kind: "heading", text: "Arme technique" },
      {
        kind: "paragraph",
        text:
          "Les armes techniques nécessitent d'être chargées avant de tirer. L'utilisateur doit utiliser son action ou son action de mouvement pour charger l'arme jusqu'au prochain tour. Un tir d'arme technique ignore la moitié de l'armure de la cible et passe au travers des couverts.",
      },
      { kind: "heading", text: "Arme intelligente" },
      {
        kind: "paragraph",
        text:
          "+ 1 au jet d'attaque. Peut recevoir des munitions intelligentes améliorées.",
      },
      { kind: "heading", text: "Munitions intelligentes améliorées" },
      {
        kind: "paragraph",
        text:
          "Quand une arme intelligente est équipée de munitions intelligentes améliorées, l'utilisateur ignore les pénalités causées par l'obscurité, la fumée, le brouillard et tout ce qui brouille le champ de vision.",
      },
      {
        kind: "paragraph",
        text:
          "Si l'utilisateur d'une arme intelligente équipée de munitions intelligentes améliorées rate un jet d'attaque de 5 ou moins, il peut immédiatement réessayer de toucher la cible. Pour sa 2ème tentative, il fait un jet de 14 + 1d10 contre le SD d'origine. Les bonus ne s'appliquent pas mais les malus s'appliquent lors de ce jet.",
      },
      { kind: "divider" },
      { kind: "heading", text: "Attaque de mêlée" },
      {
        kind: "formula",
        lines: [
          "DEX + compétence d'attaque de mêlée + 1D10 (attaquant)",
          "contre",
          "DEX + compétence Esquive + 1D10 (défenseur)",
        ],
      },

      { kind: "heading", text: "Armes tranchantes" },
      {
        kind: "list",
        items: [
          "Si une cible subit 2 dégâts (après mitigation de l'armure) d'armes tranchantes, qu'importe l'utilisateur, dans le même tour, alors elle subit un saignement",
        ],
      },
      { kind: "heading", text: "Armes contendantes" },
      {
        kind: "list",
        items: [
          "Les armes contondantes projettent au sol la cible si les dégâts bruts sont supérieurs à sa stat COR + VOL",
        ],
      },
      { kind: "heading", text: "Attaques par round" },
      {
        kind: "paragraph",
        text:
          "Pendant une action d'attaque, vous pouvez faire autant de jets que votre valeur d'Att/round.",
      },
      {
        kind: "paragraph",
        text:
          "Si vous avez deux armes avec 2 Att/round chacune, vous pouvez répartir vos jets entre les deux.",
      },
      { kind: "heading", text: "Viser" },
      {
        kind: "list",
        items: [
          "-8 au jet d'attaque pour viser la tête (limité à 1 Att/round)",
          "Possible en attaque de mêlée ou à distance",
          "Si vous touchez : dégâts doublés, après application du PA (perforation d'armure) de la cible",
          "Viser le bras : peut faire lâcher un objet à la cible",
          "Viser la jambe : réduit les déplacements de la cible",
        ],
      },
      { kind: "heading", text: "Système d'armure" },
      {
        kind: "formula",
        lines: ["Dégâts subis = jet de dégâts − valeur d'armure"],
      },
      {
        kind: "list",
        items: [
          "Si les dégâts subis sont ≥ 1, la valeur d'armure baisse de 1 (perforation de l'armure)",
          "Cumulable jusqu'à ce que l'armure atteigne 0 (armure détruite)",
          "Les dégâts d'explosion ou de piratage rapide ignorent 100% de l'armure mais ne la perforent pas",
        ],
      },
    ],
  },
  {
    id: "blessures",
    label: "Blessures",
    accent: "accent2",
    blocks: [
      { kind: "heading", text: "Seuils de blessures" },
      {
        kind: "table",
        headers: ["Type de blessure", "Seuil", "Effet", "SD de stabilisation"],
        rows: [
          ["Blessure légère", "Moins que le maximum de PS", "Aucun", "SD 10"],
          [
            "Blessure grave",
            "Moins de la moitié des PS (arrondi au supérieur)",
            "-2 sur toutes les actions",
            "SD 13",
          ],
          [
            "Blessure mortelle",
            "Moins de 1 PS",
            "-4 sur toutes les actions. Jet de sauvegarde contre la mort au début de chaque tour. -6 de MOUV",
            "SD 15 pour rendre 1 PS, le personnage est inconscient (évanoui pendant 1 minute)",
          ],
          [
            "Mort",
            "Un jet de sauvegarde contre la mort raté",
            "Mort",
            "Impossible à ramener à la vie",
          ],
        ],
      },
      {
        kind: "definitions",
        entries: [
          {
            term: "Saignement",
            description:
              "Dégâts infligés ignorant l'armure à la fin de chaque tour de la victime, peut être soigné via un jet de premiers secours SD 13 (ou chirurgie SD 10). Dégâts de base : 1d6/2. Si un saignement est appliqué à une cible qui saigne déjà, les dégâts passent à 1d6 (seule la valeur de saignement la plus grande est conservée).",
          },
          {
            term: "Blessures critiques",
            description:
              "Si, lors d'un jet de dégâts, 2 dés affichent un 6, 5 points de dégâts supplémentaires ainsi qu'une blessure critique aléatoire sont infligés.",
          },
          {
            term: "Soin d'urgence d'une blessure critique",
            description:
              "Soigner en urgence une blessure critique supprime son effet pendant 24 heures (sauf indication contraire). Ne peut être fait qu'une fois par blessure. Peut être fait sur soi-même et en combat (prend une action).",
          },
          {
            term: "Traitement d'une blessure critique",
            description:
              "Traiter une blessure critique supprime définitivement son effet. Demande 1 heure de calme pour être effectué, et ne peut pas être fait sur soi-même.",
          },
        ],
      },
      { kind: "heading", text: "Blessures critiques pour le corps" },
      {
        kind: "table",
        headers: [
          "Jet (1d6)",
          "Blessure",
          "Effet de blessure",
          "Soins d'urgence",
          "Traitement",
        ],
        rows: [
          [
            "1",
            "Côtes cassées",
            "À la fin de chaque tour lors duquel vous vous déplacez de plus de 4 m à pied, vous subissez de nouveau les dégâts bonus de cette blessure critique directement sur vos points de santé.",
            "Assistance médicale SD 13",
            "Assistance médicale SD 15 ou Chirurgie SD 13",
          ],
          [
            "2",
            "Bras cassé",
            "Vous ne pouvez pas utiliser votre bras cassé. Vous lâchez immédiatement tous les objets que vous teniez dans la main de ce bras. Peut être appliqué au 2 bras en même temps.",
            "Assistance médicale SD 13",
            "Assistance médicale SD 15 ou Chirurgie SD 13",
          ],
          [
            "3",
            "Plaie avec corps étranger",
            "À la fin de chaque tour lors duquel vous vous déplacez de plus de 4 m à pied, vous subissez de nouveau les dégâts bonus de cette blessure critique directement sur vos points de santé.",
            "Premiers secours ou Assistance médicale SD 13",
            "Les soins d'urgence suppriment l'effet de blessure de manière permanente",
          ],
          [
            "4",
            "Jambe cassée",
            "-4 au MOUV (1 minimum). Peut être appliqué au 2 jambes en même temps.",
            "Assistance médicale SD 13",
            "Assistance médicale SD 15 ou Chirurgie SD 13",
          ],
          [
            "5",
            "Muscle déchiré",
            "-2 aux attaques de mêlée.",
            "Premiers secours ou Assistance médicale SD 13",
            "Les soins d'urgence suppriment l'effet de blessure de manière permanente",
          ],
          [
            "6",
            "Doigts écrasés",
            "-4 à toutes les actions impliquant cette main. Peut être appliqué au 2 mains en même temps.",
            "Assistance médicale SD 13",
            "Chirurgie SD 15",
          ],
        ],
      },
      { kind: "heading", text: "Blessures critiques pour la tête" },
      {
        kind: "table",
        headers: [
          "Jet (1d6)",
          "Blessure",
          "Effet de blessure",
          "Soins d'urgence",
          "Traitement",
        ],
        rows: [
          [
            "1",
            "Lésion cérébrale",
            "-2 à toutes les actions. La pénalité au jet de sauvegarde contre la mort augmente de 1.",
            "–",
            "Chirurgie SD 17",
          ],
          [
            "2",
            "Œil endommagé",
            "-2 aux attaques à distance et aux jets de Perception impliquant la vue.",
            "Assistance médicale SD 15",
            "Chirurgie SD 13",
          ],
          [
            "3",
            "Commotion cérébrale",
            "-2 à toutes les actions.",
            "Premiers secours ou Assistance médicale SD 13",
            "Les soins d'urgence suppriment l'effet de blessure de manière permanente",
          ],
          [
            "4",
            "Oreille endommagée",
            "Chaque fois que vous vous déplacez de plus de 4 m à pied lors d'un tour, vous ne pouvez pas effectuer d'action de mouvement lors de votre tour suivant. De plus, vous subissez un malus de -2 aux jets de Perception impliquant l'ouïe.",
            "Assistance médicale SD 13",
            "Chirurgie SD 13",
          ],
          [
            "5",
            "Trachée écrasée",
            "Vous ne pouvez pas parler. La pénalité au jet de sauvegarde contre la mort augmente de 1.",
            "–",
            "Chirurgie SD 15",
          ],
          [
            "6",
            "Fracture du crâne",
            "Les attaques visant votre tête multiplient les dégâts par 3 et non par 2, après déduction du PA de l'armure. La pénalité au jet de sauvegarde contre la mort augmente de 1.",
            "Assistance médicale SD 15",
            "Assistance médicale ou Chirurgie SD 15",
          ],
        ],
      },
    ],
  },
  {
    id: "armurerie",
    label: "Armurerie",
    accent: "accent",
    blocks: [
      { kind: "heading", text: "Armes" },
      {
        kind: "items",
        items: [
          {
            name: "Tsunami Arms Nekomata",
            subtitle: "Fusil de précision",
            price: "Très onéreux",
            rangeTable: { headers: RANGE_HEADERS, row: RANGE_SNIPER },
            stats: [
              { label: "DÉG", value: "5d6" },
              { label: "Att", value: "1" },
              { label: "Chargeur", value: "4 (fusil)" },
              { label: "Main", value: "2" },
              { label: "Diss", value: "Non" },
            ],
            notes: [
              {
                term: "Arme technique",
                description:
                  "Équipée d'un viseur pour distinguer le contour des cibles à travers un couvert mince et épais. En sacrifiant son action de mouvement, l'utilisateur peut charger l'arme pendant 60 secondes (20 rounds) ou jusqu'à ce qu'il ait tiré.",
              },
              {
                term: "Tir chargé",
                description:
                  "Quand l'arme est chargée, la prochaine attaque a 1 Att/round, peut tirer à travers un couvert mince ou épais, et ignore la moitié du PA de la cible (arrondi au supérieur).",
              },
            ],
          },
          {
            name: "Fusil à pompe Rostović DB-2 Satara",
            subtitle: "Fusil à pompe",
            price: "Onéreux",
            rangeTable: { headers: RANGE_HEADERS, row: RANGE_SHOTGUN },
            stats: [
              { label: "DÉG", value: "5d6" },
              { label: "Att", value: "1" },
              { label: "Chargeur", value: "2 (slugs)" },
              { label: "Main", value: "1" },
              { label: "Diss", value: "Non" },
            ],
            notes: [
              {
                term: "Arme technique",
                description:
                  "Équipée d'un viseur pour distinguer le contour des cibles à travers un couvert mince et épais. En sacrifiant son action de mouvement, l'utilisateur peut charger l'arme pendant 60 secondes (20 rounds) ou jusqu'à ce qu'il ait tiré.",
              },
              {
                term: "Tir chargé",
                description:
                  "Quand l'arme est chargée, la prochaine attaque a 1 Att/round, peut tirer à travers un couvert mince, et ignore la moitié du PA de la cible (arrondi au supérieur).",
              },
              {
                term: "Chevrotine",
                description:
                  "Compétence Armes d'épaule. Inflige SD 13 contre 5d6 points de dégâts à toutes les cibles situées à 6 m (3 cases) devant le tireur.",
              },
            ],
          },
          {
            name: "Techtronika RT-46 Burya",
            subtitle: "Pistolet très lourd",
            price: "Très onéreux",
            rangeTable: { headers: RANGE_HEADERS, row: RANGE_HEAVY_PISTOL },
            stats: [
              { label: "DÉG", value: "4d6" },
              { label: "Att", value: "1" },
              { label: "Chargeur", value: "4 (pistolet TL)" },
              { label: "Main", value: "1" },
              { label: "Diss", value: "Non" },
            ],
            notes: [
              {
                term: "Arme technique",
                description:
                  "Équipée d'un viseur pour distinguer le contour des cibles à travers un couvert mince et épais. En sacrifiant son action de mouvement, l'utilisateur peut charger l'arme pendant 60 secondes (20 rounds) ou jusqu'à ce qu'il ait tiré.",
              },
              {
                term: "Tir chargé",
                description:
                  "Quand l'arme est chargée, la prochaine attaque a 1 Att/round, peut tirer à travers un couvert mince, et ignore la moitié du PA de la cible (arrondi au supérieur).",
              },
              {
                description:
                  "Un utilisateur qui n'a pas de maillage musculosquelettique subit la blessure critique \"Bras Cassé\" lorsqu'il tire avec cette arme.",
              },
            ],
          },
          {
            name: "Techtronika SPT32 Grad",
            subtitle: "Fusil de précision",
            price: "Onéreux",
            rangeTable: { headers: RANGE_HEADERS, row: RANGE_SNIPER },
            stats: [
              { label: "DÉG", value: "5d6" },
              { label: "Att", value: "1" },
              { label: "Chargeur", value: "4 (fusil)" },
              { label: "Main", value: "2" },
              { label: "Diss", value: "Non" },
            ],
            notes: [
              {
                term: "Arme cinétique",
                description:
                  "Les points de dégâts des blessures critiques augmentent de 5. L'utilisateur peut faire ricocher les tirs avec un malus de -4.",
              },
              {
                description:
                  "Il faut actionner le verrou avant de faire feu à chaque fois, avant de pouvoir tirer à nouveau. (-3 MOUV pendant le tour ou action pour actionner le verrou)",
              },
            ],
          },
          {
            name: "Militech Crusher",
            subtitle: "Pistolet très lourd",
            price: "Très onéreux",
            rangeTable: { headers: RANGE_HEADERS, row: RANGE_HEAVY_PISTOL },
            stats: [
              { label: "DÉG", value: "3d6" },
              { label: "Att", value: "1" },
              { label: "Chargeur", value: "12 (chevrotine)" },
              { label: "Main", value: "1" },
              { label: "Diss", value: "Non" },
            ],
            notes: [
              {
                term: "Arme cinétique",
                description:
                  "Les points de dégâts des blessures critiques augmentent de 5. L'utilisateur peut faire ricocher les tirs avec un malus de -4.",
              },
              { description: "Peut recevoir uniquement des chevrotines." },
              {
                term: "Chevrotine",
                description:
                  "Inflige 3d6 points de dégâts contre SD 13 à toutes les cibles situées à 6 m (3 cases) devant le tireur.",
              },
            ],
          },
          {
            name: "Militech M-10AF Lexington",
            subtitle: "Pistolet lourd",
            price: "Très onéreux",
            rangeTable: { headers: RANGE_HEADERS, row: RANGE_HEAVY_PISTOL },
            stats: [
              { label: "DÉG", value: "3d6" },
              { label: "Att", value: "2" },
              { label: "Chargeur", value: "21 (pistolet L)" },
              { label: "Main", value: "1" },
              { label: "Diss", value: "Oui" },
            ],
            notes: [
              {
                term: "Arme cinétique",
                description:
                  "Les points de dégâts des blessures critiques augmentent de 5. L'utilisateur peut faire ricocher les tirs avec un malus de -4.",
              },
            ],
          },
          {
            name: "Militech M-76e Omaha",
            subtitle: "Pistolet lourd",
            price: "Onéreux",
            rangeTable: { headers: RANGE_HEADERS, row: RANGE_HEAVY_PISTOL },
            stats: [
              { label: "DÉG", value: "3d6" },
              { label: "Att", value: "2" },
              { label: "Chargeur", value: "9 (pistolet L)" },
              { label: "Main", value: "1" },
              { label: "Diss", value: "Non" },
            ],
            notes: [
              {
                term: "Arme technique",
                description:
                  "Équipée d'un viseur pour distinguer le contour des cibles à travers un couvert mince. En sacrifiant son action de mouvement, l'utilisateur peut charger l'arme jusqu'à la fin du tour où elle est tirée.",
              },
              {
                term: "Tir chargé",
                description:
                  "Quand elle est chargée, elle a 2 Att/round et tire 3 munitions au lieu de 1 par jet d'attaque. Si elle contient moins de 3 munitions, le tir vide le chargeur. L'arme peut tirer à travers un couvert mince et ignore la moitié du PA de la cible (arrondi au supérieur).",
              },
            ],
          },
          {
            name: "Budget Arms Carnage",
            subtitle: "Fusil à pompe",
            price: "Très courant",
            rangeTable: { headers: RANGE_HEADERS, row: RANGE_SHOTGUN },
            stats: [
              { label: "DÉG", value: "5d6" },
              { label: "Att", value: "1" },
              { label: "Chargeur", value: "5 (chevrotine)" },
              { label: "Main", value: "2" },
              { label: "Diss", value: "Non" },
            ],
            notes: [
              {
                term: "Mauvaise qualité",
                description:
                  "S'enraye sur un jet de 1. Le tir part mais le tireur doit faire une action pour désenrayer l'arme.",
              },
              {
                term: "Arme cinétique",
                description:
                  "Les points de dégâts des blessures critiques augmentent de 5. L'utilisateur peut faire ricocher les tirs avec un malus de -4.",
              },
              {
                term: "Chevrotine",
                description:
                  "Inflige 5d6 points de dégâts contre SD 13 à toutes les cibles situées à 6 m (3 cases) devant le tireur. Un utilisateur qui n'a pas 10 ou plus en COR subit la blessure critique Muscle déchiré lorsqu'il tire avec cette arme.",
              },
            ],
          },
          {
            name: "Constitutional Arms Unity",
            subtitle: "Pistolet lourd",
            price: "Onéreux",
            rangeTable: { headers: RANGE_HEADERS, row: RANGE_HEAVY_PISTOL },
            stats: [
              { label: "DÉG", value: "3d6" },
              { label: "Att", value: "2" },
              { label: "Chargeur", value: "12 (pistolet L)" },
              { label: "Main", value: "1" },
              { label: "Diss", value: "Oui" },
            ],
            notes: [
              {
                term: "Arme cinétique",
                description:
                  "Les points de dégâts des blessures critiques augmentent de 5. L'utilisateur peut faire ricocher les tirs avec un malus de -4.",
              },
              {
                term: "Viser",
                description:
                  "Compétence Pistolet. Inflige 4d6 points de dégâts mais 1 Att/round.",
              },
            ],
          },
          {
            name: "Kang Tao L-69 Zhuo",
            subtitle: "Fusil à pompe",
            price: "Très onéreux",
            rangeTable: { headers: RANGE_HEADERS, row: RANGE_SMG },
            stats: [
              { label: "DÉG", value: "4d6" },
              { label: "Att", value: "1" },
              { label: "Chargeur", value: "32 (chevrotine)" },
              { label: "Main", value: "2" },
              { label: "Diss", value: "Non" },
            ],
            notes: [
              {
                term: "Arme intelligente",
                description:
                  "+1 au jet d'attaque. Peut uniquement recevoir des munitions intelligentes améliorées.",
              },
              {
                term: "Chevrotine",
                description:
                  "Compétence Armes d'épaule. Inflige 4d6 points de dégâts contre SD 13 à toutes les cibles situées à 6 m (3 cases) devant le tireur. Consomme 8 chevrotines par jet d'attaque. Ne tire pas si l'arme contient moins de 8 chevrotines.",
              },
            ],
          },
          {
            name: "Arasaka HJKE-11 Yukimura",
            subtitle: "PM",
            price: "Onéreux",
            rangeTable: { headers: RANGE_HEADERS, row: RANGE_SMG },
            stats: [
              { label: "DÉG", value: "3d6" },
              { label: "Att", value: "1" },
              { label: "Chargeur", value: "24 (pistolet M)" },
              { label: "Main", value: "2" },
              { label: "Diss", value: "Non" },
            ],
            notes: [
              {
                description:
                  "Consomme 3 munitions par tir, s'il y a moins de 3 munitions, l'arme tire les munitions restantes et inflige 2d6 de dégâts à la place",
              },
              {
                term: "Arme intelligente",
                description:
                  "+1 au jet d'attaque. Peut recevoir des munitions intelligentes améliorées.",
              },
              {
                term: "Tir automatique",
                description:
                  "Compétence Tir automatique. Si le tir touche, lancez 2d6 et multipliez par la différence entre le SD et le résultat de votre jet pour toucher (maximum x3) pour calculer les dégâts. 10 munitions par jet d'attaque",
              },
            ],
          },
          {
            name: "Arasaka HJSH-18 Masamune",
            subtitle: "Fusil d'assaut",
            price: "Onéreux",
            rangeTable: { headers: RANGE_HEADERS, row: RANGE_RIFLE },
            stats: [
              { label: "DÉG", value: "5d6" },
              { label: "Att", value: "1" },
              { label: "Chargeur", value: "24 (fusil)" },
              { label: "Main", value: "2" },
              { label: "Diss", value: "Non" },
            ],
            notes: [
              {
                description:
                  "Consomme 3 munitions par tir, s'il y a moins de 3 munitions, l'arme tire les munitions restantes et inflige 2d6 de dégâts à la place",
              },
              {
                term: "Arme cinétique",
                description:
                  "Les points de dégâts des blessures critiques augmentent de 5. L'utilisateur peut faire ricocher les tirs avec un malus de -4.",
              },
              {
                term: "Tir automatique",
                description:
                  "Compétence Tir automatique. Si le tir touche, lancez 2d6 et multipliez par la différence entre le SD et le résultat de votre jet pour toucher (maximum x4) pour calculer les dégâts. 10 munitions par jet d'attaque",
              },
            ],
          },
          {
            name: "Arasaka TKI-20 Shingen",
            subtitle: "PM lourd",
            price: "Très onéreux",
            rangeTable: { headers: RANGE_HEADERS, row: RANGE_SMG },
            stats: [
              { label: "DÉG", value: "3d6" },
              { label: "Att", value: "1" },
              { label: "Chargeur", value: "30 (pistolet L)" },
              { label: "Main", value: "2" },
              { label: "Diss", value: "Non" },
            ],
            notes: [
              {
                description:
                  "Consomme 3 munitions par tir, s'il y a moins de 3 munitions, l'arme tire les munitions restantes et inflige 2d6 de dégâts à la place",
              },
              {
                term: "Arme intelligente",
                description:
                  "+1 au jet d'attaque. Peut recevoir des munitions intelligentes améliorées.",
              },
              {
                term: "Tir automatique",
                description:
                  "Compétence Tir automatique. Si le tir touche, lancez 2d6 et multipliez par la différence entre le SD et le résultat de votre jet pour toucher (maximum x4) pour calculer les dégâts. 10 munitions par jet d'attaque",
              },
            ],
          },
        ],
      },
      { kind: "divider" },
      { kind: "heading", text: "Cyberware" },
      {
        kind: "items",
        items: [
          {
            name: "Bras de gorille",
            price: "Très onéreux",
            humanityCost: "4d6",
            stats: [
              { label: "DÉG", value: "3d6" },
              { label: "Att/round", value: "2" },
              { label: "Diss", value: "Non" },
            ],
            notes: [
              { description: "Nécessite un cyberbras." },
              { description: "Prend 2 emplacements de cyberbras" },
              {
                term: "Arme de mêlée",
                description:
                  "Compétence Arme de mêlée. Le poing d'un bras de gorille est considéré comme une arme de mêlée.",
              },
              {
                description:
                  "L'utilisateur peut manier les armes à deux mains à une seule main. Les règles d'Att/round s'appliquent normalement.",
              },
              {
                description:
                  "Si l'utilisateur en installe sur 2 cyberbras, il peut faire des jets pour déplacer des objets, enfoncer des portes, étrangler et lancer comme s'il avait COR 11",
              },
            ],
          },
          {
            name: "Lames Mantis",
            price: "Onéreux",
            humanityCost: "4d6",
            stats: [
              { label: "DÉG", value: "3d6" },
              { label: "Att/round", value: "2" },
              { label: "Diss", value: "Oui" },
            ],
            notes: [
              { description: "Nécessite un cyberbras." },
              {
                description: "Prend 2 emplacements de cyberbras",
              },
              {
                term: "Arme de mêlée",
                description: "Compétence Arme de mêlée.",
              },
              {
                description:
                  "Quand une Lame Mantis est déployée, l'utilisateur ne peut rien tenir dans la main du bras concerné.",
              },
              {
                description:
                  "Quand deux Lames Mantis installées sur deux cyberbras différents sont déployées, l'utilisateur ne subit pas les pénalités de mouvement quand il escalade.",
              },
            ],
          },
          {
            name: "Monocâble",
            price: "Très onéreux",
            humanityCost: "2d6",
            stats: [
              { label: "DÉG", value: "3d6" },
              { label: "Att/round", value: "2" },
              { label: "Diss", value: "Oui" },
            ],
            notes: [
              { description: "Nécessite un cyberbras." },
              {
                term: "Arme de mêlée",
                description:
                  "Compétence Arme de mêlée. L'utilisateur peut faire des jets d'attaque contre une cible située à 6 m (3 cases) ou moins.",
              },
              {
                description:
                  "Chaque fois qu'un monocâble inflige une blessure critique, l'attaquant fait deux jets sur le tableau des blessures critiques et choisit le résultat qui affligera sa victime.",
              },
            ],
          },
          {
            name: "Auto-GLACE",
            price: "Onéreux",
            humanityCost: "1d6",
            notes: [
              { description: "Vous pouvez en installer jusqu'à 3." },
              {
                description:
                  "Pour chaque auto-GLACE installée, le neuroport de l'utilisateur reçoit une barrière qui constitue une ligne de défense supplémentaire. Un Netrunner qui tente de pirater le neuroport de l'utilisateur doit dépenser une action virtuelle pour percer chaque barrière installée.",
              },
              {
                term: "SD selon le nombre installé",
                description:
                  "1 auto-GLACE : SD 6 • 2 auto-GLACE : SD 8 • 3 auto-GLACE : SD 10",
              },
            ],
          },
          {
            name: "Implant Berserk",
            price: "Très onéreux",
            humanityCost: "2d6",
            notes: [
              { description: "S'active avec une action." },
              {
                description:
                  "Quand l'implant Berserk est activé, l'utilisateur ignore les effets des états blessure grave et blessure mortelle pendant 60 secondes (20 rounds), à une exception près : un personnage mortellement blessé doit toujours faire ses jets de sauvegarde contre la mort. Une fois sa période d'activation expirée, l'implant ne peut plus être activé pendant 1 heure.",
              },
            ],
          },
          {
            name: "Cyberbras",
            price: "Onéreux",
            notes: [
              {
                description:
                  "Un bras cybernétique qui remplace votre bras de chair.",
              },
              {
                description:
                  "Comprend 4 emplacements pour extension de cyberbras ou de cybermembre, comme des bras de gorille ou des lames Mantis.",
              },
              {
                description:
                  "Si vous avez 4 ou moins en COR, vous infligez 2d6 de dégâts supplémentaires lorsque vous faites des jets de bagarre.",
              },
              { description: "Vous pouvez endommager des couverts en acier." },
            ],
          },
        ],
      },
    ],
  },
];
