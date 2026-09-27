import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Crown, Calendar, MapPin, Clock, Award, QrCode, Users, UserCheck, ShieldCheck, Send, CheckCircle2, X } from 'lucide-react';
import { useTournaments } from '../context/TournamentContext';
import { CompetitorPassCard } from '../components/CompetitorPassCard';

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
  const [successInfo, setSuccessInfo] = useState<{
    bibNumber: number;
    fullName: string;
    club?: string;
    fide_id?: string;
    rating?: number;
    sex?: 'M' | 'F';
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animatedPercent, setAnimatedPercent] = useState(0);

  const percentage = tournament
    ? Math.min(100, Math.round((tournament.confirmed_count / tournament.max_players) * 100))
    : 0;

  // Linear-style fluid spring animation on gauge mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercent(percentage);
    }, 150);
    return () => clearTimeout(timer);
  }, [percentage]);

  if (!tournament) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="font-serif font-black text-3xl sm:text-4xl text-white">Tournoi Introuvable</h2>
        <p className="text-slate-400 text-sm sm:text-base">La compétition demandée n'existe pas ou a été archivée.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl btn-hamra text-xs sm:text-sm font-bold">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Retour aux tournois
        </Link>
      </div>
    );
  }

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
        club: formData.club || 'Hamra Annaba',
        fide_id: formData.fide_id,
        rating: formData.rating ? parseInt(formData.rating, 10) : 0
      });

      setIsSubmitting(false);

      if (res.success && res.bibNumber) {
        setSuccessInfo({
          bibNumber: res.bibNumber,
          fullName: `${formData.first_name} ${formData.last_name}`,
          club: formData.club || 'Hamra Annaba',
          fide_id: formData.fide_id,
          rating: formData.rating ? parseInt(formData.rating, 10) : 0,
          sex: formData.sex
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
    }, 400);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-14 space-y-6 sm:space-y-10 pb-28 md:pb-16 bg-[#0A0E17]">
      {/* Back Button */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 hover:text-amber-400 transition-colors bg-slate-900/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-800"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
          <span>Retour aux tournois</span>
        </Link>
      </div>

      {/* Main Tournament Info Card */}
      <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl p-4 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-red-600/10 blur-[100px] sm:blur-[130px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8">
            
            {/* Club Logo */}
            <div className="w-16 h-16 sm:w-28 sm:h-28 rounded-2xl bg-white p-1.5 sm:p-2 border-2 border-red-600 flex-shrink-0 flex items-center justify-center shadow-xl shadow-red-600/20">
              <img
                src="/logo_hamra_annaba.png"
                alt="Logo Hamra Annaba"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex-1 text-center sm:text-left min-w-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-2 sm:mb-3">
                <Crown className="w-3 h-3 text-amber-400" />
                <span>Section Échecs Hamra Annaba (1944)</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-tight break-words">
                {tournament.name}
              </h1>

              {/* Event Attributes Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mt-4 sm:mt-6">
                <div className="flex items-center gap-1.5 bg-[#070A10] px-3 py-1.5 rounded-xl border border-slate-800 text-xs sm:text-sm font-semibold text-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-red-500" />
                  <span className="capitalize">{tournament.start_date}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#070A10] px-3 py-1.5 rounded-xl border border-slate-800 text-xs sm:text-sm font-semibold text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{tournament.location}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#070A10] px-3 py-1.5 rounded-xl border border-slate-800 text-xs sm:text-sm font-semibold text-slate-200">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pointage : <strong className="text-white font-mono">{tournament.start_time}</strong> • {tournament.cadence} ({tournament.rounds} rondes)</span>
                </div>

                <div className="flex items-center gap-1.5 bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-500/40 text-xs sm:text-sm font-bold text-amber-300">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Frais : {tournament.registration_fee === 0 ? 'Gratuit' : `${tournament.registration_fee} DZD`}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setQrModalOpen(true)}
                  className="flex items-center gap-1.5 btn-hamra px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-all shadow-lg active:scale-95 cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Affiche & QR</span>
                </button>
              </div>
            </div>

          </div>

          {/* Real-time Capacity Gauge Banner (Linear Spring Fill Animation) */}
          <div className="mt-6 sm:mt-10 bg-[#070A10] text-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 border border-slate-800">
            <div className="text-center md:text-left">
              <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center justify-center md:justify-start gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Jauge en Direct & Places</span>
              </div>
              <div className="flex items-baseline justify-center md:justify-start gap-2 mt-1 sm:mt-2">
                <span className="text-3xl sm:text-5xl font-black font-mono text-amber-400 tabular-nums">
                  {tournament.confirmed_count}
                </span>
                <span className="text-base sm:text-2xl font-bold text-slate-400">
                  / {tournament.max_players} Joueurs
                </span>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-1.5 sm:mb-2">
                <span className="text-slate-400">Remplissage de la salle :</span>
                <span className="tabular-nums font-black text-white">{percentage}%</span>
              </div>
              <div className="w-full h-3.5 sm:h-4 bg-slate-850 rounded-full overflow-hidden border border-slate-700 relative">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-red-500 to-rose-600 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-red-600/50"
                  style={{ width: `${Math.max(4, animatedPercent)}%` }}
                ></div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="flex flex-col items-center md:items-end">
                <span className="px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-500/50 shadow-md">
                  🟢 {tournament.spots_left} Place{tournament.spots_left > 1 ? 's' : ''} Restante{tournament.spots_left > 1 ? 's' : ''}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-semibold mt-1">
                  Dossard attribué instantanément
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Rimowa / Apple Interactive Competitor Pass Modal */}
      {successInfo && (
        <CompetitorPassCard
          player={successInfo}
          tournament={tournament}
          onClose={() => setSuccessInfo(null)}
        />
      )}

      {/* Registration Form */}
      <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Form Title Banner */}
        <div className="bg-[#070A10] text-white p-4 sm:p-8 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-3xl font-serif font-black flex items-center gap-2 sm:gap-3">
                <UserCheck className="w-5 h-5 sm:w-7 sm:h-7 text-red-500" />
                <span>Formulaire d'Inscription Joueur</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Remplissez les informations officielles pour figurer sur la liste des participants FIDE.
              </p>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Attribution Sécurisée</span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-10 space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-200">
                Nom de Famille <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Benghida"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border font-medium text-white text-sm sm:text-base bg-[#070A10] border-slate-700 focus:border-red-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-200">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Hamza"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border font-medium text-white text-sm sm:text-base bg-[#070A10] border-slate-700 focus:border-red-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-200">
                Date de Naissance <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.birth_date}
                onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border font-medium text-white text-sm sm:text-base bg-[#070A10] border-slate-700 focus:border-red-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-200">
                Numéro de Téléphone <span className="text-slate-500 font-normal">(Optionnel)</span>
              </label>
              <input
                type="tel"
                placeholder="Ex: 05 51 05 67 85"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border font-medium text-white text-sm sm:text-base bg-[#070A10] border-slate-700 focus:border-red-500 outline-none transition-all"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5 sm:space-y-2">
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-200">
                Email de Confirmation <span className="text-slate-500 font-normal">(Optionnel)</span>
              </label>
              <input
                type="email"
                placeholder="joueur@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border font-medium text-white text-sm sm:text-base bg-[#070A10] border-slate-700 focus:border-red-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-200">
                Genre / Sexe <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.sex}
                onChange={(e) => setFormData({ ...formData, sex: e.target.value as 'M' | 'F' })}
                className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border border-slate-700 focus:border-red-500 font-bold text-white text-sm sm:text-base bg-[#070A10] outline-none transition-all"
              >
                <option value="M">Masculin (M)</option>
                <option value="F">Féminin (F)</option>
              </select>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-200">
                Club d'Échecs <span className="text-slate-500 font-normal">(Optionnel)</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Hamra Annaba"
                value={formData.club}
                onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border border-slate-700 focus:border-red-500 font-medium text-white text-sm sm:text-base bg-[#070A10] outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-200">
                Code FIDE ID <span className="text-slate-500 font-normal">(Optionnel si NC)</span>
              </label>
              <input
                type="text"
                placeholder="Ex: 7981600"
                value={formData.fide_id}
                onChange={(e) => setFormData({ ...formData, fide_id: e.target.value })}
                className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border border-slate-700 focus:border-red-500 font-medium text-white text-sm sm:text-base bg-[#070A10] outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-200">
                Classement Elo FIDE <span className="text-slate-500 font-normal">(0 si non classé)</span>
              </label>
              <input
                type="number"
                min="0"
                max="3200"
                placeholder="Ex: 1850 (ou 0 si NC)"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border border-slate-700 focus:border-red-500 font-mono font-bold text-amber-400 text-sm sm:text-base bg-[#070A10] outline-none transition-all"
              />
            </div>

          </div>

          <div className="pt-4 sm:pt-6 border-t border-slate-800">
            <button
              type="submit"
              disabled={isSubmitting || tournament.spots_left === 0}
              className="w-full py-4 sm:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg btn-hamra text-white shadow-2xl transition-all flex items-center justify-center gap-2.5 transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="truncate">
                {isSubmitting
                  ? "Génération de votre Pass en cours..."
                  : tournament.spots_left > 0
                  ? "Valider mon Inscription & Obtenir mon Pass VIP →"
                  : "Tournoi Complet (Inscriptions Clôturées)"}
              </span>
            </button>
            <p className="text-[11px] sm:text-sm text-center text-slate-400 mt-3 sm:mt-4 font-medium flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
              <span>Génération instantanée de votre Pass officiel et verrouillage de place anti-surréservation.</span>
            </p>
          </div>
        </form>
      </div>

      {/* QR Code Modal for Poster & Share */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full space-y-4 sm:space-y-6 shadow-2xl relative text-center">
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto shadow-lg">
              <QrCode className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>

            <div>
              <h3 className="font-serif font-black text-xl sm:text-2xl text-white">
                Affiche & QR Code
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Scannez pour accéder directement à l'inscription.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-inner mx-auto w-44 h-44 sm:w-52 sm:h-52 flex flex-col items-center justify-center border-4 border-red-600">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(window.location.href)}`}
                alt="QR Code Tournoi"
                className="w-full h-full object-contain"
              />
            </div>

            <button
              onClick={() => setQrModalOpen(false)}
              className="w-full py-3 rounded-xl btn-hamra text-xs sm:text-sm font-bold shadow-lg"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
