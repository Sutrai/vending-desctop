import { useEffect, useState } from 'react';
import api from '../api';
import { Signal, Coins, Package } from 'lucide-react';

export default function Monitor() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Получаем эмулированные данные
    api.get('/vending-machines/monitor').then(res => setData(res.data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map(m => (
        <div key={m.id} className="bg-white p-4 rounded-xl border shadow-sm flex justify-between items-center">
          <div>
            <h4 className="font-bold text-lg">{m.name}</h4>
            <span className={`text-xs px-2 py-1 rounded-full ${m.status === 'Работает' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {m.status}
            </span>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <Signal size={20} className={m.signal > 60 ? 'text-green-500' : 'text-orange-500'} />
              <span className="text-xs font-bold">{m.signal}%</span>
            </div>
            <div className="flex flex-col items-center">
              <Coins size={20} className="text-yellow-600" />
              <span className="text-xs font-bold">{m.cash} ₽</span>
            </div>
            <div className="w-16">
              <span className="text-[10px] text-gray-400">Товары</span>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: `${m.stock}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}