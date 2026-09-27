import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Award, Shield, ChevronRight } from 'lucide-react';
import { Player } from '../../types';

export const PlayerCard: React.FC<{ player: Player }> = ({ player }) => {
  return (
    <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 hover:border-hamra-700/80 transition-all hover:shadow-card-dark flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-hamra-900 to-slate-900 border border-hamra-700 flex items-center justify-center text-white font-display font-extrabold text-xl shrink-0 shadow-md">
            {player.name.substring(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-hamra-400 font-semibold">
                {player.category}
              </span>
              {player.titleFide && (
                <span className="text-xs px-2 py-0.5 rounded bg-trophy-gold/20 text-trophy-gold font-bold">
                  {player.titleFide}
                </span>
              )}
            </div>
            <Link to={`/joueurs/${player.slug}`}>
              <h3 className="font-display font-bold text-lg text-white hover:text-hamra-400 transition-colors mt-1">
                {player.name}
              </h3>
            </Link>
            {player.role && (
              <p className="text-xs text-slate-400 font-medium">{player.role}</p>
            )}
          </div>
        </div>

        {/* Ratings block */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-3 text-center">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Classement FIDE</span>
            <span className="font-mono font-bold text-white text-base">
              {player.fideRating ? player.fideRating : 'En cours'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Cote Nationale</span>
            <span className="font-mono font-bold text-hamra-400 text-base">
              {player.nationalRating ? player.nationalRating : 'Homologué'}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {player.bio}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800">
        <Link
          to={`/joueurs/${player.slug}`}
          className="text-xs font-semibold text-hamra-400 hover:text-hamra-300 flex items-center justify-between"
        >
          <span>Fiche joueur & palmarès</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
