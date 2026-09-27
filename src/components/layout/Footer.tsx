import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Trophy, ShieldCheck, ArrowUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { clubData } from '../../data/clubData';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111110] border-t border-[#26241F] text-[#BDB8AD] text-sm mt-20 relative overflow-hidden">
      {/* Decorative Top Line in Claude Terracotta */}
      <div className="h-0.5 bg-gradient-to-r from-[#D97757]/60 via-[#D97757] to-[#141413]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Club Identity & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-1 border-2 border-[#D97757] shadow-sm">
                <img
                  src="/logo_hamra_annaba.png"
                  alt="Logo Hamra Annaba"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[#F5F2EB] tracking-tight">
                  Hamra Annaba
                </h3>
                <p className="text-xs text-[#E2896B] font-mono tracking-wider">
                  SECTION ÉCHECS • 1944
                </p>
              </div>
            </div>
            <p className="text-[#9C968B] text-xs leading-relaxed font-sans">
              {t.footer.aboutText}
            </p>
            <div className="pt-1 text-xs font-mono text-[#BDB8AD]">
              <span className="inline-block px-2.5 py-1 rounded bg-[#1B1A17] border border-[#2E2C27] text-[#D4A373] mr-2">
                Fondé en 1944
              </span>
              <span>Annaba, Algérie</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-serif text-lg text-[#F5F2EB] mb-4 tracking-tight border-l-2 border-[#D97757] pl-2.5">
              {t.footer.links}
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <Link to="/club" className="hover:text-[#D97757] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D97757]">›</span> {t.nav.club}
                </Link>
              </li>
              <li>
                <Link to="/ecole" className="hover:text-[#D97757] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D97757]">›</span> {t.nav.school}
                </Link>
              </li>
              <li>
                <Link to="/tournois" className="hover:text-[#D97757] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D97757]">›</span> {t.nav.tournaments}
                </Link>
              </li>
              <li>
                <Link to="/joueurs" className="hover:text-[#D97757] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D97757]">›</span> {t.nav.players}
                </Link>
              </li>
              <li>
                <Link to="/resultats" className="hover:text-[#D97757] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D97757]">›</span> {t.nav.results}
                </Link>
              </li>
              <li>
                <Link to="/calendrier" className="hover:text-[#D97757] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D97757]">›</span> {t.nav.calendar}
                </Link>
              </li>
              <li>
                <Link to="/actualites" className="hover:text-[#D97757] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D97757]">›</span> {t.nav.news}
                </Link>
              </li>
              <li>
                <Link to="/galerie" className="hover:text-[#D97757] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D97757]">›</span> {t.nav.gallery}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Federation & Affiliations */}
          <div>
            <h4 className="font-serif text-lg text-[#F5F2EB] mb-4 tracking-tight border-l-2 border-[#D97757] pl-2.5">
              {t.footer.federation}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#181816] border border-[#26241F]">
                <div className="flex items-center gap-2 text-[#F5F2EB] font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#7E9F80]" />
                  <span>Fédération Algérienne (FADE)</span>
                </div>
                <p className="text-[#9C968B] leading-relaxed font-sans">
                  Homologation officielle des tournois et classements nationaux et FIDE.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#181816] border border-[#26241F]">
                <div className="flex items-center gap-2 text-[#F5F2EB] font-semibold mb-1">
                  <Trophy className="w-4 h-4 text-[#D4A373]" />
                  <span>Ligue des Échecs d'Annaba</span>
                </div>
                <p className="text-[#9C968B] leading-relaxed font-sans">
                  Participation aux championnats régionaux et coupes de wilaya.
                </p>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Localisation */}
          <div>
            <h4 className="font-serif text-lg text-[#F5F2EB] mb-4 tracking-tight border-l-2 border-[#D97757] pl-2.5">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-3 text-xs font-sans">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D97757] shrink-0 mt-0.5" />
                <span>{clubData.address}, {clubData.city}, {clubData.country}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D97757] shrink-0" />
                <span>{clubData.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D97757] shrink-0" />
                <span>{clubData.email}</span>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-[#26241F]">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-medium text-[#D97757] hover:text-[#E2896B] transition-colors"
              >
                <span>Voir le plan d'accès complet</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 border-t border-[#1F1E1B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="text-[#7D786F] text-center sm:text-left">
            © {new Date().getFullYear()} {clubData.fullName}. {t.footer.rights}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg btn-obsidian text-xs"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#D97757]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
