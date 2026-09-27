import React from 'react';
import { CadenceType, TournamentStatus } from '../../types';

export const CadenceBadge: React.FC<{ cadence: CadenceType }> = ({ cadence }) => {
  const styles = {
    Blitz: "bg-amber-950/80 text-amber-300 border-amber-800/60",
    Rapide: "bg-hamra-950/80 text-hamra-300 border-hamra-800/60",
    Classique: "bg-blue-950/80 text-blue-300 border-blue-800/60",
  };

  const icons = {
    Blitz: "⚡",
    Rapide: "⏱️",
    Classique: "♟️",
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${styles[cadence]}`}>
      <span>{icons[cadence]}</span>
      <span>{cadence}</span>
    </span>
  );
};

export const StatusBadge: React.FC<{ status: TournamentStatus }> = ({ status }) => {
  if (status === 'upcoming') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>À venir</span>
      </span>
    );
  }
  if (status === 'ongoing') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950 text-amber-400 border border-amber-800">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
        <span>En cours</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
      <span>Terminé</span>
    </span>
  );
};
