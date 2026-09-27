import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  const { t } = useLanguage();

  return (
    <nav className="flex items-center text-xs text-[#9C968B] py-3 mb-6 overflow-x-auto" aria-label="Fil d'ariane">
      <ol className="flex items-center gap-1.5 whitespace-nowrap font-sans">
        <li>
          <Link to="/" className="hover:text-[#D97757] transition-colors flex items-center gap-1.5 text-[#BDB8AD]">
            <Home className="w-3.5 h-3.5 text-[#D97757]" />
            <span>{t.nav.home}</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-[#7D786F] shrink-0" />
            {item.path ? (
              <Link to={item.path} className="hover:text-[#D97757] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#E2896B] font-medium truncate max-w-xs sm:max-w-md font-mono">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
