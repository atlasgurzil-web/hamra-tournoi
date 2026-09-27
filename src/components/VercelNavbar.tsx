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
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full max-w-full bg-[#0A0E17]/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo + Club Brand */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white p-1 border-2 border-red-600 flex items-center justify-center shadow-lg shadow-red-600/20 shrink-0 transition-transform group-hover:scale-105">
                <img
                  src="/logo_hamra_annaba.png"
                  alt="Logo Hamra Annaba 1944"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-serif font-black text-base sm:text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors truncate">
                    HAMRA ANNABA
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono font-bold px-1.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/40 shrink-0">
                    1944
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium hidden sm:block truncate">
                  Direction de Tournois & Arbitrage FIDE
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-2 lg:gap-3">
              <Link
                to="/"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive('/')
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-inner'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Tournois</span>
              </Link>

              <Link
                to="/dashboard"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive('/dashboard') && !isActive('/dashboard/joueurs') && !isActive('/dashboard/tournois/nouveau')
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-inner'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-blue-400" />
                <span>Espace Organisateur</span>
              </Link>

              <Link
                to="/dashboard/joueurs"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive('/dashboard/joueurs')
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-inner'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Annuaire Joueurs</span>
              </Link>

              <Link
                to="/dashboard/tournois/nouveau"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold btn-hamra shadow-lg shadow-red-600/30 ml-1"
              >
                <CirclePlus className="w-4 h-4" />
                <span>Nouveau Tournoi</span>
              </Link>
            </nav>

            {/* Mobile Header CTA Button */}
            <div className="flex items-center gap-2 md:hidden">
              <Link
                to="/dashboard/tournois/nouveau"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold btn-hamra shadow-md shadow-red-600/30"
              >
                <CirclePlus className="w-3.5 h-3.5" />
                <span>Créer</span>
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Thumb-Friendly, Zero-Overflow) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0E17]/95 backdrop-blur-xl border-t border-slate-800/90 shadow-2xl safe-area-bottom">
        <div className="grid grid-cols-4 h-16 max-w-md mx-auto px-2">
          
          <Link
            to="/"
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              isActive('/') ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight">Tournois</span>
          </Link>

          <Link
            to="/dashboard"
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              isActive('/dashboard') && !isActive('/dashboard/joueurs') && !isActive('/dashboard/tournois/nouveau')
                ? 'text-red-500 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight">Dashboard</span>
          </Link>

          <Link
            to="/dashboard/joueurs"
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              isActive('/dashboard/joueurs') ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight">Annuaire</span>
          </Link>

          <Link
            to="/dashboard/tournois/nouveau"
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              isActive('/dashboard/tournois/nouveau') ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <CirclePlus className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight">Nouveau</span>
          </Link>

        </div>
      </nav>
    </>
  );
};
