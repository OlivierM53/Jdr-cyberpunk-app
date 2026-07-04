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
  {
    id: "background",
    label: "Background",
    accent: "accent2",
    blocks: [
      { kind: "heading", text: "Origine culturelle" },
      {
        kind: "paragraph",
        text:
          "L'univers de Cyberpunk est multiculturel et international. Vous devez apprendre à vivre aux côtés de gens issus des quatre coins d'un monde fracturé et anarchique, sous peine de mourir la première fois que vous regarderez de travers la mauvaise personne. À vous de choisir si vos origines culturelles vous placent parmi les immigrants de Night City ou si elles indiquent simplement la région où votre famille se trouvait avant de s'implanter en ville. Lancez 2d6 ou choisissez.",
      },
      {
        kind: "table",
        headers: ["Jet", "Votre origine culturelle"],
        rows: [
          ["2", "Amérique du Nord"],
          ["3", "Amérique centrale"],
          ["4", "Amérique du Sud"],
          ["5", "Europe de l'Ouest"],
          ["6", "Europe de l'Est"],
          ["7", "Moyen-Orient et Afrique du Nord"],
          ["8", "Afrique subsaharienne"],
          ["9", "Asie du Sud"],
          ["10", "Asie du Sud-Est"],
          ["11", "Asie de l'Est"],
          ["12", "Océanie et îles du Pacifique"],
        ],
      },
      { kind: "divider" },
      { kind: "heading", text: "Votre personnalité" },
      {
        kind: "paragraph",
        text:
          "Ce tableau définit votre caractère. Êtes-vous plutôt du genre à vous tenir à l'écart de la meute, à rester seul pour laisser votre esprit calculateur s'épanouir ? Êtes-vous un fêtard qui adore mettre la pagaille ? Un professionnel compétent et assuré qui a toujours un plan de secours ? Lancez 1d10 ou choisissez.",
      },
      {
        kind: "table",
        headers: ["Jet", "Personnalité"],
        rows: [
          ["1", "Timide et réservée"],
          ["2", "Rebelle, antisociale et violente"],
          ["3", "Arrogante, prétentieuse et distante"],
          ["4", "Lunatique, imprudente et têtue"],
          ["5", "Maniaque, pointilleuse et nerveuse"],
          ["6", "Stable et réfléchie"],
          ["7", "Désordonnée et étourdie"],
          ["8", "Discrète et manipulatrice"],
          ["9", "Intellectuelle perdue dans son monde"],
          ["10", "Chaleureuse et extravertie"],
        ],
      },
      { kind: "divider" },
      { kind: "heading", text: "Tenue et style" },
      {
        kind: "paragraph",
        text:
          "Dans Cyberpunk, votre apparence constitue pour la Rue un aperçu de ce que vous êtes. Vos vêtements et votre coupe de cheveux déterminent les relations que vous entretenez avec les autres, qu'elles soient bonnes ou mauvaises. Lancez 1d6 par colonne ou choisissez.",
      },
      {
        kind: "table",
        headers: [
          "Jet",
          "Style vestimentaire",
          "Longueur et coupe de cheveux",
          "Couleur et décoration",
        ],
        rows: [
          [
            "1",
            "Entropie. Fonctionnel mais dépareillé. Une tenue dictée par la contrainte plutôt que le style.",
            "Iroquoise",
            "Multicolore",
          ],
          [
            "2",
            "Kitsch. Vous mettez en avant votre côté vintage avec des couleurs vives et des coupes tape-à-l'œil.",
            "Courts et bien coiffés",
            "Coloration vive",
          ],
          [
            "3",
            "Néomilitariste. Pratique et austère. Le confort passe avant le style.",
            "Courts et décoiffés",
            "Coloration naturelle",
          ],
          [
            "4",
            "Néokitsch. Un retour aux bons vieux classiques. L'ancien et le nouveau se mêlent, l'utile et le style fusionnent.",
            "Coupés courts ou rasés",
            "Mèches discrètes",
          ],
          [
            "5",
            "Âme nomade. Ces vêtements en cuir souvent synthétique sont robustes et élimés, à l'image de la vie nomade.",
            "Longs et bien coiffés",
            "Chevelure piquée de décorations",
          ],
          [
            "6",
            "Haute couture. Vous suivez les tendances du moment et les marques hors de prix, quelles qu'elles soient.",
            "Longs et décoiffés",
            "Vous changez tous les jours",
          ],
        ],
      },
      { kind: "divider" },
      { kind: "heading", text: "Valeur fondamentale" },
      {
        kind: "paragraph",
        text:
          "Quelle est votre valeur fondamentale ? Lancez 1d10 ou choisissez.",
      },
      {
        kind: "table",
        headers: ["Jet", "Valeur fondamentale"],
        rows: [
          ["1", "L'argent"],
          ["2", "L'honneur"],
          ["3", "La parole donnée"],
          ["4", "L'honnêteté"],
          ["5", "Le savoir"],
          ["6", "La vengeance"],
          ["7", "L'amour"],
          ["8", "Le pouvoir"],
          ["9", "La famille"],
          ["10", "L'amitié"],
        ],
      },
      { kind: "divider" },
      { kind: "heading", text: "Ce que vous pensez des gens" },
      {
        kind: "paragraph",
        text:
          "Que pensez-vous des gens en général ? Lancez 1d10 ou choisissez.",
      },
      {
        kind: "table",
        headers: ["Jet", "Ce que vous pensez"],
        rows: [
          ["1", "Rien de spécial."],
          ["2", "Vous appréciez tout le monde ou presque."],
          ["3", "Vous détestez tout le monde ou presque."],
          ["4", "Les gens sont des outils."],
          [
            "5",
            "Les gens sont des obstacles qui se dressent sur votre chemin.",
          ],
          ["6", "Chaque individu est unique."],
          ["7", "La plupart des gens sont des ordures."],
          ["8", "Vous avez du mal à établir des liens profonds."],
          ["9", "Vous tombez amoureux trop facilement."],
          ["10", "Toutes les vies ont de la valeur."],
        ],
      },
      { kind: "divider" },
      { kind: "heading", text: "Origine sociale" },
      {
        kind: "paragraph",
        text:
          "Qui êtes-vous et d'où venez-vous ? Êtes-vous né avec une cuillère en argent dans la bouche ou avec un rat crevé dans le berceau ? Lancez 1d10 ou choisissez.",
      },
      {
        kind: "table",
        headers: ["Jet", "Origine sociale"],
        rows: [
          [
            "1",
            "Cadres corporatistes. Famille riche, influente, qui engage des serviteurs et possède des maisons de luxe.",
          ],
          [
            "2",
            "Managers corporatistes. Qui dit famille aisée dit grande maison et vie tranquille. Visiblement, vous n'avez pas marché dans les traces de vos parents.",
          ],
          [
            "3",
            "Techniciens corporatistes. Entre les journées interminables et les conditions de travail difficiles, vous voyiez rarement vos parents, mais au moins vous aviez un toit au-dessus de la tête et le ventre plein.",
          ],
          [
            "4",
            "Meute de nomades. Vous viviez sur la route, au milieu des tentes et des caravanes. Vous avez appris à conduire et à vous défendre très tôt, mais au moins votre famille était toujours là pour vous.",
          ],
          [
            "5",
            "Gang. Selon le gang qui vous a élevé, vous faisiez partie de la famille ou vous n'étiez qu'une ressource à exploiter. Dans tous les cas, vous n'avez pas eu une vie facile.",
          ],
          [
            "6",
            "Habitants des zones de combat. La société a totalement abandonné l'endroit où vous avez grandi. C'était peut-être Pacifica. Votre quotidien était un combat permanent.",
          ],
          [
            "7",
            "Sans-abri. Vous viviez dans des bidonvilles, des villages de tente, des conteneurs à l'abandon. Puisque vous êtes toujours en vie, vous avez manifestement pigé les ficelles de la survie.",
          ],
          [
            "8",
            "Rats des mégastructures. Comme pas mal d'enfants, vous avez grandi dans l'appartement d'une mégastructure. Pas dans un immeuble de luxe en tout cas. Vous aviez droit à deux repas par jour.",
          ],
          [
            "9",
            "Edgerunners. Vos parents changeaient sans cesse d'endroit en fonction du boulot des gens qui s'occupaient de vous. Un jour vous dormiez dans un appartement de luxe, le lendemain vous étiez dans le coffre d'une voiture. Vous marchez dans les traces de vos protecteurs.",
          ],
          [
            "10",
            "Autre. Tout le monde ne rentre pas dans les catégories précédentes. Vos parents sont peut-être vendeurs, chauffeurs de taxi, objets de plaisir... Les possibilités sont infinies.",
          ],
        ],
      },
      { kind: "divider" },

      { kind: "heading", text: "Environnement" },
      {
        kind: "paragraph",
        text:
          "Dans quel contexte avez-vous grandi ? Vous avez peut-être passé votre enfance dans un environnement qui n'a aucun rapport avec vos origines familiales. Racontez-nous pourquoi. Lancez 1d6 ou choisissez.",
      },
      {
        kind: "table",
        headers: ["Jet", "Environnement"],
        rows: [
          ["1", "Vous écumiez la rue, libéré de la surveillance des adultes."],
          [
            "2",
            "Dans une propriété, au sommet d'un gratte-ciel ou dans un lieu sécurisé d'un autre genre.",
          ],
          ["3", "Dans une meute nomade sans cesse en mouvement."],
          [
            "4",
            "Au cœur de la zone de combat, dans un bâtiment effondré ou un squat.",
          ],
          [
            "5",
            "Dans une immense mégastructure contrôlée par une corpo ou par le gouvernement.",
          ],
          [
            "6",
            "Dans une habitation quelconque, par exemple une petite maison de Rancho Coronado ou un appartement en ville.",
          ],
        ],
      },
      { kind: "divider" },
      { kind: "heading", text: "Le tournant" },
      {
        kind: "paragraph",
        text:
          "Une existence paisible ne vous aurait pas poussé à devenir un Edgerunner. Quelle crise vous a frappé, vous ou votre famille, vous conduisant à votre situation actuelle ? Lancez 1d6 ou choisissez.",
      },
      {
        kind: "table",
        headers: ["Jet", "Tournant"],
        rows: [
          [
            "1",
            "Vous avez tout perdu le jour où quelqu'un vous a trahi, vous ou votre famille.",
          ],
          [
            "2",
            "Vous ou votre famille avez été exilés ou chassés de votre foyer à cause de la situation politique ou pour d'autres raisons.",
          ],
          [
            "3",
            "Vous êtes le dernier survivant de la famille. Les autres sont décédés ou se sont volatilisés.",
          ],
          ["4", "Vous êtes victime d'une vendetta héréditaire ou personnelle."],
          [
            "5",
            "Vous croulez sous les dettes. Vous ou votre famille êtes responsables de la situation.",
          ],
          [
            "6",
            "Vous êtes recherché par la police. Vous êtes coupable, ou peut-être pas. Dans tous les cas, soyez prudent.",
          ],
        ],
      },
      { kind: "divider" },
      { kind: "heading", text: "Votre but dans la vie" },
      {
        kind: "paragraph",
        text:
          "Les gens qui vivent sur le fil du rasoir ont souvent des rêves d'avenir. Pourquoi mettez-vous votre vie en danger en acceptant des contrats dangereux ? Quel est votre but dans la vie ? Lancez 1d6 ou choisissez.",
      },
      {
        kind: "table",
        headers: ["Jet", "Votre but"],
        rows: [
          ["1", "Vous devez réparer une erreur que vous avez commise."],
          ["2", "Vous avez soif de pouvoir et de domination."],
          ["3", "Vous voulez toucher le pactole pour prendre votre retraite."],
          ["4", "Vous voulez laver votre passé entaché."],
          ["5", "L'argent et la célébrité, choomba !"],
          ["6", "Protéger les gens que vous aimez par tous les moyens."],
        ],
      },
      { kind: "divider" },

      { kind: "heading", text: "Vos amis" },
      {
        kind: "paragraph",
        text:
          "Tout n'est pas noir. Vous êtes parfois en contact avec des gens qui veillent sur vous. Lancez 1d6. Sur 1, vous n'avez pas vraiment d'amis sur lesquels compter. De 2 à 5, vous avez un ami fidèle. Sur 6, vous en avez deux.",
      },
      {
        kind: "paragraph",
        text:
          "Si vous avez des amis, lancez un dé pour définir votre relation, leur rôle et les cercles dans lesquels ils évoluent. Vous pouvez dresser le portrait de vos amis dès maintenant en discutant avec le MJ, ou vous laisser le champ libre pour plus tard, quand le sujet prendra de l'importance.",
      },
      {
        kind: "table",
        headers: ["Jet", "Quelles sont vos relations ?"],
        rows: [
          ["1", "Un ancien amour avec lequel vous êtes resté en bons termes."],
          ["2", "Une personne avec laquelle vous avez grandi."],
          ["3", "Un mentor ou une figure parentale."],
          ["4", "Votre ancien boss qui vous tient en affection."],
          ["5", "Un vieil ennemi ou rival avec lequel vous avez fait la paix."],
          [
            "6",
            "Quelqu'un qui partage votre passion. Vous vous y adonnez ensemble.",
          ],
        ],
      },
      { kind: "divider" },
      { kind: "heading", text: "Vos ennemis" },
      {
        kind: "paragraph",
        text:
          "Tôt ou tard, vous allez froisser quelqu'un, alors autant savoir qui sont vos ennemis. Lancez 1d6. Sur 1, vous n'avez pas d'ennemi à proprement parler. De 2 à 5, vous en avez un. Sur 6, vous en avez deux.",
      },
      {
        kind: "table",
        headers: ["Jet", "Quelles sont vos relations ?"],
        rows: [
          ["1", "Une ancienne amitié ou un amour passé."],
          ["2", "Un ennemi d'enfance."],
          ["3", "Un ancien boss qui vous a trahi."],
          ["4", "Un membre de votre famille."],
          ["5", "Un ancien partenaire ou collègue de travail."],
          ["6", "Une figure énigmatique. Vous doutez de son existence."],
        ],
      },
      { kind: "divider" },
      { kind: "heading", text: "Rôle et cercle de fréquentation" },
      {
        kind: "paragraph",
        text:
          "Pour chaque ami et ennemi que vous avez, lancez 1d10 par colonne : une fois pour connaître leur rôle, une autre fois pour connaître leur cercle de fréquentation.",
      },
      {
        kind: "table",
        headers: ["Jet", "Rôle", "Cercle de fréquentations"],
        rows: [
          ["1", "Aucun", "Habitant d'une zone de combat"],
          ["2", "Fixer", "Corporatiste ambitieux"],
          ["3", "MedTech", "Bande de cyberpunks"],
          ["4", "Techie", "Urgentiste/personnel médical"],
          ["5", "Aucun", "Gang"],
          ["6", "Pilote", "Employé du gouvernement"],
          ["7", "Rockeur", "NCPD"],
          ["8", "Solo", "Professionnel des médias et du divertissement"],
          ["9", "Netrunner", "Membre d'une meute nomade"],
          ["10", "Aucun", "Employé de vente"],
        ],
      },
      { kind: "divider" },
      { kind: "heading", text: "Votre tragédie amoureuse" },
      {
        kind: "paragraph",
        text:
          "Peu nous importent les histoires qui se finissent bien, nous voulons tout savoir sur les monstres qui vous ont arraché le cœur. Lancez 1d6 ou choisissez.",
      },
      {
        kind: "table",
        headers: ["Jet", "Que s'est-il passé ?"],
        rows: [
          ["1", "Votre amour est mort dans un accident ou a été assassiné."],
          ["2", "Votre amour a disparu dans des circonstances mystérieuses."],
          [
            "3",
            "Une vendetta ou vos objectifs personnels ont eu raison de votre relation.",
          ],
          ["4", "Votre amour a été emprisonné ou exilé."],
          ["5", "Votre amour vous a quitté pour quelqu'un d'autre."],
          ["6", "Vous n'avez pas eu d'amour, ce n'est pas votre truc."],
        ],
      },
    ],
  },
];
