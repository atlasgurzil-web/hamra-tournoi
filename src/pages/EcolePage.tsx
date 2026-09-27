import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, CheckCircle2, Clock, Calendar, Users, Award, BookOpen, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { SeoHead } from '../components/common/SeoHead';
import { RegistrationModal } from '../components/ui/RegistrationModal';
import { clubData } from '../data/clubData';

export const EcolePage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const programs = [
    {
      level: "Pôle Éveil (6 – 8 ans)",
      tag: "Initiation Première",
      desc: "Découverte des pièces, déplacements, règles du jeu, échec et mat, et respect du matériel.",
      goals: ["Prise en main des pièces", "Compréhension du plateau", "Exercices ludiques de mini-parties"]
    },
    {
      level: "Pôle Jeunes Espoirs (9 – 13 ans)",
      tag: "Perfectionnement",
      desc: "Développement du calcul tactique (fourchettes, clouages, enfilades), principes fondamentaux d'ouverture et finales élémentaires.",
      goals: ["Schémas de mat classiques", "Gestion de la pendule", "Notation obligatoire des parties"]
    },
    {
      level: "Pôle Compétition & Cadets (14 – 18 ans)",
      tag: "Haute Performance",
      desc: "Étude des structures de pions, plans stratégiques de milieu de jeu, répertoire d'ouvertures personnalisé et préparation aux tournois FIDE.",
      goals: ["Homologation classement ELO", "Participation aux championnats régionaux", "Analyse informatique approfondie"]
    },
    {
      level: "Section Adultes & Passionnés",
      tag: "Loisir & Compétition",
      desc: "Pour les adultes souhaitant débuter ou perfectionner leur niveau en toute convivialité.",
      goals: ["Analyse de parties historiques", "Tournois internes amicaux", "Perfectionnement stratégique"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      <SeoHead
        title="École d'Échecs de Hamra Annaba"
        description="Formation échiquéenne pour enfants, adolescents et adultes à Annaba. Programmes pédagogiques, horaires d'entraînement et inscriptions 2026/2027."
      />

      <Breadcrumbs items={[{ label: "École d'Échecs" }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-hamra-950 via-slate-900 to-slate-900 p-6 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-hamra-600 text-white uppercase tracking-wider">
            Saison 2026 / 2027
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
            L'École d'Échecs de Hamra Annaba
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
            Offrez à votre enfant l'opportunité de développer sa concentration, sa logique et sa créativité dans un cadre associatif structuré et bienveillant à Annaba.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-hamra-600 hover:bg-hamra-500 text-white font-extrabold text-sm shadow-club transition-all active:scale-95"
            >
              Inscrire un Élève pour la Rentrée
            </button>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <section className="space-y-8">
        <SectionTitle
          badge="Nos Niveaux de Formation"
          title="Un Parcours Adapté à Chaque Âge"
          subtitle="De l'initiation des plus jeunes jusqu'à la préparation aux compétitions officielles FIDE."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((p, idx) => (
            <div key={idx} className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 hover:border-hamra-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-hamra-950 text-hamra-400 border border-hamra-800">
                    {p.tag}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-xl text-white mb-2">
                  {p.level}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed">
                  {p.desc}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Objectifs clés :</span>
                  {p.goals.map((g, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{g}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-hamra-600 text-white font-bold text-xs transition-colors"
                >
                  Choisir ce Groupe
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule & Fees */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-display font-extrabold text-2xl text-white border-l-4 border-hamra-600 pl-3">
            Planning Hebdomadaire des Séances
          </h3>
          <div className="space-y-3 pt-2">
            {clubData.trainingDays.map((td, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-sm text-hamra-400 block">{td.group}</span>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{td.days}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{td.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-display font-extrabold text-2xl text-white border-l-4 border-hamra-600 pl-3">
            Tarifs & Modalités d'Adhésion
          </h3>
          <div className="space-y-3 pt-2">
            {clubData.fees.map((fee, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-white">{fee.category}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{fee.details}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-display font-extrabold text-lg text-hamra-400">{fee.price}</span>
                  <span className="text-[11px] text-slate-500 block">{fee.frequency}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full py-3.5 rounded-xl bg-hamra-600 hover:bg-hamra-500 text-white font-extrabold text-sm shadow-club text-center"
            >
              Pré-inscription en Ligne
            </button>
          </div>
        </div>
      </section>

      <RegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
