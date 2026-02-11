import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Monitor, Settings, LogOut, Coffee } from 'lucide-react';

export default function Layout({ onLogout }) {
  const location = useLocation();

  // Функция для активного класса в меню
  const linkClass = (path) => `
    flex items-center gap-3 p-3 rounded-lg transition-colors
    ${location.pathname === path ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}
  `;

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden text-gray-900">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 flex flex-col shrink-0">
        <div className="p-6 text-xl font-bold text-blue-400 flex items-center gap-2">
          <Coffee /> VENDING PRO
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link to="/" className={linkClass('/')}>
            <LayoutDashboard size={20} /> Главная
          </Link>
          <Link to="/monitor" className={linkClass('/monitor')}>
            <Monitor size={20} /> Монитор ТА
          </Link>
          <Link to="/ta" className={linkClass('/ta')}>
            <Settings size={20} /> Автоматы
          </Link>
        </nav>

        <button
          onClick={onLogout}
          className="m-4 flex items-center gap-3 p-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <LogOut size={20} /> Выйти
        </button>
      </aside>

      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
          <h1 className="text-gray-500 font-medium">Панель управления</h1>
          <div className="flex items-center gap-3">
            <span className="font-bold">Администратор</span>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">A</div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          {/* Сюда вставляются страницы Dashboard, TAManager и т.д. */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}