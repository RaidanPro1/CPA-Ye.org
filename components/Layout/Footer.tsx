import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white pt-16 pb-8 px-6 md:px-16 border-t-4 border-accent">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div>
          <h3 className="text-2xl font-bold text-accent mb-6">{t('footer_about')}</h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            {t('footer_desc')}
          </p>
          <div className="flex gap-4">
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent hover:text-white transition-colors"><Instagram size={20} /></a>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-accent mb-6">{t('home')}</h3>
          <ul className="space-y-3">
            <li><a href="#news" className="text-gray-300 hover:text-accent transition-colors hover:pe-2">{t('news')}</a></li>
            <li><a href="#library" className="text-gray-300 hover:text-accent transition-colors hover:pe-2">{t('library')}</a></li>
            <li><a href="#prices" className="text-gray-300 hover:text-accent transition-colors hover:pe-2">{t('prices')}</a></li>
            <li><a href="#admin" className="text-gray-300 hover:text-accent transition-colors hover:pe-2">{t('admin')}</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-accent mb-6">{t('footer_contact')}</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-300">
              <Mail className="text-accent" size={20} />
              <span>info@cpa-ye.org</span>
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <MapPin className="text-accent" size={20} />
              <span>Taiz, Republic of Yemen</span>
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <Phone className="text-accent" size={20} />
              <span>+967 4 123 456</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-start text-gray-400 text-sm">
        <p>{t('rights')}</p>
        <a 
          href="http://raidan.pro" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1 hover:text-accent transition-colors font-semibold"
        >
          Powered By RaidanPro
        </a>
      </div>
    </footer>
  );
};