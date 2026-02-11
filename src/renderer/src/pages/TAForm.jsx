import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function TAForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    serialNumber: '',
    inventoryNumber: '',
    model: '',
    address: '',
    status: 'Работает'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/vending-machines', form)
      .then(() => {
        alert("Создано!");
        navigate('/ta');
      })
      .catch(err => alert("Ошибка при создании: " + err));
  };

  const update = (key, val) => setForm({...form, [key]: val});

  return (
    <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
      <h2 className="text-blue-500 text-xl border-b pb-2 mb-6">Создание торгового автомата</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
        <div>
          <label className="block text-xs font-bold mb-1">Название ТА *</label>
          <input className="w-full border p-2 rounded" required onChange={e => update('name', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Модель ТА *</label>
          <input className="w-full border p-2 rounded" required onChange={e => update('model', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Серийный номер *</label>
          <input className="w-full border p-2 rounded" required onChange={e => update('serialNumber', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Инвентарный номер</label>
          <input className="w-full border p-2 rounded" onChange={e => update('inventoryNumber', e.target.value)} />
        </div>
        <div className="col-span-3">
          <label className="block text-xs font-bold mb-1">Адрес *</label>
          <input className="w-full border p-2 rounded" required onChange={e => update('address', e.target.value)} />
        </div>

        <div className="col-span-3 flex gap-2 mt-4 border-t pt-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-bold">Создать</button>
          <button type="button" onClick={() => navigate('/ta')} className="bg-gray-100 px-6 py-2 rounded">Отменить</button>
        </div>
      </form>
    </div>
  );
}