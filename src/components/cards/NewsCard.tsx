import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, User } from 'lucide-react';
import { NewsArticle } from '../../types';

export const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => {
  return (
    <article className="bg-[#1E1D1A] rounded-2xl p-5 sm:p-6 border border-[#2E2C27] hover:border-[#D97757]/60 transition-all hover:shadow-card-dark flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between text-xs text-[#9C968B] mb-3">
          <span className="px-2.5 py-0.5 rounded bg-[#24221E] text-[#E2896B] font-mono text-[11px] font-semibold border border-[#D97757]/30">
            {article.category}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#7D786F]">
            <Calendar className="w-3.5 h-3.5 text-[#D97757]" />
            {article.date}
          </span>
        </div>

        <Link to={`/actualites/${article.slug}`}>
          <h3 className="font-serif text-xl sm:text-2xl text-[#F5F2EB] hover:text-[#D97757] transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>
        </Link>

        <p className="mt-2.5 text-xs sm:text-sm text-[#BDB8AD] line-clamp-3 leading-relaxed font-sans">
          {article.summary}
        </p>
      </div>

      <div className="mt-5 pt-3.5 border-t border-[#2A2823] flex items-center justify-between">
        <span className="text-[11px] text-[#7D786F] flex items-center gap-1.5 font-sans">
          <User className="w-3 h-3 text-[#9C968B]" />
          {article.author}
        </span>

        <Link
          to={`/actualites/${article.slug}`}
          className="text-xs font-semibold text-[#D97757] hover:text-[#E2896B] flex items-center gap-1 transition-colors"
        >
          <span>Lire l'article</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
