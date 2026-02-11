import { useState } from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { LayoutDashboard, Monitor, Settings, ChevronDown, User, LogOut, Shield, Key } from 'lucide-react';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TAManager from './pages/TAManager';
import MonitorPage from './pages/MonitorPage';
import TAForm from './pages/TAForm';
import Profile from './pages/Profile'; // Новая страница

export default function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));
  const [openMenu, setOpenMenu] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  if (!isAuth) return <Login onLoginSuccess={() => setIsAuth(true)} />;

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
  };

  return (
    <HashRouter>
      <div className="flex h-screen bg-gray-200 font-sans text-sm">
        {/* SIDEBAR */}
        <aside className="w-64 bg-[#1f2937] text-gray-300 flex flex-col">
          <div className="p-4 text-white text-xl font-bold bg-[#111827]">Лого</div>
          <nav className="flex-1 px-2 mt-4 space-y-1">
            <Link to="/" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded"><LayoutDashboard size={18}/> Главная</Link>
            <Link to="/monitor" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded"><Monitor size={18}/> Монитор ТА</Link>
            <div>
              <button onClick={() => setOpenMenu(openMenu === 'admin' ? '' : 'admin')} className="w-full flex items-center justify-between p-3 hover:bg-gray-700 rounded">
                <div className="flex items-center gap-3"><Settings size={18}/> Администрирование</div>
                <ChevronDown size={14} className={openMenu === 'admin' ? 'rotate-180' : ''}/>
              </button>
              {openMenu === 'admin' && (
                <div className="ml-9 space-y-1 py-1">
                  <Link to="/ta" className="block p-2 hover:text-white">Торговые автоматы</Link>
                </div>
              )}
            </div>
          </nav>
        </aside>

        {/* CONTENT */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-12 bg-white border-b flex items-center justify-between px-4 relative">
            <h1 className="text-gray-800 font-bold">ООО Торговые Автоматы</h1>

            {/* PROFILE CORNER */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-3 hover:bg-gray-100 p-1 rounded transition"
              >
                <div className="text-right">
                  <p className="text-[11px] font-bold leading-none">Автоматов А.А.</p>
                  <p className="text-[10px] text-gray-400">Администратор</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <User size={18}/>
                </div>
                <ChevronDown size={14} className={showProfileDropdown ? 'rotate-180' : ''}/>
              </button>

              {/* DROPDOWN MENU (Как на скрине) */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-xl z-50 py-2">
                  <Link
                    to="/profile"
                    onClick={() => setShowProfileDropdown(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-600"
                  >
                    <User size={16} className="text-gray-400"/> Мой профиль
                  </Link>
                  <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-600 cursor-not-allowed opacity-50">
                    <Key size={16} className="text-gray-400"/> Мои сессии
                  </div>
                  <div className="border-t my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 transition"
                  >
                    <LogOut size={16}/> Выход
                  </button>
                </div>
              )}
            </div>
          </header>

          <main className="p-6 overflow-auto bg-[#f3f4f6] flex-1">
             <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/ta" element={<TAManager />} />
                <Route path="/ta/add" element={<TAForm />} />
                <Route path="/monitor" element={<MonitorPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" />} />
             </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
}