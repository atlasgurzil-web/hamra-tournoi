import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, Trophy, Download, CirclePlus, CheckCircle2, ShieldCheck, Search, Filter } from 'lucide-react';
import { useTournaments } from '../context/TournamentContext';

export const VercelDashboardPage: React.FC = () => {
  const { tournaments, players } = useTournaments();
  const [selectedTournamentId, setSelectedTournamentId] = useState<string>(tournaments[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');

  const currentTournament = tournaments.find((t) => t.id === selectedTournamentId) || tournaments[0];
  const tournamentPlayers = players.filter((p) => p.tournament_id === currentTournament?.id);

  const filteredPlayers = tournamentPlayers.filter((p) =>
    `${p.first_name} ${p.last_name} ${p.club} ${p.fide_id}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    if (!currentTournament) return;
    const headers = ["Dossard", "Nom", "Prenom", "Date_Naissance", "Sexe", "Club", "FIDE_ID", "Elo_FIDE", "Telephone", "Email"];
    const rows = tournamentPlayers.map((p) => [
      p.bib_number,
      p.last_name,
      p.first_name,
      p.birth_date,
      p.sex,
      p.club || '',
      p.fide_id || '',
      p.rating || 0,
      p.phone || '',
      p.email || ''
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inscrits_${currentTournament.slug}_swiss_manager.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-[#141413]">
      {/* Header Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2A2823]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97757]/15 border border-[#D97757]/30 text-[#E2896B] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Direction de Tournois & Arbitrage FIDE</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F5F2EB]">
            Espace Organisateur & Swiss-Manager
          </h1>
          <p className="text-sm text-[#9C968B] mt-1 font-sans">
            Gestion en temps réel des jauges, suivi des inscriptions et exports homologués FIDE.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/tournois/nouveau"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-claude text-xs font-semibold shadow-md active:scale-95"
          >
            <CirclePlus className="w-4 h-4" />
            <span>Créer un Tournoi</span>
          </Link>
        </div>
      </div>

      {/* Global Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1E1D1A] rounded-2xl p-5 border border-[#2E2C27] shadow-xl">
          <span className="text-xs font-mono text-[#9C968B] uppercase tracking-wider block">Tournois Actifs</span>
          <span className="font-serif text-3xl text-[#F5F2EB] mt-1 block">{tournaments.length}</span>
          <span className="text-xs text-[#7E9F80] font-mono mt-1 block">● Inscriptions ouvertes</span>
        </div>

        <div className="bg-[#1E1D1A] rounded-2xl p-5 border border-[#2E2C27] shadow-xl">
          <span className="text-xs font-mono text-[#9C968B] uppercase tracking-wider block">Total Inscrits</span>
          <span className="font-serif text-3xl text-[#D4A373] mt-1 block">{players.length}</span>
          <span className="text-xs text-[#9C968B] font-mono mt-1 block">Dossards attribués</span>
        </div>

        <div className="bg-[#1E1D1A] rounded-2xl p-5 border border-[#2E2C27] shadow-xl">
          <span className="text-xs font-mono text-[#9C968B] uppercase tracking-wider block">Capacité Globale</span>
          <span className="font-serif text-3xl text-[#E2896B] mt-1 block">
            {tournaments.reduce((acc, t) => acc + t.max_players, 0)} places
          </span>
          <span className="text-xs text-[#7E9F80] font-mono mt-1 block">Anti-surréservation actif</span>
        </div>

        <div className="bg-[#1E1D1A] rounded-2xl p-5 border border-[#2E2C27] shadow-xl">
          <span className="text-xs font-mono text-[#9C968B] uppercase tracking-wider block">Homologation</span>
          <span className="font-serif text-3xl text-[#7E9F80] mt-1 block">FIDE & FADE</span>
          <span className="text-xs text-[#9C968B] font-mono mt-1 block">Swiss-Manager certifié</span>
        </div>
      </div>

      {/* Tournament Selector & Management Section */}
      <div className="bg-[#1E1D1A] rounded-3xl border border-[#2E2C27] p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#2A2823]">
          <div>
            <h2 className="font-serif text-2xl text-[#F5F2EB]">
              Liste des Inscrits par Tournoi
            </h2>
            <p className="text-xs text-[#9C968B] mt-0.5 font-sans">
              Sélectionnez le tournoi pour visualiser les participants et générer l'export.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedTournamentId}
              onChange={(e) => setSelectedTournamentId(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-[#141413] border border-[#2E2C27] text-[#F5F2EB] text-xs font-medium focus:border-[#D97757] outline-none"
            >
              {tournaments.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.confirmed_count}/{t.max_players})
                </option>
              ))}
            </select>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-obsidian text-xs font-semibold hover:border-[#D4A373] text-[#D4A373]"
              title="Exporter pour le logiciel d'appariement FIDE Swiss-Manager"
            >
              <Download className="w-4 h-4" />
              <span>Export Swiss-Manager (.CSV)</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#7D786F] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher un joueur par nom, club ou ID FIDE..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141413] border border-[#2E2C27] text-white text-xs placeholder-[#7D786F] focus:border-[#D97757] outline-none"
          />
        </div>

        {/* Table of Registered Players */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#BDB8AD] font-sans">
            <thead className="bg-[#141413] text-[#7D786F] uppercase text-[10px] font-mono">
              <tr>
                <th className="p-3.5 rounded-l-lg">Dossard</th>
                <th className="p-3.5">Nom & Prénom</th>
                <th className="p-3.5">Club</th>
                <th className="p-3.5">FIDE ID</th>
                <th className="p-3.5">Cote Elo</th>
                <th className="p-3.5">Contact</th>
                <th className="p-3.5 rounded-r-lg">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#26241F]">
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <tr key={player.id} className="hover:bg-[#24221E] transition-colors">
                    <td className="p-3.5 font-mono font-bold text-[#D4A373]">
                      #{player.bib_number}
                    </td>
                    <td className="p-3.5 font-semibold text-[#F5F2EB]">
                      {player.last_name.toUpperCase()} {player.first_name}
                    </td>
                    <td className="p-3.5 text-[#BDB8AD]">
                      {player.club || 'Indépendant'}
                    </td>
                    <td className="p-3.5 font-mono text-[#9C968B]">
                      {player.fide_id || 'NC'}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-[#F5F2EB]">
                      {player.rating ? player.rating : '0 (NC)'}
                    </td>
                    <td className="p-3.5 text-[#9C968B] font-mono text-[11px]">
                      {player.phone || player.email || '—'}
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#18261B] text-[#8FBC8F] border border-[#7E9F80]/40">
                        <CheckCircle2 className="w-3 h-3" /> Confirmé
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#7D786F] text-xs">
                    Aucun joueur trouvé pour ce tournoi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
