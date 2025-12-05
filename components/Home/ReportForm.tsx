
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { MapPin, Send, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ReportForm: React.FC = () => {
  const { t, language } = useLanguage();
  const { addReport, prices } = useData(); // Use live prices from context

  const [loadingLoc, setLoadingLoc] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [location, setLocation] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>(''); // Stores product name
  const [officialPrice, setOfficialPrice] = useState<number>(0);
  const [observedPrice, setObservedPrice] = useState<number | string>('');
  const [shopName, setShopName] = useState('');
  const [details, setDetails] = useState('');
  
  const [showDiff, setShowDiff] = useState(false);

  const handleGetLocation = () => {
    setLoadingLoc(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
          setLoadingLoc(false);
        },
        () => {
          setLoadingLoc(false);
          alert("Could not retrieve location.");
        }
      );
    } else {
      setLoadingLoc(false);
      alert("Geolocation not supported");
    }
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    const product = prices.find(p => p.id === id);
    if (product) {
      setSelectedProduct(language === 'ar' ? product.nameAr : product.nameEn);
      setOfficialPrice(product.price);
    } else {
      setSelectedProduct('');
      setOfficialPrice(0);
    }
  };

  const handlePriceComparison = (val: string) => {
    setObservedPrice(val);
    if (officialPrice > 0 && val) {
      setShowDiff(true);
    } else {
      setShowDiff(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopName || !selectedProduct) {
      alert(t('Please fill required fields'));
      return;
    }

    setSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      addReport({
        productName: selectedProduct,
        shopName: shopName,
        location: location || 'Not Specified',
        officialPrice: officialPrice,
        observedPrice: Number(observedPrice) || 0,
        details: details
      });

      setSubmitting(false);
      setSuccess(true);
      
      // Reset Form
      setShopName('');
      setDetails('');
      setObservedPrice('');
      setLocation('');
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  const priceDifference = Number(observedPrice) - officialPrice;
  const isViolation = priceDifference > 0;

  return (
    <section id="report" className="py-20 px-6 md:px-16 bg-light">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-secondary p-10 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 z-0"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                 <Send size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('report_title')}</h3>
              <p className="opacity-90">{t('heroSub1')}</p>
            </div>
          </div>
          
          <div className="md:w-2/3 p-8 md:p-12 relative">
            {success ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20"
               >
                 <CheckCircle size={80} className="text-green-500 mb-4" />
                 <h3 className="text-2xl font-bold text-dark">{t('Report Submitted!') || "تم إرسال البلاغ!"}</h3>
                 <p className="text-gray-500">{t('Thank you for your cooperation') || "شكراً لتعاونكم معنا"}</p>
               </motion.div>
            ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Comparison Section */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-6">
                 <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                    <CheckCircle size={18} /> {language === 'ar' ? 'قارن السعر قبل الإبلاغ' : 'Compare Before Reporting'}
                 </h4>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">{t('product_name')}</label>
                      <select 
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-accent outline-none"
                        onChange={handleProductChange}
                        required
                      >
                        <option value="">{language === 'ar' ? 'اختر المنتج...' : 'Select Product...'}</option>
                        {prices.map(p => (
                          <option key={p.id} value={p.id}>
                            {language === 'ar' ? p.nameAr : p.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">{t('price')} (YER)</label>
                       <input 
                        type="text" 
                        value={officialPrice > 0 ? officialPrice.toLocaleString() : ''} 
                        disabled 
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 border border-transparent text-gray-600 font-bold" 
                       />
                    </div>
                 </div>

                 <AnimatePresence>
                    {officialPrice > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4"
                      >
                         <label className="block text-sm font-bold text-gray-700 mb-2">{t('observed_price')}</label>
                         <input 
                            type="number" 
                            onChange={(e) => handlePriceComparison(e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg bg-white border-2 outline-none transition-colors ${isViolation ? 'border-red-300 focus:border-red-500' : 'border-green-300 focus:border-green-500'}`}
                            placeholder="Enter price you found..."
                         />
                         
                         {showDiff && (
                           <div className={`mt-3 p-3 rounded-lg flex items-center gap-3 ${isViolation ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                              {isViolation ? <AlertTriangle size={20} /> : <CheckCircle size={20} />}
                              <span className="font-bold">
                                {isViolation 
                                  ? `${t('violation_alert')} ${priceDifference.toLocaleString()} YER`
                                  : (language === 'ar' ? "السعر مطابق للقائمة الرسمية." : "Price is within official limits.")}
                              </span>
                           </div>
                         )}
                      </motion.div>
                    )}
                 </AnimatePresence>
              </div>

              {/* Standard Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('shop_name')}</label>
                  <input 
                    type="text" 
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-accent outline-none" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('location')}</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      readOnly 
                      value={location}
                      placeholder={location ? t('loc_success') : ''}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none text-gray-500" 
                    />
                    <button 
                      type="button"
                      onClick={handleGetLocation}
                      className="absolute top-2 end-2 p-1.5 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
                    >
                      {loadingLoc ? <Loader2 size={20} className="animate-spin" /> : <MapPin size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('details')}</label>
                <textarea 
                  rows={3} 
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-accent outline-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-accent text-white font-bold py-4 rounded-xl hover:bg-[#e67e22] shadow-lg shadow-accent/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {submitting ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                {t('submit')}
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
