import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Trophy, ShieldCheck, Users, CheckCircle2, ChevronLeft, ArrowRight } from 'lucide-react';
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
        <h2 className="font-display font-extrabold text-2xl text-white">Tournoi introuvable</h2>
        <p className="text-slate-400 text-sm">Le tournoi demandé n'existe pas ou a été déplacé.</p>
        <Link to="/tournois" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-hamra-600 text-white text-xs font-bold">
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
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

      {/* Header Info Banner */}
      <div className="bg-gradient-to-r from-hamra-950 via-slate-900 to-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <CadenceBadge cadence={tournament.cadence} />
          <StatusBadge status={tournament.status} />
          <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-medium">
            {tournament.system}
          </span>
        </div>

        <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
          {tournament.title}
        </h1>

        <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-3xl">
          {tournament.description}
        </p>

        {/* Metas row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80 text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 uppercase tracking-wider block">Dates</span>
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Calendar className="w-4 h-4 text-hamra-400" />
              <span>{tournament.startDate}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 uppercase tracking-wider block">Cadence</span>
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Clock className="w-4 h-4 text-hamra-400" />
              <span>{tournament.timeControl}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 uppercase tracking-wider block">Frais d'inscription</span>
            <div className="font-bold text-hamra-400">
              {tournament.entryFee}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 uppercase tracking-wider block">Lieu</span>
            <div className="flex items-center gap-1.5 font-medium text-slate-300 truncate">
              <MapPin className="w-4 h-4 text-hamra-400 shrink-0" />
              <span className="truncate">{tournament.location}</span>
            </div>
          </div>
        </div>

        {tournament.status === 'upcoming' && (
          <div className="pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-hamra-600 hover:bg-hamra-500 text-white font-extrabold text-sm shadow-club transition-all active:scale-95"
            >
              S'inscrire à ce Tournoi
            </button>
          </div>
        )}
      </div>

      {/* Rules & Prizes Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Rules */}
        <div className="lg:col-span-7 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-display font-extrabold text-xl text-white border-l-4 border-hamra-600 pl-3">
            Règlement Officiel de la Compétition
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 pt-2">
            {tournament.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1">
            <div><strong>Arbitre Officiel :</strong> {tournament.arbiter}</div>
            <div><strong>Organisateur :</strong> {tournament.organizer}</div>
          </div>
        </div>

        {/* Prizes & Grid */}
        <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-display font-extrabold text-xl text-white border-l-4 border-trophy-gold pl-3">
            Grille des Prix & Récompenses
          </h3>

          <div className="space-y-2 pt-2">
            {tournament.prizes.map((prize, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <Trophy className="w-4 h-4 text-trophy-gold shrink-0" />
                <span className="text-xs font-semibold text-slate-200">{prize}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Results if completed */}
      {tournament.results && tournament.results.length > 0 && (
        <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-display font-extrabold text-xl text-white border-l-4 border-hamra-600 pl-3">
            Résultats & Grille Finale
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3 rounded-l-lg">Rang</th>
                  <th className="p-3">Joueur</th>
                  <th className="p-3">Club</th>
                  <th className="p-3">Points</th>
                  <th className="p-3 rounded-r-lg">Classement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {tournament.results.map((r) => (
                  <tr key={r.rank} className="hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-white">
                      {r.rank === 1 ? '🥇 1' : r.rank === 2 ? '🥈 2' : r.rank === 3 ? '🥉 3' : r.rank}
                    </td>
                    <td className="p-3 font-semibold text-white">{r.name}</td>
                    <td className="p-3 text-slate-400">{r.club}</td>
                    <td className="p-3 font-mono font-bold text-hamra-400">{r.points} pts</td>
                    <td className="p-3 font-mono text-slate-400">{r.elo ? r.elo : '-'}</td>
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
