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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#21201C] border border-[#D97757]/30 text-[#E2896B] text-xs font-medium font-mono uppercase tracking-widest mb-3.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
          <span>{badge}</span>
        </div>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F2EB] tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[#BDB8AD] text-sm sm:text-base leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
};
