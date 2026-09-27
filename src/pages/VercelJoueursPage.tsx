import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, Download, Trophy, Shield, Filter, Award, ChevronRight, UserCheck } from 'lucide-react';
import { useTournaments } from '../context/TournamentContext';

export const VercelJoueursPage: React.FC = () => {
  const { tournaments, players } = useTournaments();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClub, setSelectedClub] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'bib'>('rating');

  // Unique clubs list
  const clubs = useMemo(() => {
    const clubSet = new Set<string>();
    players.forEach(p => {
      if (p.club) clubSet.add(p.club);
    });
    return Array.from(clubSet);
  }, [players]);

  // Filtered & sorted players
  const filteredPlayers = useMemo(() => {
    return players
      .filter((p) => {
        const matchesSearch = `${p.first_name} ${p.last_name} ${p.club || ''} ${p.fide_id || ''}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesClub = selectedClub === 'ALL' || p.club === selectedClub;
        return matchesSearch && matchesClub;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'name') return a.last_name.localeCompare(b.last_name);
        return a.bib_number - b.bib_number;
      });
  }, [players, searchTerm, selectedClub, sortBy]);

  const handleExportCSV = () => {
    const headers = ["Dossard", "Nom", "Prenom", "Date_Naissance", "Sexe", "Club", "FIDE_ID", "Elo_FIDE", "Telephone", "Email"];
    const rows = filteredPlayers.map((p) => [
      p.bib_number,
      `"${p.last_name}"`,
      `"${p.first_name}"`,
      p.birth_date,
      p.sex,
      `"${p.club || ''}"`,
      p.fide_id || '',
      p.rating || 0,
      p.phone || '',
      p.email || ''
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `annuaire_joueurs_hamra_annaba.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTournamentName = (tId: string) => {
    const t = tournaments.find(tour => tour.id === tId);
    return t ? t.name : 'Tournoi Hamra';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-[#141413]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2A2823]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97757]/15 border border-[#D97757]/30 text-[#E2896B] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Fichier Central des Joueurs</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F5F2EB]">
            Annuaire & Cotes FIDE
          </h1>
          <p className="text-sm text-[#9C968B] mt-1 font-sans">
            Base officielle des compétiteurs inscrits, historique de classement et affiliations régionales.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-obsidian text-xs font-semibold hover:border-[#D4A373] text-[#D4A373] active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Exporter l'annuaire (.CSV)</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#1E1D1A] rounded-2xl p-5 border border-[#2E2C27] shadow-xl">
          <span className="text-xs font-mono text-[#9C968B] uppercase tracking-wider block">Total Compétiteurs</span>
          <span className="font-serif text-3xl text-[#F5F2EB] mt-1 block">{players.length}</span>
          <span className="text-xs text-[#7E9F80] font-mono mt-1 block">Inscrits aux tournois</span>
        </div>

        <div className="bg-[#1E1D1A] rounded-2xl p-5 border border-[#2E2C27] shadow-xl">
          <span className="text-xs font-mono text-[#9C968B] uppercase tracking-wider block">Clubs Représentés</span>
          <span className="font-serif text-3xl text-[#D4A373] mt-1 block">{clubs.length || 1}</span>
          <span className="text-xs text-[#9C968B] font-mono mt-1 block">Ligue d'Annaba & National</span>
        </div>

        <div className="bg-[#1E1D1A] rounded-2xl p-5 border border-[#2E2C27] shadow-xl">
          <span className="text-xs font-mono text-[#9C968B] uppercase tracking-wider block">Moyenne Elo Estimée</span>
          <span className="font-serif text-3xl text-[#E2896B] mt-1 block">
            {players.length > 0
              ? Math.round(players.reduce((acc, p) => acc + (p.rating || 1500), 0) / players.length)
              : 1750}
          </span>
          <span className="text-xs text-[#7E9F80] font-mono mt-1 block">Système de classement FIDE</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#1E1D1A] rounded-3xl border border-[#2E2C27] p-6 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#7D786F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par nom, prénom, club ou FIDE ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141413] border border-[#2E2C27] text-white text-xs placeholder-[#7D786F] focus:border-[#D97757] outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Club Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#7D786F]" />
              <select
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#141413] border border-[#2E2C27] text-[#F5F2EB] text-xs font-medium focus:border-[#D97757] outline-none"
              >
                <option value="ALL">Tous les clubs</option>
                {clubs.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-2.5 rounded-xl bg-[#141413] border border-[#2E2C27] text-[#F5F2EB] text-xs font-medium focus:border-[#D97757] outline-none"
            >
              <option value="rating">Trier par Cote Elo (Décroissant)</option>
              <option value="name">Trier par Nom alphabétique</option>
              <option value="bib">Trier par N° Dossard</option>
            </select>
          </div>
        </div>

        {/* Players Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#BDB8AD] font-sans">
            <thead className="bg-[#141413] text-[#7D786F] uppercase text-[10px] font-mono">
              <tr>
                <th className="p-3.5 rounded-l-lg">Dossard</th>
                <th className="p-3.5">Joueur</th>
                <th className="p-3.5">Sexe</th>
                <th className="p-3.5">Club Affilié</th>
                <th className="p-3.5">FIDE ID</th>
                <th className="p-3.5">Cote Elo</th>
                <th className="p-3.5">Tournoi Associé</th>
                <th className="p-3.5 rounded-r-lg text-right">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#26241F]">
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <tr key={player.id} className="hover:bg-[#24221E] transition-colors">
                    <td className="p-3.5 font-mono font-bold text-[#D4A373]">
                      #{player.bib_number}
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-[#F5F2EB]">
                        {player.last_name.toUpperCase()} {player.first_name}
                      </div>
                      <div className="text-[11px] text-[#7D786F] font-mono">
                        Né(e) en {player.birth_date ? player.birth_date.split('-')[0] : '—'}
                      </div>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-[#9C968B]">
                      {player.sex}
                    </td>
                    <td className="p-3.5">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#161513] border border-[#2E2C27] text-white">
                        <Shield className="w-3 h-3 text-[#D97757]" />
                        <span>{player.club || 'Hamra Annaba'}</span>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-[#D4A373]">
                      {player.fide_id ? (
                        <a
                          href={`https://ratings.fide.com/profile/${player.fide_id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline flex items-center gap-1"
                        >
                          <span>{player.fide_id}</span>
                          <span className="text-[10px] text-[#7D786F]">↗</span>
                        </a>
                      ) : (
                        <span className="text-[#7D786F]">Non classé</span>
                      )}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-sm text-[#F5F2EB]">
                      {player.rating ? (
                        <span className="text-[#7E9F80]">{player.rating}</span>
                      ) : (
                        <span className="text-[#7D786F]">1499 (Est.)</span>
                      )}
                    </td>
                    <td className="p-3.5 text-xs text-[#BDB8AD] truncate max-w-[200px]">
                      {getTournamentName(player.tournament_id)}
                    </td>
                    <td className="p-3.5 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#18261B] text-[#8FBC8F] border border-[#7E9F80]/40">
                        <UserCheck className="w-3 h-3" /> Validé
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#7D786F] text-xs">
                    Aucun joueur ne correspond aux critères de recherche.
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
