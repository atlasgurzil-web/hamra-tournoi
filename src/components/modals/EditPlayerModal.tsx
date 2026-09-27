import React, { useState } from 'react';
import { X, UserCheck, ShieldCheck } from 'lucide-react';
import { PlayerRegistration } from '../../types/tournament';

interface EditPlayerModalProps {
  player: PlayerRegistration;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: Partial<PlayerRegistration>) => void;
}

export const EditPlayerModal: React.FC<EditPlayerModalProps> = ({
  player,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    first_name: player.first_name,
    last_name: player.last_name,
    birth_date: player.birth_date,
    sex: player.sex,
    club: player.club || '',
    fide_id: player.fide_id || '',
    rating: player.rating || 0,
    phone: player.phone || '',
    email: player.email || '',
    bib_number: player.bib_number
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      rating: Number(formData.rating),
      bib_number: Number(formData.bib_number)
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
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-black text-xl text-white">
              Modifier la Fiche Compétiteur
            </h3>
            <p className="text-xs text-slate-400">
              Dossard #{player.bib_number} • {player.last_name.toUpperCase()} {player.first_name}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Nom *</label>
              <input
                type="text"
                required
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
                value={formData.club}
                onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm focus:border-red-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">FIDE ID</label>
              <input
                type="text"
                value={formData.fide_id}
                onChange={(e) => setFormData({ ...formData, fide_id: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-white text-sm focus:border-red-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Cote Elo</label>
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
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">N° Dossard</label>
              <input
                type="number"
                min="1"
                value={formData.bib_number}
                onChange={(e) => setFormData({ ...formData, bib_number: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-white font-mono font-bold text-sm focus:border-red-500 outline-none"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Téléphone</label>
              <input
                type="tel"
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
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
