import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Trophy, ChevronRight } from 'lucide-react';
import { Tournament } from '../../types';
import { CadenceBadge, StatusBadge } from '../common/Badge';

interface TournamentCardProps {
  tournament: Tournament;
  onRegisterClick?: (tournament: Tournament) => void;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({ tournament, onRegisterClick }) => {
  return (
    <div className="group bg-[#1E1D1A] rounded-2xl p-5 sm:p-6 border border-[#2E2C27] hover:border-[#D97757]/60 transition-all duration-200 hover:shadow-card-dark flex flex-col justify-between relative overflow-hidden">
      {/* Subtle warm corner tint */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-[#D97757]/5 rounded-bl-full pointer-events-none group-hover:bg-[#D97757]/10 transition-colors"></div>

      <div>
        {/* Header Tags */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <CadenceBadge cadence={tournament.cadence} />
          <StatusBadge status={tournament.status} />
        </div>

        {/* Title in Claude Editorial Serif */}
        <Link to={`/tournois/${tournament.slug}`}>
          <h3 className="font-serif text-xl sm:text-2xl text-[#F5F2EB] group-hover:text-[#D97757] transition-colors line-clamp-2 leading-snug">
            {tournament.title}
          </h3>
        </Link>

        {/* Description snippet */}
        <p className="mt-2 text-xs sm:text-sm text-[#BDB8AD] line-clamp-2 leading-relaxed">
          {tournament.description}
        </p>

        {/* Key Metas */}
        <div className="mt-4 pt-4 border-t border-[#2A2823] space-y-2.5 text-xs text-[#BDB8AD]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#D97757] shrink-0" />
            <span>Date : <strong className="text-[#F5F2EB] font-sans">{tournament.startDate}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D97757] shrink-0" />
            <span>Cadence : {tournament.timeControl} ({tournament.rounds} rondes)</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D97757] shrink-0" />
            <span className="truncate">{tournament.location}</span>
          </div>
          {tournament.prizes.length > 0 && (
            <div className="flex items-center gap-2 text-[#D4A373]">
              <Trophy className="w-4 h-4 shrink-0" />
              <span className="truncate font-semibold">{tournament.prizes[0]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="mt-6 pt-4 border-t border-[#2A2823] flex items-center justify-between gap-2">
        <Link
          to={`/tournois/${tournament.slug}`}
          className="text-xs font-medium text-[#BDB8AD] hover:text-[#F5F2EB] flex items-center gap-1 transition-colors"
        >
          <span>Détails & Règlement</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>

        {tournament.status === 'upcoming' && onRegisterClick && (
          <button
            onClick={() => onRegisterClick(tournament)}
            className="px-4 py-1.5 rounded-lg btn-claude text-xs font-semibold shadow-sm transition-all active:scale-95"
          >
            S'inscrire
          </button>
        )}
      </div>
    </div>
  );
};
