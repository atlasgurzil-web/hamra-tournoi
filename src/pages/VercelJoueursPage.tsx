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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10 bg-[#0A0E17]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Users className="w-4 h-4 text-red-400" />
            <span>Fichier Central des Joueurs</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight">
            Annuaire & Cotes FIDE
          </h1>
          <p className="text-base text-slate-300 mt-2 font-medium">
            Registre officiel des compétiteurs inscrits, historique de classement et affiliations régionales.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl btn-gold text-sm font-bold shadow-xl"
          >
            <Download className="w-4 h-4" />
            <span>Exporter l'annuaire (.CSV)</span>
          </button>
        </div>
      </div>

      {/* KPI Stats in Grand Scale */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-3xl p-7 border border-slate-800 shadow-xl">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">Total Compétiteurs</span>
          <span className="font-mono font-black text-4xl sm:text-5xl text-white mt-2 block">{players.length}</span>
          <span className="text-sm text-emerald-400 font-medium mt-2 block">Inscrits aux tournois</span>
        </div>

        <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-3xl p-7 border border-slate-800 shadow-xl">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">Clubs Représentés</span>
          <span className="font-mono font-black text-4xl sm:text-5xl text-amber-400 mt-2 block">{clubs.length || 1}</span>
          <span className="text-sm text-slate-400 font-medium mt-2 block">Ligue d'Annaba & National</span>
        </div>

        <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-3xl p-7 border border-slate-800 shadow-xl">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">Moyenne Elo Estimée</span>
          <span className="font-mono font-black text-4xl sm:text-5xl text-red-400 mt-2 block">
            {players.length > 0
              ? Math.round(players.reduce((acc, p) => acc + (p.rating || 1500), 0) / players.length)
              : 1750}
          </span>
          <span className="text-sm text-emerald-400 font-medium mt-2 block">Système de classement FIDE</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par nom, prénom, club ou FIDE ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#070A10] border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-red-500 outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Club Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
                className="px-4 py-3.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm font-semibold focus:border-red-500 outline-none"
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
              className="px-4 py-3.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm font-semibold focus:border-red-500 outline-none"
            >
              <option value="rating">Trier par Cote Elo (Décroissant)</option>
              <option value="name">Trier par Nom alphabétique</option>
              <option value="bib">Trier par N° Dossard</option>
            </select>
          </div>
        </div>

        {/* Players Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-sm text-slate-200 font-sans">
            <thead className="bg-[#070A10] text-slate-400 uppercase text-xs font-mono border-b border-slate-800">
              <tr>
                <th className="p-4">Dossard</th>
                <th className="p-4">Joueur</th>
                <th className="p-4">Sexe</th>
                <th className="p-4">Club Affilié</th>
                <th className="p-4">FIDE ID</th>
                <th className="p-4">Cote Elo</th>
                <th className="p-4">Tournoi Associé</th>
                <th className="p-4 text-right">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-[#0F172A]/50">
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <tr key={player.id} className="hover:bg-slate-800/60 transition-colors">
                    <td className="p-4 font-mono font-black text-amber-400 text-base">
                      #{player.bib_number}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white text-base">
                        {player.last_name.toUpperCase()} {player.first_name}
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        Né(e) en {player.birth_date ? player.birth_date.split('-')[0] : '—'}
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-300">
                      {player.sex}
                    </td>
                    <td className="p-4">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-750 text-white font-medium text-xs">
                        <Shield className="w-3.5 h-3.5 text-red-500" />
                        <span>{player.club || 'Hamra Annaba'}</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold text-amber-300">
                      {player.fide_id ? (
                        <a
                          href={`https://ratings.fide.com/profile/${player.fide_id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline flex items-center gap-1"
                        >
                          <span>{player.fide_id}</span>
                          <span className="text-xs text-slate-400">↗</span>
                        </a>
                      ) : (
                        <span className="text-slate-500">Non classé</span>
                      )}
                    </td>
                    <td className="p-4 font-mono font-black text-base text-emerald-400">
                      {player.rating ? player.rating : '1499 (Est.)'}
                    </td>
                    <td className="p-4 text-xs text-slate-300 truncate max-w-[220px]">
                      {getTournamentName(player.tournament_id)}
                    </td>
                    <td className="p-4 text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-500/50">
                        <UserCheck className="w-3.5 h-3.5" /> Validé
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-400 text-base">
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
