import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ChevronRight, User } from 'lucide-react';
import { NewsArticle } from '../../types';

export const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => {
  return (
    <article className="bg-slate-900 rounded-2xl p-5 border border-slate-800 hover:border-hamra-700/80 transition-all hover:shadow-card-dark flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
          <span className="px-2.5 py-0.5 rounded bg-hamra-950 text-hamra-400 font-bold border border-hamra-900">
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            {article.date}
          </span>
        </div>

        <Link to={`/actualites/${article.slug}`}>
          <h3 className="font-display font-bold text-lg text-white hover:text-hamra-400 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>
        </Link>

        <p className="mt-2.5 text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
          {article.summary}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 flex items-center gap-1">
          <User className="w-3 h-3" />
          {article.author}
        </span>

        <Link
          to={`/actualites/${article.slug}`}
          className="text-xs font-semibold text-hamra-400 hover:text-hamra-300 flex items-center gap-1"
        >
          <span>Lire la suite</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
