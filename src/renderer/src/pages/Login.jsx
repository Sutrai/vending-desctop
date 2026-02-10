import { useState } from 'react';
import api from '../api';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
      e.preventDefault();
      console.log("Попытка входа...", { email, password });

      api.post(`/auth/login?email=${email}&password=${password}`)
        .then(res => {
          console.log("Ответ сервера:", res.data);

          if (res.data && res.data.token) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data));
            onLoginSuccess();
          } else {
            console.error("В ответе нет токена!", res.data);
            alert("Ошибка: Сервер не прислал токен");
          }
        })
        .catch(err => {
          console.error("Полная ошибка запроса:", err);
          alert("Ошибка входа: " + (err.response?.status || "Сервер недоступен"));
        });
    };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-900">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Vending System</h2>
        <input
          type="text" placeholder="Email"
          className="w-full border p-2 mb-4 rounded focus:outline-blue-500"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password" placeholder="Пароль"
          className="w-full border p-2 mb-6 rounded focus:outline-blue-500"
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">
          Войти
        </button>
      </form>
    </div>
  );
}