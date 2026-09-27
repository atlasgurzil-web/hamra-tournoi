import React from 'react';
import { ShieldCheck, Award, Crown, Trophy, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
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
                  <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
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
    </div>
  );
};
