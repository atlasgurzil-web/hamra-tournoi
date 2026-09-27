import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trophy, ArrowLeft, Calendar, Clock, MapPin, Gauge, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTournaments } from '../context/TournamentContext';

export const VercelNouveauTournoiPage: React.FC = () => {
  const navigate = useNavigate();
  const { addTournament } = useTournaments();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    start_time: '21:30',
    location: 'Café Dardara, Annaba',
    cadence: '5+3',
    rounds: 7,
    max_players: 40,
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#141413]">
      {/* Back button */}
      <div>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#9C968B] hover:text-[#D97757] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour à l'Espace Organisateur</span>
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-[#2A2823] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97757]/15 border border-[#D97757]/30 text-[#E2896B] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
          <Trophy className="w-3.5 h-3.5" />
          <span>Configuration de Compétition</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#F5F2EB]">
          Créer un Nouveau Tournoi
        </h1>
        <p className="text-sm text-[#9C968B] mt-1 font-sans">
          Paramétrez les critères techniques, la cadence de jeu et activez la jauge anti-surréservation en temps réel.
        </p>
      </div>

      {isSuccess ? (
        <div className="bg-[#1E1D1A] rounded-3xl border border-[#7E9F80]/40 p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#18261B] text-[#7E9F80] border border-[#7E9F80]/40 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB]">
              Tournoi publié avec succès !
            </h2>
            <p className="text-sm text-[#BDB8AD] mt-2 max-w-lg mx-auto font-sans">
              La page officielle d'inscription est dès à présent accessible en ligne avec jauge dynamique et attribution immédiate de dossards.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to={`/tournoi/${createdSlug}`}
              className="px-6 py-3 rounded-xl btn-claude text-sm font-semibold shadow-xl active:scale-95"
            >
              Voir la page publique du tournoi
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-xl btn-obsidian text-sm font-semibold hover:border-[#D4A373] text-[#D4A373] active:scale-95"
            >
              Revenir au tableau de bord
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-[#1E1D1A] rounded-3xl border border-[#2E2C27] p-6 sm:p-8 space-y-8 shadow-2xl">
          
          {/* General Information */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase text-[#D4A373] tracking-widest flex items-center gap-2">
              <span>01. Identification du Tournoi</span>
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#BDB8AD]">
                Nom officiel du tournoi <span className="text-[#D97757]">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="ex: ♟️ LE CERCLE DES ROIS V ♟️"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#141413] border border-[#2E2C27] text-white text-sm placeholder-[#7D786F] focus:border-[#D97757] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#BDB8AD]">
                Description et Règlement FIDE
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Précisez le cadre du tournoi, arbitrage, règles de départage (Buchholz)..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#141413] border border-[#2E2C27] text-white text-sm placeholder-[#7D786F] focus:border-[#D97757] outline-none"
              />
            </div>
          </div>

          {/* Schedule and Venue */}
          <div className="space-y-4 pt-6 border-t border-[#26241F]">
            <h2 className="text-xs font-mono uppercase text-[#D4A373] tracking-widest flex items-center gap-2">
              <span>02. Planning & Localisation</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#BDB8AD] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D97757]" />
                  <span>Date Début *</span>
                </label>
                <input
                  type="date"
                  name="start_date"
                  required
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#141413] border border-[#2E2C27] text-white text-sm focus:border-[#D97757] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#BDB8AD] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#9C968B]" />
                  <span>Date Fin (Optionnel)</span>
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#141413] border border-[#2E2C27] text-white text-sm focus:border-[#D97757] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#BDB8AD] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D97757]" />
                  <span>Heure de Début *</span>
                </label>
                <input
                  type="time"
                  name="start_time"
                  required
                  value={formData.start_time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#141413] border border-[#2E2C27] text-white text-sm focus:border-[#D97757] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#BDB8AD] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D97757]" />
                <span>Lieu de la compétition *</span>
              </label>
              <input
                type="text"
                name="location"
                required
                placeholder="ex: Café Dardara, Annaba ou Siège Hamra"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#141413] border border-[#2E2C27] text-white text-sm placeholder-[#7D786F] focus:border-[#D97757] outline-none"
              />
            </div>
          </div>

          {/* Technical and Capacity Settings */}
          <div className="space-y-4 pt-6 border-t border-[#26241F]">
            <h2 className="text-xs font-mono uppercase text-[#D4A373] tracking-widest flex items-center gap-2">
              <span>03. Paramètres Techniques & Jauge</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#BDB8AD]">
                  Cadence de jeu
                </label>
                <select
                  name="cadence"
                  value={formData.cadence}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#141413] border border-[#2E2C27] text-white text-sm focus:border-[#D97757] outline-none"
                >
                  <option value="5+3">Blitz 5 min + 3 sec / coup</option>
                  <option value="3+2">Blitz 3 min + 2 sec / coup</option>
                  <option value="10+5">Rapide 10 min + 5 sec / coup</option>
                  <option value="15+10">Rapide 15 min + 10 sec / coup</option>
                  <option value="60+30">Classique 60 min + 30 sec / coup</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#BDB8AD]">
                  Nombre de Rondes
                </label>
                <input
                  type="number"
                  name="rounds"
                  min="3"
                  max="13"
                  value={formData.rounds}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#141413] border border-[#2E2C27] text-white text-sm focus:border-[#D97757] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#BDB8AD] flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-[#D97757]" />
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
                  className="w-full px-4 py-3 rounded-xl bg-[#141413] border border-[#2E2C27] text-white text-sm focus:border-[#D97757] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#BDB8AD]">
                  Frais d'inscription (DZD)
                </label>
                <input
                  type="number"
                  name="registration_fee"
                  min="0"
                  step="50"
                  value={formData.registration_fee}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#141413] border border-[#2E2C27] text-white text-sm focus:border-[#D97757] outline-none"
                />
                <span className="text-[11px] text-[#7D786F] block">
                  0 DZD = Inscription gratuite pour les sociétaires et invités
                </span>
              </div>

              <div className="space-y-1.5 flex flex-col justify-end">
                <div className="p-4 rounded-xl bg-[#141413] border border-[#2E2C27] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#F5F2EB] block">Inscriptions Ouvertes</span>
                    <span className="text-[11px] text-[#7D786F]">Le formulaire sera actif immédiatement</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.registration_open}
                    onChange={(e) => setFormData(prev => ({ ...prev, registration_open: e.target.checked }))}
                    className="w-5 h-5 accent-[#D97757] rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reassurance Features */}
          <div className="bg-[#141413] rounded-2xl p-4 border border-[#2E2C27] flex flex-col sm:flex-row items-center gap-4 text-xs text-[#9C968B]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#7E9F80] shrink-0" />
              <span>Garantie anti-surréservation stricte activée</span>
            </div>
            <div className="hidden sm:block text-[#3B3934]">•</div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4A373] shrink-0" />
              <span>Compatible Swiss-Manager FIDE & FADE</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Link
              to="/dashboard"
              className="px-5 py-3 rounded-xl btn-obsidian text-xs font-semibold text-[#BDB8AD]"
            >
              Annuler
            </Link>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl btn-claude text-xs font-semibold shadow-xl active:scale-95"
            >
              Publier le Tournoi & Activer la Jauge
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
