import React, { useState } from 'react';
import { X, CheckCircle, Trophy, User, Phone, Mail, GraduationCap } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 touch-target p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-hamra-950 text-hamra-400 text-xs font-bold uppercase tracking-wider mb-2 border border-hamra-800">
                {tournament ? "Inscription Tournoi" : "Adhésion Club & École"}
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">
                {tournament ? tournament.title : "Rejoindre Hamra Annaba"}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {tournament
                  ? `Cadence : ${tournament.cadence} (${tournament.timeControl}) • ${tournament.startDate}`
                  : "Formation jeunes, compétition et loisir à Annaba."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nom et Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="ex: Yacine Benali"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-hamra-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Numéro de Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 XX XX XX XX"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-hamra-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Catégorie d'âge
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-hamra-500"
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@exemple.dz"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-hamra-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Identifiant FIDE (optionnel)
                  </label>
                  <input
                    type="text"
                    value={fideId}
                    onChange={(e) => setFideId(e.target.value)}
                    placeholder="ex: FIDE-DZ-XXXX"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-hamra-500"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-hamra-600 to-hamra-700 hover:from-hamra-500 hover:to-hamra-600 text-white font-extrabold text-sm shadow-club transition-all active:scale-95 flex items-center justify-center gap-2"
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
            <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg animate-in zoom-in-75">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="font-display font-extrabold text-2xl text-white">
              Demande Enregistrée avec Succès !
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              Merci <strong>{fullName}</strong>. Votre demande pour {tournament ? `le tournoi "${tournament.title}"` : "l'adhésion à Hamra Annaba"} a bien été transmise à la commission d'organisation.
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 max-w-xs mx-auto">
              Un responsable du club vous contactera au <strong>{phone}</strong> pour confirmation.
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl bg-hamra-600 hover:bg-hamra-500 text-white font-bold text-xs"
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
