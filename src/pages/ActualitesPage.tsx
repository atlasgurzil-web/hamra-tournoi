import React, { useState } from 'react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { SeoHead } from '../components/common/SeoHead';
import { NewsCard } from '../components/cards/NewsCard';
import { newsData } from '../data/newsData';

export const ActualitesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'École', 'Tournoi', 'Vie du club'];

  const filteredNews = newsData.filter((n) => {
    if (selectedCategory !== 'all' && n.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      <SeoHead
        title="Actualités & Communiqués"
        description="Toutes les actualités de la Section Échecs de Hamra Annaba : reportages, inscriptions et résultats récents."
      />

      <Breadcrumbs items={[{ label: "Actualités" }]} />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <SectionTitle
          badge="Journal du Club"
          title="Actualités & Communiqués"
          subtitle="Suivez la vie du club, les annonces officielles et les résultats de nos champions."
        />

        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === cat ? 'bg-hamra-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'Toutes' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};
