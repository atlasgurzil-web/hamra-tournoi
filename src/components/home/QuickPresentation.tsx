import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, GraduationCap, Trophy, Users, Target, BookOpen, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SectionTitle } from '../common/SectionTitle';

export const QuickPresentation: React.FC = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: ShieldCheck,
      title: t.quickClub.val1Title,
      desc: t.quickClub.val1Desc,
      tag: "Éthique sportive"
    },
    {
      icon: GraduationCap,
      title: t.quickClub.val2Title,
      desc: t.quickClub.val2Desc,
      tag: "Pédagogie active"
    },
    {
      icon: Trophy,
      title: t.quickClub.val3Title,
      desc: t.quickClub.val3Desc,
      tag: "Compétitions FIDE"
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
              className="bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-hamra-600/80 transition-all hover:shadow-card-dark flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-hamra-950 border border-hamra-800 text-hamra-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                    {v.tag}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-xl text-white mb-3">
                  {v.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <Link
                  to="/club"
                  className="text-xs font-bold text-hamra-400 group-hover:text-hamra-300 flex items-center gap-1 transition-colors"
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
