import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Plus, Download, Trash2, Edit } from 'lucide-react';

export default function TAManager() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const load = () => api.get('/vending-machines').then(r => setList(r.data));
  useEffect(() => { load(); }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-blue-500 font-bold">Торговые автоматы <span className="text-gray-400 font-normal">Всего: {list.length}</span></h2>
        <div className="flex gap-2">
           <button onClick={() => navigate('/ta/add')} className="bg-gray-100 border px-3 py-1 rounded text-xs flex items-center gap-1 hover:bg-gray-200">
             <Plus size={14}/> Добавить
           </button>
           <button className="bg-gray-100 border px-3 py-1 rounded text-xs flex items-center gap-1"><Download size={14}/> Экспорт</button>
        </div>
      </div>

      <table className="w-full text-[11px] border-collapse">
        <thead className="bg-gray-50 border-b-2 border-blue-400 text-gray-600">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Название автомата</th>
            <th className="p-2 text-left">Модель</th>
            <th className="p-2 text-left">Адрес / Место</th>
            <th className="p-2 text-center">Действия</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {list.map(m => (
            <tr key={m.id} className="hover:bg-blue-50">
              <td className="p-2 text-gray-500">{m.id}</td>
              <td className="p-2 font-bold text-blue-600 underline cursor-pointer">{m.name}</td>
              <td className="p-2">{m.model}</td>
              <td className="p-2">{m.address}</td>
              <td className="p-2 flex justify-center gap-2">
                <button className="text-blue-400 hover:text-blue-600"><Edit size={14}/></button>
                <button className="text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}