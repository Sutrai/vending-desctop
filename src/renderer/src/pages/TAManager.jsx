import { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Trash2, Link2Off, X } from 'lucide-react';

export default function TAManager() {
  const [machines, setMachines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Расширенная форма со всеми полями из сущности Java
  const initialForm = {
    name: '',
    model: '',
    serialNumber: '',
    inventoryNumber: '',
    address: '',
    country: 'Россия',
    manufactureDate: new Date().toISOString().split('T')[0],
    installationDate: new Date().toISOString().split('T')[0],
    status: 'Работает',
    checkInterval: 6,
    resourceHours: 10000,
    serviceTime: 2
  };

  const [form, setForm] = useState(initialForm);

  const loadMachines = async () => {
    try {
      const res = await api.get('/vending-machines');
      setMachines(res.data);
    } catch (e) { console.error("Ошибка загрузки", e); }
  };

  useEffect(() => { loadMachines(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.post('/vending-machines', form);
      setIsModalOpen(false);
      setForm(initialForm); // Сброс формы
      loadMachines();
    } catch (e) {
      const msg = e.response?.data?.data?.error || "Ошибка при сохранении";
      alert(msg);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Удалить аппарат из реестра?")) {
      await api.delete(`/vending-machines/${id}`);
      loadMachines();
    }
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Управление парком ТА</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
        >
          <Plus size={18}/> Добавить автомат
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Название / Модель</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Серийный номер</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Адрес установки</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Статус</th>
              <th className="p-4 text-center text-xs font-semibold text-gray-500 uppercase">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {machines.map(m => (
              <tr key={m.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-gray-900">{m.name}</div>
                  <div className="text-sm text-gray-500">{m.model}</div>
                </td>
                <td className="p-4 font-mono text-sm text-blue-600">{m.serialNumber}</td>
                <td className="p-4 text-sm text-gray-600">{m.address}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${m.status === 'Работает' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {m.status?.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 flex justify-center gap-2">
                  <button onClick={() => alert("Модем отвязан")} title="Отвязать модем" className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg"><Link2Off size={18}/></button>
                  <button onClick={() => handleDelete(m.id)} title="Удалить" className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">Регистрация нового ТА</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X /></button>
            </div>

            <form onSubmit={handleSave} className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Левая колонка - Основное */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-blue-600 uppercase">Основные данные</h4>
                  <input required placeholder="Название аппарата" className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  <input required placeholder="Модель (напр. Necta Kikko)" className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={form.model} onChange={e => setForm({...form, model: e.target.value})} />
                  <input required placeholder="Серийный номер" className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={form.serialNumber} onChange={e => setForm({...form, serialNumber: e.target.value})} />
                  <input placeholder="Инвентарный номер" className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={form.inventoryNumber} onChange={e => setForm({...form, inventoryNumber: e.target.value})} />
                  <input required placeholder="Адрес установки" className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
                </div>

                {/* Правая колонка - Техническое */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-blue-600 uppercase">Технические характеристики</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <label className="text-[10px] text-gray-400 ml-1">Дата производства</label>
                      <input type="date" className="border p-2 rounded-lg text-sm"
                        value={form.manufactureDate} onChange={e => setForm({...form, manufactureDate: e.target.value})} />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] text-gray-400 ml-1">Дата установки</label>
                      <input type="date" className="border p-2 rounded-lg text-sm"
                        value={form.installationDate} onChange={e => setForm({...form, installationDate: e.target.value})} />
                    </div>
                  </div>
                  <input placeholder="Страна производства" className="w-full border p-2.5 rounded-lg outline-none"
                    value={form.country} onChange={e => setForm({...form, country: e.target.value})} />

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <label className="text-[10px] text-gray-400 ml-1">Интервал поверки (мес)</label>
                      <input type="number" className="border p-2 rounded-lg text-sm"
                        value={form.checkInterval} onChange={e => setForm({...form, checkInterval: e.target.value})} />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] text-gray-400 ml-1">Время обслуж. (ч)</label>
                      <input type="number" className="border p-2 rounded-lg text-sm"
                        value={form.serviceTime} onChange={e => setForm({...form, serviceTime: e.target.value})} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3 border-t pt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-gray-500 hover:text-gray-700 font-medium">Отмена</button>
                <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-md transition-all active:scale-95">
                  Зарегистрировать ТА
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}