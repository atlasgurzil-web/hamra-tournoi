import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Trophy, Sparkles, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { tournamentsData } from '../../data/tournamentsData';

export const NextEventBanner: React.FC<{ onRegisterClick: () => void }> = ({ onRegisterClick }) => {
  const { t } = useLanguage();
  const nextTournament = tournamentsData.find((t) => t.status === 'upcoming' && t.featured) || tournamentsData[0];

  if (!nextTournament) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
      <div className="bg-gradient-to-r from-hamra-900 via-slate-900 to-slate-950 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-hamra-600/70 shadow-2xl relative overflow-hidden">
        
        {/* Glow corner accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-hamra-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Left Info Block */}
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hamra-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.nextEvent.label}</span>
            </div>

            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white leading-tight">
              {nextTournament.title}
            </h3>

            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-hamra-400" />
                <strong className="text-white">{nextTournament.startDate}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-hamra-400" />
                <span>{nextTournament.timeControl}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-hamra-400" />
                <span className="truncate max-w-[200px] sm:max-w-none">{nextTournament.location}</span>
              </span>
              {nextTournament.prizes.length > 0 && (
                <span className="flex items-center gap-1.5 text-trophy-gold font-semibold">
                  <Trophy className="w-4 h-4" />
                  <span>{nextTournament.prizes[0]}</span>
                </span>
              )}
            </div>
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <Link
              to={`/tournois/${nextTournament.slug}`}
              className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm text-center border border-slate-700 transition-all"
            >
              {t.nextEvent.detailsBtn}
            </Link>

            <button
              onClick={onRegisterClick}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-hamra-600 hover:bg-hamra-500 text-white font-extrabold text-xs sm:text-sm shadow-club text-center transition-all active:scale-95"
            >
              {t.nextEvent.registerBtn}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
