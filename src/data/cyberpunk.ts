export interface StatDef {
  key: Stat;
  name: string;
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
  { key: "COR", name: "Corps" },
  { key: "REF", name: "Réflexes" },
  { key: "DEX", name: "Dextérité" },
  { key: "TECH", name: "Technique" },
  { key: "INT", name: "Intelligence" },
  { key: "VOL", name: "Volonté" },
  { key: "PRES", name: "Prestance" },
  { key: "EMP", name: "Empathie" },
  { key: "CHA", name: "Chance" },
  { key: "MOUV", name: "Mouvement" },
];

export const SKILLS: [name: string, statKey: Stat][] = [
  ["Armes d'épaule", "REF"],
  ["Armes lourdes", "REF"],
  ["Armes de mêlée", "DEX"],
  ["Assistance Médicale", "TECH"],
  ["Athlétisme", "DEX"],
  ["Athlétisme", "DEX"],
  ["Bagarre", "DEX"],
  ["Bibliothèque", "INT"],
  ["Bureaucratie", "INT"],
  ["Composition", "INT"],
  ["Comptabilité", "INT"],
  ["Concentration", "VOL"],
  ["Conduite de véhicule terrestre", "REF"],
  ["Connaissance de la rue", "PRES"],
  ["Connaissance", "INT"],
  ["Contrefaçon", "TECH"],
  ["Conversation", "EMP"],
  ["Corruption", "PRES"],
  ["Criminologie", "INT"],
  ["Crochetage", "TECH"],
  ["Cryptoigraphie", "INT"],
  ["Cybertech", "TECH"],
  ["Danse", "DEX"],
  ["Déduction", "INT"],
  ["Discrétion", "DEX"],
  ["Dissimulation/Révémation d'objet", "INT"],
  ["Endurance", "VOL"],
  ["Esquive", "DEX"],
  ["Gestion d'affaire", "INT"],
  ["Guide local", "INT"],
  ["Habillement et style", "PRES"],
  ["Instrument", "TECH"],
  ["Interrogatoire", "PRES"],
  ["Jeu d'acteur", "PRES"],
  ["Négoce", "PRES"],
  ["Perception", "INT"],
  ["Persuasion", "PRES"],
  ["Photos et films", "TECH"],
  ["Pickpocket", "TECH"],
  ["Pistage", "INT"],
  ["Pistolet", "REF"],
  ["Premier secours", "TECH"],
  ["Psychologie", "EMP"],
  ["Résistance à la torture/aux drogues", "VOL"],
  ["Sécurité Électronique", "TECH"],
  ["Tactique", "INT"],
  ["Tir automatique", "REF"],
];

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
