import { useEffect, useState } from 'react';
import api from '../api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/stats/summary').then(res => setData(res.data));
  }, []);

  if (!data) return <p>Загрузка...</p>;

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* 1. Эффективность */}
      <div className="col-span-4 bg-white p-4 rounded shadow">
        <h3 className="text-sm font-bold mb-4">Эффективность сети</h3>
        <div className="h-32 bg-green-500 rounded-t-full relative flex items-end justify-center">
           <span className="mb-2 font-bold text-white">Работает 100%</span>
        </div>
      </div>

      {/* 2. Состояние */}
      <div className="col-span-4 bg-white p-4 rounded shadow flex flex-col items-center">
        <h3 className="text-sm font-bold mb-2 w-full">Состояние сети</h3>
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie data={data.statuses} innerRadius={40} outerRadius={60} dataKey="value">
              <Cell fill="#10B981"/><Cell fill="#EF4444"/><Cell fill="#3B82F6"/>
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 3. Сводка */}
      <div className="col-span-4 bg-white p-4 rounded shadow text-xs space-y-2">
        <h3 className="text-sm font-bold mb-4">Сводка</h3>
        <div className="flex justify-between"><span>Денег в ТА</span><b>{data.cashInMachine} р.</b></div>
        <div className="flex justify-between"><span>Выручка, сегодня</span><b>{data.revenueToday} р.</b></div>
        <div className="flex justify-between border-t pt-2 text-blue-600"><span>Выручка, вчера</span><b>{data.revenueYesterday} р.</b></div>
      </div>

      {/* 4. График динамики */}
      <div className="col-span-8 bg-white p-6 rounded shadow">
        <h3 className="font-bold mb-4">Динамика продаж за 10 дней</h3>
        <div className="flex gap-2 mb-4">
           <button className="bg-blue-500 text-white px-4 py-1 rounded text-xs">По сумме</button>
           <button className="bg-gray-100 px-4 py-1 rounded text-xs">По количеству</button>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="val" fill="#A2E9FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 5. Новости */}
      <div className="col-span-4 bg-white p-6 rounded shadow">
        <h3 className="font-bold mb-4 border-b pb-2">Новости</h3>
        <div className="space-y-4 text-[10px]">
          <div><span className="text-gray-400">29.01.25</span> <p className="text-blue-600 underline">Терминалы KitPos получили эквайринг...</p></div>
          <div><span className="text-gray-400">31.12.24</span> <p className="text-blue-600 underline">Новогоднее поздравление...</p></div>
        </div>
      </div>
    </div>
  );
}