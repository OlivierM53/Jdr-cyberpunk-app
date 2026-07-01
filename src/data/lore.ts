// Contenu éditable directement ici par le MJ — non modifiable depuis l'interface.

export type LoreAccent = "accent" | "accent2";

export interface LoreCard {
  name: string;
  badge: string;
  description: string;
  footer?: string;
}

export interface LoreSection {
  heading?: string;
  items: string[];
}

export interface LoreDefinition {
  term: string;
  description: string;
}

export interface LoreTimelineEntry {
  year: string;
  event: string;
}

export type LoreTabContent =
  | { kind: "cards"; intro?: string; cards: LoreCard[] }
  | {
    kind: "sections";
    intro?: string;
    sections: LoreSection[];
    outro?: string;
  }
  | {
    kind: "nightcity";
    histoire: string[];
    districts: LoreDefinition[];
    trivia: string[];
  }
  | { kind: "timeline"; entries: LoreTimelineEntry[] }
  | { kind: "glossary"; entries: LoreDefinition[] };

export interface LoreTab {
  id: string;
  label: string;
  accent: LoreAccent;
  content: LoreTabContent;
}

export const LORE_TABS: LoreTab[] = [
  {
    id: "corporations",
    label: "Corporations",
    accent: "accent",
    content: {
      kind: "cards",
      intro:
        "Les corporations (corpos) sont des super entreprises, ayant des chiffres d'affaires plus importants que la plupart des pays du monde. En 2077, les pays n'ont d'importance que via les corpos qui leur sont liées. Les corpos sont plus proches de gangs que de vraies entreprises.\n\nDes corpos existent dans tous les domaines (média, alimentation, véhicule...).",
      cards: [
        {
          name: "Arasaka",
          badge: "Sécurité · Banque · Armement",
          description:
            "Fondée au Japon, Arasaka est l'une des corpos les plus puissantes et influentes du monde, dominant l'armement militaire, la banque et la sécurité — au point que certains disent qu'elle protège jusqu'à ton âme.",
          footer:
            "Actrice principale de la 4ème guerre des corpos, rivale historique de Militech.",
        },
        {
          name: "Militech",
          badge: "Armement · Sécurité",
          description:
            "Propriété des NUSA, Militech leur sert de bras armé officieux et fournit une grande partie de son armement militaire.",
          footer:
            "Actrice principale de la 4ème guerre des corpos, aux côtés d’Arasaka.",
        },
        {
          name: "Trauma Team",
          badge: "Santé · Protection privée",
          description:
            "Trauma Team propose des abonnements d'urgence médicale : sans souscription active (ou sans moyen de payer sur l'instant), l'équipe n'intervient pas, quelle que soit la gravité.",
          footer:
            "À Night City, se faire soigner est une question de contrat, pas d'éthique.",
        },
        {
          name: "All Food",
          badge: "Agro-alimentaire",
          description:
            "Corporation mexicaine spécialisée dans l'agro-alimentaire, elle fournit l'essentiel de la viande consommée à Night City.",
        },
        {
          name: "Biotechnica",
          badge: "Génie génétique · Carburant",
          description:
            "Biotechnica domine le génie génétique appliqué aux animaux ainsi que la production de CHOOH2, le carburant de synthèse qui fait tourner la planète.",
        },
        {
          name: "Delamain",
          badge: "Taxi autonome",
          description:
            "Delamain exploite un réseau de taxis privés autonomes, avec des offres blindées et armées pour les trajets à risque.",
          footer:
            "N'emploie plus personne : une unique IA gère toute la flotte.",
        },
        {
          name: "NetWatch",
          badge: "Surveillance du Net",
          description:
            "NetWatch se présente comme une ONG chargée de surveiller le Net ; elle a érigé le Mur Noir dans les années 2040 et s’est engagée à empêcher quiconque de le franchir.",
          footer: "Ressemble à une ONG plus qu'à une corpo classique.",
        },
      ],
    },
  },
  {
    id: "gangs",
    label: "Gangs",
    accent: "accent2",
    content: {
      kind: "cards",
      intro:
        "Il y a de nombreux gangs à Night City, de toute taille et de toute occupation.",
      cards: [
        {
          name: "6th Street",
          badge: "Santo Domingo",
          description:
            "Le 6th Street se présente comme une police de substitution au NCPD et estime que Night City devrait redevenir américaine.",
          footer: "Ex-militaires · milice patriotique",
        },
        {
          name: "Animals",
          badge: "Force brute",
          description:
            "Les Animals ne jurent que par la force humaine : ils se dopent au « Jus », une drogue qui gonfle muscle et puissance physique.",
          footer: "Bioscult · combats clandestins",
        },
        {
          name: "Désosseurs",
          badge: "Trafic d'implants",
          description:
            "Gang ultra-violent qui n'accorde aucune valeur à la vie humaine : les Désosseurs kidnappent pour arracher les implants de leurs victimes et les revendre, sans se soucier de leur survie.",
          footer: "Kidnapping · marché noir du cyberware",
        },
        {
          name: "Maelstrom",
          badge: "Watson",
          description:
            "Pour le Maelstrom, seul le chrome compte : ils s'implantent (ou forcent les autres à s'implanter) en masse, et consomment du CHOOH2 comme drogue.",
          footer:
            "Cyberware extrême · très grand nombre de cas de cyberpsychose",
        },
        {
          name: "Mox",
          badge: "Protection",
          description:
            "Peu nombreux, les Mox protègent celles et ceux qui travaillent dans le sexe et peuvent gérer certains établissements, sans jamais les exploiter.",
          footer: "Petit effectif, mais respecté",
        },
        {
          name: "Tyger Claws",
          badge: "Westbrook",
          description:
            "Les Tyger Claws tiennent l’essentiel des jeux d’argent de la ville, avec un fonctionnement et une taille proches d’une véritable corpo.",
          footer: "Organisation quasi-corporatiste",
        },
        {
          name: "Valentinos",
          badge: "Heywood",
          description:
            "Gang des gosses de rue au très grand nombre de membres mais individuellement peu redoutables, les Valentinos cultivent une forte imagerie chrétienne.",
          footer: "Grand nombre · imagerie religieuse",
        },
        {
          name: "Voodoo Boys",
          badge: "Pacifica",
          description:
            "Repliés en autarcie à Pacifica, les Voodoo Boys sont considérés comme les meilleurs hackers de la ville, spécialisés dans le netrunning.",
          footer: "Netrunning · autarcie",
        },
      ],
    },
  },
  {
    id: "nomades",
    label: "Nomades",
    accent: "accent",
    content: {
      kind: "sections",
      intro:
        "Les Nomades sont des clans vivant hors des villes, principalement dans les Badlands. Contrairement aux gangs urbains, ils ne contrôlent pas de territoire en ville : leur mode de vie repose sur la mobilité, la famille élargie (le clan), et un code d'honneur strict.",
      sections: [
        {
          heading: "Mode de vie",
          items: [
            "Vivent en convois de véhicules et de mobilehomes, se déplaçant régulièrement",
            "Chaque clan fonctionne comme une famille élargie : tout le monde a un rôle, des enfants aux anciens",
            "Le commerce (pièces détachées, marchandises, contrebande, transport) est une source de revenu courante",
            "Une grande importance est donnée à la loyauté envers le clan et à la parole donnée",
          ],
        },
        {
          heading: "Rapport à la ville",
          items: [
            "Les Nomades méprisent souvent la ville, qu’ils considèrent comme corrompue et déconnectée de la réalité",
            "Beaucoup de jeunes nomades partent pourtant tenter leur chance en ville, parfois pour ne jamais revenir",
            "Un nomade banni de son clan perd à la fois sa famille et son identité sociale",
          ],
        },
        {
          heading: "Raffen Shiv",
          items: [
            "Terme désignant les nomades bannis de leur clan d'origine, souvent pour des crimes graves (meurtre, vol, trahison)",
            "Errent hors de toute structure de clan traditionnelle, parfois en bandes",
            "Considérés comme dangereux et indignes de confiance par les clans nomades classiques",
          ],
        },
      ],
    },
  },
  {
    id: "night-city",
    label: "Night City",
    accent: "accent2",
    content: {
      kind: "nightcity",
      histoire: [
        "Construite par Mr Night sur la côte Ouest des USA, fondée via la corpo Night Corp, début 2020, profitant de la faiblesse des USA",
        "Devait être un havre de paix et de luxe pour les riches, est devenue un repère pour les gangs violents, les corpos à la recherche de puissance et de pouvoir, et les politiques corrompus",
        "En 2069, les NUSA commencent la guerre d'unification, forçant beaucoup d'anciens états à rejoindre les NUSA",
        "Les NUSA essayent de récupérer Night City via la force avec Militech, mais NC passe un contrat avec Arasaka pour défendre la ville",
        "Pour éviter une 5ème guerre des corpos, les NUSA acceptent officiellement l'indépendance de Night City (l'accord d'Arvin), mais cherchent toujours dans l'ombre à prendre le contrôle",
      ],
      districts: [
        {
          term: "City Center",
          description:
            "Le cœur corporatif, le district le plus fortifié et sécurisé de la ville.",
        },
        {
          term: "Watson",
          description:
            "Zone d'arrivée historique des migrants, mélange de quartiers populaires et industriels — territoire du Maelstrom.",
        },
        {
          term: "Westbrook",
          description:
            "District le plus prestigieux, mélange de luxe et de quartiers de divertissement — territoire des Tyger Claws.",
        },
        {
          term: "Heywood",
          description:
            "District résidentiel, plutôt latino — territoire des Valentinos.",
        },
        {
          term: "Pacifica",
          description:
            "Ancien projet de zone touristique abandonné, devenu lawless — territoire des Voodoo Boys.",
        },
        {
          term: "Santo Domingo",
          description:
            "District industriel, usines et terrains vagues — territoire du 6th Street.",
        },
        {
          term: "Badlands",
          description:
            "Le désert qui entoure Night City, hors juridiction de la ville — territoire des clans nomades.",
        },
      ],
      trivia: [
        "Une épidémie de grippe aviaire tua environ 7000 personnes dans les années 2050 ; l'interdiction de la viande de volaille s'ensuivit. La viande rouge étant extrêmement chère, la plupart des habitants mangent de la viande All Food à base d'insecte.",
        "Les animaux sont presque inexistants à Night City : pas d’oiseaux, pas de chiens, peu de chats. Seulement des cafards et des rats.",
      ],
    },
  },
  {
    id: "net",
    label: "Le Net",
    accent: "accent",
    content: {
      kind: "sections",
      intro:
        "Le Net est le réseau numérique mondial, héritier d'Internet. Après les dégâts causés par des IA devenues incontrôlables, NetWatch a coupé le Net mondial puis érigé le Mur Noir pour isoler les zones dangereuses (l'Old Net) du reste du réseau.",
      sections: [
        {
          heading: "Netrunning",
          items: [
            "Un netrunner est une personne capable de se connecter directement au Net via une interface neurale (souvent un implant) pour hacker des systèmes à distance",
            "Le netrunning permet de désactiver des caméras, ouvrir des portes, voler des données, ou même attaquer directement le cerveau d'un autre netrunner",
            "Les systèmes de sécurité numériques sont protégés par de l'ICE (Intrusion Countermeasures Electronics), des programmes défensifs pouvant être dangereux pour l'esprit d'un netrunner imprudent",
            "Les Voodoo Boys sont réputés comme les meilleurs netrunners de Night City, certains s’aventurant même au-delà du Mur Noir",
          ],
        },
      ],
    },
  },
  {
    id: "braindance",
    label: "Braindance",
    accent: "accent2",
    content: {
      kind: "sections",
      intro:
        "La braindance (BD) est une technologie permettant d'enregistrer l'intégralité de l'expérience sensorielle et émotionnelle d'une personne — vue, son, odorat, émotions — pour la revivre ensuite à travers un casque spécial.",
      sections: [
        {
          items: [
            "Utilisée comme divertissement de masse (vivre les expériences d'autres personnes, des plus banales aux plus extrêmes)",
            "Aussi utilisée comme outil d'enquête par la police ou les mercenaires pour revivre la scène d'un crime du point de vue d'un témoin",
            "Il existe un marché noir de braindances illégales (violence, expériences extrêmes ou non consenties)",
          ],
        },
      ],
    },
  },
  {
    id: "cyberpsychose",
    label: "Cyberpsychose",
    accent: "accent",
    content: {
      kind: "sections",
      intro:
        "La cyberpsychose est une maladie qui rend fou, touchant particulièrement les personnes très chargées en implants. Si la surcharge d'implants en est la cause la plus connue, les événements traumatisants peuvent fortement accentuer le risque de déclencher une crise chez une personne déjà fragilisée :",
      sections: [
        {
          items: [
            "Exposition prolongée à la violence (combat, guerre, vie dans un gang violent)",
            "Perte d'un proche ou d'un membre du clan",
            "Isolement social prolongé",
            "Stress intense ou répété (dette, traque, survie)",
          ],
        },
      ],
      outro:
        "Une personne en crise de cyberpsychose perd le contrôle, ne distingue plus les menaces réelles des menaces imaginaires, et devient extrêmement dangereuse pour son entourage. Le Maelstrom, par son mode de vie ultra-violent et sa surconsommation d’implants, concentre un grand nombre de cas.",
    },
  },
  {
    id: "chronologie",
    label: "Chronologie",
    accent: "accent2",
    content: {
      kind: "timeline",
      entries: [
        { year: "—", event: "Effondrement des USA" },
        {
          year: "1998",
          event: "Sécheresse transformant une partie de la planète en désert",
        },
        {
          year: "2004-2006",
          event: "Première guerre des corpos (EBM / Orbital Air)",
        },
        {
          year: "2008",
          event: "Deuxième guerre des corpos (SovOil / Petrochem)",
        },
        { year: "2016", event: "Troisième guerre des corpos (NET)" },
        {
          year: "2022-2025",
          event: "Quatrième guerre des corpos (Militech / Arasaka)",
        },
        {
          year: "2023",
          event:
            "Une bombe nucléaire explose dans la tour Arasaka au centre-ville de Night City, marquant la fin de la 4ème guerre des corpos",
        },
        {
          year: "2023",
          event:
            "Début de l'ère Rouge, guerre où l'air est tellement pollué que le ciel apparaît rouge",
        },
        { year: "2025", event: "Coupure du Net planétaire par NetWatch" },
        { year: "2030", event: "Reconstruction de Night City" },
        {
          year: "2044",
          event:
            "Création du Mur Noir par NetWatch, n'arrivant pas à lutter contre les IA libres",
        },
        { year: "2053", event: "Constitution des NUSA" },
      ],
    },
  },
  {
    id: "lexique",
    label: "Lexique",
    accent: "accent",
    content: {
      kind: "glossary",
      entries: [
        {
          term: "Fixer",
          description:
            "Personne faisant le lien entre les mercenaires et les clients, certains ont de véritables empires.",
        },
        {
          term: "Implant",
          description:
            "Partie mécanique remplaçant une partie d'un corps humain, l'améliorant ou le remplaçant.",
        },
        {
          term: "Charcudoc",
          description:
            "Médecin de ce monde, expert en santé et en implantation d’implants en tout genre.",
        },
        {
          term: "Cyberpsychose",
          description:
            "Maladie rendant fou, se produisant souvent lors de la surcharge d’implants.",
        },
        { term: "Cracheur", description: "Flingue, arme à feu." },
        {
          term: "Corpo (personne)",
          description:
            "Personne travaillant ou ayant travaillé dans une corporation.",
        },
        {
          term: "Edgerunner / Mercenaire",
          description:
            "Personne vivant en marge de la loi, vendant ses compétences (combat, hacking, infiltration) au plus offrant.",
        },
        {
          term: "Eddies ($)",
          description: "Monnaie courante utilisée à Night City.",
        },
        {
          term: "Netrunner",
          description:
            "Personne capable de hacker à distance via une connexion directe au Net.",
        },
        {
          term: "Nomade",
          description:
            "Membre d'un clan vivant hors des villes, dans les Badlands.",
        },
        {
          term: "Raffen Shiv",
          description: "Nomade banni de son clan d'origine.",
        },
      ],
    },
  },
];
