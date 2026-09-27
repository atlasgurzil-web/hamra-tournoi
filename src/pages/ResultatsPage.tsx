import React from 'react';
import { Trophy, Medal, Award, Calendar, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { SeoHead } from '../components/common/SeoHead';
import { tournamentsData } from '../data/tournamentsData';

export const ResultatsPage: React.FC = () => {
  const completedTournaments = tournamentsData.filter((t) => t.status === 'completed' || t.results);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      <SeoHead
        title="Résultats & Palmarès Officiel"
        description="Consultez les résultats récents des compétitions, grilles finales et palmarès de Hamra Annaba."
      />

      <Breadcrumbs items={[{ label: "Résultats" }]} />

      <SectionTitle
        badge="Compétitions & Podiums"
        title="Résultats & Palmarès du Club"
        subtitle="Les classements finaux des tournois disputés par les sociétaires de Hamra Annaba."
      />

      <div className="space-y-8">
        {completedTournaments.map((t) => (
          <div key={t.id} className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs px-2.5 py-0.5 rounded bg-hamra-950 text-hamra-400 font-bold border border-hamra-900">
                  {t.cadence} • {t.system}
                </span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mt-1">
                  {t.title}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Disputé le {t.startDate}</span>
            </div>

            {t.results && t.results.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-3 rounded-l-lg">Place</th>
                      <th className="p-3">Joueur</th>
                      <th className="p-3">Club</th>
                      <th className="p-3">Score</th>
                      <th className="p-3 rounded-r-lg">Cote</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {t.results.map((r) => (
                      <tr key={r.rank} className="hover:bg-slate-800/50">
                        <td className="p-3 font-bold text-white">
                          {r.rank === 1 ? '🥇 1er' : r.rank === 2 ? '🥈 2e' : r.rank === 3 ? '🥉 3e' : `${r.rank}e`}
                        </td>
                        <td className="p-3 font-semibold text-white">{r.name}</td>
                        <td className="p-3 text-slate-400">{r.club}</td>
                        <td className="p-3 font-mono font-bold text-hamra-400">{r.points} pts</td>
                        <td className="p-3 font-mono text-slate-400">{r.elo ? r.elo : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Résultats en cours de saisie par la commission d'arbitrage.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
