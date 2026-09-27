import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0F172A] border border-red-500/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-red-950/80 border border-red-500/50 text-red-500 flex items-center justify-center mx-auto shadow-lg">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="text-center space-y-2">
          <h3 className="font-serif font-black text-xl sm:text-2xl text-white">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 rounded-xl btn-secondary text-xs sm:text-sm font-bold"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-red-600/30"
          >
            Confirmer la suppression
          </button>
        </div>
      </div>
    </div>
  );
};
