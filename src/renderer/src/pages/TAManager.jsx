import { useState, useEffect } from 'react';
import api from '../api';

export default function TAManager() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false); // Состояние окна
  const [formData, setFormData] = useState({ name: '', model: '', address: '' }); // Данные формы

  const loadData = () => {
    api.get('/vending-machines').then(res => setItems(res.data));
  };

  useEffect(() => { loadData(); }, []);

  // Функция сохранения
  const handleSave = () => {
    api.post('/vending-machines', formData).then(() => {
      setShowModal(false); // Закрыть окно
      setFormData({ name: '', model: '', address: '' }); // Очистить форму
      loadData(); // Обновить таблицу
    });
  };

  return (
    <div className="relative">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Торговые автоматы</h2>
        {/* Кнопка открытия окна */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Добавить ТА
        </button>
      </div>

      {/* ТАБЛИЦА (оставляем как была) */}
      <table className="w-full bg-white rounded shadow text-left">
        {/* ... твой код таблицы ... */}
      </table>

      {/* МОДАЛЬНОЕ ОКНО */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Новый автомат</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Название</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded mt-1"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Модель</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded mt-1"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Отмена
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}