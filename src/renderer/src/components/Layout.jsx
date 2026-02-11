import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Monitor, FileText, ShoppingCart, Settings, ChevronDown } from 'lucide-react';

export default function Layout() {
  const [openSub, setOpenSub] = useState(null);

  const toggle = (name) => setOpenSub(openSub === name ? null : name);

  const MenuItem = ({ icon, title, path, children }) => (
    <div>
      <div
        onClick={() => children ? toggle(title) : null}
        className="flex items-center justify-between p-3 hover:bg-gray-800 cursor-pointer rounded-lg transition"
      >
        <Link to={path || '#'} className="flex items-center gap-3">
          {icon} <span className="text-sm">{title}</span>
        </Link>
        {children && <ChevronDown size={14} className={openSub === title ? 'rotate-180' : ''} />}
      </div>
      {children && openSub === title && (
        <div className="ml-10 mt-1 space-y-1 text-gray-400 text-xs">
          {children.map(child => <Link key={child} to="/" className="block py-2 hover:text-white">{child}</Link>)}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F3F4F6]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1F2937] text-white p-4 flex flex-col gap-4">
        <div className="text-xl font-bold p-2 border-b border-gray-700 mb-4">Лого</div>
        <MenuItem icon={<LayoutDashboard size={18}/>} title="Главная" path="/" />
        <MenuItem icon={<Monitor size={18}/>} title="Монитор ТА" path="/monitor" />
        <MenuItem icon={<FileText size={18}/>} title="Детальные отчеты" children={['Продажи', 'Инкассация']} />
        <MenuItem icon={<ShoppingCart size={18}/>} title="Учет ТМЦ" children={['Склады', 'Товары']} />
        <MenuItem icon={<Settings size={18}/>} title="Администрирование" path="/ta" />
      </aside>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col">
        <header className="h-12 bg-[#2D3748] text-white flex items-center px-6 justify-between">
          <span className="font-bold">ООО Торговые Автоматы</span>
          <span className="text-xs text-gray-400">Администратор</span>
        </header>
        <main className="p-6 overflow-auto"><Outlet /></main>
      </div>
    </div>
  );
}