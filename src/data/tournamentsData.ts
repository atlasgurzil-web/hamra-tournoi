import { Tournament } from '../types';

export const tournamentsData: Tournament[] = [
  {
    id: "tournoi-open-annaba-2026",
    slug: "open-national-annaba-2026",
    title: "Grand Open National de la Seybouse – Hamra Annaba",
    titleAr: "البطولة الوطنية المفتوحة لسيبوس – حمراء عنابة",
    cadence: "Rapide",
    timeControl: "15 min + 10 sec / coup",
    status: "upcoming",
    startDate: "2026-09-18",
    endDate: "2026-09-19",
    time: "09h30",
    location: "Salle des Congrès du Complexe Sportif, Annaba",
    locationAr: "قاعة المؤتمرات بالمركب الرياضي، عنابة",
    rounds: 7,
    system: "Système Suisse FIDE (7 rondes)",
    arbiter: "Arbitre Fédéral Officiel FADE",
    organizer: "Hamra Annaba – Section Échecs en partenariat avec la Ligue d'Annaba",
    entryFee: "1 000 DZD (500 DZD pour les U16)",
    prizes: [
      "1er Prix : 50 000 DZD + Trophée Hamra Annaba",
      "2ème Prix : 30 000 DZD + Médaille d'argent",
      "3ème Prix : 20 000 DZD + Médaille de bronze",
      "Meilleur Jeune U16 : 10 000 DZD + Coupe",
      "Meilleure Féminine : 10 000 DZD + Trophée"
    ],
    description: "Le grand rendez-vous échiquéen de la rentrée sportive à Annaba. Réunissant les meilleurs maîtres et espoirs de l'Est algérien et du territoire national pour un tournoi homologué FIDE.",
    rules: [
      "Homologation FIDE Rapide officielle.",
      "Règle de tolérance de retard : 15 minutes après le coup d'envoi.",
      "Interdiction stricte des appareils électroniques dans l'aire de jeu.",
      "Départages : Buchholz Tronqué, Buchholz Total, Sonneborn-Berger, Nombre de victoires."
    ],
    participantsCount: 48,
    featured: true
  },
  {
    id: "blitz-vendredi-hamra",
    slug: "blitz-hebdomadaire-hamra-septembre",
    title: "Tournoi Blitz des Maîtres d'Annaba",
    titleAr: "دورة الخاطف لأساتذة عنابة",
    cadence: "Blitz",
    timeControl: "3 min + 2 sec / coup",
    status: "upcoming",
    startDate: "2026-09-04",
    endDate: "2026-09-04",
    time: "16h00",
    location: "Club House Hamra Annaba, Annaba",
    locationAr: "مقر نادي حمراء عنابة",
    rounds: 9,
    system: "Système Suisse 9 rondes",
    arbiter: "Arbitre de Club",
    organizer: "Section Échecs Hamra Annaba",
    entryFee: "300 DZD (Gratuit pour les membres inscrits)",
    prizes: [
      "1er : Coupe + Récompense club",
      "2ème : Médaille + Livre d'échecs tactique",
      "3ème : Médaille"
    ],
    description: "Tournoi de vitesse intense ouvert à tous les sociétaires et passionnés d'Annaba pour affûter ses réflexes tactiques sous pendule.",
    rules: [
      "Application stricte des règles FIDE du jeu Blitz.",
      "Chute du drapeau = partie perdue si le camp adverse a du matériel matant."
    ],
    participantsCount: 24,
    featured: false
  },
  {
    id: "championnat-jeunes-annaba-2026",
    slug: "criterium-jeunes-espoirs-hamra-2026",
    title: "Critérium des Jeunes Espoirs de Hamra Annaba (U10 à U18)",
    titleAr: "دورة البراعم والناشئين حمراء عنابة",
    cadence: "Classique",
    timeControl: "60 min + 30 sec / coup",
    status: "upcoming",
    startDate: "2026-10-10",
    endDate: "2026-10-11",
    time: "10h00",
    location: "Salle d'entraînement officielle Hamra Annaba",
    locationAr: "قاعة التدريب الرسمية لنادي حمراء عنابة",
    rounds: 5,
    system: "Système Suisse 5 rondes par catégorie",
    arbiter: "Commission Technique Jeunes",
    organizer: "École d'Échecs Hamra Annaba",
    entryFee: "Gratuit pour les élèves de l'école",
    prizes: [
      "Trophées pour les champions de chaque catégorie d'âge",
      "Médailles pour tous les participants du podium",
      "Sélection pour le championnat régional de ligue"
    ],
    description: "Tournoi officiel de détection et de mise en pratique pour les élèves de l'école d'échecs de Hamra Annaba avec notation obligatoire des parties.",
    rules: [
      "Notation obligatoire sur feuille de partie fournie par le club.",
      "Analyse pédagogique post-partie assurée par les entraîneurs du club."
    ],
    participantsCount: 36,
    featured: true
  },
  {
    id: "coupe-ete-annaba-2026",
    slug: "coupe-est-algerien-hamra-2026",
    title: "Coupe de l'Est Algérien – Édition Estivale 2026",
    titleAr: "كأس الشرق الجزائري للشطرنج 2026",
    cadence: "Rapide",
    timeControl: "15 min + 5 sec / coup",
    status: "completed",
    startDate: "2026-07-25",
    endDate: "2026-07-25",
    time: "09h00",
    location: "Palais de la Culture Mohamed Boudiaf, Annaba",
    locationAr: "قصر الثقافة محمد بوضياف، عنابة",
    rounds: 7,
    system: "Système Suisse 7 rondes",
    arbiter: "Arbitre National",
    organizer: "Hamra Annaba & Ligue Régionale",
    entryFee: "500 DZD",
    prizes: ["1er Prix : Trophée + Prime", "2ème Prix : Médaille d'argent", "3ème Prix : Médaille de bronze"],
    description: "Grande compétition régionale d'été regroupant les meilleurs clubs de Constantine, Guelma, Skikda, Souk Ahras et Annaba.",
    rules: ["Règles officielles FIDE Rapide."],
    participantsCount: 64,
    featured: false,
    results: [
      { rank: 1, name: "Sociétaire Hamra Annaba", club: "Hamra Annaba", points: 6.5, elo: 2120 },
      { rank: 2, name: "Maître Régional", club: "CS Constantine", points: 6.0, elo: 2095 },
      { rank: 3, name: "Capitaine Hamra Annaba", club: "Hamra Annaba", points: 5.5, elo: 2040 },
      { rank: 4, name: "Espoir U18", club: "Échiquier Skikda", points: 5.5, elo: 1980 },
      { rank: 5, name: "Joueur Senior", club: "Guelma Échecs", points: 5.0, elo: 1910 }
    ]
  }
];
