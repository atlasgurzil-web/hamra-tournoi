import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tournament, PlayerRegistration } from '../types/tournament';

interface TournamentContextType {
  tournaments: Tournament[];
  players: PlayerRegistration[];
  getTournamentBySlug: (slug: string) => Tournament | undefined;
  getPlayersForTournament: (tournamentId: string) => PlayerRegistration[];
  registerPlayer: (tournamentSlug: string, playerData: Omit<PlayerRegistration, 'id' | 'tournament_id' | 'bib_number' | 'created_at'>) => { success: boolean; bibNumber?: number; message?: string };
  addTournament: (newTournament: Omit<Tournament, 'id' | 'slug' | 'confirmed_count' | 'waitlist_count' | 'paid_count' | 'is_full' | 'spots_left'>) => Tournament;
  updateTournament: (tournamentId: string, updatedData: Partial<Tournament>) => void;
  deleteTournament: (tournamentId: string) => void;
  addPlayerDirect: (playerData: Omit<PlayerRegistration, 'id' | 'bib_number' | 'created_at'>) => PlayerRegistration | null;
  updatePlayer: (playerId: string, updatedData: Partial<PlayerRegistration>) => void;
  deletePlayer: (playerId: string) => void;
  resetToDemo: () => void;
}

const INITIAL_TOURNAMENTS: Tournament[] = [
  {
    id: "89614b79-d445-47cc-95b5-77db5f16f28e",
    slug: "le-cercle-des-rois-iiii",
    name: "♟️ LE CERCLE DES ROIS IV ♟️",
    description: "4e édition du prestigieux tournoi Le Cercle des Rois organisé par Hamra Annaba Échecs. 7 rondes système suisse, homologation officielle FIDE & Swiss-Manager.",
    start_date: "2026-10-01",
    end_date: "2026-10-02",
    start_time: "22:00",
    location: "Café dardara",
    cadence: "5+3",
    rounds: 7,
    registration_fee: 0,
    max_players: 50,
    status: "published",
    registration_open: true,
    confirmed_count: 1,
    waitlist_count: 0,
    paid_count: 1,
    is_full: false,
    spots_left: 49,
    organizer: {
      club_name: "Hamra Annaba Échecs (1944)",
      phone: "038 86 00 00",
      email: "contact@hamra-annaba.dz",
      website: "https://hamra-annaba-echecs.vercel.app"
    }
  },
  {
    id: "46e73436-c7c1-4a16-9ff2-7bec40b4ee17",
    slug: "le-cercle-des-rois-iii",
    name: "Le Cercle Des Rois III",
    description: "3e édition du Cercle des Rois. Tournoi d'échecs rapides avec homologation FIDE sous la direction de l'arbitre principal de Hamra Annaba.",
    start_date: "2026-08-27",
    end_date: "2026-08-28",
    start_time: "22:00",
    location: "Café Dardara",
    cadence: "5+3",
    rounds: 7,
    registration_fee: 0,
    max_players: 30,
    status: "published",
    registration_open: false,
    confirmed_count: 30,
    waitlist_count: 1,
    paid_count: 30,
    is_full: true,
    spots_left: 0,
    organizer: {
      club_name: "Hamra Annaba Échecs (1944)",
      phone: "038 86 00 00",
      email: "contact@hamra-annaba.dz",
      website: "https://hamra-annaba-echecs.vercel.app"
    }
  }
];

