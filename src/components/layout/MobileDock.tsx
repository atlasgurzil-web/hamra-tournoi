import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Trophy, GraduationCap, Users, PhoneCall } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const MobileDock: React.FC = () => {
  const { t } = useLanguage();

  const dockItems = [
    { to: '/', label: t.dock.home, icon: Home },
    { to: '/tournois', label: t.dock.tournaments, icon: Trophy },
    { to: '/ecole', label: t.dock.school, icon: GraduationCap },
    { to: '/joueurs', label: t.dock.players, icon: Users },
    { to: '/contact', label: t.dock.contact, icon: PhoneCall },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 shadow-2xl safe-area-bottom"
      aria-label="Navigation mobile principale"
    >
      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
        {dockItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
                  isActive
                    ? 'text-hamra-400 bg-hamra-950/60 font-bold scale-105'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight truncate max-w-full">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
