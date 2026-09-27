import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Tag } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { SeoHead } from '../components/common/SeoHead';
import { calendarData } from '../data/calendarData';

export const CalendrierPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      <SeoHead
        title="Calendrier Officiel de la Saison"
        description="Consultez le calendrier officiel des tournois, cours et événements de Hamra Annaba pour la saison sportive 2026/2027."
      />

      <Breadcrumbs items={[{ label: "Calendrier" }]} />

      <SectionTitle
        badge="Planning & Événements"
        title="Calendrier Officiel de la Saison"
        subtitle="Retrouvez toutes les dates importantes : tournois, reprise des cours et stages thématiques."
      />

      <div className="space-y-4">
        {calendarData.map((ev) => (
          <div key={ev.id} className="bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-800 hover:border-hamra-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-hamra-950 text-hamra-400 border border-hamra-900">
                  {ev.type}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <CalendarIcon className="w-3.5 h-3.5 text-slate-500" />
                  <strong>{ev.date}</strong>
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-white">
                {ev.title}
              </h3>
              <p className="text-xs text-slate-400">{ev.description}</p>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-300 space-y-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
              <div className="flex items-center sm:justify-end gap-1.5">
                <Clock className="w-3.5 h-3.5 text-hamra-400" />
                <span>{ev.time}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{ev.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
