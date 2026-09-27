import React, { useState } from 'react';
import { X, Trophy, Calendar, MapPin, Clock, Gauge } from 'lucide-react';
import { Tournament } from '../../types/tournament';

interface EditTournamentModalProps {
  tournament: Tournament;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: Partial<Tournament>) => void;
}

export const EditTournamentModal: React.FC<EditTournamentModalProps> = ({
  tournament,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: tournament.name,
    description: tournament.description,
    start_date: tournament.start_date,
    end_date: tournament.end_date || tournament.start_date,
    start_time: tournament.start_time,
    location: tournament.location,
    cadence: tournament.cadence,
    rounds: tournament.rounds,
    max_players: tournament.max_players,
    registration_fee: tournament.registration_fee,
    registration_open: tournament.registration_open,
    status: tournament.status
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      rounds: Number(formData.rounds),
      max_players: Number(formData.max_players),
      registration_fee: Number(formData.registration_fee)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0F172A] border border-slate-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-xl w-full my-auto space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-black text-xl text-white">
              Modifier le Tournoi
            </h3>
            <p className="text-xs text-slate-400">
              Paramètres techniques, calendrier et capacité de la salle.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Nom du Tournoi *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm focus:border-red-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Description & Règlement</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm focus:border-red-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Date Début *</label>
              <input
                type="date"
                required
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#070A10] border border-slate-700 text-white text-xs sm:text-sm focus:border-red-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Date Fin</label>
              <input
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#070A10] border border-slate-700 text-white text-xs sm:text-sm focus:border-red-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Heure Début *</label>
              <input
                type="time"
                required
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#070A10] border border-slate-700 text-white text-xs sm:text-sm focus:border-red-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Lieu de la Compétition *</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm focus:border-red-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Cadence</label>
              <input
                type="text"
                value={formData.cadence}
                onChange={(e) => setFormData({ ...formData, cadence: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm focus:border-red-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Rondes</label>
              <input
                type="number"
                min="3"
                max="13"
                value={formData.rounds}
                onChange={(e) => setFormData({ ...formData, rounds: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm focus:border-red-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Capacité Max *</label>
              <input
                type="number"
                min="8"
                max="200"
                required
                value={formData.max_players}
                onChange={(e) => setFormData({ ...formData, max_players: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-[#070A10] border border-slate-700 text-amber-400 font-mono font-bold text-sm focus:border-red-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Statut du Tournoi</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm focus:border-red-500 outline-none"
              >
                <option value="published">Publié (Actif)</option>
                <option value="ongoing">En Cours (Rondes)</option>
                <option value="completed">Terminé (Archivé)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#070A10] border border-slate-700 mt-auto">
              <span className="text-xs font-bold text-slate-200">Inscriptions Ouvertes</span>
              <input
                type="checkbox"
                checked={formData.registration_open}
                onChange={(e) => setFormData({ ...formData, registration_open: e.target.checked })}
                className="w-5 h-5 accent-red-600 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl btn-secondary text-xs sm:text-sm font-bold"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl btn-hamra text-xs sm:text-sm font-bold shadow-xl"
            >
              Mettre à jour le Tournoi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
