import React from 'react';
import { ShieldCheck, Target, Users } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { SeoHead } from '../components/common/SeoHead';

export const ClubPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <SeoHead
        title="Le Club & Histoire"
        description="Découvrez l'histoire, les valeurs et l'engagement de la Section Échecs du Club Omnisports Hamra Annaba, fondé en 1944."
      />

      <Breadcrumbs items={[{ label: "Le Club & Histoire" }]} />

      {/* Header Club Hero in Claude Warm Obsidian */}
      <div className="bg-[#1C1B18] p-6 sm:p-12 rounded-3xl border border-[#2E2C27] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D97757]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-[#24221E] text-[#E2896B] border border-[#D97757]/30 uppercase tracking-wider">
              Institution Sportive Historique • 1944
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#F5F2EB] leading-tight">
              Hamra Annaba — Section Échecs
            </h1>
            <p className="text-[#BDB8AD] text-sm sm:text-lg leading-relaxed font-sans">
              Fleuron du sport à Annaba, le club omnisports <strong className="text-[#F5F2EB]">Hamra Annaba</strong> perpétue une tradition d'excellence, de rigueur intellectuelle et de passion sportive à travers sa section d'échecs.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white p-3 shadow-2xl border-4 border-[#D97757] flex items-center justify-center">
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
        <div className="bg-[#1E1D1A] p-6 sm:p-8 rounded-3xl border border-[#2E2C27] space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB] border-l-2 border-[#D97757] pl-3">
            L'Histoire du Club & de la Section
          </h2>
          <p className="text-[#BDB8AD] text-xs sm:text-sm leading-relaxed font-sans">
            Fondé en <strong className="text-[#F5F2EB]">1944</strong>, le club de Hamra Annaba s'est illustré dans de multiples disciplines sportives au niveau national. Sa section Échecs a été créée pour offrir à la jeunesse d'Annaba un pôle d'apprentissage de haut niveau, combinant tactique, stratégie et esprit d'équipe.
          </p>
          <p className="text-[#BDB8AD] text-xs sm:text-sm leading-relaxed font-sans">
            Au fil des décennies, le club a formé plusieurs générations de maîtres, d'arbitres fédéraux et de champions de wilaya, représentant dignement la ville des jujubes lors des compétitions nationales organisées par la Fédération Algérienne des Échecs (FADE).
          </p>
        </div>

        <div className="bg-[#1E1D1A] p-6 sm:p-8 rounded-3xl border border-[#2E2C27] space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB] border-l-2 border-[#D97757] pl-3">
            Nos Valeurs Fondamentales
          </h2>
          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-xl bg-[#141413] border border-[#26241F] flex items-start gap-3">
              <Target className="w-5 h-5 text-[#D97757] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-lg text-[#F5F2EB]">Discipline & Réflexion</h4>
                <p className="text-[#9C968B] text-xs mt-0.5 font-sans leading-relaxed">L'échiquier enseigne la patience, le calcul préalable et la responsabilité de chaque coup joué.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#141413] border border-[#26241F] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#7E9F80] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-lg text-[#F5F2EB]">Respect & Fair-Play</h4>
                <p className="text-[#9C968B] text-xs mt-0.5 font-sans leading-relaxed">Le salut de l'adversaire avant et après la partie, le respect strict de la pendule et des arbitres.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#141413] border border-[#26241F] flex items-start gap-3">
              <Users className="w-5 h-5 text-[#D4A373] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-lg text-[#F5F2EB]">Transmission Intergénérationnelle</h4>
                <p className="text-[#9C968B] text-xs mt-0.5 font-sans leading-relaxed">Les joueurs seniors et vétérans encadrent activement les poussins et pupilles du club.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Structure & Facility */}
      <section className="bg-[#1E1D1A] p-6 sm:p-8 rounded-3xl border border-[#2E2C27]">
        <SectionTitle
          badge="Structure du Club"
          title="Organisation & Équipements"
          subtitle="Un cadre d'entraînement équipé selon les standards fédéraux officiels à Annaba."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-[#141413] border border-[#26241F] space-y-2">
            <h4 className="font-serif text-xl text-[#F5F2EB]">Salle d'Entraînement</h4>
            <p className="text-xs text-[#9C968B] leading-relaxed font-sans">
              Échiquiers officiels plombés, pendules électroniques DGT homologuées FIDE et échiquiers muraux d'analyse pour les cours collectifs.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141413] border border-[#26241F] space-y-2">
            <h4 className="font-serif text-xl text-[#F5F2EB]">Bibliothèque Échiquéenne</h4>
            <p className="text-xs text-[#9C968B] leading-relaxed font-sans">
              Ouvrages théoriques de référence (ouvertures, tactique, finales de Dvoretsky, parties des Champions du Monde) mis à disposition des membres.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141413] border border-[#26241F] space-y-2">
            <h4 className="font-serif text-xl text-[#F5F2EB]">Pôle Compétition FADE</h4>
            <p className="text-xs text-[#9C968B] leading-relaxed font-sans">
              Organisation de tournois officiels homologués pour l'obtention et l'évolution des classements ELO nationaux et internationaux.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
