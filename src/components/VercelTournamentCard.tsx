import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { Tournament } from '../types/tournament';

export const VercelTournamentCard: React.FC<{ tournament: Tournament }> = ({ tournament }) => {
  const percentage = Math.min(100, Math.round((tournament.confirmed_count / tournament.max_players) * 100));

  return (
    <div className="bg-[#1E1D1A] backdrop-blur-xl rounded-2xl border border-[#2E2C27] shadow-2xl hover:border-[#D97757]/60 transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1">
      {/* Top Header Card */}
      <div className="p-6 border-b border-[#2A2823] bg-gradient-to-b from-[#24221E] to-[#1E1D1A]">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#D97757]/15 text-[#E2896B] border border-[#D97757]/40">
            {tournament.cadence}
          </span>
          <span className="text-xs font-mono font-bold text-[#D4A373] bg-[#2A2318] px-2.5 py-1 rounded-md border border-[#D4A373]/30">
            {tournament.rounds} Rondes
          </span>
        </div>
        <h3 className="font-serif text-2xl text-[#F5F2EB] group-hover:text-[#D97757] transition-colors leading-snug">
          <Link to={`/tournoi/${tournament.slug}`}>
            {tournament.name}
          </Link>
        </h3>
      </div>

      {/* Body Card */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3 text-xs sm:text-sm text-[#BDB8AD]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#D97757] shrink-0" />
            <span className="capitalize">{tournament.start_date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#9C968B] shrink-0" />
            <span className="truncate">{tournament.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#9C968B] shrink-0" />
            <span>Pointage : <strong className="text-[#F5F2EB] font-mono">{tournament.start_time}</strong></span>
          </div>
        </div>

        {/* Live Capacity Gauge */}
        <div className="bg-[#141413] p-4 rounded-xl border border-[#26241F] space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[#BDB8AD] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#D4A373]" />
              Jauge des Joueurs :
            </span>
            <span className="tabular-nums font-mono font-bold text-[#F5F2EB]">
              {tournament.confirmed_count} / {tournament.max_players}
            </span>
          </div>

          {/* Progress Bar in Claude Terracotta Gradient */}
          <div className="w-full h-2.5 bg-[#26241F] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D4A373] via-[#D97757] to-[#C15F3C] rounded-full transition-all duration-500"
              style={{ width: `${Math.max(2, percentage)}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            {tournament.spots_left > 0 ? (
              <span className="text-[#7E9F80] font-mono font-semibold">
                🟢 {tournament.spots_left} place{tournament.spots_left > 1 ? 's' : ''} restante{tournament.spots_left > 1 ? 's' : ''}
              </span>
            ) : (
              <span className="text-[#D4A373] font-mono font-semibold">
                ⚠️ Complet ({tournament.waitlist_count} en attente)
              </span>
            )}
            <span className="font-semibold text-[#D4A373] font-mono">
              {tournament.registration_fee === 0 ? 'Gratuit' : `${tournament.registration_fee} DZD`}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/tournoi/${tournament.slug}`}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm btn-claude text-white transition-all hover:scale-[1.01]"
        >
          <span>{tournament.spots_left > 0 ? "S'inscrire au Tournoi" : "Consulter le Tournoi"}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
