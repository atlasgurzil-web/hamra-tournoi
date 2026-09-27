import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Trophy, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  onOpenRegisterModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenRegisterModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t, isRtl } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/club', label: t.nav.club },
    { path: '/ecole', label: t.nav.school },
    { path: '/tournois', label: t.nav.tournaments },
    { path: '/joueurs', label: t.nav.players },
    { path: '/entraineurs', label: t.nav.coaches },
    { path: '/resultats', label: t.nav.results },
    { path: '/calendrier', label: t.nav.calendar },
    { path: '/actualites', label: t.nav.news },
    { path: '/galerie', label: t.nav.gallery },
    { path: '/contact', label: t.nav.contact },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 transition-all">
      {/* Top Banner Club Info */}
      <div className="bg-gradient-to-r from-hamra-950 via-hamra-900 to-slate-950 py-1 px-4 text-xs font-medium text-slate-300 border-b border-hamra-900/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-hamra-500 animate-pulse"></span>
            <span className="font-semibold text-white tracking-wide">
              {lang === 'fr' ? 'Hamra Annaba – Section Échecs' : 'نادي حمراء عنابة – فرع الشطرنج'}
            </span>
            <span className="text-slate-400 hidden sm:inline">• {lang === 'fr' ? 'Annaba, Algérie' : 'عنابة، الجزائر'}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800/80 hover:bg-hamra-700 text-slate-200 hover:text-white transition-all text-xs border border-slate-700"
              title="Changer de langue / تغيير اللغة"
            >
              <Globe className="w-3 h-3 text-hamra-400" />
              <span className="font-bold">{lang === 'fr' ? 'العربية' : 'Français'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo + Club Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-white p-1 shadow-md border-2 border-hamra-600 transition-transform group-hover:scale-105">
              <img
                src="/logo_hamra_annaba.png"
                alt="Logo Hamra Annaba Échecs"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-wider text-white uppercase group-hover:text-hamra-400 transition-colors">
                Hamra Annaba
              </span>
              <span className="text-xs text-hamra-400 font-semibold tracking-widest uppercase flex items-center gap-1">
                <span>Section Échecs</span>
                <span className="text-slate-500 font-normal">| {lang === 'fr' ? 'شطرنج' : 'Chess'}</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.slice(0, 8).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-hamra-600/20 text-hamra-400 font-semibold border-b-2 border-hamra-500'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions CTA + Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenRegisterModal}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-hamra-600 to-hamra-700 hover:from-hamra-500 hover:to-hamra-600 text-white font-semibold text-sm shadow-club hover:shadow-lg transition-all active:scale-95 border border-hamra-500/30"
            >
              <Trophy className="w-4 h-4" />
              <span>{t.nav.joinBtn}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden touch-target p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-hamra-500"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-hamra-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-hamra-600 text-white font-bold shadow-md'
                    : 'bg-slate-800/70 text-slate-200 hover:bg-slate-700/80 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </Link>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegisterModal();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-hamra-600 to-hamra-700 text-white font-bold text-base shadow-club text-center flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              <span>{t.nav.joinBtn}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
