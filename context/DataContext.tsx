
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NewsItem, PriceItem, AppSettings, ReportItem, TickerSettings } from '../types';
import { NEWS_DATA, MOCK_PRICES } from '../constants';

interface DataContextType {
  news: NewsItem[];
  prices: PriceItem[];
  galleryImages: string[];
  appSettings: AppSettings;
  reports: ReportItem[];
  tickerSettings: TickerSettings;
  
  addNews: (item: Omit<NewsItem, 'id'>) => void;
  deleteNews: (id: number) => void;
  updatePrice: (id: number, newPrice: number) => void;
  addGalleryImage: (url: string) => void;
  removeGalleryImage: (url: string) => void;
  updateAppSettings: (settings: AppSettings) => void;
  addReport: (report: Omit<ReportItem, 'id' | 'timestamp' | 'status'>) => void;
  updateReportStatus: (id: number, status: ReportItem['status']) => void;
  updateTickerSettings: (settings: TickerSettings) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DEFAULT_APP_SETTINGS: AppSettings = {
  maintenanceMode: false,
  minVersion: "1.0.0",
  latestVersion: "1.0.2",
  announcementAr: "",
  announcementEn: "",
  apiEndpoint: "https://api.cpa-ye.org/v1"
};

const DEFAULT_GALLERY = [
  "https://picsum.photos/seed/gal1/400/400",
  "https://picsum.photos/seed/gal2/400/400",
  "https://picsum.photos/seed/gal3/400/400",
  "https://picsum.photos/seed/gal4/400/400"
];

const DEFAULT_TICKER: TickerSettings = {
  customTextAr: "+++ عاجل: حملة ميدانية لمراقبة أسعار المواد الغذائية في مديرية القاهرة +++",
  customTextEn: "+++ Urgent: Field campaign to monitor food prices in Al-Qahirah district +++",
  showPrices: true
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- Load State from LocalStorage ---
  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('cpa_news');
    return saved ? JSON.parse(saved) : NEWS_DATA;
  });

  const [prices, setPrices] = useState<PriceItem[]>(() => {
    const saved = localStorage.getItem('cpa_prices');
    return saved ? JSON.parse(saved) : MOCK_PRICES;
  });

  const [galleryImages, setGalleryImages] = useState<string[]>(() => {
    const saved = localStorage.getItem('cpa_gallery');
    return saved ? JSON.parse(saved) : DEFAULT_GALLERY;
  });

  const [appSettings, setAppSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('cpa_app_settings');
    return saved ? JSON.parse(saved) : DEFAULT_APP_SETTINGS;
  });

  const [reports, setReports] = useState<ReportItem[]>(() => {
    const saved = localStorage.getItem('cpa_reports');
    return saved ? JSON.parse(saved) : [];
  });

  const [tickerSettings, setTickerSettings] = useState<TickerSettings>(() => {
    const saved = localStorage.getItem('cpa_ticker');
    return saved ? JSON.parse(saved) : DEFAULT_TICKER;
  });

  // --- Persist State ---
  useEffect(() => localStorage.setItem('cpa_news', JSON.stringify(news)), [news]);
  useEffect(() => localStorage.setItem('cpa_prices', JSON.stringify(prices)), [prices]);
  useEffect(() => localStorage.setItem('cpa_gallery', JSON.stringify(galleryImages)), [galleryImages]);
  useEffect(() => localStorage.setItem('cpa_app_settings', JSON.stringify(appSettings)), [appSettings]);
  useEffect(() => localStorage.setItem('cpa_reports', JSON.stringify(reports)), [reports]);
  useEffect(() => localStorage.setItem('cpa_ticker', JSON.stringify(tickerSettings)), [tickerSettings]);

  // --- Actions ---
  const addNews = (item: Omit<NewsItem, 'id'>) => {
    const newItem = { ...item, id: Date.now() };
    setNews([newItem, ...news]);
  };

  const deleteNews = (id: number) => {
    setNews(news.filter(n => n.id !== id));
  };

  const updatePrice = (id: number, newPrice: number) => {
    setPrices(prices.map(p => 
      p.id === id 
        ? { ...p, price: newPrice, lastUpdated: new Date().toISOString().split('T')[0] } 
        : p
    ));
  };

  const addGalleryImage = (url: string) => {
    setGalleryImages([...galleryImages, url]);
  };

  const removeGalleryImage = (url: string) => {
    setGalleryImages(galleryImages.filter(img => img !== url));
  };

  const updateAppSettings = (settings: AppSettings) => {
    setAppSettings(settings);
  };

  const addReport = (reportData: Omit<ReportItem, 'id' | 'timestamp' | 'status'>) => {
    const newReport: ReportItem = {
      ...reportData,
      id: Date.now(),
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    setReports([newReport, ...reports]);
  };

  const updateReportStatus = (id: number, status: ReportItem['status']) => {
    setReports(reports.map(r => r.id === id ? { ...r, status } : r));
  };

  const updateTickerSettings = (settings: TickerSettings) => {
    setTickerSettings(settings);
  };

  return (
    <DataContext.Provider value={{
      news, prices, galleryImages, appSettings, reports, tickerSettings,
      addNews, deleteNews, updatePrice, addGalleryImage, removeGalleryImage,
      updateAppSettings, addReport, updateReportStatus, updateTickerSettings
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
