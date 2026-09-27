import React from 'react';
import { ShieldCheck, Award, Crown, Trophy, Sparkles, CheckCircle2, ChevronRight, BookOpen, Quote } from 'lucide-react';
import { useTournaments } from '../context/TournamentContext';
import { VercelTournamentCard } from '../components/VercelTournamentCard';

export const VercelHomePage: React.FC = () => {
  const { tournaments } = useTournaments();

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen pb-28 md:pb-20 bg-[#0A0E17]">
      {/* Hero Section */}
      <section className="relative w-full max-w-full pt-12 pb-16 sm:pt-20 sm:pb-28 overflow-hidden border-b border-slate-800/80">
        
        {/* Constrained Ambient Lighting (zero-bleed) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-72 sm:h-96 bg-red-600/15 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute top-20 right-0 w-72 sm:w-96 h-64 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-[11px] sm:text-sm font-mono font-extrabold uppercase tracking-wider mb-6 sm:mb-8 shadow-xl shadow-red-950/40 max-w-full">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 animate-ping shrink-0"></span>
              <span className="truncate">Plateforme Officielle • Hamra Annaba (1944)</span>
            </div>

            {/* H1 in Cinzel */}
            <h1 className="font-serif font-black text-3xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-tight break-words">
              Tournois d'Échecs Homologués <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 bg-clip-text text-transparent">FIDE</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-6 text-sm sm:text-lg lg:text-xl text-slate-300 max-w-3xl leading-relaxed font-sans font-medium">
              Inscrivez-vous en 60 secondes aux compétitions officielles du club historique{' '}
              <strong className="text-amber-400 font-bold">Hamra Annaba</strong>. Contrôle en direct des jauges, garantie stricte anti-surréservation et attribution immédiate de votre numéro de dossard.
            </p>

            {/* Reassurance Cards in High-Impact Grid */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 w-full max-w-4xl text-left">
              <div className="bg-[#0F172A]/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-xl flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">Anti-Surréservation</h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5 sm:mt-1">Jauges de places verrouillées en direct avec liste d'attente automatique.</p>
                </div>
              </div>

              <div className="bg-[#0F172A]/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-xl flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">Swiss-Manager & FIDE</h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5 sm:mt-1">Exports certifiés pour les arbitres et calcul officiel des cotes Elo FIDE.</p>
                </div>
              </div>

              <div className="bg-[#0F172A]/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-xl flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-950/80 border border-red-500/40 flex items-center justify-center shrink-0">
                  <Crown className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">Dossard Immédiat</h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5 sm:mt-1">Attribution en direct du dossard et pass d'émargement QR Code sécurisé.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tournaments Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-red-400 uppercase tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Saison 2026 • Calendrier Officiel</span>
            </div>
            <h2 className="font-serif font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Tournois Ouverts aux Inscriptions
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 font-medium">
              Consultez le règlement technique, la cadence et réservez votre place en temps réel.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-mono font-bold bg-slate-900 text-amber-400 border border-amber-500/30 shadow-md">
              ● {tournaments.length} Tournois programmés
            </span>
          </div>
        </div>

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {tournaments.map((tournament) => (
            <VercelTournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </section>

      {/* Aesop-Inspired Editorial Heritage Block (Storytelling & Quiet Luxury) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-28">
        
        {/* Philidor Grandmaster Quote */}
        <div className="relative max-w-3xl mx-auto text-center py-8 px-6 rounded-3xl bg-gradient-to-r from-red-950/20 via-amber-950/20 to-red-950/20 border border-slate-800/80 mb-14">
          <Quote className="w-8 h-8 text-amber-400/40 mx-auto mb-3" />
          <p className="font-serif italic text-lg sm:text-2xl text-slate-200 leading-relaxed">
            « Les pions sont l'âme du jeu d'échecs : ce sont eux qui créent l'attaque et la défense. »
          </p>
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest mt-3 block">
            — François-André Danican Philidor (1749)
          </span>
        </div>

        {/* Two-Column Aesop Narrative Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#0F172A]/70 backdrop-blur-xl p-8 sm:p-14 rounded-3xl border border-slate-800 shadow-2xl">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-400">
              <BookOpen className="w-4 h-4" />
              <span>Chronique & Héritage Club</span>
            </div>

            <h3 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              82 Ans d'Éloquence Échiquéenne à Annaba
            </h3>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal">
              Fondée en 1944 sur les rives de l'antique Hippone, la section échecs de <strong className="text-white font-semibold">Hamra Annaba</strong> perpétue depuis plus de huit décennies la noblesse des 64 cases. Des cafés historiques du Cours de la Révolution jusqu'aux arènes du Cercle des Rois, le club forge des générations de stratèges sous le sceau de la rigueur et de la confrérie sportive.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-400">
              <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-750 text-slate-300">Fondé en 1944</span>
              <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-750 text-slate-300">Ligue d'Annaba</span>
              <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-750 text-slate-300">Fédération FADE & FIDE</span>
            </div>
          </div>

          {/* Right Column: The 3 Rules of Arbitration */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-[#070A10] border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest block">01 // RÈGLEMENT FIDE</span>
              <h4 className="font-serif font-bold text-base text-white">Homologation Officielle</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Système suisse en 7 rondes avec calcul officiel des points Elo FIDE et départages Buchholz rigoureux.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#070A10] border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-red-400 uppercase tracking-widest block">02 // SWISS-MANAGER</span>
              <h4 className="font-serif font-bold text-base text-white">Appariements Certifiés</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Exportation directe des fichiers joueurs (.CSV) pour le logiciel fédéral d'appariement automatique.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#070A10] border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">03 // PENDULES DGT</span>
              <h4 className="font-serif font-bold text-base text-white">Chronométrage Électronique</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Cadence Blitz 5+3 ou Rapide avec incrément Fischer officiel, assurant l'équité absolue des maîtres.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
