import React from 'react';
import { Trophy, ShieldCheck } from 'lucide-react';

export const VercelFooter: React.FC = () => {
  return (
    <footer className="w-full max-w-full bg-[#070A10] text-slate-400 border-t border-slate-800 py-8 pb-24 md:pb-10 mt-16 sm:mt-20 text-center text-xs sm:text-sm overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        
        {/* Left: Brand & Foundation */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center shrink-0">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
          </div>
          <span className="font-serif font-black text-white text-sm sm:text-base tracking-wide">
            HAMRA ANNABA ÉCHECS
          </span>
          <span className="text-amber-400 font-bold text-xs sm:text-sm">— Fondé en 1944</span>
        </div>

        {/* Center: Certification */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300 font-medium text-xs sm:text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Homologation FIDE & exports certifiés Swiss-Manager</span>
        </div>

        {/* Right: Copyright */}
        <p className="text-slate-500 text-[11px] sm:text-xs font-mono">
          © {new Date().getFullYear()} Hamra Annaba. Tous droits réservés.
        </p>

      </div>
    </footer>
  );
};
