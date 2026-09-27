# Plan : Site Officiel Hamra Annaba (Section Échecs)

> PRD source : docs/PRD.md

## Décisions architecturales

Décisions durables qui s'appliquent à toutes les phases :

- **Stack Technique** : React 18+ / TypeScript + Vite + Tailwind CSS + Lucide Icons + React Router v6.
- **Routes & URL Patterns** :
  - `/` : Accueil (Hero, Prochain événement, École, Actualités, Puzzle interactif)
  - `/club` : Le Club (Histoire, Identité, Valeurs, Dirigeants)
  - `/ecole` : École d'Échecs (Groupes d'âge, Programmes, Créneaux, Tarifs)
  - `/tournois` : Hub des compétitions (Filtres statut & cadence)
  - `/tournois/:slug` : Fiche détaillée d'un tournoi avec inscription
  - `/joueurs` : Effectif des compétiteurs et jeunes
  - `/joueurs/:slug` : Fiche individuelle détaillée du joueur
  - `/entraineurs` : Staff technique et encadrement
  - `/resultats` : Résultats officiels et grilles de tournois
  - `/calendrier` : Calendrier de la saison
  - `/actualites` : Magazine et communiqués
  - `/actualites/:slug` : Fiche article détaillée
  - `/galerie` : Galerie photos des compétitions et entraînements
  - `/contact` : Formulaire de contact / adhésion et plan d'accès à Annaba
- **Modèles de données clés (src/types/)** : `Tournament`, `Player`, `Coach`, `NewsArticle`, `CalendarEvent`, `ClubInfo`, `TacticalPuzzle`.
- **Données découplées (src/data/)** : Tous les contenus sont modulaires, typés et éditables sans toucher au code des composants.
- **Design System** : Tokens Rouge Hamra (`#DC2626` / `#991B1B`), Noir Ardoise (`#0B0F17`), Blanc (`#FFFFFF`), Or Trophée (`#D97706`), typographies sportives Outfit / Barlow + Inter.
- **Bilinguisme** : Support du Français et de l'Arabe (نادي حمراء عنابة) avec switcher instantané.

---

## Phase 1 : Socle technique, Design System & Layout Global

**User stories** : US-10, US-11

### Ce qu'on livre
Initialisation du projet Vite + React + TypeScript + Tailwind CSS, intégration du logo officiel, configuration des polices et couleurs, Header responsive avec menu mobile et sélecteur FR/AR, Footer institutionnel et Breadcrumbs.

### Critères d'acceptation
- [ ] Le projet compile et tourne sans erreur.
- [ ] Le Header affiche le logo officiel, les liens de navigation, le sélecteur bilingue et le CTA Adhésion.
- [ ] Le menu mobile s'ouvre et se ferme de manière fluide sans débordement horizontal.
- [ ] Le Footer contient les liens du club, mentions légales et coordonnées d'Annaba.

## Bloquée par
Aucune — démarrable immédiatement.

---

## Phase 2 : Homepage & Identité du Club

**User stories** : US-1, US-10

### Ce qu'on livre
Homepage complète et immersive avec Hero cinématique, bandeau du prochain tournoi, présentation de Hamra Annaba, chiffres clés, raccourcis vers les sections clés et appel à l'action pour rejoindre le club.

### Critères d'acceptation
- [ ] Le Hero met en valeur l'identité sportive de Hamra Annaba et les échecs.
- [ ] Le bandeau met en avant le prochain événement officiel du club.
- [ ] Page d'histoire et de présentation (`/club`) détaillée avec valeurs et direction.

## Bloquée par
Phase 1

---

## Phase 3 : École d'Échecs & Formation

**User stories** : US-2, US-9, US-10

### Ce qu'on livre
Page `/ecole` dédiée à la formation des jeunes et adultes : groupes de niveau (Poussins, Pupilles, Benjamins, Espoirs, Adultes), méthodologie pédagogique, créneaux d'entraînement à Annaba et formulaire de pré-inscription.

