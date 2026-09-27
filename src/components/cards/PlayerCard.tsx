import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Player } from '../../types';

export const PlayerCard: React.FC<{ player: Player }> = ({ player }) => {
  return (
    <div className="bg-[#1E1D1A] rounded-2xl p-5 border border-[#2E2C27] hover:border-[#D97757]/60 transition-all hover:shadow-card-dark flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-13 h-13 rounded-xl bg-[#26241F] border border-[#D97757]/40 flex items-center justify-center text-[#F5F2EB] font-serif text-xl shrink-0 shadow-sm">
            {player.name.substring(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#141413] text-[#E2896B] font-mono font-medium border border-[#2E2C27]">
                {player.category}
              </span>
              {player.titleFide && (
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#2A2318] text-[#D4A373] font-mono font-bold border border-[#D4A373]/30">
                  {player.titleFide}
                </span>
              )}
            </div>
            <Link to={`/joueurs/${player.slug}`}>
              <h3 className="font-serif text-xl text-[#F5F2EB] hover:text-[#D97757] transition-colors mt-1">
                {player.name}
              </h3>
            </Link>
            {player.role && (
              <p className="text-xs text-[#9C968B] font-medium font-sans">{player.role}</p>
            )}
          </div>
        </div>

        {/* Ratings block in Claude Monospace */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#141413] border border-[#26241F] mb-3 text-center">
          <div>
            <span className="text-[10px] text-[#7D786F] uppercase tracking-wider block font-mono">Classement FIDE</span>
            <span className="font-mono font-bold text-[#F5F2EB] text-base">
              {player.fideRating ? player.fideRating : 'En cours'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#7D786F] uppercase tracking-wider block font-mono">Cote FADE</span>
            <span className="font-mono font-bold text-[#D97757] text-base">
              {player.nationalRating ? player.nationalRating : 'Homologué'}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#BDB8AD] line-clamp-2 leading-relaxed font-sans">
          {player.bio}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[#2A2823]">
        <Link
          to={`/joueurs/${player.slug}`}
          className="text-xs font-semibold text-[#D97757] hover:text-[#E2896B] flex items-center justify-between"
        >
          <span>Fiche joueur & palmarès</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
