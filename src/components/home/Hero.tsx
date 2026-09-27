import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ChevronRight, ShieldCheck, Award, Sparkles, GraduationCap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { clubData } from '../../data/clubData';

export const Hero: React.FC<{ onOpenRegisterModal: () => void }> = ({ onOpenRegisterModal }) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-claude-glow pt-10 sm:pt-16 pb-14 sm:pb-24 border-b border-[#2A2823]">
      {/* Background Subtle Chessboard Pattern */}
      <div className="absolute inset-0 bg-chess-pattern opacity-60 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading, Subtitle & Action CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Club Official Badge - Claude Terracotta Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#21201C] border border-[#D97757]/30 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#D97757] animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#E2896B] font-mono">
                {t.hero.badge}
              </span>
            </div>

            {/* Main Editorial Heading - Signature Claude Instrument Serif */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5F2EB] tracking-tight leading-[1.12]">
              <span>{t.hero.title}</span>
            </h1>

            {/* Subtitle with Warm Typography */}
            <p className="text-[#BDB8AD] text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {t.hero.subtitle}
            </p>

            {/* CTAs Action Buttons - Claude Tactile System */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/ecole"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl btn-claude font-semibold text-sm sm:text-base active:scale-95"
              >
                <GraduationCap className="w-5 h-5 text-white" />
                <span>{t.hero.ctaPrimary}</span>
              </Link>

              <Link
                to="/tournois"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl btn-obsidian font-semibold text-sm sm:text-base active:scale-95 shadow-sm"
              >
                <Trophy className="w-5 h-5 text-[#D4A373]" />
                <span>{t.hero.ctaSecondary}</span>
              </Link>
            </div>

            {/* Verified Credibility Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-8 text-xs text-[#9C968B]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7E9F80]" />
                <span>Affilié FADE & Ligue Annaba</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D4A373]" />
                <span>Encadrement Fédéral Certifié</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Interactive Chess Display */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer Warm Terracotta Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D97757]/20 to-[#9E492B]/10 rounded-3xl blur-2xl opacity-60"></div>

              {/* Main Visual Card - Claude Warm Obsidian Panel */}
              <div className="relative bg-[#1A1917] rounded-3xl p-6 sm:p-7 border border-[#2E2C27] shadow-2xl backdrop-blur-xl space-y-6">
                
                {/* Logo & Section Tag */}
                <div className="flex items-center justify-between pb-4 border-b border-[#2A2823]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-13 h-13 rounded-2xl bg-white p-1.5 shadow-md border border-[#D97757]/50">
                      <img
                        src="/logo_hamra_annaba.png"
                        alt="Logo Hamra Annaba"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-[#F5F2EB] tracking-tight">
                        Hamra Annaba
                      </h3>
                      <p className="text-xs text-[#E2896B] font-mono tracking-wider">
                        SECTION ÉCHECS • 1944
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#24221E] text-[#D97757] border border-[#D97757]/30 font-mono">
                    Officiel
                  </span>
                </div>

                {/* Hero Key Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#141413] rounded-xl p-4 border border-[#26241F] text-center">
                    <span className="font-serif text-3xl text-[#F5F2EB] block">
                      {clubData.stats.membersCount}+
                    </span>
                    <span className="text-[11px] text-[#9C968B] font-medium leading-tight mt-1 block">
                      {t.hero.stats.members}
                    </span>
                  </div>

                  <div className="bg-[#141413] rounded-xl p-4 border border-[#26241F] text-center">
                    <span className="font-serif text-3xl text-[#D4A373] block">
                      {clubData.stats.titlesWon}
                    </span>
                    <span className="text-[11px] text-[#9C968B] font-medium leading-tight mt-1 block">
                      {t.hero.stats.trophies}
                    </span>
                  </div>

                  <div className="bg-[#141413] rounded-xl p-4 border border-[#26241F] text-center">
                    <span className="font-serif text-3xl text-[#E2896B] block">
                      {clubData.stats.tournamentsHosted}
                    </span>
                    <span className="text-[11px] text-[#9C968B] font-medium leading-tight mt-1 block">
                      {t.hero.stats.tournaments}
                    </span>
                  </div>

                  <div className="bg-[#141413] rounded-xl p-4 border border-[#26241F] text-center">
                    <span className="font-serif text-3xl text-[#F5F2EB] block">
                      {clubData.stats.fideLicensedPlayers}
                    </span>
                    <span className="text-[11px] text-[#9C968B] font-medium leading-tight mt-1 block">
                      {t.hero.stats.fide}
                    </span>
                  </div>
                </div>

                {/* Quick Action Prompt in Card */}
                <div className="pt-2">
                  <button
                    onClick={onOpenRegisterModal}
                    className="w-full py-3 rounded-xl bg-[#21201C] hover:bg-[#D97757] text-[#F5F2EB] hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 border border-[#2E2C27] hover:border-[#D97757] shadow-sm"
                  >
                    <span>Rejoindre la Section Échecs pour 2026/2027</span>
                    <ChevronRight className="w-4 h-4 text-[#D97757] group-hover:text-white" />
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
