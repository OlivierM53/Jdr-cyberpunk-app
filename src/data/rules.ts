// Contenu éditable directement ici par le MJ — non modifiable depuis l'interface.

export type RuleAccent = "accent" | "accent2";

export type RuleBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "formula"; lines: string[] }
  | { kind: "list"; items: string[] }
  | { kind: "definitions"; entries: { term: string; description: string }[] }
  | { kind: "table"; headers: string[]; rows: string[][] };

export interface RuleTab {
  id: string;
  label: string;
  accent: RuleAccent;
  blocks: RuleBlock[];
}

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
      { kind: "heading", text: "Seuilles de blessures" },
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
              `Dégâts infligés ignorant l'armure à la fin de chaque tour de la victime, peut être soigné via un jet de premiers secours SD 13 (ou chirurgie SD 10).
            Dégâts de base : 1d6/2
            Si un saignement est appliqué à une cible qui saigne déjà, les dégâts passent à 1d6 (seule la valeur de saignement la plus grande est conservée)
            `,
          },
          {
            term: "Blessures critiques",
            description:
              "Si, lors d'un jet de dégâts, 2 dés affichent un 6, 5 points de dégats supplémentaires aini qu'une blessure critique aléatoire sont infligés.",
          },
          {
            term: "Soin d'urgence d'une blessure critique",
            description:
              "Soigné en urgence une blessure critique supprime son effet pendant 24 heures (Sauf indication contraire). Ne peut être fait qu'une fois par blessure. Peut être fait sur soi-même et en combat (Prend une action).",
          },
          {
            term: "Traitement d'un blessure critique",
            description:
              "Traité une blessure critique supprime définitivement son effet. Demande 1 heure de calme pour être effectué, et ne peut pas être fait sur soit même.",
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
];
