import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trophy, ArrowLeft, Calendar, Clock, MapPin, Gauge, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useTournaments } from '../context/TournamentContext';

export const VercelNouveauTournoiPage: React.FC = () => {
  const { addTournament } = useTournaments();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    start_time: '22:00',
    location: 'Café Dardara, Annaba',
    cadence: '5+3',
    rounds: 7,
    max_players: 50,
    registration_fee: 0,
    registration_open: true
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [createdSlug, setCreatedSlug] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.start_date) {
      alert("Veuillez renseigner le nom et la date du tournoi.");
      return;
    }

    const newTournament = addTournament({
      name: formData.name,
      description: formData.description || "Tournoi d'échecs officiel homologué FIDE organisé par Hamra Annaba Échecs (1944). Système suisse en 7 rondes.",
      start_date: formData.start_date,
      end_date: formData.end_date || formData.start_date,
      start_time: formData.start_time,
      location: formData.location,
      cadence: formData.cadence,
      rounds: formData.rounds,
      max_players: formData.max_players,
      registration_fee: formData.registration_fee,
      registration_open: formData.registration_open,
      status: 'published'
    });

    setCreatedSlug(newTournament.slug);
    setIsSuccess(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-14 space-y-6 sm:space-y-10 pb-28 md:pb-16 bg-[#0A0E17] overflow-x-hidden">
      {/* Back button */}
      <div>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 hover:text-amber-400 transition-colors bg-slate-900/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-800"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
          <span>Retour à l'Espace Organisateur</span>
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-slate-800 pb-6 sm:pb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Configuration de Compétition</span>
        </div>
        <h1 className="font-serif font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight break-words">
          Créer un Nouveau Tournoi
        </h1>
        <p className="text-xs sm:text-base text-slate-300 mt-1 font-medium">
          Paramétrez les critères techniques, la cadence de jeu et activez la jauge anti-surréservation en temps réel.
        </p>
      </div>

      {isSuccess ? (
        <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border-2 border-emerald-500/50 p-6 sm:p-12 text-center space-y-5 sm:space-y-6 shadow-2xl">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-950/80 text-emerald-400 border-2 border-emerald-500 flex items-center justify-center mx-auto shadow-xl">
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-white">
              Tournoi publié avec succès !
            </h2>
            <p className="text-xs sm:text-base text-slate-300 mt-2 max-w-lg mx-auto font-medium">
              La page officielle d'inscription est en ligne avec jauge dynamique et attribution instantanée de dossards.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <Link
              to={`/tournoi/${createdSlug}`}
              className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl btn-hamra text-xs sm:text-base font-extrabold shadow-xl"
            >
              Voir la page publique du tournoi
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl btn-secondary text-xs sm:text-base font-bold"
            >
              Revenir au tableau de bord
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-800 p-4 sm:p-10 space-y-6 sm:space-y-10 shadow-2xl">
          
          {/* General Information */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xs font-mono uppercase text-amber-400 tracking-widest flex items-center gap-2 font-bold">
              <span>01. Identification du Tournoi</span>
            </h2>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Nom officiel du tournoi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="ex: ♟️ LE CERCLE DES ROIS V ♟️"
                value={formData.name}
                onChange={handleChange}
                name="name"
                className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm sm:text-base placeholder-slate-500 focus:border-red-500 outline-none"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Description et Règlement FIDE
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Précisez le cadre du tournoi, arbitrage, règles de départage (Buchholz)..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm sm:text-base placeholder-slate-500 focus:border-red-500 outline-none"
              />
            </div>
          </div>

          {/* Schedule and Venue */}
          <div className="space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-slate-800">
            <h2 className="text-xs font-mono uppercase text-amber-400 tracking-widest flex items-center gap-2 font-bold">
              <span>02. Planning & Localisation</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-red-500" />
                  <span>Date Début *</span>
                </label>
                <input
                  type="date"
                  name="start_date"
                  required
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm sm:text-base focus:border-red-500 outline-none"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Date Fin (Optionnel)</span>
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm sm:text-base focus:border-red-500 outline-none"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Heure de Début *</span>
                </label>
                <input
                  type="time"
                  name="start_time"
                  required
                  value={formData.start_time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm sm:text-base focus:border-red-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>Lieu de la compétition *</span>
              </label>
              <input
                type="text"
                name="location"
                required
                placeholder="ex: Café Dardara, Annaba ou Siège Hamra"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm sm:text-base placeholder-slate-500 focus:border-red-500 outline-none"
              />
            </div>
          </div>

          {/* Technical and Capacity Settings */}
          <div className="space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-slate-800">
            <h2 className="text-xs font-mono uppercase text-amber-400 tracking-widest flex items-center gap-2 font-bold">
              <span>03. Paramètres Techniques & Jauge</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Cadence de jeu
                </label>
                <select
                  name="cadence"
                  value={formData.cadence}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm sm:text-base font-bold focus:border-red-500 outline-none"
                >
                  <option value="5+3">Blitz 5 min + 3 sec / coup</option>
                  <option value="3+2">Blitz 3 min + 2 sec / coup</option>
                  <option value="10+5">Rapide 10 min + 5 sec / coup</option>
                  <option value="15+10">Rapide 15 min + 10 sec / coup</option>
                  <option value="60+30">Classique 60 min + 30 sec / coup</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Nombre de Rondes
                </label>
                <input
                  type="number"
                  name="rounds"
                  min="3"
                  max="13"
                  value={formData.rounds}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm sm:text-base focus:border-red-500 outline-none"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-red-500" />
                  <span>Capacité Maximale *</span>
                </label>
                <input
                  type="number"
                  name="max_players"
                  min="8"
                  max="200"
                  required
                  value={formData.max_players}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm sm:text-base focus:border-red-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Frais d'inscription (DZD)
                </label>
                <input
                  type="number"
                  name="registration_fee"
                  min="0"
                  step="50"
                  value={formData.registration_fee}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm sm:text-base focus:border-red-500 outline-none"
                />
                <span className="text-[11px] sm:text-xs text-slate-400 block">
                  0 DZD = Inscription gratuite pour les sociétaires
                </span>
              </div>

              <div className="space-y-1.5 sm:space-y-2 flex flex-col justify-end">
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#070A10] border border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">Inscriptions Ouvertes</span>
                    <span className="text-[10px] sm:text-xs text-slate-400">Actif immédiatement</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.registration_open}
                    onChange={(e) => setFormData(prev => ({ ...prev, registration_open: e.target.checked }))}
                    className="w-5 h-5 sm:w-6 sm:h-6 accent-red-600 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reassurance Features */}
          <div className="bg-[#070A10] rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
              <span>Garantie anti-surréservation stricte activée</span>
            </div>
            <div className="hidden sm:block text-slate-700">•</div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
              <span>Compatible Swiss-Manager FIDE & FADE</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-3">
            <Link
              to="/dashboard"
              className="text-center px-5 py-3 sm:px-6 sm:py-4 rounded-xl btn-secondary text-xs sm:text-sm font-bold"
            >
              Annuler
            </Link>
            <button
              type="submit"
              className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl btn-hamra text-xs sm:text-base font-extrabold shadow-xl"
            >
              Publier le Tournoi & Activer la Jauge
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
