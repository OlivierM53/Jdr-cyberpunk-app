export interface LoreEntry {
  category: string;
  title: string;
  body: string;
}

// Contenu éditable directement ici par le MJ — non modifiable depuis l'interface.
// Chaque entrée : une catégorie (regroupe les entrées dans le menu), un titre,
// et un corps de texte (paragraphes séparés par une ligne vide).
export const LORE_ENTRIES: LoreEntry[] = [
  {
    category: 'Histoire',
    title: 'Le Temps du Rouge',
    body: `En 2023, la Quatrième Guerre Corporatiste s'achève avec la destruction d'Arasaka Tower par une frappe nucléaire sur Night City. L'explosion et l'hiver nucléaire qui suit plongent le monde dans le chaos : famines, effondrement des gouvernements, montée en puissance des gangs et des corporations survivantes.

Cette période, surnommée le Temps du Rouge, dure une décennie. Night City devient une île de reconstruction chaotique au milieu des ruines, rebâtie à la hâte par ceux qui refusent de la laisser mourir — habitants, corpos de second rang et Nomades revenus prêter main-forte.

Aujourd'hui la ville a retrouvé ses néons et son vernis de prospérité, mais les cicatrices du Rouge marquent toujours les esprits : la loi du plus fort, la méfiance envers les grandes corporations, et une population habituée à ne compter que sur elle-même.`,
  },
  {
    category: 'Lieux',
    title: 'Night City',
    body: `Night City, officiellement fondée par Richard Night au sud de la baie de San Francisco, est une cité-état indépendante bâtie sur l'argent corporatiste et l'ambition démesurée. Son slogan officieux : "Une ville pour vivre le rêve — d'une manière ou d'une autre".

La ville se divise en districts bien distincts : City Center (le cœur corporatiste, tours de verre et sièges sociaux), Watson (mosaïque d'immigrants et de petits commerces, dont Little China et Kabuki), Westbrook (luxe, Japantown et la NCART), Heywood (quartiers résidentiels et territoires de gangs latinos), Santo Domingo (zone industrielle tentaculaire) et Pacifica, quartier abandonné à moitié en ruine où la loi n'entre plus.

Au-delà des murs s'étendent les Badlands, désert irradié parcouru par les familles Nomades, seules à savoir encore y survivre et y voyager en sécurité.`,
  },
  {
    category: 'Factions',
    title: 'Les corporations',
    body: `Les corporations (les "Corpos") sont les véritables puissances du monde de 2045 : elles possèdent des armées privées, dictent les lois de fait et traitent les gouvernements nationaux comme des partenaires commerciaux mineurs. Arasaka (sécurité, finance, ex-toute-puissante avant le Rouge), Militech (armement, rivale historique d'Arasaka) et Biotechnica (agroalimentaire, biotech) dominent le paysage.

Travailler pour une corpo garantit un salaire confortable, une assurance santé et un statut social — au prix d'une loyauté totale et d'une vie entièrement quadrillée par l'employeur. Beaucoup d'edgerunners sont d'anciens employés corpos qui ont fui ce système, ou des indépendants engagés ponctuellement pour des sales boulots que la corpo ne veut pas signer de son nom.`,
  },
  {
    category: 'Factions',
    title: 'Gangs et Nomades',
    body: `Les gangs de rue contrôlent le quotidien de la plupart des quartiers non corpos : les Maelstrom (cyberpsychose et culte de la machine), les Valentinos (fierté latino et honneur de rue à Heywood), les Tyger Claws (yakuzas de Japantown) ou les Voodoo Boys (netrunners de Pacifica, seuls à vraiment maîtriser le Net Ancien) en sont les plus connus. Chacun a son territoire, son code et sa manière bien à lui de régler ses comptes.

Les familles Nomades, elles, ont choisi de vivre hors des villes, en clans mobiles sillonnant les Badlands à bord de convois de véhicules. Rejetées par la société corpo, elles vivent selon un code d'honneur et de solidarité familiale strict — et sont souvent les seules capables de faire traverser en sécurité le désert irradié à qui en a les moyens, ou l'amitié.`,
  },
  {
    category: 'Technologie',
    title: 'Cyberware et Humanité',
    body: `Remplacer un membre, un œil ou tout un système organique par de la cybernétique est monnaie courante à Night City — des lames rétractables aux optiques augmentées en passant par les interfaces neuronales qui permettent d'interagir directement avec les machines. Le cyberware transforme un corps humain en arme, en outil ou en œuvre d'art, selon les moyens et les goûts de son propriétaire.

Mais chaque implant a un coût : l'humanité. Trop de métal et de silicium dans un même corps use le lien du porteur avec sa propre psyché, jusqu'à la cyberpsychose — une perte de contact totale avec son humanité qui transforme l'individu en menace incontrôlable, souvent maîtrisée uniquement par le MAX-TAC, l'unité de police spécialisée dans ce genre d'incidents.`,
  },
  {
    category: 'Technologie',
    title: 'Le Net et les Netrunners',
    body: `Depuis le Blackout de 2027 — une attaque informatique massive qui a détruit l'ancien Net mondial et grillé des milliers de netrunners connectés au moment des faits — le réseau global a été reconstruit en une version cloisonnée et bien plus sûre : le NET, découpé en intranets corporatifs et municipaux difficiles à pénétrer de l'extérieur.

Les netrunners sont les seuls capables de plonger dans ces architectures numériques à l'aide d'un cyberdeck et d'une interface neuronale, pour y voler des données, saboter des systèmes de sécurité ou couvrir les arrières d'une équipe sur le terrain. Certains, comme les Voodoo Boys, prétendent même pouvoir encore accéder aux vestiges corrompus de l'Ancien Net, quelque part au-delà du Blackwall qui protège le monde connecté d'une menace que peu comprennent vraiment.`,
  },
];
