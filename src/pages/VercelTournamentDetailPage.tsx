import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Crown, Calendar, MapPin, Clock, Award, QrCode, Users, UserCheck, ShieldCheck, Send, CheckCircle2, X } from 'lucide-react';
import { useTournaments } from '../context/TournamentContext';

export const VercelTournamentDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getTournamentBySlug, registerPlayer } = useTournaments();
  const tournament = getTournamentBySlug(slug || '');

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    phone: '',
    email: '',
    sex: 'M' as 'M' | 'F',
    club: '',
    fide_id: '',
    rating: ''
  });

  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ bibNumber: number; fullName: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!tournament) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#F5F2EB]">Tournoi introuvable</h2>
        <p className="text-[#9C968B] text-sm">Le tournoi demandé n'existe pas ou a été déplacé.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-claude text-xs font-semibold">
          <ArrowLeft className="w-4 h-4" /> Retour aux tournois
        </Link>
      </div>
    );
  }

  const percentage = Math.min(100, Math.round((tournament.confirmed_count / tournament.max_players) * 100));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const res = registerPlayer(tournament.slug, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        birth_date: formData.birth_date,
        phone: formData.phone,
        email: formData.email,
        sex: formData.sex,
        club: formData.club || 'Indépendant',
        fide_id: formData.fide_id,
        rating: formData.rating ? parseInt(formData.rating, 10) : 0
      });

      setIsSubmitting(false);

      if (res.success && res.bibNumber) {
        setSuccessInfo({
          bibNumber: res.bibNumber,
          fullName: `${formData.first_name} ${formData.last_name}`
        });
        setFormData({
          first_name: '',
          last_name: '',
          birth_date: '',
          phone: '',
          email: '',
          sex: 'M',
          club: '',
          fide_id: '',
          rating: ''
        });
      }
    }, 500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#141413]">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#BDB8AD] hover:text-[#D97757] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour aux tournois</span>
      </Link>

      {/* Main Tournament Info Card in Claude Obsidian */}
      <div className="bg-[#1C1B18] backdrop-blur-xl rounded-3xl border border-[#2E2C27] shadow-2xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97757]/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Club Logo */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-2 border-2 border-[#D97757] flex-shrink-0 flex items-center justify-center shadow-lg">
              <img
                src="/logo_hamra_annaba.png"
                alt="Logo Hamra Annaba"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              {/* Badge Club */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97757]/15 border border-[#D97757]/30 text-[#E2896B] text-xs font-mono font-semibold uppercase tracking-wider mb-2.5">
                <Crown className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Section Échecs Hamra Annaba 1944</span>
              </div>

              {/* Tournament Title in Instrument Serif */}
              <h1 className="text-2xl sm:text-4xl font-serif text-[#F5F2EB] leading-tight">
                {tournament.name}
              </h1>

              {/* Metas Row */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mt-5">
                <div className="flex items-center gap-1.5 bg-[#141413] px-3.5 py-1.5 rounded-xl border border-[#26241F] text-xs font-medium text-[#F5F2EB]">
                  <Calendar className="w-3.5 h-3.5 text-[#D97757]" />
                  <span className="capitalize">{tournament.start_date}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#141413] px-3.5 py-1.5 rounded-xl border border-[#26241F] text-xs font-medium text-[#BDB8AD]">
                  <MapPin className="w-3.5 h-3.5 text-[#9C968B]" />
                  <span>{tournament.location}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#141413] px-3.5 py-1.5 rounded-xl border border-[#26241F] text-xs font-medium text-[#BDB8AD]">
                  <Clock className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Pointage : <strong className="text-[#F5F2EB] font-mono">{tournament.start_time}</strong> • {tournament.cadence} ({tournament.rounds} rondes)</span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#2A2318] px-3.5 py-1.5 rounded-xl border border-[#D4A373]/30 text-xs font-mono font-semibold text-[#D4A373]">
                  <Award className="w-3.5 h-3.5" />
                  <span>Frais : {tournament.registration_fee === 0 ? 'Gratuit' : `${tournament.registration_fee} DZD`}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setQrModalOpen(true)}
                  className="flex items-center gap-1.5 btn-claude px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-md active:scale-95 cursor-pointer"
                  title="Générer l'affiche et le QR Code du tournoi"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>QR Code & Affiche</span>
                </button>
              </div>
            </div>
          </div>

          {/* Live Capacity Gauge Banner */}
          <div className="mt-8 bg-[#141413] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#26241F]">
            <div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9C968B] flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#D4A373]" />
                Jauge en Direct & Places
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-serif font-bold text-[#D4A373] tabular-nums">
                  {tournament.confirmed_count}
                </span>
                <span className="text-xl text-[#BDB8AD] font-sans">
                  / {tournament.max_players} Joueurs confirmés
                </span>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                <span className="text-[#9C968B]">Remplissage de la salle :</span>
                <span className="tabular-nums font-mono font-bold text-[#F5F2EB]">{percentage}%</span>
              </div>
              <div className="w-full h-3.5 bg-[#26241F] rounded-full overflow-hidden border border-[#2E2C27]">
                <div
                  className="h-full bg-gradient-to-r from-[#D4A373] via-[#D97757] to-[#C15F3C] rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${Math.max(2, percentage)}%` }}
                ></div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="flex flex-col items-end">
                {tournament.spots_left > 0 ? (
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#18261B] text-[#8FBC8F] border border-[#7E9F80]/40">
                    🟢 {tournament.spots_left} Place{tournament.spots_left > 1 ? 's' : ''} Restante{tournament.spots_left > 1 ? 's' : ''}
                  </span>
                ) : (
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#2A2318] text-[#D4A373] border border-[#D4A373]/40">
                    ⚠️ Tournoi Complet
                  </span>
                )}
                <span className="text-xs text-[#7D786F] font-mono mt-1">
                  Dossard attribué instantanément
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification Modal */}
      {successInfo && (
        <div className="bg-[#18261B] border-2 border-[#7E9F80] rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-full bg-[#253D2A] text-[#8FBC8F] flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl text-[#F5F2EB]">
            Inscription Confirmée avec Succès !
          </h3>
          <p className="text-sm text-[#CDE6CE] max-w-lg mx-auto font-sans">
            Félicitations <strong>{successInfo.fullName}</strong> ! Vous êtes officiellement inscrit au tournoi <strong>{tournament.name}</strong>.
          </p>
          <div className="inline-block bg-[#141413] px-6 py-2.5 rounded-xl border border-[#7E9F80]/40">
            <span className="text-xs font-mono text-[#9C968B] block">Numéro de Dossard Officiel</span>
            <span className="font-mono text-3xl font-bold text-[#D4A373]">#{successInfo.bibNumber}</span>
          </div>
          <div className="pt-2">
            <button
              onClick={() => setSuccessInfo(null)}
              className="px-6 py-2 rounded-xl btn-claude text-xs font-semibold"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Registration Form Card */}
      <div className="bg-[#1E1D1A] backdrop-blur-xl rounded-3xl border border-[#2E2C27] shadow-2xl overflow-hidden">
        {/* Form Card Header */}
        <div className="bg-[#181816] p-6 sm:p-8 border-b border-[#2A2823]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#F5F2EB] flex items-center gap-2.5">
                <UserCheck className="w-6 h-6 text-[#D97757]" />
                <span>Formulaire d'Inscription Joueur</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#9C968B] mt-1 font-sans">
                Remplissez les informations officielles pour figurer sur la liste des participants FIDE.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#BDB8AD] bg-[#141413] px-3.5 py-1.5 rounded-xl border border-[#26241F]">
              <ShieldCheck className="w-4 h-4 text-[#7E9F80]" />
              <span>Attribution Sécurisée</span>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDB8AD] mb-2 font-mono">
                Nom de Famille <span className="text-[#D97757]">*</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Benghida"
                required
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border font-medium text-white text-sm focus:outline-none transition-all bg-[#141413] border-[#2E2C27] focus:border-[#D97757]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDB8AD] mb-2 font-mono">
                Prénom <span className="text-[#D97757]">*</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Hamza"
                required
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border font-medium text-white text-sm focus:outline-none transition-all bg-[#141413] border-[#2E2C27] focus:border-[#D97757]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDB8AD] mb-2 font-mono">
                Date de Naissance <span className="text-[#D97757]">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.birth_date}
                onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border font-medium text-white text-sm focus:outline-none transition-all bg-[#141413] border-[#2E2C27] focus:border-[#D97757]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDB8AD] mb-2 font-mono">
                Numéro de Téléphone <span className="text-[#7D786F] font-normal">(Optionnel)</span>
              </label>
              <input
                type="tel"
                placeholder="Ex: 05 51 05 67 85"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border font-medium text-white text-sm focus:outline-none transition-all bg-[#141413] border-[#2E2C27] focus:border-[#D97757]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDB8AD] mb-2 font-mono">
                Email de Confirmation <span className="text-[#7D786F] font-normal">(Optionnel)</span>
              </label>
              <input
                type="email"
                placeholder="joueur@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border font-medium text-white text-sm focus:outline-none transition-all bg-[#141413] border-[#2E2C27] focus:border-[#D97757]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDB8AD] mb-2 font-mono">
                Genre / Sexe <span className="text-[#D97757]">*</span>
              </label>
              <select
                value={formData.sex}
                onChange={(e) => setFormData({ ...formData, sex: e.target.value as 'M' | 'F' })}
                className="w-full px-4 py-3 rounded-xl border border-[#2E2C27] focus:border-[#D97757] font-semibold text-white text-sm focus:outline-none transition-all bg-[#141413]"
              >
                <option value="M">Masculin (M)</option>
                <option value="F">Féminin (F)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDB8AD] mb-2 font-mono">
                Club d'Échecs <span className="text-[#7D786F] font-normal">(Optionnel)</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Hamra Annaba"
                value={formData.club}
                onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#2E2C27] focus:border-[#D97757] font-medium text-white text-sm focus:outline-none transition-all bg-[#141413]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDB8AD] mb-2 font-mono">
                Code FIDE ID <span className="text-[#7D786F] font-normal">(Optionnel si NC)</span>
              </label>
              <input
                type="text"
                placeholder="Ex: 7981600"
                value={formData.fide_id}
                onChange={(e) => setFormData({ ...formData, fide_id: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#2E2C27] focus:border-[#D97757] font-mono text-white text-sm focus:outline-none transition-all bg-[#141413]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDB8AD] mb-2 font-mono">
                Classement Elo FIDE <span className="text-[#7D786F] font-normal">(0 si non classé)</span>
              </label>
              <input
                type="number"
                placeholder="Ex: 1850 (ou 0 si NC)"
                min="0"
                max="3200"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#2E2C27] focus:border-[#D97757] font-mono text-[#D4A373] text-sm focus:outline-none transition-all bg-[#141413]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#2A2823]">
            <button
              type="submit"
              disabled={isSubmitting || tournament.spots_left <= 0}
              className="w-full py-4 px-6 rounded-2xl font-semibold text-base btn-claude text-white shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="w-5 h-5" />
              <span>{isSubmitting ? "Validation en cours..." : "Valider mon Inscription & Réserver ma Place →"}</span>
            </button>
            <p className="text-xs text-center text-[#7D786F] mt-3 font-mono">
              🔒 Attribution instantanée de votre numéro de dossard officiel FIDE.
            </p>
          </div>
        </form>
      </div>

      {/* QR Code & Poster Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-[#1E1D1A] rounded-3xl p-6 border border-[#2E2C27] shadow-2xl text-center space-y-4">
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#141413] text-[#9C968B] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-serif text-2xl text-[#F5F2EB]">Affiche & QR Code</h3>
            <p className="text-xs text-[#9C968B]">{tournament.name}</p>
            <div className="p-4 bg-white rounded-2xl inline-block shadow-inner mx-auto">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(window.location.href)}`}
                alt="QR Code Tournoi"
                className="w-44 h-44 object-contain"
              />
            </div>
            <p className="text-[11px] text-[#7D786F] font-mono">
              Scannez pour accéder directement à la jauge et aux inscriptions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
