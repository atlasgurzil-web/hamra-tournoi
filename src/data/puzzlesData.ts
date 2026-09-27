import { TacticalPuzzle } from '../types';

export const dailyPuzzles: TacticalPuzzle[] = [
  {
    id: "puzzle-1",
    title: "Le Sacrifice de la Dame à Annaba",
    difficulty: "Intermédiaire",
    toMove: "white",
    fen: "r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4",
    description: "Les Blancs profitent de la position vulnérable du Roi noir pour déclencher une attaque foudroyante.",
    solutionMove: {
      from: "c4",
      to: "f7",
      notation: "Fxf7+"
    },
    explanation: "Fxf7+ ! Le Fou blanc sacrifie sur f7 en déroquant le Roi noir et brisant toute défense coordonnée."
  },
  {
    id: "puzzle-2",
    title: "Mat du Couloir – Précision Finale",
    difficulty: "Débutant",
    toMove: "white",
    fen: "6k1/5ppp/8/8/8/8/4QPPP/6K1 w - - 0 1",
    description: "Trouvez le coup direct qui scelle la victoire immédiate pour les Blancs.",
    solutionMove: {
      from: "e2",
      to: "e8",
      notation: "De8#"
    },
    explanation: "De8# ! Le Roi noir est emprisonné derrière ses propres pions (Mat du couloir)."
  },
  {
    id: "puzzle-3",
    title: "La Fourchette Royale du Cavalier",
    difficulty: "Intermédiaire",
    toMove: "white",
    fen: "r1bqk2r/pppp1ppp/8/4n3/2B1N3/8/PPPP1PPP/R1BQK2R w KQkq - 0 1",
    description: "Exploitez le placement des pièces noires pour gagner du matériel décisif.",
    solutionMove: {
      from: "e4",
      to: "d6",
      notation: "Cd6+"
    },
    explanation: "Cd6+ ! Échec au Roi avec attaque simultanée de la Dame noire non protégée."
  }
];
