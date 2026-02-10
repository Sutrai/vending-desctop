import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Monitor, FileText, Package,
  Settings, ChevronDown, User, LogOut
} from 'lucide-react';

export default function Layout({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Получаем данные юзера для прав доступа
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'ADMIN';

  const handleLogout = () => {
    localStorage.clear();
    onLogout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-slate-100 w-full overflow-hidden text-slate-900">

      {/* ЛЕВАЯ ПАНЕЛЬ (SIDEBAR) */}
      <aside className="w-64 bg-slate-800 text-white flex flex-col shadow-xl flex-shrink-0">
        <div className="p-6 text-xl font-bold border-b border-slate-700 text-blue-400">
          VENDING SYS
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {/* Ссылка на главную */}
          <Link to="/" className={`flex items-center space-x-3 p-3 rounded-lg ${location.pathname === '/' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>
            <LayoutDashboard size={20} /> <span>Главная</span>
          </Link>

          {/* Ссылка на Монитор */}
          <Link to="/monitor" className={`flex items-center space-x-3 p-3 rounded-lg ${location.pathname === '/monitor' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>
            <Monitor size={20} /> <span>Монитор ТА</span>
          </Link>

          {/* Секция только для АДМИНА */}
          {isAdmin && (
            <>
              <Link to="/reports" className={`flex items-center space-x-3 p-3 rounded-lg ${location.pathname === '/reports' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>
                <FileText size={20} /> <span>Отчеты</span>
              </Link>
              <Link to="/inventory" className={`flex items-center space-x-3 p-3 rounded-lg ${location.pathname === '/inventory' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>
                <Package size={20} /> <span>Учет ТМЦ</span>
              </Link>

              {/* Выпадающий список админки */}
              <div>
                <button
                  onClick={() => setIsAdminOpen(!isAdminOpen)}
                  className="flex items-center justify-between w-full p-3 hover:bg-slate-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Settings size={20} /> <span>Админка</span>
                  </div>
                  <ChevronDown className={isAdminOpen ? 'rotate-180' : ''} size={16} />
                </button>

                {isAdminOpen && (
                  <div className="ml-9 mt-2 space-y-1 text-sm text-slate-400">
                    <Link to="/ta" className="block p-2 hover:text-white">Торговые автоматы</Link>
                    <Link to="/users" className="block p-2 hover:text-white">Пользователи</Link>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>

        {/* Кнопка выхода внизу */}
        <div className="p-4 border-t border-slate-700">
          <button onClick={handleLogout} className="flex items-center space-x-3 w-full p-3 text-red-400 hover:bg-red-900/20 rounded-lg">
            <LogOut size={20} /> <span>Выйти</span>
          </button>
        </div>
      </aside>

      {/* ПРАВАЯ ЧАСТЬ (КОНТЕНТ) */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
          <div className="font-medium text-slate-500">Панель управления</div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-bold">{user.nickname || 'Admin'}</div>
              <div className="text-xs text-blue-600 font-bold uppercase">{user.role}</div>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border border-blue-200 uppercase font-bold">
              {user.nickname?.charAt(0) || 'A'}
            </div>
          </div>
        </header>

        {/* ВАЖНО: Сюда вставляются страницы */}
        <main className="flex-1 overflow-auto p-8 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}