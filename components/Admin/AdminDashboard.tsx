import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { LayoutDashboard, FileText, Tag, LogOut, AlertTriangle, Lock, User } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Credentials provided by installer configuration
    if (username === 'admin' && password === 'Raidan@772662106') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    window.location.hash = '#home';
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setShowLogoutConfirm(false);
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4" id="admin">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-primary">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-black text-dark">Admin Login</h1>
            <p className="text-gray-500">CPA - Taiz Management Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
              <div className="relative">
                <User className="absolute top-3 left-3 text-gray-400" size={20} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 text-red-600 text-sm font-bold rounded-lg flex items-center gap-2">
                <AlertTriangle size={16} />
                {loginError}
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-secondary transition-colors shadow-lg shadow-primary/30"
            >
              Login to Dashboard
            </button>

            <div className="text-center">
              <a href="#home" className="text-sm text-gray-500 hover:text-primary font-medium">Back to Home</a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Interface
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
          <button className="flex items-center gap-3 px-4 py-3 w-full bg-blue-800 rounded-lg text-accent font-bold">
            <LayoutDashboard size={20} /> {t('admin_dashboard')}
          </button>
          <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-blue-800 rounded-lg transition-colors text-start">
            <FileText size={20} /> {t('manage_news')}
          </button>
          <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-blue-800 rounded-lg transition-colors text-start">
            <Tag size={20} /> {t('manage_prices')}
          </button>
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
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{t('admin_dashboard')}</h1>
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full shadow-sm">
             <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
               <User size={24} />
             </div>
             <span className="font-bold text-gray-700">Admin</span>
             <button onClick={() => setShowLogoutConfirm(true)} className="md:hidden text-red-500">
               <LogOut size={20} />
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent hover:shadow-lg transition-shadow">
            <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">Total Reports</h3>
            <p className="text-3xl font-black text-dark mt-2">1,204</p>
            <span className="text-green-500 text-sm font-bold">+12% this week</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-secondary hover:shadow-lg transition-shadow">
            <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">Monitored Products</h3>
            <p className="text-3xl font-black text-dark mt-2">85</p>
            <span className="text-gray-400 text-sm font-bold">Last updated 2h ago</span>
          </div>
           <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-primary hover:shadow-lg transition-shadow">
            <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">Pending Reviews</h3>
            <p className="text-3xl font-black text-dark mt-2">12</p>
            <span className="text-orange-500 text-sm font-bold">Action required</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
             <h2 className="text-xl font-bold text-dark">Recent Activity</h2>
             <button className="text-primary font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-4">
             {[1,2,3].map((i) => (
               <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent/20 text-accent rounded-full flex items-center justify-center">
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-dark">Price Violation Reported</p>
                      <p className="text-xs text-gray-500">Al-Qahirah District • 15 mins ago</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">Pending</span>
               </div>
             ))}
          </div>
        </div>
      </main>
    </div>
  );
};
