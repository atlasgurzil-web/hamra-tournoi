import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, Trophy, Download, CirclePlus, CheckCircle2, ShieldCheck, Search, Filter, Sparkles, Award } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10 bg-[#0A0E17]">
      {/* Header Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <LayoutDashboard className="w-4 h-4 text-red-400" />
            <span>Direction de Tournois & Arbitrage FIDE</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight">
            Espace Organisateur & Swiss-Manager
          </h1>
          <p className="text-base text-slate-300 mt-2 font-medium">
            Supervision en temps réel des jauges, suivi des inscriptions et exports officiels pour arbitres.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/tournois/nouveau"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl btn-hamra text-sm font-extrabold shadow-xl"
          >
            <CirclePlus className="w-5 h-5" />
            <span>Créer un Tournoi</span>
          </Link>
        </div>
      </div>

      {/* Global Stat Cards in Generous Scale */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-3xl p-7 border border-slate-800 shadow-xl">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">Tournois Actifs</span>
          <span className="font-mono font-black text-4xl sm:text-5xl text-white mt-2 block">{tournaments.length}</span>
          <span className="text-xs sm:text-sm text-emerald-400 font-medium mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Inscriptions en cours</span>
          </span>
        </div>

        <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-3xl p-7 border border-slate-800 shadow-xl">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">Total Inscrits</span>
          <span className="font-mono font-black text-4xl sm:text-5xl text-amber-400 mt-2 block">{players.length}</span>
          <span className="text-xs sm:text-sm text-slate-400 font-medium mt-2 block">Dossards attribués</span>
        </div>

        <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-3xl p-7 border border-slate-800 shadow-xl">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">Capacité Globale</span>
          <span className="font-mono font-black text-4xl sm:text-5xl text-red-400 mt-2 block">
            {tournaments.reduce((acc, t) => acc + t.max_players, 0)}
          </span>
          <span className="text-xs sm:text-sm text-emerald-400 font-medium mt-2 block">Anti-surréservation actif</span>
        </div>

        <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-3xl p-7 border border-slate-800 shadow-xl">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">Homologation</span>
          <span className="font-serif font-black text-3xl sm:text-4xl text-amber-300 mt-2 block">FIDE & FADE</span>
          <span className="text-xs sm:text-sm text-slate-400 font-medium mt-2 block">Swiss-Manager certifié</span>
        </div>
      </div>

      {/* Tournament Selector & Management Section */}
      <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-white">
              Liste des Inscrits par Tournoi
            </h2>
            <p className="text-sm text-slate-400 mt-1 font-medium">
              Sélectionnez la compétition pour vérifier les fiches joueurs et télécharger le fichier Swiss-Manager.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedTournamentId}
              onChange={(e) => setSelectedTournamentId(e.target.value)}
              className="px-4 py-3 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm font-bold focus:border-red-500 outline-none"
            >
              {tournaments.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.confirmed_count}/{t.max_players})
                </option>
              ))}
            </select>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl btn-gold text-sm font-bold shadow-lg"
              title="Exporter pour le logiciel d'appariement FIDE Swiss-Manager"
            >
              <Download className="w-4 h-4" />
              <span>Export Swiss-Manager (.CSV)</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher un joueur par nom, prénom, club ou ID FIDE..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#070A10] border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-red-500 outline-none"
          />
        </div>

        {/* Table of Registered Players with Large Readable Rows */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-sm text-slate-200 font-sans">
            <thead className="bg-[#070A10] text-slate-400 uppercase text-xs font-mono border-b border-slate-800">
              <tr>
                <th className="p-4">Dossard</th>
                <th className="p-4">Nom & Prénom</th>
                <th className="p-4">Club Affilié</th>
                <th className="p-4">FIDE ID</th>
                <th className="p-4">Cote Elo</th>
                <th className="p-4">Contact</th>
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
                    <td className="p-4 font-bold text-white text-base">
                      {player.last_name.toUpperCase()} {player.first_name}
                    </td>
                    <td className="p-4 text-slate-300">
                      <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-750 text-xs font-semibold">
                        {player.club || 'Indépendant'}
                      </span>
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
                      {player.rating ? player.rating : '0 (NC)'}
                    </td>
                    <td className="p-4 text-slate-300 font-mono text-xs">
                      {player.phone || player.email || '—'}
                    </td>
                    <td className="p-4 text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-500/50">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Confirmé
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400 text-base">
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
