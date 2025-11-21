import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/market/1920/1080',
    titleKey: 'heroTitle1',
    subKey: 'heroSub1',
    color: 'bg-primary/85'
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/inspection/1920/1080',
    titleKey: 'heroTitle2',
    subKey: 'heroSub2',
    color: 'bg-secondary/80'
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/rights/1920/1080',
    titleKey: 'heroTitle3',
    subKey: 'heroSub3',
    color: 'bg-accent/80'
  }
];

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, dir } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const paginate = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-dark" id="home">
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${SLIDES[currentIndex].image})` }}
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentIndex === 0 ? 'from-primary/90 to-secondary/70' : currentIndex === 1 ? 'from-secondary/90 to-primary/70' : 'from-accent/90 to-orange-700/70'}`} />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
            <div className="max-w-4xl">
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
              >
                {t(SLIDES[currentIndex].titleKey)}
              </motion.h1>
              
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-2xl text-gray-100 mb-10 font-medium"
              >
                {t(SLIDES[currentIndex].subKey)}
              </motion.p>
              
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex justify-center gap-4 flex-wrap"
              >
                <a 
                  href="#report"
                  className="bg-accent text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-[#e67e22] hover:scale-105 transition-all"
                >
                  {t('cta_report')}
                </a>
                <a 
                  href="#prices"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all"
                >
                  {t('cta_prices')}
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-accent w-8' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};