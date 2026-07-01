export interface StatDef {
  key: Stat;
  name: string;
  description: string;
}

export type Stat =
  | "COR"
  | "REF"
  | "DEX"
  | "TECH"
  | "PRES"
  | "INT"
  | "EMP"
  | "MOUV"
  | "VOL"
  | "CHA";

export const STAT_DEFS: StatDef[] = [
  {
    key: "COR",
    name: "Corps",
    description: "Votre force brute et votre endurance.",
  },
  {
    key: "REF",
    name: "Réflexes",
    description:
      "Évalue votre temps de réaction et votre agilité. Sert aussi pour tirer avec des armes à distance.",
  },
  {
    key: "DEX",
    name: "Dextérité",
    description:
      "Vos capacités athlétiques. Entre en jeu pour les attaques de mêlée et à mains nues.",
  },
  {
    key: "TECH",
    name: "Technique",
    description: "Manipulation d'outils et d'instruments.",
  },
  {
    key: "INT",
    name: "Intelligence",
    description:
      "Montre à quel point vous êtes intelligent, malin et attentif.",
  },
  {
    key: "VOL",
    name: "Volonté",
    description:
      "Votre détermination, votre courage et votre capacité à surmonter l'adversité.",
  },
  {
    key: "PRES",
    name: "Prestance",
    description: "Votre aptitude à impressionner les gens et à les influencer.",
  },
  {
    key: "EMP",
    name: "Empathie",
    description:
      "Votre faculté à vous lier à d'autres personnes et à prendre soin d'elles.",
  },
  {
    key: "CHA",
    name: "Chance",
    description:
      "Une caractéristique particulière. Voir Compter sur la Chance en page 5 pour plus de détails.",
  },
  {
    key: "MOUV",
    name: "Mouvement",
    description:
      "Votre vitesse de déplacement quand vous courez, sautez, nagez, etc.",
  },
];

