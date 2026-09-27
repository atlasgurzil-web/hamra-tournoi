import React from 'react';
import { Trophy, ShieldCheck } from 'lucide-react';

export const VercelFooter: React.FC = () => {
  return (
    <footer className="bg-[#070A10] text-slate-400 border-t border-slate-800 py-12 mt-20 text-center text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & Foundation */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <span className="font-serif font-black text-white text-base tracking-wide">
            HAMRA ANNABA ÉCHECS
          </span>
          <span className="text-amber-400 font-bold">— Fondé en 1944</span>
        </div>

        {/* Center: Certification */}
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Homologation FIDE & exports certifiés Swiss-Manager</span>
        </div>

        {/* Right: Copyright */}
        <p className="text-slate-500 text-xs font-mono">
          © {new Date().getFullYear()} Hamra Annaba. Tous droits réservés.
        </p>

      </div>
    </footer>
  );
};
