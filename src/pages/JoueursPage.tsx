import React, { useState } from 'react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { SeoHead } from '../components/common/SeoHead';
import { PlayerCard } from '../components/cards/PlayerCard';
import { playersData } from '../data/playersData';
import { PlayerCategory } from '../types';

export const JoueursPage: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<'all' | PlayerCategory>('all');

  const categories: PlayerCategory[] = ['Senior', 'Cadet', 'Minime', 'Poussin'];

  const filteredPlayers = playersData.filter((p) => {
    if (selectedCat !== 'all' && p.category !== selectedCat) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      <SeoHead
        title="Effectif des Joueurs"
        description="Consultez l'effectif officiel des joueurs de Hamra Annaba : cotes FIDE, classements nationaux, catégories d'âges et palmarès."
      />

      <Breadcrumbs items={[{ label: "Joueurs" }]} />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <SectionTitle
          badge="Effectif & Compétiteurs"
          title="Les Joueurs de Hamra Annaba"
          subtitle="Découvrez les compétiteurs seniors et jeunes espoirs qui défendent les couleurs du club."
        />

        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCat === 'all' ? 'bg-hamra-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tous ({playersData.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCat === cat ? 'bg-hamra-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};
