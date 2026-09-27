import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, LayoutDashboard, ShieldCheck, CirclePlus } from 'lucide-react';

export const VercelNavbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#161513]/95 backdrop-blur-xl border-b border-[#2A2823] shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo + Club Brand */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-full bg-white p-1 border-2 border-[#D97757] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
              <img
                src="/logo_hamra_annaba.png"
                alt="Logo Hamra Annaba 1944"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg sm:text-2xl tracking-tight text-[#F5F2EB] group-hover:text-[#D97757] transition-colors">
                  HAMRA ANNABA
                </span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#D97757]/15 text-[#E2896B] border border-[#D97757]/40">
                  ÉCHECS 1944
                </span>
              </div>
              <p className="text-xs text-[#9C968B] font-medium hidden sm:block font-sans">
                Direction de Tournois & Arbitrage FIDE
              </p>
            </div>
          </Link>

          {/* Nav Navigation Links */}
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive('/')
                  ? 'bg-[#21201C] text-[#E2896B] border border-[#D97757]/30 shadow-sm'
                  : 'text-[#BDB8AD] hover:text-[#F5F2EB] hover:bg-[#1B1A17]'
              }`}
            >
              <Trophy className="w-4 h-4 text-[#D4A373]" />
              <span className="hidden sm:inline">Tournois</span>
            </Link>

            <Link
              to="/dashboard"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive('/dashboard') && !isActive('/dashboard/joueurs') && !isActive('/dashboard/tournois/nouveau')
                  ? 'bg-[#21201C] text-[#E2896B] border border-[#D97757]/30 shadow-sm'
                  : 'text-[#BDB8AD] hover:text-[#F5F2EB] hover:bg-[#1B1A17]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#60A5FA]" />
              <span className="hidden md:inline">Espace Organisateur</span>
            </Link>

            <Link
              to="/dashboard/joueurs"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive('/dashboard/joueurs')
                  ? 'bg-[#21201C] text-[#E2896B] border border-[#D97757]/30 shadow-sm'
                  : 'text-[#BDB8AD] hover:text-[#F5F2EB] hover:bg-[#1B1A17]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#7E9F80]" />
              <span className="hidden md:inline">Annuaire</span>
            </Link>

            <Link
              to="/dashboard/tournois/nouveau"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold btn-claude hover:scale-105 transition-all ml-1 shadow-md"
            >
              <CirclePlus className="w-4 h-4" />
              <span>Nouveau Tournoi</span>
            </Link>
          </nav>

        </div>
      </div>
    </header>
  );
};