export const SKILLS = [
  [
    "Armes d'épaule",
    "REF",
    "Tirer avec précision avec des armes comme les carabines et les fusils à pompe.",
  ],
  [
    "Armes lourdes",
    "REF",
    "Tirer avec précision avec des armes à projectile encombrantes telles que des lance-grenades et des lance-roquettes.",
  ],
  ["Armes de mêlée", "DEX", "Se servir d'armes de mêlée."],
  [
    "Assistance Médicale",
    "TECH",
    "Appliquer des soins médicaux aux blessés pour stabiliser leur état et guérir les blessures critiques préoccupantes.",
  ],
  [
    "Athlétisme",
    "DEX",
    "Les fondamentaux des activités sportives qu'on retrouve dans les programmes d'éducation physique et la musculation. Cette compétence sert aussi à manier des armes de jet.",
  ],
  [
    "Bagarre",
    "DEX",
    "Se battre et effectuer des prises en usant de la force brute.",
  ],
  [
    "Bibliothèque",
    "INT",
    "Effectuer des recherches dans des bases de données, le CitiNet, les collections de bibliothèques et autres sources d'information compilées pour obtenir des renseignements.",
  ],
  [
    "Bureaucratie",
    "INT",
    "Savoir traiter avec les bureaucrates, connaître leur langage et les techniques pour les approcher, et extraire les informations qui transitent dans les administrations.",
  ],
  ["Composition", "INT", "Rédiger des chansons, des articles ou des fictions."],
  [
    "Comptabilité",
    "INT",
    "Tenir les comptes, savoir jongler avec les chiffres et effectuer les opérations comptables courantes.",
  ],
  [
    "Concentration",
    "VOL",
    "La capacité à se concentrer, à ignorer les sources de distraction, à mobiliser sa mémoire et à contrôler ses réactions physiologiques.",
  ],
  [
    "Conduite de véhicule terrestre",
    "REF",
    "Savoir piloter et manœuvrer des véhicules terrestres.",
  ],
  [
    "Connaissance de la rue",
    "PRES",
    "Vous savez comment obtenir des biens de contrebande et des marchandises illégales, communiquer avec le monde du crime et éviter les ennuis dans les quartiers chauds.",
  ],
  [
    "Connaissance",
    "INT",
    "Reflète votre niveau de connaissance dans des disciplines scolaires telles que la lecture, l'écriture, les principes mathématiques de base et l'histoire. Vous en savez assez pour vous débrouiller.",
  ],
  [
    "Contrefaçon",
    "TECH",
    "Fabrication et détection de documents, d'œuvres d'art et de moyens d'identification falsifiés.",
  ],
  [
    "Conversation",
    "EMP",
    "Grâce à cette compétence, vous soutirez des renseignements aux gens sous couvert d'une conversation anodine.",
  ],
  [
    "Corruption",
    "PRES",
    "Vous évaluez le degré de corruptibilité des gens. Vous savez comment approcher votre interlocuteur et quelle somme lui proposer.",
  ],
  [
    "Criminologie",
    "INT",
    "La capacité à trouver des indices grâce au relevé d'empreintes, aux tests balistiques, à l'analyse de preuves et aux recherches dans les fichiers et les enregistrements de la police.",
  ],
  [
    "Crochetage",
    "TECH",
    "Crochetage de serrures dépourvues de protection électronique et désamorçage de mesures de sécurité non électroniques.",
  ],
  ["Cryptographie", "INT", "Savoir déchiffrer et crypter des messages."],
  [
    "Cybertech",
    "TECH",
    "Identifier, comprendre et réparer des implants cybernétiques.",
  ],
  [
    "Danse",
    "DEX",
    "Exécuter des chorégraphies dans une boîte de nuit ou sur scène.",
  ],
  [
    "Déduction",
    "INT",
    "Établir une conclusion qui ne saute pas aux yeux à partir d'un faisceau d'indices.",
  ],
  [
    "Discrétion",
    "DEX",
    "La capacité à se mouvoir sans faire de bruit, à se cacher, agir en catimini ou à éviter de se faire repérer. Pour détecter votre présence, les autres personnages peuvent faire appel à la compétence Perception.",
  ],
  [
    "Dissimulation/Révélation d'objet",
    "INT",
    "La capacité à soustraire des objets à la vue et retrouver des éléments cachés. On utilise cette compétence pour dissimuler ses armes sous ses vêtements et déceler les armes dissimulées.",
  ],
  [
    "Endurance",
    "VOL",
    "La capacité à endurer les privations et les conditions de vie dans des environnements hostiles.",
  ],
  [
    "Esquive",
    "DEX",
    "Esquiver les coups lorsqu'on vous attaque au corps à corps.",
  ],
  [
    "Gestion d'affaires",
    "INT",
    "Connaître le b.-a.-ba de l'entrepreneuriat tel que la loi de l'offre et de la demande, le management des employés, l'approvisionnement, la vente et le marketing.",
  ],
  [
    "Guide local",
    "INT",
    "La connaissance que vous avez de Night City, de ses quartiers et de ses conventions.",
  ],
  [
    "Habillement et style",
    "PRES",
    "Savoir quels vêtements porter à quelle occasion et comment paraître cool même dans une tenue informe.",
  ],
  [
    "Instrument",
    "TECH",
    "Savoir jouer d'un instrument à un niveau professionnel. Inclut également les performances vocales, c'est-à-dire le chant.",
  ],
  [
    "Interrogatoire",
    "PRES",
    "Vous savez obtenir des informations par la force.",
  ],
  [
    "Jeu d'acteur",
    "PRES",
    "Savoir jouer un rôle, se déguiser afin de passer pour un personnage fictif ou réel, feindre des émotions et des humeurs.",
  ],
  [
    "Négoce",
    "PRES",
    "Conclure des affaires intéressantes avec des vendeurs ou des acheteurs.",
  ],
  [
    "Perception",
    "INT",
    "La capacité à observer, percevoir les détails, déceler des éléments cachés comme des indices, des pièges ou des personnages qui se dissimulent en exploitant la compétence Dissimulation/Révélation d'objet.",
  ],
  [
    "Persuasion",
    "PRES",
    "La capacité à convaincre, persuader ou influencer d'autres personnes. Elle vous permet aussi de pousser les gens à suivre vos directives.",
  ],
  [
    "Photos et films",
    "TECH",
    "Prendre des photographies, produire des vidéos ou des programmes de danse sensorielle.",
  ],
  [
    "Pickpocket",
    "TECH",
    "Récupérer discrètement des objets que les gens conservent sur eux et commettre des vols à l'étalage sans se faire prendre.",
  ],
  [
    "Pistage",
    "INT",
    "Savoir suivre une piste en analysant les empreintes et autres traces de passage.",
  ],
  [
    "Pistolet",
    "REF",
    "Tirer avec précision avec des armes à projectile tenues à une main.",
  ],
  [
    "Premiers secours",
    "TECH",
    "Appliquer des soins médicaux aux personnes blessées pour leur éviter la mort en traitant les blessures les moins graves.",
  ],
  [
    "Psychologie",
    "EMP",
    "La capacité à déchiffrer les expressions et le langage corporel des gens, afin de deviner leur humeur et discerner les mensonges éventuels.",
  ],
  [
    "Résistance à la torture/aux drogues",
    "VOL",
    "Votre tolérance à la douleur causée par les interrogatoires musclés, la torture ou les drogues.",
  ],
  [
    "Sécurité Électronique",
    "TECH",
    "Identifier, comprendre, réparer, pirater et installer des appareils électroniques complexes, parmi lesquels les ordinateurs, les cyberconsoles, le matériel électronique personnel et les systèmes de sécurité électronique.",
  ],
  [
    "Tactique",
    "INT",
    "Savoir diriger des troupes efficacement lors d'un affrontement à grande échelle. Un personnage doté de cette capacité sait mener une bataille et jauger les réactions des forces adverses.",
  ],
  [
    "Tir automatique",
    "REF",
    "Tenir sa cible en joue avec une arme en mode automatique malgré le recul.",
  ],
] as const satisfies readonly (readonly [
  name: string,
  statKey: Stat,
  description: string,
])[];

