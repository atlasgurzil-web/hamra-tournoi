import React from 'react';
import { ShieldCheck, Award, Crown, Trophy, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { useTournaments } from '../context/TournamentContext';
import { VercelTournamentCard } from '../components/VercelTournamentCard';

export const VercelHomePage: React.FC = () => {
  const { tournaments } = useTournaments();

  return (
    <div className="min-h-screen pb-24 bg-[#0A0E17]">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 overflow-hidden border-b border-slate-800/80">
        
        {/* Vibrant Crimson and Gold Ambient Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-red-600/15 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute top-20 right-1/4 w-[500px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs sm:text-sm font-mono font-extrabold uppercase tracking-wider mb-8 shadow-xl shadow-red-950/40">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-5"></span>
              <span>Plateforme Officielle • Section Échecs Hamra Annaba (1944)</span>
            </div>

            {/* H1 in Cinzel Grandmaster Chess Display */}
            <h1 className="font-serif font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-tight sm:leading-none">
              Tournois d'Échecs Homologués <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 bg-clip-text text-transparent">FIDE</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-sans font-medium">
              Inscrivez-vous en 60 secondes aux compétitions officielles du club historique{' '}
              <strong className="text-amber-400 font-bold">Hamra Annaba</strong>. Contrôle en direct des jauges, garantie stricte anti-surréservation et attribution immédiate de votre numéro de dossard.
            </p>

            {/* Reassurance Cards in High-Impact Grid */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl text-left">
              <div className="bg-[#0F172A]/90 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Anti-Surréservation</h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">Jauges de places verrouillées en direct avec liste d'attente automatique.</p>
                </div>
              </div>

              <div className="bg-[#0F172A]/90 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Swiss-Manager & FIDE</h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">Exports certifiés pour les arbitres et calcul officiel des cotes Elo FIDE.</p>
                </div>
              </div>

              <div className="bg-[#0F172A]/90 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-500/40 flex items-center justify-center shrink-0">
                  <Crown className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Dossard Immédiat</h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">Attribution en direct du dossard et pass d'émargement QR Code sécurisé.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tournaments Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono font-bold text-red-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Saison 2026 • Calendrier Officiel</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight flex items-center gap-3">
              <span>Tournois Ouverts aux Inscriptions</span>
            </h2>
            <p className="text-base text-slate-400 mt-2 font-sans font-medium">
              Consultez le règlement technique, la cadence et réservez votre place en temps réel.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-mono font-bold bg-slate-900 text-amber-400 border border-amber-500/30 shadow-md">
              ● {tournaments.length} Tournois programmés
            </span>
          </div>
        </div>

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tournaments.map((tournament) => (
            <VercelTournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </section>
    </div>
  );
};
