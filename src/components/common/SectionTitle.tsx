import React from 'react';

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  badge,
  title,
  subtitle,
  align = 'left'
}) => {
  return (
    <div className={`mb-10 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}>
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-hamra-950/80 border border-hamra-800/80 text-hamra-400 text-xs font-bold uppercase tracking-widest mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-hamra-500"></span>
          <span>{badge}</span>
        </div>
      )}
      <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
