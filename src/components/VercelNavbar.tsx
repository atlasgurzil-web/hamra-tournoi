import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, LayoutDashboard, ShieldCheck, CirclePlus, Crown } from 'lucide-react';

export const VercelNavbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A0E17]/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Logo + Club Brand */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-1.5 border-2 border-red-600 flex items-center justify-center shadow-lg shadow-red-600/20 transition-transform group-hover:scale-105">
              <img
                src="/logo_hamra_annaba.png"
                alt="Logo Hamra Annaba 1944"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-serif font-black text-xl sm:text-2xl tracking-wide text-white group-hover:text-amber-400 transition-colors">
                  HAMRA ANNABA
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/40">
                  1944
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-medium hidden sm:block">
                Direction de Tournois & Arbitrage FIDE
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isActive('/')
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Tournois</span>
            </Link>

            <Link
              to="/dashboard"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isActive('/dashboard') && !isActive('/dashboard/joueurs') && !isActive('/dashboard/tournois/nouveau')
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-850'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
              <span className="hidden md:inline">Espace Organisateur</span>
            </Link>

            <Link
              to="/dashboard/joueurs"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isActive('/dashboard/joueurs')
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-850'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline">Annuaire Joueurs</span>
            </Link>

            <Link
              to="/dashboard/tournois/nouveau"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold btn-hamra shadow-lg shadow-red-600/30 ml-2"
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
