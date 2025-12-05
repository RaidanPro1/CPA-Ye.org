import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';

export const PriceList: React.FC = () => {
  const { t, language } = useLanguage();
  const { prices } = useData();

  return (
    <section id="prices" className="py-20 px-6 md:px-16 bg-white">
      <div className="container mx-auto">
         <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-primary inline-block relative">
            {t('cta_prices')}
            <span className="block h-1.5 w-24 bg-accent mx-auto mt-4 rounded-full"></span>
          </h2>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
          <table className="w-full min-w-[600px]">
            <thead className="bg-primary text-white">
              <tr>
                <th className="py-4 px-6 text-start">#</th>
                <th className="py-4 px-6 text-start">{t('product_name')}</th>
                <th className="py-4 px-6 text-start">{t('price')} (YER)</th>
                <th className="py-4 px-6 text-start">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((item, idx) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                  <td className="py-4 px-6 font-bold text-gray-400">{item.code}</td>
                  <td className="py-4 px-6 font-bold text-dark">
                    {language === 'ar' ? item.nameAr : item.nameEn}
                  </td>
                  <td className="py-4 px-6 font-bold text-accent text-lg">{item.price.toLocaleString()}</td>
                  <td className="py-4 px-6 text-gray-500 text-sm">{item.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};