export type CadenceType = 'Blitz' | 'Rapide' | 'Classique';
export type TournamentStatus = 'upcoming' | 'ongoing' | 'completed';
export type PlayerCategory = 'Poussin' | 'Pupille' | 'Benjamin' | 'Minime' | 'Cadet' | 'Junior' | 'Senior' | 'Vétéran';

export interface Tournament {
  id: string;
  slug: string;
  title: string;
  titleAr?: string;
  cadence: CadenceType;
  timeControl: string; // ex: "3 min + 2 sec / coup" ou "15 min + 10 sec"
  status: TournamentStatus;
  startDate: string;
  endDate: string;
  time: string;
  location: string;
  locationAr?: string;
  rounds: number;
  system: string; // ex: "Système Suisse 7 rondes"
  arbiter: string;
  organizer: string;
  entryFee: string; // ex: "500 DZD" ou "Gratuit pour les membres"
  prizes: string[];
  description: string;
  rules: string[];
  participantsCount?: number;
  featured?: boolean;
  results?: {
    rank: number;
    name: string;
    club: string;
    points: number;
    elo?: number;
  }[];
}

export interface Player {
  id: string;
  slug: string;
  name: string;
  nameAr?: string;
  category: PlayerCategory;
  fideId?: string;
  fideRating?: number;
  nationalRating?: number;
  titleFide?: string; // ex: "Maître FIDE (FM)", "Candidat Maître (CM)"
  role?: string; // ex: "Capitaine Équipe 1", "Championne U14"
  bio: string;
  achievements: string[];
  avatar: string;
  featured?: boolean;
}

export interface Coach {
  id: string;
  name: string;
  nameAr?: string;
  role: string;
  roleAr?: string;
  titleFide?: string;
  qualifications: string[];
  experience: string;
  bio: string;
  avatar: string;
  specialties: string[];
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  titleAr?: string;
  date: string;
  category: 'Tournoi' | 'École' | 'Vie du club' | 'Fédération';
  summary: string;
  content: string;
  author: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Tournoi' | 'Cours Jeunes' | 'Cours Adultes' | 'Simultanée' | 'Stage';
  location: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Tournois' | 'Entraînements' | 'Remise des prix' | 'Historique';
  date: string;
  imageUrl: string;
  caption: string;
}

export interface TacticalPuzzle {
  id: string;
  title: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Maître';
  toMove: 'white' | 'black';
  fen: string;
  description: string;
  solutionMove: {
    from: string;
    to: string;
    notation: string;
  };
  explanation: string;
}

export interface ClubInfo {
  name: string;
  fullName: string;
  nameAr: string;
  section: string;
  city: string;
  country: string;
  founded: string;
  colors: string;
  president: string;
  headCoach: string;
  address: string;
  addressDetails: string;
  phone: string;
  email: string;
  trainingDays: {
    group: string;
    days: string;
    hours: string;
    location: string;
  }[];
  fees: {
    category: string;
    price: string;
    frequency: string;
    details: string;
  }[];
  stats: {
    membersCount: number;
    titlesWon: number;
    tournamentsHosted: number;
    fideLicensedPlayers: number;
  };
}
