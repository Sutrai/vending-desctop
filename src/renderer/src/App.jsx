import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TAManager from './pages/TAManager';

export default function App() {
  // Проверка: залогинены мы или нет
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  // Если нет токена — только страница входа
  if (!isAuth) {
    return <Login onLoginSuccess={() => setIsAuth(true)} />;
  }

  return (
    <HashRouter>
      <Routes>
        {/* Все страницы внутри Layout будут отображаться в месте тега <Outlet /> */}
        <Route path="/" element={<Layout onLogout={() => setIsAuth(false)} />}>

          {/* Путь: / (Главная) */}
          <Route index element={<Dashboard />} />

          {/* Путь: /ta (Управление автоматами) */}
          <Route path="ta" element={<TAManager />} />

          {/* Заглушки для остальных страниц, чтобы не было пустоты при клике */}
          <Route path="monitor" element={<div className="p-8 text-2xl font-bold">Монитор ТА (В разработке)</div>} />
          <Route path="reports" element={<div className="p-8 text-2xl font-bold">Детальные отчеты (В разработке)</div>} />
          <Route path="inventory" element={<div className="p-8 text-2xl font-bold">Учет ТМЦ (В разработке)</div>} />
          <Route path="users" element={<div className="p-8 text-2xl font-bold">Управление пользователями (В разработке)</div>} />

          {/* Если ввели дичь в URL — кидаем на главную */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}