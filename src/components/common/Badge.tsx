import React from 'react';
import { CadenceType, TournamentStatus } from '../../types';
import { Zap, Timer, Crown, CheckCircle2, Clock } from 'lucide-react';

export const CadenceBadge: React.FC<{ cadence: CadenceType }> = ({ cadence }) => {
  const styles = {
    Blitz: "bg-[#2A2318] text-[#E6C594] border-[#D4A373]/30",
    Rapide: "bg-[#2B1F19] text-[#E2896B] border-[#D97757]/30",
    Classique: "bg-[#1E2328] text-[#93C5FD] border-[#3B82F6]/30",
  };

  const getIcon = () => {
    switch (cadence) {
      case 'Blitz':
        return <Zap className="w-3.5 h-3.5 text-[#D4A373]" />;
      case 'Rapide':
        return <Timer className="w-3.5 h-3.5 text-[#D97757]" />;
      case 'Classique':
        return <Crown className="w-3.5 h-3.5 text-[#60A5FA]" />;
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${styles[cadence]}`}>
      {getIcon()}
      <span>{cadence}</span>
    </span>
  );
};

export const StatusBadge: React.FC<{ status: TournamentStatus }> = ({ status }) => {
  if (status === 'upcoming') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1A251C] text-[#8FBC8F] border border-[#7E9F80]/40">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7E9F80] animate-pulse"></span>
        <span>À venir</span>
      </span>
    );
  }
  if (status === 'ongoing') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2B1F19] text-[#E2896B] border border-[#D97757]/40">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D97757] animate-ping"></span>
        <span>En cours</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#21201C] text-[#9C968B] border border-[#2E2C27]">
      <CheckCircle2 className="w-3.5 h-3.5 text-[#7D786F]" />
      <span>Terminé</span>
    </span>
  );
};
