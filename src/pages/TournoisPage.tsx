import React, { useState } from 'react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { SeoHead } from '../components/common/SeoHead';
import { TournamentCard } from '../components/cards/TournamentCard';
import { RegistrationModal } from '../components/ui/RegistrationModal';
import { tournamentsData } from '../data/tournamentsData';
import { CadenceType, TournamentStatus, Tournament } from '../types';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      <SeoHead
        title="Tournois & Compétitions"
        description="Calendrier des tournois d'échecs organisés par Hamra Annaba : Blitz, Rapide, Classique homologués FIDE et inscriptions en ligne."
      />

      <Breadcrumbs items={[{ label: "Tournois" }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <SectionTitle
          badge="Compétitions Officielles"
          title="Tournois & Opens d'Échecs"
          subtitle="Consultez les tournois programmés, règlements complets et grilles de résultats."
        />

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filters */}
          <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                statusFilter === 'all' ? 'bg-hamra-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setStatusFilter('upcoming')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                statusFilter === 'upcoming' ? 'bg-hamra-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              À venir
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                statusFilter === 'completed' ? 'bg-hamra-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Terminés
            </button>
          </div>

          {/* Cadence Filters */}
          <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
            <button
              onClick={() => setCadenceFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                cadenceFilter === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Toutes cadences
            </button>
            <button
              onClick={() => setCadenceFilter('Blitz')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                cadenceFilter === 'Blitz' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Blitz ⚡
            </button>
            <button
              onClick={() => setCadenceFilter('Rapide')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                cadenceFilter === 'Rapide' ? 'bg-hamra-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Rapide ⏱️
            </button>
            <button
              onClick={() => setCadenceFilter('Classique')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                cadenceFilter === 'Classique' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Classique ♟️
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
        <div className="text-center py-16 bg-slate-900 rounded-3xl border border-slate-800 p-8 space-y-3">
          <p className="text-slate-400 text-sm">Aucun tournoi ne correspond aux filtres sélectionnés.</p>
          <button
            onClick={() => { setStatusFilter('all'); setCadenceFilter('all'); }}
            className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700"
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
