import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, Download, Trophy, Shield, Filter, Award, ChevronRight, UserCheck } from 'lucide-react';
import { useTournaments } from '../context/TournamentContext';

export const VercelJoueursPage: React.FC = () => {
  const { tournaments, players } = useTournaments();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClub, setSelectedClub] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'bib'>('rating');

  const clubs = useMemo(() => {
    const clubSet = new Set<string>();
    players.forEach(p => {
      if (p.club) clubSet.add(p.club);
    });
    return Array.from(clubSet);
  }, [players]);

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
    return t ? t.name : 'Hamra Annaba';
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-14 space-y-6 sm:space-y-10 pb-28 md:pb-16 bg-[#0A0E17] overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5 text-red-400" />
            <span>Fichier Central des Joueurs</span>
          </div>
          <h1 className="font-serif font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight break-words">
            Annuaire & Cotes FIDE
          </h1>
          <p className="text-xs sm:text-base text-slate-300 mt-1 font-medium">
            Registre officiel des compétiteurs inscrits, historique de classement et affiliations régionales.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-xl sm:rounded-2xl btn-gold text-xs sm:text-sm font-bold shadow-xl"
          >
            <Download className="w-4 h-4" />
            <span>Exporter l'annuaire (.CSV)</span>
          </button>
        </div>
      </div>

      {/* KPI Stats in Compact Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
        <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-800 shadow-xl">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">Total Compétiteurs</span>
          <span className="font-mono font-black text-3xl sm:text-5xl text-white mt-1 sm:mt-2 block">{players.length}</span>
          <span className="text-xs sm:text-sm text-emerald-400 font-medium mt-1 block">Inscrits aux tournois</span>
        </div>

        <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-800 shadow-xl">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">Clubs Représentés</span>
          <span className="font-mono font-black text-3xl sm:text-5xl text-amber-400 mt-1 sm:mt-2 block">{clubs.length || 1}</span>
          <span className="text-xs sm:text-sm text-slate-400 font-medium mt-1 block">Ligue d'Annaba & National</span>
        </div>

        <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-800 shadow-xl">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">Moyenne Elo Estimée</span>
          <span className="font-mono font-black text-3xl sm:text-5xl text-red-400 mt-1 sm:mt-2 block">
            {players.length > 0
              ? Math.round(players.reduce((acc, p) => acc + (p.rating || 1500), 0) / players.length)
              : 1750}
          </span>
          <span className="text-xs sm:text-sm text-emerald-400 font-medium mt-1 block">Système de classement FIDE</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-800 p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 justify-between items-stretch md:items-center">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par nom, club ou ID FIDE..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#070A10] border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:border-red-500 outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            {/* Club Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-[#070A10] border border-slate-700 text-white text-xs sm:text-sm font-semibold focus:border-red-500 outline-none"
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
              className="w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-[#070A10] border border-slate-700 text-white text-xs sm:text-sm font-semibold focus:border-red-500 outline-none"
            >
              <option value="rating">Trier par Elo (Décroissant)</option>
              <option value="name">Trier par Nom</option>
              <option value="bib">Trier par Dossard</option>
            </select>
          </div>
        </div>

        {/* Players Table - Isolated Scroll */}
        <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl border border-slate-800">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-200 font-sans min-w-[650px]">
              <thead className="bg-[#070A10] text-slate-400 uppercase text-[11px] font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3 sm:p-4">Dossard</th>
                  <th className="p-3 sm:p-4">Joueur</th>
                  <th className="p-3 sm:p-4">Sexe</th>
                  <th className="p-3 sm:p-4">Club Affilié</th>
                  <th className="p-3 sm:p-4">FIDE ID</th>
                  <th className="p-3 sm:p-4">Cote Elo</th>
                  <th className="p-3 sm:p-4">Tournoi</th>
                  <th className="p-3 sm:p-4 text-right">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-[#0F172A]/50">
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player) => (
                    <tr key={player.id} className="hover:bg-slate-800/60 transition-colors">
                      <td className="p-3 sm:p-4 font-mono font-black text-amber-400 text-sm sm:text-base">
                        #{player.bib_number}
                      </td>
                      <td className="p-3 sm:p-4 whitespace-nowrap">
                        <div className="font-bold text-white text-sm sm:text-base">
                          {player.last_name.toUpperCase()} {player.first_name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          Né(e) en {player.birth_date ? player.birth_date.split('-')[0] : '—'}
                        </div>
                      </td>
                      <td className="p-3 sm:p-4 font-mono font-bold text-slate-300">
                        {player.sex}
                      </td>
                      <td className="p-3 sm:p-4 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-white font-medium text-[11px]">
                          <Shield className="w-3 h-3 text-red-500" />
                          <span>{player.club || 'Hamra Annaba'}</span>
                        </div>
                      </td>
                      <td className="p-3 sm:p-4 font-mono font-bold text-amber-300 whitespace-nowrap">
                        {player.fide_id ? (
                          <a
                            href={`https://ratings.fide.com/profile/${player.fide_id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline flex items-center gap-1"
                          >
                            <span>{player.fide_id}</span>
                            <span className="text-[10px] text-slate-400">↗</span>
                          </a>
                        ) : (
                          <span className="text-slate-500">Non classé</span>
                        )}
                      </td>
                      <td className="p-3 sm:p-4 font-mono font-black text-sm sm:text-base text-emerald-400">
                        {player.rating ? player.rating : '1499 (Est.)'}
                      </td>
                      <td className="p-3 sm:p-4 text-xs text-slate-300 truncate max-w-[180px] whitespace-nowrap">
                        {getTournamentName(player.tournament_id)}
                      </td>
                      <td className="p-3 sm:p-4 text-right whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-500/50">
                          <UserCheck className="w-3 h-3" /> Validé
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400 text-sm">
                      Aucun joueur ne correspond aux critères de recherche.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
