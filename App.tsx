
import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/Layout/Navbar';
import { HeroSlider } from './components/Home/HeroSlider';
import { NewsTicker } from './components/Home/NewsTicker';
import { Services } from './components/Home/Services';
import { NewsSection } from './components/Home/NewsSection';
import { Gallery } from './components/Home/Gallery';
import { Publications } from './components/Home/Publications';
import { PriceList } from './components/Home/PriceList';
import { ReportForm } from './components/Home/ReportForm';
import { TransparencyDashboard } from './components/Home/TransparencyDashboard';
import { RightsGuide } from './components/Home/RightsGuide';
import { Footer } from './components/Layout/Footer';
import { AdminDashboard } from './components/Admin/AdminDashboard';

// Simple Hash Router implementation for the demo
const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || '#home');

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (route === '#admin') {
    return (
      <DataProvider>
        <LanguageProvider>
          <AdminDashboard />
        </LanguageProvider>
      </DataProvider>
    );
  }

  return (
    <DataProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <NewsTicker />
            <HeroSlider />
            <TransparencyDashboard />
            <Services />
            <NewsSection />
            <PriceList />
            <RightsGuide />
            <Gallery />
            <ReportForm />
            <Publications />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </DataProvider>
  );
};

export default App;