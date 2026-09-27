import { ClubInfo } from '../types';

export const clubData: ClubInfo = {
  name: "Hamra Annaba",
  fullName: "Club Omnisports Hamra Annaba – Section Échecs",
  nameAr: "نادي حمراء عنابة – فرع الشطرنج",
  section: "Section Échecs",
  city: "Annaba",
  country: "Algérie",
  founded: "1944",
  colors: "Rouge et Blanc (أحمر وأبيض)",
  president: "Direction de la Section Échecs Hamra",
  headCoach: "Maître Formateur Club",
  address: "Complexe Sportif & Maison de Jeunes d'Annaba",
  addressDetails: "Centre-ville d'Annaba, Wilaya d'Annaba, Algérie",
  phone: "+213 (0) 38 00 00 00 / Contact Club",
  email: "contact@hamra-annaba-echecs.dz",
  trainingDays: [
    {
      group: "École d'Échecs – Éveil & Débutants (6 à 10 ans)",
      days: "Vendredi & Samedi matin",
      hours: "09h00 – 11h00",
      location: "Salle d'entraînement Hamra Annaba"
    },
    {
      group: "Perfectionnement & Compétiteurs Jeunes (11 à 18 ans)",
      days: "Vendredi après-midi & Mardi soir",
      hours: "14h30 – 17h00 / 17h30 – 19h30",
      location: "Salle des tournois Hamra Annaba"
    },
    {
      group: "Section Adultes & Pôle Compétition FIDE",
      days: "Jeudi soir & Samedi après-midi",
      hours: "18h00 – 21h00 / 15h00 – 19h00",
      location: "Club House Hamra Annaba"
    }
  ],
  fees: [
    {
      category: "École Jeunes (6-17 ans)",
      price: "1 500 DZD",
      frequency: "/ mois",
      details: "2 séances hebdomadaires + accès aux tournois internes et matériel officiel."
    },
    {
      category: "Licencié Compétition (Adulte)",
      price: "2 000 DZD",
      frequency: "/ mois",
      details: "Entraînements tactiques, analyse de parties FIDE et affiliation aux ligues."
    },
    {
      category: "Adhésion Loisir & Amateurs",
      price: "1 000 DZD",
      frequency: "/ mois",
      details: "Accès libre aux journées de jeu, blitz hebdomadaires et bibliothèque du club."
    }
  ],
  stats: {
    membersCount: 85,
    titlesWon: 14,
    tournamentsHosted: 28,
    fideLicensedPlayers: 32
  }
};
