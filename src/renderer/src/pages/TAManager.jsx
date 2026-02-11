import { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Trash2, Link2Off } from 'lucide-react';

export default function TAManager() {
  const [machines, setMachines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', model: '', serialNumber: '', address: '' });

  // 1. Загрузка данных
  const loadMachines = async () => {
    try {
      const res = await api.get('/vending-machines');
      setMachines(res.data);
    } catch (e) { alert("Ошибка загрузки"); }
  };

  useEffect(() => { loadMachines(); }, []);

  // 2. Добавление
  const handleSave = async () => {
    try {
      await api.post('/vending-machines', form);
      setIsModalOpen(false);
      loadMachines(); // Обновляем список
    } catch (e) { alert("Ошибка при сохранении: " + e.response.data.message); }
  };

  // 3. Удаление
  const handleDelete = async (id) => {
    if (window.confirm("Удалить аппарат?")) {
      await api.delete(`/vending-machines/${id}`);
      loadMachines();
    }
  };

  // 4. Эмуляция отвязки модема (из ТЗ)
  const unbindModem = (id) => {
    alert("Модем успешно отвязан от аппарата!");
    // В реальности тут был бы api.post(`/vending-machines/${id}/unbind`)
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Администрирование ТА</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus size={18}/> Добавить автомат
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Название</th>
              <th className="p-4">Серийник</th>
              <th className="p-4">Модель</th>
              <th className="p-4 text-center">Действия</th>
            </tr>
          </thead>
          <tbody>
            {machines.map(m => (
              <tr key={m.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{m.id}</td>
                <td className="p-4 font-bold">{m.name}</td>
                <td className="p-4 text-gray-500">{m.serialNumber}</td>
                <td className="p-4 text-gray-500">{m.model}</td>
                <td className="p-4 flex justify-center gap-3">
                  <button onClick={() => unbindModem(m.id)} title="Отвязать модем" className="text-orange-500"><Link2Off size={18}/></button>
                  <button onClick={() => handleDelete(m.id)} title="Удалить" className="text-red-500"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Модалка добавления */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-blue-600">Новый аппарат</h3>
            <div className="space-y-4">
              <input placeholder="Название" className="w-full border p-2 rounded" onChange={e => setForm({...form, name: e.target.value})} />
              <input placeholder="Модель" className="w-full border p-2 rounded" onChange={e => setForm({...form, model: e.target.value})} />
              <input placeholder="Серийный номер" className="w-full border p-2 rounded" onChange={e => setForm({...form, serialNumber: e.target.value})} />
              <input placeholder="Адрес" className="w-full border p-2 rounded" onChange={e => setForm({...form, address: e.target.value})} />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500">Отмена</button>
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Сохранить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}