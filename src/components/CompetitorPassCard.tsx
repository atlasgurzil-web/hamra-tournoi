import React, { useRef, useState } from 'react';
import { Crown, ShieldCheck, QrCode, Download, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { Tournament, PlayerRegistration } from '../types/tournament';

interface CompetitorPassCardProps {
  player: {
    fullName: string;
    bibNumber: number;
    club?: string;
    fide_id?: string;
    rating?: number;
    sex?: 'M' | 'F';
  };
  tournament: Tournament;
  onClose: () => void;
}

export const CompetitorPassCard: React.FC<CompetitorPassCardProps> = ({ player, tournament, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Subtle 3D tilt effect on desktop mouse move (Rimowa tactile feel)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = -((y - centerY) / centerY) * 7;
    const rotY = ((x - centerX) / centerX) * 7;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const formattedBib = player.bibNumber < 10 ? `0${player.bibNumber}` : `${player.bibNumber}`;
  const passSerial = `FIDE-HA-${tournament.slug.substring(0, 8).toUpperCase()}-${formattedBib}`;

  const handlePrintOrSave = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="max-w-lg w-full my-auto space-y-4">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between text-white px-2">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Pass Officiel d'Émargement FIDE</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tactile VIP Pass Card (Rimowa / Apple Card Inspiration) */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.15s ease-out'
          }}
          className="relative w-full rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#131B2E] via-[#0B0F19] to-[#070A10] border-2 border-amber-500/40 shadow-2xl shadow-red-950/40 overflow-hidden select-none"
        >
          {/* Holographic Refraction Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/20 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/15 blur-[80px] rounded-full pointer-events-none"></div>

          {/* Micro Chessboard Texture Watermark */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `repeating-conic-gradient(#fff 0% 25%, transparent 0% 50%)`,
              backgroundSize: '32px 32px'
            }}
          ></div>

          {/* Pass Card Header */}
          <div className="relative z-10 flex items-start justify-between gap-4 pb-6 border-b border-slate-750/70">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1 border-2 border-red-600 flex items-center justify-center shrink-0 shadow-md">
                <img
                  src="/logo_hamra_annaba.png"
                  alt="Hamra Annaba 1944"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-black text-white text-base tracking-wide block">
                  HAMRA ANNABA ÉCHECS
                </span>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest block">
                  FONDÉ EN 1944 • HOMOLOGUÉ FIDE
                </span>
              </div>
            </div>

            {/* Official Foil Chip Pill */}
            <div className="px-2.5 py-1 rounded-md bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-400/40 text-[10px] font-mono font-black text-amber-300 uppercase tracking-widest shrink-0">
              PASS OFFICIEL
            </div>
          </div>

          {/* Pass Body Content */}
          <div className="relative z-10 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            
            {/* Player Data */}
            <div className="sm:col-span-2 space-y-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">Compétiteur</span>
                <span className="font-serif font-black text-xl sm:text-2xl text-white tracking-wide block">
                  {player.fullName}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">Club Affilié</span>
                  <span className="font-bold text-slate-200 block truncate">{player.club || 'Hamra Annaba'}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">ID FIDE & Elo</span>
                  <span className="font-mono font-bold text-amber-400 block">
                    {player.fide_id ? `${player.fide_id}` : 'NC'} • {player.rating ? `${player.rating}` : 'NC'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">Tournoi Assigné</span>
                <span className="font-bold text-red-400 text-xs block truncate">{tournament.name}</span>
              </div>
            </div>

            {/* Embossed Metallic Dossard Display */}
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#070A10]/80 border border-slate-700/80 shadow-inner">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">Dossard N°</span>
              <span className="font-mono font-black text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 block tracking-tight my-1 drop-shadow-md">
                #{player.bibNumber}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> Place Assurée
              </span>
            </div>

          </div>

          {/* Pass Footer Bar with QR Code */}
          <div className="relative z-10 pt-4 border-t border-slate-750/70 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider block">IDENTIFIANT UNIQUE D'ÉMARGEMENT</span>
              <span className="text-xs font-mono font-bold text-white tracking-widest block">{passSerial}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Présentez ce badge à la table d'arbitrage FIDE</span>
            </div>

            {/* Micro QR Code */}
            <div className="w-14 h-14 bg-white p-1 rounded-xl shadow-lg border-2 border-red-600 shrink-0 flex items-center justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(passSerial)}`}
                alt="QR Code Dossard"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handlePrintOrSave}
            className="flex-1 py-3.5 px-6 rounded-2xl btn-hamra text-sm font-bold shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger / Imprimer mon Pass</span>
          </button>
          <button
            onClick={onClose}
            className="sm:w-32 py-3.5 px-4 rounded-2xl btn-secondary text-sm font-bold cursor-pointer"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
