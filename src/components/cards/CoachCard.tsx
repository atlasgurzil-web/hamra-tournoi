import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Coach } from '../../types';

export const CoachCard: React.FC<{ coach: Coach }> = ({ coach }) => {
  return (
    <div className="bg-[#1E1D1A] rounded-2xl p-6 border border-[#2E2C27] hover:border-[#D97757]/60 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-[#26241F] border border-[#D97757]/50 flex items-center justify-center text-[#F5F2EB] font-serif text-2xl shadow-md shrink-0">
            {coach.name.substring(0, 2)}
          </div>
          <div>
            <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-[#24221E] text-[#E2896B] border border-[#D97757]/30 inline-block mb-1">
              {coach.role}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#F5F2EB]">
              {coach.name}
            </h3>
            <p className="text-xs text-[#9C968B] font-sans">{coach.experience}</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#BDB8AD] mb-4 leading-relaxed font-sans">
          {coach.bio}
        </p>

        <div className="space-y-1.5 mb-4">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7D786F] block">Qualifications certifiées :</span>
          {coach.qualifications.map((q, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-[#BDB8AD]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#7E9F80] shrink-0 mt-0.5" />
              <span>{q}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-[#2A2823]">
        <div className="flex flex-wrap gap-1.5">
          {coach.specialties.map((s, idx) => (
            <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#161513] text-[#BDB8AD] border border-[#26241F]">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
