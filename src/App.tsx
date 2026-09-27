import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TournamentProvider } from './context/TournamentContext';
import { VercelNavbar } from './components/VercelNavbar';
import { VercelFooter } from './components/VercelFooter';

import { VercelHomePage } from './pages/VercelHomePage';
import { VercelTournamentDetailPage } from './pages/VercelTournamentDetailPage';
import { VercelDashboardPage } from './pages/VercelDashboardPage';
import { VercelJoueursPage } from './pages/VercelJoueursPage';
import { VercelNouveauTournoiPage } from './pages/VercelNouveauTournoiPage';

export const App: React.FC = () => {
  return (
    <TournamentProvider>
      <Router>
        <div className="flex flex-col min-h-screen w-full max-w-[100vw] overflow-x-clip bg-[#0A0E17] text-slate-100 selection:bg-red-600 selection:text-white font-sans antialiased">
          {/* Official Vercel Tournament Header */}
          <VercelNavbar />

          <main className="flex-grow w-full max-w-full overflow-x-hidden">
            <Routes>
              {/* Homepage: Live Tournaments List with Anti-Overbooking Gauges */}
              <Route path="/" element={<VercelHomePage />} />
              <Route path="/tournois" element={<Navigate to="/" replace />} />

              {/* Tournament Registration & Detail Pages */}
              <Route path="/tournoi/:slug" element={<VercelTournamentDetailPage />} />
              <Route path="/tournois/:slug" element={<VercelTournamentDetailPage />} />

              {/* Organizer Dashboard & Swiss-Manager Exports */}
              <Route path="/dashboard" element={<VercelDashboardPage />} />
              <Route path="/dashboard/joueurs" element={<VercelJoueursPage />} />
              <Route path="/dashboard/tournois/nouveau" element={<VercelNouveauTournoiPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Official Vercel Tournament Footer */}
          <VercelFooter />
        </div>
      </Router>
    </TournamentProvider>
  );
};

export default App;
