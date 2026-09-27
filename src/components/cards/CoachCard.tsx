import React from 'react';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Coach } from '../../types';

export const CoachCard: React.FC<{ coach: Coach }> = ({ coach }) => {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-hamra-700 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-hamra-900 via-slate-800 to-slate-900 border-2 border-hamra-600 flex items-center justify-center text-white font-display font-extrabold text-2xl shadow-lg shrink-0">
            {coach.name.substring(0, 2)}
          </div>
          <div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-hamra-950 text-hamra-400 border border-hamra-800 inline-block mb-1">
              {coach.role}
            </span>
            <h3 className="font-display font-extrabold text-xl text-white">
              {coach.name}
            </h3>
            <p className="text-xs text-slate-400">{coach.experience}</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
          {coach.bio}
        </p>

        <div className="space-y-1.5 mb-4">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Qualifications confirmées :</span>
          {coach.qualifications.map((q, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{q}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800">
        <div className="flex flex-wrap gap-1.5">
          {coach.specialties.map((s, idx) => (
            <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
