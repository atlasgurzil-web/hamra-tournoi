import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Hero } from '../components/home/Hero';
import { NextEventBanner } from '../components/home/NextEventBanner';
import { QuickPresentation } from '../components/home/QuickPresentation';
import { DailyChessPuzzle } from '../components/home/DailyChessPuzzle';
import { TournamentCard } from '../components/cards/TournamentCard';
import { PlayerCard } from '../components/cards/PlayerCard';
import { NewsCard } from '../components/cards/NewsCard';
import { SectionTitle } from '../components/common/SectionTitle';
import { RegistrationModal } from '../components/ui/RegistrationModal';
import { tournamentsData } from '../data/tournamentsData';
import { playersData } from '../data/playersData';
import { newsData } from '../data/newsData';
import { clubData } from '../data/clubData';
import { Tournament } from '../types';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);

  const handleOpenRegisterForTournament = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    setRegisterModalOpen(true);
  };

  const handleOpenGeneralRegister = () => {
    setSelectedTournament(null);
    setRegisterModalOpen(true);
  };

  const upcomingTournaments = tournamentsData.filter((t) => t.status === 'upcoming');
  const featuredPlayers = playersData.filter((p) => p.featured);
  const latestNews = newsData.slice(0, 3);

  return (
    <div className="space-y-14 sm:space-y-24">
      {/* 1. Hero Section in Claude Editorial Aesthetic */}
      <Hero onOpenRegisterModal={handleOpenGeneralRegister} />

      {/* 2. Highlight Next Event Banner */}
      <NextEventBanner onRegisterClick={() => handleOpenRegisterForTournament(tournamentsData[0])} />

      {/* 3. Club Identity & Core Values */}
      <QuickPresentation />

      {/* 4. Daily Interactive Tactical Chess Puzzle */}
      <DailyChessPuzzle />

      {/* 5. School of Chess Spotlight */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#191816] rounded-3xl p-6 sm:p-12 border border-[#2E2C27] shadow-2xl relative overflow-hidden">
          {/* Subtle terracotta background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D97757]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#24221E] text-[#E2896B] text-xs font-mono font-medium uppercase tracking-wider border border-[#D97757]/30">
                <GraduationCap className="w-4 h-4 text-[#D97757]" />
                <span>Formation & Jeunesse</span>
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F2EB] leading-tight">
                {t.schoolSection.title}
              </h2>

              <p className="text-[#BDB8AD] text-sm sm:text-base leading-relaxed font-sans">
                {t.schoolSection.subtitle} Dès 6 ans, nos maîtres et éducateurs transmettent la passion du calcul, la vision spatiale et le respect des règles échiquéennes.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-[#141413] border border-[#26241F]">
                  <span className="font-serif text-lg text-[#F5F2EB] block">Éveil (6–10 ans)</span>
                  <span className="text-xs text-[#9C968B] font-sans mt-0.5 block">Initiation ludique et mats élémentaires</span>
                </div>
                <div className="p-4 rounded-xl bg-[#141413] border border-[#26241F]">
                  <span className="font-serif text-lg text-[#F5F2EB] block">Espoirs (11–18 ans)</span>
                  <span className="text-xs text-[#9C968B] font-sans mt-0.5 block">Stratégie avancée et préparation FIDE</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  to="/ecole"
                  className="px-6 py-3.5 rounded-xl btn-claude font-semibold text-xs sm:text-sm flex items-center gap-2 active:scale-95 shadow-md"
                >
                  <span>{t.schoolSection.joinSchoolBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="px-5 py-3.5 rounded-xl btn-obsidian font-semibold text-xs sm:text-sm"
                >
                  Horaires & Tarifs à Annaba
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-[#141413] p-6 rounded-2xl border border-[#26241F] space-y-4 shadow-xl">
                <h4 className="font-serif text-xl text-[#F5F2EB] border-b border-[#26241F] pb-3">
                  Séances de la Semaine
                </h4>
                {clubData.trainingDays.slice(0, 2).map((td, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <span className="font-mono font-bold text-[#D97757] block">{td.group}</span>
                    <span className="text-[#F5F2EB] block font-sans">{td.days} • {td.hours}</span>
                    <span className="text-[#7D786F] block font-sans">{td.location}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Upcoming Tournaments Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <SectionTitle
            badge="Calendrier Compétition"
            title={t.tournamentsSection.title}
            subtitle={t.tournamentsSection.subtitle}
          />
          <Link
            to="/tournois"
            className="text-xs sm:text-sm font-semibold text-[#D97757] hover:text-[#E2896B] flex items-center gap-1.5 shrink-0 transition-colors font-mono"
          >
            <span>{t.tournamentsSection.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingTournaments.slice(0, 3).map((tournoi) => (
            <TournamentCard
              key={tournoi.id}
              tournament={tournoi}
              onRegisterClick={handleOpenRegisterForTournament}
            />
          ))}
        </div>
      </section>

      {/* 7. Featured Players Spotlight */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <SectionTitle
            badge="Élite & Espoirs"
            title="Les Joueurs de Hamra Annaba"
            subtitle="Découvrez nos compétiteurs engagés dans les championnats nationaux et régionaux."
          />
          <Link
            to="/joueurs"
            className="text-xs sm:text-sm font-semibold text-[#D97757] hover:text-[#E2896B] flex items-center gap-1.5 shrink-0 transition-colors font-mono"
          >
            <span>Voir tout l'effectif</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </section>

      {/* 8. Latest News & Articles */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <SectionTitle
            badge="Actualités & Vie du Club"
            title="Dernières Nouvelles du Club"
            subtitle="Comptes-rendus de compétitions, annonces officielles et vie sportive à Annaba."
          />
          <Link
            to="/actualites"
            className="text-xs sm:text-sm font-semibold text-[#D97757] hover:text-[#E2896B] flex items-center gap-1.5 shrink-0 transition-colors font-mono"
          >
            <span>Voir toutes les actualités</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* 9. Join Club CTA Banner in Claude Warm Terracotta */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-[#1C1B18] rounded-3xl p-8 sm:p-14 border border-[#D97757]/40 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-chess-pattern opacity-40 pointer-events-none"></div>
          
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F2EB] tracking-tight leading-tight">
              Prêt à Jouer sous les Couleurs de Hamra ?
            </h2>
            <p className="text-[#BDB8AD] text-sm sm:text-base leading-relaxed font-sans">
              Que vous soyez débutant, jeune passionné ou joueur expérimenté cherchant l'émulation de la compétition, notre porte vous est ouverte à Annaba.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={handleOpenGeneralRegister}
                className="w-full sm:w-auto px-8 py-4 rounded-xl btn-claude font-semibold text-sm shadow-xl active:scale-95"
              >
                Demander mon Inscription
              </button>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 py-4 rounded-xl btn-obsidian font-semibold text-sm"
              >
                Nous Contacter / Visiter la Salle
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Inscription */}
      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        tournament={selectedTournament}
      />
    </div>
  );
};
