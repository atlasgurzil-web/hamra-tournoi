import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileDock } from './components/layout/MobileDock';
import { RegistrationModal } from './components/ui/RegistrationModal';

import { HomePage } from './pages/HomePage';
import { ClubPage } from './pages/ClubPage';
import { EcolePage } from './pages/EcolePage';
import { TournoisPage } from './pages/TournoisPage';
import { TournoiDetailPage } from './pages/TournoiDetailPage';
import { JoueursPage } from './pages/JoueursPage';
import { JoueurDetailPage } from './pages/JoueurDetailPage';
import { EntraineursPage } from './pages/EntraineursPage';
import { ResultatsPage } from './pages/ResultatsPage';
import { CalendrierPage } from './pages/CalendrierPage';
import { ActualitesPage } from './pages/ActualitesPage';
import { ActualiteDetailPage } from './pages/ActualiteDetailPage';
import { GaleriePage } from './pages/GaleriePage';
import { ContactPage } from './pages/ContactPage';

export const App: React.FC = () => {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#141413] text-[#F5F2EB] selection:bg-[#D97757] selection:text-white">
          <Header onOpenRegisterModal={() => setRegisterModalOpen(true)} />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/club" element={<ClubPage />} />
              <Route path="/ecole" element={<EcolePage />} />
              <Route path="/tournois" element={<TournoisPage />} />
              <Route path="/tournois/:slug" element={<TournoiDetailPage />} />
              <Route path="/joueurs" element={<JoueursPage />} />
              <Route path="/joueurs/:slug" element={<JoueurDetailPage />} />
              <Route path="/entraineurs" element={<EntraineursPage />} />
              <Route path="/resultats" element={<ResultatsPage />} />
              <Route path="/calendrier" element={<CalendrierPage />} />
              <Route path="/actualites" element={<ActualitesPage />} />
              <Route path="/actualites/:slug" element={<ActualiteDetailPage />} />
              <Route path="/galerie" element={<GaleriePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>

          <Footer />
          <MobileDock />

          <RegistrationModal
            isOpen={registerModalOpen}
            onClose={() => setRegisterModalOpen(false)}
          />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
