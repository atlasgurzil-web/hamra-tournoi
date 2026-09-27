import React from 'react';
import { ShieldCheck, Award, Crown } from 'lucide-react';
import { useTournaments } from '../context/TournamentContext';
import { VercelTournamentCard } from '../components/VercelTournamentCard';

export const VercelHomePage: React.FC = () => {
  const { tournaments } = useTournaments();

  return (
    <div className="min-h-screen pb-20 bg-[#141413]">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 overflow-hidden border-b border-[#2A2823]">
        {/* Warm Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#D97757]/10 blur-[130px] rounded-full pointer-events-none"></div>
        <div className="absolute top-10 right-1/4 w-[400px] h-[250px] bg-[#D4A373]/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18261B] border border-[#7E9F80]/40 text-[#8FBC8F] text-xs font-mono font-semibold uppercase tracking-wider mb-6 shadow-lg shadow-black/40">
              <span className="w-2 h-2 rounded-full bg-[#7E9F80] animate-pulse"></span>
              <span>Inscriptions Ouvertes en Direct • Homologation FIDE</span>
            </div>

            {/* H1 in Instrument Serif */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5F2EB] tracking-tight leading-tight">
              Plateforme Officielle des Tournois d'Échecs Homologués FIDE
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-[#BDB8AD] max-w-2xl leading-relaxed font-sans font-normal">
              Inscrivez-vous en 60 secondes aux compétitions officielles du club historique{' '}
              <strong className="text-[#D4A373] font-medium">Hamra Annaba (1944)</strong>. Attribution instantanée de dossard et garantie de place en temps réel sans sur-réservation.
            </p>

            {/* Reassurance Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-[#BDB8AD] font-medium">
              <div className="flex items-center gap-2 bg-[#1E1D1A] backdrop-blur-md px-4 py-2 rounded-xl border border-[#2E2C27] shadow-md">
                <ShieldCheck className="w-4 h-4 text-[#7E9F80]" />
                <span>Verrouillage Anti-Surréservation</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1E1D1A] backdrop-blur-md px-4 py-2 rounded-xl border border-[#2E2C27] shadow-md">
                <Award className="w-4 h-4 text-[#D4A373]" />
                <span>FIDE & Swiss-Manager Certifié</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1E1D1A] backdrop-blur-md px-4 py-2 rounded-xl border border-[#2E2C27] shadow-md">
                <Crown className="w-4 h-4 text-[#D97757]" />
                <span>Dossard Officiel Garanti</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tournaments List Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F2EB] tracking-tight flex items-center gap-2.5">
              <Crown className="w-7 h-7 text-[#D4A373]" />
              <span>Tournois Ouverts aux Inscriptions</span>
            </h2>
            <p className="text-sm text-[#9C968B] mt-1 font-sans">
              Consultez le règlement officiel, la cadence et réservez votre dossard en direct.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#1E1D1A] text-[#D4A373] border border-[#D4A373]/30">
              ● {tournaments.length} Tournois disponibles
            </span>
          </div>
        </div>

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => (
            <VercelTournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </section>
    </div>
  );
};
