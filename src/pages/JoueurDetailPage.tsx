import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Trophy, Award, Shield, ChevronLeft, Calendar, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { playersData } from '../data/playersData';

export const JoueurDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const player = playersData.find((p) => p.slug === slug);

  if (!player) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-display font-extrabold text-2xl text-white">Joueur introuvable</h2>
        <Link to="/joueurs" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-hamra-600 text-white text-xs font-bold">
          <ChevronLeft className="w-4 h-4" /> Retour à l'effectif
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      <SeoHead
        title={`${player.name} – Fiche Joueur`}
        description={`Fiche de ${player.name} (${player.category}) de Hamra Annaba. Classement FIDE, cote nationale et palmarès.`}
      />

      <Breadcrumbs
        items={[
          { label: "Joueurs", path: "/joueurs" },
          { label: player.name }
        ]}
      />

      {/* Main Profile Card */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-hamra-900 via-slate-800 to-slate-900 border-2 border-hamra-600 flex items-center justify-center text-white font-display font-extrabold text-4xl shadow-xl shrink-0">
            {player.name.substring(0, 2)}
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded bg-hamra-950 text-hamra-400 border border-hamra-800">
                Catégorie : {player.category}
              </span>
              {player.titleFide && (
                <span className="text-xs font-bold px-3 py-1 rounded bg-trophy-gold/20 text-trophy-gold border border-trophy-gold/40">
                  {player.titleFide}
                </span>
              )}
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              {player.name}
            </h1>
            {player.role && (
              <p className="text-sm font-semibold text-slate-300">{player.role}</p>
            )}
          </div>
        </div>

        {/* Ratings grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Identifiant FIDE</span>
            <span className="font-mono font-bold text-white text-base">
              {player.fideId ? player.fideId : "En cours d'homologation"}
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Classement FIDE</span>
            <span className="font-mono font-extrabold text-white text-xl">
              {player.fideRating ? player.fideRating : '-'}
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Cote Nationale FADE</span>
            <span className="font-mono font-extrabold text-hamra-400 text-xl">
              {player.nationalRating ? player.nationalRating : '-'}
            </span>
          </div>
        </div>

        {/* Bio & Achievements */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="font-display font-bold text-xl text-white">Biographie & Parcours</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {player.bio}
          </p>

          <h3 className="font-display font-bold text-xl text-white pt-3">Palmarès & Distinctions</h3>
          <div className="space-y-2">
            {player.achievements.map((ach, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <Trophy className="w-4 h-4 text-trophy-gold shrink-0" />
                <span className="text-xs font-semibold text-slate-200">{ach}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
