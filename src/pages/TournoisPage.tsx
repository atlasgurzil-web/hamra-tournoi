import React, { useState } from 'react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { SeoHead } from '../components/common/SeoHead';
import { TournamentCard } from '../components/cards/TournamentCard';
import { RegistrationModal } from '../components/ui/RegistrationModal';
import { tournamentsData } from '../data/tournamentsData';
import { CadenceType, TournamentStatus, Tournament } from '../types';
import { Zap, Timer, Crown } from 'lucide-react';

export const TournoisPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<'all' | TournamentStatus>('all');
  const [cadenceFilter, setCadenceFilter] = useState<'all' | CadenceType>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);

  const filteredTournaments = tournamentsData.filter((t) => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false;
    if (cadenceFilter !== 'all' && t.cadence !== cadenceFilter) return false;
    return true;
  });

  const handleRegister = (t: Tournament) => {
    setSelectedTournament(t);
    setModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <SeoHead
        title="Tournois & Compétitions"
        description="Calendrier des tournois d'échecs organisés par Hamra Annaba : Blitz, Rapide, Classique homologués FIDE et inscriptions en ligne."
      />

      <Breadcrumbs items={[{ label: "Tournois" }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#2A2823]">
        <SectionTitle
          badge="Compétitions Officielles"
          title="Tournois & Opens d'Échecs"
          subtitle="Consultez les tournois programmés, règlements complets et grilles de résultats."
        />

        {/* Filters in Claude Warm Obsidian Style */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filters */}
          <div className="flex rounded-xl bg-[#1E1D1A] p-1 border border-[#2E2C27]">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === 'all' ? 'bg-[#D97757] text-white font-semibold' : 'text-[#9C968B] hover:text-[#F5F2EB]'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setStatusFilter('upcoming')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === 'upcoming' ? 'bg-[#D97757] text-white font-semibold' : 'text-[#9C968B] hover:text-[#F5F2EB]'
              }`}
            >
              À venir
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === 'completed' ? 'bg-[#D97757] text-white font-semibold' : 'text-[#9C968B] hover:text-[#F5F2EB]'
              }`}
            >
              Terminés
            </button>
          </div>

          {/* Cadence Filters */}
          <div className="flex rounded-xl bg-[#1E1D1A] p-1 border border-[#2E2C27]">
            <button
              onClick={() => setCadenceFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                cadenceFilter === 'all' ? 'bg-[#2E2C27] text-[#F5F2EB] font-semibold' : 'text-[#9C968B] hover:text-[#F5F2EB]'
              }`}
            >
              Toutes cadences
            </button>
            <button
              onClick={() => setCadenceFilter('Blitz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                cadenceFilter === 'Blitz' ? 'bg-[#2A2318] text-[#E6C594] font-semibold border border-[#D4A373]/30' : 'text-[#9C968B] hover:text-[#F5F2EB]'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Blitz</span>
            </button>
            <button
              onClick={() => setCadenceFilter('Rapide')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                cadenceFilter === 'Rapide' ? 'bg-[#2B1F19] text-[#E2896B] font-semibold border border-[#D97757]/30' : 'text-[#9C968B] hover:text-[#F5F2EB]'
              }`}
            >
              <Timer className="w-3.5 h-3.5 text-[#D97757]" />
              <span>Rapide</span>
            </button>
            <button
              onClick={() => setCadenceFilter('Classique')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                cadenceFilter === 'Classique' ? 'bg-[#1E2328] text-[#93C5FD] font-semibold border border-[#3B82F6]/30' : 'text-[#9C968B] hover:text-[#F5F2EB]'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span>Classique</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tournaments Grid */}
      {filteredTournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              onRegisterClick={handleRegister}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#1E1D1A] rounded-3xl border border-[#2E2C27] p-8 space-y-3">
          <p className="text-[#9C968B] text-sm">Aucun tournoi ne correspond aux filtres sélectionnés.</p>
          <button
            onClick={() => { setStatusFilter('all'); setCadenceFilter('all'); }}
            className="px-4 py-2 rounded-xl btn-obsidian text-xs font-semibold"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      <RegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        tournament={selectedTournament}
      />
    </div>
  );
};