### Critères d'acceptation
- [ ] Présentation claire des créneaux et programmes par tranche d'âge.
- [ ] Bouton d'inscription ouvrant le formulaire de pré-inscription avec confirmation.

## Bloquée par
Phase 1

---

## Phase 4 : Hub Tournois & Inscriptions Interactives

**User stories** : US-3, US-4, US-10

### Ce qu'on livre
Hub des compétitions `/tournois` avec filtres instantanés par cadence (Blitz, Rapide, Classique) et statut (À venir, En cours, Terminés). Fiches dynamiques `/tournois/:slug` avec cadence, rondes, prix, liste des engagés et modal d'inscription direct.

### Critères d'acceptation
- [ ] Filtrage des tournois en temps réel.
- [ ] Chaque tournoi possède sa route dédiée `/tournois/:slug` avec règlement complet.
- [ ] Formulaire modal d'inscription fonctionnel avec validation et message de succès.

## Bloquée par
Phase 1

---

## Phase 5 : Effectif Joueurs & Encadrement Technique

**User stories** : US-5, US-10

### Ce qu'on livre
Pages `/joueurs` et `/joueurs/:slug` avec cartes joueurs, catégories et classements ELO, ainsi que la page `/entraineurs` présentant le staff technique et les qualifications.

### Critères d'acceptation
- [ ] Fiches joueurs détaillées avec historique et palmarès.
- [ ] Page entraîneurs avec rôles et pédagogie du club.

## Bloquée par
Phase 1

---

## Phase 6 : Module Échiquier & Puzzle Tactique Interactif

**User stories** : US-6, US-10

### Ce qu'on livre
Widget interactif intégré sur la page d'accueil permettant de jouer et résoudre un défi tactique du jour avec validation des coups en temps réel, notation échiquéenne et explications.

### Critères d'acceptation
- [ ] Échiquier vectoriel interactif et fluide sur mobile et desktop.
- [ ] Détection du coup gagnant et feedback visuel immédiat.

## Bloquée par
Phase 2

---

## Phase 7 : Actualités, Calendrier & Résultats

**User stories** : US-7, US-10

### Ce qu'on livre
Page `/actualites` avec articles détaillés `/actualites/:slug`, calendrier annuel des compétitions `/calendrier` et page de palmarès / résultats officiels `/resultats`.

### Critères d'acceptation
- [ ] Articles d'actualités avec lecture complète et tags.
- [ ] Calendrier chronologique clair de la saison.
- [ ] Grilles de résultats et podiums officiels.

## Bloquée par
Phase 1

---

## Phase 8 : Galerie Multimédia & Contact Localisé Annaba

**User stories** : US-8, US-9, US-10

### Ce qu'on livre
Galerie photos haute résolution `/galerie` et page `/contact` avec formulaire officiel de message/adhésion, coordonnées officielles et carte interactive d'accès à Annaba.

### Critères d'acceptation
- [ ] Galerie photos avec visionneuse et légendes.
- [ ] Formulaire de contact fonctionnel avec confirmation.
- [ ] Localisation claire de la salle du club à Annaba.

## Bloquée par
Phase 1

---

## Phase 9 : SEO Local, Accessibilité & Build Final de Production

**User stories** : US-1, US-3, US-10, US-11

### Ce qu'on livre
Balisage Schema.org (SportsClub, SportsEvent), Open Graph, sitemap.xml, robots.txt, validation de l'accessibilité WCAG (contrastes 4.5:1, navigation clavier) et test de compilation de production sans warning.

### Critères d'acceptation
- [ ] `npm run build` s'exécute avec 0 erreur.
- [ ] Données structurées JSON-LD valides sur toutes les pages.
- [ ] 100% responsive testé sur smartphone, tablette et desktop.

## Bloquée par
Phases 1 à 8
