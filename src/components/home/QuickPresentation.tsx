import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, GraduationCap, Trophy, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SectionTitle } from '../common/SectionTitle';

export const QuickPresentation: React.FC = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: ShieldCheck,
      title: t.quickClub.val1Title,
      desc: t.quickClub.val1Desc,
      tag: "Éthique sportive",
      color: "text-[#7E9F80]",
      bg: "bg-[#1A251C]"
    },
    {
      icon: GraduationCap,
      title: t.quickClub.val2Title,
      desc: t.quickClub.val2Desc,
      tag: "Pédagogie active",
      color: "text-[#D97757]",
      bg: "bg-[#281F1A]"
    },
    {
      icon: Trophy,
      title: t.quickClub.val3Title,
      desc: t.quickClub.val3Desc,
      tag: "Compétitions FIDE",
      color: "text-[#D4A373]",
      bg: "bg-[#2A2318]"
    },
  ];

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        badge="Notre Identité"
        title={t.quickClub.title}
        subtitle={t.quickClub.subtitle}
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {values.map((v, i) => {
          const Icon = v.icon;
          return (
            <div
              key={i}
              className="bg-[#1E1D1A] rounded-2xl p-6 sm:p-8 border border-[#2E2C27] hover:border-[#D97757]/60 transition-all hover:shadow-card-dark flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl ${v.bg} border border-[#2E2C27] ${v.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded bg-[#161513] text-[#BDB8AD] border border-[#26241F]">
                    {v.tag}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#F5F2EB] mb-3">
                  {v.title}
                </h3>
                <p className="text-[#BDB8AD] text-xs sm:text-sm leading-relaxed font-sans">
                  {v.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2A2823]">
                <Link
                  to="/club"
                  className="text-xs font-semibold text-[#D97757] hover:text-[#E2896B] flex items-center gap-1 transition-colors"
                >
                  <span>En savoir plus</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
