import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Trophy, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { tournamentsData } from '../../data/tournamentsData';

export const NextEventBanner: React.FC<{ onRegisterClick: () => void }> = ({ onRegisterClick }) => {
  const { t } = useLanguage();
  const nextTournament = tournamentsData.find((t) => t.status === 'upcoming' && t.featured) || tournamentsData[0];

  if (!nextTournament) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
      <div className="bg-[#1C1B18] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#D97757]/40 shadow-2xl relative overflow-hidden">
        
        {/* Glow corner accent in Claude terracotta */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D97757]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Left Info Block */}
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97757] text-white text-[11px] font-semibold uppercase tracking-wider font-mono shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.nextEvent.label}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB] leading-tight">
              {nextTournament.title}
            </h3>

            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-[#BDB8AD] pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-[#D97757]" />
                <strong className="text-[#F5F2EB] font-sans">{nextTournament.startDate}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#D97757]" />
                <span>{nextTournament.timeControl}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#D97757]" />
                <span className="truncate max-w-[200px] sm:max-w-none">{nextTournament.location}</span>
              </span>
              {nextTournament.prizes.length > 0 && (
                <span className="flex items-center gap-1.5 text-[#D4A373] font-semibold">
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
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl btn-obsidian text-center text-xs sm:text-sm font-semibold"
            >
              {t.nextEvent.detailsBtn}
            </Link>

            <button
              onClick={onRegisterClick}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl btn-claude text-center text-xs sm:text-sm font-semibold active:scale-95 shadow-md"
            >
              {t.nextEvent.registerBtn}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
