import React from 'react';

export const VercelFooter: React.FC = () => {
  return (
    <footer className="bg-[#111110] text-[#9C968B] border-t border-[#26241F] py-8 mt-16 text-center text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
        <div className="flex items-center gap-2">
          <span className="font-serif text-base font-semibold text-[#F5F2EB] tracking-wide">HAMRA ANNABA ÉCHECS</span>
          <span className="text-[#D4A373] font-mono">— Fondé en 1944</span>
        </div>
        <p className="text-[#9C968B]">
          Homologation FIDE & exports certifiés Swiss-Manager.
        </p>
        <p className="text-[#7D786F] font-mono">
          © {new Date().getFullYear()} Hamra Annaba. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};
