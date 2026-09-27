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
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#161513]/95 backdrop-blur-xl border-t border-[#26241F] px-2 py-1.5 shadow-2xl safe-area-bottom"
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
                    ? 'text-[#D97757] bg-[#21201C] font-semibold border border-[#D97757]/30 scale-105'
                    : 'text-[#9C968B] hover:text-[#F5F2EB] hover:bg-[#1E1D1A]'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-sans tracking-tight truncate max-w-full">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
