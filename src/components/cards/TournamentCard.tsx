import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Trophy, Users, ChevronRight } from 'lucide-react';
import { Tournament } from '../../types';
import { CadenceBadge, StatusBadge } from '../common/Badge';

interface TournamentCardProps {
  tournament: Tournament;
  onRegisterClick?: (tournament: Tournament) => void;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({ tournament, onRegisterClick }) => {
  return (
    <div className="group bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-hamra-700/80 transition-all duration-200 hover:shadow-card-dark flex flex-col justify-between relative overflow-hidden">
      {/* Accent corner line */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-hamra-600/5 rounded-bl-full pointer-events-none group-hover:bg-hamra-600/10 transition-colors"></div>

      <div>
        {/* Header Tags */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <CadenceBadge cadence={tournament.cadence} />
          <StatusBadge status={tournament.status} />
        </div>

        {/* Title */}
        <Link to={`/tournois/${tournament.slug}`}>
          <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-hamra-400 transition-colors line-clamp-2 leading-snug">
            {tournament.title}
          </h3>
        </Link>

        {/* Description snippet */}
        <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
          {tournament.description}
        </p>

        {/* Key Metas */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-hamra-400 shrink-0" />
            <span>Date : <strong className="text-white">{tournament.startDate}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-hamra-400 shrink-0" />
            <span>Cadence : {tournament.timeControl} ({tournament.rounds} rondes)</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-hamra-400 shrink-0" />
            <span className="truncate">{tournament.location}</span>
          </div>
          {tournament.prizes.length > 0 && (
            <div className="flex items-center gap-2 text-trophy-gold">
              <Trophy className="w-4 h-4 shrink-0" />
              <span className="truncate font-semibold">{tournament.prizes[0]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
        <Link
          to={`/tournois/${tournament.slug}`}
          className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
        >
          <span>Détails & Règlement</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>

        {tournament.status === 'upcoming' && onRegisterClick && (
          <button
            onClick={() => onRegisterClick(tournament)}
            className="px-3.5 py-1.5 rounded-lg bg-hamra-600 hover:bg-hamra-500 text-white text-xs font-bold shadow-md transition-all active:scale-95"
          >
            S'inscrire
          </button>
        )}
      </div>
    </div>
  );
};
