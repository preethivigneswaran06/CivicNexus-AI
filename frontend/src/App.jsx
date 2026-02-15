import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import { ComplaintProvider } from './context/ComplaintContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Complaint from './pages/Complaint';
import Policy from './pages/Policy';
import Document from './pages/Document';
import Analytics from './pages/Analytics';
import Admin from './pages/Admin';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = ({ accessibilityMode }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Dashboard accessibilityMode={accessibilityMode} /></PageWrapper>} />
        <Route path="/complaint" element={<PageWrapper><Complaint accessibilityMode={accessibilityMode} /></PageWrapper>} />
        <Route path="/policy" element={<PageWrapper><Policy accessibilityMode={accessibilityMode} /></PageWrapper>} />
        <Route path="/document" element={<PageWrapper><Document accessibilityMode={accessibilityMode} /></PageWrapper>} />
        <Route path="/analytics" element={<PageWrapper><Analytics accessibilityMode={accessibilityMode} /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [accessibilityMode, setAccessibilityMode] = useState(false);

  return (
    <LanguageProvider>
      <ComplaintProvider>
        <Router>
          <div className={`flex min-h-screen bg-[#FDFBF7] transition-colors duration-300 ${accessibilityMode ? 'high-contrast' : ''}`}>
            <Sidebar />

            <div className="flex-1 ml-64 flex flex-col">
              <Header accessibilityMode={accessibilityMode} setAccessibilityMode={setAccessibilityMode} />

              <main className="flex-1 mt-20 overflow-y-auto overflow-x-hidden">
                <AnimatedRoutes accessibilityMode={accessibilityMode} />
              </main>
            </div>
          </div>
        </Router>
      </ComplaintProvider>
    </LanguageProvider>
  );
}

export default App;
