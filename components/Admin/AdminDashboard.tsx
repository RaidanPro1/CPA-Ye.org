import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { LayoutDashboard, FileText, Tag, LogOut, AlertTriangle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    window.location.hash = '#home';
    setShowLogoutConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex relative" id="admin">
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4 transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('confirm_logout')}</h3>
              <p className="text-gray-500 mb-6">{t('logout_desc')}</p>
              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                >
                  {t('cancel')}
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
                >
                  {t('logout')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-blue-800">CPA Admin</div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-800 rounded-lg text-accent font-bold">
            <LayoutDashboard size={20} /> {t('admin_dashboard')}
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-800 rounded-lg transition-colors">
            <FileText size={20} /> {t('manage_news')}
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-800 rounded-lg transition-colors">
            <Tag size={20} /> {t('manage_prices')}
          </a>
        </nav>
        <div className="p-4">
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-red-600 rounded-lg transition-colors text-left"
          >
            <LogOut size={20} /> {t('logout')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{t('admin_dashboard')}</h1>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
             <span className="font-bold text-gray-700">Admin User</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent">
            <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">Total Reports</h3>
            <p className="text-3xl font-black text-dark mt-2">1,204</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-secondary">
            <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">Monitored Products</h3>
            <p className="text-3xl font-black text-dark mt-2">85</p>
          </div>
           <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-primary">
            <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">Pending Reviews</h3>
            <p className="text-3xl font-black text-dark mt-2">12</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Recent Activity (Mock PHP Integration Area)</h2>
          <p className="text-gray-500">
            This section would connect to the PHP backend endpoints (/api/v1/...) to display real-time CiviCRM activities and price updates.
          </p>
        </div>
      </main>
    </div>
  );
};