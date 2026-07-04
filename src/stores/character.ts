import { computed, reactive, ref, watch } from "vue";
import { defineStore } from "pinia";
import {
  type AccentName,
  ACCENTS,
  ACCENTS_LIGHT,
  type RoleKey,
  ROLES,
  roleSkillDefaults,
  skillCost,
  SKILLS,
  STAT_DEFS,
} from "@/data/cyberpunk";

const STORAGE_KEY = "cyber-chargen-v1";
const THEME_KEY = "cyber-chargen-theme";

export type Theme = "dark" | "light";

export interface Weapon {
  id: number;
  name: string;
  dmg: string;
  atk: number;
}

export interface Cyberware {
  id: number;
  name: string;
  cost: number;
}

export interface Equipment {
  id: number;
  type: string;
  name: string;
  qty: number;
}

export interface Character {
  nom: string;
  genre: string;
  alias: string;
  role: string;
  origine: string;
  age: string;
  stats: Record<string, number>;
  skills: Record<string, number>;
  hp: number;
  armorHead: number;
  armorBody: number;
  humanity: number;
  eddies: number;
  weapons: Weapon[];
  cyberware: Cyberware[];
  equipment: Equipment[];
  bg: Record<string, string>;
  portrait: string | null;
}

function defaultCharacter(): Character {
  const stats: Record<string, number> = {};
  STAT_DEFS.forEach((d) => (stats[d.key] = 5));
  const skills: Record<string, number> = {};
  SKILLS.forEach(([name]) => (skills[name] = 0));
  return {
    nom: "",
    genre: "",
    alias: "",
    role: "",
    origine: "",
    age: "",
    stats,
    skills,
    hp: 35,
    armorHead: 7,
    armorBody: 7,
    humanity: 40,
    eddies: 500,
    weapons: [],
    cyberware: [],
    equipment: [],
    bg: {},
    portrait: null,
  };
}

function loadCharacter(): Character {
  const base = defaultCharacter();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return Object.assign(base, JSON.parse(raw));
  } catch {
    /* ignore corrupted storage */
  }
  return base;
}

