import { useEffect, useState } from 'react';
import api from '../api';
import { Search, Wifi, Database, Info, Monitor as MonitorIcon } from 'lucide-react';

export default function MonitorPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    // Получаем данные мониторинга (убедись, что на бэкенде есть такой эндпоинт)
    api.get('/vending-machines/monitor').then(res => setList(res.data));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-blue-500 text-xl font-bold mb-6">Монитор торговых автоматов</h2>

      {/* ФИЛЬТРЫ (как на скриншоте 4) */}
      <div className="flex gap-10 bg-gray-50 p-4 border rounded mb-6 text-xs text-gray-500">
        <div>
          <p className="mb-2">Общее состояние</p>
          <div className="flex gap-2">
            <div className="w-5 h-5 bg-green-500 rounded-full cursor-pointer"></div>
            <div className="w-5 h-5 bg-red-500 rounded-full cursor-pointer"></div>
            <div className="w-5 h-5 bg-blue-500 rounded-full cursor-pointer"></div>
          </div>
        </div>

        <div className="flex-1">
            <p className="mb-2">Сортировка</p>
            <select className="border p-2 rounded w-full bg-white">
                <option>По состоянию ТА</option>
                <option>По названию</option>
            </select>
        </div>

        <div className="flex items-end gap-2">
            <button className="bg-blue-500 text-white px-6 py-2 rounded font-bold">Применить</button>
            <button className="border px-6 py-2 rounded">Очистить</button>
        </div>
      </div>

      {/* ТАБЛИЦА МОНИТОРИНГА */}
      <div className="overflow-x-auto border">
        <table className="w-full text-[10px] text-left border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Торговый автомат</th>
              <th className="p-2 border text-center">Связь</th>
              <th className="p-2 border text-center">Загрузка</th>
              <th className="p-2 border">Денежные средства</th>
              <th className="p-2 border">События</th>
              <th className="p-2 border">Оборудование</th>
              <th className="p-2 border">Информация</th>
              <th className="p-2 border">Доп.</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {list.map((m, index) => (
              <tr key={m.id} className="hover:bg-blue-50">
                <td className="p-2 border text-center">{index + 1}</td>

                {/* Инфо об автомате */}
                <td className="p-2 border">
                  <div className="font-bold text-blue-600">{m.id} - "{m.name}"</div>
                  <div className="text-gray-400">Saeco Cristallo 400</div>
                  <div className="text-gray-400 italic">ул. Пушкина, 10</div>
                </td>

                {/* Связь */}
                <td className="p-2 border text-center">
                   <div className="flex flex-col items-center">
                      <Wifi size={16} className="text-blue-500"/>
                      <span className="font-bold">{m.signal}%</span>
                   </div>
                </td>

                {/* Загрузка */}
                <td className="p-2 border">
                   <div className="flex flex-col gap-1 px-2">
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full" style={{width: `${m.stock}%`}}></div>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full" style={{width: '30%'}}></div>
                      </div>
                   </div>
                </td>

                {/* Деньги */}
                <td className="p-2 border">
                   <div className="font-bold">{m.cash} р.</div>
                   <div className="text-gray-400 text-[9px]">Сдача: 12129 р.</div>
                </td>

                {/* События */}
                <td className="p-2 border text-gray-500">
                    <div>11 мин. назад</div>
                    <div>2 дня назад</div>
                </td>

                {/* Оборудование (иконки-заглушки) */}
                <td className="p-2 border">
                   <div className="flex gap-1 flex-wrap">
                      <div className="p-1 bg-green-100 text-green-600 rounded">MDB</div>
                      <div className="p-1 bg-blue-100 text-blue-600 rounded">EXE</div>
                   </div>
                </td>

                <td className="p-2 border text-center"><Info size={14} className="text-blue-400 mx-auto"/></td>
                <td className="p-2 border text-center text-blue-600 font-bold underline cursor-pointer">112 / 247</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ФУТЕР ТАБЛИЦЫ */}
      <div className="mt-4 flex justify-between text-[11px] font-bold text-gray-600">
         <div>Итого автоматов: {list.length} ( <span className="text-green-500">9</span> / <span className="text-red-500">0</span> / <span className="text-blue-500">0</span> )</div>
         <div>Денег в автоматах: 22460 р. + 12129 р. (сдача)</div>
      </div>
    </div>
  );
}