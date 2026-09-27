import React, { useState } from 'react';
import { Camera, Calendar, Tag } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { SeoHead } from '../components/common/SeoHead';
import { galleryData } from '../data/galleryData';

export const GaleriePage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const categories = ['all', 'Tournois', 'Entraînements', 'Remise des prix', 'Historique'];

  const filteredItems = galleryData.filter((item) => {
    if (filter !== 'all' && item.category !== filter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      <SeoHead
        title="Photothèque & Galerie du Club"
        description="Photos officielles des compétitions, séances d'entraînement et moments forts de Hamra Annaba Section Échecs."
      />

      <Breadcrumbs items={[{ label: "Galerie" }]} />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <SectionTitle
          badge="Moments Forts"
          title="Photothèque de Hamra Annaba"
          subtitle="Revivez en images l'ambiance des tournois, des séances de cours et des podiums."
        />

        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === c ? 'bg-hamra-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {c === 'all' ? 'Toutes' : c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-hamra-700 transition-all flex flex-col justify-between">
            <div className="aspect-[4/3] bg-slate-950 relative flex items-center justify-center p-6 text-center overflow-hidden border-b border-slate-800">
              {/* Illustrated Visual Badge */}
              <div className="absolute inset-0 bg-chess-pattern opacity-10"></div>
              <div className="space-y-2 z-10">
                <Camera className="w-8 h-8 text-hamra-400 mx-auto group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white block">{item.title}</span>
                <span className="text-[11px] px-2.5 py-0.5 rounded bg-slate-900 text-hamra-400 border border-slate-800 inline-block">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-1">
              <p className="text-xs text-slate-300 font-medium leading-relaxed">{item.caption}</p>
              <span className="text-[10px] text-slate-500 block">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