const INITIAL_PLAYERS: PlayerRegistration[] = [
  {
    id: "p-01",
    tournament_id: "89614b79-d445-47cc-95b5-77db5f16f28e",
    first_name: "Hamza",
    last_name: "Benghida",
    birth_date: "1995-04-12",
    phone: "0551056785",
    email: "hamza.benghida@gmail.com",
    sex: "M",
    club: "Hamra Annaba",
    fide_id: "7981600",
    rating: 1850,
    bib_number: 1,
    created_at: "2026-08-28T22:00:00Z"
  }
];

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export const TournamentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tournaments, setTournaments] = useState<Tournament[]>(() => {
    try {
      const saved = localStorage.getItem('hamra_tournaments');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Error reading hamra_tournaments from localStorage:", e);
    }
    return INITIAL_TOURNAMENTS;
  });

  const [players, setPlayers] = useState<PlayerRegistration[]>(() => {
    try {
      const saved = localStorage.getItem('hamra_players');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Error reading hamra_players from localStorage:", e);
    }
    return INITIAL_PLAYERS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hamra_tournaments', JSON.stringify(tournaments));
    } catch (e) {
      console.error("localStorage error:", e);
    }
  }, [tournaments]);

  useEffect(() => {
    try {
      localStorage.setItem('hamra_players', JSON.stringify(players));
    } catch (e) {
      console.error("localStorage error:", e);
    }
  }, [players]);

  const getTournamentBySlug = (slug: string) => {
    return tournaments.find((t) => t.slug === slug);
  };

  const getPlayersForTournament = (tournamentId: string) => {
    return players.filter((p) => p.tournament_id === tournamentId);
  };

  // Public player registration (with auto-bib assignment and capacity update)
  const registerPlayer = (
    tournamentSlug: string,
    playerData: Omit<PlayerRegistration, 'id' | 'tournament_id' | 'bib_number' | 'created_at'>
  ) => {
    const tournament = tournaments.find((t) => t.slug === tournamentSlug);
    if (!tournament) return { success: false, message: "Tournoi introuvable." };

    const tournamentPlayers = players.filter((p) => p.tournament_id === tournament.id);
    const bibNumber = tournamentPlayers.length + 1;

    const newPlayer: PlayerRegistration = {
      ...playerData,
      id: `p-${Date.now()}`,
      tournament_id: tournament.id,
      bib_number: bibNumber,
      created_at: new Date().toISOString()
    };

    setPlayers((prev) => {
      const updated = [...prev, newPlayer];
      try { localStorage.setItem('hamra_players', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });

    setTournaments((prev) => {
      const updated = prev.map((t) => {
        if (t.id === tournament.id) {
          const newConfirmed = t.confirmed_count + 1;
          const newSpots = Math.max(0, t.max_players - newConfirmed);
          return {
            ...t,
            confirmed_count: newConfirmed,
            spots_left: newSpots,
            is_full: newConfirmed >= t.max_players
          };
        }
        return t;
      });
      try { localStorage.setItem('hamra_tournaments', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });

    return { success: true, bibNumber };
  };

  // Direct player creation from Admin Dashboard / Player Directory
  const addPlayerDirect = (
    playerData: Omit<PlayerRegistration, 'id' | 'bib_number' | 'created_at'>
  ): PlayerRegistration | null => {
    const tournament = tournaments.find((t) => t.id === playerData.tournament_id);
    if (!tournament) return null;

    const tournamentPlayers = players.filter((p) => p.tournament_id === tournament.id);
    const bibNumber = tournamentPlayers.length + 1;

    const newPlayer: PlayerRegistration = {
      ...playerData,
      id: `p-${Date.now()}`,
      bib_number: bibNumber,
      created_at: new Date().toISOString()
    };

    setPlayers((prev) => {
      const updated = [newPlayer, ...prev];
      try { localStorage.setItem('hamra_players', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });

    setTournaments((prev) => {
      const updated = prev.map((t) => {
        if (t.id === tournament.id) {
          const newConfirmed = t.confirmed_count + 1;
          const newSpots = Math.max(0, t.max_players - newConfirmed);
          return {
            ...t,
            confirmed_count: newConfirmed,
            spots_left: newSpots,
            is_full: newConfirmed >= t.max_players
          };
        }
        return t;
      });
      try { localStorage.setItem('hamra_tournaments', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });

    return newPlayer;
  };

  // Update existing player
  const updatePlayer = (playerId: string, updatedData: Partial<PlayerRegistration>) => {
    setPlayers((prev) => {
      const updated = prev.map((p) => {
        if (p.id === playerId) {
          return { ...p, ...updatedData };
        }
        return p;
      });
      try { localStorage.setItem('hamra_players', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  // Delete player (and automatically recalculate tournament gauge)
  const deletePlayer = (playerId: string) => {
    const playerToDelete = players.find((p) => p.id === playerId);
    if (!playerToDelete) return;

    setPlayers((prev) => {
      const updated = prev.filter((p) => p.id !== playerId);
      try { localStorage.setItem('hamra_players', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });

    setTournaments((prev) => {
      const updated = prev.map((t) => {
        if (t.id === playerToDelete.tournament_id) {
          const newConfirmed = Math.max(0, t.confirmed_count - 1);
          const newSpots = Math.max(0, t.max_players - newConfirmed);
          return {
            ...t,
            confirmed_count: newConfirmed,
            spots_left: newSpots,
            is_full: newConfirmed >= t.max_players
          };
        }
        return t;
      });
      try { localStorage.setItem('hamra_tournaments', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  // Create new tournament
  const addTournament = (
    newTournamentData: Omit<Tournament, 'id' | 'slug' | 'confirmed_count' | 'waitlist_count' | 'paid_count' | 'is_full' | 'spots_left'>
  ): Tournament => {
    const slug = newTournamentData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const created: Tournament = {
      ...newTournamentData,
      id: `t-${Date.now()}`,
      slug: slug || `tournoi-${Date.now()}`,
      confirmed_count: 0,
      waitlist_count: 0,
      paid_count: 0,
      is_full: false,
      spots_left: newTournamentData.max_players,
      organizer: {
        club_name: "Hamra Annaba Échecs (1944)",
        phone: "038 86 00 00",
        email: "contact@hamra-annaba.dz",
        website: "https://hamra-annaba-echecs.vercel.app"
      }
    };

    setTournaments((prev) => {
      const updated = [created, ...prev];
      try { localStorage.setItem('hamra_tournaments', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });

    return created;
  };

  // Update existing tournament
  const updateTournament = (tournamentId: string, updatedData: Partial<Tournament>) => {
    setTournaments((prev) => {
      const updated = prev.map((t) => {
        if (t.id === tournamentId) {
          const maxPlayers = updatedData.max_players !== undefined ? updatedData.max_players : t.max_players;
          const confirmed = updatedData.confirmed_count !== undefined ? updatedData.confirmed_count : t.confirmed_count;
          const newSpots = Math.max(0, maxPlayers - confirmed);
          const isFull = confirmed >= maxPlayers;

          return {
            ...t,
            ...updatedData,
            max_players: maxPlayers,
            spots_left: newSpots,
            is_full: isFull
          };
        }
        return t;
      });
      try { localStorage.setItem('hamra_tournaments', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  // Delete tournament (and cascade delete its registered players)
  const deleteTournament = (tournamentId: string) => {
    setTournaments((prev) => {
      const updated = prev.filter((t) => t.id !== tournamentId);
      try { localStorage.setItem('hamra_tournaments', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    setPlayers((prev) => {
      const updated = prev.filter((p) => p.tournament_id !== tournamentId);
      try { localStorage.setItem('hamra_players', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  // Reset to default initial data
  const resetToDemo = () => {
    try {
      localStorage.setItem('hamra_tournaments', JSON.stringify(INITIAL_TOURNAMENTS));
      localStorage.setItem('hamra_players', JSON.stringify(INITIAL_PLAYERS));
    } catch (e) {}
    setTournaments(INITIAL_TOURNAMENTS);
    setPlayers(INITIAL_PLAYERS);
  };

  return (
    <TournamentContext.Provider
      value={{
        tournaments,
        players,
        getTournamentBySlug,
        getPlayersForTournament,
        registerPlayer,
        addTournament,
        updateTournament,
        deleteTournament,
        addPlayerDirect,
        updatePlayer,
        deletePlayer,
        resetToDemo
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournaments = () => {
  const context = useContext(TournamentContext);
  if (!context) throw new Error("useTournaments must be used within a TournamentProvider");
  return context;
};
