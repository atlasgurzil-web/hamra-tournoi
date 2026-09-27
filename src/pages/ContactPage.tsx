import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { SeoHead } from '../components/common/SeoHead';
import { clubData } from '../data/clubData';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Renseignement Inscription');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      <SeoHead
        title="Contact & Localisation à Annaba"
        description="Coordonnées officielles, formulaire d'adhésion et plan d'accès à la salle du club d'échecs Hamra Annaba (Complexe Sportif, Annaba)."
      />

      <Breadcrumbs items={[{ label: "Contact & Adhésion" }]} />

      <SectionTitle
        badge="Nous Rencontrer"
        title="Contact & Localisation à Annaba"
        subtitle="Une question sur nos cours, les tournois ou les adhésions ? Contactez notre équipe directement."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info & Access */}
        <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="font-display font-extrabold text-xl text-white border-l-4 border-hamra-600 pl-3">
            Coordonnées Officielles
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <MapPin className="w-5 h-5 text-hamra-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-display">Adresse de la Salle :</strong>
                <span className="text-slate-300">{clubData.address}</span>
                <span className="text-slate-500 block text-xs mt-0.5">{clubData.addressDetails}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <Phone className="w-5 h-5 text-hamra-400 shrink-0" />
              <div>
                <strong className="text-white block font-display">Téléphone :</strong>
                <span className="text-slate-300">{clubData.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <Mail className="w-5 h-5 text-hamra-400 shrink-0" />
              <div>
                <strong className="text-white block font-display">Email :</strong>
                <span className="text-slate-300">{clubData.email}</span>
              </div>
            </div>
          </div>

          {/* Interactive Map Placeholder with Annaba coordinates */}
          <div className="pt-2">
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>Plan d'accès – Annaba</span>
                <span className="text-hamra-400">Wilaya d'Annaba</span>
              </div>
              <div className="aspect-[16/9] bg-slate-900 rounded-xl flex items-center justify-center p-4 text-center border border-slate-800 relative">
                <div className="absolute inset-0 bg-chess-pattern opacity-10"></div>
                <div className="space-y-1 relative z-10">
                  <MapPin className="w-8 h-8 text-hamra-500 mx-auto animate-bounce" />
                  <span className="text-xs font-bold text-white block">Salle de Jeu Hamra Annaba</span>
                  <span className="text-[11px] text-slate-400 block">Centre-ville d'Annaba, Algérie</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-display font-extrabold text-xl text-white">
                Envoyer un Message au Club
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nom et Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom complet"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-hamra-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Numéro de Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 XX XX XX XX"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-hamra-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.dz"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-hamra-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Objet du Message
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-hamra-500"
                >
                  <option value="Renseignement Inscription">Renseignement Inscription École d'Échecs</option>
                  <option value="Inscription Tournoi">Question sur un Tournoi officiel</option>
                  <option value="Section Adultes">Adhésion Section Adultes & Loisir</option>
                  <option value="Partenariat">Partenariat & Presse</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Votre Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Posez votre question ou détaillez votre demande..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-hamra-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-hamra-600 to-hamra-700 hover:from-hamra-500 hover:to-hamra-600 text-white font-extrabold text-sm shadow-club flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer mon Message</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-12 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">
                Message Envoyé avec Succès !
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
                Merci <strong>{name}</strong>. Notre secrétariat vous répondra dans les plus brefs délais.
              </p>
              <button
                onClick={() => setSent(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700"
              >
                Envoyer un autre message
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
