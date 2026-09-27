import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { Tournament } from '../types/tournament';

export const VercelTournamentCard: React.FC<{ tournament: Tournament }> = ({ tournament }) => {
  const percentage = Math.min(100, Math.round((tournament.confirmed_count / tournament.max_players) * 100));
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercent(percentage);
    }, 200);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="w-full max-w-full bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl hover:border-red-500/50 transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1.5 hover:shadow-red-950/30">
      
      {/* Top Header Card */}
      <div className="p-5 sm:p-8 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 to-[#0F172A]">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
          <span className="text-[11px] sm:text-xs font-mono font-extrabold uppercase tracking-wider px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-red-950/60 text-red-300 border border-red-500/40 shadow-sm">
            ⚡ {tournament.cadence}
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-extrabold text-amber-300 bg-amber-950/60 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border border-amber-500/40 shadow-sm">
            ♟️ {tournament.rounds} Rondes FIDE
          </span>
        </div>
        
        <h3 className="font-serif font-black text-xl sm:text-3xl text-white group-hover:text-amber-400 transition-colors leading-tight break-words">
          <Link to={`/tournoi/${tournament.slug}`}>
            {tournament.name}
          </Link>
        </h3>
      </div>

      {/* Body Card */}
      <div className="p-5 sm:p-8 flex-1 flex flex-col justify-between space-y-5 sm:space-y-6">
        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center shrink-0">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
            </div>
            <span className="font-medium capitalize text-white truncate">{tournament.start_date}</span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-850 border border-slate-700 flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300" />
            </div>
            <span className="truncate font-medium text-slate-200">{tournament.location}</span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-950/60 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            </div>
            <span className="truncate">Pointage : <strong className="text-white font-mono font-bold">{tournament.start_time}</strong></span>
          </div>
        </div>

        {/* Live Capacity Gauge (Linear animated) */}
        <div className="bg-[#070A10] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-800 space-y-3 shadow-inner">
          <div className="flex items-center justify-between text-xs sm:text-base font-bold">
            <span className="text-slate-300 flex items-center gap-1.5 sm:gap-2">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              Jauge des Inscrits :
            </span>
            <span className="tabular-nums font-mono font-black text-base sm:text-xl text-white">
              {tournament.confirmed_count} <span className="text-slate-400 text-xs sm:text-sm font-normal">/ {tournament.max_players}</span>
            </span>
          </div>

          {/* Glowing Red-Amber Progress Bar with smooth transition */}
          <div className="w-full h-3 sm:h-3.5 bg-slate-850 rounded-full overflow-hidden border border-slate-700 relative">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-red-500 to-rose-600 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-red-600/50"
              style={{ width: `${Math.max(4, animatedPercent)}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[11px] sm:text-sm pt-0.5">
            {tournament.spots_left > 0 ? (
              <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{tournament.spots_left} place{tournament.spots_left > 1 ? 's' : ''} restante{tournament.spots_left > 1 ? 's' : ''}</span>
              </span>
            ) : (
              <span className="text-amber-400 font-mono font-bold">
                ⚠️ Complet ({tournament.waitlist_count} en attente)
              </span>
            )}
            <span className="font-extrabold text-amber-300 font-mono text-xs sm:text-sm bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-500/30">
              {tournament.registration_fee === 0 ? 'Gratuit' : `${tournament.registration_fee} DZD`}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/tournoi/${tournament.slug}`}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-extrabold text-sm sm:text-base btn-hamra text-white transition-all shadow-xl group-hover:scale-[1.01]"
        >
          <span>{tournament.spots_left > 0 ? "S'inscrire & Réserver mon Dossard" : "Consulter le Tournoi"}</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
