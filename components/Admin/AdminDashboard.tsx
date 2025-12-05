
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { LayoutDashboard, FileText, Tag, LogOut, AlertTriangle, Lock, User, Smartphone, Plus, Trash2, Save, Image as ImageIcon, RefreshCcw, ScrollText, Download, Filter, Megaphone, MapPin } from 'lucide-react';
import { ReportItem } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { t, dir } = useLanguage();
  const { 
    news, addNews, deleteNews, 
    prices, updatePrice, 
    galleryImages, addGalleryImage, removeGalleryImage,
    appSettings, updateAppSettings,
    reports, updateReportStatus,
    tickerSettings, updateTickerSettings
  } = useData();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'news' | 'prices' | 'reports' | 'gallery' | 'app'>('dashboard');
  
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Forms State
  const [newNews, setNewNews] = useState({ titleAr: '', titleEn: '', descAr: '', descEn: '', image: '' });
  const [newImage, setNewImage] = useState('');

  // Ticker State
  const [localTicker, setLocalTicker] = useState(tickerSettings);

  // App Settings Form State
  const [localSettings, setLocalSettings] = useState(appSettings);

  // Reports Filter State
  const [reportFilter, setReportFilter] = useState<'all' | 'pending' | 'resolved'>('all');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials (try admin/admin)');
    }
  };

  const handleLogout = () => {
    window.location.hash = '#home';
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setShowLogoutConfirm(false);
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    addNews({
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      titleKey: 'custom',
      titleAr: newNews.titleAr,
      titleEn: newNews.titleEn,
      descKey: 'custom',
      descAr: newNews.descAr,
      descEn: newNews.descEn,
      image: newNews.image || 'https://picsum.photos/400/300'
    });
    setNewNews({ titleAr: '', titleEn: '', descAr: '', descEn: '', image: '' });
  };

  const handleSaveAppSettings = () => {
    updateAppSettings(localSettings);
    alert('Mobile App Settings Saved Successfully!');
  };

  const handleSaveTicker = () => {
    updateTickerSettings(localTicker);
    alert('Ticker Updated Successfully!');
  };

  const exportReportsToCSV = () => {
    // Add BOM for Excel Arabic support
    const bom = "\uFEFF";
    const header = ['ID', 'Date', 'Shop Name', 'Product', 'Official Price', 'Observed Price', 'Status', 'Details'];
    const rows = reports.map(r => [
      r.id, 
      new Date(r.timestamp).toLocaleDateString(), 
      `"${r.shopName}"`, 
      `"${r.productName}"`, 
      r.officialPrice, 
      r.observedPrice, 
      r.status,
      `"${r.details.replace(/\n/g, ' ')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + bom + [header.join(','), ...rows.map(e => e.join(','))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `reports_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredReports = reports.filter(r => reportFilter === 'all' || r.status === reportFilter);

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
    <div className="min-h-screen bg-gray-100 flex relative" id="admin" dir={dir}>
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4 transform transition-all">
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
      <aside className="w-64 bg-primary text-white hidden md:flex flex-col fixed h-full z-40">
        <div className="p-6 text-2xl font-bold border-b border-blue-800">CPA Admin</div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors text-start ${activeTab === 'dashboard' ? 'bg-blue-800 text-accent font-bold' : 'hover:bg-blue-800'}`}>
            <LayoutDashboard size={20} /> {t('admin_dashboard')}
          </button>
          <button onClick={() => setActiveTab('reports')} className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors text-start ${activeTab === 'reports' ? 'bg-blue-800 text-accent font-bold' : 'hover:bg-blue-800'}`}>
            <ScrollText size={20} /> Violations / Reports
            {reports.filter(r => r.status === 'pending').length > 0 && 
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{reports.filter(r => r.status === 'pending').length}</span>
            }
          </button>
          <button onClick={() => setActiveTab('news')} className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors text-start ${activeTab === 'news' ? 'bg-blue-800 text-accent font-bold' : 'hover:bg-blue-800'}`}>
            <FileText size={20} /> {t('manage_news')}
          </button>
          <button onClick={() => setActiveTab('prices')} className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors text-start ${activeTab === 'prices' ? 'bg-blue-800 text-accent font-bold' : 'hover:bg-blue-800'}`}>
            <Tag size={20} /> {t('manage_prices')}
          </button>
           <button onClick={() => setActiveTab('gallery')} className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors text-start ${activeTab === 'gallery' ? 'bg-blue-800 text-accent font-bold' : 'hover:bg-blue-800'}`}>
            <ImageIcon size={20} /> Gallery
          </button>
          <button onClick={() => setActiveTab('app')} className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors text-start ${activeTab === 'app' ? 'bg-blue-800 text-accent font-bold' : 'hover:bg-blue-800'}`}>
            <Smartphone size={20} /> Mobile App & Ticker
          </button>
        </nav>
        <div className="p-4 border-t border-blue-800">
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-red-600 rounded-lg transition-colors text-start"
          >
            <LogOut size={20} /> {t('logout')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 p-8 overflow-y-auto h-screen transition-all ${dir === 'rtl' ? 'md:mr-64' : 'md:ml-64'}`}>
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">{activeTab} Management</h1>
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full shadow-sm">
             <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
               <User size={24} />
             </div>
             <span className="font-bold text-gray-700">Admin</span>
          </div>
        </header>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md border-s-4 border-accent">
                <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">Total Reports</h3>
                <p className="text-3xl font-black text-dark mt-2">{reports.length}</p>
                <span className="text-orange-500 text-sm font-bold">{reports.filter(r => r.status === 'pending').length} Pending</span>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border-s-4 border-secondary">
                <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">Database Status</h3>
                <p className="text-lg font-black text-dark mt-2">Connected (Browser Storage)</p>
                <span className="text-blue-500 text-sm font-bold">Synced</span>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border-s-4 border-red-500">
                <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">App Maintenance</h3>
                <p className="text-3xl font-black text-dark mt-2">{appSettings.maintenanceMode ? "ON" : "OFF"}</p>
              </div>
            </div>
             
             <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-6">
                <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2"><AlertTriangle size={18}/> Data Persistence Mode</h4>
                <p className="text-blue-700 text-sm">
                   All data (News, Prices, Reports) is currently stored in your browser's LocalStorage. This simulates a real database connection. To reset data, clear your browser cache.
                </p>
             </div>
          </>
        )}

        {/* Reports / Violations Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
               <div className="flex items-center gap-2">
                 <Filter size={20} className="text-gray-500" />
                 <select 
                  className="bg-gray-100 border-none rounded-lg px-4 py-2 font-bold text-gray-700 focus:ring-2 focus:ring-primary"
                  value={reportFilter}
                  onChange={(e) => setReportFilter(e.target.value as any)}
                 >
                   <option value="all">All Reports</option>
                   <option value="pending">Pending</option>
                   <option value="resolved">Resolved</option>
                 </select>
               </div>
               <button 
                onClick={exportReportsToCSV}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors"
               >
                 <Download size={18} /> Export CSV
               </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full">
                   <thead className="bg-gray-100 text-gray-600">
                     <tr>
                       <th className="px-6 py-4 text-start">ID / Date</th>
                       <th className="px-6 py-4 text-start">Shop & Product</th>
                       <th className="px-6 py-4 text-start">Price Comparison</th>
                       <th className="px-6 py-4 text-start">Details</th>
                       <th className="px-6 py-4 text-start">Status</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {filteredReports.length === 0 ? (
                       <tr><td colSpan={5} className="text-center py-8 text-gray-500">No reports found.</td></tr>
                     ) : (
                       filteredReports.map((report) => (
                         <tr key={report.id} className="hover:bg-blue-50/50">
                           <td className="px-6 py-4">
                             <span className="block font-mono text-xs text-gray-400">#{report.id}</span>
                             <span className="text-sm font-bold text-gray-700">{new Date(report.timestamp).toLocaleDateString()}</span>
                           </td>
                           <td className="px-6 py-4">
                             <div className="font-bold text-primary">{report.shopName}</div>
                             <div className="text-sm text-gray-500">{report.productName}</div>
                             <div className="text-xs text-gray-400 flex items-center gap-1 mt-1"><MapPin size={12}/> {report.location}</div>
                           </td>
                           <td className="px-6 py-4">
                              <div className="text-xs text-gray-500">Official: <span className="font-bold">{report.officialPrice}</span></div>
                              <div className="text-xs text-red-500">Observed: <span className="font-bold">{report.observedPrice}</span></div>
                              <div className="font-bold text-red-600 mt-1">Diff: +{report.observedPrice - report.officialPrice}</div>
                           </td>
                           <td className="px-6 py-4 max-w-xs truncate text-gray-600" title={report.details}>
                             {report.details || "No details provided."}
                           </td>
                           <td className="px-6 py-4">
                             <select 
                               value={report.status}
                               onChange={(e) => updateReportStatus(report.id, e.target.value as any)}
                               className={`px-3 py-1 rounded-full text-xs font-bold border-none outline-none cursor-pointer ${
                                 report.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                                 report.status === 'resolved' ? 'bg-green-100 text-green-600' :
                                 'bg-blue-100 text-blue-600'
                               }`}
                             >
                               <option value="pending">Pending</option>
                               <option value="reviewed">Reviewed</option>
                               <option value="resolved">Resolved</option>
                             </select>
                           </td>
                         </tr>
                       ))
                     )}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}

        {/* News Management */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">Add New News</h3>
              <form onSubmit={handleAddNews} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Title (Arabic)" value={newNews.titleAr} onChange={e => setNewNews({...newNews, titleAr: e.target.value})} className="p-3 border rounded-lg" required />
                <input placeholder="Title (English)" value={newNews.titleEn} onChange={e => setNewNews({...newNews, titleEn: e.target.value})} className="p-3 border rounded-lg" required />
                <textarea placeholder="Description (Arabic)" value={newNews.descAr} onChange={e => setNewNews({...newNews, descAr: e.target.value})} className="p-3 border rounded-lg" required />
                <textarea placeholder="Description (English)" value={newNews.descEn} onChange={e => setNewNews({...newNews, descEn: e.target.value})} className="p-3 border rounded-lg" required />
                <input placeholder="Image URL" value={newNews.image} onChange={e => setNewNews({...newNews, image: e.target.value})} className="p-3 border rounded-lg md:col-span-2" />
                <button type="submit" className="bg-green-600 text-white py-3 rounded-lg font-bold md:col-span-2 hover:bg-green-700 flex justify-center items-center gap-2"><Plus size={20} /> Publish News</button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">Current News</h3>
              <div className="space-y-4">
                {news.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <img src={item.image} className="w-16 h-16 object-cover rounded-md" alt="news" />
                      <div>
                        <p className="font-bold">{item.titleEn || t(item.titleKey)}</p>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteNews(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full"><Trash2 size={20} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Prices Management */}
        {activeTab === 'prices' && (
           <div className="bg-white p-6 rounded-xl shadow-md">
             <h3 className="text-xl font-bold mb-6">Update Market Prices</h3>
             <table className="w-full">
               <thead>
                 <tr className="text-left border-b">
                   <th className="pb-3 text-start">Code</th>
                   <th className="pb-3 text-start">Product</th>
                   <th className="pb-3 text-start">Current Price (YER)</th>
                   <th className="pb-3 text-start">Update</th>
                 </tr>
               </thead>
               <tbody>
                 {prices.map(item => (
                   <tr key={item.id} className="border-b last:border-0">
                     <td className="py-4 text-gray-500">{item.code}</td>
                     <td className="py-4 font-bold">{item.nameEn} / {item.nameAr}</td>
                     <td className="py-4 font-mono">{item.price.toLocaleString()}</td>
                     <td className="py-4">
                        <input 
                          type="number" 
                          placeholder="New Price"
                          className="border rounded px-2 py-1 w-32 mr-2"
                          onBlur={(e) => {
                            if(e.target.value) updatePrice(item.id, parseInt(e.target.value));
                            e.target.value = '';
                          }}
                        />
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        )}

        {/* Gallery Management */}
        {activeTab === 'gallery' && (
           <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4">Add Gallery Image</h3>
                <div className="flex gap-4">
                  <input 
                    value={newImage} 
                    onChange={e => setNewImage(e.target.value)} 
                    placeholder="Enter Image URL..." 
                    className="flex-1 p-3 border rounded-lg"
                  />
                  <button 
                    onClick={() => { if(newImage) { addGalleryImage(newImage); setNewImage(''); } }}
                    className="bg-primary text-white px-6 rounded-lg font-bold hover:bg-secondary"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryImages.map((img, idx) => (
                   <div key={idx} className="relative group rounded-xl overflow-hidden">
                     <img src={img} alt="gal" className="w-full h-40 object-cover" />
                     <button 
                        onClick={() => removeGalleryImage(img)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                       <Trash2 size={16} />
                     </button>
                   </div>
                ))}
              </div>
           </div>
        )}

        {/* Mobile App & Ticker Settings */}
        {activeTab === 'app' && (
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                <Smartphone size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-dark">Mobile App & Ticker Control</h2>
                <p className="text-gray-500">Manage remote configurations and breaking news</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Ticker Control */}
               <div className="md:col-span-2 space-y-4 border p-6 rounded-xl border-gray-200 bg-gray-50">
                  <h4 className="font-bold text-lg flex items-center gap-2">
                    <Megaphone size={20} className="text-accent"/> News Ticker Configuration
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-bold mb-1">Ticker Text (Arabic)</label>
                       <input 
                          value={localTicker.customTextAr}
                          onChange={e => setLocalTicker({...localTicker, customTextAr: e.target.value})}
                          className="w-full p-3 border rounded"
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-bold mb-1">Ticker Text (English)</label>
                       <input 
                          value={localTicker.customTextEn}
                          onChange={e => setLocalTicker({...localTicker, customTextEn: e.target.value})}
                          className="w-full p-3 border rounded"
                       />
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <input 
                       type="checkbox" 
                       checked={localTicker.showPrices} 
                       onChange={e => setLocalTicker({...localTicker, showPrices: e.target.checked})}
                       id="showPrices"
                     />
                     <label htmlFor="showPrices" className="text-sm font-bold text-gray-700">Auto-display latest prices in ticker</label>
                  </div>
                  <button onClick={handleSaveTicker} className="bg-primary text-white px-4 py-2 rounded text-sm font-bold">Update Ticker</button>
               </div>

               {/* Maintenance Mode */}
               <div className="space-y-4 border p-6 rounded-xl border-gray-200">
                  <h4 className="font-bold text-lg flex items-center gap-2">
                    <RefreshCcw size={20} className="text-orange-500"/> App Status
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Maintenance Mode</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={localSettings.maintenanceMode}
                        onChange={e => setLocalSettings({...localSettings, maintenanceMode: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-400">If enabled, users will see a "Under Maintenance" screen when opening the app.</p>
               </div>

               {/* Versions */}
               <div className="space-y-4 border p-6 rounded-xl border-gray-200">
                  <h4 className="font-bold text-lg">Version Control</h4>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-bold mb-1">Min Supported Version</label>
                       <input 
                          value={localSettings.minVersion}
                          onChange={e => setLocalSettings({...localSettings, minVersion: e.target.value})}
                          className="w-full p-2 border rounded"
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-bold mb-1">Latest Version</label>
                       <input 
                          value={localSettings.latestVersion}
                          onChange={e => setLocalSettings({...localSettings, latestVersion: e.target.value})}
                          className="w-full p-2 border rounded"
                       />
                     </div>
                  </div>
               </div>
            </div>

            <div className="mt-8 flex justify-end">
               <button 
                 onClick={handleSaveAppSettings}
                 className="bg-accent text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 flex items-center gap-2 shadow-lg"
               >
                 <Save size={20} /> Save App Settings
               </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
