import { useState, useEffect } from 'react';
import api from '../api';
import { User, Mail, Shield, UserPlus } from 'lucide-react';

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [newEngineer, setNewEngineer] = useState({ nickname: '', email: '', password: '' });

  const handleCreateEngineer = (e) => {
    e.preventDefault();
    // На олимпиаде часто используют тот же эндпоинт регистрации для создания юзеров
    api.post('/auth/registration', newEngineer)
      .then(() => {
        alert("Инженер успешно назначен!");
        setNewEngineer({ nickname: '', email: '', password: '' });
      })
      .catch(err => alert("Ошибка: " + err));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded shadow-sm border-t-4 border-blue-500 flex gap-8">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
           <User size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">{user.nickname || 'Администратор'}</h2>
          <div className="flex items-center gap-2 text-gray-500"><Mail size={16}/> {user.email || 'admin@vending.ru'}</div>
          <div className="flex items-center gap-2 text-blue-600 font-bold"><Shield size={16}/> Роль: {user.role || 'ADMIN'}</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow-sm">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-700">
          <UserPlus size={20} className="text-blue-500" /> Назначить выездного инженера
        </h3>

        <form onSubmit={handleCreateEngineer} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-xs font-bold text-gray-400">ФИО ИНЖЕНЕРА</label>
            <input
              className="w-full border p-2 rounded mt-1 bg-gray-50"
              placeholder="Введите полное имя"
              required
              value={newEngineer.nickname}
              onChange={e => setNewEngineer({...newEngineer, nickname: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400">EMAIL</label>
            <input
              type="email"
              className="w-full border p-2 rounded mt-1 bg-gray-50"
              placeholder="engineer@mail.ru"
              required
              value={newEngineer.email}
              onChange={e => setNewEngineer({...newEngineer, email: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400">ВРЕМЕННЫЙ ПАРОЛЬ</label>
            <input
              type="password"
              className="w-full border p-2 rounded mt-1 bg-gray-50"
              placeholder="••••••"
              required
              value={newEngineer.password}
              onChange={e => setNewEngineer({...newEngineer, password: e.target.value})}
            />
          </div>
          <div className="col-span-2 pt-4">
            <button className="bg-blue-600 text-white px-8 py-2 rounded font-bold hover:bg-blue-700 transition">
              Зарегистрировать инженера
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}