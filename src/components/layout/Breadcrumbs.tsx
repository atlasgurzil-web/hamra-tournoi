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
    <nav className="flex items-center text-xs text-slate-400 py-3 mb-6 overflow-x-auto" aria-label="Fil d'ariane">
      <ol className="flex items-center gap-1.5 whitespace-nowrap">
        <li>
          <Link to="/" className="hover:text-hamra-400 transition-colors flex items-center gap-1 text-slate-300">
            <Home className="w-3.5 h-3.5" />
            <span>{t.nav.home}</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
            {item.path ? (
              <Link to={item.path} className="hover:text-hamra-400 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-hamra-400 font-semibold truncate max-w-xs sm:max-w-md">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