export type SkillName = (typeof SKILLS)[number][0];

export interface BgFieldDef {
  key: string;
  label: string;
}

export const BG_FIELDS: BgFieldDef[] = [
  { key: "personnalite", label: "Personnalité" },
  { key: "tenue", label: "Tenue et style" },
  { key: "cheveux", label: "Coupe de cheveux" },
  { key: "valeur", label: "Valeur fondamentale" },
  { key: "gens", label: "Que pensez-vous des gens ?" },
  { key: "famille", label: "Origines familiales" },
  { key: "environnement", label: "Environnement" },
  { key: "tournant", label: "Le tournant" },
  { key: "but", label: "But dans la vie" },
  { key: "amis", label: "Amis" },
  { key: "ennemis", label: "Ennemis" },
  { key: "amour", label: "Tragédie amoureuse" },
];

export type Gender = "homme" | "femme" | "autre";

export interface GenderDef {
  key: Gender;
  label: string;
}

export const GENDERS: GenderDef[] = [
  { key: "homme", label: "Homme" },
  { key: "femme", label: "Femme" },
  { key: "autre", label: "Autre" },
];

export type RoleKey =
  | "Netrunner"
  | "Solo"
  | "MedTech"
  | "Techie"
  | "Fixer"
  | "Rockeur"
  | "Pilote";

export const ROLE_KEYS: RoleKey[] = [
  "Netrunner",
  "Solo",
  "MedTech",
  "Techie",
  "Fixer",
  "Rockeur",
  "Pilote",
];

export interface RoleDef {
  description: string;
  stats: Record<Stat, number>;
  // Compétences propres au rôle (nom -> valeur). Une compétence absente de cette
  // liste vaut 0 pour ce rôle : pas besoin d'énumérer les ~44 compétences ici.
  skills: Partial<Record<SkillName, number>>;
}

