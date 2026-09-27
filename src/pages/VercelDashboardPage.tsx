import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, Trophy, Download, CirclePlus, CheckCircle2, ShieldCheck, Search, Filter, Edit, Trash2, UserPlus, Settings, RotateCcw } from 'lucide-react';
import { useTournaments } from '../context/TournamentContext';
import { Tournament, PlayerRegistration } from '../types/tournament';
import { EditPlayerModal } from '../components/modals/EditPlayerModal';
import { AddPlayerModal } from '../components/modals/AddPlayerModal';
import { EditTournamentModal } from '../components/modals/EditTournamentModal';
import { AddTournamentModal } from '../components/modals/AddTournamentModal';
import { ConfirmDeleteModal } from '../components/modals/ConfirmDeleteModal';

export const VercelDashboardPage: React.FC = () => {
  const {
    tournaments,
    players,
    addTournament,
    updateTournament,
    deleteTournament,
    addPlayerDirect,
    updatePlayer,
    deletePlayer,
    resetToDemo
  } = useTournaments();

  const [selectedTournamentId, setSelectedTournamentId] = useState<string>(tournaments[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isAddTournamentOpen, setIsAddTournamentOpen] = useState(false);
  const [editingTournament, setEditingTournament] = useState<Tournament | null>(null);
  const [deletingTournament, setDeletingTournament] = useState<Tournament | null>(null);

  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<PlayerRegistration | null>(null);
  const [deletingPlayer, setDeletingPlayer] = useState<PlayerRegistration | null>(null);

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

  const handleConfirmDeleteTournament = () => {
    if (!deletingTournament) return;
    deleteTournament(deletingTournament.id);
    setDeletingTournament(null);
    if (selectedTournamentId === deletingTournament.id) {
      const remaining = tournaments.filter(t => t.id !== deletingTournament.id);
      setSelectedTournamentId(remaining[0]?.id || '');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-14 space-y-6 sm:space-y-10 pb-28 md:pb-16 bg-[#0A0E17] overflow-x-hidden">
      {/* Header Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <LayoutDashboard className="w-3.5 h-3.5 text-red-400" />
            <span>DIRECTION_ARBITRAGE // FIDE_HOMOLOGATED</span>
          </div>
          <h1 className="font-serif font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight break-words">
            Espace Organisateur & Arbitrage
          </h1>
          <p className="text-xs sm:text-base text-slate-300 mt-1 font-medium">
            Gestion complète (CRUD) des tournois, des inscrits et exports certifiés Swiss-Manager.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => setIsAddPlayerOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl btn-secondary text-xs sm:text-sm font-bold shadow-lg cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-emerald-400" />
            <span>Inscrire un Joueur</span>
          </button>

          <button
            onClick={() => setIsAddTournamentOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl btn-hamra text-xs sm:text-sm font-extrabold shadow-xl cursor-pointer"
          >
            <CirclePlus className="w-4 h-4" />
            <span>Nouveau Tournoi</span>
          </button>
        </div>
      </div>

      {/* Global Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-800 shadow-xl">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block truncate">[01_ACTIVE_TOURNAMENTS]</span>
          <span className="font-mono font-black text-3xl sm:text-5xl text-white mt-1 sm:mt-2 block">{tournaments.length}</span>
          <span className="text-[11px] sm:text-xs text-emerald-400 font-mono mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>STATUS: OPEN</span>
          </span>
        </div>

        <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-800 shadow-xl">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block truncate">[02_REGISTERED_PLAYERS]</span>
          <span className="font-mono font-black text-3xl sm:text-5xl text-amber-400 mt-1 sm:mt-2 block">{players.length}</span>
          <span className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1 block truncate">BIBS_ASSIGNED</span>
        </div>

        <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-800 shadow-xl">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block truncate">[03_MAX_CAPACITY]</span>
          <span className="font-mono font-black text-3xl sm:text-5xl text-red-400 mt-1 sm:mt-2 block">
            {tournaments.reduce((acc, t) => acc + t.max_players, 0)}
          </span>
          <span className="text-[11px] sm:text-xs text-emerald-400 font-mono mt-1 block truncate">LOCK_ACTIVE: TRUE</span>
        </div>

        <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-800 shadow-xl">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block truncate">[04_CERTIFICATION]</span>
          <span className="font-serif font-black text-2xl sm:text-4xl text-amber-300 mt-1 sm:mt-2 block truncate">FIDE & FADE</span>
          <span className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1 block truncate">SWISS_MANAGER: OK</span>
        </div>
      </div>

      {/* SECTION 1: GESTION DIRECTE DES TOURNOIS (TABLE AVEC MODIFIER & SUPPRIMER) */}
      <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-800 p-4 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-1">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>REGISTRE_OFFICIEL_DES_TOURNOIS</span>
            </div>
            <h2 className="font-serif font-black text-xl sm:text-2xl text-white">
              Liste des Tournois Homologués ({tournaments.length})
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Ajoutez, modifiez ou supprimez des compétitions en temps réel.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddTournamentOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl btn-hamra text-xs sm:text-sm font-bold shadow-md cursor-pointer"
            >
              <CirclePlus className="w-4 h-4" />
              <span>Créer Tournoi</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm("Voulez-vous réinitialiser les tournois aux données officielles par défaut ?")) {
                  resetToDemo();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-mono transition-colors cursor-pointer"
              title="Réinitialiser données démo"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Table of Tournaments with explicit Edit and Delete per row */}
        <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl border border-slate-800">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-200 font-sans min-w-[720px]">
              <thead className="bg-[#070A10] text-slate-400 uppercase text-[10px] sm:text-[11px] font-mono border-b border-slate-800 tracking-wider">
                <tr>
                  <th className="p-3 sm:p-4">[NOM DU TOURNOI]</th>
                  <th className="p-3 sm:p-4">[DATES & HEURE]</th>
                  <th className="p-3 sm:p-4">[LIEU & CADENCE]</th>
                  <th className="p-3 sm:p-4">[PLACES & JAUGE]</th>
                  <th className="p-3 sm:p-4">[STATUT]</th>
                  <th className="p-3 sm:p-4 text-right">[ACTIONS]</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-[#0F172A]/50">
                {tournaments.length > 0 ? (
                  tournaments.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-800/60 transition-colors">
                      <td className="p-3 sm:p-4 whitespace-nowrap">
                        <Link to={`/tournoi/${t.slug}`} className="font-bold text-white hover:text-amber-400 transition-colors text-sm sm:text-base">
                          {t.name}
                        </Link>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5 truncate max-w-xs">
                          {t.description.slice(0, 60)}...
                        </div>
                      </td>
                      <td className="p-3 sm:p-4 text-xs font-mono text-slate-300 whitespace-nowrap">
                        <div className="font-bold text-white">{t.start_date}</div>
                        <div className="text-[11px] text-slate-400">Pointage : {t.start_time}</div>
                      </td>
                      <td className="p-3 sm:p-4 text-xs text-slate-300 whitespace-nowrap">
                        <div className="text-white font-medium">{t.location}</div>
                        <div className="text-[11px] text-amber-400 font-mono font-bold">{t.cadence} • {t.rounds} rondes</div>
                      </td>
                      <td className="p-3 sm:p-4 font-mono whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{t.confirmed_count}/{t.max_players}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t.spots_left > 0 ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/40' : 'bg-red-950/70 text-red-400 border border-red-500/40'}`}>
                            {t.spots_left > 0 ? `${t.spots_left} rest.` : 'Complet'}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 sm:p-4 whitespace-nowrap">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                          {t.status}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingTournament(t)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-amber-400 hover:bg-slate-700 text-xs font-bold transition-colors cursor-pointer border border-slate-700"
                            title="Modifier ce tournoi"
                          >
                            <Settings className="w-3.5 h-3.5 text-amber-400" />
                            <span className="hidden sm:inline">Modifier</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingTournament(t)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-950/60 text-red-400 hover:text-white hover:bg-red-600 text-xs font-bold transition-colors cursor-pointer border border-red-500/30"
                            title="Supprimer ce tournoi"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Supprimer</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400 text-sm font-mono">
                      AUCUN_TOURNOI_ACTIF // CLIQUEZ_SUR_NOUVEAU_TOURNOI
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECTION 2: GESTION DES JOUEURS DU TOURNOI */}
      <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-800 p-4 sm:p-8 space-y-5 sm:space-y-8 shadow-2xl overflow-hidden">
        
        {/* Tournament Selector for Player Table */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-serif font-black text-xl sm:text-3xl text-white">
                {currentTournament ? `Inscrits : ${currentTournament.name}` : "Sélectionner un tournoi"}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-medium">
              {currentTournament ? `${currentTournament.cadence} • ${currentTournament.rounds} Rondes • ${currentTournament.confirmed_count}/${currentTournament.max_players} Inscrits (${currentTournament.spots_left} places restantes)` : ''}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <select
              value={selectedTournamentId}
              onChange={(e) => setSelectedTournamentId(e.target.value)}
              className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-xs sm:text-sm font-mono font-bold focus:border-red-500 outline-none w-full sm:w-auto"
            >
              {tournaments.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} [{t.confirmed_count}/{t.max_players}]
                </option>
              ))}
            </select>

            <button
              onClick={handleExportCSV}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl btn-gold text-xs sm:text-sm font-bold shadow-lg cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Search Bar + Quick Add Player */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher un inscrit par nom, club ou ID FIDE... (ex: 7981600)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#070A10] border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:border-red-500 outline-none"
            />
          </div>

          <button
            onClick={() => setIsAddPlayerOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl btn-hamra text-xs sm:text-sm font-bold shadow-md cursor-pointer shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Ajouter Joueur</span>
          </button>
        </div>

        {/* SSENSE Style High-Precision Table with Edit and Delete Action Buttons */}
        <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl border border-slate-800">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-200 font-sans min-w-[700px]">
              <thead className="bg-[#070A10] text-slate-400 uppercase text-[10px] sm:text-[11px] font-mono border-b border-slate-800 tracking-wider">
                <tr>
                  <th className="p-3 sm:p-4">[BIB]</th>
                  <th className="p-3 sm:p-4">[COMPETITOR_NAME]</th>
                  <th className="p-3 sm:p-4">[CLUB_AFFILIATION]</th>
                  <th className="p-3 sm:p-4">[FIDE_CODE]</th>
                  <th className="p-3 sm:p-4">[RATING_ELO]</th>
                  <th className="p-3 sm:p-4">[STATUS]</th>
                  <th className="p-3 sm:p-4 text-right">[ACTIONS]</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-[#0F172A]/50">
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player) => (
                    <tr key={player.id} className="hover:bg-slate-800/60 transition-colors">
                      <td className="p-3 sm:p-4 font-mono font-black text-amber-400 text-sm sm:text-base">
                        #{player.bib_number < 10 ? `0${player.bib_number}` : player.bib_number}
                      </td>
                      <td className="p-3 sm:p-4 whitespace-nowrap">
                        <div className="font-bold text-white text-sm sm:text-base">
                          {player.last_name.toUpperCase()} {player.first_name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          Né(e) en {player.birth_date ? player.birth_date.split('-')[0] : '—'} • {player.sex}
                        </div>
                      </td>
                      <td className="p-3 sm:p-4 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-white font-mono font-medium text-[11px]">
                          <ShieldCheck className="w-3 h-3 text-red-500" />
                          <span>{player.club ? player.club.toUpperCase() : 'HAMRA ANNABA'}</span>
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
                          <span className="text-slate-500 font-mono">UNRATED</span>
                        )}
                      </td>
                      <td className="p-3 sm:p-4 font-mono font-black text-sm sm:text-base text-emerald-400">
                        {player.rating ? player.rating : '1499 (EST)'}
                      </td>
                      <td className="p-3 sm:p-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-500/50">
                          <CheckCircle2 className="w-3 h-3" /> VERIFIED
                        </span>
                      </td>
                      <td className="p-3 sm:p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingPlayer(player)}
                            className="p-1.5 sm:p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-750 transition-colors cursor-pointer"
                            title="Modifier ce joueur"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeletingPlayer(player)}
                            className="p-1.5 sm:p-2 rounded-lg bg-red-950/40 text-red-400 hover:text-red-200 hover:bg-red-900/50 transition-colors cursor-pointer"
                            title="Supprimer ce joueur"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400 text-sm font-mono">
                      AUCUN_JOUEUR_INSCRIT_POUR_CE_TOURNOI
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Modals for Players and Tournaments */}
      <AddPlayerModal
        tournaments={tournaments}
        defaultTournamentId={currentTournament?.id}
        isOpen={isAddPlayerOpen}
        onClose={() => setIsAddPlayerOpen(false)}
        onAdd={(data) => addPlayerDirect(data)}
      />

      {editingPlayer && (
        <EditPlayerModal
          player={editingPlayer}
          isOpen={Boolean(editingPlayer)}
          onClose={() => setEditingPlayer(null)}
          onSave={(updated) => {
            updatePlayer(editingPlayer.id, updated);
            setEditingPlayer(null);
          }}
        />
      )}

      {deletingPlayer && (
        <ConfirmDeleteModal
          isOpen={Boolean(deletingPlayer)}
          title="Supprimer le joueur"
          message={`Êtes-vous sûr de vouloir supprimer ${deletingPlayer.first_name} ${deletingPlayer.last_name} (Dossard #${deletingPlayer.bib_number}) de ce tournoi ? Cette action libérera sa place dans la jauge.`}
          onConfirm={() => {
            deletePlayer(deletingPlayer.id);
            setDeletingPlayer(null);
          }}
          onCancel={() => setDeletingPlayer(null)}
        />
      )}

      {editingTournament && (
        <EditTournamentModal
          tournament={editingTournament}
          isOpen={Boolean(editingTournament)}
          onClose={() => setEditingTournament(null)}
          onSave={(updated) => {
            updateTournament(editingTournament.id, updated);
            setEditingTournament(null);
          }}
        />
      )}

      {deletingTournament && (
        <ConfirmDeleteModal
          isOpen={Boolean(deletingTournament)}
          title="Supprimer le tournoi"
          message={`Êtes-vous certain de vouloir supprimer définitivement le tournoi "${deletingTournament.name}" ainsi que tous les joueurs inscrits associés ?`}
          onConfirm={handleConfirmDeleteTournament}
          onCancel={() => setDeletingTournament(null)}
        />
      )}

      <AddTournamentModal
        isOpen={isAddTournamentOpen}
        onClose={() => setIsAddTournamentOpen(false)}
        onAdd={(data) => {
          const created = addTournament(data);
          setSelectedTournamentId(created.id);
        }}
      />

    </div>
  );
};
