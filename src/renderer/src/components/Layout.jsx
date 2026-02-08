import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Monitor,
  FileText,
  Package,
  Settings,
  ChevronDown,
  User,
  LogOut
} from 'lucide-react';

const Layout = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Главная', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Монитор ТА', path: '/monitor', icon: <Monitor size={20} /> },
    { name: 'Детальные отчеты', path: '/reports', icon: <FileText size={20} /> },
    { name: 'Учет ТМЦ', path: '/inventory', icon: <Package size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-100 text-slate-900 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-800 text-white flex flex-col shadow-xl">
        <div className="p-6 text-xl font-bold border-b border-slate-700 text-blue-400">
          Vending System
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-slate-700'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

          {/* Раскрывающееся меню Администрирование */}
          <div>
            <button
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className="flex items-center justify-between w-full p-3 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Settings size={20} />
                <span>Администрирование</span>
              </div>
              <ChevronDown className={`transition-transform ${isAdminOpen ? 'rotate-180' : ''}`} size={16} />
            </button>

            {isAdminOpen && (
              <div className="ml-9 mt-2 space-y-1 text-sm text-slate-400">
                <Link to="/admin/ta" className="block p-2 hover:text-white transition-colors">Торговые автоматы</Link>
                <Link to="/admin/companies" className="block p-2 hover:text-white transition-colors">Компании</Link>
                <Link to="/admin/users" className="block p-2 hover:text-white transition-colors">Пользователи</Link>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 border-b border-slate-200">
          <div className="text-sm text-slate-500">
            {location.pathname === '/' ? 'Обзор системы' : 'Панель управления'}
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-bold">Иванов И.И.</div>
              <div className="text-xs text-slate-500">Администратор</div>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border border-blue-200">
              <User size={20} />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;