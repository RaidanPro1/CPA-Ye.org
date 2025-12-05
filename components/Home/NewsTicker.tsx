
import React, { useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { motion } from 'framer-motion';

export const NewsTicker: React.FC = () => {
  const { language, dir } = useLanguage();
  const { tickerSettings, prices } = useData();

  // Construct the full string: Custom Message + (Optional) Price List
  const tickerContent = useMemo(() => {
    let text = language === 'ar' ? tickerSettings.customTextAr : tickerSettings.customTextEn;

    if (tickerSettings.showPrices) {
      const priceString = prices.map(p => {
        const name = language === 'ar' ? p.nameAr : p.nameEn;
        return `${name}: ${p.price.toLocaleString()} YER`;
      }).join("  |  ");
      
      text += `  ***  ${language === 'ar' ? 'أسعار السوق اليوم:' : 'Today Market Prices:'} ${priceString}  ***`;
    }

    return text;
  }, [tickerSettings, prices, language]);

  return (
    <div className="bg-primary text-white py-3 overflow-hidden relative z-40 border-b border-secondary">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="inline-block"
          animate={{ x: dir === 'rtl' ? ['-100%', '100%'] : ['100%', '-100%'] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          <span className="text-lg font-bold px-4 tracking-wide">
            {tickerContent}
          </span>
        </motion.div>
      </div>
    </div>
  );
};
