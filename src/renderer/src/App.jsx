import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TAManager from './pages/TAManager';
import Monitor from './pages/Monitor';

export default function App() {
  // Храним статус авторизации. !! превращает строку в true/false
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  if (!isAuth) {
    return <Login onLoginSuccess={() => setIsAuth(true)} />;
  }

  return (
    <HashRouter>
      <Routes>
        {/* Layout — это обертка. Все дочерние Route попадут в <Outlet /> внутри Layout */}
        <Route path="/" element={<Layout onLogout={() => setIsAuth(false)} />}>
          <Route index element={<Dashboard />} />
          <Route path="ta" element={<TAManager />} />
          {/* Заглушки для других страниц */}
          <Route path="monitor" element={<Monitor />} />
          <Route path="users" element={<Placeholder title="Пользователи" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

// Простой компонент-заглушка для пустых страниц
function Placeholder({ title }) {
  return <div className="p-8 text-2xl font-bold text-gray-400">{title} (В разработке)</div>;
}