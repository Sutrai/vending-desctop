import { useState, useEffect } from 'react';
import api from '../api';
import { Signal, Battery, Coins, Info } from 'lucide-react';

export default function Monitor() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    api.get('/vending-machines').then(res => setMachines(res.data));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Монитор всей сети</h2>
        <div className="bg-white p-2 border rounded shadow-sm text-sm">
          Итого автоматов: <span className="font-bold text-blue-600">{machines.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {machines.map(m => (
          <div key={m.id} className="bg-white p-4 rounded-xl border shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Кружок статуса */}
              <div className={`w-3 h-3 rounded-full ${m.status === 'Работает' ? 'bg-green-500' : 'bg-red-500'}`} />
              <div>
                <div className="font-bold text-lg">{m.name}</div>
                <div className="text-xs text-gray-400">{m.address}</div>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              {/* Связь */}
              <div className="flex flex-col items-center">
                <Signal size={18} className={m.signalLevel > 50 ? 'text-green-500' : 'text-orange-500'} />
                <span className="text-[10px] text-gray-400 font-bold">{m.signalLevel || 0}%</span>
              </div>

              {/* Загрузка товара */}
              <div className="w-24">
                <div className="text-[10px] mb-1 font-bold">Товары</div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden text-center">
                  <div className="bg-blue-500 h-full" style={{ width: `${m.stockLevel || 0}%` }}></div>
                </div>
              </div>

              {/* Деньги */}
              <div className="flex flex-col items-center">
                <Coins size={18} className="text-yellow-600" />
                <span className="text-[10px] font-bold">{m.currentCash || 0} ₽</span>
              </div>

              <button className="p-2 hover:bg-gray-100 rounded-full"><Info size={18} className="text-gray-400"/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}