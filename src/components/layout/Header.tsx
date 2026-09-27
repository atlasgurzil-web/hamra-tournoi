import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Trophy, ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  onOpenRegisterModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenRegisterModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
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
    <header className="sticky top-0 z-50 bg-[#161513]/95 backdrop-blur-xl border-b border-[#2A2823] transition-all">
      {/* Top Banner Club Info - Claude Warm Editorial Strip */}
      <div className="bg-[#1B1A17] py-1.5 px-4 text-xs font-medium text-[#BDB8AD] border-b border-[#26241F]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D97757] animate-pulse"></span>
            <span className="font-semibold text-[#F5F2EB] tracking-wide font-sans">
              {lang === 'fr' ? 'Hamra Annaba — Section Échecs 1944' : 'نادي حمراء عنابة – فرع الشطرنج'}
            </span>
            <span className="text-[#7D786F] hidden sm:inline">• {lang === 'fr' ? 'Homologation FIDE & FADE' : 'عنابة، الجزائر'}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#21201C] hover:bg-[#2A2823] text-[#BDB8AD] hover:text-[#F5F2EB] transition-all text-xs border border-[#2E2C27]"
              title="Changer de langue / تغيير اللغة"
            >
              <Globe className="w-3 h-3 text-[#D97757]" />
              <span className="font-medium">{lang === 'fr' ? 'العربية' : 'Français'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo + Club Brand in Claude Editorial Style */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden bg-white p-1 shadow-md border-2 border-[#D97757] transition-transform group-hover:scale-105">
              <img
                src="/logo_hamra_annaba.png"
                alt="Logo Hamra Annaba Échecs"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg sm:text-2xl text-[#F5F2EB] tracking-tight group-hover:text-[#D97757] transition-colors">
                  Hamra Annaba
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D97757]/15 text-[#E2896B] border border-[#D97757]/30 tracking-wider">
                  1944
                </span>
              </div>
              <span className="text-[11px] text-[#9C968B] font-medium tracking-wide">
                Section Échecs & Arbitrage
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navLinks.slice(0, 8).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-[#24221E] text-[#E2896B] font-semibold border border-[#3D3A33] shadow-sm'
                    : 'text-[#BDB8AD] hover:text-[#F5F2EB] hover:bg-[#1E1D1A]'
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
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl btn-claude font-semibold text-sm transition-all active:scale-95"
            >
              <Trophy className="w-4 h-4 text-[#FAF7F2]" />
              <span>{t.nav.joinBtn}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden touch-target p-2 rounded-xl bg-[#21201C] text-[#BDB8AD] hover:text-[#F5F2EB] hover:bg-[#2A2823] border border-[#2E2C27] focus:outline-none focus:ring-2 focus:ring-[#D97757]"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#D97757]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#181816]/98 border-b border-[#2E2C27] px-4 pt-3 pb-6 space-y-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#2E2C27]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-[#D97757] text-white font-bold shadow-md'
                    : 'bg-[#21201C] text-[#BDB8AD] hover:bg-[#2A2823] hover:text-white border border-[#2E2C27]'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegisterModal();
              }}
              className="w-full py-3 rounded-xl btn-claude font-bold text-sm text-center flex items-center justify-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              <span>{t.nav.joinBtn}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
