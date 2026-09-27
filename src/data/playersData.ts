import { Player } from '../types';

export const playersData: Player[] = [
  {
    id: "joueur-1",
    slug: "capitaine-equipe-premiere",
    name: "A. Benali",
    nameAr: "أ. بن علي",
    category: "Senior",
    fideId: "FIDE-DZ-89421",
    fideRating: 2145,
    nationalRating: 2180,
    titleFide: "Candidat Maître (CM)",
    role: "Capitaine de l'Équipe Première",
    bio: "Pilier de la section échecs de Hamra Annaba depuis plus de 10 ans. Représentant du club aux championnats nationaux par équipes et formateur auprès des espoirs.",
    achievements: [
      "Champion de Wilaya d'Annaba (2024, 2025)",
      "3ème place Championnat National d'Algérie par Équipes",
      "Vainqueur du Grand Open de l'Est 2025"
    ],
    avatar: "/images/player-chess.svg",
    featured: true
  },
  {
    id: "joueur-2",
    slug: "espoir-u16-hamra",
    name: "Y. Khelifi",
    nameAr: "ي. خليفي",
    category: "Cadet",
    fideId: "FIDE-DZ-94102",
    fideRating: 1890,
    nationalRating: 1925,
    role: "Champion Régional U16",
    bio: "Pur produit de l'école d'échecs de Hamra Annaba, il a débuté à l'âge de 8 ans au club. Réputé pour son style offensif et sa maîtrise de la Défense Sicilienne.",
    achievements: [
      "Médaille d'or Critérium Régional U16",
      "Top 5 Championnat d'Algérie des Jeunes 2025",
      "Vainqueur du Blitz Hamra Annaba 2026"
    ],
    avatar: "/images/player-chess.svg",
    featured: true
  },
  {
    id: "joueur-3",
    slug: "feminine-espoir-u14",
    name: "S. Mansouri",
    nameAr: "س. منصوري",
    category: "Minime",
    fideId: "FIDE-DZ-95310",
    fideRating: 1760,
    nationalRating: 1810,
    role: "Championne Féminine U14",
    bio: "Jeune prodige de l'école de formation de Hamra Annaba, alliant précision tactique et rigueur en finale.",
    achievements: [
      "Championne de l'Est Féminine U14 (2025)",
      "Sélectionnée en équipe régionale espoirs",
      "Meilleure Féminine de l'Open de la Seybouse"
    ],
    avatar: "/images/player-chess.svg",
    featured: true
  },
  {
    id: "joueur-4",
    slug: "senior-tactique-hamra",
    name: "M. Bouzid",
    nameAr: "م. بوزيد",
    category: "Senior",
    fideId: "FIDE-DZ-78219",
    fideRating: 2010,
    nationalRating: 2045,
    role: "Membre Équipe 1 & Arbitre Club",
    bio: "Spécialiste des ouvertures modernes et des cadences rapides. Anime régulièrement les sessions d'analyse après les tournois.",
    achievements: [
      "Vice-champion d'Annaba 2024",
      "Vainqueur du Mémorial d'Automne 2025"
    ],
    avatar: "/images/player-chess.svg",
    featured: false
  },
  {
    id: "joueur-5",
    slug: "poussin-releve-u10",
    name: "I. Zerguine",
    nameAr: "إ. زرقين",
    category: "Poussin",
    fideRating: 1420,
    nationalRating: 1480,
    role: "Espoir École d'Échecs",
    bio: "Grand espoir des moins de 10 ans formé chaque samedi matin au club avec passion et enthousiasme.",
    achievements: [
      "1ère place Tournoi Inter-Écoles d'Annaba 2026",
      "Prix du plus jeune participant Coupe de l'Est"
    ],
    avatar: "/images/player-chess.svg",
    featured: false
  }
];
