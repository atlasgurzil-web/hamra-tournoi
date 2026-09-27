import React, { useState } from 'react';
import { X, UserPlus, ShieldCheck } from 'lucide-react';
import { Tournament, PlayerRegistration } from '../../types/tournament';

interface AddPlayerModalProps {
  tournaments: Tournament[];
  defaultTournamentId?: string;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (playerData: Omit<PlayerRegistration, 'id' | 'bib_number' | 'created_at'>) => void;
}

export const AddPlayerModal: React.FC<AddPlayerModalProps> = ({
  tournaments,
  defaultTournamentId,
  isOpen,
  onClose,
  onAdd
}) => {
  const [formData, setFormData] = useState({
    tournament_id: defaultTournamentId || tournaments[0]?.id || '',
    first_name: '',
    last_name: '',
    birth_date: '2000-01-01',
    sex: 'M' as 'M' | 'F',
    club: 'Hamra Annaba',
    fide_id: '',
    rating: 1500,
    phone: '',
    email: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.first_name.trim() || !formData.last_name.trim() || !formData.tournament_id) {
      alert("Veuillez renseigner le nom, le prénom et sélectionner un tournoi.");
      return;
    }

    onAdd({
      tournament_id: formData.tournament_id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      birth_date: formData.birth_date,
      sex: formData.sex,
      club: formData.club || 'Hamra Annaba',
      fide_id: formData.fide_id,
      rating: Number(formData.rating) || 0,
      phone: formData.phone,
      email: formData.email
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
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-black text-xl text-white">
              Inscrire un Nouveau Compétiteur
            </h3>
            <p className="text-xs text-slate-400">
              Ajout direct par l'arbitre avec attribution automatique du dossard.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Tournoi Assigné *</label>
            <select
              value={formData.tournament_id}
              onChange={(e) => setFormData({ ...formData, tournament_id: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm focus:border-red-500 outline-none"
            >
              {tournaments.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.confirmed_count}/{t.max_players})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Nom *</label>
              <input
                type="text"
                required
                placeholder="Ex: Mansouri"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm focus:border-red-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Prénom *</label>
              <input
                type="text"
                required
                placeholder="Ex: Adel"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm focus:border-red-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Date Naissance *</label>
              <input
                type="date"
                required
                value={formData.birth_date}
                onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm focus:border-red-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Genre *</label>
              <select
                value={formData.sex}
                onChange={(e) => setFormData({ ...formData, sex: e.target.value as 'M' | 'F' })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm focus:border-red-500 outline-none"
              >
                <option value="M">Masculin (M)</option>
                <option value="F">Féminin (F)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Club Affilié</label>
              <input
                type="text"
                placeholder="Ex: Hamra Annaba"
                value={formData.club}
                onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm focus:border-red-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Code FIDE ID</label>
              <input
                type="text"
                placeholder="Ex: 7981234"
                value={formData.fide_id}
                onChange={(e) => setFormData({ ...formData, fide_id: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm focus:border-red-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Cote Elo FIDE</label>
              <input
                type="number"
                min="0"
                max="3200"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-amber-400 font-mono font-bold text-sm focus:border-red-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Téléphone</label>
              <input
                type="tel"
                placeholder="Ex: 05 50 00 00 00"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm focus:border-red-500 outline-none"
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
              Inscrire le compétiteur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
