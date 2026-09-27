import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Trophy, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { clubData } from '../../data/clubData';

export const Footer: React.FC = () => {
  const { t, lang } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm mt-16 relative overflow-hidden">
      {/* Decorative Top Line in Hamra Red */}
      <div className="h-1 bg-gradient-to-r from-hamra-800 via-hamra-600 to-slate-900"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Club Identity & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-1 border-2 border-hamra-600 shadow-md">
                <img
                  src="/logo_hamra_annaba.png"
                  alt="Logo Hamra Annaba"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg text-white uppercase tracking-wider">
                  Hamra Annaba
                </h3>
                <p className="text-xs text-hamra-400 font-semibold tracking-wider uppercase">
                  Section Échecs • Annaba
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {t.footer.aboutText}
            </p>
            <div className="pt-2 text-xs font-semibold text-slate-300">
              <span className="inline-block px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-hamra-400 mr-2">
                Fondé en 1944
              </span>
              <span>Couleurs : Rouge & Blanc</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-display font-bold text-white text-base mb-4 tracking-wide uppercase border-l-2 border-hamra-600 pl-2">
              {t.footer.links}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/club" className="hover:text-hamra-400 transition-colors flex items-center gap-1.5">
                  <span>›</span> {t.nav.club}
                </Link>
              </li>
              <li>
                <Link to="/ecole" className="hover:text-hamra-400 transition-colors flex items-center gap-1.5">
                  <span>›</span> {t.nav.school}
                </Link>
              </li>
              <li>
                <Link to="/tournois" className="hover:text-hamra-400 transition-colors flex items-center gap-1.5">
                  <span>›</span> {t.nav.tournaments}
                </Link>
              </li>
              <li>
                <Link to="/joueurs" className="hover:text-hamra-400 transition-colors flex items-center gap-1.5">
                  <span>›</span> {t.nav.players}
                </Link>
              </li>
              <li>
                <Link to="/resultats" className="hover:text-hamra-400 transition-colors flex items-center gap-1.5">
                  <span>›</span> {t.nav.results}
                </Link>
              </li>
              <li>
                <Link to="/calendrier" className="hover:text-hamra-400 transition-colors flex items-center gap-1.5">
                  <span>›</span> {t.nav.calendar}
                </Link>
              </li>
              <li>
                <Link to="/actualites" className="hover:text-hamra-400 transition-colors flex items-center gap-1.5">
                  <span>›</span> {t.nav.news}
                </Link>
              </li>
              <li>
                <Link to="/galerie" className="hover:text-hamra-400 transition-colors flex items-center gap-1.5">
                  <span>›</span> {t.nav.gallery}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Federation & Affiliations */}
          <div>
            <h4 className="font-display font-bold text-white text-base mb-4 tracking-wide uppercase border-l-2 border-hamra-600 pl-2">
              {t.footer.federation}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-white font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4 text-hamra-400" />
                  <span>Fédération Algérienne (FADE)</span>
                </div>
                <p className="text-slate-400">
                  Affiliation officielle pour l'homologation des tournois et classements nationaux/FIDE.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-white font-semibold mb-1">
                  <Trophy className="w-4 h-4 text-trophy-gold" />
                  <span>Ligue des Échecs d'Annaba</span>
                </div>
                <p className="text-slate-400">
                  Participation aux championnats régionaux et coupes de wilaya.
                </p>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Localisation */}
          <div>
            <h4 className="font-display font-bold text-white text-base mb-4 tracking-wide uppercase border-l-2 border-hamra-600 pl-2">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-hamra-400 shrink-0 mt-0.5" />
                <span>{clubData.address}, {clubData.city}, {clubData.country}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-hamra-400 shrink-0" />
                <span>{clubData.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-hamra-400 shrink-0" />
                <span>{clubData.email}</span>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-semibold text-hamra-400 hover:text-hamra-300 transition-colors"
              >
                <span>Voir le plan d'accès complet</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} {clubData.fullName}. {t.footer.rights}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-hamra-900 text-slate-300 hover:text-white transition-all text-xs border border-slate-800"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
