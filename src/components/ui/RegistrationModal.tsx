import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Tournament } from '../../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournament?: Tournament | null;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  tournament
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Senior');
  const [fideId, setFideId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFullName('');
    setPhone('');
    setEmail('');
    setFideId('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#1B1A17] rounded-3xl p-6 sm:p-8 border border-[#2E2C27] shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 touch-target p-2 rounded-full bg-[#24221E] text-[#9C968B] hover:text-[#F5F2EB] hover:bg-[#2A2823] transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#24221E] text-[#E2896B] text-xs font-mono font-medium uppercase tracking-wider mb-2.5 border border-[#D97757]/30">
                {tournament ? "Inscription Tournoi" : "Adhésion Club & École"}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB]">
                {tournament ? tournament.title : "Rejoindre Hamra Annaba"}
              </h3>
              <p className="text-xs text-[#9C968B] mt-1 font-sans">
                {tournament
                  ? `Cadence : ${tournament.cadence} (${tournament.timeControl}) • ${tournament.startDate}`
                  : "Formation jeunes, compétition et loisir à Annaba."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              <div>
                <label className="block text-xs font-medium text-[#BDB8AD] mb-1.5">
                  Nom et Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="ex: Yacine Benali"
                  className="w-full px-4 py-3 rounded-xl bg-[#141413] border border-[#2E2C27] text-[#F5F2EB] placeholder-[#7D786F] text-sm focus:outline-none focus:border-[#D97757] focus:ring-1 focus:ring-[#D97757]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#BDB8AD] mb-1.5">
                    Numéro de Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 XX XX XX XX"
                    className="w-full px-4 py-3 rounded-xl bg-[#141413] border border-[#2E2C27] text-[#F5F2EB] placeholder-[#7D786F] text-sm focus:outline-none focus:border-[#D97757] focus:ring-1 focus:ring-[#D97757]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#BDB8AD] mb-1.5">
                    Catégorie d'âge
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#141413] border border-[#2E2C27] text-[#F5F2EB] text-sm focus:outline-none focus:border-[#D97757] focus:ring-1 focus:ring-[#D97757]"
                  >
                    <option value="Poussin">Poussin (U10)</option>
                    <option value="Pupille">Pupille (U12)</option>
                    <option value="Benjamin">Benjamin (U14)</option>
                    <option value="Minime">Minime (U16)</option>
                    <option value="Cadet">Cadet (U18)</option>
                    <option value="Junior">Junior (U20)</option>
                    <option value="Senior">Senior (Adulte)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#BDB8AD] mb-1.5">
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@exemple.dz"
                    className="w-full px-4 py-3 rounded-xl bg-[#141413] border border-[#2E2C27] text-[#F5F2EB] placeholder-[#7D786F] text-sm focus:outline-none focus:border-[#D97757] focus:ring-1 focus:ring-[#D97757]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#BDB8AD] mb-1.5 font-mono">
                    Identifiant FIDE (optionnel)
                  </label>
                  <input
                    type="text"
                    value={fideId}
                    onChange={(e) => setFideId(e.target.value)}
                    placeholder="ex: 1400383"
                    className="w-full px-4 py-3 rounded-xl bg-[#141413] border border-[#2E2C27] text-[#F5F2EB] placeholder-[#7D786F] text-sm focus:outline-none focus:border-[#D97757] focus:ring-1 focus:ring-[#D97757] font-mono"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl btn-claude font-semibold text-sm shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Envoi en cours...</span>
                  ) : (
                    <span>Valider mon Inscription</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#18261B] border-2 border-[#7E9F80] text-[#8FBC8F] flex items-center justify-center mx-auto shadow-lg animate-in zoom-in-75">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB]">
              Demande Enregistrée avec Succès !
            </h3>

            <p className="text-xs sm:text-sm text-[#BDB8AD] max-w-sm mx-auto leading-relaxed font-sans">
              Merci <strong>{fullName}</strong>. Votre demande pour {tournament ? `le tournoi "${tournament.title}"` : "l'adhésion à Hamra Annaba"} a bien été transmise à la commission d'organisation.
            </p>

            <div className="p-4 rounded-xl bg-[#141413] border border-[#26241F] text-xs text-[#9C968B] max-w-xs mx-auto font-sans">
              Un responsable du club vous contactera au <strong>{phone}</strong> pour confirmation.
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl btn-claude font-semibold text-xs"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
