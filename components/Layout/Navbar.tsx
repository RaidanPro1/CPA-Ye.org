import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t, toggleLanguage, language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { key: 'home', href: '#home' },
    { key: 'news', href: '#news' },
    { key: 'library', href: '#library' },
    { key: 'prices', href: '#prices' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 text-primary hover:text-secondary transition-colors group">
          <img 
            src="/logo.png" 
            alt={t('brandName')} 
            className="h-12 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback if image fails to load (optional, hides broken image icon)
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="text-xl md:text-2xl font-black tracking-tight hidden sm:block">{t('brandName')}</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.key}>
                <a 
                  href={link.href} 
                  className="text-dark font-bold hover:text-accent transition-colors relative group"
                >
                  {t(link.key)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4">
             <a 
              href="#report" 
              className="bg-accent text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-accent/30 hover:bg-[#e67e22] hover:-translate-y-1 transition-all duration-300"
            >
              {t('report')}
            </a>
            
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 border-2 border-primary text-primary px-4 py-1.5 rounded-full font-bold hover:bg-primary hover:text-white transition-all"
            >
              <Globe size={18} />
              {language === 'ar' ? 'English' : 'العربية'}
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-xl">
          <ul className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.key}>
                <a 
                  href={link.href} 
                  className="block text-dark font-bold hover:text-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
            <li className="pt-2 border-t border-gray-100">
              <a 
                href="#report" 
                className="block text-center bg-accent text-white py-2 rounded-lg font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('report')}
              </a>
            </li>
            <li>
              <button 
                onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
                className="w-full flex justify-center items-center gap-2 border border-primary text-primary py-2 rounded-lg font-bold"
              >
                <Globe size={18} />
                {language === 'ar' ? 'English' : 'العربية'}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};