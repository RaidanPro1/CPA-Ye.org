
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DASHBOARD_STATS, MOCK_PRICES } from '../../constants';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';

export const TransparencyDashboard: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 px-6 md:px-16 bg-gray-100 border-b border-gray-200">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-dark inline-flex items-center gap-3">
            <TrendingUp className="text-accent" />
            {t('transparency_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {DASHBOARD_STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center justify-center relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-2 ${stat.color}`}></div>
              <h3 className="text-4xl font-black text-dark mb-2">{stat.value}</h3>
              <p className="text-gray-500 font-medium">{t(stat.labelKey)}</p>
            </motion.div>
          ))}
        </div>

        {/* Top Violations List (Mock) */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <AlertTriangle className="text-red-500" />
            {t('top_violations')}
          </h3>
          <div className="space-y-4">
            {MOCK_PRICES.slice(0, 3).map((item, idx) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-bold text-dark">
                  {language === 'ar' ? item.nameAr : item.nameEn}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
                    {language === 'ar' ? 'بلاغات متكررة' : 'Frequent Reports'}
                  </span>
                  <span className="font-bold text-red-500">
                     {(4 - idx) * 15} {language === 'ar' ? 'بلاغ' : 'Reports'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
