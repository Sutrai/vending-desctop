import { useState, useEffect } from 'react';
import api from '../api';
import { Download, Plus, Trash2, Search } from 'lucide-react';

export default function TAManager() {
  const [machines, setMachines] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    load();
  }, []);

  const load = () => api.get('/vending-machines').then(res => setMachines(res.data));

  const handleDelete = (id) => {
    if (window.confirm("Удалить автомат?")) {
      api.delete(`/vending-machines/${id}`).then(load);
    }
  };

  // САМЫЙ ПРОСТОЙ ЭКСПОРТ В CSV
  const exportCSV = () => {
    let csv = "ID;Name;Model;Address;Status\n";
    machines.forEach(m => {
      csv += `${m.id};${m.name};${m.model};${m.address};${m.status}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vending_machines.csv';
    a.click();
  };

  // Фильтрация на фронте
  const filtered = machines.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
          <input
            type="text" placeholder="Поиск по названию..."
            className="pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 ring-blue-500"
            value={search} onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200">
            <Download size={18}/> Экспорт CSV
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <Plus size={18}/> Добавить ТА
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Название</th>
              <th className="p-4">Модель</th>
              <th className="p-4">Адрес</th>
              <th className="p-4 text-center">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map(m => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="p-4 font-bold">{m.name}</td>
                <td className="p-4">{m.model}</td>
                <td className="p-4">{m.address}</td>
                <td className="p-4 flex justify-center gap-2">
                  <button onClick={() => handleDelete(m.id)} className="text-red-500 p-2 hover:bg-red-50 rounded"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}