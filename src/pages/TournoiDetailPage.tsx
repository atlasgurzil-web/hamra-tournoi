import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Trophy, ShieldCheck, Users, CheckCircle2, ChevronLeft, Award } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { CadenceBadge, StatusBadge } from '../components/common/Badge';
import { RegistrationModal } from '../components/ui/RegistrationModal';
import { tournamentsData } from '../data/tournamentsData';

export const TournoiDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [modalOpen, setModalOpen] = useState(false);

  const tournament = tournamentsData.find((t) => t.slug === slug);

  if (!tournament) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#F5F2EB]">Tournoi introuvable</h2>
        <p className="text-[#9C968B] text-sm">Le tournoi demandé n'existe pas ou a été déplacé.</p>
        <Link to="/tournois" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl btn-claude text-xs font-semibold">
          <ChevronLeft className="w-4 h-4" /> Retour aux tournois
        </Link>
      </div>
    );
  }

  const schemaEvent = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "name": tournament.title,
    "startDate": tournament.startDate,
    "endDate": tournament.endDate,
    "location": {
      "@type": "Place",
      "name": tournament.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Annaba",
        "addressCountry": "DZ"
      }
    },
    "organizer": {
      "@type": "SportsClub",
      "name": "Hamra Annaba – Section Échecs"
    },
    "description": tournament.description
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <SeoHead
        title={tournament.title}
        description={tournament.description}
        schemaData={schemaEvent}
      />

      <Breadcrumbs
        items={[
          { label: "Tournois", path: "/tournois" },
          { label: tournament.title }
        ]}
      />

      {/* Header Info Banner in Claude Warm Obsidian */}
      <div className="bg-[#1C1B18] p-6 sm:p-10 rounded-3xl border border-[#2E2C27] shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D97757]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-wrap items-center gap-2 relative z-10">
          <CadenceBadge cadence={tournament.cadence} />
          <StatusBadge status={tournament.status} />
          <span className="text-xs px-2.5 py-1 rounded bg-[#141413] text-[#BDB8AD] font-mono border border-[#2E2C27]">
            {tournament.system}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl text-[#F5F2EB] leading-tight relative z-10">
          {tournament.title}
        </h1>

        <p className="text-[#BDB8AD] text-sm sm:text-base leading-relaxed max-w-3xl font-sans relative z-10">
          {tournament.description}
        </p>

        {/* Metas row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#2A2823] text-xs relative z-10">
          <div className="space-y-1">
            <span className="text-[#7D786F] uppercase tracking-wider block font-mono">Dates</span>
            <div className="flex items-center gap-1.5 font-bold text-[#F5F2EB]">
              <Calendar className="w-4 h-4 text-[#D97757]" />
              <span>{tournament.startDate}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[#7D786F] uppercase tracking-wider block font-mono">Cadence</span>
            <div className="flex items-center gap-1.5 font-bold text-[#F5F2EB]">
              <Clock className="w-4 h-4 text-[#D97757]" />
              <span>{tournament.timeControl}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[#7D786F] uppercase tracking-wider block font-mono">Frais d'inscription</span>
            <div className="font-bold text-[#D97757] font-mono">
              {tournament.entryFee}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[#7D786F] uppercase tracking-wider block font-mono">Lieu</span>
            <div className="flex items-center gap-1.5 font-medium text-[#BDB8AD] truncate">
              <MapPin className="w-4 h-4 text-[#D97757] shrink-0" />
              <span className="truncate">{tournament.location}</span>
            </div>
          </div>
        </div>

        {tournament.status === 'upcoming' && (
          <div className="pt-2 relative z-10">
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3.5 rounded-xl btn-claude font-semibold text-sm shadow-md active:scale-95"
            >
              S'inscrire à ce Tournoi
            </button>
          </div>
        )}
      </div>

      {/* Rules & Prizes Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Rules */}
        <div className="lg:col-span-7 bg-[#1E1D1A] p-6 sm:p-8 rounded-3xl border border-[#2E2C27] space-y-4">
          <h3 className="font-serif text-2xl text-[#F5F2EB] border-l-2 border-[#D97757] pl-3">
            Règlement Officiel de la Compétition
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#BDB8AD] pt-2 font-sans">
            {tournament.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7E9F80] shrink-0 mt-0.5" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-[#2A2823] text-xs text-[#9C968B] space-y-1.5 font-sans">
            <div><strong className="text-[#F5F2EB]">Arbitre Officiel :</strong> {tournament.arbiter}</div>
            <div><strong className="text-[#F5F2EB]">Organisateur :</strong> {tournament.organizer}</div>
          </div>
        </div>

        {/* Prizes & Grid */}
        <div className="lg:col-span-5 bg-[#1E1D1A] p-6 sm:p-8 rounded-3xl border border-[#2E2C27] space-y-4">
          <h3 className="font-serif text-2xl text-[#F5F2EB] border-l-2 border-[#D4A373] pl-3">
            Grille des Prix & Récompenses
          </h3>

          <div className="space-y-2.5 pt-2">
            {tournament.prizes.map((prize, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#141413] border border-[#26241F] flex items-center gap-3">
                <Trophy className="w-4 h-4 text-[#D4A373] shrink-0" />
                <span className="text-xs font-semibold text-[#F5F2EB]">{prize}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Results if completed */}
      {tournament.results && tournament.results.length > 0 && (
        <div className="bg-[#1E1D1A] p-6 sm:p-8 rounded-3xl border border-[#2E2C27] space-y-4">
          <h3 className="font-serif text-2xl text-[#F5F2EB] border-l-2 border-[#D97757] pl-3">
            Résultats & Grille Finale
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#BDB8AD]">
              <thead className="bg-[#141413] text-[#7D786F] uppercase text-[10px] font-mono">
                <tr>
                  <th className="p-3 rounded-l-lg">Rang</th>
                  <th className="p-3">Joueur</th>
                  <th className="p-3">Club</th>
                  <th className="p-3">Points</th>
                  <th className="p-3 rounded-r-lg">Classement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#26241F]">
                {tournament.results.map((r) => (
                  <tr key={r.rank} className="hover:bg-[#24221E] transition-colors">
                    <td className="p-3 font-mono font-bold text-[#F5F2EB]">
                      {r.rank === 1 ? (
                        <span className="inline-flex items-center gap-1 text-[#D4A373]">
                          <Award className="w-4 h-4 text-[#D4A373]" /> 1er
                        </span>
                      ) : r.rank === 2 ? (
                        <span className="inline-flex items-center gap-1 text-[#BDB8AD]">
                          <Award className="w-4 h-4 text-[#BDB8AD]" /> 2e
                        </span>
                      ) : r.rank === 3 ? (
                        <span className="inline-flex items-center gap-1 text-[#A67C52]">
                          <Award className="w-4 h-4 text-[#A67C52]" /> 3e
                        </span>
                      ) : (
                        `#${r.rank}`
                      )}
                    </td>
                    <td className="p-3 font-semibold text-[#F5F2EB]">{r.name}</td>
                    <td className="p-3 text-[#9C968B]">{r.club}</td>
                    <td className="p-3 font-mono font-bold text-[#D97757]">{r.points} pts</td>
                    <td className="p-3 font-mono text-[#9C968B]">{r.elo ? r.elo : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <RegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        tournament={tournament}
      />
    </div>
  );
};