export const useCharacterStore = defineStore("character", () => {
  const char = reactive<Character>(loadCharacter());
  const accent = ref<AccentName>("cyan");
  const bgMode = ref<"rain" | "grid" | "solid">("rain");
  const theme = ref<Theme>(
    (localStorage.getItem(THEME_KEY) as Theme) || "dark",
  );
  let nextId = 100;

  watch(
    char,
    () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(char));
      } catch {
        /* storage full or unavailable */
      }
    },
    { deep: true },
  );

  const hpMax = computed(() =>
    10 +
    5 * Math.ceil(((char.stats["COR"] || 0) + (char.stats["VOL"] || 0)) / 2)
  );
  const hpPct = computed(
    () => (hpMax.value ? Math.round((char.hp / hpMax.value) * 100) : 0),
  );

  const statSum = computed(() =>
    STAT_DEFS.reduce((t, d) => t + (char.stats[d.key] || 0), 0)
  );

  const skillSum = computed(() =>
    SKILLS.reduce(
      (t, [name]) => t + (char.skills[name] || 0) * skillCost(name),
      0,
    )
  );

  const humanityMax = computed(() => (char.stats["EMP"] || 0) * 10);
  const humanityNow = computed(() =>
    Math.max(0, Math.min(humanityMax.value, char.humanity || 0))
  );
  const humanityPct = computed(() =>
    humanityMax.value
      ? Math.round((humanityNow.value / humanityMax.value) * 100)
      : 0
  );

  const idCode = computed(() => {
    const base = (char.alias || char.nom || "V")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 3)
      .padEnd(3, "X");
    return "NC-" + base + "-" +
      String((statSum.value * 7 + humanityMax.value) % 9000 + 1000);
  });

  function setStat(key: string, delta: number) {
    char.stats[key] = Math.max(1, Math.min(10, (char.stats[key] || 0) + delta));
  }

  function applyRoleDefaults(roleKey: string) {
    const role = ROLES[roleKey as RoleKey];
    if (!role) return;
    Object.assign(char.stats, role.stats);
    Object.assign(char.skills, roleSkillDefaults(roleKey as RoleKey));
  }

  function setSkill(name: string, delta: number) {
    char.skills[name] = Math.max(
      0,
      Math.min(10, (char.skills[name] || 0) + delta),
    );
  }

  function setHp(delta: number) {
    char.hp = Math.max(0, Math.min(hpMax.value, (char.hp || 0) + delta));
  }
  function fullHeal() {
    char.hp = hpMax.value;
  }

  function setArmor(key: "armorHead" | "armorBody", delta: number) {
    char[key] = Math.max(0, Math.min(30, (char[key] || 0) + delta));
  }

  function setHumanity(delta: number) {
    char.humanity = Math.max(
      0,
      Math.min(humanityMax.value, (char.humanity || 0) + delta),
    );
  }
  function setHumanityVal(val: string | number) {
    char.humanity = Math.max(
      0,
      Math.min(humanityMax.value, parseInt(String(val)) || 0),
    );
  }

  function setEddies(val: string | number) {
    char.eddies = Math.max(
      0,
      parseInt(String(val).replace(/[^0-9]/g, "")) || 0,
    );
  }

  function setBg(key: string, value: string) {
    char.bg[key] = value;
  }

  function addWeapon() {
    char.weapons.push({ id: nextId++, name: "", dmg: "", atk: 1 });
  }
  function updateWeapon(id: number, patch: Partial<Weapon>) {
    const w = char.weapons.find((x) => x.id === id);
    if (w) Object.assign(w, patch);
  }
  function removeWeapon(id: number) {
    char.weapons = char.weapons.filter((x) => x.id !== id);
  }

  function addCyber() {
    char.cyberware.push({ id: nextId++, name: "", cost: 0 });
  }
  function updateCyber(id: number, patch: Partial<Cyberware>) {
    const c = char.cyberware.find((x) => x.id === id);
    if (c) Object.assign(c, patch);
  }
  function removeCyber(id: number) {
    char.cyberware = char.cyberware.filter((x) => x.id !== id);
  }

  function addEquip() {
    char.equipment.push({ id: nextId++, type: "", name: "", qty: 1 });
  }
  function updateEquip(id: number, patch: Partial<Equipment>) {
    const e = char.equipment.find((x) => x.id === id);
    if (e) Object.assign(e, patch);
  }
  function removeEquip(id: number) {
    char.equipment = char.equipment.filter((x) => x.id !== id);
  }

  function setPortrait(dataUrl: string | null) {
    char.portrait = dataUrl;
  }

  function setAccent(name: AccentName) {
    accent.value = name;
    applyAccent(name);
  }
  function applyAccent(name: AccentName) {
    const palette = theme.value === "light" ? ACCENTS_LIGHT : ACCENTS;
    const p = palette[name] || palette.cyan;
    const root = document.documentElement.style;
    root.setProperty("--color-accent", p.a);
    root.setProperty("--color-accent-2", p.b);
    root.setProperty("--color-accent-soft", p.soft);
    root.setProperty("--color-accent-glow", p.glow);
  }

  function applyTheme(t: Theme) {
    document.documentElement.dataset.theme = t;
    applyAccent(accent.value);
  }
  function setTheme(t: Theme) {
    theme.value = t;
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch {
      /* storage full or unavailable */
    }
    applyTheme(t);
  }
  function toggleTheme() {
    setTheme(theme.value === "dark" ? "light" : "dark");
  }

  const BG_MODES = ["rain", "grid", "solid"] as const;
  function toggleBgMode() {
    const next =
      BG_MODES[(BG_MODES.indexOf(bgMode.value) + 1) % BG_MODES.length];
    bgMode.value = next ?? "rain";
  }

  function reset() {
    Object.assign(char, defaultCharacter());
  }

  function exportCharacter() {
    return JSON.stringify(char, null, 2);
  }

  function importCharacter(json: string) {
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== "object") {
      throw new Error(
        "Le fichier ne contient pas une fiche de personnage valide.",
      );
    }
    Object.assign(char, defaultCharacter(), parsed);
  }

  return {
    char,
    accent,
    bgMode,
    theme,
    hpMax,
    hpPct,
    statSum,
    skillSum,
    humanityMax,
    humanityNow,
    humanityPct,
    idCode,
    setStat,
    applyRoleDefaults,
    setSkill,
    setHp,
    fullHeal,
    setArmor,
    setHumanity,
    setHumanityVal,
    setEddies,
    setBg,
    addWeapon,
    updateWeapon,
    removeWeapon,
    addCyber,
    updateCyber,
    removeCyber,
    addEquip,
    updateEquip,
    removeEquip,
    setPortrait,
    setAccent,
    applyAccent,
    applyTheme,
    setTheme,
    toggleTheme,
    toggleBgMode,
    reset,
    exportCharacter,
    importCharacter,
  };
});
