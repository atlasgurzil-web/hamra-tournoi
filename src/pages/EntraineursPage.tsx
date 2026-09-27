import React from 'react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { SeoHead } from '../components/common/SeoHead';
import { CoachCard } from '../components/cards/CoachCard';
import { coachesData } from '../data/coachesData';

export const EntraineursPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      <SeoHead
        title="Encadrement Technique & Entraîneurs"
        description="Découvrez l'équipe technique et les entraîneurs fédéraux de Hamra Annaba : pédagogie, qualifications et spécialités."
      />

      <Breadcrumbs items={[{ label: "Entraîneurs" }]} />

      <SectionTitle
        badge="Encadrement Qualifié"
        title="L'Équipe Technique de Hamra Annaba"
        subtitle="Des formateurs passionnés et diplômés pour accompagner la progression des jeunes et des compétiteurs."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {coachesData.map((coach) => (
          <CoachCard key={coach.id} coach={coach} />
        ))}
      </div>
    </div>
  );
};
