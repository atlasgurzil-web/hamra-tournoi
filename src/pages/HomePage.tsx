import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, GraduationCap, Users, Calendar, Newspaper, ArrowRight, Shield, Award, Sparkles, MapPin, Phone } from 'lucide-react';
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
    <div className="space-y-12 sm:space-y-20">
      {/* 1. Hero Section */}
      <Hero onOpenRegisterModal={handleOpenGeneralRegister} />

      {/* 2. Highlight Next Event Banner */}
      <NextEventBanner onRegisterClick={() => handleOpenRegisterForTournament(tournamentsData[0])} />

      {/* 3. Club Identity & Core Values */}
      <QuickPresentation />

      {/* 4. Daily Interactive Tactical Chess Puzzle */}
      <DailyChessPuzzle />

      {/* 5. School of Chess Spotlight */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-hamra-950/80 rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-hamra-950 text-hamra-400 text-xs font-bold uppercase tracking-wider border border-hamra-900">
                <GraduationCap className="w-4 h-4" />
                <span>Formation & Jeunesse</span>
              </span>

              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
                {t.schoolSection.title}
              </h2>

              <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
                {t.schoolSection.subtitle} Dès 6 ans, nos maîtres et éducateurs transmettent la passion du calcul, la vision spatiale et le respect des règles échiquéennes.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="font-display font-bold text-white text-base block">Éveil (6–10 ans)</span>
                  <span className="text-xs text-slate-400">Initiation ludique et mats élémentaires</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="font-display font-bold text-white text-base block">Espoirs (11–18 ans)</span>
                  <span className="text-xs text-slate-400">Stratégie avancée et préparation FIDE</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  to="/ecole"
                  className="px-6 py-3.5 rounded-xl bg-hamra-600 hover:bg-hamra-500 text-white font-extrabold text-xs sm:text-sm shadow-club transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>{t.schoolSection.joinSchoolBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-all"
                >
                  Horaires & Tarifs à Annaba
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="font-display font-bold text-base text-white border-b border-slate-800 pb-2">
                  Séances de la Semaine
                </h4>
                {clubData.trainingDays.slice(0, 2).map((td, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <span className="font-bold text-hamra-400 block">{td.group}</span>
                    <span className="text-slate-300 block">{td.days} • {td.hours}</span>
                    <span className="text-slate-500 block">{td.location}</span>
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
            className="text-xs sm:text-sm font-bold text-hamra-400 hover:text-hamra-300 flex items-center gap-1.5 shrink-0"
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
            className="text-xs sm:text-sm font-bold text-hamra-400 hover:text-hamra-300 flex items-center gap-1.5 shrink-0"
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
            className="text-xs sm:text-sm font-bold text-hamra-400 hover:text-hamra-300 flex items-center gap-1.5 shrink-0"
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

      {/* 9. Join Club CTA Banner */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-hamra-900 via-hamra-800 to-slate-950 rounded-3xl p-8 sm:p-12 border-2 border-hamra-600/50 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Prêt à Jouer sous les Couleurs de Hamra ?
            </h2>
            <p className="text-slate-200 text-xs sm:text-base leading-relaxed">
              Que vous soyez débutant, jeune passionné ou joueur expérimenté cherchant l'émulation de la compétition, notre porte vous est ouverte à Annaba.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleOpenGeneralRegister}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-hamra-900 hover:bg-slate-100 font-extrabold text-sm shadow-xl transition-all active:scale-95"
              >
                Demander mon Inscription
              </button>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white font-bold text-sm border border-slate-700 transition-all"
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