export const ROLES: Record<RoleKey, RoleDef> = {
  Netrunner: {
    description:
      `Publiez les claviers et les écrans tactiles. Vous Pirattez les gens avec votre cerveau !
    Vous 4 en Interface et 3 actions virtuelles par tour pour effectuer des priatages rapides.`,
    stats: {
      CHA: 8,
      COR: 4,
      DEX: 6,
      EMP: 4,
      INT: 6,
      MOUV: 7,
      PRES: 7,
      REF: 6,
      TECH: 8,
      VOL: 6,
    },
    skills: {
      "Assistance Médicale": 2,
      "Athlétisme": 4,
      "Bagarre": 4,
      "Bibliothèque": 6,
      Concentration: 2,
      "Connaissance de la rue": 4,
      Connaissance: 6,
      Conversation: 6,
      Crochetage: 3,
      Cybertech: 6,
      Danse: 5,
      Discrétion: 5,
      Esquive: 4,
      "Habillement et style": 4,
      "Jeu d'acteur": 6,
      Perception: 6,
      Persuasion: 4,
      Pickpocket: 3,
      Pistolet: 5,
      "Premiers secours": 2,
      Psychologie: 5,
      "Sécurité Électronique": 6,
    },
  },
  Solo: {
    description:
      `Vous étudiez soigneusement le terrain et réagissez au quart de tour.
    Ajoutez +4 à tous vos jets d'Initiative.`,
    stats: {
      CHA: 6,
      COR: 6,
      DEX: 7,
      EMP: 5,
      INT: 6,
      MOUV: 7,
      PRES: 7,
      REF: 7,
      TECH: 5,
      VOL: 6,
    },
    skills: {
      "Armes de mêlée": 6,
      "Armes d'épaule": 6,
      Athlétisme: 6,
      Bagarre: 6,
      Concentration: 4,
      "Conduite de véhicule terrestre": 4,
      Connaissance: 5,
      Conversation: 2,
      Discrétion: 6,
      Esquive: 6,
      Interrogatoire: 4,
      Perception: 5,
      Persuasion: 4,
      Pistolet: 6,
      "Premiers secours": 6,
      Psychologie: 5,
      "Tir automatique": 6,
    },
  },
  MedTech: {
    description:
      "Dans le Futur Sombre aussi les gens ont besoin de soins. À vous de jouer ! Vous pouvez utiliser la compétence Chirurgie avec une base de 12.\nUne fois par arc, vous pouvez utiliser un Rapidoc pour restaurer les PS d'un patient.",
    stats: {
      CHA: 6,
      COR: 7,
      DEX: 5,
      EMP: 7,
      INT: 7,
      MOUV: 6,
      PRES: 5,
      REF: 6,
      TECH: 8,
      VOL: 5,
    },
    skills: {
      Pistolet: 6,
    },
  },
  Techie: {
    description:
      "Vous savez fabriquer, casser ou réparer tout ce qui est technologique.\nVous gagnez +4 aux jets de Cybertech et de Sécurité électronique.",
    stats: {
      CHA: 6,
      COR: 6,
      DEX: 5,
      EMP: 5,
      INT: 8,
      MOUV: 7,
      PRES: 5,
      REF: 7,
      TECH: 8,
      VOL: 5,
    },
    skills: {
      "Armes d'épaule": 6,
      "Sécurité Électronique": 6,
    },
  },
  Fixer: {
    description:
      "Vous êtes toujours partant·e pour négocier un accord.\nVous gagnez +4 aux jets de Négoce.",
    stats: {
      CHA: 5,
      COR: 4,
      DEX: 6,
      EMP: 7,
      INT: 8,
      MOUV: 6,
      PRES: 8,
      REF: 6,
      TECH: 5,
      VOL: 7,
    },
    skills: {
      "Armes de mêlée": 5,
      Pistolet: 6,
    },
  },
  Rockeur: {
    description:
      "Vous n'êtes pas encore mondialement connu·e, mais ça va venir. Quand le MJ annonce qu'un PNJ est fan de vous,\nvous gagnez +4 sur tous vos jets de compétences sociales (Jeu d'acteur, Corruption, Conversation, Interrogatoire et Persuasion) qui le ciblent.",
    stats: {
      CHA: 4,
      COR: 8,
      DEX: 7,
      EMP: 6,
      INT: 4,
      MOUV: 7,
      PRES: 7,
      REF: 6,
      TECH: 5,
      VOL: 8,
    },
    skills: {
      Bagarre: 6,
      "Armes d'épaule": 6,
    },
  },
  Pilote: {
    description:
      "Pour un Nomade, la mobilité est la clé : vous passez autant de temps au volant de votre véhicule qu'à l'extérieur.\nVous gagnez +4 aux jets de Conduite de véhicule terrestre.",
    stats: {
      CHA: 6,
      COR: 8,
      DEX: 8,
      EMP: 5,
      INT: 5,
      MOUV: 6,
      PRES: 7,
      REF: 6,
      TECH: 4,
      VOL: 7,
    },
    skills: {
      "Armes de mêlée": 6,
      "Armes d'épaule": 6,
      "Conduite de véhicule terrestre": 6,
    },
  },
};

// Compétences complètes d'un rôle : celles définies dans ROLES[role].skills,
// toutes les autres compétences de SKILLS sont à 0.
export function roleSkillDefaults(role: RoleKey): Record<SkillName, number> {
  const def = ROLES[role];
  const skills = {} as Record<SkillName, number>;
  SKILLS.forEach(([name]) => {
    skills[name] = def?.skills[name] ?? 0;
  });
  return skills;
}

export type AccentName = "cyan" | "magenta" | "toxic";

export interface AccentPalette {
  a: string;
  b: string;
  soft: string;
  glow: string;
}

export const ACCENTS: Record<AccentName, AccentPalette> = {
  cyan: {
    a: "#22e0ff",
    b: "#ff2d7e",
    soft: "rgba(34,224,255,.12)",
    glow: "rgba(34,224,255,.45)",
  },
  magenta: {
    a: "#ff2d7e",
    b: "#22e0ff",
    soft: "rgba(255,45,126,.12)",
    glow: "rgba(255,45,126,.45)",
  },
  toxic: {
    a: "#c6ff3d",
    b: "#ff2d7e",
    soft: "rgba(198,255,61,.12)",
    glow: "rgba(198,255,61,.45)",
  },
};
