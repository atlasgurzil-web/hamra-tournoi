import { Coach } from '../types';

export const coachesData: Coach[] = [
  {
    id: "coach-1",
    name: "Maître Entraîneur Fédéral",
    nameAr: "المدرب الفيدرالي المعتمد",
    role: "Directeur Technique & Entraîneur Principal",
    roleAr: "المدير الفني والمدرب الرئيسي",
    titleFide: "Entraîneur Fédéral FADE",
    qualifications: [
      "Diplôme d'Entraîneur Fédéral officiel",
      "Joueur titré en compétitions nationales",
      "Plus de 15 ans d'expérience dans la formation échiquéenne"
    ],
    experience: "15+ années d'encadrement de jeunes talents",
    bio: "Passionné par la transmission et la pédagogie échiquéenne, il dirige la section technique de Hamra Annaba et prépare les jeunes pour les compétitions fédérales.",
    avatar: "/images/coach-chess.svg",
    specialties: ["Préparation d'ouvertures", "Stratégie de milieu de jeu", "Psychologie de compétition"]
  },
  {
    id: "coach-2",
    name: "Éducateur Spécialisé Initiation Jeunes",
    nameAr: "مؤطر الفئات الصغرى والبراعم",
    role: "Responsable Pôle Éveil & Débutants",
    roleAr: "مسؤول مدرسة البراعم والمبتدئين",
    qualifications: [
      "Animateur de club certifié",
      "Spécialiste de l'apprentissage par le jeu (6-12 ans)",
      "Arbitre de club officiel"
    ],
    experience: "8 années d'enseignement en milieu scolaire et associatif",
    bio: "Responsable de l'accueil des enfants à l'école de Hamra Annaba. Sa méthode ludique développe la concentration, le calcul mental et l'esprit sportif des plus jeunes.",
    avatar: "/images/coach-chess.svg",
    specialties: ["Fondamentaux tactiques", "Finales élémentaires", "Règles FIDE et notation"]
  }
];
