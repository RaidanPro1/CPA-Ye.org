import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SERVICES_DATA } from '../../constants';
import { Search, Scale, Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  search: Search,
  balance: Scale,
  bullhorn: Megaphone
};

export const Services: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-6 md:px-16 bg-white relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-primary inline-block relative">
            {t('services_title')}
            <span className="block h-1.5 w-24 bg-accent mx-auto mt-4 rounded-full"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl border-b-4 border-transparent hover:border-accent transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-5 bg-blue-50 rounded-full group-hover:bg-accent/10 transition-colors">
                    <Icon className="w-16 h-16 text-primary group-hover:text-accent transition-colors" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-dark mb-4 text-center">{t(service.titleKey)}</h3>
                <p className="text-gray-600 text-center leading-relaxed text-lg">
                  {t(service.descKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};