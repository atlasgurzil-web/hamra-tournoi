import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Trophy, MapPin, Calendar, Users, Award, Target, BookOpen } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { SeoHead } from '../components/common/SeoHead';
import { clubData } from '../data/clubData';

export const ClubPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      <SeoHead
        title="Le Club & Histoire"
        description="Découvrez l'histoire, les valeurs et l'engagement de la Section Échecs du Club Omnisports Hamra Annaba, fondé en 1944."
      />

      <Breadcrumbs items={[{ label: "Le Club & Histoire" }]} />

      {/* Header Club Hero */}
      <div className="bg-gradient-to-r from-hamra-950 via-slate-900 to-slate-900 p-6 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-hamra-900/80 text-hamra-400 border border-hamra-800 uppercase tracking-wider">
              Institution Sportive Historique
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
              Hamra Annaba – Section Échecs
            </h1>
            <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
              Fleuron du sport à Annaba, le club omnisports **Hamra Annaba** perpétue une tradition d'excellence, de rigueur intellectuelle et de passion sportive à travers sa section d'échecs.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white p-3 shadow-2xl border-4 border-hamra-600 flex items-center justify-center">
              <img
                src="/logo_hamra_annaba.png"
                alt="Logo Hamra Annaba"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* History & Identity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="font-display font-extrabold text-2xl text-white border-l-4 border-hamra-600 pl-3">
            L'Histoire du Club & de la Section
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Fondé en <strong>1944</strong>, le club de **Hamra Annaba** s'est illustré dans de multiples disciplines sportives au niveau national. Sa section Échecs a été créée pour offrir à la jeunesse d'Annaba un pôle d'apprentissage de haut niveau, combinant tactique, stratégie et esprit d'équipe.
          </p>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Au fil des décennies, le club a formé plusieurs générations de maîtres, d'arbitres fédéraux et de champions de wilaya, représentant dignement la ville des jujubes lors des compétitions nationales organisées par la Fédération Algérienne des Échecs (FADE).
          </p>
        </div>

        <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="font-display font-extrabold text-2xl text-white border-l-4 border-hamra-600 pl-3">
            Nos Valeurs Fondamentales
          </h2>
          <div className="space-y-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <Target className="w-5 h-5 text-hamra-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm">Discipline & Réflexion</h4>
                <p className="text-slate-400 text-xs mt-0.5">L'échiquier enseigne la patience, le calcul préalable et la responsabilité de chaque coup joué.</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm">Respect & Fair-Play</h4>
                <p className="text-slate-400 text-xs mt-0.5">Le salut de l'adversaire avant et après la partie, le respect strict de la pendule et des arbitres.</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <Users className="w-5 h-5 text-trophy-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm">Transmission Intergénérationnelle</h4>
                <p className="text-slate-400 text-xs mt-0.5">Les joueurs seniors et vétérans encadrent activement les poussins et pupilles du club.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Structure & Facility */}
      <section className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <SectionTitle
          badge="Structure du Club"
          title="Organisation & Équipements"
          subtitle="Un cadre d'entraînement équipé selon les standards fédéraux officiels à Annaba."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-display font-bold text-lg text-white">Salle d'Entraînement</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Échiquiers officiels plombés, pendules électroniques DGT homologuées FIDE et échiquiers muraux d'analyse pour les cours collectifs.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-display font-bold text-lg text-white">Bibliothèque Échiquéenne</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ouvrages théoriques de référence (ouvertures, tactique, finales de Dvoretsky, parties des Champions du Monde) mis à disposition des membres.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-display font-bold text-lg text-white">Pôle Compétition FADE</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Organisation de tournois officiels homologués pour l'obtention et l'évolution des classements ELO nationaux et internationaux.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
