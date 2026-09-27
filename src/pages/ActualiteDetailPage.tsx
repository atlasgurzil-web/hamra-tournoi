import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, ChevronLeft, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { newsData } from '../data/newsData';

export const ActualiteDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = newsData.find((n) => n.slug === slug);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-display font-extrabold text-2xl text-white">Article introuvable</h2>
        <Link to="/actualites" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-hamra-600 text-white text-xs font-bold">
          <ChevronLeft className="w-4 h-4" /> Retour aux actualités
        </Link>
      </div>
    );
  }

  const schemaArticle = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "datePublished": article.date,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "description": article.summary
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      <SeoHead
        title={article.title}
        description={article.summary}
        schemaData={schemaArticle}
      />

      <Breadcrumbs
        items={[
          { label: "Actualités", path: "/actualites" },
          { label: article.title }
        ]}
      />

      <article className="bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="px-3 py-1 rounded bg-hamra-950 text-hamra-400 font-bold border border-hamra-900">
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-slate-500" />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-4 h-4 text-slate-500" />
            {article.author}
          </span>
        </div>

        <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white leading-tight">
          {article.title}
        </h1>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-300 text-sm italic leading-relaxed">
          {article.summary}
        </div>

        <div className="prose prose-invert prose-slate max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
          {article.content}
        </div>

        {article.tags.length > 0 && (
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-slate-500" />
            {article.tags.map((tag, idx) => (
              <span key={idx} className="text-xs px-2.5 py-1 rounded bg-slate-950 text-slate-400 border border-slate-800">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
};
