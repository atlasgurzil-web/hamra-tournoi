import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ChevronRight, Shield, Award, Sparkles, GraduationCap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { clubData } from '../../data/clubData';

export const Hero: React.FC<{ onOpenRegisterModal: () => void }> = ({ onOpenRegisterModal }) => {
  const { t, lang } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-hero-gradient pt-8 sm:pt-14 pb-12 sm:pb-20 border-b border-slate-800">
      {/* Background Decorative Chessboard Elements */}
      <div className="absolute inset-0 bg-chess-pattern opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle & Action CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5 sm:space-y-6">
            
            {/* Club Official Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-hamra-700/80 shadow-md backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-hamra-500 animate-ping"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-hamra-400">
                {t.hero.badge}
              </span>
            </div>

            {/* Main Punchy Heading */}
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              <span>{t.hero.title}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {t.hero.subtitle}
            </p>

            {/* CTAs Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <Link
                to="/ecole"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-hamra-600 via-hamra-500 to-hamra-600 hover:from-hamra-500 hover:to-hamra-400 text-white font-bold text-base shadow-club hover:shadow-xl transition-all active:scale-95 border border-hamra-400/30"
              >
                <GraduationCap className="w-5 h-5" />
                <span>{t.hero.ctaPrimary}</span>
              </Link>

              <Link
                to="/tournois"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-base border border-slate-700 transition-all active:scale-95 shadow-sm"
              >
                <Trophy className="w-5 h-5 text-trophy-gold" />
                <span>{t.hero.ctaSecondary}</span>
              </Link>
            </div>

            {/* Verified Credibility Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Affilié FADE & Ligue Annaba</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-trophy-gold" />
                <span>Encadrement Fédéral Certifié</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Interactive Chess Display */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer Glow Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-hamra-600 to-hamra-900 rounded-3xl blur-xl opacity-40"></div>

              {/* Main Visual Card */}
              <div className="relative bg-slate-900/95 rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
                
                {/* Logo & Section Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-white p-1.5 shadow-lg border-2 border-hamra-600">
                      <img
                        src="/logo_hamra_annaba.png"
                        alt="Logo Hamra Annaba"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-lg text-white">
                        HAMRA ANNABA
                      </h3>
                      <p className="text-xs text-hamra-400 font-semibold tracking-wider">
                        SECTION ÉCHECS
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-hamra-950 text-hamra-400 border border-hamra-800">
                    Officiel
                  </span>
                </div>

                {/* Hero Key Stats Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-950/90 rounded-xl p-3.5 border border-slate-800 text-center">
                    <span className="font-display font-extrabold text-2xl text-white block">
                      {clubData.stats.membersCount}+
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium leading-tight">
                      {t.hero.stats.members}
                    </span>
                  </div>

                  <div className="bg-slate-950/90 rounded-xl p-3.5 border border-slate-800 text-center">
                    <span className="font-display font-extrabold text-2xl text-trophy-gold block">
                      {clubData.stats.titlesWon}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium leading-tight">
                      {t.hero.stats.trophies}
                    </span>
                  </div>

                  <div className="bg-slate-950/90 rounded-xl p-3.5 border border-slate-800 text-center">
                    <span className="font-display font-extrabold text-2xl text-hamra-400 block">
                      {clubData.stats.tournamentsHosted}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium leading-tight">
                      {t.hero.stats.tournaments}
                    </span>
                  </div>

                  <div className="bg-slate-950/90 rounded-xl p-3.5 border border-slate-800 text-center">
                    <span className="font-display font-extrabold text-2xl text-white block">
                      {clubData.stats.fideLicensedPlayers}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium leading-tight">
                      {t.hero.stats.fide}
                    </span>
                  </div>
                </div>

                {/* Quick Action Prompt in Card */}
                <div className="pt-2">
                  <button
                    onClick={onOpenRegisterModal}
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-hamra-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-700 hover:border-hamra-500 shadow-sm"
                  >
                    <span>Rejoindre la Section Échecs pour 2026/2027</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
