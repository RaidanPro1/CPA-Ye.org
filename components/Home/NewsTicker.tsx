import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

export const NewsTicker: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <div className="bg-primary text-white py-3 overflow-hidden relative z-40 border-b border-secondary">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="inline-block"
          animate={{ x: dir === 'rtl' ? ['-100%', '100%'] : ['100%', '-100%'] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          <span className="text-lg font-bold px-4">
            {t('tickerText')}
          </span>
        </motion.div>
      </div>
    </div>
  );
};