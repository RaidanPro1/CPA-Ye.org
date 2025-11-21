
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RIGHTS_DATA } from '../../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Clock, Tag, FileText, AlertOctagon, ChevronDown } from 'lucide-react';

const iconMap = {
  time: Clock,
  tag: Tag,
  invoice: FileText,
  alert: AlertOctagon,
};

export const RightsGuide: React.FC = () => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="py-20 px-6 md:px-16 bg-primary text-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white inline-block relative">
            {t('rights_title')}
            <span className="block h-1.5 w-24 bg-accent mx-auto mt-4 rounded-full"></span>
          </h2>
        </div>

        <div className="space-y-4">
          {RIGHTS_DATA.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = activeId === item.id;

            return (
              <div 
                key={item.id} 
                className={`bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border ${isActive ? 'border-accent' : 'border-white/20'} transition-colors`}
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between p-6 text-start focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${isActive ? 'bg-accent text-white' : 'bg-white/20 text-white'}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold">{t(item.questionKey)}</h3>
                  </div>
                  <ChevronDown 
                    size={24} 
                    className={`transition-transform duration-300 ${isActive ? 'rotate-180 text-accent' : ''}`}
                  />
                </button>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-200 leading-relaxed border-t border-white/10 mx-6 mt-2">
                        {t(item.answerKey)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
